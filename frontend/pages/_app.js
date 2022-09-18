import '../styles/globals.css'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { SessionProvider } from 'next-auth/react';
import ResponsiveAppBar from '../src/components/navbar';
import Footer from '../src/components/footer';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

function MyApp({ Component, pageProps }) {
  return (
    <SessionProvider session={pageProps.session}>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <ResponsiveAppBar />
        <Component {...pageProps} />
        <Footer />
      </ThemeProvider>
    </SessionProvider>);
}

export default MyApp
