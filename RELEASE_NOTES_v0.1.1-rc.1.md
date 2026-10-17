# Einfach-Schach v0.1.1-rc.1 – Release Notes

Dies ist eine **Vorabversion** des Entwicklungszweigs `feature/pgn-export`.
`main` und das stabile Release `v0.1.0` wurden nicht verändert.

## Neu gegenüber v0.1.0

- laufende Partie als **PGN-Datei** herunterladen;
- Brettansicht jederzeit **drehen**;
- per **„Zieh“** die Engine mit Weiß eröffnen lassen und selbst Schwarz
  spielen;
- korrekte Weiß-/Schwarz-Namen im PGN-Export;
- Engine-Suche kann nun für beide Farben einen Zug berechnen.

## Prüfung

- TypeScript-Check erfolgreich;
- Production-Build erfolgreich;
- legale Engine-Züge für Weiß und Schwarz geprüft;
- Ablauf „Engine Weiß, Mensch Schwarz“ im Browser bestätigt.

## Wichtiger Hinweis für den Test

Eine als Schwarz gestartete Partie nicht neu laden oder schließen. Die App
speichert die Brettstellung, aber in diesem Release Candidate die gewählte
Spielerfarbe noch nicht dauerhaft. Vorher gegebenenfalls PGN speichern.

Die vollständige Beschreibung steht in
[`docs/RELEASE-v0.1.1-rc.1.md`](docs/RELEASE-v0.1.1-rc.1.md).
