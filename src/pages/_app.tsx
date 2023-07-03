import type { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'
import { cacheExchange, Client, fetchExchange, Provider } from 'urql'
import NextAdapterPages from 'next-query-params/pages'
import { QueryParamProvider } from 'use-query-params'

const client = new Client({
  url: 'https://graphql-pokemon2.vercel.app/',
  exchanges: [cacheExchange, fetchExchange],
})

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <Provider value={client}>
        <QueryParamProvider adapter={NextAdapterPages}>
          <Component {...pageProps} />
        </QueryParamProvider>
      </Provider>
    </ChakraProvider>
  )
}
