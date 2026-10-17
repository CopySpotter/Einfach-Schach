# Einfach-Schach v0.1.1-rc.3 – Release Notes

Dies ist eine **Vorabversion** des Entwicklungszweigs `feature/pgn-export`.
`main` und das stabile Release `v0.1.0` wurden nicht verändert.

## Neu gegenüber v0.1.1-rc.2

- Der fremde Analyse-Dienst wurde entfernt.
- Google-Webfonts werden nicht mehr geladen. Die App verwendet die auf dem
  jeweiligen Computer vorhandenen Standardschriften.
- Die anonyme Telemetrie des technischen Grundgerüsts Next.js ist deaktiviert.
- Die alte, kopierte Datenschutzerklärung wurde durch einen kurzen,
  wahrheitsgemäßen technischen Datenschutzhinweis ersetzt.

## Was das bedeutet

Beim normalen lokalen Spielen unter `http://localhost:3000` lädt Einfach-Schach
keine Analyse-Skripte und keine Webfonts von fremden Anbietern mehr. Namen,
Spielstände, Einstellungen und Lernfortschritt bleiben wie bisher in der
lokalen Datei `app/src/data/users.json` der jeweiligen Installation.

Das Spiel selbst, seine Regeln, die einfache lokale Engine, PGN-Export,
Brettdrehung, Schwarz-Partien und das Turnierdesign bleiben unverändert.

## Prüfung

- TypeScript-Check erfolgreich;
- Production-Build erfolgreich;
- erzeugte Datenschutzseite geprüft: keine Google-Font- oder Analyse-Skript-
  Einbindung;
- Next.js lädt die Konfiguration mit deaktivierter Telemetrie.

Die vollständige Beschreibung steht in
[`docs/RELEASE-v0.1.1-rc.3.md`](docs/RELEASE-v0.1.1-rc.3.md).
