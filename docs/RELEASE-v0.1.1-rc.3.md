# Einfach-Schach v0.1.1-rc.3 – lokale Daten und Offline-Betrieb

**Status:** Vorabversion auf dem öffentlichen Branch `feature/pgn-export`.
Dies ist keine Änderung an `main` und ersetzt nicht das stabile Release
**v0.1.0**.

## Zweck dieser Vorabversion

Diese Version macht die lokale Anwendung unabhängiger von fremden Diensten.
Sie verändert nicht das Schachspiel. Der Schwerpunkt liegt auf ehrlicher
Dokumentation und darauf, dass beim normalen lokalen Spielen keine fremden
Browser-Dienste geladen werden.

## Was wurde entfernt?

| Früher | Jetzt | Wirkung |
|---|---|---|
| Analyse-Skript von `analysis.cryptomonkeys.cc` | entfernt | Beim Öffnen der App wird kein externer Analyse-Dienst geladen. |
| Schriftarten von Google Fonts | entfernt | Die App verwendet Standardschriften des eigenen Computers. Dadurch kann die Schrift etwas anders aussehen. |
| standardmäßige anonyme Next.js-Telemetrie | mit `app/.env` deaktiviert | Beim lokalen Start und beim Build werden keine Next.js-Telemetriedaten gesendet. |
| allgemeiner Text des ursprünglichen Projekts | neuer technischer Datenschutzhinweis | Keine falsche Person, Adresse, Zahlung, E-Mail, Cookie- oder Vertragsbehauptung mehr. |

## Datenfluss in einfacher Sprache

1. Die App läuft auf dem eigenen Computer, normalerweise unter
   `http://localhost:3000`.
2. Wenn ein Profil angelegt oder geändert wird, speichert die App den Namen,
   Einstellungen, Lernfortschritt und gegebenenfalls den Brettstand in
   `app/src/data/users.json`.
3. Die Schach-Engine rechnet im Browser. Sie sendet keine Züge an einen
   Schachserver.
4. Beim normalen Spielen lädt der Browser keine Analyse-Skripte und keine
   Webfonts von außen.
5. Ein Gastspiel wird nicht als eigenes Profil in `users.json` gespeichert.

Bei einer frischen Installation fehlt diese Datei zunächst absichtlich. Die
App verwendet dann die mitgelieferte leere Vorlage und startet trotzdem. Erst
beim Speichern eines Profils wird `users.json` automatisch angelegt.

Die Datei `users.json` liegt auf dem Rechner der Person, die die Anwendung
startet. Wer Zugriff auf diesen Rechner und diese Datei hat, kann die dort
gespeicherten Profildaten lesen. Einen eigenen Löschknopf für Profile gibt es
derzeit noch nicht.

## Was bleibt bewusst unverändert?

- PGN-Datei speichern;
- Brettansicht drehen;
- mit Schwarz spielen: Vor dem ersten Zug „Zieh“ drücken, dann eröffnet die
  Engine mit Weiß;
- Staunton-Turnierdesign in Elfenbein und Nussbaum;
- lokale Minimax-/Alpha-Beta-Engine mit Suchtiefe 2;
- Training, QR-Anmeldung, Sounds und Blindenmodus.

Die optional im Quellcode vorhandene Gesichtserkennung ist weiterhin nicht als
Login-Schaltfläche erreichbar. Sie wird beim normalen Spiel daher nicht
gestartet. Falls sie später wieder aktiviert wird, braucht sie vorab eine
eigene technische und datenschutzrechtliche Prüfung.

## Ergänzende Stabilitätskorrekturen

Die Holzbrett-Optik, PGN-Download, Brettdrehung und Schwarz-Partie bleiben
unverändert. Neu startet eine frische Installation ohne manuell angelegte
`users.json`; die Datei entsteht erst beim ersten Speichern eines Profils.
Die Trainingsanzeige verwendet die tatsächlichen Kapitel- und Übungszahlen.
Trainings-Bauernumwandlungen prüfen die gewählte Figur. Wiederholte Kapitel
bleiben Wiederholungen und erhöhen den gespeicherten Fortschritt nicht.
Zufallsaufgaben werden aus einer Kopie der Trainingsdaten gemischt.

## Datenschutzhinweis

Die Seite `/legal/privacy` ist jetzt ein technischer Hinweis für diese lokale
Downloadfassung. Sie ist keine fertige Erklärung für eine öffentliche Website.
Vor einer öffentlichen Bereitstellung müssen Betreiber, Hosting, Server-Logs,
tatsächlich eingesetzte Dienste und ein Impressum passend ergänzt werden.

## Geprüfter Stand

- `npm run type-check` erfolgreich;
- `npm run build` erfolgreich;
- `npm ci --legacy-peer-deps` erfolgreich mit der versionierten
  `package-lock.json`;
- die gebaute Datenschutzseite enthält weder das alte Analyse-Skript noch
  Google-Font-Links;
- die Build-Ausgabe bestätigt das Laden von `app/.env`; die frühere
  Next.js-Telemetrie-Meldung erscheint nicht.

Bekannte Warnungen älterer Abhängigkeiten, insbesondere Chessground, sind
weiter vorhanden. Sie sind in diesem Release keine Build-Fehler.

## Bekannte Grenzen

1. **Spielerfarbe ist noch nicht dauerhaft gespeichert.** Eine als Schwarz
   gestartete Partie nicht neu laden oder schließen; vorher bei Bedarf PGN
   speichern.
2. **Die PGN-Datei enthält die Zugfolge seit dem Öffnen der Partie.** Nach
   einem Neuladen kann die alte Zugfolge nicht rekonstruiert werden.
3. **Die Engine bleibt bewusst einfach.** Sie ist kein Stockfish und keine
   professionelle Schachengine.
4. **Lokale Profile haben noch keinen Löschknopf.** Die lokale Datei muss bei
   Bedarf manuell bearbeitet oder zurückgesetzt werden.

## Installation und Start

### ZIP unter Windows

1. ZIP vollständig entpacken.
2. `START_EINFACH_SCHACH_WINDOWS.bat` doppelklicken.
3. Beim ersten Start werden die benötigten Bausteine installiert.
4. Danach im Browser `http://localhost:3000` öffnen.

Die Startdatei verwendet `npm.cmd`; eine PowerShell-Sperre für `npm.ps1` ist
dadurch kein Hindernis.

### ZIP unter Linux

```bash
chmod +x START_EINFACH_SCHACH.sh
./START_EINFACH_SCHACH.sh
```

### Branch unter Windows aktualisieren

```powershell
# laufenden Entwicklungsserver mit Strg+C beenden
git switch feature/pgn-export
git pull --ff-only origin feature/pgn-export
cd app
npm.cmd run dev
```

Jeder entpackte Versionsordner bleibt unabhängig und hat eigene installierte
Bausteine und lokale Benutzerdaten.
