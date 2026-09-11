# Einfach-Schach – Funktionale Bestandsaufnahme

Stand: `develop`, 10. September 2026

## Bestätigt

- Lokaler Start unter Linux funktioniert.
- Produktions-Build mit `npm run build` läuft erfolgreich durch.
- TypeScript-Check läuft in der CI erfolgreich durch.
- Gastmodus startet und Partie gegen die lokale KI ist spielbar.
- Der frühere Runtime-Absturz in `ai.tsx` bei unvollständigen Zugdaten ist behoben.
- Login-Zurück-Navigation wurde korrigiert und lokal getestet.
- Einstellungen überschreiben `wantsToClick` nicht mehr durch ein nicht vorhandenes Formularfeld.
- Datenbank-Updates sind gegen unbekannte Benutzer-IDs abgesichert.
- PR #2 mit diesen Legacy-Fixes wurde nach `develop` gemergt; die anschließende CI war erfolgreich.

## Vorhandene Kernbereiche

### Start und Benutzer

- Startseite mit Anmeldung, Registrierung und Gastmodus
- lokale Benutzerhaltung in `src/data/users.json`
- QR-Code-Anmeldung
- optionale Gesichtserkennung als separater Dienst; Face-Komponente im Code vorhanden, aktuell aber nicht als sichtbarer Login-Button angeboten

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
- mehrere Lösungsvarianten
- Fortschritt pro Kapitel
- abgeschlossene Kapitel können mit zufällig ausgewählten Aufgaben wiederholt werden

### Einstellungen

- Zuggeschwindigkeit
- Brettgeräusche
- Figurengeräusche
- Blindenmodus
- QR-Code anzeigen und drucken

## Bereits behobene Altlasten 2026

1. `Login.tsx`: Zurück-Taste führte fälschlich auf `/game` → korrigiert.
2. `settings.tsx`: nicht vorhandenes Feld `click` setzte `wantsToClick` beim Speichern auf `false` → korrigiert.
3. `database.ts`: `updateGame()` und `update()` konnten bei unbekannter ID auf `undefined` zugreifen → defensiv abgesichert.
4. `ai.tsx`: Positions-/Schlagzugbewertung konnte bei unvollständigen Zugdaten abstürzen → defensiv abgesichert.
5. MUI-/Emotion-Abhängigkeiten waren über `latest` nicht reproduzierbar → funktionierende Kernversionen wurden festgeschrieben.
6. fehlende lokale `users.json` verhinderte den Start → `users.example.json` dokumentiert den sauberen Initialzustand.

## Noch offene Altlasten

1. `MainMenu.tsx`: `Kapitel abgeschlossen: x/15` ist hart codiert.
2. `FreePlay.tsx` und `move_displayer.ts`: mehrere direkte DOM-Zugriffe über `document.getElementById`.
3. KI-Endzustände Patt, Remis und `aiGetBestMove() === null` gezielt absichern und testen.
4. nicht verwendete Imports und Debug-Ausgaben wie `console.log` bereinigen.
5. Gastbenutzer, `defaultUserSchema` und Store-Initialwerte vereinheitlichen.
6. MUI 4/5-Mischbetrieb später beseitigen.
7. weitere nicht festgeschriebene `latest`-Abhängigkeiten, insbesondere MediaPipe, später prüfen.
8. Face-Recognition separat testen; App und Flask verwenden Port 5000, während das README-Dockerbeispiel derzeit `5000:3000` zeigt.
9. PWA-Abhängigkeit ist vorhanden, die Konfiguration in `next.config.js` jedoch auskommentiert.

## Noch offene manuelle Regression

- Name-Login und komplette Registrierung
- QR-Login
- gespeicherte Partie nach Neustart
- Trainingskapitel, Varianten, Fortschritt und Wiederholung
- Rochade, Umwandlung, Matt, Patt, Remis, Aufgabe und Rücknahme
- Audio- und Blindenmodus mit Tastatur/Screenreader

## Vollständige HTML-Dokumentation

Siehe `docs/Einfach-Schach_Gesamtdokumentation.html` für Feature-Matrix, Architektur, Benutzerabläufe, Datenflüsse, Funktionsreferenz, Routen, Status und Arbeitsplan.

## Stabilitätsregel

`main` bleibt der getestete Stand. Korrekturen werden zunächst auf `develop` oder einem kleinen Fix-Branch durchgeführt und erst nach lokalem Test übernommen.
