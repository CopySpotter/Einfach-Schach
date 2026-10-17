# Einfach-Schach v0.1.1-rc.2 – Vorabversion

**Status:** Release Candidate auf dem öffentlichen Branch
`feature/pgn-export`. Dies ist keine Änderung an `main` und ersetzt nicht das
stabile Release **v0.1.0**.

## Zweck dieser Vorabversion

Diese Vorabversion enthält alle Funktionen aus `v0.1.1-rc.1` und ergänzt sie
um eine klassische, leicht lesbare Turnieroptik. Die Änderung betrifft nur die
Darstellung des Brettes und der bereits vorhandenen Staunton-Figuren. Die
Schachregeln und die Spielstärke der Engine ändern sich nicht.

## Funktionsumfang

| Funktion | Bedienung | Ergebnis |
|---|---|---|
| **PGN speichern** | Unter dem Brett oder nach Matt im Ergebnisfenster auf „PGN speichern“ klicken. | Download einer `.pgn`-Datei mit Datum, Namen, Ergebnismarkierung und Zugfolge. |
| **Brett drehen** | „↻ Brett drehen“ klicken. | Nur die Ansicht dreht sich; Spielregeln und Spielerfarbe bleiben unverändert. |
| **Als Schwarz spielen** | Vor dem ersten Zug „Zieh“ klicken. | Die Engine eröffnet mit Weiß, das Brett dreht sich zu Schwarz. Danach spielt die Person Schwarz und die Engine Weiß. |
| **Turnierbrett** | Automatisch beim Öffnen einer freien Partie oder Übung. | Helle Felder in Elfenbein, dunkle Felder in Nussbaum; klassische Staunton-Figuren. |

## Das neue Design in einfacher Sprache

- Helle Felder sind warm elfenbeinfarben statt rein weiß.
- Dunkle Felder sind nussbraun statt grün.
- Die Figuren sind weiterhin die klar gezeichneten Cburnett-Figuren. Das ist
  ein verbreiteter klassischer Staunton-Stil mit König, Dame, Turm, Läufer,
  Springer und Bauer in gut unterscheidbaren Formen.
- Weiße Figuren erhalten einen leichten warmen Ton, dunkle Figuren einen
  zurückhaltenden warmen Akzent. Ihre Formen und Kontraste bleiben erhalten.
- Gelb kennzeichnet den letzten Zug, Grün mögliche Züge oder eine Auswahl,
  Blau eine Vormerkung und Rot Schach. Diese Farben liegen als transparente
  Hinweise über dem jeweiligen Brettfeld.

Die Farben wurden absichtlich ruhig gewählt. Das Brett soll wie ein
Turnierbrett wirken und nicht wie ein buntes Lernspiel. Die Hinweise bleiben
trotzdem deutlich genug für die Bedienung.

## Technische Umsetzung

| Datei | Aufgabe |
|---|---|
| `app/public/chessground.tournament.css` | Neue Farben des Brettes und aller Rückmeldungen; dezente Anpassung der Figuren-Darstellung. |
| `app/src/pages/_app.tsx` | Lädt das Turnierdesign zentral für freie Partie und Training. |
| `chessground/assets/chessground.cburnett.css` | Unveränderte, eingebaute Staunton-Figuren von Chessground. |

Chessground selbst wurde **nicht** verändert oder geforkt. Es liefert weiter
das Brett, die Figurenpositionen, Klick-/Ziehbedienung und Markierungen.
`chess.js` prüft weiterhin die Regeln. Die eigene Minimax-/Alpha-Beta-Engine
in `app/src/utils/ai.tsx` wählt weiterhin die Computerzüge.

## Geprüfter Stand

- `npm run type-check` ohne TypeScript-Fehler
- `npm run build` erfolgreich
- kein Eingriff in Spielregeln, FEN-Speicherung, PGN-Erzeugung oder
  Engine-Suche
- bestehender Ablauf „Mensch Weiß / Engine Schwarz“ sowie „Engine Weiß /
  Mensch Schwarz“ bleibt durch die reine CSS-Änderung unverändert

Bekannte alte Abhängigkeitswarnungen beim Build sind keine Build-Fehler.

## Bekannte Grenzen

1. **Spielerfarbe ist noch nur für die laufende Browserseite gespeichert.**
   Eine Partie als Schwarz nicht neu laden oder schließen. Beim Neuladen kennt
   die App die Brettstellung, aber noch nicht zuverlässig die gewählte Farbe.
2. **Die PGN-Datei enthält die Züge seit dem Öffnen der Partie.** Nach einem
   Neuladen kann die alte Zugfolge nicht rekonstruiert werden; vorher speichern.
3. Patt, sonstige Remisfälle, alle Umwandlungsfälle mit beiden Farben sowie
   Audio/Blindmodus in der neuen Schwarz-Perspektive sind noch kein
   vollständiger Regressionstest.
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
- **Vorab/Teststand:** `feature/pgn-export`, Release Candidate `v0.1.1-rc.2`
- Ein späteres stabiles `v0.1.1` wird erst nach zusätzlicher Abnahme aus diesem
  Stand abgeleitet.
