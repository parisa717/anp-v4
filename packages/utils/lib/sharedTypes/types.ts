import { GraphQLError } from 'graphql/error'

export type SerializableGraphQLError<TData = unknown> = {
  message: string
  response: {
    errors: GraphQLError[]
    data: Partial<TData> | null
    status: number
    headers: Record<string, string>
  }
  request: {
    query: string
    variables: Record<string, unknown>
  }
}

export type TransformedGraphQLError<TData = unknown> = {
  message: string
  originalErrorResponse: SerializableGraphQLError<TData>
  graphqlErrors: GraphQLError[]
}
