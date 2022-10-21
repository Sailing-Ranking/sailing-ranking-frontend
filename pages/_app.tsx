import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { useEffect, useState } from 'react'

import { ReactQueryDevtools } from "react-query/devtools"
import {
  QueryClient,
  QueryClientProvider,
} from "react-query"

function MyApp({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(() => new QueryClient())

  useEffect(() => {
    require("tw-elements")
  }, [])


  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex flex-col h-screen p-4">
        <Component {...pageProps} />
      </div>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}

export default MyApp
