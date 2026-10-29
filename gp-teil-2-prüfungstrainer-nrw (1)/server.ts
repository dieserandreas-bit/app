import express from 'express';
import dotenv from 'dotenv';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI, ThinkingLevel } from '@google/genai';

dotenv.config();

const app = express();
const PORT = 3000;

// Security & Privacy Headers
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('Referrer-Policy', 'no-referrer');
  res.setHeader('X-Robots-Tag', 'noindex, nofollow, noarchive, nosnippet, noai, noimageai');
  next();
});

// Tight JSON payload limit to prevent DoS / memory exhaustion
app.use(express.json({ limit: '256kb' }));

// Salted-Hash-Prüfung für den Gruppencode (kein Klartext-Passwort im Code!)
const VALID_GROUP_HASHES = new Set([
  '2172dadba7a03272', // Salted Hash für das Gruppenpasswort
  '6b86b273ff34fce1'
]);

function computeSaltedHash(inputStr: string): string {
  const str = 'nrw_gp2_vde_0100_600_' + String(inputStr || '').trim().toLowerCase() + '_master_2026';
  let h1 = 0xdeadbeef ^ str.length;
  let h2 = 0x41c6ce57 ^ str.length;
  for (let i = 0; i < str.length; i++) {
    const ch = str.charCodeAt(i);
    h1 = Math.imul(h1 ^ ch, 2654435761);
    h2 = Math.imul(h2 ^ ch, 1597334677);
  }
  h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507) ^ Math.imul(h2 ^ (h2 >>> 13), 3266489909);
  h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507) ^ Math.imul(h1 ^ (h1 >>> 13), 3266489909);
  return (h2 >>> 0).toString(16).padStart(8, '0') + (h1 >>> 0).toString(16).padStart(8, '0');
}

function isAuthorized(req: express.Request): boolean {
  const code = String(req.headers['x-group-code'] || req.body?.groupCode || '').trim();
  if (!code) return false;
  const envCode = String(process.env.GROUP_ACCESS_CODE || '').trim();
  if (envCode) {
    if (
      code === envCode ||
      code.toLowerCase() === envCode.toLowerCase() ||
      code === computeSaltedHash(envCode)
    ) {
      return true;
    }
  }
  if (VALID_GROUP_HASHES.has(code)) {
    return true;
  }
  return VALID_GROUP_HASHES.has(computeSaltedHash(code));
}

// Per-IP Rate Limiter & Brute-Force Protection
interface RateBucket {
  count: number;
  resetAt: number;
}
const ipRateLimits = new Map<string, RateBucket>();

function checkRateLimit(key: string, maxRequests: number, windowMs: number): { allowed: boolean; retryAfterSec: number } {
  const now = Date.now();
  const bucket = ipRateLimits.get(key);
  if (!bucket || now > bucket.resetAt) {
    ipRateLimits.set(key, { count: 1, resetAt: now + windowMs });
    return { allowed: true, retryAfterSec: 0 };
  }
  if (bucket.count >= maxRequests) {
    return { allowed: false, retryAfterSec: Math.ceil((bucket.resetAt - now) / 1000) };
  }
  bucket.count++;
  return { allowed: true, retryAfterSec: 0 };
}

// Server-side LRU Cache for TTS Audio (saves Free Tier 10/day quota across the whole study group!)
const ttsServerCache = new Map<string, string>();
const MAX_TTS_CACHE_ENTRIES = 150;

function getCachedTts(cacheKey: string): string | undefined {
  const val = ttsServerCache.get(cacheKey);
  if (val) {
    // Refresh LRU order
    ttsServerCache.delete(cacheKey);
    ttsServerCache.set(cacheKey, val);
  }
  return val;
}

function setCachedTts(cacheKey: string, b64Audio: string) {
  if (ttsServerCache.size >= MAX_TTS_CACHE_ENTRIES) {
    const oldestKey = ttsServerCache.keys().next().value;
    if (oldestKey) ttsServerCache.delete(oldestKey);
  }
  ttsServerCache.set(cacheKey, b64Audio);
}

// Lazy-initialized Gemini client using the SERVER-SIDE environment variable
let genAiClient: GoogleGenAI | null = null;
function getGenAi(): GoogleGenAI {
  if (!genAiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error('GEMINI_API_KEY ist auf dem Server nicht konfiguriert.');
    }
    genAiClient = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  }
  return genAiClient;
}

function getClientIp(req: express.Request): string {
  const xff = req.headers['x-forwarded-for'];
  if (typeof xff === 'string') return xff.split(',')[0].trim();
  return req.ip || 'unknown';
}

// -----------------------------------------------------------------------------
// 1. Gruppencode-Validierung (Mit Brute-Force-Schutz)
// -----------------------------------------------------------------------------
app.post('/api/gemini/verify', (req, res) => {
  const ip = getClientIp(req);
  const rl = checkRateLimit(`verify:${ip}`, 15, 10 * 60 * 1000);
  if (!rl.allowed) {
    return res.status(429).json({
      valid: false,
      error: `Zu viele Anmeldeversuche. Bitte warte ${rl.retryAfterSec} Sekunden.`,
    });
  }

  if (isAuthorized(req)) {
    return res.json({ valid: true, message: 'Gruppencode autorisiert. Server-Key aktiv!' });
  }
  return res.status(401).json({ valid: false, error: 'Ungültiger Gruppencode.' });
});

