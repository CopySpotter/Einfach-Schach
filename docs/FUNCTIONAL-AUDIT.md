# Einfach-Schach – Funktionale Bestandsaufnahme

Stand: `develop`, 10. September 2026

## Ergänzung: Vorabversion `v0.1.1-rc.3` auf `feature/pgn-export`

Die Vorabversion `v0.1.1-rc.3` bereinigt den lokalen Datenfluss und ersetzt den kopierten, inhaltlich falschen Datenschutztext durch einen technischen Hinweis zum tatsächlichen Programmstand.

- Das externe Analyse-Skript wurde aus `pages/_app.tsx` entfernt.
- Die nachgeladenen Google-Webfonts wurden aus `pages/_document.js` entfernt. Die Oberfläche verwendet nun Schriften, die auf dem jeweiligen Computer vorhanden sind.
- `app/.env` setzt `NEXT_TELEMETRY_DISABLED=1`; die anonyme Next.js-Telemetrie ist beim lokalen Start und beim Build deaktiviert.
- `/legal/privacy` nennt nur noch die tatsächlich gespeicherten lokalen Profildaten, die nicht aktiv angebotene Face-Alt-Komponente und die Grenzen einer späteren öffentlichen Bereitstellung.
- Es wurden keine Schachregeln, keine Engine, keine PGN-Logik und keine Spielstände verändert.

Im normalen Spielbetrieb unter `localhost` lädt die Oberfläche keine fremden Browser-Skripte oder Webfonts. Die optionale Face-Komponente bleibt im Code, ist jedoch im Login nicht erreichbar und wird dadurch nicht gestartet.

Vollständige Freigabedokumentation: [`RELEASE-v0.1.1-rc.3.md`](RELEASE-v0.1.1-rc.3.md).

## Ergänzung: Vorabversion `v0.1.1-rc.2` auf `feature/pgn-export`

Die Vorabversion `v0.1.1-rc.2` ergänzt den vorherigen Release Candidate um ein
klassisches, zurückhaltendes Turnierdesign. Es ändert keine Schachlogik.

- `app/public/chessground.tournament.css` definiert die Brettfarben:
  Elfenbein (`#f2e4c9`) und Nussbaum (`#a86e45`).
- Die Chessground-Interaktionsfarben für mögliche Ziele, Auswahl, letzten Zug,
  Schach und Vormerkungen wurden in dieselbe ruhige Farbwelt überführt.
- Die Figuren bleiben die eingebauten `cburnett`-Grafiken von Chessground. Das
  ist ein klar erkennbarer klassischer Staunton-Satz; leichte CSS-Anpassungen
  geben weißen Figuren einen warmen Elfenbeinton und dunklen Figuren einen
  zurückhaltenden warmen Akzent.
- Alle freien Partien und Trainingsbretter verwenden das Design, weil die
  zentrale CSS-Datei in `pages/_app.tsx` geladen wird.

Es ist **kein Chessground-Fork** und keine Änderung am Chessground-Code
notwendig. Regeln, Engine, PGN, Farbenwahl und Speicherung bleiben unverändert.
Der frühere Stand `v0.1.1-rc.1` ist darin vollständig enthalten.

Vollständige Freigabedokumentation:
[`RELEASE-v0.1.1-rc.2.md`](RELEASE-v0.1.1-rc.2.md).

## Ergänzung: Vorabversion `v0.1.1-rc.1` auf `feature/pgn-export`

Die nachstehenden Bestandsangaben beschreiben den früheren Stand auf
`develop`. Für den Release Candidate wurde die freie Partie erweitert:

- **PGN speichern:** Die im aktuell geöffneten Browser gespielte Zugfolge kann
  während der Partie und im Ergebnisdialog als PGN-Datei gespeichert werden.
- **Brett drehen:** Die Ansicht lässt sich jederzeit über „Brett drehen"
  wechseln. Das ändert nur die Ansicht, nicht die Spielerfarbe.
- **Mit Schwarz spielen:** Vor dem ersten Zug fordert „Zieh" die Engine auf,
  Weiß zu spielen. Das Brett dreht zu Schwarz; anschließend spielt die Person
  Schwarz und die Engine antwortet mit Weiß.
- Die Engine-Suche erhält die gewünschte Farbe als Parameter und kann daher
  legal für Weiß oder Schwarz einen Zug auswählen.

**Geprüft:** TypeScript-Check und Production-Build waren erfolgreich. Die
Engine-Auswahl wurde für Weiß und Schwarz mit legalen Zügen geprüft; die
Schwarz-Partie wurde im Browser manuell bestätigt.

**Bekannte Grenze:** Spielerfarbe und vollständige Zugfolge werden noch nicht
über einen Seitenneustart gespeichert. Eine Schwarz-Partie daher nicht
aktualisieren oder schließen; zuvor bei Bedarf PGN speichern. Details:
[`RELEASE-v0.1.1-rc.1.md`](RELEASE-v0.1.1-rc.1.md).

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
