import { expressMiddleware } from '@graphql-mocks/network-express'
import cors from 'cors'
import express from 'express'
import proxy from 'express-http-proxy'
import { embed, GraphQLHandler } from 'graphql-mocks'
import { field } from 'graphql-mocks/highlight'
import { logWrapper } from 'graphql-mocks/wrapper'

import { WORKSHOP_SCHEDULER_URL } from './consts'
import { resolverMap } from './resolvers'
import { getMockedGraphqlSchema, proxyFilter } from './utils'

const app = express()
app.use(cors())
app.use(express.json())

// Add a delay to all requests to simulate network latency
app.use(function (_, __, next) {
  setTimeout(next, 500)
})

const loggerMiddleware = embed({
  wrappers: [logWrapper],
  highlight: (h) => h.include(field(['Query', '*'], ['Mutation', '*'])),
})

const mockedGraphqlHandler = new GraphQLHandler({
  resolverMap,
  dependencies: { graphqlSchema: getMockedGraphqlSchema() },
  middlewares: [loggerMiddleware],
})

app.post('/graphql', [
  proxy(WORKSHOP_SCHEDULER_URL, {
    filter: proxyFilter,
    proxyReqOptDecorator: (proxyReqOpts) => {
      // @ts-expect-error The @types/express-http-proxy package is missing the `rejectUnauthorized` property
      proxyReqOpts.rejectUnauthorized = false

      return proxyReqOpts
    },
    userResDecorator: (proxyRes, proxyResData, req) => {
      console.log(
        // @ts-expect-error The `req` and `socket` properties are missing from the `proxyRes` object in the @types/express-http-proxy package
        `[${req.method}] ${req.path} ${req.body?.operationName} -> ${proxyRes.req.agent.protocol}//${proxyRes.socket.servername} [${proxyRes.statusCode}]`,
      )

      return proxyResData
    },
  }),
  expressMiddleware(mockedGraphqlHandler),
])

const port = 8080
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/graphql`)
})
