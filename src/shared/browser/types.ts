import type { IResult } from '@shared/libs/operationResult'

export interface IBrowser {
  storage: {
    local: {
      get: <Data>(
        key: string,
        defaultValue: Data,
      ) => Promise<IResult<Data, string>>

      set: <Data>(key: string, value: Data) => Promise<IResult<true, string>>

      onChanged: <Data>(
        key: string,
        callback: (
          changes: IResult<
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
