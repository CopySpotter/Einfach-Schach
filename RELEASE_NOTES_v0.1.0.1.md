# Einfach-Schach v0.1.0.1

Stabiler Korrektur-Release auf Basis von `main` / `v0.1.0`.

## Inhalt

- Fremdes Analyse-Skript entfernt.
- Google-Webfonts entfernt; die Anwendung nutzt Systemschriften des eigenen Computers.
- Anonyme Next.js-Telemetrie deaktiviert.
- Kopierte, sachlich unzutreffende Datenschutzerklärung durch einen technischen Hinweis zum tatsächlichen lokalen Datenfluss ersetzt.

Beim normalen Spielen unter `localhost` werden keine Profil-, Schach- oder Spielstanddaten an diese entfernten externen Dienste gesendet.

## Unverändert

Die Schachregeln, die lokale Engine, Anmeldung, Training, Spieloberfläche und die bereits veröffentlichte Funktionsbasis bleiben unverändert. PGN-Export, Brettdrehung und die Weiß-Engine-Steuerung gehören weiterhin ausschließlich zum Entwicklungszweig `feature/pgn-export`.

## Prüfung

- TypeScript-Check erfolgreich.
- Production-Build erfolgreich.
- Es werden weder das entfernte Analyse-Skript noch Google-Webfonts in die gebaute Datenschutzseite eingebunden.
