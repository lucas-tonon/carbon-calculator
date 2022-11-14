import { createTheme } from '@mui/material/styles';
import { green, grey } from '@mui/material/colors';

export default createTheme({
  palette: {
    primary: {
      main: green[700],
      contrastText: grey[100],
    },
    secondary: {
      main: green[50],
      contrastText: green[700],
    },
    text: {
      primary: green[50],
      secondary: grey[100],
      disabled: grey[300],
    },
    background: {
      paper: '#263238',
    }
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: '#263238',
          height: '100%',
          margin: 0,
        }
      }
    }
  }
});
