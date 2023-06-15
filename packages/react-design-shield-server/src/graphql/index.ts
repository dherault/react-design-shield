import { gql } from 'apollo-server-express'

import withLog from './withLog'
import hierarchyQuery from './queries/hierarchyQuery.js'

export const typeDefs = gql`

  type Query {
    hierarchy: Boolean!
  }

  # type Mutation {
  # }
`

export const resolvers = {
  Query: {
    hierarchy: withLog(hierarchyQuery, 'hierarchy'),
  },
  // Mutation: {
  // },
}
