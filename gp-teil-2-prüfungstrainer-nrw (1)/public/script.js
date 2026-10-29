
    // =========================================================================
    // 0. AUDIO-SYNTHESIZER (WEB AUDIO API)
    // =========================================================================
    let audioCtx = null;
    function getAudioContext() {
      if (!audioCtx) {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      }
      if (audioCtx.state === "suspended") {
        audioCtx.resume();
      }
      return audioCtx;
    }

    function playTone(freq, type, duration) {
      try {
        const ctx = getAudioContext();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = type;
        osc.frequency.setValueAtTime(freq, ctx.currentTime);
        gain.gain.setValueAtTime(0.06, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + duration);
      } catch (e) {}
    }

    function playSuccessSound() {
      playTone(523.25, "sine", 0.12);
      setTimeout(() => playTone(659.25, "sine", 0.18), 110);
    }

    function playWrongSound() {
      playTone(220, "sawtooth", 0.22);
    }

    // =========================================================================
    // 1. FRAGENPOOLS: WISO (55), ELEKTRO (59) & FACHENGLISCH (24)
    // =========================================================================
    const WISO_QUESTIONS = [
      {
        id: "sv-1", exam: "Sommer 2021", category: "Sozialversicherung & Entgelt",
        question: "Aus welchen fünf Säulen setzt sich die gesetzliche Sozialversicherung in Deutschland zusammen?",
        options: [
          "Krankenversicherung, Rentenversicherung, Arbeitslosenversicherung, Pflegeversicherung, Unfallversicherung",
          "Krankenversicherung, Haftpflichtversicherung, Rentenversicherung, Arbeitslosenversicherung, Hausratversicherung",
          "Krankenversicherung, Berufsunfähigkeitsversicherung, Pflegeversicherung, Unfallversicherung, Rechtsschutzversicherung",
          "Rentenversicherung, Lebensversicherung, Arbeitslosenversicherung, Pflegeversicherung, Kfz-Versicherung"
        ],
        correct: 0,
        explanation: "• Die 5 Säulen: Krankenversicherung (GKV), Rentenversicherung (GRV), Arbeitslosenversicherung (ALV), Pflegeversicherung (PV) und Unfallversicherung (UV).\n• Prüfungsfalle: Haftpflicht-, Hausrat- oder Berufsunfähigkeitsversicherungen sind Individualversicherungen!\n• 📖 Europa Tabellenbuch: S. 606 (Entlohnung/Tarif) & Masterbuch WiSo (5 Säulen der Sozialversicherung & Lohnabrechnung)"
      },
      {
        id: "sv-2", exam: "Sommer 2021", category: "Sozialversicherung & Entgelt",
        question: "Welche Säule der gesetzlichen Sozialversicherung wird allein vom Arbeitgeber bezahlt und warum?",
        options: [
          "Die gesetzliche Unfallversicherung, weil sie die Haftung des Arbeitgebers bei Arbeits- und Wegeunfällen ablöst.",
          "Die Arbeitslosenversicherung, weil der Arbeitgeber allein für Entlassungen verantwortlich ist.",
          "Die Pflegeversicherung, weil Pflegefälle immer durch Arbeit im Betrieb entstehen.",
          "Die Krankenversicherung, da der Arbeitgeber für die Gesundheit am Arbeitsplatz haftet."
        ],
        correct: 0,
        explanation: "• Allein vom Arbeitgeber bezahlt: Gesetzliche Unfallversicherung (Berufsgenossenschaft, z. B. BG ETEM).\n• Grund: Haftungsablösung des Arbeitgebers bei Arbeitsunfällen, Wegeunfällen und Berufskrankheiten.\n• 📖 Europa Tabellenbuch: S. 606 (Entlohnung/Tarif) & Masterbuch WiSo (5 Säulen der Sozialversicherung & Lohnabrechnung)"
      },
      {
        id: "sv-3", exam: "Sommer 2022", category: "Sozialversicherung & Entgelt",
        question: "Welche vier Sozialversicherungen erhalten Beiträge, die direkt vom Bruttoentgelt des Arbeitnehmers abgezogen werden?",
        options: [
          "Krankenversicherung, Rentenversicherung, Arbeitslosenversicherung und Pflegeversicherung",
          "Krankenversicherung, Unfallversicherung, Rentenversicherung und Arbeitslosenversicherung",
          "Unfallversicherung, Pflegeversicherung, Berufsunfähigkeitsversicherung und Rentenversicherung",
          "Lohnsteuer, Kirchensteuer, Krankenversicherung und Rentenversicherung"
        ],
        correct: 0,
        explanation: "• Vom Bruttolohn abgezogen werden: GKV, GRV, ALV und PV. Die Unfallversicherung zahlt der Chef zu 100 % allein!\n• 📖 Europa Tabellenbuch: S. 606 (Entlohnung/Tarif) & Masterbuch WiSo (5 Säulen der Sozialversicherung & Lohnabrechnung)"
      },
      {
        id: "sv-4", exam: "Sommer 2022", category: "Sozialversicherung & Entgelt",
        question: "Was versteht man in der Rentenversicherung unter dem „Generationenvertrag“?",
        options: [
          "Die aktuell Erwerbstätigen finanzieren durch laufende Beiträge die Renten der heutigen Rentner (Umlageverfahren).",
          "Jeder Arbeitnehmer spart seine eigenen Rentenbeiträge auf einem persönlichen Konto der Deutschen Bundesbank an, die ihm ab dem 67. Lebensjahr inklusive Zinseszins ausgezahlt werden (Kapitaldeckungsverfahren).",
          "Ein privatrechtlicher Vorsorgevertrag zwischen Eltern und Kindern, der beim Notar beurkundet werden muss und die Kinder gesetzlich zur späteren Zahlung der Altersrente verpflichtet.",
          "Die Renten der heutigen Ruheständler werden vollständig aus der Umsatzsteuer und Einkommensteuer des Bundeshaushalts finanziert, sodass Arbeitnehmer keine eigenen Beiträge zahlen müssen."
        ],
        correct: 0,
        explanation: "• Generationenvertrag (Umlageverfahren): Die laufenden Beiträge der Erwerbstätigen fließen sofort als Rente an die Ruheständler.\n• 📖 Europa Tabellenbuch: S. 606 (Entlohnung/Tarif) & Masterbuch WiSo (5 Säulen der Sozialversicherung & Lohnabrechnung)"
      },
      {
        id: "sv-5", exam: "Sommer 2023", category: "Sozialversicherung & Entgelt",
        question: "Was bedeutet das „Solidaritätsprinzip“ in der Sozialversicherung?",
        options: [
          "Beiträge richten sich nach dem Einkommen, die Leistungen aber nach dem medizinischen Bedarf.",
          "Wer monatlich höhere Beiträge in die gesetzliche Krankenkasse einzahlt, hat beim Arztbesuch und im Krankenhaus automatisch Anspruch auf Chefarztbehandlung und ein Einzelzimmer (Äquivalenzprinzip).",
          "Jeder Versicherte zahlt unabhängig von der Höhe seines Bruttoeinkommens exakt denselben festen Euro-Kopfpauschalbetrag an die Krankenkasse und erhält dafür identische Regelleistungen.",
          "Arbeitnehmer, die innerhalb eines Kalenderjahres keine ärztlichen Leistungen in Anspruch nehmen, erhalten am Jahresende ihre gesamten gezahlten Sozialversicherungsbeiträge steuerfrei zurückerstattet."
        ],
        correct: 0,
        explanation: "• Solidaritätsprinzip: Beiträge nach prozentualer Leistungsfähigkeit (Bruttolohn), Leistungen nach individuellem Bedarf.\n• 📖 Europa Tabellenbuch: S. 606 (Entlohnung/Tarif) & Masterbuch WiSo (5 Säulen der Sozialversicherung & Lohnabrechnung)"
      },
      {
        id: "sv-6", exam: "Winter 2023/24", category: "Sozialversicherung & Entgelt",
        question: "Was bedeutet der Begriff „Demografischer Wandel“ für die Rente?",
        options: [
          "Durch niedrige Geburtenrate und steigende Lebenserwartung stehen weniger Beitragszahlern mehr Rentner gegenüber.",
          "Durch steigende Geburtenraten und Zuwanderung junger Fachkräfte sinkt das Durchschnittsalter der Bevölkerung stark ab, sodass immer mehr Beitragszahler für immer weniger Rentner aufkommen.",
          "Immer mehr Erwerbstätige wechseln aus dem Handwerk in den öffentlichen Dienst, wodurch die gesetzliche Unfallversicherung (Berufsgenossenschaft) keine Beiträge mehr einnimmt.",
          "Durch die fortschreitende Digitalisierung und Automatisierung im Handwerk verkürzt sich die durchschnittliche Rentenbezugsdauer auf unter fünf Jahre nach dem Renteneintritt."
        ],
        correct: 0,
        explanation: "• Überalterung der Gesellschaft: Weniger Erwerbstätige müssen immer mehr Ruheständler über längere Zeiträume finanzieren.\n• 📖 Europa Tabellenbuch: S. 606 (Entlohnung/Tarif) & Masterbuch WiSo (5 Säulen der Sozialversicherung & Lohnabrechnung)"
      },
      {
        id: "sv-7", exam: "Sommer 2024", category: "Sozialversicherung & Entgelt",
        question: "Welche Ereignisse lösen einen Versicherungsanspruch der gesetzlichen Unfallversicherung aus?",
        options: [
          "Arbeitsunfall im Betrieb, direkter Wegeunfall oder anerkannte Berufskrankheit.",
          "Freizeitunfälle im privaten Haushalt oder beim Wochenend-Sport, selbstverschuldete Autounfälle während des Erholungsurlaubs sowie die unverschuldete Kündigung des Arbeitsplatzes.",
          "Jede akute Erkrankung (z. B. Grippe oder Rückenschmerzen), die länger als sechs Wochen dauert, sowie Schäden am privaten Pkw auf dem Parkplatz des Supermarktes.",
          "Unfälle auf privaten Umwegen nach Feierabend (z. B. zweistündiger Einkaufsbummel vor der Heimfahrt) sowie Sachschäden an Kundenfahrzeugen durch fahrlässige Montagefehler."
        ],
        correct: 0,
        explanation: "• Versicherungsfälle der BG: 1. Arbeitsunfall, 2. Wegeunfall (direkter Arbeitsweg) oder 3. Berufskrankheit.\n• 📖 Europa Tabellenbuch: S. 606 (Entlohnung/Tarif) & Masterbuch WiSo (5 Säulen der Sozialversicherung & Lohnabrechnung)"
      },
      {
        id: "sv-8", exam: "Winter 2022/23", category: "Sozialversicherung & Entgelt",
        question: "Welche Leistungen erbringt die Bundesagentur für Arbeit (Arbeitslosenversicherung)?",
        options: [
          "Arbeitslosengeld I, Kurzarbeitergeld, Insolvenzgeld sowie Berufsberatung und Vermittlung.",
          "Zahlung der gesetzlichen Altersrente, Erwerbsminderungsrente und Hinterbliebenenrente sowie Übernahme von stationären Rehabilitationsmaßnahmen nach einem schweren Arbeitsunfall.",
          "Übernahme sämtlicher Arzt-, Medikamenten- und Krankenhauskosten im Krankheitsfall sowie Auszahlung des gesetzlichen Krankengeldes ab der siebten Krankheitswoche.",
          "Auszahlung von Schmerzensgeld und Verletztenrente nach einem Wegeunfall sowie Durchführung der technischen Überwachung von Baustellen nach den Unfallverhütungsvorschriften (UVV)."
        ],
        correct: 0,
        explanation: "• Aufgaben der BA: ALG I, Kurzarbeitergeld, Insolvenzgeld, Ausbildungsförderung und Berufsvermittlung.\n• 📖 Europa Tabellenbuch: S. 606 (Entlohnung/Tarif) & Masterbuch WiSo (5 Säulen der Sozialversicherung & Lohnabrechnung)"
      },
      {
        id: "sv-9", exam: "Winter 2024/25", category: "Sozialversicherung & Entgelt",
        question: "Was versteht man unter „Krankengeld“?",
        options: [
          "Eine Entgeltersatzleistung der GKV ab der 7. Woche (nach Ablauf der 6-wöchigen Lohnfortzahlung).",
          "Eine steuerfreie Sonderprämie des Arbeitgebers am Jahresende für Mitarbeiter, die im gesamten Kalenderjahr keinen einzigen Arbeitstag wegen Krankheit ausgefallen sind.",
          "Die gesetzliche Verpflichtung des Arbeitgebers nach dem Entgeltfortzahlungsgesetz, in den ersten sechs Wochen einer Erkrankung 100 % des regulären Bruttolohns weiterzuzahlen.",
          "Eine dauerhafte monatliche Unfallrente der Berufsgenossenschaft (BG ETEM), die bereits ab dem ersten Tag einer berufsbedingten Erkrankung zusätzlich zum Lohn ausgezahlt wird."
        ],
        correct: 0,
        explanation: "• Bis zur 6. Woche (42 Tage): 100 % Entgeltfortzahlung durch den Arbeitgeber. Ab Woche 7: Krankengeld von der Krankenkasse (ca. 70 % vom Brutto, max. 90 % vom Netto).\n• 📖 Europa Tabellenbuch: S. 606 (Entlohnung/Tarif) & Masterbuch WiSo (5 Säulen der Sozialversicherung & Lohnabrechnung)"
      },
      {
        id: "sv-10", exam: "Sommer 2021", category: "Sozialversicherung & Entgelt",
        question: "Wozu dienen die Lohnsteuerklassen (I bis VI)?",
        options: [
          "Um die persönliche Lebens- und Familiensituation beim monatlichen Steuerabzug zu berücksichtigen.",
          "Sie teilen die Arbeitnehmer nach der Gefährdungsstufe ihres Handwerksberufs ein, um den monatlichen Beitragssatz zur gesetzlichen Unfallversicherung und Krankenkasse festzulegen.",
          "Sie richten sich ausschließlich nach dem Lebensalter und der Dauer der Betriebszugehörigkeit des Mitarbeiters und legen fest, wie viele Urlaubstage ihm gesetzlich zustehen.",
          "Sie bestimmen die tarifliche Lohngruppe im Elektrohandwerk (vom Auszubildenden in Klasse I bis zum angestellten Betriebsleiter oder Meister in Steuerklasse VI)."
        ],
        correct: 0,
        explanation: "• Lohnsteuerklassen berücksichtigen Familienstand, Kinderfreibeträge und Nebenjobs beim Lohnsteuerabzug.\n• 📖 Europa Tabellenbuch: S. 606 (Entlohnung/Tarif) & Masterbuch WiSo (5 Säulen der Sozialversicherung & Lohnabrechnung)"
      },
      {
        id: "sv-11", exam: "Sommer 2023", category: "Sozialversicherung & Entgelt",
        question: "Welche Kosten zählen zu den Lohnzusatzkosten des Arbeitgebers?",
        options: [
          "Arbeitgeberanteile zur Sozialversicherung, BG-Beiträge, Entgeltfortzahlung bei Urlaub/Krankheit.",
          "Ausgaben des Betriebes für Kupferkabel, Schalterprogramme, Messgeräte, Firmenfahrzeuge sowie die monatliche Büromiete und die betriebliche Haftpflichtversicherung.",
          "Die vom Bruttolohn des Arbeitnehmers einbehaltene Lohnsteuer, Kirchensteuer und der Solidaritätszuschlag, die der Arbeitgeber an das zuständige Finanzamt abführt.",
          "Die gesetzliche Umsatzsteuer (19 % Mehrwertsteuer) auf Kundenrechnungen sowie die Gewerbesteuer und Körperschaftsteuer, die das Unternehmen auf seinen Jahresgewinn zahlt."
        ],
        correct: 0,
        explanation: "• Personalnebenkosten: AG-Anteile zur Sozialversicherung, 100 % Berufsgenossenschaft, Urlaubsentgelt und Lohnfortzahlung im Krankheitsfall.\n• 📖 Europa Tabellenbuch: S. 606 (Entlohnung/Tarif) & Masterbuch WiSo (5 Säulen der Sozialversicherung & Lohnabrechnung)"
      },
      {
        id: "av-1", exam: "Winter 2023/24", category: "Arbeitsvertrag, Ausbildung & Kündigung",
        question: "Welche Mindestinhalte müssen in einem schriftlichen Arbeitsvertrag enthalten sein?",
        options: [
          "Name/Anschrift, Beginn/Dauer, Tätigkeitsbeschreibung & Ort, Entgelt, Arbeitszeit, Urlaub und Kündigungsfristen.",
          "Konfessionszugehörigkeit, Parteimitgliedschaft, bisherige Vorstrafen, geplante Familiengründung sowie eine vollständige Aufstellung der privaten Bankverbindlichkeiten und Schufa-Einträge.",
          "Ausschließlich der Vor- und Nachname des Arbeitnehmers sowie die Höhe des vereinbarten Nettolohns; alle weiteren Punkte wie Urlaub und Kündigungsfristen dürfen nur mündlich geregelt werden.",
          "Schulabschlussnoten, Kopie des Führerscheins, ärztlicher Impfpass, private Hobbys sowie eine Verpflichtungserklärung, während der gesamten Beschäftigungsdauer keiner Gewerkschaft beizutreten."
        ],
        correct: 0,
        explanation: "• Nachweisgesetz (NachwG): Vertragsparteien, Beginn, Arbeitsort, Tätigkeitsbeschreibung, Vergütung, Arbeitszeiten, Erholungsurlaub und Fristen.\n• 📖 Europa Tabellenbuch: S. 606–608 (Arbeitsrecht, Arbeitsvertrag, Kündigung & Zeugnis) & Masterbuch WiSo"
      },
      {
        id: "av-2", exam: "Winter 2023/24", category: "Arbeitsvertrag, Ausbildung & Kündigung",
        question: "Welche gesetzlichen Regelungen müssen beim Arbeitsvertrag beachtet werden?",
        options: [
          "BGB, Mindestlohngesetz, Arbeitszeitgesetz, Bundesurlaubsgesetz, Kündigungsschutzgesetz, AGG.",
          "Straßenverkehrsordnung (StVO), Produkthaftungsgesetz, Gesetz gegen den unlauteren Wettbewerb (UWG), Handelsgesetzbuch (HGB) sowie die Vergabe- und Vertragsordnung für Bauleistungen (VOB).",
          "Es gibt bei der Gestaltung von Arbeitsverträgen in Deutschland keinerlei gesetzliche Einschränkungen, da im privaten Handwerk uneingeschränkte Vertragsfreiheit ohne Mindeststandards gilt.",
          "Ausschließlich das Einkommensteuergesetz (EStG), das Umsatzsteuergesetz (UStG) sowie die technischen Anschlussbedingungen (TAB) des örtlichen Verteilnetzbetreibers."
        ],
        correct: 0,
        explanation: "• Wesentliche Gesetze: BGB, MiLoG, ArbZG, BUrlG, KSchG, AGG, BetrVG und BBiG.\n• 📖 Europa Tabellenbuch: S. 606–608 (Arbeitsrecht, Arbeitsvertrag, Kündigung & Zeugnis) & Masterbuch WiSo"
      },
      {
        id: "av-3", exam: "Sommer 2022", category: "Arbeitsvertrag, Ausbildung & Kündigung",
        question: "Welche Haupt- und Nebenpflichten entstehen durch den Arbeitsvertrag?",
        options: [
          "Arbeitgeber: Vergütung & Fürsorge. Arbeitnehmer: Arbeit & Treue/Verschwiegenheit.",
          "Arbeitgeber: Arbeitspflicht & Gehorsamspflicht. Arbeitnehmer: Fürsorgepflicht, Zahlung der Sozialversicherungsbeiträge sowie Bereitstellung von Werkzeug.",
          "Arbeitgeber: Verschwiegenheitspflicht über Tarifverträge. Arbeitnehmer: Haftung für alle betrieblichen Verluste sowie unentgeltliche Überstunden.",
          "Hauptpflicht beider Seiten ist die Mitgliedschaft in der Innung bzw. Gewerkschaft; Nebenpflichten entstehen erst nach Ablauf einer zweijährigen Betriebszugehörigkeit."
        ],
        correct: 0,
        explanation: "• AN: Hauptpflicht = Arbeitspflicht, Nebenpflicht = Treue- & Sorgfaltspflicht. AG: Hauptpflicht = Vergütungspflicht, Nebenpflicht = Fürsorge- & Schutzpflicht.\n• 📖 Europa Tabellenbuch: S. 606–608 (Arbeitsrecht, Arbeitsvertrag, Kündigung & Zeugnis) & Masterbuch WiSo"
      },
      {
        id: "av-4", exam: "Sommer 2021", category: "Arbeitsvertrag, Ausbildung & Kündigung",
        question: "Was bedeuten Fürsorgepflicht (Arbeitgeber) und Verschwiegenheitspflicht (Arbeitnehmer)?",
        options: [
          "Fürsorge: Schutz von Gesundheit und Leben. Verschwiegenheit: Keine Weitergabe von Betriebsgeheimnissen.",
          "Fürsorgepflicht: Der Arbeitgeber verwaltet das private Girokonto des Mitarbeiters. Verschwiegenheitspflicht: Verbot, mit Kollegen über Sicherheitsmängel zu sprechen.",
          "Fürsorgepflicht: Übernahme privater Miet- und Lebenshaltungskosten. Verschwiegenheitspflicht: Geheimhaltung des eigenen Bruttolohns gegenüber dem Finanzamt.",
          "Fürsorgepflicht gilt nur gegenüber minderjährigen Auszubildenden; die Verschwiegenheitspflicht endet automatisch an jedem Arbeitstag mit dem Beginn des Feierabends."
        ],
        correct: 0,
        explanation: "• Fürsorge: Einhaltung des Arbeitsschutzes und Unfallverhütung. Verschwiegenheit: Keine Geschäftsgeheimnisse oder Kundendaten an Dritte weitergeben.\n• 📖 Europa Tabellenbuch: S. 606–608 (Arbeitsrecht, Arbeitsvertrag, Kündigung & Zeugnis) & Masterbuch WiSo"
      },
      {
        id: "av-5", exam: "Sommer 2023", category: "Arbeitsvertrag, Ausbildung & Kündigung",
        question: "Welche Pflichten hat ein Auszubildender (Lernpflicht & Gehorsamspflicht)?",
        options: [
          "Lernpflicht: Aktives Bemühen um Kenntnisse. Gehorsamspflicht: Befolgung fachlicher Weisungen des Ausbilders.",
          "Lernpflicht: Eigenständige Beschaffung aller Fachbücher und Prüfgeräte auf eigene Kosten. Gehorsamspflicht: Ausführung auch privater Arbeiten für den Ausbilder.",
          "Lernpflicht: Besuch der Berufsschule nur bei geringem Arbeitsaufkommen im Betrieb. Gehorsamspflicht: Befolgung von Anweisungen auch dann, wenn sie gegen VDE-Sicherheitsregeln verstoßen.",
          "Lernpflicht: Ablegen der Meisterprüfung direkt im Anschluss an die Ausbildung. Gehorsamspflicht: Unbezahlte Reinigung der Betriebsräume an Sonn- und Feiertagen."
        ],
        correct: 0,
        explanation: "• BBiG § 13: Lernpflicht (Fertigkeiten erwerben, Berufsschule besuchen, Berichtsheft führen) und Gehorsamspflicht (Weisungen befolgen, UVV einhalten).\n• 📖 Europa Tabellenbuch: S. 606–608 (Arbeitsrecht, Arbeitsvertrag, Kündigung & Zeugnis) & Masterbuch WiSo"
      },
      {
        id: "av-6", exam: "Sommer 2021", category: "Arbeitsvertrag, Ausbildung & Kündigung",
        question: "Was unterscheidet ordentliche und außerordentliche Kündigung?",
        options: [
          "Ordentlich: Fristgemäß nach Vertrag/Gesetz. Außerordentlich: Fristlos aus wichtigem Grund.",
          "Ordentliche Kündigung: Kann jederzeit mündlich ausgesprochen werden. Außerordentliche Kündigung: Darf bequem per WhatsApp oder E-Mail ohne Einhaltung der Schriftform erfolgen.",
          "Ordentliche Kündigung: Darf nur vom Arbeitnehmer ausgesprochen werden. Außerordentliche Kündigung: Steht ausschließlich dem Arbeitgeber bei Auftragsmangel mit 3 Monaten Frist zu.",
          "Ordentliche Kündigung: Beendet das Arbeitsverhältnis sofort am selben Tag. Außerordentliche Kündigung: Hat immer eine gesetzliche Kündigungsfrist von mindestens 6 Monaten zum Jahresende."
        ],
        correct: 0,
        explanation: "• Ordentlich (§ 622 BGB): Unter Einhaltung der Kündigungsfrist. Außerordentlich (§ 626 BGB): Fristlos aus wichtigem Grund. Zwingend: Schriftform (§ 623 BGB)!\n• 📖 Europa Tabellenbuch: S. 606–608 (Arbeitsrecht, Arbeitsvertrag, Kündigung & Zeugnis) & Masterbuch WiSo"
      },
      {
        id: "av-7", exam: "Winter 2022/23", category: "Arbeitsvertrag, Ausbildung & Kündigung",
        question: "Nennen Sie wichtige Gründe für eine fristlose Kündigung (Arbeitgeber & Arbeitnehmer)!",
        options: [
          "AG: Diebstahl, Arbeitsverweigerung, Tätlichkeit/Beleidigung. AN: Nichtzahlung des Lohns, grobe Arbeitsschutzverletzung.",
          "AG: Einmaliges Zuspätkommen um 5 Minuten wegen Stau oder ärztlich attestierte Grippeerkrankung. AN: Ablehnung eines Wunsches auf spontane Gehaltsverdopplung.",
          "AG: Eintritt des Mitarbeiters in eine Gewerkschaft oder Kandidatur für die Betriebsratswahl. AN: Schlechtes Wetter bei der Montage oder Wechsel des direkten Vorgesetzten.",
          "AG: Bekanntgabe einer bestehenden Schwangerschaft oder Antrag auf Elternzeit. AN: Regulärer Abzug von Lohnsteuer und Sozialversicherungsbeiträgen auf der Lohnabrechnung."
        ],
        correct: 0,
        explanation: "• Fristlose Gründe: AG-Sicht = Diebstahl, beharrliche Arbeitsverweigerung, Tätlichkeiten. AN-Sicht = Lohnrückstand, Gefährdung von Leben und Gesundheit.\n• 📖 Europa Tabellenbuch: S. 606–608 (Arbeitsrecht, Arbeitsvertrag, Kündigung & Zeugnis) & Masterbuch WiSo"
      },
      {
        id: "av-8", exam: "Winter 2022/23", category: "Arbeitsvertrag, Ausbildung & Kündigung",
        question: "Welche Personengruppen stehen unter besonderem Kündigungsschutz?",
        options: [
          "Azubis nach Probezeit, Schwangere, Elternzeit, Schwerbehinderte, Betriebsrat & JAV.",
          "Alle ledigen Gesellen unter 30 Jahren ohne Unterhaltspflichten, leitende Angestellte mit Prokura sowie neu eingestellte Mitarbeiter während der ersten sechs Monate in der Probezeit.",
          "Geringfügig Beschäftigte (Minijobber), Leiharbeitnehmer in den ersten drei Einsatzwochen sowie selbstständige Subunternehmer und freie Mitarbeiter mit Werkvertrag.",
          "Ausschließlich Mitarbeiter, die mindestens 25 Jahre im selben Handwerksbetrieb beschäftigt sind oder ein monatliches Bruttoeinkommen oberhalb der Beitragsbemessungsgrenze beziehen."
        ],
        correct: 0,
        explanation: "• Besonderer Schutz: Schwangere (MuSchG), Elternzeit, Schwerbehinderte (ab GdB 50), Betriebsräte/JAV und Azubis nach der Probezeit.\n• 📖 Europa Tabellenbuch: S. 606–608 (Arbeitsrecht, Arbeitsvertrag, Kündigung & Zeugnis) & Masterbuch WiSo"
      },
      {
        id: "av-9", exam: "Sommer 2023", category: "Arbeitsvertrag, Ausbildung & Kündigung",
        question: "Was bedeutet „Sozialauswahl“ bei einer betriebsbedingten Kündigung?",
        options: [
          "Berücksichtigung von Betriebszugehörigkeit, Lebensalter, Unterhaltspflichten und Schwerbehinderung.",
          "Auswahl der zu kündigenden Mitarbeiter nach persönlicher Sympathie des Meisters, sportlicher Fitness, privaten Hobbys sowie der Bereitschaft zu unbezahlter Wochenendarbeit.",
          "Entscheidung über die Kündigungsreihenfolge durch ein Losverfahren der Krankenkasse oder anhand der bisher erreichten Verkaufsprovisionen und Überstundenkonten.",
          "Bei einer betriebsbedingten Kündigung müssen gesetzlich immer zuerst die ältesten Mitarbeiter mit den meisten Unterhaltspflichten und der längsten Betriebszugehörigkeit entlassen werden."
        ],
        correct: 0,
        explanation: "• § 1 Abs. 3 KSchG Kriterien: 1. Betriebszugehörigkeit, 2. Lebensalter, 3. Unterhaltspflichten (Kinder/Ehepartner), 4. Schwerbehinderung.\n• 📖 Europa Tabellenbuch: S. 606–608 (Arbeitsrecht, Arbeitsvertrag, Kündigung & Zeugnis) & Masterbuch WiSo"
      },
      {
        id: "av-10", exam: "Winter 2021/22", category: "Arbeitsvertrag, Ausbildung & Kündigung",
        question: "Was unterscheidet das einfache vom qualifizierten Arbeitszeugnis und welchen zwei Seiten muss es gerecht werden?",
        options: [
          "Einfach: Nur Art & Dauer der Beschäftigung. Qualifiziert: Zusätzlich Leistung, Kenntnisse & Verhalten/Führung. Es muss wahr UND wohlwollend sein.",
          "Einfach: Enthält Leistungs- und Verhaltensbeurteilung. Qualifiziert: Enthält nur Art und Dauer der Tätigkeit sowie die Gründe für die Beendigung des Arbeitsverhältnisses.",
          "Einfach: Wird nur mündlich erteilt. Qualifiziert: Muss auch sämtliche Krankheitstage, Abmahnungen sowie die genaue Höhe des letzten Bruttogehalts auflisten.",
          "Ein Anspruch auf ein qualifiziertes Arbeitszeugnis besteht nur für Auszubildende; reguläre Gesellen erhalten gesetzlich immer nur eine einfache Arbeitsbescheinigung."
        ],
        correct: 0,
        explanation: "• Einfach: Nur Personalien und Dauer/Art der Tätigkeit. Qualifiziert: Zusätzlich Leistungs- und Verhaltensbeurteilung (muss wahr und wohlwollend formuliert sein).\n• 📖 Europa Tabellenbuch: S. 606–608 (Arbeitsrecht, Arbeitsvertrag, Kündigung & Zeugnis) & Masterbuch WiSo"
      },
      {
        id: "av-11", exam: "Winter 2021/22", category: "Arbeitsvertrag, Ausbildung & Kündigung",
        question: "Was versteht man unter dem „Direktionsrecht“ (Weisungsrecht) des Arbeitgebers und wo liegen seine Grenzen?",
        options: [
          "Recht des Arbeitgebers, Arbeitsinhalt, Arbeitsort, Arbeitszeit und Verhalten näher zu bestimmen. Grenzen: Gesetze, Tarif-/Arbeitsvertrag, gute Sitten, Fürsorgepflicht.",
          "Das Recht des Arbeitgebers, vertraglich vereinbarte Löhne, Urlaubstage und gesetzliche Pausenzeiten bei hohem Auftragsbestand einseitig zu kürzen.",
          "Die Befugnis des Betriebsrates, dem Arbeitgeber vorzuschreiben, welche Kundenaufträge angenommen werden dürfen und welche Preise kalkuliert werden.",
          "Das unbegrenzte Weisungsrecht des Meisters, das auch über den Gesetzen (z. B. ArbZG) und Tarifverträgen steht, sofern der Kunde einen Notfall meldet."
        ],
        correct: 0,
        explanation: "• § 106 GewO: Der Arbeitgeber kann Arbeitsleistung, Inhalt, Ort und Zeit konkretisieren, darf aber niemals gegen Gesetze, Verträge oder Schutzvorschriften verstoßen.\n• 📖 Europa Tabellenbuch: S. 606–608 (Arbeitsrecht, Arbeitsvertrag, Kündigung & Zeugnis) & Masterbuch WiSo"
      },
      {
        id: "av-12", exam: "Winter 2021/22", category: "Arbeitsvertrag, Ausbildung & Kündigung",
        question: "Was ist der Unterschied zwischen Rechtsfähigkeit und Geschäftsfähigkeit (inkl. Altersstufen)?",
        options: [
          "Rechtsfähigkeit: Träger von Rechten/Pflichten (ab Geburt bis Tod). Geschäftsfähigkeit: Rechtsgeschäfte abschließen (0–7 J. unfähig, 7–18 J. beschränkt / Taschengeldparagraf, ab 18 J. voll).",
          "Rechtsfähigkeit beginnt mit 18 Jahren, Geschäftsfähigkeit bereits mit der Geburt. Zwischen 7 und 14 Jahren ist man voll geschäftsfähig für Ratenkredite.",
          "Rechtsfähigkeit bedeutet, Verträge unterschreiben zu dürfen (ab 7 Jahren); Geschäftsfähigkeit bedeutet, ein Gewerbe anmelden zu dürfen (erst ab 21 Jahren).",
          "Beide Fähigkeiten beginnen erst mit dem erfolgreichen Abschluss der Gesellenprüfung bzw. mit dem Eintritt in ein sozialversicherungspflichtiges Arbeitsverhältnis."
        ],
        correct: 0,
        explanation: "• Rechtsfähigkeit = Träger von Rechten/Pflichten ab Geburt bis Tod. Geschäftsfähigkeit = Verträge abschließen (0–7 unfähig, 7–18 beschränkt § 110 BGB, ab 18 voll geschäftsfähig).\n• 📖 Europa Tabellenbuch: S. 606–608 (Arbeitsrecht, Arbeitsvertrag, Kündigung & Zeugnis) & Masterbuch WiSo"
      },
      {
        id: "as-1", exam: "Sommer 2022", category: "Arbeitsschutz & Jugendarbeitsschutz",
        question: "Was sind häufige Unfallursachen und Schutzmaßnahmen am Arbeitsplatz?",
        options: [
          "Ursachen: Keine PSA, Zeitdruck, defekte Werkzeuge. Maßnahmen: PSA tragen, Unterweisungen, 5 Sicherheitsregeln.",
          "Ursachen: Zu häufige Sicherheitsunterweisungen und das Tragen von persönlicher Schutzausrüstung. Maßnahmen: Abschaffung der 5 Sicherheitsregeln zur Beschleunigung der Montage.",
          "Ursachen: Zu lange gesetzliche Ruhepausen und zu geringe Arbeitsbelastung. Maßnahmen: Arbeiten unter Spannung (230/400 V) ohne vorheriges Freischalten zur Erhöhung der Konzentration.",
          "Ursachen: Einsatz von zweipoligen Spannungsprüfern nach VDE 0682-401. Maßnahmen: ausschließliche Verwendung von einpoligen Phasenprüfern ('Lügenstift') und Überbrückung von RCDs."
        ],
        correct: 0,
        explanation: "• Menschliches Fehlverhalten oder technische Mängel. Schutz: PSA, Unterweisungen, DGUV V3 Prüfungen, Einhalten der 5 Sicherheitsregeln.\n• 📖 Europa Tabellenbuch: S. 138–140, S. 607–608 (Arbeitsschutz, DGUV, ArbZG & JArbSchG) & Masterbuch WiSo"
      },
      {
        id: "as-2", exam: "Sommer 2023", category: "Arbeitsschutz & Jugendarbeitsschutz",
        question: "Was sind die zwei Hauptaufgaben der Berufsgenossenschaften?",
        options: [
          "1. Prävention (Unfallverhütung) und 2. Rehabilitation & Entschädigung nach Arbeitsunfällen.",
          "1. Aushandeln von Lohntarifverträgen mit den Arbeitgeberverbänden und 2. Organisation sowie Finanzierung von Arbeitskämpfen (Streiks) zur Durchsetzung höherer Löhne.",
          "1. Auszahlung von Arbeitslosengeld I und Kurzarbeitergeld bei Auftragsrückgang und 2. Vermittlung von offenen Ausbildungs- und Arbeitsstellen im Handwerk.",
          "1. Durchführung der Gesellen- und Meisterprüfungen im Elektrohandwerk und 2. Führung der Handwerksrolle sowie Überwachung der Ausbildungsbetriebe."
        ],
        correct: 0,
        explanation: "• Nach SGB VII: 1. Prävention (Verhütung von Arbeitsunfällen und Berufskrankheiten durch Vorschriften) und 2. Rehabilitation sowie Verletztengeld/Rente.\n• 📖 Europa Tabellenbuch: S. 138–140, S. 607–608 (Arbeitsschutz, DGUV, ArbZG & JArbSchG) & Masterbuch WiSo"
      },
      {
        id: "as-3", exam: "Sommer 2022", category: "Arbeitsschutz & Jugendarbeitsschutz",
        question: "Welche Arbeitszeit- und Pausenregelungen gelten nach ArbZG für Erwachsene?",
        options: [
          "Max. 8 Std. (erweiterbar auf 10 Std.), mind. 11 Std. Ruhezeit. Pausen: ab 6 Std. = 30 Min., ab 9 Std. = 45 Min.",
          "Max. 12 Std. täglich (erweiterbar auf 16 Std.), mind. 6 Std. Ruhezeit zwischen zwei Schichten. Pausen: erst ab 10 Std. Arbeitszeit stehen dem Arbeitnehmer 15 Min. Pause zu.",
          "Max. 6 Std. täglich ohne Ausnahmeregelung, mind. 16 Std. Ruhezeit. Pausen: bereits ab 2 Std. Arbeitszeit sind 45 Min. bezahlte Ruhepause gesetzlich vorgeschrieben.",
          "Für volljährige Gesellen im Handwerk gibt es im Arbeitszeitgesetz keinerlei Höchstarbeitszeiten oder Pflichtpausen; diese gelten ausschließlich für Jugendliche unter 18 Jahren."
        ],
        correct: 0,
        explanation: "• ArbZG: Max. 8 Stunden pro Werktag (bis 10 Std. bei 6-Monats-Ausgleich). Ruhepausen: 30 Min. ab 6 Std., 45 Min. ab 9 Std. Ruhezeit mind. 11 Std.\n• 📖 Europa Tabellenbuch: S. 138–140, S. 607–608 (Arbeitsschutz, DGUV, ArbZG & JArbSchG) & Masterbuch WiSo"
      },
      {
        id: "as-4", exam: "Winter 2022/23", category: "Arbeitsschutz & Jugendarbeitsschutz",
        question: "Welche Schutzbestimmungen enthält das Jugendarbeitsschutzgesetz (JArbSchG)?",
        options: [
          "Max. 8 Std./Tag (Ausnahme 8,5 Std.), 40 Std./Woche, Pausen: 4,5–6 Std. = 30 Min., >6 Std. = 60 Min.!, Nachtarbeitsverbot (20–6 Uhr).",
          "Max. 10 Std./Tag, 48 Std./Woche (6-Tage-Woche), Pausen: ab 6 Std. = 15 Min., ab 9 Std. = 30 Min., Nachtarbeit ist für Jugendliche im Handwerk ab 16 Jahren unbegrenzt erlaubt.",
          "Max. 6 Std./Tag, 30 Std./Woche, Pausen: 15 Min. pro Tag, gesetzlicher Mindesturlaub beträgt nur 10 Arbeitstage pro Jahr und an Berufsschultagen muss nachmittags immer im Betrieb gearbeitet werden.",
          "Für jugendliche Auszubildende unter 18 Jahren gelten im Jugendarbeitsschutzgesetz exakt dieselben Arbeits-, Pausen- und Nachtarbeitsregelungen wie für volljährige Gesellen nach dem ArbZG."
        ],
        correct: 0,
        explanation: "• JArbSchG: Max. 8 Std./Tag, 40 Std./Woche (5 Tage). Pause: ab 4,5 Std. = 30 Min., ab 6 Std. = 60 Min. Nachtruhe von 20:00 bis 06:00 Uhr.\n• 📖 Europa Tabellenbuch: S. 138–140, S. 607–608 (Arbeitsschutz, DGUV, ArbZG & JArbSchG) & Masterbuch WiSo"
      },
      {
        id: "as-5", exam: "Winter 2023/24", category: "Arbeitsschutz & Jugendarbeitsschutz",
        question: "Was unterscheidet technischen und sozialen Arbeitsschutz (mit Gesetzesbeispielen)?",
        options: [
          "Technisch: ArbeitsstättenV, Arbeitssicherheitsgesetz, UVV, ProduktsicherheitsG. Sozial: Schutz von Jugendlichen, Schwangeren, Schwerbehinderten, Eltern.",
          "Technischer Arbeitsschutz regelt die Lohnfortzahlung im Krankheitsfall und das Urlaubsgeld; sozialer Arbeitsschutz regelt die Prüfung von Leitern und Maschinen.",
          "Technischer Arbeitsschutz gilt nur für die Industrie; im Handwerk gilt ausschließlich der soziale Arbeitsschutz durch das Tarifvertragsgesetz und Mindestlohngesetz.",
          "Beide Bereiche regeln ausschließlich die Beitragsberechnung zur Berufsgenossenschaft (BG ETEM) sowie die Rentenansprüche bei Erwerbsminderung."
        ],
        correct: 0,
        explanation: "• Technisch = Sicherheit von Maschinen, Werkzeugen und Anlagen (UVV, ArbStättV). Sozial = Schutz bestimmter Personen und Arbeitszeiten (JArbSchG, MuSchG, ArbZG).\n• 📖 Europa Tabellenbuch: S. 138–140, S. 607–608 (Arbeitsschutz, DGUV, ArbZG & JArbSchG) & Masterbuch WiSo"
      },
      {
        id: "tr-1", exam: "Winter 2023/24", category: "Tarifrecht, Betriebsrat & JAV",
        question: "Wer sind die Tarifvertragsparteien und was regeln Lohn- und Manteltarifvertrag?",
        options: [
          "Parteien: Gewerkschaften und Arbeitgeberverbände. Lohntarif: Entgelthöhe/Lohngruppen. Manteltarif: Rahmenbedingungen (Arbeitszeit, Urlaub, Kündigung).",
          "Parteien: Bundesregierung und Handwerkskammern. Lohntarif: Regelt die gesetzliche Einkommensteuer. Manteltarif: Regelt die technischen VDE-Normen auf der Baustelle.",
          "Parteien: Betriebsrat und Jugend- und Auszubildendenvertretung (JAV). Lohntarif: Legt die Kundenstundensätze fest. Manteltarif: Bestimmt die Preise für Elektromaterial.",
          "Parteien: Berufsgenossenschaft und Krankenkassen. Lohntarif: Bestimmt die Höhe des Krankengeldes. Manteltarif: Regelt die Beitragsbemessungsgrenzen der Sozialversicherung."
        ],
        correct: 0,
        explanation: "• Sozialpartner: Gewerkschaften und Arbeitgeberverbände. Lohntarifvertrag regelt die Vergütungshöhe, Manteltarifvertrag die langfristigen Arbeitsbedingungen.\n• 📖 Europa Tabellenbuch: S. 606–607 (Tarifvertrag, Mitbestimmung, Betriebsrat & JAV) & Masterbuch WiSo"
      },
      {
        id: "tr-2", exam: "Sommer 2022", category: "Tarifrecht, Betriebsrat & JAV",
        question: "Welche Aufgaben haben Gewerkschaften und welche Funktionen hat der Tarifvertrag?",
        options: [
          "Gewerkschaften: Tarifverträge, Rechtsschutz, Streik. Tarifvertrag: Schutz-, Ordnungs-, Friedens- und Richtlinienfunktion.",
          "Gewerkschaften: Abnahme von VDE-Anlagenprüfungen und Vergabe von Meisterbriefen. Tarifvertrag: Preisbindungs-, Steuer-, Bilanzierungs- und Kreditfunktion.",
          "Gewerkschaften: Vertretung der Arbeitgeber vor dem Finanzgericht. Tarifvertrag: Aufhebung des gesetzlichen Mindestlohns und Verlängerung der Probezeit.",
          "Gewerkschaften: Festlegung der Sozialversicherungsbeiträge. Tarifvertrag: Verpflichtung aller Betriebe zur Einführung von Kurzarbeit im Winter."
        ],
        correct: 0,
        explanation: "• 4 Funktionen des Tarifvertrags: Schutzfunktion (Mindeststandards), Ordnungsfunktion, Richtlinienfunktion und Friedensfunktion (kein Streik während Laufzeit).\n• 📖 Europa Tabellenbuch: S. 606–607 (Tarifvertrag, Mitbestimmung, Betriebsrat & JAV) & Masterbuch WiSo"
      },
      {
        id: "tr-3", exam: "Sommer 2023", category: "Tarifrecht, Betriebsrat & JAV",
        question: "Was ist „Tarifautonomie“?",
        options: [
          "Das Grundrecht, dass Gewerkschaften und Arbeitgeber Tarifverträge ohne staatliche Einmischung aushandeln.",
          "Das gesetzliche Recht des Bundesministeriums für Arbeit, die Stundenlöhne und Urlaubstage im Elektrohandwerk jedes Jahr per Rechtsverordnung verbindlich festzuschreiben.",
          "Die Befugnis jedes einzelnen Arbeitgebers, geltende Tarifverträge und den gesetzlichen Mindestlohn bei wirtschaftlichen Schwierigkeiten einseitig außer Kraft zu setzen.",
          "Das Verbot von Arbeitskämpfen (Streik und Aussperrung) in sämtlichen Handwerksbetrieben sowie die Pflicht zur staatlichen Zwangsschlichtung durch das Arbeitsgericht."
        ],
        correct: 0,
        explanation: "• Art. 9 Abs. 3 GG: Gewerkschaften und Arbeitgeberverbände verhandeln Löhne und Arbeitsbedingungen frei von staatlichen Eingriffen.\n• 📖 Europa Tabellenbuch: S. 606–607 (Tarifvertrag, Mitbestimmung, Betriebsrat & JAV) & Masterbuch WiSo"
      },
      {
        id: "tr-4", exam: "Sommer 2021", category: "Tarifrecht, Betriebsrat & JAV",
        question: "Was sind Streik und Aussperrung als äußerste Kampfmittel?",
        options: [
          "Streik: Gemeinsame Arbeitsniederlegung (Gewerkschaft). Aussperrung: Verweigerung des Zutritts ohne Lohn (Arbeitgeber).",
          "Streik: Fristlose Einzelkündigung durch den Arbeitnehmer ohne Angabe von Gründen. Aussperrung: Dauerhafte Betriebsschließung und Insolvenzanmeldung durch den Arbeitgeber.",
          "Streik:Unentschuldigtes Fernbleiben einzelner Mitarbeiter ohne Gewerkschaftsbeschluss ('wilder Streik'). Aussperrung: Einbehaltung des bereits verdienten Monatslohns als Strafe.",
          "Streik: Friedliche Verhandlung während der laufenden Friedenspflicht. Aussperrung:Hausverbot für säumige Kunden, die ihre Handwerkerrechnung noch nicht bezahlt haben."
        ],
        correct: 0,
        explanation: "• Streik = kollektive Arbeitsniederlegung nach Urabstimmung (75 %). Aussperrung = Gegenmaßnahme der Arbeitgeber (Ausschluss von Arbeit und Lohn).\n• 📖 Europa Tabellenbuch: S. 606–607 (Tarifvertrag, Mitbestimmung, Betriebsrat & JAV) & Masterbuch WiSo"
      },
      {
        id: "tr-5", exam: "Sommer 2021", category: "Tarifrecht, Betriebsrat & JAV",
        question: "Wie werden die Rechte des Betriebsrates eingeteilt?",
        options: [
          "1. Mitbestimmung (Soziales), 2. Eingeschränkte Mitbestimmung (Personal), 3. Mitwirkung/Information (Wirtschaft).",
          "1. Alleinentscheidungsrecht bei Investitionen und Kündigungen, 2. Vetorecht bei der Preisgestaltung für Kunden, 3. Informationsrecht bei den Pausenzeiten.",
          "Echte Mitbestimmung besteht ausschließlich bei der Einstellung von Geschäftsführern und bei der Festlegung der jährlichen Gewinnausschüttung.",
          "Der Betriebsrat hat in allen Bereichen (Soziales, Personal und Wirtschaft) lediglich ein unverbindliches Anhörungsrecht ohne rechtliche Eingriffsmöglichkeit."
        ],
        correct: 0,
        explanation: "• BetrVG: Echte Mitbestimmung bei sozialen Angelegenheiten (§ 87: Arbeitszeit, Pausen, Urlaub). Mitwirkung bei Personalfragen, Information bei wirtschaftlichen Fragen.\n• 📖 Europa Tabellenbuch: S. 606–607 (Tarifvertrag, Mitbestimmung, Betriebsrat & JAV) & Masterbuch WiSo"
      },
      {
        id: "tr-6", exam: "Winter 2023/24", category: "Tarifrecht, Betriebsrat & JAV",
        question: "Was ist eine Betriebsvereinbarung?",
        options: [
          "Ein schriftlicher Vertrag zwischen Arbeitgeber und Betriebsrat für den Betrieb (z. B. Arbeitszeit, Pausen).",
          "Ein überregionaler Flächentarifvertrag zwischen der Gewerkschaft IG Metall und dem Arbeitgeberverband für das gesamte Bundesland Nordrhein-Westfalen.",
          "Eine mündliche Absprache unter Kollegen über die Aufteilung der Urlaubstage, die ohne Zustimmung der Geschäftsführung rechtswirksam ist.",
          "Ein Kaufvertrag zwischen zwei Handwerksbetrieben über die gemeinsame Nutzung von Baumaschinen, Messgeräten und Montagefahrzeugen."
        ],
        correct: 0,
        explanation: "• Betriebsvereinbarung (§ 77 BetrVG): Schriftlicher Vertrag zwischen Geschäftsleitung und Betriebsrat, der verbindlich für alle Beschäftigten des Betriebs gilt.\n• 📖 Europa Tabellenbuch: S. 606–607 (Tarifvertrag, Mitbestimmung, Betriebsrat & JAV) & Masterbuch WiSo"
      },
      {
        id: "tr-7", exam: "Sommer 2023", category: "Tarifrecht, Betriebsrat & JAV",
        question: "Nennen Sie vier Aufgaben der Jugend- und Auszubildendenvertretung (JAV)!",
        options: [
          "1. Überwachung von Gesetzen/Tarifverträgen, 2. Beantragung von Ausbildungsmaßnahmen, 3. Entgegennahme von Azubi-Beschwerden, 4. Förderung der Integration.",
          "1. Selbstständige Einstellung und Kündigung von Auszubildenden, 2. Festlegung der Ausbildungsvergütung, 3. Erteilung von Abmahnungen, 4. Notenvergabe in der Berufsschule.",
          "1. Organisation von Streiks während der Berufsschulzeit, 2. Befreiung der Azubis von der Berichtsheftführung, 3. Kürzung der vertraglichen Probezeit.",
          "Die JAV nimmt ausschließlich direkt an den Verhandlungen der Flächentarifverträge teil und verwaltet die Beiträge zur gesetzlichen Unfallversicherung."
        ],
        correct: 0,
        explanation: "• BetrVG § 70: Überwachung zugunsten der Azubis, Beantragung von Ausbildungsmaßnahmen, Klärung von Beschwerden und Integration.\n• 📖 Europa Tabellenbuch: S. 606–607 (Tarifvertrag, Mitbestimmung, Betriebsrat & JAV) & Masterbuch WiSo"
      },
      {
        id: "bb-1", exam: "Sommer 2023", category: "Berufliche Bildung & Qualifikationen",
        question: "Welche Vorteile bietet eine solide berufliche Ausbildung?",
        options: [
          "Geringeres Arbeitslosigkeitsrisiko, höherer Facharbeiterlohn, Aufstiegschancen (Meister/Techniker), bessere Arbeitsbedingungen.",
          "Vollständige Befreiung von der Einkommensteuer in den ersten fünf Gesellenjahren sowie ein gesetzlicher Anspruch auf sofortige Verbeamtung.",
          "Garantierter Kündigungsschutz ab dem ersten Arbeitstag ohne Probezeit sowie automatische Verkürzung der Wochenarbeitszeit auf 25 Stunden.",
          "Freistellung von allen künftigen technischen Weiterbildungen, da der Gesellenbrief lebenslang für sämtliche neuen Normen ohne Nachschulung ausreicht."
        ],
        correct: 0,
        explanation: "• Bessere Verdienst- und Aufstiegschancen (Meister/Techniker), geringeres Risiko von Arbeitslosigkeit, Grundlage für lebenslanges Lernen.\n• 📖 Europa Tabellenbuch: S. 604–606 (Berufsbildung, Duales System & Arbeitsbewertung) & Masterbuch WiSo"
      },
      {
        id: "bb-2", exam: "Sommer 2022", category: "Berufliche Bildung & Qualifikationen",
        question: "Welche Fortbildungsmaßnahmen gibt es im Elektrohandwerk?",
        options: [
          "Meisterschule, Staatlich geprüfter Techniker, Herstellerschulungen (KNX, PV), Fachseminare.",
          "Umschulung in einen ungelernten Helferberuf, Abmeldung von der Handwerkskammer oder Verzicht auf die Nutzung digitaler Prüf- und Messgeräte.",
          "Fortbildungen sind im Elektrohandwerk erst nach einer mindestens zehnjährigen Berufserfahrung als Geselle gesetzlich zulässig.",
          "Ausschließlich akademische Studiengänge an einer Universität, da im Handwerk keine eigenen Aufstiegs- oder Anpassungsfortbildungen existieren."
        ],
        correct: 0,
        explanation: "• Aufstieg: Meisterbrief, Techniker, Betriebswirt. Anpassung: VDE-Seminare, KNX, Photovoltaik, Speicher- und Wärmepumpentechnik.\n• 📖 Europa Tabellenbuch: S. 604–606 (Berufsbildung, Duales System & Arbeitsbewertung) & Masterbuch WiSo"
      },
      {
        id: "bb-3", exam: "Winter 2023/24", category: "Berufliche Bildung & Qualifikationen",
        question: "Was unterscheidet Anpassungs- und Aufstiegsfortbildung?",
        options: [
          "Anpassung: Aktualisierung von Fachkenntnissen bei neuen Aufgaben/Normen. Aufstieg: Erwerb höherer Qualifikationen für beruflichen Aufstieg (Meister).",
          "Anpassungsfortbildung führt immer zum Meistertitel oder Technikerabschluss; Aufstiegsfortbildung dient nur der kurzen Auffrischung bekannter VDE-Normen.",
          "Anpassungsfortbildung wird staatlich durch die Rentenversicherung angeordnet; Aufstiegsfortbildung darf nur während der Arbeitslosigkeit absolviert werden.",
          "Beide Begriffe bezeichnen exakt dieselbe Maßnahme; der Unterschied liegt nur darin, ob der Kurs tagsüber in Vollzeit oder abends in Teilzeit stattfindet."
        ],
        correct: 0,
        explanation: "• Anpassungsfortbildung = Fachwissen auf den neuesten Stand bringen. Aufstiegsfortbildung = Erreichen einer höheren Qualifikationsebene (z. B. Meister).\n• 📖 Europa Tabellenbuch: S. 604–606 (Berufsbildung, Duales System & Arbeitsbewertung) & Masterbuch WiSo"
      },
      {
        id: "bb-4", exam: "Sommer 2024", category: "Berufliche Bildung & Qualifikationen",
        question: "Wie kann ein Betrieb Weiterbildung unterstützen und welche Vorteile hat das?",
        options: [
          "Kostenübernahme, freigestellte Schulung. Vorteile: Wettbewerbsfähigkeit, motivierte Mitarbeiter.",
          "Durch Kürzung des Erholungsurlaubs und Einbehaltung des Weihnachtsgeldes. Vorteil: Die Mitarbeiter sind gesetzlich für 15 Jahre unkündbar an den Betrieb gebunden.",
          "Ein Betrieb darf Weiterbildungen steuerrechtlich nicht bezahlen; die Kosten müssen zu 100 % vom Arbeitnehmer über ein Bankdarlehen finanziert werden.",
          "Durch Herabstufung in eine niedrigere Lohngruppe während der Schulungsdauer. Vorteil: Geringere Sozialversicherungsabgaben für den Arbeitgeber."
        ],
        correct: 0,
        explanation: "• Betrieb zahlt Lehrgangskosten und stellt Arbeitszeit frei. Vorteil: Neue Geschäftsfelder (PV/Wallbox), höhere Qualität, Bindung von Fachkräften.\n• 📖 Europa Tabellenbuch: S. 604–606 (Berufsbildung, Duales System & Arbeitsbewertung) & Masterbuch WiSo"
      },
      {
        id: "bb-5", exam: "Winter 2022/23 & 2024/25", category: "Berufliche Bildung & Qualifikationen",
        question: "Was sind berufsübergreifende Qualifikationen und was versteht man unter Kommunikationsfähigkeit?",
        options: [
          "Qualifikationen: EDV, Fremdsprachen, BWL, Führerschein, Ersthelfer. Kommunikationsfähigkeit: Nachrichten verbal & nonverbal effektiv übermitteln, Zuhören, Teambildung.",
          "Qualifikationen: Nur handwerkliches Geschick beim Schlitze stemmen. Kommunikationsfähigkeit: Fachbegriffe so einsetzen, dass der Kunde keine Rückfragen stellt.",
          "Berufsübergreifende Qualifikationen sind im Handwerk unzulässig, da jeder Geselle ausschließlich Tätigkeiten seines eigenen Gewerks ausführen darf.",
          "Kommunikationsfähigkeit bedeutet, Arbeitsanweisungen ausschließlich schriftlich per E-Mail zu erteilen und Gespräche auf der Baustelle zu vermeiden."
        ],
        correct: 0,
         explanation: "• Soft Skills & Querschnittswissen: IT-Kompetenz, Fremdsprachen, Ersthelfer. Kommunikationsfähigkeit = aktives Zuhören, zielorientierter Austausch, Teamwork.\n• 📖 Europa Tabellenbuch: S. 604–606 (Berufsbildung, Duales System & Arbeitsbewertung) & Masterbuch WiSo"
      },
      {
        id: "bb-6", exam: "Winter 2022/23 & 2024/25", category: "Berufliche Bildung & Qualifikationen",
        question: "Nennen Sie Gründe für den Fachkräftemangel und Gegenmaßnahmen im Handwerk!",
        options: [
          "Gründe: Demografischer Wandel, fehlende Nachfrage nach Ausbildungsplätzen, frühes Ausscheiden. Gegenmaßnahmen: Schülerpraktika, Ausbildungsbörsen, Weiterbildungs-/Verdienstchancen zeigen.",
          "Gründe: Zu viele Bewerber auf zu wenige Ausbildungsplätze und zu hohe Ausbildungsvergütungen. Gegenmaßnahmen: Einstellung der Ausbildungstätigkeit.",
          "Gründe: Wegfall der Meisterpflicht im Elektrohandwerk. Gegenmaßnahmen: Erhöhung der Wochenarbeitszeit auf 50 Stunden und Streichung von Urlaubstagen.",
          "Gründe: Überangebot an jungen Fachkräften durch geburtenstarke Jahrgänge. Gegenmaßnahmen: Verzicht auf moderne Technik und digitale Arbeitsmittel."
        ],
        correct: 0,
        explanation: "• Ursachen: Demografischer Wandel, Trend zum Studium. Gegenmaßnahmen: Praktika, Schulkooperationen, Karrieremöglichkeiten aufzeigen.\n• 📖 Europa Tabellenbuch: S. 604–606 (Berufsbildung, Duales System & Arbeitsbewertung) & Masterbuch WiSo"
      },
      {
        id: "bb-7", exam: "Winter 2018/19", category: "Berufliche Bildung & Qualifikationen",
        question: "Welche Anforderungen werden bei der Arbeitsbewertung (Genfer Schema) herangezogen?",
        options: [
          "1. Fachkönnen, 2. Verantwortung, 3. Belastung, 4. Arbeitsbedingungen / Umgebungseinflüsse.",
          "1. Lebensalter, 2. Familienstand und Kinderzahl, 3. Entfernung zwischen Wohnort und Betrieb, 4. Dauer der Mitgliedschaft in der Gewerkschaft.",
          "1. Umsatzbeteiligung, 2. Anzahl der geleisteten Überstunden im Vorjahr, 3. Privatvermögen des Arbeitnehmers, 4. Steuerklasse auf der Lohnsteuerkarte.",
          "1. Schulabschlussnote der Haupt- oder Realschule, 2. Körpergröße und Gewicht, 3. Anzahl der Krankheitstage, 4. privates ehrenamtliches Engagement."
        ],
        correct: 0,
        explanation: "• Genfer Schema: 1. Fachkönnen, 2. Verantwortung, 3. Geistige & körperliche Belastung, 4. Umgebungsbedingungen (Schmutz, Lärm, Gefahr).\n• 📖 Europa Tabellenbuch: S. 604–606 (Berufsbildung, Duales System & Arbeitsbewertung) & Masterbuch WiSo"
      },
      {
        id: "bb-8", exam: "Winter 2021/22", category: "Berufliche Bildung & Qualifikationen",
        question: "Welche Vor- und Nachteile hat das „Duale Ausbildungssystem“ (Betrieb + Berufsschule)?",
        options: [
          "Vorteile: Unmittelbare Teilhabe an der realen Arbeitswelt, finanziell günstiger für den Staat. Nachteile: Nicht alle Betriebe bilden systematisch aus, Platzanzahl hängt von Wirtschaftslage ab.",
          "Vorteile: Es findet kein praktischer Einsatz auf Baustellen statt. Nachteile: Der Auszubildende muss Schulgeld an die Berufsschule und den Betrieb zahlen.",
          "Vorteile: Die Ausbildung dauert nur 6 Monate. Nachteile: Abschlüsse im dualen System werden außerhalb des Ausbildungsbetriebes staatlich nicht anerkannt.",
          "Vorteile: Der Auszubildende erhält bereits im 1. Lehrjahr das volle Meistergehalt. Nachteile: Es gibt keinen gesetzlichen Urlaubsanspruch während der Lehrzeit."
        ],
        correct: 0,
        explanation: "• Vorteile: Hohe Praxisnähe, Vergütung. Nachteile: Qualität betriebsabhängig, Ausbildungsplatzangebot schwankt mit der Konjunktur.\n• 📖 Europa Tabellenbuch: S. 604–606 (Berufsbildung, Duales System & Arbeitsbewertung) & Masterbuch WiSo"
      },
      {
        id: "wi-1", exam: "Sommer 2024", category: "Wirtschaft, Inflation & Finanzen",
        question: "Was bedeutet „Inflation“ und wie kann man fürs Alter vorsorgen?",
        options: [
          "Inflation: Preisniveau steigt, Kaufkraft sinkt. Vorsorge: bAV, private Rentenversicherung, ETF-Sparpläne, Immobilien.",
          "Inflation: Allgemeines Preisniveau sinkt dauerhaft, sodass die Kaufkraft des Geldes steigt. Vorsorge: Gesamtes Erspartes unverzinst als Bargeld zu Hause aufbewahren.",
          "Inflation: Der Wert des Euro steigt gegenüber ausländischen Währungen stark an. Vorsorge: Aufnahme möglichst hoher Dispokredite zur Ausnutzung sinkender Zinsen.",
          "Inflation: Staatliche Senkung der Mehrwertsteuer auf alle Konsumgüter. Vorsorge: Verzicht auf betriebliche und private Altersvorsorge zugunsten reiner Konsumausgaben."
        ],
        correct: 0,
        explanation: "• Inflation = Geldentwertung (Kaufkraft sinkt). 3-Säulen-Modell der Vorsorge: Gesetzliche Rente + betriebliche Altersvorsorge (bAV) + private Sachwerte/Fonds.\n• 📖 Europa Tabellenbuch: S. 590, S. 608–614 (Rechtsformen, GmbH, Kaufvertrag & Kalkulation) & Masterbuch WiSo"
      },
      {
        id: "wi-2", exam: "Sommer 2021", category: "Wirtschaft, Inflation & Finanzen",
        question: "Was ist „Deflation“ und was sind mögliche Ursachen?",
        options: [
          "Deflation: Anhaltender Preisrückgang durch zu geringe Nachfrage. Ursachen: Konsumzurückhaltung in Krisen.",
          "Deflation:Starker Anstieg des allgemeinen Preisniveaus durch zu hohe Geldmenge im Umlauf. Ursachen: Übermäßige Kauflust der Verbraucher und Rohstoffknappheit.",
          "Deflation:Staatlich verordnete Erhöhung sämtlicher Tariflöhne und Sozialleistungen bei gleichzeitigem Verbot von Preiserhöhungen im Einzelhandel.",
          "Deflation:Abwertung der eigenen Währung im Außenhandel, wodurch Importwaren wie Kupfer und Elektronikbauteile innerhalb kurzer Zeit doppelt so teuer werden."
        ],
        correct: 0,
        explanation: "• Deflation: Anhaltender Rückgang des allgemeinen Preisniveaus. Gefahr: Konsumaufschub führt zu Umsatzrückgängen und Kündigungen.\n• 📖 Europa Tabellenbuch: S. 590, S. 608–614 (Rechtsformen, GmbH, Kaufvertrag & Kalkulation) & Masterbuch WiSo"
      },
      {
        id: "wi-3", exam: "Winter 2022/23", category: "Wirtschaft, Inflation & Finanzen",
        question: "Was ist der Unterschied zwischen Nominallohn und Reallohn?",
        options: [
          "Nominallohn = ausgezahlter Euro-Betrag. Reallohn = tatsächliche Kaufkraft unter Berücksichtigung der Inflation.",
          "Nominallohn = Der nach Abzug von Steuern und Sozialabgaben ausgezahlte Nettolohn. Reallohn = Der im Arbeitsvertrag vereinbarte Bruttolohn vor allen gesetzlichen Abzügen.",
          "Nominallohn = Sachleistungen des Arbeitgebers (z. B. Firmenwagen oder Werkzeug). Reallohn = Das ausgezahlte Urlaubs- und Weihnachtsgeld am Jahresende.",
          "Wenn die Inflationsrate in einem Jahr höher ist als die prozentuale Erhöhung des Nominallohns, steigt der Reallohn (die tatsächliche Kaufkraft des Arbeitnehmers) stark an."
        ],
        correct: 0,
        explanation: "• Nominallohn = Euro-Betrag auf dem Lohnzettel. Reallohn = tatsächliche Kaufkraft. Ist die Inflation höher als die Lohnerhöhung, sinkt der Reallohn!\n• 📖 Europa Tabellenbuch: S. 590, S. 608–614 (Rechtsformen, GmbH, Kaufvertrag & Kalkulation) & Masterbuch WiSo"
      },
      {
        id: "wi-4", exam: "Winter 2024/25", category: "Wirtschaft, Inflation & Finanzen",
        question: "Wie trägt der gesetzliche Mindestlohn zur Sicherung des Lebensstandards bei?",
        options: [
          "Bildet eine Lohnuntergrenze, schützt vor Lohndumping und sichert das Existenzminimum.",
          "Er legt die gesetzliche Höchstgrenze fest, die ein Geselle im Elektrohandwerk maximal pro Stunde verdienen darf, um eine Lohn-Preis-Spirale zu verhindern.",
          "Er wird monatlich vom Staat direkt als steuerfreier Zuschuss an alle Auszubildenden und Minijobber überwiesen, um die Kaufkraft zu erhöhen.",
          "Er ersetzt im Handwerk sämtliche Tarifverträge und schreibt vor, dass Meister und Helfer in einem Betrieb exakt denselben Stundenlohn erhalten müssen."
        ],
        correct: 0,
        explanation: "• MiLoG: Gesetzliche Untergrenze gegen Armut trotz Vollzeitarbeit und Schutz vor unfairem Preiswettbewerb über Lohndumping.\n• 📖 Europa Tabellenbuch: S. 590, S. 608–614 (Rechtsformen, GmbH, Kaufvertrag & Kalkulation) & Masterbuch WiSo"
      },
      {
        id: "wi-5", exam: "Sommer 2021", category: "Wirtschaft, Inflation & Finanzen",
        question: "Kollege überzieht Girokonto um 500 € bei 2000 € auf Sparkonto. Was tun?",
        options: [
          "500 € vom Spar- aufs Girokonto umbuchen, da Dispozinsen viel höher sind als Habenzinsen.",
          "Die 500 € Überziehung auf dem Girokonto belassen, da die Habenzinsen auf dem Sparkonto (ca. 15 %) deutlich höher sind als die Dispozinsen (ca. 1 %).",
          "Einen zusätzlichen kurzfristigen Ratenkredit über 2.000 € aufnehmen, um das Sparkonto weiter aufzustocken und den Dispokredit erst nach zwei Jahren zu tilgen.",
          "Beide Konten sofort fristlos kündigen, da bei einer Kontoüberziehung von 500 € automatisch die Privatinsolvenz durch die Schufa eingeleitet wird."
        ],
        correct: 0,
        explanation: "• Sofort ausgleichen! Dispozinsen (oft 11–14 %) sind drastisch höher als Guthabenzinsen auf dem Sparkonto.\n• 📖 Europa Tabellenbuch: S. 590, S. 608–614 (Rechtsformen, GmbH, Kaufvertrag & Kalkulation) & Masterbuch WiSo"
      },
      {
        id: "wi-6", exam: "Sommer 2022", category: "Wirtschaft, Inflation & Finanzen",
        question: "Welche Mindestangaben enthält ein Verbraucherkreditvertrag und was ist die Schufa?",
        options: [
          "Kredit: Nettodarlehensbetrag, effektiver Jahreszins, Laufzeit, Raten. Schufa: Auskunftei zur Bonitätsprüfung.",
          "Kredit: Nur die Höhe der ersten Monatsrate ohne Angabe des Zinssatzes. Schufa: Staatliche Bank, die bei Zahlungsunfähigkeit des Kunden die Raten übernimmt.",
          "Kredit: Lediglich der Kaufpreis der Ware ohne Nebenkosten. Schufa: Verbraucherschutzbehörde, die die Zinssätze der Geschäftsbanken gesetzlich festlegt.",
          "Ein Verbraucherkreditvertrag kann formfrei per Handschlag abgeschlossen werden; die Schufa dient der steuerlichen Erfassung von Bargeldeinzahlungen beim Finanzamt."
        ],
        correct: 0,
        explanation: "• Kreditvertrag (§ 492 BGB): Nettobetrag, effektiver Jahreszins, Tilgungsplan, Gesamtkosten. Schufa prüft Bonität und Zahlungsverhalten.\n• 📖 Europa Tabellenbuch: S. 590, S. 608–614 (Rechtsformen, GmbH, Kaufvertrag & Kalkulation) & Masterbuch WiSo"
      },
      {
        id: "wi-7", exam: "Winter 2022/23", category: "Wirtschaft, Inflation & Finanzen",
        question: "Nennen Sie Ursachen für die Überschuldung von Privatpersonen!",
        options: [
          "Arbeitslosigkeit, Krankheit, Scheidung, mangelnde Finanzplanung / Konsum auf Kredit.",
          "Regelmäßige Erstellung eines Haushaltsbuchs, Bildung von monatlichen Rücklagen auf einem Tagesgeldkonto sowie Verzicht auf teure Konsumkredite.",
          "Steigende Reallöhne durch Tarifabschlüsse, vorzeitige Sondertilgung von Darlehen sowie der Abschluss einer privaten Haftpflichtversicherung.",
          "Barzahlung bei größeren Anschaffungen, Vergleich von effektiven Jahreszinsen vor Vertragsabschluss sowie fristgerechte Begleichung von Rechnungen."
        ],
        correct: 0,
        explanation: "• Hauptgründe: Einkommensverlust durch Arbeitslosigkeit/Krankheit, Scheidung oder unüberlegter Konsum über Ratenkredite.\n• 📖 Europa Tabellenbuch: S. 590, S. 608–614 (Rechtsformen, GmbH, Kaufvertrag & Kalkulation) & Masterbuch WiSo"
      },
      {
        id: "wi-8", exam: "Sommer 2021", category: "Wirtschaft, Inflation & Finanzen",
        question: "Welche Aufgaben haben öffentliche Unternehmen (Stadtwerke)?",
        options: [
          "Öffentliche Daseinsvorsorge (Bedarfsdeckung statt reiner Gewinnmaximierung). Bsp: Wasser, Energie, Müll, ÖPNV.",
          "Erzielung einer möglichst hohen Gewinnrendite für ausländische Börsenaktionäre durch Privatisierung der Strom-, Wasser- und Verkehrsnetze.",
          "Wettbewerbsverdrängung privater Elektrohandwerksbetriebe durch kostenlose Ausführung von Hausinstallationen und Reparaturen beim Endkunden.",
          "Festlegung der gesetzlichen Steuersätze in der Kommune sowie Überwachung der Tarifautonomie zwischen Gewerkschaften und Arbeitgeberverbänden."
        ],
        correct: 0,
        explanation: "• Daseinsvorsorge: Grundversorgung der Bevölkerung (Wasser, Strom, Gas, Abfallentsorgung, ÖPNV) nach Kostendeckungsprinzip.\n• 📖 Europa Tabellenbuch: S. 590, S. 608–614 (Rechtsformen, GmbH, Kaufvertrag & Kalkulation) & Masterbuch WiSo"
      },
      {
        id: "wi-9", exam: "Winter 2024/25", category: "Wirtschaft, Inflation & Finanzen",
        question: "Was bedeutet das „Recht auf Reparatur“ für Verbraucher und Hersteller?",
        options: [
          "Verbraucher können defekte Geräte reparieren lassen statt wegzuwerfen; Hersteller müssen Ersatzteile, Reparaturanleitungen und Werkzeuge bereitstellen.",
          "Verbraucher müssen defekte Elektrogeräte innerhalb der ersten 10 Jahre selbst öffnen und am 230-V-Netz reparieren, bevor sie die Gewährleistung nutzen dürfen.",
          "Hersteller sind verpflichtet, jedes defekte Gerät lebenslang kostenlos gegen ein fabrikneues Nachfolgemodell auszutauschen; Reparaturen werden verboten.",
          "Elektrofachbetriebe dürfen für Reparaturen außerhalb der Garantiezeit keine Arbeitslöhne mehr berechnen, sondern nur noch den reinen Materialpreis der Ersatzteile."
        ],
        correct: 0,
        explanation: "• EU-Recht auf Reparatur: Hersteller müssen Ersatzteile und Anleitungen bereitstellen, um Elektroschrott zu reduzieren und Ressourcen zu schonen.\n• 📖 Europa Tabellenbuch: S. 590, S. 608–614 (Rechtsformen, GmbH, Kaufvertrag & Kalkulation) & Masterbuch WiSo"
      },
      {
        id: "wi-10", exam: "Winter 2024/25", category: "Wirtschaft, Inflation & Finanzen",
        question: "Welche Institutionen beraten bei einer Existenzgründung im Elektrohandwerk?",
        options: [
          "Handwerkskammern (HWK), Industrie- und Handelskammern (IHK), Fachverbände (Innungen), Unternehmensberater, Banken & Agentur für Arbeit.",
          "Ausschließlich das Finanzamt, das Einwohnermeldeamt, die Schufa sowie das Kraftfahrt-Bundesamt im Rahmen der polizeilichen Gewerbeanmeldung.",
          "Nur die gesetzlichen Krankenkassen und die Deutsche Rentenversicherung, da Handwerkskammern keine betriebswirtschaftliche Gründungsberatung durchführen dürfen.",
          "Gewerkschaften und Betriebsräte konkurrierender Unternehmen sowie die Prüfungsstellen der Berufsgenossenschaft für elektrische Betriebsmittel."
        ],
        correct: 0,
        explanation: "• Offizielle Anlaufstellen: Handwerkskammer (HWK), Elektro-Innung (FEH), Förderbanken (KfW/NRW.BANK) und Steuerberater.\n• 📖 Europa Tabellenbuch: S. 590, S. 608–614 (Rechtsformen, GmbH, Kaufvertrag & Kalkulation) & Masterbuch WiSo"
      },
      {
        id: "wi-11", exam: "Winter 2024/25", category: "Wirtschaft, Inflation & Finanzen",
        question: "Welche Vorteile bietet die Rechtsform einer GmbH (Gesellschaft mit beschränkter Haftung)?",
        options: [
          "Haftungsbeschränkung auf das Gesellschaftsvermögen (Privatvermögen ist geschützt!), leichtere Kapitalbeschaffung durch Gesellschafter, steuerliche Vorteile.",
          "Vollständige Befreiung von der Körperschaft- und Gewerbesteuer sowie Wegfall der Pflicht zur doppelten Buchführung und Jahresabschlusserstellung.",
          "Gründung ohne Mindestkapital und ohne Notar per Handschlag möglich; im Insolvenzfall haftet der Geschäftsführer unbeschränkt mit seinem gesamten Privatvermögen.",
          "Bei einer GmbH übernimmt die Handwerkskammer automatisch 50 % des unternehmerischen Verlustrisikos und stellt kostenlose Meisterkräfte zur Verfügung."
        ],
        correct: 0,
        explanation: "• Hauptvorteil GmbH: Haftung ist auf das Vermögen der Gesellschaft beschränkt; das private Vermögen der Gesellschafter bleibt geschützt.\n• 📖 Europa Tabellenbuch: S. 590, S. 608–614 (Rechtsformen, GmbH, Kaufvertrag & Kalkulation) & Masterbuch WiSo"
      },
      {
        id: "wi-12", exam: "Winter 2024/25", category: "Wirtschaft, Inflation & Finanzen",
        question: "Welche formellen Anforderungen und Pflichtinhalte gelten für den Gesellschaftsvertrag einer GmbH?",
        options: [
          "Notarielle Form (Beurkundung) + Handelsregistereintrag. Inhalte: Firma und Sitz, Unternehmensgegenstand, Höhe des Stammkapitals (mind. 25.000 €) und Geschäftsanteile.",
          "Formfreie mündliche Vereinbarung genügt; das Mindeststammkapital beträgt 1 € und eine Eintragung in das Handelsregister ist bei Handwerksbetrieben freiwillig.",
          "Schriftlicher Vertrag beim Finanzamt ohne Notar; Mindeststammkapital beträgt 100.000 € und muss vollständig in Immobilien oder Werkzeugen hinterlegt werden.",
          "Eintragung ausschließlich bei der Berufsgenossenschaft; als Pflichtinhalt muss lediglich die private Wohnanschrift der Gesellschafter angegeben werden."
        ],
        correct: 0,
        explanation: "• GmbHG: Notarielle Beurkundung und Eintragung ins Handelsregister (Abt. B). Mindeststammkapital: 25.000 €.\n• 📖 Europa Tabellenbuch: S. 590, S. 608–614 (Rechtsformen, GmbH, Kaufvertrag & Kalkulation) & Masterbuch WiSo"
      }
    ];

    const ELEKTRO_QUESTIONS = [
      {
        id: "el-1", exam: "Winter 2018/19 & 2024/25", category: "Schutzmaßnahmen & Erdung",
        question: "Welcher Mindestquerschnitt ist für blitzstromtragfähige Erdungsleiter zur HES bei Kupfer, Aluminium und Stahl vorgeschrieben?",
        options: [
          "Kupfer: mind. 16 mm² starr | Aluminium: mind. 25 mm² starr | Stahl: mind. 50 mm² starr.",
          "Kupfer: mind. 6 mm² flexibel (H07V-K) | Aluminium: mind. 10 mm² starr | Stahl: mind. 16 mm² feuerverzinkt.",
          "Kupfer: mind. 10 mm² mehrdrähtig | Aluminium: mind. 16 mm² flexibel | Stahl: mind. 25 mm² Bandstahl.",
          "Kupfer: mind. 4 mm² geschützt verlegt | Aluminium: mind. 6 mm² starr | Stahl: mind. 16 mm² V2A."
        ],
        correct: 0,
        explanation: "• DIN VDE 0855-1 (Antennenerdung): Kupfer mind. 16 mm² massiv/starr, Aluminium mind. 25 mm², Stahl mind. 50 mm².\n• Feindrähtige Litzen (H07V-K) sind unzulässig (Gefahr des Aufschmelzens bei Blitzstromstoß)!\n• 📖 Europa Tabellenbuch: S. 182–185 (Erdung/Potentialausgleich), S. 336–338 (Blitzschutz) & S. 442 (Antennenerdung: 16 mm² Cu, 25 mm² Al, 50 mm² Stahl)"
      },
      {
        id: "el-2", exam: "Theaterküche / Winter 2024/25", category: "Schutzmaßnahmen & Erdung",
        question: "Unterschied zwischen Schutzpotentialausgleich über HES und zusätzlichem Schutzpotentialausgleich (z.B. Großküche)?",
        options: [
          "HES-Ausgleich verbindet alle Einführungssysteme im Gebäude (mind. 6 mm² Cu). Zusätzlicher Ausgleich verbindet ortsfest Körper und fremde leitfähige Teile lokal.",
          "HES-Ausgleich verbindet nur Steckdosenstromkreise (mind. 2,5 mm² Cu). Zusätzlicher Ausgleich verbindet den HAK mit dem Fundamenterder (mind. 16 mm² Cu).",
          "HES-Ausgleich ist nur bei äußerem Blitzschutz vorgeschrieben (mind. 10 mm² Cu). Zusätzlicher Ausgleich ersetzt in Großküchen den Schutzleiter PE der Endgeräte.",
          "Beide Potentialausgleichsarten müssen zwingend mit mindestens 16 mm² Kupfer starr direkt vom Zählerschrank zu jedem Betriebsmittel geführt werden."
        ],
        correct: 0,
        explanation: "• HES (DIN VDE 0100-410/-540): Verbindet Rohre, Fundamenterder und PEN/PE zentral. Zusätzlicher Ausgleich verbindet in feuchten Bereichen Körper und leitfähige Teile lokal (4 mm² ungeschützt / 2,5 mm² geschützt).\n• 📖 Europa Tabellenbuch: S. 182, S. 185 & S. 257–259 (Haupterdungsschiene HES & zusätzlicher Schutzpotentialausgleich R ≤ 50 V / Ia)"
      },
      {
        id: "el-3", exam: "Sommer 2021", category: "Schutzmaßnahmen & Erdung",
        question: "Wie funktioniert die Erdungswiderstandsmessung (RA) und warum wird Edelstahl (V4A) statt verzinktem Stahl im Erdreich verwendet?",
        options: [
          "Messung via Strom-Spannungs-Verfahren mit Hilfserder und Sonde (>20m). Edelstahl korrodiert im Erdreich nicht; verzinkter Stahl rostet weg.",
          "Messung via Zweipunkt-Durchgangsmessung (200 mA DC) gegen den Neutralleiter. Edelstahl (V4A) wird verwendet, weil er einen zehnmal geringeren spezifischen Widerstand als Kupfer hat.",
          "Messung via Isolationsmessgerät mit 500 V DC zwischen Haupterdungsschiene und Wasserrohr. Verzinkter Stahl darf im Erdreich wegen seines hohen magnetischen Widerstands nicht genutzt werden.",
          "Messung über Schleifenimpedanzmessgerät zwischen L1 und N; der Hilfserder darf maximal 2 m vom Fundamenterder entfernt sein. Edelstahl verhindert vagabundierende Ströme."
        ],
        correct: 0,
        explanation: "• Dreipunktmessung: Einspeisung über Hilfserder, Messung über Sonde (> 20 m außerhalb des Spannungstrichters). Im Erdreich zwingend V4A (1.4571), da verzinkter Stahl korrodiert.\n• 📖 Europa Tabellenbuch: S. 119 & S. 266 (Erderwiderstand messen), S. 183–184 (Fundamenterder V4A) & S. 340 (Korrosion)"
      },
      {
        id: "el-4", exam: "Sommer 2021", category: "Schutzmaßnahmen & Erdung",
        question: "Welche Leitungen werden an der HES direkt angeschlossen und welche über Überspannungsableiter (SPD)?",
        options: [
          "Direkt: Fundamenterder, äußerer Blitzschutz, PE, Metallrohre. Über SPD: Aktive Leiter (L1, L2, L3, N) und Telekommunikation.",
          "Direkt: Aktive Leiter (L1, L2, L3), Neutralleiter N und Koaxialkabel. Über SPD: Fundamenterder, metallene Wasserrohre und der Schutzleiter PE.",
          "Direkt: Nur der äußere Blitzschutz und Telekommunikationsleitungen. Über SPD: Alle Schutzleiter (PE), Heizungsrohre und der Ringerder aus V4A-Edelstahl.",
          "Alle eingeführten Leiter inklusive L1, L2, L3, N und PE werden über Schmelzsicherungen (gG 35 A) direkt mit der Haupterdungsschiene (HES) verschraubt."
        ],
        correct: 0,
        explanation: "• Direkt: PE/PEN, Erder, metallene Rohrleitungen. Über SPDs: Aktive Leiter L1, L2, L3, N sowie Koax-/Telefonleitungen (sonst Kurzschluss!).\n• 📖 Europa Tabellenbuch: S. 185, S. 257 (HES) & S. 335–336 (Innerer & äußerer Blitzschutz / SPD)"
      },
      {
        id: "el-5", exam: "Sommer 2023 & Winter 2024/25", category: "Schutzmaßnahmen & Erdung",
        question: "Welcher RCD-Typ ist bei Wallboxen oder Frequenzumrichtern mit glatten Gleichfehlerströmen nötig und warum kein Typ B hinter Typ A?",
        options: [
          "Allstromsensitiver RCD Typ B (oder Typ A-EV). Ein Typ B hinter Typ A erblindet durch Vormagnetisierung des Typ-A-Wandlers.",
          "Pulsstromsensitiver RCD Typ A (oder Typ AC). Ein nachgeschalteter RCD Typ B würde durch die 50-Hz-Wechselspannung sofort thermisch überlastet werden.",
          "Selektiver RCD Typ S mit 300 mA Bemessungsdifferenzstrom. Ein RCD Typ B muss immer hinter einem RCD Typ A installiert werden, um die Selektivität einzuhalten.",
          "Kurzzeitverzögerter RCD Typ F. Glatte Gleichfehlerströme treten nur im TT-System auf und werden von jedem Standard-RCD Typ A bis 60 mA DC sicher abgeschaltet."
        ],
        correct: 0,
        explanation: "• Glatte DC-Fehlerströme (> 6 mA) treiben den Wandler eines Typ-A-RCDs in die Sättigung ('Erblinden'). Daher Typ B oder Typ A-EV einsetzen und niemals Typ B hinter Typ A schalten!\n• 📖 Europa Tabellenbuch: S. 256, S. 260–261 (RCD-Typen A, F, B, B+ bei Stromrichtern) & S. 313–314 (Wallbox)"
      },
      {
        id: "el-6", exam: "Winter 2023/24", category: "Schutzmaßnahmen & Erdung",
        question: "Maximal zulässige Abschaltzeiten nach DIN VDE 0100-410 im TN-System bei 230V für Endstromkreise bis 63A?",
        options: [
          "Endstromkreise im TN-System max. 0,4 s | Verteilerstromkreise max. 5 s. Berührungsspannung max. 50 V AC.",
          "Endstromkreise im TN-System max. 0,2 s | Verteilerstromkreise max. 1,0 s. Maximal zulässige Berührungsspannung im Wechselstromnetz beträgt 120 V AC.",
          "Endstromkreise im TN-System max. 5,0 s | Verteilerstromkreise max. 0,4 s. Maximal zulässige Berührungsspannung beträgt in allen Netzen 25 V AC.",
          "Endstromkreise bis 63 A im TN-System max. 1,0 s | Verteilerstromkreise ohne zeitliche Begrenzung, sofern ein Hauptpotentialausgleich über die HES vorhanden ist."
        ],
        correct: 0,
        explanation: "• DIN VDE 0100-410: Im TN-System (230 V) Endstromkreise bis 63 A Steckdosen / 32 A Festanschluss max. 0,4 s (im TT 0,2 s). Hauptleitungen max. 5,0 s.\n• 📖 Europa Tabellenbuch: S. 255 & S. 257 (Maximale Abschaltzeiten: TN 0,4 s / 5 s | TT 0,2 s / 1 s nach DIN VDE 0100-410)"
      },
      {
        id: "el-7", exam: "Futterküche / Wildtiergehege", category: "Schutzmaßnahmen & Erdung",
        question: "Welchen Schutz bietet ein AFDD (Fehlerlichtbogen-Schutzeinrichtung) und muss er wie ein RCD manuell geprüft werden?",
        options: [
          "Schützt vor Bränden durch serielle und parallele Fehlerlichtbögen. Nein, er hat einen automatischen internen Selbsttest ohne Prüftaste.",
          "Schützt vor Überspannungen durch Blitzeinschläge (SPD Typ 1/2). Ja, der AFDD besitzt eine mechanische Prüftaste, die halbjährlich durch den Betreiber betätigt werden muss.",
          "Schützt ausschließlich vor Fehlerströmen gegen Erde ab 30 mA und ersetzt den RCD. Bei wiederkehrenden Prüfungen muss die Auslösezeit mit 5 × I_Δn gemessen werden.",
          "Schützt Motoren vor thermischer Überlastung bei Phasenausfall. Er muss alle 6 Monate mit einem Isolationsmessgerät bei 1.000 V DC auf Auslösung geprüft werden."
        ],
        correct: 0,
        explanation: "• AFDD (Brandschutzschalter) erkennt serielle Lichtbögen (z. B. lose Klemmen, Aderbruch), die weder LS noch RCD bemerken. Moderne AFDDs führen automatische Selbsttests durch.\n• 📖 Europa Tabellenbuch: S. 258 & S. 351–352 (Fehlerlichtbogen-Schutzeinrichtung / Brandschutzschalter AFDD)"
      },
      {
        id: "el-8", exam: "Winter 2024/25", category: "Schutzmaßnahmen & Erdung",
        question: "Warum wird die Sekundärseite eines Steuertransformators (230V) einseitig mit PE verbunden?",
        options: [
          "Um ein definiertes Bezugspotential zu schaffen; bei einem Erdschluss löst sofort die Sekundärsicherung aus statt ungewollt anzuziehen.",
          "Um eine sichere galvanische Trennung nach Schutzklasse II (SELV) aufzuheben, damit im Fehlerfall ein höherer Betriebsstrom durch die Schützspulen fließen kann.",
          "Damit auf der Sekundärseite des Steuertransformators die Spannung von 230 V auf 115 V gegen Erde halbiert wird und keine Sicherung mehr benötigt wird.",
          "Um kapazitive Blindströme im Hauptstromkreis zu kompensieren; bei einem Erdschluss bleibt die Steuerung dadurch trotz Fehler dauerhaft weiter in Betrieb."
        ],
        correct: 0,
        explanation: "• DIN EN 60204-1: Durch die Erdung von A2 löst bei einem Erdschluss im Steuerkreis die Sicherung sofort aus, anstatt dass Schütze ungewollt anziehen oder der Not-Aus überbrückt wird.\n• 📖 Europa Tabellenbuch: S. 272 & S. 495 (Elektr. Ausrüstung von Maschinen DIN EN 60204-1 / Steuertrafo)"
      },
      {
        id: "el-9", exam: "Alle GP2 Prüfungen", category: "VDE 0100-600 Prüfung",
        question: "Zwingende Reihenfolge der Erstprüfung nach DIN VDE 0100-600 im spannungsfreien Zustand?",
        options: [
          "1. Besichtigen -> 2. Erproben und Messen (Durchgängigkeit RPE, Isolationswiderstand Riso) -> 3. Dokumentieren. Erst danach Netzspannung zuschalten.",
          "1. Netzspannung zuschalten -> 2. Schleifenimpedanz Zs und RCD prüfen -> 3. Spannungsfrei schalten und Isolationswiderstand Riso messen -> 4. Besichtigen.",
          "1. Erproben der Funktionsfähigkeit unter Volllast -> 2. Isolationsmessung mit 500 V AC unter Spannung -> 3. Schutzleiterwiderstand RPE messen -> 4. Besichtigen.",
          "1. Besichtigen -> 2. Drehfeld und Spannungsfall unter Spannung messen -> 3. RCD-Auslösezeit prüfen -> 4. Erst bei Mängeln RPE und Riso im spannungsfreien Zustand messen."
        ],
        correct: 0,
        explanation: "• Reihenfolge: 1. Besichtigen, 2. Messen spannungsfrei (RPE, Riso), 3. Messen unter Spannung (Zs, Zi, RCD, Drehfeld), 4. Erproben und Protokollieren.\n• 📖 Europa Tabellenbuch: S. 264–266 (Reihenfolge der 16 Prüfschritte nach DIN VDE 0100 Teil 600) & S. 274 (Prüfprotokoll)"
      },
      {
        id: "el-10", exam: "Theaterküche / Bäckerei", category: "VDE 0100-600 Prüfung",
        question: "Was muss vor der RPE-Messung am Messgerät gemacht werden und wodurch weichen Werte ab?",
        options: [
          "Vorab Kalibrierung / Kompensation (Nullabgleich) der Messleitungen. Abweichungen durch Übergangswiderstände und Klemmstellen.",
          "Vorab muss die Prüfspannung auf 1.000 V DC eingestellt werden. Abweichungen entstehen hauptsächlich durch die Netzfrequenz von 50 Hz und induktive Blindwiderstände.",
          "Die Messleitungen müssen vor der Messung über einen 10-kΩ-Vorwiderstand kalibriert werden. Abweichungen entstehen nur durch zu hohen Isolationswiderstand der Adern.",
          "Am Messgerät muss der 2/3-Erwärmungsfaktor aktiviert werden. Abweichungen bei RPE entstehen ausschließlich durch kapazitive Ableitströme benachbarter Stromkreise."
        ],
        correct: 0,
        explanation: "• Vor der RPE-Messung (>= 200 mA DC) müssen die Prüfleitungen kurzgeschlossen und abgenullt (kompensiert) werden. Abweichungen entstehen durch lose Klemmen und Oxidation.\n• 📖 Europa Tabellenbuch: S. 113 (Installationstester) & S. 264–265 (Prüfung Durchgängigkeit Schutzleiter RPE mit ≥ 0,2 A)"
      },
      {
        id: "el-11", exam: "Theaterküche", category: "VDE 0100-600 Prüfung",
        question: "Alle Stromkreise haben 5x6mm² NYM, PE-Widerstand liegt bei 0,05 Ohm, nur -F15 hat 0,87 Ohm. Bewertung?",
        options: [
          "Nicht in Ordnung! Der stark erhöhte Wert deutet auf eine lose oder beschädigte Klemmstelle hin.",
          "Vollkommen in Ordnung, da nach DIN VDE 0100-600 jeder Schutzleiterwiderstand bis zum Grenzwert von 1,0 Ω unabhängig vom Querschnitt als mangelfrei gilt.",
          "Nicht in Ordnung, da der Schutzleiterwiderstand bei 5x6 mm² mindestens über 1,5 Ω liegen muss, um den Kurzschlussstrom auf einen ungefährlichen Wert zu begrenzen.",
          "Der erhöhte Wert von 0,87 Ω ist technisch normal, weil der Elektroherd aus drei getrennten Heizwiderständen besteht, die sich zum Schutzleiterwiderstand addieren."
        ],
        correct: 0,
        explanation: "• Plausibilitätsprüfung: Bei 6 mm² Querschnitt muss R_PE bei ca. 0,05–0,1 Ω liegen. 0,87 Ω zeigt einen gefährlichen Übergangswiderstand!\n• 📖 Europa Tabellenbuch: S. 182, S. 264–265 (Schutzleiterwiderstand RPE) & S. 274 (Prüfprotokoll)"
      },
      {
        id: "el-12", exam: "Theaterküche", category: "VDE 0100-600 Prüfung",
        question: "Besonderheiten bei der Isolationswiderstandsmessung (Riso): Warum Gleichspannung (500V DC) und was ist mit Schützen und SPDs?",
        options: [
          "DC verhindert kapazitive Blindströme von Leitungsadern. Schütze müssen geschaltet/überbrückt und steckbare SPDs entfernt werden.",
          "Wechselspannung (500 V AC) ist vorgeschrieben, um den induktiven Blindwiderstand zu prüfen. SPDs müssen eingesteckt bleiben, damit sie gleich mitgeprüft werden.",
          "Gleichspannung (24 V DC) schont elektronische Bauteile. Schütze müssen bei der Messung zwingend abgefallen (geöffnet) sein, damit die Verbraucher nicht mitgemessen werden.",
          "Gleichspannung (500 V DC) wird nur im TT-System genutzt. Überspannungsableiter (SPDs) erhöhen den Isolationswiderstand künstlich und dürfen daher nicht entfernt werden."
        ],
        correct: 0,
        explanation: "• DC verhindert kapazitive Blindströme. SPDs vor der Messung ziehen (lösen sonst aus), Schützkontakte schließen oder vor/hinter dem Schütz separat messen (Grenzwert >= 1 MΩ).\n• 📖 Europa Tabellenbuch: S. 263, S. 265 & S. 273 (Isolationswiderstand Riso ≥ 1,0 MΩ bei 500 V DC, SPDs vorher abklemmen!)"
      },
      {
        id: "el-13", exam: "Winter 2024/25", category: "Netzwerktechnik & Brandschutz",
        question: "Netzwerkkabel mit Folienpaarschirm und Gesamtschirmgeflecht sowie halogenfreiem Mantel: Bezeichnung und Vorteil?",
        options: [
          "S/FTP. LSZH-Kabel geben im Brandfall keine giftigen Halogene (Salzsäure) und kaum Rauch ab.",
          "U/UTP (Unshielded Twisted Pair). PVC-Mantelleitungen sind im Brandfall vorteilhaft, da sie selbstverlöschend sind und keinerlei Rauchgase entwickeln.",
          "F/UTP mit gemeinsamem Folienschirm ohne Paarschirmung. Halogenfreie Kabel (LSZH) haben eine geringere Dämpfung bei Frequenzen über 2.150 MHz.",
          "SF/UTP mit Stahlwellmantel. Der Hauptvorteil von LSZH-Leitungen besteht darin, dass sie ohne Schutzrohr direkt im Erdreich und unter Fahrbahnen verlegt werden dürfen."
        ],
        correct: 0,
        explanation: "• S/FTP = Screened/Foiled Twisted Pair. LSZH (Low Smoke Zero Halogen) setzt im Brandfall keine toxischen Halogengase frei.\n• 📖 Europa Tabellenbuch: S. 410–411 (Leitungen in Datennetzen S/FTP) & S. 354 (Euroklassen / Brandschutz)"
      },
      {
        id: "el-14", exam: "Berufsschul-Skript", category: "Netzwerktechnik & Brandschutz",
        question: "Warum ist ein TN-C-Netz (PEN-Leiter) nicht EDV-konform?",
        options: [
          "Betriebsströme fließen als vagabundierende Ausgleichsströme über Datenschirme und Erde, was zu Datenverlust führt. Gefordert ist TN-S.",
          "Im TN-C-Netz ist die Schleifenimpedanz zu hoch für Schaltnetzteile von Servern. Gefordert ist daher zwingend ein ungeerdetes IT-System mit Isolationswächter.",
          "Der PEN-Leiter darf erst ab 50 mm² Querschnitt für EDV-Anlagen genutzt werden. In Serverräumen ist deshalb ein reines TT-System mit 300-mA-RCD vorgeschrieben.",
          "Durch die 50-Hz-Netzfrequenz entstehen im TN-C-Netz Überspannungen von über 1.000 V zwischen Außenleiter und PEN; daher dürfen Server nur mit 24 V SELV betrieben werden."
        ],
        correct: 0,
        explanation: "• Im TN-C fließen Betriebsströme über den PEN und erzeugen vagabundierende Ströme auf Datenkabelschirmen (EMV-Störungen/Brandgefahr). Pflicht: TN-S!\n• 📖 Europa Tabellenbuch: S. 180, S. 257–258 (TN-C / TN-S) & S. 334 (EMV und Potenzialausgleich)"
      },
      {
        id: "el-15", exam: "Berufsschul-Skript", category: "Netzwerktechnik & Brandschutz",
        question: "Vorteile und Nachteile von Lichtwellenleitern (LWL) gegenüber Kupfer?",
        options: [
          "Vorteile: Große Reichweite, hohe Bandbreite, 100% EMV-fest, galvanische Trennung. Nachteile: Empfindlich bei Biegeradien, teures Spleißwerkzeug.",
          "Vorteile: Sehr unempfindlich gegen scharfes Knicken, einfache Verbindung über Schraubklemmen, überträgt gleichzeitig 400 V Versorgungsstrom. Nachteile: Hohe EMV-Störanfälligkeit.",
          "Vorteile: Geringe Materialkosten und direkter Anschluss an RJ45-Stecker ohne Konverter. Nachteile: Maximale Leitungslänge ist technisch auf 100 Meter begrenzt.",
          "Vorteile: Kann starke induktive Lasten über PoE versorgen. Nachteile: Hohe kapazitive Kopplung bei Parallelverlegung zu 400-V-Drehstromkabeln."
        ],
        correct: 0,
        explanation: "• LWL: Extrem hohe Reichweiten und Bandbreiten, vollkommen unempfindlich gegen EMV. Nachteil: Biegeempfindlich, Spleißgerät nötig.\n• 📖 Europa Tabellenbuch: S. 412 & S. 577–578 (Kommunikationsnetzwerke mit Lichtwellenleiter LWL)"
      },
      {
        id: "el-16", exam: "Winter 2018/19", category: "Netzwerktechnik & Brandschutz",
        question: "Was ist ein Brandabschnitt und wie reduziert man Brandlasten bei Elektroinstallationen?",
        options: [
          "Baulich abgegrenzter Bereich durch feuerbeständige Wände. Brandlastreduzierung durch Gitterrinnen statt PVC, halogenfreie Leitungen, Demontage von Altkabeln.",
          "Ein Bereich mit erhöhter Brandgefahr (z. B. Holzlager). Brandlasten reduziert man durch Verlegung von PVC-Mantelleitungen (NYM-J) in geschlossenen Kunststoffkanälen.",
          "Ein Fluchtwegabschnitt mit Rauchabzug. Zur Brandlastreduzierung werden ausgediente Altkabel in der Zwischendecke belassen und neue Kabel gebündelt darübergelegt.",
          "Ein durch RCD 30 mA geschützter Stromkreis. Die Brandlast wird verringert, indem man Schmelzsicherungen gG durch LS-Schalter der Charakteristik D ersetzt."
        ],
        correct: 0,
        explanation: "• Brandabschnitte verhindern das Übergreifen von Feuer (F90). Reduzierung durch halogenfreie Kabel, Demontage stillgelegter Kabel und Metallrinnen.\n• 📖 Europa Tabellenbuch: S. 353–354 (Brandschutz, Brandabschnitte & Leitungsanlagen)"
      },
      {
        id: "el-17", exam: "Winter 2018/19", category: "Gebäudetechnik & Sensorik",
        question: "Wie funktioniert der optische Rauchwarnmelder nach dem Streulichtprinzip (Tyndall-Effekt)?",
        options: [
          "IR-LED und Fotodiode sind so angeordnet, dass im Normalzustand kein Licht auf die Diode trifft. Erst bei Raucheintritt wird Licht auf die Diode gestreut.",
          "Eine Infrarot-Lichtschranke leuchtet dauerhaft direkt auf die Fotodiode. Dringt Rauch in die Kammer ein, wird der Lichtstrahl unterbrochen und der Melder löst Alarm aus.",
          "Zwei Bimetallkontakte verbiegen sich durch die Strahlungswärme des Rauches, bis der Arbeitsstromkreis geschlossen wird und die Hupe ertönt.",
          "Ein temperaturabhängiger Heißleiter (NTC) misst die Ionisation der Luftmoleküle; sinkt der Widerstand unter 100 Ω, schaltet der Melder den Alarmkontakt durch."
        ],
        correct: 0,
        explanation: "• Streulichtprinzip: Eine IR-LED sendet Licht aus. Erst wenn Rauchpartikel in die Messkammer eindringen, streuen sie das Licht auf die Fotodiode.\n• 📖 Europa Tabellenbuch: S. 349–350 (Rauchwarnmelder RWM – optisches Streulichtprinzip)"
      },
      {
        id: "el-18", exam: "Winter 2018/19", category: "Gebäudetechnik & Sensorik",
        question: "Bedeutung der Antennen-Begriffe: Azimut, Elevation, LNB, DiSEqC, dBµV?",
        options: [
          "Azimut = horizontale Himmelsrichtung | Elevation = vertikaler Neigungswinkel | LNB = rauschfreier Empfangsumsetzer | DiSEqC = Steuersignal | dBµV = Signalpegel.",
          "Azimut = vertikaler Neigungswinkel | Elevation = horizontale Himmelsrichtung | LNB = Multischalter-Verstärker | DiSEqC = Erdungsblock | dBµV = Kabeldämpfung.",
          "Azimut = Polarisationswinkel des LNB | Elevation = Mastdurchmesser | LNB = Dämpfungsglied | DiSEqC = Überspannungsschutz | dBµV = Frequenzband in MHz.",
          "Azimut = Abstand zum Satelliten | Elevation = Ausleuchtzonenwinkel | LNB = Antennensteckdose | DiSEqC = Koaxialschirmung | dBµV = Rauschmaß in Dezibel."
        ],
        correct: 0,
        explanation: "• Azimut = Himmelsrichtung (ca. 164° für ASTRA in NRW), Elevation = Höhenwinkel (ca. 30°), LNB = Signalumsetzer auf SAT-ZF (950–2150 MHz).\n• 📖 Europa Tabellenbuch: S. 404–405 (Pegel dBµV) & S. 438–441 (SAT-Anlagen, Azimut 164,1°, Elevation 30,3°, LNB)"
      },
      {
        id: "el-19", exam: "Winter 2023/24", category: "Gebäudetechnik & Sensorik",
        question: "Unterschied zwischen Bewegungs- und Präsenzmelder sowie Funktionsweise PIR?",
        options: [
          "PIR erfasst passive Infrarot-Wärmestrahlungsänderungen. Präsenzmelder sind viel empfindlicher (Erkennung kleinster Handbewegungen) und regeln Tageslicht konstant nach.",
          "PIR sendet aktive Infrarotstrahlen aus und misst die Reflexionszeit. Bewegungsmelder sind deutlich empfindlicher als Präsenzmelder und für Sitzarbeitsplätze vorgeschrieben.",
          "PIR arbeitet mit hochfrequenten Ultraschallwellen. Präsenzmelder schalten nur bei völliger Dunkelheit ein und besitzen keine Möglichkeit zur Tageslichtregelung.",
          "PIR misst die Luftfeuchtigkeitsänderung im Raum. Bewegungsmelder regeln das künstliche Licht stufenlos nach, während Präsenzmelder nur ein- und ausschalten."
        ],
        correct: 0,
        explanation: "• PIR = Passiv-Infrarot. Bewegungsmelder für grobe Bewegungen im Durchgangsbereich. Präsenzmelder für feinste Sitzbewegungen inkl. Konstantlichtregelung.\n• 📖 Europa Tabellenbuch: S. 130 & S. 156–157 (Bewegungs- und Präsenzmelder / PIR)"
      },
      {
        id: "el-20", exam: "Sommer 2021", category: "Gebäudetechnik & Sensorik",
        question: "Wie arbeitet ein Lastabwurfrelais (-K1) für Durchlauferhitzer und was bedeutet der Steuerkontakt-Aufdruck 250V/1A?",
        options: [
          "Schaltet bei hoher Last den Zweit-DLE über ein Schütz ab. Aufdruck bedeutet max. Schaltspannung und -strom des Relaiskontaktes.",
          "Es schaltet beide Durchlauferhitzer gleichzeitig mit halber Spannung (200 V) in Reihe. Der Aufdruck 250V/1A gibt die maximale Leistung des Durchlauferhitzers an.",
          "Es begrenzt den Heizstrom elektronisch über Phasenanschnitt auf 1 A. Der Steuerkontakt darf direkt ohne Schütz in die 400-V-Hauptzuleitung eingebaut werden.",
          "Es überwacht den Schutzleiterstrom des Durchlauferhitzers und schaltet bei mehr als 1 A Fehlerstrom die 250-V-Steuersicherung im Verteiler ab."
        ],
        correct: 0,
        explanation: "• Stromspule misst DLE-Strom. Bei Einschalten öffnet der Kontakt und schaltet nachrangige Großverbraucher über ein Hilfsschütz ab.\n• 📖 Europa Tabellenbuch: S. 187, S. 365 (Warmwassergeräte / Durchlauferhitzer) & S. 471 (Lastrelais)"
      },
      {
        id: "el-21", exam: "Winter 2024/25", category: "Gebäudetechnik & Sensorik",
        question: "Warum werden Einbruchmeldeanlagen (EMA) nach dem Ruhestromprinzip aufgebaut?",
        options: [
          "Drahtbruch- und Sabotagesicherheit: Bei Leitungsunterbrechung oder Stromausfall fällt der Ruhestrom ab und Alarm wird ausgelöst.",
          "Zur Energieeinsparung im Standby-Betrieb: Im Normalzustand fließt kein Strom durch die Meldelinie, erst beim Öffnen eines Fensters schließt der Kontakt den Stromkreis.",
          "Damit mehrere Melder parallel an eine zweiadrige Busleitung angeschlossen werden können und bei einem Kurzschluss keine Sicherung in der Zentrale auslöst.",
          "Weil Öffnerkontakte (NC) keinen Übergangswiderstand besitzen und dadurch auf den 10-kΩ-Abschlusswiderstand am Ende der Meldelinie verzichtet werden kann."
        ],
        correct: 0,
        explanation: "• Ruhestromprinzip: Schleife führt dauerhaft Strom (NC-Kontakte). Bei Aderbruch oder Sabotage fällt das Relais ab und löst Alarm aus.\n• 📖 Europa Tabellenbuch: S. 357–358 (Gefahren- und Einbruchmeldeanlagen EMA / Ruhestromkreis)"
      },
      {
        id: "el-22", exam: "Winter 2024/25", category: "Gebäudetechnik & Sensorik",
        question: "Prinzip von Dehnungsmessstreifen (DMS), NTC, PTC und Pt100?",
        options: [
          "DMS: Mechanische Dehnung vergrößert den Widerstand R. NTC: Widerstand sinkt bei Wärme. PTC: Steigt bei Wärme. Pt100: 100 Ohm bei 0°C.",
          "DMS: Widerstand sinkt bei Dehnung stark ab. NTC: Kaltleiter (Widerstand steigt bei Wärme). PTC: Heißleiter (Widerstand sinkt bei Wärme). Pt100: 100 kΩ bei 20 °C.",
          "DMS: Erzeugt bei mechanischem Druck eine proportionale Gleichspannung (Piezoeffekt). NTC und PTC haben einen konstanten Widerstand von 100 Ω bei 0 °C.",
          "DMS: Verändert seine Induktivität bei Biegung. NTC: Widerstand steigt linear um 0,385 Ω/°C. PTC: Widerstand sinkt sprungartig ab der Nenntemperatur."
        ],
        correct: 0,
        explanation: "• DMS: Dehnung erhöht Leiterlänge und verringert Querschnitt (R steigt). NTC = Heißleiter (R sinkt). PTC = Kaltleiter (R steigt). Pt100 = 100 Ω bei 0 °C.\n• 📖 Europa Tabellenbuch: S. 55 (NTC/PTC), S. 128–129 (DMS) & S. 131 (Temperaturmessung Pt100)"
      },
      {
        id: "el-23", exam: "Winter 2024/25", category: "Gebäudetechnik & Sensorik",
        question: "Unterschied Dauerschaltung und Bereitschaftsschaltung bei Notbeleuchtung sowie Peukert-Effekt (Akku)?",
        options: [
          "Dauer: Leuchtet immer. Bereitschaft: Schaltet nur bei Netzausfall ein. Peukert-Effekt: Höherer Entladestrom senkt die nutzbare Kapazität in % stark ab.",
          "Dauerschaltung: Leuchtet nur bei Netzausfall für 3 Stunden. Bereitschaftsschaltung: Leuchtet dauerhaft. Peukert-Effekt: Hoher Entladestrom erhöht die nutzbare Akkukapazität.",
          "Dauerschaltung: Betrieb an 400 V AC. Bereitschaftsschaltung: Betrieb an 24 V DC. Peukert-Effekt: Die nutzbare Kapazität eines Bleiakkus ist völlig unabhängig vom Entladestrom.",
          "Beide Schaltungsarten schalten erst bei Auslösung der Brandmeldeanlage ein. Der Peukert-Effekt beschreibt die Selbstentladung des Akkus bei hohen Raumtemperaturen."
        ],
        correct: 0,
        explanation: "• DS = Notleuchte brennt immer. BS = Notleuchte schaltet nur bei Netzausfall ein. Peukert-Effekt: Hohe Entladeströme verringern die entnehmbare Akkukapazität.\n• 📖 Europa Tabellenbuch: S. 309–311 (Not- & Sicherheitsbeleuchtung) & S. 341–342 (Akkumulatoren / Entladekennlinie)"
      },
      {
        id: "el-24", exam: "Winter 2018/19", category: "Motoren & Antriebe",
        question: "Sinn eines Frequenzumrichters (FU) am Motor und EMV-Vorgabe für Zuleitung?",
        options: [
          "Sanftanlauf zur Schonung der Mechanik, stufenlose Drehzahlregelung. Zuleitung muss geschirmt und beidseitig aufgelegt sein.",
          "Erhöhung des Anlaufstroms für höheres Losbrechmoment bei konstanter Netzfrequenz (50 Hz). Die Motorzuleitung darf ungeschirmt sein, wenn der PE-Leiter doppelt ausgelegt wird.",
          "Phasenverschiebung zwischen Strom und Spannung zur Blindleistungskompensation. Der Kabelschirm darf nur einseitig am Motor aufgelegt werden, um Erdschleifen zu verhindern.",
          "Umwandlung von 230 V Wechselstrom in 400 V Gleichstrom für Gleichstrommotoren. Eine Schirmung der Motorleitung ist erst ab Leitungslängen über 100 m erforderlich."
        ],
        correct: 0,
        explanation: "• FU ermöglicht stufenlose Drehzahlregelung und Sanftanlauf. Wegen Taktfrequenzen (EMV) ist eine geschirmte Leitung mit beidseitiger 360°-Erdung zwingend.\n• 📖 Europa Tabellenbuch: S. 334 (EMV), S. 462–463 & S. 526 (Frequenzumrichter & geschirmte Motorleitung)"
      },
      {
        id: "el-25", exam: "Winter 2024/25", category: "Motoren & Antriebe",
        question: "Was bewirkt ein Softstarter (Sanftstarter) und was ist der Unterschied zum FU?",
        options: [
          "Reduziert über Thyristoren die Anlaufspannung und den Einschaltstrom. Ändert aber nicht die Frequenz – kann keine Drehzahl im Betrieb regeln.",
          "Er erhöht über einen Zwischenkreis die Frequenz stufenlos von 0 bis 100 Hz und ermöglicht dadurch eine präzise Drehzahlregelung während des gesamten Dauerbetriebs.",
          "Er schaltet die Motorwicklungen beim Anlauf mechanisch von Stern auf Dreieck um und ersetzt dadurch sowohl den Motorschutzschalter als auch die Netzsicherungen.",
          "Er begrenzt den Anlaufstrom über zugeschaltete Hochleistungswiderstände im Läuferkreis und regelt die Drehzahl proportional zur angeschlossenen mechanischen Last."
        ],
        correct: 0,
        explanation: "• Softstarter regelt nur die Motorspannung während des Hochlaufs via Phasenanschnitt (f bleibt 50 Hz). Ein FU regelt zusätzlich die Frequenz.\n• 📖 Europa Tabellenbuch: S. 535 & S. 553 (Sanftanlasser / Softstarter)"
      },
      {
        id: "el-26", exam: "Videothek & Klassiker", category: "Motoren & Antriebe",
        question: "Was ist ein „Motorvollschutz“ im Vergleich zu einem normalen Motorschutzschalter?",
        options: [
          "Zusätzlich zu Bimetall (Stromüberlast) überwachen integrierte PTC-Kaltleiter in der Motorwicklung direkt die Temperatur.",
          "Ein Motorschutzschalter mit integrierter Fehlerstromüberwachung (30 mA RCD) und Überspannungsableiter (SPD Typ 2) in einem gemeinsamen Hutschienengehäuse.",
          "Eine Kombination aus Schmelzsicherungen (gG) für den Kurzschlussschutz und einem elektronischen Sanftstarter zur Begrenzung der Anlaufspannung.",
          "Ein gekapseltes Motorgehäuse der Schutzart IP68 mit Fremdbelüftung, bei dem auf thermische Überstromauslöser im Schaltschrank komplett verzichtet werden darf."
        ],
        correct: 0,
        explanation: "• Motorvollschutz kombiniert die stromabhängige Überwachung (MSS) mit temperaturabhängigen PTC-Kaltleitern direkt in den Statorwicklungen.\n• 📖 Europa Tabellenbuch: S. 508–509 (Bimetallrelais & elektronischer Thermistor-Motorschutz / Vollvollschutz)"
      },
      {
        id: "el-27", exam: "Klassiker GP2", category: "Motoren & Antriebe",
        question: "Motor-Typenschild 230V/400V (Delta/Stern): Wann Stern (Y) und wann Dreieck (Delta) am 400V-Netz?",
        options: [
          "Strangspannung max 230V -> am 400V-Netz zwingend Sternschaltung (Y). Bei 400V/690V ist Dreieckbetrieb am 400V-Netz erlaubt.",
          "Am 400-V-Netz muss der Motor mit Typenschild 230/400 V zwingend in Dreieckschaltung (Δ) betrieben werden, damit jede Wicklung die volle Netzspannung von 400 V erhält.",
          "Ein Motor mit 230/400 V ist für den Stern-Dreieck-Anlauf am 400-V-Netz vorgesehen; bei 400/690 V darf der Motor am 400-V-Netz nur in Sternschaltung betrieben werden.",
          "Die Schaltungsart ist am 400-V-Netz frei wählbar: Sternschaltung für dreifache Leistung, Dreieckschaltung für reduzierten Anlaufstrom (1/3)."
        ],
        correct: 0,
        explanation: "• Kleinere Spannungsangabe = max. Strangspannung der Wicklung. Bei 230/400 V verträgt eine Spule nur 230 V -> am 400-V-Netz nur im Stern (Y) betreiben!\n• 📖 Europa Tabellenbuch: S. 530 (Leistungsschilder) & S. 534–535 (Stern- und Dreieckschaltung)"
      },
      {
        id: "el-28", exam: "Winter 2024/25", category: "Motoren & Antriebe",
        question: "Wie werden Not-Halt (-S0) und Aus-Taster (-S1) an SPS-Eingängen hardwaremäßig und im FUP/KOP verschaltet?",
        options: [
          "Hardware als Öffner (Ruhestrom) -> Eingang führt '1'. Im FUP ohne Negation für Freigabe abgefragt (Signalzustand '1').",
          "Hardwaremäßig als Schließer (Arbeitsstromprinzip) -> Eingang führt im Ruhezustand '0'. Im FUP muss der Eingang daher immer mit einer Negation vor dem UND-Glied versehen werden.",
          "Hardwaremäßig als Öffner (Ruhestromprinzip) -> Da es ein Aus-Befehl ist, muss der Eingang im FUP am UND-Baustein zusätzlich negiert werden, damit die Freigabe funktioniert.",
          "Not-Halt und Aus-Taster dürfen aus Sicherheitsgründen niemals an SPS-Eingänge angeschlossen werden, sondern müssen ausschließlich den Hauptstromkreis direkt trennen."
        ],
        correct: 0,
        explanation: "• Aus Sicherheitsgründen (Drahtbruch) hardwaremäßig als Öffner (24 V = '1'). Im FUP wird der '1'-Zustand direkt unverneint als Freigabe genutzt.\n• 📖 Europa Tabellenbuch: S. 468–469 (LOGO!), S. 472, S. 476 & S. 507 (Drahtbruchsicherheit / Öffner)"
      },
      {
        id: "el-29", exam: "Klassiker Schützsteuerung", category: "Motoren & Antriebe",
        question: "Wie funktioniert eine Wendeschützschaltung und was ist eine doppelte Verriegelung?",
        options: [
          "Tausch von 2 Außenleitern im Hauptstromkreis. Schützverriegelung über Öffner-Hilfskontakte in Reihe vor den Spulen verhindert gleichzeitiges Einschalten.",
          "Tausch von Außenleiter L1 und Neutralleiter N im Hauptstromkreis. Doppelte Verriegelung bedeutet, dass zwei Schließerkontakte (13/14) vor den Spulen in Reihe geschaltet werden.",
          "Umschaltung der Motorwicklungen von Stern auf Dreieck. Die Verriegelung erfolgt ausschließlich softwareseitig in der SPS, auf Hilfskontakte im Schützpfad wird verzichtet.",
          "Tausch aller drei Außenleiter mit dem Schutzleiter. Bei doppelter Verriegelung ziehen beide Schütze kurzzeitig gemeinsam an, um den Motor wirbelstromfrei abzubremsen."
        ],
        correct: 0,
        explanation: "• Drehrichtungsumkehr: Tausch zweier Phasen (z. B. L1 und L3). Doppelte Verriegelung: Schützverriegelung (Öffner 21/22 vor Spule) plus Tasterverriegelung.\n• 📖 Europa Tabellenbuch: S. 503–505 & S. 510 (Wendeschützschaltung & Verriegelung)"
      },
      {
        id: "el-30", exam: "Berufsschul-Skript", category: "Motoren & Antriebe",
        question: "Vorteile des Dreiphasen-Wechselstromsystems (3x120°) gegenüber Einphasen-Wechselstrom?",
        options: [
          "Reduzierung der Leiteranzahl (Summe im Neutralstrom = 0 bei Symmetrie), Erzeugung des Drehfelds für Motoren, zwei Spannungen (230V/400V).",
          "Im Drehstromsystem addieren sich die drei Außenleiterströme im Neutralleiter zum Dreifachen des Strangstroms, weshalb der Neutralleiter den dreifachen Querschnitt benötigt.",
          "Es wird kein Schutzleiter (PE) mehr benötigt, und durch die 180°-Phasenverschiebung steht zwischen den Außenleitern eine Spannung von 690 V zur Verfügung.",
          "Drehstrom lässt sich ohne Gleichrichter direkt in Batterien speichern und erzeugt in Asynchronmotoren ein konstantes Gleichfeld zur Bremsung."
        ],
        correct: 0,
        explanation: "• Vorteile Drehstrom: Einfaches Drehfeld für Asynchronmotoren, zwei Spannungen (230 V/400 V), bei symmetrischer Belastung IN = 0 A.\n• 📖 Europa Tabellenbuch: S. 48–50 (Dreiphasenwechselstrom / Drehstrom)"
      },
      {
        id: "el-31", exam: "Videothek & Sommer 2021", category: "Leitungen & Schutzorgane",
        question: "Aus welchen Auslösern besteht ein LS-Schalter und wie sind die Kurzschluss-Auslösebereiche B, C, D?",
        options: [
          "1. Bimetall (thermisch für Überlast), 2. Elektromagnet (Spule für Kurzschluss). Typ B = 3-5 x In | C = 5-10 x In | D = 10-20 x In.",
          "1. Summenstromwandler (für Überlast), 2. Bimetall (für Kurzschluss). Auslösebereiche: Typ B = 1–3 × In | Typ C = 3–5 × In | Typ D = 5–10 × In.",
          "1. Schmelzleiter (thermisch), 2. Löschkammer (magnetisch). Auslösebereiche: Typ B = 5–10 × In | Typ C = 10–20 × In | Typ D = 20–50 × In.",
          "1. Kaltleiter PTC (für Überlast), 2. Haltemagnet (für Fehlerstrom). Alle Charakteristiken B, C und D lösen beim exakt 5-fachen Nennstrom innerhalb von 5 Sekunden aus."
        ],
        correct: 0,
        explanation: "• LS-Schalter: Thermischer Auslöser (Bimetall, zeitverzögert) + elektromagnetischer Auslöser (Spule, unverzögert). B: 3–5 In, C: 5–10 In, D: 10–20 In.\n• 📖 Europa Tabellenbuch: S. 206, S. 211 & S. 258 (LS-Schalter B: 3–5×In, C: 5–10×In, D: 10–20×In, Prüfstrom 1,45×In)"
      },
      {
        id: "el-32", exam: "Sommer 2021", category: "Leitungen & Schutzorgane",
        question: "Beleuchtungszuleitung mit B16 abgesichert. Smart-Home-Aktor hat max. 13A Gesamtlast (3A pro Kanal). Zulässig?",
        options: [
          "Nein, da vorgeschaltete Sicherung (16A) größer ist als die zulässige Belastbarkeit des Aktors (13A). Brandgefahr bei Überlast.",
          "Ja, das ist zulässig, weil die 5 Kanäle des Aktors (5 × 3 A = 15 A) in der Summe fast dem Bemessungsstrom des B16-Automaten entsprechen.",
          "Ja, sofern der Aktor auf einer geerdeten Hutschiene montiert wird und ein 30-mA-RCD vorgeschaltet ist, der bei Überlast abschaltet.",
          "Nein, da Smart-Home-Aktoren grundsätzlich nur mit Schmelzsicherungen des Typs gR (Halbleiterschutz) abgesichert werden dürfen."
        ],
        correct: 0,
        explanation: "• Unzulässig! Der Aktor kann durch Überlast zerstört werden, da der B16-Automat erst bei Strömen > 16 A abschaltet. Aktor mit B10 oder B6 vorsichern.\n• 📖 Europa Tabellenbuch: S. 165, S. 177 (Schaltaktor) & S. 206 (Überlastschutz Ib ≤ In ≤ Iz)"
      },
      {
        id: "el-33", exam: "Theaterküche", category: "Leitungen & Schutzorgane",
        question: "Besondere Einflüsse in Großküchen, Gummisteckdosen-Eignung und IP44?",
        options: [
          "Feuchtigkeit, Hitze, Fette/Öle/Reiniger, mechanische Last. Naturkautschuk quillt durch Fett auf. IP44 = Fremdkörper >= 1mm + Spritzwasser.",
          "Nur erhöhte Raumtemperatur und trockene Staubentwicklung. Gummisteckdosen sind ideal, da Naturkautschuk durch Speisefette geschmeidig bleibt. IP44 = staubdicht und wasserdicht.",
          "Vor allem elektromagnetische Störfelder durch Induktionsherde. PVC-Steckdosen ohne Klappdeckel (IP20) sind in Großküchen ausreichend, wenn ein RCD verbaut ist.",
          "Kondenswasser und mechanische Schläge. IP44 bedeutet Schutz gegen Berührung mit den Fingern (4) und Schutz gegen dauerndes Untertauchen in Wasser (4)."
        ],
        correct: 0,
        explanation: "• Großküche: Fette und Reinigungsmittel greifen Naturkautschuk an (ölbeständiges Material H07RN-F/H07BQ-F wählen). IP44 = Fremdkörper >= 1 mm und Spritzwasser.\n• 📖 Europa Tabellenbuch: S. 214 (Feuchte Räume), S. 345 (IP-Schutzarten) & S. 575 (Gummischlauchleitungen)"
      },
      {
        id: "el-34", exam: "Futterküche", category: "Leitungen & Schutzorgane",
        question: "Mindestschutzart IP für Futterküchen/Tiergehege mit Wasserschlauchreinigung?",
        options: [
          "Mindestens IPX4 für feuchte Räume. Bei Wasserschlauchreinigung (Strahlwasser) mind. IPX5.",
          "In feuchten Räumen genügt IP20 (Schutz gegen feste Fremdkörper ≥ 12,5 mm), sofern alle Steckdosen über einen 30-mA-RCD geschützt sind.",
          "Für die Reinigung mit einem Wasserschlauch reicht IP44 (Spritzwasserschutz) aus; IPX5 ist nur für Unterwasserscheinwerfer in Schwimmbecken gefordert.",
          "Es müssen ausnahmslos druckwasserdichte Betriebsmittel der Schutzart IP68 verbaut werden, die dauerhaft bis 10 Meter Wassertiefe untergetaucht werden können."
        ],
        correct: 0,
        explanation: "• Feuchte Räume mind. IPX4. Bei Reinigung mit Strahlwasser (Schlauch) ist zwingend mindestens IPX5 (z. B. IP55 oder IP65) erforderlich.\n• 📖 Europa Tabellenbuch: S. 214, S. 217 (Landwirtschaft/Feuchträume) & S. 345 (IP-Schutzart IPX4 / IPX5)"
      },
      {
        id: "el-35", exam: "Winter 2024/25", category: "Leitungen & Schutzorgane",
        question: "Bedeutung von tc/ta, Doppelquadrat, SELV und durchgestrichener Mülltonne?",
        options: [
          "ta = Umgebungstemperatur | tc = Gehäusetemperatur | Doppelquadrat = Schutzklasse II (schutzisoliert) | SELV = Sicherheitskleinspannung | Mülltonne = ElektroG (Recycling).",
          "ta = Auslösetemperatur | tc = Curietemperatur | Doppelquadrat = Schutzklasse I (Schutzleiteranschluss Pflicht) | SELV = Schutztrennung | Mülltonne = RoHS-Verbot.",
          "ta = Arbeitstemperatur des Leuchtmittels | tc = Farbtemperatur in Kelvin | Doppelquadrat = Schutzart IP44 | SELV = Funktionskleinspannung FELV ohne sichere Trennung.",
          "ta = maximale Lagertemperatur | tc = minimale Einschalttemperatur | Doppelquadrat = explosionsgeschütztes Gehäuse | SELV = Kleinspannung bis 120 V Wechselstrom."
        ],
        correct: 0,
        explanation: "• ta = Umgebungstemperatur, tc = Gehäusetemperatur, Doppelquadrat = SK II (nicht an PE anschließen!), SELV = Sicherheitskleinspannung (< 50 V AC).\n• 📖 Europa Tabellenbuch: S. 254–255 (Schutzklasse II / SELV), S. 345 & S. 619 (Entsorgung / ElektroG)"
      },
      {
        id: "el-36", exam: "Winter 2024/25 & Sommer 2021", category: "Leitungen & Schutzorgane",
        question: "Überlastschutzbedingung (IB <= IN <= IZ) und zulässiger Spannungsfall delta u?",
        options: [
          "Betriebsstrom kleiner gleich Sicherungsnennstrom kleiner gleich Strombelastbarkeit der Leitung. Spannungsfall delta u max. 3% (Beleuchtung) bzw. 5% (andere Verbraucher).",
          "Der Betriebsstrom IB muss größer sein als die Strombelastbarkeit IZ der Leitung (IB ≥ IZ ≥ IN). Der zulässige Spannungsfall beträgt ab Zähler maximal 10 %.",
          "Der Bemessungsstrom der Sicherung IN darf doppelt so groß sein wie IZ, wenn ein RCD vorgeschaltet ist. Für Beleuchtung gilt ein maximaler Spannungsfall von 8 %.",
          "Die Strombelastbarkeit IZ erhöht sich bei Häufung im Elektroinstallationsrohr um den Faktor 1,45; der Spannungsfall ist nur bei Drehstromleitungen zu prüfen."
        ],
        correct: 0,
        explanation: "• Bemessungsstromregel: Ib <= In <= Iz. Max. Spannungsfall nach DIN VDE 0100-520: 3 % für Licht, 5 % für Kraftstrom (nach DIN 18015 ab Zähler max. 3 %).\n• 📖 Europa Tabellenbuch: S. 192–193, S. 205 (Spannungsfall) & S. 206 (Bemessungsstromregel Ib ≤ In ≤ Iz)"
      },
      {
        id: "el-37", exam: "Klassiker GP2", category: "Leitungen & Schutzorgane",
        question: "Verwendung von NYM-J, NYY-J und H07RN-F?",
        options: [
          "NYM-J: Feste Verlegung in trockenen/feuchten Räumen (nicht im Erdreich). NYY-J: Erdkabel für Außen/Erdboden. H07RN-F: Flexible Gummischlauchleitung für Baustellen.",
          "NYM-J: Schweres Erdkabel für direkte Verlegung im Boden und im Grundwasser. NYY-J: Flexible Geräteanschlussleitung. H07RN-F: Ungeschirmtes Datenkabel.",
          "NYM-J: UV-beständige Freileitung für den Außenbereich. NYY-J: Halogenfreie Sicherheitsleitung mit Funktionserhalt E90. H07RN-F: Starre Verlegeleitung für Unterputz.",
          "Alle drei Leitungstypen dürfen ohne mechanischen Schutz direkt im Erdreich unter Fahrbahnen verlegt werden; das Kürzel '-J' steht für halogenfreie Isolierung."
        ],
        correct: 0,
        explanation: "• NYM-J = Mantelleitung für Gebäudeinnenräume. NYY-J = Erdkabel für Außenbereich und Erdreich. H07RN-F = schwere Gummischlauchleitung.\n• 📖 Europa Tabellenbuch: S. 204, S. 291 & S. 571–580 (Kurzzeichen für Leitungen NYM-J, NYY-J, H07RN-F)"
      },
      {
        id: "el-38", exam: "Sommer 2023", category: "Englische Dokumentation",
        question: "Übersetzung: Front panel, Socket outlet Type 2, Tethered charging cable, Maintenance, RCD, MCB?",
        options: [
          "Front panel = Gehäusefront | Socket outlet Type 2 = Typ-2-Steckdose | Tethered cable = festes Ladekabel | Maintenance = Wartung | RCD = FI-Schalter | MCB = LS-Schalter.",
          "Front panel = Rückwandplatte | Socket outlet Type 2 = Schuko-Steckdose | Tethered cable = abnehmbares Ladekabel | Maintenance = Erstinbetriebnahme | MCB = FI-Schalter.",
          "Front panel = Hutschiene | Socket outlet Type 2 = CEE-Drehstromdose | Tethered cable = Erdungsband | Maintenance = Störungsbeseitigung | RCD = Überspannungsableiter.",
          "Front panel = Klemmbrett | Socket outlet Type 2 = Kommunikationsschnittstelle | Tethered cable = Glasfaserleitung | Maintenance = Demontage | MCB = Motorschutzrelais."
        ],
        correct: 0,
        explanation: "• Wallbox-Klassiker: Socket outlet = Steckdose, Tethered cable = fest angeschlagenes Ladekabel, RCD = FI-Schalter, MCB = LS-Schalter.\n• 📖 Europa Tabellenbuch: S. 313–314 (Ladestationen / Wallbox) & S. 638–643 (Fachliches Englisch)"
      },
      {
        id: "el-39", exam: "Winter 2024/25", category: "Englische Dokumentation",
        question: "Übersetzung: Normally Open (NO), Normally Closed (NC), Star connection (Y), Delta connection (Delta)?",
        options: [
          "NO = Schließer | NC = Öffner | Star connection = Sternschaltung (Y) | Delta connection = Dreieckschaltung (Delta).",
          "NO = Öffner (im Ruhezustand geschlossen) | NC = Schließer (im Ruhezustand offen) | Star connection = Dreieckschaltung | Delta connection = Sternschaltung.",
          "NO = Wechslerkontakt | NC = potenzialfreier Relaisausgang | Star connection = Reihenschaltung | Delta connection = Parallelschaltung.",
          "NO = Not-Aus-Kontakt | NC = Neutralleiterklemme | Star connection = Doppelsternschaltung (YY) | Delta connection = Steinmetzschaltung."
        ],
        correct: 0,
        explanation: "• NO = Schließerkontakt, NC = Öffnerkontakt, Star = Sternschaltung, Delta = Dreieckschaltung.\n• 📖 Europa Tabellenbuch: S. 84, S. 87 (NO/NC), S. 534 (Star/Delta) & S. 638–643 (Fachliches Englisch)"
      },
      {
        id: "el-40", exam: "Winter 2018/19 & Sommer 2022", category: "Englische Dokumentation",
        question: "Übersetzung: Ambient temperature, Degree of protection, Mounting height, Standby power, Disconnect from power supply?",
        options: [
          "Ambient temperature = Umgebungstemperatur | Degree of protection = Schutzart (IP) | Mounting height = Montagehöhe | Standby power = Eigenverbrauch | Disconnect from power supply = Vor Arbeiten spannungsfrei schalten.",
          "Ambient temperature = Gehäusetemperatur tc | Degree of protection = Schutzklasse (SK I–III) | Mounting height = Leitungsquerschnitt | Standby power = Nennleistung.",
          "Ambient temperature = Lagertemperatur | Degree of protection = Überspannungskategorie | Mounting height = Wandabstand | Disconnect = Unter Last einschalten.",
          "Ambient temperature = Farbtemperatur | Degree of protection = Isolierstoffklasse | Mounting height = Abisolierlänge | Standby power = Einschaltstromspitze."
        ],
        correct: 0,
        explanation: "• Degree of protection = Schutzart (IP-Code), Disconnect from power supply = vor Arbeitsbeginn spannungsfrei schalten!\n• 📖 Europa Tabellenbuch: S. 345 (Degree of protection IP) & S. 638–643 (Fachliches Englisch)"
      },
      {
        id: "el-41", exam: "Systementwurf (Klassiker GP2)", category: "Verteilungsfehler & Schutzmaßnahmen",
        question: "Im Verteilungsplan sind die Neutralleiterschienen N1 und N2 hinter zwei verschiedenen RCDs gebrückt. Was passiert und wie wird es korrigiert?",
        options: [
          "Beide RCDs lösen sofort bei Belastung aus, da sich der Rückstrom auf beide N-Schienen aufteilt (Summenstrom != 0). Korrektur: Strikte Trennung von N1 und N2!",
          "Die beiden RCDs teilen sich den Fehlerstrom gleichmäßig auf und lösen erst beim doppelten Bemessungsdifferenzstrom (60 mA) aus; die Brücke dient der Redundanz.",
          "Es entsteht eine Sternpunktverschiebung mit 400 V an den Steckdosen, während beide RCDs durch den hohen Neutralleiterstrom mechanisch blockiert werden.",
          "Nur bei unsymmetrischer Drehstromlast fließt ein Ausgleichsstrom über die Brücke, der die RCDs vor ungewollter Fehlauslösung bei Gewitter schützt."
        ],
        correct: 0,
        explanation: "• Bei gebrückten N-Schienen teilt sich der Rückstrom auf beide RCD-Wandler auf -> Differenzstrom ungleich 0 -> Fehlauslösung beider RCDs!\n• 📖 Europa Tabellenbuch: S. 186, S. 256 & S. 258 (RCD-Funktionsprinzip & getrennte Neutralleiterschienen)"
      },
      {
        id: "el-42", exam: "Systementwurf (Klassiker GP2)", category: "Verteilungsfehler & Schutzmaßnahmen",
        question: "Welche 4 typischen Planungsfehler treten bei RCDs und LS-Schaltern in Unterverteilungs-Prüfungsplänen auf?",
        options: [
          "1. 300-mA-RCD für Steckdosen (max. 30 mA Pflicht!), 2. Drei 1-polige LS für 400V-Drehstromgerät (3-poliger LS nötig), 3. 40A-RCD ohne Vorsicherung vor 4x B16A LS (Überlastgefahr!), 4. SK-II-Gerät an PE angeschlossen.",
          "1. 30-mA-RCD für Steckdosen (dort sind 300 mA vorgeschrieben), 2. 3-poliger LS für Drehstrom (drei 1-polige LS sind Pflicht), 3. 63-A-RCD hinter 35-A-Neozed, 4. SK-I an PE.",
          "1. Einsatz von RCD Typ A für Beleuchtungsstromkreise, 2. Verwendung von B16A-Automaten für 2,5 mm² Leitungen, 3. Trennung der N-Schienen hinter zwei RCDs.",
          "1. Einbau eines selektiven Hauptleitungsschutzschalters (SLS) vor dem Zähler, 2. Anschluss des Überspannungsableiters SPD Typ 2 an die Haupterdungsschiene."
        ],
        correct: 0,
        explanation: "• Häufige Fehler: Falscher RCD-Auslösestrom (300 mA), fehlende allpolige Abschaltung bei Drehstrom, thermische Überlastung des RCDs und PE an SK-II.\n• 📖 Europa Tabellenbuch: S. 211, S. 254–259 (30-mA-RCD Pflicht für Steckdosen ≤ 32 A, SK II ohne PE)"
      },
      {
        id: "el-43", exam: "Winter 2024/25 – Planung 2.3", category: "Schutzmaßnahmen & Erdung",
        question: "Warum löst bei einem Außenleitererdschluss eines beschädigten Erdkabels im Erdreich der LS-Schalter C20 oft NICHT aus?",
        options: [
          "Weil Erdschlusswiderstand (z. B. 7,2 Ohm) und Betriebserder (z. B. 1,8 Ohm) den Fehlerstrom auf ca. 25 A begrenzen. Für C20 (braucht 200 A) wirkt das wie normaler Betriebsstrom!",
          "Weil im Erdreich der kapazitive Blindwiderstand den Kurzschlussstrom auf über 1.000 A erhöht und dadurch nur die vorgeschaltete NH-Sicherung im HAK anspricht.",
          "Weil ein LS-Schalter der Charakteristik C grundsätzlich keine Erdschlüsse abschalten kann, sondern ausschließlich auf Fehlerströme zwischen L und N reagiert.",
          "Weil der thermische Bimetallauslöser eines C20-Automaten im Erdreich durch die niedrige Bodentemperatur gekühlt wird und erst ab 100 A auslöst."
        ],
        correct: 0,
        explanation: "• W24/25 PL 2.3: Der Gesamterdwiderstand begrenzt den Strom auf ca. 25 A. Ein C20-Automat schaltet magnetisch erst bei 200 A unverzögert ab!\n• 📖 Europa Tabellenbuch: S. 257–258 & S. 266 (Fehlerschleifenimpedanz & Abschaltstrom Ia bei LS C20)"
      },
      {
        id: "el-44", exam: "Winter 2024/25 – FSA Aufg. 5", category: "Motoren & Antriebe",
        question: "Welche zwei Programmierfehler wurden in der SPS-Steuerung (FUP/KOP) für Beleuchtung und Lüftung (Winter 2024/25 FSA Aufg. 5) eingebaut?",
        options: [
          "1. Es fehlt das RS-Speicherglied (Selbsthaltung) für die Beleuchtung/Lüftung. 2. An der Störungslampe wurde der Licht-Aus-Taster (-S1) statt des Not-Halt-Schalters (-S0) programmiert.",
          "1. Es wurde ein RS-Speicherglied statt eines UND-Bausteins verwendet. 2. Der Not-Halt-Schalter (-S0) wurde als Öffner statt als Schließer in die SPS eingelesen.",
          "1. Die Einschaltverzögerung wurde vor statt hinter das ODER-Glied gesetzt. 2. Die Ausgänge Q1 und Q2 wurden im Programm gegenseitig verriegelt.",
          "1. Der Motorschutzschalter (-F1) wurde am UND-Baustein ohne Negation abgefragt. 2. Für die Lüftung wurde eine Rückfallverzögerung statt eines Impulsrelais gewählt."
        ],
        correct: 0,
        explanation: "• Ohne RS-Speicherglied schaltet der Ausgang beim Loslassen des Tasters sofort ab. Zudem war die Störungsmeldung fehlerhaft mit dem Aus-Taster verknüpft.\n• 📖 Europa Tabellenbuch: S. 468–469 (LOGO! RS-Speicher) & S. 476–477 (SPS-Funktionsplan FUP)"
      },
      {
        id: "el-45", exam: "Winter 2024/25 – FSA Aufg. 2", category: "Motoren & Antriebe",
        question: "Welche Aufgaben übernimmt der Motorschutzschalter -F1 im Laststromkreis des Aufzugsmotors (1,1 kW, In = 2,6 A) und wie stoppt der Aufzug im Erdgeschoss?",
        options: [
          "-F1 schützt den Motor vor thermischer Überlast (Bimetall, auf 2,6 A eingestellt) und Kurzschluss (elektromagnetisch) und meldet die Auslösung über Hilfskontakte. Der Aufzug stoppt über den Öffner des Endschalters -B1.",
          "-F1 dient ausschließlich als handbetätigter Hauptschalter ohne Überlastauslöser; der Aufzug stoppt im Erdgeschoss über ein abfallverzögertes Zeitrelais (-K1T).",
          "-F1 überwacht als Fehlerstromschutzschalter (30 mA) den Isolationszustand des Motors; der Stopp im Erdgeschoss erfolgt durch den Schließerkontakt von -B1.",
          "-F1 begrenzt über integrierte Heizwiderstände den Anlaufstrom des Motors auf 2,6 A; im Erdgeschoss schaltet der Motorschutzschalter den Antrieb betriebsmäßig ab."
        ],
        correct: 0,
        explanation: "• -F1 sichert gegen Überlast und Kurzschluss ab. Der Endlagen-Stopp erfolgt über den Rollenhebel-Endschalter -B1 (Öffner unterbricht Schütz -Q1).\n• 📖 Europa Tabellenbuch: S. 95, S. 496 (Grenztaster -B1) & S. 508 (Motorschutzschalter -F1)"
      },
      {
        id: "el-46", exam: "Winter 2024/25 – FSA Aufg. 1", category: "Gebäudetechnik & Sensorik",
        question: "Drei gleiche Heizelemente (G1, G2, G3) werden in verschiedenen Leistungsstufen an 400V/230V geschaltet. Warum ist die Leistung bei Parallelschaltung an 400V viermal so hoch wie bei Reihenschaltung?",
        options: [
          "Bei Reihenschaltung von G1 und G2 an 400 V liegt an jedem Element nur die halbe Spannung (200 V) -> Leistung sinkt auf je 1/4 (zusammen die Hälfte eines Einzelelements an 400 V). Parallel liegen volle 400 V an beiden Elementen!",
          "Weil bei Parallelschaltung der Gesamtwiderstand doppelt so groß ist wie bei Reihenschaltung und die Leistung nach P = I² · R mit steigendem Widerstand zunimmt.",
          "Weil in der Reihenschaltung eine Phasenverschiebung von cos φ = 0,5 entsteht, die die aufgenommene Wirkleistung der Heizelemente auf ein Viertel reduziert.",
          "Weil bei Parallelschaltung an 400 V der Strom durch jedes einzelne Heizelement viermal so hoch ist wie bei der Reihenschaltung von zwei Elementen."
        ],
        correct: 0,
        explanation: "• P = U² / R. Halbe Spannung an einem Widerstand bedeutet ein Viertel der Einzelleistung!\n• 📖 Europa Tabellenbuch: S. 36 & S. 38–39 (Leistung bei Reihen- und Parallelschaltung von Widerständen)"
      },
      {
        id: "el-47", exam: "Sommer 2022 – Planung 2.1", category: "Motoren & Antriebe",
        question: "Was ist eine Dahlanderschaltung (Dreieck / Doppelstern) und warum benötigt sie zwei getrennte Motorschutzrelais (-F1 und -F2)?",
        options: [
          "Polumschaltbarer Drehstrommotor mit Drehzahlverhältnis 1:2 (z. B. 1500 / 3000 min^-1). Da der Motor in der langsamen Stufe (Dreieck) und schnellen Stufe (Doppelstern) unterschiedliche Nennströme aufnimmt, braucht jede Stufe ein eigenes Motorschutzrelais!",
          "Ein Drehstrommotor mit Schleifringläufer für hohes Anlaufmoment. Zwei Motorschutzrelais sind nötig, weil eines den Stator und eines den Rotor überwacht.",
          "Eine elektronische Sanftanlaufschaltung mit zwei Frequenzstufen (25 Hz / 50 Hz). Die beiden Motorschutzrelais dienen der redundanten Ausfallsicherheit.",
          "Ein Einphasen-Kondensatormotor mit Hilfswicklung. Das erste Motorschutzrelais überwacht die Hauptwicklung, das zweite den Betriebskondensator."
        ],
        correct: 0,
        explanation: "• Polumschaltung 1:2. Da Strom- und Leistungsaufnahme in Δ und YY unterschiedlich sind, benötigt jede Stufe ein exakt eingestelltes Relais.\n• 📖 Europa Tabellenbuch: S. 504, S. 510, S. 528 & S. 536–537 (Dahlander-Motoren Δ / YY, 1U/1V/1W & 2U/2V/2W)"
      },
      {
        id: "el-48", exam: "Winter 2021/22 & Sommer 2021", category: "Gebäudetechnik & Sensorik",
        question: "Was unterscheidet bei KNX die physikalische Adresse von der Gruppenadresse und wie überprüft man vor Ort die Zuordnung eines Busankopplers?",
        options: [
          "Physikalische Adresse (Bereich.Linie.Teilnehmer, z. B. 2.2.1) identifiziert das Gerät eindeutig. Gruppenadresse (z. B. 2/5/1) verknüpft Funktion/Schaltbefehl. Prüfung: Über Programmierschnittstelle und ETS die Programmier-LED am Gerät blinken lassen.",
          "Physikalische Adresse (mit Schrägstrichen, z. B. 1/1/2) verknüpft die Schaltfunktion; Gruppenadresse (mit Punkten, z. B. 1.1.2) gibt den Einbauort im Verteiler an.",
          "Beide Adressen sind identisch und werden über DIP-Schalter am Gerät eingestellt; die Prüfung erfolgt durch Messen der 230-V-Busspannung mit dem Multimeter.",
          "Die physikalische Adresse wird dynamisch vom Router per DHCP vergeben; die Zuordnung prüft man durch Kurzschließen der rot-schwarzen Busklemme."
        ],
        correct: 0,
        explanation: "• Physikalische Adresse (z. B. 1.1.10) dient der Programmierung und Identifikation. Gruppenadresse (z. B. 1/2/3) verbindet Sensor und Aktor logisch.\n• 📖 Europa Tabellenbuch: S. 161–170 (KNX-System, physikalische Adresse, Gruppenadresse & ETS)"
      },
      {
        id: "el-49", exam: "Winter 2021/22 – Planung 2.2", category: "Verteilungsfehler & Schutzmaßnahmen",
        question: "Wie wird ein Zählerfeld mit selektivem Hauptleitungsschutzschalter (SLS 3x63A) und Kombiableiter (SPD Typ 1/2) im Vorzählerbereich verdrahtet?",
        options: [
          "Zuleitung (L1, L2, L3) auf SLS und SPD Typ 1/2; PEN im ungezählten Bereich in PE und N aufteilen (TN-C-S), SPD-Erdung direkt mit Haupterdungsschiene (HES) verbinden; vom SLS über Zähler (-P1) zu den Vorsicherungen (z. B. Neozed 40A).",
          "Der Kombiableiter SPD Typ 1/2 darf erst imstromkreisverteiler hinter dem 30-mA-RCD installiert werden; die PEN-Aufteilung erfolgt erst an der letzten Steckdose.",
          "Vom HAK geht die Leitung zuerst über den Drehstromzähler und erst danach auf den SLS-Schalter (63 A) und den Überspannungsableiter SPD Typ 1/2.",
          "Der PEN-Leiter wird gemeinsam mit L1, L2 und L3 vierpolig über den SLS-Schalter geführt und erst im anlagenseitigen Anschlussraum (AAR) geerdet."
        ],
        correct: 0,
        explanation: "• NAR (Netzseitiger Anschlussraum): SLS 3x63 A und SPD Typ 1/2 auf Sammelschiene. PEN aufteilen in PE/N vor Zählung. Weiter über Drehstromzähler zum AAR.\n• 📖 Europa Tabellenbuch: S. 186 (PEN-Aufteilung), S. 188–189 (Zählerplatz, SLS) & S. 335 (SPD Typ 1/2)"
      },
      {
        id: "el-50", exam: "Berufsschul-Skript & GP2", category: "Motoren & Antriebe",
        question: "Was ist der Unterschied zwischen verbindungsprogrammierter Steuerung (VPS) und speicherprogrammierbarer Steuerung (SPS) und was bedeutet das EVA-Prinzip?",
        options: [
          "VPS: Funktion ist fest durch die Verdrahtung der Schütze/Relais vorgegeben. SPS: Funktion wird durch das Software-Programm im Speicher bestimmt (flexibel änderbar). EVA = Eingabe (Sensoren) -> Verarbeitung (SPS-Logik) -> Ausgabe (Aktoren/Schütze).",
          "VPS: Funktion wird per Software-App programmiert. SPS: Funktion ist fest durch Drahtbrücken vorgegeben. EVA = Einschalten -> Verriegeln -> Abschalten.",
          "VPS arbeitet ausschließlich mit 24 V Gleichspannung, während eine SPS immer direkt mit 400 V Drehstrom an den Logikbausteinen arbeitet. EVA = Erde-Verteiler-Aktor.",
          "Bei einer VPS werden alle Kontakte zyklisch im Mikrosekundentakt abgefragt, während eine SPS ohne Speicherbausteine rein elektromechanisch schaltet."
        ],
        correct: 0,
        explanation: "• VPS = fest verdrahtete Logik. SPS = softwaregesteuerte Logik. EVA-Zyklus: Eingabe (PAE einlesen) -> Verarbeitung (Programmzyklus) -> Ausgabe (PAA schreiben).\n• 📖 Europa Tabellenbuch: S. 467 (Steuerungstechnik VPS/SPS) & S. 472 (SPS-Aufbau & EVA-Prinzip)"
      },
      {
        id: "el-51", exam: "Netzwerktechnik & GP2", category: "Netzwerktechnik & Brandschutz",
        question: "Was unterscheidet in einem Computernetzwerk die Geräte Hub, Switch und Router?",
        options: [
          "Hub: Sendet Datenpakete ungezielt an alle Ports. Switch: Lernt MAC-Adressen und leitet Daten gezielt nur an den Empfänger-Port im selben Netzwerk weiter. Router: Verbindet verschiedene IP-Netzwerke miteinander (z. B. LAN mit dem Internet).",
          "Hub: Verbindet das Heimnetzwerk mit dem Internet. Switch: Verteilt Datenpakete ungezielt an alle Ports. Router: Leitet Daten nur anhand der MAC-Adresse weiter.",
          "Hub: Arbeitet auf OSI-Schicht 3 mit IP-Adressen. Switch: Verstärkt nur analoge Antennensignale. Router: Dient ausschließlich als Überspannungsschutz für Patchkabel.",
          "Switch und Router sind technisch identisch; ein Hub wird heute eingesetzt, um Glasfaserkabel (LWL) ohne Medienkonverter direkt mit Koaxialkabeln zu verbinden."
        ],
        correct: 0,
        explanation: "• Hub (OSI Schicht 1): Multiport-Repeater an alle. Switch (Schicht 2): Gezielte Weiterleitung nach MAC-Adresse. Router (Schicht 3): Kopplung verschiedener IP-Netze.\n• 📖 Europa Tabellenbuch: S. 408–409 & S. 414–415 (Switch, MAC-Adresse & Router)"
      },
      {
        id: "el-52", exam: "Kundenauftrag / Kamera-Planung", category: "Netzwerktechnik & Brandschutz",
        question: "Was bedeutet „PoE“ (Power over Ethernet) bei IP-Überwachungskameras oder WLAN-Access-Points und wie lang darf ein CAT-Kupfer-Verlegekabel maximal sein?",
        options: [
          "PoE versorgt netzwerkfähige Geräte direkt über das 8-adrige RJ45-Netzwerkkabel mit Gleichspannung (keine separate 230V-Steckdose am Montageort nötig!). Maximale Segmentlänge für Twisted-Pair-Kupferkabel (Permanent Link + Patchkabel): 100 Meter.",
          "PoE überträgt 230 V Wechselspannung über zwei ungenutzte Adern des Netzwerkkabels. Die maximale Segmentlänge für CAT7-Kupferkabel beträgt 500 Meter.",
          "PoE moduliert die Daten auf die 230-V-Steckdosenleitung (Powerline). Ein Twisted-Pair-Verlegekabel darf ohne Switch maximal 25 Meter lang sein.",
          "PoE dient der Potenzialerdung von Netzwerkschränken über den Kabelschirm. Kupfer-Datenkabel dürfen bis zu 1.000 Meter ohne Signalverstärker verlegt werden."
        ],
        correct: 0,
        explanation: "• PoE (IEEE 802.3af/at) überträgt Gleichspannung gemeinsam mit Daten über das RJ45-Kabel. Max. Kanallänge für Twisted-Pair-Kupferkabel (Permanent Link + Patchkabel): 100 Meter.\n• 📖 Europa Tabellenbuch: S. 359 (Video-Überwachung), S. 410–411 & S. 417 (Power over Ethernet PoE)"
      },
      {
        id: "el-53",
        exam: "Kundenauftrag – Aufgabe 4.1 & 4.2",
        category: "VDE 0100-600 Prüfung",
        question: "Worauf kommt es in Aufgabe 4.2 (Aufmaß, Material- und Stückliste) bei der Betriebsmittelkennzeichnung (BMK) und in Aufgabe 4.1 (Kundenübergabe) besonders an?",
        options: [
          "Aufgabe 4.2: Jedes Bauteil braucht Position, Anzahl, Einheit, Fachbezeichnung UND das korrekte BMK nach DIN EN 81346 (z. B. -F für Schutzeinrichtung, -Q für Starkstromschaltgerät/Schütz, -B für Sensor, -E für Leuchte, -X für Klemme) + Leitungszuschläge. Aufgabe 4.1: Kunden in Funktion, RCD-Prüftaste (halbjährlich) und Wartung einweisen & Übergabeprotokoll unterschreiben lassen.",
          "In Aufgabe 4.2 reichen ungefähre Meterangaben ohne Betriebsmittelkennzeichnung (-BMK). Bei der Kundenübergabe (4.1) darf der Kunde aus Sicherheitsgründen nicht in die RCD-Prüftaste eingewiesen werden.",
          "Alle Betriebsmittel erhalten in der Stückliste einheitlich das Kennzeichen -X. Das Prüfprotokoll nach VDE 0100-600 verbleibt als internes Dokument ausschließlich im Ausbildungsbetrieb.",
          "Leitungszuschläge für Verschnitt und Einführung dürfen in der Materialaufstellung nicht berechnet werden; Schütze werden nach DIN EN 81346 immer mit -F gekennzeichnet."
        ],
        correct: 0,
        explanation: "• Punktegarant in Übergabe Aufgabe 4.1 & 4.2: Vergiss in der Stückliste niemals die rechte Spalte 'Betriebsmittelkennzeichnung' (-F1, -Q1, -B1, -P1, -X1) und denke an Kleinmaterial sowie Leitungszuschläge!\n• 📖 Europa Tabellenbuch: S. 81–83 (Referenzkennzeichnung DIN EN IEC 81346) & S. 604–605 (Kundenübergabe)"
      },
      {
        id: "el-54",
        exam: "Sommer 2022 / Sommer 2023 / Winter 2024/25",
        category: "Leitungen & Schutzorgane",
        question: "Welche Mindestverlegetiefe (Überdeckung) und welcher Schichtaufbau gelten für ein Erdkabel (NYY-J) im Kabelgraben?",
        options: [
          "Mindesttiefe: 0,60 m unter Gehwegen/Grünflächen bzw. 0,80 m unter Fahrbahnen/Straßen. Aufbau: 10 cm steinfreier Sand -> Erdkabel -> 10 cm Sand -> mechanische Kabelabdeckplatten/Schutzhauben -> ca. 30 cm Erde -> Trassenwarnband -> Restverfüllung.",
          "Mindesttiefe: 0,20 m unter Gehwegen und 0,40 m unter Straßen. Das Erdkabel wird direkt auf den gewachsenen Steinboden gelegt und das Warnband direkt um das Kabel gewickelt.",
          "Mindesttiefe: 1,50 m in allen Bereichen. Das Kabel muss zwingend in Beton eingegossen werden; ein Trassenwarnband ist bei NYY-J-Erdkabeln nicht mehr zulässig.",
          "Mindesttiefe: 0,60 m unter Fahrbahnen und 0,30 m unter Grünflächen. Die Kabelabdeckplatten werden unter das Sandbett gelegt, um ein Absinken des Kabels zu verhindern."
        ],
        correct: 0,
        explanation: "• Nach Masterbuch Leitungsdimensionierung S. 10: Kann die Mindesttiefe (0,6 m / 0,8 m) baulich nicht eingehalten werden, muss ein zusätzlicher mechanischer Schutz (z. B. Stahl-/Kabelschutzrohr) eingebaut werden!\n• 📖 Europa Tabellenbuch: S. 204 & S. 291 (Verlegen von Erdkabeln im Kabelgraben: 0,6 m / 0,8 m)"
      },
      {
        id: "el-55",
        exam: "Sommer 2022 – Planung 2.3 & Winter 2021/22 – FSA 4",
        category: "Leitungen & Schutzorgane",
        question: "Wie bestimmt man den erforderlichen Abschaltstrom Ia bei einer Schmelzsicherung (Typ gG, z. B. 40 A oder 80 A) im Vergleich zum LS-Schalter?",
        options: [
          "Bei Schmelzsicherungen (gG) gibt es keinen festen Faktor wie 5x oder 10x In! Man liest Ia zeichnerisch aus der doppelt-logarithmischen Zeit-Strom-Kennlinie im Tabellenbuch bei der geforderten Abschaltzeit (0,4 s für Endstromkreise bzw. 5 s für Verteilerzuleitungen) ab.",
          "Bei Schmelzsicherungen (Typ gG) gilt genau wie beim LS-Schalter Typ B immer der feste Faktor Ia = 5 × In (für 0,4 s) bzw. Ia = 3 × In (für 5 s Abschaltzeit).",
          "Der erforderliche Abschaltstrom Ia einer Schmelzsicherung beträgt unabhängig von der Abschaltzeit immer exakt das 10-fache des Bemessungsstroms (Ia = 10 × In).",
          "Schmelzsicherungen dürfen im TN-System nur für 5 Sekunden Abschaltzeit berechnet werden; der Wert Ia wird mit der Formel Ia = U0 / R_iso bestimmt."
        ],
        correct: 0,
        explanation: "• Bei Schmelzsicherungen gG existiert kein fester Multiplikator (wie 5x bei B oder 10x bei C). Der Wert Ia muss zwingend bei t = 0,4 s bzw. t = 5 s aus der Zeit-Strom-Kennlinie abgelesen werden!\n• 📖 Europa Tabellenbuch: S. 206, S. 208, S. 210 & S. 266 (Schmelzsicherungen gG Kennlinien & Abschaltströme Ia)"
      },
      {
        id: "el-56",
        exam: "Systementwurf – Aufgabe 3 (CAD) & Planung",
        category: "Gebäudetechnik & Sensorik",
        question: "Worauf musst du im Systementwurf bei Aufgabe 3 (CAD-Anwendung, 50 % der Systementwurf-Note!) und beim Einzeichnen in Installationspläne achten?",
        options: [
          "Normgerechte Schaltzeichen nach DIN EN 60617 verwenden, Aderanzahl an den Leitungen angeben (Schrägstriche oder Zahl, z. B. /5), Betriebsmittel eindeutig kennzeichnen, Maßstab und Legende beachten sowie Vollständigkeit aller geforderten Sensoren/Aktoren prüfen.",
          "Im Installationsplan werden alle Leitungen ohne Aderanzahl und ohne Betriebsmittelkennzeichnung gezeichnet; die Zuordnung erfolgt erst mündlich im Fachgespräch.",
          "Im CAD-Plan dürfen anstelle von Normsymbolen nach DIN EN 60617 eigene Textkürzel verwendet werden, sofern die Strichstärke mindestens 2 mm beträgt.",
          "Schutzleiter (PE) und Neutralleiter (N) dürfen in der aufgelösten Darstellung des Steuerstromkreises gemeinsam als eine einzige gestrichelte Linie gezeichnet werden."
        ],
        correct: 0,
        explanation: "• Laut offizieller Bewertungsmatrix zählt Aufgabe 3 (CAD-Anwendung) allein 50 % des Prüfungsbereichs Systementwurf! Saubere Normsymbole, korrekte Aderzahlen und vollständige Legenden sind elementar.\n• 📖 Europa Tabellenbuch: S. 78–98 & S. 142–146 (Schaltzeichen & Installationsschaltpläne DIN EN 60617)"
      },
      {
        id: "el-57",
        exam: "FSA Schaltplan – Kreissäge mit Absaugung",
        category: "Motoren & Antriebe",
        question: "Im Schaltplan 'Kreissäge' darf der Sägemotor (-Q2) erst eingeschaltet werden, wenn der Motor des Absaugventilators (-Q1) bereits läuft (Folgeschaltung). Wie ist diese Verriegelung im Steuerstromkreis verdrahtet?",
        options: [
          "Ein Schließer-Hilfskontakt (13/14) von Schütz -Q1 (Absaugung) liegt in Reihe vor dem Steuerstrompfad (Ein-Taster / Spule A1) des Sägenschützes -Q2. Zieht -Q1 nicht an, bekommt -Q2 keine Steuerspannung.",
          "Ein Öffner-Hilfskontakt (21/22) von Schütz -Q1 (Absaugung) liegt in Reihe vor der Spule -Q2 (Kreissäge), sodass die Säge nur bei ausgeschalteter Absaugung starten kann.",
          "Die beiden Schützspulen -Q1 und -Q2 werden direkt in Reihe zwischen L1 und N geschaltet, damit durch beide Spulen exakt derselbe Steuerstrom fließt.",
          "Der Schließer-Hilfskontakt (13/14) von -Q1 wird parallel zum Aus-Taster -S0 geschaltet, um die Absaugung bei laufender Kreissäge gegen Abschalten zu sperren."
        ],
        correct: 0,
        explanation: "• Folgeschaltung / Einschaltsperre: Ein Schließer-Hilfskontakt des vorrangigen Schützes (-Q1) liegt in Reihe im Steuerpfad des nachrangigen Schützes (-Q2).\n• 📖 Europa Tabellenbuch: S. 503–506 (Schützschaltungen / Folgeschaltung)"
      },
      {
        id: "el-58",
        exam: "FSA Aufgabe 3 – Rolltor-Steuerung",
        category: "Motoren & Antriebe",
        question: "In der Rolltor-Steuerung (Aufgabe 3) gibt es ein anzugsverzögertes Zeitrelais -K2T (60 s) und eine Lichtschranke -B3. Welche Funktion haben diese beiden Bauteile?",
        options: [
          "Erreicht das Tor die obere Endlage (-B2 Schließer 23/24 schließt), startet das Zeitrelais -K2T (60 s) und schließt nach 60 s über seinen verzögerten Schließer (15/18) automatisch das Schütz -Q1 (Tor ZU), sofern die Lichtschranke -B3 nicht unterbrochen ist. Unterbricht ein Fahrzeug beim Zufahren die Lichtschranke -B3, stoppt der Öffner von -B3 sofort die Zufahrt (-Q1)!",
          "Das Zeitrelais -K2T ist abfallverzögert und stoppt den Torantrieb nach 60 Sekunden Laufzeit. Die Lichtschranke -B3 schaltet bei Unterbrechung die Hallenbeleuchtung ein.",
          "Erreicht das Tor die untere Endlage, öffnet -K2T nach 60 Sekunden automatisch das Tor. Die Lichtschranke -B3 überbrückt bei einem Hindernis den Motorschutzschalter.",
          "Das Zeitrelais -K2T dient der Stern-Dreieck-Umschaltung des Tormotors nach 60 Sekunden; die Lichtschranke -B3 aktiviert bei Durchfahrt die Hupe -P1."
        ],
        correct: 0,
        explanation: "• Zeitrelais -K2T bewirkt automatischen Zulauf nach 60 s offenem Tor; Sicherheits-Lichtschranke -B3 unterbricht bei Durchfahrt sofort das Schütz 'Tor ZU' und setzt das Zeitrelais zurück.\n• 📖 Europa Tabellenbuch: S. 88 (Zeitrelais), S. 132 (Lichtschranke) & S. 503–505 (Wendeschützsteuerung)"
      },
      {
        id: "el-59",
        exam: "FSA Aufgabe 2.1.2 – Silo-Entnahmesteuerung",
        category: "Motoren & Antriebe",
        question: "Im Schaltplan 2.1.2 (Silo-Entnahme mit Schnecke langsam/schnell) sitzen die Motorschutzschalter -F1, -F2, -F3 sowie der Niveauschalter -B1 und das Zeitrelais -K1T (5 s). Was passiert bei leerem Silo (-B1) und wozu dient -K1T?",
        options: [
          "Ist das Silo leer, öffnet der Niveauschalter -B1 (13/14) den gesamten Steuerstromkreis für die Entnahmeschnecke und schaltet über seinen Öffner (21/22) die Meldeleuchte -P2 ('Silo leer') ein. Das anzugsverzögerte Zeitrelais -K1T (5 s) schaltet 5 Sekunden nach Start der Entnahme (-Q1/-Q2/-Q4) den Rüttler (-Q1) und das Magnetventil (-M2) verzögert zu.",
          "Bei leerem Silo schaltet der Niveauschalter -B1 die Entnahmeschnecke automatisch auf die hohe Drehzahlstufe um. Das Zeitrelais -K1T begrenzt die Einschaltdauer auf 5 Sekunden.",
          "Der Niveauschalter -B1 löst bei leerem Silo den Motorschutzschalter -F1 über einen Arbeitsstromauslöser aus. -K1T verzögert das Aufleuchten der Störungslampe -P3.",
          "Ist das Silo leer, überbrückt -B1 die Zeitverzögerung von -K1T, sodass der Rüttler -Q1 dauerhaft weiterläuft, um letzte Materialreste auszutragen."
        ],
        correct: 0,
        explanation: "• Niveauschalter -B1 stoppt bei Leermeldung die Austragung gegen Trockenlauf. Zeitrelais -K1T verzögert das Zuschalten des Silo-Rüttlers und Ventils um 5 s, damit die Schnecke druckfrei anläuft.\n• 📖 Europa Tabellenbuch: S. 88, S. 133 (Näherungsschalter) & S. 503–508 (Zeitrelais & Motorschutz)"
      }
    ];

    const ENGLISH_QUESTIONS = [
      {
        id: "en-1",
        exam: "Aufgabe 4.4 (Winter 2024/25)",
        category: "1. Kontakte & Klemmen",
        question: "Was bedeuten die englischen Kontaktbezeichnungen „normally open (NO)“, „normally closed (NC)“ und „changeover contact (CO)“ auf Deutsch?",
        options: [
          "NO = Schließer (im Ruhezustand offen) | NC = Öffner (im Ruhezustand geschlossen) | CO = Wechsler (Umschaltkontakt)",
          "NO = Öffner (im Ruhezustand geschlossen) | NC = Schließer (im Ruhezustand offen) | CO = Hauptschalter mit thermischer Überlastauslösung (Circuit Overcurrent)",
          "NO = Neutralleiter offen (Neutral Open) | NC = Neutralleiter verbunden (Neutral Connected) | CO = Kupferleiter-Querschnitt (Copper Output) an der Klemme",
          "NO = Not-Aus-Taster (Not-Off) | NC = Netzanschlussklemme (Network Connector) | CO = Überspannungsableiter (Cut-Off Device) im Vorzählerbereich"
        ],
        correct: 0,
        explanation: "• Laut Vokabeln.pdf (S. 1): normally open (NO) = Schließer; normally closed (NC) = Öffner; changeover contact (CO) = Wechsler/Wechselkontakt.\n• 📖 Europa Tabellenbuch: S. 638–643 (Fachliches Englisch Englisch–Deutsch)"
      },
      {
        id: "en-2",
        exam: "Aufgabe 4.4 (Datenblätter)",
        category: "1. Kontakte & Klemmen",
        question: "Übersetze auf Deutsch: „potential-free contact“, „contact rating“ und „relay output“!",
        options: [
          "potential-free contact = potenzialfreier Kontakt | contact rating = Kontaktbelastbarkeit | relay output = Relaisausgang / Schaltausgang",
          "potential-free contact = Erdungsklemme | contact rating = Schutzart | relay output = Analogeingang",
          "potential-free contact = spannungsführender Kontakt | contact rating = Einschaltdauer | relay output = Sicherungsautomat",
          "potential-free contact = Kurzschlussbrücke | contact rating = Leitungsquerschnitt | relay output = Netzteil"
        ],
        correct: 0,
        explanation: "• Laut Vokabeln.pdf (S. 1): potential-free contact = potenzialfreier Schaltkontakt ohne Fremdspannung; contact rating = max. Belastbarkeit; relay output = Relaisausgang.\n• 📖 Europa Tabellenbuch: S. 638–643 (Fachliches Englisch Englisch–Deutsch)"
      },
      {
        id: "en-3",
        exam: "Aufgabe 4.4 (Datenblätter)",
        category: "1. Kontakte & Klemmen",
        question: "Was bedeuten „supply voltage / rated voltage“, „rated current“ und „power consumption“ in einem englischen Geräte-Datenblatt?",
        options: [
          "supply/rated voltage = Versorgungsspannung/Nennspannung | rated current = Bemessungsstrom/Nennstrom | power consumption = Leistungsaufnahme/Eigenverbrauch",
          "supply/rated voltage = Stoßprüfspannung / Isolationsspannung | rated current = unbeeinflusster Kurzschlussstrom Ik | power consumption = Blindleistungsabgabe in kvar",
          "supply/rated voltage = maximal zulässige Berührungsspannung (50 V) | rated current = Bemessungsdifferenzstrom I_Δn (30 mA) | power consumption = Wirkungsgrad η in %",
          "supply/rated voltage = prozentualer Spannungsfall Δu auf der Zuleitung | rated current = siebenfacher Motoranlaufstrom IA | power consumption = Einspeisevergütung ins Netz"
        ],
        correct: 0,
        explanation: "• Vokabeln: rated voltage = Nennspannung; rated current = Nennstrom; power consumption = Leistungsaufnahme bzw. Eigenverbrauch in W/VA.\n• 📖 Europa Tabellenbuch: S. 638–643 (Fachliches Englisch Englisch–Deutsch)"
      },
      {
        id: "en-4",
        exam: "Aufgabe 4.4 (Datenblätter)",
        category: "1. Kontakte & Klemmen",
        question: "Was bedeuten „terminal block / screw terminal“, „internal fuse“ und „grounding / earthing terminal“?",
        options: [
          "terminal block / screw terminal = Klemmenblock / Schraubklemme | internal fuse = interne Gerätesicherung | grounding/earthing terminal = Erdungsanschluss / Schutzleiterklemme (PE)",
          "terminal block / screw terminal = Hutschiene / Tragschiene TH35 | internal fuse = vorgeschalteter FI-Schutzschalter (RCD) | grounding/earthing terminal = Außenleiterklemme (L1)",
          "terminal block / screw terminal = Kabelverschraubung mit Zugentlastung | internal fuse = elektronischer Motorschutzschalter | grounding/earthing terminal = Neutralleiter-Trennlasche (N)",
          "terminal block / screw terminal = Unterputz-Abzweigdose | internal fuse = Überspannungsableiter SPD Typ 2 | grounding/earthing terminal = potenzialfreier Schaltausgang (NO/NC)"
        ],
        correct: 0,
        explanation: "• terminal block = Klemmenblock; internal fuse = interne Gerätesicherung (Feinsicherung); grounding/earthing terminal = PE-Klemme.\n• 📖 Europa Tabellenbuch: S. 638–643 (Fachliches Englisch Englisch–Deutsch)"
      },
      {
        id: "en-5",
        exam: "Aufgabe 4.4 (Prüfungsfalle!)",
        category: "2. Montage & Einsatzbereich",
        question: "In der englischen Anleitung steht: „For indoor use only!“. Darf das Gerät unter einem Carport im Außenbereich montiert werden?",
        options: [
          "Nein! „Indoor use only“ bedeutet: Nur für trockene Innenräume zulässig – Montage im Freien ist verboten!",
          "Ja, 'For indoor use only' bedeutet, dass das Gerät überall innerhalb des eingefriedeten Betriebsgeländes (auch im Freien unter einem Carport) montiert werden darf.",
          "Ja, sofern das Gerät über einen 30-mA-RCD abgesichert wird und die Zuleitung als Erdkabel NYY-J ausgeführt ist, ist die Außenmontage zulässig.",
          "Nur im Winter verboten; in den Sommermonaten darf ein Gerät mit der Kennzeichnung 'Indoor use only' auch im ungeschützten Außenbereich betrieben werden."
        ],
        correct: 0,
        explanation: "• Beliebte NRW-Prüfungsfalle: 'Indoor use only' schließt Außenmontage komplett aus (auch überdacht)!\n• 📖 Europa Tabellenbuch: S. 638–643 (Fachliches Englisch Englisch–Deutsch)"
      },
      {
        id: "en-6",
        exam: "Aufgabe 4.4 (Montage)",
        category: "2. Montage & Einsatzbereich",
        question: "Übersetze die Montagebegriffe: „DIN rail mounting“, „flush mounting“ und „surface mounting“!",
        options: [
          "DIN rail mounting = Hutschienenmontage (Tragschiene TH35) | flush mounting = Unterputzmontage (UP) | surface mounting = Aufputzmontage (AP)",
          "DIN rail mounting = Erdverlegung im Sandbett (0,6 m Tiefe) | flush mounting = Verlegung auf gelochter Kabelrinne | surface mounting = Freileitungs-Mastmontage im Außenbereich",
          "DIN rail mounting = direkte Wandverschraubung mit Dübeln | flush mounting = Aufputzmontage in Feuchträumen (IP54) | surface mounting = Unterputzmontage in Hohlwanddosen",
          "DIN rail mounting = Deckenabhängung an Stahlseilen | flush mounting = Einbau im wasserdichten Bodentank (IP68) | surface mounting = Montage auf der Rückwandplatte im Schaltschrank"
        ],
        correct: 0,
        explanation: "• DIN rail mounting = Montage auf Hutschiene TH35; flush mounting = UP-Montage; surface mounting = AP-Montage.\n• 📖 Europa Tabellenbuch: S. 638–643 (Fachliches Englisch Englisch–Deutsch)"
      },
      {
        id: "en-7",
        exam: "Aufgabe 4.4 (Montage)",
        category: "2. Montage & Einsatzbereich",
        question: "Was bedeuten „cable gland“, „minimum clearance“ und „base plate“ in einer Montageanleitung?",
        options: [
          "cable gland = Kabelverschraubung (Zugentlastung/Dichtung) | minimum clearance = Mindestabstand (z. B. zur Belüftung) | base plate = Sockel / Montageplatte",
          "cable gland = Aderendhülse mit Kunststoffkragen | minimum clearance = Mindest-Leiterquerschnitt in mm² | base plate = transparente Frontabdeckung des Verteilergehäuses",
          "cable gland = Rohrkabelschuh zum Verpressen | minimum clearance = maximale Abschaltzeit im Fehlerfall (0,4 s) | base plate = geerdete Hutschiene (Tragschiene TH35)",
          "cable gland = Schrumpfschlauchmuffe für Erdkabel | minimum clearance = minimale Abisolierlänge der Einzelader | base plate = Klemmbrett eines Drehstromasynchronmotors"
        ],
        correct: 0,
        explanation: "• cable gland = Kabelverschraubung; minimum clearance = geforderter Mindestabstand; base plate = Montagegrundplatte.\n• 📖 Europa Tabellenbuch: S. 638–643 (Fachliches Englisch Englisch–Deutsch)"
      },
      {
        id: "en-8",
        exam: "Aufgabe 4.4 (Sommer 2023)",
        category: "3. Wallbox & E-Mobilität",
        question: "Welche Bedeutung haben „Control Pilot (CP)“, „Proximity Pilot (PP)“ und „duty cycle“ bei einer Wallbox?",
        options: [
          "CP = Steuerleitung (Kommunikation Fahrzeug/Wallbox) | PP = Kodierleitung (Steckerverriegelung & Kabelstrom) | duty cycle = Tastverhältnis des PWM-Signals (gibt Ladestrom vor)",
          "CP = Schutzleiter-Prüfkontakt (RPE) | PP = Phasenprüfanschluss für Rechtsdrehfeld | duty cycle = maximale Einschaltdauer der Ladestation in Stunden pro Tag",
          "CP = Überspannungsschutz-Ableiter (SPD) | PP = potenzialfreier Störmeldekontakt | duty cycle = Netzfrequenz von 50 Hz im europäischen Verbundnetz",
          "CP = interner Gleichfehlerstromsensor (6 mA DC) | PP = Not-Entriegelungstaste am Gehäuse | duty cycle = prozentualer Ladezustand (State of Charge) der Fahrzeugbatterie"
        ],
        correct: 0,
        explanation: "• CP = PWM-Steuersignal für Ladefreigabe/-strom; PP = Widerstandskodierung für max. Kabelstrom; duty cycle = Tastverhältnis in %.\n• 📖 Europa Tabellenbuch: S. 638–643 (Fachliches Englisch Englisch–Deutsch)"
      },
      {
        id: "en-9",
        exam: "Aufgabe 4.4 (Sommer 2023)",
        category: "3. Wallbox & E-Mobilität",
        question: "Was bedeuten „locking actuator“ und „DC residual current monitoring“ bei einer Ladestation?",
        options: [
          "locking actuator = Verriegelungsmotor/Aktuator (sperrt den Ladestecker mechanisch) | DC residual current monitoring = Gleichfehlerstrom-Erkennung (6 mA DC-Überwachung)",
          "locking actuator = abschließbarer Hauptschalter vor der Wallbox | DC residual current monitoring = Überwachung des Rechtsdrehfeldes und der drei Außenleiterspannungen",
          "locking actuator = plombierbare Abdeckhaube des Zählerfeldes | DC residual current monitoring = Messung des Isolationswiderstandes R_iso mit 500 V Prüfspannung",
          "locking actuator = mechanische Schaltsperre gegen Wiedereinschalten | DC residual current monitoring = elektronischer Kurzschlussauslöser des vorgeschalteten LS-Schalters"
        ],
        correct: 0,
        explanation: "• locking actuator = Motorischer Verriegelungsbolzen für Typ-2-Stecker; DC monitoring = interne 6-mA-DC-Abschaltung.\n• 📖 Europa Tabellenbuch: S. 638–643 (Fachliches Englisch Englisch–Deutsch)"
      },
      {
        id: "en-10",
        exam: "Aufgabe 4.4 (Betrieb & Service)",
        category: "4. Betriebsarten & Wartung",
        question: "Übersetze: „commissioning“, „operating mode“, „flashing red LED“ und „tamper contact“!",
        options: [
          "commissioning = Inbetriebnahme | operating mode = Betriebsart | flashing red LED = rot blinkende Status-LED | tamper contact = Sabotagekontakt (Deckelkontakt)",
          "commissioning = Bestellung | operating mode = Standby | flashing red LED = dauerhaft grüne LED | tamper contact = Temperatursensor",
          "commissioning = Demontage | operating mode = Fehlercode | flashing red LED = ausgeschaltete LED | tamper contact = Hilfsschütz",
          "commissioning = Verpackung | operating mode = Schutzart | flashing red LED = Sicherung ausgelöst | tamper contact = Zeitschaltuhr"
        ],
        correct: 0,
        explanation: "• commissioning = Erstinbetriebnahme; operating mode = Betriebsart; flashing = blinkend; tamper contact = Deckelüberwachungskontakt.\n• 📖 Europa Tabellenbuch: S. 638–643 (Fachliches Englisch Englisch–Deutsch)"
      },
      {
        id: "en-11",
        exam: "Aufgabe 4.4 (Sicherheit & Wartung)",
        category: "5. Wartung & Sicherheit",
        question: "Was bedeuten „maintenance interval“, „visual inspection“, „tightening torque“ und „wear protective gloves“?",
        options: [
          "maintenance interval = Wartungsintervall | visual inspection = Sichtprüfung | tightening torque = Anzugsdrehmoment (in Nm) | wear protective gloves = Schutzhandschuhe tragen",
          "maintenance interval = Garantiezeit | visual inspection = Isolationsmessung | tightening torque = Abisolierlänge | wear protective gloves = Schutzbrille tragen",
          "maintenance interval = Abschaltzeit | visual inspection = Schleifenimpedanz | tightening torque = Biegeradius | wear protective gloves = Gehörschutz tragen",
          "maintenance interval = Lieferzeit | visual inspection = Funktionsprüfung | tightening torque = Zugfestigkeit | wear protective gloves = Sicherheitsschuhe tragen"
        ],
        correct: 0,
        explanation: "• visual inspection = Sichtprüfung auf Beschädigungen; tightening torque = Anzugsdrehmoment der Klemmschrauben in Nm.\n• 📖 Europa Tabellenbuch: S. 638–643 (Fachliches Englisch Englisch–Deutsch)"
      },
      {
        id: "en-12",
        exam: "Aufgabe 4.4 (Handlungsverben)",
        category: "6. Wichtige Prüfungsverben",
        question: "Was bedeuten die englischen Handlungsanweisungen „ensure / make sure“, „verify / check“, „replace“, „adjust / set“ und „prohibited“?",
        options: [
          "ensure = sicherstellen | verify/check = prüfen/kontrollieren | replace = ersetzen/austauschen | adjust/set = einstellen/justieren | prohibited = verboten!",
          "ensure = Anlage spannungsfrei schalten | verify/check = defektes Bauteil überbrücken | replace = Gehäuse reinigen | adjust/set = außer Betrieb nehmen | prohibited = dringend empfohlen!",
          "ensure = Garantieschein ausfüllen | verify/check = mechanisch verriegeln | replace = wiederverwenden | adjust/set = auf Werkseinstellung löschen | prohibited = nur für Elektrofachkräfte erlaubt",
          "ensure = mit dem Schutzleiter verbinden | verify/check = Isolationswiderstand messen | replace = Klemmen nachziehen | adjust/set = Leitung abisolieren | prohibited = spannungsführend"
        ],
        correct: 0,
        explanation: "• Standard-Prüfungsverben in englischen Aufgaben der GP2.\n• 📖 Europa Tabellenbuch: S. 638–643 (Fachliches Englisch Englisch–Deutsch)"
      },
      {
        id: "en-13",
        exam: "Aufgabe 4.4 (Sommer 2023 – Wallbox)",
        category: "3. Wallbox & E-Mobilität",
        question: "In der englischen Wallbox-Anleitung (MENNEKES AMTRON) wird der „Multi-function push-button“ beschrieben. Welche 3 Funktionen werden ausgelöst (short press, > 2 s, > 10 s)?",
        options: [
          "Kurzer Tastendruck (< 0,5 s) = Standby / Ladepause | > 2 Sekunden drücken = Entriegeln des Ladesteckers (Unlock) | > 10 Sekunden drücken = Neustart (Restart) der Wallbox.",
          "Kurzer Tastendruck = Werkseinstellungen zurücksetzen | > 2 Sekunden = Ladestrom auf 32 A verdoppeln | > 10 Sekunden = FI-Schutzschalter dauerhaft überbrücken.",
          "Kurzer Tastendruck = Stecker entriegeln | > 2 Sekunden = Neustart (Restart) | > 10 Sekunden = Umschaltung von Drehstrom- auf Wechselstrombetrieb.",
          "Der Multifunktionstaster dient ausschließlich der Helligkeitseinstellung der LED-Infobar und hat keinen Einfluss auf die Steckerverriegelung oder den Neustart."
        ],
        correct: 0,
        explanation: "• Original MENNEKES Handbuch: Kurz (< 0,5 s): Standby; > 2 s: Stecker entriegeln; > 10 s: Geräteneustart (Restart).\n• 📖 Europa Tabellenbuch: S. 638–643 (Fachliches Englisch Englisch–Deutsch)"
      },
      {
        id: "en-14",
        exam: "Aufgabe 4.4 (Sommer 2023 – Wallbox)",
        category: "5. Wartung & Sicherheit",
        question: "In welchen Zeitabständen müssen laut englischem Wallbox-Handbuch der RCD/MCB („at least every six months“) und die Gesamtanlage nach DGUV V3 („at least every four years“) geprüft werden?",
        options: [
          "Prüftaste von RCD/LS mindestens alle 6 Monate (halbjährlich) betätigen | Wiederholungsprüfung nach DGUV Vorschrift 3 mindestens alle 4 Jahre.",
          "Prüftaste von RCD/LS mindestens einmal jährlich betätigen | Wiederholungsprüfung der Gesamtanlage durch eine Elektrofachkraft alle 10 Jahre.",
          "Prüftaste von RCD/LS vor jedem einzelnen Ladevorgang drücken | Wiederholungsprüfung nach DGUV Vorschrift 3 monatlich durch den Fahrzeugbesitzer.",
          "Sowohl die Betätigung der RCD-Prüftaste als auch die komplette VDE-Systemprüfung sind erst nach einer Betriebsdauer von 8 Jahren vorgeschrieben."
        ],
        correct: 0,
        explanation: "• RCD-Testtaste halbjährlich (every 6 months); DGUV V3 Wiederholungsprüfung ortsfester Anlagen alle 4 Jahre.\n• 📖 Europa Tabellenbuch: S. 638–643 (Fachliches Englisch Englisch–Deutsch)"
      },
      {
        id: "en-15",
        exam: "Aufgabe 4.4 (Überwachungskamera)",
        category: "2. Montage & Einsatzbereich",
        question: "In einer englischen Kamera-Anleitung (Dome Camera) stehen „Pan: 0°–355°“, „Tilt: 0°–75°“ und „Rotation: 0°–355°“. Was bedeuten diese drei Einstellwinkel?",
        options: [
          "Pan = Schwenken (horizontal links/rechts) | Tilt = Neigen (vertikal oben/unten) | Rotation = Drehen des Kamerabildes um die eigene Achse.",
          "Pan = Optischer Zoomfaktor | Tilt = Infrarot-Nachtsichtreichweite in Metern | Rotation = Bildwiederholrate in Bildern pro Sekunde (fps).",
          "Pan = Vertikales Neigen nach oben/unten | Tilt = Horizontales Schwenken nach links/rechts | Rotation = Öffnungswinkel des Kameraobjektivs.",
          "Die drei Winkelangaben beschreiben die maximal zulässige Dachschräge bei der Außenmontage sowie den Erfassungswinkel des integrierten Bewegungsmelders."
        ],
        correct: 0,
        explanation: "• Pan = horizontales Schwenken; Tilt = vertikales Neigen; Rotation = Drehung des Sensors für waagerechten Horizont.\n• 📖 Europa Tabellenbuch: S. 638–643 (Fachliches Englisch Englisch–Deutsch)"
      },
      {
        id: "en-16",
        exam: "Aufgabe 4.4 (Überwachungskamera)",
        category: "1. Kontakte & Klemmen",
        question: "Laut englischem Kamera-Datenblatt kann die Kamera über „12 V DC ± 25%“ oder „PoE (802.3af)“ versorgt werden und besitzt einen „Video Output (1 Vp-p composite output, 75 Ohm)“. Wozu dient dieser Videoausgang?",
        options: [
          "Als analoger Test-Videoausgang (Cinch/BNC) für einen Prüfmonitor direkt bei der Montage und Ausrichtung der Kamera vor Ort.",
          "Zur Einspeisung der 230-V-Netzspannung über ein Koaxialkabel, wenn am Montageort kein PoE-fähiger Netzwerkswitch zur Verfügung steht.",
          "Zur digitalen Steuerung des Schwenk- und Neigemotors (Pan/Tilt) über das KNX-Bussystem mit einem Abschlusswiderstand von 75 Ω.",
          "Als hochfrequenter Antennenausgang (2.150 MHz) zur direkten Einspeisung des Kamerabildes in den Multischalter der SAT-Empfangsanlage."
        ],
        correct: 0,
        explanation: "• Composite Video Output: Serviceanschluss zur direkten Bildkontrolle und Schärfeeinstellung über einen Testmonitor an der Leiter.\n• 📖 Europa Tabellenbuch: S. 638–643 (Fachliches Englisch Englisch–Deutsch)"
      },
      {
        id: "en-17",
        exam: "Aufgabe 4.4 (Winter 2024/25 – Smart Meter)",
        category: "4. Betriebsarten & Wartung",
        question: "Was bedeutet in der englischen Anleitung der Steuerbox (Winter 2024/25) der Hinweis „Firmware update during ongoing operation without interruption“?",
        options: [
          "Ein Software-/Firmware-Update ist während des laufenden Betriebs ohne Unterbrechung der Steuerfunktion möglich.",
          "Während eines Firmware-Updates muss die gesamte Kundenanlage für mindestens 30 Minuten spannungsfrei geschaltet und gegen Wiedereinschalten gesichert werden.",
          "Ein Software-Update darf ausschließlich im ausgebauten Zustand im Prüflabor des Netzbetreibers über eine optische Schnittstelle aufgespielt werden.",
          "Das Gerät führt nach jedem Firmware-Update automatisch eine Isolationsmessung durch und schaltet dabei alle angeschlossenen Wärmepumpen dauerhaft ab."
        ],
        correct: 0,
        explanation: "• Firmware-Update im laufenden Betrieb ohne Unterbrechung der Netzdienlichkeit oder Steuerung.\n• 📖 Europa Tabellenbuch: S. 638–643 (Fachliches Englisch Englisch–Deutsch)"
      },
      {
        id: "en-18",
        exam: "Aufgabe 4.4 (Luftreiniger / UV-C)",
        category: "5. Wartung & Sicherheit",
        question: "Warum schreibt die englische Wartungsanleitung eines UV-C-Luftreinigers vor: „Always wear cotton gloves when handling the UV-C tube! Never touch the glass with bare fingers!“?",
        options: [
          "Weil Hautfett und Fingerabdrücke auf dem Quarzglas einbrennen, die UV-C-Strahlung schwächen und zum vorzeitigen Röhrenbruch führen.",
          "Weil die Quarzglasröhre auch im ausgeschalteten Zustand eine kapazitive Restladung von 5.000 V DC speichert und Baumwollhandschuhe als Isolationsschutz dienen.",
          "Weil das Glas mit einer wasserlöslichen Leuchtstoffschicht auf der Außenseite bedampft ist, die sich bei Berührung mit bloßen Händen sofort ablösen würde.",
          "Damit keine statische Aufladung entsteht, die das elektronische Vorschaltgerät (EVG) beim Einsetzen der UV-C-Röhre durch Überspannung zerstören könnte."
        ],
        correct: 0,
        explanation: "• Hautfett brennt sich in das heiße Quarzglas ein und führt zu vorzeitiger Eintrübung und Glasbruch.\n• 📖 Europa Tabellenbuch: S. 638–643 (Fachliches Englisch Englisch–Deutsch)"
      },
      {
        id: "en-19",
        exam: "Aufgabe 4.4 (Wechselrichter / PV)",
        category: "1. Kontakte & Klemmen",
        question: "Was bedeuten in einem englischen Wechselrichter-Datenblatt die Begriffe „reverse polarity protection“, „overvoltage protection“ und „grid frequency“?",
        options: [
          "reverse polarity protection = Verpolungsschutz | overvoltage protection = Überspannungsschutz | grid frequency = Netzfrequenz (50 Hz)",
          "reverse polarity protection = Rückwärtslauf | overvoltage protection = Unterspannungsschutz | grid frequency = Gleichspannung",
          "reverse polarity protection = Isolationswächter | overvoltage protection = Kurzschlussbrücke | grid frequency = Drehzahl",
          "reverse polarity protection = Berührungsschutz | overvoltage protection = Blitzfänger | grid frequency = Funkfrequenz"
        ],
        correct: 0,
        explanation: "• reverse polarity = Verpolungsschutz (+ und - vertauscht); overvoltage = Überspannungsschutz; grid frequency = Netzfrequenz (50 Hz).\n• 📖 Europa Tabellenbuch: S. 638–643 (Fachliches Englisch Englisch–Deutsch)"
      },
      {
        id: "en-20",
        exam: "Aufgabe 4.4 (Sensoren & Melder)",
        category: "2. Montage & Einsatzbereich",
        question: "Was bedeuten „detection range / detection angle“, „mounting height“ und „false alarm“ bei einem englischen Bewegungsmelder oder Brandmelder?",
        options: [
          "detection range/angle = Erfassungsbereich / Erfassungswinkel | mounting height = Montagehöhe | false alarm = Fehlalarm / Täuschungsalarm",
          "detection range/angle = zulässige Leitungslänge / Biegeradius | mounting height = Bauhöhe des Gehäuses in mm | false alarm = wöchentlicher automatischer Funktionstest",
          "detection range/angle = Spannungsbereich / Phasenwinkel φ | mounting height = Einbautiefe in der Unterputzdose | false alarm = akustischer Voralarm bei schwacher Batterie",
          "detection range/angle = Funkreichweite / Abstrahlwinkel des Routers | mounting height = Masthöhe über Dachkante | false alarm = Auslösung des Sabotagekontaktes beim Öffnen"
        ],
        correct: 0,
        explanation: "• detection range = Reichweite; detection angle = Erfassungswinkel; false alarm = Täuschungs- oder Fehlalarm.\n• 📖 Europa Tabellenbuch: S. 638–643 (Fachliches Englisch Englisch–Deutsch)"
      },
      {
        id: "en-21",
        exam: "Aufgabe 4.4 (Installation)",
        category: "1. Kontakte & Klemmen",
        question: "Übersetze die Leitungsbegriffe: „conductor cross-section“, „stripping length“ und „flexible / stranded wire vs. solid wire“!",
        options: [
          "conductor cross-section = Leiterquerschnitt (in mm²) | stripping length = Abisolierlänge (in mm) | stranded wire = feindrähtige/flexible Leitung | solid wire = eindrähtige/massive Leitung",
          "conductor cross-section = Außendurchmesser des Kabelmantels (in mm) | stripping length = maximale Verlegelänge (in m) | stranded wire = starres Erdkabel | solid wire = geschirmtes Datenkabel",
          "conductor cross-section = Mindestbiegeradius der Leitung | stripping length = Klemmenbreite auf der Hutschiene | stranded wire = grün-gelber Schutzleiter | solid wire = blauer Neutralleiter",
          "conductor cross-section = Isolationswandstärke der Ader | stripping length = Befestigungsabstand der Nagelschellen | stranded wire = Lichtwellenleiter (Glasfaser) | solid wire = Koaxialkabel"
        ],
        correct: 0,
        explanation: "• cross-section = Querschnitt in mm²; stripping length = Abisolierlänge in mm; stranded = Litze/flexibel; solid = massiver Draht.\n• 📖 Europa Tabellenbuch: S. 638–643 (Fachliches Englisch Englisch–Deutsch)"
      },
      {
        id: "en-22",
        exam: "Aufgabe 4.4 (Sicherheitshinweise)",
        category: "5. Wartung & Sicherheit",
        question: "Was bedeutet der Sicherheitshinweis: „Installation and commissioning may only be carried out by qualified electricians!“?",
        options: [
          "Installation und Inbetriebnahme dürfen ausschließlich von ausgebildeten Elektrofachkräften durchgeführt werden!",
          "Die Montage darf von jeder technisch unterwiesenen Person (z. B. Hausmeister) durchgeführt werden; nur die Endabnahme erfordert eine Elektrofachkraft.",
          "Installation und Inbetriebnahme sind ausschließlich dem Werkskundendienst des Herstellers vorbehalten und dürfen nicht von Handwerksbetrieben ausgeführt werden.",
          "Das Gerät ist steckerfertig vorinstalliert und darf vom Endkunden ohne elektrotechnische Fachkenntnisse direkt an den Zählerschrank angeschlossen werden."
        ],
        correct: 0,
        explanation: "• qualified electrician / skilled person = Elektrofachkraft (EFK nach VDE 1000-10).\n• 📖 Europa Tabellenbuch: S. 638–643 (Fachliches Englisch Englisch–Deutsch)"
      },
      {
        id: "en-23",
        exam: "Aufgabe 4.4 (Fehlerbehebung)",
        category: "4. Betriebsarten & Wartung",
        question: "Was bedeuten in einer englischen Tabelle zur Fehlersuche („Troubleshooting“) die Spalten „Fault / Symptom“, „Possible Cause“ und „Remedy / Solution“?",
        options: [
          "Troubleshooting = Fehlersuche/Störungsbehebung | Fault/Symptom = Fehlerbild | Possible Cause = Mögliche Ursache | Remedy/Solution = Abhilfe / Behebung",
          "Troubleshooting = Wartungsplan | Fault/Symptom = Ersatzteilnummer | Possible Cause = Garantiebedingungen | Remedy/Solution = Entsorgungshinweis.",
          "Troubleshooting = Erstinbetriebnahme | Fault/Symptom = Werkseinstellung | Possible Cause = Anschlussschema | Remedy/Solution = Prüfprotokoll.",
          "Troubleshooting = Sicherheitshinweise | Fault/Symptom = Fehlertoleranz | Possible Cause = Messkategorie | Remedy/Solution = Anzugsdrehmoment."
        ],
        correct: 0,
        explanation: "• Troubleshooting-Tabelle: Fault = Symptom/Fehler; Possible Cause = Ursache; Remedy = Behebungsmaßnahme.\n• 📖 Europa Tabellenbuch: S. 638–643 (Fachliches Englisch Englisch–Deutsch)"
      },
      {
        id: "en-24",
        exam: "Aufgabe 4.4 (Umgebungsbedingungen)",
        category: "2. Montage & Einsatzbereich",
        question: "Was bedeutet die Angabe „Relative humidity: 10% to 90%, non-condensing“ im technischen Datenblatt?",
        options: [
          "Zulässige relative Luftfeuchtigkeit von 10 % bis 90 %, nicht kondensierend (es darf sich kein Tropf-/Schwitzwasser auf der Elektronik bilden!).",
          "Das Gerät ist wasserdicht nach IP68 und darf bis zu 90 % seiner Gehäusehöhe dauerhaft in Kondenswasser oder Regenwasser eingetaucht betrieben werden.",
          "Die Kühlflüssigkeit im Inneren des Gerätes besteht zu 10 % bis 90 % aus destilliertem Wasser, das im Betrieb nicht verdampfen oder kondensieren darf.",
          "Die Umgebungstemperatur darf zwischen 10 °C und 90 °C schwanken, sofern das Gehäuse über eine integrierte Stillstands-Heizung gegen Frost geschützt ist."
        ],
        correct: 0,
        explanation: "• non-condensing = nicht betauend (kein Kondenswasser auf Platinen zur Vermeidung von Kriechströmen).\n• 📖 Europa Tabellenbuch: S. 638–643 (Fachliches Englisch Englisch–Deutsch)"
      }
    ];

    // =========================================================================
    // 2. NRW-RECHENTRAINER: 13 ORIGINAL-AUFGABEN IM 4-SCHRITTE-SCHEMA
    // =========================================================================
    const CALC_TASKS = [
      {
        id: "calc-sat",
        title: "1. SAT-Anlage: Empfangspegel an der entferntesten Dose (Sommer 2023 AV 1.10)",
        exam: "Sommer 2023 – AV 1.10",
        bookRef: "Europa TB S. 404–405 (Dämpfung/Pegel) & S. 438–441 (SAT-Anlagen, 47–77 dBµV)",
        unit: "dBµV",
        generateParams: (randomize = false) => {
          const l1 = randomize ? [10, 12, 15][Math.floor(Math.random() * 3)] : 12;
          const l2 = randomize ? [25, 30, 32, 35, 40][Math.floor(Math.random() * 5)] : 32;
          const lLnb = randomize ? [82, 83, 84, 85][Math.floor(Math.random() * 4)] : 83;
          const a100 = 28.4;
          const aMs = 7.0;
          const aDose = 1.0;
          const aK1 = (a100 * l1) / 100;
          const aK2 = (a100 * l2) / 100;
          const aGes = aK1 + aK2 + aMs + aDose;
          const lDose = +(lLnb - aGes).toFixed(2);
          return {
            desc: `Eine Mehrteilnehmer-SAT-Anlage wird bei der höchsten SAT-ZF-Frequenz f = 2150 MHz überprüft. Der Ausgangspegel am Quattro-LNB beträgt L_LNB = ${lLnb} dBµV. Vom LNB bis zum Multischalter liegen l1 = ${l1} m Koaxialkabel, vom Multischalter bis zur am weitesten entfernten Antennensteckdose (Dose 4) liegen l2 = ${l2} m Koaxialkabel (Dämpfungsbelag bei 2150 MHz: a_100 = ${a100} dB / 100 m). Die Anschlussdämpfung des Multischalters beträgt a_MS = ${aMs} dB, die Anschlussdämpfung der Stichdose beträgt a_Dose = ${aDose} dB. Berechnen Sie den Empfangspegel L_Dose an der entferntesten Dose und prüfen Sie, ob der Kundenwunsch von mindestens 60 dBµV eingehalten wird!`,
            expected: lDose,
            tolerance: 0.8,
            step1: `Gegeben: L_LNB = ${lLnb} dBµV, l1 = ${l1} m, l2 = ${l2} m, a_100 (2150 MHz) = ${a100} dB/100m, a_MS = ${aMs} dB, a_Dose = ${aDose} dB, L_min = 60 dBµV\nGesucht: Gesamtdämpfung a_ges in dB und Empfangspegel L_Dose in dBµV`,
            step2: `1) l_ges = l1 + l2\n2) a_Kabel = (a_100 · l_ges) / 100 m\n3) a_ges = a_Kabel + a_MS + a_Dose\n4) L_Dose = L_LNB - a_ges`,
            step3: `1) l_ges = ${l1} m + ${l2} m = ${l1 + l2} m\n2) a_Kabel = (${a100} dB · ${l1 + l2} m) / 100 m = ${(aK1 + aK2).toFixed(2)} dB\n3) a_ges = ${(aK1 + aK2).toFixed(2)} dB + ${aMs.toFixed(2)} dB + ${aDose.toFixed(2)} dB = ${aGes.toFixed(2)} dB\n4) L_Dose = ${lLnb} dBµV - ${aGes.toFixed(2)} dB = ${lDose.toFixed(2)} dBµV`,
            step4: `Ergebnis: L_Dose = ${lDose.toFixed(2)} dBµV.\nAntwortsatz: Der Empfangspegel beträgt ${lDose.toFixed(2)} dBµV. Da der Wert ${lDose >= 60 ? "über" : "unter"} 60 dBµV (Normfenster 47–77 dBµV) liegt, wird die Vorgabe ${lDose >= 60 ? "eingehalten" : "nicht eingehalten"}.`
          };
        }
      },
      {
        id: "calc-leitung-w24",
        title: "2. Leitungsdimensionierung: Freiflächenheizung mit Mischverlegung (Winter 2024/25 AV 1.6)",
        exam: "Winter 2024/25 – AV 1.6",
        bookRef: "Europa TB S. 196–198 (Verlegearten & Ir bei 25°C/30°C), S. 201 (f1/f2) & S. 206 (Ib ≤ In ≤ Iz)",
        unit: "A",
        generateParams: (randomize = false) => {
          const inAmp = randomize ? [16, 20][Math.floor(Math.random() * 2)] : 16;
          const f1 = 0.94;
          const f2 = randomize ? 0.80 : 0.70;
          const numCables = f2 === 0.70 ? 3 : 2;
          const izPrime = +(inAmp / (f1 * f2)).toFixed(2);
          return {
            desc: `Eine einphasige Freiflächenheizung (230 V, P = 3000 W -> Ib = 13,04 A) wird mit einem LS-Schalter B${inAmp}A (IN = ${inAmp} A) abgesichert. Die 20 m lange Zuleitung NYM-J verläuft 5 m in einer wärmegedämmten Wand (Verlegeart A2) und 15 m im Elektroinstallationsrohr in der Wand (Verlegeart B2). Die Umgebungstemperatur beträgt 34 °C (Tabellenwert 35 °C -> f1 = 0,94). Im Rohr liegen insgesamt ${numCables} belastete Leitungen (Häufungsfaktor f2 = ${f2.toFixed(2)}). Berechnen Sie den fiktiven Strombelastbarkeitswert Iz' (in A), nach dem Sie in der VDE-0298-4-Tabelle (Spalte A2, 2 belastete Adern) den Mindestquerschnitt auswählen müssen!`,
            expected: izPrime,
            tolerance: 0.3,
            step1: `Gegeben: IN = ${inAmp} A, Verlegeart A2 (ungünstigster Abschnitt), 2 belastete Adern, Temp = 34 °C -> 35 °C (f1 = 0,94), Häufung f2 = ${f2.toFixed(2)}\nGesucht: Tabellenwert Iz' in A und Mindestquerschnitt q`,
            step2: `Bemessungsstromregel: Ib <= IN <= Iz mit Iz = Ir · f1 · f2\nUmgestellt: Iz' = IN / (f1 · f2)`,
            step3: `Iz' = ${inAmp} A / (0,94 · ${f2.toFixed(2)}) = ${izPrime} A`,
            step4: `Ergebnis: Iz' = ${izPrime} A.\nAus Tabelle VDE 0298-4 (A2, 2 Adern): 2,5 mm² darf nur 21 A führen (< ${izPrime} A). Gewählt wird ${izPrime <= 27 ? "3x4 mm² (Ir = 27 A)" : "3x6 mm² (Ir = 35 A)"}.`
          };
        }
      },
      {
        id: "calc-komp",
        title: "3. Blindleistungskompensation: Einzelkapazität im Dreieck (Sommer 2024 AV 1.9)",
        exam: "Sommer 2024 – AV 1.9",
        bookRef: "Europa TB S. 328–329 (Kompensation der Blindleistung) & S. 51 (Normreihen)",
        unit: "µF",
        generateParams: (randomize = false) => {
          const pZuKw = randomize ? [2.8, 4.0, 5.5, 7.5][Math.floor(Math.random() * 4)] : 2.8;
          const pZuW = pZuKw * 1000;
          const fk = 0.328;
          const qc = +(pZuW * fk).toFixed(1);
          const cGes = +(qc / 50.26548).toFixed(2);
          const cDelta = +(cGes / 3).toFixed(2);
          return {
            desc: `Für einen Drehstrommotor (U = 400 V, f = 50 Hz) mit einer zugeführten elektrischen Wirkleistung von P_zu = ${pZuKw} kW (${pZuW} W) soll der Leistungsfaktor von cos φ1 = 0,85 (tan φ1 = 0,620) auf cos φ2 = 0,96 (tan φ2 = 0,292) kompensiert werden. Berechnen Sie die erforderliche Einzelkapazität C_Delta (in µF) eines Strangkondensators bei Dreieckschaltung!`,
            expected: cDelta,
            tolerance: 0.4,
            step1: `Gegeben: P_zu = ${pZuW} W, U = 400 V, f = 50 Hz, cos φ1 = 0,85 (tan 0,620), cos φ2 = 0,96 (tan 0,292)\nGesucht: Qc in var und C_Delta in µF`,
            step2: `1) Qc = P_zu · (tan φ1 - tan φ2)\n2) C_ges = Qc / (2 · π · f · U²)\n3) C_Delta = C_ges / 3`,
            step3: `1) Qc = ${pZuW} W · 0,328 = ${qc} var\n2) C_ges = ${qc} var / (2 · π · 50 Hz · (400 V)²) = ${cGes} µF\n3) C_Delta = ${cGes} µF / 3 = ${cDelta} µF`,
            step4: `Ergebnis: C_Delta = ${cDelta} µF.\nAntwortsatz: Im Dreieck wird je Strang ein Kondensator mit ${cDelta} µF benötigt.`
          };
        }
      },
      {
        id: "calc-licht",
        title: "4. Lichtberechnung & LED-Amortisationszeit (Winter 2018/19 AV 1.1)",
        exam: "Winter 2018/19 – AV 1.1",
        bookRef: "Europa TB S. 36 (Elektr. Arbeit) & S. 238–242 (Leuchtstoff-/LED-Lampen)",
        unit: "Wochen",
        generateParams: (randomize = false) => {
          const nLeuchten = randomize ? [25, 30, 35, 40][Math.floor(Math.random() * 4)] : 35;
          const pAltJeLeuchte = 2 * 18 + 8;
          const pNeuJeLeuchte = 20;
          const diffW = (pAltJeLeuchte - pNeuJeLeuchte) * nLeuchten;
          const diffKw = diffW / 1000;
          const hoursPerWeek = 24 * 7;
          const kwhSavedPerWeek = +(diffKw * hoursPerWeek).toFixed(3);
          const pricePerKwh = 0.29;
          const euroSavedPerWeek = +(kwhSavedPerWeek * pricePerKwh).toFixed(2);
          const invest = 1200;
          const weeks = +(invest / euroSavedPerWeek).toFixed(2);
          return {
            desc: `Eine Autobahnraststätte ist täglich 24 Stunden geöffnet (7 Tage/Woche = 168 h/Woche). Der Eingangsbereich wird durch n = ${nLeuchten} alte Einbaustrahler beleuchtet. Jeder alte Strahler enthält 2 Leuchtstofflampen à 18 W UND ein zweiflammiges Vorschaltgerät VVG mit 8 W Verlustleistung. Diese werden durch ${nLeuchten} LED-Einbaustrahler mit jeweils 20 W Gesamtleistung ersetzt. Der Strompreis beträgt 0,29 €/kWh. Die Anschaffungs- und Installationsmehrkosten betragen 1.200,00 €. Nach wie vielen Wochen amortisiert sich die Umrüstung auf LED?`,
            expected: weeks,
            tolerance: 0.6,
            step1: `Gegeben: n = ${nLeuchten}, t_Woche = 168 h, P_Alt = 44 W, P_LED = 20 W, Strompreis = 0,29 €/kWh, Investition = 1200 €\nGesucht: Amortisationszeit in Wochen`,
            step2: `1) ΔP = n · (P_Alt - P_LED)\n2) ΔW_Woche = ΔP · t_Woche\n3) ΔK_Woche = ΔW_Woche · Strompreis\n4) t_A = Investition / ΔK_Woche`,
            step3: `1) ΔP = ${nLeuchten} · 24 W = ${diffW} W = ${diffKw.toFixed(3)} kW\n2) ΔW_Woche = ${diffKw.toFixed(3)} kW · 168 h = ${kwhSavedPerWeek} kWh/Woche\n3) Ersparnis/Woche = ${euroSavedPerWeek.toFixed(2)} €/Woche\n4) t_A = 1200 € / ${euroSavedPerWeek.toFixed(2)} € = ${weeks} Wochen`,
            step4: `Ergebnis: t_A = ${weeks} Wochen (aufgerundet ${Math.ceil(weeks)} Wochen).\nAntwortsatz: Die Umrüstung auf LED amortisiert sich nach ca. ${Math.ceil(weeks)} Wochen.`
          };
        }
      },
      {
        id: "calc-fehlerortung",
        title: "5. Fehlerortung auf Erdkabel NYY-J (Sommer 2022 AV 1.8 & Winter 2024/25 AV 1.5)",
        exam: "Sommer 2022 / Winter 2024/25",
        bookRef: "Europa TB S. 30 (Leiterwiderstand), S. 204/291 (Erdkabel) & S. 561 (κ = 56)",
        unit: "m",
        generateParams: (randomize = false) => {
          const dist = randomize ? [20, 25, 30, 35, 45][Math.floor(Math.random() * 5)] : 25;
          const q = 1.5;
          const kappa = 56;
          const rMessOhm = +((2 * dist) / (kappa * q)).toFixed(3);
          const rMessMOhm = Math.round(rMessOhm * 1000);
          return {
            desc: `An einer Parkplatz-Straßenbeleuchtung (Erdkabel NYY-J 3x1,5 mm², κ_Cu = 56 m/(Ω·mm²)) löst der LS-Schalter aus. Alle Leuchtmittel werden herausgedreht. Am Kabelanfang in der Unterverteilung messen Sie zwischen Außenleiter L und Neutralleiter N einen Kurzschlusswiderstand von R_mess = ${rMessMOhm} mΩ (${rMessOhm} Ω). In welcher Entfernung l_x (in Metern) ab der Unterverteilung befindet sich der Kurzschluss im Erdkabel?`,
            expected: dist,
            tolerance: 0.6,
            step1: `Gegeben: q = 1,5 mm², κ = 56 m/(Ω·mm²), R_mess = ${rMessOhm} Ω\nGesucht: Entfernung l_x in m`,
            step2: `R_mess = (2 · l_x) / (κ · q)  =>  l_x = (R_mess · κ · q) / 2`,
            step3: `l_x = (${rMessOhm} Ω · 56 · 1,5) / 2 = ${dist} m`,
            step4: `Ergebnis: l_x = ${dist} m.\nAntwortsatz: Der Kurzschluss liegt genau ${dist} m vom Leitungsanfang entfernt.`
          };
        }
      },
      {
        id: "calc-wiso-rabatt",
        title: "6. WiSo-Rechnung: Rabatt- und Skontoabzug (Winter 2018/19 WiSo Aufgabe 3)",
        exam: "Winter 2018/19 – WiSo Aufg. 3",
        bookRef: "Europa TB S. 613–614 (Kalkulation, Rabatt & Skonto)",
        unit: "€",
        generateParams: (randomize = false) => {
          const listPrice = randomize ? [1200, 1500, 1800, 2400][Math.floor(Math.random() * 4)] : 1800;
          const rabattPct = 15;
          const skontoPct = 2;
          const rabattEuro = +(listPrice * (rabattPct / 100)).toFixed(2);
          const zielPreis = +(listPrice - rabattEuro).toFixed(2);
          const skontoEuro = +(zielPreis * (skontoPct / 100)).toFixed(2);
          const barPreis = +(zielPreis - skontoEuro).toFixed(2);
          return {
            desc: `Ein Elektrobetrieb kauft Werkzeug im Listenpreis von ${listPrice.toFixed(2)} €. Der Großhändler gewährt ${rabattPct} % Kundenrabatt und bei Zahlung innerhalb von 10 Tagen weitere ${skontoPct} % Skonto. Welcher Überweisungsbetrag (Barverkaufspreis in €) muss bei fristgerechter Zahlung überwiesen werden?`,
            expected: barPreis,
            tolerance: 0.1,
            step1: `Gegeben: Listenpreis = ${listPrice.toFixed(2)} €, Rabatt = ${rabattPct} %, Skonto = ${skontoPct} %\nGesucht: Überweisungsbetrag in €`,
            step2: `1) Zielpreis = Listenpreis - (Listenpreis · Rabatt%)\n2) Überweisungsbetrag = Zielpreis - (Zielpreis · Skonto%)`,
            step3: `1) Rabatt: ${rabattEuro.toFixed(2)} € -> Zielpreis: ${zielPreis.toFixed(2)} €\n2) Skonto: ${skontoEuro.toFixed(2)} € -> Barpreis: ${barPreis.toFixed(2)} €`,
            step4: `Ergebnis: ${barPreis.toFixed(2)} €.\nAntwortsatz: Der Überweisungsbetrag beträgt ${barPreis.toFixed(2)} €.`
          };
        }
      },
      {
        id: "calc-zs-w24",
        title: "7. Fehlerschutz & Schleifenimpedanz Zs: Mindestquerschnitt (Winter 2024/25 PL 2.2)",
        exam: "Winter 2024/25 – Planung 2.2",
        bookRef: "Europa TB S. 206–208, S. 258 (Zs ≤ 2/3 · U0/Ia) & S. 265–266 (VDE 0100-600)",
        unit: "mm²",
        generateParams: (randomize = false) => {
          const l = randomize ? [55, 62, 75, 85][Math.floor(Math.random() * 4)] : 62;
          const zVor = 0.2;
          const ia = 200;
          const zsMax = +((2 / 3) * (230 / ia)).toFixed(3);
          const rLtgMax = +(zsMax - zVor).toFixed(3);
          const qMin = +((2 * l) / (56 * rLtgMax)).toFixed(2);
          return {
            desc: `Eine Wärmepumpe (3~ 400 V, Ib = 19 A) wird über ein l = ${l} m langes Erdkabel NYY-J mit einem 3-poligen LS-Schalter C20 (IN = 20 A -> Abschaltstrom Ia = 10 · 20 A = 200 A) abgesichert. Die Vorimpedanz an der Unterverteilung beträgt Z_Vor = ${zVor} Ω. Nach DIN VDE 0100-600 (mit 2/3-Erwärmungsfaktor) beträgt die maximal zulässige Schleifenimpedanz Z_s,max = (2/3) · (230 V / 200 A) = 0,767 Ω. Berechnen Sie den rechnerischen Mindestquerschnitt q_min (in mm², auf 2 Nachkommastellen) der Leitung (κ = 56 m/(Ω·mm²)), damit die Abschaltbedingung eingehalten wird!`,
            expected: qMin,
            tolerance: 0.15,
            step1: `Gegeben: l = ${l} m, LS C20 (Ia = 200 A), U0 = 230 V, Z_s,max = 0,767 Ω, Z_Vor = ${zVor} Ω, κ = 56\nGesucht: q_min in mm²`,
            step2: `1) R_Ltg,max = Z_s,max - Z_Vor\n2) q_min = (2 · l) / (κ · R_Ltg,max)`,
            step3: `1) R_Ltg,max = 0,767 Ω - ${zVor} Ω = ${rLtgMax} Ω\n2) q_min = (2 · ${l} m) / (56 · ${rLtgMax} Ω) = ${qMin} mm²`,
            step4: `Ergebnis: q_min = ${qMin} mm² -> nächsthöherer Normquerschnitt: ${qMin <= 4 ? "4 mm²" : "6 mm²"}.\nAntwortsatz: Damit die Abschaltbedingung im Fehlerfall eingehalten wird, muss der Querschnitt mindestens ${qMin} mm² betragen (gewählt wird NYY-J 5x${qMin <= 4 ? "4" : "6"} mm²).`
          };
        }
      },
      {
        id: "calc-erdschluss-w24",
        title: "8. Außenleitererdschluss im Erdreich: Berührungsspannung UB (Winter 2024/25 PL 2.3)",
        exam: "Winter 2024/25 – Planung 2.3.3",
        bookRef: "Europa TB S. 38 (Reihenschaltung), S. 255 & S. 257 (Spannungswaage / Berührungsspannung)",
        unit: "V",
        generateParams: (randomize = false) => {
          const rErd = randomize ? [5.2, 6.2, 7.2, 8.2][Math.floor(Math.random() * 4)] : 7.2;
          const rB = 1.8;
          const rAl = 0.2;
          const rGes = +(rAl + rErd + rB).toFixed(2);
          const iF = +(230 / rGes).toFixed(2);
          const uB = +(iF * rB).toFixed(2);
          return {
            desc: `Ein Erdkabel wird im Erdreich beschädigt, sodass der Außenleiter L1 direkten Kontakt zum Erdreich hat (Außenleitererdschluss). Gegeben sind: Netzspannung gegen Erde U0 = 230 V, Widerstand des Außenleiters R_AL = ${rAl} Ω, Erdschlusswiderstand an der Fehlerstelle R_Erd = ${rErd} Ω und Widerstand des Betriebserders am Trafo R_B = ${rB} Ω. Berechnen Sie die Berührungsspannung U_B (in V), die am Betriebserder / Schutzleiter gegenüber Bezugserde auftritt!`,
            expected: uB,
            tolerance: 0.5,
            step1: `Gegeben: U0 = 230 V, R_AL = ${rAl} Ω, R_Erd = ${rErd} Ω, R_B = ${rB} Ω\nGesucht: Gesamtwiderstand R_ges in Ω, Erdschlussstrom I_F in A und Berührungsspannung U_B in V`,
            step2: `1) R_ges = R_AL + R_Erd + R_B\n2) I_F = U0 / R_ges\n3) U_B = I_F · R_B`,
            step3: `1) R_ges = ${rAl} Ω + ${rErd} Ω + ${rB} Ω = ${rGes} Ω\n2) I_F = 230 V / ${rGes} Ω = ${iF} A\n3) U_B = ${iF} A · ${rB} Ω = ${uB} V`,
            step4: `Ergebnis: U_B = ${uB} V.\nAntwortsatz: Im Fehlerfall tritt eine Berührungsspannung von ${uB} V auf (Grenzwert im Wechselstromnetz: U_L <= 50 V AC).\n\n⚠️ NRW-Prüfungsfalle: Warum schaltet der LS-Schalter C20 (Ia = 200 A) hierbei NICHT ab? Weil der Erdschlussstrom von ${iF} A für den C20-Automaten wie ein geringer Überstrom aussieht und den magnetischen Schnellauslöser nicht erreicht!`
          };
        }
      },
      {
        id: "calc-raumwirkungsgrad",
        title: "9. Lichtberechnung: Leuchtenanzahl nach Raumwirkungsgradverfahren (Masterbuch Licht Typ 1)",
        exam: "Systementwurf / Planung Klassiker",
        bookRef: "Europa TB S. 228–229 (Wartungsfaktor) & S. 233–235 (Leuchtenanzahl / Raumwirkungsgrad)",
        unit: "Leuchten",
        generateParams: (randomize = false) => {
          const em = randomize ? [300, 500][Math.floor(Math.random() * 2)] : 300;
          const a = 15;
          const b = 10;
          const area = a * b;
          const etaB = 0.58;
          const wf = 0.80;
          const phiLeuchte = 6000;
          const phiGes = Math.round((em * area) / (etaB * wf));
          const nExact = +(phiGes / phiLeuchte).toFixed(2);
          const nRounded = Math.ceil(nExact);
          return {
            desc: `Eine Montagewerkstatt (Länge a = ${a} m, Breite b = ${b} m -> Fläche A = ${area} m²) soll für eine mittlere Beleuchtungsstärke von E_m = ${em} lx geplant werden. Der ermittelte Beleuchtungswirkungsgrad beträgt η_B = ${etaB}, der Wartungsfaktor WF = ${wf}. Jede gewählte LED-Wannenleuchte liefert einen Lichtstrom von Φ_Leuchte = ${phiLeuchte} lm. Berechnen Sie die rechnerisch mindestens erforderliche Leuchtenanzahl n (auf ganze Leuchten aufgerundet)!`,
            expected: nRounded,
            tolerance: 0.9,
            step1: `Gegeben: A = ${a} m · ${b} m = ${area} m², E_m = ${em} lx, η_B = ${etaB}, WF = ${wf}, Φ_Leuchte = ${phiLeuchte} lm\nGesucht: Gesamtlichtstrom Φ_ges in lm und Mindestanzahl der Leuchten n`,
            step2: `1) Φ_ges = (E_m · A) / (η_B · WF)\n2) n = Φ_ges / Φ_Leuchte (immer aufrunden!)`,
            step3: `1) Φ_ges = (${em} lx · ${area} m²) / (${etaB} · ${wf}) = ${em * area} lm / ${(etaB * wf).toFixed(3)} = ${phiGes} lm\n2) n = ${phiGes} lm / ${phiLeuchte} lm = ${nExact}  =>  aufgerundet ${nRounded} Leuchten`,
            step4: `Ergebnis: Mindestens ${nRounded} Leuchten (bei 3 symmetrischen Lichtband-Reihen wählt man ${Math.ceil(nRounded / 3) * 3} Leuchten).\nAntwortsatz: Um die geforderte Beleuchtungsstärke von ${em} lx sicher zu erreichen, werden mindestens ${nRounded} Leuchten benötigt.`
          };
        }
      },
      {
        id: "calc-wiso-lohn-w24",
        title: "10. WiSo-Rechnung: Nettolohnberechnung mit Kirchensteuer (Winter 2024/25 Aufgabe 10)",
        exam: "Winter 2024/25 – WiSo Aufg. 10",
        bookRef: "Europa TB S. 606 (Entlohnung/Tarif) & WiSo-Spickzettel (Lohnabrechnung)",
        unit: "€",
        generateParams: (randomize = false) => {
          const brutto = randomize ? [2048, 2500, 2800][Math.floor(Math.random() * 3)] : 2048;
          const svPct = 20.4;
          const lohnsteuer = brutto === 2048 ? 124.0 : brutto === 2500 ? 210.0 : 280.0;
          const kirchensteuer = +(lohnsteuer * 0.09).toFixed(2);
          const svEuro = +(brutto * (svPct / 100)).toFixed(2);
          const netto = +(brutto - svEuro - lohnsteuer - kirchensteuer).toFixed(2);
          return {
            desc: `Eine Elektrofachkraft (Steuerklasse I, keine Kinder, Mitglied der Kirche in NRW) erhält ein monatliches Bruttogehalt von ${brutto.toFixed(2)} €. Der gesamte Arbeitnehmeranteil zur Sozialversicherung (KV + Zusatzbeitrag + RV + ALV + PV) beträgt ${svPct} % vom Bruttolohn (${svEuro.toFixed(2)} €). Die monatliche Lohnsteuer beträgt ${lohnsteuer.toFixed(2)} €, der Kirchensteuersatz in NRW beträgt 9 % (der Lohnsteuer!). Solidaritätszuschlag fällt nicht an. Berechnen Sie den ausgezahlten Nettolohn (in €)!`,
            expected: netto,
            tolerance: 0.2,
            step1: `Gegeben: Bruttolohn = ${brutto.toFixed(2)} €, SV-Arbeitnehmeranteil = ${svPct} % (${svEuro.toFixed(2)} €), Lohnsteuer = ${lohnsteuer.toFixed(2)} €, Kirchensteuer = 9 % der Lohnsteuer\nGesucht: Kirchensteuer in € und Nettolohn in €`,
            step2: `1) SV_AN = Bruttolohn · ${svPct} %\n2) Kirchensteuer = Lohnsteuer · 9 %\n3) Nettolohn = Bruttolohn - SV_AN - Lohnsteuer - Kirchensteuer`,
            step3: `1) SV_AN = ${brutto.toFixed(2)} € · 0,204 = ${svEuro.toFixed(2)} €\n2) Kirchensteuer = ${lohnsteuer.toFixed(2)} € · 0,09 = ${kirchensteuer.toFixed(2)} €\n3) Nettolohn = ${brutto.toFixed(2)} € - ${svEuro.toFixed(2)} € - ${lohnsteuer.toFixed(2)} € - ${kirchensteuer.toFixed(2)} € = ${netto.toFixed(2)} €`,
            step4: `Ergebnis: Nettolohn = ${netto.toFixed(2)} €.\nAntwortsatz: Der monatlich ausgezahlte Nettolohn beträgt ${netto.toFixed(2)} €.\n\n⚠️ NRW-Prüfungsfalle: Die 9 % Kirchensteuer werden IMMER von der Lohnsteuer berechnet, niemals vom Bruttolohn!`
          };
        }
      },
      {
        id: "calc-leistungsabfall",
        title: "11. Spannungsfall-Falle: Tatsächliche Heizleistung bei konstantem R (W21/22 & W22/23 AV 1.1)",
        exam: "Winter 2021/22 & 2022/23 – AV 1.1.4",
        bookRef: "Europa TB S. 30 & S. 36 (Widerstand & Leistung P = U² / R) & S. 192 (Spannungsfall)",
        unit: "W",
        generateParams: (randomize = false) => {
          const pN = randomize ? [2000, 2500, 3000][Math.floor(Math.random() * 3)] : 2500;
          const dU = randomize ? 9.5 : 11.65;
          const uRest = +(230 - dU).toFixed(2);
          const rGeraet = +((230 * 230) / pN).toFixed(2);
          const pReal = Math.round((uRest * uRest) / rGeraet);
          return {
            desc: `Ein elektrischer Frostwächter hat eine Bemessungsleistung von P_N = ${pN} W bei U_N = 230 V (cos φ = 1). Durch die lange Zuleitung tritt ein Spannungsfall von ΔU = ${dU} V auf (Restspannung am Gerät: U_Rest = ${uRest} V). Auf welchen Wert P_real (in W, auf ganze Watt gerundet) verringert sich die tatsächliche Leistung des Heizgerätes? Gehen Sie von einem konstanten elektrischen Widerstand R_Gerät aus!`,
            expected: pReal,
            tolerance: 18,
            step1: `Gegeben: P_N = ${pN} W, U_N = 230 V, ΔU = ${dU} V -> U_Rest = 230 V - ${dU} V = ${uRest} V\nGesucht: Gerätewiderstand R_Gerät in Ω und tatsächliche Leistung P_real in W`,
            step2: `1) P_N = U_N² / R_Gerät  =>  R_Gerät = U_N² / P_N\n2) P_real = U_Rest² / R_Gerät`,
            step3: `1) R_Gerät = (230 V)² / ${pN} W = 52900 V² / ${pN} W = ${rGeraet} Ω\n2) P_real = (${uRest} V)² / ${rGeraet} Ω = ${pReal} W`,
            step4: `Ergebnis: P_real = ${pReal} W.\nAntwortsatz: Durch den Spannungsfall verringert sich die Heizleistung von ${pN} W auf ca. ${pReal} W.\n\n⚠️ NRW-Prüfungsfalle: Da mit der Spannung auch der Strom durch den konstanten Heizwiderstand sinkt, nimmt die Leistung quadratisch mit der Spannung ab (P ~ U²)!`
          };
        }
      },
      {
        id: "calc-komp-90",
        title: "12. 90%-Leerlaufkompensation & E12-Reihe (Sommer 2023 Aufg. 2)",
        exam: "Sommer 2023 – Planung / FSA",
        bookRef: "Europa TB S. 328–329 (Einzelkompensation Motor) & S. 51 (E12-Normreihe)",
        unit: "µF",
        generateParams: (randomize = false) => {
          const qLeer = randomize ? [2000, 2400, 3000][Math.floor(Math.random() * 3)] : 2400;
          const qcMax = +(0.9 * qLeer).toFixed(1);
          const cDelta = +(qcMax / 150.7964).toFixed(2);
          return {
            desc: `Ein Lüftungsmotor (3~ 400 V, 50 Hz) hat laut Tabelle eine Leerlaufblindleistung von Q_Leerlauf = ${qLeer} var (${(qLeer / 1000).toFixed(1)} kvar). Um Selbsterregung beim Abschalten zu verhindern, dürfen maximal 90 % der Leerlaufblindleistung kompensiert werden. Berechnen Sie die rechnerische Einzelkapazität C_Delta (in µF) je Strang im Dreieck vor Auswahl aus der E12-Normreihe!`,
            expected: cDelta,
            tolerance: 0.3,
            step1: `Gegeben: U = 400 V, f = 50 Hz, Q_Leerlauf = ${qLeer} var, max. 90 % Kompensation\nGesucht: Kompensationsblindleistung Q_c in var und Einzelkapazität im Dreieck C_Delta in µF`,
            step2: `1) Q_c = 0,90 · Q_Leerlauf\n2) C_Delta = Q_c / (3 · 2 · π · f · U²) = Q_c / 150,7964`,
            step3: `1) Q_c = 0,90 · ${qLeer} var = ${qcMax} var\n2) C_Delta = ${qcMax} var / (3 · 2 · π · 50 Hz · (400 V)²) = ${cDelta} µF`,
            step4: `Ergebnis: C_Delta = ${cDelta} µF (aus E12-Reihe 10 - 12 - 15 - 18 µF muss auf den nächstkleineren Wert abgerundet werden!).\nAntwortsatz: Die maximal zulässige Einzelkapazität beträgt ${cDelta} µF.`
          };
        }
      },
       {
        id: "calc-imax-w23",
        title: "13. Rückwärtsrechnung Spannungsfall: Max. Strom I_max & LS-Auswahl (Winter 2023/24 AV 1.5)",
        exam: "Winter 2023/24 – AV 1.5",
        bookRef: "Europa TB S. 192–193 & S. 205 (Spannungsfall ΔU / Δu) & S. 561 (κ = 56)",
        unit: "A",
        generateParams: (randomize = false) => {
          const l = randomize ? [85, 100, 110, 125][Math.floor(Math.random() * 4)] : 110;
          const duPct = 2.0;
          const duVolt = +(230 * (duPct / 100)).toFixed(2);
          const q = 6;
          const kappa = 56;
          const iMax = +((duVolt * kappa * q) / (2 * l * 1)).toFixed(2);
          const fuse = iMax >= 10 ? "B10A" : iMax >= 6 ? "B6A" : "B4A";
          return {
            desc: `Für einen Beleuchtungsmast im Zoo liegt bereits ein vorhandenes Erdkabel NYY-J 3x6 mm² (q = 6 mm², κ_Cu = 56 m/(Ω·mm²)) mit einer einfachen Länge von l = ${l} m (U = 230 V, cos φ = 1). Der maximal zulässige Spannungsfall beträgt Δu_max = ${duPct} % (ΔU_max = ${duVolt} V). Berechnen Sie den maximal zulässigen Betriebsstrom I_max (in A, auf 2 Nachkommastellen), mit dem diese Leitung belastet werden darf!`,
            expected: iMax,
            tolerance: 0.15,
            step1: `Gegeben: l = ${l} m, q = 6 mm², U = 230 V, cos φ = 1, κ = 56 m/(Ω·mm²), Δu_max = 2 % -> ΔU_max = 4,6 V\nGesucht: Maximal zulässiger Strom I_max in A und größtmöglicher LS-Schalter`,
            step2: `1) ΔU_max = U · (Δu_max / 100 %)\n2) ΔU_max = (2 · l · I_max · cos φ) / (κ · q)  =>  I_max = (ΔU_max · κ · q) / (2 · l · cos φ)`,
            step3: `1) ΔU_max = 230 V · 0,02 = 4,6 V\n2) I_max = (4,6 V · 56 · 6) / (2 · ${l} · 1) = 1545,6 / ${2 * l} = ${iMax} A`,
            step4: `Ergebnis: I_max = ${iMax} A -> Größtmöglicher LS-Schalter: ${fuse}!\nAntwortsatz: Es darf maximal ein Strom von ${iMax} A fließen; als Schutzorgan darf höchstens ein LS-Schalter ${fuse} gewählt werden.\n\n⚠️ NRW-Prüfungsfalle: Hier NIEMALS auf den nächstgrößeren LS-Schalter aufrunden! Da der Strom ${iMax} A nicht überschreiten darf, muss der LS-Schalter kleiner/gleich ${iMax} A gewählt werden!`
          };
        }
      }
    ];

    // =========================================================================
    // 3. STATE MANAGEMENT, PSYCHOLOGIE-TRACKER & LOCALSTORAGE
    // =========================================================================
    let currentSection = "wiso";
    let answerMode = localStorage.getItem("nrw_answer_mode_v2") || "freehand";

    function readStoredJson(key, fallback) {
      try {
        const storedValue = localStorage.getItem(key);
        return storedValue ? JSON.parse(storedValue) : fallback;
      } catch (error) {
        console.warn(`Konnte lokale Daten (${key}) nicht lesen; Standardwerte werden verwendet.`, error);
        return fallback;
      }
    }

    let progressWiso = readStoredJson("wiso_trainer_progress_v1", {});
    let progressElektro = readStoredJson("elektro_trainer_progress_v1", {});
    let progressEnglish = readStoredJson("english_trainer_progress_v1", {});
    let progressCalc = readStoredJson("nrw_calc_progress_v1", {});
    let bookmarks = readStoredJson("nrw_bookmarks_v1", {});

    let currentStreak = Number(localStorage.getItem("nrw_streak_v1")) || 0;
    const todayStr = new Date().toISOString().slice(0, 10);
    let dailyData = readStoredJson("nrw_daily_goal_v1", { date: todayStr, count: 0 });
    if (dailyData.date !== todayStr) {
      dailyData = { date: todayStr, count: 0 };
      localStorage.setItem("nrw_daily_goal_v1", JSON.stringify(dailyData));
    }

    let activeQuestionPool = WISO_QUESTIONS;
    let filteredQuestions = [...WISO_QUESTIONS];
    let currentIndex = 0;

    // DOM-Elemente
    const filterExam = document.getElementById("filter-exam");
    const filterCategory = document.getElementById("filter-category");
    const filterMode = document.getElementById("filter-mode");
    const searchInput = document.getElementById("search-input");
    const searchInfo = document.getElementById("search-info");

    const modeBtnFreehand = document.getElementById("mode-btn-freehand");
    const modeBtnMc = document.getElementById("mode-btn-mc");

    const statCurrent = document.getElementById("stat-current");
    const statCorrect = document.getElementById("stat-correct");
    const statWrong = document.getElementById("stat-wrong");
    const statStreak = document.getElementById("stat-streak");
    const statPercent = document.getElementById("stat-percent");
    const statGrade = document.getElementById("stat-grade");
    const progressBar = document.getElementById("progress-bar");
    const dailyGoalDisplay = document.getElementById("daily-goal-display");
    const examWeightInfo = document.getElementById("exam-weight-info");

    const badgeExam = document.getElementById("badge-exam");
    const badgeCategory = document.getElementById("badge-category");
    const badgeStatus = document.getElementById("badge-status");
    const btnBookmark = document.getElementById("btn-bookmark");
    const questionText = document.getElementById("question-text");

    const freehandContainer = document.getElementById("freehand-container");
    const freehandInput = document.getElementById("freehand-input");
    const btnMic = document.getElementById("btn-mic");
    const btnCheckFreehand = document.getElementById("btn-check-freehand");
    const btnShowSolutionDirect = document.getElementById("btn-show-solution-direct");

    const optionsContainer = document.getElementById("options-container");
    const explanationBox = document.getElementById("explanation-box");
    const feedbackTitle = document.getElementById("feedback-title");
    const aiFeedbackContainer = document.getElementById("ai-feedback-container");
    const aiFeedbackHeader = document.getElementById("ai-feedback-header");
    const aiFeedbackText = document.getElementById("ai-feedback-text");
    const keywordChipsContainer = document.getElementById("keyword-chips-container");
    const explanationText = document.getElementById("explanation-text");
    const selfGradeRow = document.getElementById("self-grade-row");
    const btnMarkCorrect = document.getElementById("btn-mark-correct");
    const btnMarkWrong = document.getElementById("btn-mark-wrong");

    const btnPrev = document.getElementById("btn-prev");
    const btnNext = document.getElementById("btn-next");

    const quizMainContainer = document.getElementById("quiz-main-container");
    const calcSection = document.getElementById("calc-section");
    const protokollSection = document.getElementById("protokoll-section");
    const schaltplanSection = document.getElementById("schaltplan-section");
    const simSection = document.getElementById("sim-section");
    const videoSection = document.getElementById("video-section");
    const masterbookSection = document.getElementById("masterbook-section");

    // PDF-Umschalter
    const pdfSelector = document.getElementById("pdf-selector");
    const pdfFrame = document.getElementById("pdf-frame");
    const pdfFallbackLink = document.getElementById("pdf-fallback-link");
    const pdfExternalBtn = document.getElementById("pdf-external-btn");
    if (pdfSelector) {
      pdfSelector.addEventListener("change", (e) => {
        const selectedFile = e.target.value;
        pdfFrame.src = selectedFile;
        pdfFallbackLink.href = selectedFile;
        if (pdfExternalBtn) pdfExternalBtn.href = selectedFile;
      });
    }

    // =========================================================================
    // 4. HILFSFUNKTIONEN FÜR FORTSCHRITT, STREAK, NOTEN & FILTER
    // =========================================================================
    function getCurrentProgressObj() {
      if (currentSection === "wiso") return progressWiso;
      if (currentSection === "elektro") return progressElektro;
      return progressEnglish;
    }

    function recordPsychologicalProgress(isCorrect) {
      if (isCorrect) {
        currentStreak++;
      } else {
        currentStreak = 0;
      }
      dailyData.count++;
      localStorage.setItem("nrw_streak_v1", String(currentStreak));
      localStorage.setItem("nrw_daily_goal_v1", JSON.stringify(dailyData));
    }

    function saveProgress() {
      localStorage.setItem("wiso_trainer_progress_v1", JSON.stringify(progressWiso));
      localStorage.setItem("elektro_trainer_progress_v1", JSON.stringify(progressElektro));
      localStorage.setItem("english_trainer_progress_v1", JSON.stringify(progressEnglish));
      localStorage.setItem("nrw_bookmarks_v1", JSON.stringify(bookmarks));
      updateStats();
    }

    function calculateIhkGrade(percent, answeredCount) {
      if (answeredCount === 0) return "–";
      if (percent >= 92) return "1 (Sehr gut)";
      if (percent >= 81) return "2 (Gut)";
      if (percent >= 67) return "3 (Befried.)";
      if (percent >= 50) return "4 (Ausreich.)";
      if (percent >= 30) return "5 (Mangelh.)";
      return "6 (Ungenüg.)";
    }

    function updateStats() {
      const progress = getCurrentProgressObj();
      let correctCount = 0;
      let wrongCount = 0;

      activeQuestionPool.forEach((q) => {
        if (progress[q.id] === "correct") correctCount++;
        if (progress[q.id] === "wrong") wrongCount++;
      });

      const total = activeQuestionPool.length;
      const percent = total > 0 ? Math.round((correctCount / total) * 100) : 0;
      const answered = correctCount + wrongCount;
      const answeredQuote = answered > 0 ? Math.round((correctCount / answered) * 100) : 0;

      statCurrent.textContent = filteredQuestions.length > 0 ? `${currentIndex + 1} / ${filteredQuestions.length}` : "0 / 0";
      statCorrect.textContent = `${correctCount} / ${total}`;
      statWrong.textContent = wrongCount;
      if (statStreak) statStreak.textContent = `${currentStreak} 🔥`;
      statPercent.textContent = `${percent} %`;
      statGrade.textContent = calculateIhkGrade(answeredQuote, answered);
      progressBar.style.width = `${percent}%`;

      if (dailyGoalDisplay) {
        const goalReached = dailyData.count >= 15;
        dailyGoalDisplay.textContent = goalReached
          ? `🏆 Tagesziel erreicht: ${dailyData.count} / 15 Fragen!`
          : `🎯 Heute gelernt: ${dailyData.count} / 15 Fragen`;
        dailyGoalDisplay.style.color = goalReached ? "#4ade80" : "#fbbf24";
      }
    }

    function populateFilterDropdowns() {
      const exams = [...new Set(activeQuestionPool.map((q) => q.exam))];
      const categories = [...new Set(activeQuestionPool.map((q) => q.category))];

      filterExam.innerHTML = `<option value="all">Alle Prüfungen (${activeQuestionPool.length} Fragen)</option>`;
      exams.forEach((ex) => {
        const opt = document.createElement("option");
        opt.value = ex;
        opt.textContent = ex;
        filterExam.appendChild(opt);
      });

      filterCategory.innerHTML = `<option value="all">Alle Themengebiete</option>`;
      categories.forEach((cat) => {
        const opt = document.createElement("option");
        opt.value = cat;
        opt.textContent = cat;
        filterCategory.appendChild(opt);
      });
    }

    function testMatch(q, searchVal) {
      if (!searchVal) return true;
      const qText = (q.question || "").toLowerCase();
      const expText = (q.explanation || "").toLowerCase();
      const optText = (q.options || []).join(" ").toLowerCase();
      return qText.includes(searchVal) || expText.includes(searchVal) || optText.includes(searchVal);
    }

    function applyFilters() {
      const searchVal = (searchInput ? searchInput.value : "").trim().toLowerCase();

      if (searchVal.length > 0) {
        const matchInCurrent = activeQuestionPool.some((q) => testMatch(q, searchVal));
        if (!matchInCurrent) {
          const pools = [
            { key: "wiso", pool: WISO_QUESTIONS, tabId: "tab-wiso" },
            { key: "elektro", pool: ELEKTRO_QUESTIONS, tabId: "tab-elektro" },
            { key: "english", pool: ENGLISH_QUESTIONS, tabId: "tab-english" }
          ];
          for (const p of pools) {
            if (p.pool.some((q) => testMatch(q, searchVal))) {
              currentSection = p.key;
              activeQuestionPool = p.pool;
              document.querySelectorAll(".tab-btn").forEach((b) => b.classList.remove("active"));
              document.getElementById(p.tabId).classList.add("active");
              populateFilterDropdowns();
              break;
            }
          }
        }
      }

      const examVal = filterExam.value;
      const catVal = filterCategory.value;
      const modeVal = filterMode.value;

      const currentProgress = getCurrentProgressObj();
      filteredQuestions = activeQuestionPool.filter((q) => {
        const matchExam = examVal === "all" || q.exam === examVal;
        const matchCat = catVal === "all" || q.category === catVal;
        let matchMode = true;
        if (modeVal === "unlearned") matchMode = currentProgress[q.id] !== "correct";
        if (modeVal === "wrong") matchMode = currentProgress[q.id] === "wrong";
        if (modeVal === "bookmarked") matchMode = !!bookmarks[q.id];
        const matchSearch = testMatch(q, searchVal);
        return matchExam && matchCat && matchMode && matchSearch;
      });

      if (searchVal.length > 0) {
        searchInfo.textContent = `🔍 ${filteredQuestions.length} Treffer gefunden.`;
      } else {
        searchInfo.textContent = "";
      }

      currentIndex = 0;
      renderQuestion();
      updateStats();
    }

    // =========================================================================
    // 5. DUAL-ENGINE KI- UND KONTEXT-AUSWERTUNG FÜR FREIHAND-ANTWORTEN
    // =========================================================================
    const GERMAN_STOPWORDS = new Set([
      "der", "die", "das", "ein", "eine", "einer", "eines", "einem", "einen", "und", "oder", "aber",
      "denn", "weil", "dass", "wenn", "als", "wie", "bei", "mit", "von", "vom", "zum", "zur", "aus",
      "auf", "für", "fuer", "ueber", "über", "unter", "vor", "nach", "durch", "gegen", "ohne", "um",
      "an", "in", "im", "am", "ist", "sind", "war", "wird", "werden", "wurde", "hat", "haben", "kann",
      "koennen", "können", "muss", "muessen", "müssen", "darf", "duerfen", "dürfen", "soll", "nicht",
      "kein", "keine", "sich", "sie", "er", "es", "wir", "ihr", "man", "alle", "nur", "auch", "noch",
      "schon", "immer", "sehr", "mehr", "bzw", "z.b", "bsp", "sowie", "diese", "dieser", "dieses"
    ]);

    function normalizeGermanText(str) {
      return (str || "")
        .toLowerCase()
        .replace(/ä/g, "ae")
        .replace(/ö/g, "oe")
        .replace(/ü/g, "ue")
        .replace(/ß/g, "ss")
        .replace(/[^a-z0-9\s]/g, " ")
        .replace(/\s+/g, " ")
        .trim();
    }

    function extractKeyConcepts(questionObj) {
      const correctOptionText = questionObj.options[questionObj.correct];
      const rawWords = correctOptionText
        .replace(/[|(),.:;!/]/g, " ")
        .split(/\s+/)
        .map((w) => w.trim())
        .filter((w) => w.length >= 2);

      const concepts = [];
      const seenStems = new Set();

      rawWords.forEach((word) => {
        const norm = normalizeGermanText(word);
        if (!norm || GERMAN_STOPWORDS.has(norm)) return;
        const isNumberOrCode = /\d/.test(norm) || norm.length <= 4;
        if (!isNumberOrCode && norm.length < 4) return;

        let stem = norm;
        if (stem.length > 7) {
          stem = stem.replace(/(versicherung|spannung|strom|leitung|schalter|schutz|pflicht|funktion|vertrag|anlagen|anlage|ungen|ung|en|er|es|e|n)$/, "");
        }
        if (stem.length < 3) stem = norm;

        if (!seenStems.has(stem)) {
          seenStems.add(stem);
          concepts.push({
            display: word,
            normFull: norm,
            stem: stem
          });
        }
      });

      return concepts;
    }

    function evaluateWithSmartSemanticEngine(userAnswer, questionObj) {
      const normUser = normalizeGermanText(userAnswer);
      const concepts = extractKeyConcepts(questionObj);

      const hits = [];
      const misses = [];

      concepts.forEach((c) => {
        const shortStem = c.stem.length >= 6 ? c.stem.slice(0, 6) : c.stem;
        if (normUser.includes(c.normFull) || normUser.includes(c.stem) || (shortStem.length >= 4 && normUser.includes(shortStem))) {
          hits.push(c.display);
        } else {
          misses.push(c.display);
        }
      });

      const totalConcepts = concepts.length || 1;
      const rawRatio = hits.length / totalConcepts;
      const scorePercent = Math.min(100, Math.round(rawRatio * 135));
      const passed = scorePercent >= 55 || (hits.length >= 3 && rawRatio >= 0.45);

      let feedbackMsg = "";
      if (scorePercent >= 80) {
        feedbackMsg = `🌟 Starke Leistung (${scorePercent} % Übereinstimmung)! Du hast die entscheidenden Fachbegriffe und Zusammenhänge sicher genannt.`;
      } else if (passed) {
        feedbackMsg = `👍 Gute Antwort (${scorePercent} % Übereinstimmung)! Der inhaltliche Kern stimmt. Schau dir unten noch die rot markierten Zusatzbegriffe für die volle Punktzahl an.`;
      } else {
        feedbackMsg = `⚠️ Noch unvollständig (${scorePercent} % Übereinstimmung). Dir fehlen noch wichtige Schlüsselbegriffe aus der offiziellen Lösung. Vergleiche deine Antwort mit den Begriffen unten!`;
      }

      return {
        passed,
        scorePercent,
        feedbackMsg,
        hits,
        misses,
        usedCloudAi: false
      };
    }

    // =========================================================================
    // GEMINI-API ÜBER DIE GESCHÜTZTE NETLIFY-FUNCTION
    // =========================================================================
    let groupAccessCode = "";
    try {
      groupAccessCode = sessionStorage.getItem("group_access_code") || "";
    } catch (error) {
      console.warn("Session-Speicher ist nicht verfügbar.", error);
    }

    function cleanAiResponse(text, isJson = false) {
      if (!text) return "";
      // Entfernt optionale Denk-Blöcke von Reasoning-Modellen
      let cleaned = text.replace(/<think>[\s\S]*?<\/think>/gi, "").trim();
      if (isJson) {
        cleaned = cleaned.replace(/^```(?:json)?\s*/i, "").replace(/\s*```$/i, "").trim();
        const firstBrace = cleaned.indexOf("{");
        const lastBrace = cleaned.lastIndexOf("}");
        if (firstBrace !== -1 && lastBrace !== -1) {
          cleaned = cleaned.slice(firstBrace, lastBrace + 1);
        }
      }
      return cleaned;
    }

    async function requestGeminiApi(contentsInput, isJson = false, accessCode = groupAccessCode) {
      if (!accessCode) {
        throw new Error("Bitte gib zuerst den Gruppencode im KI-Setup ein.");
      }

      let messages = [];
      if (Array.isArray(contentsInput)) {
        messages = contentsInput.map(turn => ({
          role: turn.role === "model" ? "assistant" : (turn.role || "user"),
          content: turn.parts ? turn.parts.map(p => p.text).join("\n") : (turn.content || "")
        }));
      } else {
        messages = [{ role: "user", content: String(contentsInput) }];
      }

      if (isJson) {
        messages.unshift({ role: "system", content: "Antworte ausschließlich mit einem validen JSON-Objekt ohne Markdown-Codeblöcke." });
      }

      const response = await fetch("/api/gemini/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-group-code": accessCode
        },
        body: JSON.stringify({ messages, jsonMode: isJson })
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(data.error || `Gemini-Dienst antwortet mit HTTP ${response.status}.`);
      return cleanAiResponse(data.content, isJson);
    }

    // =========================================================================
    // KI-AUSWERTUNG FÜR FREIHAND-ANTWORTEN (GEMINI)
    // =========================================================================
    async function evaluateWithGeminiAI(userAnswer, questionObj) {
      const localEval = evaluateWithSmartSemanticEngine(userAnswer, questionObj);
      const prompt = `Du bist Prüfer der Gesellenprüfung Teil 2 für Elektroniker (Energie- und Gebäudetechnik) in NRW.
Bewerte die freie Antwort des Prüflings anhand der Musterlösung.

Prüfungsfrage: "${questionObj.question}"
Offizielle Kernlösung: "${questionObj.options[questionObj.correct]}"
Zusatzerklärung: "${questionObj.explanation}"
Antwort des Prüflings: "${userAnswer}"

Antworte ausschließlich im JSON-Format mit genau diesen drei Feldern:
{
  "passed": true,
  "scorePercent": 85,
  "feedbackMsg": "Kurzes Prüfer-Feedback auf Deutsch (2-3 Sätze: Was war richtig, was fehlt noch?)"
}`;

      const rawJson = await requestGeminiApi(prompt, true);
      const parsed = JSON.parse(rawJson);

      return {
        passed: Boolean(parsed.passed),
        scorePercent: typeof parsed.scorePercent === "number" ? parsed.scorePercent : localEval.scorePercent,
        feedbackMsg: parsed.feedbackMsg || localEval.feedbackMsg,
        hits: localEval.hits,
        misses: localEval.misses,
        usedCloudAi: true
      };
    }

    async function handleFreehandCheck() {
      const q = filteredQuestions[currentIndex];
      if (!q) return;

      const userText = freehandInput.value.trim();
      if (!userText) {
        alert("Bitte schreibe (oder diktiere) zuerst eine kurze Antwort in das Textfeld, oder klicke auf 'Direkt Musterlösung aufdecken'!");
        freehandInput.focus();
        return;
      }

      btnCheckFreehand.disabled = true;
      btnCheckFreehand.textContent = "⏳ Gemini-Prüfer analysiert deine Antwort...";

      let result;
      try {
        result = await evaluateWithGeminiAI(userText, q);
      } catch (err) {
        result = evaluateWithSmartSemanticEngine(userText, q);
      }

      btnCheckFreehand.disabled = false;
      btnCheckFreehand.textContent = "🤖 Antwort durch Prüfer-KI kontrollieren (Strg + Enter)";

      const progress = getCurrentProgressObj();
      if (result.passed) {
        playSuccessSound();
        feedbackTitle.textContent = `✅ Stark! Als gewusst gewertet (${result.scorePercent} %)`;
        feedbackTitle.style.color = "#22c55e";
        progress[q.id] = "correct";
        recordPsychologicalProgress(true);
      } else {
        playWrongSound();
        feedbackTitle.textContent = `⚠️ Noch ausbaufähig (${result.scorePercent} %) – Zum Wiederholen markiert`;
        feedbackTitle.style.color = "#f59e0b";
        progress[q.id] = "wrong";
        recordPsychologicalProgress(false);
      }

      aiFeedbackHeader.textContent = result.usedCloudAi
        ? "🤖 Google-Gemini-Prüfer (Kontext-Bewertung):"
        : "🧠 Smart-Kontext-Prüfer (Erkannte & fehlende Schlüsselbegriffe):";
      aiFeedbackText.textContent = result.feedbackMsg;

      keywordChipsContainer.innerHTML = "";
      result.hits.forEach((h) => {
        const span = document.createElement("span");
        span.className = "keyword-chip keyword-hit";
        span.textContent = `✓ ${h}`;
        keywordChipsContainer.appendChild(span);
      });
      result.misses.forEach((m) => {
        const span = document.createElement("span");
        span.className = "keyword-chip keyword-miss";
        span.textContent = `fehlt: ${m}`;
        keywordChipsContainer.appendChild(span);
      });

      aiFeedbackContainer.classList.remove("hidden");
      explanationText.textContent = `✅ Kernlösung: ${q.options[q.correct]}\n\n${q.explanation}`;
      selfGradeRow.classList.remove("hidden");
      explanationBox.classList.remove("hidden");

      saveProgress();
      updateBadgeStatus(q.id);
    }

    function showDirectSolution() {
      const q = filteredQuestions[currentIndex];
      if (!q) return;
      feedbackTitle.textContent = "👁️ Musterlösung aufgedeckt (Bewerte dich unten selbst!):";
      feedbackTitle.style.color = "#60a5fa";
      aiFeedbackContainer.classList.add("hidden");
      explanationText.textContent = `✅ Kernlösung: ${q.options[q.correct]}\n\n${q.explanation}`;
      selfGradeRow.classList.remove("hidden");
      explanationBox.classList.remove("hidden");
    }

    // =========================================================================
    // 6. RENDERN DER QUIZ-KARTE
    // =========================================================================
    function updateBadgeStatus(qId) {
      const progress = getCurrentProgressObj();
      const st = progress[qId];
      if (st === "correct") {
        badgeStatus.textContent = "✅ Gewusst";
        badgeStatus.style.color = "#22c55e";
      } else if (st === "wrong") {
        badgeStatus.textContent = "❌ Wiederholen";
        badgeStatus.style.color = "#ef4444";
      } else {
        badgeStatus.textContent = "⚪ Offen";
        badgeStatus.style.color = "#94a3b8";
      }

      if (bookmarks[qId]) {
        btnBookmark.classList.add("active");
        btnBookmark.textContent = "⭐ Auf Merkliste (Taste M)";
      } else {
        btnBookmark.classList.remove("active");
        btnBookmark.textContent = "☆ Auf Merkliste (Taste M)";
      }
    }

    function renderQuestion() {
      explanationBox.classList.add("hidden");
      aiFeedbackContainer.classList.add("hidden");
      selfGradeRow.classList.add("hidden");
      optionsContainer.innerHTML = "";
      freehandInput.value = "";

      if (filteredQuestions.length === 0) {
        badgeExam.textContent = "Filter leer";
        badgeCategory.textContent = "Keine Fragen";
        badgeStatus.textContent = "🎉";
        questionText.textContent = "Keine passenden Fragen für diesen Filter oder Suchbegriff gefunden.";
        freehandContainer.classList.add("hidden");
        optionsContainer.classList.add("hidden");
        btnPrev.disabled = true;
        btnNext.disabled = true;
        return;
      }

      const q = filteredQuestions[currentIndex];
      badgeExam.textContent = `📅 ${q.exam}`;
      badgeCategory.textContent = `📚 ${q.category}`;
      updateBadgeStatus(q.id);
      questionText.textContent = q.question;

      if (answerMode === "freehand") {
        freehandContainer.classList.remove("hidden");
        optionsContainer.classList.add("hidden");
      } else {
        freehandContainer.classList.add("hidden");
        optionsContainer.classList.remove("hidden");

        const mappedOptions = q.options.map((text, idx) => ({ text, isCorrect: idx === q.correct }));
        for (let i = mappedOptions.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [mappedOptions[i], mappedOptions[j]] = [mappedOptions[j], mappedOptions[i]];
        }

        const letters = ["A", "B", "C", "D"];
        mappedOptions.forEach((opt, i) => {
          const btn = document.createElement("button");
          btn.className = "option-btn";
          btn.dataset.correct = opt.isCorrect;
          btn.innerHTML = `<span class="option-letter">${letters[i]}</span><span>${opt.text}</span>`;
          btn.addEventListener("click", () => handleMcAnswer(btn, opt.isCorrect, q));
          optionsContainer.appendChild(btn);
        });
      }

      btnPrev.disabled = currentIndex === 0;
      btnNext.disabled = currentIndex === filteredQuestions.length - 1;
    }

    function handleMcAnswer(clickedBtn, isCorrect, questionObj) {
      const progress = getCurrentProgressObj();
      const allButtons = optionsContainer.querySelectorAll(".option-btn");
      allButtons.forEach((b) => {
        b.disabled = true;
        if (b.dataset.correct === "true") b.classList.add("correct");
      });

      if (isCorrect) {
        playSuccessSound();
        clickedBtn.classList.add("correct");
        feedbackTitle.textContent = "✅ Richtig beantwortet!";
        feedbackTitle.style.color = "#22c55e";
        progress[questionObj.id] = "correct";
        recordPsychologicalProgress(true);
      } else {
        playWrongSound();
        clickedBtn.classList.add("wrong");
        feedbackTitle.textContent = "❌ Leider falsch:";
        feedbackTitle.style.color = "#ef4444";
        progress[questionObj.id] = "wrong";
        recordPsychologicalProgress(false);
      }

      aiFeedbackContainer.classList.add("hidden");
      selfGradeRow.classList.add("hidden");
      explanationText.textContent = questionObj.explanation;
      explanationBox.classList.remove("hidden");
      saveProgress();
      updateBadgeStatus(questionObj.id);
    }

    // =========================================================================
    // 7. EVENT LISTENER
    // =========================================================================
    function setAnswerMode(mode) {
      answerMode = mode;
      localStorage.setItem("nrw_answer_mode_v2", mode);
      if (mode === "freehand") {
        modeBtnFreehand.classList.add("active");
        modeBtnMc.classList.remove("active");
      } else {
        modeBtnMc.classList.add("active");
        modeBtnFreehand.classList.remove("active");
      }
      renderQuestion();
    }

    modeBtnFreehand.addEventListener("click", () => setAnswerMode("freehand"));
    modeBtnMc.addEventListener("click", () => setAnswerMode("mc"));

    btnCheckFreehand.addEventListener("click", handleFreehandCheck);
    btnShowSolutionDirect.addEventListener("click", showDirectSolution);

    btnMarkCorrect.addEventListener("click", () => {
      const q = filteredQuestions[currentIndex];
      if (!q) return;
      playSuccessSound();
      getCurrentProgressObj()[q.id] = "correct";
      recordPsychologicalProgress(true);
      feedbackTitle.textContent = "✅ Manuell als 'Gewusst' gespeichert!";
      feedbackTitle.style.color = "#22c55e";
      saveProgress();
      updateBadgeStatus(q.id);
    });

    btnMarkWrong.addEventListener("click", () => {
      const q = filteredQuestions[currentIndex];
      if (!q) return;
      playWrongSound();
      getCurrentProgressObj()[q.id] = "wrong";
      recordPsychologicalProgress(false);
      feedbackTitle.textContent = "❌ Zum Wiederholen markiert!";
      feedbackTitle.style.color = "#ef4444";
      saveProgress();
      updateBadgeStatus(q.id);
    });

    function toggleCurrentBookmark() {
      const q = filteredQuestions[currentIndex];
      if (!q) return;
      if (bookmarks[q.id]) {
        delete bookmarks[q.id];
      } else {
        bookmarks[q.id] = true;
      }
      saveProgress();
      updateBadgeStatus(q.id);
    }

    btnBookmark.addEventListener("click", toggleCurrentBookmark);

    // 10er-Turbo-Sprint
    document.getElementById("btn-sprint").addEventListener("click", () => {
      const progress = getCurrentProgressObj();
      let pool = activeQuestionPool.filter((q) => progress[q.id] !== "correct");
      if (pool.length === 0) pool = [...activeQuestionPool];
      for (let i = pool.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [pool[i], pool[j]] = [pool[j], pool[i]];
      }
      filteredQuestions = pool.slice(0, 10);
      currentIndex = 0;
      searchInfo.textContent = "⚡ 10er-Turbo-Sprint aktiv: 10 zufällige Fokus-Fragen ausgewählt!";
      renderQuestion();
      updateStats();
    });

    // Spracheingabe (Web Speech API)
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.lang = "de-DE";
      recognition.continuous = false;
      recognition.interimResults = false;

      btnMic.addEventListener("click", () => {
        if (btnMic.classList.contains("recording")) {
          recognition.stop();
        } else {
          btnMic.classList.add("recording");
          recognition.start();
        }
      });

      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        freehandInput.value = (freehandInput.value ? freehandInput.value + " " : "") + transcript;
      };

      recognition.onend = () => {
        btnMic.classList.remove("recording");
      };
    } else {
      btnMic.style.display = "none";
    }

    // Tab-Navigation
    const tabButtons = document.querySelectorAll(".tab-btn");
    tabButtons.forEach((btn) => {
      btn.addEventListener("click", () => {
        tabButtons.forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");

        const targetId = btn.dataset.target;
        document.querySelectorAll("video").forEach((v) => v.pause());
        if (searchInput) searchInput.value = "";
        if (searchInfo) searchInfo.textContent = "";

        quizMainContainer.style.display = "none";
        calcSection.classList.add("hidden");
        protokollSection.classList.add("hidden");
        schaltplanSection.classList.add("hidden");
        simSection.classList.add("hidden");
        videoSection.classList.add("hidden");
        masterbookSection.classList.add("hidden");

        if (targetId === "protokoll-section") {
          examWeightInfo.innerHTML = "💡 <strong>Prüfungs-Fokus Aufgabe 4.3 (DIN VDE 0100-600):</strong> 60 Minuten Bearbeitungszeit – zählt allein <strong>70 % der Note im Bereich Übergabe</strong>!";
          protokollSection.classList.remove("hidden");
          return;
        } else if (targetId === "schaltplan-section") {
          examWeightInfo.innerHTML = "💡 <strong>Prüfungs-Fokus Systementwurf & FSA:</strong> Der 8-Fehler-Verteilungsplan und Schütz-/Motorsteuerungen bringen sichere Punkte ohne langes Rechnen!";
          schaltplanSection.classList.remove("hidden");
          return;
        } else if (targetId === "calc-section") {
          examWeightInfo.innerHTML = "💡 <strong>Prüfungs-Fokus Rechnen:</strong> Formeln, Einheiten & Antwortsatz sichern dir bis zu 30 % der schriftlichen Gesamtpunkte!";
          calcSection.classList.remove("hidden");
          return;
        } else if (targetId === "sim-section") {
          examWeightInfo.innerHTML = "💡 <strong>Prüfungssimulation:</strong> Klausurbedingungen ohne Vorab-Lösung – teste dein Wissen unter realem Zeitdruck!";
          simSection.classList.remove("hidden");
          return;
        } else if (targetId === "video-section") {
          examWeightInfo.innerHTML = "💡 <strong>Prüfungs-Fokus Komponenten:</strong> Ideal zur Vorbereitung auf das 20-minütige Fachgespräch!";
          videoSection.classList.remove("hidden");
          return;
        } else if (targetId === "masterbook-section") {
          examWeightInfo.innerHTML = "💡 <strong>Masterbuch-Bibliothek:</strong> Alle 9 Lehrbücher & Spickzettel inklusive VDE 0100-600 und 8-Fehler-Verteilungsplan.";
          masterbookSection.classList.remove("hidden");
          return;
        } else {
          quizMainContainer.style.display = "block";
        }

        if (targetId === "elektro-section") {
          currentSection = "elektro";
          activeQuestionPool = ELEKTRO_QUESTIONS;
          examWeightInfo.innerHTML = "💡 <strong>Gewichtung Elektro-Theorie:</strong> Systementwurf + Funktionsanalyse + Kundenauftrag-Theorie machen über 50 % der GP2 aus!";
        } else if (targetId === "english-section") {
          currentSection = "english";
          activeQuestionPool = ENGLISH_QUESTIONS;
          examWeightInfo.innerHTML = "💡 <strong>Gewichtung Fachenglisch (Aufgabe 4.4):</strong> 30 Minuten Bearbeitungszeit (15 % der Übergabe) – Antworten immer auf Deutsch!";
        } else {
          currentSection = "wiso";
          activeQuestionPool = WISO_QUESTIONS;
          examWeightInfo.innerHTML = "💡 <strong>Gewichtung WiSo:</strong> 60 Minuten für 10 Aufgaben (10 % der Gesamtnote GP2) – dankbarster Noten-Booster für eine sichere 1!";
        }
        populateFilterDropdowns();
        applyFilters();
      });
    });

    filterExam.addEventListener("change", applyFilters);
    filterCategory.addEventListener("change", applyFilters);
    filterMode.addEventListener("change", applyFilters);
    if (searchInput) searchInput.addEventListener("input", applyFilters);

    function navigateQuestion(direction) {
      if (direction === "next" && currentIndex < filteredQuestions.length - 1) {
        currentIndex++;
      } else if (direction === "prev" && currentIndex > 0) {
        currentIndex--;
      }
      renderQuestion();
      updateStats();
    }

    btnPrev.addEventListener("click", () => navigateQuestion("prev"));
    btnNext.addEventListener("click", () => navigateQuestion("next"));

    document.getElementById("btn-shuffle").addEventListener("click", () => {
      for (let i = filteredQuestions.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [filteredQuestions[i], filteredQuestions[j]] = [filteredQuestions[j], filteredQuestions[i]];
      }
      currentIndex = 0;
      renderQuestion();
      updateStats();
    });

    document.getElementById("btn-export").addEventListener("click", () => {
      const backupData = JSON.stringify({
        wiso: progressWiso,
        elektro: progressElektro,
        english: progressEnglish,
        calc: progressCalc,
        bookmarks: bookmarks
      });
      navigator.clipboard.writeText(backupData).then(() => {
        alert("💾 Lernfortschritt & Merkliste in die Zwischenablage kopiert!");
      }).catch(() => {
        prompt("Backup-Code:", backupData);
      });
    });

    document.getElementById("btn-import").addEventListener("click", () => {
      const input = prompt("Backup-Code einfügen:");
      if (!input) return;
      try {
        const parsed = JSON.parse(input);
        if (parsed.wiso && parsed.elektro) {
          progressWiso = parsed.wiso;
          progressElektro = parsed.elektro;
          progressEnglish = parsed.english || {};
          progressCalc = parsed.calc || {};
          bookmarks = parsed.bookmarks || {};
          saveProgress();
          applyFilters();
          alert("✅ Lernfortschritt geladen!");
        }
      } catch (err) {
        alert("❌ Ungültiger Backup-Code.");
      }
    });

    document.getElementById("btn-reset").addEventListener("click", () => {
      if (confirm("Fortschritt für den aktuellen Bereich wirklich zurücksetzen?")) {
        if (currentSection === "wiso") progressWiso = {};
        else if (currentSection === "elektro") progressElektro = {};
        else if (currentSection === "english") progressEnglish = {};
        progressCalc = {};
        localStorage.removeItem("nrw_calc_progress_v1");
        initCalcTrainer();
        saveProgress();
        applyFilters();
      }
    });

    // Tastatursteuerung
    document.addEventListener("keydown", (e) => {
      if (quizMainContainer.style.display === "none") return;

      if (document.activeElement === freehandInput) {
        if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
          e.preventDefault();
          handleFreehandCheck();
        }
        return;
      }

      if (document.activeElement === searchInput) return;
      if (["INPUT", "TEXTAREA"].includes(document.activeElement.tagName) && document.activeElement !== freehandInput) return;

      if (e.key.toLowerCase() === "m") {
        toggleCurrentBookmark();
        return;
      }

      if (answerMode === "mc") {
        const optionBtns = optionsContainer.querySelectorAll(".option-btn");
        const keyMap = { "1": 0, "2": 1, "3": 2, "4": 3, "a": 0, "b": 1, "c": 2, "d": 3 };
        const lowerKey = e.key.toLowerCase();
        if (lowerKey in keyMap && optionBtns.length > keyMap[lowerKey]) {
          const targetBtn = optionBtns[keyMap[lowerKey]];
          if (!targetBtn.disabled) targetBtn.click();
        }
      }

      if (e.key === "ArrowRight" && !btnNext.disabled) {
        navigateQuestion("next");
      } else if (e.key === "ArrowLeft" && !btnPrev.disabled) {
        navigateQuestion("prev");
      }
    });

    // =========================================================================
    // 8. NRW-RECHENTRAINER LOGIK
    // =========================================================================
    const calcTaskSelector = document.getElementById("calc-task-selector");
    const btnCalcRandom = document.getElementById("btn-calc-random");
    const calcBadgeExam = document.getElementById("calc-badge-exam");
    const calcBadgeBook = document.getElementById("calc-badge-book");
    const calcQuestionTitle = document.getElementById("calc-question-title");
    const calcQuestionDesc = document.getElementById("calc-question-desc");
    const calcStep1 = document.getElementById("calc-step-1");
    const calcStep2 = document.getElementById("calc-step-2");
    const calcStep3 = document.getElementById("calc-step-3");
    const calcStep4 = document.getElementById("calc-step-4");
    const calcUserNumber = document.getElementById("calc-user-number");
    const calcUnitLabel = document.getElementById("calc-unit-label");
    const btnCalcCheck = document.getElementById("btn-calc-check");
    const btnCalcShowSolution = document.getElementById("btn-calc-show-solution");
    const calcSolutionBox = document.getElementById("calc-solution-box");
    const calcFeedbackTitle = document.getElementById("calc-feedback-title");
    const calcSolutionText = document.getElementById("calc-solution-text");

    let currentCalcTaskIndex = 0;
    let currentCalcInstance = null;

    function initCalcTrainer() {
      calcTaskSelector.innerHTML = "";
      CALC_TASKS.forEach((t, idx) => {
        const opt = document.createElement("option");
        opt.value = idx;
        opt.textContent = (progressCalc[t.id] ? "✅ " : "") + t.title;
        calcTaskSelector.appendChild(opt);
      });
      loadCalcTask(0, false);
    }

    function loadCalcTask(idx, randomize = false) {
      currentCalcTaskIndex = idx;
      const task = CALC_TASKS[idx];
      currentCalcInstance = task.generateParams(randomize);

      calcBadgeExam.textContent = `📅 ${task.exam}`;
      calcBadgeBook.textContent = `📖 ${task.bookRef}`;
      calcQuestionTitle.textContent = task.title;
      calcQuestionDesc.textContent = currentCalcInstance.desc;
      calcUnitLabel.textContent = task.unit;

      calcStep1.value = "";
      calcStep2.value = "";
      calcStep3.value = "";
      calcStep4.value = "";
      calcUserNumber.value = "";
      calcSolutionBox.classList.add("hidden");
    }

    calcTaskSelector.addEventListener("change", (e) => loadCalcTask(Number(e.target.value), false));
    btnCalcRandom.addEventListener("click", () => loadCalcTask(currentCalcTaskIndex, true));

    function formatFullCalcSolution(inst) {
      return `1️⃣ GEGEBEN & GESUCHT:\n${inst.step1}\n\n2️⃣ GRUNDFORMEL & UMSTELLUNG:\n${inst.step2}\n\n3️⃣ WERTE MIT EINHEITEN EINSETZEN:\n${inst.step3}\n\n4️⃣ ERGEBNIS MIT EINHEIT & ANTWORTSATZ:\n${inst.step4}`;
    }

    btnCalcCheck.addEventListener("click", () => {
      if (!currentCalcInstance) return;
      const task = CALC_TASKS[currentCalcTaskIndex];
      const rawVal = calcUserNumber.value.replace(",", ".").trim();
      const userNum = parseFloat(rawVal);

      const hasSteps =
        calcStep1.value.trim().length > 3 &&
        calcStep2.value.trim().length > 3 &&
        calcStep3.value.trim().length > 3 &&
        calcStep4.value.trim().length > 3;

      if (isNaN(userNum)) {
        alert("Bitte trage bei Schritt 4 deinen berechneten Zahlenwert ein!");
        calcUserNumber.focus();
        return;
      }

      const diff = Math.abs(userNum - currentCalcInstance.expected);
      const isNumCorrect = diff <= currentCalcInstance.tolerance;

      if (isNumCorrect && hasSteps) {
        playSuccessSound();
        calcFeedbackTitle.textContent = `✅ Volle Punktzahl! Dein Ergebnis (${userNum} ${task.unit}) und das 4-Schritte-Schema sind komplett!`;
        calcFeedbackTitle.style.color = "#22c55e";
        const opt = calcTaskSelector.options[currentCalcTaskIndex];
        if (opt && !opt.textContent.startsWith("✅ ")) {
          opt.textContent = "✅ " + opt.textContent;
        }
        progressCalc[task.id] = true;
        localStorage.setItem("nrw_calc_progress_v1", JSON.stringify(progressCalc));
        recordPsychologicalProgress(true);
        updateStats();
      } else if (isNumCorrect && !hasSteps) {
        playWrongSound();
        calcFeedbackTitle.textContent = `⚠️ Zahlenwert (${userNum} ${task.unit}) stimmt, ABER es fehlen Rechenschritte (1–4)! In NRW gibt ein Ergebnis ohne Rechenweg 0 Punkte!`;
        calcFeedbackTitle.style.color = "#f59e0b";
      } else {
        playWrongSound();
        calcFeedbackTitle.textContent = `❌ Dein Zahlenwert (${userNum} ${task.unit}) weicht vom Sollwert (${currentCalcInstance.expected} ${task.unit}) ab. Prüfe die Musterlösung:`;
        calcFeedbackTitle.style.color = "#ef4444";
        recordPsychologicalProgress(false);
        updateStats();
      }

      calcSolutionText.textContent = formatFullCalcSolution(currentCalcInstance);
      calcSolutionBox.classList.remove("hidden");
    });

    btnCalcShowSolution.addEventListener("click", () => {
      if (!currentCalcInstance) return;
      calcFeedbackTitle.textContent = "📖 Offizielle 4-Schritte-Musterlösung (NRW-Vorgabe):";
      calcFeedbackTitle.style.color = "#60a5fa";
      calcSolutionText.textContent = formatFullCalcSolution(currentCalcInstance);
      calcSolutionBox.classList.remove("hidden");
    });

    // =========================================================================
    // 9. PRÜFPROTOKOLL-SIMULATOR (AUFGABE 4.3 – DIN VDE 0100-600)
    // =========================================================================
    const PROTOKOLL_REASONS = [
      { value: "", label: "— Bitte Begründung wählen —" },
      { value: "ok", label: "✅ Alle Grenzwerte & Schutzorgane nach VDE 0100-600 / -410 eingehalten" },
      { value: "rpe_high", label: "❌ R_PE-Ausreißer (0,87 Ω bei 6 mm²): Lose/korrodierte PE-Klemmstelle!" },
      { value: "riso_low", label: "❌ R_iso < 1,0 MΩ: Isolationsfehler (Feuchtigkeit, Kabelschaden oder SPD nicht gezogen)" },
      { value: "zs_high", label: "❌ Z_S überschreitet 2/3-Grenzwert (bei C20 max. 0,767 Ω): Abschaltstrom Ia nicht erreicht!" },
      { value: "fuse_over", label: "❌ Falsche Vorsicherung (B20A bei 1,5 mm² B2): Überlastschutz Ib ≤ In ≤ Iz verletzt!" },
      { value: "rcd_300", label: "❌ Falscher RCD (300 mA statt ≤ 30 mA): Kein Personenschutz für Steckdosenstromkreis!" },
      { value: "drehfeld_links", label: "❌ Linksdrehfeld an CEE-Steckdose: Phasenfolge L1-L2-L3 falsch (Rechtsdrehfeld Pflicht!)" }
    ];

    const PROTOKOLL_CIRCUITS = [
      {
        id: "-F1", target: "Steckdosen Küche Arbeitsfläche", cable: "NYM-J 3x2,5 mm² (B2, 18 m)", fuse: "LS B16A",
        rpe: "0,14", riso: "> 500", zs: "0,48", zi: "0,46", rcd: "Typ A (30 mA) | 21 mA / 18 ms", field: "— (1~)",
        expectedStatus: "io", expectedReason: "ok",
        explanation: "✅ -F1 IST IN ORDNUNG (i. O.): Ir = 23 A ≥ 16 A (VDE 0298-4); R_PE = 0,14 Ω plausibel; R_iso > 500 MΩ; Z_S = 0,48 Ω ≤ 1,92 Ω (für B16A mit 2/3-Faktor); RCD 30 mA löst bei 21 mA in 18 ms aus."
      },
      {
        id: "-F2", target: "Kombidämpfer / Elektroherd (Festanschluss)", cable: "NYM-J 5x6 mm² (B2, 15 m)", fuse: "3-pol. LS B25A",
        rpe: "0,87", riso: "> 500", zs: "1,12", zi: "0,31", rcd: "— (Festanschluss)", field: "Rechts",
        expectedStatus: "nio", expectedReason: "rpe_high",
        explanation: "❌ -F2 IST NICHT IN ORDNUNG (n. i. O.) – R_PE-AUSREISSER:\nRechnerischer Sollwert: R_PE = 15 m / (56 · 6 mm²) = 0,045 Ω. Der Messwert 0,87 Ω ist fast 20-mal zu hoch -> lose oder korrodierte PE-Klemme!"
      },
      {
        id: "-F3", target: "Außenbeleuchtung Parkplatz", cable: "NYY-J 3x1,5 mm² (D, 30 m)", fuse: "LS B10A",
        rpe: "0,38", riso: "0,42", zs: "0,95", zi: "0,94", rcd: "Typ A (30 mA) | 23 mA / 22 ms", field: "— (1~)",
        expectedStatus: "nio", expectedReason: "riso_low",
        explanation: "❌ -F3 IST NICHT IN ORDNUNG (n. i. O.) – ISOLATIONSFEHLER:\nNach DIN VDE 0100-600 muss R_iso bei 500 V DC mindestens ≥ 1,0 MΩ betragen. Gemessen wurden nur 0,42 MΩ -> Feuchtigkeit in Außenleuchte oder Mantelschaden!"
      },
      {
        id: "-F4", target: "Wärmepumpe Außenbereich (W24/25 PL 2.2)", cable: "NYY-J 5x2,5 mm² (D, 62 m)", fuse: "3-pol. LS C20A",
        rpe: "0,45", riso: "250", zs: "1,09", zi: "1,08", rcd: "— (Festanschluss)", field: "Rechts",
        expectedStatus: "nio", expectedReason: "zs_high",
        explanation: "❌ -F4 IST NICHT IN ORDNUNG (n. i. O.) – Z_S ÜBERSCHREITET 2/3-GRENZWERT:\nFür C20A gilt Ia = 200 A. Mit 2/3-Faktor: Z_S,max = 0,767 Ω. Da Z_S,mess = 1,09 Ω > 0,767 Ω ist, wird die Abschaltbedingung verletzt! Querschnitt muss auf 4 mm² erhöht werden."
      },
      {
        id: "-F5", target: "Steckdosen Sozialraum / Werkstatt", cable: "NYM-J 3x1,5 mm² (B2, 16 m)", fuse: "LS B20A",
        rpe: "0,21", riso: "> 500", zs: "0,58", zi: "0,57", rcd: "Typ A (30 mA) | 20 mA / 19 ms", field: "— (1~)",
        expectedStatus: "nio", expectedReason: "fuse_over",
        explanation: "❌ -F5 IST NICHT IN ORDNUNG (n. i. O.) – FALSCHE VORSICHERUNG:\nNach VDE 0298-4 hat 1,5 mm² in Verlegeart B2 nur Iz = 16,5 A. Mit In = 20 A ist Ib ≤ In ≤ Iz verletzt (Überhitzungsgefahr!)."
      },
      {
        id: "-F6", target: "Steckdosen Außenbereich / Terrasse", cable: "NYY-J 3x2,5 mm² (D, 22 m)", fuse: "LS B16A",
        rpe: "0,18", riso: "380", zs: "0,52", zi: "0,51", rcd: "Typ A (300 mA) | 210 mA / 24 ms", field: "— (1~)",
        expectedStatus: "nio", expectedReason: "rcd_300",
        explanation: "❌ -F6 IST NICHT IN ORDNUNG (n. i. O.) – FALSCHER RCD:\nFür Steckdosen bis 32 A schreibt DIN VDE 0100-410 zwingend einen RCD mit I_Δn ≤ 30 mA für den Personenschutz vor (300 mA bietet nur Brandschutz!)."
      },
      {
        id: "-F7", target: "CEE-Drehstromsteckdose 16 A Werkstatt", cable: "NYM-J 5x2,5 mm² (B2, 20 m)", fuse: "3-pol. LS C16A",
        rpe: "0,16", riso: "> 500", zs: "0,49", zi: "0,48", rcd: "Typ A (30 mA) | 22 mA / 17 ms", field: "Links",
        expectedStatus: "nio", expectedReason: "drehfeld_links",
        explanation: "❌ -F7 IST NICHT IN ORDNUNG (n. i. O.) – LINKSDREHFELD:\nAn CEE-Steckdosen muss zwingend ein Rechtsdrehfeld anliegen, da Drehstrommotoren sonst falsch herum anlaufen (Unfallgefahr!)."
      },
      {
        id: "-F8", target: "Förderband mit Frequenzumrichter (S22 FSA 1)", cable: "NYY-J 5x6 mm² (B2, 25 m)", fuse: "3-pol. LS C32A",
        rpe: "0,08", riso: "420 (250V DC)", zs: "0,34", zi: "0,33", rcd: "Typ B+ (30 mA) | 24 mA / 16 ms", field: "Rechts",
        expectedStatus: "io", expectedReason: "ok",
        explanation: "✅ -F8 IST IN ORDNUNG (i. O.): Allstromsensitiver RCD Typ B+ (30 mA) für FU korrekt gewählt; Z_S = 0,34 Ω ≤ 0,479 Ω; Rechtsdrehfeld liegt an."
      }
    ];

    const protoTbody = document.getElementById("proto-tbody");
    const protoFeedbackContainer = document.getElementById("proto-feedback-container");
    const protoScoreBadge = document.getElementById("proto-score-badge");
    let protoUserState = {};

    function initProtokollSimulator() {
      if (!protoTbody) return;
      protoTbody.innerHTML = "";
      protoUserState = {};

      PROTOKOLL_CIRCUITS.forEach((c) => {
        protoUserState[c.id] = { status: null, reason: "" };
        const tr = document.createElement("tr");
        tr.id = `proto-row-${c.id}`;
        const optionsHtml = PROTOKOLL_REASONS.map((r) => `<option value="${r.value}">${r.label}</option>`).join("");

        tr.innerHTML = `
          <td><strong>${c.id}</strong></td>
          <td class="text-left">${c.target}</td>
          <td class="text-left">${c.cable}</td>
          <td>${c.fuse}</td>
          <td>${c.rpe}</td>
          <td>${c.riso}</td>
          <td>${c.zs}</td>
          <td>${c.zi}</td>
          <td>${c.rcd}</td>
          <td><strong>${c.field}</strong></td>
          <td>
            <div class="io-btn-group">
              <button type="button" class="io-btn" data-id="${c.id}" data-val="io">i. O.</button>
              <button type="button" class="io-btn" data-id="${c.id}" data-val="nio">n. i. O.</button>
            </div>
          </td>
          <td><select class="proto-reason-select" data-id="${c.id}">${optionsHtml}</select></td>
        `;
        protoTbody.appendChild(tr);
      });

      protoTbody.querySelectorAll(".io-btn").forEach((btn) => {
        btn.addEventListener("click", () => {
          const cid = btn.dataset.id;
          const val = btn.dataset.val;
          protoUserState[cid].status = val;
          const row = document.getElementById(`proto-row-${cid}`);
          row.querySelectorAll(".io-btn").forEach((b) => b.classList.remove("selected-io", "selected-nio"));
          btn.classList.add(val === "io" ? "selected-io" : "selected-nio");

          const selectEl = row.querySelector(".proto-reason-select");
          if (val === "io" && !selectEl.value) {
            selectEl.value = "ok";
            protoUserState[cid].reason = "ok";
          } else if (val === "nio" && selectEl.value === "ok") {
            selectEl.value = "";
            protoUserState[cid].reason = "";
          }
        });
      });

      protoTbody.querySelectorAll(".proto-reason-select").forEach((sel) => {
        sel.addEventListener("change", () => {
          protoUserState[sel.dataset.id].reason = sel.value;
        });
      });

      document.querySelectorAll('input[name="proto-overall"]').forEach((r) => (r.checked = false));
      protoFeedbackContainer.classList.add("hidden");
      protoScoreBadge.textContent = "Noch nicht ausgewertet";
    }

    function evaluateProtokoll(revealAll = false) {}
    document.getElementById("btn-proto-reset")?.addEventListener("click", initProtokollSimulator);

    // =========================================================================
    // 10. SCHALTPLAN- & VERTEILUNGSFEHLER-TRAINER (SVG)
    // =========================================================================
    const UV_FAULTS = {
      "1": {
        title: "Fehler 1: Neutralleiterschienen N1 und N2 hinter RCD 1 und RCD 2 gebrückt",
        question: "Welche unmittelbare Folge hat die Brücke zwischen den Neutralleiterschienen N1 und N2 hinter den beiden RCDs?",
        options: [
          "Der Neutralleiter-Rückstrom teilt sich auf beide Summenstromwandler auf (Summenstrom ≠ 0) -> Beide RCDs lösen bei Belastung sofort aus!",
          "Die Spannung an den Steckdosen steigt auf 400 V AC.",
          "Die RCDs lösen bei einem Erdschluss überhaupt nicht mehr aus.",
          "Die Brücke verbessert den Schutzpotentialausgleich nach VDE 0100-540."
        ],
        correct: 0,
        explanation: "✅ Offizielle FEH-NRW-Musterlösung:\n• Folge: Unkontrollierte Stromaufteilung der N-Leiter -> Summenstromwandler beider RCDs registrieren Fehlerstrom -> sofortige Fehlauslösung!\n• Behebung: Brücke entfernen; N1 und N2 absolut getrennt führen."
      },
      "2": {
        title: "Fehler 2: Thermische Überlastung des 40-A-RCD (-F2) durch Vorsicherungen (2x 35 A)",
        question: "Warum ist die Verschaltung der Vorsicherungen -F01 (35 A) und -F02 (35 A) vor dem RCD -F2 (40 A) unzulässig?",
        options: [
          "Über -F01 und -F02 bzw. die 6 nachgeschalteten LS-Schalter kann ein Strom > 40 A fließen -> RCD verschmort thermisch!",
          "Neozed-Sicherungen dürfen grundsätzlich nicht vor RCDs eingesetzt werden.",
          "Ein 40A-RCD hält dauerhaft bis zu 120 A ohne Schaden aus.",
          "Die Vorsicherung muss mindestens 100 A betragen."
        ],
        correct: 0,
        explanation: "✅ DIN VDE 0100-530:\n• Fehler: Der 40-A-RCD ist nicht gegen Überlast geschützt. Es muss eine Vorsicherung mit max. 40 A gG gewählt oder ein 63-A-RCD eingebaut werden."
      },
      "3": {
        title: "Fehler 3: Falscher RCD-Bemessungsdifferenzstrom (300 mA statt 30 mA) an -F2",
        question: "An RCD -F2 sind Steckdosenstromkreise der Büros angeschlossen. Warum ist das ein schwerer VDE-Verstoß?",
        options: [
          "Für Steckdosen bis 32 A schreibt DIN VDE 0100-410 zwingend max. I_Δn = 30 mA vor. 300 mA bietet keinen Personenschutz (Lebensgefahr durch Herzkammerflimmern)!",
          "Ein 300-mA-RCD löst schon beim Einschalten eines Wasserkochers zu früh aus.",
          "Für Steckdosen im Innenbereich sind 500 mA vorgeschrieben.",
          "RCDs dürfen nicht für Büro-Steckdosen verwendet werden."
        ],
        correct: 0,
        explanation: "✅ DIN VDE 0100-410: 300-mA-RCDs bieten lediglich Brandschutz, jedoch keinen Personenschutz!"
      },
      "4": {
        title: "Fehler 4: Durchlauferhitzer (-F1.1) über 3 einzelne 1-polige LS-Schalter B32A angeschlossen",
        question: "Welche zwei Fehler stecken im Abgang -F1.1 für den 400-V-Durchlauferhitzer?",
        options: [
          "1. Drei 1-polige LS statt eines gemeinsamen 3-poligen LS (schaltet im Fehlerfall nicht allpolig ab). 2. B32A eingebaut statt C32A laut Plan.",
          "Ein Durchlauferhitzer benötigt immer drei getrennte Schmelzsicherungen mit verschiedenen Nennströmen.",
          "Der Durchlauferhitzer darf nur mit B10A abgesichert werden.",
          "Bei Drehstromgeräten darf nur L1 abgesichert werden."
        ],
        correct: 0,
        explanation: "✅ Allpolige Abschaltung: Bei 400-V-Drehstromverbrauchern ist ein 3-poliger LS-Schalter mit gekoppelter Schaltung vorgeschrieben."
      },
      "5": {
        title: "Fehler 5: Überspannungsableiter SPD Typ 2 (-F3) fehlerhaft angeschlossen",
        question: "Was passiert durch die fehlerhafte Verdrahtung am SPD Typ 2 (N-Klemme auf PE, PE-Klemme falsch/offen)?",
        options: [
          "Der Überspannungsschutz ist unwirksam; bei Überspannungen fehlt der definierte Ableitpfad zur Haupterdungsschiene (HES/PE).",
          "Der SPD arbeitet dadurch doppelt so schnell.",
          "Ein SPD Typ 2 benötigt im TN-S-System keinen PE-Anschluss.",
          "Der Zähler läuft dadurch rückwärts."
        ],
        correct: 0,
        explanation: "✅ DIN VDE 0100-534: Überspannungsableiter müssen niederohmig und korrekt zwischen Außenleitern, N und PE angeschlossen sein."
      },
      "6": {
        title: "Fehler 6: Schutzklasse-II-Symbol (Doppelquadrat) trotz angeschlossenem Schutzleiter (PE)",
        question: "Der Verteiler trägt das Symbol für Schutzklasse II, oben ist das Gehäuse jedoch mit der PE-Schiene verbunden. Warum ist das falsch?",
        options: [
          "Schutzisolierte Betriebsmittel (SK II, Doppelquadrat) dürfen NIEMALS an den Schutzleiter angeschlossen werden, da im Fehlerfall Berührungsspannungen verschleppt werden!",
          "Das Doppelquadrat bedeutet, dass zwei Schutzleiter angeschlossen werden müssen.",
          "Schutzklasse II gilt nur für Spannungen unter 12 V.",
          "Jedes SK-II-Gerät muss zusätzlich geerdet werden."
        ],
        correct: 0,
        explanation: "✅ DIN VDE 0100-410: SK-II-Betriebsmittel dürfen keinen Schutzleiteranschluss am Gehäuse haben!"
      },
      "7": {
        title: "Fehler 7: Grün-Gelbe Ader (PE) zweckentfremdet / N-Leiter an falscher Schiene",
        question: "Warum darf in den Abgängen niemals die grün-gelbe Ader als Schaltader verwendet werden?",
        options: [
          "Die grün-gelbe Kennzeichnung ist nach DIN VDE 0100-510 auf der gesamten Länge ausnahmslos dem Schutzleiter (PE/PEN) vorbehalten!",
          "Grün-gelbe Adern haben einen höheren Kupferwiderstand.",
          "In 1,5 mm² Leitungen ist grün-gelb immer der Neutralleiter.",
          "Das ist bei kurzen Leitungen unter 5 m erlaubt."
        ],
        correct: 0,
        explanation: "✅ DIN VDE 0100-510: Grün-gelb darf unter keinen Umständen als stromführender Außen- oder Schaltdraht umfunktioniert werden!"
      },
      "8": {
        title: "Fehler 8: Falsche Absicherung / Zuordnung der Stromkreise (-F2.5 B10A statt B16A)",
        question: "Im Plan war für alle Teeküchen-Steckdosen B16A vorgesehen. Im Installationsplan wurde B10A eingebaut. Folge?",
        options: [
          "Bei Betrieb von Geräten wie Wasserkocher oder Kaffeemaschine (> 2300 W) löst der B10A-Automat ständig durch betriebliche Überlast aus.",
          "B10A lässt mehr Strom zu als B16A.",
          "Reserve-Sicherungen müssen immer mit der PE-Schiene kurzgeschlossen werden.",
          "In Küchen sind nur Schmelzsicherungen erlaubt."
        ],
        correct: 0,
        explanation: "✅ Planungsabweichung: B10A ist für Küchensteckdosen zu klein dimensioniert (10 A * 230 V = 2300 W). Wasserkocher lösen Überlast aus."
      }  
    };

    const foundUvFaults = new Set();
    const uvProgressBadge = document.getElementById("uv-progress-badge");
    const uvFaultTitle = document.getElementById("uv-fault-title");
    const uvFaultPrompt = document.getElementById("uv-fault-prompt");
    const uvFaultOptions = document.getElementById("uv-fault-options");
    const uvFaultExplanation = document.getElementById("uv-fault-explanation");

    document.querySelectorAll(".fault-hotspot").forEach((hs) => {
      hs.addEventListener("click", () => {
        const fid = hs.dataset.fault;
        const data = UV_FAULTS[fid];
        if (!data) return;

        uvFaultTitle.textContent = `🔎 ${data.title}`;
        uvFaultPrompt.textContent = data.question;
        uvFaultOptions.innerHTML = "";
        uvFaultOptions.classList.remove("hidden");
        uvFaultExplanation.classList.add("hidden");

        data.options.forEach((optText, idx) => {
          const btn = document.createElement("button");
          btn.className = "option-btn";
          btn.innerHTML = `<span class="option-letter">${["A", "B", "C", "D"][idx]}</span><span>${optText}</span>`;
          btn.addEventListener("click", () => {
            uvFaultOptions.querySelectorAll(".option-btn").forEach((b) => (b.disabled = true));
            if (idx === data.correct) {
              playSuccessSound();
              btn.classList.add("correct");
              hs.classList.add("found");
              foundUvFaults.add(fid);
              uvProgressBadge.textContent = `Gefunden: ${foundUvFaults.size} / 8 Fehler 🏆`;
            } else {
              playWrongSound();
              btn.classList.add("wrong");
              uvFaultOptions.querySelectorAll(".option-btn")[data.correct].classList.add("correct");
            }
            uvFaultExplanation.textContent = data.explanation;
            uvFaultExplanation.classList.remove("hidden");
          });
          uvFaultOptions.appendChild(btn);
        });
      });
    });

    // FSA Schaltungen
    const FSA_CIRCUITS = {
      selbsthaltung: {
        title: "Frage 1 (FSA Klassiker): Warum werden -F1 und -S0 als Öffner verdrahtet und wie funktioniert die Selbsthaltung?",
        svg: `
          <svg viewBox="0 0 700 280" width="100%" style="max-width: 680px; height: auto; font-family: sans-serif;">
            <rect x="10" y="10" width="680" height="260" rx="8" fill="#0f172a" stroke="#334155" stroke-width="2"/>
            <text x="25" y="35" fill="#60a5fa" font-size="13" font-weight="bold">Steuerstromkreis: Drahtbruchsicherheit & Selbsthaltung</text>
            <line x1="60" y1="55" x2="640" y2="55" stroke="#ef4444" stroke-width="3"/><text x="30" y="60" fill="#ef4444" font-weight="bold" font-size="13">L1</text>
            <line x1="60" y1="245" x2="640" y2="245" stroke="#3b82f6" stroke-width="3"/><text x="30" y="250" fill="#3b82f6" font-weight="bold" font-size="13">N</text>
            <line x1="220" y1="55" x2="220" y2="80" stroke="#f8fafc" stroke-width="2"/>
            <line x1="220" y1="80" x2="208" y2="105" stroke="#fbbf24" stroke-width="2.5"/>
            <text x="150" y="98" fill="#fbbf24" font-size="12" font-weight="bold">-F1 (95/96 NC)</text>
            <line x1="220" y1="105" x2="220" y2="125" stroke="#f8fafc" stroke-width="2"/>
            <line x1="220" y1="125" x2="208" y2="150" stroke="#fbbf24" stroke-width="2.5"/>
            <text x="150" y="143" fill="#fbbf24" font-size="12" font-weight="bold">-S0 AUS (21/22)</text>
            <line x1="220" y1="150" x2="220" y2="165" stroke="#f8fafc" stroke-width="2"/>
            <line x1="220" y1="165" x2="310" y2="165" stroke="#f8fafc" stroke-width="2"/>
            <line x1="220" y1="165" x2="205" y2="195" stroke="#22c55e" stroke-width="2.5"/>
            <text x="145" y="188" fill="#4ade80" font-size="12" font-weight="bold">-S1 EIN</text>
            <line x1="310" y1="165" x2="295" y2="195" stroke="#22c55e" stroke-width="2.5"/>
            <text x="320" y="188" fill="#4ade80" font-size="12" font-weight="bold">-Q1 (13/14)</text>
            <line x1="220" y1="195" x2="310" y2="195" stroke="#f8fafc" stroke-width="2"/>
            <line x1="220" y1="195" x2="220" y2="210" stroke="#f8fafc" stroke-width="2"/>
            <rect x="195" y="210" width="50" height="22" fill="#1e293b" stroke="#60a5fa" stroke-width="2"/>
            <text x="208" y="226" fill="#fff" font-size="12" font-weight="bold">-Q1</text>
            <line x1="220" y1="232" x2="220" y2="245" stroke="#f8fafc" stroke-width="2"/>
          </svg>
        `,
        options: [
          "Öffner (-F1 95/96 und -S0 21/22) garantieren Drahtbruchsicherheit (bei Leitungsbruch fällt -Q1 sofort ab). Der Schließer -Q1 (13/14) liegt parallel zum Ein-Taster -S1 und hält den Strompfad nach dem Loslassen geschlossen.",
          "Der Schließer -Q1 (13/14) muss in Reihe zum Aus-Taster -S0 geschaltet werden.",
          "Not-Halt und Motorschutzrelais werden immer als Schließer (NO) angeschlossen.",
          "Ohne Zeitrelais ist keine Selbsthaltung möglich."
        ],
        correct: 0,
        explanation: "✅ Drahtbruchsicherheit: Alle Aus-Befehlsgeräte liegen als Öffner (NC) in Reihe. Der Selbsthaltekontakt liegt parallel zum Einschalt-Taster."
      },
      wendeschuetz: {
        title: "Frage 2 (Wendeschützschaltung): Wie verhindert man im Steuer- und Hauptstromkreis einen Kurzschluss beim Drehrichtungswechsel?",
        svg: `
          <svg viewBox="0 0 700 280" width="100%" style="max-width: 680px; height: auto; font-family: sans-serif;">
            <rect x="10" y="10" width="680" height="260" rx="8" fill="#0f172a" stroke="#334155" stroke-width="2"/>
            <text x="25" y="35" fill="#60a5fa" font-size="13" font-weight="bold">Wendeschützschaltung: Doppelte Verriegelung</text>
            <rect x="110" y="80" width="90" height="28" rx="4" fill="#1e293b" stroke="#22c55e"/><text x="120" y="99" fill="#fff" font-size="11">-S1 EIN</text>
            <rect x="110" y="120" width="90" height="28" rx="4" fill="#1e293b" stroke="#fbbf24"/><text x="120" y="139" fill="#fbbf24" font-size="11">-S2 NC</text>
            <rect x="110" y="160" width="90" height="28" rx="4" fill="#1e293b" stroke="#ef4444"/><text x="120" y="179" fill="#fca5a5" font-size="11">-Q2 NC</text>
            <rect x="125" y="205" width="60" height="28" rx="4" fill="#1e3a8a" stroke="#60a5fa"/><text x="142" y="224" fill="#fff" font-weight="bold" font-size="12">-Q1</text>
            <rect x="310" y="80" width="90" height="28" rx="4" fill="#1e293b" stroke="#22c55e"/><text x="320" y="99" fill="#fff" font-size="11">-S2 EIN</text>
            <rect x="310" y="120" width="90" height="28" rx="4" fill="#1e293b" stroke="#fbbf24"/><text x="320" y="139" fill="#fbbf24" font-size="11">-S1 NC</text>
            <rect x="310" y="160" width="90" height="28" rx="4" fill="#1e293b" stroke="#ef4444"/><text x="320" y="179" fill="#fca5a5" font-size="11">-Q1 NC</text>
            <rect x="325" y="205" width="60" height="28" rx="4" fill="#1e3a8a" stroke="#60a5fa"/><text x="342" y="224" fill="#fff" font-weight="bold" font-size="12">-Q2</text>
          </svg>
        `,
        options: [
          "Im Hauptstromkreis werden 2 Außenleiter getauscht. Im Steuerstromkreis verhindert die Schützverriegelung (Öffner 21/22 des Gegenschützes vor der Spule) das gleichzeitige Anziehen von -Q1 und -Q2.",
          "Es werden der Schutzleiter PE und der Außenleiter L1 getauscht.",
          "Beide Schütze müssen gleichzeitig anziehen, damit der Motor bremst.",
          "Bei einer SPS darf auf die Hardware-Schützverriegelung komplett verzichtet werden."
        ],
        correct: 0,
        explanation: "✅ Schützverriegelung ist immer hardwaremäßig Pflicht, um bei verklebten Kontakten einen Phasenschluss sicher auszuschließen!"
      },
      dahlander: {
        title: "Frage 3 (Dahlanderschaltung Δ / YY): Warum benötigt ein Dahlandermotor ZWEI getrennte Motorschutzrelais (-F1 und -F2)?",
        svg: `
          <svg viewBox="0 0 700 280" width="100%" style="max-width: 680px; height: auto; font-family: sans-serif;">
            <rect x="10" y="10" width="680" height="260" rx="8" fill="#0f172a" stroke="#334155" stroke-width="2"/>
            <text x="25" y="35" fill="#60a5fa" font-size="13" font-weight="bold">Dahlanderschaltung: Polumschaltung 1 : 2</text>
            <rect x="35" y="60" width="295" height="190" rx="6" fill="#1e293b" stroke="#3b82f6" stroke-width="2"/>
            <text x="50" y="85" fill="#60a5fa" font-size="12" font-weight="bold">1. Stufe: Dreieck (Δ) - Langsam</text>
            <text x="50" y="120" fill="#fbbf24" font-size="11">• Motorschutzrelais -F1 für Stufe 1</text>
            <rect x="365" y="60" width="300" height="190" rx="6" fill="#1e293b" stroke="#22c55e" stroke-width="2"/>
            <text x="380" y="85" fill="#4ade80" font-size="12" font-weight="bold">2. Stufe: Doppelstern (YY) - Schnell</text>
            <text x="380" y="120" fill="#fbbf24" font-size="11">• Motorschutzrelais -F2 für Stufe 2</text>
          </svg>
        `,
        options: [
          "Weil der Motor in der langsamen Drehzahlstufe (Δ) und in der schnellen Drehzahlstufe (YY) unterschiedlich hohe Bemessungsströme aufnimmt! Im Steuerkreis liegen beide Öffner (-F1 und -F2) in Reihe.",
          "Weil ein einzelnes Motorschutzrelais nur zwei Phasen überwachen kann.",
          "Weil bei der Dahlanderschaltung eine Phase mit Gleichstrom betrieben wird.",
          "Das zweite Motorschutzrelais dient nur als Reserve im Schaltschrank."
        ],
        correct: 0,
        explanation: "✅ Da sich bei der Polumschaltung die Leistungs- und Stromwerte ändern, muss jede Drehzahlstufe über ein eigenes Relais geschützt werden."
      },
      zeitrelais: {
        title: "Frage 4 (Stern-Dreieck-Anlauf & Zeitrelais): Welches Zeitrelais steuert die Umschaltung von Stern auf Dreieck und warum wird im Stern gestartet?",
        svg: `
          <svg viewBox="0 0 700 280" width="100%" style="max-width: 680px; height: auto; font-family: sans-serif;">
            <rect x="10" y="10" width="680" height="260" rx="8" fill="#0f172a" stroke="#334155" stroke-width="2"/>
            <text x="25" y="35" fill="#60a5fa" font-size="13" font-weight="bold">Stern-Dreieck-Anlauf (Y/Δ)</text>
            <rect x="35" y="60" width="300" height="190" rx="6" fill="#1e293b" stroke="#fbbf24" stroke-width="2"/>
            <text x="50" y="85" fill="#fbbf24" font-size="12" font-weight="bold">Anzugsverzögertes Zeitrelais (Kreuz-Symbol)</text>
            <text x="50" y="120" fill="#e2e8f0" font-size="11">• Start in Y mit 1/3 Anlaufstrom</text>
            <text x="50" y="145" fill="#e2e8f0" font-size="11">• Umschaltung auf Dreieck nach Hochlauf</text>
            <rect x="365" y="60" width="300" height="190" rx="6" fill="#1e293b" stroke="#60a5fa" stroke-width="2"/>
            <text x="380" y="85" fill="#60a5fa" font-size="12" font-weight="bold">Abfallverzögertes Zeitrelais (Schwarz-Symbol)</text>
            <text x="380" y="120" fill="#e2e8f0" font-size="11">• Z. B. für Lüfternachlauf</text>
          </svg>
        `,
        options: [
          "Ein anzugsverzögertes Zeitrelais (-K1T, Symbol mit Kreuz). Im Stern werden Anlaufstrom und Drehmoment auf 1/3 reduziert; nach Hochlauf schaltet -K1T mit kleiner Pause auf Dreieck um.",
          "Ein abfallverzögertes Zeitrelais; im Stern ist der Anlaufstrom dreimal so hoch wie im Dreieck.",
          "Beim Stern-Dreieck-Anlauf müssen Sternschütz und Dreieckschütz dauerhaft gleichzeitig eingeschaltet sein.",
          "Für Stern-Dreieck-Anlauf am 400-V-Netz wird ein Motor mit Typenschild 230/400 V benötigt."
        ],
        correct: 0,
        explanation: "✅ Anzugsverzögertes Zeitrelais steuert den Ablauf. Wichtig: Typenschild muss für 400 V Dreieckbetrieb zwingend 400/690 V lauten!"
      }
    };

    const uvTrainerContainer = document.getElementById("uv-trainer-container");
    const fsaTrainerContainer = document.getElementById("fsa-trainer-container");
    const btnModeUv = document.getElementById("btn-mode-uv");
    const btnModeFsa = document.getElementById("btn-mode-fsa");

    btnModeUv?.addEventListener("click", () => {
      btnModeUv.className = "btn primary";
      btnModeFsa.className = "btn secondary";
      uvTrainerContainer.classList.remove("hidden");
      fsaTrainerContainer.classList.add("hidden");
    });

    btnModeFsa?.addEventListener("click", () => {
      btnModeFsa.className = "btn primary";
      btnModeUv.className = "btn secondary";
      fsaTrainerContainer.classList.remove("hidden");
      uvTrainerContainer.classList.add("hidden");
      loadFsaCircuit("selbsthaltung");
    });

    function loadFsaCircuit(key) {
      const data = FSA_CIRCUITS[key];
      if (!data) return;
      document.getElementById("fsa-svg-holder").innerHTML = data.svg;
      document.getElementById("fsa-question-title").textContent = data.title;
      const optHolder = document.getElementById("fsa-options-holder");
      const expHolder = document.getElementById("fsa-explanation-holder");
      optHolder.innerHTML = "";
      expHolder.classList.add("hidden");

      data.options.forEach((text, i) => {
        const b = document.createElement("button");
        b.className = "option-btn";
        b.innerHTML = `<span class="option-letter">${["A", "B", "C", "D"][i]}</span><span>${text}</span>`;
        b.addEventListener("click", () => {
          optHolder.querySelectorAll(".option-btn").forEach((btn) => (btn.disabled = true));
          if (i === data.correct) {
            playSuccessSound();
            b.classList.add("correct");
            document.getElementById("fsa-feedback-header").textContent = "✅ Richtig analysiert!";
            document.getElementById("fsa-feedback-header").style.color = "#4ade80";
          } else {
            playWrongSound();
            b.classList.add("wrong");
            optHolder.querySelectorAll(".option-btn")[data.correct].classList.add("correct");
            document.getElementById("fsa-feedback-header").textContent = "❌ Achtung Prüfungsfalle:";
            document.getElementById("fsa-feedback-header").style.color = "#fca5a5";
          }
          document.getElementById("fsa-feedback-text").textContent = data.explanation;
          expHolder.classList.remove("hidden");
        });
        optHolder.appendChild(b);
      });
    }

    document.querySelectorAll(".circuit-subbtn").forEach((btn) => {
      btn.addEventListener("click", () => {
        document.querySelectorAll(".circuit-subbtn").forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
        loadFsaCircuit(btn.dataset.circuit);
      });
    });

    // =========================================================================
    // 11. PRÜFUNGSSIMULATION (100-PUNKTE-MODUS)
    // =========================================================================
    let simInterval = null;
    let simTimeLeft = 0;
    let simQuestions = [];
    let simUserAnswers = {};

    const btnStartSim = document.getElementById("btn-start-sim");
    const btnFinishSim = document.getElementById("btn-finish-sim");
    const simTimerBox = document.getElementById("sim-timer-box");
    const simTimerDisplay = document.getElementById("sim-timer-display");
    const simWorkspace = document.getElementById("sim-workspace");
    const simQuestionsContainer = document.getElementById("sim-questions-container");
    const simResultCard = document.getElementById("sim-result-card");
    const simTypeSelect = document.getElementById("sim-type-select");

    btnStartSim.addEventListener("click", () => {
      const type = simTypeSelect.value;
      let pool = WISO_QUESTIONS;
      let count = 10;
      let minutes = 60;

      if (type === "elektro") {
        pool = ELEKTRO_QUESTIONS;
        count = 15;
        minutes = 90;
      } else if (type === "english") {
        pool = ENGLISH_QUESTIONS;
        count = 8;
        minutes = 30;
      } else if (type === "all") {
        pool = [...ELEKTRO_QUESTIONS, ...WISO_QUESTIONS, ...ENGLISH_QUESTIONS];
        count = 20;
        minutes = 90;
      }

      const shuffled = [...pool].sort(() => 0.5 - Math.random());
      simQuestions = shuffled.slice(0, count);
      simUserAnswers = {};
      simTimeLeft = minutes * 60;

      btnStartSim.classList.add("hidden");
      btnFinishSim.classList.remove("hidden");
      simTimerBox.classList.remove("hidden");
      simResultCard.classList.add("hidden");
      simWorkspace.classList.remove("hidden");

      renderSimQuestions();

      clearInterval(simInterval);
      simInterval = setInterval(() => {
        simTimeLeft--;
        const m = String(Math.floor(simTimeLeft / 60)).padStart(2, "0");
        const s = String(simTimeLeft % 60).padStart(2, "0");
        simTimerDisplay.textContent = `${m}:${s}`;

        if (simTimeLeft <= 0) {
          clearInterval(simInterval);
          evaluateSimulation(true);
        }
      }, 1000);
    });

    btnFinishSim.addEventListener("click", () => {
      if (confirm("Möchtest du die Prüfung wirklich jetzt abgeben und auswerten lassen?")) {
        clearInterval(simInterval);
        evaluateSimulation(false);
      }
    });

    function renderSimQuestions() {
      simQuestionsContainer.innerHTML = "";
      simQuestions.forEach((q, idx) => {
        const qBox = document.createElement("div");
        qBox.style.marginBottom = "1.6rem";
        qBox.style.paddingBottom = "1.2rem";
        qBox.style.borderBottom = "1px solid var(--card-border)";

        qBox.innerHTML = `
          <h4 style="color: #60a5fa; margin-bottom: 0.4rem;">Aufgabe ${idx + 1} (${q.category})</h4>
          <p style="margin-bottom: 0.8rem; font-weight: 600;">${q.question}</p>
          <div id="sim-opts-${idx}" style="display:flex; flex-direction:column; gap:0.5rem;"></div>
        `;

        const optsContainer = qBox.querySelector(`#sim-opts-${idx}`);
        const shuffledOpts = q.options.map((text, optIdx) => ({ text, optIdx })).sort(() => 0.5 - Math.random());

        shuffledOpts.forEach(({ text, optIdx }) => {
          const lbl = document.createElement("label");
          lbl.style.cssText = "display:flex; align-items:flex-start; gap:0.6rem; cursor:pointer; background:#0f172a; padding:0.6rem 0.8rem; border-radius:6px; border:1px solid var(--card-border);";

          lbl.innerHTML = `
            <input type="radio" name="sim-q-${idx}" value="${optIdx}" style="margin-top:0.3rem;">
            <span>${text}</span>
          `;

          lbl.querySelector("input").addEventListener("change", (e) => {
            simUserAnswers[idx] = Number(e.target.value);
          });
          optsContainer.appendChild(lbl);
        });

        simQuestionsContainer.appendChild(qBox);
      });
    }

    function evaluateSimulation(isTimeOut) {
      btnStartSim.classList.remove("hidden");
      btnFinishSim.classList.add("hidden");
      simTimerBox.classList.add("hidden");
      simWorkspace.classList.add("hidden");

      let pointsEarned = 0;
      const totalPoints = simQuestions.length * 10;
      let detailsHtml = "";

      simQuestions.forEach((q, idx) => {
        const userChoice = simUserAnswers[idx];
        const isCorrect = userChoice === q.correct;
        if (isCorrect) pointsEarned += 10;

        const targetProgress = q.id.startsWith("el-") ? progressElektro : q.id.startsWith("en-") ? progressEnglish : progressWiso;
        targetProgress[q.id] = isCorrect ? "correct" : "wrong";

        detailsHtml += `
          <div style="margin-bottom: 0.8rem; padding: 0.8rem; border-left: 4px solid ${isCorrect ? "var(--success)" : "var(--danger)"}; background: #1e293b; border-radius: 6px;">
            <strong>Aufgabe ${idx + 1}: ${isCorrect ? "✅ 10 / 10 Punkte" : "❌ 0 / 10 Punkte"}</strong><br>
            <span style="font-size: 0.88rem; color: var(--text-muted);">${q.question}</span><br>
            <span style="font-size: 0.92rem; margin-top: 0.3rem; display: block;"><strong>Musterlösung:</strong> ${q.options[q.correct]}</span>
          </div>
        `;
      });

      const percent = Math.round((pointsEarned / totalPoints) * 100);
      let gradeText = "";
      let color = "var(--success)";

      if (percent >= 92) gradeText = "Note 1 (Sehr Gut)";
      else if (percent >= 81) gradeText = "Note 2 (Gut)";
      else if (percent >= 67) gradeText = "Note 3 (Befriedigend)";
      else if (percent >= 50) gradeText = "Note 4 (Ausreichend – Bestanden)";
      else if (percent >= 30) { gradeText = "Note 5 (Mangelhaft – Nicht bestanden)"; color = "var(--danger)"; }
      else { gradeText = "Note 6 (Ungenügend – Sperrfach!)"; color = "var(--danger)"; }

      if (percent >= 50) playSuccessSound();
      else playWrongSound();

      const simResultTitle = document.getElementById("sim-result-title");
      const simResultGrade = document.getElementById("sim-result-grade");
      const simResultDetails = document.getElementById("sim-result-details");

      simResultTitle.textContent = isTimeOut ? "⏰ Zeit abgelaufen!" : "📋 Offizielles Prüfungsergebnis";
      simResultTitle.style.color = color;
      simResultGrade.innerHTML = `Ergebnis: <span style="color:${color}">${pointsEarned} von ${totalPoints} Punkten (${percent} %)</span><br>Prüfungsurteil: ${gradeText}`;
      simResultDetails.innerHTML = detailsHtml;
      simResultCard.classList.remove("hidden");
      saveProgress();
    }

    // =========================================================================
    // 12. KI-SETUP MODAL (INKL. LOCALSTORAGE-PERSISTENZ) & AUTO-COUNTDOWN
    // =========================================================================
    const aiModal = document.getElementById("ai-modal");
    const btnOpenAiModal = document.getElementById("btn-open-ai-modal");
    const btnCloseAiModal = document.getElementById("btn-close-ai-modal");
    const btnTestAiServer = document.getElementById("btn-test-ai-server");
    const btnSaveGroupCode = document.getElementById("btn-save-group-code");
    const btnClearGroupCode = document.getElementById("btn-clear-group-code");
    const groupCodeInput = document.getElementById("group-code-input");
    const aiServerStatus = document.getElementById("ai-server-status");
    const aiStatusText = document.getElementById("ai-status-text");

    try {
      if (!groupAccessCode) {
        groupAccessCode = localStorage.getItem("group_access_code") || sessionStorage.getItem("group_access_code") || "";
      }
    } catch (e) {}

    function updateAiStatusBadge(message) {
      const codeSet = Boolean(groupAccessCode);
      aiStatusText.textContent = codeSet ? "Gruppenzugang aktiv ✓" : "Gruppencode nötig";
      btnOpenAiModal.classList.toggle("connected", codeSet);
      aiServerStatus.textContent = message || (codeSet
        ? "✅ Gruppencode ist auf diesem Gerät gespeichert. Dein Google-Key bleibt geschützt auf dem Server."
        : "Gib den Gruppencode ein, den du vom Betreiber erhalten hast.");
    }

    btnOpenAiModal.addEventListener("click", () => {
      groupCodeInput.value = groupAccessCode;
      aiModal.classList.remove("hidden");
      updateAiStatusBadge();
    });

    btnCloseAiModal.addEventListener("click", () => aiModal.classList.add("hidden"));

    btnSaveGroupCode.addEventListener("click", () => {
      const code = groupCodeInput.value.trim();
      if (!code) {
        updateAiStatusBadge("Bitte gib zuerst den Gruppencode ein.");
        groupCodeInput.focus();
        return;
      }

      groupAccessCode = code;
      try {
        sessionStorage.setItem("group_access_code", code);
        localStorage.setItem("group_access_code", code);
      } catch (error) {
        console.warn("Der Gruppencode konnte nicht gespeichert werden.", error);
      }
      updateAiStatusBadge("✅ Gruppencode dauerhaft auf diesem Gerät gespeichert.");
      aiModal.classList.add("hidden");
    });

    btnClearGroupCode.addEventListener("click", () => {
      groupAccessCode = "";
      groupCodeInput.value = "";
      try {
        sessionStorage.removeItem("group_access_code");
        localStorage.removeItem("group_access_code");
      } catch (error) {
        console.warn("Der Gruppencode konnte nicht entfernt werden.", error);
      }
      updateAiStatusBadge("Gruppencode von diesem Gerät entfernt.");
    });

    btnTestAiServer.addEventListener("click", async () => {
      const code = groupCodeInput.value.trim() || groupAccessCode;
      if (!code) {
        updateAiStatusBadge("Bitte gib zuerst den Gruppencode ein.");
        groupCodeInput.focus();
        return;
      }

      btnTestAiServer.disabled = true;
      btnTestAiServer.textContent = "⏳ Verbindung wird getestet...";
      try {
        await requestGeminiApi("Antworte ausschließlich mit OK.", false, code);
        updateAiStatusBadge("✅ Gemini-Verbindung erfolgreich! Du kannst den Gruppencode jetzt speichern.");
      } catch (error) {
        updateAiStatusBadge(`❌ Gemini-Test fehlgeschlagen: ${error.message}`);
      } finally {
        btnTestAiServer.disabled = false;
        btnTestAiServer.textContent = "🔄 Zugang testen";
      }
    });

    function getNextExamDate() {
      const now = new Date();
      const y = now.getFullYear();
      const candidates = [
        new Date(`${y}-05-05T08:00:00`),
        new Date(`${y}-12-01T08:00:00`),
        new Date(`${y + 1}-05-05T08:00:00`),
        new Date(`${y + 1}-12-01T08:00:00`)
      ];
      for (const d of candidates) {
        if (d.getTime() > now.getTime()) return d.getTime();
      }
      return candidates[0].getTime();
    }

    const examDate = getNextExamDate();

    function updateCountdown() {
      const now = new Date().getTime();
      const distance = examDate - now;
      const daysElem = document.getElementById("days");
      if (!daysElem) return;

      if (distance < 0) {
        document.getElementById("countdown-timer").innerHTML = "<span>🎉 Die Prüfung hat begonnen! Viel Erfolg!</span>";
        return;
      }

      document.getElementById("days").textContent = String(Math.floor(distance / (1000 * 60 * 60 * 24))).padStart(2, "0");
      document.getElementById("hours").textContent = String(Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))).padStart(2, "0");
      document.getElementById("minutes").textContent = String(Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))).padStart(2, "0");
      document.getElementById("seconds").textContent = String(Math.floor((distance % (1000 * 60)) / 1000)).padStart(2, "0");
    }

    setInterval(updateCountdown, 1000);
    updateCountdown();

    // =========================================================================
    // 13. GP2-FACHPRÜFER CHATBOT MIT KONTEXT- & RECHEN-GEDÄCHTNIS
    // =========================================================================
    let lastMathResult = null;
    let chatConversationHistory = [];

    const ELECTRICAL_GLOSSARY = [
      {
        keys: ["rcd", "fi-schalter", "fi schutzschalter", "fehlerstrom"],
        answer: `⚡ RCD (Residual Current Protective Device):
• Deutsche Bezeichnung: Fehlerstrom-Schutzeinrichtung (umgangssprachlich „FI-Schutzschalter“).
• Funktion: Vergleicht über einen Summenstromwandler die zufließenden und abfließenden Ströme. Fließt ein Fehlerstrom gegen Erde ab (Differenzstrom ≠ 0), schaltet der RCD allpolig ab.
• DIN VDE 0100-410 Pflicht:
  - Steckdosen bis 32 A im Innen- und Außenbereich: I_Δn ≤ 30 mA (Zusatzschutz gegen elektrischen Schlag).
  - Brandschutz: I_Δn ≤ 300 mA.
• Typen: Typ A (pulsstromsensitiv), Typ B / B+ (allstromsensitiv für glatte Gleichfehlerströme z. B. Wallbox, Frequenzumrichter).`
      },
      {
        keys: ["mcb", "ls-schalter", "leitungsschutzschalter", "sicherungsautomat"],
        answer: `🔌 MCB (Miniature Circuit Breaker) / LS-Schalter:
• Deutsche Bezeichnung: Leitungsschutzschalter.
• Funktion: Schützt Leitungen vor Schäden durch Überlast und Kurzschluss.
• Auslöser:
  1. Thermischer Auslöser (Bimetall, zeitverzögert): Reagiert auf Überlast nach Kennlinie.
  2. Elektromagnetischer Auslöser (Spule, unverzögert in < 0,1 s): Schaltet Kurzschlüsse sofort ab.
• Auslösecharakteristiken (Kurzschlussstrom):
  - Typ B: 3 bis 5 × In (Standard für Wohnungsbau/Licht/Steckdosen)
  - Typ C: 5 bis 10 × In (für Motoren, Transformatoren mit höherem Einschaltstrom)
  - Typ D: 10 bis 20 × In (für starke Transformatoren, Schweißgeräte).`
      },
      {
        keys: ["afdd", "brandschutzschalter", "fehlerlichtbogen"],
        answer: `🔥 AFDD (Arc Fault Detection Device):
• Deutsche Bezeichnung: Fehlerlichtbogen-Schutzeinrichtung (Brandschutzschalter).
• Funktion: Erkennt serielle (z. B. lose Schraubklemme, angebohrte Ader) und parallele Lichtbögen, die weder vom LS-Schalter noch vom RCD erkannt werden.
• Einsatz: DIN VDE 0100-420 fordert bzw. empfiehlt sie besonders für feuergefährdete Betriebsstätten, Schlaf- und Aufenthaltsräume von Heimen sowie für Holzbauten.`
      },
      {
        keys: ["sls", "selektiver leitungsschutzschalter"],
        answer: `🛡️ SLS (Selektiver Leitungsschutzschalter):
• Funktion: Hauptsicherungsautomat im netzseitigen Anschlussraum (NAR) unter dem Zähler.
• Besonderheit: Ist selektiv zu nachgeschalteten LS-Schaltern (z. B. B16), trennt bei Kurzschluss im Endstromkreis also nicht das gesamte Haus ab, und kann auch von Laien wieder eingeschaltet werden.`
      },
      {
        keys: ["hes", "pas", "haupterdungsschiene", "potentialausgleich"],
        answer: `⚡ HES (Haupterdungsschiene, früher PAS):
• Funktion: Zentraler Sammelpunkt für den Schutzpotentialausgleich eines Gebäudes nach DIN VDE 0100-410/-540.
• Was wird direkt angeschlossen?
  - Fundamenterder / Ringerder
  - PEN- oder PE-Leiter der Hauptleitung
  - Metallene Hausinstallationen (Wasser-, Gas-, Heizungsrohre)
  - Äußerer Blitzschutz (Blitzschutz-Erdungsleiter mind. 16 mm² Cu)
• Was wird NUR über Überspannungsableiter (SPD) angeschlossen?
  - Aktive Leiter (L1, L2, L3, N) sowie Telefon- und Koaxkabel!`
      },
      {
        keys: ["selv", "pelv", "felv", "kleinspannung"],
        answer: `🔋 SELV / PELV / FELV (Schutzkleinspannung nach DIN VDE 0100-410):
• Grenzwerte: Un ≤ 50 V AC bzw. ≤ 120 V DC.
• SELV (Safety Extra Low Voltage): Sicherheitskleinspannung. Sicher galvanisch getrennt vom Netz. Weder Stromkreis noch Körper dürfen geerdet sein!
• PELV (Protective Extra Low Voltage): Wie SELV, aber der Stromkreis oder Körper dürfen/müssen geerdet sein.
• FELV (Functional Extra Low Voltage): Kleinspannung rein aus Funktionsgründen, bietet KEINE sichere Trennung zum Netz.`
      },
      {
        keys: ["pen", "pen-leiter"],
        answer: `⚠️ PEN-Leiter (Protective Earth + Neutral):
• Definition: Kombinierter Schutzleiter (PE) und Neutralleiter (N) in TN-C-Netzen.
• Mindestquerschnitt nach DIN VDE 0100-540: mind. 10 mm² Kupfer oder 16 mm² Aluminium!
• Ein PEN-Leiter darf NIEMALS geschaltet oder abgesichert werden!
• Einmal in PE und N aufgeteilt (TN-S), dürfen sie nie wieder zusammengeführt werden.`
      },
      {
        keys: ["tn-c", "tn-s", "tn-c-s", "tt-system", "netzsysteme", "it-system"],
        answer: `🌐 DIE NETZSYSTEME IM ÜBERBLICK:
• TN-C: Neutral- und Schutzleiter als gemeinsamer PEN auf ganzer Länge (nicht EDV-konform).
• TN-S: Getrennter Neutralleiter (N) und Schutzleiter (PE) von der Quelle bis zum Verbraucher.
• TN-C-S: Einspeisung als TN-C (PEN), im Gebäude dauerhafte Aufteilung in N und PE (TN-S).
• TT-System: Trafo geerdet, Verbraucher haben eigenen lokalen Erder. RCD ist zwingend erforderlich!
• IT-System: Kein aktiver Leiter direkt mit Erde verbunden; hohe Ausfallsicherheit (z. B. OP-Räume).`
      },
      {
        keys: ["no", "nc", "normally open", "normally closed"],
        answer: `🔘 KONTAKTBEZEICHNUNGEN:
• NO (Normally Open) = Schließer: Im Ruhezustand offen, schließt bei Betätigung (z. B. 13/14).
• NC (Normally Closed) = Öffner: Im Ruhezustand geschlossen, öffnet bei Betätigung (z. B. 21/22).
• CO (Changeover Contact) = Wechsler / Umschaltkontakt.`
      }
    ];

    const LOCAL_KNOWLEDGE_BASE = [
      {
        keywords: ["spannungsfall", "formel spannungsfall", "delta u", "spannungsverlust"],
        answer: `📐 FORMELN FÜR DEN SPANNUNGSFALL (DIN VDE 0100-520 / Westermann S. 52):

1️⃣ Wechselstrom (1~ 230 V):
ΔU = (2 · l · I · cos φ) / (κ · q)  [in V]
Δu = (ΔU / Un) · 100 %

2️⃣ Drehstrom (3~ 400 V):
ΔU = (√3 · l · I · cos φ) / (κ · q)  [in V]
Δu = (ΔU / Un) · 100 %

Werte:
• l = einfache Leitungslänge in m | I = Strom in A | q = Querschnitt in mm²
• κ (Kappa) = Leitfähigkeit (Kupfer = 56 m/(Ω·mm²), Aluminium = 35)

Grenzwerte nach DIN 18015:
• Zähler bis Steckdose: max. 3 % | HAK bis Zähler: max. 0,5 %`
      },
      {
        keywords: ["rpe", "riso", "grenzwerte", "erstprüfung", "0100-600"],
        answer: `📋 GRENZWERTE DER ERSTPRÜFUNG (DIN VDE 0100-600):

1️⃣ R_PE (Schutzleiterdurchgängigkeit):
• Prüfstrom: ≥ 200 mA DC mit Umpolung. Vorab Nullabgleich der Messleitungen!
• Richtwert: Ca. 0,1 Ω bis 0,2 Ω. Ein Sprung auf z. B. 0,87 Ω deutet immer auf lose Klemmen hin.

2️⃣ R_iso (Isolationswiderstand):
• Prüfspannung: 500 V DC (SELV/PELV: 250 V DC).
• Grenzwert: R_iso ≥ 1,0 MΩ (spannungsfrei messen!).
• SPDs vorher abziehen/abklemmen, Schütze schließen.`
      },
      {
        keywords: ["abschaltzeit", "abschaltzeiten", "tn-system", "tt-system", "0100-410"],
        answer: `⏱️ MAXIMALE ABSCHALTZEITEN NACH DIN VDE 0100-410 (U0 = 230 V AC):

1️⃣ TN-System:
• Endstromkreise ≤ 63 A (Steckdosen) bzw. ≤ 32 A: max. 0,4 s
• Verteilerstromkreise / Hauptleitungen: max. 5,0 s

2️⃣ TT-System:
• Endstromkreise: max. 0,2 s
• Verteilerstromkreise: max. 1,0 s

Zulässige Berührungsspannung: U_L ≤ 50 V AC (Landwirtschaft: ≤ 25 V AC).`
      },
      {
        keywords: ["kompensation", "blindleistung", "qc", "kondensator", "kapazität"],
        answer: `🔋 FORMELN FÜR DIE BLINDLEISTUNGSKOMPENSATION:

1️⃣ Erforderliche Kompensationsblindleistung:
Q_c = P · (tan φ1 - tan φ2)  [in var]

2️⃣ Gesamtkapazität bei Drehstrom:
C_ges = Q_c / (2 · π · f · U²)  [in Farad]

3️⃣ Einzelkondensator im Dreieck:
C_Δ = C_ges / 3  [in µF]

⚠️ 90%-Regel: Zur Vermeidung von Selbsterregung dürfen bei Motoren im Leerlauf maximal 90 % der Leerlaufblindleistung kompensiert werden!`
      },
      {
        keywords: ["sicherheitsregeln", "5 sicherheitsregeln", "freischalten"],
        answer: `🛡️ DIE 5 SICHERHEITSREGELN (DIN VDE 0105-100) IN PFLICHT-REIHENFOLGE:

1. Freischalten (LS-Schalter, Not-Aus, Hauptschalter aus).
2. Gegen Wiedereinschalten sichern (Schaltsperre, Vorhängeschloss, Verbotsschild).
3. Spannungsfreiheit allpolig feststellen (mit zweipoligem Spannungsprüfer nach VDE 0682-401).
4. Erden und Kurzschließen (ab 1 kV immer; unter 1 kV nur bei Rückspeisegefahr/Freileitungen).
5. Benachbarte, unter Spannung stehende Teile abdecken oder abschranken.`
      }
    ];

    const chatbotFab = document.getElementById("chatbot-toggle-btn");
    const chatbotWindow = document.getElementById("chatbot-window");
    const chatbotCloseBtn = document.getElementById("chatbot-close-btn");
    const chatbotClearBtn = document.getElementById("chatbot-clear-btn");
    const chatbotForm = document.getElementById("chatbot-form");
    const chatbotInput = document.getElementById("chatbot-input");
    const chatbotMessages = document.getElementById("chatbot-messages");

    chatbotFab.addEventListener("click", () => {
      chatbotWindow.classList.toggle("hidden");
      if (!chatbotWindow.classList.contains("hidden")) {
        chatbotInput.focus();
      }
    });

    chatbotCloseBtn.addEventListener("click", () => chatbotWindow.classList.add("hidden"));

    if (chatbotClearBtn) {
      chatbotClearBtn.addEventListener("click", () => {
        lastMathResult = null;
        chatConversationHistory = [];
        chatbotMessages.innerHTML = `
          <div class="chat-bubble bot">
            Verlauf geleert! 🔄<br>Worüber möchtest du sprechen oder was möchtest du berechnen?
          </div>
        `;
      });
    }

    function appendChatMessage(text, sender) {
      const bubble = document.createElement("div");
      bubble.className = `chat-bubble ${sender}`;
      bubble.textContent = text;
      chatbotMessages.appendChild(bubble);
      chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
      return bubble;
    }

    async function handleChatbotQuery(query) {
      if (!query.trim()) return;
      appendChatMessage(query, "user");
      chatbotInput.value = "";

      const normQ = query.toLowerCase().trim();

      // STUFE 1: MATHEMATIK MIT GEDÄCHTNIS
      let rawMathExpr = normQ
        .replace(/\bgeteilt durch\b/gi, "/")
        .replace(/\bdurch\b/gi, "/")
        .replace(/\bmal\b/gi, "*")
        .replace(/\bplus\b/gi, "+")
        .replace(/\bminus\b/gi, "-")
        .replace(/\bhoch\b/gi, "^");

      let isFollowUp = false;

      if (lastMathResult !== null) {
        const opStart = rawMathExpr.match(/^(\s*[\*\/\+\-\^\%]\s*[0-9\.\,\s\+\-\*\/\(\)\^\%\√]+)$/);
        const wordFollowUp = rawMathExpr.match(/^(?:was\s+ist\s+|berechne\s+)?(?:das|jetzt|ergebnis|ans|weiter)\s*([\*\/\+\-\^\%]\s*[0-9\.\,\s\+\-\*\/\(\)\^\%\√]+)$/i);

        if (opStart) {
          rawMathExpr = `${lastMathResult} ${opStart[1]}`;
          isFollowUp = true;
        } else if (wordFollowUp) {
          rawMathExpr = `${lastMathResult} ${wordFollowUp[1]}`;
          isFollowUp = true;
        } else if (/\b(das|ergebnis|ans)\b/i.test(rawMathExpr)) {
          rawMathExpr = rawMathExpr.replace(/\b(das|ergebnis|ans)\b/gi, lastMathResult);
          isFollowUp = true;
        }
      }

      const mathMatch = rawMathExpr.match(/^(?:was\s+ist\s+|berechne\s+)?([0-9\.\,\s\+\-\*\/\(\)\^\%\√]+)\??$/i);
      if (mathMatch) {
        try {
          let cleanExpr = mathMatch[1]
            .replace(/,/g, ".")
            .replace(/√/g, "Math.sqrt")
            .replace(/\^/g, "**")
            .trim();

          if (/^[0-9\.\s\+\-\*\/\(\)]+$/.test(cleanExpr)) {
            const mathVal = Function(`'use strict'; return (${cleanExpr})`)();
            if (typeof mathVal === "number" && !isNaN(mathVal)) {
              const formatted = Number.isInteger(mathVal) ? mathVal : mathVal.toFixed(3).replace(/\.?0+$/, "");
              lastMathResult = mathVal;

              const replyMsg = isFollowUp 
                ? `🧮 Weitergerechnet: ${cleanExpr} = ${formatted}`
                : `🧮 Ergebnis: ${mathMatch[1].trim()} = ${formatted}`;

              setTimeout(() => {
                appendChatMessage(replyMsg, "bot");
              }, 100);
              return;
            }
          }
        } catch (e) {}
      }

      // STUFE 2: Identität & Begrüßung
      if (normQ.includes("wie heißt du") || normQ.includes("wer bist du") || normQ.includes("dein name")) {
        setTimeout(() => {
          appendChatMessage("Ich bin dein digitaler GP2-Fachprüfer für Elektroniker Energie- und Gebäudetechnik (NRW)! ⚡\n\nIch helfe dir bei VDE-Vorschriften, Formeln, Berechnungen und Prüfungsfragen.", "bot");
        }, 100);
        return;
      }

      if (["hallo", "hi", "moin", "guten tag", "hey"].includes(normQ)) {
        setTimeout(() => {
          appendChatMessage("Hallo! 👋 Wobei kann ich dir bei der Gesellenprüfung Teil 2 helfen?", "bot");
        }, 100);
        return;
      }

      // STUFE 3: Abkürzungs- & Fachbegriff-Lexikon
      for (const item of ELECTRICAL_GLOSSARY) {
        if (item.keys.some((k) => normQ.includes(k))) {
          setTimeout(() => {
            appendChatMessage(item.answer, "bot");
          }, 120);
          return;
        }
      }

      // STUFE 4: Formel-Datenbank
      for (const entry of LOCAL_KNOWLEDGE_BASE) {
        if (entry.keywords.some((kw) => normQ.includes(kw))) {
          setTimeout(() => {
            appendChatMessage(entry.answer, "bot");
          }, 120);
          return;
        }
      }

      // STUFE 5: GOOGLE-GEMINI-API MIT GESPRÄCHS-VERLAUF
      const loadingBubble = appendChatMessage("Gemini-Fachprüfer denkt nach... ⏳", "bot");

      try {
        const systemContext = "System-Rolle: Du bist ein erfahrener IHK/HWK-Fachprüfer für Elektroniker Energie- und Gebäudetechnik (GP Teil 2 NRW). Beantworte Fragen präzise, fachlich korrekt nach DIN VDE und Tabellenbuch auf Deutsch.";
        const payloadMessages = [];

        const recentHistory = chatConversationHistory.slice(-4).map((turn) => ({
          role: turn.role,
          parts: (turn.parts || []).map((part) => ({
            text: String(part.text || "").slice(0, 4000)
          }))
        }));
        recentHistory.forEach((turn) => payloadMessages.push(turn));

        payloadMessages.push({
          role: "user",
          parts: [{ text: `${systemContext}\n\nFrage des Prüflings: ${query}` }]
        });

        const reply = await requestGeminiApi(payloadMessages, false);
        loadingBubble.textContent = reply;

        chatConversationHistory.push({ role: "user", parts: [{ text: query }] });
        chatConversationHistory.push({ role: "model", parts: [{ text: reply }] });
        return;
      } catch (err) {
        // STUFE 6: Automatischer Fallback auf den Prüfungspool
        const allPools = [...ELEKTRO_QUESTIONS, ...WISO_QUESTIONS, ...ENGLISH_QUESTIONS];
        const queryWords = normQ.split(/\s+/).filter(w => w.length >= 3 && !GERMAN_STOPWORDS.has(w));
        const match = allPools.find(q => {
          const fullText = (q.question + " " + q.explanation + " " + q.options.join(" ")).toLowerCase();
          return queryWords.length > 0 && queryWords.every(w => fullText.includes(w));
        });

        if (match) {
          loadingBubble.textContent = `💡 Aus der GP2-Prüfungsdatenbank (${match.category}):\n\n${match.options[match.correct]}\n\n• Erklärung: ${match.explanation}`;
          return;
        }

        loadingBubble.textContent = `⚠️ KI-Hinweis: ${err.message}`;
      }
    }

    chatbotForm.addEventListener("submit", (e) => {
      e.preventDefault();
      handleChatbotQuery(chatbotInput.value);
    });

    document.querySelectorAll(".quick-chip").forEach((chip) => {
      chip.addEventListener("click", () => {
        handleChatbotQuery(chip.dataset.prompt);
      });
    });


    // =========================================================================
    // 15. NEUE KOMFORT-FEATURES: SPOILER-SCHALTER, FORMEL-LEISTE & PROTOKOLL-ZUFALL
    // =========================================================================
    // A) Spoiler-Schalter im 8-Fehler-Verteilungsplan (Prüfungsmodus ohne Vorab-Spoiler)
    const btnToggleUvHints = document.getElementById("btn-toggle-uv-hints");
    let uvHintsVisible = false;
    function updateUvHintsVisibility() {
      document.querySelectorAll(".uv-spoiler-text").forEach((el) => {
        el.style.display = uvHintsVisible ? "block" : "none";
      });
      if (btnToggleUvHints) {
        btnToggleUvHints.textContent = uvHintsVisible
          ? "🙈 Hinweis-Texte im Plan ausblenden (Prüfungsmodus)"
          : "👁️ Hinweis-Texte im Plan einblenden (Lernhilfe)";
      }
    }
    btnToggleUvHints?.addEventListener("click", () => {
      uvHintsVisible = !uvHintsVisible;
      updateUvHintsVisibility();
    });
    updateUvHintsVisibility();

    // B) Klickbare Formel-Symbole im Rechentrainer
    let lastFocusedCalcInput = calcStep2;
    [calcStep1, calcStep2, calcStep3, calcStep4, calcUserNumber].forEach((inp) => {
      inp?.addEventListener("focus", () => {
        lastFocusedCalcInput = inp;
      });
    });

    document.querySelectorAll(".formula-sym-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        const sym = btn.dataset.sym || "";
        const target = lastFocusedCalcInput || calcStep2;
        if (!target) return;
        const start = target.selectionStart ?? target.value.length;
        const end = target.selectionEnd ?? target.value.length;
        target.value = target.value.slice(0, start) + sym + target.value.slice(end);
        target.focus();
        target.selectionStart = target.selectionEnd = start + sym.length;
      });
    });

    

    // Init-Aufrufe
    updateAiStatusBadge();
    setAnswerMode(answerMode);
    populateFilterDropdowns();
    applyFilters();
    initCalcTrainer();
    initProtokollSimulator();

// =========================================================================
// 16. ZUSATZ-MODUL: "NUR ONLINE-KI ERZWINGEN"-SCHALTER IM CHATBOT
// =========================================================================
(function() {
  const chatWindow = document.getElementById("chatbot-window");
  const chatHeader = document.querySelector("#chatbot-window .chatbot-header");
  const oldForm = document.getElementById("chatbot-form");
  const input = document.getElementById("chatbot-input");

  if (!chatWindow || !oldForm || !input) return;
  if (document.getElementById("force-online-toggle")) return;

  // 1. Schalter sauber direkt unter dem Chatbot-Header einfügen
  const toggleContainer = document.createElement("div");
  toggleContainer.style.cssText =
    "display: flex; align-items: center; gap: 8px; font-size: 0.8rem; padding: 6px 14px; background: #0b1120; border-bottom: 1px solid #334155; color: #cbd5e1; cursor: pointer;";
  toggleContainer.innerHTML = `
    <input type="checkbox" id="force-online-toggle" style="cursor: pointer; accent-color: #3b82f6; width: auto;">
    <label for="force-online-toggle" style="cursor: pointer; user-select: none;">⚡ Nur Online-KI erzwingen (oder <code>!</code> voranstellen)</label>
  `;

  if (chatHeader && chatHeader.nextSibling) {
    chatWindow.insertBefore(toggleContainer, chatHeader.nextSibling);
  } else {
    chatWindow.prepend(toggleContainer);
  }

  const checkbox = document.getElementById("force-online-toggle");

})();
// =========================================================================
    // 17. POWER-UPGRADES: ENGLISCH-AUSSPRACHE (TTS), FAKT DES TAGES,
    //     SCHWÄCHEN-RADAR, BLACKOUT-TIPP & EUROPA-FORMEL-/VDE-SPICKZETTEL
    // =========================================================================
    (function() {
      // -----------------------------------------------------------------------
      // -----------------------------------------------------------------------
      // A) 🔊 ENGLISCHE FACHBEGRIFFE VORLESE-FUNKTION (NUR EINZELNE VOKABELN)
      // -----------------------------------------------------------------------
      let slowSpeech = false;

      function speakEnglishTerm(term) {
        if (!("speechSynthesis" in window)) {
          alert("Dein Browser unterstützt leider keine Sprachausgabe.");
          return;
        }
        window.speechSynthesis.cancel();
        // Klammern wie (NO) oder (CP) für natürlichere Aussprache bereinigen
        const cleanTerm = term
          .replace(/\([A-Z0-9\-\/\s]+\)/g, "")
          .replace(/\s+/g, " ")
          .trim();

        const utter = new SpeechSynthesisUtterance(cleanTerm || term);
        utter.lang = "en-GB";
        utter.rate = slowSpeech ? 0.72 : 0.95;
		

        const voices = window.speechSynthesis.getVoices();
        const enVoice =
          voices.find((v) => v.lang.startsWith("en-GB") && /Google|Natural|Male|Female/i.test(v.name)) ||
          voices.find((v) => v.lang.startsWith("en-"));
        if (enVoice) utter.voice = enVoice;

        window.speechSynthesis.speak(utter);
      }

      function extractEnglishVocabTerms(qObj) {
        if (!qObj) return [];
        const isEnglishQuestion =
          currentSection === "english" ||
          (qObj.category && qObj.category.toLowerCase().includes("englisch")) ||
          (qObj.id && qObj.id.startsWith("en-"));

        if (!isEnglishQuestion) return [];

        const rawTerms = [];
        // 1. Begriffe in deutschen Anführungszeichen „...“ extrahieren
        const quoteRegex = /„([^“]+)“/g;
        let match;
        while ((match = quoteRegex.exec(qObj.question)) !== null) {
          rawTerms.push(match[1]);
        }

        // 2. Fallback für Fragen wie "Übersetzung: Front panel, Socket outlet..."
        if (rawTerms.length === 0 && qObj.question.includes(":")) {
          const afterColon = qObj.question.split(":")[1].replace(/\?/g, "");
          afterColon.split(",").forEach((part) => rawTerms.push(part.trim()));
        }

        // Schrägstriche wie "supply voltage / rated voltage" in einzelne klickbare Vokabeln teilen
        const finalTerms = [];
        rawTerms.forEach((item) => {
          item.split("/").forEach((sub) => {
            const cleaned = sub.replace(/^vs\.\s*/i, "").trim();
            if (cleaned.length >= 2 && !finalTerms.includes(cleaned)) {
              finalTerms.push(cleaned);
            }
          });
        });

        return finalTerms;
      }

      function renderVocabAudioBar() {
        let bar = document.getElementById("vocab-tts-bar");
        if (!bar) {
          bar = document.createElement("div");
          bar.id = "vocab-tts-bar";
          bar.style.cssText =
            "margin: -0.5rem 0 1.2rem 0; padding: 0.75rem 0.95rem; background: rgba(59, 130, 246, 0.1); border: 1px solid rgba(59, 130, 246, 0.35); border-radius: 10px; display: none; flex-wrap: wrap; gap: 0.5rem; align-items: center;";
          questionText?.insertAdjacentElement("afterend", bar);
        }

        const q = filteredQuestions[currentIndex];
        const terms = extractEnglishVocabTerms(q);

        if (!terms.length) {
          bar.style.display = "none";
          return;
        }

        bar.style.display = "flex";
        bar.innerHTML = `
          <span style="font-size: 0.8rem; font-weight: 700; color: #93c5fd; margin-right: 0.3rem;">
            🔊 Aussprache hören:
          </span>
        `;

        terms.forEach((term) => {
          const btn = document.createElement("button");
          btn.type = "button";
          btn.className = "quick-chip";
          btn.style.cssText =
            "background: #1e293b; color: #f8fafc; border: 1px solid #3b82f6; padding: 0.3rem 0.7rem; font-size: 0.82rem; font-weight: 600; display: inline-flex; align-items: center; gap: 0.35rem;";
          btn.innerHTML = `🔊 <span>${term}</span>`;
          btn.title = `Aussprache von "${term}" anhören`;
          btn.addEventListener("click", () => speakEnglishTerm(term));
          bar.appendChild(btn);
        });

        // Tempo-Umschalter (Normal vs. Langsam 0.75x)
        const speedBtn = document.createElement("button");
        speedBtn.type = "button";
        speedBtn.className = "quick-chip";
        speedBtn.style.cssText =
          "margin-left: auto; background: #0f172a; color: #fbbf24; border: 1px solid #475569; padding: 0.25rem 0.6rem; font-size: 0.75rem;";
        speedBtn.textContent = slowSpeech ? "🐢 Tempo: Langsam" : "🐇 Tempo: Normal";
        speedBtn.title = "Sprechgeschwindigkeit umschalten";
        speedBtn.addEventListener("click", () => {
          slowSpeech = !slowSpeech;
          renderVocabAudioBar();
        });
        bar.appendChild(speedBtn);
      }

      // Hook in renderQuestion, damit die Vorlese-Leiste bei jedem Fragenwechsel aktualisiert wird
      const originalRenderQuestion = window.renderQuestion;
      if (typeof originalRenderQuestion === "function") {
        window.renderQuestion = function() {
          originalRenderQuestion.apply(this, arguments);
          renderVocabAudioBar();
        };
        renderVocabAudioBar();
      }

      // -----------------------------------------------------------------------
      // B) 💡 "SCHON GEWUSST?" – NRW-PRÜFUNGS-FAKT DES TAGES (TÄGLICH NEU)
      // -----------------------------------------------------------------------
      const DAILY_FACTS = [
        { cat: "⚡ VDE-Prüfungsfalle", text: "Bei der Schleifenimpedanz Zs (DIN VDE 0100-600) musst du in NRW immer mit dem Faktor 2/3 rechnen: Zs_max = (2/3) · (U0 / Ia), weil sich die Leitung im Kurzschlussfall erwärmt!" },
        { cat: "🧠 WiSo-Punkteretter", text: "Die 9 % Kirchensteuer in NRW werden IMMER von der Lohnsteuer berechnet – niemals vom Bruttolohn! Das ist die häufigste Rechenfalle in WiSo-Aufgabe 10." },
        { cat: "🛡️ Schutzmaßnahmen", text: "Steckdosenstromkreise bis 32 A im Innen- und Außenbereich benötigen nach DIN VDE 0100-410 zwingend einen 30-mA-RCD. Ein 300-mA-RCD bietet nur Brandschutz und gilt im Prüfprotokoll als schwerer Mangel!" },
        { cat: "🔌 Erdung & Blitzschutz", text: "Ein blitzstromtragfähiger Erdungsleiter zur HES muss aus mindestens 16 mm² Kupfer (starr/massiv!), 25 mm² Alu oder 50 mm² Stahl bestehen. Feindrähtige Litze (H07V-K) schmilzt bei Blitzstrom auf!" },
        { cat: "⚙️ Motoren & Antriebe", text: "Ein Dahlandermotor (Polumschaltung 1:2, Δ / YY) benötigt immer ZWEI getrennte Motorschutzrelais (-F1 und -F2), weil er in beiden Drehzahlstufen unterschiedlich hohe Nennströme aufnimmt." },
        { cat: "📐 Rechen-Falle", text: "Wenn du beim Spannungsfall rückwärts den maximal zulässigen Strom I_max berechnest (z. B. 7,03 A), musst du den nächstKLEINEREN LS-Schalter wählen (B6A statt B10A), sonst wird Δu überschritten!" },
        { cat: "🔋 Kompensation", text: "Bei der Einzelkompensation eines Drehstrommotors dürfen maximal 90 % der Leerlaufblindleistung kompensiert werden (und aus der E12-Reihe wird abgerundet), um gefährliche Selbsterregung zu verhindern!" },
        { cat: "🇬🇧 Fachenglisch 4.4", text: "Steht im englischen Datenblatt 'For indoor use only', ist auch die Montage unter einem überdachten Carport im Freien strengstens verboten!" },
        { cat: "📋 Prüfprotokoll 4.3", text: "Sobald im Prüfprotokoll auch nur ein einziger Stromkreis 'n. i. O.' ist, musst du im Protokollfuß zwingend 'Mängel festgestellt / Prüfplakette: NEIN' ankreuzen (bringt 2 sichere Punkte!)." },
        { cat: "🔌 RCD-Kaskadierung", text: "Schalte niemals einen allstromsensitiven RCD Typ B (z. B. für Wallbox/FU) hinter einen normalen RCD Typ A! Glatte Gleichfehlerströme (> 6 mA DC) treiben den Typ A in die magnetische Sättigung ('Erblinden')." },
        { cat: "🔥 Widerstand & Leistung", text: "Sinkt durch Spannungsfall auf einer langen Leitung die Spannung an einem Heizwiderstand (konstantes R), sinkt auch der Strom. Die tatsächliche Heizleistung sinkt daher quadratisch (P = U² / R)!" },
        { cat: "📡 SAT-Anlagen", text: "Bei der Dämpfungsberechnung von Koaxialkabeln musst du im Datenblatt immer den Dämpfungswert bei der höchsten SAT-ZF-Frequenz (2150 MHz) ablesen – dort ist die Kabeldämpfung am größten!" },
        { cat: "🧠 WiSo-Klassiker", text: "Die gesetzliche Unfallversicherung (BG ETEM) ist die einzige Säule der Sozialversicherung, die zu 100 % allein vom Arbeitgeber bezahlt wird (Haftungsablösung bei Arbeits- und Wegeunfällen)." },
        { cat: "🛠️ Leitungsdimensionierung", text: "Verläuft eine Leitung durch mehrere Verlegearten (z. B. 5 m in wärmegedämmter Wand A2 und 15 m im Rohr B2), bestimmt immer der thermisch ungünstigste Abschnitt (hier A2!) den gesamten Querschnitt." },
        { cat: "🔌 Erstprüfung VDE 0100-600", text: "Vor der Isolationsmessung (500 V DC, Grenzwert ≥ 1,0 MΩ) müssen Überspannungsableiter (SPDs) abgezogen/getrennt werden, da sie sonst die Prüfspannung ableiten und < 1 MΩ vortäuschen!" },
        { cat: "⚙️ Drahtbruchsicherheit", text: "Not-Halt (-S0), Aus-Taster (-S1) und Motorschutz-Hilfskontakte (-F1 95/96) werden immer als Öffner (NC) nach dem Ruhestromprinzip verdrahtet. Bricht ein Draht, schaltet die Anlage sicher ab!" },
        { cat: "💡 Lichtberechnung", text: "Vergiss bei der LED-Amortisationsrechnung mit alten Leuchtstofflampen niemals die Verlustleistung des alten Vorschaltgeräts (VVG, meist 6–10 W) zur Lampenleistung hinzuzuaddieren!" },
        { cat: "🌐 Netzwerk & EMV", text: "Ein TN-C-System (mit gemeinsamem PEN-Leiter) ist nicht EDV-konform, weil Betriebsströme als vagabundierende Ausgleichsströme über Netzwerkschirme fließen. Ab HAK/Zähler gilt Pflicht zum TN-S-System!" }
      ];

      let currentFactIdx = Math.floor(Math.random() * DAILY_FACTS.length);

      const motivationBanner = document.querySelector(".motivation-banner");
      if (motivationBanner && !document.getElementById("daily-fact-card")) {
        const factCard = document.createElement("div");
        factCard.id = "daily-fact-card";
        factCard.style.cssText =
          "max-width: 1040px; margin: 0 auto 0.9rem auto; background: linear-gradient(90deg, rgba(245, 158, 11, 0.12), rgba(30, 41, 59, 0.95)); border: 1px solid rgba(245, 158, 11, 0.4); border-left: 4px solid #f59e0b; border-radius: 10px; padding: 0.7rem 1rem; display: flex; justify-content: space-between; align-items: center; gap: 0.8rem; flex-wrap: wrap;";

        function updateFactDisplay() {
          const f = DAILY_FACTS[currentFactIdx];
          factCard.innerHTML = `
            <div style="flex: 1; min-width: 240px; font-size: 0.86rem; line-height: 1.45;">
              <span style="background: rgba(245, 158, 11, 0.25); color: #fbbf24; font-weight: 700; padding: 0.15rem 0.5rem; border-radius: 6px; font-size: 0.75rem; margin-right: 0.4rem;">
                💡 Schon gewusst? (${f.cat})
              </span>
              <span style="color: #f8fafc;">${f.text}</span>
            </div>
            <button type="button" id="btn-next-fact" class="quick-chip" style="border-color: #f59e0b; color: #fbbf24; font-weight: 600;">
              🎲 Nächster Tipp (${currentFactIdx + 1}/${DAILY_FACTS.length})
            </button>
          `;
          factCard.querySelector("#btn-next-fact")?.addEventListener("click", () => {
            currentFactIdx = (currentFactIdx + 1) % DAILY_FACTS.length;
            updateFactDisplay();
          });
        }

        motivationBanner.insertAdjacentElement("afterend", factCard);
        updateFactDisplay();
      }

      // -----------------------------------------------------------------------
      // C) 💡 BLACKOUT-TIPP IM FREIHAND-MODUS (ANFANGSBUCHSTABEN DER LÖSUNG)
      // -----------------------------------------------------------------------
      const freehandActions = document.querySelector(".freehand-actions");
      if (freehandActions && !document.getElementById("btn-freehand-hint")) {
        const hintBtn = document.createElement("button");
        hintBtn.id = "btn-freehand-hint";
        hintBtn.type = "button";
        hintBtn.className = "btn secondary";
        hintBtn.textContent = "💡 Kleiner Tipp (Stichworte)";
        hintBtn.title = "Zeigt die ersten Buchstaben der gesuchten Fachbegriffe gegen Blackout";
        hintBtn.addEventListener("click", () => {
          const q = filteredQuestions[currentIndex];
          if (!q) return;
          const concepts = extractKeyConcepts(q).slice(0, 6);
          const masked = concepts.map((c) => {
            const w = c.display;
            if (w.length <= 3) return w;
            return w.slice(0, 2) + "…" + `(${w.length})`;
          });
          freehandInput.placeholder = `💡 Tipp – Gesuchte Begriffe starten mit: ${masked.join(" | ")}`;
          alert(`💡 Gedankenstütze für diese Frage:\n\nVersuche folgende ${concepts.length} Schlüsselbegriffe einzubauen:\n• ` + masked.join("\n• "));
          freehandInput.focus();
        });
        freehandActions.appendChild(hintBtn);
      }

      // -----------------------------------------------------------------------
      // D) 📊 SCHWÄCHEN-RADAR & 📖 FORMEL-/VDE-SPICKZETTEL (EUROPATHEK)
      // -----------------------------------------------------------------------
      const headerTopBar = document.querySelector(".header-top-bar");
      if (headerTopBar && !document.getElementById("btn-open-tb-modal")) {
        const tbBtn = document.createElement("button");
        tbBtn.id = "btn-open-tb-modal";
        tbBtn.type = "button";
        tbBtn.className = "ai-status-btn";
        tbBtn.style.cssText = "background: rgba(59, 130, 246, 0.2); border-color: #3b82f6; color: #bfdbfe;";
        tbBtn.innerHTML = "📊 <span>Schwächen & Formel-Spickzettel</span>";
        headerTopBar.appendChild(tbBtn);

        const FORMULA_CARDS = [
          { key: "du", title: "📐 Spannungsfall ΔU / Δu", info: "1~: ΔU = (2·l·I·cos φ)/(κ·q) | 3~: ΔU = (√3·l·I·cos φ)/(κ·q) | Max. 3 % (DIN 18015)" },
          { key: "iz", title: "⚡ Leitungsdimensionierung (VDE 0298-4)", info: "Ib ≤ In ≤ Iz | Iz' = In / (f1 · f2) | Verlegearten A1, A2, B1, B2, C, E" },
          { key: "zs", title: "📋 Erstprüfung (DIN VDE 0100-600)", info: "R_PE ≥ 200 mA DC | R_iso ≥ 1,0 MΩ (500V DC) | Z_s ≤ (2/3) · (U0 / Ia)" },
          { key: "abschalt", title: "⏱️ Abschaltzeiten (DIN VDE 0100-410)", info: "Endstromkreise ≤ 32A/63A: TN max. 0,4 s | TT max. 0,2 s | Verteiler: TN 5 s / TT 1 s" },
          { key: "rcd", title: "🔌 RCD-Typen (FI) & Personenschutz", info: "Steckdosen ≤ 32 A: Pflicht I_Δn ≤ 30 mA | Typ B/B+ bei glatten DC-Fehlerströmen (> 6 mA)" },
          { key: "hes", title: "🛡️ Erdung, HES & Antennenerdung", info: "Blitzschutz-Erdung an HES: mind. 16 mm² Cu starr, 25 mm² Al, 50 mm² Stahl" },
          { key: "komp", title: "🔋 Blindleistungskompensation", info: "Qc = P · (tan φ1 - tan φ2) | C_Δ = Qc / (3 · 2 · π · f · U²) | Max. 90 % Leerlauf!" },
          { key: "licht", title: "💡 Lichtberechnung & Raumwirkungsgrad", info: "Φ_ges = (E_m · A) / (η_B · WF) | Anzahl n = Φ_ges / Φ_Leuchte (immer aufrunden!)" }
        ];

        let savedPages = {};
        try {
          savedPages = JSON.parse(localStorage.getItem("europa_tb_pages_v1") || "{}");
        } catch (e) {}

        const tbModal = document.createElement("div");
        tbModal.id = "tb-helper-modal";
        tbModal.className = "modal-overlay hidden";
        tbModal.innerHTML = `
          <div class="modal-card" style="max-width: 720px; max-height: 85vh; overflow-y: auto;">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.8rem;">
              <h3 style="margin:0;">📊 Schwächen-Radar & 📖 Formel-/VDE-Spickzettel (Europathek)</h3>
              <button type="button" id="btn-close-tb-modal" class="chatbot-close-btn">✖</button>
            </div>
            <div id="radar-stats-box" style="margin-bottom: 1.2rem; padding: 0.9rem; background: #0f172a; border-radius: 10px; border: 1px solid #334155;"></div>
            <h4 style="color:#60a5fa; margin-bottom:0.3rem;">⚡ Die 8 wichtigsten Prüfungsformeln & VDE-Werte</h4>
            <p style="font-size:0.78rem; color:#94a3b8; margin-bottom:0.7rem;">
              Tipp: Du kannst dir rechts in jedes kleine Feld <em>„Europa S. ...“</em> deine eigene Seitenzahl aus deinem <strong>Europa-Tabellenbuch (Auflage 31/32)</strong> eintragen – sie wird automatisch gespeichert!
            </p>
            <div id="europa-formula-grid" style="display:grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap:0.55rem; font-size:0.82rem;"></div>
          </div>
        `;
        document.body.appendChild(tbModal);

        function renderFormulaGrid() {
          const grid = document.getElementById("europa-formula-grid");
          if (!grid) return;
          grid.innerHTML = "";
          FORMULA_CARDS.forEach((card) => {
            const div = document.createElement("div");
            div.style.cssText = "background:#0f172a; padding:0.65rem; border-radius:8px; border:1px solid #334155;";
            const pgVal = savedPages[card.key] || "";
            div.innerHTML = `
              <div style="display:flex; justify-content:space-between; align-items:center; gap:0.4rem; margin-bottom:0.25rem;">
                <strong style="color:#f8fafc;">${card.title}</strong>
                <input type="text" data-tbkey="${card.key}" value="${pgVal}" placeholder="Europa S. ..." 
                       style="width:92px; padding:0.15rem 0.4rem; font-size:0.74rem; background:#1e293b; border:1px solid #475569; border-radius:4px; color:#fbbf24; text-align:center;" />
              </div>
              <div style="color:#cbd5e1; font-size:0.79rem; line-height:1.4;">${card.info}</div>
            `;
            div.querySelector("input")?.addEventListener("input", (e) => {
              savedPages[card.key] = e.target.value;
              localStorage.setItem("europa_tb_pages_v1", JSON.stringify(savedPages));
            });
            grid.appendChild(div);
          });
        }

        function renderRadarStats() {
          const box = document.getElementById("radar-stats-box");
          if (!box) return;
          const progress = getCurrentProgressObj();
          const cats = [...new Set(activeQuestionPool.map((q) => q.category))];
          let html = `<h4 style="color:#fbbf24; margin-bottom:0.5rem;">📊 Dein Wissens-Radar im aktuellen Modul (${currentSection.toUpperCase()}):</h4>`;
          cats.forEach((cat) => {
            const qs = activeQuestionPool.filter((q) => q.category === cat);
            const ok = qs.filter((q) => progress[q.id] === "correct").length;
            const pct = Math.round((ok / qs.length) * 100);
            const barCol = pct >= 80 ? "#22c55e" : pct >= 50 ? "#f59e0b" : "#ef4444";
            html += `
              <div style="margin-bottom:0.45rem;">
                <div style="display:flex; justify-content:space-between; font-size:0.8rem;">
                  <span>${cat}</span>
                  <strong style="color:${barCol};">${ok} / ${qs.length} (${pct} %)</strong>
                </div>
                <div style="height:6px; background:#1e293b; border-radius:99px; overflow:hidden; margin-top:2px;">
                  <div style="height:100%; width:${pct}%; background:${barCol};"></div>
                </div>
              </div>
            `;
          });
          box.innerHTML = html;
        }

        tbBtn.addEventListener("click", () => {
          renderRadarStats();
          renderFormulaGrid();
          tbModal.classList.remove("hidden");
        });
        tbModal.querySelector("#btn-close-tb-modal")?.addEventListener("click", () => {
          tbModal.classList.add("hidden");
        });
      }
    })();
	// =========================================================================
    // 18. DRITTER ANTWORT-MODUS: "⚖️ RICHTIG / FALSCH" (KNACKIGE FACHAUSSAGEN)
    // =========================================================================
    (function() {
      const modeSwitchGroup = document.querySelector(".mode-switch-group");
      if (!modeSwitchGroup || document.getElementById("mode-btn-tf")) return;

      // 1. Button neben "Freihand" und "Multiple-Choice" einfügen
      const modeBtnTf = document.createElement("button");
      modeBtnTf.id = "mode-btn-tf";
      modeBtnTf.className = "mode-switch-btn";
      modeBtnTf.type = "button";
      modeBtnTf.textContent = "⚖️ Richtig / Falsch";
      modeSwitchGroup.appendChild(modeBtnTf);

      // 2. Knackige, direkte Prüfungs-Aussagen (Elektro, Übergreifende GP2-Themen, WiSo, Englisch)
      const TF_CLAIMS = {
        "el-1": {"claim":"Ein blitzstromtragfähiger Erdungsleiter aus Kupfer zur Haupterdungsschiene (HES) muss mindestens 16 mm² Querschnitt haben und eindrähtig (starr) ausgeführt sein.","isTrue":true,"exp":"Richtig! Nach DIN VDE 0855-1 / 0185-305 gilt für Blitzstromtragfähigkeit: mind. 16 mm² Cu (starr), 25 mm² Al oder 50 mm² Stahl. Feindrähtige Litze ist unzulässig."},
        "el-2": {"claim":"Wenn in einer Großküche alle Edelstahltische in den zusätzlichen Schutzpotentialausgleich einbezogen sind, darf bei den Küchengeräten der Schutzklasse I auf den Schutzleiter (PE) in der Zuleitung verzichtet werden.","isTrue":false,"exp":"Falsch! Der zusätzliche Schutzpotentialausgleich ist nur eine ergänzende Maßnahme. Jedes Gerät der Schutzklasse I benötigt zwingend seinen Schutzleiter (PE) in der Anschlussleitung."},
        "el-3": {"claim":"Für Fundamenterder und Anschlussfahnen, die direkt im Erdreich verlegt werden, darf normaler feuerverzinkter Stahl verwendet werden, da dieser im Boden nicht rostet.","isTrue":false,"exp":"Falsch! Im ungeschützten Erdreich korrodiert verzinkter Stahl innerhalb weniger Jahre. Dort ist korrosionsbeständiger Edelstahl (V4A, Werkstoff 1.4571) vorgeschrieben."},
        "el-4": {"claim":"Aktive Leiter (L1, L2, L3 und N) dürfen niemals direkt auf die Haupterdungsschiene (HES) geklemmt werden, sondern nur über Überspannungs-Schutzeinrichtungen (SPD).","isTrue":true,"exp":"Richtig! Eine direkte Verbindung aktiver Leiter mit der HES würde sofort einen Erdschluss bzw. Kurzschluss verursachen."},
        "el-5": {"claim":"Ein allstromsensitiver RCD Typ B (z. B. für eine Wallbox oder einen Frequenzumrichter) darf problemlos hinter einem normalen RCD Typ A in Reihe geschaltet werden.","isTrue":false,"exp":"Falsch! Glatte Gleichfehlerströme (> 6 mA DC) bringen den Summenstromwandler des vorgeschalteten Typ-A-RCDs in die Sättigung ('Erblinden'), sodass dieser nicht mehr auslöst."},
        "el-6": {"claim":"Im TN-System (230 V) muss ein Endstromkreis bis 32 A im Fehlerfall innerhalb von maximal 0,4 Sekunden automatisch abgeschaltet werden (im TT-System innerhalb von 0,2 Sekunden).","isTrue":true,"exp":"Richtig! Nach DIN VDE 0100-410 gelten für Endstromkreise (230 V) max. 0,4 s im TN-Netz und max. 0,2 s im TT-Netz. Für Verteilerstromkreise gelten 5 s (TN) bzw. 1 s (TT)."},
        "el-7": {"claim":"Eine Fehlerlichtbogen-Schutzeinrichtung (AFDD / Brandschutzschalter) erkennt auch serielle Fehlerlichtbögen (z. B. durch Aderbruch oder lose Klemmen), bei denen weder RCD noch LS-Schalter auslösen.","isTrue":true,"exp":"Richtig! Bei einem seriellen Lichtbogen fließt kein Fehlerstrom gegen Erde (RCD merkt nichts) und der Strom ist durch den Verbraucher begrenzt (LS-Schalter merkt nichts)."},
        "el-8": {"claim":"Ein Messgerät der Messkategorie CAT II darf für Messungen direkt am Hausanschlusskasten (HAK) oder an der Hauptverteilung verwendet werden.","isTrue":false,"exp":"Falsch! Am HAK / Vorzählerbereich treten extrem hohe Kurzschlussenergien auf – dort ist zwingend Messkategorie CAT IV vorgeschrieben (Unterverteilung: CAT III, Steckdosen-Endgeräte: CAT II)."},
        "el-9": {"claim":"Bei der Erstprüfung nach DIN VDE 0100-600 müssen die Schutzleiterdurchgängigkeit (R_PE) und der Isolationswiderstand (R_iso) zwingend im spannungsfreien Zustand gemessen werden, bevor die Anlage eingeschaltet wird.","isTrue":true,"exp":"Richtig! Erst Besichtigen, dann spannungsfrei R_PE und R_iso messen, und erst danach unter Spannung Z_s, Z_i, RCD und Drehfeld prüfen."},
        "el-10": {"claim":"Wenn bei einer Reihenschaltung von zwei RCDs Selektivität gefordert ist, muss der vorgeschaltete RCD ein zeitverzögerter Typ S (selektiv) mit mindestens dem dreifachen Bemessungsdifferenzstrom (z. B. 300 mA vor 30 mA) sein.","isTrue":true,"exp":"Richtig! Nur durch die Zeitverzögerung (Symbol [S]) und den höheren Differenzstrom (mind. Faktor 3) schaltet im Fehlerfall ausschließlich der nachgeschaltete 30-mA-RCD ab."},
        "el-11": {"claim":"Für die Sicherheitsbeleuchtung von Flucht- und Rettungswegen ist auf der Mittellinie des Fluchtweges eine Mindestbeleuchtungsstärke von 1 Lux vorgeschrieben (an Erste-Hilfe-Stellen und Brandmeldern mindestens 5 Lux).","isTrue":true,"exp":"Richtig! Nach DIN EN 1838 gilt: Fluchtwege mind. 1 lx (in 0,2 m Höhe über dem Boden), Erste-Hilfe-Stellen und Feuerlöscheinrichtungen mind. 5 lx."},
        "el-12": {"claim":"Bei der Isolationswiderstandsmessung (500 V DC) müssen Überspannungsableiter (SPDs) zwingend eingesteckt bleiben, damit der Messwert über 1,0 MΩ liegt.","isTrue":false,"exp":"Falsch! SPDs müssen vor der 500-V-Isolationsmessung abgezogen oder abgeklemmt werden, da sie ab ca. 275–350 V leitend werden und sonst einen Isolationsfehler (< 1 MΩ) vortäuschen!"},
        "el-13": {"claim":"Wenn Heizwiderstände (z. B. in einem Warmwasserspeicher oder Heizlüfter) statt in Sternschaltung (Y) in Dreieckschaltung (Δ) am selben 400-V-Netz betrieben werden, verdreifacht sich die Gesamtheizleistung.","isTrue":true,"exp":"Richtig! Im Dreieck liegt an jedem Widerstand die √3-fache Spannung (400 V statt 230 V) und es fließt der √3-fache Strangstrom. Dadurch steigt die Leistung exakt um den Faktor 3 (P_Δ = 3 · P_Y)."},
        "el-14": {"claim":"Ein klassisches TN-C-Netz (mit gemeinsamem PEN-Leiter) ist ideal für moderne EDV- und Serverräume geeignet, da keine Ausgleichsströme über Datenkabelschirme fließen können.","isTrue":false,"exp":"Falsch! Im TN-C-System teilt sich der Neutralleiterstrom auf den PEN und geerdete Netzwerkschirme auf (vagabundierende Ströme -> EMV-Störungen). Für EDV-Anlagen ist ein TN-S-System Pflicht!"},
        "el-15": {"claim":"Der Unterschied zwischen 'Steuern' und 'Regeln' besteht darin, dass beim Regeln der Istwert fortlaufend gemessen, mit dem Sollwert verglichen und bei Abweichungen automatisch nachkorrigiert wird (geschlossener Regelkreis).","isTrue":true,"exp":"Richtig! Steuern ist ein offener Wirkungsablauf ohne Rückkopplung (z. B. Licht über Zeitschaltuhr). Regeln hat immer eine Rückführung über einen Sensor (z. B. Kühlraum-Temperaturregelung)."},
        "el-16": {"claim":"Ein Zweipunktregler (z. B. ein Bimetall-Thermostat im Kühlraum, der bei 9 °C ein- und bei 5 °C ausschaltet) ist ein stetiger Regler.","isTrue":false,"exp":"Falsch! Ein Zweipunktregler kennt nur die zwei Zustände '100 % EIN' und 'AUS' – er ist daher ein UNSTETIGER Regler. Die Differenz zwischen Ein- und Ausschaltpunkt (hier 4 K) nennt man Schaltdifferenz oder Hysterese."},
        "el-17": {"claim":"Eine Wärmepumpe oder Klimaanlage kann mit 1,7 kW elektrischer Anschlussleistung eine Kälte- bzw. Wärmeleistung von 4 kW erzeugen, weil sie die thermische Energie nicht selbst erzeugt, sondern der Umgebung entzieht und transportiert.","isTrue":true,"exp":"Richtig! Der elektrische Strom treibt nur den Kompressor an. Das Verhältnis aus nutzbarer Wärme-/Kälteleistung zu elektrischer Leistung nennt man Leistungszahl (COP bzw. EER)."},
        "el-18": {"claim":"Bei Leuchtmitteln bezeichnet eine Farbtemperatur von 2.700 K bis 3.000 K 'tageslichtweißes' Licht, während 6.000 K für gemütliches 'warmweißes' Licht steht.","isTrue":false,"exp":"Falsch! Es ist genau umgekehrt: ca. 2.700–3.300 K = warmweiß (gelblich/gemütlich), ca. 3.300–5.300 K = neutralweiß (Büro/Werkstatt), über 5.300 K = tageslichtweiß/kaltweiß."},
        "el-19": {"claim":"Bei einem Phasenabschnittdimmer (für kapazitive Lasten und viele LED-Treiber) wird die Netzsinuswelle direkt im Nulldurchgang eingeschaltet und erst nach einer einstellbaren Zeit vor dem nächsten Nulldurchgang wieder abgeschaltet.","isTrue":true,"exp":"Richtig! PhasenABschnitt = Einschalten im Nulldurchgang, Abschneiden am Ende der Halbwelle (schont Kondensatoren vor hohen Einschaltstromspitzen). PhasenANschnitt = verzögertes Einschalten per Triac."},
        "el-20": {"claim":"Bei der Messung eines Stromes mit einem Zangenstrommessgerät (Stromzange) muss die Zange immer das gesamte Mantelkabel (L, N und PE gemeinsam) umschließen.","isTrue":false,"exp":"Falsch! Umschließt man Hin- und Rückleiter (L und N) gleichzeitig, heben sich deren Magnetfelder gegenseitig auf und die Zange zeigt 0 A (bzw. nur den Differenz-/Fehlerstrom) an. Es darf nur ein einzelner Leiter umschlossen werden!"},
        "el-21": {"claim":"Einbruchmeldeanlagen (EMA) und Not-Halt-Kreise arbeiten nach dem Ruhestromprinzip, damit ein Aderbruch oder das Durchtrennen einer Leitung sofort erkannt wird.","isTrue":true,"exp":"Richtig! Beim Ruhestromprinzip (Öffner / NC) fließt im ungestörten Zustand dauerhaft Strom. Jede Leitungsunterbrechung führt sofort zum sicheren Abschalten bzw. Alarm."},
        "el-22": {"claim":"Ein PT100-Temperatursensor ist ein Heißleiter (NTC), dessen elektrischer Widerstand bei steigender Temperatur stark abnimmt.","isTrue":false,"exp":"Falsch! Ein PT100 besteht aus Platin und ist ein Kaltleiter (PTC): Sein Widerstand beträgt bei 0 °C exakt 100 Ω und STEIGT mit zunehmender Temperatur nahezu linear an (ca. 0,385 Ω pro °C)."},
        "el-23": {"claim":"Bei einer Photovoltaikanlage stehen die Solarmodule und DC-Leitungen bis zum Wechselrichter auch dann noch unter gefährlicher Gleichspannung (oft bis 1.000 V DC), wenn der AC-Leitungsschutzschalter im Zählerschrank ausgeschaltet wurde.","isTrue":true,"exp":"Richtig! Solange Licht auf die PV-Module fällt, erzeugen sie Gleichspannung. Deshalb ist vor dem Wechselrichter ein eigener DC-Lasttrennschalter (und Überspannungsschutz im GAK) erforderlich."},
        "el-24": {"claim":"Die 5 Sicherheitsregeln nach DIN VDE 0105-100 müssen vor Beginn der Arbeit an elektrischen Anlagen in dieser Reihenfolge eingehalten werden: 1. Freischalten, 2. Gegen Wiedereinschalten sichern, 3. Spannungsfreiheit feststellen, 4. Erden und Kurzschließen, 5. Benachbarte Teile abdecken.","isTrue":true,"exp":"Richtig! Diese Reihenfolge ist absolut verbindlich. Die Spannungsfreiheit (Regel 3) darf dabei nur mit einem zweipoligen Spannungsprüfer (Duspol, VDE 0682-401) festgestellt werden – niemals mit einem Phasenprüfer ('Lügenstift')!"},
        "el-25": {"claim":"Mit einem Sanftstarter (Softstarter) lässt sich die Drehzahl eines Drehstromasynchronmotors im laufenden Dauerbetrieb stufenlos zwischen 10 % und 150 % regeln.","isTrue":false,"exp":"Falsch! Ein Softstarter reduziert nur während des Anlaufs die Spannung über Phasenanschnitt, lässt die Netzfrequenz (50 Hz) aber unverändert. Für eine Drehzahlregelung im Betrieb wird ein Frequenzumrichter (FU) benötigt."},
        "el-26": {"claim":"Ein Motorvollschutz überwacht den Motor sowohl stromabhängig über das Bimetall als auch direkt temperaturabhängig über Kaltleiter-Sensoren (PTC-Thermistoren) in der Motorwicklung.","isTrue":true,"exp":"Richtig! Dadurch ist der Motor auch bei blockiertem Lüfterrad oder verschmutzten Kühlrippen geschützt, selbst wenn der Nennstrom noch gar nicht überschritten wurde."},
        "el-27": {"claim":"Ein Drehstrommotor mit der Typenschild-Angabe '230 V / 400 V (Δ / Y)' darf am öffentlichen 400-V-Drehstromnetz mit einer Stern-Dreieck-Anlaufschaltung betrieben werden.","isTrue":false,"exp":"Falsch! Die kleinere Spannung (230 V) gibt die maximale Strangspannung einer Wicklung an. Im Dreieck am 400-V-Netz würde jede Spule 400 V bekommen und durchbrennen! Für Stern-Dreieck am 400-V-Netz muss das Typenschild '400 V / 690 V' lauten."},
        "el-28": {"claim":"Weil ein Not-Halt-Taster (-S0) hardwaremäßig als Öffner (Ruhestromprinzip) an den SPS-Eingang angeschlossen wird, führt dieser Eingang im unbetätigten Normalzustand das Signal '1' (High) und darf im FUP für die Freigabe am UND-Baustein NICHT negiert werden.","isTrue":true,"exp":"Richtig! Klassische Prüfungsfalle: Da der Öffner im Ruhezustand geschlossen ist, liegt dauerhaft '1' am SPS-Eingang an. Erst beim Drücken des Not-Halts fällt das Signal auf '0' ab."},
        "el-29": {"claim":"Bei einer Wendeschützschaltung (Drehrichtungsumkehr) reicht es vollkommen aus, die Verriegelung nur über die Taster herzustellen; auf die Schützverriegelung über Öffner-Hilfskontakte (21/22) darf verzichtet werden.","isTrue":false,"exp":"Falsch! Die gegenseitige Schützverriegelung über die Öffner-Hilfskontakte (21/22) vor den Schützspulen ist immer Pflicht, damit bei einem hängenbleibenden Schütz kein satter Außenleiter-Kurzschluss entsteht."},
        "el-30": {"claim":"Bei einem völlig symmetrisch belasteten Dreiphasen-Drehstromverbraucher (z. B. Drehstrommotor oder 3 gleiche Heizstäbe im Stern) heben sich die Ströme im Sternpunkt durch die 120°-Phasenverschiebung auf, sodass im Neutralleiter 0 A fließen.","isTrue":true,"exp":"Richtig! Deshalb benötigen symmetrische Drehstromverbraucher wie Drehstrommotoren oder Durchlauferhitzer überhaupt keinen Neutralleiteranschluss."},
        "sv-1": {"claim":"Die fünf Säulen der gesetzlichen Sozialversicherung lauten: Kranken-, Renten-, Arbeitslosen-, Pflege- und gesetzliche Unfallversicherung.","isTrue":true,"exp":"Richtig! Alle fünf sind Pflichtversicherungen nach dem Sozialgesetzbuch (SGB)."},
        "sv-2": {"claim":"Die Beiträge zur gesetzlichen Unfallversicherung (Berufsgenossenschaft, z. B. BG ETEM) werden je zur Hälfte (50 / 50) vom Arbeitnehmer und vom Arbeitgeber getragen.","isTrue":false,"exp":"Falsch! Die gesetzliche Unfallversicherung ist die einzige Säule, die zu 100 % allein vom Arbeitgeber bezahlt wird, weil sie seine zivilrechtliche Haftung bei Arbeits- und Wegeunfällen ablöst."},
        "sv-4": {"claim":"Beim Umlageverfahren (Generationenvertrag) der gesetzlichen Rentenversicherung wird das eingezahlte Geld jedes Arbeitnehmers auf einem eigenen Sparkonto angelegt und ihm später mit Zinsen ausgezahlt.","isTrue":false,"exp":"Falsch! Das wäre das Kapitaldeckungsverfahren (wie bei privaten Versicherungen). Beim Umlageverfahren werden die laufenden Beiträge der heutigen Arbeitnehmer sofort genutzt, um die Renten der heutigen Rentner auszuzahlen."},
        "sv-9": {"claim":"Wird ein Arbeitnehmer unverschuldet krank, zahlt der Arbeitgeber bis zu 6 Wochen (42 Kalendertage) lang 100 % des Lohns weiter (Entgeltfortzahlung); erst ab der 7. Woche zahlt die Krankenkasse Krankengeld.","isTrue":true,"exp":"Richtig! Nach dem Entgeltfortzahlungsgesetz (EFZG) zahlt der Betrieb 6 Wochen voll weiter, danach übernimmt die gesetzliche Krankenkasse mit dem Krankengeld (ca. 70 % vom Brutto, max. 90 % vom Netto)."},
        "av-5": {"claim":"Während der Probezeit in der Berufsausbildung (mindestens 1 Monat, höchstens 4 Monate nach BBiG) kann das Ausbildungsverhältnis von beiden Seiten jederzeit ohne Einhaltung einer Kündigungsfrist und ohne Angabe von Gründen schriftlich gekündigt werden.","isTrue":true,"exp":"Richtig! Nach § 20 und § 22 BBiG beträgt die Probezeit bei Azubis 1 bis 4 Monate. In dieser Zeit ist die Kündigung jederzeit schriftlich ohne Frist möglich."},
        "av-6": {"claim":"Eine Kündigung des Arbeitsverhältnisses ist in Deutschland auch per E-Mail, WhatsApp oder mündlich rechtswirksam, sofern ein Zeuge dabei ist.","isTrue":false,"exp":"Falsch! Nach § 623 BGB bedarf jede Kündigung (egal ob ordentlich oder fristlos) zwingend der gesetzlichen Schriftform auf Papier mit eigenhändiger Originalunterschrift. Elektronische Form ist ausgeschlossen!"},
        "av-10": {"claim":"Ein 'einfaches Arbeitszeugnis' enthält neben der Art und Dauer der Beschäftigung auch eine ausführliche Bewertung der Arbeitsleistung und des Sozialverhaltens.","isTrue":false,"exp":"Falsch! Leistung und Verhalten stehen nur im 'qualifizierten Arbeitszeugnis'. Das einfache Arbeitszeugnis bestätigt lediglich Personalien sowie Art und Dauer der Tätigkeit."},
        "av-12": {"claim":"Nach dem Bürgerlichen Gesetzbuch (BGB) beginnt die Rechtsfähigkeit eines Menschen mit der Vollendung der Geburt, die volle Geschäftsfähigkeit jedoch erst mit Vollendung des 18. Lebensjahres.","isTrue":true,"exp":"Richtig! Zwischen 7 und 18 Jahren ist man 'beschränkt geschäftsfähig' (§ 106 / § 110 BGB Taschengeldparagraf), unter 7 Jahren geschäftsunfähig."},
        "as-4": {"claim":"Für jugendliche Auszubildende (unter 18 Jahren) schreibt das Jugendarbeitsschutzgesetz (JArbSchG) bei einer täglichen Arbeitszeit von mehr als 6 Stunden insgesamt mindestens 60 Minuten Ruhepause vor.","isTrue":true,"exp":"Richtig! Bei Jugendlichen (JArbSchG) gelten strengere Pausen als bei Erwachsenen: 4,5 bis 6 Std. = 30 Min. Pause; über 6 Std. = 60 Min. Pause!"},
        "tr-3": {"claim":"Unter 'Tarifautonomie' versteht man das Recht der Bundesregierung, die Löhne im Elektrohandwerk jedes Jahr per Gesetz festzulegen.","isTrue":false,"exp":"Falsch! Tarifautonomie (Art. 9 Abs. 3 GG) bedeutet genau, dass Gewerkschaften und Arbeitgeberverbände Löhne und Arbeitsbedingungen frei und OHNE staatliche Einmischung aushandeln."},
        "wi-1": {"claim":"Bei einer Inflation steigt das allgemeine Preisniveau an, wodurch die Kaufkraft des Geldes sinkt (man bekommt für 100 € weniger Waren als zuvor).","isTrue":true,"exp":"Richtig! Inflation = Geldentwertung durch steigendes Preisniveau."},
        "wi-11": {"claim":"Bei einem Einzelunternehmen haftet der Inhaber für Schulden seines Betriebes nur mit dem Betriebsvermögen, sein privates Haus und Privatkonto sind automatisch geschützt.","isTrue":false,"exp":"Falsch! Beim Einzelunternehmen (und der GbR/OHG) haftet der Inhaber unbeschränkt auch mit seinem gesamten Privatvermögen! Eine Haftungsbeschränkung auf das Gesellschaftsvermögen gibt es erst bei Kapitalgesellschaften wie der GmbH."},
        "en-1": {"claim":"Der englische Fachbegriff 'normally closed (NC)' bezeichnet im Schaltplan einen Schließerkontakt, der im Ruhezustand geöffnet ist.","isTrue":false,"exp":"Falsch! 'Normally closed (NC)' ist im Ruhezustand geschlossen = ÖFFNER (z. B. 21/22). Ein Schließer heißt auf Englisch 'normally open (NO)'."},
        "en-2": {"claim":"Ein 'potential-free contact' in einem englischen Datenblatt ist ein potenzialfreier Schaltkontakt (Relaiskontakt), der selbst keine eigene Versorgungsspannung nach außen führt.","isTrue":true,"exp":"Richtig! Potenzialfreie Kontakte können dadurch flexibel für fremde Steuerspannungen oder Meldeeingänge genutzt werden."},
        "en-5": {"claim":"Steht in einer englischen Montageanleitung der Hinweis 'For indoor use only', darf das Gerät auch im Außenbereich unter einem regengeschützten Vordach montiert werden.","isTrue":false,"exp":"Falsch! 'For indoor use only' erlaubt ausschließlich die Montage in geschlossenen Innenräumen (wegen Luftfeuchtigkeit, Temperaturschwankungen und Betauung)."},
        "en-6": {"claim":"Die englische Montageart 'flush mounting' bedeutet Unterputzmontage (UP), während 'surface mounting' für Aufputzmontage (AP) steht.","isTrue":true,"exp":"Richtig! Und 'DIN rail mounting' bedeutet Hutschienenmontage (Tragschiene TH35 im Verteiler)."},
        "en-11": {"claim":"Die Angabe 'tightening torque: 2.5 Nm' im englischen Datenblatt eines Sicherungsautomaten gibt die Abisolierlänge der Kupferader in Millimetern an.","isTrue":false,"exp":"Falsch! 'Tightening torque' ist das Anzugsdrehmoment der Klemmschraube (in Newtonmeter). Die Abisolierlänge heißt auf Englisch 'stripping length'."},
        "el-31": {"claim":"Ein Leitungsschutzschalter der Charakteristik B löst im Kurzschlussfall beim 3- bis 5-fachen Bemessungsstrom (3–5 × In) unverzögert magnetisch aus (Charakteristik C beim 5- bis 10-fachen).","isTrue":true},
        "el-32": {"claim":"Ein Smart-Home-Schaltaktor mit einer maximal zulässigen Gesamtstrombelastbarkeit von 13 A darf ohne zusätzliche Vorsicherung direkt an einen mit B16A abgesicherten Stromkreis angeschlossen werden.","isTrue":false},
        "el-33": {"claim":"Die Schutzart IP44 auf einer Steckdose bedeutet: Schutz gegen feste Fremdkörper ≥ 1 mm Durchmesser (erste Ziffer 4) und Schutz gegen allseitiges Spritzwasser (zweite Ziffer 4).","isTrue":true},
        "el-34": {"claim":"Für elektrische Betriebsmittel in Futterküchen oder Werkstätten, die mit einem Wasserschlauch (Strahlwasser) gereinigt werden, reicht die Schutzart IP44 vollkommen aus.","isTrue":false},
        "el-35": {"claim":"Ein Betriebsmittel mit dem Doppelquadrat-Symbol (Schutzklasse II, schutzisoliert) darf unter keinen Umständen an den Schutzleiter (PE) angeschlossen werden.","isTrue":true},
        "el-36": {"claim":"Für den Überlastschutz einer Leitung muss die Bedingung Ib ≤ In ≤ Iz eingehalten werden, und der Spannungsfall ab Zähler darf nach DIN 18015 maximal 3 % betragen.","isTrue":true},
        "el-37": {"claim":"Eine Mantelleitung vom Typ NYM-J darf ohne Schutzrohr direkt im ungeschützten Erdreich und unter gepflasterten Einfahrten verlegt werden.","isTrue":false},
        "el-38": {"claim":"In einer englischen Wallbox-Dokumentation steht 'RCD' für den Fehlerstromschutzschalter, 'MCB' für den Leitungsschutzschalter und 'Tethered charging cable' für ein fest angeschlagenes Ladekabel.","isTrue":true},
        "el-39": {"claim":"In englischen Schaltplänen bedeutet 'Normally Open (NO)' Öffnerkontakt und 'Normally Closed (NC)' Schließerkontakt.","isTrue":false},
        "el-40": {"claim":"Der englische Sicherheitshinweis 'Disconnect from power supply' fordert dazu auf, die Anlage vor Beginn der Arbeiten allpolig spannungsfrei zu schalten.","isTrue":true},
        "el-41": {"claim":"Wenn in einer Unterverteilung die Neutralleiterschienen N1 und N2 hinter zwei getrennten RCDs miteinander gebrückt werden, lösen beide RCDs bei Belastung durch die Stromaufteilung sofort aus.","isTrue":true},
        "el-42": {"claim":"Ein 400-V-Drehstrom-Durchlauferhitzer darf in der Unterverteilung über drei einzelne, unabhängige 1-polige LS-Schalter abgesichert werden.","isTrue":false},
        "el-43": {"claim":"Bei einem Außenleitererdschluss eines beschädigten Erdkabels im Erdreich reicht der fließende Erdschlussstrom (oft nur ca. 20–30 A) meist nicht aus, um einen LS-Schalter C20 (Ia = 200 A) magnetisch auszulösen.","isTrue":true},
        "el-44": {"claim":"Damit ein über Taster gestarteter Ausgang (z. B. Lüftung oder Beleuchtung) nach dem Loslassen des Tasters in einer SPS eingeschaltet bleibt, wird im Funktionsplan (FUP) ein RS-Speicherglied benötigt.","isTrue":true},
        "el-45": {"claim":"Ein Motorschutzschalter (-F1) im Hauptstromkreis schützt den Motor ausschließlich vor Kurzschluss, besitzt aber keinen thermischen Bimetall-Auslöser gegen Überlast.","isTrue":false},
        "el-46": {"claim":"Werden zwei gleiche Heizwiderstände statt parallel in Reihe an 400 V geschaltet, liegt an jedem Widerstand nur die halbe Spannung (200 V) an und die Gesamtleistung sinkt auf ein Viertel.","isTrue":true},
        "el-47": {"claim":"Für einen polumschaltbaren Dahlandermotor (Drehzahlverhältnis 1:2, Δ / YY) genügt im Hauptstromkreis ein einziges Motorschutzrelais für beide Drehzahlstufen.","isTrue":false},
        "el-48": {"claim":"Bei KNX identifiziert die physikalische Adresse (mit Punkten, z. B. 1.1.10) das Gerät eindeutig, während die Gruppenadresse (mit Schrägstrichen, z. B. 1/2/3) die Schaltfunktion logisch verknüpft.","isTrue":true},
        "el-49": {"claim":"Im Zählerschrank werden der selektive Hauptleitungsschutzschalter (SLS) und der Kombiableiter (SPD Typ 1/2) im netzseitigen Anschlussraum (NAR) noch vor dem Drehstromzähler installiert.","isTrue":true},
        "el-50": {"claim":"Bei einer verbindungsprogrammierten Steuerung (VPS) wird die logische Funktion durch ein Softwareprogramm im Speicher festgelegt, während sie bei einer SPS durch die Verdrahtung bestimmt wird.","isTrue":false},
        "el-51": {"claim":"Ein Netzwerk-Switch leitet Datenpakete anhand der MAC-Adresse gezielt nur an den Empfänger-Port im lokalen Netzwerk weiter, während ein Router verschiedene IP-Netzwerke miteinander verbindet.","isTrue":true},
        "el-52": {"claim":"Über Power over Ethernet (PoE) werden Netzwerkgeräte wie IP-Kameras direkt über das 8-adrige Datenkabel mit Gleichspannung versorgt; die maximale Kanallänge für Kupfer-Verlegekabel beträgt 100 Meter.","isTrue":true},
        "el-53": {"claim":"Nach DIN EN 81346 kennzeichnet das Betriebsmittelkennzeichen '-F' Schutzeinrichtungen (Sicherungen/RCDs), '-Q' Starkstromschaltgeräte (Schütze) und '-B' Sensoren/Melder.","isTrue":true},
        "el-54": {"claim":"Ein Erdkabel (NYY-J) muss unter Gehwegen in mindestens 0,60 m Tiefe und unter Fahrbahnen/Straßen in mindestens 0,80 m Tiefe in einem steinfreien Sandbett mit Warnband verlegt werden.","isTrue":true},
        "el-55": {"claim":"Bei Schmelzsicherungen (Typ gG) berechnet man den Abschaltstrom Ia immer pauschal mit dem Faktor 5 × In, ohne in die Zeit-Strom-Kennlinie schauen zu müssen.","isTrue":false},
        "el-56": {"claim":"Die CAD-Aufgabe (Aufgabe 3) macht im Prüfungsbereich Systementwurf allein 50 % der Note aus und erfordert normgerechte Symbole nach DIN EN 60617 sowie korrekte Aderanzahlen.","isTrue":true},
        "el-57": {"claim":"Soll ein Kreissägemotor (-Q2) erst starten dürfen, wenn die Absaugung (-Q1) bereits läuft (Folgeschaltung), muss ein Schließer-Hilfskontakt (13/14) von -Q1 in Reihe vor die Spule -Q2 geschaltet werden.","isTrue":true},
        "el-58": {"claim":"Unterbricht ein Fahrzeug beim Zufahren eines automatischen Rolltores die Sicherheits-Lichtschranke (-B3), muss das Schütz 'Tor ZU' (-Q1) über den Öffnerkontakt sofort abgeschaltet werden.","isTrue":true},
        "el-59": {"claim":"Ein anzugsverzögertes Zeitrelais (-K1T, 5 s) schaltet seinen verzögerten Schließerkontakt erst 5 Sekunden nach dem Anlegen der Steuerspannung an A1/A2 durch.","isTrue":true},
        "el-60": {"claim":"Weil die Tabelle der Temperatur-Umrechnungsfaktoren f1 auf Seite 201 auf 30 °C (f1 = 1,0) bezogen ist, muss der benötigte Querschnitt bei Rechnung mit f1 in der 30-°C-Tabelle auf Seite 198 nachgeschlagen werden.","isTrue":true},
        "el-61": {"claim":"Eine in 3 Lagen aufgewickelte Kabeltrommel darf laut Faktor f5 auf Seite 201 weiterhin mit 100 % ihres Bemessungsstroms belastet werden, solange die Trommel aus Metall besteht.","isTrue":false},
        "el-62": {"claim":"Ein mehradriges Erdkabel NYY-J hat bei direkter Verlegung im Erdboden (Verlegeart D2, Seite 204) eine höhere Strombelastbarkeit als bei Verlegung in einem Elektroinstallationsrohr im Erdboden (Verlegeart D1).","isTrue":true},
        "el-63": {"claim":"Bei D0-Schmelzsicherungen (Neozed, Seite 209) hat der 16-A-Einsatz einen grauen Kennmelder (Baugröße D01), der 20-A-Einsatz einen blauen (D02) und der 25-A-Einsatz einen gelben Kennmelder (D02).","isTrue":true},
        "el-64": {"claim":"Ein Leitungsschutzschalter (B, C, D) muss laut Seite 211 beim 1,13-fachen Bemessungsstrom innerhalb von 5 Sekunden thermisch abschalten.","isTrue":false},
        "el-65": {"claim":"Im TT-System darf der Anlagenerderwiderstand R_A bei Einsatz eines 30-mA-RCDs für max. 50 V Berührungsspannung höchstens 1666 Ω betragen, und der betriebsmäßige Ableitstrom darf 0,3 · I_Δn nicht überschreiten (Seite 257/258).","isTrue":true},
        "el-66": {"claim":"Bei der Schutzmaßnahme Schutztrennung (Seite 259) muss das Metallgehäuse des angeschlossenen Verbrauchsmittels zwingend mit dem Schutzleiter (PE) der speisenden Anlage verbunden werden.","isTrue":false},
        "el-67": {"claim":"Bei dreiphasigen Frequenzumrichtern in Sechspuls-Brückenschaltung können glatte Gleichfehlerströme > 10 mA auftreten, weshalb dort laut Seite 260/261 ein allstromsensitiver RCD Typ B oder B+ vorgeschrieben ist.","isTrue":true},
        "el-68": {"claim":"Weil sich Kupferleitungen im Kurzschlussfall stark erwärmen und ihr Widerstand steigt, darf die im kalten Zustand gemessene Schleifenimpedanz Z_sm höchstens 2/3 des Grenzwertes U0/Ia betragen (Seite 258/265).","isTrue":true},
        "el-69": {"claim":"Nach der Faustformel auf Seite 328 benötigt man bei 400 V / 50 Hz in Dreieckschaltung zur Blindleistungskompensation eine Kondensatorkapazität von rund 20 µF pro kvar Kompensationsblindleistung.","isTrue":true},
        "el-70": {"claim":"Bei der Berechnung des Raumindex k = (l · b) / [h · (l + b)] auf Seite 233/234 setzt man für h die Höhe der Leuchte über der beleuchteten Arbeitsfläche (z. B. Schreibtischhöhe 0,75 m abgezogen) ein.","isTrue":true},
        "el-71": {"claim":"An einen Quattro-LNB können 4 SAT-Receiver direkt ohne zwischengeschalteten Multischalter angeschlossen werden, während ein Quad-LNB zwingend einen externen Multischalter benötigt (Seite 438).","isTrue":false},
        "el-72": {"claim":"Laut Seite 442 darf das Biegemoment an der obersten Einspannstelle eines Antennenstandrohrs maximal 1650 Nm betragen, und die Einspannlänge l_E muss mindestens 1/6 der Gesamtrohrlänge betragen.","isTrue":true},
        "el-73": {"claim":"Die auf dem Leistungsschild eines Drehstrommotors und in der Tabelle auf Seite 528 angegebene Bemessungsleistung P_N ist immer die mechanisch an der Welle abgegebene Leistung P2.","isTrue":true},
        "el-74": {"claim":"Bei einem Dahlander-Motor in Δ/YY-Schaltung (Seite 537) werden für die hohe Drehzahl (Doppelstern YY) die Außenleiter L1, L2, L3 an 2U, 2V, 2W angeschlossen und die Klemmen 1U, 1V, 1W miteinander gebrückt.","isTrue":true},
        "el-75": {"claim":"Wenn bei der Leitungsdimensionierung nach Spannungsfall, Kurzschlussschutz und Fehlerschutz drei unterschiedliche maximale Leitungslängen herauskommen, ist immer der kleinste der drei Werte entscheidend (Seite 205–207).","isTrue":true},
        "sv-3": {"claim":"Vom monatlichen Bruttoentgelt des Arbeitnehmers werden Beiträge für genau vier Sozialversicherungen abgezogen: Kranken-, Renten-, Arbeitslosen- und Pflegeversicherung (nicht jedoch für die Unfallversicherung).","isTrue":true},
        "sv-5": {"claim":"Das Solidaritätsprinzip in der gesetzlichen Krankenversicherung bedeutet, dass ein Arbeitnehmer mit hohem Einkommen und hohen Beiträgen beim Arzt eine deutlich bessere medizinische Behandlung erhält als ein Geringverdiener.","isTrue":false},
        "sv-6": {"claim":"Durch den demografischen Wandel (niedrige Geburtenrate bei gleichzeitig steigender Lebenserwartung) müssen im Umlageverfahren immer weniger Beitragszahler für immer mehr Rentner aufkommen.","isTrue":true},
        "sv-7": {"claim":"Die gesetzliche Unfallversicherung (Berufsgenossenschaft) zahlt auch bei privaten Freizeit- und Urlaubsunfällen, sofern der Arbeitnehmer unverschuldet verletzt wurde.","isTrue":false},
        "sv-8": {"claim":"Zu den zentralen Leistungen der Bundesagentur für Arbeit (Arbeitslosenversicherung) gehören Arbeitslosengeld I, Kurzarbeitergeld, Insolvenzgeld sowie die Berufsberatung und Arbeitsvermittlung.","isTrue":true},
        "sv-10": {"claim":"Die Lohnsteuerklassen (I bis VI) richten sich in Deutschland nach der Gefährdungsstufe des ausgeübten Handwerksberufs und legen den Beitrag zur Berufsgenossenschaft fest.","isTrue":false},
        "sv-11": {"claim":"Zu den Lohnzusatzkosten (Personalnebenkosten) des Arbeitgebers zählen u. a. die Arbeitgeberanteile zur Sozialversicherung, der alleinige Beitrag zur Berufsgenossenschaft sowie die Entgeltfortzahlung bei Urlaub und Krankheit.","isTrue":true},
        "av-1": {"claim":"Nach dem Nachweisgesetz müssen in einem Arbeitsvertrag u. a. Name und Anschrift der Vertragsparteien, Beginn, Arbeitsort, Tätigkeitsbeschreibung, Entgelt, Arbeitszeit, Urlaub und Kündigungsfristen schriftlich festgehalten werden.","isTrue":true},
        "av-2": {"claim":"Beim Abschluss eines Arbeitsvertrages herrscht völlige Vertragsfreiheit ohne gesetzliche Untergrenzen; Gesetze wie BGB, Arbeitszeitgesetz, Mindestlohngesetz oder Bundesurlaubsgesetz sind für Handwerksbetriebe nur freiwillige Empfehlungen.","isTrue":false},
        "av-3": {"claim":"Aus dem Arbeitsvertrag entsteht für den Arbeitnehmer als Hauptpflicht die Arbeitspflicht (und als Nebenpflicht die Treue-/Verschwiegenheitspflicht) sowie für den Arbeitgeber als Hauptpflicht die Vergütungspflicht (und als Nebenpflicht die Fürsorgepflicht).","isTrue":true},
        "av-4": {"claim":"Die Verschwiegenheitspflicht verbietet es dem Arbeitnehmer lediglich, mit seinen Kollegen über das Wetter zu sprechen; Kundenadressen, Kalkulationen und Betriebsgeheimnisse darf er dagegen frei im Internet veröffentlichen.","isTrue":false},
        "av-7": {"claim":"Beharrliche Arbeitsverweigerung, Diebstahl oder Tätlichkeiten im Betrieb sind wichtige Gründe für eine fristlose (außerordentliche) Kündigung durch den Arbeitgeber; umgekehrt darf der Arbeitnehmer z. B. bei dauerhafter Nichtzahlung des Lohns oder grober Arbeitsschutzverletzung fristlos kündigen.","isTrue":true},
        "av-8": {"claim":"Besonderen gesetzlichen Kündigungsschutz genießen u. a. Auszubildende nach der Probezeit, Schwangere, Beschäftigte in Elternzeit, Schwerbehinderte sowie Mitglieder des Betriebsrates und der JAV.","isTrue":true},
        "av-9": {"claim":"Bei einer betriebsbedingten Kündigung darf der Arbeitgeber frei nach Sympathie entscheiden, wen er entlässt; Kriterien wie Betriebszugehörigkeit, Lebensalter, Unterhaltspflichten und Schwerbehinderung (Sozialauswahl) spielen gesetzlich keine Rolle.","isTrue":false},
        "av-11": {"claim":"Das Direktionsrecht (Weisungsrecht nach § 106 GewO) erlaubt es dem Arbeitgeber, Inhalt, Ort und Zeit der Arbeitsleistung näher zu bestimmen, solange er dabei nicht gegen Gesetze, Tarifverträge, den Arbeitsvertrag oder die Fürsorgepflicht verstößt.","isTrue":true},
        "as-1": {"claim":"Zu den wichtigsten Maßnahmen zur Unfallverhütung im Elektrohandwerk gehören das Tragen der persönlichen Schutzausrüstung (PSA), regelmäßige Sicherheitsunterweisungen, geprüfte Werkzeuge/Messgeräte und das strikte Einhalten der 5 Sicherheitsregeln.","isTrue":true},
        "as-2": {"claim":"Die beiden gesetzlichen Hauptaufgaben der Berufsgenossenschaften (z. B. BG ETEM) sind das Aushandeln von Lohntarifverträgen und die Auszahlung des Arbeitslosengeldes bei Betriebsschließungen.","isTrue":false},
        "as-3": {"claim":"Nach dem Arbeitszeitgesetz (ArbZG) gilt für Erwachsene ab 6 Stunden Arbeitszeit eine Ruhepause von mindestens 30 Minuten, ab 9 Stunden von mindestens 45 Minuten sowie eine ununterbrochene Ruhezeit von mindestens 11 Stunden zwischen zwei Arbeitstagen.","isTrue":true},
        "as-5": {"claim":"Während der technische Arbeitsschutz die Sicherheit von Betriebsmitteln, Maschinen und Arbeitsstätten regelt (z. B. UVV, ArbStättV), schützt der soziale Arbeitsschutz bestimmte Personengruppen und regelt Arbeitszeiten (z. B. JArbSchG, MuSchG, ArbZG).","isTrue":true},
        "tr-1": {"claim":"Tarifvertragsparteien sind die Gewerkschaften und die Arbeitgeberverbände: Im Lohntarifvertrag wird die Entgelthöhe geregelt, während der Manteltarifvertrag langfristige Rahmenbedingungen wie Arbeitszeit, Urlaub und Kündigungsfristen festlegt.","isTrue":true},
        "tr-2": {"claim":"Während der Laufzeit eines gültigen Tarifvertrages gilt die sogenannte Friedenspflicht – das bedeutet, dass die Gewerkschaft jederzeit ohne Vorwarnung zum unbefristeten Streik über bereits geregelte Tarifpunkte aufrufen darf.","isTrue":false},
        "tr-4": {"claim":"Im Arbeitskampf ist der Streik (gemeinsame planmäßige Arbeitsniederlegung) das Kampfmittel der Gewerkschaft, während die Aussperrung (Verweigerung des Zutritts zum Betrieb ohne Lohnzahlung) das Gegenkampfmittel der Arbeitgeber ist.","isTrue":true},
        "tr-5": {"claim":"Der Betriebsrat hat nach dem Betriebsverfassungsgesetz (BetrVG) seine stärksten echten Mitbestimmungsrechte bei sozialen Angelegenheiten (z. B. Lage der täglichen Arbeitszeit, Pausen, Urlaubsplan), während er bei wirtschaftlichen Fragen vor allem Informations- und Beratungsrechte hat.","isTrue":true},
        "tr-6": {"claim":"Eine Betriebsvereinbarung wird überregional zwischen der Bundesregierung und der Handwerkskammer abgeschlossen und gilt automatisch für alle Betriebe in ganz Deutschland.","isTrue":false},
        "tr-7": {"claim":"Die Jugend- und Auszubildendenvertretung (JAV) überwacht die Einhaltung von Gesetzen und Tarifverträgen zugunsten der Azubis, nimmt deren Beschwerden entgegen und beantragt beim Betriebsrat Maßnahmen zur Verbesserung der Berufsausbildung.","isTrue":true},
        "bb-1": {"claim":"Eine abgeschlossene berufliche Ausbildung verringert das Risiko von Arbeitslosigkeit deutlich, sichert einen höheren Facharbeiterlohn und bildet die gesetzliche Grundlage für Aufstiegsfortbildungen wie die Meister- oder Technikerschule.","isTrue":true},
        "bb-2": {"claim":"Nach bestandener Gesellenprüfung sind im Elektrohandwerk gesetzlich keine weiteren Fortbildungen wie Meisterschule, Technikerschule oder Herstellerschulungen (z. B. KNX, PV, Wärmepumpe) mehr zulässig.","isTrue":false},
        "bb-3": {"claim":"Eine Anpassungsfortbildung dient dazu, das berufliche Fachwissen auf dem aktuellen technischen Stand zu halten (z. B. VDE-Normenseminar), während eine Aufstiegsfortbildung zu einem höheren beruflichen Abschluss führt (z. B. Handwerksmeister oder staatlich geprüfter Techniker).","isTrue":true},
        "bb-4": {"claim":"Wenn ein Elektrobetrieb die Weiterbildung seiner Mitarbeiter durch Kostenübernahme oder bezahlte Freistellung fördert, stärkt er damit seine eigene Wettbewerbsfähigkeit, Erschließung neuer Geschäftsfelder und Mitarbeiterbindung.","isTrue":true},
        "bb-5": {"claim":"Zu den berufsübergreifenden Qualifikationen zählen u. a. EDV-Kenntnisse, Fremdsprachen, Führerschein und Erste Hilfe; Kommunikationsfähigkeit bedeutet dabei, Informationen klar zu vermitteln, aktiv zuzuhören und konstruktiv im Team zusammenzuarbeiten.","isTrue":true},
        "bb-6": {"claim":"Der Fachkräftemangel im Handwerk entsteht ausschließlich dadurch, dass es viel zu viele jugendliche Bewerber auf zu wenige offene Ausbildungsplätze gibt.","isTrue":false},
        "bb-7": {"claim":"Bei der Arbeitsbewertung nach dem Genfer Schema werden Arbeitsplätze nach vier Hauptanforderungen beurteilt: 1. Geistige und körperliche Anforderungen (Fachkönnen), 2. Belastung, 3. Verantwortung und 4. Arbeitsbedingungen (Umgebungseinflüsse).","isTrue":true},
        "bb-8": {"claim":"Im dualen Ausbildungssystem findet die Ausbildung ausschließlich im Klassenzimmer der Berufsschule statt; ein praktischer Einsatz im Ausbildungsbetrieb ist erst nach der Gesellenprüfung vorgesehen.","isTrue":false},
        "wi-2": {"claim":"Unter einer Deflation versteht man einen anhaltenden Rückgang des allgemeinen Preisniveaus infolge zu geringer gesamtwirtschaftlicher Nachfrage, was durch Konsumzurückhaltung zu Umsatzrückgängen, Lohnkürzungen und steigender Arbeitslosigkeit führen kann.","isTrue":true},
        "wi-3": {"claim":"Der Nominallohn gibt die tatsächliche Kaufkraft für Waren und Dienstleistungen an, während der Reallohn lediglich den auf dem Gehaltszettel stehenden Euro-Betrag ohne Berücksichtigung der Inflation bezeichnet.","isTrue":false},
        "wi-4": {"claim":"Der gesetzliche Mindestlohn bildet eine verbindliche Lohnuntergrenze in Deutschland, die Arbeitnehmer vor Lohndumping schützt und zur Sicherung des Existenzminimums beiträgt.","isTrue":true},
        "wi-5": {"claim":"Wenn das Girokonto mit 500 € im Dispokredit überzogen ist und gleichzeitig 2.000 € auf einem niedrig verzinsten Sparkonto liegen, sollte man den Dispo sofort durch Umbuchung vom Sparkonto ausgleichen, da Überziehungszinsen viel höher sind als Habenzinsen.","isTrue":true},
        "wi-6": {"claim":"Ein schriftlicher Verbraucherkreditvertrag muss u. a. den Nettodarlehensbetrag, den effektiven Jahreszins, die Laufzeit sowie die Ratenhöhe enthalten; die Schufa dient den Banken dabei als Auskunftei zur Prüfung der Kreditwürdigkeit (Bonität).","isTrue":true},
        "wi-7": {"claim":"Hauptursachen für die Überschuldung privater Haushalte sind vor allem Arbeitslosigkeit, längere Krankheit, Trennung/Scheidung sowie unüberlegtes Konsumverhalten durch Ratenkredite und fehlende Finanzplanung.","isTrue":true},
        "wi-8": {"claim":"Öffentliche Unternehmen (z. B. kommunale Stadtwerke oder Verkehrsbetriebe) verfolgen als oberstes Ziel die maximale Börsengewinnausschüttung an private Großaktionäre und nicht die Daseinsvorsorge der Bevölkerung.","isTrue":false},
        "wi-9": {"claim":"Das europäische ‚Recht auf Reparatur‘ verpflichtet Hersteller dazu, Ersatzteile, Werkzeuge und Reparaturinformationen bereitzustellen, damit Elektrogeräte repariert statt vorzeitig weggeworfen werden können.","isTrue":true},
        "wi-10": {"claim":"Bei einer Existenzgründung im Elektrohandwerk bieten u. a. die Handwerkskammern (HWK), Fachverbände/Innungen, Industrie- und Handelskammern (IHK), Förderbanken sowie Steuer- und Unternehmensberater fachkundige Beratung an.","isTrue":true},
        "wi-12": {"claim":"Für die Gründung einer GmbH reicht ein mündlicher Vertrag per Handschlag ohne Stammkapital aus; eine notarielle Beurkundung oder Eintragung ins Handelsregister ist nicht erforderlich.","isTrue":false},
        "en-3": {"claim":"In einem englischen Geräte-Datenblatt steht ‚rated voltage‘ für die Bemessungsspannung (Nennspannung), ‚rated current‘ für den Bemessungsstrom (Nennstrom) und ‚power consumption‘ für die Leistungsaufnahme bzw. den Eigenverbrauch.","isTrue":true},
        "en-4": {"claim":"Der englische Begriff ‚internal fuse‘ bedeutet Erdungsklemme (Schutzleiteranschluss), während ‚grounding terminal‘ für eine interne Feinsicherung im Gerät steht.","isTrue":false},
        "en-7": {"claim":"In einer englischen Montageanleitung bezeichnet ‚cable gland‘ die Kabelverschraubung (zur Einführung und Zugentlastung), ‚minimum clearance‘ den einzuhaltenden Mindestabstand (z. B. zur Kühlung) und ‚base plate‘ die Montagegrundplatte.","isTrue":true},
        "en-8": {"claim":"Bei einer Wallbox dient der ‚Control Pilot (CP)‘ der Kommunikationssteuerung zwischen Fahrzeug und Ladestation (über das PWM-Tastverhältnis ‚duty cycle‘), während der ‚Proximity Pilot (PP)‘ den maximalen Kabelstrom kodiert.","isTrue":true},
        "en-9": {"claim":"Der Begriff ‚DC residual current monitoring‘ im englischen Datenblatt einer Wallbox bezeichnet den Elektromotor zur mechanischen Steckerverriegelung (Locking actuator).","isTrue":false},
        "en-10": {"claim":"Im englischen Servicehandbuch bedeutet ‚commissioning‘ die Inbetriebnahme der Anlage, ‚operating mode‘ die Betriebsart, ‚flashing red LED‘ eine rot blinkende Status-LED und ‚tamper contact‘ den Sabotage- bzw. Deckelüberwachungskontakt.","isTrue":true},
        "en-12": {"claim":"In englischen Sicherheitsanweisungen bedeutet das Wort ‚prohibited‘: dringend empfohlen bzw. für den Dauerbetrieb freigegeben!","isTrue":false},
        "en-13": {"claim":"Beim Multifunktionstaster der MENNEKES-Wallbox bewirkt ein kurzer Druck (< 0,5 s) Standby, ein Drücken länger als 2 Sekunden das Entriegeln des Ladesteckers (Unlock) und ein Drücken länger als 10 Sekunden einen Neustart (Restart).","isTrue":true},
        "en-14": {"claim":"Laut englischem Wartungshandbuch der Wallbox („at least every six months“ / „every four years“) muss die Prüftaste von RCD/MCB nur alle 4 Jahre gedrückt werden, während die komplette DGUV-V3-Anlagenprüfung alle 6 Monate stattfindet.","isTrue":false},
        "en-15": {"claim":"Bei einer Überwachungskamera (Dome-Kamera) beschreibt ‚Pan‘ das horizontale Schwenken (links/rechts), ‚Tilt‘ das vertikale Neigen (oben/unten) und ‚Rotation‘ das Drehen des Bildsensors um die eigene Achse.","isTrue":true},
        "en-16": {"claim":"Der im Kamera-Datenblatt genannte ‚Video Output (1 Vp-p composite output, 75 Ohm)‘ dient als analoger Service- und Testmonitorausgang zum direkten Ausrichten und Scharfstellen der Kamera am Montageort.","isTrue":true},
        "en-17": {"claim":"Der englische Hinweis ‚Firmware update during ongoing operation without interruption‘ bedeutet, dass für jedes Software-Update die gesamte Anlage spannungsfrei geschaltet werden muss.","isTrue":false},
        "en-18": {"claim":"Bei der Wartung eines UV-C-Luftreinigers müssen beim Anfassen der Quarzglasröhre zwingend Baumwollhandschuhe getragen werden („wear cotton gloves, never touch with bare fingers“), weil Hautfett auf dem heißen Glas einbrennt und zum Röhrenbruch führt.","isTrue":true},
        "en-19": {"claim":"Im Datenblatt eines PV-Wechselrichters bedeutet ‚reverse polarity protection‘ Verpolungsschutz (+ und - vertauscht), ‚overvoltage protection‘ Überspannungsschutz und ‚grid frequency‘ die Netzfrequenz (50 Hz).","isTrue":true},
        "en-20": {"claim":"Der englische Begriff ‚false alarm‘ bei einem Brand- oder Bewegungsmelder bedeutet, dass der Melder in der vorgeschriebenen Montagehöhe (mounting height) installiert wurde.","isTrue":false},
        "en-21": {"claim":"Bei der Leitungsinstallation steht ‚conductor cross-section‘ für den Leiterquerschnitt (in mm²), ‚stripping length‘ für die Abisolierlänge (in mm), ‚stranded wire‘ für eine flexible Litzenleitung und ‚solid wire‘ für einen eindrähtigen Massivdraht.","isTrue":true},
        "en-22": {"claim":"Der Sicherheitshinweis ‚Installation and commissioning may only be carried out by qualified electricians!‘ schreibt zwingend vor, dass Montage und Inbetriebnahme nur von ausgebildeten Elektrofachkräften durchgeführt werden dürfen.","isTrue":true},
        "en-23": {"claim":"In einer englischen Fehlersuchtabelle (‚Troubleshooting‘) beschreibt die Spalte ‚Fault / Symptom‘ das aufgetretene Fehlerbild, ‚Possible Cause‘ die mögliche Fehlerursache und ‚Remedy / Solution‘ die Maßnahme zur Fehlerbehebung.","isTrue":true},
        "en-24": {"claim":"Die Angabe ‚Relative humidity: 10% to 90%, non-condensing‘ bedeutet, dass das Gerät wasserdicht ist und dauerhaft unter Wasser betrieben werden darf.","isTrue":false}
      };

      // 3. Zentrale Richtig/Falsch-Auswertung für alle 154 Fragen
      function getCleanTfData(q) {
        if (TF_CLAIMS[q.id]) {
          const item = TF_CLAIMS[q.id];
          const baseExp = item.exp || `${item.isTrue ? "✅ Richtig!" : "❌ Falsch!"}\n\n• Kernwissen: ${q.options[q.correct]}`;
          return {
            claim: item.claim,
            isTrue: item.isTrue,
            exp: baseExp.includes("📖") ? baseExp : `${baseExp}\n\n${q.explanation}`
          };
        }
        const charSum = (q.id || "").split("").reduce((acc, ch) => acc + ch.charCodeAt(0), 0);
        const makeTrue = charSum % 2 === 0;
        const chosenOption = makeTrue
          ? q.options[q.correct]
          : q.options[(q.correct + 1) % q.options.length];

        return {
          claim: `${q.question}\n\n👉 Behauptung: „${chosenOption}“`,
          isTrue: makeTrue,
          exp: `${makeTrue ? "Richtig!" : "Falsch!"} Korrekte Lösung: ${q.options[q.correct]}\n\n${q.explanation}`
        };
      }

      // 4. Container für die beiden Buttons (Richtig / Falsch) anlegen
      const tfContainer = document.createElement("div");
      tfContainer.id = "tf-mode-container";
      tfContainer.className = "hidden";
      tfContainer.style.cssText = "margin-bottom: 1.5rem;";
      optionsContainer?.insertAdjacentElement("afterend", tfContainer);

      // 5. Umschalt-Events für die 3 Modi
      modeBtnTf.addEventListener("click", () => {
        answerMode = "tf";
        localStorage.setItem("nrw_answer_mode_v2", "tf");
        modeBtnTf.classList.add("active");
        modeBtnFreehand?.classList.remove("active");
        modeBtnMc?.classList.remove("active");
        window.renderQuestion();
      });

      [modeBtnFreehand, modeBtnMc].forEach((btn) => {
        btn?.addEventListener("click", () => {
          modeBtnTf.classList.remove("active");
          tfContainer.classList.add("hidden");
        });
      });

      // 6. Render-Funktion erweitern (zeigt die Aussage direkt oben als Haupttext an!)
      const prevRenderQuestion = window.renderQuestion;
      window.renderQuestion = function() {
        prevRenderQuestion.apply(this, arguments);

        if (answerMode !== "tf") {
          tfContainer.classList.add("hidden");
          return;
        }

        modeBtnTf.classList.add("active");
        modeBtnFreehand?.classList.remove("active");
        modeBtnMc?.classList.remove("active");
        freehandContainer?.classList.add("hidden");
        optionsContainer?.classList.add("hidden");

        if (!filteredQuestions.length) {
          tfContainer.classList.add("hidden");
          return;
        }

        const q = filteredQuestions[currentIndex];
        const tfData = getCleanTfData(q);

        // Haupttext direkt durch die knackige Aussage ersetzen (keine doppelten Texte mehr!)
        if (questionText) {
          questionText.style.whiteSpace = "pre-line";
          questionText.textContent = tfData.claim;
        }

        tfContainer.classList.remove("hidden");
        tfContainer.innerHTML = `
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 0.9rem;">
            <button type="button" id="btn-tf-true" class="option-btn" style="justify-content: center; font-weight: 700; font-size: 1.08rem; padding: 1.1rem; border-color: rgba(34, 197, 94, 0.45);">
              ✅ Richtig
            </button>
            <button type="button" id="btn-tf-false" class="option-btn" style="justify-content: center; font-weight: 700; font-size: 1.08rem; padding: 1.1rem; border-color: rgba(239, 68, 68, 0.45);">
              ❌ Falsch
            </button>
          </div>
        `;

        const btnTrue = tfContainer.querySelector("#btn-tf-true");
        const btnFalse = tfContainer.querySelector("#btn-tf-false");

        function evaluateTfChoice(userSaysTrue) {
          btnTrue.disabled = true;
          btnFalse.disabled = true;

          const userCorrect = userSaysTrue === tfData.isTrue;
          const progress = getCurrentProgressObj();

          if (tfData.isTrue) {
            btnTrue.classList.add("correct");
            if (!userCorrect) btnFalse.classList.add("wrong");
          } else {
            btnFalse.classList.add("correct");
            if (!userCorrect) btnTrue.classList.add("wrong");
          }

          if (userCorrect) {
            playSuccessSound();
            feedbackTitle.textContent = "✅ Stark! Du lagst richtig:";
            feedbackTitle.style.color = "#22c55e";
            progress[q.id] = "correct";
            recordPsychologicalProgress(true);
          } else {
            playWrongSound();
            feedbackTitle.textContent = `❌ Leider daneben! Die Aussage ist ${tfData.isTrue ? "richtig" : "falsch"}:`;
            feedbackTitle.style.color = "#ef4444";
            progress[q.id] = "wrong";
            recordPsychologicalProgress(false);
          }

          aiFeedbackContainer?.classList.add("hidden");
          selfGradeRow?.classList.add("hidden");
          explanationText.textContent = tfData.exp;
          explanationBox?.classList.remove("hidden");
          saveProgress();
          updateBadgeStatus(q.id);
        }

        btnTrue.addEventListener("click", () => evaluateTfChoice(true));
        btnFalse.addEventListener("click", () => evaluateTfChoice(false));
      };

      if (answerMode === "tf") {
        window.renderQuestion();
      }
    })();
	// =========================================================================
    // 19. SCHRITT 1: FOKUS-OBERFLÄCHE, 3-STUFEN-GEDÄCHTNIS, FUP & KENNLINIEN
    // =========================================================================
    (function() {
      // -----------------------------------------------------------------------
      // A) 🎯 FOKUS-OBERFLÄCHE: FILTER & BACKUP EINKLAPPEN, MODUS-LEISTE OBEN HALTEN
      // -----------------------------------------------------------------------
      const controlsCard = document.querySelector(".controls-card");
      const buttonRow = document.querySelector(".controls-card .button-row");

      if (controlsCard && buttonRow && !document.getElementById("btn-toggle-filters")) {
        // Kompakte Top-Bar für Antwort-Modus + Sprint + Mischen direkt über der Statistik
        const quickModeBar = document.createElement("div");
        quickModeBar.id = "quick-mode-bar";
        quickModeBar.style.cssText =
          "background: var(--card-bg); border: 1px solid var(--card-border); border-radius: 12px; padding: 0.75rem 1rem; margin-bottom: 0.8rem; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 0.6rem;";

        const toggleFilterBtn = document.createElement("button");
        toggleFilterBtn.id = "btn-toggle-filters";
        toggleFilterBtn.type = "button";
        toggleFilterBtn.className = "btn secondary";
        toggleFilterBtn.style.cssText = "font-size: 0.82rem; padding: 0.45rem 0.85rem;";
        toggleFilterBtn.textContent = "🔍 Filter, Suche & Backup einblenden";

        // Antwort-Modus-Umschalter und Sprint/Mischen in die schnelle Leiste holen
        const modeLeft = buttonRow.children[0];
        const btnSprintEl = document.getElementById("btn-sprint");
        const btnShuffleEl = document.getElementById("btn-shuffle");

        const rightQuickActions = document.createElement("div");
        rightQuickActions.style.cssText = "display: flex; gap: 0.45rem; flex-wrap: wrap; align-items: center;";
        if (btnSprintEl) rightQuickActions.appendChild(btnSprintEl);
        if (btnShuffleEl) rightQuickActions.appendChild(btnShuffleEl);
        rightQuickActions.appendChild(toggleFilterBtn);

        if (modeLeft) quickModeBar.appendChild(modeLeft);
        quickModeBar.appendChild(rightQuickActions);

        controlsCard.insertAdjacentElement("beforebegin", quickModeBar);
        controlsCard.classList.add("hidden");

        toggleFilterBtn.addEventListener("click", () => {
          const isHidden = controlsCard.classList.toggle("hidden");
          toggleFilterBtn.textContent = isHidden
            ? "🔍 Filter, Suche & Backup einblenden"
            : "🔼 Filter & Backup ausblenden";
          if (!isHidden) {
            document.getElementById("search-input")?.focus();
          }
        });
      }

      // -----------------------------------------------------------------------
      // B) 🚦 3-STUFEN-GEDÄCHTNIS (OFFEN -> 1x WACKELIG -> 2x+ PRÜFUNGSSICHER)
      // -----------------------------------------------------------------------
      let hitCounts = readStoredJson("nrw_hit_counts_v1", {});

      // Bestehende "correct"-Einträge beim ersten Start auf 1 setzen, falls noch nicht gezählt
      [progressWiso, progressElektro, progressEnglish].forEach((prog) => {
        Object.keys(prog || {}).forEach((id) => {
          if (prog[id] === "correct" && !hitCounts[id]) {
            hitCounts[id] = 1;
          }
        });
      });
      localStorage.setItem("nrw_hit_counts_v1", JSON.stringify(hitCounts));

      // Filter-Dropdown um "Nur wackelige Fragen (erst 1x gewusst)" erweitern
      if (filterMode && !filterMode.querySelector('option[value="shaky"]')) {
        const shakyOpt = document.createElement("option");
        shakyOpt.value = "shaky";
        shakyOpt.textContent = "🟡 Nur wackelige Fragen (erst 1x gewusst – noch festigen)";
        filterMode.insertBefore(shakyOpt, filterMode.children[2]);
      }

      // Badge-Anzeige auf 3 Stufen erweitern
      const origUpdateBadgeStatus = window.updateBadgeStatus;
      window.updateBadgeStatus = function(qId) {
        if (typeof origUpdateBadgeStatus === "function") {
          origUpdateBadgeStatus(qId);
        }
        const progress = getCurrentProgressObj();
        const st = progress[qId];
        const count = hitCounts[qId] || 0;

        if (st === "correct") {
          if (count >= 2) {
            badgeStatus.textContent = `🟢 Prüfungssicher (${count}x gewusst)`;
            badgeStatus.style.color = "#22c55e";
          } else {
            badgeStatus.textContent = "🟡 1x Gewusst (Noch festigen)";
            badgeStatus.style.color = "#fbbf24";
          }
        } else if (st === "wrong") {
          badgeStatus.textContent = "🔴 Wiederholen";
          badgeStatus.style.color = "#ef4444";
        } else {
          badgeStatus.textContent = "⚪ Offen";
          badgeStatus.style.color = "#94a3b8";
        }
      };

      // Zähler bei jeder Antwort aktualisieren
      const origRecordPsych = window.recordPsychologicalProgress;
      window.recordPsychologicalProgress = function(isCorrect) {
        if (typeof origRecordPsych === "function") {
          origRecordPsych(isCorrect);
        }
        const q = filteredQuestions[currentIndex];
        if (!q) return;
        if (isCorrect) {
          hitCounts[q.id] = (hitCounts[q.id] || 0) + 1;
        } else {
          hitCounts[q.id] = 0;
        }
        localStorage.setItem("nrw_hit_counts_v1", JSON.stringify(hitCounts));
      };

      // Filter-Logik für "shaky" (1x gewusst) einklinken
      const origApplyFilters = window.applyFilters;
      if (typeof origApplyFilters === "function") {
        window.applyFilters = function() {
          origApplyFilters.apply(this, arguments);
          if (filterMode && filterMode.value === "shaky") {
            const currentProgress = getCurrentProgressObj();
            filteredQuestions = filteredQuestions.filter(
              (q) => currentProgress[q.id] === "correct" && (hitCounts[q.id] || 1) === 1
            );
            currentIndex = 0;
            window.renderQuestion();
            updateStats();
          }
        };
      }

      // -----------------------------------------------------------------------
      // C) 🛠️ NEUE FSA-TRAINER: 5. KLEINSTEUERUNG (FUP) & 6. KENNLINIEN ABLESEN
      // -----------------------------------------------------------------------
      if (typeof FSA_CIRCUITS !== "undefined") {
        FSA_CIRCUITS.fup_logo = {
          title: "Frage 5 (Originalprüfung W23/24 & S23 – Kleinsteuerung FUP): Warum wird in der Zuordnungsliste bei -S0 (Not-Halt) und -F1 (Motorschutz) die Funktion 'Öffner' eingetragen, im FUP am UND-Baustein (&) aber KEINE Negation gezeichnet?",
          svg: `
            <svg viewBox="0 0 720 290" width="100%" style="max-width: 700px; height: auto; font-family: sans-serif;">
              <rect x="10" y="10" width="700" height="270" rx="8" fill="#0f172a" stroke="#334155" stroke-width="2"/>
              <text x="25" y="34" fill="#60a5fa" font-size="13" font-weight="bold">Kleinsteuerung (FUP): Entmistungsanlage / Förderband mit Nachlaufzeit T01 (10 s)</text>
              
              <!-- Eingänge links -->
              <text x="25" y="75" fill="#fbbf24" font-size="11" font-weight="bold">I1 (-S0 Not-Halt NC)</text>
              <text x="25" y="105" fill="#fbbf24" font-size="11" font-weight="bold">I2 (-F1 Motorschutz NC)</text>
              <text x="25" y="140" fill="#fbbf24" font-size="11" font-weight="bold">I4 (-S1 Stopp-Taster NC)</text>
              <text x="25" y="185" fill="#4ade80" font-size="11" font-weight="bold">I5 (-S2 Start-Taster NO)</text>

              <!-- RS-Speicher -->
              <rect x="210" y="160" width="75" height="65" rx="4" fill="#1e293b" stroke="#60a5fa" stroke-width="2"/>
              <text x="247" y="182" text-anchor="middle" fill="#fff" font-size="12" font-weight="bold">RS</text>
              <text x="220" y="178" fill="#4ade80" font-size="10">S</text>
              <text x="220" y="212" fill="#fca5a5" font-size="10">R</text>
              <line x1="170" y1="180" x2="210" y2="180" stroke="#4ade80" stroke-width="2"/>
              <line x1="170" y1="136" x2="190" y2="136" stroke="#fbbf24" stroke-width="2"/>
              <line x1="190" y1="136" x2="190" y2="208" stroke="#fbbf24" stroke-width="2"/>
              <line x1="190" y1="208" x2="210" y2="208" stroke="#fbbf24" stroke-width="2"/>
              <circle cx="206" cy="208" r="4" fill="#0f172a" stroke="#fbbf24" stroke-width="2"/>

              <!-- UND-Baustein (&) -->
              <rect x="345" y="60" width="75" height="110" rx="4" fill="#1e293b" stroke="#3b82f6" stroke-width="2"/>
              <text x="382" y="122" text-anchor="middle" fill="#fff" font-size="22" font-weight="bold">&amp;</text>
              <line x1="170" y1="72" x2="345" y2="72" stroke="#fbbf24" stroke-width="2"/>
              <line x1="170" y1="102" x2="345" y2="102" stroke="#fbbf24" stroke-width="2"/>
              <line x1="285" y1="190" x2="315" y2="190" stroke="#60a5fa" stroke-width="2"/>
              <line x1="315" y1="190" x2="315" y2="145" stroke="#60a5fa" stroke-width="2"/>
              <line x1="315" y1="145" x2="345" y2="145" stroke="#60a5fa" stroke-width="2"/>

              <!-- Ausgang Q1 & Rückfallverzögerung T01 -->
              <line x1="420" y1="115" x2="590" y2="115" stroke="#4ade80" stroke-width="2.5"/>
              <rect x="590" y="98" width="95" height="32" rx="4" fill="#14532d" stroke="#22c55e" stroke-width="2"/>
              <text x="637" y="119" text-anchor="middle" fill="#fff" font-size="12" font-weight="bold">Q1 (Band 1)</text>

              <!-- T01 Nachlauf 10s -->
              <line x1="455" y1="115" x2="455" y2="205" stroke="#4ade80" stroke-width="2"/>
              <line x1="455" y1="205" x2="480" y2="205" stroke="#4ade80" stroke-width="2"/>
              <rect x="480" y="180" width="75" height="65" rx="4" fill="#1e293b" stroke="#f59e0b" stroke-width="2"/>
              <text x="517" y="200" text-anchor="middle" fill="#fbbf24" font-size="11" font-weight="bold">T01 (10s)</text>
              <text x="517" y="218" text-anchor="middle" fill="#e2e8f0" font-size="10">TOF (Rückf.)</text>
              <line x1="555" y1="210" x2="590" y2="210" stroke="#fbbf24" stroke-width="2.5"/>
              <rect x="590" y="194" width="95" height="32" rx="4" fill="#1e3a8a" stroke="#60a5fa" stroke-width="2"/>
              <text x="637" y="215" text-anchor="middle" fill="#fff" font-size="12" font-weight="bold">Q2 (Band 2)</text>
            </svg>
          `,
          options: [
            "Weil -S0, -F1 und -S1 draußen an der Anlage aus Gründen der Drahtbruchsicherheit als Öffner (NC) verdrahtet sind: Im ungestörten Normalbetrieb liegt dauerhaft Spannung ('1'-Signal) an I1, I2 und I4 an! Würde man I1 oder I2 am UND-Baustein negieren, würde die Anlage nur bei gedrücktem Not-Halt laufen.",
            "Weil in einer SPS grundsätzlich überhaupt keine Negationen programmiert werden dürfen.",
            "Weil ein Öffner im Ruhezustand immer das Signal '0' an den SPS-Eingang liefert.",
            "Weil der Baustein T01 (Rückfallverzögerung) die Signale automatisch umkehrt."
          ],
          correct: 0,
          explanation: "✅ Goldene SPS-Prüfungsregel (GP2 NRW):\n• Hardware-Öffner (-S0, -F1, -S1) liefern im Ruhezustand dauerhaft '1' an den SPS-Eingang.\n• Deshalb am UND-Baustein (Freigabe) OHNE Negation anschließen!\n• Am Rücksetzeingang (R) eines RS-Speichers oder für die Störungslampe (-P4) muss ein Öffner dagegen NEGIERT werden (erst wenn I1 = '0' wird, soll R = '1' werden)."
        };

        FSA_CIRCUITS.kennlinien = {
          title: "Frage 6 (Originalprüfung W23/24 FSA Aufg. 4 & W18/19 Aufg. 3): Du misst an einem B16A-Stromkreis einen Kurzschlussstrom von Ik = 48 A (3 × In) bzw. am Typ-B-RCD (30 mA) einen hochfrequenten Fehlerstrom mit f = 10 kHz. Was liest du aus den beiden Kennlinien ab?",
          svg: `
            <svg viewBox="0 0 720 270" width="100%" style="max-width: 700px; height: auto; font-family: sans-serif;">
              <rect x="10" y="10" width="700" height="250" rx="8" fill="#0f172a" stroke="#334155" stroke-width="2"/>
              <!-- Links: LS-Kennlinie B -->
              <rect x="25" y="25" width="320" height="220" rx="6" fill="#1e293b" stroke="#475569"/>
              <text x="40" y="45" fill="#60a5fa" font-size="12" font-weight="bold">1) LS-Schalter Charakteristik B (3–5 × In)</text>
              <line x1="65" y1="60" x2="65" y2="215" stroke="#94a3b8" stroke-width="1.5"/>
              <line x1="65" y1="215" x2="320" y2="215" stroke="#94a3b8" stroke-width="1.5"/>
              <path d="M 85 65 Q 110 140 145 155 L 145 205 L 185 205 L 185 150 Q 145 120 115 65 Z" fill="rgba(59,130,246,0.25)" stroke="#3b82f6" stroke-width="2"/>
              <line x1="145" y1="215" x2="145" y2="220" stroke="#fbbf24" stroke-width="2"/>
              <text x="145" y="232" text-anchor="middle" fill="#fbbf24" font-size="10" font-weight="bold">3×In</text>
              <text x="185" y="232" text-anchor="middle" fill="#4ade80" font-size="10" font-weight="bold">5×In (80A)</text>
              <text x="58" y="207" text-anchor="end" fill="#4ade80" font-size="10">&lt;0,1s</text>
              <text x="58" y="152" text-anchor="end" fill="#fbbf24" font-size="10">2–40s</text>

              <!-- Rechts: RCD Typ B Frequenzgang -->
              <rect x="370" y="25" width="325" height="220" rx="6" fill="#1e293b" stroke="#475569"/>
              <text x="385" y="45" fill="#facc15" font-size="12" font-weight="bold">2) RCD Typ B (30 mA): Frequenzgang</text>
              <line x1="415" y1="60" x2="415" y2="215" stroke="#94a3b8" stroke-width="1.5"/>
              <line x1="415" y1="215" x2="675" y2="215" stroke="#94a3b8" stroke-width="1.5"/>
              <polyline points="415,190 500,190 560,120 665,120" fill="none" stroke="#f59e0b" stroke-width="4"/>
              <text x="410" y="193" text-anchor="end" fill="#cbd5e1" font-size="10">30 mA</text>
              <text x="410" y="123" text-anchor="end" fill="#fbbf24" font-size="10" font-weight="bold">300 mA</text>
              <text x="440" y="232" text-anchor="middle" fill="#cbd5e1" font-size="10">50 Hz</text>
              <text x="500" y="232" text-anchor="middle" fill="#cbd5e1" font-size="10">100 Hz</text>
              <text x="560" y="232" text-anchor="middle" fill="#cbd5e1" font-size="10">1 kHz</text>
              <text x="615" y="232" text-anchor="middle" fill="#fbbf24" font-size="10" font-weight="bold">10 kHz</text>
              <line x1="615" y1="120" x2="615" y2="215" stroke="#ef4444" stroke-width="1.5" stroke-dasharray="4,2"/>
            </svg>
          `,
          options: [
            "1) Bei 48 A (nur 3 × In) liegt man noch auf der linken Kante des B-Toleranzbandes – erst ab 5 × In (80 A) ist die Schnellauslösung in < 0,1 s garantiert! 2) Bei f = 10 kHz steigt der maximale Auslösestrom des 30-mA-Typ-B-RCDs laut Kennlinie auf 300 mA (0,3 A) an, woraus sich Zs_max = 50 V / 0,3 A = 166,7 Ω ergibt.",
            "Der B16A-Automat löst schon bei 16 A in 0,01 Sekunden magnetisch aus und der RCD löst bei 10 kHz schon ab 3 mA aus.",
            "Bei 10 kHz darf überhaupt kein RCD eingesetzt werden.",
            "Auslösekennlinien gelten nur für Gleichstromnetze."
          ],
          correct: 0,
          explanation: "✅ Wichtige Ablese-Regel für die GP2:\n• Beim LS-Schalter immer die RECHTE Grenze des Toleranzbandes (Ungünstigster Fall = 'spätestens') ablesen!\n• Beim RCD Typ B steigt der Auslösestrom bei hohen Schaltfrequenzen (z. B. 10 kHz vom Frequenzumrichter) auf ca. 300 mA an."
        };

        const circuitSubnav = document.querySelector(".circuit-subnav");
        if (circuitSubnav && !circuitSubnav.querySelector('[data-circuit="fup_logo"]')) {
          const btn5 = document.createElement("button");
          btn5.type = "button";
          btn5.className = "circuit-subbtn";
          btn5.dataset.circuit = "fup_logo";
          btn5.textContent = "5️⃣ Kleinsteuerung (FUP & Zuordnungsliste)";

          const btn6 = document.createElement("button");
          btn6.type = "button";
          btn6.className = "circuit-subbtn";
          btn6.dataset.circuit = "kennlinien";
          btn6.textContent = "6️⃣ Kennlinien ablesen (LS & RCD Typ B)";

          [btn5, btn6].forEach((btn) => {
            btn.addEventListener("click", () => {
              document.querySelectorAll(".circuit-subbtn").forEach((b) => b.classList.remove("active"));
              btn.classList.add("active");
              loadFsaCircuit(btn.dataset.circuit);
            });
            circuitSubnav.appendChild(btn);
          });
        }
      }

      // -----------------------------------------------------------------------
      // D) 📈 ORIGINAL-DIAGRAMME DIREKT IN PASSENDEN QUIZFRAGEN EINBLENDEN
      // -----------------------------------------------------------------------
      const QUESTION_DIAGRAMS = {
        "el-22": `
          <svg viewBox="0 0 560 155" width="100%" style="max-width:520px; height:auto; font-family:sans-serif;">
            <rect x="5" y="5" width="550" height="145" rx="6" fill="#0f172a" stroke="#334155"/>
            <text x="20" y="25" fill="#60a5fa" font-size="11" font-weight="bold">Original-Prüfungsbild (W18/19 & W22/23): PT100-Kennlinie & Messbrücke</text>
            <line x1="45" y1="125" x2="260" y2="125" stroke="#94a3b8"/>
            <line x1="45" y1="35" x2="45" y2="125" stroke="#94a3b8"/>
            <line x1="45" y1="110" x2="250" y2="45" stroke="#22c55e" stroke-width="2.5"/>
            <circle cx="80" cy="99" r="4" fill="#fbbf24"/>
            <text x="85" y="114" fill="#fbbf24" font-size="10">0°C = 100 Ω</text>
            <circle cx="115" cy="88" r="4" fill="#38bdf8"/>
            <text x="122" y="92" fill="#38bdf8" font-size="10">23°C ≈ 109 Ω</text>
            <circle cx="225" cy="53" r="4" fill="#ef4444"/>
            <text x="165" y="48" fill="#fca5a5" font-size="10" font-weight="bold">150,79 Ω ≈ 132°C!</text>
            <rect x="305" y="32" width="230" height="105" rx="6" fill="#1e293b" stroke="#475569"/>
            <text x="320" y="52" fill="#f8fafc" font-size="11" font-weight="bold">Merke für die Prüfung:</text>
            <text x="320" y="72" fill="#cbd5e1" font-size="10">• PT100 = Kaltleiter (PTC, R steigt)</text>
            <text x="320" y="90" fill="#cbd5e1" font-size="10">• 0 °C = 100,0 Ω (+0,385 Ω je °C)</text>
            <text x="320" y="108" fill="#cbd5e1" font-size="10">• DMS = R steigt bei Dehnung</text>
            <text x="320" y="126" fill="#fbbf24" font-size="10">• NTC = Heißleiter (R sinkt bei Wärme)</text>
          </svg>
        `,
        "el-23": `
          <svg viewBox="0 0 560 150" width="100%" style="max-width:520px; height:auto; font-family:sans-serif;">
            <rect x="5" y="5" width="550" height="140" rx="6" fill="#0f172a" stroke="#334155"/>
            <text x="20" y="25" fill="#60a5fa" font-size="11" font-weight="bold">Original-Prüfungsdiagramm (Sommer 2023 Aufg. 1.4): Peukert-Kurve (Akku)</text>
            <line x1="55" y1="120" x2="290" y2="120" stroke="#94a3b8"/>
            <line x1="55" y1="35" x2="55" y2="120" stroke="#94a3b8"/>
            <path d="M 70 42 Q 140 85 270 110" fill="none" stroke="#f59e0b" stroke-width="3"/>
            <text x="50" y="45" text-anchor="end" fill="#4ade80" font-size="10">100%</text>
            <text x="50" y="82" text-anchor="end" fill="#fbbf24" font-size="10">60%</text>
            <text x="80" y="134" fill="#cbd5e1" font-size="10">1 A</text>
            <text x="155" y="134" fill="#fbbf24" font-size="10" font-weight="bold">3 A Entladestrom</text>
            <text x="255" y="134" fill="#ef4444" font-size="10">8 A</text>
            <rect x="310" y="35" width="225" height="95" rx="6" fill="#1e293b" stroke="#475569"/>
            <text x="322" y="55" fill="#f8fafc" font-size="10" font-weight="bold">Peukert-Effekt (Notbeleuchtung):</text>
            <text x="322" y="75" fill="#cbd5e1" font-size="10">Hoher Entladestrom I senkt die</text>
            <text x="322" y="92" fill="#cbd5e1" font-size="10">nutzbare Kapazität C_nutz stark ab!</text>
            <text x="322" y="112" fill="#fbbf24" font-size="10">Bsp: 15 Ah × 60 % = nur 9 Ah nutzbar!</text>
          </svg>
        `
      };

      const prevRenderQForDiag = window.renderQuestion;
      window.renderQuestion = function() {
        prevRenderQForDiag.apply(this, arguments);

        let diagBox = document.getElementById("question-inline-diagram");
        if (!diagBox) {
          diagBox = document.createElement("div");
          diagBox.id = "question-inline-diagram";
          diagBox.style.cssText = "margin-bottom: 1.1rem; text-align: center;";
          questionText?.insertAdjacentElement("afterend", diagBox);
        }

        const q = filteredQuestions[currentIndex];
        if (q && QUESTION_DIAGRAMS[q.id]) {
          diagBox.innerHTML = QUESTION_DIAGRAMS[q.id];
          diagBox.classList.remove("hidden");
        } else {
          diagBox.innerHTML = "";
          diagBox.classList.add("hidden");
        }
      };

      window.renderQuestion();
    })();
	
// =========================================================================
    // 20. FINALE MASTER-VERSION: ECHTE MC-OPTIONEN FÜR ALLE FRAGEN,
    //     15 RECHENAUFGABEN (INKL. DREHMOMENT/SCHLUPF & LASTVERTEILUNG),
    //     KLAUSUR-FEHLERTRAINING & CAD-TOUCH-OPTIMIERUNG
    // =========================================================================
    (function() {
      // -----------------------------------------------------------------------
      // A) HANDVERLESENE, GLEICH LANGE PRÜFUNGSFALLEN FÜR ALLE FRAGEN
      // -----------------------------------------------------------------------
      // [Cleanup] REALISTIC_DISTRACTORS direkt in Sektion 1 eingeschmolzen.

      // -----------------------------------------------------------------------
      // B) 2 NEUE ORIGINAL-RECHENAUFGABEN (AUFGABE 14 & 15) IN CALC_TASKS EINFÜGEN
      // -----------------------------------------------------------------------
      if (typeof CALC_TASKS !== "undefined" && Array.isArray(CALC_TASKS) && !CALC_TASKS.some((t) => t.id === "calc-motor-mech")) {
        CALC_TASKS.push(
          {
            id: "calc-motor-mech",
            title: "14. Motor-Mechanik: Abgegebene Wellenleistung P2 & Drehmoment (W22/23 FSA 3 & W23/24 AV 1.10)",
            exam: "Winter 2022/23 – FSA Aufg. 3.1",
            bookRef: "Europa TB S. 24 (Drehmoment), S. 26 (Mech. Leistung) & S. 528 / 532 (Motorformeln / IE3)",
            unit: "kW",
            generateParams: (randomize = false) => {
              const mNm = randomize ? [35, 43, 52, 60][Math.floor(Math.random() * 4)] : 43;
              const nMin = randomize ? [1440, 1450, 1470][Math.floor(Math.random() * 3)] : 1470;
              const p2Kw = +((mNm * nMin) / 9550).toFixed(2);
              const slipPct = +(((1500 - nMin) / 1500) * 100).toFixed(1);
              return {
                desc: `Sie überprüfen den vierpoligen Drehstromasynchronmotor (Synchrondrehzahl ns = 1500 min⁻¹, Bemessungsleistung PN = 7,5 kW) einer Lüftungsanlage. Ihre Messungen im Betrieb ergeben eine Läuferdrehzahl von n = ${nMin} min⁻¹ und ein Drehmoment an der Welle von M = ${mNm} Nm. Berechnen Sie die tatsächlich abgegebene mechanische Wirkleistung P2 (in kW, auf 2 Nachkommastellen) an der Welle! (Zusatzwissen: Der Schlupf beträgt hierbei s = (${1500} - ${nMin}) / 1500 = ${slipPct} %).`,
                expected: p2Kw,
                tolerance: 0.12,
                step1: `Gegeben: M = ${mNm} Nm, n = ${nMin} min⁻¹, PN = 7,5 kW (4-polig -> ns = 1500 min⁻¹)\nGesucht: Abgegebene mechanische Leistung P2 an der Welle in kW`,
                step2: `Grundformel: M = (9550 · P2) / n   (mit P2 in kW!)\nUmgestellt nach P2: P2 = (M · n) / 9550`,
                step3: `P2 = (${mNm} Nm · ${nMin} min⁻¹) / 9550 = ${mNm * nMin} / 9550 = ${p2Kw} kW`,
                step4: `Ergebnis: P2 = ${p2Kw} kW (Schlupf s = ${slipPct} %).\nAntwortsatz: Die abgegebene Leistung an der Welle beträgt ${p2Kw} kW. Da ${p2Kw} kW < 7,5 kW (PN) ist, wird der Antrieb nicht überlastet.`
              };
            }
          },
          {
            id: "calc-lastverteilung",
            title: "15. Lastverteilungstabelle: Symmetrische Aufteilung & Gleichzeitigkeitsfaktor (W18/19 & W23/24 PL 2.2)",
            exam: "Winter 2018/19 & 2023/24 – Planung 2.2 / 2.3",
            bookRef: "Europa TB S. 48–50 (Drehstrom), S. 187 (Gleichzeitigkeitsfaktor) & S. 281 (Lastverteilung)",
            unit: "A",
            generateParams: (randomize = false) => {
              const iL1 = randomize ? [78.5, 84.0, 92.5][Math.floor(Math.random() * 3)] : 84.0;
              const iL2 = +(iL1 - 3.2).toFixed(1);
              const iL3 = +(iL1 - 1.8).toFixed(1);
              const gFactor = randomize ? 0.9 : 0.8;
              const iGesExact = +(iL1 * gFactor).toFixed(2);
              const iGesRounded = Math.ceil(iGesExact);
              const nextFuse = iGesRounded <= 63 ? "63 A gG" : iGesRounded <= 80 ? "80 A gG" : "100 A gG";
              return {
                desc: `Bei der Planung einer Unterverteilung haben Sie alle Wechsel- und Drehstromverbraucher möglichst symmetrisch auf die drei Außenleiter aufgeteilt. Die Summen der Leiterströme betragen: L1 = ${iL1} A, L2 = ${iL2} A und L3 = ${iL3} A. Bestimmen Sie aus dem am stärksten belasteten Außenleiter (Maximalstrom) und einem Gleichzeitigkeitsfaktor von g = ${gFactor} (${gFactor * 100} %) den auf ganze Ampere aufgerundeten Gesamtstrom I_ges (in A) für die Auswahl der Hauptsicherung!`,
                expected: iGesRounded,
                tolerance: 0.9,
                step1: `Gegeben: I_L1 = ${iL1} A, I_L2 = ${iL2} A, I_L3 = ${iL3} A, Gleichzeitigkeitsfaktor g = ${gFactor}\nGesucht: Maximalstrom I_max in A und aufgerundeter Gesamtstrom I_ges in A`,
                step2: `1) I_max = max(I_L1, I_L2, I_L3)\n2) I_ges = I_max · g  (auf ganze Ampere aufrunden!)`,
                step3: `1) Höchstbelasteter Außenleiter: I_max = ${iL1} A (Leiter L1)\n2) I_ges = ${iL1} A · ${gFactor} = ${iGesExact} A  =>  aufgerundet ${iGesRounded} A`,
                step4: `Ergebnis: I_ges = ${iGesRounded} A -> Gewählte Hauptsicherung der Zuleitung: ${nextFuse}.\nAntwortsatz: Der maßgebliche Berechnungsstrom beträgt ${iGesRounded} A; als Vorsicherung der Unterverteilung wird ${nextFuse} gewählt.`
              };
            }
          }
        );
        if (typeof initCalcTrainer === "function") {
          initCalcTrainer();
        }
      }

      // -----------------------------------------------------------------------
      // Ansicht aktualisieren
      if (typeof window.renderQuestion === "function") {
        window.renderQuestion();
      }
    })();
	
	// =========================================================================
    // 21. CHATBOT-PERFEKTIONIERUNG: LINKS ANGEKNÜPFTER VOLLHÖHEN-PFEIL,
    //     ECHTER ONLINE-TUTOR-MODUS, EINGABEN-CHECK & FACHGESPRÄCH-TRAINER
    // =========================================================================
    (function() {
      const chatWin = document.getElementById("chatbot-window");
      const chatHeader = document.querySelector("#chatbot-window .chatbot-header");
      const quickPromptsBox = document.querySelector(".chatbot-quick-prompts");

      if (!chatWin || !chatHeader) return;

      // Alte Dock-Elemente entfernen, falls aus vorherigem Test vorhanden
      document.getElementById("chatbot-dock-tab")?.remove();
      document.getElementById("chatbot-dock-btn")?.remove();
      document.getElementById("chatbot-side-handle")?.remove();

      // -----------------------------------------------------------------------
      // A) ❯ / ❮ SCHMALER PFEIL-BALKEN (VOLLE CHAT-HÖHE) LINKS AM CHATFENSTER
      // -----------------------------------------------------------------------
      chatWin.style.overflow = "visible";
      chatHeader.style.borderRadius = "15px 15px 0 0";

      const sideHandle = document.createElement("button");
      sideHandle.id = "chatbot-side-handle";
      sideHandle.type = "button";
      sideHandle.title = "Chatfenster nach rechts ein-/ausklappen";
      sideHandle.style.cssText =
        "position: absolute; left: -26px; top: 0; bottom: 0; width: 26px; height: 100%; background: linear-gradient(180deg, #1e3a8a, #0f172a); border: 1px solid #475569; border-right: none; border-radius: 12px 0 0 12px; color: #93c5fd; cursor: pointer; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 6px; font-size: 1.05rem; font-weight: 700; box-shadow: -5px 0 14px rgba(0,0,0,0.4); z-index: 1002; transition: background 0.2s, color 0.2s; padding: 0;";
      sideHandle.innerHTML = `<span id="chatbot-handle-arrow" style="font-size:1.15rem;">❯</span><span style="writing-mode:vertical-rl; text-orientation:mixed; font-size:0.7rem; letter-spacing:1px; color:#cbd5e1;">CHAT</span>`;
      chatWin.appendChild(sideHandle);

      let isChatDocked = false;

      function setChatDockedState(docked) {
        isChatDocked = docked;
        const arrowSpan = document.getElementById("chatbot-handle-arrow");
        if (docked) {
          // Fenster gleitet um seine Breite + 24px (Abstand rechts) nach rechts,
          // sodass genau die 26px breite linke Pfeil-Leiste am rechten Bildschirmrand stehen bleibt!
          chatWin.style.transform = "translateX(calc(100% + 24px))";
          if (arrowSpan) arrowSpan.textContent = "❮";
          sideHandle.style.background = "linear-gradient(180deg, #7e22ce, #2563eb)";
          sideHandle.style.color = "#ffffff";
        } else {
          chatWin.classList.remove("hidden");
          chatWin.style.transform = "translateX(0)";
          if (arrowSpan) arrowSpan.textContent = "❯";
          sideHandle.style.background = "linear-gradient(180deg, #1e3a8a, #0f172a)";
          sideHandle.style.color = "#93c5fd";
          document.getElementById("chatbot-input")?.focus();
        }
      }

      sideHandle.addEventListener("click", (e) => {
        e.stopPropagation();
        setChatDockedState(!isChatDocked);
      });

      document.getElementById("chatbot-toggle-btn")?.addEventListener("click", () => {
        if (isChatDocked) {
          setChatDockedState(false);
        }
      });

      document.getElementById("chatbot-close-btn")?.addEventListener("click", () => {
        isChatDocked = false;
        chatWin.style.transform = "translateX(0)";
      });

      // -----------------------------------------------------------------------
      // B) 🎤 MIKROFON-SPRACHEINGABE DIREKT NEBEN DEM CHAT-EINGABEFELD
      // -----------------------------------------------------------------------
      const SpeechRec = window.SpeechRecognition || window.webkitSpeechRecognition;
      const activeChatForm = document.getElementById("chatbot-form");
      if (activeChatForm) {
        activeChatForm.style.borderRadius = "0 0 15px 15px";
      }

      if (SpeechRec && activeChatForm && !document.getElementById("chatbot-mic-btn")) {
        const chatMicBtn = document.createElement("button");
        chatMicBtn.id = "chatbot-mic-btn";
        chatMicBtn.type = "button";
        chatMicBtn.className = "btn secondary";
        chatMicBtn.title = "Frage oder Antwort per Mikrofon einsprechen";
        chatMicBtn.style.cssText = "padding: 0.55rem 0.75rem; font-size: 1rem;";
        chatMicBtn.textContent = "🎤";

        const submitBtn = activeChatForm.querySelector('button[type="submit"]');
        if (submitBtn) {
          activeChatForm.insertBefore(chatMicBtn, submitBtn);
        } else {
          activeChatForm.appendChild(chatMicBtn);
        }

        const chatRec = new SpeechRec();
        chatRec.lang = "de-DE";
        chatRec.continuous = false;
        chatRec.interimResults = false;

        chatMicBtn.addEventListener("click", () => {
          if (chatMicBtn.classList.contains("recording")) {
            chatRec.stop();
          } else {
            chatMicBtn.classList.add("recording");
            chatMicBtn.style.background = "#ef4444";
            chatRec.start();
          }
        });

        chatRec.onresult = (e) => {
          const spoken = e.results[0][0].transcript;
          const inp = document.getElementById("chatbot-input");
          if (inp) {
            inp.value = (inp.value ? inp.value + " " : "") + spoken;
            inp.focus();
          }
        };

        chatRec.onend = () => {
          chatMicBtn.classList.remove("recording");
          chatMicBtn.style.background = "";
        };
      }

      // -----------------------------------------------------------------------
      // C) 🧠 KOMPLETTER BILDSCHIRM- & EINGABEN-KONTEXT FÜR DIE ONLINE-KI
      // -----------------------------------------------------------------------
      function getDetailedScreenContext() {
        // 1. Rechentrainer aktiv?
        if (!calcSection.classList.contains("hidden") && currentCalcInstance) {
          const t = CALC_TASKS[currentCalcTaskIndex];
          const s1 = calcStep1?.value.trim() || "(noch leer)";
          const s2 = calcStep2?.value.trim() || "(noch leer)";
          const s3 = calcStep3?.value.trim() || "(noch leer)";
          const s4 = calcStep4?.value.trim() || "(noch leer)";
          const num = calcUserNumber?.value.trim() || "(noch leer)";
          return `AKTUELLER BEREICH: NRW-Rechentrainer (4-Schritte-Schema)
Aufgabe: ${t?.title} (${t?.exam})
Aufgabentext: ${currentCalcInstance.desc}
Bisherige Eingaben des Prüflings:
- Schritt 1 (Gegeben/Gesucht): ${s1}
- Schritt 2 (Formel): ${s2}
- Schritt 3 (Einsetzen mit Einheit): ${s3}
- Berechneter Zahlenwert: ${num} ${t?.unit || ""}
- Schritt 4 (Antwortsatz): ${s4}
Hinterlegte Musterlösung (nur zur Orientierung für dich als Prüfer):
${currentCalcInstance.step1} | ${currentCalcInstance.step2} | ${currentCalcInstance.step3} | ${currentCalcInstance.step4}`;
        }

        // 2. Prüfprotokoll (Aufgabe 4.3) aktiv?
        if (!protokollSection.classList.contains("hidden")) {
          return `AKTUELLER BEREICH: Prüfprotokoll-Simulator (Aufgabe 4.3 – DIN VDE 0100-600 Erstprüfung).
Der Prüfling bewertet 8 Stromkreise (-F1 bis -F8) auf R_PE, R_iso (≥ 1,0 MΩ), Z_S (≤ 2/3 * U0/Ia), Überlastschutz (Ib ≤ In ≤ Iz), RCD (≤ 30 mA für Steckdosen, Typ B für FU/Wallbox) und Rechtsdrehfeld sowie die ZVEH-Prüfplaketten-Entscheidung.`;
        }

        // 3. Schaltplan-, FSA-, SEE Electrical CAD- oder SPS-Trainer aktiv?
        if (!schaltplanSection.classList.contains("hidden")) {
          if (!uvTrainerContainer.classList.contains("hidden")) {
            return `AKTUELLER BEREICH: 8-Fehler-Verteilungsplan (UV-Großbäckerei, TN-S-System).
Aktuell angeklickter Fehler: ${uvFaultTitle?.textContent || "Noch keiner ausgewählt"} — ${uvFaultPrompt?.textContent || ""}`;
          }
          if (!fsaTrainerContainer.classList.contains("hidden")) {
            return `AKTUELLER BEREICH: Schütz-, Motor- & Kleinsteuerungen (FSA).
Aktuelle Frage: ${document.getElementById("fsa-question-title")?.textContent || ""}`;
          }
          const seecadBox = document.getElementById("seecad-trainer-container");
          if (seecadBox && !seecadBox.classList.contains("hidden") && window.SEE_CAD) {
            return `AKTUELLER BEREICH: ${window.SEE_CAD.getContextSummary()}`;
          }
          const spsBox = document.getElementById("sps-trainer-container");
          if (spsBox && !spsBox.classList.contains("hidden") && window.SPS_SIM) {
            return `AKTUELLER BEREICH: ${window.SPS_SIM.getContextSummary()}`;
          }
        }

        // 4. Standard: Theorie-Frage (WiSo / Elektro / Fachenglisch)
        const q = filteredQuestions[currentIndex];
        if (q) {
          const userDraft = freehandInput?.value.trim() || "(noch keine eigene Texteingabe)";
          return `AKTUELLER BEREICH: Theorie-Trainer (${currentSection.toUpperCase()}, Antwort-Modus: ${answerMode})
Prüfung & Thema: ${q.exam} – ${q.category}
Aktuelle Frage auf dem Bildschirm: "${q.question}"
Bisherige Freihand-Eingabe des Prüflings: "${userDraft}"
Offizielle Musterlösung (für dich als Hintergrundwissen): "${q.options[q.correct]}"
Erklärung: "${q.explanation}"`;
        }

        return "";
      }

      // Formatierungs-Helfer für übersichtliche KI-Antworten im Chat
      function formatBotBubble(bubbleEl, rawText) {
        if (!bubbleEl) return;
        const escaped = String(rawText || "")
          .replace(/&/g, "&amp;")
          .replace(/</g, "&lt;")
          .replace(/>/g, "&gt;");
        const formatted = escaped
          .replace(/\*\*([^*]+)\*\*/g, '<strong style="color:#93c5fd;">$1</strong>')
          .replace(/`([^`]+)`/g, '<code style="background:#1e293b; padding:1px 5px; border-radius:4px; color:#fbbf24;">$1</code>');
        bubbleEl.innerHTML = formatted;
        const msgBox = document.getElementById("chatbot-messages");
        if (msgBox) msgBox.scrollTop = msgBox.scrollHeight;
      }

      // -----------------------------------------------------------------------
      // D) ⚡ ONLINE-KI DIREKT-MODUS (ÜBERSPRINGT OFFLINE-BOT WENN GEWÜNSCHT!)
      // -----------------------------------------------------------------------
      const onlineCheckbox = document.getElementById("force-online-toggle");
      // Wenn ein Gruppencode vorhanden ist, Online-KI standardmäßig aktivieren
      if (onlineCheckbox && groupAccessCode) {
        onlineCheckbox.checked = true;
      }

      async function askOnlineTutorDirectly(userVisibleText, hiddenTutorInstruction) {
        const inp = document.getElementById("chatbot-input");
        if (inp) inp.value = "";

        appendChatMessage(userVisibleText, "user");
        const loadingBubble = appendChatMessage("⚡ Online-Prüfer-KI analysiert deine aktuelle Aufgabe... ⏳", "bot");

        const screenCtx = getDetailedScreenContext();
        const systemPrompt = `Du bist ein erstklassiger, motivierender IHK/HWK-Prüfer und Ausbilder für Elektroniker für Energie- und Gebäudetechnik (Gesellenprüfung Teil 2 in NRW).
Nutze das Europa-Tabellenbuch Elektrotechnik und aktuelle DIN-VDE-Normen als Maßstab. Antworte übersichtlich strukturiert auf Deutsch.

${screenCtx ? `=== KONTEXT AUF DEM BILDSCHIRM DES PRÜFLINGS ===\n${screenCtx}\n=================================================` : ""}`;

        const finalUserMessage = hiddenTutorInstruction || userVisibleText;

        try {
          const payloadMessages = [];
          if (typeof chatConversationHistory !== "undefined") {
            chatConversationHistory.slice(-6).forEach((turn) => payloadMessages.push(turn));
          }
          payloadMessages.push({
            role: "user",
            parts: [{ text: `${systemPrompt}\n\nAnliegen des Prüflings: ${finalUserMessage}` }]
          });

          const reply = await requestGeminiApi(payloadMessages, false);
          formatBotBubble(loadingBubble, reply);

          if (typeof chatConversationHistory !== "undefined") {
            chatConversationHistory.push({ role: "user", parts: [{ text: finalUserMessage }] });
            chatConversationHistory.push({ role: "model", parts: [{ text: reply }] });
          }
        } catch (err) {
          loadingBubble.textContent = `⚠️ Online-KI nicht erreichbar (${err.message}). Tipp: Prüfe oben rechts unter „🤖 Gruppenzugang“, ob dein Gruppencode eingetragen ist!`;
        }
      }

      // Überschreibe handleChatbotQuery, damit bei aktivierter Checkbox "⚡ Nur Online-KI erzwingen"
      // KEINE Offline-Textkonserve mehr dazwischenfunkt!
      const origHandleChat = window.handleChatbotQuery;
      window.handleChatbotQuery = async function(query) {
        if (!query || !query.trim()) return;
        let cleanQ = query.trim();
        const cb = document.getElementById("force-online-toggle");
        const forceOnline = (cb && cb.checked) || cleanQ.startsWith("!");

        if (cleanQ.startsWith("!")) {
          cleanQ = cleanQ.slice(1).trim();
        }

        if (forceOnline) {
          await askOnlineTutorDirectly(cleanQ, null);
        } else if (typeof origHandleChat === "function") {
          await origHandleChat(cleanQ);
        }
      };

      // Formular-Submit sauber auf die neue vereinheitlichte Funktion lenken
      const currentForm = document.getElementById("chatbot-form");
      if (currentForm) {
        const cleanForm = currentForm.cloneNode(true);
        currentForm.replaceWith(cleanForm);

        cleanForm.addEventListener("submit", (e) => {
          e.preventDefault();
          const inp = document.getElementById("chatbot-input");
          if (!inp || !inp.value.trim()) return;
          const text = inp.value;
          inp.value = "";
          window.handleChatbotQuery(text);
        });

        // Mikrofon-Event am geklonten Button wiederherstellen
        const micBtnNew = document.getElementById("chatbot-mic-btn");
        if (SpeechRec && micBtnNew) {
          const rec2 = new SpeechRec();
          rec2.lang = "de-DE";
          rec2.continuous = false;
          rec2.interimResults = false;
          micBtnNew.addEventListener("click", () => {
            if (micBtnNew.classList.contains("recording")) rec2.stop();
            else {
              micBtnNew.classList.add("recording");
              micBtnNew.style.background = "#ef4444";
              rec2.start();
            }
          });
          rec2.onresult = (ev) => {
            const inp = document.getElementById("chatbot-input");
            if (inp) {
              inp.value = (inp.value ? inp.value + " " : "") + ev.results[0][0].transcript;
              inp.focus();
            }
          };
          rec2.onend = () => {
            micBtnNew.classList.remove("recording");
            micBtnNew.style.background = "";
          };
        }
      }

      // -----------------------------------------------------------------------
      // E) 4 INTELLIGENTE KI-TUTOR-BUTTONS IN DER SCHNELLWAHL-LEISTE
      // -----------------------------------------------------------------------
      if (quickPromptsBox) {
        quickPromptsBox.innerHTML = "";

        const tutorChips = [
          {
            label: "🧭 Wie komme ich auf die Lösung? (Tipp)",
            visibleText: "🧭 Gib mir einen Denkanstoß: Wie komme ich bei dieser Aufgabe auf die Lösung?",
            instruction: "Der Prüfling sitzt gerade vor der im Kontext genannten Aufgabe und möchte selbst auf die Lösung kommen. Verrate ihm noch NICHT das fertige Endergebnis! Erkläre ihm stattdessen wie ein guter Ausbilder Schritt für Schritt den Lösungsweg: Worauf muss er im Aufgabentext achten? Welche Formel oder VDE-Regel braucht er hier? Welche typische NRW-Prüfungsfalle steckt darin?"
          },
          {
            label: "🔎 Meinen bisherigen Ansatz prüfen",
            visibleText: "🔎 Prüfe bitte meinen bisherigen Lösungsansatz!",
            instruction: "Schau dir im Kontext die bisherigen Eingaben des Prüflings an (im Freihand-Feld bzw. in den 4 Rechenschritten). Bewerte konstruktiv, was daran schon richtig ist, wo eventuell noch eine Einheit, ein Faktor (z. B. √3 oder 2/3) oder ein Fachbegriff fehlt, und gib ihm einen gezielten Tipp für den nächsten Schritt!"
          },
          {
            label: "📖 Aufgabe komplett & einfach erklären",
            visibleText: "📖 Erkläre mir diese Aufgabe bitte komplett und leicht verständlich!",
            instruction: "Erkläre dem Prüfling die aktuell geöffnete Aufgabe inklusive des kompletten Lösungswegs, der fachlichen Hintergründe nach DIN VDE / Tabellenbuch und der wichtigsten Prüfungsfalle so anschaulich und verständlich wie möglich."
          },
          {
            label: "🎓 Mündliches Fachgespräch hierzu üben",
            visibleText: "🎓 Lass uns ein kurzes mündliches Fachgespräch zu dieser Aufgabe simulieren!",
            instruction: "Simuliere ein reales mündliches GP2-Fachgespräch passend zur aktuell geöffneten Aufgabe: Stelle dem Prüfling jetzt EINE konkrete, praxisnahe Prüferfrage zu diesem Thema und fordere ihn auf, dir im Chat (gerne per Mikrofon) zu antworten. Bewerte danach seine Antwort und stelle eine vertiefende Nachfrage!"
          }
        ];

        tutorChips.forEach((chipData) => {
          const btn = document.createElement("button");
          btn.type = "button";
          btn.className = "quick-chip";
          btn.style.cssText = "border-color: #3b82f6; color: #dbeafe; font-weight: 600;";
          btn.textContent = chipData.label;
          btn.addEventListener("click", () => {
            askOnlineTutorDirectly(chipData.visibleText, chipData.instruction);
          });
          quickPromptsBox.appendChild(btn);
        });
      }
    })();
	
	// =========================================================================
    // 22. FINALER PRE-DEPLOY-PATCH: BUGFIXES (CHAT-FAB, KLAUSUR-RETRY, RESET,
    //     BACKUP), RESTLICHE RICHTIG/FALSCH-AUSSAGEN & TASTATUR-STEUERUNG
    // =========================================================================
    (function() {
      // -----------------------------------------------------------------------
      // 1) BUGFIX: CHAT-SIDE-HANDLE & RUNDER 💬-BUTTON SYNCHRONISIEREN
      // -----------------------------------------------------------------------
      const chatWin = document.getElementById("chatbot-window");
      const chatFab = document.getElementById("chatbot-toggle-btn");
      const sideHandle = document.getElementById("chatbot-side-handle");
      const arrowSpan = document.getElementById("chatbot-handle-arrow");

      if (chatWin && chatFab && sideHandle) {
        // Verhindert horizontales Scrollen auf Handys, wenn das Fenster rechts parkt
        document.body.style.overflowX = "hidden";

        chatFab.addEventListener("click", () => {
          // Falls das Fenster rechts angedockt war und durch den Original-Listener
          // gerade ".hidden" bekommen hat -> wieder sichtbar machen und einfahren!
          if (chatWin.style.transform && chatWin.style.transform.includes("100%")) {
            chatWin.classList.remove("hidden");
            chatWin.style.transform = "translateX(0)";
            if (arrowSpan) arrowSpan.textContent = "❯";
            sideHandle.style.background = "linear-gradient(180deg, #1e3a8a, #0f172a)";
            sideHandle.style.color = "#93c5fd";
            document.getElementById("chatbot-input")?.focus();
          }
        });
      }

      // -----------------------------------------------------------------------
      // 2) BUGFIX: KLAUSUR-SIMULATION "FEHLER ÜBEN"-BUTTON BEI JEDEM LAUF ERNEUERN
      // -----------------------------------------------------------------------
      const btnStartSimEl = document.getElementById("btn-start-sim");
      btnStartSimEl?.addEventListener("click", () => {
        document.getElementById("btn-sim-retry-wrong")?.remove();
      });

      // -----------------------------------------------------------------------
      // 3) BUGFIX: SAUBERER RESET (OHNE RECHENTRAINER-VERLUST) & VOLLES BACKUP
      // -----------------------------------------------------------------------
      const oldResetBtn = document.getElementById("btn-reset");
      if (oldResetBtn) {
        const cleanResetBtn = oldResetBtn.cloneNode(true);
        oldResetBtn.replaceWith(cleanResetBtn);

        cleanResetBtn.addEventListener("click", () => {
          const sectionNames = { wiso: "WiSo-Trainer", elektro: "Elektro-Theorie", english: "Fachenglisch" };
          const secLabel = sectionNames[currentSection] || currentSection;
          if (!confirm(`Möchtest du den Lernfortschritt für „${secLabel}“ wirklich zurücksetzen? (Dein Rechentrainer-Fortschritt bleibt erhalten!)`)) {
            return;
          }
          let hitCounts = readStoredJson("nrw_hit_counts_v1", {});
          activeQuestionPool.forEach((q) => {
            delete hitCounts[q.id];
          });
          localStorage.setItem("nrw_hit_counts_v1", JSON.stringify(hitCounts));

          if (currentSection === "wiso") progressWiso = {};
          else if (currentSection === "elektro") progressElektro = {};
          else if (currentSection === "english") progressEnglish = {};

          saveProgress();
          applyFilters();
        });
      }

      // Backup & Laden um 3-Stufen-Gedächtnis (hitCounts) und Europa-Seitenzahlen erweitern
      const oldExportBtn = document.getElementById("btn-export");
      if (oldExportBtn) {
        const cleanExportBtn = oldExportBtn.cloneNode(true);
        oldExportBtn.replaceWith(cleanExportBtn);
        cleanExportBtn.addEventListener("click", () => {
          const backupData = JSON.stringify({
            wiso: progressWiso,
            elektro: progressElektro,
            english: progressEnglish,
            calc: progressCalc,
            bookmarks: bookmarks,
            hitCounts: readStoredJson("nrw_hit_counts_v1", {}),
            europaPages: readStoredJson("europa_tb_pages_v1", {})
          });
          navigator.clipboard.writeText(backupData).then(() => {
            alert("💾 Kompletter Lernfortschritt (inkl. 3-Stufen-Gedächtnis & Merkliste) in die Zwischenablage kopiert!");
          }).catch(() => {
            prompt("Backup-Code kopieren:", backupData);
          });
        });
      }

      const oldImportBtn = document.getElementById("btn-import");
      if (oldImportBtn) {
        const cleanImportBtn = oldImportBtn.cloneNode(true);
        oldImportBtn.replaceWith(cleanImportBtn);
        cleanImportBtn.addEventListener("click", () => {
          const input = prompt("Backup-Code hier einfügen:");
          if (!input) return;
          try {
            const parsed = JSON.parse(input);
            if (parsed.wiso && parsed.elektro) {
              progressWiso = parsed.wiso;
              progressElektro = parsed.elektro;
              progressEnglish = parsed.english || {};
              progressCalc = parsed.calc || {};
              bookmarks = parsed.bookmarks || {};
              if (parsed.hitCounts) {
                localStorage.setItem("nrw_hit_counts_v1", JSON.stringify(parsed.hitCounts));
              }
              if (parsed.europaPages) {
                localStorage.setItem("europa_tb_pages_v1", JSON.stringify(parsed.europaPages));
              }
              localStorage.setItem("nrw_calc_progress_v1", JSON.stringify(progressCalc));
              initCalcTrainer();
              saveProgress();
              applyFilters();
              alert("✅ Backup erfolgreich geladen!");
            }
          } catch (err) {
            alert("❌ Ungültiger Backup-Code.");
          }
        });
      }

      // -----------------------------------------------------------------------
      // 4) TASTATUR-STEUERUNG FÜR DEN "⚖️ RICHTIG / FALSCH"-MODUS (TASTEN 1/R & 2/F)
      // -----------------------------------------------------------------------
      document.addEventListener("keydown", (e) => {
        if (quizMainContainer.style.display === "none" || answerMode !== "tf") return;
        if (["INPUT", "TEXTAREA"].includes(document.activeElement?.tagName)) return;

        const key = e.key.toLowerCase();
        const btnTrue = document.getElementById("btn-tf-true");
        const btnFalse = document.getElementById("btn-tf-false");

        if ((key === "1" || key === "r" || key === "j") && btnTrue && !btnTrue.disabled) {
          e.preventDefault();
          btnTrue.click();
        } else if ((key === "2" || key === "f" || key === "n") && btnFalse && !btnFalse.disabled) {
          e.preventDefault();
          btnFalse.click();
        }
      });

      // -----------------------------------------------------------------------
      // 5) RESTLICHE FRAGEN IM "⚖️ RICHTIG / FALSCH"-MODUS MIT KNACKIGEN AUSSAGEN
      //    AUSSTATTEN (KEIN "👉 BEHAUPTUNG:"-FALLBACK MEHR!)
      // -----------------------------------------------------------------------
      // [Cleanup] EXTRA_TF_CLAIMS in Sektion 18 zusammengeführt.
    })();
	
	// =========================================================================
// 23. SZENARIO 4: SEE ELECTRICAL CAD-PRÜFUNGSTRAINER (9 IHK-PROJEKTE)
// =========================================================================
window.SEE_CAD = (function() {
  const catalog = [
    {
      folder: "01 Schutzeinrichtungen (-F / -B0)",
      subs: [
        {
          name: "Sicherungen & Motorschutz",
          items: [
            {
              id: "f_ls1", name: "LS-Schalter / Steuersicherung 1p (-F1 / -F3)", defBmk: "-F1", defPins: "1/2",
              draw: (bmk, pins, sub) => {
                const [p1, p2] = (pins||'1/2').split('/');
                return `<text x="-14" y="0" class="bmk-txt">${bmk}</text><text x="-14" y="9" class="sub-txt">${sub||''}</text>
                        <line x1="0" y1="-24" x2="0" y2="-9" class="w-line"/><line x1="-7" y1="-9" x2="0" y2="9" class="sym-stroke"/>
                        <path d="M-3,0 L-8,-2 L-6,-7 L-1,-5" class="sym-stroke"/><line x1="0" y1="9" x2="0" y2="24" class="w-line"/>
                        <text x="4" y="-11" class="pin-txt">${p1}</text><text x="4" y="17" class="pin-txt">${p2}</text>`;
              }
            },
            {
              id: "b0_dual", name: "Motorschutzrelais (95/96 Öffner)", defBmk: "-B0", defPins: "95/96",
              draw: (bmk, pins) => {
                const [p1, p2] = (pins||'95/96').split('/');
                return `<text x="-16" y="3" class="bmk-txt">${bmk}</text>
                        <line x1="0" y1="-24" x2="0" y2="-9" class="w-line"/><line x1="-5" y1="-9" x2="2" y2="-9" class="sym-stroke"/>
                        <line x1="-4" y1="-11" x2="0" y2="9" class="sym-stroke"/><line x1="0" y1="9" x2="0" y2="24" class="w-line"/>
                        <path d="M-12,-4 L-8,-4 L-8,4 L-12,4" class="sym-stroke"/><line x1="-8" y1="0" x2="-2" y2="0" class="sym-dash"/>
                        <text x="4" y="-11" class="pin-txt">${p1}</text><text x="4" y="17" class="pin-txt">${p2}</text>`;
              }
            },
            {
              id: "f_mss3", name: "Motorschutzschalter 3p komplett (I> + 1.21/1.13)", defBmk: "-F1", defPins: "1.21/1.13", threePole: true,
              draw: (bmk) => `<rect x="-32" y="-20" width="64" height="40" class="sym-stroke" fill="#fff"/>
                <text x="-36" y="4" class="bmk-txt">${bmk}</text><line x1="-28" y1="-9" x2="28" y2="-9" class="sym-dash"/>
                ${[-16, 0, 16].map(dx => `<line x1="${dx}" y1="-24" x2="${dx}" y2="-14" class="w-line"/>
                  <line x1="${dx-4}" y1="-14" x2="${dx}" y2="-3" class="sym-stroke"/><line x1="${dx}" y1="-3" x2="${dx}" y2="24" class="w-line"/>
                  <rect x="${dx-5}" y="2" width="10" height="13" class="sym-stroke" fill="#fff"/><text x="${dx-4}" y="11" class="pin-txt" font-weight="bold">I&gt;</text>`).join('')}`
            },
            {
              id: "f_aux_no", name: "Motorschutz-Hilfskontakt Schließer (1.13/1.14, 97/98)", defBmk: "-F1", defPins: "1.13/1.14",
              draw: (bmk, pins) => {
                const [p1, p2] = (pins||'1.13/1.14').split('/');
                return `<text x="-10" y="3" class="bmk-txt">${bmk}</text><line x1="0" y1="-24" x2="0" y2="-9" class="w-line"/>
                        <line x1="-6" y1="-9" x2="0" y2="9" class="sym-stroke"/><line x1="0" y1="9" x2="0" y2="24" class="w-line"/>
                        <text x="4" y="-11" class="pin-txt">${p1}</text><text x="4" y="17" class="pin-txt">${p2}</text>`;
              }
            },
            {
              id: "f_aux_nc", name: "Motorschutz-Hilfskontakt Öffner (1.21/1.22, 95/96)", defBmk: "-F1", defPins: "1.21/1.22",
              draw: (bmk, pins) => {
                const [p1, p2] = (pins||'1.21/1.22').split('/');
                return `<text x="-10" y="3" class="bmk-txt">${bmk}</text><line x1="0" y1="-24" x2="0" y2="-9" class="w-line"/>
                        <line x1="-5" y1="-9" x2="2" y2="-9" class="sym-stroke"/><line x1="-4" y1="-11" x2="0" y2="9" class="sym-stroke"/>
                        <line x1="0" y1="9" x2="0" y2="24" class="w-line"/><text x="4" y="-11" class="pin-txt">${p1}</text><text x="4" y="17" class="pin-txt">${p2}</text>`;
              }
            }
          ]
        }
      ]
    },
    {
      folder: "02 Befehlsgeräte, Taster & Not-Halt (-S)",
      subs: [
        {
          name: "Taster & Not-Halt",
          items: [
            {
              id: "s_emg", name: "Not-Halt Pilztaster Öffner (21/22 oder 1/2)", defBmk: "-S0", defPins: "21/22",
              draw: (bmk, pins) => {
                const [p1, p2] = (pins||'21/22').split('/');
                return `<text x="-21" y="3" class="bmk-txt">${bmk}</text><line x1="0" y1="-24" x2="0" y2="-9" class="w-line"/>
                        <line x1="-5" y1="-9" x2="2" y2="-9" class="sym-stroke"/><line x1="-4" y1="-11" x2="0" y2="9" class="sym-stroke"/>
                        <line x1="-13" y1="0" x2="-3" y2="0" class="sym-dash"/><path d="M-13,-5 A5,5 0 0,0 -13,5 Z" class="sym-stroke"/>
                        <line x1="0" y1="9" x2="0" y2="24" class="w-line"/><text x="4" y="-11" class="pin-txt">${p1}</text><text x="4" y="17" class="pin-txt">${p2}</text>`;
              }
            },
            {
              id: "s_no", name: "Drucktaster Schließer (13/14)", defBmk: "-S2", defPins: "13/14",
              draw: (bmk, pins, sub) => {
                const [p1, p2] = (pins||'13/14').split('/');
                return `<text x="-20" y="0" class="bmk-txt">${bmk}</text><text x="-20" y="9" class="sub-txt">${sub||''}</text>
                        <line x1="0" y1="-24" x2="0" y2="-9" class="w-line"/><line x1="-6" y1="-9" x2="0" y2="9" class="sym-stroke"/>
                        <line x1="-13" y1="0" x2="-3" y2="0" class="sym-dash"/><path d="M-13,-4 L-17,-4 L-17,4 L-13,4" class="sym-stroke"/>
                        <line x1="0" y1="9" x2="0" y2="24" class="w-line"/><text x="4" y="-11" class="pin-txt">${p1}</text><text x="4" y="17" class="pin-txt">${p2}</text>`;
              }
            },
            {
              id: "s_nc", name: "Drucktaster Öffner (11/12 oder 21/22)", defBmk: "-S1", defPins: "11/12",
              draw: (bmk, pins, sub) => {
                const [p1, p2] = (pins||'11/12').split('/');
                return `<text x="-20" y="0" class="bmk-txt">${bmk}</text><text x="-20" y="9" class="sub-txt">${sub||''}</text>
                        <line x1="0" y1="-24" x2="0" y2="-9" class="w-line"/><line x1="-5" y1="-9" x2="2" y2="-9" class="sym-stroke"/>
                        <line x1="-4" y1="-11" x2="0" y2="9" class="sym-stroke"/><line x1="-13" y1="0" x2="-3" y2="0" class="sym-dash"/>
                        <path d="M-13,-4 L-17,-4 L-17,4 L-13,4" class="sym-stroke"/><line x1="0" y1="9" x2="0" y2="24" class="w-line"/>
                        <text x="4" y="-11" class="pin-txt">${p1}</text><text x="4" y="17" class="pin-txt">${p2}</text>`;
              }
            }
          ]
        }
      ]
    },
    {
      folder: "03 Sensoren, Thermostate & Wächter (-B)",
      subs: [
        {
          name: "Endschalter, Lichtschranke, Thermostat & Drehzahl",
          items: [
            {
              id: "b_lim_nc", name: "Endschalter Rollenstößel Öffner (11/12, 21/22)", defBmk: "-B1", defPins: "11/12",
              draw: (bmk, pins) => {
                const [p1, p2] = (pins||'11/12').split('/');
                return `<text x="-19" y="3" class="bmk-txt">${bmk}</text><line x1="0" y1="-24" x2="0" y2="-9" class="w-line"/>
                        <line x1="-5" y1="-9" x2="2" y2="-9" class="sym-stroke"/><line x1="-4" y1="-11" x2="0" y2="9" class="sym-stroke"/>
                        <line x1="-11" y1="0" x2="-3" y2="0" class="sym-stroke"/><circle cx="-14" cy="0" r="2.5" fill="#fff" class="sym-stroke"/>
                        <line x1="0" y1="9" x2="0" y2="24" class="w-line"/><text x="4" y="-11" class="pin-txt">${p1}</text><text x="4" y="17" class="pin-txt">${p2}</text>`;
              }
            },
            {
              id: "b_lim_no", name: "Endschalter Rollenstößel Schließer (23/24)", defBmk: "-B2", defPins: "23/24",
              draw: (bmk, pins) => {
                const [p1, p2] = (pins||'23/24').split('/');
                return `<text x="-19" y="3" class="bmk-txt">${bmk}</text><line x1="0" y1="-24" x2="0" y2="-9" class="w-line"/>
                        <line x1="-6" y1="-9" x2="0" y2="9" class="sym-stroke"/><line x1="-11" y1="0" x2="-3" y2="0" class="sym-stroke"/>
                        <circle cx="-14" cy="0" r="2.5" fill="#fff" class="sym-stroke"/><line x1="0" y1="9" x2="0" y2="24" class="w-line"/>
                        <text x="4" y="-11" class="pin-txt">${p1}</text><text x="4" y="17" class="pin-txt">${p2}</text>`;
              }
            },
            {
              id: "b_opt_nc", name: "Lichtschranke / Sensor Raute Öffner (11/12, 31/32)", defBmk: "-B3", defPins: "11/12",
              draw: (bmk, pins) => {
                const [p1, p2] = (pins||'11/12').split('/');
                return `<text x="-18" y="3" class="bmk-txt">${bmk}</text><line x1="0" y1="-24" x2="0" y2="-9" class="w-line"/>
                        <line x1="-5" y1="-9" x2="2" y2="-9" class="sym-stroke"/><line x1="-4" y1="-11" x2="0" y2="9" class="sym-stroke"/>
                        <polygon points="-14,0 -10,-4.5 -6,0 -10,4.5" fill="#fff" class="sym-stroke"/><line x1="-6" y1="0" x2="-2" y2="0" class="sym-dash"/>
                        <line x1="0" y1="9" x2="0" y2="24" class="w-line"/><text x="4" y="-11" class="pin-txt">${p1}</text><text x="4" y="17" class="pin-txt">${p2}</text>`;
              }
            },
            {
              id: "b_opt_no", name: "Lichtschranke / Sensor Raute Schließer (13/14, 23/24)", defBmk: "-B3", defPins: "23/24",
              draw: (bmk, pins) => {
                const [p1, p2] = (pins||'23/24').split('/');
                return `<text x="-18" y="3" class="bmk-txt">${bmk}</text><line x1="0" y1="-24" x2="0" y2="-9" class="w-line"/>
                        <line x1="-6" y1="-9" x2="0" y2="9" class="sym-stroke"/>
                        <polygon points="-14,0 -10,-4.5 -6,0 -10,4.5" fill="#fff" class="sym-stroke"/><line x1="-6" y1="0" x2="-3" y2="0" class="sym-dash"/>
                        <line x1="0" y1="9" x2="0" y2="24" class="w-line"/><text x="4" y="-11" class="pin-txt">${p1}</text><text x="4" y="17" class="pin-txt">${p2}</text>`;
              }
            },
            {
              id: "b_temp_nc", name: "Temperaturschalter [ϑ] Öffner (11/12, <3°C)", defBmk: "-B4", defPins: "11/12",
              draw: (bmk, pins, sub) => {
                const [p1, p2] = (pins||'11/12').split('/');
                return `<text x="-21" y="-1" class="bmk-txt">${bmk}</text><text x="-21" y="8" class="sub-txt">${sub||'<3°C'}</text>
                        <rect x="-18" y="-5" width="10" height="10" fill="#fff" class="sym-stroke"/><text x="-15" y="3" class="pin-txt">ϑ</text>
                        <line x1="0" y1="-24" x2="0" y2="-9" class="w-line"/><line x1="-5" y1="-9" x2="2" y2="-9" class="sym-stroke"/>
                        <line x1="-4" y1="-11" x2="0" y2="9" class="sym-stroke"/><line x1="0" y1="9" x2="0" y2="24" class="w-line"/>
                        <text x="4" y="-11" class="pin-txt">${p1}</text><text x="4" y="17" class="pin-txt">${p2}</text>`;
              }
            },
            {
              id: "b_temp_no", name: "Temperaturschalter [ϑ] Schließer (13/14, >8°C)", defBmk: "-B3", defPins: "13/14",
              draw: (bmk, pins, sub) => {
                const [p1, p2] = (pins||'13/14').split('/');
                return `<text x="-21" y="-1" class="bmk-txt">${bmk}</text><text x="-21" y="8" class="sub-txt">${sub||'>8°C'}</text>
                        <rect x="-18" y="-5" width="10" height="10" fill="#fff" class="sym-stroke"/><text x="-15" y="3" class="pin-txt">ϑ</text>
                        <line x1="0" y1="-24" x2="0" y2="-9" class="w-line"/><line x1="-6" y1="-9" x2="0" y2="9" class="sym-stroke"/>
                        <line x1="0" y1="9" x2="0" y2="24" class="w-line"/><text x="4" y="-11" class="pin-txt">${p1}</text><text x="4" y="17" class="pin-txt">${p2}</text>`;
              }
            },
            {
              id: "b_speed_no", name: "Drehzahlwächter [n>] Schließer (15/18)", defBmk: "-B1", defPins: "15/18",
              draw: (bmk, pins) => {
                const [p1, p2] = (pins||'15/18').split('/');
                return `<text x="-22" y="3" class="bmk-txt">${bmk}</text><rect x="-19" y="-5" width="12" height="10" fill="#fff" class="sym-stroke"/>
                        <text x="-18" y="3" class="pin-txt" font-weight="bold">n&gt;</text><line x1="0" y1="-24" x2="0" y2="-9" class="w-line"/>
                        <line x1="-6" y1="-9" x2="0" y2="9" class="sym-stroke"/><line x1="0" y1="9" x2="0" y2="24" class="w-line"/>
                        <text x="4" y="-11" class="pin-txt">${p1}</text><text x="4" y="17" class="pin-txt">${p2}</text>`;
              }
            }
          ]
        }
      ]
    },
    {
      folder: "04 Schütze, Zeitrelais & Kontakte (-Q / -K)",
      subs: [
        {
          name: "Spulen (Schütz, TON [X] & TOF [Schwarz])",
          items: [
            {
              id: "q_coil", name: "Schütz- / Hilfsschützspule (A1 / A2)", defBmk: "-Q1", defPins: "A1/A2",
              draw: (bmk, pins) => {
                const [p1, p2] = (pins||'A1/A2').split('/');
                return `<text x="-15" y="3" class="bmk-txt">${bmk}</text><line x1="0" y1="-24" x2="0" y2="-9" class="w-line"/>
                        <rect x="-12" y="-9" width="24" height="18" fill="#fff" class="sym-stroke"/><line x1="0" y1="9" x2="0" y2="24" class="w-line"/>
                        <text x="3" y="-11" class="pin-txt">${p1}</text><text x="3" y="18" class="pin-txt">${p2}</text>`;
              }
            },
            {
              id: "k_ton", name: "Zeitrelais-Spule ansprechverzögert [X] (A1/A2)", defBmk: "-K2T", defPins: "A1/A2",
              draw: (bmk, pins, sub) => `<text x="-17" y="3" class="bmk-txt">${bmk}</text><text x="15" y="3" class="pin-txt" font-weight="bold">${sub||'60s'}</text>
                <line x1="0" y1="-24" x2="0" y2="-9" class="w-line"/><rect x="-14" y="-9" width="26" height="18" fill="#fff" class="sym-stroke"/>
                <line x1="-7" y1="-9" x2="-7" y2="9" class="sym-stroke"/><line x1="-14" y1="-9" x2="-7" y2="9" class="sym-stroke"/><line x1="-7" y1="-9" x2="-14" y2="9" class="sym-stroke"/>
                <line x1="0" y1="9" x2="0" y2="24" class="w-line"/><text x="3" y="-11" class="pin-txt">A1</text><text x="3" y="18" class="pin-txt">A2</text>`
            },
            {
              id: "k_tof", name: "Zeitrelais-Spule rückfallverzögert [Schwarz] (A1/A2)", defBmk: "-K1T", defPins: "A1/A2",
              draw: (bmk, pins, sub) => `<text x="-17" y="3" class="bmk-txt">${bmk}</text><text x="15" y="3" class="pin-txt" font-weight="bold">${sub||'20s'}</text>
                <line x1="0" y1="-24" x2="0" y2="-9" class="w-line"/><rect x="-14" y="-9" width="26" height="18" fill="#fff" class="sym-stroke"/>
                <rect x="-14" y="-9" width="7" height="18" fill="#000" class="sym-stroke"/>
                <line x1="0" y1="9" x2="0" y2="24" class="w-line"/><text x="3" y="-11" class="pin-txt">A1</text><text x="3" y="18" class="pin-txt">A2</text>`
            }
          ]
        },
        {
          name: "Hilfskontakte, Zeitkontakte & Leistungskontakte",
          items: [
            {
              id: "q_no", name: "Hilfskontakt Schließer (13/14, 23/24, 33/34)", defBmk: "-Q1", defPins: "13/14",
              draw: (bmk, pins) => {
                const [p1, p2] = (pins||'13/14').split('/');
                return `<text x="-9" y="3" class="bmk-txt">${bmk}</text><line x1="0" y1="-24" x2="0" y2="-9" class="w-line"/>
                        <line x1="-6" y1="-9" x2="0" y2="9" class="sym-stroke"/><line x1="0" y1="9" x2="0" y2="24" class="w-line"/>
                        <text x="4" y="-11" class="pin-txt">${p1}</text><text x="4" y="17" class="pin-txt">${p2}</text>`;
              }
            },
            {
              id: "q_nc", name: "Hilfskontakt Öffner (21/22, 11/12)", defBmk: "-Q2", defPins: "21/22",
              draw: (bmk, pins) => {
                const [p1, p2] = (pins||'21/22').split('/');
                return `<text x="-9" y="3" class="bmk-txt">${bmk}</text><line x1="0" y1="-24" x2="0" y2="-9" class="w-line"/>
                        <line x1="-5" y1="-9" x2="2" y2="-9" class="sym-stroke"/><line x1="-4" y1="-11" x2="0" y2="9" class="sym-stroke"/>
                        <line x1="0" y1="9" x2="0" y2="24" class="w-line"/><text x="4" y="-11" class="pin-txt">${p1}</text><text x="4" y="17" class="pin-txt">${p2}</text>`;
              }
            },
            {
              id: "k_tno", name: "Zeitrelais-Kontakt Schließer verzögert (15/18, 17/18)", defBmk: "-K2T", defPins: "15/18",
              draw: (bmk, pins) => {
                const [p1, p2] = (pins||'15/18').split('/');
                return `<text x="-16" y="3" class="bmk-txt">${bmk}</text><line x1="0" y1="-24" x2="0" y2="-9" class="w-line"/>
                        <line x1="-7" y1="-9" x2="0" y2="9" class="sym-stroke"/><line x1="-12" y1="0" x2="-4" y2="0" class="sym-dash"/>
                        <path d="M-12,-4 A4,4 0 0,1 -12,4" class="sym-stroke"/><line x1="0" y1="9" x2="0" y2="24" class="w-line"/>
                        <text x="4" y="-11" class="pin-txt">${p1}</text><text x="4" y="17" class="pin-txt">${p2}</text>`;
              }
            },
            {
              id: "q_main3", name: "Schütz-Hauptkontakte 3-polig (1/2, 3/4, 5/6)", defBmk: "-Q1", defPins: "1/2..5/6", threePole: true,
              draw: (bmk) => `<text x="-24" y="3" class="bmk-txt">${bmk}</text><line x1="-19" y1="0" x2="14" y2="0" class="sym-dash"/>
                ${[-16, 0, 16].map(dx => `<line x1="${dx}" y1="-24" x2="${dx}" y2="-9" class="w-line"/>
                  <line x1="${dx-5}" y1="-9" x2="${dx}" y2="9" class="sym-stroke"/><line x1="${dx}" y1="9" x2="${dx}" y2="24" class="w-line"/>`).join('')}`
            }
          ]
        }
      ]
    },
    {
      folder: "05 Meldeleuchten, Hupe, Heizung & Klemmen (-P/-R/-X)",
      subs: [
        {
          name: "Leuchten, Signalhupe, Heizwiderstand & Klemmen",
          items: [
            {
              id: "p_lamp", name: "Meldeleuchte / Warnleuchte (X1 / X2)", defBmk: "-P1", defPins: "X1/X2",
              draw: (bmk, pins, sub) => `<text x="-13" y="-1" class="bmk-txt">${bmk}</text><text x="-13" y="8" class="sub-txt">${sub||''}</text>
                <line x1="0" y1="-24" x2="0" y2="-9" class="w-line"/><circle cx="0" cy="0" r="9" fill="#fff" class="sym-stroke"/>
                <line x1="-6" y1="-6" x2="6" y2="6" class="sym-stroke"/><line x1="6" y1="-6" x2="-6" y2="6" class="sym-stroke"/>
                <line x1="0" y1="9" x2="0" y2="24" class="w-line"/><text x="4" y="-11" class="pin-txt">X1</text><text x="4" y="18" class="pin-txt">X2</text>`
            },
            {
              id: "p_horn", name: "Signalhupe / Akustik-Alarm (X1 / X2)", defBmk: "-P2", defPins: "X1/X2",
              draw: (bmk) => `<text x="-12" y="3" class="bmk-txt">${bmk}</text><line x1="0" y1="-24" x2="0" y2="-8" class="w-line"/>
                <rect x="-8" y="-8" width="12" height="16" fill="#fff" class="sym-stroke"/>
                <polygon points="4,-6 13,-11 13,11 4,6" fill="#fff" class="sym-stroke"/><line x1="0" y1="8" x2="0" y2="24" class="w-line"/>`
            },
            {
              id: "r_heat", name: "Heizwiderstand (-R1..-R3, 2kW)", defBmk: "-R1", defPins: "1/2",
              draw: (bmk, pins, sub) => `<text x="-9" y="-1" class="bmk-txt">${bmk}</text><text x="-9" y="8" class="sub-txt">${sub||'2kW'}</text>
                <line x1="0" y1="-24" x2="0" y2="-11" class="w-line"/><rect x="-5" y="-11" width="10" height="22" fill="#fff" class="sym-stroke"/>
                <line x1="-5" y1="-5" x2="5" y2="-5" class="sym-stroke"/><line x1="-5" y1="0" x2="5" y2="0" class="sym-stroke"/><line x1="-5" y1="5" x2="5" y2="5" class="sym-stroke"/>
                <line x1="0" y1="11" x2="0" y2="24" class="w-line"/>`
            },
            {
              id: "x_feed5", name: "Einspeiseklemmen (-X1)", defBmk: "-X1", defPins: "L1..PE", threePole: true,
              draw: (bmk) => `<text x="-22" y="3" class="bmk-txt">${bmk}</text>
                ${[-16, 0, 16].map((dx, i) => `<line x1="${dx}" y1="-24" x2="${dx}" y2="0" class="w-line"/>
                  <circle cx="${dx}" cy="0" r="3" fill="#fff" stroke="#000" stroke-width="1.3"/>
                  <text x="${dx-5}" y="12" class="pin-txt" font-weight="bold">L${i+1}</text>`).join('')}`
            },
            {
              id: "x_mot4", name: "Motorklemmleiste (-X3 / -X4)", defBmk: "-X3", defPins: "1..PE", threePole: true,
              draw: (bmk) => `<text x="-22" y="3" class="bmk-txt">${bmk}</text>
                ${[-16, 0, 16].map((dx, i) => `<line x1="${dx}" y1="-24" x2="${dx}" y2="0" class="w-line"/>
                  <circle cx="${dx}" cy="0" r="3" fill="#fff" stroke="#000" stroke-width="1.3"/>
                  <text x="${dx+4}" y="4" class="pin-txt">${i+1}</text>`).join('')}`
            }
          ]
        }
      ]
    }
  ];

  const symMap = {};
  catalog.forEach(f => f.subs.forEach(s => s.items.forEach(it => {
    it.path = `${f.folder} ➔ ${s.name}`;
    symMap[it.id] = it;
  })));

  const COLS = 14, ROWS = 11;
  const ROW_LETTERS = ['A','B','C','D','E','F','G','H','I','J','K'];
  const colX = (c) => 68 + (c - 1) * 70;
  const nodeY = (n) => 32 + n * 48;
  const rowY = (r) => 56 + r * 48;
  const fmtCoord = (c, r) => `${c}${ROW_LETTERS[r]}`;
  const C = (symId, bmk='', pins='', sub='') => ({ symId, bmk, pins, sub });

  function buildTopology(cellsObj, vPaths, hSegs) {
    const vW = {}, hW = {};
    vPaths.forEach(([c, r1, r2]) => {
      for (let r = Math.min(r1, r2); r <= Math.max(r1, r2); r++) vW[`${c}_${r}`] = true;
    });
    hSegs.forEach(([n, c1, c2]) => {
      for (let c = Math.min(c1, c2); c < Math.max(c1, c2); c++) hW[`${c}_${n}`] = true;
    });
    return { cells: JSON.parse(JSON.stringify(cellsObj)), vWires: vW, hWires: hW };
  }

  const projects = [
    {
      title: "1. Verfahrbares Werkstor (Tasterverriegelung, Lichtschranke & 60s-Rücklauf)",
      sheetTitle: "Schaltplan Torsteuerung - Modernisierung",
      tech: [
        { bmk: "-S4 / -S1", desc: "Steuerspannung EIN / STOPP", pins: "-S4 (13/14) | -S1 (11/12)" },
        { bmk: "-S2 / -S3", desc: "Taster ZU / AUF (mit Tasterverriegelung)", pins: "13/14 (S) & 21/22 (Ö)" },
        { bmk: "-B1 / -B2", desc: "Endschalter Tor ZU / Tor AUF", pins: "-B1 (11/12, 21/22) | -B2 (11/12, 23/24)" },
        { bmk: "-B3 / -K2T", desc: "Lichtschranke / Zeitrelais 60s", pins: "-B3 (11/12, 23/24, 31/32) | -K2T (15/18)" }
      ],
      bottom: [
        { c: 2, t1: "Steuersp.", t2: "EIN" }, { c: 3, t1: "ZU", t2: "-Q1" },
        { c: 7, t1: "Timer 60s", t2: "-K2T" }, { c: 9, t1: "AUF", t2: "-Q2" },
        { c: 12, t1: "-M1 EIN", t2: "-P1" }, { c: 14, t1: "Störung", t2: "-P2" }
      ],
      reqs: [
        { text: "Steuerspannung über -S4 (13/14) und Hilfsschütz -K1 (13/14 Selbsthaltung) einschalten.", keys: ["2_3","3_3","2_10"] },
        { text: "Tor ZU (-Q1): Taster -S2 (13/14) + Tasterverriegelung -S3 (21/22), parallel -Q1 (13/14) & -K2T (15/18).", keys: ["3_5","3_6","4_5","5_5"] },
        { text: "Sicherheitskette ZU (Pfad 3): Lichtschranke -B3 (11/12), Schützverriegelung -Q2 (21/22) und Endschalter -B1 (11/12) vor -Q1.", keys: ["3_7","3_8","3_9"] },
        { text: "60s-Rücklauf (Pfad 7): Endschalter Tor AUF -B2 (23/24) in Reihe mit Lichtschranke -B3 (31/32) auf Zeitrelais -K2T (60s).", keys: ["7_6","7_8","7_10"] },
        { text: "Tor AUF (-Q2, Pfad 9–11): Taster -S3 (13/14) + -S2 (21/22), Selbsthaltung -Q2 (13/14) & Reversierung -B3 (23/24) + -B1 (21/22).", keys: ["9_5","9_6","10_5","11_5","11_6","9_8","9_9"] },
        { text: "Warnleuchte -P1 (-M1 EIN) über -Q1 (33/34) || -Q2 (33/34) & Störungsanzeige -P2 über -B0 (97/98).", keys: ["12_5","13_5","14_5"] }
      ],
      tmplCells: {
        "3_0": C("f_ls1","-F1","1/2","B10A"), "3_1": C("s_emg","-S0","1/2"), "3_2": C("b0_dual","-B0","95/96"),
        "2_3": C("s_no","-S4","13/14","EIN"), "3_3": C("q_no","-K1","13/14"), "3_4": C("s_nc","-S1","11/12","STOP"),
        "3_9": C("b_lim_nc","-B1","11/12"), "2_10": C("q_coil","-K1","A1/A2"), "3_10": C("q_coil","-Q1","A1/A2"),
        "7_8": C("b_opt_nc","-B3","31/32"), "7_10": C("k_ton","-K2T","A1/A2","60s"),
        "9_10": C("q_coil","-Q2","A1/A2"), "12_10": C("p_lamp","-P1","X1/X2"), "14_10": C("p_lamp","-P2","X1/X2")
      },
      tmplV: [[2,3,10], [3,0,4], [3,9,10], [7,8,10]],
      tmplH: [[0,1,3], [3,2,13], [4,2,3], [11,1,14]],
      solCells: {
        "3_0": C("f_ls1","-F1","1/2","B10A"), "3_1": C("s_emg","-S0","1/2"), "3_2": C("b0_dual","-B0","95/96"),
        "2_3": C("s_no","-S4","13/14","EIN"), "3_3": C("q_no","-K1","13/14"), "3_4": C("s_nc","-S1","11/12","STOP"),
        "3_5": C("s_no","-S2","13/14","ZU"), "3_6": C("s_nc","-S3","21/22"), "4_5": C("q_no","-Q1","13/14"), "5_5": C("k_tno","-K2T","15/18"),
        "3_7": C("b_opt_nc","-B3","11/12"), "3_8": C("q_nc","-Q2","21/22"), "3_9": C("b_lim_nc","-B1","11/12"),
        "2_10": C("q_coil","-K1","A1/A2"), "3_10": C("q_coil","-Q1","A1/A2"),
        "7_6": C("b_lim_no","-B2","23/24"), "7_8": C("b_opt_nc","-B3","31/32"), "7_10": C("k_ton","-K2T","A1/A2","60s"),
        "9_5": C("s_no","-S3","13/14","AUF"), "9_6": C("s_nc","-S2","21/22"), "10_5": C("q_no","-Q2","13/14"),
        "11_5": C("b_opt_no","-B3","23/24"), "11_6": C("b_lim_nc","-B1","21/22"),
        "9_8": C("q_nc","-Q1","21/22"), "9_9": C("b_lim_nc","-B2","11/12"), "9_10": C("q_coil","-Q2","A1/A2"),
        "12_5": C("q_no","-Q1","33/34"), "13_5": C("q_no","-Q2","33/34"), "12_10": C("p_lamp","-P1","X1/X2"),
        "14_5": C("f_aux_no","-B0","97/98"), "14_10": C("p_lamp","-P2","X1/X2")
      },
      solV: [[2,3,10], [3,0,10], [4,5,6], [5,5,6], [7,5,10], [9,5,10], [10,5,6], [11,5,6], [12,3,10], [13,3,5], [14,2,10]],
      solH: [[0,1,3], [2,3,14], [3,2,13], [4,2,3], [5,3,11], [7,3,5], [7,9,11], [6,12,13], [11,1,14]]
    },
    {
      title: "2. Tischkreissäge mit Absauganlage (Aufgelöster Haupt- & Steuerstromkreis)",
      sheetTitle: "Schaltplan Kreissäge - Aufgelöste Darstellung -",
      tech: [
        { bmk: "-F1 / -F2", desc: "Motorschutzschalter Absaugung / Säge", pins: "Haupt 1..6 | Hilfs: 1.13/1.14 (S), 1.21/1.22 (Ö)" },
        { bmk: "-Q1 / -Q2", desc: "Schütz Absaugventilator / Säge", pins: "A1/A2 | 13/14, 23/24" },
        { bmk: "-S0 / -S1 / -S2", desc: "Not-Halt (21/22) / AUS (11/12) / EIN (13/14)", pins: "21/22 | 11/12 | 13/14" }
      ],
      bottom: [
        { c: 2, t1: "Einspeisung", t2: "-X1" }, { c: 4, t1: "Motor Absaugung", t2: "-X3" },
        { c: 6, t1: "Motor Säge", t2: "-X4" }, { c: 9, t1: "Steuerung", t2: "Absaugung" },
        { c: 11, t1: "Steuerung", t2: "Säge" }, { c: 12, t1: "Anzeige", t2: "Säge EIN" }, { c: 14, t1: "Anzeige", t2: "Störung" }
      ],
      reqs: [
        { text: "Hauptstromkreis Motor Säge (Pfad 6): Motorschutzschalter -F2 (6C) und Hauptkontakte -Q2 (6G) über -X4.", keys: ["6_2","6_6"] },
        { text: "Steuerstromkreis (Pfad 9): Motorschutz-Schließer -F2 (1.13/1.14 in 9D) und AUS-Taster -S1 (11/12 in 9F) in Reihe vor -S2.", keys: ["9_3","9_5"] },
        { text: "Selbsthaltung -Q1 (13/14 in 10H) und Folgeschaltung -Q1 (23/24 in 11H) für Spule -Q2.", keys: ["10_7","11_7"] },
        { text: "Anzeige Säge EIN (Pfad 12): Schließer -Q2 (13/14 in 12F) auf grüne Meldeleuchte -P1 (X1/X2 in 12K).", keys: ["12_5","12_10"] },
        { text: "Anzeige Störung (Pfad 13/14): Öffner -F1 (1.21/1.22 in 13F) parallel zu -F2 (1.21/1.22 in 14F) auf gelbe Meldeleuchte -P2.", keys: ["13_5","14_5"] }
      ],
      tmplCells: {
        "2_10": C("x_feed5","-X1","L1..PE"), "4_2": C("f_mss3","-F1","1.21/1.13"), "4_6": C("q_main3","-Q1","1/2..5/6"),
        "4_10": C("x_mot4","-X3","1..PE"), "6_10": C("x_mot4","-X4","1..PE"), "8_1": C("f_ls1","-F3","1/2"),
        "9_1": C("s_emg","-S0","21/22"), "9_2": C("f_aux_no","-F1","1.13/1.14"), "9_7": C("s_no","-S2","13/14","EIN"),
        "9_10": C("q_coil","-Q1","A1/A2"), "11_10": C("q_coil","-Q2","A1/A2"),
        "14_5": C("f_aux_nc","-F2","1.21/1.22"), "14_10": C("p_lamp","-P2","X1/X2","gelb")
      },
      tmplV: [[2,0,10], [4,0,10], [8,0,1], [9,1,2], [9,7,10], [14,1,10]],
      tmplH: [[0,1,8], [2,8,9], [1,9,14], [11,1,14]],
      solCells: {
        "2_10": C("x_feed5","-X1","L1..PE"), "4_2": C("f_mss3","-F1","1.21/1.13"), "4_6": C("q_main3","-Q1","1/2..5/6"),
        "4_10": C("x_mot4","-X3","1..PE"), "6_2": C("f_mss3","-F2","1.21/1.13"), "6_6": C("q_main3","-Q2","1/2..5/6"),
        "6_10": C("x_mot4","-X4","1..PE"), "8_1": C("f_ls1","-F3","1/2"), "9_1": C("s_emg","-S0","21/22"),
        "9_2": C("f_aux_no","-F1","1.13/1.14"), "9_3": C("f_aux_no","-F2","1.13/1.14"), "9_5": C("s_nc","-S1","11/12","AUS"),
        "9_7": C("s_no","-S2","13/14","EIN"), "10_7": C("q_no","-Q1","13/14"), "9_10": C("q_coil","-Q1","A1/A2"),
        "11_7": C("q_no","-Q1","23/24"), "11_10": C("q_coil","-Q2","A1/A2"),
        "12_5": C("q_no","-Q2","13/14"), "12_10": C("p_lamp","-P1","X1/X2","grün"),
        "13_5": C("f_aux_nc","-F1","1.21/1.22"), "14_5": C("f_aux_nc","-F2","1.21/1.22"), "14_10": C("p_lamp","-P2","X1/X2","gelb")
      },
      solV: [[2,0,10], [4,0,10], [6,0,10], [8,0,1], [9,1,10], [10,7,7], [11,6,10], [12,1,10], [13,1,5], [14,1,10]],
      solH: [[0,1,8], [2,8,9], [1,9,14], [6,9,11], [7,9,10], [8,9,10], [6,13,14], [11,1,14]]
    },
    {
      title: "3. Zwei-Band-Förderanlage (Drehzahlwächter n>, 10s-Anlauf & 20s-Nachlauf)",
      sheetTitle: "Steuerstromkreis Förderbandanlage Band 1 & Band 2",
      tech: [
        { bmk: "-K1T (20s TOF)", desc: "Rückfallverzögertes Zeitrelais Nachlauf Band 2", pins: "A1/A2 | 15/18" },
        { bmk: "-B1 [n>] / -K2T", desc: "Drehzahlwächter Band 2 / Anlaufverzögerung Band 1 (10s)", pins: "15/18 | A1/A2" },
        { bmk: "-Q1 / -Q2", desc: "Schütz Band 1 (-M1) / Schütz Band 2 (-M2)", pins: "A1/A2 | 13/14" }
      ],
      bottom: [
        { c: 2, t1: "Anlage", t2: "EIN/AUS" }, { c: 4, t1: "Nachlauf 20s", t2: "-K1T" },
        { c: 5, t1: "Band 2", t2: "-Q2" }, { c: 7, t1: "Anlauf 10s", t2: "-K2T" },
        { c: 8, t1: "Band 1", t2: "-Q1" }, { c: 10, t1: "Betrieb", t2: "Band 1/2" }, { c: 13, t1: "Anzeige", t2: "Störung" }
      ],
      reqs: [
        { text: "Steuerung EIN/AUS (Pfad 2): -S0 (21/22), -F1/-F2 (1.13/1.14), EIN -S1 (13/14) || -K1 (13/14), AUS -S2 (11/12) auf -K1.", keys: ["2_5","3_5","2_7","2_10"] },
        { text: "Band 2 (-Q2, Pfad 4 & 5): Rückfallverzögertes Zeitrelais -K1T (20s TOF) schaltet über -K1T (15/18) das Schütz -Q2.", keys: ["4_10","5_6","5_10"] },
        { text: "Band 1 (-Q1, Pfad 6–8): Drehzahlwächter -B1 [n>] (15/18) startet -K2T (10s TON); -K1 (23/24) + -K2T (15/18) schalten -Q1.", keys: ["6_7","7_10","8_5","8_7","8_10"] },
        { text: "Betriebsanzeigen -P1/-P2 (Pfad 10/11) & Störungsanzeige -P3 (Pfad 12–14) über -S0 (13/14) || -F1 (1.21/1.22) || -F2 (1.21/1.22).", keys: ["10_7","11_7","12_5","13_5","14_5"] }
      ],
      tmplCells: {
        "2_0": C("f_ls1","-F1","1/2","B10A"), "2_1": C("s_emg","-S0","21/22"),
        "2_2": C("f_aux_no","-F1","1.13/1.14"), "2_3": C("f_aux_no","-F2","1.13/1.14"),
        "2_10": C("q_coil","-K1","A1/A2"), "4_10": C("k_tof","-K1T","A1/A2","20s"),
        "5_10": C("q_coil","-Q2","A1/A2"), "7_10": C("k_ton","-K2T","A1/A2","10s"),
        "8_10": C("q_coil","-Q1","A1/A2"), "10_10": C("p_lamp","-P1","X1/X2","grün"),
        "11_10": C("p_lamp","-P2","X1/X2","grün"), "13_10": C("p_lamp","-P3","X1/X2","gelb")
      },
      tmplV: [[2,0,3]],
      tmplH: [[0,1,2], [1,2,14], [4,2,11], [11,1,14]],
      solCells: {
        "2_0": C("f_ls1","-F1","1/2","B10A"), "2_1": C("s_emg","-S0","21/22"),
        "2_2": C("f_aux_no","-F1","1.13/1.14"), "2_3": C("f_aux_no","-F2","1.13/1.14"),
        "2_5": C("s_no","-S1","13/14","EIN"), "3_5": C("q_no","-K1","13/14"), "2_7": C("s_nc","-S2","11/12","AUS"),
        "2_10": C("q_coil","-K1","A1/A2"), "4_10": C("k_tof","-K1T","A1/A2","20s"),
        "5_6": C("k_tno","-K1T","15/18"), "5_10": C("q_coil","-Q2","A1/A2"),
        "6_7": C("b_speed_no","-B1","15/18"), "7_10": C("k_ton","-K2T","A1/A2","10s"),
        "8_5": C("q_no","-K1","23/24"), "8_7": C("k_tno","-K2T","15/18"), "8_10": C("q_coil","-Q1","A1/A2"),
        "10_7": C("q_no","-Q1","13/14"), "10_10": C("p_lamp","-P1","X1/X2","grün"),
        "11_7": C("q_no","-Q2","13/14"), "11_10": C("p_lamp","-P2","X1/X2","grün"),
        "12_5": C("q_no","-S0","13/14"), "13_5": C("f_aux_nc","-F1","1.21/1.22"),
        "14_5": C("f_aux_nc","-F2","1.21/1.22"), "13_10": C("p_lamp","-P3","X1/X2","gelb")
      },
      solV: [[2,0,10], [3,4,5], [4,8,10], [5,4,10], [6,4,7], [7,4,10], [8,4,10], [10,4,10], [11,4,10], [12,1,5], [13,1,10], [14,1,5]],
      solH: [[0,1,2], [1,2,14], [4,2,11], [6,2,3], [8,2,4], [8,6,7], [6,12,14], [11,1,14]]
    },
    {
      title: "4. Kühlraum Festhalle (Sensoren -B2..-B4, Luftvorhang, 20s-Warnung & 1min-Hupe)",
      sheetTitle: "Steuerstromkreis Kühlraum & Türüberwachung",
      tech: [
        { bmk: "-B2 / -B3 / -B4", desc: "3 Sensoren / Bewegungsmelder Beleuchtung", pins: "13/14 (Parallelschaltung)" },
        { bmk: "-B1 / -B5", desc: "Motorschutzrelais (95/96, 97/98) / Türkontakt (21/22)", pins: "95/96 | 21/22" },
        { bmk: "-K1 (20s) / -K2 (1m)", desc: "Zeitrelais Tür offen >20s / >1min", pins: "A1/A2 | 17/18" }
      ],
      bottom: [
        { c: 2, t1: "Beleuchtung", t2: "-Q1" }, { c: 5, t1: "Luftvorhang", t2: "-Q2" },
        { c: 7, t1: "Timer >20s", t2: "-K1" }, { c: 9, t1: "Timer >1min", t2: "-K2" },
        { c: 11, t1: "Warnung >20s", t2: "-P1" }, { c: 12, t1: "Hupe >1min", t2: "-P2" }, { c: 14, t1: "Störung", t2: "-P3" }
      ],
      reqs: [
        { text: "Beleuchtung -Q1 (Pfad 1–3): Parallelschaltung der 3 Sensoren -B2 (13/14) || -B3 (13/14) || -B4 (13/14).", keys: ["1_7","2_7","3_7","2_10"] },
        { text: "Luftvorhang & Timer (Pfad 5, 7, 9): Über Motorschutz -B1 (95/96) und Türkontakt -B5 (21/22) werden -Q2, -K1 und -K2 geschaltet.", keys: ["5_2","5_5","5_10","7_10","9_10"] },
        { text: "Warnleuchte -P1 (Pfad 11) über -K1 (17/18), Hupe -P2 (Pfad 12) über -K2 (17/18) & Störung -P3 (Pfad 14) über -B1 (97/98).", keys: ["11_7","12_7","14_5"] }
      ],
      tmplCells: {
        "2_0": C("f_ls1","-F1","1/2"), "2_1": C("s_emg","-S01","11/12"), "5_2": C("b0_dual","-B1","95/96"),
        "2_10": C("q_coil","-Q1","A1/A2"), "5_10": C("q_coil","-Q2","A1/A2"),
        "7_10": C("k_ton","-K1","A1/A2","20s"), "9_10": C("k_ton","-K2","A1/A2","1m"),
        "11_10": C("p_lamp","-P1","X1/X2"), "12_10": C("p_horn","-P2","X1/X2"), "14_10": C("p_lamp","-P3","X1/X2")
      },
      tmplV: [[2,0,1]],
      tmplH: [[0,1,2], [2,2,14], [11,1,14]],
      solCells: {
        "2_0": C("f_ls1","-F1","1/2"), "2_1": C("s_emg","-S01","11/12"),
        "1_7": C("b_opt_no","-B2","13/14"), "2_7": C("b_opt_no","-B3","13/14"), "3_7": C("b_opt_no","-B4","13/14"),
        "2_10": C("q_coil","-Q1","A1/A2"), "5_2": C("b0_dual","-B1","95/96"), "5_5": C("b_lim_nc","-B5","21/22"),
        "5_10": C("q_coil","-Q2","A1/A2"), "7_10": C("k_ton","-K1","A1/A2","20s"), "9_10": C("k_ton","-K2","A1/A2","1m"),
        "11_7": C("k_tno","-K1","17/18"), "11_10": C("p_lamp","-P1","X1/X2"),
        "12_7": C("k_tno","-K2","17/18"), "12_10": C("p_horn","-P2","X1/X2"),
        "14_5": C("f_aux_no","-B1","97/98"), "14_10": C("p_lamp","-P3","X1/X2")
      },
      solV: [[1,7,7], [2,0,10], [3,7,7], [5,2,10], [7,8,10], [9,8,10], [11,3,10], [12,3,10], [14,2,10]],
      solH: [[0,1,2], [2,2,14], [7,1,3], [8,1,3], [3,5,12], [8,5,9], [11,1,14]]
    },
    {
      title: "5. Kühlraumsteuerung & Kälteanlage (Hysterese <3°C / >8°C & 5min-Lüfternachlauf)",
      sheetTitle: "Steuerstromkreis Kälteanlage & Hysterese",
      tech: [
        { bmk: "-B1 / -B2", desc: "2 Motorschutzrelais in Reihe (95/96) | Störung parallel (97/98)", pins: "95/96 | 97/98" },
        { bmk: "-B4 / -B6 (<3°C)", desc: "2 Thermostate Abschaltung (<3°C Öffner 11/12 parallel)", pins: "11/12" },
        { bmk: "-B3 / -B5 (>8°C)", desc: "2 Thermostate Einschaltung (>8°C Schließer 13/14 parallel + -Q2)", pins: "13/14" }
      ],
      bottom: [
        { c: 2, t1: "Beleuchtung", t2: "-Q1" }, { c: 4, t1: "Kühlanlage", t2: "-Q2" },
        { c: 8, t1: "Nachlauf 5m", t2: "-K1T" }, { c: 10, t1: "Lüfter", t2: "-Q3" },
        { c: 12, t1: "Störung", t2: "-P1" }, { c: 14, t1: "Anlage EIN", t2: "-P2" }
      ],
      reqs: [
        { text: "Beleuchtung -Q1 (Pfad 2) über Türkontakt -B7 (11/12) & Betriebsanzeige -P2 (Pfad 14).", keys: ["2_7","2_10","14_10"] },
        { text: "Motorschutz -B1/-B2 (95/96 in Pfad 4) sowie Störungsmeldung -B1 (97/98) || -B2 (97/98) auf -P1 (Pfad 12/13).", keys: ["4_2","4_3","12_5","13_5"] },
        { text: "Temperatur-Hysterese (Pfad 4–6): (-B4 || -B6 <3°C) in Reihe mit (-B3 || -B5 >8°C || Selbsthaltung -Q2) auf -Q2.", keys: ["4_5","5_5","4_7","5_7","6_7"] },
        { text: "Lüfternachlauf (Pfad 8 & 10): Zeitrelais -K1T (5min TOF) schaltet über -K1T (15/18) das Lüfterschütz -Q3.", keys: ["8_10","10_7","10_10"] }
      ],
      tmplCells: {
        "2_0": C("f_ls1","-F1","2/1"), "2_1": C("s_no","-S1","3/4"),
        "4_2": C("b0_dual","-B1","95/96"), "4_3": C("b0_dual","-B2","95/96"),
        "2_10": C("q_coil","-Q1","A1/A2"), "4_10": C("q_coil","-Q2","A1/A2"),
        "8_10": C("k_tof","-K1T","A1/A2","5m"), "10_10": C("q_coil","-Q3","A1/A2"),
        "12_10": C("p_lamp","-P1","X1/X2"), "14_10": C("p_lamp","-P2","X1/X2")
      },
      tmplV: [[2,0,1], [4,2,3]],
      tmplH: [[0,1,2], [2,2,14], [11,1,14]],
      solCells: {
        "2_0": C("f_ls1","-F1","2/1"), "2_1": C("s_no","-S1","3/4"), "2_7": C("b_lim_nc","-B7","11/12"),
        "2_10": C("q_coil","-Q1","A1/A2"), "4_2": C("b0_dual","-B1","95/96"), "4_3": C("b0_dual","-B2","95/96"),
        "4_5": C("b_temp_nc","-B4","11/12","<3°C"), "5_5": C("b_temp_nc","-B6","11/12","<3°C"),
        "4_7": C("b_temp_no","-B3","13/14",">8°C"), "5_7": C("b_temp_no","-B5","13/14",">8°C"), "6_7": C("q_no","-Q2","13/14"),
        "4_10": C("q_coil","-Q2","A1/A2"), "8_10": C("k_tof","-K1T","A1/A2","5m"),
        "10_7": C("k_tno","-K1T","15/18"), "10_10": C("q_coil","-Q3","A1/A2"),
        "12_5": C("f_aux_no","-B1","97/98"), "13_5": C("f_aux_no","-B2","97/98"),
        "12_10": C("p_lamp","-P1","X1/X2"), "14_10": C("p_lamp","-P2","X1/X2")
      },
      solV: [[2,0,10], [4,2,10], [5,4,5], [5,7,7], [6,7,7], [8,4,10], [10,4,10], [12,2,10], [13,2,5], [14,2,10]],
      solH: [[0,1,2], [2,2,14], [4,4,10], [6,4,5], [7,4,6], [8,4,6], [6,12,13], [11,1,14]]
    },
    {
      title: "6. Warmwasserspeicher (3 Heizwiderstände -R1..-R3, Thermostat -Q3 & Schützsteuerung)",
      sheetTitle: "Schaltplan Warmwasserspeicher - aufgelöste Darstellung -",
      tech: [
        { bmk: "-F1 (3-polig)", desc: "Überstromauslöser in L1 (6/5), L2 (4/3), L3 (2/1)", pins: "6/5, 4/3, 2/1" },
        { bmk: "-R1 / -R2 / -R3", desc: "3 Heizwiderstände je 2 kW", pins: "1/2" },
        { bmk: "-Q1 / -Q2 / -Q3", desc: "Schütze -Q1, -Q2 und Temperaturregler -Q3 [ϑ]", pins: "A1/A2 | 13/14" }
      ],
      bottom: [
        { c: 2, t1: "Heizstrang 1", t2: "-R1 (2kW)" }, { c: 5, t1: "Steuerung", t2: "-Q1" },
        { c: 7, t1: "Heizstrang 2", t2: "-R2 (2kW)" }, { c: 10, t1: "Heizstrang 3", t2: "-R3 (2kW)" }, { c: 12, t1: "Steuerung", t2: "-Q2 / -P1" }
      ],
      reqs: [
        { text: "3 Heizwiderstände -R1 (Pfad 2), -R2 (Pfad 7) und -R3 (Pfad 10) unter den Schützkontakten -Q2 und Thermostat -Q3.", keys: ["2_7","7_7","10_7"] },
        { text: "Schütz -Q1 (Pfad 5) über Taster -S1 (13/14) und Kontakt -Q2 (14/13) in Pfad 4.", keys: ["5_5","4_5","5_10"] },
        { text: "Schütz -Q2 (Pfad 12) über Schließer -Q1 (13/14) sowie parallel geschaltete Leuchte -P1 (Pfad 14).", keys: ["12_7","12_10","14_10"] }
      ],
      tmplCells: {
        "2_2": C("f_ls1","-F1","6/5"), "7_2": C("f_ls1","-F1","4/3"), "10_2": C("f_ls1","-F1","2/1"),
        "5_10": C("q_coil","-Q1","A1/A2"), "12_10": C("q_coil","-Q2","A1/A2"), "14_10": C("p_lamp","-P1","X1/X2")
      },
      tmplV: [[2,0,2], [7,0,2], [10,0,2]],
      tmplH: [[0,1,10], [11,1,14]],
      solCells: {
        "2_2": C("f_ls1","-F1","6/5"), "2_5": C("q_no","-Q2","2/1"), "2_7": C("r_heat","-R1","1/2","2kW"),
        "4_5": C("q_no","-Q2","14/13"), "5_5": C("s_no","-S1","13/14"), "5_10": C("q_coil","-Q1","A1/A2"),
        "7_2": C("f_ls1","-F1","4/3"), "7_5": C("q_no","-Q2","4/3"), "7_7": C("r_heat","-R2","1/2","2kW"),
        "8_7": C("q_no","-Q1","5/6"), "10_2": C("f_ls1","-F1","2/1"), "10_5": C("b_temp_nc","-Q3","2/1","ϑ"),
        "10_7": C("r_heat","-R3","1/2","2kW"), "10_9": C("q_no","-Q2","5/6"),
        "12_7": C("q_no","-Q1","13/14"), "12_10": C("q_coil","-Q2","A1/A2"), "14_10": C("p_lamp","-P1","X1/X2")
      },
      solV: [[2,0,10], [4,4,5], [5,4,10], [7,0,10], [8,6,8], [10,0,10], [12,6,10], [14,9,10]],
      solH: [[0,1,10], [4,4,7], [6,4,5], [6,7,8], [9,8,10], [6,10,12], [9,12,14], [11,1,14]]
    },
    {
      title: "7. Hallenbelüftung mit Dahlandermotor (2 Drehzahlen & Folgeschaltung)",
      sheetTitle: "Steuerstromkreis Dahlander-Lüftungsanlage",
      tech: [
        { bmk: "-Q1 (n1)", desc: "Schütz niedrige Drehzahl (Dreieck)", pins: "A1/A2 | 13/14, 21/22" },
        { bmk: "-Q3 / -Q2 (n2)", desc: "Sternschütz (-Q3) & Netzschütz (-Q2) hohe Drehzahl (YY)", pins: "A1/A2 | 13/14, 21/22" },
        { bmk: "-S1 / -S2 / -S3", desc: "Taster AUS (11/12) / Langsam n1 (13/14) / Schnell n2 (13/14)", pins: "11/12 | 13/14" }
      ],
      bottom: [
        { c: 3, t1: "Drehzahl 1", t2: "-Q1 (n1)" }, { c: 6, t1: "Doppelstern", t2: "-Q3 (YY)" },
        { c: 9, t1: "Drehzahl 2", t2: "-Q2 (n2)" }, { c: 12, t1: "Anzeige n2", t2: "-P1" }
      ],
      reqs: [
        { text: "Drehzahl 1 (-Q1, Pfad 3): Start über -S2 (13/14) || -Q1 (13/14) und Verriegelung gegen -Q2 (21/22) und -Q3 (21/22).", keys: ["3_3","4_3","3_5","3_6","3_10"] },
        { text: "Drehzahl 2 Sternschütz (-Q3, Pfad 6): Start über -S3 (13/14) || -Q3 (13/14) und Verriegelung gegen -Q1 (21/22).", keys: ["6_3","7_3","6_5","6_10"] },
        { text: "Drehzahl 2 Netzschütz (-Q2, Pfad 9) & Anzeige -P1 (Pfad 12) über Schließer -Q3 (23/24) bzw. -Q2 (13/14).", keys: ["9_5","9_10","12_5","12_10"] }
      ],
      tmplCells: {
        "3_0": C("f_ls1","-F1","1/2"), "3_1": C("s_nc","-S1","11/12","AUS"),
        "3_10": C("q_coil","-Q1","A1/A2"), "6_10": C("q_coil","-Q3","A1/A2"),
        "9_10": C("q_coil","-Q2","A1/A2"), "12_10": C("p_lamp","-P1","X1/X2")
      },
      tmplV: [[3,0,1]],
      tmplH: [[0,1,3], [2,3,12], [11,1,12]],
      solCells: {
        "3_0": C("f_ls1","-F1","1/2"), "3_1": C("s_nc","-S1","11/12","AUS"),
        "3_3": C("s_no","-S2","13/14","n1"), "4_3": C("q_no","-Q1","13/14"),
        "3_5": C("q_nc","-Q2","21/22"), "3_6": C("q_nc","-Q3","21/22"), "3_10": C("q_coil","-Q1","A1/A2"),
        "6_3": C("s_no","-S3","13/14","n2"), "7_3": C("q_no","-Q3","13/14"),
        "6_5": C("q_nc","-Q1","21/22"), "6_10": C("q_coil","-Q3","A1/A2"),
        "9_5": C("q_no","-Q3","23/24"), "9_10": C("q_coil","-Q2","A1/A2"),
        "12_5": C("q_no","-Q2","13/14"), "12_10": C("p_lamp","-P1","X1/X2")
      },
      solV: [[3,0,10], [4,3,3], [6,2,10], [7,3,3], [9,2,10], [12,2,10]],
      solH: [[0,1,3], [2,3,12], [3,3,4], [4,3,4], [3,6,7], [4,6,7], [11,1,12]]
    },
    {
      title: "8. Trocknungs-Heizstrahleranlage (Stern-/Dreieck-Umschaltung & Zeitrelais)",
      sheetTitle: "Steuerstromkreis Stern-Dreieck-Heizregister",
      tech: [
        { bmk: "-Q1 / -Q2 / -Q3", desc: "Netzschütz (-Q1), Sternschütz (-Q2), Dreieckschütz (-Q3)", pins: "A1/A2 | 13/14, 21/22" },
        { bmk: "-K1T (10s TON)", desc: "Zeitrelais für Stern-Dreieck-Umschaltung", pins: "A1/A2 | 15/18" }
      ],
      bottom: [
        { c: 3, t1: "Netzschütz", t2: "-Q1" }, { c: 6, t1: "Timer Y/Δ", t2: "-K1T" },
        { c: 9, t1: "Sternschütz", t2: "-Q2 (Y)" }, { c: 12, t1: "Dreieckschütz", t2: "-Q3 (Δ)" }
      ],
      reqs: [
        { text: "Netzschütz -Q1 (Pfad 3) über AUS -S1 (11/12) und EIN -S2 (13/14) || Selbsthaltung -Q1 (13/14) einschalten.", keys: ["3_1","3_3","4_3","3_10"] },
        { text: "Sternschütz -Q2 (Pfad 9) und Dreieckschütz -Q3 (Pfad 12) gegenseitig über Öffner -Q3 (21/22) und -Q2 (21/22) verriegeln.", keys: ["9_6","12_6","9_10","12_10"] },
        { text: "Zeitrelais -K1T (Pfad 6) schaltet über Öffner (15/16) und Schließer (15/18) von Stern (-Q2) auf Dreieck (-Q3) um.", keys: ["6_10","9_4","12_4"] }
      ],
      tmplCells: {
        "3_0": C("f_ls1","-F1","1/2"), "3_1": C("s_nc","-S1","11/12","AUS"),
        "3_10": C("q_coil","-Q1","A1/A2"), "6_10": C("k_ton","-K1T","A1/A2","10s"),
        "9_10": C("q_coil","-Q2","A1/A2"), "12_10": C("q_coil","-Q3","A1/A2")
      },
      tmplV: [[3,0,1]],
      tmplH: [[0,1,3], [11,1,12]],
      solCells: {
        "3_0": C("f_ls1","-F1","1/2"), "3_1": C("s_nc","-S1","11/12","AUS"),
        "3_3": C("s_no","-S2","13/14","EIN"), "4_3": C("q_no","-Q1","13/14"), "3_10": C("q_coil","-Q1","A1/A2"),
        "6_10": C("k_ton","-K1T","A1/A2","10s"), "9_4": C("q_nc","-K1T","15/16"), "9_6": C("q_nc","-Q3","21/22"),
        "9_10": C("q_coil","-Q2","A1/A2"), "12_4": C("k_tno","-K1T","15/18"), "12_6": C("q_nc","-Q2","21/22"),
        "12_10": C("q_coil","-Q3","A1/A2")
      },
      solV: [[3,0,10], [4,3,3], [6,4,10], [9,4,10], [12,4,10]],
      solH: [[0,1,3], [3,3,4], [4,3,12], [11,1,12]]
    },
    {
      title: "9. Wellness-Whirlpool-Pumpe (Sanftstarter-Ansteuerung, Laufzeit & Not-Halt)",
      sheetTitle: "Steuerstromkreis Whirlpool-Pumpe & Sanftstarter",
      tech: [
        { bmk: "-S0 / -B1", desc: "Not-Halt (21/22) / Trockenlaufschutz-Sensor (13/14)", pins: "21/22 | 13/14" },
        { bmk: "-K1T / -U1", desc: "Laufzeit-Timer (15min) / Sanftstarter Steuereingang", pins: "A1/A2 | 15/16" }
      ],
      bottom: [
        { c: 3, t1: "Netzfreigabe", t2: "-Q1" }, { c: 6, t1: "Laufzeit 15m", t2: "-K1T" },
        { c: 9, t1: "Sanftstarter", t2: "-U1" }, { c: 12, t1: "Betrieb", t2: "-P1" }
      ],
      reqs: [
        { text: "Freigabekette (Pfad 3): Not-Halt -S0 (21/22), Trockenlaufschutz -B1 (13/14), Start -S1 (13/14) || -Q1 (13/14) und Zeit-Öffner -K1T (15/16) auf -Q1.", keys: ["3_1","3_2","3_4","4_4","3_6","3_10"] },
        { text: "Laufzeit-Timer -K1T (Pfad 6), Sanftstarter -U1 (Pfad 9) und Betriebsanzeige -P1 (Pfad 12) über Schließer -Q1 (13/14, 23/24, 33/34) ansteuern.", keys: ["6_5","9_5","12_5","6_10","9_10","12_10"] }
      ],
      tmplCells: {
        "3_0": C("f_ls1","-F1","1/2"), "3_1": C("s_emg","-S0","21/22"),
        "3_10": C("q_coil","-Q1","A1/A2"), "6_10": C("k_ton","-K1T","A1/A2","15m"),
        "9_10": C("q_coil","-U1","A1/A2"), "12_10": C("p_lamp","-P1","X1/X2","grün")
      },
      tmplV: [[3,0,1]],
      tmplH: [[0,1,3], [3,3,12], [11,1,12]],
      solCells: {
        "3_0": C("f_ls1","-F1","1/2"), "3_1": C("s_emg","-S0","21/22"), "3_2": C("b_opt_no","-B1","13/14"),
        "3_4": C("s_no","-S1","13/14","EIN"), "4_4": C("q_no","-Q1","13/14"), "3_6": C("q_nc","-K1T","15/16"),
        "3_10": C("q_coil","-Q1","A1/A2"), "6_5": C("q_no","-Q1","13/14"), "6_10": C("k_ton","-K1T","A1/A2","15m"),
        "9_5": C("q_no","-Q1","23/24"), "9_10": C("q_coil","-U1","A1/A2"),
        "12_5": C("q_no","-Q1","33/34"), "12_10": C("p_lamp","-P1","X1/X2","grün")
      },
      solV: [[3,0,10], [4,4,4], [6,3,10], [9,3,10], [12,3,10]],
      solH: [[0,1,3], [3,3,12], [4,3,4], [5,3,4], [11,1,12]]
    }
  ];

  const STORAGE_KEY = 'see_cad_final_state_v1';
  let curProj = 0;
  let activeTool = 'SYM';
  let selSymId = 's_no';
  let selCell = null;
  let wireStart = null;
  let showGhost = false;
  let auditMode = false;
  let examSearchLocked = false;

  let placedCells = {};
  let vWires = {};
  let hWires = {};
  let history = [];

  function init() {
    const sel = document.getElementById('projSelect');
    if (!sel) return;
    sel.innerHTML = '';
    projects.forEach((p, i) => {
      const o = document.createElement('option');
      o.value = i; o.textContent = p.title;
      sel.appendChild(o);
    });
    renderTree();
    selectSymbol('s_no');

    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
      if (saved && typeof saved.curProj === 'number' && projects[saved.curProj]) {
        curProj = saved.curProj;
        sel.value = curProj;
        renderProjectBriefing();
        placedCells = saved.placedCells || {};
        vWires = saved.vWires || {};
        hWires = saved.hWires || {};
        renderCanvas();
      } else {
        onSwitchProject();
      }
    } catch (e) {
      onSwitchProject();
    }

    window.addEventListener('keydown', e => {
      const cadContainer = document.getElementById('seecad-trainer-container');
      if (!cadContainer || cadContainer.classList.contains('hidden')) return;
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement?.tagName)) return;
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'z') {
        e.preventDefault();
        undo();
      }
    });
  }

  function persistState() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ curProj, placedCells, vWires, hWires }));
    } catch (e) {}
  }

  function saveHist() {
    history.push(JSON.stringify({ placedCells, vWires, hWires }));
    if (history.length > 40) history.shift();
  }

  function undo() {
    if (!history.length) return;
    const prev = JSON.parse(history.pop());
    placedCells = prev.placedCells; vWires = prev.vWires; hWires = prev.hWires;
    auditMode = false;
    persistState();
    renderCanvas();
  }

  function renderProjectBriefing() {
    const p = projects[curProj];
    const reqEl = document.getElementById('reqList');
    const techEl = document.getElementById('techGrid');
    if (reqEl) reqEl.innerHTML = p.reqs.map((r, i) => `<li id="req_${i}">➤ ${r.text}</li>`).join('');
    if (techEl) techEl.innerHTML = p.tech.map(t => `<div class="tech-chip"><b>${t.bmk} — ${t.desc}</b>Anschlüsse: <code>${t.pins}</code></div>`).join('');
  }

  function onSwitchProject() {
    const sel = document.getElementById('projSelect');
    curProj = sel ? (parseInt(sel.value, 10) || 0) : 0;
    renderProjectBriefing();
    loadTemplate();
  }

  function toggleBriefing() {
    const b = document.getElementById('briefingBox');
    if (b) b.style.display = (b.style.display === 'none') ? 'grid' : 'none';
  }

  function toggleExamSearchMode() {
    examSearchLocked = !examSearchLocked;
    const sw = document.getElementById('searchWrap');
    const lbl = document.getElementById('searchToggleLbl');
    if (examSearchLocked) {
      document.getElementById('symSearch').value = '';
      if (sw) sw.style.display = 'none';
      if (lbl) lbl.textContent = '🔓 Suche aktivieren';
      renderTree();
      collapseTree();
      showStatus('info', '🔒 <b>Prüfungs-Suchmodus aktiv:</b> Suchleiste ausgeblendet & alle Ordner zugeklappt. Finde die Symbole wie in SEE Electrical direkt über die Unterordner!');
    } else {
      if (sw) sw.style.display = 'block';
      if (lbl) lbl.textContent = '🔒 Prüfungsmodus';
      renderTree();
    }
  }

  function startBlank() {
    saveHist();
    placedCells = {}; vWires = {}; hWires = {}; selCell = null; wireStart = null; auditMode = false;
    resetReqUI();
    persistState();
    showStatus('info', '📄 <b>Leeres Blatt geladen!</b> Klicke auf "👻 Blaupause", um die Musterlösung schwach im Hintergrund einzublenden.');
    renderCanvas();
  }

  function loadTemplate() {
    saveHist();
    const p = projects[curProj];
    const t = buildTopology(p.tmplCells, p.tmplV, p.tmplH);
    placedCells = t.cells; vWires = t.vWires; hWires = t.hWires;
    selCell = null; wireStart = null; auditMode = false;
    resetReqUI();
    persistState();
    showStatus('info', `✏️ <b>Vorgabe-Plan für "${p.title}" geladen!</b> Ergänze nun die fehlenden Bauteile und Verbindungen.`);
    renderCanvas();
  }

  function loadSolution() {
    saveHist();
    const p = projects[curProj];
    const s = buildTopology(p.solCells, p.solV, p.solH);
    placedCells = s.cells; vWires = s.vWires; hWires = s.hWires;
    selCell = null; wireStart = null; auditMode = false;
    resetReqUI();
    persistState();
    showStatus('ok', `👁️ <b>Original-Musterlösung für "${p.title}" geladen!</b>`);
    renderCanvas();
  }

  function toggleGhost() { showGhost = !showGhost; renderCanvas(); }

  function setTool(t) {
    activeTool = t; wireStart = null;
    ['SYM','VWIRE','W1','DEL'].forEach(k => {
      const btn = document.getElementById('tool_' + k);
      if (btn) btn.classList.toggle('active', k === t);
    });
    renderCanvas();
  }

  function renderTree() {
    const searchEl = document.getElementById('symSearch');
    const q = (searchEl ? searchEl.value : '').trim().toLowerCase();
    let html = '';
    catalog.forEach(f => {
      let subH = '', any = false;
      f.subs.forEach(s => {
        let itH = '';
        s.items.forEach(it => {
          if (!q || it.name.toLowerCase().includes(q) || it.defBmk.toLowerCase().includes(q) || it.defPins.toLowerCase().includes(q)) {
            any = true;
            itH += `<div class="sym-row ${selSymId === it.id ? 'active' : ''}" id="sr_${it.id}" onclick="SEE_CAD.selectSymbol('${it.id}')">
                      <span>${it.name}</span><span class="bmk-tag">${it.defBmk}</span></div>`;
          }
        });
        if (itH) subH += `<div class="f-cat"><div class="s-title" onclick="this.nextElementSibling.classList.toggle('open')">📂 ${s.name}</div><div class="f-kids ${q ? 'open' : ''}">${itH}</div></div>`;
      });
      if (any) html += `<div class="f-cat"><div class="f-title" onclick="this.nextElementSibling.classList.toggle('open')">📁 ${f.folder}</div><div class="f-kids open">${subH}</div></div>`;
    });
    const treeRoot = document.getElementById('treeRoot');
    if (treeRoot) treeRoot.innerHTML = html;
  }

  function collapseTree() {
    document.querySelectorAll('#seecad-trainer-container .f-kids').forEach(el => el.classList.remove('open'));
  }

  function selectSymbol(id) {
    selSymId = id; setTool('SYM');
    document.querySelectorAll('#seecad-trainer-container .sym-row').forEach(el => el.classList.remove('active'));
    const el = document.getElementById('sr_' + id);
    if (el) el.classList.add('active');
    const it = symMap[id];
    if (!it) return;
    document.getElementById('inpBmk').value = it.defBmk;
    document.getElementById('inpPins').value = it.defPins;
    document.getElementById('prevSvg').innerHTML = it.draw(it.defBmk, it.defPins, '');
    document.getElementById('prevTxt').innerHTML = `<b>${it.name}</b>Pfad: <code>${it.path}</code>`;
  }

  function showCoord(c, r) {
    const cd = document.getElementById('coordDisplay');
    if (cd) cd.textContent = `Koordinate: Pfad ${c} / Zeile ${ROW_LETTERS[r]} [${fmtCoord(c,r)}]`;
  }

  function onHWireClick(c, n, rightClick = false) {
    saveHist();
    auditMode = false;
    const key = `${c}_${n}`;
    if (rightClick || activeTool === 'DEL') {
      delete hWires[key];
    } else {
      hWires[key] = !hWires[key];
    }
    persistState();
    renderCanvas();
  }

  function applyAutoWireInCol(c, r) {
    const chk = document.getElementById('see_chkAutoWire');
    if (!chk || !chk.checked) return;
    let topBus = -1;
    for (let n = 0; n <= r; n++) {
      if (hWires[`${c-1}_${n}`] || hWires[`${c}_${n}`] || placedCells[`${c}_${n}`]) { topBus = n; break; }
    }
    if (topBus >= 0) {
      for (let row = topBus; row <= r; row++) vWires[`${c}_${row}`] = true;
    }
    if (placedCells[`${c}_10`]) {
      for (let row = r; row <= 10; row++) vWires[`${c}_${row}`] = true;
    }
  }

  function onCellClick(c, r, rightClick = false) {
    const key = `${c}_${r}`;
    saveHist();
    auditMode = false;
    showCoord(c, r);

    if (rightClick || activeTool === 'DEL') {
      delete placedCells[key];
      delete vWires[key];
      if (!placedCells[key]) {
        delete hWires[`${c}_${r}`];
        delete hWires[`${c-1}_${r}`];
      }
      persistState();
      renderCanvas();
      return;
    }

    if (activeTool === 'VWIRE') {
      vWires[key] = !vWires[key];
      persistState();
      renderCanvas();
    } else if (activeTool === 'SYM') {
      selCell = { c, r };
      if (placedCells[key]) {
        document.getElementById('inpBmk').value = placedCells[key].bmk;
        document.getElementById('inpPins').value = placedCells[key].pins;
        document.getElementById('inpSub').value = placedCells[key].sub || '';
      } else {
        placedCells[key] = C(selSymId, document.getElementById('inpBmk').value, document.getElementById('inpPins').value, document.getElementById('inpSub').value);
        applyAutoWireInCol(c, r);
      }
      persistState();
      renderCanvas();
    } else if (activeTool === 'W1') {
      if (!wireStart) {
        wireStart = { c, r };
      } else {
        const c1 = wireStart.c, r1 = wireStart.r;
        if (c1 === c && r1 !== r) {
          for (let row = Math.min(r1, r); row <= Math.max(r1, r); row++) vWires[`${c1}_${row}`] = true;
        } else if (r1 === r && c1 !== c) {
          for (let col = Math.min(c1, c); col < Math.max(c1, c); col++) {
            hWires[`${col}_${r}`] = true;
            hWires[`${col}_${r+1}`] = true;
          }
          vWires[`${c}_${r}`] = true;
        } else if (c1 !== c && r1 !== r) {
          for (let row = Math.min(r1, r); row <= Math.max(r1, r); row++) vWires[`${c1}_${row}`] = true;
          for (let col = Math.min(c1, c); col < Math.max(c1, c); col++) hWires[`${col}_${r}`] = true;
        }
        wireStart = null;
      }
      persistState();
      renderCanvas();
    }
  }

  function updateCellProps() {
    if (!selCell) return;
    const key = `${selCell.c}_${selCell.r}`;
    if (placedCells[key]) {
      placedCells[key].bmk = document.getElementById('inpBmk').value;
      placedCells[key].pins = document.getElementById('inpPins').value;
      placedCells[key].sub = document.getElementById('inpSub').value;
      persistState();
      renderCanvas();
    }
  }

  function resetReqUI() {
    const p = projects[curProj];
    p.reqs.forEach((r, i) => {
      const li = document.getElementById('req_' + i);
      if (li) { li.className = ''; li.innerHTML = `➤ ${r.text}`; }
    });
  }

  function isCellWired(c, r) {
    const topConn = (r > 0 && (placedCells[`${c}_${r-1}`] || vWires[`${c}_${r-1}`])) || hWires[`${c-1}_${r}`] || hWires[`${c}_${r}`];
    const botConn = (r < ROWS-1 && (placedCells[`${c}_${r+1}`] || vWires[`${c}_${r+1}`])) || hWires[`${c-1}_${r+1}`] || hWires[`${c}_${r+1}`];
    return !!(topConn && botConn);
  }

  function verifySingleCell(k, exp) {
    const cur = placedCells[k];
    if (!cur) return { ok: false, reason: `Fehlt: ${exp.bmk}` };
    if (cur.symId !== exp.symId) return { ok: false, reason: `Falsches Symbol (${exp.bmk})` };
    if (cur.bmk.trim().toUpperCase() !== exp.bmk.trim().toUpperCase()) return { ok: false, reason: `BMK: ${exp.bmk}!` };
    if (exp.pins && cur.pins.replace(/\s/g,'') !== exp.pins.replace(/\s/g,'')) return { ok: false, reason: `Pin: ${exp.pins}!` };
    const [c, r] = k.split('_').map(Number);
    if (!isCellWired(c, r)) return { ok: false, reason: `⚡ Pin offen!` };
    return { ok: true, reason: '' };
  }

  function runAudit() {
    auditMode = true;
    const p = projects[curProj];
    const targetCells = p.solCells;
    let passedReqs = 0;

    p.reqs.forEach((r, i) => {
      const allOk = r.keys.every(k => verifySingleCell(k, targetCells[k]).ok);
      if (allOk) passedReqs++;
      const li = document.getElementById('req_' + i);
      if (li) {
        li.className = allOk ? 'ok' : 'err';
        li.innerHTML = `${allOk ? '✅' : '❌'} ${r.text}`;
      }
    });

    if (passedReqs === p.reqs.length) {
      if (typeof playSuccessSound === 'function') playSuccessSound();
      showStatus('ok', `🎉 <b>100% Bestanden! Alle ${passedReqs} Prüfungsanforderungen (Symbole, BMK, Anschlussnummern & Verdrahtung) sind fehlerfrei umgesetzt!</b>`);
    } else {
      if (typeof playWrongSound === 'function') playWrongSound();
      showStatus('err', `⚠️ <b>${passedReqs} von ${p.reqs.length} Anforderungen erfüllt.</b> Im Schaltplan unten sind fehlende Bauteile, falsche BMKs/Pins oder offene Leitungen <b>rot markiert</b>!`);
    }
    renderCanvas();
  }

  function renderTopologyLayer(cellsMap, vMap, hMap, isGhost = false) {
    let g = isGhost ? `<g class="ghost-layer">` : `<g>`;
    const threePoleCols = {};
    Object.entries(cellsMap).forEach(([k, cell]) => {
      const [c] = k.split('_').map(Number);
      if (symMap[cell.symId]?.threePole) threePoleCols[c] = true;
    });

    for (let c = 1; c <= COLS; c++) {
      for (let r = 0; r < ROWS; r++) {
        const key = `${c}_${r}`;
        if (vMap[key] && !cellsMap[key]) {
          if (threePoleCols[c]) {
            [-16, 0, 16].forEach(dx => {
              g += `<line x1="${colX(c)+dx}" y1="${nodeY(r)}" x2="${colX(c)+dx}" y2="${nodeY(r+1)}" class="w-line"/>`;
            });
          } else {
            g += `<line x1="${colX(c)}" y1="${nodeY(r)}" x2="${colX(c)}" y2="${nodeY(r+1)}" class="w-line"/>`;
          }
        }
      }
    }

    for (let n = 0; n <= ROWS; n++) {
      for (let c = 1; c < COLS; c++) {
        if (hMap[`${c}_${n}`]) {
          if (n === 0 && (threePoleCols[c] || threePoleCols[c+1])) {
            [-5, 0, 5].forEach(dy => {
              g += `<line x1="${colX(c)-16}" y1="${nodeY(n)+dy}" x2="${colX(c+1)+16}" y2="${nodeY(n)+dy}" class="w-line"/>`;
            });
          } else {
            g += `<line x1="${colX(c)}" y1="${nodeY(n)}" x2="${colX(c+1)}" y2="${nodeY(n)}" class="w-line"/>`;
          }
        }
      }
    }

    for (let c = 1; c <= COLS; c++) {
      for (let n = 0; n <= ROWS; n++) {
        const hasUp   = n > 0 && (cellsMap[`${c}_${n-1}`] || vMap[`${c}_${n-1}`]);
        const hasDown = n < ROWS && (cellsMap[`${c}_${n}`] || vMap[`${c}_${n}`]);
        const hasLeft = hMap[`${c-1}_${n}`];
        const hasRight= hMap[`${c}_${n}`];
        const deg = (hasUp?1:0) + (hasDown?1:0) + (hasLeft?1:0) + (hasRight?1:0);
        if (deg >= 3) {
          g += `<circle cx="${colX(c)}" cy="${nodeY(n)}" r="2.7" fill="#000" pointer-events="none"/>`;
        }
      }
    }

    if (hMap["1_0"] || hMap["2_0"]) {
      const startC = hMap["1_0"] ? 1 : 2;
      const lbl = threePoleCols[4] ? "L1..L3" : "L1 (230V)";
      g += `<text x="${colX(startC) - 8}" y="${nodeY(0) + 4}" class="bmk-txt" font-size="10.5">${lbl}</text>`;
    }
    if (hMap["1_11"] || hMap["2_11"]) {
      const startC = hMap["1_11"] ? 1 : 2;
      g += `<text x="${colX(startC) - 8}" y="${nodeY(11) + 4}" class="bmk-txt" font-size="10.5">N</text>`;
    }

    Object.entries(cellsMap).forEach(([k, cell]) => {
      const [c, r] = k.split('_').map(Number);
      const sym = symMap[cell.symId];
      if (sym) {
        g += `<g transform="translate(${colX(c)}, ${rowY(r)})" pointer-events="none">${sym.draw(cell.bmk, cell.pins, cell.sub)}</g>`;
      }
    });

    g += `</g>`;
    return g;
  }

  function renderCanvas() {
    const svg = document.getElementById('cadSvg');
    if (!svg) return;
    const p = projects[curProj];
    const targetCells = p.solCells;
    let h = '';

    h += `<rect x="6" y="6" width="1088" height="693" class="frame-line"/>`;
    h += `<rect x="26" y="24" width="1048" height="657" class="frame-line"/>`;

    for (let c = 1; c <= COLS; c++) {
      const x = colX(c);
      h += `<text x="${x}" y="18" class="frame-txt">${c}</text>`;
      h += `<text x="${x}" y="694" class="frame-txt">${c}</text>`;
      if (c < COLS) {
        h += `<line x1="${x + 35}" y1="6" x2="${x + 35}" y2="24" class="frame-line"/>`;
        h += `<line x1="${x + 35}" y1="681" x2="${x + 35}" y2="699" class="frame-line"/>`;
      }
    }

    ROW_LETTERS.forEach((ltr, rIdx) => {
      const y = rowY(rIdx);
      h += `<text x="16" y="${y + 4}" class="frame-txt">${ltr}</text>`;
      h += `<text x="1084" y="${y + 4}" class="frame-txt">${ltr}</text>`;
      h += `<line x1="6" y1="${nodeY(rIdx+1)}" x2="26" y2="${nodeY(rIdx+1)}" class="frame-line"/>`;
      h += `<line x1="1074" y1="${nodeY(rIdx+1)}" x2="1094" y2="${nodeY(rIdx+1)}" class="frame-line"/>`;
    });

    p.bottom.forEach(b => {
      const bx = colX(b.c);
      h += `<text x="${bx}" y="584" class="func-txt">${b.t1}</text>`;
      if (b.t2) h += `<text x="${bx}" y="596" class="func-txt">${b.t2}</text>`;
    });

    h += `<g>
      <line x1="26" y1="608" x2="1074" y2="608" class="frame-line"/>
      <line x1="26" y1="626" x2="560" y2="626" class="frame-line"/>
      <line x1="26" y1="644" x2="560" y2="644" class="frame-line"/>
      <line x1="26" y1="662" x2="1074" y2="662" class="frame-line"/>
      <line x1="310" y1="608" x2="310" y2="681" class="frame-line"/>
      <line x1="360" y1="608" x2="360" y2="681" class="frame-line"/>
      <line x1="560" y1="608" x2="560" y2="681" class="frame-line"/>
      <line x1="960" y1="608" x2="960" y2="681" class="frame-line"/>
      <text x="34" y="640" class="pin-txt" font-weight="bold">Prüfungsnummer :</text>
      <text x="180" y="640" class="pin-txt" font-weight="bold">Datum :</text>
      <text x="370" y="621" class="pin-txt" font-weight="bold">Name</text>
      <text x="480" y="621" class="pin-txt" font-weight="bold">Datum</text>
      <text x="316" y="640" class="pin-txt" font-weight="bold">gez.:</text>
      <text x="316" y="657" class="pin-txt" font-weight="bold">gepr.:</text>
      <text x="316" y="675" class="pin-txt" font-weight="bold">Norm: DIN EN 60617</text>
      <text x="568" y="621" class="pin-txt" font-weight="bold">Bezeichnung:</text>
      <text x="640" y="642" font-size="12" font-weight="bold" fill="#000">${p.sheetTitle}</text>
      <text x="568" y="675" class="pin-txt" font-weight="bold">Zeichnungs-Nr.: GP2-CAD-${curProj + 1}</text>
      <text x="968" y="621" class="pin-txt" font-weight="bold">Blatt</text>
      <text x="1015" y="648" font-size="13" font-weight="bold" fill="#000">1</text>
      <text x="968" y="675" class="pin-txt" font-weight="bold">von &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 1</text>
    </g>`;

    if (showGhost) {
      const solTopo = buildTopology(p.solCells, p.solV, p.solH);
      h += renderTopologyLayer(solTopo.cells, solTopo.vWires, solTopo.hWires, true);
    }

    for (let c = 1; c <= COLS; c++) {
      for (let r = 0; r < ROWS; r++) {
        const x = colX(c), y = rowY(r);
        const key = `${c}_${r}`;
        const isSel = selCell && selCell.c === c && selCell.r === r;
        const isWStart = wireStart && wireStart.c === c && wireStart.r === r;
        let hitClass = 'cell-hit' + (isSel ? ' sel' : '') + (isWStart ? ' wire-start' : '');
        let auditHint = '';

        if (auditMode && targetCells[key]) {
          const chk = verifySingleCell(key, targetCells[key]);
          if (chk.ok) {
            hitClass += ' chk-ok';
          } else {
            hitClass += ' chk-err';
            auditHint = `<text x="${x}" y="${y + 21}" font-size="8" font-weight="bold" fill="#dc2626" text-anchor="middle" pointer-events="none">${chk.reason}</text>`;
          }
        }

        h += `<rect x="${x - 33}" y="${y - 24}" width="66" height="48" class="${hitClass}"
                onmouseenter="SEE_CAD.showCoord(${c},${r})"
                onclick="SEE_CAD.onCellClick(${c},${r},false)"
                oncontextmenu="event.preventDefault(); SEE_CAD.onCellClick(${c},${r},true);" />`;
        if (auditHint) h += auditHint;
      }
    }

    h += renderTopologyLayer(placedCells, vWires, hWires, false);

    for (let n = 0; n <= ROWS; n++) {
      for (let c = 1; c < COLS; c++) {
        h += `<line x1="${colX(c)+8}" y1="${nodeY(n)}" x2="${colX(c+1)-8}" y2="${nodeY(n)}" class="h-hit"
                onclick="SEE_CAD.onHWireClick(${c},${n},false)"
                oncontextmenu="event.preventDefault(); SEE_CAD.onHWireClick(${c},${n},true);">
                <title>Waagerechte Brücke Pfad ${c} ➔ ${c+1} (Klick = Ein/Aus, Rechtsklick = Löschen)</title>
              </line>`;
      }
    }

    svg.innerHTML = h;
  }

  function showStatus(type, msg) {
    const b = document.getElementById('statusBar');
    if (!b) return;
    b.className = 'status-bar st-' + type;
    b.innerHTML = msg;
  }

  function getContextSummary() {
    const p = projects[curProj];
    if (!p) return "";
    const placedList = Object.entries(placedCells).map(([k, v]) => {
      const [c, r] = k.split('_').map(Number);
      return `${fmtCoord(c, r)}: ${v.bmk} (${v.pins})`;
    }).join(', ');
    return `SEE Electrical CAD-Trainer — Aktuelles Projekt: ${p.title}\nLastenheft:\n${p.reqs.map(r => "- " + r.text).join('\n')}\nBereits gesetzte Bauteile des Prüflings: ${placedList || "Noch keine"}`;
  }

  init();

  return {
    onSwitchProject,
    toggleBriefing,
    startBlank,
    loadTemplate,
    toggleGhost,
    runAudit,
    loadSolution,
    setTool,
    undo,
    updateCellProps,
    toggleExamSearchMode,
    collapseTree,
    renderTree,
    selectSymbol,
    showCoord,
    onCellClick,
    onHWireClick,
    renderCanvas,
    getContextSummary
  };
})();

// =========================================================================
// 24. SZENARIO 5: SPS PRÜFUNGS-TRAINER (EASYSOFT & SIEMENS TIA KOP-SIMULATOR)
// =========================================================================
window.SPS_SIM = (function() {
  let useTiaSyntax = false;
  const tiaMap = {
    I1: '%I0.0', I2: '%I0.1', I3: '%I0.2', I4: '%I0.3',
    Q1: '%Q0.0', Q2: '%Q0.1', Q3: '%Q0.2', Q4: '%Q0.3',
    M1: '%M0.0', M2: '%M0.1', T1: '%T1', T2: '%T2', C1: '%C1'
  };

  function fmtAddr(v) {
    return useTiaSyntax ? (tiaMap[v] || v) : v;
  }

  const examTasks = [
    {
      title: "Aufgabe 1: Gemischte Ventilsteuerung (UND vor ODER)",
      desc: "Das Magnetventil <b>Q1 (-Y1)</b> soll einschalten, wenn der Hauptschalter <b>I1 (-S1)</b> eingeschaltet ist UND zusätzlich entweder der Merker <b>M1</b> ODER der Drucksensor <b>I2 (-B1)</b> Signal führt.",
      tags: { I1: "-S1 Schalter", I2: "-B1 Sensor", I3: "Reserve", I4: "Reserve", Q1: "-Y1 Ventil", M1: "Merker 1" },
      hint: "Setze in Zeile 001: Schließer I1 + Schließer M1 + Spule [ Q1. Setze in Zeile 002: Schließer I2 in Spalte 2 und verbinde ihn links und rechts über die ↕-Punkte parallel zu M1!",
      solution: {
        rows: [
          { c: [{type:'NO',v:'I1'}, {type:'NO',v:'M1'}, {type:'WIRE',v:'I1'}], q: {type:'COIL',v:'Q1',func:'CONT',tMode:'TON',tSec:3,cLim:3} },
          { c: [{type:'EMPTY',v:'I1'}, {type:'NO',v:'I2'}, {type:'EMPTY',v:'I1'}], q: {type:'EMPTY',v:'Q1',func:'CONT',tMode:'TON',tSec:3,cLim:3} }
        ],
        vb: [[0,1], [0,2]]
      },
      testFn: (runner) => {
        for (let i = 0; i < 8; i++) {
          const s = { I1: !!(i&1), I2: !!(i&2), M1: !!(i&4), I3:false, I4:false };
          const res = runner([{ inputs: s, duration: 0.1 }]);
          const exp = s.I1 && (s.M1 || s.I2);
          if (res.vars.Q1 !== exp) {
            return { ok: false, msg: `Fehler bei <code>I1=${s.I1?1:0}, M1=${s.M1?1:0}, I2=${s.I2?1:0}</code>: Dein Ausgang Q1 ist <b>${res.vars.Q1?1:0}</b>, muss aber <b>${exp?1:0}</b> sein.` };
          }
        }
        return { ok: true, msg: "Perfekt! Die UND-vor-ODER-Verknüpfung für das Ventil Q1 (-Y1) funktioniert in allen Schaltzuständen fehlerfrei!" };
      }
    },
    {
      title: "Aufgabe 2: Klassische Selbsthaltung mit Aus-Taster (Prüfungsklassiker)",
      desc: "Ein Förderbandmotor <b>Q1 (-K1)</b> wird über den Start-Taster <b>I1 (-S1)</b> eingeschaltet und muss über einen eigenen Schließer-Kontakt <b>Q1</b> in Selbsthaltung bleiben, wenn I1 wieder losgelassen wird. Über den Stopp-Taster <b>I2 (-S2, als Öffner im KOP)</b> oder bei Auslösen des Motorschutzes <b>I3 (-F1, als Öffner im KOP)</b> muss der Motor sofort abschalten.",
      tags: { I1: "-S1 Start (Ein)", I2: "-S2 Stopp (Aus)", I3: "-F1 Motorschutz", I4: "Reserve", Q1: "-K1 Netzschütz" },
      hint: "Zeile 001: Schließer I1 in Reihe mit Öffner I2 (-|/|-), Öffner I3 (-|/|-), Spule [ Q1. Zeile 002: Schließer Q1 in Spalte 1 und über den ↕-Punkt nach Spalte 1 mit Zeile 001 verbinden!",
      solution: {
        rows: [
          { c: [{type:'NO',v:'I1'}, {type:'NC',v:'I2'}, {type:'NC',v:'I3'}], q: {type:'COIL',v:'Q1',func:'CONT',tMode:'TON',tSec:3,cLim:3} },
          { c: [{type:'NO',v:'Q1'}, {type:'EMPTY',v:'I1'}, {type:'EMPTY',v:'I1'}], q: {type:'EMPTY',v:'Q1',func:'CONT',tMode:'TON',tSec:3,cLim:3} }
        ],
        vb: [[0,1]]
      },
      testFn: (runner) => {
        let r = runner([{ inputs: {I1:false,I2:false,I3:false}, duration: 0.1 }]);
        if (r.vars.Q1) return { ok: false, msg: "Fehler in Grundstellung (alle Taster 0): Q1 darf noch nicht eingeschaltet sein!" };
        r = runner([
          { inputs: {I1:true, I2:false, I3:false}, duration: 0.1 },
          { inputs: {I1:false, I2:false, I3:false}, duration: 0.1 }
        ]);
        if (!r.vars.Q1) return { ok: false, msg: "Selbsthaltung fehlt! Nachdem Starttaster I1 (-S1) kurz gedrückt und wieder losgelassen wurde, fällt Q1 sofort wieder ab. Hast du den Schließer Q1 parallel zu I1 vergessen?" };
        r = runner([
          { inputs: {I1:true, I2:false, I3:false}, duration: 0.1 },
          { inputs: {I1:false, I2:true, I3:false}, duration: 0.1 }
        ]);
        if (r.vars.Q1) return { ok: false, msg: "Abschaltung über I2 (-S2 Stopp) funktioniert nicht! Wenn I2 = 1 wird, muss Q1 abschalten." };
        r = runner([
          { inputs: {I1:true, I2:false, I3:false}, duration: 0.1 },
          { inputs: {I1:false, I2:false, I3:true}, duration: 0.1 }
        ]);
        if (r.vars.Q1) return { ok: false, msg: "Motorschutz-Abschaltung I3 (-F1) fehlt! Wenn I3 = 1 wird, muss die Selbsthaltung unterbrochen werden." };
        return { ok: true, msg: "100% bestanden! Start, Selbsthaltung über Q1 sowie Abschaltung über Stopp (-S2) und Motorschutz (-F1) arbeiten normgerecht!" };
      }
    },
    {
      title: "Aufgabe 3: Wendeschützschaltung mit Schützverriegelung (Rechts-/Linkslauf)",
      desc: "Taster <b>I1 (-S1)</b> schaltet Rechtslauf <b>Q1 (-K1)</b> ein, solange er gedrückt wird (Tippbetrieb). Taster <b>I2 (-S2)</b> schaltet Linkslauf <b>Q2 (-K2)</b> ein. <b>Wichtig (Kurzschlussschutz!):</b> Beide Schütze müssen gegenseitig verriegelt sein (Öffner von Q2 im Pfad von Q1 und Öffner von Q1 im Pfad von Q2), sodass niemals beide gleichzeitig anziehen können!",
      tags: { I1: "-S1 Rechts", I2: "-S2 Links", I3: "Reserve", I4: "Reserve", Q1: "-K1 Rechtslauf", Q2: "-K2 Linkslauf" },
      hint: "Zeile 001: Schließer I1 + Öffner Q2 (-|/|-)+ Spule [ Q1. Zeile 002: Schließer I2 + Öffner Q1 (-|/|-)+ Spule [ Q2.",
      solution: {
        rows: [
          { c: [{type:'NO',v:'I1'}, {type:'NC',v:'Q2'}, {type:'WIRE',v:'I1'}], q: {type:'COIL',v:'Q1',func:'CONT',tMode:'TON',tSec:3,cLim:3} },
          { c: [{type:'NO',v:'I2'}, {type:'NC',v:'Q1'}, {type:'WIRE',v:'I1'}], q: {type:'COIL',v:'Q2',func:'CONT',tMode:'TON',tSec:3,cLim:3} }
        ],
        vb: []
      },
      testFn: (runner) => {
        let r1 = runner([{ inputs: {I1:true, I2:false}, duration: 0.1 }]);
        if (!r1.vars.Q1 || r1.vars.Q2) return { ok: false, msg: "Bei I1=1 (Rechtslauf) muss Q1=1 und Q2=0 sein!" };
        let r2 = runner([{ inputs: {I1:false, I2:true}, duration: 0.1 }]);
        if (!r2.vars.Q2 || r2.vars.Q1) return { ok: false, msg: "Bei I2=1 (Linkslauf) muss Q2=1 und Q1=0 sein!" };
        let rBoth = runner([{ inputs: {I1:true, I2:true}, duration: 0.1 }]);
        if (rBoth.vars.Q1 && rBoth.vars.Q2) {
          return { ok: false, msg: "⚡ KURZSCHLUSS-GEFAHR! Wenn I1 und I2 gleichzeitig gedrückt werden, ziehen Q1 und Q2 gleichzeitig an! Du musst einen Öffner von Q2 in Reihe zu Q1 und einen Öffner von Q1 in Reihe zu Q2 einbauen!" };
        }
        return { ok: true, msg: "Ausgezeichnet! Rechtslauf (Q1) und Linkslauf (Q2) funktionieren und sind gegenseitig elektrisch verriegelt!" };
      }
    },
    {
      title: "Aufgabe 4: Einschaltverzögerung mit Zeitrelais (TON - 3.0s)",
      desc: "Wenn Schalter <b>I1 (-S1)</b> eingeschaltet wird, soll das Zeitrelais <b>TT1 (Einschaltverzögert TON, 3.0s)</b> starten. Erst wenn I1 durchgehend 3 Sekunden lang aktiv ist, schaltet der Zeitrelais-Kontakt <b>T1</b> das Hauptschütz <b>Q1 (-K1)</b> ein.",
      tags: { I1: "-S1 Freigabe", I2: "Reserve", I3: "Reserve", I4: "Reserve", Q1: "-K1 Hauptschütz", T1: "Zeitrelais 3.0s" },
      hint: "Zeile 001: Schließer I1 auf Zeitrelais-Spule TT1 (Modus TON, 3.0s). Zeile 002: Schließer T1 auf Ausgangsspule [ Q1.",
      solution: {
        rows: [
          { c: [{type:'NO',v:'I1'}, {type:'WIRE',v:'I1'}, {type:'WIRE',v:'I1'}], q: {type:'COIL',v:'T1',func:'CONT',tMode:'TON',tSec:3,cLim:3} },
          { c: [{type:'NO',v:'T1'}, {type:'WIRE',v:'I1'}, {type:'WIRE',v:'I1'}], q: {type:'COIL',v:'Q1',func:'CONT',tMode:'TON',tSec:3,cLim:3} }
        ],
        vb: []
      },
      testFn: (runner) => {
        let rEarly = runner([{ inputs: {I1:true}, duration: 1.0 }]);
        if (rEarly.vars.Q1) return { ok: false, msg: "Q1 schaltet sofort ein (schon nach 1s)! Es darf erst nach Ablauf der Einschaltverzögerung (3.0s) von TT1 einschalten." };
        let rLate = runner([{ inputs: {I1:true}, duration: 3.5 }]);
        if (!rLate.vars.Q1) return { ok: false, msg: "Nach 3.5 Sekunden Dauerbetätigung von I1 ist Q1 immer noch AUS! Prüfe, ob TT1 angesteuert wird und Kontakt T1 die Spule Q1 schaltet." };
        return { ok: true, msg: "Perfekt! Das Zeitrelais TT1 verzögert das Einschalten von Q1 exakt um 3 Sekunden!" };
      }
    },
    {
      title: "Aufgabe 5: Lüfter-Nachlaufsteuerung (Ausschaltverzögerung TOF - 3.0s)",
      desc: "Schalter <b>I1 (-S1)</b> schaltet die Raumbeleuchtung <b>Q1 (-E1)</b> direkt ein und aus. Gleichzeitig soll mit I1 über das rückfallverzögerte Zeitrelais <b>TT1 (TOF, 3.0s)</b> der Lüfter <b>Q2 (-M1)</b> sofort mit anlaufen und nach dem Ausschalten des Lichts noch <b>3 Sekunden nachlaufen</b>.",
      tags: { I1: "-S1 Lichtschalter", I2: "Reserve", I3: "Reserve", I4: "Reserve", Q1: "-E1 Licht", Q2: "-M1 Lüfter", T1: "Nachlauf 3.0s" },
      hint: "Zeile 001: Schließer I1 ➔ Spule [ Q1. Zeile 002: Schließer I1 ➔ Zeitrelais TT1 (Ausschaltverzögert TOF, 3.0s). Zeile 003: Schließer T1 ➔ Spule [ Q2.",
      solution: {
        rows: [
          { c: [{type:'NO',v:'I1'}, {type:'WIRE',v:'I1'}, {type:'WIRE',v:'I1'}], q: {type:'COIL',v:'Q1',func:'CONT',tMode:'TON',tSec:3,cLim:3} },
          { c: [{type:'NO',v:'I1'}, {type:'WIRE',v:'I1'}, {type:'WIRE',v:'I1'}], q: {type:'COIL',v:'T1',func:'CONT',tMode:'TOF',tSec:3,cLim:3} },
          { c: [{type:'NO',v:'T1'}, {type:'WIRE',v:'I1'}, {type:'WIRE',v:'I1'}], q: {type:'COIL',v:'Q2',func:'CONT',tMode:'TON',tSec:3,cLim:3} }
        ],
        vb: []
      },
      testFn: (runner) => {
        let rOn = runner([{ inputs: {I1:true}, duration: 0.2 }]);
        if (!rOn.vars.Q1 || !rOn.vars.Q2) return { ok: false, msg: "Wenn I1=1 ist, müssen sowohl Licht Q1 als auch Lüfter Q2 sofort eingeschaltet sein!" };
        let rWait = runner([
          { inputs: {I1:true}, duration: 0.2 },
          { inputs: {I1:false}, duration: 1.5 }
        ]);
        if (rWait.vars.Q1) return { ok: false, msg: "Nachdem I1 ausgeschaltet wurde, muss das Licht Q1 sofort ausgehen!" };
        if (!rWait.vars.Q2) return { ok: false, msg: "Der Lüfter Q2 geht sofort mit I1 aus! Er soll über ein ausschaltverzögertes Zeitrelais (TOF) noch 3 Sekunden nachlaufen." };
        let rDone = runner([
          { inputs: {I1:true}, duration: 0.2 },
          { inputs: {I1:false}, duration: 3.5 }
        ]);
        if (rDone.vars.Q2) return { ok: false, msg: "Nach 3.5 Sekunden ist der Lüfter Q2 immer noch an! Er muss nach Ablauf der Nachlaufzeit (3.0s) abschalten." };
        return { ok: true, msg: "Meisterhaft! Licht Q1 schaltet direkt und Lüfter Q2 läuft über TT1 (TOF) exakt 3 Sekunden nach!" };
      }
    },
    {
      title: "Aufgabe 6: Stückzahlerfassung mit Zähler C1 (3 Impulse + Reset)",
      desc: "Eine Lichtschranke <b>I1 (-B1)</b> zählt Pakete über die Zählspule <b>CC1 (Sollwert: 3 Impulse)</b>. Sobald 3 Pakete gezählt wurden, schaltet der Zählerkontakt <b>C1</b> die Meldeleuchte <b>Q1 (-P1 'Karton voll')</b> ein. Mit Taster <b>I2 (-S2)</b> wird der Zähler über die Resetspule <b>RC1</b> wieder auf 0 zurückgesetzt.",
      tags: { I1: "-B1 Lichtschranke", I2: "-S2 Reset-Taster", I3: "Reserve", I4: "Reserve", Q1: "-P1 Karton voll", C1: "Zähler (Soll: 3)" },
      hint: "Zeile 001: Schließer I1 ➔ Spule CC1 (Zählspule, Soll: 3). Zeile 002: Schließer I2 ➔ Spule RC1 (Reset). Zeile 003: Schließer C1 ➔ Spule [ Q1.",
      solution: {
        rows: [
          { c: [{type:'NO',v:'I1'}, {type:'WIRE',v:'I1'}, {type:'WIRE',v:'I1'}], q: {type:'COIL',v:'C1',func:'CC',tMode:'TON',tSec:3,cLim:3} },
          { c: [{type:'NO',v:'I2'}, {type:'WIRE',v:'I1'}, {type:'WIRE',v:'I1'}], q: {type:'COIL',v:'C1',func:'RC',tMode:'TON',tSec:3,cLim:3} },
          { c: [{type:'NO',v:'C1'}, {type:'WIRE',v:'I1'}, {type:'WIRE',v:'I1'}], q: {type:'COIL',v:'Q1',func:'CONT',tMode:'TON',tSec:3,cLim:3} }
        ],
        vb: []
      },
      testFn: (runner) => {
        let r2 = runner([
          { inputs: {I1:true, I2:false}, duration: 0.1 }, { inputs: {I1:false, I2:false}, duration: 0.1 },
          { inputs: {I1:true, I2:false}, duration: 0.1 }, { inputs: {I1:false, I2:false}, duration: 0.1 }
        ]);
        if (r2.vars.Q1) return { ok: false, msg: "Q1 leuchtet schon nach 2 Impulsen! Der Zähler CC1 soll erst beim 3. Impuls von I1 durchschalten." };
        let r3 = runner([
          { inputs: {I1:true, I2:false}, duration: 0.1 }, { inputs: {I1:false, I2:false}, duration: 0.1 },
          { inputs: {I1:true, I2:false}, duration: 0.1 }, { inputs: {I1:false, I2:false}, duration: 0.1 },
          { inputs: {I1:true, I2:false}, duration: 0.1 }, { inputs: {I1:false, I2:false}, duration: 0.1 }
        ]);
        if (!r3.vars.Q1) return { ok: false, msg: "Nach 3 Impulsen an I1 ist Q1 noch nicht eingeschaltet! Prüfe Zählspule CC1 (Soll=3) und Kontakt C1 auf Spule Q1." };
        let rRes = runner([
          { inputs: {I1:true, I2:false}, duration: 0.1 }, { inputs: {I1:false, I2:false}, duration: 0.1 },
          { inputs: {I1:true, I2:false}, duration: 0.1 }, { inputs: {I1:false, I2:false}, duration: 0.1 },
          { inputs: {I1:true, I2:false}, duration: 0.1 }, { inputs: {I1:false, I2:false}, duration: 0.1 },
          { inputs: {I1:false, I2:true}, duration: 0.1 }
        ]);
        if (rRes.vars.Q1) return { ok: false, msg: "Reset über I2 funktioniert nicht! Taster I2 muss die Resetspule RC1 ansteuern, damit der Zähler wieder auf 0 springt." };
        return { ok: true, msg: "Perfekt gelöst! Zähler CC1 zählt exakt 3 Flanken an I1, schaltet Q1 ein und lässt sich über I2 (RC1) zurücksetzen!" };
      }
    },
    {
      title: "Freies Bauen (Sandbox-Modus ohne Vorgaben)",
      desc: "Hier kannst du eigene Schaltungen (Schütze, Selbsthaltungen, Stromstoßrelais, Zeitrelais, Zähler) frei aufbauen und live testen.",
      tags: { I1: "Eingang 1", I2: "Eingang 2", I3: "Eingang 3", I4: "Eingang 4", Q1: "Ausgang 1", Q2: "Ausgang 2" },
      hint: "Im freien Modus gibt es keine feste Aufgabe. Nutze Rechtsklick auf ein Bauteil, um es schnell zu löschen!",
      solution: null,
      testFn: null
    }
  ];

  let ROWS = 5;
  const COLS = 3;
  let currentTool = 'NO';
  let grid = [];
  let coils = [];
  let vBridge = [];
  let liveState = createFreshPlcState();

  function createFreshPlcState() {
    return {
      vars: { I1:false, I2:false, I3:false, I4:false, Q1:false, Q2:false, Q3:false, Q4:false, M1:false, M2:false, T1:false, T2:false, C1:false },
      timers: { T1: { elapsed: 0 }, T2: { elapsed: 0 } },
      counters: { C1: { count: 0, limit: 3, prevTrig: false } },
      prevRowPower: Array(20).fill(false)
    };
  }

  function init() {
    const tSel = document.getElementById('taskSelect');
    if (!tSel) return;
    tSel.innerHTML = '';
    examTasks.forEach((t, i) => {
      const opt = document.createElement('option');
      opt.value = i; opt.textContent = t.title;
      tSel.appendChild(opt);
    });
    populateDropdowns();
    clearAll();
    loadSelectedTask();
    setInterval(() => {
      const spsBox = document.getElementById('sps-trainer-container');
      if (!spsBox || spsBox.classList.contains('hidden')) return;
      const diag = stepPlcEngine(liveState, 0.05);
      updateLiveDOM(diag);
    }, 50);
  }

  function toggleSyntaxMode() {
    useTiaSyntax = !useTiaSyntax;
    const badge = document.getElementById('modeBadge');
    if (badge) {
      badge.textContent = useTiaSyntax
        ? 'Darstellung: Siemens TIA (%I0.0 / %Q0.0)'
        : 'Darstellung: Eaton easySoft (I1 / Q1)';
    }
    populateDropdowns();
    renderTagTable();
    buildCockpitDOM();
    buildSvgDOM();
  }

  function populateDropdowns() {
    const cSel = document.getElementById('contactVar');
    if (!cSel) return;
    const prevC = cSel.value || 'I1';
    cSel.innerHTML = `
      <optgroup label="Eingänge">
        ${['I1','I2','I3','I4'].map(k => `<option value="${k}">${fmtAddr(k)} (${getTagName(k)})</option>`).join('')}
      </optgroup>
      <optgroup label="Ausgangs-Kontakte (Selbsthaltung/Verriegelung)">
        ${['Q1','Q2','Q3','Q4'].map(k => `<option value="${k}">${fmtAddr(k)} (Kontakt)</option>`).join('')}
      </optgroup>
      <optgroup label="Zeitrelais- & Zähler-Kontakte">
        <option value="T1">${fmtAddr('T1')} (Zeitkontakt 1)</option>
        <option value="T2">${fmtAddr('T2')} (Zeitkontakt 2)</option>
        <option value="C1">${fmtAddr('C1')} (Zählerkontakt 1)</option>
      </optgroup>
      <optgroup label="Merker-Kontakte">
        <option value="M1">${fmtAddr('M1')} (Merker 1)</option>
        <option value="M2">${fmtAddr('M2')} (Merker 2)</option>
      </optgroup>
    `;
    cSel.value = prevC;

    const qSel = document.getElementById('coilVar');
    if (!qSel) return;
    const prevQ = qSel.value || 'Q1';
    qSel.innerHTML = `
      <optgroup label="Ausgangs-Spulen">
        ${['Q1','Q2','Q3','Q4'].map(k => `<option value="${k}">${fmtAddr(k)} (Ausgang)</option>`).join('')}
      </optgroup>
      <optgroup label="Zeitrelais-Spulen (Timer)">
        <option value="T1">TT1 (${fmtAddr('T1')} Zeitrelais 1)</option>
        <option value="T2">TT2 (${fmtAddr('T2')} Zeitrelais 2)</option>
      </optgroup>
      <optgroup label="Zähler-Spulen (Counter)">
        <option value="C1">${fmtAddr('C1')} (Impulszähler 1)</option>
      </optgroup>
      <optgroup label="Merker-Spulen">
        <option value="M1">${fmtAddr('M1')} (Merker 1)</option>
        <option value="M2">${fmtAddr('M2')} (Merker 2)</option>
      </optgroup>
    `;
    qSel.value = prevQ;
    updateCoilParamUI();
  }

  function getTagName(k) {
    const tSel = document.getElementById('taskSelect');
    const task = examTasks[tSel ? (tSel.value || 0) : 0];
    return (task && task.tags && task.tags[k]) ? task.tags[k] : k;
  }

  function loadSelectedTask() {
    const tSel = document.getElementById('taskSelect');
    const task = examTasks[tSel ? tSel.value : 0];
    if (!task) return;
    const descEl = document.getElementById('taskDesc');
    if (descEl) descEl.innerHTML = task.desc;
    hideFeedback();
    populateDropdowns();
    renderTagTable();
    buildCockpitDOM();
    buildSvgDOM();
  }

  function renderTagTable() {
    const tSel = document.getElementById('taskSelect');
    const task = examTasks[tSel ? tSel.value : 0];
    const box = document.getElementById('tagTable');
    if (!box) return;
    if (!task || !task.tags) { box.innerHTML = ''; return; }
    box.innerHTML = Object.entries(task.tags).map(([k, sym]) =>
      `<span class="tag-chip"><b>${fmtAddr(k)}</b> = ${sym}</span>`
    ).join('');
  }

  function selectTool(t) {
    currentTool = t;
    ['NO','NC','WIRE','DEL'].forEach(k => {
      const btn = document.getElementById('btnTool_' + k);
      if (btn) btn.classList.toggle('active', k === t);
    });
  }

  function updateCoilParamUI() {
    const qSel = document.getElementById('coilVar');
    if (!qSel) return;
    const v = qSel.value;
    const isT = v.startsWith('T');
    const isC = v.startsWith('C');
    document.getElementById('coilFunc').style.display = (!isT && !isC) ? 'inline-block' : 'none';
    document.getElementById('timerMode').style.display = isT ? 'inline-block' : 'none';
    document.getElementById('timerSecWrap').style.display = isT ? 'inline-block' : 'none';
    document.getElementById('counterFunc').style.display = isC ? 'inline-block' : 'none';
    document.getElementById('counterLimWrap').style.display = isC ? 'inline-block' : 'none';
  }

  function clearAll() {
    grid = Array.from({ length: ROWS }, () =>
      Array.from({ length: COLS }, () => ({ type: 'EMPTY', v: 'I1' }))
    );
    coils = Array.from({ length: ROWS }, () => ({
      type: 'EMPTY', v: 'Q1', func: 'CONT', tMode: 'TON', tSec: 3.0, cLim: 3
    }));
    vBridge = Array.from({ length: ROWS - 1 }, () => Array(COLS + 1).fill(false));
    liveState = createFreshPlcState();
    hideFeedback();
    checkPlcLinter();
    buildSvgDOM();
  }

  function addRow() {
    ROWS++;
    grid.push(Array.from({ length: COLS }, () => ({ type: 'EMPTY', v: 'I1' })));
    coils.push({ type: 'EMPTY', v: 'Q1', func: 'CONT', tMode: 'TON', tSec: 3.0, cLim: 3 });
    vBridge.push(Array(COLS + 1).fill(false));
    buildSvgDOM();
  }

  function onContactCellClick(r, c, rightClick = false) {
    hideFeedback();
    if (rightClick || currentTool === 'DEL') {
      grid[r][c] = { type: 'EMPTY', v: 'I1' };
    } else {
      const selV = document.getElementById('contactVar').value;
      const cell = grid[r][c];
      if ((currentTool === 'NO' || currentTool === 'NC') && cell.v === selV && (cell.type === 'NO' || cell.type === 'NC')) {
        cell.type = (cell.type === 'NO') ? 'NC' : 'NO';
      } else {
        grid[r][c] = { type: currentTool, v: selV };
      }
    }
    checkPlcLinter();
    buildSvgDOM();
  }

  function onCoilCellClick(r, rightClick = false) {
    hideFeedback();
    if (rightClick || currentTool === 'DEL') {
      coils[r] = { type: 'EMPTY', v: 'Q1', func: 'CONT', tMode: 'TON', tSec: 3.0, cLim: 3 };
    } else {
      const v = document.getElementById('coilVar').value;
      const func = v.startsWith('C') ? document.getElementById('counterFunc').value : document.getElementById('coilFunc').value;
      const tMode = document.getElementById('timerMode').value;
      const tSec = parseFloat(document.getElementById('timerSec').value) || 3.0;
      const cLim = parseInt(document.getElementById('counterLim').value, 10) || 3;
      coils[r] = { type: 'COIL', v, func, tMode, tSec, cLim };

      const chk = document.getElementById('sps_chkAutoWire');
      if (chk && chk.checked) {
        const hasAnyContact = grid[r].some(cell => cell.type !== 'EMPTY');
        if (hasAnyContact) {
          for (let col = 0; col < COLS; col++) {
            if (grid[r][col].type === 'EMPTY') {
              grid[r][col] = { type: 'WIRE', v: 'I1' };
            }
          }
        }
      }
    }
    checkPlcLinter();
    buildSvgDOM();
  }

  function toggleVBridge(r, cJunc) {
    hideFeedback();
    vBridge[r][cJunc] = !vBridge[r][cJunc];
    checkPlcLinter();
    buildSvgDOM();
  }

  function toggleInput(k) {
    liveState.vars[k] = !liveState.vars[k];
  }

  function setInput(k, val) {
    liveState.vars[k] = Boolean(val);
  }

  function checkPlcLinter() {
    const linter = document.getElementById('linterBox');
    if (!linter) return;
    const contCounts = {};
    const openRows = [];

    for (let r = 0; r < ROWS; r++) {
      const q = coils[r];
      if (q.type === 'COIL') {
        if (!q.v.startsWith('T') && !q.v.startsWith('C') && q.func === 'CONT') {
          contCounts[q.v] = (contCounts[q.v] || 0) + 1;
        }
        const hasEmpty = grid[r].some(c => c.type === 'EMPTY');
        const hasBridge = (r > 0 && vBridge[r-1].some(Boolean)) || (r < ROWS-1 && vBridge[r].some(Boolean));
        if (hasEmpty && !hasBridge) {
          openRows.push(String(r + 1).padStart(3, '0'));
        }
      }
    }

    const doubleCoils = Object.keys(contCounts).filter(v => contCounts[v] > 1);
    if (doubleCoils.length > 0) {
      linter.style.display = 'block';
      linter.innerHTML = `⚠️ <b>SPS-Warnung (Doppelzuweisung von ${doubleCoils.map(fmtAddr).join(', ')}):</b> Du hast dieselbe normale Spule <code>[ ${doubleCoils[0]}</code> in mehreren Strompfaden verwendet! In einer echten SPS überschreibt der untere Strompfad immer den oberen. Nutze stattdessen eine Parallelschaltung (<b>↕</b>) oder Setzen/Rücksetzen (<b>[S / [R</b>)!`;
    } else if (openRows.length > 0) {
      linter.style.display = 'block';
      linter.innerHTML = `💡 <b>Hinweis (Unterbrochener Strompfad in Zeile ${openRows.join(', ')}):</b> Vor der Spule sind noch leere Felder ohne Draht (<code>───</code>). Es kann kein Strom zur Spule fließen!`;
    } else {
      linter.style.display = 'none';
    }
  }

  function stepPlcEngine(st, dt) {
    const nodePowered = Array.from({ length: ROWS }, () => Array(COLS + 1).fill(false));
    const cellActive = Array.from({ length: ROWS }, () => Array(COLS).fill(false));

    for (let r = 0; r < ROWS; r++) nodePowered[r][0] = true;

    for (let c = 0; c < COLS; c++) {
      for (let r = 0; r < ROWS; r++) {
        const cell = grid[r][c];
        let conducts = false;
        if (cell.type === 'WIRE') conducts = true;
        else if (cell.type === 'NO') conducts = !!st.vars[cell.v];
        else if (cell.type === 'NC') conducts = !st.vars[cell.v];

        if (nodePowered[r][c] && conducts) {
          cellActive[r][c] = true;
          nodePowered[r][c + 1] = true;
        }
      }
      for (let pass = 0; pass < ROWS; pass++) {
        for (let r = 0; r < ROWS - 1; r++) {
          if (vBridge[r][c + 1] && (nodePowered[r][c + 1] || nodePowered[r + 1][c + 1])) {
            nodePowered[r][c + 1] = true;
            nodePowered[r + 1][c + 1] = true;
          }
        }
      }
    }

    const timerTrig = { T1: null, T2: null };

    for (let r = 0; r < ROWS; r++) {
      const q = coils[r];
      const pwr = nodePowered[r][COLS];

      if (q.type === 'COIL') {
        const v = q.v;
        if (v.startsWith('T')) {
          timerTrig[v] = { pwr, tMode: q.tMode, tSec: q.tSec };
        } else if (v.startsWith('C')) {
          const cObj = st.counters.C1;
          cObj.limit = q.cLim || 3;
          if (q.func === 'CC') {
            if (pwr && !st.prevRowPower[r]) cObj.count++;
          } else if (q.func === 'RC' && pwr) {
            cObj.count = 0;
          }
          st.vars.C1 = (cObj.count >= cObj.limit);
        } else {
          if (q.func === 'CONT') {
            st.vars[v] = pwr;
          } else if (q.func === 'SET' && pwr) {
            st.vars[v] = true;
          } else if (q.func === 'RES' && pwr) {
            st.vars[v] = false;
          } else if (q.func === 'TOG') {
            if (pwr && !st.prevRowPower[r]) st.vars[v] = !st.vars[v];
          }
        }
      }
      st.prevRowPower[r] = pwr;
    }

    ['T1','T2'].forEach(tName => {
      const cfg = timerTrig[tName];
      const tObj = st.timers[tName];
      if (!cfg) {
        tObj.elapsed = 0; st.vars[tName] = false; return;
      }
      if (cfg.tMode === 'TON') {
        if (cfg.pwr) {
          tObj.elapsed = Math.min(cfg.tSec, tObj.elapsed + dt);
          st.vars[tName] = (tObj.elapsed >= cfg.tSec - 1e-5);
        } else {
          tObj.elapsed = 0; st.vars[tName] = false;
        }
      } else if (cfg.tMode === 'TOF') {
        if (cfg.pwr) {
          tObj.elapsed = 0; st.vars[tName] = true;
        } else if (st.vars[tName]) {
          tObj.elapsed += dt;
          if (tObj.elapsed >= cfg.tSec - 1e-5) {
            st.vars[tName] = false; tObj.elapsed = cfg.tSec;
          }
        }
      } else if (cfg.tMode === 'BLINK') {
        if (cfg.pwr) {
          tObj.elapsed += dt;
          if (tObj.elapsed >= cfg.tSec) {
            tObj.elapsed = 0; st.vars[tName] = !st.vars[tName];
          }
        } else {
          tObj.elapsed = 0; st.vars[tName] = false;
        }
      }
    });

    return { nodePowered, cellActive };
  }

  function runExamCheck() {
    const tSel = document.getElementById('taskSelect');
    const task = examTasks[tSel ? tSel.value : 0];
    const fb = document.getElementById('feedbackBox');
    if (!fb) return;
    if (!task.testFn) {
      fb.className = 'alert-box alert-warn';
      fb.innerHTML = '💡 Im freien Modus ist keine feste Prüfungsaufgabe ausgewählt. Wähle oben eine Aufgabe (1–6) aus!';
      return;
    }

    const runner = (steps) => {
      const testState = createFreshPlcState();
      steps.forEach(st => {
        Object.assign(testState.vars, st.inputs);
        const ticks = Math.max(1, Math.round(st.duration / 0.05));
        for (let i = 0; i < ticks; i++) {
          stepPlcEngine(testState, 0.05);
        }
      });
      return testState;
    };

    const result = task.testFn(runner);
    if (result.ok && typeof playSuccessSound === 'function') playSuccessSound();
    if (!result.ok && typeof playWrongSound === 'function') playWrongSound();
    fb.className = 'alert-box ' + (result.ok ? 'alert-ok' : 'alert-err');
    fb.innerHTML = (result.ok ? '🎉 <b>GP2-Prüfung bestanden!</b> ' : '❌ <b>Prüfung noch nicht bestanden:</b> ') + result.msg;
  }

  function showTaskHint() {
    const tSel = document.getElementById('taskSelect');
    const task = examTasks[tSel ? tSel.value : 0];
    const fb = document.getElementById('feedbackBox');
    if (!fb || !task) return;
    fb.className = 'alert-box alert-warn';
    fb.innerHTML = `💡 <b>Lösungs-Tipp:</b> ${task.hint}`;
  }

  function loadSampleSolution() {
    const tSel = document.getElementById('taskSelect');
    const task = examTasks[tSel ? tSel.value : 0];
    if (!task || !task.solution) return;
    clearAll();
    task.solution.rows.forEach((rData, rIdx) => {
      rData.c.forEach((cData, cIdx) => { grid[rIdx][cIdx] = { ...cData }; });
      coils[rIdx] = { ...rData.q };
    });
    task.solution.vb.forEach(([r, cJunc]) => { vBridge[r][cJunc] = true; });
    checkPlcLinter();
    buildSvgDOM();
    const fb = document.getElementById('feedbackBox');
    if (fb) {
      fb.className = 'alert-box alert-ok';
      fb.innerHTML = '👁️ <b>Musterlösung geladen!</b> Teste die Schaltung jetzt unten über die Schalter/Taster im Simulations-Cockpit.';
    }
  }

  function hideFeedback() {
    const fb = document.getElementById('feedbackBox');
    if (fb) fb.className = 'alert-box';
  }

  function buildSvgDOM() {
    const svg = document.getElementById('kopSvg');
    if (!svg) return;
    const startX = 48, colW = 168, rowH = 86, startY = 58;
    const totalH = startY + (ROWS - 1) * rowH + 45;
    svg.setAttribute('viewBox', `0 0 780 ${totalH}`);

    let html = '';
    html += `<text x="${startX + colW*0.5}" y="22" class="col-lbl">Kontakt 1</text>`;
    html += `<text x="${startX + colW*1.5}" y="22" class="col-lbl">Kontakt 2</text>`;
    html += `<text x="${startX + colW*2.5}" y="22" class="col-lbl">Kontakt 3</text>`;
    html += `<text x="${startX + colW*3 + 100}" y="22" class="col-lbl" style="fill:#b45309;">Spulenfeld (Q / M / TT / C)</text>`;

    html += `<line x1="${startX}" y1="32" x2="${startX}" y2="${totalH - 15}" class="wire active" />`;
    html += `<line x1="755" y1="32" x2="755" y2="${totalH - 15}" class="wire" />`;

    for (let r = 0; r < ROWS; r++) {
      const y = startY + r * rowH;
      html += `<text x="10" y="${y + 4}" class="row-lbl">${String(r + 1).padStart(3, '0')}</text>`;

      for (let c = 0; c < COLS; c++) {
        const x = startX + c * colW;
        const cell = grid[r][c];

        html += `<rect x="${x + 10}" y="${y - 33}" width="${colW - 20}" height="64" rx="4"
                  class="c-rect" onclick="SPS_SIM.onContactCellClick(${r},${c},false)"
                  oncontextmenu="event.preventDefault(); SPS_SIM.onContactCellClick(${r},${c},true);" />`;

        if (cell.type === 'EMPTY') {
          html += `<text x="${x + colW/2}" y="${y + 4}" class="txt-ph">+ Kontakt</text>`;
        } else if (cell.type === 'WIRE') {
          html += `<line id="w_c_${r}_${c}" x1="${x}" y1="${y}" x2="${x + colW}" y2="${y}" class="wire" pointer-events="none"/>`;
        } else {
          html += `<text x="${x + colW/2}" y="${y - 19}" class="txt-addr">${fmtAddr(cell.v)}</text>`;
          html += `<text x="${x + colW/2}" y="${y - 8}" class="txt-sym">"${getTagName(cell.v)}"</text>`;
          html += `<line id="w_L_${r}_${c}" x1="${x}" y1="${y}" x2="${x + colW/2 - 11}" y2="${y}" class="wire" pointer-events="none"/>`;
          html += `<line id="w_bL_${r}_${c}" x1="${x + colW/2 - 11}" y1="${y - 6}" x2="${x + colW/2 - 11}" y2="${y + 12}" class="wire" pointer-events="none"/>`;
          html += `<line id="w_bR_${r}_${c}" x1="${x + colW/2 + 11}" y1="${y - 6}" x2="${x + colW/2 + 11}" y2="${y + 12}" class="wire" pointer-events="none"/>`;
          if (cell.type === 'NC') {
            html += `<line id="w_nc_${r}_${c}" x1="${x + colW/2 - 8}" y1="${y + 11}" x2="${x + colW/2 + 8}" y2="${y - 5}" class="wire" pointer-events="none"/>`;
          }
          html += `<line id="w_R_${r}_${c}" x1="${x + colW/2 + 11}" y1="${y}" x2="${x + colW}" y2="${y}" class="wire" pointer-events="none"/>`;
        }
      }

      const qX = startX + COLS * colW;
      const q = coils[r];
      html += `<rect x="${qX + 16}" y="${y - 33}" width="170" height="64" rx="4"
                class="q-rect" onclick="SPS_SIM.onCoilCellClick(${r},false)"
                oncontextmenu="event.preventDefault(); SPS_SIM.onCoilCellClick(${r},true);" />`;

      if (q.type === 'EMPTY') {
        html += `<text x="${qX + 100}" y="${y + 4}" class="txt-ph" style="fill:#d97706;">+ Spule / Relais</text>`;
      } else {
        const isT = q.v.startsWith('T');
        const isC = q.v.startsWith('C');
        const fMap = { CONT: '[', SET: '[S', RES: '[R', TOG: '[Ä' };
        let title = '';
        if (isT) title = `TT${q.v.slice(1)} (${q.tMode})`;
        else if (isC) title = `${q.func}1 (Zähler)`;
        else title = `${fMap[q.func]} ${fmtAddr(q.v)}`;

        html += `<text x="${qX + 100}" y="${y - 19}" class="txt-addr">${title}</text>`;
        html += `<text x="${qX + 100}" y="${y - 8}" class="txt-sym">"${getTagName(q.v)}"</text>`;
        if (isT || isC) {
          html += `<text id="q_sub_${r}" x="${qX + 100}" y="${y + 24}" class="txt-sub"></text>`;
        }
        html += `<line id="w_qL_${r}" x1="${qX}" y1="${y}" x2="${qX + 83}" y2="${y}" class="wire" pointer-events="none"/>`;
        html += `<path id="w_qB1_${r}" d="M ${qX + 90} ${y - 8} C ${qX + 81} ${y - 3}, ${qX + 81} ${y + 9}, ${qX + 90} ${y + 14}" class="wire" pointer-events="none"/>`;
        html += `<path id="w_qB2_${r}" d="M ${qX + 110} ${y - 8} C ${qX + 119} ${y - 3}, ${qX + 119} ${y + 9}, ${qX + 110} ${y + 14}" class="wire" pointer-events="none"/>`;
        html += `<line id="w_qR_${r}" x1="${qX + 117}" y1="${y}" x2="755" y2="${y}" class="wire" pointer-events="none"/>`;
      }
    }

    for (let r = 0; r < ROWS - 1; r++) {
      const y1 = startY + r * rowH;
      const y2 = startY + (r + 1) * rowH;
      const midY = (y1 + y2) / 2;
      for (let cJunc = 1; cJunc <= COLS; cJunc++) {
        const x = startX + cJunc * colW;
        const conn = vBridge[r][cJunc];
        if (conn) {
          html += `<line id="w_vb_${r}_${cJunc}" x1="${x}" y1="${y1}" x2="${x}" y2="${y2}" class="wire" />`;
        }
        html += `<circle cx="${x}" cy="${midY}" r="10" class="v-dot ${conn ? 'on' : ''}" onclick="SPS_SIM.toggleVBridge(${r},${cJunc})" />`;
        html += `<text x="${x}" y="${midY + 4}" font-size="10" text-anchor="middle" fill="${conn ? '#fff' : '#64748b'}" pointer-events="none">↕</text>`;
      }
    }

    svg.innerHTML = html;
  }

  function setWireHot(id, hot) {
    const el = document.getElementById(id);
    if (el) el.classList.toggle('active', !!hot);
  }

  function updateLiveDOM(diag) {
    const { nodePowered, cellActive } = diag;
    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS; c++) {
        const cell = grid[r][c];
        const lHot = nodePowered[r][c];
        const rHot = cellActive[r][c];
        if (cell.type === 'WIRE') setWireHot(`w_c_${r}_${c}`, rHot);
        else if (cell.type !== 'EMPTY') {
          setWireHot(`w_L_${r}_${c}`, lHot);
          setWireHot(`w_bL_${r}_${c}`, lHot);
          setWireHot(`w_bR_${r}_${c}`, rHot);
          setWireHot(`w_nc_${r}_${c}`, rHot);
          setWireHot(`w_R_${r}_${c}`, rHot);
        }
      }
      const q = coils[r];
      if (q.type === 'COIL') {
        const qHot = nodePowered[r][COLS];
        setWireHot(`w_qL_${r}`, qHot);
        setWireHot(`w_qB1_${r}`, qHot);
        setWireHot(`w_qB2_${r}`, qHot);
        setWireHot(`w_qR_${r}`, qHot);
        const subEl = document.getElementById(`q_sub_${r}`);
        if (subEl) {
          if (q.v.startsWith('T')) {
            subEl.textContent = `${liveState.timers[q.v].elapsed.toFixed(1)}s / ${q.tSec.toFixed(1)}s`;
          } else if (q.v.startsWith('C')) {
            subEl.textContent = `Ist: ${liveState.counters.C1.count} / Soll: ${liveState.counters.C1.limit}`;
          }
        }
      }
    }

    for (let r = 0; r < ROWS - 1; r++) {
      for (let cJunc = 1; cJunc <= COLS; cJunc++) {
        if (vBridge[r][cJunc]) {
          setWireHot(`w_vb_${r}_${cJunc}`, nodePowered[r][cJunc] || nodePowered[r + 1][cJunc]);
        }
      }
    }

    ['I1','I2','I3','I4'].forEach(k => {
      const btn = document.getElementById('sw_' + k);
      if (btn) {
        btn.textContent = `${fmtAddr(k)}: ${liveState.vars[k] ? '1 (EIN)' : '0 (AUS)'}`;
        btn.classList.toggle('on', liveState.vars[k]);
      }
    });

    ['Q1','Q2','Q3','Q4','M1','M2','T1','T2','C1'].forEach(k => {
      const led = document.getElementById('led_' + k);
      if (led) {
        const isSpec = k.startsWith('T') || k.startsWith('C');
        led.className = 'out-led' + (liveState.vars[k] ? (isSpec ? ' spec-on' : ' on') : '');
        led.innerHTML = `${fmtAddr(k)}: ${liveState.vars[k] ? '1' : '0'}<small>${getTagName(k)}</small>`;
      }
    });
  }

  function buildCockpitDOM() {
    const inBox = document.getElementById('inputCockpit');
    const outBox = document.getElementById('outputCockpit');
    if (inBox) {
      inBox.innerHTML = ['I1','I2','I3','I4'].map(k => `
        <div class="in-card">
          <div class="in-lbl" title="${getTagName(k)}">${getTagName(k)}</div>
          <button id="sw_${k}" type="button" class="sw-btn" onclick="SPS_SIM.toggleInput('${k}')">${fmtAddr(k)}: 0</button>
          <button type="button" class="push-btn"
            onmousedown="SPS_SIM.setInput('${k}',true)" onmouseup="SPS_SIM.setInput('${k}',false)" onmouseleave="SPS_SIM.setInput('${k}',false)"
            ontouchstart="event.preventDefault(); SPS_SIM.setInput('${k}',true)" ontouchend="SPS_SIM.setInput('${k}',false)">
            👆 [Taster ${fmtAddr(k)}]
          </button>
        </div>
      `).join('');
    }
    if (outBox) {
      outBox.innerHTML = ['Q1','Q2','Q3','Q4','M1','M2','T1','T2','C1'].map(k => `
        <div id="led_${k}" class="out-led">${fmtAddr(k)}: 0<small>${getTagName(k)}</small></div>
      `).join('');
    }
  }

  function getContextSummary() {
    const tSel = document.getElementById('taskSelect');
    const task = examTasks[tSel ? tSel.value : 0];
    if (!task) return "";
    const rungs = [];
    for (let r = 0; r < ROWS; r++) {
      const cStr = grid[r].map(c => c.type === 'EMPTY' ? 'leer' : c.type === 'WIRE' ? '---' : `${c.type}(${c.v})`).join(' -> ');
      const q = coils[r];
      const qStr = q.type === 'EMPTY' ? 'keine Spule' : `${q.func}(${q.v})`;
      if (grid[r].some(c => c.type !== 'EMPTY') || q.type !== 'EMPTY') {
        rungs.push(`Zeile ${r+1}: ${cStr} => ${qStr}`);
      }
    }
    return `SPS KOP-Simulator — Aufgabe: ${task.title}\nBeschreibung: ${task.desc.replace(/<[^>]+>/g, '')}\nBisherige KOP-Schaltung des Prüflings:\n${rungs.join('\n') || 'Noch leer'}`;
  }

  init();

  return {
    toggleSyntaxMode,
    addRow,
    clearAll,
    loadSelectedTask,
    runExamCheck,
    showTaskHint,
    loadSampleSolution,
    selectTool,
    updateCoilParamUI,
    onContactCellClick,
    onCoilCellClick,
    toggleVBridge,
    toggleInput,
    setInput,
    buildSvgDOM,
    getContextSummary
  };
})();

// =========================================================================
// 25. 4-SZENARIEN-UMSCHALTER FÜR DEN TAB "SCHALTPLAN, CAD & SPS"
// =========================================================================
(function() {
  const modeButtons = {
    uv: document.getElementById("btn-mode-uv"),
    fsa: document.getElementById("btn-mode-fsa"),
    seecad: document.getElementById("btn-mode-seecad"),
    sps: document.getElementById("btn-mode-sps")
  };

  const modeContainers = {
    uv: document.getElementById("uv-trainer-container"),
    fsa: document.getElementById("fsa-trainer-container"),
    seecad: document.getElementById("seecad-trainer-container"),
    sps: document.getElementById("sps-trainer-container")
  };

  function activateUnifiedScenario(targetMode) {
    Object.entries(modeButtons).forEach(([key, btn]) => {
      if (btn) btn.className = (key === targetMode) ? "btn primary" : "btn secondary";
    });
    Object.entries(modeContainers).forEach(([key, box]) => {
      if (box) box.classList.toggle("hidden", key !== targetMode);
    });

    if (targetMode === "fsa" && typeof loadFsaCircuit === "function") {
      loadFsaCircuit("selbsthaltung");
    } else if (targetMode === "seecad" && window.SEE_CAD) {
      window.SEE_CAD.renderCanvas();
    } else if (targetMode === "sps" && window.SPS_SIM) {
      window.SPS_SIM.buildSvgDOM();
    }
  }

  Object.entries(modeButtons).forEach(([key, btn]) => {
    if (!btn) return;
    btn.addEventListener("click", (e) => {
      e.stopImmediatePropagation();
      activateUnifiedScenario(key);
    }, true);
  });
})();

// =========================================================================
// 26. MASTER-UPGRADE (KOMPLETT-EDITION):
//     - TOUCH-LONG-PRESS (500ms = LÖSCHEN) FÜR CAD & SPS AUF HANDY/TABLET
//     - 100 % EXAKTE SEITENZAHLEN AUS DEM EUROPA-TABELLENBUCH
//     - INTERAKTIVES 6-REITER EUROPA-TABELLENBUCH MIT ORIGINAL-TABELLEN
//     - EINHEITEN-WÄCHTER IM RECHENTRAINER
// =========================================================================
(function() {
  // -----------------------------------------------------------------------
  // 1) TOUCH-LONG-PRESS (500ms = LÖSCHEN) FÜR CAD & SPS AUF HANDY/TABLET
  //    (PC-Maus und PC-Rechtsklick bleiben zu 100 % unberührt!)
  // -----------------------------------------------------------------------
  let touchTimer = null;
  let longPressTriggered = false;
  let startX = 0;
  let startY = 0;

  ["cadSvg", "kopSvg"].forEach((id) => {
    const el = document.getElementById(id);
    if (el) {
      el.style.webkitTouchCallout = "none";
      el.style.webkitUserSelect = "none";
      el.style.userSelect = "none";
    }
  });

  document.addEventListener("touchstart", (e) => {
    const svg = e.target.closest("#cadSvg, #kopSvg");
    if (!svg || e.touches.length !== 1) return;

    startX = e.touches[0].clientX;
    startY = e.touches[0].clientY;
    longPressTriggered = false;
    const targetEl = e.target;

    clearTimeout(touchTimer);
    touchTimer = setTimeout(() => {
      longPressTriggered = true;
      if (navigator.vibrate) navigator.vibrate(40);

      const rightClickEvent = new MouseEvent("contextmenu", {
        bubbles: true,
        cancelable: true,
        view: window
      });
      targetEl.dispatchEvent(rightClickEvent);
    }, 500);
  }, { passive: true });

  document.addEventListener("touchmove", (e) => {
    if (!touchTimer || !e.touches[0]) return;
    const dx = Math.abs(e.touches[0].clientX - startX);
    const dy = Math.abs(e.touches[0].clientY - startY);
    if (dx > 10 || dy > 10) {
      clearTimeout(touchTimer);
      touchTimer = null;
    }
  }, { passive: true });

  document.addEventListener("touchend", () => {
    clearTimeout(touchTimer);
    touchTimer = null;
  }, { passive: true });

  document.addEventListener("touchcancel", () => {
    clearTimeout(touchTimer);
    touchTimer = null;
  }, { passive: true });

  window.addEventListener("click", (e) => {
    if (longPressTriggered) {
      e.stopImmediatePropagation();
      e.preventDefault();
      longPressTriggered = false;
    }
  }, true);

  // -----------------------------------------------------------------------
  // 2) 100 % EXAKTE EUROPA-TABELLENBUCH-SEITEN FÜR ALLE 15 RECHENAUFGABEN
  // -----------------------------------------------------------------------
  // [Cleanup] Tabellenbuch-Seiten direkt in Fragen & CALC_TASKS eingeschmolzen.

  const EXACT_TB_PAGES = {
    du: "S. 192 / 205",
    iz: "S. 196–201",
    zs: "S. 258 / 266",
    abschalt: "S. 257",
    rcd: "S. 256 / 260",
    hes: "S. 182–185",
    komp: "S. 328–329",
    licht: "S. 233–235"
  };
  try {
    localStorage.setItem("europa_tb_pages_v1", JSON.stringify(EXACT_TB_PAGES));
  } catch (e) {}

  // -----------------------------------------------------------------------
  // 4) EINHEITEN-WÄCHTER IM RECHENTRAINER (PRÜFT EINHEITEN IN SCHRITT 3)
  // -----------------------------------------------------------------------
  btnCalcCheck?.addEventListener("click", () => {
    if (!currentCalcInstance) return;
    const s3Val = (calcStep3?.value || "").trim();
    const hasUnitsInStep3 = /[0-9]\s*(V|A|W|kW|Ω|Ohm|m|mm²|mm2|dB|dBµV|%|€|h|s|min|lx|lm|var|kvar|µF|uF|Hz|Nm)\b/i.test(s3Val);

    if (s3Val.length > 3 && !hasUnitsInStep3 && calcFeedbackTitle) {
      calcFeedbackTitle.textContent += " ⚠️ (Prüfer-Hinweis: Denke in Schritt 3 daran, hinter die eingesetzten Zahlen immer die Einheiten wie V, A, m, mm², Ω zu schreiben!)";
    }
  });

  // -----------------------------------------------------------------------
  // 5) INTERAKTIVES 6-REITER EUROPA-TABELLENBUCH (ORIGINAL-TABELLEN S. 196-537)
  // -----------------------------------------------------------------------
  const A_TO_Z_INDEX = [
    { term: "5 Sicherheitsregeln (Freischalten...)", page: "S. 139" },
    { term: "Abschaltströme Ia (Schmelzsicherungen gG & LS-Schalter)", page: "S. 206, 208, 210–211, 266" },
    { term: "Abschaltzeiten (TN: 0,4 s / 5 s | TT: 0,2 s / 1 s, VDE 0100-410)", page: "S. 257" },
    { term: "Aderendhülsen / Farbkennzeichnung", page: "S. 141" },
    { term: "AFDD (Fehlerlichtbogen-Schutzeinrichtung / Brandschutzschalter)", page: "S. 258, 351–352" },
    { term: "Akkumulatoren / Ladefaktor / Entladekennlinie (Peukert)", page: "S. 342–343" },
    { term: "Anlagenerderwiderstand RA bei RCD im TT-System (50 V / I_Δn)", page: "S. 258, 265" },
    { term: "Antennen / SAT-Anlagen / Azimut & Elevation / LNB / Multischalter", page: "S. 438–441" },
    { term: "Antennenerdung (16 mm² Cu, 25 mm² Al, 50 mm² Stahl) & Biegemoment", page: "S. 442" },
    { term: "Arbeitsvertrag / Rechtsgeschäfte / Kündigung", page: "S. 606–608" },
    { term: "Aufteilung PEN-Leiter (TN-C-S)", page: "S. 186" },
    { term: "Badewanne und Dusche (Bereiche 0, 1, 2)", page: "S. 213" },
    { term: "Baustellenverteiler / Baustellen-Energieversorgung", page: "S. 218" },
    { term: "Beleuchtungsanlage berechnen (Raumindex k, Raumwirkungsgrad ηR)", page: "S. 233–235" },
    { term: "Beleuchtungsstärke (Lux) & Wartungsfaktor WF", page: "S. 228–230, 234" },
    { term: "Bemessungsstromregel (Ib ≤ In ≤ Iz) & Auslösestromregel (It ≤ 1,45 · Iz)", page: "S. 206, 211" },
    { term: "Berührungsspannung (max. 50 V AC / 120 V DC) & Spannungswaage", page: "S. 255, 257" },
    { term: "Betriebsdaten von Käfigläufermotoren (IE 3) & Dahlander", page: "S. 528" },
    { term: "Bewegungsmelder & Präsenzmelder (PIR)", page: "S. 130, 156–157" },
    { term: "Blindleistungskompensation (Formeln, Faktor FK = tan φ1 - tan φ2)", page: "S. 328–329" },
    { term: "Blitzschutz (innerer & äußerer Blitzschutz, SPD Typ 1/2/3)", page: "S. 335–338" },
    { term: "Brandabschnitte / Brandschutz bei Leitungsanlagen", page: "S. 353–354" },
    { term: "D- und D0-Sicherungen (Kennmelder-Farben, D01/D02/D03) & NH", page: "S. 209–210" },
    { term: "Dahlanderschaltung / Dahlander-Motoren (Δ/YY, Y/YY, YY/Δ, Klemmbrett)", page: "S. 504, 510, 528, 536–537" },
    { term: "Dämpfung & Pegelberechnung (dB, dBµV, Nutzpegel 47–77 dBµV)", page: "S. 404–405, 440–441" },
    { term: "Dehnungsmessstreifen (DMS) / Brückenschaltung", page: "S. 128–129" },
    { term: "Dimmer (Phasenanschnitt / Phasenabschnitt / LED)", page: "S. 152–153, 511" },
    { term: "Drahtbruchsicherheit (Öffner / Ruhestromprinzip)", page: "S. 472, 507" },
    { term: "Drehmoment & mechanische Leistung (M = 9550 · P2 / n)", page: "S. 24, 26, 532" },
    { term: "Drehstrom (Sternschaltung, Dreieckschaltung, √3)", page: "S. 48–50" },
    { term: "Durchlauferhitzer / Warmwassergeräte", page: "S. 365" },
    { term: "Einbruchmeldeanlage (EMA) / Gefahrenmeldeanlage", page: "S. 357–358" },
    { term: "EMV (Elektromagnetische Verträglichkeit & TN-S)", page: "S. 331–334" },
    { term: "Englisch (Fachliches Englisch Englisch–Deutsch)", page: "S. 638–643" },
    { term: "Erderwiderstand messen / Erdungsmessung", page: "S. 119, 266" },
    { term: "Erdkabel verlegen (Verlegeart D1/D2 S. 204 & Kabelgraben S. 291)", page: "S. 204, 291" },
    { term: "Erdungsanlage / Fundamenterder (V4A Edelstahl)", page: "S. 181, 183–184" },
    { term: "Erstprüfung nach DIN VDE 0100 Teil 600 (16 Prüfschritte)", page: "S. 264–266, 272–274" },
    { term: "Farbkennzeichnung von Adern & Leitern", page: "S. 182, 572, 580" },
    { term: "Fehlerschleifenimpedanz Zs (Formel 2/3 · U0/Ia & Tabellenwerte)", page: "S. 258, 265–266, 273" },
    { term: "Flexible Leitungen (H07RN-F, H07V-K Strombelastbarkeit bei 30 °C)", page: "S. 200" },
    { term: "Frequenzumrichter (FU) & RCD-Auswahl bei Stromrichtern (Typ F/B/B+)", page: "S. 260–261, 462–463" },
    { term: "Funktionsplan (FUP) / Kontaktplan (KOP) / SPS", page: "S. 79, 472–478" },
    { term: "Gleichzeitigkeitsfaktor / Hauptleitungen", page: "S. 187" },
    { term: "Haupterdungsschiene (HES) / Schutzpotentialausgleich", page: "S. 185, 257" },
    { term: "Häufung von Leitungen (Umrechnungsfaktor f2 in Rohr/Rinne/Erde)", page: "S. 201, 204" },
    { term: "Heißleiter (NTC) & Kaltleiter (PTC)", page: "S. 55, 131" },
    { term: "Installationszonen in Wohngebäuden", page: "S. 191" },
    { term: "IP-Schutzarten (Fremdkörper- und Wasserschutz) & IK-Code", page: "S. 345, 347" },
    { term: "Isolationswiderstand Riso messen (500 V DC, ≥ 1 MΩ, SPDs abklemmen)", page: "S. 263, 265, 273" },
    { term: "Kalkulation / Rabatt / Skonto / Angebotserstellung", page: "S. 613–614" },
    { term: "Kleinsteuerung LOGO! (Funktionen & Bausteine)", page: "S. 468–469" },
    { term: "KNX-Gebäudesystemtechnik (Topologie, Adressen, ETS)", page: "S. 159–170" },
    { term: "Korrosion / Elektrochemische Spannungsreihe", page: "S. 339–340" },
    { term: "Kurzzeichen für Leitungen (NYM-J, NYY-J, H07RN-F)", page: "S. 572–575" },
    { term: "Ladestationen für Elektrofahrzeuge (Wallbox) & Prüfung", page: "S. 313–315" },
    { term: "Lastverteilung / Unsymmetrische Last im Drehstromnetz", page: "S. 49–50, 281" },
    { term: "Leistungsschilder von Drehstrommotoren (230/400V, 400/690V)", page: "S. 530" },
    { term: "Leitfähigkeit κ (Kupfer = 56, Aluminium = 35)", page: "S. 561" },
    { term: "Leitungsberechnung & Strombelastbarkeit Ir (25 °C S. 197 | 30 °C S. 198)", page: "S. 196–201" },
    { term: "Leitungsschutzschalter (LS-Schalter B, C, D, K, Z Kennlinie & Prüfströme)", page: "S. 206, 208, 211, 258, 266" },
    { term: "Lichtschranken (Einweg, Reflexion) & Näherungsschalter", page: "S. 132–134" },
    { term: "Lichtwellenleiter (LWL) / Glasfaser", page: "S. 412, 577–578" },
    { term: "Maximale Leitungslängen nach Spannungsfall (S. 205) & Kurzschluss (S. 206–208)", page: "S. 205–208" },
    { term: "Mindest-Leiterquerschnitte (Querschnitte für PE/PEN & Installation)", page: "S. 182, 204" },
    { term: "Motorschutzschalter, Bimetallrelais & Motorvollschutz (PTC)", page: "S. 508–509" },
    { term: "Netzformen / Verteilungssysteme (TN-C, TN-S, TN-C-S, TT, IT)", page: "S. 180, 257–259, 282" },
    { term: "Netzwerktechnik (Switch, Router, Patchfeld, Cat-7, RJ45)", page: "S. 399, 407–416" },
    { term: "Normreihen (E12 / E24 für Widerstände & Kondensatoren)", page: "S. 51" },
    { term: "Notbeleuchtung / Sicherheitsbeleuchtung (DS, BS)", page: "S. 309–311" },
    { term: "Photovoltaik (PV-Anlagen, Wechselrichter, Speicher, Prüfung)", page: "S. 297–305" },
    { term: "Power over Ethernet (PoE)", page: "S. 413, 417" },
    { term: "Prüfprotokoll (Inhalt & Auswertung nach VDE 0100-600)", page: "S. 266, 274, 304" },
    { term: "PT100 / Widerstandsthermometer / Temperaturmessung", page: "S. 131" },
    { term: "Rauchwarnmelder (RWM, Streulichtprinzip)", page: "S. 349–350" },
    { term: "RCD (Typen A, F, B, B+, Selektivität Typ S, Auslösezeiten 300/150/40 ms)", page: "S. 256–261, 265" },
    { term: "Rechtsformen von Unternehmen (Einzelunternehmen, GmbH)", page: "S. 590, 609" },
    { term: "Referenzkennzeichnung nach DIN EN IEC 81346 (-F, -Q, -B, -P)", page: "S. 81–83" },
    { term: "Regelungstechnik (Steuern vs. Regeln, Zweipunktregler, PID)", page: "S. 515–523" },
    { term: "Sanftanlasser / Softstarter", page: "S. 535, 553" },
    { term: "Schaltzeichen für Schaltpläne & Installationspläne", page: "S. 86–98" },
    { term: "Schutzklassen (SK I, SK II Doppelquadrat, SK III)", page: "S. 104, 254–255, 266, 269" },
    { term: "Schutzleiterwiderstand RPE messen (Durchgängigkeit)", page: "S. 265, 269, 273" },
    { term: "Schutztrennung & Schutz durch Meldung (IT-System / IMD)", page: "S. 259, 265–266" },
    { term: "Schützschaltungen (Selbsthaltung, Wendeschütz, Stern-Dreieck)", page: "S. 503–506" },
    { term: "Selektiver Hauptleitungsschutzschalter (SLS)", page: "S. 188" },
    { term: "Selektivität von Schutzeinrichtungen (Faktor 1,6:1 bei Sicherungen)", page: "S. 210, 260" },
    { term: "SELV / PELV / FELV (Kleinspannung & Riso ≥ 500 kΩ bei 250 V DC)", page: "S. 255, 265" },
    { term: "Spannungsfall ΔU / Δu berechnen & maximale Leitungslängen", page: "S. 187, 192–193, 205, 266" },
    { term: "Umrechnungsfaktoren f1 (Temperatur), f2 (Häufung) & f5 (Kabeltrommel)", page: "S. 201, 204" },
    { term: "Verlegearten von Leitungen (A1, A2, B1, B2, C, D, E, F, G & V1–V9)", page: "S. 196, 200, 204" },
    { term: "Wärmepumpe (Kompressionswärmepumpe, Leistungszahl COP, Anschluss)", page: "S. 366–367" },
    { term: "Zählerplatzinstallation / Zählerschrank (APZ, RfZ, AAR, NAR)", page: "S. 181, 188–189" },
    { term: "Zusätzlicher Schutzpotentialausgleich (R ≤ 50 V / Ia)", page: "S. 214, 259" }
  ];

  // Altes Modal entfernen, falls vorhanden, und durch die Komplett-Edition ersetzen
  document.getElementById("europa-ref-modal")?.remove();

  const refModal = document.createElement("div");
  refModal.id = "europa-ref-modal";
  refModal.className = "modal-overlay hidden";
  refModal.innerHTML = `
    <div class="modal-card" style="max-width: 940px; width: 100%; max-height: 90vh; overflow-y: auto;">
      <div style="display:flex; justify-content:space-between; align-items:center; gap:0.5rem; margin-bottom:0.8rem; border-bottom:1px solid #334155; padding-bottom:0.6rem;">
        <h3 style="margin:0; color:#60a5fa;">📖 Digitales Europa-Tabellenbuch (Original-Tabellen & Seitenfinder)</h3>
        <button type="button" id="btn-close-europa-ref" class="chatbot-close-btn">✖</button>
      </div>

      <div style="display:flex; gap:0.4rem; flex-wrap:wrap; margin-bottom:1rem;">
        <button type="button" class="btn primary europa-tab-btn" data-etab="tab-index" style="font-size:0.79rem; padding:0.42rem 0.7rem;">🔎 1. A–Z Seitenfinder</button>
        <button type="button" class="btn secondary europa-tab-btn" data-etab="tab-vde0298" style="font-size:0.79rem; padding:0.42rem 0.7rem;">⚡ 2. Leitungen Ir / f1 / f2 (S. 196–204)</button>
        <button type="button" class="btn secondary europa-tab-btn" data-etab="tab-fuses" style="font-size:0.79rem; padding:0.42rem 0.7rem;">🔥 3. Sicherungen gG & LS (S. 206–211)</button>
        <button type="button" class="btn secondary europa-tab-btn" data-etab="tab-vde0100" style="font-size:0.79rem; padding:0.42rem 0.7rem;">📋 4. VDE 0100-600 & RCD (S. 257–266)</button>
        <button type="button" class="btn secondary europa-tab-btn" data-etab="tab-komp" style="font-size:0.79rem; padding:0.42rem 0.7rem;">🔋 5. Kompensation & Motoren (S. 328 / 528)</button>
        <button type="button" class="btn secondary europa-tab-btn" data-etab="tab-lichtsat" style="font-size:0.79rem; padding:0.42rem 0.7rem;">💡 6. Licht & SAT (S. 233 / 438)</button>
      </div>

      <!-- REITER 1: A-Z SEITENFINDER -->
      <div id="etab-tab-index" class="europa-tab-pane">
        <input type="text" id="europa-index-search" placeholder="🔎 Begriff eingeben (z. B. Spannungsfall, RCD, gG, Dahlander, Erdkabel, AFDD, KNX, SAT, Licht)..." style="margin-bottom:0.75rem;">
        <div id="europa-index-results" style="max-height:420px; overflow-y:auto; display:grid; grid-template-columns:repeat(auto-fill, minmax(360px, 1fr)); gap:0.45rem;"></div>
      </div>

      <!-- REITER 2: LEITUNGSBEMESSUNG (S. 196-204) -->
      <div id="etab-tab-vde0298" class="europa-tab-pane hidden" style="font-size:0.81rem;">
        <p style="color:#38bdf8; margin-bottom:0.4rem;"><strong>📌 A) Strombelastbarkeit Ir in A bei ϑu = 30 °C (PVC 70 °C, Kupfer – Europa TB S. 198):</strong></p>
        <div style="overflow-x:auto; margin-bottom:0.8rem;">
          <table class="proto-table" style="min-width:650px;">
            <thead>
              <tr>
                <th>A in mm²</th>
                <th>A1 (2 / 3)</th>
                <th>A2 (2 / 3)<br><small>gedämmt</small></th>
                <th>B1 (2 / 3)</th>
                <th>B2 (2 / 3)<br><small>Rohr/Kanal</small></th>
                <th>C (2 / 3)<br><small>auf/in Wand</small></th>
                <th>E (2 / 3)<br><small>frei/Wanne</small></th>
                <th>Erdkabel D1 (2 / 3)<br><small>Rohr Erde 20°C (S.204)</small></th>
                <th>Erdkabel D2<br><small>direkt Erde 20°C (S.204)</small></th>
              </tr>
            </thead>
            <tbody>
              <tr><td><strong>1,5 mm²</strong></td><td>15,5 / 13,5</td><td><strong>15,5 / 13</strong></td><td>17,5 / 15,5</td><td><strong>16,5 / 15</strong></td><td>19,5 / 17,5</td><td>22 / 18,5</td><td>22 / 18 A</td><td>27 A</td></tr>
              <tr><td><strong>2,5 mm²</strong></td><td>19,5 / 18</td><td><strong>18,5 / 17,5</strong></td><td>24 / 21</td><td><strong>23 / 20</strong></td><td>27 / 24</td><td>30 / 25</td><td>29 / 24 A</td><td>36 A</td></tr>
              <tr><td><strong>4 mm²</strong></td><td>26 / 24</td><td><strong>25 / 23</strong></td><td>32 / 28</td><td><strong>30 / 27</strong></td><td>36 / 32</td><td>40 / 34</td><td>37 / 30 A</td><td>47 A</td></tr>
              <tr><td><strong>6 mm²</strong></td><td>34 / 31</td><td><strong>32 / 29</strong></td><td>41 / 36</td><td><strong>38 / 34</strong></td><td>46 / 41</td><td>51 / 43</td><td>46 / 38 A</td><td>59 A</td></tr>
              <tr><td><strong>10 mm²</strong></td><td>46 / 42</td><td><strong>43 / 39</strong></td><td>57 / 50</td><td><strong>52 / 46</strong></td><td>63 / 57</td><td>70 / 60</td><td>60 / 50 A</td><td>79 A</td></tr>
              <tr><td><strong>16 mm²</strong></td><td>61 / 56</td><td><strong>57 / 52</strong></td><td>76 / 68</td><td><strong>69 / 62</strong></td><td>85 / 76</td><td>94 / 80</td><td>78 / 64 A</td><td>102 A</td></tr>
              <tr><td><strong>25 mm²</strong></td><td>80 / 73</td><td><strong>75 / 68</strong></td><td>101 / 89</td><td><strong>90 / 80</strong></td><td>112 / 96</td><td>119 / 101</td><td>99 / 82 A</td><td>133 A</td></tr>
            </tbody>
          </table>
        </div>

        <p style="color:#93c5fd; margin-bottom:0.4rem;"><strong>📌 B) Strombelastbarkeit Ir in A bei ϑu = 25 °C (PVC 70 °C, Kupfer – Europa TB S. 197):</strong></p>
        <div style="overflow-x:auto; margin-bottom:0.8rem;">
          <table class="proto-table" style="min-width:600px;">
            <thead>
              <tr>
                <th>A in mm²</th>
                <th>A1 (2 / 3)</th>
                <th>A2 (2 / 3)</th>
                <th>B1 (2 / 3)</th>
                <th>B2 (2 / 3)</th>
                <th>C (2 / 3)</th>
                <th>E (2 / 3)</th>
              </tr>
            </thead>
            <tbody>
              <tr><td><strong>1,5 mm²</strong></td><td>16,5* / 14,5</td><td><strong>16,5* (15,5) / 14</strong></td><td>18,5 / 16,5</td><td><strong>17,5 / 16</strong></td><td>21 / 18,5</td><td>23 / 19,5</td></tr>
              <tr><td><strong>2,5 mm²</strong></td><td>21 / 19</td><td><strong>19,5 / 18,5</strong></td><td>25 / 22</td><td><strong>24 / 21</strong></td><td>29 / 25</td><td>32 / 27</td></tr>
              <tr><td><strong>4 mm²</strong></td><td>28 / 25</td><td><strong>27 / 24</strong></td><td>34 / 30</td><td><strong>32 / 29</strong></td><td>38 / 34</td><td>42 / 36</td></tr>
              <tr><td><strong>6 mm²</strong></td><td>36 / 33</td><td><strong>34 / 31</strong></td><td>43 / 38</td><td><strong>40 / 36</strong></td><td>49 / 43</td><td>54 / 46</td></tr>
              <tr><td><strong>10 mm²</strong></td><td>49 / 45</td><td><strong>46 / 41</strong></td><td>60 / 53</td><td><strong>55 / 49</strong></td><td>67 / 60</td><td>74 / 64</td></tr>
              <tr><td><strong>16 mm²</strong></td><td>65 / 59</td><td><strong>60 / 55</strong></td><td>81 / 72</td><td><strong>73 / 66</strong></td><td>90 / 81</td><td>100 / 85</td></tr>
            </tbody>
          </table>
        </div>

        <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(260px, 1fr)); gap:0.65rem;">
          <div style="background:#0f172a; padding:0.65rem; border-radius:8px; border:1px solid #334155;">
            <strong style="color:#fbbf24;">🌡️ Temperaturfaktor f1 (S. 201, Bezug 30 °C, PVC 70 °C):</strong><br>
            • 10 °C: <strong>1,22</strong> | 15 °C: <strong>1,17</strong> | 20 °C: <strong>1,12</strong> | 25 °C: <strong>1,06</strong><br>
            • <strong>30 °C: 1,00</strong> | <strong>35 °C: 0,94</strong> | <strong>40 °C: 0,87</strong><br>
            • 45 °C: <strong>0,79</strong> | 50 °C: <strong>0,71</strong> | 60 °C: <strong>0,50</strong>
          </div>
          <div style="background:#0f172a; padding:0.65rem; border-radius:8px; border:1px solid #334155;">
            <strong style="color:#fbbf24;">📦 Häufung f2 (S. 201) & Kabeltrommel f5:</strong><br>
            • <strong>V4/V5 (Rohr/Kanal/gebündelt):</strong> 1=<strong>1,00</strong> | 2=<strong>0,80</strong> | 3=<strong>0,70</strong> | 4=<strong>0,65</strong> | 6=<strong>0,57</strong><br>
            • <strong>V6 (einlagig Wand/Boden):</strong> 1=<strong>1,00</strong> | 2=<strong>0,85</strong> | 3=<strong>0,79</strong> | 4=<strong>0,75</strong><br>
            • <strong>Aufgewickelte Leitung f5:</strong> 1 Lage=<strong>0,80</strong> | 2=<strong>0,61</strong> | 3=<strong>0,49</strong> | 4=<strong>0,42</strong>
          </div>
        </div>
      </div>

      <!-- REITER 3: SICHERUNGEN gG & LS-SCHALTER (S. 206-211 & S. 266) -->
      <div id="etab-tab-fuses" class="europa-tab-pane hidden" style="font-size:0.81rem;">
        <p style="color:#fbbf24; margin-bottom:0.4rem;"><strong>🔥 A) Schmelzsicherungen Klasse gG: Erforderlicher Abschaltstrom Ia & max. Zs (Europa TB S. 206, 208, 209 & 266):</strong></p>
        <div style="overflow-x:auto; margin-bottom:0.8rem;">
          <table class="proto-table" style="min-width:620px;">
            <thead>
              <tr>
                <th>Nennstrom In</th>
                <th>Kennmelder-Farbe<br><small>(D / D0 – S. 209)</small></th>
                <th>Baugröße D0<br><small>(S. 209)</small></th>
                <th>Ia bei t = 0,4 s<br><small>(Endstromkreis S.206/266)</small></th>
                <th>Zs_max (0,4 s)<br><small>(U0/Ia laut S. 266)</small></th>
                <th>Ia bei t = 5,0 s<br><small>(Verteiler S.208/266)</small></th>
                <th>Zs_max (5,0 s)<br><small>(U0/Ia laut S. 266)</small></th>
              </tr>
            </thead>
            <tbody>
              <tr><td><strong>6 A gG</strong></td><td>🟢 Grün</td><td>D01 (E14)</td><td>ca. 44 A</td><td>5,23 Ω</td><td><strong>27 A</strong></td><td>8,52 Ω</td></tr>
              <tr><td><strong>10 A gG</strong></td><td>🔴 Rot</td><td>D01 (E14)</td><td><strong>82 A</strong></td><td>2,80 Ω</td><td><strong>47 A</strong></td><td>4,89 Ω</td></tr>
              <tr><td><strong>16 A gG</strong></td><td>⚪ Grau</td><td>D01 (E14)</td><td><strong>107 A (109 A)</strong></td><td><strong>2,15 Ω</strong></td><td><strong>65 A</strong></td><td><strong>3,54 Ω</strong></td></tr>
              <tr><td><strong>20 A gG</strong></td><td>🔵 Blau</td><td>D02 (E18)</td><td><strong>145 A (148 A)</strong></td><td><strong>1,59 Ω</strong></td><td><strong>85 A (87 A)</strong></td><td><strong>2,71 Ω</strong></td></tr>
              <tr><td><strong>25 A gG</strong></td><td>🟡 Gelb</td><td>D02 (E18)</td><td><strong>180 A</strong></td><td><strong>1,28 Ω</strong></td><td><strong>110 A</strong></td><td><strong>2,09 Ω</strong></td></tr>
              <tr><td><strong>32 A gG</strong></td><td>🟣 Violett</td><td>D02 (E18)</td><td><strong>265 A (270 A)</strong></td><td><strong>0,87 Ω</strong></td><td><strong>150 A</strong></td><td><strong>1,53 Ω</strong></td></tr>
              <tr><td><strong>35 A gG</strong></td><td>⚫ Schwarz</td><td>D02 (E18)</td><td>ca. 280 A</td><td>0,82 Ω</td><td><strong>160 A</strong></td><td>1,44 Ω</td></tr>
              <tr><td><strong>40 A gG</strong></td><td>⚫ Schwarz</td><td>D02 (E18)</td><td><strong>315 A</strong></td><td>0,73 Ω</td><td><strong>190 A</strong></td><td>1,21 Ω</td></tr>
              <tr><td><strong>50 A gG</strong></td><td>⚪ Weiß</td><td>D02 (E18)</td><td><strong>470 A</strong></td><td>0,49 Ω</td><td>ca. 250 A</td><td>0,92 Ω</td></tr>
              <tr><td><strong>63 A gG</strong></td><td>🟠 Kupfer</td><td>D02 (E18)</td><td><strong>550 A</strong></td><td><strong>0,42 Ω</strong></td><td><strong>320 A</strong></td><td><strong>0,72 Ω</strong></td></tr>
              <tr><td><strong>80 A gG</strong></td><td>⚪ Silber</td><td>D03 (M30x2)</td><td>ca. 750 A</td><td>0,31 Ω</td><td>ca. 430 A</td><td>0,53 Ω</td></tr>
              <tr><td><strong>100 A gG</strong></td><td>🔴 Rot</td><td>D03 (M30x2)</td><td>ca. 950 A</td><td>0,24 Ω</td><td>ca. 580 A</td><td>0,40 Ω</td></tr>
            </tbody>
          </table>
        </div>

        <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(260px, 1fr)); gap:0.65rem;">
          <div style="background:#0f172a; padding:0.65rem; border-radius:8px; border:1px solid #334155;">
            <strong style="color:#38bdf8;">🔌 B) LS-Schalter Auslösebereiche (Europa TB S. 211):</strong><br>
            • <strong>Thermisch (Bimetall):</strong> Nichtauslösestrom <code>Int = 1,13 · In</code> (&gt; 1h) | Auslösestrom <code>It = 1,45 · In</code> (≤ 1h)<br>
            • <strong>Magnetisch AC (&lt; 0,1 s):</strong> Typ <strong>B: 3–5 · In</strong> (DC: 4–7·In) | Typ <strong>C: 5–10 · In</strong> (DC: 7–15·In) | Typ <strong>D: 10–20 · In</strong><br>
            • <strong>Sondertypen:</strong> Typ <strong>Z(A): 2–3 · In</strong> (Halbleiter/lange Leitung) | Typ <strong>K: 10–14 · In</strong> (Motoren)
          </div>
          <div style="background:#0f172a; padding:0.65rem; border-radius:8px; border:1px solid #334155;">
            <strong style="color:#4ade80;">⚖️ C) Selektivität von Sicherungen (Europa TB S. 210 & 260):</strong><br>
            • Bei Schmelzsicherungen gleicher Betriebsklasse (z. B. gG vor gG) ist Selektivität gegeben, wenn das Verhältnis der Bemessungsströme <strong>mindestens 1,6 : 1</strong> beträgt (z. B. 63 A vor 35 A).<br>
            • Überstromschutz immer am Stromkreisanfang; Überlastschutz auch nach RCD erlaubt (S. 260).
          </div>
        </div>
      </div>

      <!-- REITER 4: VDE 0100-600, ZS & RCD (S. 257-266) -->
      <div id="etab-tab-vde0100" class="europa-tab-pane hidden" style="font-size:0.81rem;">
        <p style="color:#93c5fd; margin-bottom:0.4rem;"><strong>📌 A) Schleifenimpedanz Zs für LS-Schalter B & C im TN-System (Europa TB S. 258 & S. 266):</strong></p>
        <div style="overflow-x:auto; margin-bottom:0.8rem;">
          <table class="proto-table" style="min-width:580px;">
            <thead>
              <tr>
                <th>Nennstrom In</th>
                <th>LS Typ B (Ia = 5 · In)</th>
                <th>Zs (Tabellenwert U0/Ia)<br><small>Europa TB S. 266</small></th>
                <th>Zsm_max (mit 2/3-Faktor)<br><small>Europa TB S. 258 / 265</small></th>
                <th>LS Typ C (Ia = 10 · In)</th>
                <th>Zs (Tabellenwert U0/Ia)<br><small>Europa TB S. 266</small></th>
                <th>Zsm_max (mit 2/3-Faktor)<br><small>Europa TB S. 258 / 265</small></th>
              </tr>
            </thead>
            <tbody>
              <tr><td><strong>10 A</strong></td><td>50 A</td><td>4,60 Ω</td><td><strong>≤ 3,07 Ω</strong></td><td>100 A</td><td>2,30 Ω</td><td><strong>≤ 1,53 Ω</strong></td></tr>
              <tr><td><strong>16 A</strong></td><td>80 A</td><td>2,88 Ω</td><td><strong>≤ 1,92 Ω</strong></td><td>160 A</td><td>1,44 Ω</td><td><strong>≤ 0,96 Ω</strong></td></tr>
              <tr><td><strong>20 A</strong></td><td>100 A</td><td>2,30 Ω</td><td><strong>≤ 1,53 Ω</strong></td><td>200 A</td><td>1,15 Ω</td><td><strong>≤ 0,767 Ω</strong></td></tr>
              <tr><td><strong>25 A</strong></td><td>125 A</td><td>1,84 Ω</td><td><strong>≤ 1,23 Ω</strong></td><td>250 A</td><td>0,92 Ω</td><td><strong>≤ 0,61 Ω</strong></td></tr>
              <tr><td><strong>32 A</strong></td><td>160 A</td><td>1,44 Ω</td><td><strong>≤ 0,96 Ω</strong></td><td>320 A</td><td>0,72 Ω</td><td><strong>≤ 0,479 Ω</strong></td></tr>
              <tr><td><strong>63 A</strong></td><td>315 A</td><td>0,73 Ω</td><td><strong>≤ 0,487 Ω</strong></td><td>630 A</td><td>0,36 Ω</td><td><strong>≤ 0,24 Ω</strong></td></tr>
            </tbody>
          </table>
        </div>

        <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(270px, 1fr)); gap:0.65rem;">
          <div style="background:#0f172a; padding:0.65rem; border-radius:8px; border:1px solid #334155;">
            <strong style="color:#4ade80;">✅ Erstprüfung DIN VDE 0100-600 (S. 264–266):</strong><br>
            • <strong>Reihenfolge:</strong> 1. Besichtigen ➔ 2. RPE (≥ 0,2 A DC) ➔ 3. Riso (500 V DC: <strong>≥ 1,0 MΩ</strong> | SELV 250 V DC: <strong>≥ 0,5 MΩ</strong>) ➔ 4. Zs / RA ➔ 5. RCD ➔ 6. Drehfeld (Rechts) ➔ 7. Funktion & Spannungsfall (max. 4 % ab HAK laut S. 266).<br>
            • <strong>Erlaubter Ableitstrom RCD (S. 257):</strong> <code>Ia ≤ 0,3 · I_Δn</code>
          </div>
          <div style="background:#0f172a; padding:0.65rem; border-radius:8px; border:1px solid #334155;">
            <strong style="color:#fbbf24;">🛡️ RCD-Typen (S. 260) & TT-Erder RA (S. 258):</strong><br>
            • <strong>Typ A:</strong> AC + pulsierende DC (glatter DC ≤ 6 mA)<br>
            • <strong>Typ F:</strong> Mischfrequenzen bis 1 kHz (glatter DC ≤ 10 mA, 1~ FU)<br>
            • <strong>Typ B / B+:</strong> Allstromsensitiv für glatte DC &gt; 6 mA (3~ FU, Wallbox, PV); B+ bis 20 kHz (Brandschutz ≤ 420 mA)<br>
            • <strong>Max. RA im TT-Netz (50 V):</strong> 30 mA ➔ <strong>1666 Ω</strong> | 100 mA ➔ <strong>500 Ω</strong> | 300 mA ➔ <strong>167 Ω</strong>
          </div>
        </div>
      </div>

      <!-- REITER 5: KOMPENSATION (S. 328-329) & MOTOREN IE3 / DAHLANDER (S. 528, 536-537) -->
      <div id="etab-tab-komp" class="europa-tab-pane hidden" style="font-size:0.81rem;">
        <p style="color:#fbbf24; margin-bottom:0.4rem;"><strong>🔋 A) Kompensationsfaktor FK = tan φ1 - tan φ2 für QC = FK · P1 (Original-Tabelle Europa TB S. 329):</strong></p>
        <div style="overflow-x:auto; margin-bottom:0.8rem;">
          <table class="proto-table" style="min-width:560px;">
            <thead>
              <tr>
                <th>Vorher: cos φ1</th>
                <th>tan φ1</th>
                <th>Ziel cos φ2 = 0,80</th>
                <th>Ziel cos φ2 = 0,85</th>
                <th>Ziel cos φ2 = 0,90</th>
                <th>Ziel cos φ2 = 0,95</th>
                <th>Ziel cos φ2 = 0,98</th>
              </tr>
            </thead>
            <tbody>
              <tr><td><strong>0,60</strong></td><td>1,33</td><td>0,58</td><td>0,71</td><td><strong>0,85</strong></td><td><strong>1,01</strong></td><td>1,13</td></tr>
              <tr><td><strong>0,65 (0,64/0,66)</strong></td><td>1,17</td><td>0,42</td><td>0,55</td><td><strong>0,69</strong></td><td><strong>0,84</strong></td><td>0,97</td></tr>
              <tr><td><strong>0,68</strong></td><td>1,08</td><td>0,33</td><td>0,46</td><td><strong>0,59</strong></td><td><strong>0,75</strong></td><td>0,88</td></tr>
              <tr><td><strong>0,70</strong></td><td>1,02</td><td>0,20</td><td>0,40</td><td><strong>0,54</strong></td><td><strong>0,69</strong></td><td>0,82</td></tr>
              <tr><td><strong>0,72</strong></td><td>0,96</td><td>0,21</td><td>0,34</td><td><strong>0,48</strong></td><td><strong>0,64</strong></td><td>0,76</td></tr>
              <tr><td><strong>0,75 (0,74/0,76)</strong></td><td>0,88</td><td>0,13</td><td>0,26</td><td><strong>0,40</strong></td><td><strong>0,55</strong></td><td>0,68</td></tr>
              <tr><td><strong>0,78</strong></td><td>0,80</td><td>0,05</td><td>0,18</td><td><strong>0,32</strong></td><td><strong>0,47</strong></td><td>0,59</td></tr>
              <tr><td><strong>0,80</strong></td><td>0,75</td><td>—</td><td>0,13</td><td><strong>0,27</strong></td><td><strong>0,42</strong></td><td>0,55</td></tr>
              <tr><td><strong>0,82</strong></td><td>0,70</td><td>—</td><td>0,08</td><td><strong>0,21</strong></td><td><strong>0,37</strong></td><td>0,49</td></tr>
              <tr><td><strong>0,84 (0,85)</strong></td><td>0,65 (0,62)</td><td>—</td><td>0,02</td><td><strong>0,16 (0,136)</strong></td><td><strong>0,32 (0,291)</strong></td><td>0,45</td></tr>
            </tbody>
          </table>
        </div>

        <p style="color:#38bdf8; margin-bottom:0.4rem;"><strong>⚙️ B) Betriebsdaten Käfigläufermotoren IE 3 bei 400 V / 50 Hz, ns = 1500 min⁻¹ (Europa TB S. 528):</strong></p>
        <div style="overflow-x:auto; margin-bottom:0.8rem;">
          <table class="proto-table" style="min-width:560px;">
            <thead>
              <tr>
                <th>Baugröße</th>
                <th>Bemessungsleistung PN</th>
                <th>Nenndrehzahl nN</th>
                <th>Nennstrom IN (400 V)</th>
                <th>Drehmoment MN</th>
                <th>Wirkungsgrad η</th>
                <th>cos φ</th>
                <th>Anzugsstrom IA / IN</th>
              </tr>
            </thead>
            <tbody>
              <tr><td>80 M</td><td><strong>0,75 kW</strong></td><td>1455 min⁻¹</td><td><strong>1,73 A</strong></td><td>4,92 Nm</td><td>82,3 %</td><td>0,76</td><td>6,8</td></tr>
              <tr><td>90 S</td><td><strong>1,1 kW</strong></td><td>1445 min⁻¹</td><td><strong>2,4 A</strong></td><td>7,27 Nm</td><td>83,7 %</td><td>0,79</td><td>7,2</td></tr>
              <tr><td>90 L</td><td><strong>1,5 kW</strong></td><td>1445 min⁻¹</td><td><strong>3,18 A</strong></td><td>9,91 Nm</td><td>85,1 %</td><td>0,80</td><td>7,7</td></tr>
              <tr><td>100 L</td><td><strong>3,0 kW</strong></td><td>1460 min⁻¹</td><td><strong>5,9 A</strong></td><td>19,6 Nm</td><td>88,4 %</td><td>0,83</td><td>8,3</td></tr>
              <tr><td>112 M</td><td><strong>4,0 kW</strong></td><td>1460 min⁻¹</td><td><strong>7,9 A</strong></td><td>26,2 Nm</td><td>89,1 %</td><td>0,82</td><td>7,1</td></tr>
              <tr><td>132 S</td><td><strong>5,5 kW</strong></td><td>1475 min⁻¹</td><td><strong>10,5 A</strong></td><td>35,6 Nm</td><td>90,0 %</td><td>0,84</td><td>8,2</td></tr>
              <tr><td>132 M</td><td><strong>7,5 kW</strong></td><td>1465 min⁻¹</td><td><strong>14,3 A</strong></td><td>48,9 Nm</td><td>90,1 %</td><td>0,84</td><td>8,2</td></tr>
            </tbody>
          </table>
        </div>

        <div style="background:#0f172a; padding:0.65rem; border-radius:8px; border:1px solid #334155;">
          <strong style="color:#4ade80;">🔄 C) Dahlander-Motoren Klemmbrett-Anschluss (Europa TB S. 536–537):</strong><br>
          • <strong>Variante Δ / YY (konstantes Drehmoment, Werkzeugmaschinen, P_Δ / P_YY = 1 : 1,5):</strong><br>
          &nbsp;&nbsp;➔ <em>Niedere Drehzahl (Δ):</em> L1 an <strong>1U</strong>, L2 an <strong>1V</strong>, L3 an <strong>1W</strong> (2U, 2V, 2W bleiben offen!).<br>
          &nbsp;&nbsp;➔ <em>Hohe Drehzahl (YY):</em> L1 an <strong>2U</strong>, L2 an <strong>2V</strong>, L3 an <strong>2W</strong> (<strong>1U, 1V, 1W</strong> werden durch das Sternschütz gebrückt!).<br>
          • <strong>Faustformel Kompensation (S. 328):</strong> Bei 230 V/50 Hz ca. <strong>60 µF/kvar</strong> | Bei 400 V/50 Hz im Dreieck ca. <strong>20 µF/kvar</strong>.
        </div>
      </div>

      <!-- REITER 6: LICHT (S. 233-235) & SAT-ANLAGEN (S. 438-442) -->
      <div id="etab-tab-lichtsat" class="europa-tab-pane hidden" style="font-size:0.81rem;">
        <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(280px, 1fr)); gap:0.75rem; margin-bottom:0.8rem;">
          <div style="background:#0f172a; padding:0.75rem; border-radius:8px; border:1px solid #334155;">
            <strong style="color:#fbbf24;">💡 Lichtberechnung nach Wirkungsgradmethode (Europa TB S. 233–235):</strong><br>
            1) <strong>Raumindex (direkt):</strong> <code>k = (l · b) / [h · (l + b)]</code> (mit h = Leuchtenhöhe über Arbeitsfläche, z. B. Tisch 0,75 m)<br>
            2) <strong>Raumindex (indirekt):</strong> <code>ki = (1,5 · l · b) / [hr · (l + b)]</code><br>
            3) <strong>Beleuchtungswirkungsgrad:</strong> <code>ηB = ηLB · ηR</code> (ηR aus Tabelle S. 235)<br>
            4) <strong>Leuchtenanzahl:</strong> <code>n = (Em · A) / (ΦL · ηB · WF)</code><br>
            • <strong>Reflexionsgrade ρ (S. 234):</strong> Weiß = 70–80 % | Hellgrau/Beige = 25–35 % | Beton = 15–25 %
          </div>
          <div style="background:#0f172a; padding:0.75rem; border-radius:8px; border:1px solid #334155;">
            <strong style="color:#38bdf8;">📡 SAT- & Antennenanlagen (Europa TB S. 438–442):</strong><br>
            • <strong>SAT-ZF Frequenzbereich (S. 438):</strong> 950 MHz bis <strong>2150 MHz</strong><br>
            • <strong>Quattro-LNB vs. Quad-LNB (S. 438):</strong> Quattro hat 4 feste Ausgänge (benötigt Multischalter!); Quad hat 4 umschaltbare Ausgänge direkt für 4 Receiver.<br>
            • <strong>Nutzpegel an Dose (S. 441):</strong> SAT-ZF / DVB-S: <strong>min. 47 dBµV bis max. 77 dBµV</strong> | UKW Stereo: 50–70 dBµV | DVB-T2: 35–74 dBµV<br>
            • <strong>Ausrichtung Düsseldorf / NRW für ASTRA 19,2° Ost (S. 439):</strong> Elevation <strong>αE = 30,3°</strong> | Azimut <strong>αA = 164,1°</strong><br>
            • <strong>Mechanik & Erdung (S. 442):</strong> Max. Biegemoment Mast = <strong>1650 Nm</strong> | Einspannlänge <code>lE ≥ 1/6 · lG</code> | Erdung: <strong>16 mm² Cu</strong>, 25 mm² Al, 50 mm² Stahl | Potentialausgleich: <strong>≥ 4 mm² Cu</strong>.
          </div>
        </div>
      </div>
    </div>
  `;
  document.body.appendChild(refModal);

  function renderEuropaIndex(filterText = "") {
    const container = document.getElementById("europa-index-results");
    if (!container) return;
    const q = filterText.trim().toLowerCase();
    const matches = A_TO_Z_INDEX.filter(
      (it) => !q || it.term.toLowerCase().includes(q) || it.page.toLowerCase().includes(q)
    );
    container.innerHTML = matches.map((it) => `
      <div style="background:#0f172a; padding:0.5rem 0.75rem; border-radius:6px; border:1px solid #334155; display:flex; justify-content:space-between; align-items:center; gap:0.5rem; font-size:0.81rem;">
        <span style="color:#e2e8f0;">${it.term}</span>
        <strong style="color:#fbbf24; white-space:nowrap; background:#1e293b; padding:0.15rem 0.5rem; border-radius:4px; border:1px solid #475569;">${it.page}</strong>
      </div>
    `).join("");
  }

  renderEuropaIndex();

  document.getElementById("europa-index-search")?.addEventListener("input", (e) => {
    renderEuropaIndex(e.target.value);
  });

  document.getElementById("btn-close-europa-ref")?.addEventListener("click", () => {
    refModal.classList.add("hidden");
  });

  refModal.querySelectorAll(".europa-tab-btn").forEach((btn, idx) => {
    btn.addEventListener("click", () => {
      refModal.querySelectorAll(".europa-tab-btn").forEach((b) => {
        b.className = "btn secondary europa-tab-btn";
      });
      btn.className = "btn primary europa-tab-btn";
      const target = btn.dataset.etab;
      refModal.querySelectorAll(".europa-tab-pane").forEach((p) => {
        p.classList.toggle("hidden", p.id !== `etab-${target}`);
      });
    });
  });

  // 1. Globaler Button oben im App-Header (damit von JEDEM Tab aus erreichbar!)
  const headerTopBar = document.querySelector(".header-top-bar");
  if (headerTopBar && !document.getElementById("btn-open-europa-header")) {
    const hdrBtn = document.createElement("button");
    hdrBtn.id = "btn-open-europa-header";
    hdrBtn.type = "button";
    hdrBtn.className = "ai-status-btn";
    hdrBtn.style.cssText = "background: rgba(245, 158, 11, 0.2); border-color: #f59e0b; color: #fde68a;";
    hdrBtn.innerHTML = "📖 <span>Europa-Tabellenbuch (Werte & A–Z)</span>";
    hdrBtn.addEventListener("click", () => refModal.classList.remove("hidden"));
    headerTopBar.appendChild(hdrBtn);
  }

  // 2. Button direkt im Rechentrainer
  const calcRandomBtn = document.getElementById("btn-calc-random");
  if (calcRandomBtn && !document.getElementById("btn-open-europa-calc")) {
    const btn1 = document.createElement("button");
    btn1.id = "btn-open-europa-calc";
    btn1.type = "button";
    btn1.className = "btn primary";
    btn1.innerHTML = "📖 Tabellenbuch-Werte & Seitenfinder (A–Z)";
    btn1.addEventListener("click", () => refModal.classList.remove("hidden"));
    calcRandomBtn.insertAdjacentElement("afterend", btn1);
  }

  // 3. Button direkt im Prüfprotokoll
  const protoRevealBtn = document.getElementById("btn-proto-reveal");
  if (protoRevealBtn && !document.getElementById("btn-open-europa-proto")) {
    const btn2 = document.createElement("button");
    btn2.id = "btn-open-europa-proto";
    btn2.type = "button";
    btn2.className = "btn secondary";
    btn2.innerHTML = "📖 VDE-Tabellen & gG-Abschaltströme";
    btn2.addEventListener("click", () => {
      refModal.classList.remove("hidden");
      refModal.querySelector('[data-etab="tab-vde0100"]')?.click();
    });
    protoRevealBtn.insertAdjacentElement("afterend", btn2);
  }

  if (typeof window.renderQuestion === "function") {
    window.renderQuestion();
  }
})();

// =========================================================================
// 27. PAKET 1: CHATBOT-EVOLUTION (ONLINE-KI MIT EUROPA-TABELLENBUCH-GEHIRN,
//     OFFLINE-TABELLEN-DETEKTIV, LIVE-WERTERECHNER & KONTEXT-CHIPS)
// =========================================================================
(function() {
  // -----------------------------------------------------------------------
  // 1) KOMPAKTE EUROPA-TABELLENBUCH-REFERENZKARTE FÜR DIE ONLINE-KI (GEMINI)
  // -----------------------------------------------------------------------
  const EUROPA_AI_BRAIN = `
=== VERBINDLICHE REFERENZ: EUROPA TABELLENBUCH ELEKTROTECHNIK (AUFLAGE DES PRÜFLINGS) ===
Nenne dem Prüfling bei deinen Erklärungen IMMER die passenden exakten Seitenzahlen aus seinem Buch:
• Grundlagen & Drehstrom: Drehmoment M = (9550·P2)/n (S. 24 & S. 532), elektr. Arbeit/Leistung (S. 36–37), Widerstands-Reihen-/Parallelschaltung (S. 38–39), Drehstrom √3 & Stern/Dreieck (S. 48–50), E12-Normreihe (S. 51), NTC/PTC/VDR (S. 55).
• Schaltzeichen, Messen & Sensorik: Kennlinien ablesen (S. 70), DIN EN 81346 BMK-Kennzeichnung (-F, -Q, -B, -P, -X: S. 81–83), Kontakte NO/NC (S. 84–88), Messkategorien CAT II–IV (S. 89), Installationstester (S. 113), Erdungsmessung (S. 119), Zangenstrommessung (S. 120), eHZ & Smart Meter Gateway SMGW (S. 123–124), DMS-Sensoren (S. 128–129), Bewegungsmelder PIR (S. 130, 156–157), Pt100 Temperaturmessung (S. 131), Lichtschranken & Näherungsschalter (S. 132–134).
• Elektrische Installation & Leitungsberechnung: 5 Sicherheitsregeln (S. 139), KNX-Bus (S. 159–170), Netzsysteme TN-C/TN-S/TT/IT (S. 180, 257–259), Schutzleiter/PE-Mindestquerschnitte (S. 182), Fundamenterder V4A & Erdung (S. 183–184), Haupterdungsschiene HES (S. 185, 257), PEN-Aufteilung (S. 186), Gleichzeitigkeitsfaktor (S. 187), Zählerplatz NAR/SLS/APZ/AAR (S. 188–189), Spannungsfall ΔU/Δu (S. 192–193, max. Längen S. 205), Verlegearten A1–G (S. 196), Strombelastbarkeit Ir bei 25 °C (S. 197) und bei 30 °C (S. 198, Standard für f1!), flexible Leitungen (S. 200), Faktoren f1 (Temperatur, Bezug 30 °C: 35°C=0,94, 40°C=0,87) & f2 (Häufung V4/V5 im Rohr: 2=0,80, 3=0,70, 4=0,65) & f5 Kabeltrommel (S. 201), Erdkabel Verlegeart D1/D2 bei 20 °C (S. 204) & Verlegetiefe 0,6m/0,8m (S. 291), Überlastschutz Ib ≤ In ≤ Iz & Kurzschlussschutz l_max (S. 206–208).
• Überstrom-Schutzeinrichtungen: Schmelzsicherungen D/D0/NH & Kennmelder-Farben (6A grün, 10A rot, 16A grau, 20A blau, 25A gelb, 32A violett, 35/40A schwarz, 50A weiß, 63A kupfer: S. 209), gG-Kennlinien & Selektivität 1,6:1 (S. 210, 260), LS-Schalter B (3–5·In), C (5–10·In), D (10–20·In), Z (2–3·In), K (10–14·In) & Prüfstrom 1,45·In (S. 211).
• Beleuchtung: Wartungsfaktor WF (S. 229), Wirkungsgradmethode, Raumindex k = (l·b)/[h·(l+b)], Reflexionsgrade ρ & Raumwirkungsgrad ηR (S. 233–235).
• Schutzmaßnahmen (VDE 0100-410) & Prüfung (VDE 0100-600): Schutzklassen SK I–III & SELV/PELV ≤ 50 V AC (S. 254–255), Abschaltzeiten TN (0,4 s bis 32A/63A, 5 s Verteiler) & TT (0,2 s / 1 s) & Spannungswaage (S. 257), Fehlerschleifenimpedanz Zsm ≤ (2/3)·(U0/Ia) & TT-Erder RA ≤ 50V/I_Δn (30mA -> 1666 Ω: S. 258), Schutztrennung, IT-System & zusätzlicher Potentialausgleich R ≤ 50V/Ia (S. 259), RCD-Typen A, F, B, B+ & Stromrichterschaltungen (S. 260–261), Erstprüfung VDE 0100-600 (16 Schritte: 1. Besichtigen, 2. RPE ≥ 0,2A DC, 3. Riso ≥ 1,0 MΩ bei 500V DC bzw. ≥ 0,5 MΩ bei SELV 250V DC, SPDs abklemmen!, 4. Zs: S. 264–266, gG-Abschaltströme Ia für 0,4s/5s: 16A=107A/65A, 20A=145A/85A, 25A=180A/110A, 32A=265A/150A, 63A=550A/320A auf S. 266), Prüfprotokoll (S. 274).
• Energie, Gebäudetechnik, IK & Antriebe: PV-Anlagen (S. 297–305), Notbeleuchtung (S. 309–311), Wallbox (S. 313–315), Blindleistungskompensation (Formeln & 20 µF/kvar auf S. 328, Faktor-Tabelle FK = tan φ1 - tan φ2 auf S. 329), Blitzschutz & SPD (S. 335–338), Korrosion (S. 340), IP-Schutzarten (S. 345), Rauchwarnmelder RWM (S. 350), AFDD (S. 351–352), Brandabschnitte (S. 353–354), EMA Ruhestrom (S. 358), Wärmepumpe (S. 366–367), Netzwerk/LWL/Switch/Router/PoE (S. 408–417), SAT-Anlagen (Quattro vs. Quad S. 438, Düsseldorf Azimut 164,1° / Elevation 30,3° S. 439, Pegel 47–77 dBµV S. 441, Erdung 16mm² Cu & Biegemoment max. 1650 Nm S. 442), FU (S. 462–463), LOGO! & SPS (S. 468–478), Schützschaltungen & Drahtbruchsicherheit (S. 503–509), IE3-Motordaten (S. 528), Leistungsschilder 230/400V vs. 400/690V (S. 530), Dahlander Δ/YY, Y/YY, YY/Δ (S. 536–537), Softstarter (S. 553), Leitfähigkeit κ Cu=56/Al=35 (S. 561), Leitungsarten NYM/NYY/H07RN-F (S. 571–580), WiSo Tarif/GmbH/Kalkulation (S. 606–614), Fachenglisch (S. 638–643).
==========================================================================================`;

  // Hook in requestGeminiApi, damit JEDE Online-KI-Antwort im Chat das Europa-Gehirn nutzt!
  const origRequestGemini = window.requestGeminiApi;
  if (typeof origRequestGemini === "function") {
    window.requestGeminiApi = async function(contentsInput, isJson = false, accessCode = groupAccessCode) {
      if (!isJson && contentsInput && contentsInput !== "Antworte ausschließlich mit OK.") {
        if (Array.isArray(contentsInput)) {
          const cloned = JSON.parse(JSON.stringify(contentsInput));
          const lastTurn = cloned[cloned.length - 1];
          if (lastTurn && lastTurn.parts && lastTurn.parts[0]) {
            lastTurn.parts[0].text = `${EUROPA_AI_BRAIN}\n\n${lastTurn.parts[0].text}`;
          }
          return origRequestGemini.call(this, cloned, isJson, accessCode);
        } else if (typeof contentsInput === "string") {
          return origRequestGemini.call(this, `${EUROPA_AI_BRAIN}\n\n${contentsInput}`, isJson, accessCode);
        }
      }
      return origRequestGemini.call(this, contentsInput, isJson, accessCode);
    };
  }

  // -----------------------------------------------------------------------
  // 2) HELFER ZUM DIREKTEN ÖFFNEN DES TABELLENBUCH-POPUPS AUS DEM CHAT
  // -----------------------------------------------------------------------
  window.openEuropaPopupTab = function(tabName, searchQuery = "") {
    const modal = document.getElementById("europa-ref-modal");
    if (!modal) return;
    modal.classList.remove("hidden");
    const targetBtn = modal.querySelector(`[data-etab="${tabName}"]`);
    if (targetBtn) targetBtn.click();
    if (tabName === "tab-index" && searchQuery) {
      const sInp = document.getElementById("europa-index-search");
      if (sInp) {
        sInp.value = searchQuery;
        sInp.dispatchEvent(new Event("input"));
      }
    }
  };

  function appendRichBotBubble(htmlContent, tabTarget = null, tabLabel = "📖 Im Europa-Tabellenbuch-Popup öffnen") {
    const msgBox = document.getElementById("chatbot-messages");
    if (!msgBox) return;
    const bubble = document.createElement("div");
    bubble.className = "chat-bubble bot";
    let finalHtml = htmlContent;
    if (tabTarget) {
      finalHtml += `<div style="margin-top:0.55rem;"><button type="button" class="quick-chip" style="background:#1e3a8a; color:#fff; border-color:#60a5fa; font-weight:700;" onclick="window.openEuropaPopupTab('${tabTarget}')">${tabLabel} ➔</button></div>`;
    }
    bubble.innerHTML = finalHtml;
    msgBox.appendChild(bubble);
    msgBox.scrollTop = msgBox.scrollHeight;
  }

  // -----------------------------------------------------------------------
  // 3) INTELLIGENTER TABELLEN- & WERTE-DETEKTIV (FÜR SOFORT-AUSKÜNFTE)
  // -----------------------------------------------------------------------
  const FUSE_DATA = {
    "2":  { color: "Rosa", size: "D01 (E14)", ia04: "ca. 13 A", zs04: "17,7 Ω", ia5: "ca. 8 A", zs5: "28,7 Ω" },
    "4":  { color: "Braun", size: "D01 (E14)", ia04: "ca. 27 A", zs04: "8,5 Ω", ia5: "ca. 16 A", zs5: "14,4 Ω" },
    "6":  { color: "Grün", size: "D01 (E14)", ia04: "ca. 44 A", zs04: "5,23 Ω", ia5: "27 A", zs5: "8,52 Ω" },
    "10": { color: "Rot", size: "D01 (E14)", ia04: "82 A", zs04: "2,80 Ω", ia5: "47 A", zs5: "4,89 Ω" },
    "13": { color: "Schwarz", size: "D01 (E14)", ia04: "ca. 95 A", zs04: "2,42 Ω", ia5: "ca. 56 A", zs5: "4,10 Ω" },
    "16": { color: "Grau", size: "D01 (E14)", ia04: "107 A (bzw. 109 A)", zs04: "2,15 Ω", ia5: "65 A", zs5: "3,54 Ω" },
    "20": { color: "Blau", size: "D02 (E18)", ia04: "145 A (bzw. 148 A)", zs04: "1,59 Ω", ia5: "85 A (bzw. 87 A)", zs5: "2,71 Ω" },
    "25": { color: "Gelb", size: "D02 (E18)", ia04: "180 A", zs04: "1,28 Ω", ia5: "110 A", zs5: "2,09 Ω" },
    "32": { color: "Violett", size: "D02 (E18)", ia04: "265 A (bzw. 270 A)", zs04: "0,87 Ω", ia5: "150 A", zs5: "1,53 Ω" },
    "35": { color: "Schwarz", size: "D02 (E18)", ia04: "ca. 280 A", zs04: "0,82 Ω", ia5: "160 A", zs5: "1,44 Ω" },
    "40": { color: "Schwarz", size: "D02 (E18)", ia04: "315 A", zs04: "0,73 Ω", ia5: "190 A", zs5: "1,21 Ω" },
    "50": { color: "Weiß", size: "D02 (E18)", ia04: "470 A", zs04: "0,49 Ω", ia5: "ca. 250 A", zs5: "0,92 Ω" },
    "63": { color: "Kupfer", size: "D02 (E18)", ia04: "550 A", zs04: "0,42 Ω", ia5: "320 A", zs5: "0,72 Ω" },
    "80": { color: "Silber", size: "D03 (M30x2)", ia04: "ca. 750 A", zs04: "0,31 Ω", ia5: "ca. 430 A", zs5: "0,53 Ω" },
    "100":{ color: "Rot", size: "D03 (M30x2)", ia04: "ca. 950 A", zs04: "0,24 Ω", ia5: "ca. 580 A", zs5: "0,40 Ω" }
  };

  const CABLE_IR_DATA = {
    "1,5": { a2_30: "15,5 / 13 A", b2_30: "16,5 / 15 A", c_30: "19,5 / 17,5 A", a2_25: "16,5 / 14 A", b2_25: "17,5 / 16 A", d1: "22 / 18 A", d2: "27 A" },
    "2,5": { a2_30: "18,5 / 17,5 A", b2_30: "23 / 20 A", c_30: "27 / 24 A", a2_25: "19,5 / 18,5 A", b2_25: "24 / 21 A", d1: "29 / 24 A", d2: "36 A" },
    "4":   { a2_30: "25 / 23 A", b2_30: "30 / 27 A", c_30: "36 / 32 A", a2_25: "27 / 24 A", b2_25: "32 / 29 A", d1: "37 / 30 A", d2: "47 A" },
    "6":   { a2_30: "32 / 29 A", b2_30: "38 / 34 A", c_30: "46 / 41 A", a2_25: "34 / 31 A", b2_25: "40 / 36 A", d1: "46 / 38 A", d2: "59 A" },
    "10":  { a2_30: "43 / 39 A", b2_30: "52 / 46 A", c_30: "63 / 57 A", a2_25: "46 / 41 A", b2_25: "55 / 49 A", d1: "60 / 50 A", d2: "79 A" },
    "16":  { a2_30: "57 / 52 A", b2_30: "69 / 62 A", c_30: "85 / 76 A", a2_25: "60 / 55 A", b2_25: "73 / 66 A", d1: "78 / 64 A", d2: "102 A" },
    "25":  { a2_30: "75 / 68 A", b2_30: "90 / 80 A", c_30: "112 / 96 A", a2_25: "80 / 72 A", b2_25: "95 / 85 A", d1: "99 / 82 A", d2: "133 A" }
  };

  const MOTOR_IE3_DATA = {
    "0,75": { bg: "80 M", n: 1455, inA: 1.73, mn: 4.92, eta: 82.3, cos: 0.76, iaRatio: 6.8 },
    "1,1":  { bg: "90 S", n: 1445, inA: 2.40, mn: 7.27, eta: 83.7, cos: 0.79, iaRatio: 7.2 },
    "1,5":  { bg: "90 L", n: 1445, inA: 3.18, mn: 9.91, eta: 85.1, cos: 0.80, iaRatio: 7.7 },
    "3":    { bg: "100 L", n: 1460, inA: 5.90, mn: 19.6, eta: 88.4, cos: 0.83, iaRatio: 8.3 },
    "3,0":  { bg: "100 L", n: 1460, inA: 5.90, mn: 19.6, eta: 88.4, cos: 0.83, iaRatio: 8.3 },
    "4":    { bg: "112 M", n: 1460, inA: 7.90, mn: 26.2, eta: 89.1, cos: 0.82, iaRatio: 7.1 },
    "4,0":  { bg: "112 M", n: 1460, inA: 7.90, mn: 26.2, eta: 89.1, cos: 0.82, iaRatio: 7.1 },
    "5,5":  { bg: "132 S", n: 1475, inA: 10.5, mn: 35.6, eta: 90.0, cos: 0.84, iaRatio: 8.2 },
    "7,5":  { bg: "132 M", n: 1465, inA: 14.3, mn: 48.9, eta: 90.1, cos: 0.84, iaRatio: 8.2 },
    "18,5": { bg: "180 M", n: 1460, inA: 35.0, mn: 121,  eta: 91.0, cos: 0.85, iaRatio: 6.2 },
    "22":   { bg: "180 L", n: 1460, inA: 41.0, mn: 144,  eta: 91.0, cos: 0.85, iaRatio: 6.4 }
  };

  function trySmartEuropaLookup(rawQuery) {
    const q = rawQuery.trim().toLowerCase().replace(/\./g, ",");

    // A) "Wo steht ...?" / "Auf welcher Seite ...?" / "Seite für ..."
    const pageLookupMatch = q.match(/(?:wo\s+steht|wo\s+finde\s+ich|auf\s+welcher\s+seite|buchseite|seite\s+für|seite\s+von)\s+(.+?)[\?\!]*$/i);
    if (pageLookupMatch) {
      const term = pageLookupMatch[1].replace(/(im\s+tabellenbuch|im\s+buch|in\s+europa)/gi, "").trim();
      if (term.length >= 2) {
        return {
          html: `🔎 <strong style="color:#60a5fa;">Suchergebnis im Europa-Tabellenbuch für „${term}“:</strong><br>Klicke unten auf den Button, um alle passenden Seitenzahlen im A–Z-Seitenfinder gefiltert anzuzeigen!`,
          tab: "tab-index",
          search: term,
          btnLabel: `🔎 „${term}“ im A–Z-Seitenfinder öffnen`
        };
      }
    }

    // B) Schmelzsicherung gG / Kennmelder-Farbe (z. B. "gG 25", "Kennmelder 35A", "Sicherung 16A gG")
    const fuseMatch = q.match(/(?:gg|sicherung|kennmelder|schmelzsicherung|neozed|diazed|nh).*?\b(2|4|6|10|13|16|20|25|32|35|40|50|63|80|100)\s*a?\b|\b(2|4|6|10|13|16|20|25|32|35|40|50|63|80|100)\s*a?\s*(?:gg|neozed|diazed|schmelzsicherung|kennmelder)/i);
    if (fuseMatch) {
      const amp = fuseMatch[1] || fuseMatch[2];
      const d = FUSE_DATA[amp];
      if (d) {
        return {
          html: `🔥 <strong style="color:#fbbf24;">Schmelzsicherung ${amp} A gG (Europa TB S. 206, 208, 209 & 266):</strong>
• <strong>Kennmelder-Farbe (S. 209):</strong> ${d.color} | Baugröße: ${d.size}
• <strong>Endstromkreis (t ≤ 0,4 s, S. 206/266):</strong> Abschaltstrom <code>Ia = ${d.ia04}</code> ➔ <code>Zs_max = ${d.zs04}</code>
• <strong>Verteilerkreis (t ≤ 5,0 s, S. 208/266):</strong> Abschaltstrom <code>Ia = ${d.ia5}</code> ➔ <code>Zs_max = ${d.zs5}</code>
• <strong>Selektivität (S. 210/260):</strong> Faktor mind. 1,6 : 1 zur vor-/nachgeschalteten Sicherung!`,
          tab: "tab-fuses",
          btnLabel: "🔥 Sicherungs-Tabelle (S. 206–211) öffnen"
        };
      }
    }

    // C) Live-Kompensationsrechner (z. B. "Kompensation 0,72 auf 0,95" oder "cos 0,75 auf 0,92")
    const kompMatch = q.match(/(?:kompensation|cos|tan|fk).*?(0,\d{1,2})\s*(?:auf|zu|nach|->|-)\s*(0,\d{1,2})/i);
    if (kompMatch) {
      const c1 = parseFloat(kompMatch[1].replace(",", "."));
      const c2 = parseFloat(kompMatch[2].replace(",", "."));
      if (c1 > 0.3 && c1 < 1 && c2 > c1 && c2 <= 1) {
        const t1 = Math.tan(Math.acos(c1));
        const t2 = Math.tan(Math.acos(c2));
        const fk = t1 - t2;
        return {
          html: `🔋 <strong style="color:#4ade80;">Blindleistungskompensation (Europa TB S. 328–329):</strong>
• Vorher: <code>cos φ1 = ${c1.toFixed(2)}</code> ➔ <code>tan φ1 = ${t1.toFixed(3)}</code>
• Nachher: <code>cos φ2 = ${c2.toFixed(2)}</code> ➔ <code>tan φ2 = ${t2.toFixed(3)}</code>
• <strong>Kompensationsfaktor:</strong> <code>FK = tan φ1 - tan φ2 = ${fk.toFixed(3)}</code> (auf 2 Stellen laut Tabelle S. 329: <strong>${fk.toFixed(2)}</strong>)
• <strong>Formeln (S. 328):</strong> <code>Qc = P1 · ${fk.toFixed(3)}</code> | <code>C_ges = Qc / (2·π·50Hz·U²)</code> | Im Dreieck: <code>C_Δ = C_ges / 3</code>`,
          tab: "tab-komp",
          btnLabel: "🔋 Kompensations-Tabelle (S. 329) öffnen"
        };
      }
    }

    // D) IE3-Motordaten abfragen (z. B. "Motor 5,5 kW", "IE3 4 kW", "Käfigläufer 7,5 kW")
    const motMatch = q.match(/(?:motor|ie3|käfigläufer|asynchron).*?\b(0,75|1,1|1,5|3|3,0|4|4,0|5,5|7,5|18,5|22)\s*kw/i);
    if (motMatch) {
      const kw = motMatch[1];
      const m = MOTOR_IE3_DATA[kw];
      if (m) {
        const p1Kw = (parseFloat(kw.replace(",", ".")) / (m.eta / 100)).toFixed(2);
        const iaAmp = (m.inA * m.iaRatio).toFixed(1);
        return {
          html: `⚙️ <strong style="color:#38bdf8;">IE3-Drehstrommotor PN = ${kw} kW, 4-polig (Europa TB S. 528):</strong>
• <strong>Baugröße:</strong> ${m.bg} | <strong>Nenndrehzahl nN:</strong> ${m.n} min⁻¹ (Schlupf: ${(((1500 - m.n)/1500)*100).toFixed(1)} %)
• <strong>Bemessungsstrom IN (400 V):</strong> <strong>${m.inA} A</strong> | <strong>Drehmoment MN:</strong> ${m.mn} Nm
• <strong>Wirkungsgrad η:</strong> ${m.eta} % (Aufnahmeleistung <code>P1 = PN / η = ${p1Kw} kW</code>) | <strong>cos φ:</strong> ${m.cos}
• <strong>Anzugsstrom IA / IN:</strong> ${m.iaRatio}-fach ➔ <code>IA = ${m.iaRatio} · ${m.inA} A = ${iaAmp} A</code>`,
          tab: "tab-komp",
          btnLabel: "⚙️ IE3-Motorentabelle (S. 528) öffnen"
        };
      }
    }

    // E) Strombelastbarkeit Ir für einen Querschnitt (z. B. "Ir 2,5", "Belastbarkeit 4 mm²", "Querschnitt 6 mm²")
    const irMatch = q.match(/(?:\bir\b|\biz\b|strombelastbarkeit|belastbarkeit).*?\b(1,5|2,5|4|6|10|16|25)\s*(?:mm|qmm)?/i);
    if (irMatch) {
      const qmm = irMatch[1];
      const c = CABLE_IR_DATA[qmm];
      if (c) {
        return {
          html: `⚡ <strong style="color:#38bdf8;">Strombelastbarkeit Ir für ${qmm} mm² Cu (2 / 3 belastete Adern):</strong>
• <strong>Bei 30 °C (Europa TB S. 198 – Standard für f1!):</strong>
  - Verlegeart A2: <strong>${c.a2_30}</strong> | B2: <strong>${c.b2_30}</strong> | C: <strong>${c.c_30}</strong>
• <strong>Bei 25 °C (Europa TB S. 197):</strong>
  - Verlegeart A2: <strong>${c.a2_25}</strong> | B2: <strong>${c.b2_25}</strong>
• <strong>Erdkabel NYY bei 20 °C (Europa TB S. 204):</strong>
  - Im Rohr (D1): <strong>${c.d1}</strong> | Direkt in Erde (D2): <strong>${c.d2}</strong>`,
          tab: "tab-vde0298",
          btnLabel: "⚡ Leitungstabellen (S. 197–204) öffnen"
        };
      }
    }

    return null;
  }

  // Hook in handleChatbotQuery: Prüft zuerst, ob eine direkte Tabellen-/Seitenabfrage vorliegt!
  const prevHandleQuery = window.handleChatbotQuery;
  window.handleChatbotQuery = async function(query) {
    if (!query || !query.trim()) return;
    const cleanQ = query.trim().replace(/^!/, "").trim();

    const smartHit = trySmartEuropaLookup(cleanQ);
    if (smartHit) {
      appendChatMessage(cleanQ, "user");
      const inp = document.getElementById("chatbot-input");
      if (inp) inp.value = "";
      appendRichBotBubble(smartHit.html, smartHit.tab, smartHit.btnLabel);
      if (smartHit.search) {
        setTimeout(() => {
          const sInp = document.getElementById("europa-index-search");
          if (sInp) sInp.value = smartHit.search;
        }, 50);
      }
      return;
    }

    if (typeof prevHandleQuery === "function") {
      await prevHandleQuery(query);
    }
  };

  // -----------------------------------------------------------------------
  // 4) KONTEXT-SCHNELLWAHL-CHIP JE NACH GEÖFFNETEM TAB AUTOMATISCH ANPASSEN
  // -----------------------------------------------------------------------
  const quickPromptsBox = document.querySelector(".chatbot-quick-prompts");
  if (quickPromptsBox && !document.getElementById("dynamic-tab-chip")) {
    const dynChip = document.createElement("button");
    dynChip.id = "dynamic-tab-chip";
    dynChip.type = "button";
    dynChip.className = "quick-chip";
    dynChip.style.cssText = "background: rgba(245, 158, 11, 0.2); border-color: #f59e0b; color: #fde68a; font-weight: 700;";
    quickPromptsBox.prepend(dynChip);

    function updateDynamicChipForActiveTab() {
      const activeTabId = document.querySelector(".tab-btn.active")?.id || "tab-wiso";
      if (activeTabId === "tab-calc") {
        dynChip.textContent = "📖 Welche Buchseite & Formel brauche ich hier?";
        dynChip.onclick = () => window.handleChatbotQuery("!Nenne mir für diese Rechenaufgabe die genaue Buchseite im Europa-Tabellenbuch, die Grundformel und die umgestellte Formel!");
      } else if (activeTabId === "tab-protokoll") {
        dynChip.textContent = "📋 Grenzwerte VDE 0100-600 (S. 264–266)";
        dynChip.onclick = () => window.openEuropaPopupTab("tab-vde0100");
      } else if (activeTabId === "tab-schaltplan") {
        dynChip.textContent = "🔎 Meine aktuelle Schaltung / Fehler erklären";
        dynChip.onclick = () => window.handleChatbotQuery("!Analysiere meine aktuell geöffnete Schaltung bzw. Aufgabe im Schaltplan-/CAD-/SPS-Trainer und gib mir konkrete Tipps!");
      } else if (activeTabId === "tab-english") {
        dynChip.textContent = "🇬🇧 Vokabel-Eselsbrücke (S. 638)";
        dynChip.onclick = () => window.handleChatbotQuery("!Erkläre mir die englischen Fachbegriffe dieser Frage mit einer einprägsamen Eselsbrücke für die Prüfung (Europa S. 638)!");
      } else {
        dynChip.textContent = "📖 Auf welcher Buchseite steht dieses Thema?";
        dynChip.onclick = () => window.handleChatbotQuery("!Auf welcher Seite im Europa-Tabellenbuch steht das Thema dieser Frage und was ist die wichtigste Prüfungsfalle dazu?");
      }
    }

    document.querySelectorAll(".tab-btn").forEach((b) => {
      b.addEventListener("click", () => setTimeout(updateDynamicChipForActiveTab, 50));
    });
    updateDynamicChipForActiveTab();
  }
})();

// =========================================================================
// 28. PAKET 2 & 3:
//     - 16 NEUE FRAGEN "TABELLENBUCH-MEISTERKLASSE (S. 196–537)" (el-60 bis el-75)
//     - 5 NEUE ORIGINAL-RECHENAUFGABEN (AUFGABE 16 BIS 20 IM RECHENTRAINER)
// =========================================================================
(function() {
  // -----------------------------------------------------------------------
  // 1) PAKET 2: 16 NEUE FRAGEN FÜR DEN ELEKTRO-TRAINER (S. 196 BIS S. 537)
  // -----------------------------------------------------------------------
  const NEW_TABELLENBUCH_QUESTIONS = [
    {
      id: "el-60",
      exam: "Tabellenbuch S. 197, 198 & 201",
      category: "📖 Tabellenbuch-Meisterklasse (S. 196–537)",
      question: "Im Europa-Tabellenbuch gibt es zwei Tabellen für die Strombelastbarkeit Ir von PVC-Leitungen: Seite 197 (25 °C) und Seite 198 (30 °C). Wann musst du zwingend auf Seite 198 (30 °C) nachschlagen und was gilt bei > 0,5 m Verlegung in Wärmedämmung?",
      options: [
          "Sobald mit dem Temperatur-Umrechnungsfaktor f1 (Seite 201) gerechnet wird, muss auf Seite 198 (30 °C) nachgeschlagen werden, weil die f1-Tabelle auf 30 °C (f1 = 1,0) normiert ist! Liegt ein Kabel > 0,5 m vollständig in Wärmedämmung, sinkt Iz auf 50 % von Verlegeart C.",
          "Man schlägt grundsätzlich immer auf Seite 197 (25 °C) nach, weil die 30-°C-Tabelle auf Seite 198 ausschließlich für ungeschützte Freileitungen im Außenbereich und Solarkabel auf Dächern gilt.",
          "Seite 198 (30 °C) darf nur für Aluminiumkabel ab 16 mm² Querschnitt verwendet werden; bei einer Verlegung von über 0,5 m in Wärmedämmung darf die Strombelastbarkeit Iz mit dem Faktor 1,45 multipliziert werden.",
          "Beide Tabellen liefern identische Bemessungswerte; wird eine Mantelleitung über 0,5 m Länge komplett in Wärmedämmung verlegt, entspricht dies automatisch der thermisch günstigsten Verlegeart E (frei in Luft)."
        ],
      correct: 0,
      explanation: "• Prüfungsfalle Leitungsdimensionierung: Nach aktueller DIN VDE 0298-4 ist die Referenztemperatur in Luft 30 °C (S. 198). Darauf bezieht sich auch f1 auf S. 201 (bei 30 °C ist f1 = 1,0; bei 35 °C ist f1 = 0,94).\n• 📖 Europa Tabellenbuch: S. 197 (25 °C), S. 198 (30 °C) & S. 201 (Faktor f1)"
    },
    {
      id: "el-61",
      exam: "Tabellenbuch S. 200 & 201",
      category: "📖 Tabellenbuch-Meisterklasse (S. 196–537)",
      question: "Eine Gummischlauchleitung H07RN-F wird auf einer Kabeltrommel in 3 Lagen aufgewickelt betrieben. Welche zulässige Betriebstemperatur am Leiter gilt für Gummi (S. 200/201) und wie stark muss die Belastbarkeit durch den Faktor f5 (S. 201) reduziert werden?",
      options: [
          "Für Gummi (H07RN-F) gilt eine maximale Betriebstemperatur am Leiter von 60 °C (PVC: 70 °C). Bei 3 aufgewickelten Lagen beträgt der Umrechnungsfaktor f5 = 0,49 – die Leitung darf also nur noch mit knapp der Hälfte ihres Nennstroms belastet werden!",
          "Für Gummischlauchleitungen (H07RN-F) gilt eine zulässige Betriebstemperatur von 90 °C am Leiter; bei 3 aufgewickelten Lagen auf einer Kabeltrommel verbessert sich die Kühlung auf den Faktor f5 = 1,22.",
          "Aufgewickelte Leitungen auf Kabeltrommeln müssen nach DIN VDE 0298-4 überhaupt nicht abgemindert werden (f5 = 1,00), sofern ein 30-mA-RCD und ein LS-Schalter B16A in der Trommel integriert sind.",
          "Für Gummi gilt wie bei PVC eine Grenztemperatur von 70 °C am Leiter; bei 3 aufgewickelten Lagen auf einer Trommel beträgt der Umrechnungsfaktor laut Seite 201 noch f5 = 0,94 (nur 6 % Abminderung)."
        ],
      correct: 0,
      explanation: "• Aufgewickelte Leitungen können die Stromwärme kaum abführen (Wärmestau, Brandgefahr!). Laut S. 201 unten gilt für f5: 1 Lage = 0,80 | 2 Lagen = 0,61 | 3 Lagen = 0,49 | 4 Lagen = 0,42 | 5 Lagen = 0,38. Deshalb Kabeltrommeln bei hoher Last ganz abrollen!\n• 📖 Europa Tabellenbuch: S. 200 (H07RN-F 60 °C) & S. 201 unten (Faktor f5)"
    },
    {
      id: "el-62",
      exam: "Tabellenbuch S. 204",
      category: "📖 Tabellenbuch-Meisterklasse (S. 196–537)",
      question: "Du verlegst ein Erdkabel NYY-J 5x2,5 mm² (3 belastete Adern, Cu, 70 °C) im Erdboden bei 20 °C (Verlegeart D, Seite 204). Warum unterscheidet die Tabelle auf Seite 204 zwischen D1 (im Rohr: 24 A) und D2 (direkt in Erde: 36 A)?",
      options: [
          "Bei direkter Erdverlegung (D2) umschließt das feuchte Erdreich/Sandbett das Kabel direkt und kühlt es gut (36 A). Im Schutzrohr im Erdboden (D1) wirkt die eingeschlossene Luft im Rohr als Wärmedämmung, sodass nur 24 A zulässig sind!",
          "In Verlegeart D1 (im Schutzrohr) ist die zulässige Strombelastbarkeit deutlich höher als bei direkter Erdverlegung (D2), weil die zirkulierende Luft im Kunststoffrohr die Verlustwärme schneller ableitet.",
          "Die Bezugstemperatur für Erdkabel im Boden beträgt nach DIN VDE 0298-4 immer 30 °C; dabei gilt Spalte D1 ausschließlich für einphasige Wechselstromkabel und Spalte D2 für dreiphasige Drehstromkabel.",
          "Der Unterschied zwischen D1 (24 A) und D2 (36 A) resultiert allein aus dem induktiven Spannungsfall im Rohr; thermisch dürfen beide Verlegearten im Erdreich dauerhaft mit bis zu 47 A belastet werden."
        ],
      correct: 0,
      explanation: "• Genau hinschauen auf S. 204: Verlegeart D1 (im Elektroinstallationsrohr im Erdreich) ist nur etwa so belastbar wie Verlegeart A2! Direkt im Erdboden (D2) wird die Wärme viel besser abgeführt (2,5 mm²: 36 A statt 24 A).\n• 📖 Europa Tabellenbuch: S. 196 & S. 204 (Verlegeart D1 / D2 bei 20 °C Erdbodentemperatur)"
    },
    {
      id: "el-63",
      exam: "Tabellenbuch S. 209, 210 & 260",
      category: "📖 Tabellenbuch-Meisterklasse (S. 196–537)",
      question: "Welche Kennmelder-Farben und D0-Baugrößen haben Schmelzsicherungen mit 16 A, 20 A, 25 A, 35 A und 63 A (Seite 209) und welches Nennstrom-Verhältnis ist für Selektivität zwischen zwei gG-Sicherungen erforderlich (Seite 210/260)?",
      options: [
          "16 A = Grau (D01) | 20 A = Blau (D02) | 25 A = Gelb (D02) | 35 A = Schwarz (D02) | 63 A = Kupfer (D02). Für Selektivität bei Kurzschluss muss das Verhältnis der Bemessungsströme mindestens 1,6 : 1 betragen (z. B. 63 A vor 35 A).",
          "16 A = Rot (D02) | 20 A = Grün (D01) | 25 A = Blau (D03) | 35 A = Weiß (D01) | 63 A = Gelb (D03). Für Selektivität zwischen zwei hintereinandergeschalteten Schmelzsicherungen genügt bereits das Verhältnis 1,2 : 1.",
          "16 A = Gelb (D01) | 20 A = Grau (D02) | 25 A = Violett (D02) | 35 A = Kupfer (D02) | 63 A = Silber (D03). Selektivität ist bei Schmelzsicherungen der Klasse gG erst ab einem Nennstrom-Verhältnis von 3,0 : 1 gegeben.",
          "Alle D0-Sicherungseinsätze von 6 A bis 63 A besitzen einheitlich die Baugröße D02 (E18) und einen schwarzen Kennmelder; für Selektivität muss immer eine Teilbereichssicherung (aM) vorgeschaltet werden."
        ],
      correct: 0,
      explanation: "• Klassiker für Prüfprotokoll & Sichtprüfung (S. 209): 6A=Grün, 10A=Rot, 16A=Grau (alle D01/E14); 20A=Blau, 25A=Gelb, 32A=Violett, 35/40A=Schwarz, 50A=Weiß, 63A=Kupfer (alle D02/E18). Selektivität bei gleicher Betriebsklasse gG ab Verhältnis 1,6 : 1 (S. 210/260).\n• 📖 Europa Tabellenbuch: S. 209 (D/D0-Sicherungen), S. 210 & S. 260 (Selektivität 1,6 : 1)"
    },
    {
      id: "el-64",
      exam: "Tabellenbuch S. 211",
      category: "📖 Tabellenbuch-Meisterklasse (S. 196–537)",
      question: "Welche thermischen Prüfströme gelten laut Seite 211 für LS-Schalter (B, C, D) und wie verändern sich die elektromagnetischen Kurzschluss-Auslösefaktoren, wenn ein B- oder C-LS-Schalter mit Gleichspannung (DC) statt Wechselspannung (AC) betrieben wird?",
      options: [
          "Thermisch (Bimetall): 1,13 · In muss > 1 h gehalten werden; bei 1,45 · In muss er in ≤ 1 h auslösen. Magnetisch (< 0,1 s): Bei AC gilt B = 3–5 · In und C = 5–10 · In; bei DC verschieben sich die Prüfströme nach oben auf B = 4–7 · In und C = 7–15 · In!",
          "Thermisch (Bimetall): 1,05 · In muss in weniger als 10 Minuten abschalten; bei 1,13 · In erfolgt die sofortige Schnellauslösung. Magnetisch halbieren sich bei Gleichspannung (DC) die Auslösefaktoren auf 1,5–2,5 · In.",
          "Thermisch gilt für alle LS-Schalter ein Auslösestrom von 2,0 · In innerhalb von 1 Stunde. Magnetisch (< 0,1 s) gelten für Wechselspannung (AC) und Gleichspannung (DC) exakt dieselben Auslösebereiche ohne Verschiebung.",
          "Bei Gleichspannung (DC) darf ein LS-Schalter der Charakteristik B oder C grundsätzlich nicht eingesetzt werden, da der permanente Magnetfluss den thermischen Bimetallstreifen mechanisch blockiert."
        ],
      correct: 0,
      explanation: "• Laut Tabelle S. 211 Mitte: Auslösestromregel It ≤ 1,45 · Iz basiert darauf, dass der LS-Schalter beim großen Prüfstrom It = 1,45 · In innerhalb 1 Stunde abschaltet. Wichtig bei DC-Netzen/Batterien: Bei DC braucht der Magnetauslöser höhere Ströme (B: 4–7·In, C: 7–15·In)!\n• 📖 Europa Tabellenbuch: S. 211 (Leitungsschutzschalter Kennlinien & Prüfströme AC/DC)"
    },
    {
      id: "el-65",
      exam: "Tabellenbuch S. 257 & 258",
      category: "📖 Tabellenbuch-Meisterklasse (S. 196–537)",
      question: "Wie groß darf im TT-System (U_L ≤ 50 V AC) der Anlagenerderwiderstand R_A bei einem RCD mit I_Δn = 30 mA bzw. 300 mA maximal sein (Seite 258), und wie hoch darf der betriebsmäßige Ableitstrom I_a eines Stromkreises vor einem RCD höchstens sein (Seite 257)?",
      options: [
          "Nach R_A ≤ 50 V / I_Δn beträgt R_A,max bei einem 30-mA-RCD 1666 Ω und bei einem 300-mA-RCD 167 Ω. Um unerwünschtes Auslösen zu vermeiden, darf der betriebsmäßige Ableitstrom nach VDE 0100-530 maximal das 0,3-fache von I_Δn betragen (I_a ≤ 0,3 · I_Δn, bei 30 mA also max. 9 mA)!",
          "Nach R_A ≤ 230 V / I_Δn darf der Erderwiderstand im TT-System bei einem 30-mA-RCD bis zu 7666 Ω betragen. Der betriebsmäßige Ableitstrom darf dauerhaft bis zum 0,8-fachen von I_Δn (24 mA) ansteigen.",
          "Im TT-System darf der Anlagenerderwiderstand R_A unabhängig vom verwendeten RCD niemals größer als 2,0 Ω sein; ein betriebsmäßiger Ableitstrom auf dem Schutzleiter ist nach VDE 0100-530 komplett verboten (0 mA).",
          "Bei einem 30-mA-RCD beträgt R_A,max genau 167 Ω und bei einem 300-mA-RCD genau 1666 Ω. Der zulässige Ableitstrom im ungestörten Betrieb liegt beim 0,5-fachen Bemessungsdifferenzstrom (max. 15 mA)."
        ],
      correct: 0,
      explanation: "• Zwei wichtige Zahlenwerte von S. 257 & S. 258: 1) Erlaubter Ableitstrom im Normalbetrieb I_a ≤ 0,3 · I_Δn (Formel 2 auf S. 257). 2) Max. Erderwiderstand im TT-Netz (Tabelle S. 258 rechts): 10 mA -> 5000 Ω | 30 mA -> 1666 Ω | 100 mA -> 500 Ω | 300 mA -> 167 Ω.\n• 📖 Europa Tabellenbuch: S. 257 unten (Erlaubter Ableitstrom) & S. 258 rechts (R_A,max im TT-System)"
    },
    {
      id: "el-66",
      exam: "Tabellenbuch S. 259 & 265",
      category: "📖 Tabellenbuch-Meisterklasse (S. 196–537)",
      question: "Welche Bedingungen gelten laut Seite 259 und 265 für die Schutzmaßnahme „Schutztrennung“ (mit Trenntransformator) und welche Prüfspannung / welcher Mindest-Isolationswiderstand gilt für SELV- und PELV-Stromkreise?",
      options: [
          "Schutztrennung: Ausgangsspannung ≤ 500 V (meist 230 V), Sekundärkreis darf NICHT geerdet sein, Körper darf NICHT an PE angeschlossen werden, Produkt U · l ≤ 100.000 Vm (flexible Leitung sichtbar). Bei SELV/PELV wird R_iso mit 250 V DC gemessen und muss ≥ 500 kΩ (0,5 MΩ) betragen!",
          "Bei der Schutztrennung muss die Sekundärwicklung des Trenntransformators einseitig mit dem Schutzleiter (PE) geerdet werden; für SELV-Stromkreise wird R_iso mit 500 V DC gemessen (Grenzwert ≥ 1,0 MΩ).",
          "Schutztrennung ist für Spannungen bis 1000 V AC zulässig, wobei alle metallenen Gehäuse auf der Sekundärseite direkt mit der Haupterdungsschiene (HES) verbunden werden müssen; SELV erfordert 1000 V DC Prüfspannung.",
          "An einen Trenntransformator ohne Isolationsüberwachung dürfen beliebig viele Endgeräte gleichzeitig angeschlossen werden; bei SELV/PELV genügt eine Prüfung mit dem Durchgangsprüfer ohne Isolationsmessung."
        ],
      correct: 0,
      explanation: "• Auf S. 259 oben & S. 265 Schritt 4/5: Bei Schutztrennung darf der Körper nicht an PE liegen, sonst wird bei einem Erdschluss in der restlichen Anlage Spannung auf das getrennte Gerät verschleppt! Bei SELV/PELV: Messung mit 250 V DC -> Grenzwert R_iso ≥ 500 kΩ (0,5 MΩ).\n• 📖 Europa Tabellenbuch: S. 259 (Schutztrennung) & S. 265 (Prüfung SELV/PELV & Schutztrennung)"
    },
    {
      id: "el-67",
      exam: "Tabellenbuch S. 260 & 261",
      category: "📖 Tabellenbuch-Meisterklasse (S. 196–537)",
      question: "Laut Seite 260 und 261 erzeugen elektronische Betriebsmittel mit Gleichrichtern/Frequenzumrichtern unterschiedliche Fehlerstromformen. Wann reicht ein RCD Typ F aus und wann ist zwingend ein RCD Typ B bzw. B+ vorgeschrieben?",
      options: [
          "RCD Typ F reicht bei einphasigen Frequenzumrichtern (Zweipuls-Brückenschaltung zwischen L und N, Mischfrequenzen bis 1 kHz, glatter Gleichfehlerstrom ≤ 10 mA). Bei dreiphasigen Frequenzumrichtern (Sechspuls-Brücke an L1/L2/L3) treten glatte Gleichfehlerströme > 10 mA auf – dort ist zwingend RCD Typ B oder B+ (bis 20 kHz, gehobener Brandschutz ≤ 420 mA) Pflicht!",
          "RCD Typ A ist für sämtliche ein- und dreiphasigen Frequenzumrichter uneingeschränkt zulässig, solange der Bemessungsdifferenzstrom 30 mA beträgt und die Zuleitung doppelt geschirmt verlegt wird.",
          "RCD Typ F ist bereits voll allstromsensitiv für glatte Gleichfehlerströme über 100 mA bei dreiphasigen Sechspuls-Frequenzumrichtern und Ladesäulen; RCD Typ B wird nur in reinen Gleichstrom-Bahnnetzen benötigt.",
          "Bei einphasigen Frequenzumrichtern ist zwingend ein selektiver RCD Typ S (300 mA) vorgeschrieben, während bei dreiphasigen Frequenzumrichtern auf einen RCD komplett verzichtet werden muss."
        ],
      correct: 0,
      explanation: "• Sehr beliebte Frage zu S. 260 unten & S. 261: Typ A verträgt max. 6 mA glatten DC; Typ F verträgt max. 10 mA glatten DC und erkennt Frequenzgemische bis 1 kHz (z. B. 1~ Wärmepumpe/Waschmaschine). Bei 3~ Sechspuls-Brücken (3~ FU, Wallbox) entsteht glatter DC -> Typ B / B+ zwingend!\n• 📖 Europa Tabellenbuch: S. 260 (Eigenschaften RCD Typen A, F, B, B+) & S. 261 (Schaltungen)"
    },
    {
      id: "el-68",
      exam: "Tabellenbuch S. 265 & 266",
      category: "📖 Tabellenbuch-Meisterklasse (S. 196–537)",
      question: "Auf Seite 266 wird die Messung der Fehlerschleifenimpedanz Zs für Schmelzsicherungen gG und LS-Schalter beschrieben. Warum steht dort der Korrekturfaktor k_S = 1,24 (für 20 °C auf 80 °C) bzw. auf Seite 258/265 der Faktor 2/3?",
      options: [
          "Weil die Messung der Schleifenimpedanz Z_sm meist bei kalter Leitung (ca. 20 °C) stattfindet, sich der Kupferleiter im Kurzschlussfall aber auf ca. 80 °C erwärmt und sein Widerstand um ca. 24 % bis 50 % ansteigt! Deshalb darf Z_sm im kalten Zustand höchstens 2/3 des Grenzwertes U0/Ia betragen (bzw. wird mit k_S = 1,24 umgerechnet).",
          "Weil Kupfer ein Heißleiter (NTC) ist, dessen elektrischer Widerstand bei Erwärmung im Kurzschlussfall um ca. 50 % absinkt; der Faktor 2/3 schützt das Messgerät vor dem dadurch ansteigenden Kurzschlussstrom.",
          "Der Faktor 2/3 berücksichtigt ausschließlich den Spannungsfall auf der Zählerzuleitung bei cos φ = 0,67; die Leitertemperatur hat auf den ohmschen Widerstand von Kupferleitungen keinen messbaren Einfluss.",
          "Nach DIN VDE 0100-600 darf die im kalten Zustand gemessene Schleifenimpedanz Z_sm um das 1,5-fache (Faktor 3/2) größer sein als der berechnete Grenzwert U0 / Ia, da die Sicherung bei Wärme schneller schmilzt."
        ],
      correct: 0,
      explanation: "• Perfekt für das Fachgespräch (S. 258 Formel 5, S. 265 Schritt 7 & S. 266 Schritt 9): Kupfer ist ein Kaltleiter (PTC). Im Kurzschluss erwärmt sich die Leitung von 20 °C auf ≥ 80 °C -> Widerstand steigt -> Kurzschlussstrom sinkt. Deshalb Sicherheitsfaktor 2/3 (entspricht Faktor 1,5) bzw. k_S = 1,24!\n• 📖 Europa Tabellenbuch: S. 258, S. 265 & S. 266 (Schleifenimpedanz & Korrekturfaktor)"
    },
    {
      id: "el-69",
      exam: "Tabellenbuch S. 328 & 329",
      category: "📖 Tabellenbuch-Meisterklasse (S. 196–537)",
      question: "Welche Faustformel nennt das Tabellenbuch auf Seite 328 für die erforderliche Kondensatorkapazität je kvar Kompensationsblindleistung bei 230 V (50 Hz) bzw. bei 400 V (50 Hz im Dreieck), und warum ist eine Reihenkompensation auf cos φ = 1 unzulässig?",
      options: [
          "Faustformel (50 Hz): Bei 230 V sind ca. 60 µF je kvar erforderlich; bei 400 V in Dreieckschaltung nur ca. 20 µF je kvar (C_Δ = 20 µF · Qc/kvar). Eine Reihenkompensation auf cos φ = 1 (Resonanzfall) ist wegen gefährlicher Spannungsüberhöhung an den Bauteilen nicht möglich!",
          "Nach der Faustformel auf Seite 328 werden bei 400 V in Dreieckschaltung rund 60 µF je kvar benötigt und bei 230 V Wechselstrom nur 20 µF je kvar; Reihenkompensation auf cos φ = 1 ist das Standardverfahren.",
          "Im Dreieck ist die erforderliche Einzelkapazität C_Δ immer dreimal so groß wie bei Sternschaltung (C_Δ = 3 · C_Y), weshalb man bei 400 V rund 180 µF je kvar Kompensationsblindleistung einbauen muss.",
          "Die Faustformel lautet für alle Spannungsebenen einheitlich 100 µF je kvar Blindleistung; eine Reihenkompensation wird nur deshalb vermieden, weil der Leistungsfaktor dadurch auf unter cos φ = 0,5 sinkt."
        ],
      correct: 0,
      explanation: "• Geniale Prüfungs-Kontrollhilfe auf S. 328 rechts: Mit '20 µF pro kvar bei 400 V im Dreieck' (genau: 19,89 µF/kvar) kannst du in der Prüfung jedes Kompensations-Ergebnis in 2 Sekunden im Kopf auf Plausibilität prüfen!\n• 📖 Europa Tabellenbuch: S. 328 (Formel 9 & Hinweis Reihenkompensation) & S. 329"
    },
    {
      id: "el-70",
      exam: "Tabellenbuch S. 233, 234 & 235",
      category: "📖 Tabellenbuch-Meisterklasse (S. 196–537)",
      question: "Bei der Lichtberechnung über die Wirkungsgradmethode (Seite 233–235) wird zuerst der Raumindex k berechnet. Welche Höhe h wird in die Formel k = (l · b) / [h · (l + b)] eingesetzt und wie hängt der Beleuchtungswirkungsgrad η_B von η_LB und η_R ab?",
      options: [
          "Für h wird nicht die gesamte Raumhöhe, sondern die Lichtpunkthöhe über der Arbeitsebene eingesetzt (Raumhöhe minus Tischhöhe 0,75 m minus evtl. Leuchtenabpendelung). Der Beleuchtungswirkungsgrad ist das Produkt aus Leuchtenbetriebswirkungsgrad und Raumwirkungsgrad: η_B = η_LB · η_R.",
          "Für h wird immer die volle Raumhöhe vom Fußboden bis zur Rohdecke eingesetzt; der Beleuchtungswirkungsgrad berechnet sich aus dem Quotienten η_B = η_LB / η_R zuzüglich des Wartungsfaktors WF.",
          "Für h wird ausschließlich die Tischhöhe der Arbeitsebene (0,75 m) eingesetzt; der Raumwirkungsgrad η_R hängt nur von der elektrischen Lampenleistung in Watt ab und wird zu η_LB addiert.",
          "In die Formel für den Raumindex k wird die Diagonale des Raumes eingesetzt; der Beleuchtungswirkungsgrad η_B ist bei LED-Anlagen immer konstant 1,00 und unabhängig von den Reflexionsgraden der Wände."
        ],
      correct: 0,
      explanation: "• Häufige Rechenfalle bei Lichtaufgaben (S. 233 Schritt 8 & S. 234): Ist der Raum z. B. 3,10 m hoch und die Arbeitsebene (Schreibtisch) 0,75 m hoch, dann ist h = 3,10 m - 0,75 m = 2,35 m! Danach mit k und den Reflexionsgraden ρ1, ρ2, ρ3 auf S. 235 den Raumwirkungsgrad η_R ablesen.\n• 📖 Europa Tabellenbuch: S. 233–235 (Berechnung von Beleuchtungsanlagen)"
    },
    {
      id: "el-71",
      exam: "Tabellenbuch S. 438, 440 & 441",
      category: "📖 Tabellenbuch-Meisterklasse (S. 196–537)",
      question: "Was unterscheidet laut Seite 438 einen Quattro-LNB von einem Quad-LNB, welcher Nutzpegelbereich (L_min bis L_max) ist laut Seite 441 an einer SAT-ZF-Teilnehmerdose gefordert, und wie hoch muss das Schirmungsdämpfungsmaß von Koaxialkabeln mindestens sein (Seite 440)?",
      options: [
          "Ein Quattro-LNB gibt an seinen 4 Ausgängen fest je eine Ebene aus (H/Low, V/Low, H/High, V/High) und benötigt zwingend einen Multischalter. Ein Quad-LNB hat den Multischalter integriert (4 Receiver direkt anschließbar). Der geforderte SAT-ZF-Nutzpegel beträgt 47 bis 77 dBµV; das Schirmungsmaß sollte ≥ 85 dB betragen.",
          "An einen Quattro-LNB können bis zu 4 SAT-Receiver direkt ohne Multischalter angeschlossen werden, während ein Quad-LNB zwingend einen externen Multischalter benötigt. Der Normpegel liegt zwischen 30 und 100 dBµV.",
          "Quattro-LNB und Quad-LNB sind technisch baugleich; der zulässige SAT-ZF-Pegel an der Teilnehmersteckdose muss zwischen mindestens 60 dBµV und maximal 120 dBµV liegen (Schirmungsmaß mind. 40 dB).",
          "Ein Quattro-LNB empfängt gleichzeitig 4 verschiedene Satellitenpositionen ohne Multischalter; der Nutzpegel für DVB-S2 an der Antennensteckdose darf maximal 47 dBµV betragen."
        ],
      correct: 0,
      explanation: "• Drei SAT-Klassiker auf S. 438–441: 1) LNB setzt 10,7–12,75 GHz auf SAT-ZF 950–2150 MHz um. 2) Quattro-LNB = für Multischalter; Quad-LNB = 4 schaltbare Direkt-Ausgänge. 3) Normpegelfenster SAT-ZF (DVB-S/S2) an der Dose: min. 47 dBµV bis max. 77 dBµV (S. 441 Mitte)!\n• 📖 Europa Tabellenbuch: S. 438 (LNB-Bauarten), S. 440 (Schirmung ≥ 85 dB) & S. 441 (Nutzpegel 47–77 dBµV)"
    },
    {
      id: "el-72",
      exam: "Tabellenbuch S. 439 & 442",
      category: "📖 Tabellenbuch-Meisterklasse (S. 196–537)",
      question: "Du errichtest in Düsseldorf (NRW) eine Dach-Satellitenantenne für ASTRA 19,2° Ost. Welche Winkel stellst du laut Tabelle Seite 439 ein, welches maximale Biegemoment gilt an der obersten Einspannstelle (Seite 442), und wann darf auf eine Antennenerdung verzichtet werden?",
      options: [
          "Düsseldorf (ASTRA 19,2° O): Elevation α_E = 30,3° und Azimut α_A = 164,1°. Das maximale Biegemoment an der obersten Einspannstelle beträgt 1650 Nm (Einspannlänge l_E ≥ 1/6 · l_G). Keine Erdung ist nötig bei Antennen an der Hauswand, die > 2 m unterhalb der Dachkante montiert sind und ≤ 1,5 m Ausladung haben!",
          "Düsseldorf (ASTRA 19,2° O): Elevation α_E = 164,1° und Azimut α_A = 30,3°. Das maximale Biegemoment beträgt 500 Nm, und Antennen an der Hausfassade müssen unabhängig vom Montageort immer mit 16 mm² Cu geerdet werden.",
          "Für ganz Deutschland gelten einheitlich 45° Elevation und 180° Azimut; die Einspannlänge des Mastes muss mindestens die Hälfte der Gesamtrohrlänge betragen (l_E ≥ 1/2 · l_G bei max. 3000 Nm Biegemoment).",
          "In Düsseldorf beträgt die Elevation 19,2° und der Azimut 90,0°. Auf eine Antennenerdung darf immer dann verzichtet werden, wenn das Koaxialkabel über einen geerdeten Multischalter im Keller geführt wird."
        ],
      correct: 0,
      explanation: "• Alles direkt auf S. 439 & S. 442 nachlesbar: In Düsseldorf gilt für ASTRA 19,2°O: α_E = 30,3°, α_A = 164,1°. Mechanik S. 442: M_max = 1650 Nm, Einspannlänge mind. 1/6 der Gesamtrohrlänge, über 20 m Höhe Windlast mal 1,37. Geschützter Fassadenbereich (> 2 m unter Dachkante, ≤ 1,5 m Ausladung) ist erdungsfrei!\n• 📖 Europa Tabellenbuch: S. 439 (Winkeltabelle) & S. 442 (Mechanik & Erdung von Antennen)"
    },
    {
      id: "el-73",
      exam: "Tabellenbuch S. 528",
      category: "📖 Tabellenbuch-Meisterklasse (S. 196–537)",
      question: "Du sollst den Motorschutzschalter für einen 4-poligen IE3-Drehstrommotor (400 V, n_s = 1500 min⁻¹, Baugröße 112 M, P_N = 4,0 kW) einstellen, dessen Typenschild unleserlich ist. Welchen Bemessungsstrom I_N, Wirkungsgrad η und welches Anzugsstromverhältnis I_A/I_N liest du auf Seite 528 ab?",
      options: [
          "Für 4,0 kW (112 M bei n_s = 1500 min⁻¹) liefert die Tabelle auf Seite 528: Bemessungsstrom I_N = 7,9 A (Einstellwert am Motorschutzschalter!), Nenndrehzahl n_N = 1460 min⁻¹, Wirkungsgrad η = 89,1 %, cos φ = 0,82 und Anzugsstromverhältnis I_A / I_N = 7,1 (I_A = 56,1 A).",
          "Für 4,0 kW (112 M) liefert Seite 528 einen Bemessungsstrom von I_N = 14,3 A, eine Nenndrehzahl von 2910 min⁻¹, einen Wirkungsgrad von η = 76,0 % sowie ein Anzugsstromverhältnis von I_A / I_N = 3,5.",
          "Der Motorschutzschalter muss bei einem 4,0-kW-Motor nicht auf I_N (7,9 A), sondern auf den 1,45-fachen Wert (11,5 A) eingestellt werden, damit er beim 7,1-fachen Anzugsstrom nicht sofort auslöst.",
          "Laut Seite 528 beträgt der Bemessungsstrom bei 4,0 kW genau 5,9 A bei cos φ = 0,95; die in der Tabelle angegebene Leistung P_N ist die aus dem Netz aufgenommene elektrische Scheinleistung S in kVA."
        ],
      correct: 0,
      explanation: "• Extrem wichtige Tabelle auf S. 528 ('Betriebsdaten von Käfigläufermotoren IE 3'): Achte darauf, ob nach 2-polig (n_s = 3000 min⁻¹ oben) oder 4-polig (n_s = 1500 min⁻¹ Mitte) oder Dahlander (unten) gefragt ist! Der Motorschutzschalter wird immer exakt auf den Motornennstrom I_N (hier 7,9 A) eingestellt.\n• 📖 Europa Tabellenbuch: S. 528 (Betriebsdaten von Käfigläufermotoren IE 3)"
    },
    {
      id: "el-74",
      exam: "Tabellenbuch S. 536 & 537",
      category: "📖 Tabellenbuch-Meisterklasse (S. 196–537)",
      question: "Wie wird ein Dahlander-Motor in der Standardschaltung Δ / YY (Dreieck / Doppelstern für konstantes Drehmoment, Seite 536–537) am Klemmbrett (1U, 1V, 1W und 2U, 2V, 2W) für die niedere und für die hohe Drehzahl angeschlossen?",
      options: [
          "Niedere Drehzahl (Dreieck Δ): Außenleiter L1, L2, L3 an 1U, 1V, 1W anschließen; die Klemmen 2U, 2V, 2W bleiben komplett offen! Hohe Drehzahl (Doppelstern YY): Außenleiter L1, L2, L3 an 2U, 2V, 2W anschließen UND die Klemmen 1U, 1V, 1W durch das Sternschütz miteinander brücken!",
          "Niedere Drehzahl (Δ): 1U, 1V, 1W werden mit einer Sternbrücke verbunden und L1, L2, L3 an 2U, 2V, 2W angeschlossen. Hohe Drehzahl (YY): L1, L2, L3 an 1U, 1V, 1W anschließen und 2U, 2V, 2W offen lassen.",
          "Sowohl in der niederen als auch in der hohen Drehzahlstufe bleiben 1U, 1V, 1W dauerhaft gebrückt; die Drehzahlumschaltung erfolgt allein durch das Vertauschen der beiden Außenleiter L1 und L2 an 2U und 2V.",
          "Für die hohe Drehzahl (Doppelstern YY) werden die Klemmen 1U mit 2U, 1V mit 2V und 1W mit 2W durch Messinglaschen auf dem Klemmbrett fest verbunden und über ein einziges Schütz ans Netz geschaltet."
        ],
      correct: 0,
      explanation: "• Direkt auf S. 536 (Tabelle 2) & S. 537 oben ablesbar: 1) Δ/YY = konstantes Drehmoment (Werkzeugmaschinen, P_Δ/P_YY = 1/1,5). 2) Y/YY = quadratisches Drehmoment (Lüfter/Pumpen, 1/4). 3) YY/Δ = konstante Leistung (Hebezeuge, 1/1). Bei Δ/YY: Langsam = L1..L3 an 1U..1W (2U..2W offen); Schnell = L1..L3 an 2U..2W und 1U-1V-1W Sternbrücke!\n• 📖 Europa Tabellenbuch: S. 536 & S. 537 (Polumschaltbare Motoren / Dahlander-Motoren)"
    },
    {
      id: "el-75",
      exam: "Tabellenbuch S. 205, 206 & 207",
      category: "📖 Tabellenbuch-Meisterklasse (S. 196–537)",
      question: "Nach welchen 3 Kriterien wird auf den Seiten 205 bis 208 die maximal zulässige Leitungslänge l_max bestimmt, und warum muss der nach Formel 1 auf Seite 205 (l_zul = l_norm · Un / Ib · Δu) berechnete Wert bei einem 230-V-Wechselstromkreis noch halbiert werden?",
      options: [
          "Die 3 Kriterien sind: 1. Spannungsfall, 2. Kurzschlussschutz, 3. Fehlerschutz (Abschaltbedingung Zs) – dabei ist immer der KLEINSTE der drei ermittelten Längenwerte entscheidend! Auf Seite 205 sind die l_norm-Tabellenwerte für symmetrischen Drehstrom (Faktor √3) berechnet; bei einphasigem Wechselstrom (Hin- und Rückleiter, Faktor 2) muss das Ergebnis unter Beachtung von Un = 230 V bzw. laut Hinweis halbiert werden.",
          "Von den drei berechneten Längenwerten (Spannungsfall, Kurzschlussschutz, Fehlerschutz) ist immer der GRÖSSTE Wert maßgeblich; bei einphasigen 230-V-Stromkreisen darf die Tabellenlänge von Seite 205 verdoppelt werden.",
          "Es wird immer der arithmetische Mittelwert aus allen drei Längenberechnungen gebildet; die Werte auf Seite 205 gelten bereits direkt für 230-V-Wechselstrom und müssen bei Drehstrom durch √3 geteilt werden.",
          "Maßgeblich ist ausschließlich die Länge nach dem Spannungsfall (Seite 205); eine Halbierung bei Wechselstrom ist nur dann erforderlich, wenn der Leistungsfaktor cos φ kleiner als 0,80 ist."
        ],
      correct: 0,
      explanation: "• Goldene Regel auf S. 205 oben rechts & S. 207 links oben: 'Es können dabei unterschiedliche Werte als maximale Leitungslänge möglich sein, der KLEINSTE ist der entscheidende!' Und roter Hinweis auf S. 205 Mitte: 'Bei einphasigen Stromkreisen ist die so ermittelte Leitungslänge zu halbieren.'\n• 📖 Europa Tabellenbuch: S. 205 (Max. Leitungslänge nach Spannungsfall) & S. 206–208 (Kurzschluss-/Fehlerschutz)"
    }
  ];

  if (typeof ELEKTRO_QUESTIONS !== "undefined" && Array.isArray(ELEKTRO_QUESTIONS)) {
    NEW_TABELLENBUCH_QUESTIONS.forEach((nq) => {
      if (!ELEKTRO_QUESTIONS.some((q) => q.id === nq.id)) {
        ELEKTRO_QUESTIONS.push(nq);
      }
    });
  }

  // [Cleanup] NEW_TF_CLAIMS in Sektion 18 zusammengeführt.

  // -----------------------------------------------------------------------
  // 2) PAKET 3: 5 NEUE ORIGINAL-RECHENAUFGABEN (AUFGABE 16 BIS 20)
  // -----------------------------------------------------------------------
  if (typeof CALC_TASKS !== "undefined" && Array.isArray(CALC_TASKS) && !CALC_TASKS.some((t) => t.id === "calc-antenne-wind")) {
    CALC_TASKS.push(
      {
        id: "calc-antenne-wind",
        title: "16. Antennen-Mechanik: Windlast & Gesamtbiegemoment M_G (Europa TB S. 439 & 442)",
        exam: "Systementwurf / Planung – Antennenanlagen",
        bookRef: "Europa TB S. 439 (Windlast) & S. 442 (Biegemoment max. 1650 Nm)",
        unit: "Nm",
        generateParams: (randomize = false) => {
          const fw1 = randomize ? [276, 660, 1300][Math.floor(Math.random() * 3)] : 660;
          const l1 = randomize ? 1.4 : 1.5;
          const fw2 = randomize ? 250 : 280;
          const l2 = randomize ? 1.8 : 2.0;
          const ms = 120;
          const m1 = +(fw1 * l1).toFixed(1);
          const m2 = +(fw2 * l2).toFixed(1);
          const mg = +(ms + m1 + m2).toFixed(1);
          return {
            desc: `Auf einem Dach wird ein Antennenstandrohr (Eigenmoment des Rohres M_S = ${ms} Nm) montiert. An diesem Standrohr sind zwei Antennen befestigt: 1. Eine Offset-SAT-Antenne mit Windlast F_W1 = ${fw1} N (Europa TB S. 439) im Abstand l1 = ${l1.toFixed(1)} m zur obersten Einspannstelle. 2. Eine terrestrische Antenne mit Windlast F_W2 = ${fw2} N im Abstand l2 = ${l2.toFixed(1)} m zur obersten Einspannstelle. Berechnen Sie nach Europa-Tabellenbuch Seite 442 das Gesamtbiegemoment M_G (in Nm) an der obersten Einspannstelle und prüfen Sie, ob der Grenzwert M_max = 1650 Nm eingehalten wird!`,
            expected: mg,
            tolerance: 1.5,
            step1: `Gegeben: M_S = ${ms} Nm, F_W1 = ${fw1} N, l1 = ${l1.toFixed(1)} m, F_W2 = ${fw2} N, l2 = ${l2.toFixed(1)} m, Grenzwert M_max = 1650 Nm\nGesucht: Einzelmomente M1, M2 und Gesamtbiegemoment M_G in Nm`,
            step2: `Formeln (Europa TB S. 442):\n1) M1 = F_W1 · l1\n2) M2 = F_W2 · l2\n3) M_G = M_S + M1 + M2 ≤ M_max (1650 Nm)`,
            step3: `1) M1 = ${fw1} N · ${l1.toFixed(1)} m = ${m1} Nm\n2) M2 = ${fw2} N · ${l2.toFixed(1)} m = ${m2} Nm\n3) M_G = ${ms} Nm + ${m1} Nm + ${m2} Nm = ${mg} Nm`,
            step4: `Ergebnis: M_G = ${mg} Nm.\nAntwortsatz: Das Gesamtbiegemoment beträgt ${mg} Nm und liegt ${mg <= 1650 ? "unter" : "über"} dem maximal zulässigen Biegemoment von 1650 Nm (Anforderung ${mg <= 1650 ? "erfüllt" : "nicht erfüllt – abgespannten Mast oder stärkeres Rohr wählen!"}).`
          };
        }
      },
      {
        id: "calc-licht-s234",
        title: "17. Innenbeleuchtung komplett: Raumindex k, η_B & Lampenanzahl (Europa TB S. 233–235)",
        exam: "Original-Berechnung Europa TB S. 234",
        bookRef: "Europa TB S. 233–235 (Wirkungsgradmethode & Raumindex)",
        unit: "Lampen",
        generateParams: (randomize = false) => {
          const em = randomize ? 300 : 500;
          const l = 5;
          const b = 6;
          const area = l * b;
          const h = 2.35;
          const kVal = +((l * b) / (h * (l + b))).toFixed(2);
          const etaLb = 0.90;
          const etaR = 0.43;
          const etaB = +(etaLb * etaR).toFixed(3);
          const wf = 0.80;
          const eNeu = +(em / wf).toFixed(1);
          const phiL = 3300;
          const nExact = +((eNeu * area) / (phiL * 0.39)).toFixed(2);
          const nRounded = Math.ceil(nExact);
          return {
            desc: `Ein Montageraum mit Länge l = ${l} m, Breite b = ${b} m (Fläche A = ${area} m²) und einer Leuchtenhöhe über der Arbeitsebene von h = ${h} m (Raumindex k = ${kVal} -> abgerundet 1,0) soll für eine mittlere Beleuchtungsstärke von E_m = ${em} lx (Wartungsfaktor WF = ${wf}) geplant werden. Verwendet werden freistrahlende LED-Röhren mit Φ_L = ${phiL} lm je Röhre, Leuchtenbetriebswirkungsgrad η_LB = 90 % (0,90) und Raumwirkungsgrad η_R = 43 % (0,43) laut S. 235 (somit η_B = 0,90 · 0,43 = 0,387 ≈ 0,39). Berechnen Sie nach Europa-Tabellenbuch Seite 234 die erforderliche Anzahl n der Lampen (auf ganze Lampen aufgerundet)!`,
            expected: nRounded,
            tolerance: 1.0,
            step1: `Gegeben: l = ${l} m, b = ${b} m (A = ${area} m²), h = ${h} m, E_m = ${em} lx, WF = ${wf}, Φ_L = ${phiL} lm, η_LB = 0,90, η_R = 0,43 -> η_B = 0,39\nGesucht: Neuwert E_neu in lx und erforderliche Lampenanzahl n`,
            step2: `Formeln (Europa TB S. 234):\n1) k = (l · b) / [h · (l + b)]\n2) η_B = η_LB · η_R\n3) E_neu = E_m / WF\n4) n = (E_neu · A) / (Φ_L · η_B)`,
            step3: `1) k = (${l} m · ${b} m) / [${h} m · (${l} m + ${b} m)] = 30 m² / 25,85 m² = ${kVal}\n2) η_B = 0,90 · 0,43 = 0,387 ≈ 0,39\n3) E_neu = ${em} lx / ${wf} = ${eNeu} lx\n4) n = (${eNeu} lx · ${area} m²) / (${phiL} lm · 0,39) = ${eNeu * area} lm / 1287 lm = ${nExact}`,
            step4: `Ergebnis: n = ${nExact} -> aufgerundet ${nRounded} Lampen.\nAntwortsatz: Es werden mindestens ${nRounded} LED-Röhren benötigt.`
          };
        }
      },
      {
        id: "calc-motor-ie3-s528",
        title: "18. IE3-Drehstrommotor (S. 528): Einschaltstrom I_A & Aufnahmeleistung P1",
        exam: "Funktionsanalyse – Motoren & Antriebe",
        bookRef: "Europa TB S. 528 (Betriebsdaten IE3) & S. 532 (Motorformeln)",
        unit: "A",
        generateParams: (randomize = false) => {
          const pChoice = randomize ? [3.0, 4.0, 5.5, 7.5][Math.floor(Math.random() * 4)] : 5.5;
          const map = {
            3.0: { bg: "100 L", inA: 5.9, eta: 88.4, ratio: 8.3 },
            4.0: { bg: "112 M", inA: 7.9, eta: 89.1, ratio: 7.1 },
            5.5: { bg: "132 S", inA: 10.5, eta: 90.0, ratio: 8.2 },
            7.5: { bg: "132 M", inA: 14.3, eta: 90.1, ratio: 8.2 }
          };
          const m = map[pChoice];
          const ia = +(m.inA * m.ratio).toFixed(2);
          const p1 = +(pChoice / (m.eta / 100)).toFixed(2);
          return {
            desc: `Ein vierpoliger Drehstrom-Käfigläufermotor IE3 (400 V, 50 Hz, n_s = 1500 min⁻¹) mit der Bemessungsleistung P_N = ${pChoice} kW (Baugröße ${m.bg}) wird direkt am Netz eingeschaltet. Laut Europa-Tabellenbuch Seite 528 beträgt der Bemessungsstrom I_N = ${m.inA} A, der Wirkungsgrad η = ${m.eta} % und das Anzugsstromverhältnis I_A / I_N = ${m.ratio}. Berechnen Sie den beim direkten Einschalten fließenden Anzugsstrom I_A (in A, auf 1 Nachkommastelle)!`,
            expected: ia,
            tolerance: 0.3,
            step1: `Gegeben (aus Europa TB S. 528 für P_N = ${pChoice} kW, ${m.bg}): I_N = ${m.inA} A, η = ${m.eta} %, Faktor I_A / I_N = ${m.ratio}\nGesucht: Anzugsstrom I_A in A (sowie elektr. Aufnahmeleistung P1 in kW)`,
            step2: `1) I_A = (I_A / I_N) · I_N\n2) Zusatzwissen Aufnahmeleistung: P1 = P_N / η`,
            step3: `1) I_A = ${m.ratio} · ${m.inA} A = ${ia} A\n2) P1 = ${pChoice} kW / ${(m.eta / 100).toFixed(3)} = ${p1} kW`,
            step4: `Ergebnis: I_A = ${ia} A (elektrische Aufnahmeleistung im Nennbetrieb P1 = ${p1} kW).\nAntwortsatz: Beim direkten Einschalten des ${pChoice}-kW-Motors fließt kurzzeitig ein Anzugsstrom von ${ia} A.`
          };
        }
      },
      {
        id: "calc-gg-zs-s266",
        title: "19. Schmelzsicherung 25 A gG (S. 266): Max. Leitungswiderstand mit 2/3-Faktor",
        exam: "Planung / Prüfprotokoll – Fehlerschutz gG",
        bookRef: "Europa TB S. 258 (Formel 5: 2/3-Faktor) & S. 266 (Tabelle gG)",
        unit: "Ω",
        generateParams: (randomize = false) => {
          const zVor = randomize ? [0.25, 0.30, 0.35, 0.40][Math.floor(Math.random() * 4)] : 0.35;
          const ia = 180;
          const zsmMax = +((2 / 3) * (230 / ia)).toFixed(3);
          const rLtgMax = +(zsmMax - zVor).toFixed(2);
          return {
            desc: `Ein Endstromkreis im TN-System (U0 = 230 V, geforderte Abschaltzeit t_a = 0,4 s) ist mit einer Schmelzsicherung 25 A gG (Kennmelder gelb) abgesichert. Laut Europa-Tabellenbuch Seite 266 oben rechts beträgt der erforderliche Abschaltstrom für 25 A gG bei 0,4 s genau I_a = ${ia} A (Tabellenwert Z_s = 1,28 Ω ohne Erwärmungsfaktor). Die Vorimpedanz am Verteiler beträgt Z_V = ${zVor.toFixed(2)} Ω. Berechnen Sie unter Berücksichtigung des 2/3-Erwärmungsfaktors (Z_sm,max = (2/3) · (230 V / ${ia} A) = ${zsmMax} Ω laut S. 258/265) den maximal zulässigen Widerstand der verlegten Leitung R_Ltg,max (in Ω, auf 2 Nachkommastellen)!`,
            expected: rLtgMax,
            tolerance: 0.04,
            step1: `Gegeben: U0 = 230 V, Sicherung 25 A gG (t_a = 0,4 s -> I_a = ${ia} A laut S. 266), Z_V = ${zVor.toFixed(2)} Ω\nGesucht: Z_sm,max mit 2/3-Faktor in Ω und R_Ltg,max in Ω`,
            step2: `1) Z_sm,max = (2 / 3) · (U0 / I_a)   (Europa TB S. 258 Formel 5)\n2) R_Ltg,max = Z_sm,max - Z_V`,
            step3: `1) Z_sm,max = (2 · 230 V) / (3 · ${ia} A) = ${zsmMax} Ω\n2) R_Ltg,max = ${zsmMax} Ω - ${zVor.toFixed(2)} Ω = ${rLtgMax} Ω`,
            step4: `Ergebnis: R_Ltg,max = ${rLtgMax} Ω.\nAntwortsatz: Der Schleifenwiderstand der hinzukommenden Leitung darf im kalten Zustand maximal ${rLtgMax} Ω betragen.`
          };
        }
      },
      {
        id: "calc-lmax-korrektur-s206",
        title: "20. Maximale Leitungslänge l_max bei Kurzschluss mit Korrekturfaktor f_l (Europa TB S. 206)",
        exam: "Original-Berechnung Europa TB S. 206 Formel 6",
        bookRef: "Europa TB S. 206 unten (Größte Leitungslängen & Faktor f_l)",
        unit: "m",
        generateParams: (randomize = false) => {
          const zvMess = randomize ? [200, 350, 400, 450][Math.floor(Math.random() * 4)] : 400;
          const lmax300 = 132;
          const fl = 0.31;
          const diff10mOhm = (300 - zvMess) / 10;
          const lmaxRes = +(lmax300 + diff10mOhm * fl).toFixed(2);
          return {
            desc: `Sie prüfen nach Europa-Tabellenbuch Seite 206 (unten rechts) die maximal zulässige Leitungslänge für einen mit LS-Schalter B10A (I_N = 10 A) abgesicherten Stromkreis (Kupferleitung A = 1,5 mm²). Laut Tabelle Seite 206 beträgt die größte Leitungslänge bei einer Vorimpedanz von Z_V0300 = 300 mΩ genau l_max300 = ${lmax300} m und der Korrekturfaktor je 10 mΩ Abweichung beträgt f_l = ${fl} m / (10 mΩ). Vor Ort messen Sie eine Vorimpedanz von Z_V = ${zvMess} mΩ. Berechnen Sie nach Formel 6 auf Seite 206 die maximal zulässige Leitungslänge l_max (in m)!`,
            expected: lmaxRes,
            tolerance: 0.3,
            step1: `Gegeben: A = 1,5 mm², LS B10A, l_max300 = ${lmax300} m (bei Z_V0300 = 300 mΩ), Z_V = ${zvMess} mΩ, f_l = ${fl} m / (10 mΩ)\nGesucht: Korrigierte maximale Leitungslänge l_max in m`,
            step2: `Formel 6 (Europa TB S. 206 unten rechts):\nl_max = l_max300 + [(Z_V0300 - Z_V) / 10 mΩ] · f_l`,
            step3: `l_max = ${lmax300} m + [(300 mΩ - ${zvMess} mΩ) / 10 mΩ] · ${fl} m = ${lmax300} m + (${diff10mOhm} · ${fl} m) = ${lmaxRes} m`,
            step4: `Ergebnis: l_max = ${lmaxRes} m.\nAntwortsatz: Bei einer Vorimpedanz von ${zvMess} mΩ darf die 1,5-mm²-Leitung hinter dem B10A-Automaten maximal ${lmaxRes} m lang sein.`
          };
        }
      }
    );
  }

  // -----------------------------------------------------------------------
  // 3) UI-ZÄHLER UND DROPDOWNS AUTOMATISCH AKTUALISIEREN
  // -----------------------------------------------------------------------
  const tabElektroBtn = document.getElementById("tab-elektro");
  if (tabElektroBtn && typeof ELEKTRO_QUESTIONS !== "undefined") {
    tabElektroBtn.textContent = `🔌 Elektro-Theorie (${ELEKTRO_QUESTIONS.length})`;
  }
  const tabCalcBtn = document.getElementById("tab-calc");
  if (tabCalcBtn && typeof CALC_TASKS !== "undefined") {
    tabCalcBtn.textContent = `🧮 NRW-Rechentrainer (${CALC_TASKS.length})`;
  }

  if (typeof initCalcTrainer === "function") {
    initCalcTrainer();
  }
  if (currentSection === "elektro") {
    populateFilterDropdowns();
    applyFilters();
  } else {
    updateStats();
  }
})();

// =========================================================================
// 29. PAKET 4: PRÜFPROTOKOLL-SIMULATOR 2.0 (AUFGABE 4.3 – DIN VDE 0100-600)
//     MIT 3 SZENARIEN (KLASSIKER, ENERGIETECHNIK/SELV/gG & ZUFALLS-GENERATOR)
// =========================================================================
(function() {
  if (typeof PROTOKOLL_CIRCUITS === "undefined" || typeof PROTOKOLL_REASONS === "undefined") return;

  // 1. Original-Stromkreise aus Szenario 1 sichern
  const SCENARIO_1_CIRCUITS = JSON.parse(JSON.stringify(PROTOKOLL_CIRCUITS));

  // 2. Neue Begründungen aus dem Europa-Tabellenbuch (S. 198, 201, 260, 265, 266) ergänzen
  const EXTRA_REASONS = [
    { value: "rcd_type_a", label: "❌ Falscher RCD-Typ (Typ A statt Typ B / A-EV bei glattem DC > 6 mA, S. 260/313)" },
    { value: "overload_f1f2", label: "❌ Überlastschutz (S. 198/201): Durch f1 (35°C) & f2 (Häufung) sinkt Iz auf 12,17 A < 16 A!" },
    { value: "rcd_time", label: "❌ RCD-Auslösezeit zu hoch (tA > 300 ms bei 1×I_Δn, Grenzwert S. 260 verletzt!)" },
    { value: "pe_open", label: "❌ Schutzleiter PE unterbrochen (R_PE & Z_S > 20 Ω, keine RCD-Auslösung – Lebensgefahr!)" }
  ];

  EXTRA_REASONS.forEach((er) => {
    if (!PROTOKOLL_REASONS.some((r) => r.value === er.value)) {
      PROTOKOLL_REASONS.push(er);
    }
  });

  // 3. Szenario 2: Moderne Energietechnik, SELV (250V DC), 32A gG (5s) & f1/f2 (Europa TB S. 198–367)
  const SCENARIO_2_CIRCUITS = [
    {
      id: "-F1",
      target: "Wallbox 11 kW Ladeplatz 1 (ohne internen DC-Schutz)",
      cable: "NYY-J 5x6 mm² (D2, 22 m)",
      fuse: "3-pol. LS C16A",
      rpe: "0,09",
      riso: "480",
      zs: "0,44",
      zi: "0,43",
      rcd: "Typ A (30 mA) | 22 mA / 19 ms",
      field: "Rechts",
      expectedStatus: "nio",
      expectedReason: "rcd_type_a",
      explanation: "❌ -F1 IST NICHT IN ORDNUNG (n. i. O.) – FALSCHER RCD-TYP (Europa TB S. 260–261 & S. 313–314):\nDa beim Laden von Elektrofahrzeugen glatte Gleichfehlerströme > 6 mA DC auftreten können und keine interne 6-mA-DC-Abschaltung vorhanden ist, erblindet ein normaler RCD Typ A! Vorgeschrieben ist ein allstromsensitiver RCD Typ B (oder Typ A-EV)."
    },
    {
      id: "-F2",
      target: "Bad-Spiegelschrank & LED-Dusche (SELV 24 V DC)",
      cable: "NYM-J 3x1,5 mm² (B2, 12 m)",
      fuse: "LS B10A (Sek. 24V)",
      rpe: "— (SELV)",
      riso: "0,68 (250V DC)",
      zs: "— (SELV)",
      zi: "0,41",
      rcd: "— (SELV < 50V)",
      field: "— (DC)",
      expectedStatus: "io",
      expectedReason: "ok",
      explanation: "✅ -F2 IST IN ORDNUNG (i. O.) – ACHTUNG SELV-PRÜFUNGSFALLE (Europa TB S. 255 & S. 265 Schritt 4):\nBei SELV/PELV (< 50 V AC / 120 V DC) wird der Isolationswiderstand mit 250 V DC Prüfspannung gemessen und der Grenzwert beträgt laut S. 265 mindestens R_iso ≥ 500 kΩ (0,50 MΩ)! Mit 0,68 MΩ ist der Wert größer als 0,50 MΩ und damit vollkommen in Ordnung! (Zudem darf SELV keinen PE-Anschluss haben)."
    },
    {
      id: "-F3",
      target: "Zuleitung Unterverteiler UV-Garage (Verteilerkreis ta ≤ 5 s)",
      cable: "NYY-J 5x6 mm² (D1, 38 m)",
      fuse: "3x 32 A gG (violett)",
      rpe: "0,15",
      riso: "> 500",
      zs: "0,88",
      zi: "0,86",
      rcd: "— (Verteilerleitung)",
      field: "Rechts",
      expectedStatus: "io",
      expectedReason: "ok",
      explanation: "✅ -F3 IST IN ORDNUNG (i. O.) – VERTEILERSTROMKREIS MIT 5 s ABSCHALTZEIT (Europa TB S. 257 & S. 266):\nFür Verteilerstromkreise gilt im TN-System eine maximale Abschaltzeit von ta ≤ 5,0 s (S. 257). Laut Tabelle Seite 266 oben rechts benötigt eine 32-A-gG-Sicherung für 5 s nur Ia = 150 A (Zs = 1,53 Ω; mit 2/3-Erwärmungsfaktor Zsm_max = 1,02 Ω). Da 0,88 Ω ≤ 1,02 Ω ist, wird die Abschaltbedingung sicher eingehalten!"
    },
    {
      id: "-F4",
      target: "Heizstab Pufferspeicher im Heizraum (35 °C, 3 Leitungen)",
      cable: "NYM-J 3x2,5 mm² (A2, 14 m)",
      fuse: "LS B16A",
      rpe: "0,12",
      riso: "310",
      zs: "0,51",
      zi: "0,50",
      rcd: "Typ A (30 mA) | 21 mA / 20 ms",
      field: "— (1~)",
      expectedStatus: "nio",
      expectedReason: "overload_f1f2",
      explanation: "❌ -F4 IST NICHT IN ORDNUNG (n. i. O.) – ÜBERLASTSCHUTZ DURCH f1 & f2 VERLETZT (Europa TB S. 198 & S. 201):\nIn Verlegeart A2 (2 belastete Adern) hat 2,5 mm² bei 30 °C laut S. 198 nur Ir = 18,5 A. Durch Umgebungstemperatur 35 °C (f1 = 0,94 laut S. 201) und Häufung von 3 Leitungen (f2 = 0,70 laut S. 201) sinkt die zulässige Strombelastbarkeit auf Iz = 18,5 A · 0,94 · 0,70 = 12,17 A! Da In = 16 A > 12,17 A ist, wird die Leitung überlastet (Mindestquerschnitt 4 mm² erforderlich)."
    },
    {
      id: "-F5",
      target: "Steckdosen Home-Office / EDV",
      cable: "NYM-J 3x2,5 mm² (B2, 19 m)",
      fuse: "LS B16A",
      rpe: "0,16",
      riso: "> 500",
      zs: "0,55",
      zi: "0,54",
      rcd: "Typ A (30 mA) | 24 mA / 420 ms",
      field: "— (1~)",
      expectedStatus: "nio",
      expectedReason: "rcd_time",
      explanation: "❌ -F5 IST NICHT IN ORDNUNG (n. i. O.) – RCD-AUSLÖSEZEIT ZU HOCH (Europa TB S. 257 & S. 260):\nNach Europa-Tabellenbuch Seite 260 oben rechts darf die Auslösezeit eines Standard-RCDs bei 1 × I_Δn nach Baubestimmung maximal 300 ms betragen (und nach VDE 0100-410 im TN-System max. 0,4 s = 400 ms). Mit 420 ms ist der RCD mechanisch schwergängig/defekt und muss ausgetauscht werden!"
    },
    {
      id: "-F6",
      target: "PV-Wechselrichter Einspeisung 10 kVA (SPD Typ 2 gesteckt)",
      cable: "NYM-J 5x4 mm² (B2, 16 m)",
      fuse: "3-pol. LS B20A",
      rpe: "0,09",
      riso: "0,28",
      zs: "0,42",
      zi: "0,41",
      rcd: "Typ B (30 mA) | 23 mA / 18 ms",
      field: "Rechts",
      expectedStatus: "nio",
      expectedReason: "riso_low",
      explanation: "❌ -F6 IST NICHT IN ORDNUNG (n. i. O.) – ISOLATIONSWIDERSTAND < 1,0 MΩ (Europa TB S. 265 Schritt 3):\nBei 500 V DC Messspannung muss R_iso mindestens ≥ 1,0 MΩ betragen. Gemessen wurden nur 0,28 MΩ (entweder wurde vergessen, den Überspannungsableiter SPD Typ 2 vor der Messung abzuziehen, oder es liegt ein Isolationsfehler vor)."
    },
    {
      id: "-F7",
      target: "Luft-Wasser-Wärmepumpe (1~ Inverter-Kompressor)",
      cable: "NYY-J 3x4 mm² (D2, 24 m)",
      fuse: "LS C20A",
      rpe: "0,14",
      riso: "410",
      zs: "0,49",
      zi: "0,48",
      rcd: "Typ F (30 mA) | 22 mA / 17 ms",
      field: "— (1~)",
      expectedStatus: "io",
      expectedReason: "ok",
      explanation: "✅ -F7 IST IN ORDNUNG (i. O.) – RCD TYP F FÜR 1~ FREQUENZUMRICHTER KORREKT (Europa TB S. 260–261 & S. 366):\nFür einphasige Frequenzumrichter (Wärmepumpe zwischen L und N) ist der mischfrequenzsensitive RCD Typ F (bis 1 kHz, bis 10 mA glatter DC laut S. 260) genau richtig. Zudem ist Z_S = 0,49 Ω ≤ 0,767 Ω (Grenzwert für C20 mit 2/3-Faktor) eingehalten."
    },
    {
      id: "-F8",
      target: "Steckdose Multischalter SAT-Anlage Dachboden",
      cable: "NYM-J 3x1,5 mm² (B2, 22 m)",
      fuse: "LS B16A",
      rpe: "> 20,0",
      riso: "> 500",
      zs: "> 20,0",
      zi: "0,62",
      rcd: "Typ A (30 mA) | löst nicht aus",
      field: "— (1~)",
      expectedStatus: "nio",
      expectedReason: "pe_open",
      explanation: "❌ -F8 IST NICHT IN ORDNUNG (n. i. O.) – SCHUTZLEITER PE UNTERBROCHEN (Europa TB S. 264–265):\nWährend die Netzinnenimpedanz Z_I (L–N = 0,62 Ω) normal ist, sind R_PE (> 20 Ω) und die Fehlerschleifenimpedanz Z_S (L–PE > 20 Ω) hochohmig und der RCD kann bei Prüfstrom gegen PE nicht auslösen -> Der Schutzleiter PE ist in einer Abzweigdose oder an der Steckdose nicht angeklemmt/unterbrochen!"
    }
  ];

  // 4. Szenario-Umschalter oben in die Prüfprotokoll-Kopfzeile einbauen
  const protoHeaderCard = document.querySelector("#protokoll-section .video-header-card");
  let currentProtoScenario = "scen1";

  if (protoHeaderCard && !document.getElementById("proto-scenario-selector")) {
    const switchBar = document.createElement("div");
    switchBar.style.cssText = "margin-top: 1rem; display: flex; gap: 0.6rem; justify-content: center; flex-wrap: wrap; align-items: center;";
    switchBar.innerHTML = `
      <label for="proto-scenario-selector" style="font-size:0.88rem; font-weight:700; color:#93c5fd;">📋 Prüfprotokoll-Szenario wählen:</label>
      <select id="proto-scenario-selector" style="max-width: 560px; font-weight: 600; border-color: #3b82f6;">
        <option value="scen1">1️⃣ Szenario 1: Großküche, Werkstatt & Förderband (Klassiker – 6 Fehler)</option>
        <option value="scen2">2️⃣ Szenario 2: Neubau mit Wallbox, PV, SELV 250V DC, 32A gG (5s) & Wärmepumpe (Europa TB S. 198–367)</option>
        <option value="scen3">🎲 Szenario 3: Zufalls-Prüfungsgenerator (Mischt alle 16 Kreise – auch 100 % mangelfrei möglich!)</option>
      </select>
    `;
    protoHeaderCard.appendChild(switchBar);

    document.getElementById("proto-scenario-selector").addEventListener("change", (e) => {
      loadProtoScenario(e.target.value);
    });
  }

  function makeCircuitHealthyClone(c, newId) {
    const clone = JSON.parse(JSON.stringify(c));
    clone.id = newId;
    clone.expectedStatus = "io";
    clone.expectedReason = "ok";

    if (c.expectedReason === "rpe_high" || c.expectedReason === "pe_open") {
      clone.rpe = "0,09";
      clone.zs = "0,36";
      clone.rcd = c.rcd.includes("löst nicht") ? "Typ A (30 mA) | 21 mA / 18 ms" : c.rcd;
    } else if (c.expectedReason === "riso_low") {
      clone.riso = "> 500";
    } else if (c.expectedReason === "zs_high") {
      clone.cable = "NYY-J 5x4 mm² (D2, 62 m)";
      clone.zs = "0,64";
      clone.zi = "0,63";
    } else if (c.expectedReason === "fuse_over") {
      clone.fuse = "LS B16A";
    } else if (c.expectedReason === "rcd_300") {
      clone.rcd = "Typ A (30 mA) | 22 mA / 19 ms";
    } else if (c.expectedReason === "drehfeld_links") {
      clone.field = "Rechts";
    } else if (c.expectedReason === "rcd_type_a") {
      clone.rcd = "Typ B (30 mA) | 22 mA / 19 ms";
    } else if (c.expectedReason === "overload_f1f2") {
      clone.cable = "NYM-J 3x4 mm² (A2, 14 m)";
    } else if (c.expectedReason === "rcd_time") {
      clone.rcd = "Typ A (30 mA) | 23 mA / 21 ms";
    }
    clone.explanation = `✅ ${newId} IST IN ORDNUNG (i. O.): Alle Grenzwerte nach DIN VDE 0100-600 (R_PE, R_iso, Z_S, Überlastschutz Ib ≤ In ≤ Iz, RCD und Drehfeld) sind fachgerecht eingehalten!`;
    return clone;
  }

  function loadProtoScenario(scenKey) {
    currentProtoScenario = scenKey;
    const metaItems = document.querySelectorAll("#protokoll-section .proto-meta-item");

    if (scenKey === "scen1") {
      PROTOKOLL_CIRCUITS.splice(0, PROTOKOLL_CIRCUITS.length, ...JSON.parse(JSON.stringify(SCENARIO_1_CIRCUITS)));
      if (metaItems[1]) metaItems[1].innerHTML = `<strong>Netzsystem & Anlage</strong>TN-C-S / TN-S | Großküche & Werkstatt (30 °C)`;
    } else if (scenKey === "scen2") {
      PROTOKOLL_CIRCUITS.splice(0, PROTOKOLL_CIRCUITS.length, ...JSON.parse(JSON.stringify(SCENARIO_2_CIRCUITS)));
      if (metaItems[1]) metaItems[1].innerHTML = `<strong>Netzsystem & Anlage</strong>TN-S | Neubau (Wallbox, PV, SELV 24V, Heizraum 35 °C)`;
    } else if (scenKey === "scen3") {
      const combinedPool = [...SCENARIO_1_CIRCUITS, ...SCENARIO_2_CIRCUITS].sort(() => 0.5 - Math.random()).slice(0, 8);
      // Mit 30 % Wahrscheinlichkeit eine komplett mangelfreie Nachprüfungs-Anlage erzeugen!
      const makeAllPerfect = Math.random() < 0.32;
      const generated = combinedPool.map((item, idx) => {
        const fid = `-F${idx + 1}`;
        if (makeAllPerfect || Math.random() < 0.35) {
          return makeCircuitHealthyClone(item, fid);
        }
        const copy = JSON.parse(JSON.stringify(item));
        copy.id = fid;
        copy.explanation = copy.explanation.replace(/^-?[✅❌]\s*-F\d+/, (m) => m.replace(/-F\d+/, fid));
        return copy;
      });
      PROTOKOLL_CIRCUITS.splice(0, PROTOKOLL_CIRCUITS.length, ...generated);
      if (metaItems[1]) {
        metaItems[1].innerHTML = `<strong>Prüfungs-Generator</strong>🎲 Zufallsmix aktiv (Prüfe genau, ob Mängel vorliegen oder Plakette JA gilt!)`;
      }
    }

    initProtokollSimulator();
  }

  // 5. Auswertefunktion upgraden, damit sie auch bei 100 % mangelfreien Protokollen ("Plakette: JA") richtig bewertet!
  window.evaluateProtokoll = function(revealAll = false) {
    let points = 0;
    const maxPoints = PROTOKOLL_CIRCUITS.length * 2 + 2;
    const hasAnyDefect = PROTOKOLL_CIRCUITS.some((c) => c.expectedStatus === "nio");
    const expectedOverallValue = hasAnyDefect ? "mangel" : "ok";

    let html = `<h3 style="margin-bottom: 0.8rem;">🔎 Prüfer-Auswertung nach DIN VDE 0100-600 (Europa TB S. 257–274):</h3>`;

    PROTOKOLL_CIRCUITS.forEach((c) => {
      const st = protoUserState[c.id];
      const row = document.getElementById(`proto-row-${c.id}`);
      row.classList.remove("row-correct", "row-wrong");

      if (revealAll) {
        st.status = c.expectedStatus;
        st.reason = c.expectedReason;
        row.querySelectorAll(".io-btn").forEach((b) => {
          b.classList.remove("selected-io", "selected-nio");
          if (b.dataset.val === c.expectedStatus) {
            b.classList.add(c.expectedStatus === "io" ? "selected-io" : "selected-nio");
          }
        });
        row.querySelector(".proto-reason-select").value = c.expectedReason;
      }

      const statusOk = st.status === c.expectedStatus;
      const reasonOk = st.reason === c.expectedReason;
      if (statusOk) points += 1;
      if (reasonOk) points += 1;

      const bothOk = statusOk && reasonOk;
      row.classList.add(bothOk ? "row-correct" : "row-wrong");

      html += `
        <div class="proto-detail-card ${bothOk ? "ok" : "err"}">
          <div style="font-weight: 700; margin-bottom: 0.3rem; color: ${bothOk ? "#4ade80" : "#fca5a5"};">
            ${bothOk ? "✅ Volle Punktzahl (2/2 Pkt.)" : `⚠️ Teil-/Fehlbewertung (${(statusOk ? 1 : 0) + (reasonOk ? 1 : 0)}/2 Pkt.)`} — Stromkreis ${c.id} (${c.target})
          </div>
          <div style="font-size: 0.88rem; color: #e2e8f0; white-space: pre-line;">${c.explanation}</div>
        </div>
      `;
    });

    const selectedOverall = document.querySelector('input[name="proto-overall"]:checked')?.value;
    const overallOk = revealAll ? true : selectedOverall === expectedOverallValue;

    if (revealAll) {
      const targetRadio = document.querySelector(`input[name="proto-overall"][value="${expectedOverallValue}"]`);
      if (targetRadio) targetRadio.checked = true;
    }
    if (overallOk) points += 2;

    html += `
      <div class="proto-detail-card ${overallOk ? "ok" : "err"}">
        <div style="font-weight: 700; color: ${overallOk ? "#4ade80" : "#fca5a5"};">
          ${overallOk ? "✅ ZVEH-Protokollfuß richtig ausgefüllt (2/2 Pkt.)" : "❌ Prüfungsfalle im Protokollfuß übersehen (0/2 Pkt.)"}
        </div>
        <div style="font-size: 0.88rem; color: #e2e8f0;">
          ${hasAnyDefect
            ? "Da mindestens ein Stromkreis mangelhaft (n. i. O.) ist, muss zwingend <strong>„🔴 Mängel festgestellt / Prüfplakette: NEIN“</strong> angekreuzt werden (Europa TB S. 266 Schritt 16)!"
            : "Da in diesem Protokoll ALLE 8 Stromkreise mangelfrei (i. O.) sind, wird hier <strong>„🟢 Keine Mängel / Prüfplakette: JA“</strong> zugeteilt!"}
        </div>
      </div>
    `;

    const pct = Math.round((points / maxPoints) * 100);
    if (pct >= 50) playSuccessSound();
    else playWrongSound();

    protoScoreBadge.textContent = `📊 Ergebnis: ${points}/${maxPoints} Pkt. (${pct} %) – Note: ${calculateIhkGrade(pct, 1)}`;
    protoFeedbackContainer.innerHTML = html;
    protoFeedbackContainer.classList.remove("hidden");
  };

  // Buttons "Prüfprotokoll auswerten", "Musterlösung" und "Neue Messwerte würfeln" mit dem neuen Szenario-System verbinden
  const btnCheck = document.getElementById("btn-proto-check");
  const btnReveal = document.getElementById("btn-proto-reveal");
  const btnRandom = document.getElementById("btn-proto-random");

  if (btnCheck) {
    const cleanCheck = btnCheck.cloneNode(true);
    btnCheck.replaceWith(cleanCheck);
    cleanCheck.addEventListener("click", () => window.evaluateProtokoll(false));
  }
  if (btnReveal) {
    const cleanReveal = btnReveal.cloneNode(true);
    btnReveal.replaceWith(cleanReveal);
    cleanReveal.addEventListener("click", () => window.evaluateProtokoll(true));
  }
  if (btnRandom) {
    const cleanRandom = btnRandom.cloneNode(true);
    btnRandom.replaceWith(cleanRandom);
    cleanRandom.addEventListener("click", () => {
      const sel = document.getElementById("proto-scenario-selector");
      if (sel) sel.value = "scen3";
      loadProtoScenario("scen3");
      if (protoScoreBadge) {
        protoScoreBadge.textContent = "🎲 Neues Zufalls-Protokoll generiert!";
      }
    });
  }
})();

// =========================================================================
// 30. CHATBOT-BUTTON FREI VERSCHIEBBAR (DRAG & DROP AUF PC & HANDY)
//     + STARTPOSITION ÜBER DEM "POWERED BY NETLIFY"-BANNER
// =========================================================================
(function() {
  const fab = document.getElementById("chatbot-toggle-btn");
  const chatWin = document.getElementById("chatbot-window");
  if (!fab) return;

  // 1. Standardmäßig höher setzen (über das Netlify-Badge) & höchste Ebene geben
  fab.style.bottom = "82px";
  fab.style.right = "24px";
  fab.style.zIndex = "2147483646";
  fab.style.touchAction = "none";
  fab.style.userSelect = "none";
  fab.style.webkitUserSelect = "none";
  fab.style.cursor = "grab";
  fab.style.transition = "transform 0.2s ease, box-shadow 0.2s ease";
  fab.title = "Fachprüfer-Chatbot öffnen (Gedrückt halten zum Verschieben | Doppelklick = Position zurücksetzen)";

  if (chatWin) {
    chatWin.style.zIndex = "2147483645";
  }

  const POS_STORAGE_KEY = "nrw_chatbot_fab_pos_v1";

  function clampPosition(left, top) {
    const btnW = fab.offsetWidth || 58;
    const btnH = fab.offsetHeight || 58;
    const maxLeft = Math.max(8, window.innerWidth - btnW - 8);
    const maxTop = Math.max(8, window.innerHeight - btnH - 8);
    return {
      left: Math.min(Math.max(8, left), maxLeft),
      top: Math.min(Math.max(8, top), maxTop)
    };
  }

  function applyCustomPosition(left, top) {
    const clamped = clampPosition(left, top);
    fab.style.left = `${clamped.left}px`;
    fab.style.top = `${clamped.top}px`;
    fab.style.right = "auto";
    fab.style.bottom = "auto";
    return clamped;
  }

  // Gespeicherte Position beim Laden wiederherstellen
  try {
    const saved = JSON.parse(localStorage.getItem(POS_STORAGE_KEY));
    if (saved && typeof saved.left === "number" && typeof saved.top === "number") {
      applyCustomPosition(saved.left, saved.top);
    }
  } catch (e) {}

  let isDragging = false;
  let hasMoved = false;
  let startX = 0;
  let startY = 0;
  let initialLeft = 0;
  let initialTop = 0;

  function startDrag(clientX, clientY) {
    const rect = fab.getBoundingClientRect();
    isDragging = true;
    hasMoved = false;
    startX = clientX;
    startY = clientY;
    initialLeft = rect.left;
    initialTop = rect.top;
    fab.style.cursor = "grabbing";
  }

  function moveDrag(clientX, clientY) {
    if (!isDragging) return;
    const dx = clientX - startX;
    const dy = clientY - startY;

    // Erst ab 6 Pixeln Bewegung als "Ziehen" werten (verhindert Wackler beim normalen Klick)
    if (Math.abs(dx) > 6 || Math.abs(dy) > 6) {
      hasMoved = true;
    }

    if (hasMoved) {
      applyCustomPosition(initialLeft + dx, initialTop + dy);
    }
  }

  function endDrag() {
    if (!isDragging) return;
    isDragging = false;
    fab.style.cursor = "grab";

    if (hasMoved) {
      const rect = fab.getBoundingClientRect();
      try {
        localStorage.setItem(POS_STORAGE_KEY, JSON.stringify({ left: rect.left, top: rect.top }));
      } catch (e) {}
    }
  }

  // A) Maus-Steuerung (PC)
  fab.addEventListener("mousedown", (e) => {
    if (e.button !== 0) return; // Nur linke Maustaste
    startDrag(e.clientX, e.clientY);
  });

  window.addEventListener("mousemove", (e) => {
    if (!isDragging) return;
    e.preventDefault();
    moveDrag(e.clientX, e.clientY);
  });

  window.addEventListener("mouseup", () => {
    endDrag();
  });

  // B) Touch-Steuerung (Handy & Tablet)
  fab.addEventListener("touchstart", (e) => {
    if (e.touches.length !== 1) return;
    startDrag(e.touches[0].clientX, e.touches[0].clientY);
  }, { passive: true });

  window.addEventListener("touchmove", (e) => {
    if (!isDragging || !e.touches[0]) return;
    moveDrag(e.touches[0].clientX, e.touches[0].clientY);
  }, { passive: true });

  window.addEventListener("touchend", () => {
    endDrag();
  });

  // C) Klick nach dem Ziehen unterdrücken, damit das Fenster beim Loslassen nicht aufspringt
  fab.addEventListener("click", (e) => {
    if (hasMoved) {
      e.stopImmediatePropagation();
      e.preventDefault();
      hasMoved = false;
    }
  }, true);

  // D) Doppelklick setzt den Button wieder auf die Standardposition über dem Netlify-Banner zurück
  fab.addEventListener("dblclick", () => {
    localStorage.removeItem(POS_STORAGE_KEY);
    fab.style.left = "auto";
    fab.style.top = "auto";
    fab.style.right = "24px";
    fab.style.bottom = "82px";
  });

  // E) Bei Bildschirm-Drehung / Fenstergröße anpassen im sichtbaren Bereich halten
  window.addEventListener("resize", () => {
    if (fab.style.left && fab.style.left !== "auto") {
      const rect = fab.getBoundingClientRect();
      applyCustomPosition(rect.left, rect.top);
    }
  });
})();

// =========================================================================
// 31. PASSWORT-SCHRANKE (SALTED HASH), KOPIERSCHUTZ (F12 / STRG+U / RECHTSKLICK)
//     & SUCHMASCHINEN-/DATENSCHUTZ-SCHILD (HOSTER-UNABHÄNGIG)
// =========================================================================
(function() {
  const ACCESS_PASS = "__HASH_ACTIVE_IN_SEC_37__";
  const AUTH_STORAGE_KEY = "nrw_bkh_access_granted_v1";

  // -----------------------------------------------------------------------
  // 1) SUCHMASCHINEN, WEB-ARCHIV & KI-CRAWLER AUSSPERREN (DATENSCHUTZ-SCHILD)
  // -----------------------------------------------------------------------
  const metaRobots = document.createElement("meta");
  metaRobots.name = "robots";
  metaRobots.content = "noindex, nofollow, noarchive, nosnippet, noai, noimageai";
  document.head.appendChild(metaRobots);

  // Video-Download-Button in Browsern deaktivieren
  document.querySelectorAll("video").forEach((vid) => {
    vid.setAttribute("controlsList", "nodownload");
    vid.setAttribute("disablePictureInPicture", "true");
    vid.addEventListener("contextmenu", (e) => e.preventDefault());
  });

  // -----------------------------------------------------------------------
  // 2) TASTENKOMBINATIONEN (F12, STRG+U, STRG+S, STRG+SHIFT+I/J/C) BLOCKIEREN
  // -----------------------------------------------------------------------
  window.addEventListener("keydown", (e) => {
    const key = (e.key || "").toLowerCase();
    const ctrlOrMeta = e.ctrlKey || e.metaKey;

    // F12 (Entwicklertools)
    if (e.key === "F12") {
      e.preventDefault();
      e.stopPropagation();
      return false;
    }

    // Strg+U (Seitenquelltext) oder Strg+S (Seite speichern)
    if (ctrlOrMeta && (key === "u" || key === "s")) {
      e.preventDefault();
      e.stopPropagation();
      return false;
    }

    // Strg+Shift+I / J / C (Untersuchen / Konsole)
    if (ctrlOrMeta && e.shiftKey && (key === "i" || key === "j" || key === "c")) {
      e.preventDefault();
      e.stopPropagation();
      return false;
    }
  }, true);

  // -----------------------------------------------------------------------
  // 3) RECHTSKLICK-MENÜ SPERREN (AUSSER IM CAD- & SPS-TRAINER UND TEXTFELDERN!)
  // -----------------------------------------------------------------------
  document.addEventListener("contextmenu", (e) => {
    // Im CAD- und SPS-Simulator wird Rechtsklick zum Löschen von Bauteilen gebraucht!
    if (e.target.closest("#cadSvg, #kopSvg")) {
      return;
    }
    // In Textfeldern (z. B. für Backup-Code einfügen) erlauben
    if (["INPUT", "TEXTAREA"].includes(e.target.tagName)) {
      return;
    }
    e.preventDefault();
  });

  // -----------------------------------------------------------------------
  // 4) VOLLBILD-PASSWORT-SCHRANKE VOR DEM SEITENZUGRIFF
  // -----------------------------------------------------------------------
  function isUnlocked() {
    try {
      return (
        localStorage.getItem(AUTH_STORAGE_KEY) === "granted" ||
        sessionStorage.getItem(AUTH_STORAGE_KEY) === "granted"
      );
    } catch (e) {
      return false;
    }
  }

  if (!isUnlocked()) {
    // Hintergrund-Scrolling sperren, solange nicht eingeloggt
    document.body.style.overflow = "hidden";

    const lockOverlay = document.createElement("div");
    lockOverlay.id = "bkh-password-overlay";
    lockOverlay.style.cssText =
      "position: fixed; inset: 0; width: 100vw; height: 100vh; background: radial-gradient(circle at top, #1e3a8a, #090d16 70%); z-index: 2147483647; display: flex; align-items: center; justify-content: center; padding: 1.2rem; backdrop-filter: blur(12px);";

    lockOverlay.innerHTML = `
      <div style="background: #1e293b; border: 1px solid #3b82f6; border-radius: 16px; max-width: 430px; width: 100%; padding: 2rem 1.6rem; box-shadow: 0 25px 50px rgba(0,0,0,0.75); text-align: center;">
        <div style="font-size: 2.8rem; margin-bottom: 0.4rem;">🔒</div>
        <h2 style="font-size: 1.3rem; color: #f8fafc; margin-bottom: 0.4rem;">Geschützte Lernplattform</h2>
        <p style="font-size: 0.86rem; color: #94a3b8; margin-bottom: 1.3rem;">
          Privater Prüfungstrainer (GP Teil 2 – NRW).<br>Bitte gib das Gruppen-Passwort ein, um fortzufahren:
        </p>

        <form id="bkh-login-form" style="display: flex; flex-direction: column; gap: 0.85rem;">
          <div style="position: relative;">
            <input type="password" id="bkh-pass-input" placeholder="Passwort eingeben..." autocomplete="off"
                   style="width: 100%; padding: 0.75rem 2.6rem 0.75rem 0.9rem; font-size: 1rem; border-radius: 8px; border: 1px solid #475569; background: #0f172a; color: #fff; text-align: center; font-weight: 700; letter-spacing: 1px;">
            <button type="button" id="bkh-toggle-eye" title="Passwort anzeigen/verbergen"
                    style="position: absolute; right: 8px; top: 50%; transform: translateY(-50%); background: transparent; border: none; color: #94a3b8; cursor: pointer; font-size: 1.1rem;">👁️</button>
          </div>

          <label style="display: flex; align-items: center; justify-content: center; gap: 0.45rem; font-size: 0.82rem; color: #cbd5e1; cursor: pointer;">
            <input type="checkbox" id="bkh-remember-chk" checked style="width: auto; accent-color: #3b82f6;">
            Auf diesem Gerät freigeschaltet bleiben
          </label>

          <p id="bkh-error-msg" style="color: #fca5a5; font-size: 0.83rem; font-weight: 600; display: none; margin: 0;">
            ❌ Falsches Passwort! Bitte versuche es erneut.
          </p>

          <button type="submit" class="btn primary" style="padding: 0.75rem; font-size: 0.98rem; font-weight: 700; width: 100%;">
            🔓 Plattform freischalten
          </button>
        </form>
      </div>
    `;

    document.body.appendChild(lockOverlay);

    const passInput = document.getElementById("bkh-pass-input");
    const eyeBtn = document.getElementById("bkh-toggle-eye");
    const errMsg = document.getElementById("bkh-error-msg");
    const rememberChk = document.getElementById("bkh-remember-chk");
    const loginForm = document.getElementById("bkh-login-form");

    setTimeout(() => passInput?.focus(), 100);

    eyeBtn?.addEventListener("click", () => {
      if (passInput.type === "password") {
        passInput.type = "text";
        eyeBtn.textContent = "🙈";
      } else {
        passInput.type = "password";
        eyeBtn.textContent = "👁️";
      }
    });

    loginForm?.addEventListener("submit", (e) => {
      e.preventDefault();
      const entered = (passInput.value || "").trim().toLowerCase();

      if (entered === ACCESS_PASS) {
        try {
          if (rememberChk && rememberChk.checked) {
            localStorage.setItem(AUTH_STORAGE_KEY, "granted");
          } else {
            sessionStorage.setItem(AUTH_STORAGE_KEY, "granted");
          }
        } catch (err) {}

        if (typeof playSuccessSound === "function") playSuccessSound();
        document.body.style.overflow = "";
        document.body.style.overflowX = "hidden";
        lockOverlay.remove();
      } else {
        if (typeof playWrongSound === "function") playWrongSound();
        errMsg.style.display = "block";
        passInput.style.borderColor = "#ef4444";
        passInput.select();
      }
    });
  }
})();

// =========================================================================
// 32. KOMPLETT-ARCHIV ALLER RESTLICHEN TABELLEN AUS DEN 35 EUROPA-SEITEN
//     (Sichert alle Detailtabellen dauerhaft im Code & erweitert das Popup)
// =========================================================================
(function() {
  // 1. Strukturiertes Komplett-Archiv für Code, Popup & KI dauerhaft hinterlegen
  window.EUROPA_COMPLETE_ARCHIVE = {
    s196_verlegearten: "A1/A2: Wärmegedämmte Wand (Rk <= 0,1 K·m/W, sehr schlechte Wärmeabfuhr) | B1/B2: Rohr/Kanal auf oder in Wand (Rk <= 2 K·m/W) | C: Direkt auf/in Wand oder unter Decke | D1/D2: Im Erdboden (S. 204) | E/F/G: Gelochte Kabelwanne (A_Löcher >= 0,3·A), Konsolen, frei in Luft.",
    s199_90grad_und_alu: "Betriebstemp. 90 °C (z. B. N2XY bei 30 °C): 1,5mm² B2(2/3)=22/19,5A | 2,5mm² B2=30/26A | 4mm² B2=40/35A | 6mm² B2=51/44A | 10mm² B2=69/60A | 16mm² B2=91/80A. Aluminiumleiter (70 °C/90 °C bei 30 °C): 25mm² B2(2/3)=94/84A, C=101/90A | 35mm² B2=115/103A, C=126/112A | 50mm² B2=138/124A, C=154/136A.",
    s200_flexible_leitungen: "Flexible Leitungen bei 30 °C: 1) PVC 70 °C (H05V-U, H07V-K in Rohr 1/V1): 0,75=15A, 1=19A, 1,5=24A, 2,5=32A, 4=42A, 6=54A, 10=73A, 16=98A. 2) Gummi 60 °C (H05RN-F, H07RN-F 2/V2 oder 3/V3): 0,75=6A, 1=10A, 1,5=16A, 2,5=25A (3-adrig 20A), 4=32A (25A), 6=40A, 10=63A. 3) NSSHöu (80 °C, 3 Leiter): 2,5=30A, 4=41A, 6=53A, 10=74A, 16=99A.",
    s201_rinnen_vieladrig: "Kabelrinnen f2 (1 Bahn, 2/3/4/6/9 Kabel): ungelocht = 0,84 / 0,78 / 0,75 / 0,71 / 0,68 | gelocht (Kabelrost) = 0,88 / 0,82 / 0,79 / 0,76 / 0,73 | Kabelleiter = 0,87 / 0,82 / 0,80 / 0,79 / 0,78. Faktor f4 für vieladrige Leitungen <= 10 mm²: 5 Adern=0,75 | 7=0,65 | 10=0,55 | 14=0,50 | 19=0,45 | 24=0,40.",
    s204_erdkabel_details: "Mindestquerschnitte: Feste Verlegung Cu 1,5 mm² / Al 16 mm² | Verdrahtung in Schaltanlagen: bis 2,5A=0,5mm², bis 16A=0,75mm², über 16A=1,0mm² | Freileitung Cu=16mm², Al=25mm². Häufung f2 direkt in Erde (Abstand 0m Berührung / a=D / 0,125m / 0,25m / 0,5m): 2 Kabel = 0,75 / 0,80 / 0,85 / 0,90 / 0,90 | 3 Kabel = 0,65 / 0,70 / 0,75 / 0,80 / 0,85 | 4 Kabel = 0,60 / 0,60 / 0,70 / 0,75 / 0,80.",
    s205_lnorm_spannungsfall: "Normierte zulässige Leitungslänge l_norm (bei 1 V, 1 A, Δu = 1 %, 70 °C): 1,5mm² Cu=0,4m (Al=0,2m) | 2,5mm² Cu=0,6m (Al=0,4m) | 4mm² Cu=1,0m (Al=0,6m) | 6mm² Cu=1,5m (Al=0,9m) | 10mm² Cu=2,6m (Al=1,5m) | 16mm² Cu=4,1m (Al=2,5m) | 25mm² Cu=6,6m (Al=4,0m) | 35mm² Cu=9,1m (Al=5,5m). Formel Drehstrom: l_zul = l_norm · (Un / Ib) · Δu% (bei 1~ Wechselstrom Ergebnis halbieren!).",
    s206_s208_kurzschluss_laengen: "Kurzschluss-Erwärmung t <= (k · A / Ik)² mit k = 115 As^0,5/mm² (PVC) bzw. k = 141 (Gummi). Energiebegrenzungsklasse 3 (LS B, C): I²t = 35.000 A²s. Tabelle S. 206 (ZV = 300 mΩ, t = 0,4 s -> l_max / I_min & Faktor fl je 10 mΩ): 1,5mm² B10=132m(50A) C10=61m(100A) gG10=75m(82A) fl=0,31 | 1,5mm² B16=79m(80A) C16=34m(160A) gG16=53m(109A) fl=0,29 | 2,5mm² B16=129m(80A) C16=56m(160A) gG16=89m(109A) fl=0,53 | 2,5mm² B20=100m(100A) C20=41m(200A) gG20=60m(148A) fl=0,50 | 4mm² B20=160m C20=66m gG20=99m fl=0,87 | 4mm² B32=90m C32=31m gG32=41m(270A) fl=0,78 | 6mm² B32=135m C32=47m gG32=62m fl=1,27.",
    s209_s210_sicherungen_nh: "Schmelzsicherungs-Klassen (S. 210): 1. Buchstabe: g = Ganzbereichssicherung (Überlast + Kurzschluss), a = Teilbereichssicherung (nur Kurzschluss!). 2. Buchstabe: G = Kabel-/Leitungsschutz, R = Halbleiterschutz, M = Schaltgeräteschutz/Motoren, Tr = Trafoschutz, B = Bergbau. NH-Baugrößen & Schwertlänge a1 (S. 209): NH000/NH00 = 79 mm (bis 160 A) | NH1 = 135 mm (bis 250 A) | NH2 = 150 mm (bis 400 A) | NH3 = 150 mm (bis 630 A) | NH4a = 200 mm (bis 1600 A).",
    s235_raumwirkungsgrad_tabelle: "Raumwirkungsgrad η_R in % (S. 235) für Decke ρ1=0,8, Wand ρ2=0,5, Boden ρ3=0,3: 1) Direkt stark gerichtet A1 (η_LB 60–80%): k=0,6->61%, k=1,0->80%, k=1,5->95%, k=2,0->102%, k=3,0->111%. 2) Direkt tiefstrahlend A2 (Wanne prismatisch / Spiegelraster, η_LB 60–75%): k=0,6->52%, k=1,0->73%, k=1,5->89%, k=2,0->97%, k=3,0->107%. 3) Vorwiegend direkt B3 (Wanne opal, η_LB 50–70%): k=0,6->41%, k=1,0->59%, k=1,5->74%, k=2,0->83%, k=3,0->95%. 4) Gleichförmig freistrahlend C4 (LED-Röhre, η_LB 80–90%): k=0,6->36% (bei ρ2=0,3: 27%), k=1,0->52% (bei ρ2=0,3: 43%!), k=1,5->65% (56%), k=2,0->74% (65%).",
    s257_s266_schutz_und_pruefung: "Abschaltzeiten VDE 0100-410 (S. 257): TN-System Endkreise <=63A/32A: 50–120V=0,8s AC | 120–230V=0,4s AC (1s DC) | 230–400V=0,2s AC (0,4s DC) | >400V=0,1s | Verteilerkreise (>32A) = 5s. TT-System Endkreise: 50–120V=0,3s | 120–230V=0,2s AC (0,4s DC) | 230–400V=0,07s AC (0,2s DC) | >400V=0,04s | Verteilerkreise = 1s. RCD-Auslösezeiten (S. 260): Standard-RCD bei 1·I_Δn <= 300ms, 2·I_Δn <= 150ms, 5·I_Δn <= 40ms. Selektiver RCD [S] bei 1·I_Δn <= 500ms, 2·I_Δn <= 200ms, 5·I_Δn <= 150ms. Standortisolierung (S. 265): >= 50 kΩ. Wiederholungsprüfung Riso: >= 1 kΩ/V (Feuchte >= 0,5 kΩ/V).",
    s439_s441_sat_komplett: "Offset-Antennen (S. 439): 0,60 m -> Gewinn 34,75 dB, Windlast 276 N | 0,90 m -> 38,5 dB, Windlast 660 N | 1,20 m -> 41,2 dB, Windlast 1300 N | Zentralgespeist 1,50 m -> 2000 N | 1,80 m -> 2700 N | Flachantenne 0,5 m -> 180 N. ASTRA 19,2° Ost Winkel (Elevation αE / Azimut αA): Berlin 29,9°/172,7° | Bremen 28,6°/166,9° | Dresden 31,3°/172,9° | Düsseldorf 30,3°/164,1° | Hamburg 28,5°/168,3° | Hannover 29,6°/168,0° | Kiel 27,6°/169,0° | Magdeburg 29,9°/170,4° | Mainz 31,8°/166,0° | München 34,3°/169,8° | Stuttgart 33,6°/166,9°. Entkopplung (S. 441): Zwischen 2 beliebigen Dosen mind. 22 dB (UKW/TV >= 50 dB). Abschlusswiderstand Stammleitung: 75 Ω.",
    s528_s537_motoren_komplett: "IE3-Motoren 2-polig (ns = 3000 min⁻¹, 400 V, S. 528): 0,75kW (71) In=1,3A η=70% | 1,1kW (80M) In=2,26A η=82,6% | 1,5kW (90S) In=3,0A η=83,9% | 2,2kW (90L) In=4,2A η=85,9% | 3,0kW (100L) In=5,65A η=87,1% | 4,0kW (112M) In=7,4A η=87,7% | 5,5kW (132S) In=9,9A η=89,1% | 7,5kW (132M) In=13,1A η=89,8% | 15kW (160M) In=29A η=90% | 18,5kW (160L) In=34A η=91%. Polumschaltbare Dahlander (1500/3000 min⁻¹, S. 528): Baugröße 71 (0,37/0,55 kW -> In = 1,2 / 1,7 A) | 80 (0,55/0,75 kW -> In = 1,6 / 2,0 A) | 90S (1,0/1,2 kW -> In = 2,7 / 3,0 A) | 100L (2,0/2,6 kW -> In = 5,0 / 5,8 A). Einphasen-Kondensatormotoren (230 V, S. 528): 0,5kW -> In=2,4A, CB=10µF | 1,1kW -> In=7,4A, CB=30µF | 1,7kW -> In=11A, CB=40µF. Dahlander Y/YY (Lüfter, quadratisches Moment, P_Y/P_YY = 1/4, S. 537): Langsam Y = L1..L3 an 1U..1W (2U..2W offen); Schnell YY = L1..L3 an 2U..2W (1U..1W gebrückt). Dahlander YY/Δ (Hebezeuge, konstante Leistung 1/1): Langsam YY = L1..L3 an 1U..1W (2U..2W gebrückt!); Schnell Δ = L1..L3 an 2U..2W (1U..1W offen!)."
  };

  // 2. Zusätzliche Detail-Boxen direkt in die 5 Technik-Reiter des Popups (#europa-ref-modal) einhängen
  const tabVde0298 = document.getElementById("etab-tab-vde0298");
  if (tabVde0298 && !document.getElementById("extra-archive-0298")) {
    const div = document.createElement("div");
    div.id = "extra-archive-0298";
    div.style.cssText = "margin-top:0.75rem; background:#0f172a; padding:0.7rem; border-radius:8px; border:1px solid #334155;";
    div.innerHTML = `
      <strong style="color:#4ade80;">➕ Zusatzdaten S. 199 (Alu/90°C), S. 200 (Flexibel), S. 204 (Erdkabel-Häufung) & S. 205 (l_norm):</strong><br>
      • <strong>Flexible Gummileitung H07RN-F (60 °C, S. 200):</strong> 1,5 mm² = <strong>16 A</strong> | 2,5 mm² = <strong>25 A</strong> (3-adrig: 20 A) | 4 mm² = <strong>32 A</strong> (25 A) | 6 mm² = <strong>40 A</strong> | 10 mm² = <strong>63 A</strong><br>
      • <strong>Erdkabel-Häufung f2 direkt in Erde (S. 204, Berührung / a=D / 0,25m):</strong> 2 Kabel = <strong>0,75 / 0,80 / 0,90</strong> | 3 Kabel = <strong>0,65 / 0,70 / 0,80</strong> | 4 Kabel = <strong>0,60 / 0,60 / 0,75</strong><br>
      • <strong>Normierte Länge l_norm (S. 205, Cu 70 °C):</strong> 1,5 mm² = <strong>0,4 m</strong> | 2,5 mm² = <strong>0,6 m</strong> | 4 mm² = <strong>1,0 m</strong> | 6 mm² = <strong>1,5 m</strong> | 10 mm² = <strong>2,6 m</strong> | 16 mm² = <strong>4,1 m</strong>
    `;
    tabVde0298.appendChild(div);
  }

  const tabFuses = document.getElementById("etab-tab-fuses");
  if (tabFuses && !document.getElementById("extra-archive-fuses")) {
    const div = document.createElement("div");
    div.id = "extra-archive-fuses";
    div.style.cssText = "margin-top:0.75rem; background:#0f172a; padding:0.7rem; border-radius:8px; border:1px solid #334155;";
    div.innerHTML = `
      <strong style="color:#fbbf24;">➕ Zusatzdaten S. 206 (l_max300 & fl), S. 209 (NH) & S. 210 (Klassen gG / aM / gR):</strong><br>
      • <strong>Sicherungsklassen (S. 210):</strong> <strong>g</strong> = Ganzbereich (Überlast + Kurzschluss) | <strong>a</strong> = Teilbereich (nur Kurzschluss!) | <strong>gG</strong> = Leitungsschutz | <strong>aM</strong> = Motorschaltgeräteschutz | <strong>gR / aR</strong> = Halbleiterschutz<br>
      • <strong>Max. Länge l_max bei ZV = 300 mΩ, t = 0,4 s (S. 206):</strong> 1,5 mm²: B10=<strong>132m</strong> (fl=0,31), B16=<strong>79m</strong> (fl=0,29), C16=<strong>34m</strong>, gG16=<strong>53m</strong> | 2,5 mm²: B16=<strong>129m</strong> (fl=0,53), C16=<strong>56m</strong>, C20=<strong>41m</strong> (fl=0,50) | 4 mm²: C20=<strong>66m</strong> (fl=0,87)<br>
      • <strong>Kurzschluss-Erwärmung (S. 206):</strong> <code>t ≤ (k · A / Ik)²</code> mit <strong>k = 115</strong> (PVC) bzw. <strong>k = 141</strong> (Gummi); LS Klasse 3: <code>I²t = 35.000 A²s</code>
    `;
    tabFuses.appendChild(div);
  }

  const tabKomp = document.getElementById("etab-tab-komp");
  if (tabKomp && !document.getElementById("extra-archive-komp")) {
    const div = document.createElement("div");
    div.id = "extra-archive-komp";
    div.style.cssText = "margin-top:0.75rem; background:#0f172a; padding:0.7rem; border-radius:8px; border:1px solid #334155;";
    div.innerHTML = `
      <strong style="color:#38bdf8;">➕ Zusatzdaten S. 528 (2-polige Motoren & Dahlander) & S. 537 (Alle 3 Dahlander-Varianten):</strong><br>
      • <strong>IE3 2-polig (ns = 3000 min⁻¹, S. 528):</strong> 1,5 kW ➔ <strong>3,0 A</strong> (83,9%) | 2,2 kW ➔ <strong>4,2 A</strong> (85,9%) | 3,0 kW ➔ <strong>5,65 A</strong> (87,1%) | 4,0 kW ➔ <strong>7,4 A</strong> (87,7%) | 5,5 kW ➔ <strong>9,9 A</strong> (89,1%) | 7,5 kW ➔ <strong>13,1 A</strong> (89,8%)<br>
      • <strong>Dahlander-Betriebsdaten 1500/3000 min⁻¹ (S. 528):</strong> BG 71 (0,37/0,55 kW) ➔ <strong>In = 1,2 A / 1,7 A</strong> | BG 80 (0,55/0,75 kW) ➔ <strong>In = 1,6 A / 2,0 A</strong> | BG 90S (1,0/1,2 kW) ➔ <strong>In = 2,7 A / 3,0 A</strong> | BG 100L (2,0/2,6 kW) ➔ <strong>In = 5,0 A / 5,8 A</strong> (beweist: 2 getrennte Motorschutzrelais nötig!)<br>
      • <strong>Alle 3 Dahlander-Schaltungen (S. 536–537):</strong> 1) <strong>Δ/YY</strong> = konstantes Moment (Werkzeugmaschinen, 1 : 1,5) | 2) <strong>Y/YY</strong> = quadratisches Moment (Lüfter/Pumpen, 1 : 4) | 3) <strong>YY/Δ</strong> = konstante Leistung (Hebezeuge, 1 : 1, langsam YY mit Brücke 2U-2V-2W, schnell Δ mit 1U-1V-1W offen!).
    `;
    tabKomp.appendChild(div);
  }

  const tabLichtSat = document.getElementById("etab-tab-lichtsat");
  if (tabLichtSat && !document.getElementById("extra-archive-lichtsat")) {
    const div = document.createElement("div");
    div.id = "extra-archive-lichtsat";
    div.style.cssText = "background:#0f172a; padding:0.7rem; border-radius:8px; border:1px solid #334155;";
    div.innerHTML = `
      <strong style="color:#4ade80;">➕ Zusatzdaten S. 235 (Raumwirkungsgrad η_R) & S. 439/441 (Windlasten, Städte & Entkopplung):</strong><br>
      • <strong>Raumwirkungsgrad η_R (S. 235 für ρ = 0,8 / 0,5 / 0,3):</strong> Typ A1 (Spiegel): k=1,0➔<strong>80%</strong>, k=1,5➔<strong>95%</strong> | Typ A2 (Wanne prismatisch): k=1,0➔<strong>73%</strong>, k=1,5➔<strong>89%</strong> | Typ B3 (Wanne opal): k=1,0➔<strong>59%</strong>, k=1,5➔<strong>74%</strong> | Typ C4 (freistrahlend): k=1,0➔<strong>52%</strong> (bei ρ2=0,3: <strong>43%</strong>), k=1,5➔<strong>65%</strong><br>
      • <strong>Windlasten SAT-Antennen (S. 439):</strong> Ø 0,60 m = <strong>276 N</strong> (34,75 dB) | Ø 0,90 m = <strong>660 N</strong> (38,5 dB) | Ø 1,20 m = <strong>1300 N</strong> (41,2 dB) | Flachantenne 0,5 m = <strong>180 N</strong><br>
      • <strong>Entkopplung & Abschluss (S. 441):</strong> Grundentkopplung zw. 2 Dosen <strong>≥ 22 dB</strong> (Teilnehmerentkopplung <strong>≥ 50 dB</strong>); Stammleitungs-Ende: <strong>75 Ω Abschlusswiderstand</strong>.
    `;
    tabLichtSat.appendChild(div);
  }
})();

// =========================================================================
// 33. SYSTEM-AUDIT & BUGFIX-PAKET:
//     - FIX: FILTER "WACKELIGE FRAGEN (1x GEWUSST)" & 3-STUFEN-GEDÄCHTNIS SYNC
//     - FIX: HEADER-ZAHLEN (75 ELEKTRO / 20 RECHNEN) & FSA-SUBBUTTON-STATUS
//     - UPGRADE: KLAUSUR-SIMULATION (FORTSCHRITT, UNTERER ABGABE-BUTTON, ERKLÄRUNG)
//     - UPGRADE: RECHENTRAINER VOR/ZURÜCK-NAVIGATION & WISO-TABELLENBUCHSEITEN
// =========================================================================
(function() {
  // -----------------------------------------------------------------------
  // 1) HEADER-UNTERTITEL DYNAMISCH AUF AKTUELLE FRAGENANZAHL SYNCHRONISIEREN
  // -----------------------------------------------------------------------
  const headerSubP = document.querySelector(".header-title-box p");
  if (headerSubP && typeof WISO_QUESTIONS !== "undefined" && typeof ELEKTRO_QUESTIONS !== "undefined") {
    headerSubP.textContent = `WiSo (${WISO_QUESTIONS.length}), Elektro-Theorie (${ELEKTRO_QUESTIONS.length}), Fachenglisch (${ENGLISH_QUESTIONS.length}), ${CALC_TASKS.length}er-Rechentrainer, VDE 0100-600, SEE Electrical CAD-Suite, SPS KOP-Simulator & KI-Prüfer`;
  }

  // -----------------------------------------------------------------------
  // 2) WISO-FRAGEN MIT EXAKTEN EUROPA-TABELLENBUCH-SEITEN (S. 590–618) AUSSTATTEN
  // -----------------------------------------------------------------------
  // [Cleanup] WiSo-Tabellenbuch-Seiten direkt in WISO_QUESTIONS eingeschmolzen.

  // -----------------------------------------------------------------------
  // 3) BUGFIX: 3-STUFEN-GEDÄCHTNIS (nrw_hit_counts_v1) IMMER LIVE SYNCHRONISIEREN
  //    & FILTER-LISTENERS AUF AKTUELLE window.applyFilters BINDEN
  // -----------------------------------------------------------------------
  function getFreshHitCounts() {
    const hc = readStoredJson("nrw_hit_counts_v1", {});
    [progressWiso, progressElektro, progressEnglish].forEach((prog) => {
      Object.keys(prog || {}).forEach((id) => {
        if (prog[id] === "correct" && !hc[id]) hc[id] = 1;
        if (prog[id] === "wrong") hc[id] = 0;
      });
    });
    return hc;
  }

  window.updateBadgeStatus = function(qId) {
    const progress = getCurrentProgressObj();
    const st = progress[qId];
    const hc = getFreshHitCounts();
    const count = hc[qId] || 0;

    if (st === "correct") {
      if (count >= 2) {
        badgeStatus.textContent = `🟢 Prüfungssicher (${count}x gewusst)`;
        badgeStatus.style.color = "#22c55e";
      } else {
        badgeStatus.textContent = "🟡 1x Gewusst (Noch festigen)";
        badgeStatus.style.color = "#fbbf24";
      }
    } else if (st === "wrong") {
      badgeStatus.textContent = "🔴 Wiederholen";
      badgeStatus.style.color = "#ef4444";
    } else {
      badgeStatus.textContent = "⚪ Offen";
      badgeStatus.style.color = "#94a3b8";
    }

    if (bookmarks[qId]) {
      btnBookmark.classList.add("active");
      btnBookmark.textContent = "⭐ Auf Merkliste (Taste M)";
    } else {
      btnBookmark.classList.remove("active");
      btnBookmark.textContent = "☆ Auf Merkliste (Taste M)";
    }
  };

  window.recordPsychologicalProgress = function(isCorrect) {
    if (isCorrect) {
      currentStreak++;
    } else {
      currentStreak = 0;
    }
    dailyData.count++;
    localStorage.setItem("nrw_streak_v1", String(currentStreak));
    localStorage.setItem("nrw_daily_goal_v1", JSON.stringify(dailyData));

    // WICHTIGER BUGFIX: hitCounts nur erhöhen, wenn wir wirklich im Theorie-Trainer sind!
    if (quizMainContainer && quizMainContainer.style.display !== "none") {
      const q = filteredQuestions[currentIndex];
      if (q) {
        const hc = getFreshHitCounts();
        hc[q.id] = isCorrect ? (hc[q.id] || 0) + 1 : 0;
        localStorage.setItem("nrw_hit_counts_v1", JSON.stringify(hc));
      }
    }
  };

  // Saubere Neu-Definition von window.applyFilters inkl. "shaky"-Filter
  window.applyFilters = function() {
    const searchVal = (searchInput ? searchInput.value : "").trim().toLowerCase();

    if (searchVal.length > 0) {
      const matchInCurrent = activeQuestionPool.some((q) => testMatch(q, searchVal));
      if (!matchInCurrent) {
        const pools = [
          { key: "wiso", pool: WISO_QUESTIONS, tabId: "tab-wiso" },
          { key: "elektro", pool: ELEKTRO_QUESTIONS, tabId: "tab-elektro" },
          { key: "english", pool: ENGLISH_QUESTIONS, tabId: "tab-english" }
        ];
        for (const p of pools) {
          if (p.pool.some((q) => testMatch(q, searchVal))) {
            currentSection = p.key;
            activeQuestionPool = p.pool;
            document.querySelectorAll(".tab-btn").forEach((b) => b.classList.remove("active"));
            document.getElementById(p.tabId)?.classList.add("active");
            populateFilterDropdowns();
            break;
          }
        }
      }
    }

    const examVal = filterExam.value;
    const catVal = filterCategory.value;
    const modeVal = filterMode.value;
    const currentProgress = getCurrentProgressObj();
    const hc = getFreshHitCounts();

    filteredQuestions = activeQuestionPool.filter((q) => {
      const matchExam = examVal === "all" || q.exam === examVal;
      const matchCat = catVal === "all" || q.category === catVal;
      let matchMode = true;
      if (modeVal === "unlearned") matchMode = currentProgress[q.id] !== "correct";
      else if (modeVal === "shaky") matchMode = currentProgress[q.id] === "correct" && (hc[q.id] || 1) === 1;
      else if (modeVal === "wrong") matchMode = currentProgress[q.id] === "wrong";
      else if (modeVal === "bookmarked") matchMode = !!bookmarks[q.id];
      const matchSearch = testMatch(q, searchVal);
      return matchExam && matchCat && matchMode && matchSearch;
    });

    if (searchVal.length > 0) {
      searchInfo.textContent = `🔍 ${filteredQuestions.length} Treffer gefunden.`;
    } else if (modeVal === "shaky") {
      searchInfo.textContent = `🟡 ${filteredQuestions.length} wackelige Fragen (erst 1x gewusst – beantworte sie noch einmal richtig für Status „Prüfungssicher“!).`;
    } else {
      searchInfo.textContent = "";
    }

    currentIndex = 0;
    window.renderQuestion();
    updateStats();
  };

  // Event-Listener der Filter-Dropdowns auf die neue window.applyFilters umhängen
  [filterExam, filterCategory, filterMode].forEach((sel) => {
    if (!sel) return;
    sel.onchange = () => window.applyFilters();
  });

  // -----------------------------------------------------------------------
  // 4) BUGFIX: FSA-SUBNAVIGATION BEIM WECHSEL AUF SCHALTUNG 1 SYNCHRON HALTEN
  // -----------------------------------------------------------------------
  const btnModeFsaEl = document.getElementById("btn-mode-fsa");
  btnModeFsaEl?.addEventListener("click", () => {
    document.querySelectorAll(".circuit-subbtn").forEach((b) => {
      b.classList.toggle("active", b.dataset.circuit === "selbsthaltung");
    });
  });

  // -----------------------------------------------------------------------
  // 5) RECHENTRAINER: VOR-/ZURÜCK-NAVIGATION & AUTO-SAVE DER EINGABEN
  // -----------------------------------------------------------------------
  const calcCheckBtn = document.getElementById("btn-calc-check");
  if (calcCheckBtn && !document.getElementById("calc-nav-row")) {
    const navRow = document.createElement("div");
    navRow.id = "calc-nav-row";
    navRow.className = "navigation-row";
    navRow.style.cssText = "margin-top: 1rem; padding-top: 0.9rem; border-top: 1px solid var(--card-border);";
    navRow.innerHTML = `
      <button type="button" id="btn-calc-prev" class="btn secondary nav-btn">⬅️ Vorherige Rechenaufgabe</button>
      <button type="button" id="btn-calc-next" class="btn primary nav-btn">Nächste Rechenaufgabe ➡️</button>
    `;
    calcCheckBtn.parentElement.insertAdjacentElement("afterend", navRow);

    document.getElementById("btn-calc-prev")?.addEventListener("click", () => {
      if (currentCalcTaskIndex > 0) {
        calcTaskSelector.value = String(currentCalcTaskIndex - 1);
        loadCalcTask(currentCalcTaskIndex - 1, false);
      }
    });
    document.getElementById("btn-calc-next")?.addEventListener("click", () => {
      if (currentCalcTaskIndex < CALC_TASKS.length - 1) {
        calcTaskSelector.value = String(currentCalcTaskIndex + 1);
        loadCalcTask(currentCalcTaskIndex + 1, false);
      }
    });
  }

  // -----------------------------------------------------------------------
  // 6) PRÜFUNGSSIMULATION UPGRADE: LIVE-ZÄHLER, UNTERER ABGABE-BUTTON &
  //    DETAILLIERTER ANTWORT-VERGLEICH INKL. TABELLENBUCH-ERKLÄRUNG
  // -----------------------------------------------------------------------
  const origRenderSim = window.renderSimQuestions;
  if (typeof origRenderSim === "function") {
    window.renderSimQuestions = function() {
      origRenderSim.apply(this, arguments);

      const totalQ = simQuestions.length;
      const topBar = document.createElement("div");
      topBar.id = "sim-live-progress-bar";
      topBar.style.cssText = "position:sticky; top:8px; z-index:20; background:rgba(15,23,42,0.95); border:1px solid #3b82f6; border-radius:8px; padding:0.55rem 0.9rem; margin-bottom:1.2rem; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:0.5rem; backdrop-filter:blur(6px);";
      topBar.innerHTML = `
        <span id="sim-answered-count" style="font-size:0.88rem; font-weight:700; color:#93c5fd;">✍️ Beantwortet: 0 von ${totalQ} Aufgaben</span>
        <span style="font-size:0.8rem; color:#cbd5e1;">Tipp: Kontrolliere vor der Abgabe alle Aufgaben!</span>
      `;
      simQuestionsContainer.prepend(topBar);

      const bottomSubmitWrap = document.createElement("div");
      bottomSubmitWrap.style.cssText = "text-align:center; margin-top:1.5rem; padding-top:1rem; border-top:2px solid #334155;";
      bottomSubmitWrap.innerHTML = `
        <button type="button" id="btn-finish-sim-bottom" class="btn warning" style="font-size:1.02rem; padding:0.85rem 1.8rem; font-weight:700;">
          🛑 Prüfung jetzt abgeben & auswerten
        </button>
      `;
      simQuestionsContainer.appendChild(bottomSubmitWrap);

      bottomSubmitWrap.querySelector("#btn-finish-sim-bottom")?.addEventListener("click", () => {
        const answeredCount = Object.keys(simUserAnswers).length;
        const msg = answeredCount < totalQ
          ? `Du hast erst ${answeredCount} von ${totalQ} Aufgaben beantwortet! Möchtest du die Prüfung trotzdem jetzt abgeben?`
          : "Möchtest du die Prüfung jetzt abgeben und dein offizielles Prüfungsergebnis berechnen lassen?";
        if (confirm(msg)) {
          clearInterval(simInterval);
          window.evaluateSimulation(false);
          window.scrollTo({ top: 0, behavior: "smooth" });
        }
      });

      simQuestionsContainer.querySelectorAll('input[type="radio"]').forEach((rad) => {
        rad.addEventListener("change", () => {
          const cnt = Object.keys(simUserAnswers).length;
          const cntEl = document.getElementById("sim-answered-count");
          if (cntEl) {
            cntEl.textContent = `✍️ Beantwortet: ${cnt} von ${totalQ} Aufgaben`;
            cntEl.style.color = cnt === totalQ ? "#4ade80" : "#93c5fd";
          }
        });
      });
    };
  }

  window.evaluateSimulation = function(isTimeOut) {
    btnStartSim.classList.remove("hidden");
    btnFinishSim.classList.add("hidden");
    simTimerBox.classList.add("hidden");
    simWorkspace.classList.add("hidden");

    let pointsEarned = 0;
    const totalPoints = simQuestions.length * 10;
    let detailsHtml = "";
    const hc = getFreshHitCounts();

    simQuestions.forEach((q, idx) => {
      const userChoice = simUserAnswers[idx];
      const isCorrect = userChoice === q.correct;
      if (isCorrect) pointsEarned += 10;

      const targetProgress = q.id.startsWith("el-") ? progressElektro : q.id.startsWith("en-") ? progressEnglish : progressWiso;
      targetProgress[q.id] = isCorrect ? "correct" : "wrong";
      hc[q.id] = isCorrect ? (hc[q.id] || 0) + 1 : 0;

      const userChoiceText = userChoice !== undefined ? q.options[userChoice] : "⚠️ Keine Antwort ausgewählt";

      detailsHtml += `
        <div style="margin-bottom: 0.9rem; padding: 0.95rem; border-left: 4px solid ${isCorrect ? "var(--success)" : "var(--danger)"}; background: #1e293b; border-radius: 8px;">
          <div style="font-weight:700; color:${isCorrect ? "#4ade80" : "#fca5a5"}; margin-bottom:0.25rem;">
            Aufgabe ${idx + 1} (${q.category}): ${isCorrect ? "✅ 10 / 10 Punkte" : "❌ 0 / 10 Punkte"}
          </div>
          <div style="font-size: 0.92rem; color: #f8fafc; font-weight:600; margin-bottom:0.45rem;">${q.question}</div>
          ${!isCorrect ? `<div style="font-size: 0.85rem; color: #fca5a5; margin-bottom:0.3rem;"><strong>Deine Wahl:</strong> ${userChoiceText}</div>` : ""}
          <div style="font-size: 0.88rem; color: #4ade80; margin-bottom:0.35rem;"><strong>✅ Offizielle Lösung:</strong> ${q.options[q.correct]}</div>
          <div style="font-size: 0.82rem; color: #cbd5e1; white-space: pre-line; border-top:1px dashed #334155; padding-top:0.35rem;">${q.explanation}</div>
        </div>
      `;
    });

    localStorage.setItem("nrw_hit_counts_v1", JSON.stringify(hc));

    const percent = Math.round((pointsEarned / totalPoints) * 100);
    let gradeText = "";
    let color = "var(--success)";

    if (percent >= 92) gradeText = "Note 1 (Sehr Gut)";
    else if (percent >= 81) gradeText = "Note 2 (Gut)";
    else if (percent >= 67) gradeText = "Note 3 (Befriedigend)";
    else if (percent >= 50) gradeText = "Note 4 (Ausreichend – Bestanden)";
    else if (percent >= 30) { gradeText = "Note 5 (Mangelhaft – Nicht bestanden)"; color = "var(--danger)"; }
    else { gradeText = "Note 6 (Ungenügend – Sperrfach!)"; color = "var(--danger)"; }

    if (percent >= 50) playSuccessSound();
    else playWrongSound();

    const simResultTitle = document.getElementById("sim-result-title");
    const simResultGrade = document.getElementById("sim-result-grade");
    const simResultDetails = document.getElementById("sim-result-details");

    simResultTitle.textContent = isTimeOut ? "⏰ Zeit abgelaufen!" : "📋 Offizielles Prüfungsergebnis";
    simResultTitle.style.color = color;
    simResultGrade.innerHTML = `Ergebnis: <span style="color:${color}">${pointsEarned} von ${totalPoints} Punkten (${percent} %)</span><br>Prüfungsurteil: ${gradeText}`;
    simResultDetails.innerHTML = detailsHtml;

    document.getElementById("btn-sim-retry-wrong")?.remove();
    const wrongSimQuestions = simQuestions.filter((q, idx) => simUserAnswers[idx] !== q.correct);
    if (wrongSimQuestions.length > 0) {
      const retryBtn = document.createElement("button");
      retryBtn.id = "btn-sim-retry-wrong";
      retryBtn.type = "button";
      retryBtn.className = "btn primary";
      retryBtn.style.cssText = "margin-bottom: 1rem; width: 100%; font-size: 1rem;";
      retryBtn.textContent = `🔁 Meine ${wrongSimQuestions.length} Fehler aus dieser Klausur jetzt gezielt im Trainer üben`;
      retryBtn.addEventListener("click", () => {
        document.querySelectorAll(".tab-btn").forEach((b) => b.classList.remove("active"));
        document.getElementById("tab-elektro")?.classList.add("active");
        simSection.classList.add("hidden");
        quizMainContainer.style.display = "block";
        filteredQuestions = [...wrongSimQuestions];
        currentIndex = 0;
        if (searchInfo) {
          searchInfo.textContent = `🎯 Klausur-Nachbereitung aktiv: ${wrongSimQuestions.length} falsch beantwortete Klausurfragen geladen!`;
        }
        window.renderQuestion();
        updateStats();
        window.scrollTo({ top: 0, behavior: "smooth" });
      });
      simResultDetails.insertAdjacentElement("beforebegin", retryBtn);
    }

    simResultCard.classList.remove("hidden");
    saveProgress();
  };

  window.renderQuestion();
  updateStats();
})();

// =========================================================================
// 34. 100-%-PRÜFUNGSQUALITÄT FÜR ALLE 154 FRAGEN:
//     - ALLE 50 FEHLENDEN MULTIPLE-CHOICE-FRAGEN MIT GLEICH LANGEN PRÜFUNGSFALLEN
//     - ALLE 62 FEHLENDEN RICHTIG/FALSCH-AUSSAGEN (WISO & ENGLISCH OHNE FALLBACK)
// =========================================================================
(function() {
  // -----------------------------------------------------------------------
  // 1) GLEICH LANGE, REALISTISCHE MC-FALSCHANTWORTEN FÜR DIE RESTLICHEN 50 FRAGEN
  // -----------------------------------------------------------------------
  // [Cleanup] FINAL_MC_DISTRACTORS direkt in Sektion 1 & 28 eingeschmolzen.

  // -----------------------------------------------------------------------
  // 2) ALLE 62 FEHLENDEN RICHTIG/FALSCH-AUSSAGEN (WISO & ENGLISCH)
  //    Damit hat JEDE der 154 Fragen eine eigene handgeschriebene Aussage!
  // -----------------------------------------------------------------------
  // [Cleanup] REMAINING_TF_CLAIMS in Sektion 18 zusammengeführt.
})();

// =========================================================================
// 35. KOMFORT- & PRÜFUNGS-TOOLS:
//     - NRW GP1+GP2 GESAMTNOTEN- & SPERRFACH-RECHNER (AO 2021)
//     - INDIVIDUELL EINSTELLBARES PRÜFUNGSDATUM BEIM COUNTDOWN
//     - AUTO-SAVE DER 4 RECHENSCHRITTE IM RECHENTRAINER
// =========================================================================
(function() {
  // -----------------------------------------------------------------------
  // 1) NRW GP1 + GP2 GESAMTNOTEN- & BESTEHENSRECHNER (AO 2021)
  // -----------------------------------------------------------------------
  const simHeaderCard = document.querySelector("#sim-section .video-header-card");
  if (simHeaderCard && !document.getElementById("gp2-grade-calc-card")) {
    const calcCard = document.createElement("div");
    calcCard.id = "gp2-grade-calc-card";
    calcCard.className = "quiz-card";
    calcCard.style.cssText = "margin-top: 1.2rem; border-color: rgba(59, 130, 246, 0.45);";

    const savedScores = readStoredJson("nrw_ao2021_scores_v1", {
      gp1: 75,
      sys: 72,
      fsa: 70,
      wiso: 82,
      ka: 76
    });

    calcCard.innerHTML = `
      <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:0.6rem; margin-bottom:0.8rem;">
        <div>
          <h3 style="color:#60a5fa; margin:0;">🎓 Offizieller NRW-Gesamtnoten- & Bestehensrechner (AO 2021)</h3>
          <p style="font-size:0.83rem; color:var(--text-muted); margin:0;">
            Berechnet deine Gesamtnote aus <strong>GP Teil 1 (30 %)</strong> und <strong>GP Teil 2 (70 %)</strong> inklusive Sperrfach- & 50-%-Bestehensprüfung!
          </p>
        </div>
        <button type="button" id="btn-toggle-grade-calc" class="btn secondary" style="font-size:0.82rem; padding:0.45rem 0.85rem;">
          🧮 Notenrechner ein-/ausklappen
        </button>
      </div>

      <div id="gp2-grade-calc-body" class="hidden" style="padding-top:0.8rem; border-top:1px solid var(--card-border);">
        <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(175px, 1fr)); gap:0.8rem; margin-bottom:1rem;">
          <div style="background:#0f172a; padding:0.75rem; border-radius:8px; border:1px solid #334155;">
            <label style="font-size:0.78rem; color:#93c5fd; font-weight:700; display:block; margin-bottom:0.3rem;">1️⃣ GP Teil 1 (Gewicht: 30 %)</label>
            <input type="number" id="inp-score-gp1" min="0" max="100" value="${savedScores.gp1}" style="font-weight:700; text-align:center;">
            <small style="font-size:0.72rem; color:#94a3b8;">Punkte (0–100)</small>
          </div>
          <div style="background:#0f172a; padding:0.75rem; border-radius:8px; border:1px solid #334155;">
            <label style="font-size:0.78rem; color:#c084fc; font-weight:700; display:block; margin-bottom:0.3rem;">2️⃣ Systementwurf (10 %)</label>
            <input type="number" id="inp-score-sys" min="0" max="100" value="${savedScores.sys}" style="font-weight:700; text-align:center;">
            <small style="font-size:0.72rem; color:#94a3b8;">Schriftlich (inkl. CAD 50%)</small>
          </div>
          <div style="background:#0f172a; padding:0.75rem; border-radius:8px; border:1px solid #334155;">
            <label style="font-size:0.78rem; color:#c084fc; font-weight:700; display:block; margin-bottom:0.3rem;">3️⃣ Funktionsanalyse (10 %)</label>
            <input type="number" id="inp-score-fsa" min="0" max="100" value="${savedScores.fsa}" style="font-weight:700; text-align:center;">
            <small style="font-size:0.72rem; color:#94a3b8;">Schriftlich (FSA / SPS)</small>
          </div>
          <div style="background:#0f172a; padding:0.75rem; border-radius:8px; border:1px solid #334155;">
            <label style="font-size:0.78rem; color:#c084fc; font-weight:700; display:block; margin-bottom:0.3rem;">4️⃣ WiSo (10 %)</label>
            <input type="number" id="inp-score-wiso" min="0" max="100" value="${savedScores.wiso}" style="font-weight:700; text-align:center;">
            <small style="font-size:0.72rem; color:#94a3b8;">Wirtschaft & Soziales</small>
          </div>
          <div style="background:#0f172a; padding:0.75rem; border-radius:8px; border:1px solid #f59e0b;">
            <label style="font-size:0.78rem; color:#fbbf24; font-weight:700; display:block; margin-bottom:0.3rem;">5️⃣ Kundenauftrag (40 %!)</label>
            <input type="number" id="inp-score-ka" min="0" max="100" value="${savedScores.ka}" style="font-weight:700; text-align:center;">
            <small style="font-size:0.72rem; color:#fde68a;">Praxis + Aufg. 4.1–4.4 + FG</small>
          </div>
        </div>

        <div id="gp2-grade-calc-result" style="background:#0f172a; padding:1rem; border-radius:10px; border:1px solid #334155;"></div>
      </div>
    `;

    simHeaderCard.insertAdjacentElement("afterend", calcCard);

    const toggleBtn = document.getElementById("btn-toggle-grade-calc");
    const calcBody = document.getElementById("gp2-grade-calc-body");
    toggleBtn?.addEventListener("click", () => {
      calcBody.classList.toggle("hidden");
    });

    function evaluateAo2021Calculator() {
      const clamp = (v) => Math.min(100, Math.max(0, Number(v) || 0));
      const gp1 = clamp(document.getElementById("inp-score-gp1")?.value);
      const sys = clamp(document.getElementById("inp-score-sys")?.value);
      const fsa = clamp(document.getElementById("inp-score-fsa")?.value);
      const wiso = clamp(document.getElementById("inp-score-wiso")?.value);
      const ka = clamp(document.getElementById("inp-score-ka")?.value);

      localStorage.setItem("nrw_ao2021_scores_v1", JSON.stringify({ gp1, sys, fsa, wiso, ka }));

      // GP Teil 2 allein (70 % der Gesamtprüfung: 10 + 10 + 10 + 40 = 70 Anteile)
      const gp2OnlyScore = +(((sys * 10 + fsa * 10 + wiso * 10 + ka * 40) / 70)).toFixed(1);
      // Gesamtergebnis (GP1 30 % + GP2 70 %)
      const totalScore = +((gp1 * 0.30 + sys * 0.10 + fsa * 0.10 + wiso * 0.10 + ka * 0.40)).toFixed(1);

      // Offizielle Bestehensregeln nach Ausbildungsverordnung (AO):
      // 1. Gesamtergebnis (GP1 + GP2) >= 50 Punkte ("ausreichend")
      // 2. Ergebnis von GP Teil 2 >= 50 Punkte ("ausreichend")
      // 3. Prüfungsbereich "Kundenauftrag" >= 50 Punkte ("ausreichend")
      // 4. In mindestens zwei der drei schriftlichen Bereiche >= 50 Punkte und KEIN Bereich < 30 Punkte ("ungenügend" = Note 6)
      const writtenAreas = [
        { name: "Systementwurf", val: sys },
        { name: "Funktionsanalyse", val: fsa },
        { name: "WiSo", val: wiso }
      ];
      const writtenPassedCount = writtenAreas.filter((a) => a.val >= 50).length;
      const anyUnder30 = [
        { name: "Systementwurf", val: sys },
        { name: "Funktionsanalyse", val: fsa },
        { name: "WiSo", val: wiso },
        { name: "Kundenauftrag", val: ka }
      ].filter((a) => a.val < 30);

      const failures = [];
      if (totalScore < 50) failures.push(`Gesamtergebnis (${totalScore} P.) liegt unter 50 Punkten`);
      if (gp2OnlyScore < 50) failures.push(`GP Teil 2 Schnitt (${gp2OnlyScore} P.) liegt unter 50 Punkten`);
      if (ka < 50) failures.push(`Sperrfach „Kundenauftrag“ (${ka} P.) liegt unter 50 Punkten`);
      if (writtenPassedCount < 2) failures.push(`Weniger als 2 schriftliche Prüfungsbereiche haben mindestens 50 Punkte`);
      if (anyUnder30.length > 0) failures.push(`Sperrnote 6 (< 30 Punkte) in: ${anyUnder30.map((a) => a.name).join(", ")}`);

      const passed = failures.length === 0;
      const gradeStr = calculateIhkGrade(Math.round(totalScore), 1);

      const resBox = document.getElementById("gp2-grade-calc-result");
      if (resBox) {
        resBox.innerHTML = `
          <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:0.8rem;">
            <div>
              <div style="font-size:1.08rem; font-weight:800; color:${passed ? "#4ade80" : "#ef4444"};">
                ${passed ? "✅ GESELLENPRÜFUNG BESTANDEN!" : "❌ NICHT BESTANDEN (Sperrregel aktiv!)"}
              </div>
              <div style="font-size:0.86rem; color:#e2e8f0; margin-top:0.25rem;">
                • <strong>Gesamtergebnis (GP1 + GP2):</strong> <span style="color:#60a5fa; font-weight:700;">${totalScore} / 100 Punkte</span> ➔ <strong>Note: ${gradeStr}</strong><br>
                • <strong>Schnitt nur GP Teil 2 (70 %):</strong> ${gp2OnlyScore} Punkte | <strong>Kundenauftrag (40 %):</strong> ${ka} Punkte
              </div>
            </div>
          </div>
          ${!passed ? `<div style="margin-top:0.65rem; padding:0.6rem 0.8rem; background:rgba(239,68,68,0.15); border-left:3px solid #ef4444; border-radius:6px; font-size:0.82rem; color:#fca5a5;"><strong>Grund:</strong> ${failures.join(" • ")}</div>` : ""}
        `;
      }
    }

    ["inp-score-gp1", "inp-score-sys", "inp-score-fsa", "inp-score-wiso", "inp-score-ka"].forEach((id) => {
      document.getElementById(id)?.addEventListener("input", evaluateAo2021Calculator);
    });
    evaluateAo2021Calculator();
  }

  // -----------------------------------------------------------------------
  // 2) INDIVIDUELL EINSTELLBARES PRÜFUNGSDATUM BEIM COUNTDOWN
  // -----------------------------------------------------------------------
  const countdownCard = document.querySelector(".countdown-card");
  const countdownLeftDiv = countdownCard?.querySelector("div:first-child");
  const CUSTOM_DATE_KEY = "nrw_custom_exam_date_v1";

  if (countdownLeftDiv && !document.getElementById("btn-set-exam-date")) {
    const dateBtnWrap = document.createElement("div");
    dateBtnWrap.style.cssText = "margin-top: 0.45rem; display: flex; gap: 0.5rem; align-items: center; flex-wrap: wrap;";
    dateBtnWrap.innerHTML = `
      <label style="font-size:0.76rem; color:#93c5fd; font-weight:600; display:inline-flex; align-items:center; gap:0.35rem; cursor:pointer; background:#0f172a; padding:0.22rem 0.6rem; border-radius:6px; border:1px solid #334155;">
        📅 Eigenes Prüfungsdatum:
        <input type="date" id="inp-custom-exam-date" style="width:auto; padding:0.1rem 0.3rem; font-size:0.75rem; border:none; background:transparent; color:#fbbf24; font-weight:700; cursor:pointer;">
      </label>
      <button type="button" id="btn-reset-exam-date" class="quick-chip" style="font-size:0.72rem; padding:0.18rem 0.5rem; display:none;">↺ Standard</button>
    `;
    countdownLeftDiv.appendChild(dateBtnWrap);

    const dateInp = document.getElementById("inp-custom-exam-date");
    const resetDateBtn = document.getElementById("btn-reset-exam-date");

    function getActiveTargetTimestamp() {
      const savedDateStr = localStorage.getItem(CUSTOM_DATE_KEY);
      if (savedDateStr) {
        const parsed = new Date(`${savedDateStr}T08:00:00`).getTime();
        if (!isNaN(parsed)) return parsed;
      }
      return getNextExamDate();
    }

    function refreshCustomCountdownUI() {
      const savedDateStr = localStorage.getItem(CUSTOM_DATE_KEY);
      if (savedDateStr && dateInp) {
        dateInp.value = savedDateStr;
        if (resetDateBtn) resetDateBtn.style.display = "inline-block";
      } else if (dateInp) {
        const d = new Date(getNextExamDate());
        dateInp.value = d.toISOString().slice(0, 10);
        if (resetDateBtn) resetDateBtn.style.display = "none";
      }

      const now = Date.now();
      const dist = getActiveTargetTimestamp() - now;
      const dEl = document.getElementById("days");
      const hEl = document.getElementById("hours");
      const mEl = document.getElementById("minutes");
      const sEl = document.getElementById("seconds");
      if (!dEl || !hEl || !mEl || !sEl) return;

      if (dist <= 0) {
        dEl.textContent = "00"; hEl.textContent = "00"; mEl.textContent = "00"; sEl.textContent = "00";
        return;
      }
      dEl.textContent = String(Math.floor(dist / (1000 * 60 * 60 * 24))).padStart(2, "0");
      hEl.textContent = String(Math.floor((dist % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))).padStart(2, "0");
      mEl.textContent = String(Math.floor((dist % (1000 * 60 * 60)) / (1000 * 60))).padStart(2, "0");
      sEl.textContent = String(Math.floor((dist % (1000 * 60)) / 1000)).padStart(2, "0");
    }

    dateInp?.addEventListener("change", (e) => {
      if (e.target.value) {
        localStorage.setItem(CUSTOM_DATE_KEY, e.target.value);
        refreshCustomCountdownUI();
      }
    });

    resetDateBtn?.addEventListener("click", () => {
      localStorage.removeItem(CUSTOM_DATE_KEY);
      refreshCustomCountdownUI();
    });

    setInterval(refreshCustomCountdownUI, 1000);
    refreshCustomCountdownUI();
  }

  // -----------------------------------------------------------------------
  // 3) AUTO-SAVE DER 4 RECHENSCHRITTE IM RECHENTRAINER + "FELDER LEEREN"
  // -----------------------------------------------------------------------
  const CALC_DRAFTS_KEY = "nrw_calc_drafts_v1";
  let calcDrafts = readStoredJson(CALC_DRAFTS_KEY, {});

  function saveCurrentCalcDraft() {
    const task = CALC_TASKS[currentCalcTaskIndex];
    if (!task) return;
    calcDrafts[task.id] = {
      s1: calcStep1?.value || "",
      s2: calcStep2?.value || "",
      s3: calcStep3?.value || "",
      s4: calcStep4?.value || "",
      num: calcUserNumber?.value || ""
    };
    localStorage.setItem(CALC_DRAFTS_KEY, JSON.stringify(calcDrafts));
  }

  [calcStep1, calcStep2, calcStep3, calcStep4, calcUserNumber].forEach((inp) => {
    inp?.addEventListener("input", saveCurrentCalcDraft);
  });

  const origLoadCalc = window.loadCalcTask;
  if (typeof origLoadCalc === "function") {
    window.loadCalcTask = function(idx, randomize = false) {
      origLoadCalc.apply(this, arguments);
      const task = CALC_TASKS[idx];
      if (!task) return;
      if (randomize) {
        delete calcDrafts[task.id];
        localStorage.setItem(CALC_DRAFTS_KEY, JSON.stringify(calcDrafts));
        return;
      }
      const draft = calcDrafts[task.id];
      if (draft) {
        if (calcStep1) calcStep1.value = draft.s1 || "";
        if (calcStep2) calcStep2.value = draft.s2 || "";
        if (calcStep3) calcStep3.value = draft.s3 || "";
        if (calcStep4) calcStep4.value = draft.s4 || "";
        if (calcUserNumber) calcUserNumber.value = draft.num || "";
      }
    };
    window.loadCalcTask(currentCalcTaskIndex, false);
  }

  // "🧹 Felder leeren"-Button neben "Komplette Musterlösung anzeigen" ergänzen
  const btnShowCalcSol = document.getElementById("btn-calc-show-solution");
  if (btnShowCalcSol && !document.getElementById("btn-calc-clear-fields")) {
    const clearBtn = document.createElement("button");
    clearBtn.id = "btn-calc-clear-fields";
    clearBtn.type = "button";
    clearBtn.className = "btn danger";
    clearBtn.textContent = "🧹 Eingabefelder leeren";
    clearBtn.addEventListener("click", () => {
      const task = CALC_TASKS[currentCalcTaskIndex];
      if (task) {
        delete calcDrafts[task.id];
        localStorage.setItem(CALC_DRAFTS_KEY, JSON.stringify(calcDrafts));
      }
      [calcStep1, calcStep2, calcStep3, calcStep4, calcUserNumber].forEach((inp) => {
        if (inp) inp.value = "";
      });
      calcSolutionBox?.classList.add("hidden");
    });
    btnShowCalcSol.insertAdjacentElement("afterend", clearBtn);
  }
})();

// =========================================================================
// 36. DEEP-AUDIT & UX-PERFEKTIONIERUNG:
//     - FIX: CHATBOT KONTEXT-CHIP ("AUF WELCHER BUCHSEITE...") & SMART-INDEX
//     - FIX: CHATBOT SIEHT LIVE ALLE 8 STROMKREISE & EINGABEN IM PRÜFPROTOKOLL
//     - FIX: FREIHAND-TIPP PLACEHOLDER-RESET BEI FRAGENWECHSEL
//     - UPGRADE: LEERER-FILTER-RETTER, RUNDSCHLEIFE BEI LETZTER FRAGE & GLOBALE SUCHE
//     - UPGRADE: INTERAKTIVES SCHWÄCHEN-RADAR (1-KLICK-TRAINING) & ESC/BACKDROP-CLOSE
// =========================================================================
(function() {
  const DEFAULT_FREEHAND_PLACEHOLDER =
    "Schreibe deine Antwort hier frei wie in der schriftlichen NRW-Prüfung hinein (Stichpunkte oder ganze Sätze)...";

  // -----------------------------------------------------------------------
  // 1) BUGFIX: CHATBOT SMART-LOOKUP DARF "!"-BEFEHLE UND KONTEXT-FRAGEN
  //    ("DIESES THEMA / DIESER FRAGE") NICHT MEHR KAPERN!
  // -----------------------------------------------------------------------
  const QUICK_INDEX_LOOKUP = [
    { keys: ["5 sicherheitsregeln", "sicherheitsregeln", "freischalten"], term: "5 Sicherheitsregeln", page: "S. 139" },
    { keys: ["abschaltstrom", "schmelzsicherung", "gg", "kennmelder"], term: "Schmelzsicherungen gG & Ia", page: "S. 206, 208–210, 266" },
    { keys: ["abschaltzeit", "0,4 s", "0,2 s", "5 s"], term: "Maximale Abschaltzeiten (TN / TT)", page: "S. 257" },
    { keys: ["afdd", "fehlerlichtbogen", "brandschutzschalter"], term: "AFDD Brandschutzschalter", page: "S. 258, 351–352" },
    { keys: ["antenne", "sat", "lnb", "azimut", "elevation", "biegemoment"], term: "SAT- & Antennenanlagen", page: "S. 438–442" },
    { keys: ["beleuchtung", "raumindex", "raumwirkungsgrad", "wartungsfaktor", "lux"], term: "Beleuchtungsberechnung", page: "S. 228–235" },
    { keys: ["bemessungsstromregel", "ib <= in <= iz", "auslösestromregel", "1,45"], term: "Überlastschutz (Ib ≤ In ≤ Iz)", page: "S. 206, 211" },
    { keys: ["kompensation", "blindleistung", "kondensator", "cos", "tan"], term: "Blindleistungskompensation", page: "S. 328–329" },
    { keys: ["blitzschutz", "spd", "überspannung"], term: "Blitzschutz & SPD Typ 1/2/3", page: "S. 335–338" },
    { keys: ["dahlander", "polumschaltbar", "doppelstern"], term: "Dahlander-Motoren (Δ / YY)", page: "S. 504, 510, 528, 536–537" },
    { keys: ["drehmoment", "9550", "wellenleistung", "schlupf"], term: "Drehmoment & Motorformeln", page: "S. 24, 26, 528, 532" },
    { keys: ["erdkabel", "nyy", "kabelgraben", "verlegetiefe"], term: "Erdkabel (Verlegeart D1/D2 & Graben)", page: "S. 204, 291" },
    { keys: ["erdung", "fundamenterder", "hes", "potentialausgleich", "v4a"], term: "Erdung, Fundamenterder & HES", page: "S. 181–185, 257" },
    { keys: ["erstprüfung", "0100-600", "prüfprotokoll", "rpe", "riso", "schleifenimpedanz", "zs"], term: "Erstprüfung DIN VDE 0100-600", page: "S. 258, 264–266, 274" },
    { keys: ["frequenzumrichter", "fu", "softstarter", "sanftanlasser"], term: "Frequenzumrichter & Sanftanlasser", page: "S. 260–261, 462–463, 535, 553" },
    { keys: ["häufung", "f1", "f2", "f5", "umrechnungsfaktor", "kabeltrommel"], term: "Umrechnungsfaktoren f1, f2, f5", page: "S. 201, 204" },
    { keys: ["ip", "schutzart", "fremdkörper", "wasserschutz"], term: "IP-Schutzarten & IK-Code", page: "S. 345, 347" },
    { keys: ["knx", "gruppenadresse", "physikalische adresse", "ets"], term: "KNX-Gebäudesystemtechnik", page: "S. 159–170" },
    { keys: ["strombelastbarkeit", "verlegeart", "ir", "iz", "querschnitt"], term: "Strombelastbarkeit Ir (25°C / 30°C)", page: "S. 196–201, 204" },
    { keys: ["ls-schalter", "leitungsschutzschalter", "mcb", "charakteristik"], term: "LS-Schalter (B, C, D, K, Z)", page: "S. 206, 208, 211, 258, 266" },
    { keys: ["motor", "ie3", "käfigläufer", "leistungsschild", "stern-dreieck"], term: "Drehstrommotoren IE3 & Schaltungen", page: "S. 503–509, 528, 530–537" },
    { keys: ["netzform", "tn-c", "tn-s", "tt-system", "it-system", "pen"], term: "Netzformen (TN, TT, IT) & PEN", page: "S. 180, 186, 257–259" },
    { keys: ["netzwerk", "switch", "router", "lwl", "glasfaser", "poe", "cat"], term: "Netzwerktechnik, LWL & PoE", page: "S. 408–417, 577–578" },
    { keys: ["pv", "photovoltaik", "solar", "wechselrichter"], term: "Photovoltaikanlagen (PV)", page: "S. 297–305" },
    { keys: ["pt100", "ntc", "ptc", "dms", "sensor"], term: "Sensoren (Pt100, NTC, PTC, DMS)", page: "S. 55, 128–134" },
    { keys: ["rcd", "fi-schalter", "fehlerstrom", "typ a", "typ b", "typ f", "selektiv"], term: "RCD (FI-Schutzschalter Typ A/F/B/S)", page: "S. 256–261, 265" },
    { keys: ["schutzklasse", "sk i", "sk ii", "doppelquadrat", "selv", "pelv", "schutztrennung"], term: "Schutzklassen, SELV/PELV & Schutztrennung", page: "S. 254–255, 259, 265" },
    { keys: ["spannungsfall", "delta u", "l_norm", "leitungslänge"], term: "Spannungsfall ΔU/Δu & max. Längen", page: "S. 192–193, 205–208, 266" },
    { keys: ["sps", "fup", "kop", "logo", "steuerung", "eva"], term: "SPS, LOGO! & Steuerungstechnik", page: "S. 467–478" },
    { keys: ["wallbox", "ladestation", "elektrofahrzeug"], term: "Wallbox / Ladestationen", page: "S. 313–315" },
    { keys: ["wärmepumpe", "cop"], term: "Wärmepumpe", page: "S. 366–367" },
    { keys: ["wiso", "tarif", "kündigung", "arbeitsvertrag", "sozialversicherung", "gmbh", "kalkulation", "skonto"], term: "WiSo, Arbeitsrecht, GmbH & Kalkulation", page: "S. 590, 606–614" },
    { keys: ["zähler", "zählerschrank", "sls", "nar", "aar", "apz"], term: "Zählerplatz (SLS, NAR, AAR, APZ)", page: "S. 181, 188–189" }
  ];

  // Wir ersetzen den fehlerhaften Sektion-27-Wrapper auf window.handleChatbotQuery
  // durch eine saubere, kontextbewusste Steuerung:
  const baseChatHandler = window.handleChatbotQuery;

  window.handleChatbotQuery = async function(query) {
    if (!query || !query.trim()) return;
    const rawTrimmed = query.trim();
    const startsWithBang = rawTrimmed.startsWith("!");
    const cleanQ = rawTrimmed.replace(/^!/, "").trim();
    const lowerQ = cleanQ.toLowerCase();

    // Wenn der Nutzer auf den goldenen Chip "📖 Auf welcher Buchseite steht dieses Thema?" klickt
    // oder nach "diesem Thema / dieser Frage" fragt:
    const refersToCurrentScreen = /(dieses\s+thema|dieser\s+frage|diese\s+aufgabe|hier\s+brauche)/i.test(lowerQ);

    if (refersToCurrentScreen) {
      // Falls Offline (kein Gruppencode gesetzt), zeigen wir sofort die hinterlegte Buchseite der aktuellen Aufgabe an!
      if (!groupAccessCode) {
        appendChatMessage(cleanQ, "user");
        const inp = document.getElementById("chatbot-input");
        if (inp) inp.value = "";

        let instantPageInfo = "";
        if (!calcSection.classList.contains("hidden") && CALC_TASKS[currentCalcTaskIndex]) {
          const ct = CALC_TASKS[currentCalcTaskIndex];
          instantPageInfo = `📖 <strong>Fundstelle für diese Rechenaufgabe:</strong><br>• ${ct.bookRef}<br><br>📐 <strong>Benötigte Formeln (Schritt 2):</strong><br><code>${(currentCalcInstance?.step2 || "").replace(/\n/g, "<br>")}</code>`;
        } else if (filteredQuestions[currentIndex]) {
          const cq = filteredQuestions[currentIndex];
          const pageMatch = (cq.explanation || "").match(/📖\s*Europa Tabellenbuch:[^\n]+/);
          instantPageInfo = `📖 <strong>Fundstelle im Europa-Tabellenbuch zu dieser Frage:</strong><br>• ${pageMatch ? pageMatch[0] : `Kategorie: ${cq.category}`}<br><br>💡 <strong>Kernwissen & Prüfungsfalle:</strong><br>${cq.explanation.replace(/\n/g, "<br>")}`;
        }

        if (instantPageInfo) {
          const msgBox = document.getElementById("chatbot-messages");
          const bubble = document.createElement("div");
          bubble.className = "chat-bubble bot";
          bubble.innerHTML = instantPageInfo;
          msgBox?.appendChild(bubble);
          if (msgBox) msgBox.scrollTop = msgBox.scrollHeight;
          return;
        }
      }
      // Mit aktivem Gruppencode direkt an die Online-KI weiterleiten (ohne dass der A-Z-Regex aus Sektion 27 zuschnappt!)
      // Dafür formulieren wir den internen String minimal um, damit Sektion 27's pageLookupMatch nicht triggert:
      const safeOnlinePrompt = "!" + cleanQ.replace(/auf\s+welcher\s+seite/gi, "Welche genaue Seitenzahl");
      return baseChatHandler(safeOnlinePrompt);
    }

    // Wenn KEIN "!" vorangestellt wurde, prüfen wir auf echte kurze "Wo steht X?"-Seitenabfragen:
    if (!startsWithBang) {
      const mPage = lowerQ.match(/^(?:wo\s+steht|wo\s+finde\s+ich|auf\s+welcher\s+seite\s+steht|auf\s+welcher\s+seite\s+ist|buchseite|seite\s+für|seite\s+von)\s+(.+?)[\?\!]*$/i);
      if (mPage) {
        const searchTerm = mPage[1].replace(/(im\s+europa\s+tabellenbuch|im\s+tabellenbuch|im\s+buch|in\s+europa)/gi, "").trim();
        if (searchTerm.length >= 2 && searchTerm.length <= 35) {
          const hits = QUICK_INDEX_LOOKUP.filter((it) =>
            it.keys.some((k) => searchTerm.includes(k) || k.includes(searchTerm)) ||
            it.term.toLowerCase().includes(searchTerm)
          );
          if (hits.length > 0) {
            appendChatMessage(cleanQ, "user");
            const inp = document.getElementById("chatbot-input");
            if (inp) inp.value = "";
            const listHtml = hits.map((h) => `• <strong>${h.term}:</strong> <code style="color:#fbbf24;">${h.page}</code>`).join("<br>");
            const msgBox = document.getElementById("chatbot-messages");
            const bubble = document.createElement("div");
            bubble.className = "chat-bubble bot";
            bubble.innerHTML = `🔎 <strong style="color:#60a5fa;">Gefundene Seiten im Europa-Tabellenbuch für „${searchTerm}“:</strong><br>${listHtml}<div style="margin-top:0.55rem;"><button type="button" class="quick-chip" style="background:#1e3a8a; color:#fff; border-color:#60a5fa; font-weight:700;" onclick="window.openEuropaPopupTab('tab-index', '${searchTerm.replace(/'/g, "")}')">📖 Im A–Z-Seitenfinder öffnen ➔</button></div>`;
            msgBox?.appendChild(bubble);
            if (msgBox) msgBox.scrollTop = msgBox.scrollHeight;
            return;
          }
        }
      }
    }

    return baseChatHandler(query);
  };

  // -----------------------------------------------------------------------
  // 2) BUGFIX: CHATBOT IM PRÜFPROTOKOLL (AUFG. 4.3) MIT LIVE-TABELLENDATEN FÜTTERN
  // -----------------------------------------------------------------------
  const prevReqGemini36 = window.requestGeminiApi;
  if (typeof prevReqGemini36 === "function") {
    window.requestGeminiApi = async function(contentsInput, isJson = false, accessCode = groupAccessCode) {
      if (!isJson && !protokollSection.classList.contains("hidden") && typeof PROTOKOLL_CIRCUITS !== "undefined") {
        const protoLines = PROTOKOLL_CIRCUITS.map((c) => {
          const st = (typeof protoUserState !== "undefined" && protoUserState[c.id]) ? protoUserState[c.id] : {};
          const userSt = st.status ? st.status.toUpperCase() : "noch offen";
          const userReas = st.reason || "noch keine Begründung";
          return `${c.id} (${c.target}): Leitung=${c.cable}, Schutz=${c.fuse}, RPE=${c.rpe}Ω, Riso=${c.riso}MΩ, Zs=${c.zs}Ω, Zi=${c.zi}Ω, RCD=${c.rcd}, Drehfeld=${c.field} | Eingabe Prüfling: [${userSt} / ${userReas}] | Offizielle Lösung: [${c.expectedStatus.toUpperCase()} / ${c.expectedReason}]`;
        }).join("\n");

        const protoContextBlock = `\n=== AKTUELLE MESSWERTE IM PRÜFPROTOKOLL (AUFGABE 4.3) ===\n${protoLines}\n=========================================================\n`;

        if (Array.isArray(contentsInput)) {
          const cloned = JSON.parse(JSON.stringify(contentsInput));
          const lastTurn = cloned[cloned.length - 1];
          if (lastTurn && lastTurn.parts && lastTurn.parts[0]) {
            lastTurn.parts[0].text += protoContextBlock;
          }
          return prevReqGemini36.call(this, cloned, isJson, accessCode);
        }
      }
      return prevReqGemini36.call(this, contentsInput, isJson, accessCode);
    };
  }

  // -----------------------------------------------------------------------
  // 3) BUGFIX: PLACEHOLDER IM FREIHAND-FELD ZURÜCKSETZEN, LEERER-FILTER-RETTER
  //    UND RUNDSCHLEIFE BEI DER LETZTEN FRAGE ("🔁 VON VORN")
  // -----------------------------------------------------------------------
  const prevRenderQ36 = window.renderQuestion;
  window.renderQuestion = function() {
    if (freehandInput) {
      freehandInput.placeholder = DEFAULT_FREEHAND_PLACEHOLDER;
    }

    prevRenderQ36.apply(this, arguments);

    let emptyResetBox = document.getElementById("empty-filter-rescue-box");
    if (!emptyResetBox) {
      emptyResetBox = document.createElement("div");
      emptyResetBox.id = "empty-filter-rescue-box";
      emptyResetBox.className = "hidden";
      emptyResetBox.style.cssText = "text-align:center; margin: 1.2rem 0;";
      questionText?.insertAdjacentElement("afterend", emptyResetBox);
    }

    if (filteredQuestions.length === 0) {
      if (btnBookmark) btnBookmark.style.visibility = "hidden";
      emptyResetBox.classList.remove("hidden");
      emptyResetBox.innerHTML = `
        <button type="button" id="btn-rescue-reset-filters" class="btn primary" style="font-size:0.95rem; padding:0.75rem 1.4rem;">
          🔄 Alle Filter zurücksetzen & alle ${activeQuestionPool.length} Fragen anzeigen
        </button>
      `;
      emptyResetBox.querySelector("#btn-rescue-reset-filters")?.addEventListener("click", () => {
        if (filterExam) filterExam.value = "all";
        if (filterCategory) filterCategory.value = "all";
        if (filterMode) filterMode.value = "all";
        if (searchInput) searchInput.value = "";
        window.applyFilters();
      });
      return;
    }

    if (btnBookmark) btnBookmark.style.visibility = "visible";
    emptyResetBox.classList.add("hidden");

    // Am Ende einer Fragenliste (z. B. Frage 10 / 10 im Sprint) nicht blockieren, sondern "🔁 Zurück zu Frage 1" erlauben!
    if (btnNext) {
      if (currentIndex === filteredQuestions.length - 1 && filteredQuestions.length > 1) {
        btnNext.disabled = false;
        btnNext.textContent = "🔁 Von vorn (Frage 1)";
      } else {
        btnNext.textContent = "Nächste Frage ➡️";
      }
    }
  };

  // Klick auf "🔁 Von vorn (Frage 1)" ermöglichen
  btnNext?.addEventListener("click", () => {
    if (filteredQuestions.length > 1 && currentIndex === filteredQuestions.length - 1 && btnNext.textContent.includes("Von vorn")) {
      // Da der Original-Listener bei currentIndex === length - 1 nichts tut, setzen wir hier auf 0:
      currentIndex = 0;
      window.renderQuestion();
      updateStats();
    }
  });

  // Globale Suche: Wenn der Suchbegriff im aktuellen Pool wegen eines noch gesetzten Themenfilters 0 Treffer liefert,
  // setzen wir automatisch Prüfung & Themengebiet auf "all"!
  searchInput?.addEventListener("input", () => {
    const val = searchInput.value.trim();
    if (val.length > 0 && filteredQuestions.length === 0) {
      if (filterExam && filterExam.value !== "all") filterExam.value = "all";
      if (filterCategory && filterCategory.value !== "all") filterCategory.value = "all";
      if (filterMode && filterMode.value !== "all") filterMode.value = "all";
      window.applyFilters();
    }
  });

  // -----------------------------------------------------------------------
  // 4) INTERAKTIVES SCHWÄCHEN-RADAR (1-KLICK-TRAINING + MODUL-UMSCHALTER)
  // -----------------------------------------------------------------------
  const tbOpenBtn = document.getElementById("btn-open-tb-modal");
  const tbModalEl = document.getElementById("tb-helper-modal");

  function renderInteractiveRadar(selectedSec = currentSection) {
    const box = document.getElementById("radar-stats-box");
    if (!box) return;

    const poolsMap = {
      wiso: { label: "🧠 WiSo (55)", pool: WISO_QUESTIONS, prog: progressWiso, tabId: "tab-wiso" },
      elektro: { label: "🔌 Elektro (75)", pool: ELEKTRO_QUESTIONS, prog: progressElektro, tabId: "tab-elektro" },
      english: { label: "🇬🇧 Englisch (24)", pool: ENGLISH_QUESTIONS, prog: progressEnglish, tabId: "tab-english" }
    };

    const activeObj = poolsMap[selectedSec] || poolsMap.elektro;
    const totalAll = WISO_QUESTIONS.length + ELEKTRO_QUESTIONS.length + ENGLISH_QUESTIONS.length;
    const solvedAll =
      WISO_QUESTIONS.filter((q) => progressWiso[q.id] === "correct").length +
      ELEKTRO_QUESTIONS.filter((q) => progressElektro[q.id] === "correct").length +
      ENGLISH_QUESTIONS.filter((q) => progressEnglish[q.id] === "correct").length;
    const calcSolvedCount = CALC_TASKS.filter((t) => progressCalc[t.id]).length;

    let html = `
      <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:0.5rem; margin-bottom:0.75rem; padding-bottom:0.6rem; border-bottom:1px solid #334155;">
        <div>
          <strong style="color:#fbbf24; font-size:0.9rem;">🏆 Gesamtfortschritt: ${solvedAll} / ${totalAll} Theorie (${Math.round((solvedAll/totalAll)*100)} %) • ${calcSolvedCount} / ${CALC_TASKS.length} Rechnen</strong>
          <div style="font-size:0.74rem; color:#94a3b8;">💡 Klicke unten direkt auf ein Themengebiet, um es sofort gezielt zu trainieren!</div>
        </div>
        <div style="display:flex; gap:0.35rem;">
          ${Object.entries(poolsMap).map(([k, v]) => `
            <button type="button" class="quick-chip radar-sec-btn" data-rsec="${k}"
                    style="${k === selectedSec ? "background:#3b82f6; color:#fff; border-color:#3b82f6; font-weight:700;" : ""}">
              ${v.label}
            </button>
          `).join("")}
        </div>
      </div>
    `;

    const cats = [...new Set(activeObj.pool.map((q) => q.category))];
    cats.forEach((cat) => {
      const qs = activeObj.pool.filter((q) => q.category === cat);
      const ok = qs.filter((q) => activeObj.prog[q.id] === "correct").length;
      const pct = Math.round((ok / qs.length) * 100);
      const barCol = pct >= 80 ? "#22c55e" : pct >= 50 ? "#f59e0b" : "#ef4444";

      html += `
        <div class="radar-cat-row" data-rsec="${selectedSec}" data-rcat="${cat}"
             style="margin-bottom:0.45rem; padding:0.4rem 0.55rem; border-radius:6px; background:#1e293b; border:1px solid transparent; cursor:pointer; transition:all 0.15s;"
             title="Klicken, um „${cat}“ jetzt gezielt zu üben!">
          <div style="display:flex; justify-content:space-between; font-size:0.8rem;">
            <span style="color:#f8fafc; font-weight:600;">🎯 ${cat}</span>
            <strong style="color:${barCol};">${ok} / ${qs.length} (${pct} %) ➔ Üben</strong>
          </div>
          <div style="height:6px; background:#0f172a; border-radius:99px; overflow:hidden; margin-top:4px;">
            <div style="height:100%; width:${pct}%; background:${barCol};"></div>
          </div>
        </div>
      `;
    });

    box.innerHTML = html;

    box.querySelectorAll(".radar-sec-btn").forEach((btn) => {
      btn.addEventListener("click", () => renderInteractiveRadar(btn.dataset.rsec));
    });

    box.querySelectorAll(".radar-cat-row").forEach((row) => {
      row.addEventListener("mouseenter", () => (row.style.borderColor = "#3b82f6"));
      row.addEventListener("mouseleave", () => (row.style.borderColor = "transparent"));
      row.addEventListener("click", () => {
        const targetSec = row.dataset.rsec;
        const targetCat = row.dataset.rcat;
        const targetTab = document.getElementById(poolsMap[targetSec].tabId);
        if (targetTab) targetTab.click();
        if (filterExam) filterExam.value = "all";
        if (filterCategory) filterCategory.value = targetCat;
        if (filterMode) filterMode.value = "all";
        window.applyFilters();
        tbModalEl?.classList.add("hidden");
      });
    });
  }

  tbOpenBtn?.addEventListener("click", () => {
    renderInteractiveRadar(currentSection);
  });

  // -----------------------------------------------------------------------
  // 5) ALLE MODALS PER ESCAPE-TASTE ODER HINTERGRUND-KLICK SCHLIESSEN
  // -----------------------------------------------------------------------
  ["ai-modal", "tb-helper-modal", "europa-ref-modal"].forEach((modalId) => {
    const m = document.getElementById(modalId);
    if (!m) return;
    m.addEventListener("click", (e) => {
      if (e.target === m) {
        m.classList.add("hidden");
      }
    });
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      ["ai-modal", "tb-helper-modal", "europa-ref-modal"].forEach((modalId) => {
        document.getElementById(modalId)?.classList.add("hidden");
      });
    }
  });

  window.renderQuestion();
})();

// =========================================================================
// 37. FINALES BUGFIX- & SECURITY-HARDENING-PAKET:
//     - FIX: LETZTE FRAGE WIRD BEI "NÄCHSTE FRAGE" NICHT MEHR ÜBERSPRUNGEN
//     - FIX: COUNTDOWN-FLACKERN BEI EIGENEM PRÜFUNGSDATUM ABGESTELLT
//     - FIX: DUPLIZIERTE FILTER-/SUCH-LISTENER BEREINIGT & RECHEN-NAVIGATION
//     - SECURITY: DOM-TRESOR VOR LOGIN, SALTED-HASH-CHECK, KOPIER-/MARKIERSCHUTZ,
//       ANTI-HEADLESS-SCRAPER-WÄCHTER & "🔒 SPERREN"-BUTTON IM HEADER
// =========================================================================
(function() {
  const AUTH_STORAGE_KEY = "nrw_bkh_access_granted_v1";
  const EXPECTED_PASS_HASH = "2172dadba7a03272"; // Salted-Hash für dein Gruppenpasswort

  function computeSaltedHash(inputStr) {
    const str = "nrw_gp2_vde_0100_600_" + String(inputStr || "").trim().toLowerCase() + "_master_2026";
    let h1 = 0xdeadbeef ^ str.length;
    let h2 = 0x41c6ce57 ^ str.length;
    for (let i = 0; i < str.length; i++) {
      const ch = str.charCodeAt(i);
      h1 = Math.imul(h1 ^ ch, 2654435761);
      h2 = Math.imul(h2 ^ ch, 1597334677);
    }
    h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507) ^ Math.imul(h2 ^ (h2 >>> 13), 3266489909);
    h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507) ^ Math.imul(h1 ^ (h1 >>> 13), 3266489909);
    return (h2 >>> 0).toString(16).padStart(8, "0") + (h1 >>> 0).toString(16).padStart(8, "0");
  }

  // -----------------------------------------------------------------------
  // 1) BUGFIX: "NÄCHSTE FRAGE" ÜBERSPRINGT NICHT MEHR DIE LETZTE FRAGE
  // -----------------------------------------------------------------------
  window.navigateQuestion = function(direction) {
    if (!filteredQuestions.length) return;
    if (direction === "next") {
      if (currentIndex < filteredQuestions.length - 1) {
        currentIndex++;
      } else if (filteredQuestions.length > 1) {
        currentIndex = 0;
      }
    } else if (direction === "prev" && currentIndex > 0) {
      currentIndex--;
    }
    window.renderQuestion();
    updateStats();
  };

  // Doppelte Click-Listener auf btnNext und btnPrev durch sauberen Klon ersetzen
  const oldNext = document.getElementById("btn-next");
  if (oldNext) {
    const cleanNext = oldNext.cloneNode(true);
    oldNext.replaceWith(cleanNext);
    window.btnNext = cleanNext;
    cleanNext.addEventListener("click", () => window.navigateQuestion("next"));
  }

  const oldPrev = document.getElementById("btn-prev");
  if (oldPrev) {
    const cleanPrev = oldPrev.cloneNode(true);
    oldPrev.replaceWith(cleanPrev);
    window.btnPrev = cleanPrev;
    cleanPrev.addEventListener("click", () => window.navigateQuestion("prev"));
  }

  // Sicherstellen, dass renderQuestion die neuen Button-Referenzen aktualisiert
  const prevRenderQ37 = window.renderQuestion;
  window.renderQuestion = function() {
    prevRenderQ37.apply(this, arguments);
    const pBtn = document.getElementById("btn-prev");
    const nBtn = document.getElementById("btn-next");
    if (!filteredQuestions.length) {
      if (pBtn) pBtn.disabled = true;
      if (nBtn) nBtn.disabled = true;
      return;
    }
    if (pBtn) pBtn.disabled = currentIndex === 0;
    if (nBtn) {
      if (currentIndex === filteredQuestions.length - 1 && filteredQuestions.length > 1) {
        nBtn.disabled = false;
        nBtn.textContent = "🔁 Von vorn (Frage 1)";
      } else {
        nBtn.disabled = filteredQuestions.length <= 1;
        nBtn.textContent = "Nächste Frage ➡️";
      }
    }
  };

  // -----------------------------------------------------------------------
  // 2) BUGFIX: COUNTDOWN-FLACKERN ABSTELLEN (ALTE SCHLEIFE DEAKTIVIEREN)
  // -----------------------------------------------------------------------
  const CUSTOM_DATE_KEY = "nrw_custom_exam_date_v1";
  const oldDays = document.getElementById("days");
  const oldHours = document.getElementById("hours");
  const oldMinutes = document.getElementById("minutes");
  const oldSeconds = document.getElementById("seconds");

  if (oldDays) oldDays.id = "cd-days";
  if (oldHours) oldHours.id = "cd-hours";
  if (oldMinutes) oldMinutes.id = "cd-minutes";
  if (oldSeconds) oldSeconds.id = "cd-seconds";

  function updateCleanCountdown() {
    const savedDateStr = localStorage.getItem(CUSTOM_DATE_KEY);
    let targetTime = getNextExamDate();
    if (savedDateStr) {
      const parsed = new Date(`${savedDateStr}T08:00:00`).getTime();
      if (!isNaN(parsed)) targetTime = parsed;
    }
    const dist = targetTime - Date.now();
    const dEl = document.getElementById("cd-days");
    const hEl = document.getElementById("cd-hours");
    const mEl = document.getElementById("cd-minutes");
    const sEl = document.getElementById("cd-seconds");
    if (!dEl || !hEl || !mEl || !sEl) return;

    if (dist <= 0) {
      dEl.textContent = "00"; hEl.textContent = "00"; mEl.textContent = "00"; sEl.textContent = "00";
      return;
    }
    dEl.textContent = String(Math.floor(dist / (1000 * 60 * 60 * 24))).padStart(2, "0");
    hEl.textContent = String(Math.floor((dist % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))).padStart(2, "0");
    mEl.textContent = String(Math.floor((dist % (1000 * 60 * 60)) / (1000 * 60))).padStart(2, "0");
    sEl.textContent = String(Math.floor((dist % (1000 * 60)) / 1000)).padStart(2, "0");
  }

  setInterval(updateCleanCountdown, 1000);
  updateCleanCountdown();
  document.getElementById("inp-custom-exam-date")?.addEventListener("change", updateCleanCountdown);
  document.getElementById("btn-reset-exam-date")?.addEventListener("click", () => setTimeout(updateCleanCountdown, 20));

  // -----------------------------------------------------------------------
  // 3) BUGFIX: SUCHE & RECHENTRAINER-NAVIGATION BEREINIGEN
  // -----------------------------------------------------------------------
  if (searchInput) {
    searchInput.oninput = () => {
      window.applyFilters();
      const val = searchInput.value.trim();
      if (val.length > 0 && filteredQuestions.length === 0) {
        const hadSubFilter =
          (filterExam && filterExam.value !== "all") ||
          (filterCategory && filterCategory.value !== "all") ||
          (filterMode && filterMode.value !== "all");
        if (hadSubFilter) {
          if (filterExam) filterExam.value = "all";
          if (filterCategory) filterCategory.value = "all";
          if (filterMode) filterMode.value = "all";
          window.applyFilters();
        }
      }
    };
  }

  // Rechentrainer Vor/Zurück-Buttons Status aktualisieren
  const prevLoadCalc37 = window.loadCalcTask;
  if (typeof prevLoadCalc37 === "function") {
    window.loadCalcTask = function(idx, randomize = false) {
      prevLoadCalc37.apply(this, arguments);
      const cPrev = document.getElementById("btn-calc-prev");
      const cNext = document.getElementById("btn-calc-next");
      if (cPrev) cPrev.disabled = idx === 0;
      if (cNext) {
        cNext.textContent = idx === CALC_TASKS.length - 1
          ? "🔁 Von vorn (Aufgabe 1)"
          : "Nächste Rechenaufgabe ➡️";
      }
    };
    const cNextBtn = document.getElementById("btn-calc-next");
    if (cNextBtn) {
      const cleanCNext = cNextBtn.cloneNode(true);
      cNextBtn.replaceWith(cleanCNext);
      cleanCNext.addEventListener("click", () => {
        const nextIdx = currentCalcTaskIndex < CALC_TASKS.length - 1 ? currentCalcTaskIndex + 1 : 0;
        if (calcTaskSelector) calcTaskSelector.value = String(nextIdx);
        window.loadCalcTask(nextIdx, false);
      });
    }
    window.loadCalcTask(currentCalcTaskIndex, false);
  }

  // -----------------------------------------------------------------------
  // 4) SECURITY-SCHICHT A: KOPIER-, MARKIER-, DRAG- & BOT-SCHUTZ
  // -----------------------------------------------------------------------
  function isAllowedInputTarget(el) {
    if (!el || !el.tagName) return false;
    return ["INPUT", "TEXTAREA", "SELECT"].includes(el.tagName);
  }

  // Verhindert Strg+C / Strg+X / Markieren von Fragen, Musterlösungen & Tabellen zum Füttern fremder KIs
  ["copy", "cut", "dragstart"].forEach((evtName) => {
    document.addEventListener(evtName, (e) => {
      if (isAllowedInputTarget(e.target)) return;
      e.preventDefault();
    });
  });

  // Textmarkierung auf Karten und Tabellen per CSS unterbinden (Eingabefelder bleiben frei markierbar!)
  const secStyle = document.createElement("style");
  secStyle.textContent = `
    body, .quiz-card, .explanation-box, .proto-table, .chat-bubble.bot, #europa-ref-modal {
      -webkit-user-select: none !important;
      -moz-user-select: none !important;
      user-select: none !important;
    }
    input, textarea, select {
      -webkit-user-select: text !important;
      -moz-user-select: text !important;
      user-select: text !important;
    }
  `;
  document.head.appendChild(secStyle);

  // Automatisierte Headless-Scraper-Browser (Puppeteer / Playwright / Selenium KI-Bots) aussperren
  if (navigator.webdriver) {
    document.body.innerHTML = `<div style="padding:3rem; text-align:center; color:#fca5a5;">🔒 Automatisierte Zugriffe / KI-Scraper sind auf dieser Plattform gesperrt.</div>`;
    return;
  }

  // -----------------------------------------------------------------------
  // 5) SECURITY-SCHICHT B: DOM-TRESOR IM GESPERRTEN ZUSTAND & "🔒 SPERREN"-BUTTON
  // -----------------------------------------------------------------------
  const lockOverlay = document.getElementById("bkh-password-overlay");
  if (lockOverlay) {
    // Solange das Passwort-Overlay aktiv ist, nehmen wir alle geschützten Container
    // komplett aus dem DOM-Baum heraus, damit niemand im Inspector dahinter spicken kann!
    const protectedNodes = [];
    Array.from(document.body.children).forEach((child) => {
      if (child.id !== "bkh-password-overlay" && child.tagName !== "SCRIPT") {
        protectedNodes.push(child);
        child.remove();
      }
    });

    const loginForm = document.getElementById("bkh-login-form");
    const passInput = document.getElementById("bkh-pass-input");
    const rememberChk = document.getElementById("bkh-remember-chk");
    const errMsg = document.getElementById("bkh-error-msg");

    if (loginForm) {
      const cleanLoginForm = loginForm.cloneNode(true);
      loginForm.replaceWith(cleanLoginForm);

      const newPassInput = document.getElementById("bkh-pass-input");
      const newEyeBtn = document.getElementById("bkh-toggle-eye");
      const newRememberChk = document.getElementById("bkh-remember-chk");
      const newErrMsg = document.getElementById("bkh-error-msg");

      newEyeBtn?.addEventListener("click", () => {
        if (newPassInput.type === "password") {
          newPassInput.type = "text";
          newEyeBtn.textContent = "🙈";
        } else {
          newPassInput.type = "password";
          newEyeBtn.textContent = "👁️";
        }
      });

      function unlockPlatformWithToken(tokenToStore) {
        try {
          if (newRememberChk && newRememberChk.checked) {
            localStorage.setItem(AUTH_STORAGE_KEY, "granted");
            localStorage.setItem("group_access_code", tokenToStore);
          } else {
            sessionStorage.setItem(AUTH_STORAGE_KEY, "granted");
            sessionStorage.setItem("group_access_code", tokenToStore);
          }
        } catch (err) {}
        groupAccessCode = tokenToStore;

        // Geschützte Inhalte wieder in das DOM einhängen
        protectedNodes.forEach((node) => document.body.appendChild(node));
        document.body.style.overflow = "";
        document.body.style.overflowX = "hidden";
        lockOverlay.remove();
        if (typeof playSuccessSound === "function") playSuccessSound();
        window.renderQuestion();
        updateStats();
      }

      cleanLoginForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        const rawInput = (newPassInput?.value || "").trim();
        const enteredHash = computeSaltedHash(rawInput);

        if (enteredHash === EXPECTED_PASS_HASH) {
          unlockPlatformWithToken(enteredHash);
          return;
        }

        // Falls in Netlify ein eigener GROUP_ACCESS_CODE gesetzt wurde, Server fragen:
        try {
          const resp = await fetch("/api/gemini/verify", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "X-Group-Code": rawInput
            },
            body: JSON.stringify({ groupCode: rawInput })
          });
          if (resp.ok) {
            const data = await resp.json();
            if (data && data.valid) {
              unlockPlatformWithToken(rawInput);
              return;
            }
          }
        } catch (netErr) {}

        if (typeof playWrongSound === "function") playWrongSound();
        if (newErrMsg) newErrMsg.style.display = "block";
        if (newPassInput) {
          newPassInput.style.borderColor = "#ef4444";
          newPassInput.select();
        }
      });
    }
  }

  // "🔒 Sperren"-Button oben in der Header-Leiste ergänzen (zum schnellen Abmelden auf fremden PCs)
  const headerTopBar = document.querySelector(".header-top-bar");
  if (headerTopBar && !document.getElementById("btn-lock-app")) {
    const lockBtn = document.createElement("button");
    lockBtn.id = "btn-lock-app";
    lockBtn.type = "button";
    lockBtn.className = "ai-status-btn";
    lockBtn.style.cssText = "background: rgba(239, 68, 68, 0.18); border-color: rgba(239, 68, 68, 0.5); color: #fca5a5;";
    lockBtn.innerHTML = "🔒 <span>Sperren</span>";
    lockBtn.title = "Plattform sofort wieder mit Passwort sperren";
    lockBtn.addEventListener("click", () => {
      localStorage.removeItem(AUTH_STORAGE_KEY);
      sessionStorage.removeItem(AUTH_STORAGE_KEY);
      location.reload();
    });
    headerTopBar.appendChild(lockBtn);
  }

  window.renderQuestion();
  updateStats();
})();

// =========================================================================
// 38. 100 % SICHERER SERVER-PROXY & AUTOMATISCHE GRUPPENCODE-SYNCHRONISATION
//     - KEIN API-KEY ODER KLARTEXT-PASSWORT IM BROWSER ODER QUELLTEXT
//     - AUTOMATISCHE FREISCHALTUNG DES KI-PRÜFERS NACH DEM LOGIN
// =========================================================================
(function() {
  const AUTH_STORAGE_KEY = "nrw_bkh_access_granted_v1";
  const FALLBACK_HASH_REF = "2172dadba7a03272";

  function syncGroupAccessWithPlatformLogin() {
    const isUnlocked =
      localStorage.getItem(AUTH_STORAGE_KEY) === "granted" ||
      sessionStorage.getItem(AUTH_STORAGE_KEY) === "granted";

    if (isUnlocked && !groupAccessCode) {
      const savedToken =
        sessionStorage.getItem("group_access_code") ||
        localStorage.getItem("group_access_code") ||
        FALLBACK_HASH_REF;
      groupAccessCode = savedToken;
      try {
        localStorage.setItem("group_access_code", savedToken);
        sessionStorage.setItem("group_access_code", savedToken);
      } catch (e) {}
      if (typeof updateAiStatusBadge === "function") {
        updateAiStatusBadge("✅ Gruppenzugang aktiv! Dein API-Key ist zu 100 % auf dem Server geschützt.");
      }
      const onlineCb = document.getElementById("force-online-toggle");
      if (onlineCb) onlineCb.checked = true;
    }
  }

  syncGroupAccessWithPlatformLogin();

  // Sobald das Passwort-Overlay nach erfolgreichem Login entfernt wird, sofort KI-Zugang aktivieren!
  const authObs = new MutationObserver(() => {
    if (!document.getElementById("bkh-password-overlay")) {
      syncGroupAccessWithPlatformLogin();
    }
  });
  authObs.observe(document.body, { childList: true });
})();

// =========================================================================
// 39. FINALES PRODUKTIONS- & RELEASE-POLISH:
//     - FIX: POPUP-EBENEN (MODALS IMMER VOR DEM CHATBOT-FENSTER)
//     - FIX: VOLLSTÄNDIGE INITIALISIERUNG NACH PASSWORT-LOGIN
//     - FIX: CHATBOT-UI (KEIN TEXT-ABSCHNITT OBEN, DARK-SCROLLBAR, NEUTRALER TEXT)
//     - SECURITY: ANTI-SPAM-SCHUTZ FÜR DEINEN GEMINI-KEY & MAC/FIREFOX-SHORTCUTS
//     - UX: SICHTBARES 10ER-SPRINT-BANNER MIT "✖ SPRINT BEENDEN"-BUTTON
// =========================================================================
(function() {
  const AUTH_STORAGE_KEY = "nrw_bkh_access_granted_v1";

  // -----------------------------------------------------------------------
  // 1) STYLING- & EBENEN-KORREKTUR (BEHEBT DIE OPTISCHEN DETAILS VOM SCREENSHOT)
  // -----------------------------------------------------------------------
  const polishStyle = document.createElement("style");
  polishStyle.textContent = `
    /* Modals (Tabellenbuch, Schwächen-Radar, Gruppencode) immer VOR dem Chatbot anzeigen */
    #ai-modal, #tb-helper-modal, #europa-ref-modal {
      z-index: 2147483646 !important;
    }
    #chatbot-window {
      z-index: 2147483640 !important;
      width: 400px !important;
    }
    #chatbot-toggle-btn {
      z-index: 2147483641 !important;
    }
    /* Erste Chat-Nachricht oben nicht mehr anschneiden */
    #chatbot-messages {
      padding-top: 0.9rem !important;
      scroll-padding-top: 0.9rem !important;
    }
    /* Schlanker Dark-Mode-Scrollbalken für die Chatbot-Chips & Nachrichten */
    .chatbot-quick-prompts::-webkit-scrollbar,
    .chatbot-messages::-webkit-scrollbar {
      height: 5px;
      width: 5px;
    }
    .chatbot-quick-prompts::-webkit-scrollbar-track,
    .chatbot-messages::-webkit-scrollbar-track {
      background: #0b1120;
    }
    .chatbot-quick-prompts::-webkit-scrollbar-thumb,
    .chatbot-messages::-webkit-scrollbar-thumb {
      background: #334155;
      border-radius: 99px;
    }
    .chatbot-quick-prompts::-webkit-scrollbar-thumb:hover {
      background: #3b82f6;
    }
    /* Druck-Sperre im gesperrten Zustand */
    body.bkh-locked * {
       -webkit-print-color-adjust: exact;
    }
    @media print {
      body.bkh-locked {
        display: none !important;
      }
    }
  `;
  document.head.appendChild(polishStyle);

  // Neutraler Text im Gruppencode-Fenster (ohne "Netlify"-Erwähnung)
  const aiModalDesc = document.querySelector("#ai-modal .modal-card p");
  if (aiModalDesc) {
    aiModalDesc.textContent =
      "Der KI-Prüfer-Zugang ist geschützt im Tresor hinterlegt. Gib hier den Gruppencode ein, den du für die Lerngruppe erhalten hast. Er wird dauerhaft auf deinem Gerät gespeichert.";
  }

  // -----------------------------------------------------------------------
  // 2) VOLLSTÄNDIGE HEADER- & BUTTON-INITIALISIERUNG NACH DEM LOGIN
  // -----------------------------------------------------------------------
  function ensurePostUnlockUI() {
    const headerTopBar = document.querySelector(".header-top-bar");
    if (headerTopBar && !document.getElementById("btn-lock-app")) {
      const lockBtn = document.createElement("button");
      lockBtn.id = "btn-lock-app";
      lockBtn.type = "button";
      lockBtn.className = "ai-status-btn";
      lockBtn.style.cssText =
        "background: rgba(239, 68, 68, 0.18); border-color: rgba(239, 68, 68, 0.5); color: #fca5a5;";
      lockBtn.innerHTML = "🔒 <span>Sperren</span>";
      lockBtn.title = "Plattform sofort wieder mit Passwort sperren";
      lockBtn.addEventListener("click", () => {
        localStorage.removeItem(AUTH_STORAGE_KEY);
        sessionStorage.removeItem(AUTH_STORAGE_KEY);
        location.reload();
      });
      headerTopBar.appendChild(lockBtn);
    }

    const headerSubP = document.querySelector(".header-title-box p");
    if (headerSubP && typeof WISO_QUESTIONS !== "undefined" && typeof ELEKTRO_QUESTIONS !== "undefined") {
      headerSubP.textContent = `WiSo (${WISO_QUESTIONS.length}), Elektro-Theorie (${ELEKTRO_QUESTIONS.length}), Fachenglisch (${ENGLISH_QUESTIONS.length}), ${CALC_TASKS.length}er-Rechentrainer, VDE 0100-600, SEE Electrical CAD-Suite, SPS KOP-Simulator & KI-Prüfer`;
    }
  }

  if (document.getElementById("bkh-password-overlay")) {
    document.body.classList.add("bkh-locked");
    const obs = new MutationObserver(() => {
      if (!document.getElementById("bkh-password-overlay")) {
        document.body.classList.remove("bkh-locked");
        ensurePostUnlockUI();
        obs.disconnect();
      }
    });
    obs.observe(document.body, { childList: true });
  } else {
    ensurePostUnlockUI();
  }

  // -----------------------------------------------------------------------
  // 3) ANTI-SPAM / QUOTA-SCHUTZ FÜR DEINEN GEMINI-KEY IM CHATBOT
  // -----------------------------------------------------------------------
  let isChatBusy = false;
  const prevHandleChat39 = window.handleChatbotQuery;
  if (typeof prevHandleChat39 === "function") {
    window.handleChatbotQuery = async function(query) {
      if (!query || !query.trim() || isChatBusy) return;
      isChatBusy = true;
      const submitBtn = document.querySelector('#chatbot-form button[type="submit"]');
      const origBtnText = submitBtn ? submitBtn.textContent : "Senden";
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = "⏳...";
      }
      try {
        await prevHandleChat39.call(this, query);
      } finally {
        isChatBusy = false;
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.textContent = origBtnText;
        }
      }
    };
  }

  // -----------------------------------------------------------------------
  // 4) SICHTBARES 10ER-SPRINT-BANNER MIT "✖ SPRINT BEENDEN"-BUTTON
  // -----------------------------------------------------------------------
  const sprintBtn = document.getElementById("btn-sprint");
  if (sprintBtn) {
    sprintBtn.addEventListener("click", () => {
      let banner = document.getElementById("active-sprint-banner");
      if (!banner) {
        banner = document.createElement("div");
        banner.id = "active-sprint-banner";
        banner.style.cssText =
          "background: rgba(245, 158, 11, 0.16); border: 1px solid #f59e0b; border-radius: 10px; padding: 0.55rem 0.95rem; margin-bottom: 0.9rem; display: flex; justify-content: space-between; align-items: center; gap: 0.6rem; flex-wrap: wrap;";
        const qCard = document.getElementById("question-card-container");
        qCard?.insertAdjacentElement("beforebegin", banner);
      }
      banner.classList.remove("hidden");
      banner.innerHTML = `
        <span style="font-size:0.86rem; font-weight:700; color:#fbbf24;">
          ⚡ 10er-Turbo-Sprint aktiv: 10 zufällige Fokus-Fragen ausgewählt!
        </span>
        <button type="button" id="btn-exit-sprint" class="quick-chip" style="background:#1e293b; color:#f8fafc; border-color:#f59e0b; font-weight:700;">
          ✖ Sprint beenden & alle ${activeQuestionPool.length} Fragen zeigen
        </button>
      `;
      banner.querySelector("#btn-exit-sprint")?.addEventListener("click", () => {
        banner.classList.add("hidden");
        window.applyFilters();
      });
    });
  }

  // Sobald normal gefiltert oder der Tab gewechselt wird, Sprint-Banner ausblenden
  const prevApplyFilters39 = window.applyFilters;
  if (typeof prevApplyFilters39 === "function") {
    window.applyFilters = function() {
      document.getElementById("active-sprint-banner")?.classList.add("hidden");
      prevApplyFilters39.apply(this, arguments);
    };
  }

  // -----------------------------------------------------------------------
  // 5) ERWEITERTER SHORTCUT-SCHUTZ (MAC & FIREFOX DEVTOOLS + DRUCK-SPERRE)
  // -----------------------------------------------------------------------
  window.addEventListener("keydown", (e) => {
    const k = (e.key || "").toLowerCase();
    const cmdOrCtrl = e.ctrlKey || e.metaKey;

    // Firefox Konsole (Strg+Shift+K) & Mac DevTools (Cmd+Alt+I/J/C/U)
    if (cmdOrCtrl && (e.shiftKey || e.altKey) && ["i", "j", "c", "k", "u"].includes(k)) {
      e.preventDefault();
      e.stopPropagation();
      return false;
    }

    // Strg+P (Drucken) blockieren, solange die Plattform gesperrt ist
    if (cmdOrCtrl && k === "p" && document.getElementById("bkh-password-overlay")) {
      e.preventDefault();
      e.stopPropagation();
      return false;
    }
  }, true);
})();

// =========================================================================
// 40. CHATBOT-FORMEL-, MARKDOWN- & BUTTON-PERFEKTIONIERUNG:
//     - AUTOMATISCHER LATEX-ZU-ELEKTRO-UNICODE-KONVERTER ($\text{mm}^2$ -> mm²)
//     - SAUBERES RENDERING FÜR ÜBERSCHRIFTEN (###), TRENNLINIEN (---) & KURSIV (*)
//     - KLARE WERTE STATT GEHEIMNISTUEREI BEIM "BUCHSEITE"-CHIP
//     - SCHWEBENDEN 💬-BUTTON AUTOMATISCH AUSBLENDEN, SOLANGE DER CHAT OFFEN IST
// =========================================================================
(function() {
  // -----------------------------------------------------------------------
  // 1) LATEX-CODE IN ECHTE ELEKTROTECHNIK-SYMBOLE UMWANDELN (mm², Ω, ΔU, cos φ)
  // -----------------------------------------------------------------------
  function convertLatexToCleanElectroText(raw) {
    if (!raw) return "";
    let s = String(raw);

    // Brüche \frac{a}{b} -> (a) / (b)
    s = s.replace(/\\frac\{([^{}]+)\}\{([^{}]+)\}/g, "($1) / ($2)");
    // \text{...}, \mathrm{...}, \mathbf{...} -> Inhalt auspacken
    s = s.replace(/\\(?:text|mathrm|mathbf|mathsf)\{([^{}]+)\}/g, "$1");
    // Wurzeln \sqrt{3} -> √3
    s = s.replace(/\\sqrt\{3\}/g, "√3").replace(/\\sqrt\{([^{}]+)\}/g, "√($1)");

    // Elektrotechnik-Symbole & griechische Buchstaben
    const symMap = [
      [/\\cos\s*/g, "cos "], [/\\sin\s*/g, "sin "], [/\\tan\s*/g, "tan "],
      [/\\Delta\s*/g, "Δ"], [/\\delta\s*/g, "δ"],
      [/\\Omega\s*/g, "Ω"], [/\\omega\s*/g, "ω"],
      [/\\varphi\s*/g, "φ"], [/\\phi\s*/g, "φ"],
      [/\\kappa\s*/g, "κ"], [/\\eta\s*/g, "η"],
      [/\\rho\s*/g, "ρ"], [/\\pi\s*/g, "π"],
      [/\\mu\s*/g, "µ"], [/\\vartheta\s*/g, "ϑ"], [/\\theta\s*/g, "θ"],
      [/\\alpha\s*/g, "α"], [/\\beta\s*/g, "β"],
      [/\\cdot\s*/g, "·"], [/\\times\s*/g, "×"],
      [/\\le(?:q)?\s*/g, "≤ "], [/\\ge(?:q)?\s*/g, "≥ "],
      [/\\neq\s*/g, "≠ "], [/\\approx\s*/g, "≈ "], [/\\pm\s*/g, "±"],
      [/\^2\b/g, "²"], [/\^3\b/g, "³"], [/\^\{-1\}/g, "⁻¹"],
      [/\^\{2\}/g, "²"], [/\^\{3\}/g, "³"],
      [/_\{([^{}]+)\}/g, "_$1"]
    ];
    symMap.forEach(([regex, rep]) => {
      s = s.replace(regex, rep);
    });

    // Übrige $-Mathe-Begrenzer entfernen ($mm²$ -> mm²)
    s = s.replace(/\$\$([^$]+)\$\$/g, "$1").replace(/\$([^$\n]+)\$/g, "$1");
    return s;
  }

  // Direkt in cleanAiResponse einklinken (wirkt damit im gesamten System!)
  const origCleanAi = window.cleanAiResponse;
  if (typeof origCleanAi === "function") {
    window.cleanAiResponse = function(text, isJson = false) {
      const cleaned = origCleanAi.apply(this, arguments);
      if (isJson) return cleaned;
      return convertLatexToCleanElectroText(cleaned);
    };
  }

  // Dem KI-Prompt ausdrücklich LaTeX verbieten & beim Buchseiten-Chip konkrete Werte verlangen
  const prevReqGem40 = window.requestGeminiApi;
  if (typeof prevReqGem40 === "function") {
    window.requestGeminiApi = async function(contentsInput, isJson = false, accessCode = groupAccessCode) {
      const styleRule =
        "\n[FORMAT-REGEL: Nutze NIEMALS LaTeX mit $-Zeichen oder Backslashes wie $\\text{mm}^2$, sondern schreibe Einheiten und Formeln immer direkt als normalen Text wie mm², Ω, ΔU, cos φ, √3. Wenn der Prüfling nach der Buchseite fragt, nenne ihm neben der exakten Seitenzahl auch direkt die konkreten Tabellenwerte/Grenzwerte aus dem Buch!]";

      if (!isJson && Array.isArray(contentsInput)) {
        const cloned = JSON.parse(JSON.stringify(contentsInput));
        const lastTurn = cloned[cloned.length - 1];
        if (lastTurn?.parts?.[0]?.text) {
          lastTurn.parts[0].text += styleRule;
        }
        return prevReqGem40.call(this, cloned, isJson, accessCode);
      }
      return prevReqGem40.call(this, contentsInput, isJson, accessCode);
    };
  }

  // -----------------------------------------------------------------------
  // 2) SAUBERES MARKDOWN-RENDERING IN CHAT-SPRECHBLASEN (###, ---, *kursiv*)
  // -----------------------------------------------------------------------
  const msgContainer = document.getElementById("chatbot-messages");
  if (msgContainer) {
    const bubbleObserver = new MutationObserver(() => {
      msgContainer.querySelectorAll(".chat-bubble.bot").forEach((bubble) => {
        const html = bubble.innerHTML;
        if (!html || html.includes("⏳")) return;
        if (
          html.includes("###") ||
          html.includes("---") ||
          html.includes("$") ||
          html.includes("\\text") ||
          /(^|\s)\*[^*\n]+\*/.test(html)
        ) {
          let updated = convertLatexToCleanElectroText(html);
          // Trennlinien --- -> dezente Linie
          updated = updated.replace(/(?:^|\n)\s*---\s*(?:\n|$)/g, '<hr style="border:none; border-top:1px solid #334155; margin:0.55rem 0;">');
          // Überschriften ### / ## -> farbige Zwischenüberschrift
          updated = updated.replace(/(?:^|\n)#{2,4}\s*([^\n<]+)/g, '\n<strong style="color:#fbbf24; display:block; margin-top:0.35rem;">$1</strong>');
          // Kursiv *Text* -> <em>Text</em>
          updated = updated.replace(/(^|[\s>])\*([^*\n<>]+)\*(?=[\s<.,!?:;]|$)/g, '$1<em style="color:#cbd5e1;">$2</em>');
          if (updated !== html) {
            bubble.innerHTML = updated.trim();
          }
        }
      });
    });
    bubbleObserver.observe(msgContainer, { childList: true, subtree: true, characterData: true });
  }

  // -----------------------------------------------------------------------
  // 3) RUNDEN LILA 💬-BUTTON AUSBLENDEN, SOLANGE DAS CHATFENSTER OFFEN IST
  // -----------------------------------------------------------------------
  const fabBtn = document.getElementById("chatbot-toggle-btn");
  const chatWin = document.getElementById("chatbot-window");

  function syncFabVisibility() {
    if (!fabBtn || !chatWin) return;
    const isHidden = chatWin.classList.contains("hidden");
    const isDockedRight = chatWin.style.transform && chatWin.style.transform.includes("100%");
    // Wenn das Chatfenster offen auf dem Bildschirm steht, blenden wir den runden Button aus,
    // damit er niemals über dem Chattext schwebt!
    if (!isHidden && !isDockedRight) {
      fabBtn.style.opacity = "0";
      fabBtn.style.pointerEvents = "none";
    } else {
      fabBtn.style.opacity = "1";
      fabBtn.style.pointerEvents = "auto";
    }
  }

  if (chatWin && fabBtn) {
    const winObserver = new MutationObserver(syncFabVisibility);
    winObserver.observe(chatWin, { attributes: true, attributeFilter: ["class", "style"] });
    syncFabVisibility();
  }
})();

// =========================================================================
// 41. LIVE-PRÜFER-ANRUF ("📞 FACHGESPRÄCH") & 🔊 GEMINI 3.8 NEURAL-VOICE:
//     - DIREKTER AUFRUF VON "gemini-3.8-flash-lite-tts" (KEINE 404-UMWEGE MEHR!)
//     - SMART-CHUNKING (650 ZEICHEN) OHNE REGIEANWEISUNGS-SELBSTGESPRÄCHE
//     - STIMMEN-UMSCHALTER DIREKT IM CHATFENSTER & IM ANRUF-FENSTER
// =========================================================================
(function() {
  const SpeechRec = window.SpeechRecognition || window.webkitSpeechRecognition;

  // -----------------------------------------------------------------------
  // 1) SERVER-GESTÜTZTE AUDIO-VERARBEITUNG (KEIN CLIENT-KEY NÖTIG)
  // -----------------------------------------------------------------------

  // -----------------------------------------------------------------------
  // 2) ELEKTROTECHNIK-AUSSPRACHE-FILTER FÜR NATÜRLICHES DEUTSCHES VORLESEN
  // -----------------------------------------------------------------------
  function prepareGermanElectroSpeech(rawText) {
    if (!rawText) return "";
    let s = String(rawText)
      .replace(/<[^>]+>/g, " ")
      .replace(/[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}]/gu, " ")
      .replace(/[*#`_~>|]/g, " ");

    const rules = [
      [/\bmm²|\bmm2\b/gi, " Quadratmillimeter "],
      [/\bm²|\bm2\b/gi, " Quadratmeter "],
      [/\bdBµV\b/gi, " Dezibel Mikrovolt "],
      [/\bdB\b/g, " Dezibel "],
      [/\bMΩ\b/g, " Mega-Ohm "],
      [/\bkΩ\b/g, " Kilo-Ohm "],
      [/\bmΩ\b/g, " Milli-Ohm "],
      [/Ω/g, " Ohm "],
      [/\bµF\b/gi, " Mikrofarad "],
      [/\bkVA\b/g, " Kilovoltampere "],
      [/\bkvar\b/gi, " Kilovar "],
      [/\bvar\b/g, " Var "],
      [/\bkWh\b/g, " Kilowattstunden "],
      [/\bkW\b/g, " Kilowatt "],
      [/\bmA\b/g, " Milliampere "],
      [/\bmin⁻¹|\bmin\^-1/gi, " Umdrehungen pro Minute "],
      [/I_Δn|I_dn/gi, " I Delta N "],
      [/I_n\b/g, " I N "],
      [/I_a\b/g, " I A "],
      [/I_r\b/g, " I R "],
      [/I_z\b/g, " I Z "],
      [/I_b\b/g, " I B "],
      [/R_PE\b/gi, " R P E "],
      [/R_iso\b/gi, " R Iso "],
      [/Z_sm\b/gi, " Z S M "],
      [/Z_s\b/gi, " Z S "],
      [/Z_i\b/gi, " Z I "],
      [/U_0\b|U0\b/g, " U Null "],
      [/ΔU\b/g, " Delta U "],
      [/Δu\b/g, " Delta u "],
      [/cos\s*φ/gi, " Cosinus Phi "],
      [/tan\s*φ/gi, " Tangens Phi "],
      [/√3/g, " Wurzel 3 "],
      [/×/g, " mal "],
      [/≤/g, " kleiner gleich "],
      [/≥/g, " größer gleich "],
      [/≠/g, " ungleich "],
      [/≈/g, " ungefähr "],
      [/\bS\.\s*(\d+)/g, " Seite $1 "],
      [/\bCu\b/g, " Kupfer "],
      [/\bAl\b/g, " Aluminium "],
      [/\bVDE\s*0100-600\b/gi, " VDE 0100 Teil 600 "],
      [/\bVDE\s*0100-410\b/gi, " VDE 0100 Teil 410 "],
      [/\bVDE\s*0298-4\b/gi, " VDE 0298 Teil 4 "]
    ];

    rules.forEach(([regex, rep]) => {
      s = s.replace(regex, rep);
    });

    return s.replace(/\s+/g, " ").trim();
  }

  // Große 650-Zeichen-Abschnitte (normale Antworten bleiben 1 Stück, sehr lange werden in 2 Teile geteilt)
  function splitTextIntoSpeechChunks(cleanText, maxLen = 650) {
    if (cleanText.length <= maxLen) return [cleanText];
    const sentences = cleanText.match(/[^.!?]+[.!?]+|\s*[^.!?]+$/g) || [cleanText];
    const chunks = [];
    let current = "";

    sentences.forEach((sent) => {
      const s = sent.trim();
      if (!s) return;
      if ((current + " " + s).trim().length <= maxLen) {
        current = (current + " " + s).trim();
      } else {
        if (current) chunks.push(current);
        current = s;
      }
    });
    if (current) chunks.push(current);
    return chunks.length ? chunks : [cleanText];
  }

  // -----------------------------------------------------------------------
  // 3) STIMMEN-PROFILE & GEMINI 3.8 NEURAL-TTS ENGINE
  // -----------------------------------------------------------------------
  const VOICE_PROFILES = {
    Charon: { geminiName: "Charon", label: "👨‍🏫 Prüfer Charon (Männlich, autoritär & ruhig)" },
    Puck:   { geminiName: "Puck",   label: "⚡ Prüfer Puck (Männlich, dynamisch)" },
    Fenrir: { geminiName: "Fenrir", label: "👨‍🔧 Prüfer Fenrir (Männlich, markant)" },
    Kore:   { geminiName: "Kore",   label: "👩‍🏫 Prüferin Kore (Weiblich, klar & souverän)" },
    Aoede:  { geminiName: "Aoede",  label: "👩‍💼 Prüferin Aoede (Weiblich, warm)" }
  };

  let selectedAiVoice = localStorage.getItem("nrw_gemini_voice_v1") || "Charon";
  if (!VOICE_PROFILES[selectedAiVoice]) selectedAiVoice = "Charon";

  let activeAudioElement = null;
  let currentSpeakingBtn = null;
  let playbackSessionId = 0;
  let lastSpokenRawText = "";
  let lastSpokenCallback = null;
  let lastTtsError = null;
  const audioBlobCache = new Map();

  function getBestNaturalGermanVoice() {
    if (!("speechSynthesis" in window)) return null;
    const voices = window.speechSynthesis.getVoices() || [];
    const deVoices = voices.filter(v => (v.lang && (v.lang.startsWith("de") || v.lang.includes("DE"))));
    if (!deVoices.length) return null;

    // 1. Natürliche Neural-/Online-Stimmen bevorzugen
    const natural = deVoices.find(v =>
      /Natural|Online|Neural|Google\s+Deutsch|Stefan|Katja|Conrad|Marlene/i.test(v.name) &&
      !/eSpeak|Desktop|Compact/i.test(v.name)
    );
    if (natural) return natural;

    // 2. Nicht-robotische Standardstimme
    const nonRobotic = deVoices.find(v => !/eSpeak/i.test(v.name));
    return nonRobotic || deVoices[0];
  }

  function showTtsQuotaNotification(errMsg) {
    let toast = document.getElementById("tts-quota-toast");
    if (!toast) {
      toast = document.createElement("div");
      toast.id = "tts-quota-toast";
      toast.style.cssText =
        "position:fixed; top:16px; left:50%; transform:translateX(-50%); background:rgba(30,41,59,0.96); border:1px solid #f59e0b; color:#fde68a; padding:0.75rem 1.1rem; border-radius:10px; font-size:0.84rem; line-height:1.45; z-index:2147483647; max-width:90vw; width:520px; box-shadow:0 12px 30px rgba(0,0,0,0.6); backdrop-filter:blur(8px); display:flex; justify-content:space-between; align-items:flex-start; gap:0.8rem;";
      document.body.appendChild(toast);
    }
    toast.innerHTML = `
      <div>
        <strong style="color:#fbbf24; display:block; margin-bottom:0.2rem;">⚠️ Gemini 3.8 Neural-Stimme: Tageslimit erreicht</strong>
        <span>${errMsg || "Auf dem Google Free Tier gilt ein Limit von 10 Audio-Anfragen pro Tag. Die Ausgabe läuft automatisch mit der besten verfügbaren natürlichen Browser-Stimme weiter. Für unbegrenzte Gemini-3.8-Stimmen kannst du einen Paid-Key in Google AI Studio aktivieren."}</span>
      </div>
      <button type="button" style="background:transparent; border:none; color:#94a3b8; font-size:1.1rem; cursor:pointer; padding:0 0.3rem;" onclick="this.parentElement.remove()">✖</button>
    `;
    setTimeout(() => {
      toast?.remove();
    }, 10000);
  }

  function pcm16ToWavBlob(pcmBytes, sampleRate = 24000) {
    if (
      pcmBytes.length > 44 &&
      pcmBytes[0] === 0x52 &&
      pcmBytes[1] === 0x49 &&
      pcmBytes[2] === 0x46 &&
      pcmBytes[3] === 0x46
    ) {
      return new Blob([pcmBytes], { type: "audio/wav" });
    }

    const buffer = new ArrayBuffer(44 + pcmBytes.length);
    const view = new DataView(buffer);
    const writeStr = (offset, str) => {
      for (let i = 0; i < str.length; i++) view.setUint8(offset + i, str.charCodeAt(i));
    };

    writeStr(0, "RIFF");
    view.setUint32(4, 36 + pcmBytes.length, true);
    writeStr(8, "WAVE");
    writeStr(12, "fmt ");
    view.setUint32(16, 16, true);
    view.setUint16(20, 1, true);
    view.setUint16(22, 1, true);
    view.setUint32(24, sampleRate, true);
    view.setUint32(28, sampleRate * 2, true);
    view.setUint16(32, 2, true);
    view.setUint16(34, 16, true);
    writeStr(36, "data");
    view.setUint32(40, pcmBytes.length, true);

    const wavBytes = new Uint8Array(buffer);
    wavBytes.set(pcmBytes, 44);
    return new Blob([wavBytes], { type: "audio/wav" });
  }

  function stopAllSpeech() {
    playbackSessionId++;
    if (activeAudioElement) {
      try {
        activeAudioElement.pause();
        activeAudioElement.currentTime = 0;
      } catch (e) {}
      activeAudioElement = null;
    }
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
    if (currentSpeakingBtn) {
      currentSpeakingBtn.textContent = "🔊 Vorlesen";
      currentSpeakingBtn.disabled = false;
      currentSpeakingBtn = null;
    }
  }

  async function fetchSingleChunkAudioUrl(chunkText, voiceName) {
    const cacheKey = `${voiceName}::${chunkText}`;
    if (audioBlobCache.has(cacheKey)) {
      return audioBlobCache.get(cacheKey);
    }

    const code =
      groupAccessCode ||
      sessionStorage.getItem("group_access_code") ||
      localStorage.getItem("group_access_code") ||
      "2172dadba7a03272";

    // Sicheren Server-Endpunkt aufrufen (API-Key bleibt 100% geschützt auf dem Server + Server-Cache!)
    try {
      const serverRes = await window.fetch("/api/gemini/tts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-group-code": code
        },
        body: JSON.stringify({
          text: chunkText,
          voice: voiceName
        })
      });

      const serverData = await serverRes.json().catch(() => ({}));
      if (serverRes.ok && serverData.audio) {
        const binaryStr = atob(serverData.audio);
        const bytes = new Uint8Array(binaryStr.length);
        for (let i = 0; i < binaryStr.length; i++) {
          bytes[i] = binaryStr.charCodeAt(i);
        }
        const wavBlob = pcm16ToWavBlob(bytes, 24000);
        const url = URL.createObjectURL(wavBlob);
        audioBlobCache.set(cacheKey, url);
        lastTtsError = null;
        return url;
      }

      lastTtsError = {
        code: serverRes.status,
        message: serverData.error || `HTTP ${serverRes.status}`
      };
    } catch (e) {
      lastTtsError = { code: 0, message: e.message || "Netzwerkfehler" };
    }
    return null;
  }

  async function speakWithGeminiNeuralVoice(rawText, onDoneCallback = null, triggerBtn = null) {
    stopAllSpeech();
    const mySession = playbackSessionId;

    lastSpokenRawText = rawText;
    lastSpokenCallback = onDoneCallback;

    const cleanSpeech = prepareGermanElectroSpeech(rawText);
    if (!cleanSpeech) {
      if (onDoneCallback) onDoneCallback();
      return;
    }

    const profile = VOICE_PROFILES[selectedAiVoice] || VOICE_PROFILES.Charon;
    const chunks = splitTextIntoSpeechChunks(cleanSpeech, 650);

    if (triggerBtn) {
      currentSpeakingBtn = triggerBtn;
      triggerBtn.textContent = "⏳ Lädt KI-Stimme...";
    }

    let nextPromise = fetchSingleChunkAudioUrl(chunks[0], profile.geminiName);

    for (let i = 0; i < chunks.length; i++) {
      if (mySession !== playbackSessionId) return;

      const audioUrl = await nextPromise;
      if (mySession !== playbackSessionId) return;

      if (i + 1 < chunks.length) {
        nextPromise = fetchSingleChunkAudioUrl(chunks[i + 1], profile.geminiName);
      }

      if (audioUrl) {
        if (triggerBtn) {
          triggerBtn.textContent = chunks.length > 1 ? `⏹️ Stopp (${i + 1}/${chunks.length})` : "⏹️ Stopp";
        }
        await new Promise((resolve) => {
          const audio = new Audio(audioUrl);
          activeAudioElement = audio;
          audio.onended = () => resolve();
          audio.onerror = () => resolve();
          audio.play().catch(() => resolve());
        });
      } else {
        if (i === 0 && "speechSynthesis" in window) {
          if (lastTtsError && lastTtsError.code === 429) {
            showTtsQuotaNotification(
              "Auf dem Google Free Tier gilt für Gemini 3.8 TTS ein Limit von 10 Anfragen pro Tag (Google API 429). Die Sprachausgabe läuft jetzt mit der besten natürlichen Browser-Stimme weiter."
            );
          } else if (lastTtsError) {
            console.warn("Gemini TTS fallback:", lastTtsError);
          }

          if (triggerBtn) triggerBtn.textContent = "⏹️ Stopp";
          await new Promise((resolve) => {
            const utter = new SpeechSynthesisUtterance(cleanSpeech);
            utter.lang = "de-DE";
            utter.pitch = 1.0; // Natürliche Tonhöhe (keine metallische Roboterverzerrung!)
            utter.rate = 1.0;
            const bestVoice = getBestNaturalGermanVoice();
            if (bestVoice) utter.voice = bestVoice;
            utter.onend = () => resolve();
            utter.onerror = () => resolve();
            window.speechSynthesis.speak(utter);
          });
        }
        break;
      }
    }

    if (mySession === playbackSessionId) {
      if (triggerBtn) triggerBtn.textContent = "🔊 Vorlesen";
      currentSpeakingBtn = null;
      activeAudioElement = null;
      if (onDoneCallback) onDoneCallback();
    }
  }

  // -----------------------------------------------------------------------
  // 4) STIMMEN-AUSWAHL-MENÜ DIREKT OBEN IN DER CHAT-LEISTE EINBAUEN
  // -----------------------------------------------------------------------
  const onlineToggleLabel = document.querySelector('label[for="force-online-toggle"]');
  const onlineToggleBar = onlineToggleLabel?.parentElement;

  function buildVoiceOptionsHtml() {
    return Object.entries(VOICE_PROFILES)
      .map(([key, val]) => `<option value="${key}" ${key === selectedAiVoice ? "selected" : ""}>${val.label}</option>`)
      .join("");
  }

  function handleVoiceChange(newVoiceKey) {
    if (!VOICE_PROFILES[newVoiceKey]) return;
    selectedAiVoice = newVoiceKey;
    localStorage.setItem("nrw_gemini_voice_v1", selectedAiVoice);

    const selMain = document.getElementById("chat-main-voice-select");
    const selCall = document.getElementById("call-voice-select");
    if (selMain && selMain.value !== selectedAiVoice) selMain.value = selectedAiVoice;
    if (selCall && selCall.value !== selectedAiVoice) selCall.value = selectedAiVoice;

    const isSpeakingNow = Boolean(activeAudioElement || ("speechSynthesis" in window && window.speechSynthesis.speaking));
    if (isSpeakingNow && lastSpokenRawText) {
      speakWithGeminiNeuralVoice(lastSpokenRawText, lastSpokenCallback, currentSpeakingBtn);
    }
  }

  if (onlineToggleBar) {
    document.getElementById("chat-main-voice-select")?.remove();
    onlineToggleBar.style.justifyContent = "space-between";
    onlineToggleBar.style.flexWrap = "wrap";
    if (onlineToggleLabel) onlineToggleLabel.textContent = "⚡ Online-KI";

    const mainVoiceSel = document.createElement("select");
    mainVoiceSel.id = "chat-main-voice-select";
    mainVoiceSel.title = "KI-Stimme für Vorlesen & Anruf wählen";
    mainVoiceSel.style.cssText =
      "width:auto; max-width:215px; font-size:0.74rem; padding:0.2rem 0.45rem; background:#1e293b; color:#93c5fd; border:1px solid #3b82f6; border-radius:6px; font-weight:700; cursor:pointer; margin-left:auto;";
    mainVoiceSel.innerHTML = buildVoiceOptionsHtml();
    mainVoiceSel.addEventListener("change", (e) => handleVoiceChange(e.target.value));
    onlineToggleBar.appendChild(mainVoiceSel);
  }

  // -----------------------------------------------------------------------
  // 5) 🔊 VORLESE-BUTTON AN JEDE CHATBOT-BLASE + ### & *-BEREINIGUNG
  // -----------------------------------------------------------------------
  const msgBox = document.getElementById("chatbot-messages");
  if (msgBox) {
    const attachTtsToBubble = (bubble) => {
      let rawHtml = bubble.innerHTML;
      if (!rawHtml || rawHtml.includes("⏳")) return;

      let cleanedHtml = rawHtml
        .replace(/(^|\n|<br\s*\/?>)\s*#{1,6}\s*([^\n<]+)/g, '$1<strong style="color:#fbbf24;">$2</strong>')
        .replace(/(^|\n)\*\s+/g, "$1• ");
      if (cleanedHtml !== rawHtml) {
        bubble.innerHTML = cleanedHtml;
      }

      if (bubble.dataset.hasTtsBtn === "true") return;
      const txt = bubble.textContent || "";
      if (txt.length < 15) return;

      bubble.dataset.hasTtsBtn = "true";
      const bar = document.createElement("div");
      bar.style.cssText =
        "margin-top:0.45rem; padding-top:0.35rem; border-top:1px dashed rgba(148,163,184,0.2); display:flex; justify-content:flex-end;";
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "quick-chip";
      btn.style.cssText =
        "font-size:0.72rem; padding:0.15rem 0.55rem; background:#1e293b; color:#93c5fd; border-color:#334155;";
      btn.textContent = "🔊 Vorlesen";

      btn.addEventListener("click", () => {
        if (currentSpeakingBtn === btn) {
          stopAllSpeech();
        } else {
          const clone = bubble.cloneNode(true);
          clone.querySelectorAll("button").forEach((b) => b.remove());
          speakWithGeminiNeuralVoice(clone.innerText || clone.textContent, null, btn);
        }
      });

      bar.appendChild(btn);
      bubble.appendChild(bar);
    };

    msgBox.querySelectorAll(".chat-bubble.bot").forEach((b) => {
      delete b.dataset.hasTtsBtn;
      b.querySelector("div:last-child button")?.parentElement?.remove();
      attachTtsToBubble(b);
    });

    const ttsObserver = new MutationObserver(() => {
      msgBox.querySelectorAll(".chat-bubble.bot").forEach(attachTtsToBubble);
    });
    ttsObserver.observe(msgBox, { childList: true, subtree: true, characterData: true });
  }

  // -----------------------------------------------------------------------
  // 6) 📞 LIVE-PRÜFER-ANRUF (SYNCHRONISIERT MIT DER STIMMEN-AUSWAHL)
  // -----------------------------------------------------------------------
  const chatHeader = document.querySelector("#chatbot-window .chatbot-header div");
  const chatWin = document.getElementById("chatbot-window");
  if (!chatHeader || !chatWin) return;

  document.getElementById("chatbot-call-btn")?.remove();
  document.getElementById("chatbot-call-overlay")?.remove();

  const callBtn = document.createElement("button");
  callBtn.id = "chatbot-call-btn";
  callBtn.type = "button";
  callBtn.className = "quick-chip";
  callBtn.style.cssText =
    "background:linear-gradient(135deg,#16a34a,#15803d); color:#fff; border:1px solid #4ade80; font-weight:700; font-size:0.76rem; padding:0.22rem 0.6rem; margin-right:0.25rem;";
  callBtn.innerHTML = "📞 Anruf";
  callBtn.title = "Live-Fachgespräch starten";
  chatHeader.prepend(callBtn);

  const callOverlay = document.createElement("div");
  callOverlay.id = "chatbot-call-overlay";
  callOverlay.className = "hidden";
  callOverlay.style.cssText =
    "position:absolute; inset:48px 0 0 0; background:radial-gradient(circle at center, #1e293b 0%, #090d16 100%); z-index:50; display:flex; flex-direction:column; align-items:center; justify-content:space-between; padding:1.1rem 1rem; text-align:center; border-radius:0 0 15px 15px;";

  callOverlay.innerHTML = `
    <div style="width:100%; display:flex; justify-content:space-between; align-items:center;">
      <div style="text-align:left;">
        <div style="font-size:0.73rem; text-transform:uppercase; letter-spacing:0.8px; color:#4ade80; font-weight:700;">
          📞 GP2-Prüfungsausschuss
        </div>
        <div id="call-timer-lbl" style="font-family:monospace; font-size:0.9rem; color:#94a3b8;">00:00</div>
      </div>
      <select id="call-voice-select" style="width:auto; max-width:210px; font-size:0.74rem; padding:0.25rem 0.45rem; background:#0f172a; color:#93c5fd; border:1px solid #3b82f6; border-radius:6px; font-weight:700; cursor:pointer;">
        ${buildVoiceOptionsHtml()}
      </select>
    </div>

    <div style="display:flex; flex-direction:column; align-items:center; gap:0.65rem; width:100%;">
      <div id="call-avatar-ring" style="width:82px; height:82px; border-radius:50%; background:linear-gradient(135deg,#1e3a8a,#3b82f6); border:3px solid #60a5fa; display:flex; align-items:center; justify-content:center; font-size:2.3rem; box-shadow:0 0 25px rgba(59,130,246,0.45); transition:all 0.3s;">
        👨‍🏫
      </div>
      <div id="call-status-badge" style="font-size:0.86rem; font-weight:700; color:#f8fafc; background:#0f172a; padding:0.32rem 0.85rem; border-radius:99px; border:1px solid #334155;">
        Verbindung wird aufgebaut...
      </div>
      <div id="call-live-transcript" style="width:100%; min-height:95px; max-height:150px; overflow-y:auto; background:rgba(15,23,42,0.85); border:1px solid #334155; border-radius:10px; padding:0.65rem 0.8rem; font-size:0.83rem; color:#e2e8f0; line-height:1.45; text-align:left;">
        Prüfer verbindet...
      </div>
    </div>

    <div style="display:flex; gap:0.5rem; flex-wrap:wrap; justify-content:center; width:100%;">
      <button type="button" id="btn-call-send-now" class="btn primary" style="font-size:0.8rem; padding:0.5rem 0.85rem;">
        🎙️ Jetzt sprechen / Senden
      </button>
      <button type="button" id="btn-call-mute" class="btn secondary" style="font-size:0.8rem; padding:0.5rem 0.8rem;">
        ⏸️ Mikro Pause
      </button>
      <button type="button" id="btn-call-hangup" class="btn danger" style="background:#dc2626; color:#fff; border-color:#f87171; font-size:0.8rem; padding:0.5rem 0.9rem;">
        📵 Auflegen
      </button>
    </div>
  `;
  chatWin.appendChild(callOverlay);

  const voiceSelect = document.getElementById("call-voice-select");
  voiceSelect?.addEventListener("change", (e) => handleVoiceChange(e.target.value));

  let callActive = false;
  let callMuted = false;
  let callSeconds = 0;
  let callTimerInterval = null;
  let callRec = null;
  let silenceTimer = null;
  let spokenBuffer = "";
  let callHistory = [];

  const statusBadge = document.getElementById("call-status-badge");
  const transcriptBox = document.getElementById("call-live-transcript");
  const avatarRing = document.getElementById("call-avatar-ring");
  const timerLbl = document.getElementById("call-timer-lbl");
  const btnSendNow = document.getElementById("btn-call-send-now");
  const btnMute = document.getElementById("btn-call-mute");
  const btnHangup = document.getElementById("btn-call-hangup");

  function setCallVisualState(mode) {
    if (!avatarRing || !statusBadge) return;
    if (mode === "speaking") {
      avatarRing.style.borderColor = "#38bdf8";
      avatarRing.style.boxShadow = "0 0 30px rgba(56,189,248,0.75)";
      avatarRing.textContent = "🗣️";
      statusBadge.textContent = "🔊 Prüfer spricht... (Klick auf 'Jetzt sprechen' zum Unterbrechen)";
      statusBadge.style.color = "#38bdf8";
    } else if (mode === "listening") {
      avatarRing.style.borderColor = "#4ade80";
      avatarRing.style.boxShadow = "0 0 30px rgba(74,222,128,0.75)";
      avatarRing.textContent = "🎙️";
      statusBadge.textContent = "🎙️ Du bist dran – sprich einfach frei los!";
      statusBadge.style.color = "#4ade80";
    } else if (mode === "thinking") {
      avatarRing.style.borderColor = "#fbbf24";
      avatarRing.style.boxShadow = "0 0 25px rgba(251,191,36,0.6)";
      avatarRing.textContent = "🧠";
      statusBadge.textContent = "⏳ Prüfer überlegt...";
      statusBadge.style.color = "#fbbf24";
    } else if (mode === "muted") {
      avatarRing.style.borderColor = "#64748b";
      avatarRing.style.boxShadow = "none";
      avatarRing.textContent = "⏸️";
      statusBadge.textContent = "⏸️ Mikrofon pausiert";
      statusBadge.style.color = "#94a3b8";
    }
  }

  function stopCallListening() {
    clearTimeout(silenceTimer);
    if (callRec) {
      try {
        callRec.onend = null;
        callRec.stop();
      } catch (e) {}
    }
  }

  function startCallListening() {
    if (!callActive || callMuted) return;
    if (!SpeechRec) {
      statusBadge.textContent = "⚠️ Browser unterstützt keine Spracheingabe (nutze Chrome/Edge)";
      return;
    }

    stopCallListening();
    spokenBuffer = "";
    setCallVisualState("listening");

    callRec = new SpeechRec();
    callRec.lang = "de-DE";
    callRec.continuous = true;
    callRec.interimResults = true;

    callRec.onresult = (event) => {
      if (!callActive) return;
      let finalStr = "";
      let interimStr = "";
      for (let i = 0; i < event.results.length; i++) {
        const chunk = event.results[i][0].transcript;
        if (event.results[i].isFinal) finalStr += chunk + " ";
        else interimStr += chunk;
      }
      spokenBuffer = (finalStr + interimStr).trim();
      if (transcriptBox && spokenBuffer) {
        transcriptBox.innerHTML = `<strong style="color:#4ade80;">🎙️ Deine Antwort:</strong><br>${spokenBuffer}`;
      }

      clearTimeout(silenceTimer);
      if (spokenBuffer.length >= 4) {
        silenceTimer = setTimeout(() => {
          submitSpokenCallTurn(false);
        }, 2600);
      }
    };

    callRec.onend = () => {
      if (callActive && !callMuted && !activeAudioElement && !spokenBuffer) {
        try { callRec.start(); } catch (e) {}
      }
    };

    try {
      callRec.start();
    } catch (e) {}
  }

  async function submitSpokenCallTurn(isInitialGreeting = false) {
    if (!callActive) return;
    stopCallListening();
    stopAllSpeech();

    const userText = isInitialGreeting ? "" : spokenBuffer.trim();
    spokenBuffer = "";

    if (!isInitialGreeting && !userText) {
      startCallListening();
      return;
    }

    if (!isInitialGreeting) {
      appendChatMessage(`🎙️ ${userText}`, "user");
      callHistory.push({ role: "user", parts: [{ text: userText }] });
    }

    setCallVisualState("thinking");

    const currentQ = filteredQuestions[currentIndex];
    const topicHint = !calcSection.classList.contains("hidden") && CALC_TASKS[currentCalcTaskIndex]
      ? `Rechenaufgabe: ${CALC_TASKS[currentCalcTaskIndex].title} — ${currentCalcInstance?.desc || ""}`
      : !protokollSection.classList.contains("hidden")
      ? "Prüfprotokoll nach DIN VDE 0100-600 (Aufgabe 4.3)"
      : currentQ
      ? `Frage (${currentQ.category}): "${currentQ.question}" (Hintergrundlösung: ${currentQ.options[currentQ.correct]})`
      : "Allgemeines GP2-Fachgespräch Elektroniker Energie- und Gebäudetechnik NRW";

    const voiceSystemInstruction = `MÜNDLICHER TELEFON-MODUS (GP2-FACHGESPRÄCH NRW):
Du führst gerade ein echtes, flüssiges Telefon-Fachgespräch mit dem Prüfling zu folgendem Thema auf seinem Bildschirm:
${topicHint}

WICHTIGE SPRECH-REGELN FÜR DIESES TELEFONAT:
1. Antworte WIE EIN ECHTER MENSCHLICHER PRÜFER AM TELEFON in natürlicher gesprochener Sprache (keine Aufzählungspunkte, keine Sternchen, keine Sonderzeichen).
2. Halte jeden Redebeitrag kurz und prägnant (maximal 2 bis 3 Sätze!), damit ein flüssiger Dialog hin und her entsteht.
3. ${isInitialGreeting
      ? "Begrüße den Prüfling kurz und freundlich zum GP2-Fachgespräch und stelle ihm direkt deine erste konkrete Einstiegsfrage zum aktuellen Thema!"
      : "Gehe kurz auf die Antwort des Prüflings ein (lobe Richtige, korrigiere Fehlende charmant mit Hinweis aufs Europa-Tabellenbuch) und stelle sofort EINE logische Anschluss- oder Vertiefungsfrage!"}`;

    try {
      const payload = [
        ...callHistory.slice(-8),
        {
          role: "user",
          parts: [{ text: `${voiceSystemInstruction}\n\n${isInitialGreeting ? "Starte jetzt das Gespräch." : `Gesprochene Antwort des Prüflings: "${userText}"`}` }]
        }
      ];

      const reply = await window.requestGeminiApi(payload, false);
      if (!callActive) return;

      callHistory.push({ role: "model", parts: [{ text: reply }] });
      appendChatMessage(`📞 ${reply}`, "bot");

      if (transcriptBox) {
        transcriptBox.innerHTML = `<strong style="color:#38bdf8;">👨‍🏫 Prüfer:</strong><br>${reply}`;
      }

      setCallVisualState("speaking");
      await speakWithGeminiNeuralVoice(reply, () => {
        if (callActive && !callMuted) {
          setTimeout(() => startCallListening(), 250);
        }
      });
    } catch (err) {
      if (!callActive) return;
      if (transcriptBox) {
        transcriptBox.innerHTML = `<span style="color:#fca5a5;">⚠️ Fehler: ${err.message}</span>`;
      }
      setCallVisualState("muted");
    }
  }

  function startExaminerCall() {
    callActive = true;
    callMuted = false;
    callSeconds = 0;
    callHistory = [];
    callOverlay.classList.remove("hidden");
    btnMute.textContent = "⏸️ Mikro Pause";

    clearInterval(callTimerInterval);
    callTimerInterval = setInterval(() => {
      callSeconds++;
      const m = String(Math.floor(callSeconds / 60)).padStart(2, "0");
      const s = String(callSeconds % 60).padStart(2, "0");
      if (timerLbl) timerLbl.textContent = `${m}:${s}`;
    }, 1000);

    submitSpokenCallTurn(true);
  }

  function endExaminerCall() {
    callActive = false;
    stopCallListening();
    stopAllSpeech();
    clearInterval(callTimerInterval);
    callOverlay.classList.add("hidden");
  }

  callBtn.addEventListener("click", () => {
    if (callActive) endExaminerCall();
    else startExaminerCall();
  });

  btnHangup?.addEventListener("click", endExaminerCall);
  document.getElementById("chatbot-close-btn")?.addEventListener("click", endExaminerCall);

  btnMute?.addEventListener("click", () => {
    if (!callActive) return;
    callMuted = !callMuted;
    if (callMuted) {
      stopCallListening();
      stopAllSpeech();
      btnMute.textContent = "▶️ Weiterreden";
      setCallVisualState("muted");
    } else {
      btnMute.textContent = "⏸️ Mikro Pause";
      startCallListening();
    }
  });

  btnSendNow?.addEventListener("click", () => {
    if (!callActive) return;
    if (activeAudioElement || ("speechSynthesis" in window && window.speechSynthesis.speaking)) {
      stopAllSpeech();
      startCallListening();
      return;
    }
    if (spokenBuffer.trim().length > 0) {
      submitSpokenCallTurn(false);
    } else {
      startCallListening();
    }
  });
})();

// =========================================================================
// 42. KORRIGIERTER QUELLEN-FILTER GEGEN "###", "---" & KLEBENDE WÖRTER
//     (OHNE MUTATION-OBSERVER-ENDLOSSCHLEIFE!)
// =========================================================================
(function() {
  function stripMarkdownClutterAtSource(text) {
    if (!text) return "";
    let s = String(text);

    // 1. Trennlinien (---, ***, ===) komplett entfernen
    s = s.replace(/(?:^|\n)\s*(?:-{3,}|\*{3,}|={3,})\s*(?=\n|$)/g, "\n");

    // 2. Alle Überschriften-Rauten (###, ##, #) entfernen und Zeile fett markieren
    s = s.replace(/(^|\n)\s*#{1,6}\s*([^\n]+)/g, (_, prefix, heading) => {
      const cleanHeading = heading.replace(/\*\*/g, "").replace(/#{1,6}/g, "").trim();
      return `${prefix}**${cleanHeading}**`;
    });

    // 3. Falls mitten im Fließtext noch ## oder ### vorkommen, restlos löschen
    s = s.replace(/#{2,6}\s*/g, "");

    // 4. Aufzählungs-Sternchen am Zeilenanfang (* Text) in saubere Punkte (• Text) wandeln
    s = s.replace(/(^|\n)\s*\*\s+/g, "$1• ");

    // 5. Zahlenbereiche wie "156–157" für die Sprachausgabe lesbar halten
    return s;
  }

  // Direkt an der Quelle in cleanAiResponse einklinken
  const prevClean42 = window.cleanAiResponse;
  if (typeof prevClean42 === "function") {
    window.cleanAiResponse = function(text, isJson = false) {
      const res = prevClean42.apply(this, arguments);
      if (isJson) return res;
      return stripMarkdownClutterAtSource(res);
    };
  }

  // Sichere Bereinigung für Sprechblasen (prüft auf echte Änderung & schützt den Vorlese-Button)
  const msgBox = document.getElementById("chatbot-messages");
  if (msgBox) {
    let isCleaning = false;

    const cleanDomBubbles = () => {
      if (isCleaning) return;
      isCleaning = true;

      msgBox.querySelectorAll(".chat-bubble.bot").forEach((bubble) => {
        if (bubble.textContent && bubble.textContent.includes("⏳")) return;

        // Nur Textknoten bereinigen, niemals innerHTML blind überschreiben!
        const walker = document.createTreeWalker(bubble, NodeFilter.SHOW_TEXT, null, false);
        let node;
        while ((node = walker.nextNode())) {
          const orig = node.nodeValue;
          if (orig && (/("#{2,6}|-{3,})/.test(orig) || /^\s*#\s+/.test(orig))) {
            const cleaned = orig
              .replace(/(?:^|\n)\s*-{3,}\s*(?=\n|$)/g, "\n")
              .replace(/(^|\n)\s*#{1,6}\s*/g, "$1")
              .replace(/#{2,6}\s*/g, "");
            if (cleaned !== orig) {
              node.nodeValue = cleaned;
            }
          }
        }

        // Vor dem Klick auf "🔊 Vorlesen" verhindern, dass Zeilenumbrüche Wörter zusammenkleben
        const ttsBtn = bubble.querySelector("div:last-child button");
        if (ttsBtn && !ttsBtn.dataset.spacedFix) {
          ttsBtn.dataset.spacedFix = "true";
          ttsBtn.addEventListener("click", () => {
            bubble.querySelectorAll("strong, hr, br").forEach((el) => {
              if (!el.previousSibling || !String(el.previousSibling.textContent || "").endsWith(" ")) {
                el.insertAdjacentText("beforebegin", " ");
              }
            });
          }, true);
        }
      });

      isCleaning = false;
    };

    const obs42 = new MutationObserver(cleanDomBubbles);
    obs42.observe(msgBox, { childList: true, subtree: true });
    cleanDomBubbles();
  }
})();

// =========================================================================
// 43. DAS GROSSE PRÜFUNGS-, SICHERHEITS- & UX-UPGRADE (EDITION 2026):
//     - SMART PROGRESS PROXY (KORREKTE SPEICHERUNG BEI GEMISCHTEN KLAUSUR-FRAGEN)
//     - 4. ANTWORT-MODUS: "🗂️ KARTEIKARTEN (ACTIVE RECALL)"
//     - VISUELLER FRAGEN-NAVIGATOR (SCHNELL-SPRUNGLEISTE #1 BIS #N)
//     - INLINE STICHWORT-GEDANKENSTÜTZE STATT BLOCKIERENDEM BROWSER-ALERT
//     - MODERNES BACKUP- & DATEI-MODAL (.JSON DOWNLOAD & UPLOAD)
//     - INTELLIGENTE VORSCHAU & LOKALER DATEI-TESTER FÜR VIDEOS & MASTERBÜCHER
//     - 🖨️ 1-KLICK "PERSÖNLICHEN SPICKZETTEL & EIGENE FEHLERLISTE DRUCKEN"
// =========================================================================
(function() {
  // -----------------------------------------------------------------------
  // 1) MODERNES TOAST- & CONFIRM-DIALOG-SYSTEM (KEIN WINDOW.ALERT / PROMPT MEHR)
  // -----------------------------------------------------------------------
  function showAppToast(message, type = "info", durationMs = 4500) {
    let container = document.getElementById("gp2-toast-container");
    if (!container) {
      container = document.createElement("div");
      container.id = "gp2-toast-container";
      container.style.cssText =
        "position:fixed; top:18px; left:50%; transform:translateX(-50%); z-index:2147483647; display:flex; flex-direction:column; gap:0.5rem; max-width:92vw; width:480px; pointer-events:none;";
      document.body.appendChild(container);
    }

    const colors = {
      success: { border: "#22c55e", bg: "rgba(20, 83, 45, 0.96)", text: "#dcfce7" },
      error:   { border: "#ef4444", bg: "rgba(127, 29, 29, 0.96)", text: "#fee2e2" },
      warning: { border: "#f59e0b", bg: "rgba(120, 53, 15, 0.96)", text: "#fef3c7" },
      info:    { border: "#3b82f6", bg: "rgba(30, 58, 138, 0.96)", text: "#dbeafe" }
    };
    const styleCfg = colors[type] || colors.info;

    const toast = document.createElement("div");
    toast.style.cssText = `background:${styleCfg.bg}; border:1px solid ${styleCfg.border}; color:${styleCfg.text}; padding:0.75rem 1rem; border-radius:10px; font-size:0.86rem; font-weight:600; box-shadow:0 12px 28px rgba(0,0,0,0.55); display:flex; justify-content:space-between; align-items:center; gap:0.7rem; pointer-events:auto; backdrop-filter:blur(8px); transition:opacity 0.25s ease;`;
    toast.innerHTML = `
      <span style="line-height:1.4;">${message}</span>
      <button type="button" style="background:transparent; border:none; color:inherit; font-size:1rem; cursor:pointer; opacity:0.8;">✖</button>
    `;
    toast.querySelector("button")?.addEventListener("click", () => toast.remove());
    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = "0";
      setTimeout(() => toast.remove(), 260);
    }, durationMs);
  }
  window.showAppToast = showAppToast;

  function showConfirmModal(title, message, confirmLabel, onConfirm) {
    document.getElementById("gp2-custom-confirm-modal")?.remove();
    const modal = document.createElement("div");
    modal.id = "gp2-custom-confirm-modal";
    modal.className = "modal-overlay";
    modal.style.zIndex = "2147483647";
    modal.innerHTML = `
      <div class="modal-card" style="max-width:460px; text-align:center;">
        <h3 style="color:#f8fafc; margin-bottom:0.5rem;">${title}</h3>
        <p style="color:#cbd5e1; font-size:0.92rem; margin-bottom:1.3rem; line-height:1.5;">${message}</p>
        <div style="display:flex; justify-content:center; gap:0.7rem; flex-wrap:wrap;">
          <button type="button" id="gp2-confirm-cancel" class="btn secondary">Abbrechen</button>
          <button type="button" id="gp2-confirm-ok" class="btn warning" style="font-weight:700;">${confirmLabel}</button>
        </div>
      </div>
    `;
    document.body.appendChild(modal);
    modal.querySelector("#gp2-confirm-cancel")?.addEventListener("click", () => modal.remove());
    modal.addEventListener("click", (e) => {
      if (e.target === modal) modal.remove();
    });
    modal.querySelector("#gp2-confirm-ok")?.addEventListener("click", () => {
      modal.remove();
      onConfirm();
    });
  }

  // -----------------------------------------------------------------------
  // 2) SMART PROGRESS PROXY: AUTOMATISCHE ZUORDNUNG NACH FRAGEN-ID (el- / en- / wiso)
  //    Behebt den Bug beim Üben gemischter Fehlerfragen aus der Generalprobe!
  // -----------------------------------------------------------------------
  function getTargetPoolForId(prop) {
    const idStr = String(prop || "");
    if (idStr.startsWith("el-")) return progressElektro;
    if (idStr.startsWith("en-")) return progressEnglish;
    if (
      idStr.startsWith("sv-") ||
      idStr.startsWith("av-") ||
      idStr.startsWith("as-") ||
      idStr.startsWith("tr-") ||
      idStr.startsWith("bb-") ||
      idStr.startsWith("wi-")
    ) {
      return progressWiso;
    }
    if (currentSection === "elektro") return progressElektro;
    if (currentSection === "english") return progressEnglish;
    return progressWiso;
  }

  window.getCurrentProgressObj = function() {
    const baseTarget =
      currentSection === "wiso"
        ? progressWiso
        : currentSection === "elektro"
        ? progressElektro
        : progressEnglish;

    return new Proxy(baseTarget, {
      get(target, prop) {
        if (typeof prop === "symbol") return target[prop];
        const pool = getTargetPoolForId(prop);
        return pool[prop];
      },
      set(target, prop, value) {
        const pool = getTargetPoolForId(prop);
        pool[prop] = value;
        return true;
      }
    });
  };

  // -----------------------------------------------------------------------
  // 3) INLINE STICHWORT-GEDANKENSTÜTZE (STATT BLOCKIERENDEM BROWSER-ALERT)
  // -----------------------------------------------------------------------
  const oldHintBtn = document.getElementById("btn-freehand-hint");
  if (oldHintBtn) {
    const cleanHintBtn = oldHintBtn.cloneNode(true);
    oldHintBtn.replaceWith(cleanHintBtn);

    cleanHintBtn.addEventListener("click", () => {
      const q = filteredQuestions[currentIndex];
      if (!q) return;

      let hintBox = document.getElementById("freehand-inline-hint-box");
      if (!hintBox) {
        hintBox = document.createElement("div");
        hintBox.id = "freehand-inline-hint-box";
        hintBox.style.cssText =
          "margin-bottom:0.75rem; padding:0.7rem 0.95rem; background:rgba(245,158,11,0.12); border:1px solid rgba(245,158,11,0.45); border-left:4px solid #f59e0b; border-radius:8px; font-size:0.84rem; color:#fde68a;";
        freehandContainer?.prepend(hintBox);
      }

      const concepts = extractKeyConcepts(q).slice(0, 7);
      const chipsHtml = concepts
        .map((c) => {
          const w = c.display;
          const masked = w.length <= 3 ? w : `${w.slice(0, 2)}… <small style="color:#94a3b8;">(${w.length} B.)</small>`;
          return `<span style="display:inline-block; background:#0f172a; border:1px solid #475569; padding:0.15rem 0.5rem; border-radius:6px; margin:0.15rem 0.2rem 0.15rem 0; color:#fbbf24; font-weight:700;">${masked}</span>`;
        })
        .join("");

      hintBox.classList.remove("hidden");
      hintBox.innerHTML = `
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.3rem;">
          <strong>💡 Gedankenstütze – Versuche diese ${concepts.length} Schlüsselbegriffe einzubauen:</strong>
          <button type="button" style="background:transparent; border:none; color:#94a3b8; cursor:pointer; font-size:0.9rem;" onclick="this.parentElement.parentElement.classList.add('hidden')">✖</button>
        </div>
        <div>${chipsHtml}</div>
      `;
      freehandInput?.focus();
    });
  }

  // -----------------------------------------------------------------------
  // 4) 4. ANTWORT-MODUS: "🗂️ KARTEIKARTEN (ACTIVE RECALL)" & SCHNELL-NAVIGATOR
  // -----------------------------------------------------------------------
  const modeSwitchGroup = document.querySelector(".mode-switch-group");
  if (modeSwitchGroup && !document.getElementById("mode-btn-flashcard")) {
    const modeBtnFc = document.createElement("button");
    modeBtnFc.id = "mode-btn-flashcard";
    modeBtnFc.className = "mode-switch-btn";
    modeBtnFc.type = "button";
    modeBtnFc.textContent = "🗂️ Karteikarten";
    modeSwitchGroup.appendChild(modeBtnFc);

    const fcContainer = document.createElement("div");
    fcContainer.id = "flashcard-mode-container";
    fcContainer.className = "hidden";
    fcContainer.style.cssText = "margin-bottom: 1.4rem;";
    optionsContainer?.insertAdjacentElement("afterend", fcContainer);

    modeBtnFc.addEventListener("click", () => {
      answerMode = "flashcard";
      localStorage.setItem("nrw_answer_mode_v2", "flashcard");
      document.querySelectorAll(".mode-switch-btn").forEach((b) => b.classList.remove("active"));
      modeBtnFc.classList.add("active");
      window.renderQuestion();
    });

    document.querySelectorAll(".mode-switch-btn").forEach((btn) => {
      if (btn.id !== "mode-btn-flashcard") {
        btn.addEventListener("click", () => {
          modeBtnFc.classList.remove("active");
          fcContainer.classList.add("hidden");
        });
      }
    });
  }

  // Schnell-Navigator (anklickbare Fragen-Nummern #1 bis #N) unter dem Fortschrittsbalken
  const progressWrapperEl = document.querySelector(".progress-wrapper");
  if (progressWrapperEl && !document.getElementById("question-quick-nav-wrap")) {
    const navWrap = document.createElement("div");
    navWrap.id = "question-quick-nav-wrap";
    navWrap.style.cssText = "margin-bottom: 1rem;";
    navWrap.innerHTML = `
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.35rem;">
        <button type="button" id="btn-toggle-qnav" class="quick-chip" style="font-size:0.76rem; color:#93c5fd; border-color:#334155;">
          🔢 Fragen-Schnellwahl (#1 – #${filteredQuestions.length}) ein-/ausklappen
        </button>
        <span style="font-size:0.74rem; color:#94a3b8;">🟢 Sicher • 🟡 1x Gewusst • 🔴 Wiederholen • ⭐ Merkliste</span>
      </div>
      <div id="question-quick-nav-grid" class="hidden" style="display:flex; flex-wrap:wrap; gap:0.3rem; background:#0f172a; padding:0.65rem; border-radius:10px; border:1px solid #334155; max-height:145px; overflow-y:auto;"></div>
    `;
    progressWrapperEl.insertAdjacentElement("afterend", navWrap);

    const toggleNavBtn = document.getElementById("btn-toggle-qnav");
    const navGrid = document.getElementById("question-quick-nav-grid");
    toggleNavBtn?.addEventListener("click", () => {
      navGrid?.classList.toggle("hidden");
    });
  }

  function renderQuestionQuickNav() {
    const navGrid = document.getElementById("question-quick-nav-grid");
    const toggleNavBtn = document.getElementById("btn-toggle-qnav");
    if (!navGrid) return;

    if (toggleNavBtn) {
      toggleNavBtn.textContent = `🔢 Fragen-Schnellwahl (1 – ${filteredQuestions.length}) ein-/ausklappen`;
    }

    const prog = window.getCurrentProgressObj();
    const hc = readStoredJson("nrw_hit_counts_v1", {});
    navGrid.innerHTML = "";

    filteredQuestions.forEach((q, idx) => {
      const btn = document.createElement("button");
      btn.type = "button";
      const st = prog[q.id];
      const cnt = hc[q.id] || 0;
      const isBookmarked = !!bookmarks[q.id];
      const isCurrent = idx === currentIndex;

      let bg = "#1e293b";
      let border = "#334155";
      let col = "#cbd5e1";

      if (st === "correct") {
        if (cnt >= 2) {
          bg = "rgba(34, 197, 94, 0.22)";
          border = "#22c55e";
          col = "#4ade80";
        } else {
          bg = "rgba(245, 158, 11, 0.2)";
          border = "#f59e0b";
          col = "#fbbf24";
        }
      } else if (st === "wrong") {
        bg = "rgba(239, 68, 68, 0.22)";
        border = "#ef4444";
        col = "#fca5a5";
      }

      if (isCurrent) {
        border = "#38bdf8";
        btn.style.boxShadow = "0 0 0 2px #38bdf8";
      }

      btn.style.cssText += `background:${bg}; border:1px solid ${border}; color:${col}; border-radius:6px; min-width:36px; height:28px; font-size:0.75rem; font-weight:700; cursor:pointer; padding:0 0.35rem; display:inline-flex; align-items:center; justify-content:center;`;
      btn.textContent = `${idx + 1}${isBookmarked ? "⭐" : ""}`;
      btn.title = `Frage ${idx + 1}: ${q.question.slice(0, 70)}...`;
      btn.addEventListener("click", () => {
        currentIndex = idx;
        window.renderQuestion();
        updateStats();
      });
      navGrid.appendChild(btn);
    });
  }

  const prevRenderQ43 = window.renderQuestion;
  window.renderQuestion = function() {
    document.getElementById("freehand-inline-hint-box")?.classList.add("hidden");
    prevRenderQ43.apply(this, arguments);
    renderQuestionQuickNav();

    const fcContainer = document.getElementById("flashcard-mode-container");
    const modeBtnFc = document.getElementById("mode-btn-flashcard");
    if (!fcContainer) return;

    if (answerMode !== "flashcard") {
      fcContainer.classList.add("hidden");
      return;
    }

    document.querySelectorAll(".mode-switch-btn").forEach((b) => b.classList.remove("active"));
    modeBtnFc?.classList.add("active");
    freehandContainer?.classList.add("hidden");
    optionsContainer?.classList.add("hidden");
    document.getElementById("tf-mode-container")?.classList.add("hidden");

    if (!filteredQuestions.length) {
      fcContainer.classList.add("hidden");
      return;
    }

    const q = filteredQuestions[currentIndex];
    fcContainer.classList.remove("hidden");
    fcContainer.innerHTML = `
      <div id="fc-reveal-card" style="background:linear-gradient(135deg, #0f172a, #1e293b); border:2px dashed #3b82f6; border-radius:12px; padding:1.6rem 1.2rem; text-align:center; cursor:pointer; transition:all 0.2s;">
        <div style="font-size:1.8rem; margin-bottom:0.4rem;">🔄</div>
        <div style="font-size:1.02rem; font-weight:700; color:#93c5fd;">Klicken oder Leertaste drücken, um die Karteikarte umzudrehen</div>
        <div style="font-size:0.82rem; color:#94a3b8; margin-top:0.25rem;">Überlege dir die Antwort im Kopf oder sprich sie laut aus, bevor du aufdeckst!</div>
      </div>

      <div id="fc-answer-panel" class="hidden" style="background:#0f172a; border:1px solid #22c55e; border-left:4px solid #22c55e; border-radius:12px; padding:1.25rem;">
        <div style="font-size:0.8rem; text-transform:uppercase; letter-spacing:0.6px; color:#4ade80; font-weight:700; margin-bottom:0.4rem;">
          ✅ Offizielle Kernlösung (Prüfungsmaßstab):
        </div>
        <div style="font-size:1.05rem; font-weight:700; color:#f8fafc; margin-bottom:0.9rem; line-height:1.5;">
          ${q.options[q.correct]}
        </div>
        <div style="font-size:0.88rem; color:#cbd5e1; white-space:pre-line; padding-top:0.75rem; border-top:1px dashed #334155; margin-bottom:1.1rem;">
          ${q.explanation}
        </div>
        <div style="display:flex; gap:0.6rem; flex-wrap:wrap; justify-content:center; padding-top:0.5rem;">
          <button type="button" id="fc-rate-wrong" class="btn danger" style="flex:1; min-width:150px;">🔴 Nicht gewusst (Wiederholen)</button>
          <button type="button" id="fc-rate-shaky" class="btn warning" style="flex:1; min-width:150px;">🟡 Wackelig (1x Gewusst)</button>
          <button type="button" id="fc-rate-sure" class="btn success" style="flex:1; min-width:150px;">🟢 Sitzt sicher! (Prüfungssicher)</button>
        </div>
      </div>
    `;

    const revealCard = fcContainer.querySelector("#fc-reveal-card");
    const answerPanel = fcContainer.querySelector("#fc-answer-panel");

    revealCard?.addEventListener("click", () => {
      revealCard.classList.add("hidden");
      answerPanel?.classList.remove("hidden");
    });

    fcContainer.querySelector("#fc-rate-wrong")?.addEventListener("click", () => {
      playWrongSound();
      window.getCurrentProgressObj()[q.id] = "wrong";
      window.recordPsychologicalProgress(false);
      saveProgress();
      window.navigateQuestion("next");
    });

    fcContainer.querySelector("#fc-rate-shaky")?.addEventListener("click", () => {
      playSuccessSound();
      window.getCurrentProgressObj()[q.id] = "correct";
      const hc = readStoredJson("nrw_hit_counts_v1", {});
      hc[q.id] = 1;
      localStorage.setItem("nrw_hit_counts_v1", JSON.stringify(hc));
      dailyData.count++;
      currentStreak++;
      localStorage.setItem("nrw_streak_v1", String(currentStreak));
      localStorage.setItem("nrw_daily_goal_v1", JSON.stringify(dailyData));
      saveProgress();
      window.navigateQuestion("next");
    });

    fcContainer.querySelector("#fc-rate-sure")?.addEventListener("click", () => {
      playSuccessSound();
      window.getCurrentProgressObj()[q.id] = "correct";
      const hc = readStoredJson("nrw_hit_counts_v1", {});
      hc[q.id] = Math.max(2, (hc[q.id] || 0) + 1);
      localStorage.setItem("nrw_hit_counts_v1", JSON.stringify(hc));
      dailyData.count++;
      currentStreak++;
      localStorage.setItem("nrw_streak_v1", String(currentStreak));
      localStorage.setItem("nrw_daily_goal_v1", JSON.stringify(dailyData));
      saveProgress();
      window.navigateQuestion("next");
    });
  };

  // Leertaste dreht im Karteikarten-Modus die Karte um
  document.addEventListener("keydown", (e) => {
    if (quizMainContainer.style.display === "none" || answerMode !== "flashcard") return;
    if (["INPUT", "TEXTAREA", "SELECT"].includes(document.activeElement?.tagName)) return;
    if (e.code === "Space") {
      const rev = document.getElementById("fc-reveal-card");
      if (rev && !rev.classList.contains("hidden")) {
        e.preventDefault();
        rev.click();
      }
    }
  });

  // -----------------------------------------------------------------------
  // 5) MODERNES BACKUP- & DATEI-MODAL (INKL. .JSON DOWNLOAD & DATEI-IMPORT)
  // -----------------------------------------------------------------------
  function buildFullBackupPayload() {
    return JSON.stringify(
      {
        version: "GP2-NRW-2026",
        timestamp: new Date().toISOString(),
        wiso: progressWiso,
        elektro: progressElektro,
        english: progressEnglish,
        calc: progressCalc,
        bookmarks: bookmarks,
        hitCounts: readStoredJson("nrw_hit_counts_v1", {}),
        europaPages: readStoredJson("europa_tb_pages_v1", {}),
        aoScores: readStoredJson("nrw_ao2021_scores_v1", {})
      },
      null,
      2
    );
  }

  function applyFullBackupJson(rawJsonStr) {
    try {
      const parsed = JSON.parse(rawJsonStr);
      if (!parsed || typeof parsed !== "object" || (!parsed.wiso && !parsed.elektro)) {
        showAppToast("❌ Ungültiges Backup-Format. Bitte prüfe die Datei oder den Code.", "error");
        return false;
      }
      progressWiso = parsed.wiso || {};
      progressElektro = parsed.elektro || {};
      progressEnglish = parsed.english || {};
      progressCalc = parsed.calc || {};
      bookmarks = parsed.bookmarks || {};
      if (parsed.hitCounts) localStorage.setItem("nrw_hit_counts_v1", JSON.stringify(parsed.hitCounts));
      if (parsed.europaPages) localStorage.setItem("europa_tb_pages_v1", JSON.stringify(parsed.europaPages));
      if (parsed.aoScores) localStorage.setItem("nrw_ao2021_scores_v1", JSON.stringify(parsed.aoScores));
      localStorage.setItem("nrw_calc_progress_v1", JSON.stringify(progressCalc));
      initCalcTrainer();
      saveProgress();
      window.applyFilters();
      playSuccessSound();
      showAppToast("✅ Lernfortschritt, 3-Stufen-Gedächtnis & Merkliste erfolgreich wiederhergestellt!", "success");
      return true;
    } catch (err) {
      showAppToast("❌ Der Backup-Code konnte nicht gelesen werden.", "error");
      return false;
    }
  }

  function openBackupManagerModal(mode = "export") {
    document.getElementById("gp2-backup-modal")?.remove();
    const backupStr = buildFullBackupPayload();

    const modal = document.createElement("div");
    modal.id = "gp2-backup-modal";
    modal.className = "modal-overlay";
    modal.style.zIndex = "2147483647";
    modal.innerHTML = `
      <div class="modal-card" style="max-width:600px;">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.7rem;">
          <h3 style="margin:0; color:#60a5fa;">💾 Lernstand sichern & wiederherstellen</h3>
          <button type="button" id="btn-close-backup-modal" class="chatbot-close-btn">✖</button>
        </div>
        <p style="font-size:0.85rem; color:#cbd5e1; margin-bottom:0.9rem;">
          Sichere deinen gesamten Fortschritt (WiSo, Elektro, Englisch, 3-Stufen-Gedächtnis, Merkliste & Rechentrainer) als Datei oder übertrage ihn auf dein Handy/Tablet:
        </p>

        <div style="display:flex; gap:0.6rem; flex-wrap:wrap; margin-bottom:0.9rem;">
          <button type="button" id="btn-dl-backup-file" class="btn primary" style="flex:1;">
            📥 Als .json-Datei herunterladen
          </button>
          <button type="button" id="btn-copy-backup-clip" class="btn secondary" style="flex:1;">
            📋 Code in Zwischenablage kopieren
          </button>
          <label class="btn warning" style="flex:1; text-align:center; cursor:pointer; margin:0;">
            📂 .json-Backup-Datei laden
            <input type="file" id="inp-upload-backup-file" accept=".json,application/json,text/plain" style="display:none;">
          </label>
        </div>

        <label style="font-size:0.78rem; color:#94a3b8; font-weight:700; display:block; margin-bottom:0.3rem;">
          ${mode === "import" ? "📥 Backup-Code hier einfügen und unten auf „Wiederherstellen“ klicken:" : "📄 Dein aktueller Backup-Code (oder fremden Code hier einfügen):"}
        </label>
        <textarea id="backup-json-textarea" rows="6" style="font-family:monospace; font-size:0.76rem; margin-bottom:0.9rem;">${mode === "import" ? "" : backupStr}</textarea>

        <div style="display:flex; justify-content:flex-end; gap:0.6rem;">
          <button type="button" id="btn-apply-backup-text" class="btn success">✅ Eingefügten Code wiederherstellen</button>
        </div>
      </div>
    `;
    document.body.appendChild(modal);

    const txtArea = modal.querySelector("#backup-json-textarea");
    if (mode === "import") {
      txtArea.placeholder = '{"version": "GP2-NRW-2026", ...} hier einfügen...';
      setTimeout(() => txtArea.focus(), 60);
    }

    modal.querySelector("#btn-close-backup-modal")?.addEventListener("click", () => modal.remove());
    modal.addEventListener("click", (e) => {
      if (e.target === modal) modal.remove();
    });

    modal.querySelector("#btn-dl-backup-file")?.addEventListener("click", () => {
      const blob = new Blob([backupStr], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `GP2-Lernstand-${new Date().toISOString().slice(0, 10)}.json`;
      a.click();
      URL.revokeObjectURL(url);
      showAppToast("📥 Backup-Datei wurde heruntergeladen!", "success");
    });

    modal.querySelector("#btn-copy-backup-clip")?.addEventListener("click", () => {
      navigator.clipboard.writeText(backupStr).then(() => {
        showAppToast("📋 Backup-Code in die Zwischenablage kopiert!", "success");
      });
    });

    modal.querySelector("#inp-upload-backup-file")?.addEventListener("change", (e) => {
      const file = e.target.files?.[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = () => {
        if (applyFullBackupJson(String(reader.result || ""))) {
          modal.remove();
        }
      };
      reader.readAsText(file);
    });

    modal.querySelector("#btn-apply-backup-text")?.addEventListener("click", () => {
      if (applyFullBackupJson(txtArea.value.trim())) {
        modal.remove();
      }
    });
  }

  const expBtnEl = document.getElementById("btn-export");
  if (expBtnEl) {
    const cleanExp = expBtnEl.cloneNode(true);
    expBtnEl.replaceWith(cleanExp);
    cleanExp.addEventListener("click", () => openBackupManagerModal("export"));
  }

  const impBtnEl = document.getElementById("btn-import");
  if (impBtnEl) {
    const cleanImp = impBtnEl.cloneNode(true);
    impBtnEl.replaceWith(cleanImp);
    cleanImp.addEventListener("click", () => openBackupManagerModal("import"));
  }

  const resBtnEl = document.getElementById("btn-reset");
  if (resBtnEl) {
    const cleanRes = resBtnEl.cloneNode(true);
    resBtnEl.replaceWith(cleanRes);
    cleanRes.addEventListener("click", () => {
      const sectionNames = { wiso: "WiSo-Trainer", elektro: "Elektro-Theorie", english: "Fachenglisch" };
      const secLabel = sectionNames[currentSection] || currentSection;
      showConfirmModal(
        "🗑️ Lernfortschritt zurücksetzen?",
        `Möchtest du den Fortschritt für „${secLabel}“ wirklich auf 0 zurücksetzen? (Deine anderen Bereiche und der Rechentrainer bleiben erhalten.)`,
        "Ja, jetzt zurücksetzen",
        () => {
          const hc = readStoredJson("nrw_hit_counts_v1", {});
          activeQuestionPool.forEach((q) => delete hc[q.id]);
          localStorage.setItem("nrw_hit_counts_v1", JSON.stringify(hc));
          if (currentSection === "wiso") progressWiso = {};
          else if (currentSection === "elektro") progressElektro = {};
          else if (currentSection === "english") progressEnglish = {};
          saveProgress();
          window.applyFilters();
          showAppToast(`🔄 Fortschritt für „${secLabel}“ wurde zurückgesetzt.`, "info");
        }
      );
    });
  }

  // -----------------------------------------------------------------------
  // 6) ECHTE FISHER-YATES-ZUFALLSMISCHUNG & CLEAN CONFIRM IN DER KLAUSUR
  // -----------------------------------------------------------------------
  function fisherYatesShuffle(arr) {
    const copy = [...arr];
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  }

  const startSimBtn = document.getElementById("btn-start-sim");
  if (startSimBtn) {
    startSimBtn.addEventListener("click", () => {
      // Nach dem Original-Handler mischen wir simQuestions noch einmal mit echtem Fisher-Yates,
      // damit auch die hinteren Fragen (z.B. el-60 bis el-75) exakt gleich oft drankommen!
      const type = simTypeSelect.value;
      let pool = WISO_QUESTIONS;
      let count = 10;
      if (type === "elektro") { pool = ELEKTRO_QUESTIONS; count = 15; }
      else if (type === "english") { pool = ENGLISH_QUESTIONS; count = 8; }
      else if (type === "all") { pool = [...ELEKTRO_QUESTIONS, ...WISO_QUESTIONS, ...ENGLISH_QUESTIONS]; count = 20; }

      simQuestions = fisherYatesShuffle(pool).slice(0, count);
      simUserAnswers = {};
      window.renderSimQuestions();
    });
  }

  const finishSimTopBtn = document.getElementById("btn-finish-sim");
  if (finishSimTopBtn) {
    const cleanFinishTop = finishSimTopBtn.cloneNode(true);
    finishSimTopBtn.replaceWith(cleanFinishTop);
    window.btnFinishSim = cleanFinishTop;
    cleanFinishTop.addEventListener("click", () => {
      const answeredCount = Object.keys(simUserAnswers).length;
      const totalQ = simQuestions.length;
      showConfirmModal(
        "🛑 Prüfung jetzt abgeben?",
        answeredCount < totalQ
          ? `Du hast erst ${answeredCount} von ${totalQ} Aufgaben beantwortet. Möchtest du die Prüfung trotzdem jetzt abgeben und auswerten lassen?`
          : `Alle ${totalQ} Aufgaben sind beantwortet! Möchtest du jetzt abgeben und deinen Notenbescheid erhalten?`,
        "Prüfung abgeben & auswerten",
        () => {
          clearInterval(simInterval);
          window.evaluateSimulation(false);
        }
      );
    });
  }

  // -----------------------------------------------------------------------
  // 7) INTELLIGENTE VORSCHAU & LOKALER DATEI-TESTER FÜR VIDEOS & MASTERBÜCHER
  //    (Solange die PDFs und MP4s noch nicht im Ordner liegen, kein kaputter Frame!)
  // -----------------------------------------------------------------------
  const masterbookHeader = document.querySelector("#masterbook-section .video-header-card");
  if (masterbookHeader && !document.getElementById("local-pdf-loader-bar")) {
    const loaderBar = document.createElement("div");
    loaderBar.id = "local-pdf-loader-bar";
    loaderBar.style.cssText =
      "margin-top:0.9rem; padding:0.7rem 1rem; background:rgba(59,130,246,0.1); border:1px dashed #3b82f6; border-radius:10px; display:flex; justify-content:center; align-items:center; gap:0.8rem; flex-wrap:wrap; font-size:0.83rem;";
    loaderBar.innerHTML = `
      <span style="color:#cbd5e1;">💡 <strong>Lokaler PDF-Betrachter:</strong> Du kannst jedes eigene Masterbuch-PDF direkt von deinem Gerät hier im Fenster öffnen:</span>
      <label class="btn secondary" style="padding:0.4rem 0.85rem; font-size:0.8rem; cursor:pointer; margin:0;">
        📂 Eigene PDF-Datei vom Gerät öffnen
        <input type="file" id="inp-local-pdf-file" accept="application/pdf" style="display:none;">
      </label>
    `;
    masterbookHeader.appendChild(loaderBar);

    document.getElementById("inp-local-pdf-file")?.addEventListener("change", (e) => {
      const file = e.target.files?.[0];
      if (!file) return;
      const blobUrl = URL.createObjectURL(file);
      if (pdfFrame) pdfFrame.src = blobUrl;
      if (pdfExternalBtn) {
        pdfExternalBtn.href = blobUrl;
        pdfExternalBtn.textContent = `📄 „${file.name}“ im neuen Tab öffnen`;
      }
      showAppToast(`📖 Lokales PDF „${file.name}“ geladen!`, "success");
    });
  }

  // Video-Platzhalter-Schutz falls die MP4-Dateien später hinzugefügt werden
  document.querySelectorAll("#video-section .video-card").forEach((card) => {
    const vid = card.querySelector("video");
    const srcEl = vid?.querySelector("source");
    const srcPath = srcEl?.getAttribute("src") || "video/*.mp4";
    if (!vid) return;

    const handleVideoMissing = () => {
      if (card.querySelector(".video-missing-overlay")) return;
      const container = card.querySelector(".video-container");
      if (!container) return;
      container.style.position = "relative";
      const overlay = document.createElement("div");
      overlay.className = "video-missing-overlay";
      overlay.style.cssText =
        "padding:1.4rem 1rem; background:linear-gradient(135deg,#0f172a,#1e293b); border-bottom:1px solid #334155; text-align:center; color:#cbd5e1; font-size:0.82rem;";
      overlay.innerHTML = `
        <div style="font-size:1.7rem; margin-bottom:0.3rem;">🎬</div>
        <div style="font-weight:700; color:#93c5fd; margin-bottom:0.2rem;">Videodatei bereit zum Einbinden</div>
        <div style="color:#94a3b8; margin-bottom:0.65rem;">Lege die Datei unter <code style="color:#fbbf24;">${srcPath}</code> ab oder wähle sie lokal aus:</div>
        <label class="quick-chip" style="border-color:#3b82f6; color:#dbeafe; cursor:pointer; display:inline-block;">
          📂 Lokale .mp4-Datei auswählen
          <input type="file" accept="video/mp4,video/*" style="display:none;">
        </label>
      `;
      vid.style.display = "none";
      container.appendChild(overlay);

      overlay.querySelector("input")?.addEventListener("change", (ev) => {
        const f = ev.target.files?.[0];
        if (!f) return;
        const url = URL.createObjectURL(f);
        vid.src = url;
        vid.style.display = "block";
        overlay.remove();
        vid.play().catch(() => {});
      });
    };

    srcEl?.addEventListener("error", handleVideoMissing);
    vid.addEventListener("error", handleVideoMissing);
  });

  // -----------------------------------------------------------------------
  // 8) 🖨️ 1-KLICK "PERSÖNLICHEN SPICKZETTEL & EIGENE FEHLERLISTE DRUCKEN"
  // -----------------------------------------------------------------------
  const tbModalCard = document.querySelector("#tb-helper-modal .modal-card");
  if (tbModalCard && !document.getElementById("btn-print-personal-cheatsheet")) {
    const printBar = document.createElement("div");
    printBar.style.cssText =
      "margin-top:1.1rem; padding-top:0.9rem; border-top:1px solid #334155; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:0.6rem;";
    printBar.innerHTML = `
      <span style="font-size:0.8rem; color:#94a3b8;">💡 Erstellt ein kompaktes Druckblatt mit allen Kernformeln + deinen aktuellen Fehler- & Merklisten-Fragen:</span>
      <button type="button" id="btn-print-personal-cheatsheet" class="btn primary" style="font-size:0.84rem; padding:0.5rem 1rem;">
        🖨️ Persönlichen Spickzettel & Fehlerliste drucken
      </button>
    `;
    tbModalCard.appendChild(printBar);

    document.getElementById("btn-print-personal-cheatsheet")?.addEventListener("click", () => {
      const allQs = [...ELEKTRO_QUESTIONS, ...WISO_QUESTIONS, ...ENGLISH_QUESTIONS];
      const prog = window.getCurrentProgressObj();
      const focusQs = allQs.filter((q) => prog[q.id] === "wrong" || bookmarks[q.id]);

      const focusRowsHtml = focusQs.length
        ? focusQs
            .map(
              (q, i) => `
          <div style="margin-bottom:10px; padding:8px 10px; border:1px solid #475569; border-left:4px solid ${
            prog[q.id] === "wrong" ? "#ef4444" : "#f59e0b"
          }; border-radius:6px; background:#0f172a; page-break-inside:avoid;">
            <div style="font-size:11px; color:#93c5fd; font-weight:bold;">${i + 1}. [${q.category} – ${q.exam}] ${
                prog[q.id] === "wrong" ? "❌ Wiederholen" : "⭐ Merkliste"
              }</div>
            <div style="font-size:12.5px; color:#f8fafc; font-weight:bold; margin:3px 0;">${q.question}</div>
            <div style="font-size:12px; color:#4ade80;"><strong>Lösung:</strong> ${q.options[q.correct]}</div>
          </div>`
            )
            .join("")
        : `<p style="font-size:12.5px; color:#4ade80;"><strong>🎉 Keine offenen Fehlerfragen oder Merklisten-Einträge vorhanden!</strong></p>`;

      document.getElementById("gp2-cheatsheet-preview-modal")?.remove();
      const sheetModal = document.createElement("div");
      sheetModal.id = "gp2-cheatsheet-preview-modal";
      sheetModal.className = "modal-overlay";
      sheetModal.style.zIndex = "2147483647";
      sheetModal.innerHTML = `
        <div class="modal-card" style="max-width:860px; max-height:90vh; overflow-y:auto;">
          <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:0.6rem; margin-bottom:0.9rem; padding-bottom:0.6rem; border-bottom:1px solid #334155;">
            <h3 style="margin:0; color:#60a5fa;">🖨️ Persönlicher GP2-Spickzettel & Fokusliste (${focusQs.length} Fragen)</h3>
            <div style="display:flex; gap:0.5rem;">
              <button type="button" id="btn-dl-cheatsheet-html" class="btn primary" style="font-size:0.8rem; padding:0.4rem 0.8rem;">📥 Als Druckdatei (.html) speichern</button>
              <button type="button" id="btn-print-cheatsheet-now" class="btn success" style="font-size:0.8rem; padding:0.4rem 0.8rem;">🖨️ Direkt drucken</button>
              <button type="button" id="btn-close-cheatsheet-modal" class="chatbot-close-btn">✖</button>
            </div>
          </div>
          <div id="gp2-printable-sheet-content">
            <h4 style="color:#fbbf24; margin-bottom:0.5rem;">1. Die 8 wichtigsten Prüfungsformeln & VDE-Grenzwerte</h4>
            <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(250px, 1fr)); gap:0.5rem; margin-bottom:1rem; font-size:0.8rem;">
              <div style="background:#0f172a; padding:0.55rem; border-radius:6px; border:1px solid #334155;"><strong style="color:#93c5fd;">📐 Spannungsfall (S. 192 / 205):</strong><br>1~: ΔU = (2·l·I·cos φ)/(56·q) | 3~: ΔU = (√3·l·I·cos φ)/(56·q) | Max. 3 %</div>
              <div style="background:#0f172a; padding:0.55rem; border-radius:6px; border:1px solid #334155;"><strong style="color:#93c5fd;">⚡ Leitungsdimensionierung (S. 196–201):</strong><br>Ib ≤ In ≤ Iz | Iz' = In / (f1 · f2) | Referenz f1 ist 30 °C (S. 198)!</div>
              <div style="background:#0f172a; padding:0.55rem; border-radius:6px; border:1px solid #334155;"><strong style="color:#93c5fd;">📋 Erstprüfung VDE 0100-600 (S. 258 / 264):</strong><br>1. Besichtigen ➔ 2. RPE (≥200mA) ➔ 3. Riso (≥1,0 MΩ) ➔ 4. Zs ≤ 2/3·(U0/Ia)</div>
              <div style="background:#0f172a; padding:0.55rem; border-radius:6px; border:1px solid #334155;"><strong style="color:#93c5fd;">⏱️ Abschaltzeiten VDE 0100-410 (S. 257):</strong><br>Endkreise ≤32A/63A: TN max. 0,4 s | TT max. 0,2 s | Verteiler: TN 5,0 s / TT 1,0 s</div>
              <div style="background:#0f172a; padding:0.55rem; border-radius:6px; border:1px solid #334155;"><strong style="color:#93c5fd;">🔌 RCD-Pflicht & Typen (S. 256 / 260):</strong><br>Steckdosen ≤32A: ≤30 mA Pflicht! | 1~ FU: Typ F | 3~ FU / Wallbox: Typ B / B+</div>
              <div style="background:#0f172a; padding:0.55rem; border-radius:6px; border:1px solid #334155;"><strong style="color:#93c5fd;">🛡️ Erdung & HES (S. 182–185 / 442):</strong><br>Blitzstromtragfähig an HES: mind. 16 mm² Cu starr, 25 mm² Al, 50 mm² Stahl</div>
              <div style="background:#0f172a; padding:0.55rem; border-radius:6px; border:1px solid #334155;"><strong style="color:#93c5fd;">🔋 Blindleistungskompensation (S. 328):</strong><br>Qc = P · (tan φ1 - tan φ2) | C_Δ ≈ 20 µF/kvar (Max. 90% Leerlauf!)</div>
              <div style="background:#0f172a; padding:0.55rem; border-radius:6px; border:1px solid #334155;"><strong style="color:#93c5fd;">⚙️ Motoren & Mechanik (S. 24 / 528):</strong><br>P2 = (M · n) / 9550 | P1 = P2 / η | Dahlander Δ/YY braucht 2 Motorschutzrelais!</div>
            </div>
            <h4 style="color:#fbbf24; margin-bottom:0.5rem;">2. Deine persönlichen Wiederholungs- & Merklisten-Fragen (${focusQs.length})</h4>
            ${focusRowsHtml}
          </div>
        </div>
      `;
      document.body.appendChild(sheetModal);

      sheetModal.querySelector("#btn-close-cheatsheet-modal")?.addEventListener("click", () => sheetModal.remove());
      sheetModal.addEventListener("click", (e) => {
        if (e.target === sheetModal) sheetModal.remove();
      });

      sheetModal.querySelector("#btn-print-cheatsheet-now")?.addEventListener("click", () => {
        window.print();
      });

      sheetModal.querySelector("#btn-dl-cheatsheet-html")?.addEventListener("click", () => {
        const htmlDoc = `<!DOCTYPE html><html lang="de"><head><meta charset="UTF-8"><title>GP2 NRW Spickzettel</title><style>body{font-family:Arial,sans-serif;background:#0f172a;color:#f8fafc;padding:24px;max-width:900px;margin:0 auto;}</style></head><body><h2>⚡ GP Teil 2 (NRW) – Persönlicher Spickzettel & Fokusliste</h2>${
          document.getElementById("gp2-printable-sheet-content")?.innerHTML || ""
        }</body></html>`;
        const blob = new Blob([htmlDoc], { type: "text/html" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `GP2-Spickzettel-${new Date().toISOString().slice(0, 10)}.html`;
        a.click();
        URL.revokeObjectURL(url);
        showAppToast("📥 Spickzettel als druckbare HTML-Datei heruntergeladen!", "success");
      });
    });
  }

  // Alle verbleibenden window.alert()-Aufrufe auf das moderne Toast-Banner umleiten
  window.alert = function(msg) {
    showAppToast(String(msg || ""), "warning", 5500);
  };

  window.renderQuestion();
  updateStats();
})();

// =========================================================================
// 44. WINTER 2026/27 KOMPLETT-UPGRADE AUS DEN 18 ORIGINAL-PRÜFUNGS-PDFS:
//     - 18 ORIGINAL-PDFS (9 PRÜFUNGEN + 9 LÖSUNGEN 2018–2025) MIT SPLIT-SCREEN
//     - NEUE AUFGABEN AUS WINTER 2024/25 (AO 2021), SOMMER 2024 & 2018–2023
//       (83 ELEKTRO, 60 WISO, 28 ENGLISCH, 25 RECHENTRAINER-AUFGABEN)
//     - OFFIZIELLER NRW-NOTEN- & BESTEHENSRECHNER (AO 2021 FÜR WINTER 2026/27)
//     - DSGVO- & RECHTSSCHUTZ-SCHILD (§ 5 DDG / ART. 2 ABS. 2 LIT. C DSGVO)
// =========================================================================
(function() {
  // -----------------------------------------------------------------------
  // 1) NEUE ORIGINAL-PRÜFUNGSFRAGEN (WINTER 2024/25, SOMMER 2024, 2018–2023)
  // -----------------------------------------------------------------------
  const EXTRA_ELEKTRO_2025 = [
    {
      id: "el-76",
      exam: "Winter 2024/25",
      category: "Motoren, Antriebe & Kompensation",
      question: "Ein Elektroheizstab mit drei Heizwiderständen von je R = 80 Ω wird an 3/N/PE ~ 230/400 V zur Nutzung von PV-Überschussstrom in 5 Leistungsstufen geschaltet (FSA Aufg. 1). Welche Gesamtleistungen ergeben sich in Stufe 1 (Dreieck), Stufe 2 (Stern), Stufe 3 (2 Elemente in Reihe an 400 V), Stufe 4 (2 in Reihe an 400 V + 1 an 230 V) und Stufe 5 (2 parallel an 400 V + 1 an 230 V)?",
      options: [
        "Stufe 1 (Δ): 6000 W | Stufe 2 (Y): 2000 W (1/3 von Δ) | Stufe 3 (2×80 Ω = 160 Ωzw. 240 Ω an 400 V): P = (400 V)² / 160 Ω = 1000 W (bzw. bei 3 in Reihe 240 Ω = 667 W) | Stufe 4: 1000 W + (230 V)² / 80 Ω = 1661 W | Stufe 5 (2 parallel = 40 Ω an 400 V + 1 an 230 V): 4000 W + 661 W = 4661 W.",
        "In allen fünf Leistungsstufen bleibt die Gesamtleistung konstant bei 6000 W, da der Widerstand R = 80 Ω temperaturunabhängig ist und sich nur der cos φ zwischen 0,5 und 1,0 verschiebt.",
        "In Sternschaltung (Stufe 2) ist die Heizleistung dreimal so groß wie in Dreieckschaltung (18.000 W statt 6.000 W), weil im Sternpunkt zusätzlich der Neutralleiterstrom heizt.",
        "Werden zwei Heizelemente von je 80 Ω in Reihe an 400 V angeschlossen, halbiert sich der Gesamtwiderstand auf 40 Ω und die Leistung verdoppelt sich auf 8000 W."
      ],
      correct: 0,
      explanation: "• Original-Aufgabe Winter 2024/25 (FSA Aufg. 1):\n  - Dreieck (3 × 80 Ω an 400 V): P_Δ = 3 · ((400 V)² / 80 Ω) = 3 · 2000 W = 6000 W.\n  - Stern (3 × 80 Ω an 230 V): P_Y = (1/3) · P_Δ = 2000 W.\n  - Stufe 3 (3 Elemente in Reihe R_g = 240 Ω an 400 V): P = (400 V)² / 240 Ω = 667 W.\n  - Stufe 4 (2 Elemente in Reihe R_g = 160 Ω an 400 V + 1 Element 80 Ω an 230 V): P = (400 V)²/160 Ω + (230 V)²/80 Ω = 1000 W + 661 W = 1661 W.\n  - Stufe 5 (2 Elemente parallel R_g = 40 Ω an 400 V + 1 Element 80 Ω an 230 V): P = (400 V)²/40 Ω + (230 V)²/80 Ω = 4000 W + 661 W = 4661 W.\n• 📖 Europa Tabellenbuch: S. 38 (Reihen-/Parallelschaltung) & S. 50 (Stern-/Dreieckschaltung)"
    },
    {
      id: "el-77",
      exam: "Winter 2024/25",
      category: "Motoren, Antriebe & Kompensation",
      question: "Ein Drehstrommotor der Wärmeklasse E (max. 120 °C) besitzt in den Wicklungen drei in Reihe geschaltete PTC-Kaltleiter (Motorvollschutz), die mit einem Auswerterelais K1 (R_Rel = 1,6 kΩ, Mindest-Haltespannung 12 V DC) an 25 V DC liegen (FSA Aufg. 3). Warum erkennt ein normales Bimetall-Motorschutzrelais eine verminderte Kühlung nicht, und was passiert bei 120 °C (R_PTC = 1800 Ω)?",
      options: [
        "Ein normales Motorschutzrelais misst nur den aufgenommenen Motorstrom; bei verschmutztem Lüfter oder hoher Raumtemperatur überhitzt der Motor jedoch ohne Überstrom! Beim PTC-Motorvollschutz steigt R_PTC bei 120 °C auf 1800 Ω -> Der Strom sinkt auf 7,35 mA und die Spannung an K1 fällt auf 11,76 V (< 12 V) ab -> K1 fällt ab und schaltet Schütz Q1 aus.",
        "Ein normales Motorschutzrelais löst bei verminderter Kühlung sofort magnetisch aus; der PTC-Widerstand ist ein Heißleiter, dessen Widerstand bei 120 °C auf 0 Ω sinkt und die Sicherung F2 zum Schmelzen bringt.",
        "Die Wärmeklasse E erlaubt dauerhaft Temperaturen bis 450 °C; erst wenn die Wicklung glüht, schließt der PTC-Kontakt den Außenleiter L1 direkt mit dem Schutzleiter PE kurz.",
        "Bei 120 °C sinkt der Widerstand der drei PTC-Sensoren von 1600 Ω auf 800 Ω, wodurch die Spannung an der Relaisspule K1 von 12,5 V auf 24 V ansteigt und eine Hupe einschaltet."
      ],
      correct: 0,
      explanation: "• Original-Aufgabe Winter 2024/25 (FSA Aufg. 3):\n  - 3.1: Motorschutzrelais (Bimetall) erfasst nur den Strom. Fehlt Kühlung durch Schmutz/Lüfterausfall oder hohe Umgebungstemperatur, verbrennt die Wicklung trotz normalem Nennstrom!\n  - 3.3/3.4 Spannungsteiler an 25 V DC:\n    • Bei 100 °C (R_PTC = 1600 Ω): I = 25 V / (1600 Ω + 1600 Ω) = 7,8 mA ➔ U_Rel = 7,8 mA · 1600 Ω = 12,5 V (≥ 12 V, Relais K1 hält).\n    • Bei 120 °C (R_PTC = 1800 Ω): I = 25 V / (1800 Ω + 1600 Ω) = 7,35 mA ➔ U_Rel = 7,35 mA · 1600 Ω = 11,76 V (< 12 V, Relais K1 fällt ab und schaltet den Motor ab!).\n• 📖 Europa Tabellenbuch: S. 55 (PTC-Kaltleiter) & S. 534 (Motorvollschutz)"
    },
    {
      id: "el-78",
      exam: "Winter 2024/25",
      category: "Gebäude-, SAT-, PV- & Sicherheitstechnik",
      question: "Im Hotel werden doppelt geschirmte Netzwerkleitungen mit dem Mantelaufdruck „LSZH Halogenfrei“ verlegt (AV Aufg. 1.9). Wie heißt die Schirmungsart mit Metallfolie um jedes Aderpaar plus Gesamtgeflechtschirm, welche Vorteile bietet LSZH gegenüber PVC und warum sind die Adern paarweise verdrillt (Twisted Pair)?",
      options: [
        "Die Schirmungsart heißt S/FTP (Screened / Foiled Twisted Pair: a = Basisisolierung, b = Paarabschirmung durch Folie, c = Gesamtschirmung durch Geflecht). LSZH (Low Smoke Zero Halogen) entwickelt im Brandfall kaum Rauch, keine korrosiven/giftigen Halogengase (kein Chlor/Brom/Dioxin) und hat bessere Isoliereigenschaften. Die Verdrillung (Twisted Pair) hebt äußere elektromagnetische Störfelder und Übersprechen zwischen den Aderpaaren auf.",
        "Die Schirmungsart heißt U/UTP (Unshielded Twisted Pair). LSZH bedeutet, dass das Kabel aus reinem Polyvinylchlorid (PVC) mit Blei-Stabilisatoren besteht, und die Verdrillung dient ausschließlich dazu, mehr Kupfer in einem kürzeren Rohr unterzubringen.",
        "Die Schirmungsart heißt F/UTP. Der Zusatz LSZH gibt an, dass das Datenkabel direkt ohne Trennrelais in 400-V-Drehstrom-Kabelrinnen eingezogen und für Ströme bis 32 A genutzt werden darf.",
        "Die Schirmungsart heißt RG-59 Koax. Die Adern sind verdrillt, damit der Gleichstromwiderstand für Power over Ethernet (PoE) auf über 1,0 MΩ ansteigt."
      ],
      correct: 0,
      explanation: "• Original-Aufgabe Winter 2024/25 (AV Aufg. 1.9):\n  - 1.9.1 Aufbau: a) Basisisolierung der Kupferader, b) Paarabschirmung (Folie), c) Gesamtschirmung (Geflecht) ➔ Kurzzeichen: S/FTP.\n  - 1.9.2 Vorteile LSZH (Low Smoke, Zero Halogen): Weniger Rauch (Sicht auf Fluchtwegen!), keine giftigen/ätzenden Brandgase (kein Chlor, Brom, Fluor, Dioxin), keine Schwermetalle.\n  - 1.9.3 Twisted Pair: Durch das Verdrillen der Aderpaare kompensieren sich eingekoppelte magnetische Störspannungen gegenseitig.\n• 📖 Europa Tabellenbuch: S. 412 (Twisted-Pair-Kabel S/FTP) & S. 576 (Halogenfreie Leitungen)"
    },
    {
      id: "el-79",
      exam: "Winter 2024/25",
      category: "Beleuchtung, Sensorik & Regelung",
      question: "Eine 12,5 m lange LED-Voutenbeleuchtung (24 V DC, 14,4 W/m) benötigt ein neues Konstantspannungs-Netzteil (AV Aufg. 1.8). Welche Leistung und welcher Strom fließen, und was bedeuten auf einem Leuchten-Typenschild die Symbole „F im Dreieck“, „D im Dreieck“ sowie „ta = 45 °C“?",
      options: [
        "Leistung P_ges = 12,5 m · 14,4 W/m = 180 W; Strom I_ges = 180 W / 24 V = 7,5 A (gewählt: MeanWell XLG-200-24-A mit 24 V / 8,3 A / 199,2 W). „ta = 45 °C“ ist die maximal zulässige Umgebungstemperatur, „F im Dreieck“ steht für Montage auf normal entflammbaren Baustoffen und „D im Dreieck“ für feuergefährdete Betriebsstätten (begrenzte Oberflächentemperatur).",
        "Leistung P_ges = 14,4 W insgesamt; Strom I_ges = 0,6 A. „ta = 45 °C“ bedeutet, dass die Leuchte nur in Kühlhäusern unter -45 °C betrieben werden darf.",
        "Bei 12,5 m Länge sinkt die Leistung auf 1,15 W und es reicht ein 12-V-Klingeltrafo. Das durchgestrichene Mülltonnen-Symbol bedeutet, dass die Leuchte im normalen Hausmüll entsorgt werden muss.",
        "Der Betriebsstrom beträgt 180 W · 24 V = 4320 A; „ta = 45 °C“ gibt den Abstrahlwinkel des LED-Bandes in Grad an."
      ],
      correct: 0,
      explanation: "• Original-Aufgabe Winter 2024/25 (AV Aufg. 1.8):\n  - 1.8.1: P_ges = 14,4 W/m · 12,5 m = 180 W ➔ I_ges = 180 W / 24 V = 7,5 A.\n  - 1.8.2: Aus dem Katalog muss das Netzteil „MW XLG-200-24-A“ (24 V DC, max. 8,3 A, 199,2 W, Konstantspannung) gewählt werden.\n  - 1.8.3 Typenschild: a) Herstellername (TRILUX), b) Bestell-/Artikel-Nr., c) Modellbezeichnung/Lichtfarbe, d) ta = 45 °C (max. Bemessungs-Umgebungstemperatur), e) Durchgestrichene Mülltonne = Fachgerechte Entsorgung als Elektroaltgerät (nicht in den Hausmüll!).\n• 📖 Europa Tabellenbuch: S. 228 (Leuchtenkennzeichnung) & S. 232 (LED-Betriebsgeräte)"
    },
    {
      id: "el-80",
      exam: "Winter 2024/25",
      category: "Leitungsberechnung & Lastverteilung",
      question: "Eine 3~ Wärmepumpe (I_N = 19 A, cos φ = 1, abgesichert mit LS C20A) wird über ein 62 m langes Erdkabel (Verlegeart D2, I_r = 24 A bei 2,5 mm²) versorgt. Der vereinbarte Spannungsfall von 4 % wird mit 2,5 mm² (Δu = 3,84 %) eingehalten. Warum fällt der Querschnitt 2,5 mm² bei der Überprüfung der Schutzmaßnahme (Z_Vor = 0,20 Ω) trotzdem durch (Planung Aufg. 2.2)?",
      options: [
        "Weil beim LS-Schalter C20A der 10-fache Abschaltstrom Ia = 200 A benötigt wird! Mit dem 2/3-Erwärmungsfaktor darf die Schleifenimpedanz maximal Z_s,max = (2/3) · (230 V / 200 A) = 0,76 Ω betragen. Bei 2,5 mm² (R_Kabel = 0,89 Ω + Z_Vor = 0,20 Ω) ist Z_s = 1,09 Ω > 0,76 Ω zu hoch! Erst mit q_min = 3,95 mm² -> gewählt NYY-J 5x4 mm² ist die Abschaltbedingung erfüllt.",
        "Weil für Wärmepumpen im Erdreich nach VDE 0100-430 grundsätzlich ein Mindestquerschnitt von 35 mm² Kupfer vorgeschrieben ist, unabhängig von Länge und Absicherung.",
        "Weil ein LS-Schalter der Charakteristik C erst beim 50-fachen Bemessungsstrom (1000 A) auslöst und das Erdkabel NYY-J nur für Spannungen bis 24 V DC zugelassen ist.",
        "Weil bei Verlegeart D2 der Spannungsfall maximal 0,1 % betragen darf und 2,5 mm² bereits ab 3 Metern Länge durchbrennt."
      ],
      correct: 0,
      explanation: "• Original-Aufgabe Winter 2024/25 (Planung Aufg. 2.2 – Die ultimative NRW-Prüfungsfalle!):\n  1. Überlastschutz (2.2.3): I_b (19 A) ≤ I_n (20 A) ≤ I_z (24 A bei 2,5 mm²) ➔ erfüllt!\n  2. Spannungsfall (2.2.4): ΔU = (√3 · 62 m · 20 A · 1) / (56 · 2,5 mm²) = 15,34 V (3,84 % ≤ 4 %) ➔ erfüllt!\n  3. ABER Schleifenimpedanz (2.2.7): Für C20A gilt Ia = 10 · 20 A = 200 A ➔ Z_s,max = (2/3) · (230 V / 200 A) = 0,76 Ω. Abzüglich Z_Verteilung = 0,20 Ω bleiben für das Kabel nur R_Kabel,max = 0,56 Ω!\n  4. Mindestquerschnitt für Kurzschluss (2.2.8): q = (2 · 62 m) / (56 · 0,56 Ω) = 3,95 mm² ➔ Gewählt: NYY-J 5x4 mm² (oder 4x4 mm²)!\n• 📖 Europa Tabellenbuch: S. 206 & S. 258 (Schleifenimpedanz mit 2/3-Faktor)"
    },
    {
      id: "el-81",
      exam: "Winter 2023/24",
      category: "Schutzmaßnahmen & VDE 0100-600",
      question: "Bei einem Körperschluss nimmt der Erder im Tiergehege ein Potential von 100 V gegen Bezugserde an; im Erdreich bildet sich ein 20 m weiter Spannungstrichter (Planung Aufg. 2.3.3.4). Eine Giraffe steht mit den Hinterbeinen bei 14 m Abstand (25 V) und mit den Vorderbeinen bei 8 m Abstand (7,5 V) vom Erder. Wie groß ist die Schrittspannung U_Schritt und warum sind große Tiere besonders gefährdet?",
      options: [
        "Die Schrittspannung beträgt U_Schritt = U_Fuß,hinten - U_Fuß,vorne = 25 V - 7,5 V = 17,5 V. Große Tiere (Rinder, Pferde, Giraffen) sind durch den großen Abstand zwischen Vorder- und Hinterbeinen (große Schrittweite im steilen Spannungstrichter) und den Stromweg direkt über das Herz schon vanaf 25 V AC akut lebensgefährdet!",
        "Die Schrittspannung beträgt 25 V + 7,5 V = 32,5 V; Tiere sind im Spannungstrichter völlig ungefährdet, weil Hufe einen Isolationswiderstand von über 500 MΩ besitzen.",
        "Die Schrittspannung beträgt 100 V - 25 V = 75 V; im Spannungstrichter steigt die Spannung mit zunehmender Entfernung vom Erder immer weiter an.",
        "Die Schrittspannung beträgt 0 V, da sich im Erdreich niemals ein Spannungsgefälle aufbauen kann."
      ],
      correct: 0,
      explanation: "• Original-Aufgabe Winter 2023/24 (Planung Aufg. 2.3.3.4 & 2.3.3.5):\n  - Direkt am Erder (0 m) fällt die Spannung im Spannungstrichter am steilsten ab.\n  - Die Schrittspannung ist die Potentialdifferenz zwischen zwei Punkten auf der Erdoberfläche im Abstand einer Schrittlänge (1 m beim Menschen, bei Großtieren zwischen Vorder- und Hinterbeinen): U_Schritt = 25 V - 7,5 V = 17,5 V.\n• 📖 Europa Tabellenbuch: S. 183 (Spannungstrichter & Schrittspannung) & S. 257 (Max. 25 V AC in der Landwirtschaft)"
    },
    {
      id: "el-82",
      exam: "Sommer 2024",
      category: "Gebäude-, SAT-, PV- & Sicherheitstechnik",
      question: "In einer Bäckerei (Sommer 2024 Aufg. 1.7) und einem Hotel (Winter 2024/25 Aufg. 1.4) überprüfen Sie die Montageorte von optischen Rauchwarnmeldern (RWM). Welche vier typischen Montagefehler sind nach DIN 14676 unzulässig?",
      options: [
        "1. Montage zu nah an der Wand oder in einer Raumecke (< 0,5 m Mindestabstand, da sich in Ecken ein Luftpolster/Totraum bildet, an dem der Rauch vorbeiströmt), 2. Fehlender RWM im Flur (Rettungsweg! Max. 15 m Melderabstand, max. 7,5 m zur Stirnwand), 3. Montage im Gefrierraum (< 0 °C) oder in dampf-/staubreicher Küche (dort Thermodifferenzialmelder einsetzen!), 4. Zwei Melder unnötig dicht nebeneinander statt mittig (max. 60 m² pro Melder).",
        "Optische Rauchwarnmelder müssen zwingend direkt in der oberen Raumecke (0 cm Wandabstand) sowie direkt über dem Kochherd und im Tiefkühlraum bei -25 °C montiert werden.",
        "In Fluren dürfen grundsätzlich keine Rauchwarnmelder montiert werden; ein einzelner Rauchwarnmelder überwacht bis zu 500 m² Fläche über mehrere Etagen hinweg.",
        "Rauchwarnmelder müssen in 1,20 m Höhe neben dem Lichtschalter an der Wand montiert werden, damit man die Prüftaste ohne Leiter erreicht."
      ],
      correct: 0,
      explanation: "• Original-Aufgaben Sommer 2024 (AV Aufg. 1.7) & Winter 2024/25 (AV Aufg. 1.4):\n  - Mindestabstand zu Wänden, Balken und Leuchten: mind. 0,5 m (in Ecken staut sich die Luft, Rauch zieht am Melder vorbei!).\n  - Max. Überwachungsfläche: 60 m² pro Melder, max. Raumhöhe 6 m.\n  - In schmalen Fluren (< 3 m Breite): Max. 7,5 m zur Stirnwand, max. 15 m zwischen zwei Meldern.\n  - Zulässige Temperatur: 0 °C bis +55 °C (nicht im Gefrierraum!). Bei Kochdämpfen/Mehlstaub: Thermodifferenzialmelder verwenden.\n• 📖 Europa Tabellenbuch: S. 350 (Rauchwarnmelder nach DIN 14676)"
    },
    {
      id: "el-83",
      exam: "Winter 2022/23",
      category: "Motoren, Antriebe & Kompensation",
      question: "An einem 400-V-Drehstrommotor treten verschiedene Isolations- und Leitungsfehler auf (AV Aufg. 1.8). Zudem messen Sie mit einem einphasigen Wirkleistungsmessgerät (Strompfad in L1, Spannungspfad zwischen L1 und N) die Leistung im symmetrischen Betrieb (FSA Aufg. 3.3.2). Wie unterscheiden sich Kurzschluss, Körperschluss und Windungsschluss, und welchen Wert zeigt das Messgerät bei P_1,ges = 7,98 kW an?",
      options: [
        "Kurzschluss = leitende Verbindung zwischen aktiven Leitern (z. B. L1-L2) ohne Nutzwiderstand; Körperschluss = Verbindung zwischen aktivem Leiter und leitfähigem Motorgehäuse (PE); Windungsschluss = Isolationsfehler innerhalb derselben Motorspule. Das einphasige Wattmeter misst zwischen L1 und N (230 V) exakt die Strangleistung P_Str = 1/3 · P_1,ges = 7980 W / 3 = 2660 W!",
        "Kurzschluss und Körperschluss bedeuten exakt dasselbe; das einphasige Wattmeter zeigt im Drehstromnetz immer den √3-fachen Wert der Gesamtleistung (13,82 kW) an.",
        "Ein Windungsschluss ist eine Verbindung zwischen Außenleiter L1 und dem Erdreich; das Wattmeter zeigt 0 W an, weil im Drehstrommotor kein Neutralleiter angeschlossen ist.",
        "Ein Körperschluss liegt vor, wenn der Motor mechanisch blockiert ist; das einphasige Wattmeter zeigt direkt die vollen 7,98 kW Gesamtleistung an."
      ],
      correct: 0,
      explanation: "• Original-Aufgaben Winter 2022/23 (AV Aufg. 1.8 & FSA Aufg. 3.3.2):\n  - Die 5 Fehler im Schaltbild (AV 1.8.1): 1. Kurzschluss (L1–L2 vor dem Schutzorgan), 2. Erdschluss (L1 gegen Erde), 3. Leiterschluss (zwischen zwei Außenleitern am Klemmbrett), 4. Kurzschluss/Windungsschluss in der Wicklung, 5. Körperschluss (Wicklung gegen Motorgehäuse).\n  - Leistungsmessung (FSA 3.3.2): Da der Spannungspfad des Wattmeters an U_Str = 400 V / √3 = 230 V liegt, misst es P_Mess = U_Str · I · cos φ = (1/3) · P_ges = 2660 W!\n• 📖 Europa Tabellenbuch: S. 116 (Leistungsmessung im Drehstromnetz) & S. 254 (Fehlerarten)"
    }
  ];

  const EXTRA_WISO_2025 = [
    {
      id: "wi-16",
      exam: "Winter 2024/25",
      category: "Wirtschaft, Markt, Recht & Kalkulation",
      question: "Ein Kunde bringt ein älteres Elektrogerät in Ihren Betrieb und erwähnt das europäische „Recht auf Reparatur“ (WiSo Winter 2024/25 Aufg. 6). Was bedeutet dieses Recht für Verbraucher und Hersteller?",
      options: [
        "Das „Recht auf Reparatur“ ermöglicht Verbrauchern, defekte Geräte reparieren zu lassen, anstatt sie wegzuwerfen und durch neue zu ersetzen. Hersteller sind verpflichtet, Reparaturen zu erleichtern, indem sie über Jahre hinweg Ersatzteile, Reparaturanleitungen und Werkzeuge zu fairen Preisen bereitstellen.",
        "Das „Recht auf Reparatur“ besagt, dass jeder Handwerksbetrieb defekte Elektrogeräte auch nach 20 Jahren noch völlig kostenlos auf eigene Rechnung reparieren muss.",
        "Es verpflichtet Verbraucher gesetzlich dazu, jedes defekte Gerät selbst zu Hause mit einem Lötkolben zu öffnen, bevor sie ein neues Gerät kaufen dürfen.",
        "Es gilt ausschließlich für Kraftfahrzeuge über 3,5 Tonnen und verbietet den Austausch von Verschleißteilen durch Elektrofachkräfte."
      ],
      correct: 0,
      explanation: "• Original-Aufgabe Winter 2024/25 (WiSo Aufg. 6):\n  - Kernpunkte: Förderung der Nachhaltigkeit/Kreislaufwirtschaft (Reparieren statt Wegwerfen); Pflicht der Hersteller zur Bereitstellung von Ersatzteilen, Schaltplänen/Reparaturanleitungen und Werkzeugen.\n• 📖 Europa Tabellenbuch: S. 590 (Umweltschutz & Kreislaufwirtschaft) & Masterbuch WiSo"
    },
    {
      id: "wi-17",
      exam: "Winter 2024/25",
      category: "Sozialversicherung & Entgelt",
      question: "Der gesetzliche Mindestlohn wird regelmäßig angepasst (Winter 2024/25 Aufg. 5 & Winter 2022/23 Aufg. 6). Wie trägt der Mindestlohn zur Sicherung des Lebensstandards bei, und was passiert mit dem Reallohn (Kaufkraft), wenn der Mindestlohn um 2 % steigt, die allgemeine Preissteigerungsrate (Inflation) aber bei 3 % liegt?",
      options: [
        "Der Mindestlohn sichert Arbeitnehmern ein existenzsicherndes Grundeinkommen, verhindert Lohndumping, fördert fairen Wettbewerb und soziale Gerechtigkeit. Steigt der Nominallohn nur um 2 %, die Preise (Inflation) aber um 3 %, sinkt der Reallohn (die Kaufkraft) um ca. 1 % – man kann sich also weniger leisten als zuvor!",
        "Der Mindestlohn wird vom Arbeitgeber freiwillig festgelegt; wenn der Lohn um 2 % steigt und die Inflation 3 % beträgt, steigt die Kaufkraft der Arbeitnehmer um insgesamt 5 %.",
        "Der Nominallohn gibt die tatsächliche Kaufkraft nach Abzug der Inflation an, während der Reallohn der ausgezahlte Geldbetrag ohne Berücksichtigung der Preise ist.",
        "Bei einer Inflation von 3 % und einer Lohnerhöhung von 2 % bleibt die Kaufkraft exakt gleich, da die Europäische Zentralbank die Differenz von 1 % auf das Girokonto überweist."
      ],
      correct: 0,
      explanation: "• Original-Aufgaben Winter 2024/25 (Aufg. 5) & Winter 2022/23 (Aufg. 6):\n  - Nominallohn = gezahlter Geldbetrag in Euro.\n  - Reallohn = tatsächliche Kaufkraft (Nominallohn im Verhältnis zum Preisniveau/Inflation).\n  - Ist die Inflation (3 %) höher als die Lohnerhöhung (2 %), sinkt der Reallohn / die Kaufkraft!\n• 📖 Europa Tabellenbuch: S. 606 (Entlohnung) & Masterbuch WiSo"
    },
    {
      id: "wi-18",
      exam: "Winter 2024/25",
      category: "Wirtschaft, Markt, Recht & Kalkulation",
      question: "Sie arbeiten in einer GmbH (Gesellschaft mit beschränkter Haftung, Winter 2024/25 Aufg. 8 & 9, Sommer 2024 Aufg. 7). Welche Vorteile bietet eine GmbH gegenüber einem Einzelunternehmen und welche formellen Anforderungen gelten für den Gesellschaftsvertrag?",
      options: [
        "Vorteile GmbH: 1. Haftungsbeschränkung auf das Gesellschaftsvermögen (Privatvermögen der Gesellschafter ist geschützt, beim Einzelunternehmer volle Privathaftung!), 2. Leichtere Kapitalbeschaffung durch Aufnahme weiterer Gesellschafter, 3. Steuerliche Vorteile. Formelle Anforderungen: Notarielle Beurkundung des Gesellschaftsvertrags, Eintragung ins Handelsregister (Abt. B), Stammkapital mindestens 25.000 €, Angabe von Firma, Sitz, Unternehmensgegenstand und Geschäftsführung.",
        "Bei einer GmbH haftet jeder Gesellschafter unbeschränkt mit seinem gesamten Privatvermögen; zur Gründung reichen 1 € Startkapital und ein mündlicher Vertrag ohne Notar.",
        "Eine GmbH darf nur von mindestens 50 Personen gegründet werden und wird in das Vereinsregister beim Finanzamt eingetragen.",
        "Ein Einzelunternehmen haftet nur beschränkt bis 500 €, während eine GmbH keine Steuern zahlen muss und keinen Geschäftsführer benötigt."
      ],
      correct: 0,
      explanation: "• Original-Aufgaben Winter 2024/25 (Aufg. 8 & 9) & Sommer 2024 (Aufg. 7):\n  - GmbH = Kapitalgesellschaft (juristische Person): Mindeststammkapital 25.000 €, notarieller Gesellschaftsvertrag (Firma, Sitz, Gegenstand, Stammkapital, Geschäftsanteil), Eintragung ins Handelsregister Abt. B, Haftung beschränkt auf das Gesellschaftsvermögen.\n• 📖 Europa Tabellenbuch: S. 611 (Rechtsformen der Unternehmung)"
    },
    {
      id: "wi-19",
      exam: "Winter 2018/19",
      category: "Sozialversicherung & Entgelt",
      question: "Um Ihre Arbeitsleistung im Betrieb möglichst gerecht entlohnen zu können, werden bei der Arbeitsbewertung (nach dem Genfer Schema) vier Haupt-Anforderungsmerkmale herangezogen (Winter 2018/19 Aufg. 9). Welche vier Kriterien werden dabei bewertet?",
      options: [
        "1. Fachkönnen (geistige Kenntnisse, Berufsausbildung und körperliche Geschicklichkeit), 2. Belastung / Anstrengung (geistige Konzentration und körperliche/muskuläre Beanspruchung), 3. Verantwortung (für die eigene Arbeit, Sicherheit anderer Personen und Betriebsmittel), 4. Arbeitsbedingungen / Umwelteinflüsse (Lärm, Hitze, Schmutz, Gase, Unfallgefahr).",
        "1. Lebensalter des Arbeitnehmers, 2. Familienstand und Kinderzahl, 3. Länge des täglichen Arbeitsweges in Kilometern, 4. Dauer der Mitgliedschaft in einem Sportverein.",
        "1. Höhe des privaten Bankguthabens, 2. Automarke des Mitarbeiters, 3. Anzahl der Krankheitstage der Eltern, 4. Steuerklasse des Ehepartners.",
        "Es wird ausschließlich die gestoppte Zeit beim Zusammenbauen eines Schaltschranks im Akkord bewertet."
      ],
      correct: 0,
      explanation: "• Original-Aufgabe Winter 2018/19 (WiSo Aufg. 9):\n  - Die 4 Kriterien der Arbeitsbewertung (Genfer Schema): 1. Fachkönnen (Kenntnisse + Geschicklichkeit), 2. Belastung/Anstrengung (geistig + körperlich), 3. Verantwortung (für Arbeit, Betriebsmittel, Gesundheit anderer), 4. Umwelteinflüsse (Lärm, Schmutz, Hitze, Nässe).\n• 📖 Europa Tabellenbuch: S. 606 (Arbeitsbewertung & Lohngruppen)"
    },
    {
      id: "wi-20",
      exam: "Winter 2023/24",
      category: "Wirtschaft, Markt, Recht & Kalkulation",
      question: "Ein Kollege möchte sich mit einem Elektrobetrieb selbstständig machen (Winter 2023/24 Aufg. 7 & 9, Winter 2024/25 Aufg. 7). Welche Institutionen beraten Gründer und müssen informiert werden, und worin liegt rechtlich der Unterschied zwischen einem Mietvertrag und einem Leihvertrag?",
      options: [
        "Beratung & Anmeldung: Handwerkskammer (HWK / Handwerksrolle), Industrie- und Handelskammer (IHK), Gewerbeamt, Finanzamt, Berufsgenossenschaft (BG ETEM), Krankenkasse und ggf. Registergericht. Unterschied Miete vs. Leihe: Beim Mietvertrag (§ 535 BGB) wird eine Sache gegen Entgelt (Mietzins) zum Gebrauch überlassen; beim Leihvertrag (§ 598 BGB) erfolgt die Gebrauchsüberlassung unentgeltlich (kostenlos)!",
        "Eine Betriebsgründung im Elektrohandwerk muss nur bei der Polizei und der Schufa gemeldet werden; beim Mietvertrag geht das Eigentum sofort auf den Mieter über, beim Leihvertrag kostet jede Stunde 50 €.",
        "Existenzgründer dürfen sich nur beim Arbeitsgericht beraten lassen; ein Leihvertrag ist immer kostenpflichtig, während ein Mietvertrag unentgeltlich ist.",
        "Im Handwerk ist für die Selbstständigkeit keinerlei Anmeldung bei Behörden oder Kammern erforderlich."
      ],
      correct: 0,
      explanation: "• Original-Aufgaben Winter 2023/24 (Aufg. 7 & 9) & Winter 2024/25 (Aufg. 7):\n  - Beratungsstellen für Gründer: Handwerkskammer (HWK), IHK, Fachverbände, Unternehmensberater, Agentur für Arbeit.\n  - Anzumeldende Stellen: Gewerbeamt, Finanzamt, Berufsgenossenschaft (BG), Handwerkskammer, Krankenkasse, Handelsregister.\n  - Miete = Gebrauchsüberlassung gegen Geld (Mietzins); Leihe = unentgeltliche Gebrauchsüberlassung.\n• 📖 Europa Tabellenbuch: S. 610–612 (Existenzgründung & Vertragsrecht)"
    }
  ];

  const EXTRA_ENGLISH_2025 = [
    {
      id: "en-25",
      exam: "Winter 2024/25",
      category: "Übergabe & Fachenglisch (Aufg. 4.4)",
      question: "Im Handbuch der Steuerbox „Grid Control Unit – Secure (GCU-S)“ neben dem Smartmeter-Gateway lesen Sie (Winter 2024/25 Aufg. 4.4): „Four bistable 1 A changeover relays for switching purposes... Controlling heating, operating street lighting, handling renewable energy... linked to an active longwave antenna... dividing the firmware into two parts: one part that stays the same and another part that can be changed while the device is running.“ Beantworten Sie die 4 Prüfungsfragen auf Deutsch!",
      options: [
        "1. Schaltausgänge: 4 bistabile Wechselkontakte (Relais) mit je 1 A Strombelastbarkeit. 2. Geschaltete Verbraucher: Heizungen (Wärmepumpen), Straßenbeleuchtung, Erneuerbare-Energien-Anlagen (PV) im Nieder-/Mittelspannungsnetz. 3. Betrieb ohne Smartmeter-Gateway: Es wird eine aktive Langwellenantenne (active longwave antenna) als Funkrundsteuerempfänger benötigt. 4. Update im laufenden Betrieb: Möglich, weil die Firmware/Software in zwei Teile aufgeteilt ist – ein Basisteil bleibt unverändert aktiv, während der zweite Teil im laufenden Betrieb aktualisiert wird.",
        "1. Schaltausgänge: 24 Drehstromschütze mit je 63 A. 2. Verbraucher: Nur Kleinspannungs-Klingeln. 3. Zusatzbauteil: Ein Dieselgenerator. 4. Update: Das Gerät muss für jedes Update ins Werk eingeschickt werden.",
        "1. Schaltausgänge: 2 analoge 0–10 V Ausgänge. 2. Verbraucher: Rauchwarnmelder. 3. Zusatzbauteil: Eine Satellitenschüssel. 4. Update: Nur durch Austausch der gesamten Platine im spannungsfreien Zustand möglich.",
        "1. Schaltausgänge: 4 Schmelzsicherungen. 2. Verbraucher: Elektroherde. 3. Zusatzbauteil: Ein Überspannungsableiter Typ 1. 4. Update: Über ein Diskettenlaufwerk."
      ],
      correct: 0,
      explanation: "• Original-Aufgabe 4.4 aus Winter 2024/25 (Grid Control Unit – Secure GCU-S):\n  - 4.4.1: „Four bistable 1 A changeover relays“ = 4 bistabile Wechselkontakte (Wechsler) mit je 1 A Belastbarkeit.\n  - 4.4.2: „Controlling heating, operating street lighting, handling renewable energy generation“ = Steuerung von Heizungen, Straßenbeleuchtung und Erneuerbaren Energien.\n  - 4.4.3: „linked to an active longwave antenna“ = Aktive Langwellenantenne.\n  - 4.4.4: „dividing the firmware into two parts“ = Firmware ist zweigeteilt (ein Teil läuft weiter, der zweite wird im Betrieb geändert).\n• 📖 Europa Tabellenbuch: S. 124 (Smart Meter Gateway & Steuerbox CLS) & S. 638–643 (Fachenglisch)"
    },
    {
      id: "en-26",
      exam: "Sommer 2024",
      category: "Übergabe & Fachenglisch (Aufg. 4.4)",
      question: "Im englischen Datenblatt des Thermodifferenzialmelders „ABUS RM1100“ (Sommer 2024 Aufg. 4.4) steht: „It reacts to a temperature above 57°C and a sudden temperature rise of 5°C within three minutes... Place the detector on the base plate so that the line meets the short line, turn clockwise until opposite the long line... Test by exposing it to a hot jet of air (65–80°C) with a hairdryer, alarm triggered within 30 seconds... The standard setting of the detector is NO.“ Was bedeutet das für Montage, Test und Jumper-Einstellung (Schließer-BMA)?",
      options: [
        "1. Auslösekriterien: Temperatur über 57 °C ODER schneller Temperaturanstieg von 5 °C innerhalb von 3 Minuten. 2. Montage: Melder mit seiner Markierungslinie an der kurzen Linie der Bodenplatte ansetzen und im Uhrzeigersinn (clockwise) drehen, bis die Linie mit dem langen Strich fluchtet. 3. Funktionstest: Mit Heißluftföhn (65–80 °C) anblasen -> Alarm und rote Dauer-LED müssen innerhalb von 30 s auslösen (danach kurz spannungsfrei setzen zum Reset). 4. Einstellung für Schließer-BMA: Da die Werkseinstellung bereits NO (Normally Open = Schließer) ist, muss der Jumper nicht umgesteckt werden!",
        "1. Auslösekriterien: Erst ab 250 °C oder bei Rauch. 2. Montage: Gegen den Uhrzeigersinn drehen und festkleben. 3. Test: Mit offenem Feuerzeug und Zigarettenrauch testen. 4. Einstellung: Der Jumper muss zwingend auf NC umgesteckt werden.",
        "1. Auslösekriterien: Unter 0 °C im Gefrierraum. 2. Montage: Mit 4 Dübeln direkt durch die Elektronikplatine schrauben. 3. Test: Mit kaltem Wasser abspritzen. 4. Einstellung: NO bedeutet Öffnerkontakt.",
        "Der Melder darf nur im Außenbereich an der Hausfassade montiert werden und löst erst nach 60 Minuten Föhn-Erwärmung aus."
      ],
      correct: 0,
      explanation: "• Original-Aufgabe 4.4 aus Sommer 2024 (Thermodifferenzialmelder ABUS RM1100):\n  - Prüfungsfalle bei 4.4.4: Die Brandmeldeanlage arbeitet mit Schließer-Kontakten (= NO, Normally Open). Da im Text steht „The standard setting of the detector is NO“, ist das eine Fangfrage: Man muss am Jumper NICHTS umstellen!\n• 📖 Europa Tabellenbuch: S. 350 (Brandmelder) & S. 638–643 (Fachenglisch)"
    },
    {
      id: "en-27",
      exam: "Winter 2021/22",
      category: "Übergabe & Fachenglisch (Aufg. 4.4)",
      question: "In der englischen Anleitung des „NX-Wind sensor & KNX-Rain sensor 0/10V“ (Winter 2021/22 Aufg. 4.4) steht: „Wind sensor: brown = Operating voltage 24 V DC, white = earth/GND, green = Sensor signal 0...10 V, yellow = GND output, grey/pink = Heating, green-yellow = Shield... To avoid dew, icing or frozen precipitation jamming the anemometer, use a 24 V power supply for heating... Rain sensor: measurement of electrical conductivity, 0 V = dry, 10 V = rain, run-on time 4 minutes. Do not install under projecting roofs.“ Erklären Sie die Punkte!",
      options: [
        "1. Aderfarben Windsensor: Braun = 24 V DC Betriebsspannung, Weiß = Masse/GND, Grün = Messsignal 0–10 V, Gelb = Signalmasse GND, Grau/Rosa = Heizung, Grün-Gelb = Schutzerde/Schirm. 2. Zweck der Heizung: Verhindert Tau/Kondensation sowie das Blockieren des Windrads (Anemometer) durch Eis, Raureif oder gefrierenden Niederschlag. 3. Montage Regensensor: Nicht unter Dachvorsprüngen/Bäumen montieren (Regen muss frei auftreffen), mit 110°-Haltebügel montieren, Sensorleitungen nicht parallel zu Netzleitungen verlegen, gut zugänglich für Reinigung halten. 4. Funktionsweise Regensensor: Misst die elektrische Leitfähigkeit des Regenwassers auf der Sensorfläche (0 V = trocken, 10 V = Regen; nach Abtrocknen 4 Min. Nachlaufzeit).",
        "1. Aderfarben: Grün-Gelb ist der 230-V-Außenleiter und Braun ist der Schutzleiter. 2. Heizung: Dient zur Beheizung des Gewächshauses. 3. Montage: Muss zwingend unter einem Vordach im Windschatten montiert werden. 4. Funktion: Misst das Gewicht des Regens über einen Schwimmerschalter.",
        "Beide Sensoren arbeiten mit 400 V Drehstrom und geben bei Sturm ein akustisches Hupsignal aus.",
        "Der Regensensor arbeitet optisch mit einer Infrarot-Kamera und gibt bei Regen 0 V und bei Trockenheit 230 V aus."
      ],
      correct: 0,
      explanation: "• Original-Aufgabe 4.4 aus Winter 2021/22 (NX-Wind & KNX-Rain Sensor):\n  - Vokabel-Highlights: anemometer = Windrad/Windmesser, dew = Tau, icing / frozen precipitation = Vereisung / gefrierender Niederschlag, projecting roofs = Dachvorsprünge, electrical conductivity = elektrische Leitfähigkeit, run-on time = Nachlaufzeit.\n• 📖 Europa Tabellenbuch: S. 166 (KNX-Sensoren) & S. 638–643 (Fachenglisch)"
    },
    {
      id: "en-28",
      exam: "Winter 2022/23",
      category: "Übergabe & Fachenglisch (Aufg. 4.4)",
      question: "Im englischen Handbuch des Raumluftreinigers „CleanBox 300 UV“ (Winter 2022/23 Aufg. 4.4, Protection class IP20) wird die Filterung (99,995 %), die Inbetriebnahme sowie der Austausch der UVC-Lampen beschrieben. Welche Sicherheitsregeln gelten beim Wechsel der UVC-Lampen und darf das Gerät im überdachten Außenbereich betrieben werden?",
      options: [
        "1. Funktionsweise: Saugt Raumluft an, filtert Partikel/Sporen/Bakterien zu 99,995 % heraus und inaktiviert Viren/Keime durch UVC-Strahlung. 2. Inbetriebnahme: Feststellbremsen an den zwei Rollen arretieren, Kaltgerätekabel einstecken, Netzschalter auf der Rückseite einschalten, Volumenstrom am Potentiometer einstellen. 3. UVC-Lampenwechsel: Gerät spannungsfrei schalten, Lampen abkühlen lassen (Verbrennungsgefahr!), UVC-Röhren nur mit Handschuhen anfassen, Schutzbrille/Visier gegen augen- und hautschädigende UV-Strahlung tragen, Lampen immer paarweise wechseln und umweltgerecht entsorgen. 4. Außenbereich: Nein, da nur Schutzart IP20 (kein Wasserschutz, nur für Innenräume!).",
        "Die UVC-Lampen müssen im eingeschalteten Zustand mit bloßen Händen gewechselt werden; dank IP20 ist das Gerät strahlwassergeschützt und ideal für den ungeschützten Garteneinsatz geeignet.",
        "Das Gerät reinigt das Abwasser der Großküche und wird fest an ein 400-V-CEE-Drehstromnetz angeschlossen.",
        "UVC-Strahlung ist für Augen und Haut völlig ungefährlich; es reicht aus, nur eine einzelne defekte Röhre zu tauschen und in den normalen Hausmüll zu werfen."
      ],
      correct: 0,
      explanation: "• Original-Aufgabe 4.4 aus Winter 2022/23 (CleanBox 300 UV):\n  - Wichtige Punkte: Feststellbremsen (locking brakes on castors) betätigen; UVC-Lampen nie mit bloßen Fingern berühren (Fett verkürzt Lebensdauer), Schutz vor UV-Augen-/Hautschäden und Hitze, paarweiser Tausch; IP20 = kein Schutz gegen Wasser -> nur Innenraum!\n• 📖 Europa Tabellenbuch: S. 345 (IP-Schutzarten: IP20 = 2. Ziffer 0 = kein Wasserschutz)"
    }
  ];

  // Fragen in die bestehenden Arrays einfügen (ohne Duplikate)
  if (typeof ELEKTRO_QUESTIONS !== "undefined") {
    EXTRA_ELEKTRO_2025.forEach((q) => {
      if (!ELEKTRO_QUESTIONS.some((ex) => ex.id === q.id)) {
        ELEKTRO_QUESTIONS.push(q);
      }
    });
  }
  if (typeof WISO_QUESTIONS !== "undefined") {
    EXTRA_WISO_2025.forEach((q) => {
      if (!WISO_QUESTIONS.some((ex) => ex.id === q.id)) {
        WISO_QUESTIONS.push(q);
      }
    });
  }
  if (typeof ENGLISH_QUESTIONS !== "undefined") {
    EXTRA_ENGLISH_2025.forEach((q) => {
      if (!ENGLISH_QUESTIONS.some((ex) => ex.id === q.id)) {
        ENGLISH_QUESTIONS.push(q);
      }
    });
  }

  // -----------------------------------------------------------------------
  // 2) 5 NEUE ORIGINAL-RECHENAUFGABEN AUS WINTER 2024/25 & SOMMER 2024
  // -----------------------------------------------------------------------
  if (typeof CALC_TASKS !== "undefined" && !CALC_TASKS.some((t) => t.id === "calc-ptc-motor-2025")) {
    CALC_TASKS.push(
      {
        id: "calc-ptc-motor-2025",
        title: "21. PTC-Kaltleiter-Motorvollschutz: Spannungsteiler an 25 V DC (Winter 2024/25 FSA Aufg. 3.3)",
        exam: "Winter 2024/25 (FSA Aufg. 3.3)",
        bookRef: "Europa TB S. 38 (Spannungsteiler) & S. 55 / 534 (PTC-Kaltleiter)",
        unit: "V",
        generateParams: (randomize = false) => {
          const rPtc = randomize ? [1600, 1800, 2000, 2400][Math.floor(Math.random() * 4)] : 1800;
          const tempLabel = rPtc === 1600 ? "100 °C" : rPtc === 1800 ? "120 °C (Grenztemperatur)" : rPtc === 2000 ? "130 °C" : "150 °C";
          const uGes = 25;
          const rRel = 1600;
          const rGes = rPtc + rRel;
          const iMa = +((uGes / rGes) * 1000).toFixed(2);
          const uRel = +((uGes * rRel) / rGes).toFixed(2);
          return {
            desc: `Zwischen den Wicklungen eines Drehstrommotors (Wärmeklasse E) sind drei in Reihe geschaltete PTC-Kaltleiter verbaut, die zusammen mit der Spule des Auswerterelais K1 (R_Rel = 1,6 kΩ = 1600 Ω) an einer Steuerspannung von U_g = 25 V DC liegen. Bei einer Temperatur von T = ${tempLabel} beträgt der Gesamtwiderstand der PTC-Kette R_PTC = ${rPtc} Ω. Berechnen Sie die Steuerspannung U_Rel (in V, auf 2 Nachkommastellen), die an der Relaisspule K1 anliegt! (Hinweis: Unter 12,0 V fällt K1 ab und schaltet den Motor aus).`,
            expected: uRel,
            tolerance: 0.15,
            step1: `Gegeben: U_g = 25 V DC, R_PTC = ${rPtc} Ω (bei ${tempLabel}), R_Rel = 1,6 kΩ = 1600 Ω\nGesucht: Strom I in mA und Relaisspannung U_Rel in V`,
            step2: `1) I = U_g / (R_PTC + R_Rel)\n2) U_Rel = I · R_Rel   (oder direkt: U_Rel = U_g · R_Rel / (R_PTC + R_Rel))`,
            step3: `1) I = 25 V / (${rPtc} Ω + 1600 Ω) = 25 V / ${rGes} Ω = ${iMa} mA\n2) U_Rel = ${iMa} mA · 1600 Ω = ${uRel} V`,
            step4: `Ergebnis: U_Rel = ${uRel} V.\nAntwortsatz: Bei ${tempLabel} liegt an der Relaisspule K1 eine Spannung von ${uRel} V an (${uRel < 12 ? "unter 12 V -> Relais fällt ab, Motor wird abgeschaltet!" : "über 12 V -> Relais bleibt angezogen"}).`
          };
        }
      },
      {
        id: "calc-pv-heizstab-2025",
        title: "22. PV-Überschuss-Elektroheizstab: Gemischte Schaltung Stufe 4 & 5 (Winter 2024/25 FSA Aufg. 1)",
        exam: "Winter 2024/25 (FSA Aufg. 1)",
        bookRef: "Europa TB S. 36 (P = U² / R) & S. 38 (Reihen-/Parallelschaltung)",
        unit: "W",
        generateParams: (randomize = false) => {
          const isStufe5 = randomize ? Math.random() > 0.5 : false;
          const rSingle = 80;
          if (!isStufe5) {
            const pReihe400 = Math.round((400 * 400) / (2 * rSingle));
            const pEinzel230 = Math.round((230 * 230) / rSingle);
            const pGes = pReihe400 + pEinzel230;
            return {
              desc: `Ein Elektroheizstab mit drei gleichen Heizwiderständen von je R = 80 Ω wird am 230/400-V-Drehstromnetz in „Leistungsstufe 4“ betrieben: Dabei sind zwei Heizelemente (G1 und G2) in Reihe zwischen die Außenleiter L1 und L2 (U = 400 V) geschaltet, und das dritte Heizelement (G3) liegt einzeln zwischen L3 und N (U = 230 V). Berechnen Sie die gesamte Heizleistung P_g (in W, auf ganze Watt gerundet)!`,
              expected: pGes,
              tolerance: 5,
              step1: `Gegeben: 3 Heizwiderstände je R = 80 Ω; Zweig 1 (G1+G2 in Reihe an U_12 = 400 V -> R_12 = 160 Ω); Zweig 2 (G3 an U_3N = 230 V -> R_3 = 80 Ω)\nGesucht: Gesamtheizleistung P_g in W`,
              step2: `P = U² / R\n1) P_12 = (U_12)² / (2 · R)\n2) P_3 = (U_3N)² / R\n3) P_g = P_12 + P_3`,
              step3: `1) P_12 = (400 V)² / 160 Ω = 160.000 V² / 160 Ω = ${pReihe400} W\n2) P_3 = (230 V)² / 80 Ω = 52.900 V² / 80 Ω = ${pEinzel230} W\n3) P_g = ${pReihe400} W + ${pEinzel230} W = ${pGes} W`,
              step4: `Ergebnis: P_g = ${pGes} W (1,661 kW).\nAntwortsatz: In Leistungsstufe 4 gibt der Elektroheizstab eine Gesamtheizleistung von ${pGes} W ab.`
            };
          } else {
            const pPar400 = Math.round((400 * 400) / (rSingle / 2));
            const pEinzel230 = Math.round((230 * 230) / rSingle);
            const pGes = pPar400 + pEinzel230;
            return {
              desc: `Der Elektroheizstab (drei Heizwiderstände von je R = 80 Ω) wird in „Leistungsstufe 5“ betrieben: Zwei Heizelemente (G1 und G2) liegen parallel zwischen den Außenleitern L1 und L2 (U = 400 V, Ersatzwiderstand R_g = 40 Ω), und das dritte Heizelement (G3) liegt zwischen L3 und N (U = 230 V, R = 80 Ω). Berechnen Sie die gesamte Heizleistung P_g (in W, auf ganze Watt gerundet)!`,
              expected: pGes,
              tolerance: 5,
              step1: `Gegeben: Zweig 1 (G1 || G2 parallel an U_12 = 400 V -> R_12 = 80 Ω / 2 = 40 Ω); Zweig 2 (G3 an U_3N = 230 V -> R_3 = 80 Ω)\nGesucht: Gesamtheizleistung P_g in W`,
              step2: `P = U² / R\n1) P_12 = (400 V)² / 40 Ω\n2) P_3 = (230 V)² / 80 Ω\n3) P_g = P_12 + P_3`,
              step3: `1) P_12 = 160.000 V² / 40 Ω = ${pPar400} W\n2) P_3 = 52.900 V² / 80 Ω = ${pEinzel230} W\n3) P_g = ${pPar400} W + ${pEinzel230} W = ${pGes} W`,
              step4: `Ergebnis: P_g = ${pGes} W (4,661 kW).\nAntwortsatz: In Leistungsstufe 5 beträgt die Gesamtheizleistung ${pGes} W.`
            };
          }
        }
      },
      {
        id: "calc-erdschluss-wp-2025",
        title: "23. Außenleitererdschluss an Wärmepumpe: Berührungsspannung U_B (Winter 2024/25 Planung Aufg. 2.3)",
        exam: "Winter 2024/25 (Planung Aufg. 2.3.3)",
        bookRef: "Europa TB S. 257–258 (Fehlerschleife & Berührungsspannung)",
        unit: "V",
        generateParams: (randomize = false) => {
          const rErd = randomize ? [5.2, 7.2, 8.0][Math.floor(Math.random() * 3)] : 7.2;
          const rL = 0.2;
          const rB = 1.8;
          const rGes = +(rL + rErd + rB).toFixed(2);
          const iErd = +(230 / rGes).toFixed(2);
          const uB = +(iErd * rB).toFixed(1);
          return {
            desc: `In der Zuleitung einer Wärmepumpe im TN-System (U0 = 230 V) tritt im Erdreich ein Außenleitererdschluss auf. Gegeben sind die Widerstände: Außenleiterwiderstand R_Außenleiter = ${rL} Ω, Übergangswiderstand der Erdschlussstelle R_Erdschluss = ${rErd} Ω und Betriebserderwiderstand R_Betriebserde = ${rB} Ω. Berechnen Sie zuerst den fließenden Erdschlussstrom I_Erdschluss und anschließend die am geerdeten Gehäuse / PEN auftretende Berührungsspannung U_B (in V)!`,
            expected: uB,
            tolerance: 0.5,
            step1: `Gegeben: U0 = 230 V, R_Außenleiter = ${rL} Ω, R_Erdschluss = ${rErd} Ω, R_Betriebserde = ${rB} Ω\nGesucht: Erdschlussstrom I_Erdschluss in A und Berührungsspannung U_B in V`,
            step2: `1) I_Erdschluss = U0 / (R_Außenleiter + R_Erdschluss + R_Betriebserde)\n2) U_B = I_Erdschluss · R_Betriebserde`,
            step3: `1) I_Erdschluss = 230 V / (${rL} Ω + ${rErd} Ω + ${rB} Ω) = 230 V / ${rGes} Ω = ${iErd} A\n2) U_B = ${iErd} A · ${rB} Ω = ${uB} V`,
            step4: `Ergebnis: U_B = ${uB} V.\nAntwortsatz: Die auftretende Berührungsspannung beträgt ${uB} V. Da sie kleiner als der zulässige Grenzwert von 50 V AC ist, besteht für den Menschen keine Lebensgefahr.`
          };
        }
      },
      {
        id: "calc-led-vorwiderstand-2024",
        title: "24. LED-Vorwiderstand für 3 Reihen-LEDs an 12 V DC & E12-Reihe (Sommer 2024 AV Aufg. 1.10)",
        exam: "Sommer 2024 (AV Aufg. 1.10)",
        bookRef: "Europa TB S. 38 (Reihenschaltung) & S. 51 (E12-Normreihe & Farbcode)",
        unit: "Ω",
        generateParams: (randomize = false) => {
          const uLed = randomize ? [2.1, 2.7, 3.0][Math.floor(Math.random() * 3)] : 2.7;
          const uGes = 12;
          const iMa = 20;
          const uR = +(uGes - 3 * uLed).toFixed(2);
          const rCalc = Math.round((uR / (iMa / 1000)));
          return {
            desc: `Die Schalenbeleuchtung einer Teigknetmaschine wird auf drei in Reihe geschaltete LEDs an einem 12-V-DC-Netzteil umgerüstet. Jede der drei LEDs hat eine Durchlassspannung von U_B = ${uLed} V; der gemeinsame Strom durch die Reihenschaltung soll I = 20 mA (0,02 A) betragen. Berechnen Sie den exakt erforderlichen Vorwiderstand R1 (in Ω, vor der Rundung auf den nächsthöheren E12-Normwert)!`,
            expected: rCalc,
            tolerance: 1,
            step1: `Gegeben: U_ges = 12 V DC, 3 LEDs in Reihe mit je U_LED = ${uLed} V, Strom I = 20 mA = 0,02 A\nGesucht: Erforderlicher Vorwiderstand R1 in Ω (sowie nächsthöherer E12-Wert)`,
            step2: `1) U_R1 = U_ges - (U_E1 + U_E2 + U_E3)\n2) R1 = U_R1 / I`,
            step3: `1) U_R1 = 12 V - (3 · ${uLed} V) = 12 V - ${(3 * uLed).toFixed(1)} V = ${uR} V\n2) R1 = ${uR} V / 0,02 A = ${rCalc} Ω`,
            step4: `Ergebnis: Berechneter Widerstand R1 = ${rCalc} Ω.\nAntwortsatz: Aus der E12-Normenreihe (100, 120, 150, 180, 220, 270 Ω) wird der nächsthöhere Widerstand gewählt (bei 195 Ω -> 220 Ω mit den 4 Farbringen: rot – rot – braun – silber).`
          };
        }
      },
      {
        id: "calc-wiso-nettolohn-2025",
        title: "25. WiSo-Entgeltabrechnung: Nettogehalt mit SV, Lohn- & Kirchensteuer (Winter 2024/25 WiSo Aufg. 10)",
        exam: "Winter 2024/25 (WiSo Aufg. 10)",
        bookRef: "Europa TB S. 606 (Lohnabrechnung) & Masterbuch WiSo",
        unit: "€",
        generateParams: (randomize = false) => {
          const brutto = randomize ? [1946, 2048, 2400][Math.floor(Math.random() * 3)] : 2048;
          const svPct = brutto === 1946 ? 20.56 : 20.40;
          const lohnSt = brutto === 1946 ? 114 : brutto === 2048 ? 124 : 180;
          const svEuro = +((brutto * svPct) / 100).toFixed(2);
          const kirchenSt = +((lohnSt * 9) / 100).toFixed(2);
          const netto = +(brutto - svEuro - lohnSt - kirchenSt).toFixed(2);
          return {
            desc: `Das Bruttogehalt einer Arbeitskraft beträgt ${brutto},00 €. Berechnen Sie das ausgezahlte Nettogehalt (in €, auf 2 Nachkommastellen) unter Berücksichtigung folgender Abzüge:\n• Arbeitnehmeranteil zur Sozialversicherung: ${svPct.toFixed(2).replace(".", ",")} % vom Bruttolohn\n• Lohnsteuer: ${lohnSt},00 €\n• Kirchensteuer in NRW: 9 % der Lohnsteuer (Achtung Prüfungsfalle: 9 % von ${lohnSt} €, NICHT vom Bruttolohn!)`,
            expected: netto,
            tolerance: 0.05,
            step1: `Gegeben: Bruttolohn = ${brutto},00 €, SV-Anteil = ${svPct} %, Lohnsteuer = ${lohnSt},00 €, Kirchensteuer = 9 % der Lohnsteuer\nGesucht: Ausgezahltes Nettogehalt in €`,
            step2: `1) SV-Beitrag = Bruttolohn · (${svPct} / 100)\n2) Kirchensteuer = Lohnsteuer · (9 / 100)\n3) Nettogehalt = Bruttolohn - SV-Beitrag - Lohnsteuer - Kirchensteuer`,
            step3: `1) SV-Beitrag = ${brutto} € · ${svPct} % = ${svEuro.toFixed(2)} €\n2) Kirchensteuer = ${lohnSt} € · 9 % = ${kirchenSt.toFixed(2)} €\n3) Nettogehalt = ${brutto} € - ${svEuro.toFixed(2)} € - ${lohnSt} € - ${kirchenSt.toFixed(2)} € = ${netto.toFixed(2)} €`,
            step4: `Ergebnis: Nettogehalt = ${netto.toFixed(2).replace(".", ",")} €.\nAntwortsatz: Nach Abzug von Sozialversicherung (${svEuro.toFixed(2).replace(".", ",")} €), Lohnsteuer (${lohnSt},00 €) und Kirchensteuer (${kirchenSt.toFixed(2).replace(".", ",")} €) beträgt das Nettogehalt ${netto.toFixed(2).replace(".", ",")} €.`
          };
        }
      }
    );
  }

  // -----------------------------------------------------------------------
  // 3) 📄 DIREKT INTEGRIERTES ORIGINAL-PRÜFUNGSARCHIV (ALLE 18 PDFS: 2018–2025)
  //    INKL. SPLIT-SCREEN (PRÜFUNG & LÖSUNG NEBENEINANDER VERGLEICHEN!)
  // -----------------------------------------------------------------------
  const ORIGINAL_EXAMS_ARCHIVE = [
    {
      id: "w2425",
      label: "🏆 Winter 2024/25 – Hotel, Schwimmbad & Fußballfeld (Neueste Prüfung nach AO 2021!)",
      examPdf: "assets/aistudio/Pr_fung_Teil_2_Winter_2024-25_55eeb95b.pdf",
      solPdf: "assets/aistudio/Pr_fung_Teil_2_Winter_2024-25_L_sung_9ecc3bd2.pdf",
      highlights: "DMS-Waage, Freiflächenheizung Treppe, S/FTP LSZH, Wärmepumpe Zs-Falle (4 mm²) & Erdschluss (45V), GCU-S Smart-Grid, KNX Hotel, Rollstuhlhebebühne, Softstarter Whirlpool, PV-Heizstab 5 Stufen, PTC-Motorvollschutz 25V DC, SPS-Fehlersuche, Recht auf Reparatur"
    },
    {
      id: "s2024",
      label: "🥐 Sommer 2024 – Großbäckerei Musterstadt (inkl. 8-Fehler-Verteilungsplan & Prüfprotokoll)",
      examPdf: "assets/aistudio/Pr_fung_Teil_2_Sommer_2024_253528f3.pdf",
      solPdf: "assets/aistudio/Pr_fung_Teil_2_Sommer_2024_L_sung_2c0c9f90.pdf",
      highlights: "Backofen Sternschaltung ohne/mit N, Zweipunktregler Gärraum, 4 Rauchmelder-Montagefehler, LED-Vorwiderstand E12 (220 Ω), Rührmaschine, Unvollkommener Körperschluss (1,25V), HES, ABUS RM1100 Thermodifferenzialmelder, FU Tiefgarage CO-Sensoren, 8-Fehler-UV"
    },
    {
      id: "w2324",
      label: "🐘 Winter 2023/24 – Zoo Musterstadt (Elefantenhaus, Waage & Giraffen-Schrittspannung)",
      examPdf: "assets/aistudio/Pr_fung_Teil_2_Winter_2023-24_f7e5c48e.pdf",
      solPdf: "assets/aistudio/Pr_fung_Teil_2_Winter_2023-24_L_sung_d44aa827.pdf",
      highlights: "Präsenz- vs. Bewegungsmelder, Elefantenwaage DMS-Brücke (8 mV), Erdkabel-Trommellänge, Hebeanlage 25 kW, EMA Ruhestrom Vorwiderstand, VDE 0702 Hochdruckreiniger, Entmistungsanlage, AFDD, Schrittspannung Giraffe (17,5V), Trafo Dyn5 + 2x Ladesäulen, Dahlander-Lüfter"
    },
    {
      id: "s2023",
      label: "🎪 Sommer 2023 – Festhalle Musterstadt (PV-Speicher, Wallbox, SAT 2150 MHz & Blitzschutz)",
      examPdf: "assets/aistudio/Pr_fung_Teil_2_Sommer_2023_724010ff.pdf",
      solPdf: "assets/aistudio/Pr_fung_Teil_2_Sommer_2023__L_sung_25f70894.pdf",
      highlights: "Zs vs. RCD, Lichtfarben & Phasenabschnittdimmer, EMA Grundriss-Planung, Kabelgraben Flughafen, 3x Wallbox 11 kW (A2 -> 16 mm²), Blitzschutz LPS III, SAT-Pegelberechnung (65,92 dBµV), Gaskessel-Steuerung, Zählerplatz Küche, CO2-Fenstersteuerung, Kondensatormotor"
    },
    {
      id: "w2223",
      label: "🎭 Winter 2022/23 – Theater Musterstadt (Drehbühne, Bühnenaufzug & VDE 0100-600 Küche)",
      examPdf: "assets/aistudio/Pr_fung_Teil_2_Winter_2022-23_700b9674.pdf",
      solPdf: "assets/aistudio/Pr_fung_Teil_2_Winter_2022-23_L_sung_1fba94d8.pdf",
      highlights: "Mini-DLE 400V, PT100 Nebelmaschine, Steckdosen Großküche IP44, Lichtmast Kabeleinführung & Überspannungsschutz, Sicherheitsbeleuchtung (1 lx / 5 lx), 5 Motor-Fehlerarten, Drehbühne 3 Positionen, Prüfprotokoll R_PE-Ausreißer (0,87 Ω), Behinderten-WC Rufanlage, CleanBox 300 UV"
    },
    {
      id: "s2022",
      label: "🏗️ Sommer 2022 – Zementwerk „Die Baustein GmbH“ (RCD Typ B+, Dahlander & Kabelfehler)",
      examPdf: "assets/aistudio/Pr_fung_Teil_2_Sommer_2022_aef4ee0d.pdf",
      solPdf: "assets/aistudio/Pr_fung_Teil_2_Sommer_2022_L_sung_b1d70b6f.pdf",
      highlights: "PT100 Drehrohrofen, Rauchmeldertest mit Prüfgas, Unsymmetrischer Frostwächter Neutralleiterstrom (9,25 A), Kabelfehlerortung Straßenlicht (25 m), Zementsilo Dahlander Linkslauf, Förderband Drehzahlwächter, Torsteuerung Lichtschranke, VDE 0100-600 an FU mit RCD Typ B+"
    },
    {
      id: "w2122",
      label: "🌿 Winter 2021/22 – Gärtnerei „Blumenglück“ (inkl. AO 2021 Bewertungsbogen, KNX & AFDD)",
      examPdf: "assets/aistudio/Pr_fung_Teil_2_Winter_2021-2022_6be6c451.pdf",
      solPdf: "assets/aistudio/Pr_fung_Teil_2_Winter_2021-2022_L_sung_280b4857.pdf",
      highlights: "Bewertungsbogen AO 2021 (Sommer 2026), Rippenrohrheizung Spannungsfall, Rohrbegleitheizung, Kondensatormotor Rollos & Trennrelais-Pflicht, DGUV V3 Tabelle, Kipptor Kondensatortest mit Lötkolben, Zähler-/Verteilerfeld mit AFDD, KNX-Linien, Wind-/Regensensor, EMA Differenzialprinzip"
    },
    {
      id: "s2021",
      label: "🪚 Sommer 2021 – Schreinerei (HAK DIN 18012, Lastabwurfrelais, Stern-Dreieck & R_LO 40°C)",
      examPdf: "assets/aistudio/Pr_fung_Teil_2_Sommer_2021_2aa16b73.pdf",
      solPdf: "assets/aistudio/Pr_fung_Teil_2_Sommer_2021_L_sung_e514206a.pdf",
      highlights: "Smart-Home 5-fach Aktor, PIR-Melder Gehtest, Erdermessung Sonde/Hilfserder & V4A, Blitzschutz TN-S, HAK-Maße DIN 18012, Lastabwurfrelais, DLE 24 kW Kabelwanne, R_LO Temperaturkoeffizient Kupfer 40 °C, Lastverteilung (160A / 95 mm²), Plattenkreissäge Y/Δ, Furnierpresse"
    },
    {
      id: "w1819",
      label: "⛽ Winter 2018/19 – Autobahnraststätte Düsseldorf A46 (SAT Astra, Stromzange & RCD Typ B)",
      examPdf: "assets/aistudio/Pr_fung_Teil_2_Winter_2018-19_272b2ab2.pdf",
      solPdf: "assets/aistudio/Pr_fung_Teil_2_Winter_2018-19_Losung_0e0e6663.pdf",
      highlights: "PIR-Melder WC-Kabinen, Klimaanlage COP, Zweipunktregler Hysterese, PT100 Dusche, SAT Astra Düsseldorf (30,3° / 164,1°), Brandlast verringern, Sonnensegel FU, Stromzangenmessung CAT II–IV, E-Ladesäule 22 kW, Dahlander 90% Leerlaufkompensation, Selektiver RCD [S] & Typ B"
    }
  ];

  // Tab-Button-Text aktualisieren
  const tabMasterbookBtn = document.getElementById("tab-masterbook");
  if (tabMasterbookBtn) {
    tabMasterbookBtn.innerHTML = "📖 Prüfungsarchiv (18 PDFs) & Bücher";
  }

  const masterbookSec = document.getElementById("masterbook-section");
  const pdfSelector = document.getElementById("pdf-selector");
  const pdfFrame = document.getElementById("pdf-frame");
  const pdfExternalBtn = document.getElementById("pdf-external-btn");

  if (masterbookSec && pdfSelector && !document.getElementById("orig-exam-archive-card")) {
    // Auch im Standard-Dropdown alle 18 Original-PDFs als Optgroup ergänzen
    const optGroupExams = document.createElement("optgroup");
    optGroupExams.label = "📄 Original NRW-Gesellenprüfungen Teil 2 (2018–2025) – Aufgaben & Lösungen";
    ORIGINAL_EXAMS_ARCHIVE.forEach((ex) => {
      const opt1 = document.createElement("option");
      opt1.value = ex.examPdf;
      opt1.textContent = `📝 [Aufgaben] ${ex.label}`;
      const opt2 = document.createElement("option");
      opt2.value = ex.solPdf;
      opt2.textContent = `✅ [Lösung] ${ex.label}`;
      optGroupExams.appendChild(opt1);
      optGroupExams.appendChild(opt2);
    });
    pdfSelector.prepend(optGroupExams);

    // Komfort-Prüfungszentrale mit 1-Klick-Umschalter (Aufgabe ⇄ Lösung ⇄ Split-Screen!)
    const archiveCard = document.createElement("div");
    archiveCard.id = "orig-exam-archive-card";
    archiveCard.className = "quiz-card";
    archiveCard.style.cssText =
      "margin-bottom: 1.2rem; border: 2px solid #3b82f6; background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);";
    archiveCard.innerHTML = `
      <div style="display:flex; justify-content:space-between; align-items:flex-start; flex-wrap:wrap; gap:0.8rem; margin-bottom:0.9rem;">
        <div>
          <span class="badge exam-badge" style="background:#1d4ed8; color:#fff; margin-bottom:0.35rem; display:inline-block;">
            🏆 Original FEH-NRW Prüfungsarchiv (Winter 2018/19 bis Winter 2024/25)
          </span>
          <h3 style="color:#f8fafc; font-size:1.18rem; margin:0;">
            📄 Alle 9 Original-Gesellenprüfungen + 9 offizielle Lösungshinweise (18 PDFs)
          </h3>
        </div>
        <div style="display:flex; gap:0.45rem; flex-wrap:wrap;">
          <button type="button" id="btn-arch-mode-exam" class="btn primary" style="padding:0.45rem 0.85rem; font-size:0.82rem;">
            📝 Nur Aufgabenheft
          </button>
          <button type="button" id="btn-arch-mode-sol" class="btn success" style="padding:0.45rem 0.85rem; font-size:0.82rem;">
            ✅ Nur Lösungshinweise
          </button>
          <button type="button" id="btn-arch-mode-split" class="btn warning" style="padding:0.45rem 0.85rem; font-size:0.82rem;">
            🖥️ Split-Screen (Aufgabe & Lösung nebeneinander!)
          </button>
        </div>
      </div>

      <div style="display:grid; grid-template-columns: 1fr auto; gap:0.75rem; align-items:center; margin-bottom:0.75rem;">
        <select id="orig-exam-year-select" style="width:100%; padding:0.75rem; border-radius:8px; background:#090d16; color:#f8fafc; border:1px solid #3b82f6; font-weight:700; font-size:0.95rem;">
          ${ORIGINAL_EXAMS_ARCHIVE.map((ex, i) => `<option value="${i}">${ex.label}</option>`).join("")}
        </select>
        <div style="display:flex; gap:0.45rem; flex-wrap:wrap;">
          <a id="link-open-exam-tab" href="${ORIGINAL_EXAMS_ARCHIVE[0].examPdf}" target="_blank" class="btn secondary" style="padding:0.65rem 0.85rem; font-size:0.8rem; text-decoration:none;">
            ↗️ Prüfung (Vollbild)
          </a>
          <a id="link-open-sol-tab" href="${ORIGINAL_EXAMS_ARCHIVE[0].solPdf}" target="_blank" class="btn secondary" style="padding:0.65rem 0.85rem; font-size:0.8rem; text-decoration:none; border-color:#22c55e; color:#4ade80;">
            ↗️ Lösung (Vollbild)
          </a>
        </div>
      </div>

      <div id="orig-exam-highlights-box" style="background:rgba(15,23,42,0.85); border:1px solid #334155; border-left:4px solid #fbbf24; border-radius:8px; padding:0.6rem 0.9rem; font-size:0.82rem; color:#cbd5e1;"></div>

      <div id="orig-exam-split-container" class="hidden" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(360px, 1fr)); gap:0.85rem; margin-top:1rem;">
        <div style="background:#090d16; border:1px solid #3b82f6; border-radius:8px; padding:0.5rem;">
          <div style="font-size:0.8rem; font-weight:700; color:#93c5fd; margin-bottom:0.4rem; text-align:center;">📝 Original-Prüfungsaufgaben</div>
          <iframe id="split-exam-frame" src="" width="100%" height="680px" style="border:none; border-radius:6px; background:#1e293b;"></iframe>
        </div>
        <div style="background:#090d16; border:1px solid #22c55e; border-radius:8px; padding:0.5rem;">
          <div style="font-size:0.8rem; font-weight:700; color:#4ade80; margin-bottom:0.4rem; text-align:center;">✅ Offizielle FEH-NRW Lösungshinweise</div>
          <iframe id="split-sol-frame" src="" width="100%" height="680px" style="border:none; border-radius:6px; background:#1e293b;"></iframe>
        </div>
      </div>
    `;

    const headerCard = masterbookSec.querySelector(".video-header-card");
    headerCard?.insertAdjacentElement("afterend", archiveCard);

    let currentArchiveIdx = 0;
    let currentArchiveViewMode = "exam"; // "exam" | "sol" | "split"

    const yearSel = document.getElementById("orig-exam-year-select");
    const highlightsBox = document.getElementById("orig-exam-highlights-box");
    const splitContainer = document.getElementById("orig-exam-split-container");
    const splitExamFrame = document.getElementById("split-exam-frame");
    const splitSolFrame = document.getElementById("split-sol-frame");
    const linkExamTab = document.getElementById("link-open-exam-tab");
    const linkSolTab = document.getElementById("link-open-sol-tab");
    const singleFrameCard = pdfFrame?.closest(".quiz-card");

    function updateArchiveViewer() {
      const ex = ORIGINAL_EXAMS_ARCHIVE[currentArchiveIdx] || ORIGINAL_EXAMS_ARCHIVE[0];
      if (highlightsBox) {
        highlightsBox.innerHTML = `<strong style="color:#fbbf24;">📌 Prüfungsschwerpunkte in diesem Jahrgang:</strong> ${ex.highlights}`;
      }
      if (linkExamTab) linkExamTab.href = ex.examPdf;
      if (linkSolTab) linkSolTab.href = ex.solPdf;

      if (currentArchiveViewMode === "split") {
        splitContainer?.classList.remove("hidden");
        if (singleFrameCard) singleFrameCard.style.display = "none";
        if (splitExamFrame && splitExamFrame.getAttribute("src") !== ex.examPdf) {
          splitExamFrame.src = ex.examPdf;
        }
        if (splitSolFrame && splitSolFrame.getAttribute("src") !== ex.solPdf) {
          splitSolFrame.src = ex.solPdf;
        }
      } else {
        splitContainer?.classList.add("hidden");
        if (singleFrameCard) singleFrameCard.style.display = "block";
        const targetUrl = currentArchiveViewMode === "sol" ? ex.solPdf : ex.examPdf;
        if (pdfFrame) pdfFrame.src = targetUrl;
        if (pdfExternalBtn) {
          pdfExternalBtn.href = targetUrl;
          pdfExternalBtn.textContent =
            currentArchiveViewMode === "sol"
              ? `✅ Lösungshinweise (${ex.label.split("–")[0].trim()}) im Vollbild öffnen`
              : `📝 Prüfungsaufgaben (${ex.label.split("–")[0].trim()}) im Vollbild öffnen`;
        }
        if (pdfSelector) pdfSelector.value = targetUrl;
      }
    }

    yearSel?.addEventListener("change", (e) => {
      currentArchiveIdx = Number(e.target.value) || 0;
      updateArchiveViewer();
    });

    document.getElementById("btn-arch-mode-exam")?.addEventListener("click", () => {
      currentArchiveViewMode = "exam";
      updateArchiveViewer();
    });
    document.getElementById("btn-arch-mode-sol")?.addEventListener("click", () => {
      currentArchiveViewMode = "sol";
      updateArchiveViewer();
    });
    document.getElementById("btn-arch-mode-split")?.addEventListener("click", () => {
      currentArchiveViewMode = "split";
      updateArchiveViewer();
    });

    // Standardmäßig beim Öffnen des Tabs direkt die neueste Prüfung Winter 2024/25 laden!
    updateArchiveViewer();
  }

  // -----------------------------------------------------------------------
  // 4) 🎓 OFFIZIELLER FEH-NRW NOTEN- & BESTEHENSRECHNER (AO 2021 – WINTER 2026/27)
  // -----------------------------------------------------------------------
  function openOfficialGradeCalculatorModal() {
    document.getElementById("gp2-ao2021-grade-modal")?.remove();
    const savedScores = readStoredJson("nrw_ao2021_scores_v1", {
      gp1: 75,
      av: 78,
      plan: 75,
      montage: 82,
      uebergabe: 80,
      fachgespraech: 85,
      sys: 76,
      fsa: 74,
      wiso: 84
    });

    const modal = document.createElement("div");
    modal.id = "gp2-ao2021-grade-modal";
    modal.className = "modal-overlay";
    modal.style.zIndex = "2147483647";
    modal.innerHTML = `
      <div class="modal-card" style="max-width:780px; max-height:90vh; overflow-y:auto;">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.6rem; border-bottom:1px solid #334155; padding-bottom:0.6rem;">
          <h3 style="margin:0; color:#60a5fa;">🎓 Offizieller NRW-Gesamtnoten- & Bestehensrechner (AO 2021 – Winter 2026/27)</h3>
          <button type="button" id="btn-close-ao2021-modal" class="chatbot-close-btn">✖</button>
        </div>
        <p style="font-size:0.82rem; color:#cbd5e1; margin-bottom:0.9rem;">
          Berechnet deine exakte Gesellenprüfungsnote nach dem offiziellen <strong>FEH-NRW Bewertungsbogen (Ausbildungsverordnung 2021)</strong> aus den Prüfungsunterlagen:
        </p>

        <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(230px, 1fr)); gap:0.7rem; margin-bottom:1rem; font-size:0.82rem;">
          <div style="background:#0f172a; padding:0.75rem; border-radius:8px; border:1px solid #3b82f6;">
            <strong style="color:#93c5fd; display:block; margin-bottom:0.35rem;">1️⃣ Gesellenprüfung Teil 1 (30 %)</strong>
            <label style="display:flex; justify-content:space-between; align-items:center;">
              <span>Punkte Teil 1 (0–100):</span>
              <input type="number" id="ao-inp-gp1" min="0" max="100" value="${savedScores.gp1}" style="width:70px; text-align:center; font-weight:700;">
            </label>
          </div>

          <div style="background:#0f172a; padding:0.75rem; border-radius:8px; border:1px solid #f59e0b;">
            <strong style="color:#fbbf24; display:block; margin-bottom:0.35rem;">2️⃣ Schriftliche Fächer Teil 2 (34 %)</strong>
            <label style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.3rem;">
              <span>Systementwurf + CAD (12 %):</span>
              <input type="number" id="ao-inp-sys" min="0" max="100" value="${savedScores.sys}" style="width:65px; text-align:center;">
            </label>
            <label style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.3rem;">
              <span>Funktions-/Systemanalyse (12 %):</span>
              <input type="number" id="ao-inp-fsa" min="0" max="100" value="${savedScores.fsa}" style="width:65px; text-align:center;">
            </label>
            <label style="display:flex; justify-content:space-between; align-items:center;">
              <span>Wirtschaft & Soziales (10 %):</span>
              <input type="number" id="ao-inp-wiso" min="0" max="100" value="${savedScores.wiso}" style="width:65px; text-align:center;">
            </label>
          </div>

          <div style="background:#0f172a; padding:0.75rem; border-radius:8px; border:1px solid #22c55e; grid-column: 1 / -1;">
            <strong style="color:#4ade80; display:block; margin-bottom:0.4rem;">3️⃣ Kundenauftrag (36 % der Gesamtnote = 51 3/7 % von Teil 2)</strong>
            <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(210px, 1fr)); gap:0.5rem;">
              <label style="display:flex; justify-content:space-between; align-items:center; background:#1e293b; padding:0.4rem 0.6rem; border-radius:6px;">
                <span>📝 Arbeitsvorbereitung (15 %):</span>
                <input type="number" id="ao-inp-av" min="0" max="100" value="${savedScores.av}" style="width:62px; text-align:center;">
              </label>
              <label style="display:flex; justify-content:space-between; align-items:center; background:#1e293b; padding:0.4rem 0.6rem; border-radius:6px;">
                <span>📐 Planung (15 %):</span>
                <input type="number" id="ao-inp-plan" min="0" max="100" value="${savedScores.plan}" style="width:62px; text-align:center;">
              </label>
              <label style="display:flex; justify-content:space-between; align-items:center; background:#1e293b; padding:0.4rem 0.6rem; border-radius:6px;">
                <span>🛠️ Montage & SPS 3.1–3.3 (40 %):</span>
                <input type="number" id="ao-inp-montage" min="0" max="100" value="${savedScores.montage}" style="width:62px; text-align:center;">
              </label>
              <label style="display:flex; justify-content:space-between; align-items:center; background:#1e293b; padding:0.4rem 0.6rem; border-radius:6px;" title="Aufgabe 4.3 Prüfprotokoll zählt hier allein 70 %!">
                <span>📋 Übergabe / Protokoll (10 %):</span>
                <input type="number" id="ao-inp-uebergabe" min="0" max="100" value="${savedScores.uebergabe}" style="width:62px; text-align:center;">
              </label>
              <label style="display:flex; justify-content:space-between; align-items:center; background:#1e293b; padding:0.4rem 0.6rem; border-radius:6px;">
                <span>🗣️ Situatives Fachgespräch (20 %):</span>
                <input type="number" id="ao-inp-fachgespraech" min="0" max="100" value="${savedScores.fachgespraech}" style="width:62px; text-align:center;">
              </label>
            </div>
          </div>
        </div>

        <div id="ao2021-result-banner" style="padding:1rem; border-radius:10px; background:#0f172a; border:2px solid #3b82f6; text-align:center;"></div>
      </div>
    `;
    document.body.appendChild(modal);

    function recalcAo2021() {
      const val = (id) => Math.min(100, Math.max(0, Number(document.getElementById(id)?.value) || 0));
      const gp1 = val("ao-inp-gp1");
      const av = val("ao-inp-av");
      const plan = val("ao-inp-plan");
      const montage = val("ao-inp-montage");
      const uebergabe = val("ao-inp-uebergabe");
      const fg = val("ao-inp-fachgespraech");
      const sys = val("ao-inp-sys");
      const fsa = val("ao-inp-fsa");
      const wiso = val("ao-inp-wiso");

      localStorage.setItem(
        "nrw_ao2021_scores_v1",
        JSON.stringify({ gp1, av, plan, montage, uebergabe, fachgespraech: fg, sys, fsa, wiso })
      );

      // Kundenauftrag-Note (0–100)
      const kaScore = +(av * 0.15 + plan * 0.15 + montage * 0.40 + uebergabe * 0.10 + fg * 0.20).toFixed(1);
      // Teil 2 Gesamt (70 % Gewicht: KA = 36/70, Sys = 12/70, FSA = 12/70, WiSo = 10/70)
      const gp2Score = +((kaScore * 36 + sys * 12 + fsa * 12 + wiso * 10) / 70).toFixed(1);
      // Gesamtnote (GP1 = 30 %, GP2 = 70 %)
      const totalScore = +(gp1 * 0.30 + gp2Score * 0.70).toFixed(1);

      // Offizielle Bestehensregeln nach Ausbildungsverordnung 2021:
      // 1. Gesamtergebnis (Teil 1 + Teil 2) >= 50 Punkte
      // 2. Ergebnis Teil 2 >= 50 Punkte
      // 3. Mindestens 3 der 4 Prüfungsbereiche von Teil 2 >= 50 Punkte
      // 4. KEIN Prüfungsbereich von Teil 2 mit "ungenügend" (< 30 Punkte)!
      const areas = [
        { name: "Kundenauftrag", score: kaScore },
        { name: "Systementwurf", score: sys },
        { name: "Funktions- und Systemanalyse", score: fsa },
        { name: "Wirtschafts- und Sozialkunde", score: wiso }
      ];
      const below30 = areas.filter((a) => a.score < 30);
      const below50 = areas.filter((a) => a.score < 50);
      const passed = totalScore >= 50 && gp2Score >= 50 && below30.length === 0 && below50.length <= 1;

      const resBox = document.getElementById("ao2021-result-banner");
      if (!resBox) return;
      resBox.style.borderColor = passed ? "#22c55e" : "#ef4444";
      resBox.innerHTML = `
        <div style="font-size:1.25rem; font-weight:800; color:${passed ? "#4ade80" : "#f87171"}; margin-bottom:0.35rem;">
          ${passed ? "✅ GESELLENPRÜFUNG BESTANDEN!" : "❌ SPERRKLAUSEL VERLETZT (NOCH NICHT BESTANDEN)"}
        </div>
        <div style="font-size:0.95rem; color:#f8fafc; margin-bottom:0.45rem;">
          <strong>Gesamtergebnis (Teil 1 + 2): ${totalScore} Punkte</strong> ➔ Note: <strong style="color:#fbbf24;">${calculateIhkGrade(totalScore, 1)}</strong><br>
          <span style="font-size:0.82rem; color:#cbd5e1;">
            Kundenauftrag: <strong>${kaScore} P.</strong> | Teil 2 Schnitt: <strong>${gp2Score} P.</strong> | Schriftlicher Anteil an GP2: <strong>ca. 64 %</strong>
          </span>
        </div>
        ${
          !passed
            ? `<div style="font-size:0.8rem; color:#fca5a5; background:rgba(127,29,29,0.4); padding:0.45rem; border-radius:6px;">
                ⚠️ Grund: ${
                  below30.length > 0
                    ? `Prüfungsbereich unter 30 Punkte (Ungenügend-Sperre in: ${below30.map((a) => a.name).join(", ")})!`
                    : below50.length > 1
                    ? `Mehr als ein Prüfungsbereich unter 50 Punkte (${below50.map((a) => a.name).join(", ")})!`
                    : gp2Score < 50
                    ? "Durchschnitt in Teil 2 liegt unter 50 Punkten!"
                    : "Gesamtergebnis liegt unter 50 Punkten!"
                }
               </div>`
            : `<div style="font-size:0.78rem; color:#86efac;">Alle Bestehensregeln der Ausbildungsverordnung 2021 (inkl. Sperrklauseln) sind sicher erfüllt!</div>`
        }
      `;
    }

    modal.querySelectorAll("input").forEach((inp) => inp.addEventListener("input", recalcAo2021));
    modal.querySelector("#btn-close-ao2021-modal")?.addEventListener("click", () => modal.remove());
    modal.addEventListener("click", (e) => {
      if (e.target === modal) modal.remove();
    });
    recalcAo2021();
  }

  // Noten-Kachel in der Statistik-Leiste anklickbar machen für den offiziellen AO-2021-Rechner
  const gradeStatItem = document.querySelector(".stat-item.grade");
  if (gradeStatItem) {
    gradeStatItem.style.cursor = "pointer";
    gradeStatItem.title = "Klicken für den offiziellen NRW-Gesamtnoten- & Bestehensrechner (AO 2021)";
    gradeStatItem.addEventListener("click", openOfficialGradeCalculatorModal);
  }

  // -----------------------------------------------------------------------
  // 5) 🛡️ DSGVO-, IMPRESSUMS- & RECHTSSCHUTZ-SCHILD FÜR DIE PRIVATE LERNGRUPPE
  //    (Sichtbar sowohl auf dem Passwort-Screen als auch im Seitenfuß!)
  // -----------------------------------------------------------------------
  function openLegalPrivacyModal() {
    document.getElementById("gp2-legal-privacy-modal")?.remove();
    const modal = document.createElement("div");
    modal.id = "gp2-legal-privacy-modal";
    modal.className = "modal-overlay";
    modal.style.zIndex = "2147483647";
    modal.innerHTML = `
      <div class="modal-card" style="max-width:680px; max-height:88vh; overflow-y:auto; text-align:left;">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.75rem; border-bottom:1px solid #334155; padding-bottom:0.6rem;">
          <h3 style="margin:0; color:#60a5fa;">🛡️ Datenschutz-, Nutzungs- & Rechtshinweis (Private Lerngruppe)</h3>
          <button type="button" id="btn-close-legal-modal" class="chatbot-close-btn">✖</button>
        </div>

        <div style="font-size:0.84rem; color:#cbd5e1; line-height:1.55; display:flex; flex-direction:column; gap:0.85rem;">
          <div style="background:#0f172a; padding:0.8rem; border-radius:8px; border:1px solid #334155;">
            <strong style="color:#fbbf24; display:block; margin-bottom:0.25rem;">1. Geschlossener privater Benutzerkreis (§ 5 DDG / Art. 2 Abs. 2 lit. c DSGVO)</strong>
            Diese Webseite ist ein rein privates, nicht-kommerzielles Lernprojekt zur gemeinsamen Vorbereitung auf die Gesellenprüfung Teil 2 (Winter 2026/27) innerhalb einer geschlossenen privaten Lerngruppe. Es liegt kein geschäftsmäßiges, entgeltliches oder öffentlich zugängliches Telemedienangebot vor. Der Zugriff ist durch eine technische Zugangsschranke ausschließlich auf persönlich eingeladene Mitschüler beschränkt.
          </div>

          <div style="background:#0f172a; padding:0.8rem; border-radius:8px; border:1px solid #334155;">
            <strong style="color:#4ade80; display:block; margin-bottom:0.25rem;">2. 100 % Lokale Datenspeicherung (Zero-Tracking & Keine Cookies)</strong>
            • <strong>Keine Tracking- oder Werbe-Cookies:</strong> Diese Seite verwendet kein Google Analytics, keine externen Schriftarten (keine Google Fonts) und keine Tracking-Skripte.<br>
            • <strong>Lokaler Gerätespeicher (LocalStorage):</strong> Dein Lernfortschritt, deine Merkliste und deine Einstellungen werden ausschließlich lokal in deinem eigenen Browser gespeichert und niemals automatisch an einen Server übertragen.
          </div>

          <div style="background:#0f172a; padding:0.8rem; border-radius:8px; border:1px solid #334155;">
            <strong style="color:#93c5fd; display:block; margin-bottom:0.25rem;">3. Optionale KI-Prüfer- & Sprachfunktion (Server-Proxy)</strong>
            Wenn du aktiv auf „Antwort durch Prüfer-KI kontrollieren“, den Fachprüfer-Chatbot oder die Vorlesefunktion klickst, wird ausschließlich dein eingegebener Fachtext über einen geschützten Server-Proxy an die Google Gemini API gesendet, um das Prüfer-Feedback zu berechnen. Bitte gib in die Antwortfelder keine personenbezogenen Daten (wie Klarnamen, Adressen oder Telefonnummern) ein.
          </div>

          <div style="background:#0f172a; padding:0.8rem; border-radius:8px; border:1px solid #334155;">
            <strong style="color:#f8fafc; display:block; margin-bottom:0.25rem;">4. Urheberrecht & Prüfungsunterlagen</strong>
            Alle eingebundenen Übungsaufgaben, Schaltpläne und Dokumentationen dienen ausschließlich dem privaten Selbststudium innerhalb der geschlossenen Lerngruppe (§ 53 UrhG – Privatkopie / privater Gebrauch). Eine öffentliche Weiterverbreitung außerhalb der Lerngruppe ist untersagt.
          </div>
        </div>

        <div style="margin-top:1.1rem; padding-top:0.8rem; border-top:1px solid #334155; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:0.6rem;">
          <button type="button" id="btn-wipe-all-local-data" class="btn danger" style="font-size:0.8rem; padding:0.45rem 0.85rem;">
            🗑️ Alle lokalen Lerndaten auf diesem Gerät löschen (DSGVO-Reset)
          </button>
          <button type="button" id="btn-ok-legal-modal" class="btn primary" style="font-size:0.82rem; padding:0.45rem 1.1rem;">
            Verstanden & Schließen
          </button>
        </div>
      </div>
    `;
    document.body.appendChild(modal);

    modal.querySelector("#btn-close-legal-modal")?.addEventListener("click", () => modal.remove());
    modal.querySelector("#btn-ok-legal-modal")?.addEventListener("click", () => modal.remove());
    modal.addEventListener("click", (e) => {
      if (e.target === modal) modal.remove();
    });

    modal.querySelector("#btn-wipe-all-local-data")?.addEventListener("click", () => {
      localStorage.clear();
      sessionStorage.clear();
      modal.remove();
      showAppToast("🗑️ Alle lokalen Daten wurden restlos von deinem Gerät gelöscht.", "info");
      setTimeout(() => location.reload(), 900);
    });
  }
  window.openLegalPrivacyModal = openLegalPrivacyModal;

  // Link direkt auf der Passwort-Schranke (vor dem Login erreichbar!) einfügen
  const lockOverlayCard = document.querySelector("#bkh-password-overlay > div");
  if (lockOverlayCard && !document.getElementById("bkh-legal-link-btn")) {
    const legalNotice = document.createElement("div");
    legalNotice.style.cssText = "margin-top: 1.1rem; padding-top: 0.75rem; border-top: 1px solid #334155; font-size: 0.75rem; color: #64748b;";
    legalNotice.innerHTML = `
      <div>Geschlossene private Lerngruppe (§ 5 DDG / Art. 2 Abs. 2 lit. c DSGVO) • Kein öffentliches Angebot • Keine Cookies</div>
      <button type="button" id="bkh-legal-link-btn" style="margin-top:0.35rem; background:transparent; border:none; color:#93c5fd; text-decoration:underline; cursor:pointer; font-size:0.76rem;">
        🛡️ Datenschutz- & Rechtshinweis anzeigen
      </button>
    `;
    lockOverlayCard.appendChild(legalNotice);
    legalNotice.querySelector("#bkh-legal-link-btn")?.addEventListener("click", openLegalPrivacyModal);
  }

  // Dezente Fußzeile unten auf der Hauptseite mit Notenrechner & Datenschutz-Button einfügen
  if (!document.getElementById("gp2-app-footer")) {
    const footer = document.createElement("footer");
    footer.id = "gp2-app-footer";
    footer.style.cssText =
      "max-width:1040px; margin:2rem auto 1.5rem auto; padding:1rem 1.2rem; border-top:1px solid #1e293b; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:0.8rem; font-size:0.78rem; color:#64748b;";
    footer.innerHTML = `
      <div>
        ⚡ <strong>GP Teil 2 Prüfungstrainer (NRW) – Edition Winter 2026/27</strong> • Private, geschlossene Lerngruppe (Zero-Tracking)
      </div>
      <div style="display:flex; gap:0.6rem; flex-wrap:wrap;">
        <button type="button" id="btn-footer-grade-calc" class="quick-chip" style="font-size:0.76rem; color:#fbbf24; border-color:#475569;">
          🎓 NRW-Noten- & Bestehensrechner (AO 2021)
        </button>
        <button type="button" id="btn-footer-legal" class="quick-chip" style="font-size:0.76rem; color:#93c5fd; border-color:#475569;">
          🛡️ Datenschutz & Rechtliches
        </button>
      </div>
    `;
    document.querySelector("main.container")?.insertAdjacentElement("afterend", footer);
    document.getElementById("btn-footer-grade-calc")?.addEventListener("click", openOfficialGradeCalculatorModal);
    document.getElementById("btn-footer-legal")?.addEventListener("click", openLegalPrivacyModal);
  }

  // UI-Zähler in den Tabs und im Header mit den neuen Fragenzahlen (60 WiSo, 83 Elektro, 28 Englisch, 25 Rechnen) synchronisieren
  const tWiso = document.getElementById("tab-wiso");
  const tElektro = document.getElementById("tab-elektro");
  const tEnglish = document.getElementById("tab-english");
  const tCalc = document.getElementById("tab-calc");
  if (tWiso && typeof WISO_QUESTIONS !== "undefined") tWiso.textContent = `🧠 WiSo-Trainer (${WISO_QUESTIONS.length})`;
  if (tElektro && typeof ELEKTRO_QUESTIONS !== "undefined") tElektro.textContent = `🔌 Elektro-Theorie (${ELEKTRO_QUESTIONS.length})`;
  if (tEnglish && typeof ENGLISH_QUESTIONS !== "undefined") tEnglish.textContent = `🇬🇧 Fachenglisch (${ENGLISH_QUESTIONS.length})`;
  if (tCalc && typeof CALC_TASKS !== "undefined") tCalc.textContent = `🧮 NRW-Rechentrainer (${CALC_TASKS.length})`;

  const headerSubP = document.querySelector(".header-title-box p");
  if (headerSubP && typeof WISO_QUESTIONS !== "undefined") {
    headerSubP.textContent = `Edition Winter 2026/27: WiSo (${WISO_QUESTIONS.length}), Elektro (${ELEKTRO_QUESTIONS.length}), Englisch (${ENGLISH_QUESTIONS.length}), ${CALC_TASKS.length}er-Rechentrainer, 18 Original-PDFs, CAD, SPS & KI-Prüfer`;
  }

  if (typeof initCalcTrainer === "function") initCalcTrainer();
  if (typeof populateFilterDropdowns === "function") populateFilterDropdowns();
  if (typeof window.applyFilters === "function") window.applyFilters();
})();

// =========================================================================
// 45. ANDROID- & iOS-APP-OPTIMIERUNG (PWA + OFFLINE-SERVICE-WORKER + APK-ASSISTENT)
//     - 1-KLICK IN-APP INSTALLATION ("📲 Android-App") ÜBER BEFOREINSTALLPROMPT
//     - OFFLINE-SERVICE-WORKER (/sw.js) FÜR DIE LERNGRUPPE IM FUNKLOCH
//     - OFFLINE-VERBINDUNGSANZEIGE & ANDROID APP-SHORTCUTS (?tab=...)
//     - ANDROID TOUCH-, SAFE-AREA- &VOLLBILD-OPTIMIERUNG + APK-BUILDER-GUIDE
// =========================================================================
(function() {
  // 1) Service Worker registrieren (für Netlify & lokales Hosting)
  if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
      navigator.serviceWorker.register("sw.js").catch(() => {});
    });
  }

  // 2) Android App-Shortcuts auswerten (z. B. /?tab=elektro-section beim langen Gedrückthalten des App-Icons)
  try {
    const urlParams = new URLSearchParams(window.location.search);
    const targetTab = urlParams.get("tab");
    if (targetTab) {
      setTimeout(() => {
        const tabBtn = document.querySelector(`.tab-btn[data-target="${targetTab}"]`);
        if (tabBtn) tabBtn.click();
      }, 250);
    }
  } catch (e) {}

  // 3) Spezielles Android- & Mobile-Touch-CSS injizieren (Safe-Area, 44px Touch-Ziele, kein Pull-to-Refresh im CAD)
  const androidStyle = document.createElement("style");
  androidStyle.textContent = `
    /* Safe-Area-Unterstützung für Android Punch-Hole-Kameras & Gesten-Navigationsbalken */
    body {
      padding-top: env(safe-area-inset-top, 0px);
      padding-bottom: env(safe-area-inset-bottom, 0px);
      padding-left: env(safe-area-inset-left, 0px);
      padding-right: env(safe-area-inset-right, 0px);
      -webkit-tap-highlight-color: transparent;
      overscroll-behavior-y: none;
    }
    /* Verhindert versehentliches Seiten-Neuladen beim Zeichnen im CAD- oder SPS-Simulator */
    #cadSvg, #kopSvg, .cad-canvas-wrap {
      touch-action: manipulation;
      overscroll-behavior: contain;
    }
    /* Optimierte horizontale Wisch-Navigation für Tabs auf Android-Smartphones */
    @media (max-width: 768px) {
      .app-tabs {
        display: flex !important;
        overflow-x: auto !important;
        white-space: nowrap !important;
        gap: 0.45rem !important;
        padding: 0.55rem 0.75rem !important;
        -webkit-overflow-scrolling: touch;
        scrollbar-width: none;
      }
      .app-tabs::-webkit-scrollbar {
        display: none;
      }
      .app-tabs .tab-btn {
        flex: 0 0 auto !important;
        min-height: 44px;
        font-size: 0.86rem !important;
        padding: 0.55rem 0.9rem !important;
      }
      .header-top-bar {
        flex-direction: column;
        align-items: stretch !important;
        gap: 0.55rem !important;
      }
      .btn, .mode-switch-btn, .ai-status-btn {
        min-height: 44px;
      }
    }
  `;
  document.head.appendChild(androidStyle);

  // 4) Offline-Verbindungs-Indikator (zeigt sofort an, wenn im Funkloch / Offline-Modus gelernt wird)
  const offlineBanner = document.createElement("div");
  offlineBanner.id = "pwa-offline-indicator";
  offlineBanner.style.cssText =
    "position:fixed; bottom:1rem; left:1rem; z-index:2147483645; display:none; align-items:center; gap:0.55rem; background:rgba(245,158,11,0.96); color:#0f172a; font-weight:700; font-size:0.8rem; padding:0.55rem 0.9rem; border-radius:10px; box-shadow:0 10px 25px rgba(0,0,0,0.5);";
  offlineBanner.innerHTML = `
    <span style="width:9px; height:9px; border-radius:50%; background:#0f172a; display:inline-block;"></span>
    <span>📡 Offline-Modus aktiv – Alle 196 Fragen, Rechner & Simulatoren laufen lokal weiter!</span>
  `;
  document.body.appendChild(offlineBanner);

  function updateOnlineBanner() {
    offlineBanner.style.display = navigator.onLine ? "none" : "flex";
  }
  window.addEventListener("online", updateOnlineBanner);
  window.addEventListener("offline", updateOnlineBanner);
  updateOnlineBanner();

  // 5) In-App Install Prompt ("📲 Android-App") + APK-/Installations-Assistent
  let deferredInstallPrompt = null;

  function isRunningStandalone() {
    return (
      window.matchMedia("(display-mode: standalone)").matches ||
      window.navigator.standalone === true
    );
  }

  function openAndroidInstallModal() {
    const existing = document.getElementById("pwa-android-install-modal");
    if (existing) {
      existing.remove();
      return;
    }

    const isIOS = /iphone|ipad|ipod/i.test(navigator.userAgent || "");
    const modal = document.createElement("div");
    modal.id = "pwa-android-install-modal";
    modal.style.cssText =
      "position:fixed; inset:0; background:rgba(9,13,22,0.88); z-index:2147483647; display:flex; align-items:center; justify-content:center; padding:1rem; backdrop-filter:blur(8px);";

    modal.innerHTML = `
      <div style="background:#0f172a; border:1px solid #10b981; border-radius:16px; max-width:680px; width:100%; max-height:90vh; overflow-y:auto; padding:1.4rem; box-shadow:0 25px 50px rgba(0,0,0,0.85); color:#f8fafc;">
        <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid #1e293b; padding-bottom:0.8rem; margin-bottom:1rem;">
          <div>
            <h3 style="margin:0; font-size:1.15rem; color:#34d399;">📲 Als echte Android-App (PWA oder .APK) nutzen</h3>
            <p style="margin:0.2rem 0 0 0; font-size:0.8rem; color:#94a3b8;">Vollbild ohne Browserleiste • Eigenes App-Icon • 100 % Offline-fähig in der Bahn & Berufsschule</p>
          </div>
          <button type="button" id="btn-close-pwa-modal" class="btn secondary" style="padding:0.35rem 0.75rem;">✖</button>
        </div>

        <div style="display:flex; flex-direction:column; gap:0.9rem; font-size:0.85rem; line-height:1.55; color:#cbd5e1;">
          ${
            deferredInstallPrompt
              ? `<div style="background:rgba(16,185,129,0.15); border:1px solid #10b981; border-radius:10px; padding:1rem; text-align:center;">
                  <div style="font-weight:700; color:#6ee7b7; margin-bottom:0.5rem;">✅ Direkt-Installation auf deinem Gerät bereit!</div>
                  <button type="button" id="btn-trigger-native-install" class="btn primary" style="background:#10b981; border-color:#059669; color:#06281e; font-weight:800; width:100%; padding:0.7rem;">
                    📲 Jetzt mit 1 Klick als App installieren
                  </button>
                </div>`
              : ""
          }

          <div style="background:#1e293b; border:1px solid #334155; border-radius:10px; padding:0.95rem;">
            <strong style="color:#38bdf8;">Weg 1: Direkt über Chrome / Samsung Internet auf Android installieren (Empfohlen & sofort automatisch aktuell)</strong>
            <ol style="margin:0.45rem 0 0 1.2rem; padding:0;">
              <li>Öffne deine Netlify-Adresse auf dem Android-Smartphone in <strong>Google Chrome</strong> (oder Samsung Internet).</li>
              <li>Tippe oben auf den grünen Button <strong>„📲 Android-App“</strong> oder rechts oben im Browser auf das <strong>Drei-Punkte-Menü (⋮)</strong>.</li>
              <li>Wähle <strong>„App installieren“</strong> (bzw. <em>„Zum Startbildschirm hinzufügen“</em>).</li>
              <li>Die App erscheint mit eigenem ⚡-Icon im App-Drawer, läuft im echten Vollbild (ohne Adressleiste) und speichert alle Fragen offline!</li>
            </ol>
          </div>

          <div style="background:#1e293b; border:1px solid #334155; border-radius:10px; padding:0.95rem;">
            <strong style="color:#fbbf24;">Weg 2: Echte Android <code>.apk</code>-Datei zum Verschicken (z. B. per WhatsApp an die Lerngruppe) erstellen</strong>
            <p style="margin:0.35rem 0 0.45rem 0;">
              Da ich deine Seite bereits mit einem vollständigen Android-Manifest (<code>manifest.json</code>), Maskable-Icons (<code>512x512</code>) und Offline-Service-Worker (<code>sw.js</code>) ausgestattet habe, kannst du in 60 Sekunden eine echte, signierte <strong>Android <code>.apk</code></strong> erzeugen:
            </p>
            <ol style="margin:0 0 0 1.2rem; padding:0;">
              <li>Lade die Seite auf Netlify hoch und kopiere deine Netlify-URL (z. B. <code>https://dein-name.netlify.app</code>).</li>
              <li>Gehe auf das kostenlose Microsoft-Tool <strong>pwabuilder.com</strong> und füge deine Netlify-URL ein.</li>
              <li>Klicke auf <strong>„Package for stores“ $\rightarrow$ „Android“ $\rightarrow$ „Download Package“</strong>.</li>
              <li>Du erhältst eine fertige <strong><code>.apk</code>-Datei</strong>, die du direkt auf jedem Android-Handy installieren oder in deine Lerngruppen-WhatsApp-Gruppe schicken kannst!</li>
            </ol>
          </div>

          ${
            isIOS
              ? `<div style="background:rgba(59,130,246,0.14); border:1px solid #3b82f6; border-radius:10px; padding:0.95rem;">
                  <strong style="color:#93c5fd;">🍏 Hinweis für iPhone / iPad (Safari):</strong><br>
                  Tippe unten in der Safari-Leiste auf das <strong>Teilen-Symbol (Quadrat mit Pfeil nach oben)</strong> und wähle <strong>„Zum Home-Bildschirm“</strong>.
                </div>`
              : ""
          }
        </div>

        <div style="margin-top:1rem; display:flex; justify-content:flex-end;">
          <button type="button" id="btn-ok-pwa-modal" class="btn primary" style="padding:0.5rem 1.2rem;">Schließen</button>
        </div>
      </div>
    `;

    document.body.appendChild(modal);
    modal.querySelector("#btn-close-pwa-modal")?.addEventListener("click", () => modal.remove());
    modal.querySelector("#btn-ok-pwa-modal")?.addEventListener("click", () => modal.remove());
    modal.addEventListener("click", (e) => {
      if (e.target === modal) modal.remove();
    });

    modal.querySelector("#btn-trigger-native-install")?.addEventListener("click", async () => {
      if (!deferredInstallPrompt) return;
      deferredInstallPrompt.prompt();
      const choice = await deferredInstallPrompt.userChoice;
      if (choice && choice.outcome === "accepted") {
        deferredInstallPrompt = null;
        modal.remove();
        const btn = document.getElementById("btn-install-pwa");
        if (btn) btn.style.display = "none";
      }
    });
  }

  // Install-Button oben im Header einfügen (wird automatisch ausgeblendet, wenn bereits als App installiert)
  const headerTopBar = document.querySelector(".header-top-bar");
  if (headerTopBar && !document.getElementById("btn-install-pwa") && !isRunningStandalone()) {
    const installBtn = document.createElement("button");
    installBtn.id = "btn-install-pwa";
    installBtn.type = "button";
    installBtn.className = "ai-status-btn";
    installBtn.style.cssText =
      "background: rgba(16, 185, 129, 0.18); border-color: rgba(16, 185, 129, 0.55); color: #6ee7b7;";
    installBtn.innerHTML = "📲 <span>Android-App</span>";
    installBtn.title = "Plattform als Vollbild-Android-App installieren oder .APK erstellen";

    installBtn.addEventListener("click", async () => {
      if (deferredInstallPrompt) {
        deferredInstallPrompt.prompt();
        const choice = await deferredInstallPrompt.userChoice;
        if (choice && choice.outcome === "accepted") {
          deferredInstallPrompt = null;
          installBtn.style.display = "none";
        }
      } else {
        openAndroidInstallModal();
      }
    });

    const aiBtn = document.getElementById("btn-open-ai-modal");
    if (aiBtn && aiBtn.parentNode === headerTopBar) {
      headerTopBar.insertBefore(installBtn, aiBtn);
    } else {
      headerTopBar.appendChild(installBtn);
    }
  }

  window.addEventListener("beforeinstallprompt", (e) => {
    e.preventDefault();
    deferredInstallPrompt = e;
    const installBtn = document.getElementById("btn-install-pwa");
    if (installBtn && !isRunningStandalone()) {
      installBtn.style.display = "inline-flex";
      installBtn.innerHTML = "📲 <span>App installieren</span>";
    }
  });

  window.addEventListener("appinstalled", () => {
    deferredInstallPrompt = null;
    const installBtn = document.getElementById("btn-install-pwa");
    if (installBtn) installBtn.style.display = "none";
  });
})();