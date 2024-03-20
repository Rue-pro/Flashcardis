import type { TResult } from '@shared/libs/operationResult'

export interface IBrowser {
  storage: {
    local: {
      get: <Data>(
        key: string,
        defaultValue: Data,
      ) => Promise<TResult<Data, string>>

      set: <Data>(key: string, value: Data) => Promise<TResult<true, string>>

      onChanged: <Data>(
        key: string,
        callback: (
          changes: TResult<
            {
              newValue: Data
              oldValue: Data
            },
            string
          >,
        ) => void,
        defaultValue: Data,
      ) => void
    }
  }

  i18n: {
    getMessage: (key: string, substitutions?: string | string[]) => string
  }
}
