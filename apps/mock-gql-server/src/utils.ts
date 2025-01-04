import { loadFilesSync } from '@graphql-tools/load-files'
import { mergeTypeDefs } from '@graphql-tools/merge'
import { makeExecutableSchema } from '@graphql-tools/schema'
import { Request } from 'express'
import path from 'path'

import { GRAPHQL_SCHEMAS_PATH, MOCKED_OPERATIONS } from './consts'

const extractGraphQLOperationName = (queryString: string) => {
  // Match both 'query OperationName' and 'mutation OperationName' patterns
  const match = queryString.match(/(query|mutation)\s+([a-zA-Z][a-zA-Z0-9_]*)/)

  return match ? match[2] : null
}

/**
 * Filter function to determine if a request should be proxied or not.
 *
 * @param req The request object.
 * @returns `true` if the request should be proxied, `false` otherwise.
 */
export const proxyFilter = function (req: Request<unknown, unknown, { query: string }>): boolean {
  if (
    req?.body?.query &&
    MOCKED_OPERATIONS.some((operation) => extractGraphQLOperationName(req.body.query) === operation)
  ) {
    return false
  }

  return true
}

/**
 * Get the mocked GraphQL schema.
 *
 * @returns The mocked GraphQL schema.
 */
export const getMockedGraphqlSchema = () => {
  const typesArray = loadFilesSync(path.join(GRAPHQL_SCHEMAS_PATH, './mocked/**/*.graphql'))
  const typeDefs = mergeTypeDefs(typesArray)

  return makeExecutableSchema({ typeDefs })
}
