import { storage } from '@shared/shared/browser/storage'
import { TOnChangeListenerPlainProps } from '@shared/shared/browser/storage/types'
import { TBaseError, TResult } from '@shared/shared/libs/operationResult'

export const getStorage = <StorageValue>(
  key: string,
  defaultValue: StorageValue,
  logError?: (error: TBaseError) => void,
) => {
  return {
    get() {
      return storage.get<StorageValue>(key, defaultValue, logError)
    },

    set(value: StorageValue) {
      return storage.set(key, value, logError)
    },

    onChanged: {
      addListener(
        callback: (
          changes: TResult<{
            newValue: StorageValue
            oldValue: StorageValue
          }>,
        ) => void,
      ) {
        return storage.onChanged.addListener<StorageValue>(
          key,
          callback,
          defaultValue,
          logError,
        )
      },

      removeListener(
        listener: (changes: TOnChangeListenerPlainProps<StorageValue>) => void,
      ) {
        storage.onChanged.removeListener<StorageValue>(listener)
      },
    },
  }
}
