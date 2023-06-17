import path from 'node:path'

import { ApolloServer } from 'apollo-server-express'
import express from 'express'
import cors from 'cors'
import chalk from 'chalk'
import esMain from 'es-main'

import { setApplicationPath } from '~domain/applicationPath'

import { resolvers, typeDefs } from './graphql'

async function serve(applicationRelativePath = '.') {
  const applicationPath = path.join(process.cwd(), applicationRelativePath)

  setApplicationPath(applicationPath)

  console.log('appPath', applicationPath)
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

// TODO in the future, detect project type to find out the relative path
const TEMP_APP_RELATIVE_PATH = '../react-design-shield-client'

if (esMain(import.meta)) {
  serve(TEMP_APP_RELATIVE_PATH)
}
