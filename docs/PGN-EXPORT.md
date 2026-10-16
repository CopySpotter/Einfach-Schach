# PGN-Export

## Zweck

In einer freien Partie kann die laufende Zugfolge mit **„PGN speichern“** als
Datei heruntergeladen werden. PGN (*Portable Game Notation*) ist das
Standardformat für Schachpartien. Die Datei kann zum Beispiel in Lichess,
Chess.com oder ChessBase geöffnet werden.

## Inhalt der Datei

Die Datei enthält den Namen der Anwendung, das aktuelle Datum, die Spielenden
und die vollständige Zugfolge der aktuell geöffneten Partie. Eine noch nicht
beendete Partie erhält im PGN das Ergebnis `*`; eine Mattpartie wird als `1-0`
oder `0-1` gespeichert.

## Grenze der ersten Ausbaustufe

Die Anwendung speichert bisher zwischen zwei Seitenaufrufen nur die aktuelle
Brettstellung (FEN), nicht die vollständige Zugfolge. Der PGN-Export enthält
deshalb die Züge seit dem Öffnen der Partie. Vor dem Neuladen oder Schließen
der Seite soll die Datei heruntergeladen werden.
