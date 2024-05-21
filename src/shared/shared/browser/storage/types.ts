import { TBaseError, TResult } from '@shared/shared/libs/operationResult'

export interface IStorage {
  get: <Data>(
    key: string,
    defaultValue: Data,
    enableLogging?: (error: TBaseError) => void,
  ) => Promise<TResult<Data>>

  set: <Data>(
    key: string,
    value: Data,
    enableLogging?: (error: TBaseError) => void,
  ) => Promise<TResult<true>>

  onChanged: {
    addListener: <Data>(
      key: string,
      callback: (changes: TResult<TOnChangeListenerProps<Data>>) => void,
      defaultValue: Data,
      enableLogging?: (error: TBaseError) => void,
    ) => (changes: TOnChangeListenerPlainProps<Data>) => void

    removeListener: <Data>(
      callback: (changes: TOnChangeListenerPlainProps<Data>) => void,
    ) => void
  }

  clear: () => Promise<TResult<true>>
}

export type TOnChangeListenerProps<Value = unknown> = {
  newValue: Value
  oldValue: Value
}

export type TOnChangeListenerPlainProps<Value = unknown> = {
  [key: string]: {
    newValue?: Value
    oldValue?: Value
  }
}
