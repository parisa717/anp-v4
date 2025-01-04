import { cacher } from './rtkQueryCacheUtils'

describe('providesList', () => {
  it("returns a cache tag array with a 'LIST' id and 'UNAUTHORIZED' item when no response is given and a 401 status error is received", () => {
    const response = undefined
    const error = {
      status: 401,
      detail: 'You are not authorized to perform this operation.',
      data: undefined,
    }
    const cacheList = cacher.providesList('Todo')(response, error)
    expect(cacheList).to.deep.equal([{ type: 'Todo', id: 'LIST' }, 'UNAUTHORIZED'])
  })

  it("returns a cache tag array with a 'LIST' id and 'UNKNOWN_ERROR' item when no response is given and an unknown error is received", () => {
    const response = undefined
    const error = undefined
    const cacheList = cacher.providesList('Todo')(response, error)
    expect(cacheList).to.deep.equal([{ type: 'Todo', id: 'LIST' }, 'UNKNOWN_ERROR'])
  })

  it('returns a cache tag array with a LIST item, and an item for each id', () => {
    const response = [
      { id: 1, message: 'foo' },
      { id: 2, message: 'bar' },
    ]
    const error = undefined
    const cacheList = cacher.providesList('Todo')(response, error)
    expect(cacheList).to.deep.equal([
      { type: 'Todo', id: 'LIST' },
      { type: 'Todo', id: 1 },
      { type: 'Todo', id: 2 },
    ])

    const cacheList2 = cacher.providesList('Reports')(response, error)
    expect(cacheList2).to.deep.equal([
      { type: 'Reports', id: 'LIST' },
      { type: 'Reports', id: 1 },
      { type: 'Reports', id: 2 },
    ])

    const combinedCacheLists = [...cacheList, ...cacheList2]
    expect(combinedCacheLists).to.deep.equal([
      { type: 'Todo', id: 'LIST' },
      { type: 'Todo', id: 1 },
      { type: 'Todo', id: 2 },
      { type: 'Reports', id: 'LIST' },
      { type: 'Reports', id: 1 },
      { type: 'Reports', id: 2 },
    ])
  })
})

describe('providesListWithCustomId', () => {
  it('returns a cache tag array with a LIST item and an item for each custom id', () => {
    const response = [
      { userId: '1', message: 'foo' },
      { userId: '2', message: 'bar' },
    ]
    const error = undefined
    const cacheList = cacher.providesListWithCustomId('Todo', 'userId')(response, error)
    expect(cacheList).to.deep.equal([
      { type: 'Todo', id: 'LIST' },
      { type: 'Todo', id: '1' },
      { type: 'Todo', id: '2' },
    ])
  })

  it('skips items with invalid id values', () => {
    const response = [
      { userId: '1', message: 'foo' },
      { userId: '', message: 'bar' },
      { userId: null, message: 'baz' },
      { userId: undefined, message: 'qux' },
    ]
    const error = undefined
    const cacheList = cacher.providesListWithCustomId('Todo', 'userId')(response, error)
    expect(cacheList).to.deep.equal([
      { type: 'Todo', id: 'LIST' },
      { type: 'Todo', id: '1' },
    ])
  })

  it("returns a cache tag array with a 'LIST' id and 'UNAUTHORIZED' item when no response is given and a 401 status error is received", () => {
    const response = undefined
    const error = {
      status: 401,
      detail: 'You are not authorized to perform this operation.',
      data: undefined,
    }
    const cacheList = cacher.providesListWithCustomId('Todo', 'userId')(response, error)
    expect(cacheList).to.deep.equal([{ type: 'Todo', id: 'LIST' }, 'UNAUTHORIZED'])
  })

  it("returns a cache tag array with a 'LIST' id and 'UNKNOWN_ERROR' item when no response is given and an unknown error is received", () => {
    const response = undefined
    const error = undefined
    const cacheList = cacher.providesListWithCustomId('Todo', 'userId')(response, error)
    expect(cacheList).to.deep.equal([{ type: 'Todo', id: 'LIST' }, 'UNKNOWN_ERROR'])
  })
})

describe('providesNestedList', () => {
  it('returns a cache tag array with a LIST item, and an item for each id', () => {
    type Todo = {
      id: number
      message: string
    }
    type PaginatedResponse<T> = {
      totalCount: number
      totalPage: number
      currentPage: number
      data: T[]
    }
    const response: PaginatedResponse<Todo> = {
      totalCount: 15,
      totalPage: 5,
      currentPage: 2,
      data: [
        {
          id: 4,
          message: 'fourth',
        },
        {
          id: 5,
          message: 'fifth',
        },
        {
          id: 6,
          message: 'sixth',
        },
      ],
    }
    const error = undefined
    const cacheList = cacher.providesNestedList('Todo')(response, error)
    expect(cacheList).to.deep.equal([
      { type: 'Todo', id: 'LIST' },
      { type: 'Todo', id: 4 },
      { type: 'Todo', id: 5 },
      { type: 'Todo', id: 6 },
    ])
  })
})

describe('invalidatesList', () => {
  it('returns a cache tag array with a LIST item', () => {
    const cacheList = cacher.invalidatesList('Todo')()
    expect(cacheList).to.deep.equal([{ type: 'Todo', id: 'LIST' }])
  })
})

describe('cacheByIdArg', () => {
  it('returns a cache tag array with a single entity id item', () => {
    const response = { id: 5, task: 'walk the fish' }
    const error = undefined
    const args = 5
    const cacheList = cacher.cacheByIdArg('Todo')(response, error, args)
    expect(cacheList).to.deep.equal([{ type: 'Todo', id: 5 }])
  })

  it('returns a cache tag array with the ID even if no response is given', () => {
    const response = undefined
    const error = undefined
    const args = 5
    const cacheList = cacher.cacheByIdArg('Todo')(response, error, args)
    expect(cacheList).to.deep.equal([{ type: 'Todo', id: 5 }])
  })
})

describe('cacheByIdArgProperty', () => {
  it('returns a cache tag array with a single entity id item', () => {
    const response = { id: 5, task: 'walk the fish' }
    const error = undefined
    const args = { id: 5, message: 'foo' }
    const cacheList = cacher.cacheByIdArgProperty('Todo')(response, error, args)
    expect(cacheList).to.deep.equal([{ type: 'Todo', id: 5 }])
  })

  it('returns a cache tag array with the ID even no response is given', () => {
    const response = undefined
    const error = undefined
    const args = { id: 5, message: 'foo' }
    const cacheList = cacher.cacheByIdArgProperty('Todo')(response, error, args)
    expect(cacheList).to.deep.equal([{ type: 'Todo', id: 5 }])
  })
})

describe('invalidatesUnauthorized', () => {
  it("returns a cache tag array with an 'UNAUTHORIZED' item", () => {
    const response = undefined
    const error = undefined
    const args = undefined
    const cacheList = cacher.invalidatesUnauthorized()(response, error, args)

    expect(cacheList).to.deep.equal(['UNAUTHORIZED'])
  })
})

describe('invalidatesUnknownErrors', () => {
  it("returns a cache tag list with an 'UNKNOWN_ERROR' item", () => {
    const response = undefined
    const error = undefined
    const args = undefined
    const cacheList = cacher.invalidatesUnknownErrors()(response, error, args)

    expect(cacheList).to.deep.equal(['UNKNOWN_ERROR'])
  })
})
