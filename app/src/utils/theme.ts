import { createTheme, colors } from '@mui/material';

// Create a theme instance.
const theme = createTheme({
  typography: {
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Arial, sans-serif'
  },
  palette: {
    primary: {
      main: '#287233'
    },
    secondary: {
      main: '#19857b'
    },
    error: {
      main: colors.red.A400
    }
  }
});

export default theme;
