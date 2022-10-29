import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { CssBaseline, ThemeProvider } from '@mui/material';
import { lightTheme } from '../themes';
import { SWRConfig } from 'swr'
import { UiProvider } from '../context';



function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SWRConfig 
      value={{
      //refreshInterval: 3000, hace pedidos cada 3000, solo refrescala data si hay un dato cambiado 
      fetcher: (resource, init) => fetch(resource, init).then(res => res.json())
    }}
  >
    <UiProvider>
      <ThemeProvider theme={ lightTheme }> 
        <CssBaseline /> 
        <Component {...pageProps} />
        </ThemeProvider>
      </UiProvider>
    </SWRConfig>
  )
}

export default MyApp




