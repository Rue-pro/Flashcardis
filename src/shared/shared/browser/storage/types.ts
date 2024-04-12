import { TResult } from '@shared/shared/libs/operationResult'

export interface IStorage {
  get: <Data>(
    key: string,
    defaultValue: Data,
    enableLogging?: boolean,
  ) => Promise<TResult<Data>>

  set: <Data>(
    key: string,
    value: Data,
    enableLogging?: boolean,
  ) => Promise<TResult<true>>

  onChanged: {
    addListener: <Data>(
      key: string,
      callback: (
        changes: TResult<{
          newValue: Data
          oldValue: Data
        }>,
      ) => void,
      defaultValue: Data,
      enableLogging?: boolean,
    ) => (changes: {
      [key: string]: { newValue?: Data; oldValue?: Data }
    }) => void

    removeListener: <Data>(
      callback: (changes: {
        [key: string]: { newValue?: Data; oldValue?: Data }
      }) => void,
    ) => void
  }
}

export type TOnChangeListenerProps<Value = unknown> = {
  [key: string]: {
    newValue?: Value
    oldValue?: Value
  }
}
