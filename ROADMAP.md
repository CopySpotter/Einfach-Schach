# Einfach-Schach – Projektstand und Roadmap

## Aktueller stabiler Stand

Der Stand auf `main` läuft unter Linux mit Next.js 12.3.4 und React 17. Die zuvor ungebundenen MUI-/Emotion-Abhängigkeiten sind auf eine funktionierende Kombination festgelegt. Für die lokale Benutzerdatenbank gibt es `app/src/data/users.example.json`. Der Absturz der alten KI-Bewertung bei unvollständigen Zugdaten ist defensiv abgefangen.

Der Arbeitsstand auf `develop` enthält zusätzlich CI, die funktionale Bestandsaufnahme sowie den lokal getesteten Legacy-Cleanup aus PR #2. TypeScript-Check und Produktions-Build laufen dort erfolgreich in GitHub Actions.

## Bereits vorhandene Funktionen

- Startseite mit Anmeldung, Registrierung und Gastmodus
- Benutzerprofile mit lokal gespeicherten Einstellungen und Fortschritt
- Hauptmenü mit Partie, Übungen, Einstellungen und Abmeldung
- Partie gegen eine lokale Minimax-/Alpha-Beta-KI
- legale Züge über `chess.js` und Darstellung über Chessground
- Fortsetzen der zuletzt gespeicherten Partie
- Aufgabe und Rücknahme
- Bauernumwandlung
- Zug-/Figur-/Schach-/Erfolgs-Audios
- optionaler Blindenmodus mit akustischer Bedienunterstützung
- Zughistorie
- Trainingsbereich mit Kapiteln, Übungen und Fortschrittsanzeige
- Trainingsdaten aus PGN-basiertem Datenbestand
- QR-Code für Benutzerkennung; Face-Recognition-Dienst als optionale Zusatzkomponente
- Einstellungen für Zuggeschwindigkeit, Brettgeräusche, Figurengeräusche und Blindenmodus

## Arbeitspaket 1 – Stabilität und Bestandsprüfung

- [x] `npm run build` auf dem aktuellen Linux-Stand vollständig prüfen
- [x] TypeScript-Typecheck prüfen
- [ ] Login, Registrierung und Gastmodus vollständig einzeln testen
- [ ] Partie: normaler Zug, Schlagzug, Rochade, Umwandlung, Matt, Aufgabe und Rücknahme testen
- [ ] gespeicherte Partie nach Neustart wiederherstellen
- [ ] Trainingskapitel und Fortschritt testen
- [ ] Einstellungen nach Neustart prüfen
- [ ] Blindenmodus und Audios getrennt testen

## Arbeitspaket 2 – Offensichtliche Altlasten

- [ ] veraltete oder ungenutzte Imports und Debug-Ausgaben entfernen
- [x] Login-Zurück-Navigation korrigieren
- [x] `wantsToClick` vor unbeabsichtigtem Überschreiben durch das nicht mehr vorhandene Formularfeld schützen
- [ ] Gastmodus und normale Benutzer auf einheitliche Initialwerte bringen
- [ ] harte Annahmen wie `Kapitel abgeschlossen: x/15` durch Werte aus den Trainingsdaten ersetzen
- [ ] KI-Sonderfälle wie Patt, Remis und fehlender bester Zug robust behandeln
- [x] Datenbankzugriffe gegen nicht gefundene Benutzer absichern
- [ ] direkte DOM-Zugriffe im Schachbrett schrittweise durch React-State/Refs ersetzen
- [ ] Face-Recognition-Dokumentation/Portbeispiel prüfen (`app.py` läuft standardmäßig auf 5000)

## Arbeitspaket 3 – Einfachheit und Barrierefreiheit

- [ ] Bedienablauf mit möglichst wenigen Entscheidungen pro Bildschirm prüfen
- [ ] Schriftgrößen, Kontraste und Touch-Ziele prüfen
- [ ] Tastaturbedienung systematisch testen
- [ ] Screenreader-Texte und Fokusführung prüfen
- [ ] akustische Bedienung verständlicher und konsistenter machen
- [ ] optional einen besonders reduzierten „Einfach-Modus“ vorsehen

## Arbeitspaket 4 – Technische Modernisierung

Erst nach stabiler Bestandsaufnahme.

- [ ] Next.js-/React-Migration planen, nicht blind aktualisieren
- [ ] MUI 4/5-Mischbetrieb beseitigen
- [ ] Datenhaltung von `users.json` abstrahieren
- [ ] Training-Datenmodell und PGN-Import dokumentieren
- [ ] optionale Face-Recognition klar vom Kernprojekt trennen
- [ ] automatisierte Smoke-/Regressionstests einführen

## Dokumentation

Die ausführliche Gesamtdokumentation liegt unter `docs/Einfach-Schach_Gesamtdokumentation.html`. Sie enthält Feature-Matrix, Benutzerabläufe, Datenflüsse, Code-Funktionen, Routen, Status und bekannte Altlasten.

## Leitlinie

`main` bleibt der getestete, lauffähige Stand. Neue funktionale Änderungen erfolgen auf `develop` bzw. kleinen Feature-/Fix-Branches und kommen erst nach einem lokalen Test nach `main`.
