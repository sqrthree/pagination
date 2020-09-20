import defaults from 'lodash/defaults'
import pick from 'lodash/pick'

import { toNumber } from './helpers'

type Except<ObjectType, KeysType extends keyof ObjectType> = Pick<
  ObjectType,
  Exclude<keyof ObjectType, KeysType>
>
type Merge<FirstType, SecondType> = Except<
  FirstType,
  Extract<keyof FirstType, keyof SecondType>
> &
  SecondType

export interface PaginationOptions {
  page: boolean
  offset: boolean
  maxPerPage: number
  maxLimit: number
}

export interface PaginationData {
  page?: number | string
  perPage?: number | string

  offset?: number | string
  limit?: number | string
}

export interface Pagination {
  page: number
  perPage: number

  offset: number
  limit: number
}

type PageBasedPagination = Pick<Pagination, 'page' | 'perPage'>
type OffsetBasedPagination = Pick<Pagination, 'offset' | 'limit'>

export interface CursorBasedPagination {
  cursor: number | string
  limit: number
}

export function paginate(
  data: PaginationData,
  options?: Merge<Partial<PaginationOptions>, { page: true }>
): PageBasedPagination
export function paginate(
  data: PaginationData,
  options?: Merge<Partial<PaginationOptions>, { offset: true }>
): OffsetBasedPagination
export function paginate(
  data: PaginationData | undefined,
  options?: Partial<PaginationOptions>
): Pagination
export function paginate(
  data: PaginationData | undefined,
  options?: any
): Pagination {
  const p: Pagination = {
    page: 1,
    perPage: 10,
    offset: 0,
    limit: 10,
  }

  if (data) {
    if (
      data.perPage !== undefined &&
      data.limit !== undefined &&
      data.perPage !== data.limit
    ) {
      throw new Error('perPage and limit are in conflict.')
    }

    if (data.offset !== undefined) {
      if (data.limit) {
        if (toNumber(data.offset, 0) % toNumber(data.limit, 10) !== 0) {
          throw new Error("offset and limit don't match.")
        }
      }

      if (data.page !== undefined) {
        const perPage = toNumber(data.perPage || data.limit, 10)
        const offset = (toNumber(data.page, 1) - 1) * perPage

        if (data.offset !== offset) {
          throw new Error('page and offset are in conflict.')
        }
      }
    }

    if (data.perPage !== undefined) {
      p.limit = p.perPage = Math.max(toNumber(data.perPage, 10), 0)
    }

    if (data.limit !== undefined) {
      p.limit = p.perPage = Math.max(toNumber(data.limit, 10), 0)
    }

    if (data.page !== undefined) {
      p.page = Math.max(toNumber(data.page, 1), 1)
      p.offset = (p.page - 1) * p.perPage
    }

    if (data.offset !== undefined) {
      p.offset = Math.max(toNumber(data.offset, 0), 0)
      p.page = p.offset / p.limit + 1
    }

    if (options) {
      if (
        options.maxPerPage !== undefined &&
        options.maxLimit !== undefined &&
        options.maxPerPage !== options.maxLimit
      ) {
        throw new Error('maxPerPage and maxLimit are in conflict.')
      }

      const max = options.maxPerPage || options.maxLimit

      if (max !== undefined) {
        p.limit = p.perPage = Math.min(p.perPage, max)
      }
    }
  }

  const keys: string[] = []

  if (options) {
    if (options.page === undefined && options.offset === undefined) {
      keys.push('page', 'perPage', 'offset', 'limit')
    } else {
      if (options.page) {
        keys.push('page', 'perPage')
      }

      if (options.offset) {
        keys.push('offset', 'limit')
      }
    }
  } else {
    keys.push('page', 'perPage', 'offset', 'limit')
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return pick(p, keys) as any
}

export function paginateWithCursor(
  data: any,
  options?: Pick<PaginationOptions, 'maxLimit'>
): CursorBasedPagination {
  const p = defaults(pick(data, ['cursor', 'limit']), {
    limit: 10,
  })

  if (options && options.maxLimit !== undefined) {
    p.limit = Math.min(p.limit, options.maxLimit)
  }

  return p
}
