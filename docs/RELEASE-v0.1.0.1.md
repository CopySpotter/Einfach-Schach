# Release-Leitfaden: Einfach-Schach v0.1.0.1

## Zweck

`v0.1.0.1` ist ein stabiler Korrektur-Release. Er basiert auf `main` und ändert bewusst keine Spielfunktionen.

## Tatsächliche Änderungen

1. Das externe Analyse-Skript wurde entfernt.
2. Google-Webfonts werden nicht mehr vom Browser geladen.
3. Next.js-Telemetrie ist in der lokalen Projektkonfiguration deaktiviert.
4. `/legal/privacy` beschreibt jetzt wahrheitsgemäß den lokalen Datenfluss statt eines übernommenen Textes über Konten, Verträge und Datenverarbeitungen, die dieses Programm nicht anbietet.

## Lokaler Datenfluss

Benutzerprofile und gegebenenfalls gespeicherte Brettstände werden in `app/src/data/users.json` der lokalen Installation gespeichert. Beim Betrieb unter `http://localhost:3000` läuft die Schachlogik im Browser. Der Release verwendet weder das entfernte Analyse-Skript noch Google-Webfonts.

## Abgrenzung

Der Patch ist kein Ersatz für eine rechtliche Datenschutzerklärung eines späteren öffentlichen Webbetriebs. Wer das Programm öffentlich hostet oder Daten anderer Personen verarbeitet, braucht dafür eigene Angaben zur verantwortlichen Person, zum Hosting und zu den tatsächlich eingesetzten Diensten.

## Start und Prüfung

```bash
cd app
cp src/data/users.example.json src/data/users.json
npm install --legacy-peer-deps
npm run type-check
npm run build
npm run dev
```

Danach im Browser `http://localhost:3000` öffnen.
