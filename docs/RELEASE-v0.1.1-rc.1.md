# Einfach-Schach v0.1.1-rc.1 – Vorabversion

**Status:** Release Candidate auf dem öffentlichen Branch
`feature/pgn-export`. Dies ist keine Änderung an `main` und ersetzt nicht das
stabile Release **v0.1.0**.

## Zweck dieser Vorabversion

Diese Version bündelt drei Spielverbesserungen, die in einer echten Partie im
Browser geprüft wurden:

1. Partie als PGN-Datei speichern.
2. Brettansicht jederzeit drehen.
3. Gegen die Engine mit Schwarz spielen.

## Neuer Funktionsumfang

| Funktion | Bedienung | Ergebnis |
|---|---|---|
| **PGN speichern** | Unter dem Brett oder nach Matt im Ergebnisfenster auf „PGN speichern“ klicken. | Download einer `.pgn`-Datei mit Datum, Namen, Ergebnismarkierung und Zugfolge. |
| **Brett drehen** | „↻ Brett drehen“ klicken. | Nur die Ansicht dreht sich; Spielregeln und Spielerfarbe bleiben unverändert. |
| **Als Schwarz spielen** | Vor dem ersten Zug „Zieh“ klicken. | Die Engine eröffnet mit Weiß, das Brett dreht sich zu Schwarz. Danach spielt die Person Schwarz und die Engine Weiß. |

## Wie der neue Spielablauf funktioniert

### Standard: Person spielt Weiß

1. Neue Partie öffnen.
2. Die Person zieht Weiß.
3. Die lokale Engine berechnet und spielt Schwarz.

### Alternative: Person spielt Schwarz

1. Neue Partie öffnen.
2. **Vor dem ersten Zug** „Zieh“ anklicken.
3. Die Engine berechnet einen weißen Eröffnungszug und führt ihn aus.
4. Das Brett wird automatisch gedreht.
5. Die Person zieht Schwarz; danach antwortet die Engine immer mit Weiß.

Der Knopf ist nach dem ersten Zug deaktiviert. Dadurch kann die Spielerfarbe
nicht versehentlich mitten in der Partie wechseln.

## Technische Umsetzung in einfacher Sprache

- `chess.js` kontrolliert weiterhin, ob ein Zug erlaubt ist.
- `Chessground` zeigt das Brett und die erlaubten Zielfelder.
- Die eigene Engine in `app/src/utils/ai.tsx` erhält nun die Farbe, für die sie
  suchen soll. Daher kann dieselbe Minimax-/Alpha-Beta-Logik Weiß oder Schwarz
  spielen.
- `FreePlay.tsx` hält fest, welche Farbe der Mensch in dieser Partie spielt.
  Während die Engine am Zug ist, werden Eingaben auf dem Brett gesperrt.
- Der PGN-Export schreibt die tatsächlichen Farben in den Kopf der Datei:
  Bei einer Schwarz-Partie ist `Einfach-Schach` Weiß und der eigene Name
  Schwarz.

## Geprüfter Stand

- `npm run type-check` ohne TypeScript-Fehler
- `npm run build` erfolgreich
- Engine-Auswahl mit fünf legalen weißen Eröffnungszügen und jeweils legaler
  schwarzer Antwort geprüft
- Standardpartie Weiß gegen Engine und der neue Ablauf „Engine Weiß / Person
  Schwarz“ im Browser getestet

Hinweise über alte indirekte npm-Abhängigkeiten oder Chessground-ESM beim Build
sind bekannte Warnungen; sie waren keine Build-Fehler.

## Bekannte Grenzen des Release Candidate

1. **Spielerfarbe ist noch nur für die laufende Browserseite gespeichert.**
   Eine Partie als Schwarz nicht neu laden oder schließen. Beim Neuladen kennt
   die App die Brettstellung, aber noch nicht zuverlässig die gewählte Farbe.
2. **Die PGN-Datei enthält die Züge seit dem Öffnen der Partie.** Nach einem
   Neuladen kann die alte Zugfolge nicht rekonstruiert werden; vorher speichern.
3. Patt, sonstige Remisfälle, alle Umwandlungsfälle mit beiden Farben sowie
   Audio/Blindmodus in der neuen Schwarz-Perspektive sind noch kein vollständiger
   Regressionstest.
4. Die Engine bleibt bewusst einfach (Suchtiefe 2) und ist keine Stockfish-
   Engine.

## Installation und Start

### Git-Branch unter Windows aktualisieren

```powershell
# laufenden Entwicklungsserver mit Strg+C beenden
cd ..
git pull --ff-only origin feature/pgn-export
cd app
npm.cmd run dev
```

Dann im Browser `http://localhost:3000` öffnen.

### Eigenständiges ZIP-Paket

Die Release-ZIP enthält eine Startdatei für Windows und Linux sowie eine
festgeschriebene Abhängigkeitsliste. Nach dem Entpacken genügt unter Windows ein
Doppelklick auf `START_EINFACH_SCHACH_WINDOWS.bat`. Beim ersten Start lädt npm
die technischen Bausteine; persönliche Benutzerdaten bleiben im jeweiligen
Versionsordner getrennt.

## Abgrenzung

- **Stabil:** `main`, Release `v0.1.0`
- **Vorab/Teststand:** `feature/pgn-export`, Release Candidate `v0.1.1-rc.1`
- Ein späteres stabiles `v0.1.1` wird erst nach zusätzlicher Abnahme aus diesem
  Stand abgeleitet.
