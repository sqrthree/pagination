# pagination

[![npm](https://img.shields.io/npm/v/@sqrtthree/pagination.svg?style=?style=flat&logo=appveyor)](https://www.npmjs.com/package/@sqrtthree/pagination)

Some helpers about pagination.

### Install

```sh
yarn add @sqrtthree/pagination

# OR use npm
npm install @sqrtthree/pagination
```

### How to usage

#### paginate(data, options?: {page?: boolean, offset?: boolean, maxPerPage?: number, maxLimit?: number })

@return { page: number = 1, perPage: number = 10, offset: number = 0, limit: number = 10 }

#### paginateWithCursor(data, options?: { maxLimit?: number })

@return { cursor: string | number, limit: number = 10 }

---

> [sqrtthree.com](http://sqrtthree.com/) &nbsp;&middot;&nbsp;
> GitHub [@sqrthree](https://github.com/sqrthree) &nbsp;&middot;&nbsp;
> Twitter [@sqrtthree](https://twitter.com/sqrtthree)
