# Einfach-Schach – Projektstand und Roadmap

## Aktueller stabiler Stand

Der Stand auf `main` läuft unter Linux mit Next.js 12.3.4 und React 17. Die zuvor ungebundenen MUI-/Emotion-Abhängigkeiten sind auf eine funktionierende Kombination festgelegt. Für die lokale Benutzerdatenbank gibt es `app/src/data/users.example.json`. Der Absturz der alten KI-Bewertung bei unvollständigen Zugdaten ist defensiv abgefangen.

Der Arbeitsstand auf `develop` enthält zusätzlich CI, die funktionale Bestandsaufnahme sowie den lokal getesteten Legacy-Cleanup aus PR #2. TypeScript-Check und Produktions-Build laufen dort erfolgreich in GitHub Actions.

## Aktuelle Vorabversion: `v0.1.1-rc.3`

Der separate öffentliche Branch `feature/pgn-export` ist der getestete
Release-Candidate für die nächste kleine Ausbaustufe. Er ergänzt die freie
Partie um PGN-Export, Brettdrehung und die Möglichkeit, Schwarz zu spielen:
„Zieh“ lässt die Engine mit Weiß beginnen, danach spielt die Person Schwarz.
Zusätzlich verwendet das Brett jetzt ein ruhiges Turnierdesign aus
elfenbeinfarbenen und nussbraunen Feldern; die vorhandenen Cburnett-Figuren
sind klassische Staunton-Figuren und bleiben erhalten. Der Stand ist bewusst
noch nicht in `main` übernommen. Die vollständige Freigabe- und
Grenzdokumentation steht in
[`docs/RELEASE-v0.1.1-rc.3.md`](docs/RELEASE-v0.1.1-rc.3.md).
Zusätzlich entfernt `v0.1.1-rc.3` den fremden Analyse-Dienst und Google-Webfonts; die lokale Next.js-Telemetrie ist deaktiviert. Der Datenschutz-Hinweis beschreibt jetzt den tatsächlichen lokalen Datenfluss.

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
- [ ] Spielerfarbe und vollständige Zugfolge speichern, damit eine als Schwarz
  gestartete Partie nach F5/Browserneustart korrekt fortgesetzt werden kann
- [ ] Trainingskapitel und Fortschritt testen
- [ ] Einstellungen nach Neustart prüfen
- [ ] Blindenmodus und Audios getrennt testen

## Arbeitspaket 2 – Offensichtliche Altlasten

- [ ] veraltete oder ungenutzte Imports und Debug-Ausgaben entfernen
- [x] Login-Zurück-Navigation korrigieren
- [x] `wantsToClick` vor unbeabsichtigtem Überschreiben durch das nicht mehr vorhandene Formularfeld schützen
- [ ] Gastmodus und normale Benutzer auf einheitliche Initialwerte bringen
- [x] harte Annahmen wie `Kapitel abgeschlossen: x/15` durch Werte aus den Trainingsdaten ersetzen
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

## Geplante Ausbaustufe – Dezente und zugängliche Schachklänge

Erst nach dem vollständigen Funktionstest wird die bisherige Tonkulisse
überarbeitet. Die vorhandenen Dateien sind für häufige Schachzüge zu lang und
haben im Projekt keine dokumentierte Herkunft oder Lizenz.

- [ ] vorhandene Zug-, Signal- und Figurenklänge vollständig ersetzen oder
  bewusst entfernen; keine fremden Lichess- oder Chess.com-Sounds übernehmen
- [ ] nur lokal mitgelieferte, klar dokumentierte und verwendbare Quellen
  einsetzen; bevorzugt CC0, mit `CREDITS`-Datei für jede Datei
- [ ] ein kurzes dezentes Set für Zug, Schlagzug, Schach, Matt, Gewinn und
  Niederlage zusammenstellen; ein normaler Zug soll nur einen sehr kurzen
  Rückmeldeton auslösen
- [ ] Figurenansagen als eigene, freiwillige Zugänglichkeitsfunktion erhalten,
  aber von Brettgeräuschen trennen
- [ ] Einstellungen anbieten: `Aus`, `Dezent` und `Figurenansagen`; jede
  Auswahl soll direkt mit einer Hörprobe getestet werden können
- [ ] Lautstärke und Verständlichkeit mit Kopfhörern, Laptop-Lautsprechern und
  im Blindenmodus praktisch prüfen

## Arbeitspaket 4 – Adaptive Lernunterstützung: „Gefahrencheck“

Geplant für die Weiterentwicklung nach `v0.1.1-rc.3`: Der einfache
Computergegner bleibt bewusst erhalten. Zusätzlich soll es eine **optionale,
lokal arbeitende Analysehilfe** geben. Sie unterstützt beim Lernen, ersetzt
aber weder die eigene Entscheidung noch den einfachen Gegner.

- [ ] nach Auswahl eines eigenen geplanten Zuges prüfen: „Was wäre die
  stärkste Antwort des Gegners auf diesen Zug?“
- [ ] die mögliche Gefahr in einfacher Sprache erklären, zuerst ohne den
  Lösungszug vorwegzunehmen, z. B. „Danach kann der Gegner deine Dame
  schlagen“ oder „Achtung: möglicher Springerangriff auf König und Dame“
- [ ] abgestufte Hilfen anbieten: Denkfrage → Markierung am Brett → konkrete
  gegnerische Antwort und mögliche Abwehr
- [ ] die Nutzung vollständig freiwillig machen; keine dauernden Bewertungen,
  kein Elo und keine automatische Zugausführung
- [ ] Analyse lokal und offline in einem Web Worker ausführen, damit die
  Bedienung flüssig bleibt und keine Stellung nach außen übertragen wird
- [ ] vor einer Einbindung einer echten Engine die Lizenz und die Anforderungen
  für den Quellcode-/Lizenzhinweis verbindlich klären und dokumentieren

Pädagogisches Ziel: Die Person entscheidet und versucht zuerst selbst. Die
Hilfe wird nur auf Wunsch und stufenweise eingeblendet. Das entspricht
Scaffolding, Selbstbestimmung und dem Prinzip, zu fordern, ohne zu überfordern.

## Arbeitspaket 5 – Technische Modernisierung

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
