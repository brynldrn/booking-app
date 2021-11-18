import { ThemeProvider, createTheme } from '@mui/material'
import { GlobalProvider } from '../context/GlobalContext';
import CssBaseline from '@mui/material/CssBaseline';
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
  });

  return (
    <GlobalProvider>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <Component {...pageProps} />
      </ThemeProvider>
    </GlobalProvider>
  )
}

export default MyApp
