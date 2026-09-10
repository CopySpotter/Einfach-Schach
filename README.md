# einfach-schach

A chess app with focus on good UX for old people written in NextJS by students of the University of Applied Sciences Magdeburg.

## Linux baseline

This branch documents the currently working local Linux setup without changing the application logic.

Install and start:

```bash
git clone https://github.com/CopySpotter/Einfach-Schach.git
cd Einfach-Schach/app
cp src/data/users.example.json src/data/users.json
npm install --legacy-peer-deps
npm run dev
```

Then open `http://localhost:3000`.

The local `src/data/users.json` is intentionally not versioned because the application writes user data to it at runtime. `users.example.json` provides a clean empty starting point.

For compatibility with Next.js 12.3.4 and React 17, the working MUI/Emotion versions are pinned in `app/package.json` instead of using `latest`.

## Production

```bash
npm run build
npm run start
```

## Face recognition

Face recognition is optional and runs as a separate Docker service.

```bash
cd facerecognition
docker build -t facerec .
docker run -dp 127.0.0.1:5000:3000 facerec
```

## Development helpers

```bash
npm run lint
npm run prettier
```

## Thanks to

- Next.js
- chess.js
- react-chessboard
- Material UI (MUI)
