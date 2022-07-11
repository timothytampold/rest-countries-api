import { ThemeProvider } from 'next-themes'
import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Layout from '../common/components/Layout'

function MyApp({ Component, pageProps }: AppProps) {

  return (
    <ThemeProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  )
}

export default MyApp