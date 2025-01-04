import { SerializableGraphQLError, TransformedGraphQLError } from '@nexus-ui/utils'
import { GraphQLError } from 'graphql/error'
import type { ClientError } from 'graphql-request'

/**
 * Why we need this file?
 *
 * Because, for some reason, graphql-request has error handling behavior
 * where it stringifies the entire response object into the error message (!).
 *
 * And @rtk-query/graphql-request-base-query is using graphql-request under the hood.
 *
 * That is why we have to convert the error message into an acceptable form
 * and pass it to RTK Query using "customErrors" field
 *
 * More info at:
 *  - https://github.com/reduxjs/redux-toolkit/issues/2231
 *  - https://stackoverflow.com/questions/71828943/how-to-handle-error-format-in-redux-toolkit-rtk-query-graphql-application
 *  -
 */

type ClientErrorResponse<TData = unknown> = {
  errors?: readonly GraphQLError[]
  data: Partial<TData> | null
  status: number
  headers: {
    map?: Record<string, string | string[]>
  }
}

type ClientErrorRequest = {
  query?: string
  variables?: Record<string, unknown>
}

const isValidResponse = <TData>(response: unknown): response is ClientErrorResponse<TData> => {
  return (
    typeof response === 'object' &&
    response !== null &&
    'status' in response &&
    'headers' in response &&
    typeof response.headers === 'object' &&
    response.headers !== null
  )
}

const isValidRequest = (request: unknown): request is ClientErrorRequest => {
  return typeof request === 'object' && request !== null && ('query' in request || 'variables' in request)
}

const serializeHeaders = (headers: { map?: Record<string, string | string[]> }) => {
  const headerMap = headers.map || {}
  const serializedHeaders: Record<string, string> = {}

  Object.entries(headerMap).forEach(([key, value]) => {
    serializedHeaders[key] = Array.isArray(value) ? value.join(', ') : value
  })

  return serializedHeaders
}

/**
 * Extracts GraphQL error from a ClientError object.
 *
 * The function handles two scenarios:
 * 1. Direct extraction from ClientError.response.errors
 * 2. Parsing from stringified error message (fallback)
 *
 * Because, for some reason, graphql-request has error handling behavior
 * where it stringifies the entire response object into the error message (!).
 * And @rtk-query/graphql-request-base-query is using graphql-request under the hood.
 *
 * Error structure in first scenario:
 * ```
 * {
 *   response: {
 *     errors: [{ message: "Error message", extensions: { code: 123 } }]
 *   }
 * }
 * ```
 *
 * Error structure in second scenario:
 * ```
 * {
 *   message: 'Error: {"response":{"errors":[{"message":"Error message"}]}}'
 * }
 * ```
 */

const extractGraphQLErrors = (error: ClientError): GraphQLError[] => {
  /** Extracting the error in the first scenario (for scenarios read above) */
  if (isValidResponse(error.response) && error.response.errors?.length) {
    return [...error.response.errors]
  }

  /**
   * Extracting the error in the second scenario (for scenarios read above)
   * We try to parse stringified by @rtk-query/graphql-request-base-query error from message
   */
  const match = error.message.match(/^[^:]+: (.+)/)
  if (!match) {
    throw new Error('extractGraphQLError(): Failed to match error message pattern', {
      cause: {
        response: error.message,
        message: 'Invalid parsing',
      },
    })
  }

  /**
   * match[0] will be something like "Error"
   * match[1] will be something like "{"response":{"errors":[{"message":"Error message."}]}}"
   */

  const parsedError = JSON.parse(match[1])
  const extractedErrors = parsedError.response?.errors

  if (!Array.isArray(extractedErrors) || !extractedErrors.length) {
    throw new Error('baseQuery().extractGraphQLError(): No GraphQL errors found in parsed response', {
      cause: {
        response: error.response,
        message: 'Invalid response structure',
      },
    })
  }

  return extractedErrors
}

const serializeError = <TData>(error: ClientError): SerializableGraphQLError<TData> => {
  if (!isValidResponse(error.response)) {
    throw new Error('baseQuery().serializeError(): Invalid response structure in ClientError', {
      cause: {
        response: error.response,
        message: 'Invalid response structure',
      },
    })
  }

  if (!isValidRequest(error.request)) {
    throw new Error('baseQuery().serializeError(): Invalid request structure in ClientError', {
      cause: {
        request: error.request,
        message: 'Invalid request structure',
      },
    })
  }

  return {
    message: error.message,
    response: {
      errors: Array.from(error.response.errors || []),
      data: error.response.data,
      status: error.response.status,
      headers: serializeHeaders(error.response.headers),
    },
    request: {
      query: error.request.query || '',
      variables: error.request.variables || {},
    },
  }
}

export const customizeError = (args: ClientError): TransformedGraphQLError => {
  let graphqlErrors: GraphQLError[] = []

  try {
    graphqlErrors = extractGraphQLErrors(args)
  } catch (error) {
    throw new Error('baseQuery() customError: Failed to extract GraphQL errors', {
      cause: {
        originalError: error,
        clientError: args,
        message: 'Error occurred while extracting GraphQL errors',
      },
    })
  }

  let serializedError: SerializableGraphQLError

  try {
    serializedError = serializeError(args)
  } catch (error) {
    throw new Error('baseQuery() customError: Failed to serialize error', {
      cause: {
        originalError: error,
        clientError: args,
        graphqlErrors,
        message: 'Error occurred while serializing the error',
      },
    })
  }

  return {
    message: graphqlErrors[0]?.message || args.message,
    originalErrorResponse: serializedError,
    graphqlErrors,
  }
}
