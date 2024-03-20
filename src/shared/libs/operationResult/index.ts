export type TBaseError = { type: string; error: Error | null }
export type TResult<T, E = TBaseError> =
  | { data: T; error: null }
  | { data: null; error: E }

export const Result = Object.freeze({
  Success: <T, E>(data: T): TResult<T, E> => ({ data, error: null }),
  Error: <T, E = TBaseError>(error: E): TResult<T, E> => ({
    data: null,
    error: error,
  }),
})
