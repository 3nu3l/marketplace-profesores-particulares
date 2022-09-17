//import '../styles/globals.css'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

function MyApp({ Component, pageProps }) {
  return <ThemeProvider theme={darkTheme}>
    <CssBaseline />
    <Component {...pageProps} />
  </ThemeProvider>
}

export default MyApp
