const { paginate, paginateWithCursor } = require('../dist')

describe('paginate', () => {
  test('get pagination with empty value', () => {
    expect(paginate()).toEqual({
      page: 1,
      perPage: 10,
      offset: 0,
      limit: 10,
    })
  })

  test('get pagination with empty value and options.page = true', () => {
    expect(
      paginate(undefined, {
        page: true,
      })
    ).toEqual({
      page: 1,
      perPage: 10,
    })
  })

  test('get pagination with empty value and options.offset = true', () => {
    expect(
      paginate(undefined, {
        offset: true,
      })
    ).toEqual({
      offset: 0,
      limit: 10,
    })
  })

  test('get pagination with page', () => {
    expect(paginate({ page: 1 })).toEqual({
      page: 1,
      perPage: 10,
      offset: 0,
      limit: 10,
    })
  })

  test('get pagination with page and options.page = true', () => {
    expect(paginate({ page: 1 }, { page: true })).toEqual({
      page: 1,
      perPage: 10,
    })
  })

  test('get pagination with perPage', () => {
    expect(paginate({ perPage: 10 })).toEqual({
      page: 1,
      perPage: 10,
      offset: 0,
      limit: 10,
    })
  })

  test('get pagination with offset', () => {
    expect(paginate({ offset: 10 })).toEqual({
      page: 2,
      perPage: 10,
      offset: 10,
      limit: 10,
    })
  })

  test('get pagination with limit', () => {
    expect(paginate({ limit: 30 })).toEqual({
      page: 1,
      perPage: 30,
      offset: 0,
      limit: 30,
    })
  })

  test('get pagination with perPage and limit', () => {
    expect(() => {
      paginate({ perPage: 10, limit: 30 })
    }).toThrow()
  })

  test('get pagination with matched offset and limit', () => {
    expect(paginate({ offset: 8, limit: 4 })).toEqual({
      page: 3,
      perPage: 4,
      offset: 8,
      limit: 4,
    })
  })

  test('get pagination with unmatched offset and limit', () => {
    expect(() => {
      paginate({ offset: 8, limit: 3 })
    }).toThrow()
  })

  test('get pagination with unmatched page and offset', () => {
    expect(() => {
      paginate({ page: 1, offset: 3 })
    }).toThrow()
  })

  test('get pagination with matched page and offset', () => {
    expect(paginate({ page: 1, offset: 0 })).toEqual({
      page: 1,
      perPage: 10,
      offset: 0,
      limit: 10,
    })
  })

  test('get pagination with options.maxPerPage = 30', () => {
    expect(paginate({ page: 1, perPage: 100 }, { maxPerPage: 30 })).toEqual({
      page: 1,
      perPage: 30,
      offset: 0,
      limit: 30,
    })
  })

  test('get pagination with unmatched options.maxPerPage and options.maxLimit', () => {
    expect(() => {
      paginate({}, { maxPerPage: 10, maxLimit: 30 })
    }).toThrow()
  })
})

describe('paginateWithCursor', () => {
  test('get pagination with cursor', () => {
    expect(
      paginateWithCursor({
        cursor: 'cursor',
      })
    ).toEqual({
      cursor: 'cursor',
      limit: 10,
    })
  })

  test('get pagination with cursor and limit', () => {
    expect(
      paginateWithCursor({
        cursor: 'cursor',
        limit: 30,
      })
    ).toEqual({
      cursor: 'cursor',
      limit: 30,
    })
  })

  test('get pagination with cursor and options.maxLimit', () => {
    expect(
      paginateWithCursor(
        {
          cursor: 'cursor',
          limit: 30,
        },
        {
          maxLimit: 12,
        }
      )
    ).toEqual({
      cursor: 'cursor',
      limit: 12,
    })
  })
})
