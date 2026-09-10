# Einfach-Schach – Funktionale Bestandsaufnahme

Stand: `develop`, September 2026

## Bestätigt

- Lokaler Start unter Linux funktioniert.
- Produktions-Build mit `npm run build` läuft erfolgreich durch.
- Gastmodus startet und Partie gegen die lokale KI ist spielbar.
- Der frühere Runtime-Absturz in `ai.tsx` bei unvollständigen Zugdaten ist behoben.

## Vorhandene Kernbereiche

### Start und Benutzer

- Startseite mit Anmeldung, Registrierung und Gastmodus
- lokale Benutzerhaltung in `src/data/users.json`
- QR-Code-Anmeldung vorbereitet
- optionale Gesichtserkennung als separater Dienst

### Partie

- Chessground-Oberfläche
- Regelprüfung mit `chess.js`
- lokale Minimax-/Alpha-Beta-KI
- Schlagzüge, Schach und Rochade werden behandelt
- Bauernumwandlung
- Rücknahme
- Aufgabe
- Speicherung der laufenden Partie für registrierte Benutzer
- Zughistorie
- Audio- und Blindenmodus-Unterstützung

### Training

- Kapitelübersicht
- Kapitelbilder und Beschreibung
- Übungen aus `training.json`
- Fortschritt pro Kapitel
- abgeschlossene Kapitel können mit zufällig ausgewählten Aufgaben wiederholt werden

### Einstellungen

- Zuggeschwindigkeit
- Brettgeräusche
- Figurengeräusche
- Blindenmodus
- QR-Code anzeigen und drucken

## Gefundene Altlasten

1. `Login.tsx`: Die Zurück-Taste der Anmeldeauswahl führt auf `/game`. Für einen nicht angemeldeten Benutzer ist das logisch falsch und kann unnötige Weiterleitungen erzeugen.
2. `settings.tsx`: Beim Speichern wird `FormData.get('click')` gelesen, obwohl auf der Seite kein entsprechendes Formularfeld mehr sichtbar ist. Dadurch wird `wantsToClick` faktisch immer auf `false` gesetzt.
3. `MainMenu.tsx`: Die Anzeige `Kapitel abgeschlossen: x/15` ist hart codiert, obwohl die Trainingsdaten die tatsächliche Zahl der Kapitel liefern könnten.
4. `database.ts`: `updateGame()` und `update()` verwenden einen gefundenen Benutzer ohne Prüfung auf `undefined`. Ungültige IDs können deshalb einen Serverfehler verursachen.
5. `FreePlay.tsx`: Es gibt zahlreiche direkte DOM-Zugriffe über `document.getElementById`; das erschwert Robustheit, Tests und spätere React-Modernisierung.
6. `FreePlay.tsx`: KI-Endzustände sollten gezielt auf Matt, Patt, Remis und den Fall `aiGetBestMove() === null` geprüft werden.
7. Mehrere Dateien enthalten nicht verwendete Imports und Debug-Ausgaben wie `console.log`.
8. Der Gastbenutzer nutzt eigene Initialwerte; diese sollten mit `defaultUserSchema` abgeglichen werden, damit Gast und registrierter Benutzer nicht ungewollt unterschiedlich reagieren.

## Nächste sinnvolle Reihenfolge

1. Navigation und offensichtliche Zustandsfehler korrigieren.
2. Benutzer-/Datenbankzugriffe defensiv machen.
3. KI-Endzustände vollständig absichern.
4. Danach manuelle Regressionstests für Partie, Training, Einstellungen, Audio und Blindenmodus.
5. Erst anschließend Framework- und Abhängigkeitsmodernisierung planen.

## Stabilitätsregel

`main` bleibt der getestete Stand. Korrekturen werden zunächst auf `develop` oder einem kleinen Fix-Branch durchgeführt und erst nach lokalem Test übernommen.
