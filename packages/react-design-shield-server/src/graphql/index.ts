import { gql } from 'apollo-server-express'

import withLog from './withLog'
import hierarchyQuery from './queries/hierarchyQuery'

export const typeDefs = gql`

  type Query {
    hierarchy(input: String!): String!
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
