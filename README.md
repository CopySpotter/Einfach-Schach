# Einfach-Schach

Einfach-Schach ist eine Schachanwendung mit Fokus auf einfache Bedienung und gute Zugänglichkeit. Die Anwendung basiert auf Next.js 12, React 17, chess.js und Chessground.

## Voraussetzungen

Empfohlen und getestet ist **Node.js 18**. Zusätzlich wird **Git** benötigt.

Das eigentliche Frontend liegt im Ordner `app`.

## Windows

Getestet unter Windows 10/11 mit PowerShell und Node.js 18.

```powershell
git clone https://github.com/CopySpotter/Einfach-Schach.git
cd Einfach-Schach\app
Copy-Item .\src\data\users.example.json .\src\data\users.json
npm.cmd install --legacy-peer-deps
npm.cmd run dev
```

Danach im Browser öffnen:

`http://localhost:3000`

Hinweis: Auf manchen Windows-Systemen blockiert PowerShell die Datei `npm.ps1` durch die lokale Ausführungsrichtlinie. Deshalb wird in den Beispielen bewusst `npm.cmd` verwendet. Eine Änderung der PowerShell-Sicherheitsrichtlinie ist dafür nicht notwendig.

### Produktionsmodus unter Windows

```powershell
npm.cmd run build
npm.cmd run start
```

## Linux

Getestet mit Node.js 18.

```bash
git clone https://github.com/CopySpotter/Einfach-Schach.git
cd Einfach-Schach/app
cp src/data/users.example.json src/data/users.json
npm install --legacy-peer-deps
npm run dev
```

Danach im Browser öffnen:

`http://localhost:3000`

### Produktionsmodus unter Linux

```bash
npm run build
npm run start
```

## Lokale Benutzerdaten

Die Datei `app/src/data/users.json` wird absichtlich nicht im Repository versioniert, weil die Anwendung dort lokale Benutzerdaten speichert.

`users.example.json` enthält eine leere Ausgangsdatei und wird beim ersten lokalen Start nach `users.json` kopiert.

## Technische Hinweise

Für die Kompatibilität mit Next.js 12.3.4 und React 17 sind die funktionierenden MUI-/Emotion-Versionen in `app/package.json` fest eingetragen.

Der aktuelle Stand wurde unter Windows mit Login, Gastmodus, Training, Spiel gegen die Engine, gespeicherten Partien, TypeScript-Check und Production Build getestet.

## Face Recognition

Die Gesichtserkennung ist optional und läuft als separater Docker-Dienst.

```bash
cd facerecognition
docker build -t facerec .
docker run -dp 127.0.0.1:5000:3000 facerec
```

## Entwicklung

```bash
npm run lint
npm run prettier
```

## Verwendete Komponenten

- Next.js
- React
- chess.js
- Chessground
- Material UI (MUI)
