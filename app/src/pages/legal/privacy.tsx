import { Box, Container, CssBaseline, Typography } from '@mui/material';

const sectionStyle = { marginTop: '1.5rem' };

export default function PrivacyPage() {
  return (
    <Container component="main" maxWidth="md">
      <CssBaseline />
      <Box
        sx={{
          marginTop: { xs: '6rem', sm: '10rem' },
          marginBottom: '4rem',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'stretch'
        }}
      >
        <Typography component="h1" variant="h3" gutterBottom>
          Datenschutzhinweis
        </Typography>
        <Typography color="text.secondary">
          Stand: 18. Oktober 2026 · Lokale Download- und Entwicklungsfassung
        </Typography>

        <section style={sectionStyle}>
          <Typography component="h2" variant="h5" gutterBottom>
            Wofür dieser Hinweis gilt
          </Typography>
          <Typography paragraph>
            Dieser Hinweis beschreibt die derzeitige, lokal gestartete Fassung
            von Einfach-Schach. Sie läuft auf dem eigenen Computer, zum
            Beispiel unter <code>http://localhost:3000</code>. Diese Fassung
            ist kein zentral betriebener Online-Dienst des Forks.
          </Typography>
          <Typography paragraph>
            Für eine spätere öffentliche Website muss dieser Hinweis vor dem
            Start ergänzt werden: insbesondere um die verantwortliche Person,
            die Hosting-Firma, die Server-Protokolle und alle tatsächlich
            eingesetzten Dienste.
          </Typography>
        </section>

        <section style={sectionStyle}>
          <Typography component="h2" variant="h5" gutterBottom>
            Welche Daten die Anwendung lokal speichert
          </Typography>
          <Typography paragraph>
            Wenn ein Spielprofil angelegt oder verändert wird, speichert die
            Anwendung die Profildaten in der Datei{' '}
            <code>app/src/data/users.json</code> der jeweiligen lokalen
            Installation. Dazu gehören eine interne Nummer, eingegebener Name
            und Anzeigename, gewählte Spielstufe, Einstellungen, Lernfortschritt,
            der gespeicherte Brettstand sowie Erstell- und Änderungszeitpunkt.
          </Typography>
          <Typography paragraph>
            Für die normale Anmeldung gibt es derzeit kein Passwort und keine
            E-Mail-Adresse. Gastspiele werden nicht als persönliches Profil
            in dieser Datei angelegt. Die Schachzüge und die Spielentscheidung
            der Engine werden im Browser berechnet.
          </Typography>
          <Typography paragraph>
            Die Daten bleiben auf dem Computer beziehungsweise auf dem lokalen
            Server, auf dem Einfach-Schach gestartet wurde. Wer Zugriff auf
            diesen Computer und diese Datei hat, kann die dort gespeicherten
            Profildaten lesen. Einen eigenen Löschknopf für Profile gibt es in
            dieser Fassung noch nicht. Das Entfernen oder Korrigieren lokaler
            Profildaten muss daher an der lokalen Datendatei erfolgen.
          </Typography>
        </section>

        <section style={sectionStyle}>
          <Typography component="h2" variant="h5" gutterBottom>
            Keine externen Browser-Verbindungen im normalen Spielbetrieb
          </Typography>
          <Typography paragraph>
            Die aktuelle Programmfassung lädt keine Google-Webfonts und kein
            externes Analyse-Skript mehr. Beim normalen Spielen unter{' '}
            <code>localhost</code> werden daher keine Profil-, Schach- oder
            Spielstanddaten an externe Anbieter gesendet.
          </Typography>
          <Typography paragraph>
            Die Anwendung setzt kein Analysewerkzeug und kein
            Cookie-Einwilligungsfenster ein. Falls später externe Dienste eingebunden
            werden, muss dieser Hinweis vorher entsprechend ergänzt werden.
          </Typography>
        </section>

        <section style={sectionStyle}>
          <Typography component="h2" variant="h5" gutterBottom>
            Entwicklungswerkzeug
          </Typography>
          <Typography paragraph>
            Einfach-Schach wird derzeit mit Next.js gestartet. Next.js ist in
            dieser Fassung so konfiguriert, dass seine anonyme Telemetrie
            deaktiviert ist. Damit werden auch beim lokalen Start oder beim
            Build keine Next.js-Telemetriedaten gesendet.
          </Typography>
        </section>

        <section style={sectionStyle}>
          <Typography component="h2" variant="h5" gutterBottom>
            Kamera und Gesichtserkennung
          </Typography>
          <Typography paragraph>
            Die in der normalen Oberfläche angebotenen Anmeldearten sind Name
            und QR-Code. Eine Gesichtserkennung wird dort nicht angeboten und
            die Kamera wird dadurch nicht verwendet.
          </Typography>
          <Typography paragraph>
            Im Quellcode gibt es noch eine nicht eingebundene Alt-Komponente
            für Gesichtserkennung. Sie darf nicht als aktive Funktion
            betrachtet werden. Bevor sie jemals wieder angeboten wird, müssen
            Technik, Datenfluss, Einwilligung und dieser Hinweis gesondert
            geprüft und aktualisiert werden.
          </Typography>
        </section>

        <section style={sectionStyle}>
          <Typography component="h2" variant="h5" gutterBottom>
            Keine weiteren behaupteten Verarbeitungen
          </Typography>
          <Typography paragraph>
            Diese Fassung bietet keine Bezahlung, keinen Vertragsschluss,
            keinen Newsletter, kein Kontaktformular und keine E-Mail-Benachrichtigungen.
            Sie behauptet auch keine besondere Verschlüsselung, keine
            Aufbewahrungsfristen und keine Datenübermittlungen, die im Programm
            nicht tatsächlich umgesetzt sind.
          </Typography>
        </section>

        <section style={sectionStyle}>
          <Typography component="h2" variant="h5" gutterBottom>
            Hinweis für die Nutzung
          </Typography>
          <Typography paragraph>
            Dies ist eine technische Beschreibung des gegenwärtigen
            Programmstands und keine Rechtsberatung. Wer Einfach-Schach
            öffentlich betreibt oder personenbezogene Daten anderer Personen
            verwaltet, muss vor der Veröffentlichung eine zur konkreten
            Betriebsform passende Datenschutzerklärung und ein Impressum
            bereitstellen.
          </Typography>
        </section>
      </Box>
    </Container>
  );
}
