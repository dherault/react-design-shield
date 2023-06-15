import { cacheExchange, createClient, fetchExchange } from 'urql'
import { persistedExchange } from '@urql/exchange-persisted'

// Create an urql client
export default createClient({
  url: 'http://localhost:4000/graphql',
  fetchOptions: {
    headers: {
      'Content-type': 'application/json',
      'Apollo-Require-Preflight': 'true',
    },
  },
  exchanges: [
    cacheExchange,
    fetchExchange,
    persistedExchange({
      preferGetForPersistedQueries: true,
    }),
  ],
})
