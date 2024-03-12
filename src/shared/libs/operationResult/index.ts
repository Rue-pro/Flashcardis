export type IResult<T, E> = { data: T; error: null } | { data: null; error: E }

export const Result = Object.freeze({
  Success: <T, E>(data: T): IResult<T, E> => ({ data, error: null }),
  Error: <T, E>(error: E): IResult<T, E> => ({ data: null, error: error }),
})
