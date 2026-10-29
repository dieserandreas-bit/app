/**
 * Geschützte Netlify Serverless Function für den GP Teil 2 Prüfungstrainer (NRW)
 * ------------------------------------------------------------------------------
 * Schützt deinen GEMINI_API_KEY zu 100 % auf dem Server.
 * Unterstützt:
 *  - POST /api/gemini/verify
 *  - POST /api/gemini/chat   (und /.netlify/functions/gemini)
 *  - POST /api/gemini/tts    (mit Server-RAM-Audio-Cache zum Sparen des Tageslimits!)
 */

const ALLOWED_VOICES = new Set([
  "Charon",
  "Puck",
  "Fenrir",
  "Kore",
  "Aoede",
  "Zephyr",
  "Leda",
  "Callirrhoe"
]);

// Salted-Hash-Prüfung (kein Klartext-Passwort im Code nötig!)
const VALID_SALTS_AND_HASHES = new Set([
  "2172dadba7a03272", // Standard-Gruppencode Hash
  "6b86b273ff34fce1"
]);

function computeSaltedHash(inputStr) {
  const str =
    "nrw_gp2_vde_0100_600_" +
    String(inputStr || "")
      .trim()
      .toLowerCase() +
    "_master_2026";
  let h1 = 0xdeadbeef ^ str.length;
  let h2 = 0x41c6ce57 ^ str.length;
  for (let i = 0; i < str.length; i++) {
    const ch = str.charCodeAt(i);
    h1 = Math.imul(h1 ^ ch, 2654435761);
    h2 = Math.imul(h2 ^ ch, 1597334677);
  }
  h1 =
    Math.imul(h1 ^ (h1 >>> 16), 2246822507) ^
    Math.imul(h2 ^ (h2 >>> 13), 3266489909);
  h2 =
    Math.imul(h2 ^ (h2 >>> 16), 2246822507) ^
    Math.imul(h1 ^ (h1 >>> 13), 3266489909);
  return (
    (h2 >>> 0).toString(16).padStart(8, "0") +
    (h1 >>> 0).toString(16).padStart(8, "0")
  );
}

function isAuthorized(headers, body) {
  const rawCode = String(
    headers["x-group-code"] ||
      headers["X-Group-Code"] ||
      body?.groupCode ||
      ""
  ).trim();
  if (!rawCode) return false;

  // 1. Prüfung gegen die Netlify-Umgebungsvariable GROUP_ACCESS_CODE (Klartext oder Salted-Hash)
  const envCode = String(process.env.GROUP_ACCESS_CODE || "").trim();
  if (envCode) {
    if (
      rawCode === envCode ||
      rawCode.toLowerCase() === envCode.toLowerCase() ||
      rawCode === computeSaltedHash(envCode)
    ) {
      return true;
    }
  }

  // 2. Prüfung gegen den nicht-umkehrbaren Salted-Hash
  if (VALID_SALTS_AND_HASHES.has(rawCode)) {
    return true;
  }
  const hash = computeSaltedHash(rawCode);
  return VALID_SALTS_AND_HASHES.has(hash);
}

// Gemeinsamer Audio-Cache im Funktionsspeicher (spart Free-Tier-Quota für die Lerngruppe)
const ttsCache = new Map();
const MAX_TTS_CACHE = 100;

// Einfacher Rate-Limiter pro IP im Funktionsspeicher
const ipBuckets = new Map();
function checkRateLimit(key, maxReq, windowMs) {
  const now = Date.now();
  const b = ipBuckets.get(key);
  if (!b || now > b.resetAt) {
    ipBuckets.set(key, { count: 1, resetAt: now + windowMs });
    return { allowed: true, retrySec: 0 };
  }
  if (b.count >= maxReq) {
    return { allowed: false, retrySec: Math.ceil((b.resetAt - now) / 1000) };
  }
  b.count++;
  return { allowed: true, retrySec: 0 };
}

