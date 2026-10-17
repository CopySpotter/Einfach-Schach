# Einfach-Schach v0.1.0.1 starten

Dies ist ein stabiler Korrektur-Release auf Basis von `v0.1.0`. Die Schachfunktionen bleiben gleich. Korrigiert wurden ausschließlich externe Browser-Anfragen und der Datenschutzhinweis.

## Windows

1. ZIP entpacken.
2. Doppelklick auf `START_EINFACH_SCHACH_WINDOWS.bat`.
3. Beim ersten Start werden die benötigten Bausteine einmal installiert.
4. Danach im Browser `http://localhost:3000` öffnen.

Falls Windows fragt, mit welchem Programm die Datei geöffnet werden soll: **Eingabeaufforderung** wählen. `npm.cmd` wird absichtlich verwendet, damit die PowerShell-Sperre für `npm.ps1` kein Hindernis ist.

## Linux

Im entpackten Ordner ausführen:

```bash
chmod +x START_EINFACH_SCHACH.sh
./START_EINFACH_SCHACH.sh
```

Danach `http://localhost:3000` öffnen.

## Was lokal bleibt

Profile und gespeicherte Brettstände liegen in `app/src/data/users.json` auf dem eigenen Computer. Die Datei wird beim ersten Start aus einer leeren Vorlage angelegt. Sie gehört nicht in Git und nicht in einen öffentlichen Upload.

## Kontrolle

Der Release enthält `RELEASE_NOTES_v0.1.0.1.md` und `docs/RELEASE-v0.1.0.1.md`. Sie beschreiben die Änderungen und die geprüfte Installation.
