import { TOnChangeListenerProps, storage } from '@shared/shared/browser/storage'
import { TResult } from '@shared/shared/libs/operationResult'

export const getStorage = <StorageValue>(
  key: string,
  defaultValue: StorageValue,
) => {
  return {
    get() {
      return storage.get<StorageValue>(key, defaultValue)
    },

    set(value: StorageValue) {
      return storage.set(key, value)
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
        )
      },

      removeListener(
        listener: (changes: TOnChangeListenerProps<StorageValue>) => void,
      ) {
        storage.onChanged.removeListener<StorageValue>(listener)
      },
    },
  }
}
