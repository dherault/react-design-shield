import { ApolloServer } from 'apollo-server-express'
import express from 'express'
import cors from 'cors'
import chalk from 'chalk'
import esMain from 'es-main'

import { resolvers, typeDefs } from './graphql'

async function serve() {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    csrfPrevention: true,
    cache: 'bounded',
  })

  await server.start()

  const graphqlApp = express()

  graphqlApp.use(cors())

  server.applyMiddleware({ app: graphqlApp })

  await new Promise<void>(resolve => {
    graphqlApp.listen({ port: 4000 }, resolve)
  })

  console.log(chalk.green('~~~'), '🚀 React Design Shield server ready at http://localhost:4000/')
}

export default serve

if (esMain(import.meta)) {
  serve()
}
