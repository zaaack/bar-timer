import type { AppProps /*, AppContext */ } from 'next/app'
import { QueryClientProvider } from 'react-query'
import { Hydrate } from 'react-query/hydration'
import { trpc } from '../utils/trpc'
import 'bulma/css/bulma.min.css'
import 'bulma-switch/dist/css/bulma-switch.min.css'
import '../comps/index.scss'
import Head from 'next/head'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>整点报时</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />

        <link
          href="https://cdn.bootcss.com/font-awesome/5.12.1/css/all.min.css"
          rel="stylesheet"
        />
      </Head>
      <div suppressHydrationWarning>
        <QueryClientProvider client={trpc.queryClient}>
          <Hydrate state={trpc.useDehydratedState(pageProps.dehydratedState)}>
            {typeof window === 'undefined' ? null : <Component {...pageProps} />}
          </Hydrate>
        </QueryClientProvider>
      </div>
    </>
  )
}
export default MyApp
