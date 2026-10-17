# Einfach-Schach v0.1.1-rc.2 – Release Notes

Dies ist eine **Vorabversion** des Entwicklungszweigs `feature/pgn-export`.
`main` und das stabile Release `v0.1.0` wurden nicht verändert.

## Neu gegenüber v0.1.1-rc.1

- klassisches Schachbrett in Elfenbein und Nussbaum;
- vorhandene Cburnett-Staunton-Figuren mit warmer, besser zum Brett passender
  Darstellung;
- ruhige, klar unterscheidbare Farben für Auswahl, mögliche Züge, letzten Zug,
  Vormerkung und Schach;
- einheitliches Design in freier Partie und Training.

Die Änderung ist rein optisch. Spielregeln, Engine, PGN-Export, Brettdrehung
und die Möglichkeit, gegen die weiße Engine mit Schwarz zu spielen, bleiben
unverändert.

## Prüfung

- TypeScript-Check erfolgreich;
- Production-Build erfolgreich;
- vorheriger Spielablauf bleibt unverändert, da nur zentrale Styles geladen
  werden.

## Wichtiger Hinweis für den Test

Eine als Schwarz gestartete Partie nicht neu laden oder schließen. Die App
speichert die Brettstellung, aber die gewählte Spielerfarbe noch nicht
dauerhaft. Vorher gegebenenfalls PGN speichern.

Die vollständige Beschreibung steht in
[`docs/RELEASE-v0.1.1-rc.2.md`](docs/RELEASE-v0.1.1-rc.2.md).
