export type TBaseError = { type: string; error: Error | null }
export type TResult<T = string, E = TBaseError> =
  | { data: T; error: null }
  | { data: null; error: E }

export const Result = Object.freeze({
  Success: <T = string, E extends TBaseError = TBaseError>(
    data: T,
  ): TResult<T, E> => ({
    data,
    error: null,
  }),
  Error: <T = null, E extends TBaseError = TBaseError>(
    error: E,
    log?: (error: TBaseError) => void,
  ): TResult<T, E> => {
    log && log(error)
    return {
      data: null,
      error,
    }
  },
})
