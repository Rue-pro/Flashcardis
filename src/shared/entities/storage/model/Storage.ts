import { browser } from '@shared/shared/browser'
import { TOnChangeListenerProps } from '@shared/shared/browser/storage'
import { TResult } from '@shared/shared/libs/operationResult'

export const getStorage = <StorageValue>(
  key: string,
  defaultValue: StorageValue,
) => {
  return {
    get() {
      return browser.storage.get<StorageValue>(key, defaultValue)
    },

    set(value: StorageValue) {
      return browser.storage.set(key, value)
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
        return browser.storage.onChanged.addListener<StorageValue>(
          key,
          callback,
          defaultValue,
        )
      },

      removeListener(
        listener: (changes: TOnChangeListenerProps<StorageValue>) => void,
      ) {
        browser.storage.onChanged.removeListener<StorageValue>(listener)
      },
    },
  }
}