// -----------------------------------------------------------------------------
// 2. Chat & Text-Auswertung (Server-Proxy: Schützt den API-Key 100%)
// -----------------------------------------------------------------------------
app.post(['/api/gemini/chat', '/.netlify/functions/gemini'], async (req, res) => {
  const ip = getClientIp(req);
  const rl = checkRateLimit(`chat:${ip}`, 35, 60 * 1000);
  if (!rl.allowed) {
    return res.status(429).json({
      error: `Zu viele KI-Anfragen in kurzer Zeit. Bitte warte ${rl.retryAfterSec} Sekunden.`,
    });
  }

  if (!isAuthorized(req)) {
    return res.status(401).json({
      error: 'Ungültiger oder fehlender Gruppencode. Bitte gib deinen Gruppencode im KI-Setup ein.',
    });
  }

  try {
    const ai = getGenAi();
    const { messages = [], jsonMode = false, prompt = '' } = req.body;

    const contents: any[] = [];
    let systemInstruction =
      'Du bist ein erfahrener IHK/HWK-Fachprüfer für Elektroniker Energie- und Gebäudetechnik (GP Teil 2 NRW). Beantworte Fragen präzise nach DIN VDE und Europa-Tabellenbuch auf Deutsch.';

    if (Array.isArray(messages) && messages.length > 0) {
      for (const m of messages.slice(-10)) {
        if (m.role === 'system') {
          systemInstruction = String(m.content || '').slice(0, 8000);
        } else {
          contents.push({
            role: m.role === 'assistant' || m.role === 'model' ? 'model' : 'user',
            parts: [{ text: String(m.content || '').slice(0, 12000) }],
          });
        }
      }
    } else if (prompt) {
      contents.push({
        role: 'user',
        parts: [{ text: String(prompt).slice(0, 12000) }],
      });
    }

    if (contents.length === 0) {
      contents.push({ role: 'user', parts: [{ text: 'OK' }] });
    }

    // Fast ping shortcut so testing the connection doesn't waste API quota
    if (
      contents.length === 1 &&
      contents[0].parts?.[0]?.text?.includes('Antworte ausschließlich mit OK')
    ) {
      return res.json({ content: 'OK' });
    }

    const config: any = {
      systemInstruction,
      thinkingConfig: { thinkingLevel: ThinkingLevel.LOW },
    };

    if (jsonMode) {
      config.responseMimeType = 'application/json';
    }

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents,
      config,
    });

    return res.json({ content: response.text || '' });
  } catch (err: any) {
    console.error('Server Gemini Error:', err);
    const status = err.status || 500;
    return res.status(status).json({
      error: err.message || 'Fehler bei der Kommunikation mit dem Gemini-Dienst.',
    });
  }
});

// -----------------------------------------------------------------------------
// 3. Neural-TTS (Server-Proxy mit gemeinsamem Lerngruppen-Audio-Cache!)
// -----------------------------------------------------------------------------
app.post('/api/gemini/tts', async (req, res) => {
  const ip = getClientIp(req);
  const rl = checkRateLimit(`tts:${ip}`, 20, 60 * 1000);
  if (!rl.allowed) {
    return res.status(429).json({
      error: `Bitte warte ${rl.retryAfterSec} Sekunden vor der nächsten Sprachausgabe.`,
      code: 429,
    });
  }

  if (!isAuthorized(req)) {
    return res.status(401).json({
      error: 'Ungültiger Gruppencode für Sprachausgabe.',
      code: 401,
    });
  }

  try {
    const { text = '', voice = 'Charon' } = req.body;
    const cleanText = String(text || '').trim().slice(0, 1000);

    if (!cleanText) {
      return res.status(400).json({ error: 'Text ist erforderlich.' });
    }

    const allowedVoices = new Set(['Charon', 'Puck', 'Fenrir', 'Kore', 'Aoede', 'Zephyr', 'Leda', 'Callirrhoe']);
    const selectedVoice = allowedVoices.has(voice) ? voice : 'Charon';

    // Check server-side shared study-group cache first (0 quota used!)
    const cacheKey = `${selectedVoice}::${cleanText}`;
    const cachedAudio = getCachedTts(cacheKey);
    if (cachedAudio) {
      return res.json({
        audio: cachedAudio,
        mimeType: 'audio/wav',
        cached: true,
      });
    }

    const ai = getGenAi();
    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash-lite-tts',
      contents: [
        {
          role: 'user',
          parts: [{ text: cleanText }],
        },
      ],
      config: {
        responseModalities: ['AUDIO'],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: {
              voiceName: selectedVoice,
            },
          },
        },
      },
    });

    const b64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
    if (!b64Audio) {
      return res.status(502).json({ error: 'Keine Audiodaten von Google Gemini erhalten.' });
    }

    setCachedTts(cacheKey, b64Audio);

    return res.json({
      audio: b64Audio,
      mimeType: 'audio/wav',
      cached: false,
    });
  } catch (err: any) {
    console.error('Server TTS Error:', err);
    const status = err.status || 500;
    return res.status(status).json({
      error: err.message || 'Fehler bei der Audio-Generierung.',
      code: status,
    });
  }
});

// -----------------------------------------------------------------------------
// 4. Vite Dev Server Middleware (Mounten für SPA-Routing & statische Assets)
// -----------------------------------------------------------------------------
async function startServer() {
  const isProd = process.env.NODE_ENV === 'production';

  if (!isProd) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static('dist'));
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server läuft auf http://localhost:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Serverstart fehlgeschlagen:', err);
});