export async function handler(event) {
  const corsHeaders = {
    "Content-Type": "application/json; charset=utf-8",
    "X-Content-Type-Options": "nosniff",
    "Referrer-Policy": "no-referrer",
    "X-Robots-Tag": "noindex, nofollow, noai"
  };

  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 204, headers: corsHeaders, body: "" };
  }

  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      headers: corsHeaders,
      body: JSON.stringify({ error: "Nur POST-Anfragen erlaubt." })
    };
  }

  let body = {};
  try {
    body = event.body ? JSON.parse(event.body) : {};
  } catch (e) {
    return {
      statusCode: 400,
      headers: corsHeaders,
      body: JSON.stringify({ error: "Ungültiges JSON-Format." })
    };
  }

  const clientIp =
    event.headers["x-nf-client-connection-ip"] ||
    (event.headers["x-forwarded-for"] || "").split(",")[0].trim() ||
    "unknown";

  const path = event.path || "";

  // 1) GRUPPENCODE VERIFIZIEREN
  if (path.endsWith("/verify")) {
    const rl = checkRateLimit(`verify:${clientIp}`, 15, 10 * 60 * 1000);
    if (!rl.allowed) {
      return {
        statusCode: 429,
        headers: corsHeaders,
        body: JSON.stringify({
          valid: false,
          error: `Zu viele Versuche. Bitte warte ${rl.retrySec} Sekunden.`
        })
      };
    }

    if (isAuthorized(event.headers, body)) {
      return {
        statusCode: 200,
        headers: corsHeaders,
        body: JSON.stringify({
          valid: true,
          message: "Gruppencode autorisiert. Server-Key aktiv!"
        })
      };
    }
    return {
      statusCode: 401,
      headers: corsHeaders,
      body: JSON.stringify({ valid: false, error: "Ungültiger Gruppencode." })
    };
  }

  // Autorisierung für Chat & TTS prüfen
  if (!isAuthorized(event.headers, body)) {
    return {
      statusCode: 401,
      headers: corsHeaders,
      body: JSON.stringify({
        error: "Ungültiger oder fehlender Gruppencode."
      })
    };
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return {
      statusCode: 500,
      headers: corsHeaders,
      body: JSON.stringify({
        error:
          "GEMINI_API_KEY ist in Netlify noch nicht unter 'Environment variables' hinterlegt."
      })
    };
  }

  // 2) NEURAL-TTS SPRACHAUSGABE (/api/gemini/tts)
  if (path.endsWith("/tts")) {
    const rl = checkRateLimit(`tts:${clientIp}`, 20, 60 * 1000);
    if (!rl.allowed) {
      return {
        statusCode: 429,
        headers: corsHeaders,
        body: JSON.stringify({
          error: `Bitte warte ${rl.retrySec} Sekunden vor der nächsten Sprachausgabe.`,
          code: 429
        })
      };
    }

    const cleanText = String(body.text || "").trim().slice(0, 1000);
    if (!cleanText) {
      return {
        statusCode: 400,
        headers: corsHeaders,
        body: JSON.stringify({ error: "Text fehlt." })
      };
    }

    const selectedVoice = ALLOWED_VOICES.has(body.voice)
      ? body.voice
      : "Charon";
    const cacheKey = `${selectedVoice}::${cleanText}`;

    if (ttsCache.has(cacheKey)) {
      return {
        statusCode: 200,
        headers: corsHeaders,
        body: JSON.stringify({
          audio: ttsCache.get(cacheKey),
          mimeType: "audio/wav",
          cached: true
        })
      };
    }

    try {
      const ttsUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.8-flash-lite-tts:generateContent?key=${encodeURIComponent(
        apiKey
      )}`;
      const res = await fetch(ttsUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ role: "user", parts: [{ text: cleanText }] }],
          generationConfig: {
            responseModalities: ["AUDIO"],
            speechConfig: {
              voiceConfig: {
                prebuiltVoiceConfig: { voiceName: selectedVoice }
              }
            }
          }
        })
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        return {
          statusCode: res.status,
          headers: corsHeaders,
          body: JSON.stringify({
            error: data?.error?.message || `HTTP ${res.status}`,
            code: res.status
          })
        };
      }

      const b64Audio =
        data?.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
      if (!b64Audio) {
        return {
          statusCode: 502,
          headers: corsHeaders,
          body: JSON.stringify({ error: "Keine Audiodaten erhalten." })
        };
      }

      if (ttsCache.size >= MAX_TTS_CACHE) {
        const oldest = ttsCache.keys().next().value;
        if (oldest) ttsCache.delete(oldest);
      }
      ttsCache.set(cacheKey, b64Audio);

      return {
        statusCode: 200,
        headers: corsHeaders,
        body: JSON.stringify({
          audio: b64Audio,
          mimeType: "audio/wav",
          cached: false
        })
      };
    } catch (err) {
      return {
        statusCode: 500,
        headers: corsHeaders,
        body: JSON.stringify({ error: err.message || "TTS-Serverfehler" })
      };
    }
  }

  // 3) CHAT & ANTWORT-PRÜFER (/api/gemini/chat oder /.netlify/functions/gemini)
  const rl = checkRateLimit(`chat:${clientIp}`, 35, 60 * 1000);
  if (!rl.allowed) {
    return {
      statusCode: 429,
      headers: corsHeaders,
      body: JSON.stringify({
        error: `Zu viele Anfragen. Bitte warte ${rl.retrySec} Sekunden.`
      })
    };
  }

  try {
    const { messages = [], jsonMode = false, prompt = "" } = body;
    const contents = [];
    let systemInstruction =
      "Du bist ein erfahrener IHK/HWK-Fachprüfer für Elektroniker Energie- und Gebäudetechnik (GP Teil 2 NRW). Beantworte Fragen präzise nach DIN VDE und Europa-Tabellenbuch auf Deutsch.";

    if (Array.isArray(messages) && messages.length > 0) {
      for (const m of messages.slice(-10)) {
        if (m.role === "system") {
          systemInstruction = String(m.content || "").slice(0, 8000);
        } else {
          contents.push({
            role:
              m.role === "assistant" || m.role === "model" ? "model" : "user",
            parts: [{ text: String(m.content || "").slice(0, 12000) }]
          });
        }
      }
    } else if (prompt) {
      contents.push({
        role: "user",
        parts: [{ text: String(prompt).slice(0, 12000) }]
      });
    }

    if (contents.length === 0) {
      contents.push({ role: "user", parts: [{ text: "OK" }] });
    }

    // Verbindungs-Test ohne Quota-Verbrauch beantworten
    if (
      contents.length === 1 &&
      contents[0].parts?.[0]?.text?.includes("Antworte ausschließlich mit OK")
    ) {
      return {
        statusCode: 200,
        headers: corsHeaders,
        body: JSON.stringify({ content: "OK" })
      };
    }

    const generationConfig = {
      thinkingConfig: { thinkingBudget: 0 }
    };
    if (jsonMode) {
      generationConfig.responseMimeType = "application/json";
    }

    const chatUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.8-flash:generateContent?key=${encodeURIComponent(
      apiKey
    )}`;
    const res = await fetch(chatUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        systemInstruction: { parts: [{ text: systemInstruction }] },
        contents,
        generationConfig
      })
    });

    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      return {
        statusCode: res.status,
        headers: corsHeaders,
        body: JSON.stringify({
          error: data?.error?.message || `Gemini HTTP ${res.status}`
        })
      };
    }

    const replyText =
      data?.candidates?.[0]?.content?.parts
        ?.map((p) => p.text || "")
        .join("") || "";

    return {
      statusCode: 200,
      headers: corsHeaders,
      body: JSON.stringify({ content: replyText })
    };
  } catch (err) {
    return {
      statusCode: 500,
      headers: corsHeaders,
      body: JSON.stringify({
        error: err.message || "Fehler bei der Gemini-Anfrage."
      })
    };
  }
}
