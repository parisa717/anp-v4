import { aliasMutation, aliasQuery, errorResponse, hasOperationName, successResponse } from './graphqlTestUtils'

interface GraphQLRequest {
  body: {
    operationName?: string
  }
  alias: string
  reply: ReturnType<typeof cy.stub>
}

describe('graphqlTestUtils', () => {
  let req: GraphQLRequest

  beforeEach(() => {
    req = {
      body: {},
      alias: '',
      reply: cy.stub(),
    }
  })

  describe('hasOperationName', () => {
    it('should return true if operation name matches', () => {
      req.body.operationName = 'TestQuery'
      expect(hasOperationName(req, 'TestQuery')).to.be.true
    })

    it('should return false if operation name does not match', () => {
      req.body.operationName = 'TestQuery'
      expect(hasOperationName(req, 'AnotherQuery')).to.be.false
    })

    it('should return false if operation name is not present', () => {
      expect(hasOperationName(req, 'TestQuery')).to.be.false
    })
  })

  describe('aliasQuery', () => {
    it('should set alias for query if operation name matches', () => {
      req.body.operationName = 'TestQuery'
      aliasQuery(req, 'TestQuery')
      expect(req.alias).to.equal('gqlTestQueryQuery')
    })

    it('should not set alias for query if operation name does not match', () => {
      req.body.operationName = 'TestQuery'
      aliasQuery(req, 'AnotherQuery')
      expect(req.alias).to.equal('')
    })
  })

  describe('aliasMutation', () => {
    it('should set alias for mutation if operation name matches', () => {
      req.body.operationName = 'TestMutation'
      aliasMutation(req, 'TestMutation')
      expect(req.alias).to.equal('gqlTestMutationMutation')
    })

    it('should not set alias for mutation if operation name does not match', () => {
      req.body.operationName = 'TestMutation'
      aliasMutation(req, 'AnotherMutation')
      expect(req.alias).to.equal('')
    })
  })

  describe('successResponse', () => {
    it('should set success response with given data', () => {
      const responseData = { data: 'test' }
      successResponse(req, responseData)
      expect(req.reply).to.have.been.calledWith({
        statusCode: 200,
        body: {
          data: responseData,
        },
      })
    })
  })

  describe('errorResponse', () => {
    it('should set error response with given error data', () => {
      const errorResponseData = { message: 'error' }
      errorResponse(req, errorResponseData)
      expect(req.reply).to.have.been.calledWith({
        statusCode: 200,
        body: {
          errors: [errorResponseData],
          data: null,
        },
      })
    })
  })
})
