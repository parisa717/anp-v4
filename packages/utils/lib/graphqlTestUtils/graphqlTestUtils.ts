/* eslint-disable @typescript-eslint/no-explicit-any */

export const hasOperationName = (req: any, operationName: string) => {
  const { body } = req
  return Object.prototype.hasOwnProperty.call(body, 'operationName') && body.operationName === operationName
}

export const hasVariablesDefined = (req: any, variablesCallback: (variables: any) => boolean) => {
  const { body } = req
  return Object.prototype.hasOwnProperty.call(body, 'variables') && variablesCallback(body.variables)
}

export const aliasQuery = (req: any, operationName: string) => {
  if (hasOperationName(req, operationName)) {
    req.alias = `gql${operationName}Query`
  }
}

export const aliasMutation = (req: any, operationName: string) => {
  if (hasOperationName(req, operationName)) {
    req.alias = `gql${operationName}Mutation`
  }
}

export const successResponse = (req: any, responseData: any) => {
  req.reply({
    statusCode: 200,
    body: {
      data: responseData,
    },
  })
}

export const errorResponse = (req: any, errorResponseData: any) => {
  req.reply({
    statusCode: 200,
    body: {
      errors: [errorResponseData],
      data: null,
    },
  })
}
