import '../styles/globals.css'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { SessionProvider } from 'next-auth/react';
import ResponsiveAppBar from '../src/components/navbar';
import Footer from '../src/components/footer';
import Header from '../src/components/header';
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
config.autoAddCss = false

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
        <Header />
        <ResponsiveAppBar />
        <Component {...pageProps} />
        <Footer />
      </ThemeProvider>
    </SessionProvider>);
}

export default MyApp
