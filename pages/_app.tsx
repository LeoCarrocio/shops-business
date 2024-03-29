import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { SessionProvider } from "next-auth/react"
import { CssBaseline, ThemeProvider } from '@mui/material';
import { lightTheme } from '../themes';
import { SWRConfig } from 'swr'
import { AuthProvider, CartProvider, UiProvider } from '../context';
import { PayPalScriptProvider } from "@paypal/react-paypal-js";




function MyApp({ Component, pageProps }: AppProps) {
  return (

    <SessionProvider>
    <PayPalScriptProvider options={{ clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || '' }}>

    <SWRConfig 
      value={{
        //refreshInterval: 3000, hace pedidos cada 3000, solo refrescala data si hay un dato cambiado 
        fetcher: (resource, init) => fetch(resource, init).then(res => res.json())
      }}
      >
      <AuthProvider>
        <CartProvider>
          <UiProvider>
            <ThemeProvider theme={ lightTheme }> 
              <CssBaseline /> 
              <Component {...pageProps} />
            </ThemeProvider>
          </UiProvider>
        </CartProvider>
      </AuthProvider>
    </SWRConfig>
    </PayPalScriptProvider>
    </SessionProvider>
  )
}

export default MyApp




