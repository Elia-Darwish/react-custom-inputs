import type { AppProps } from 'next/app'

import 'styles/globals.css'
import '@fontsource/lato/400.css'

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

export default MyApp
