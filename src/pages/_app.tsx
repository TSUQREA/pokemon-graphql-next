import type { AppProps } from 'next/app'
import { Box, ChakraProvider } from '@chakra-ui/react'
import { cacheExchange, Client, fetchExchange, Provider } from 'urql'
import NextAdapterPages from 'next-query-params/pages'
import { QueryParamProvider } from 'use-query-params'
import { Header } from '@/components/Header'

const client = new Client({
  url: 'https://graphql-pokemon2.vercel.app/',
  exchanges: [cacheExchange, fetchExchange],
})

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <Provider value={client}>
        <QueryParamProvider adapter={NextAdapterPages}>
          <Box p={10}>
            <Header />
            <Component {...pageProps} />
          </Box>
        </QueryParamProvider>
      </Provider>
    </ChakraProvider>
  )
}
