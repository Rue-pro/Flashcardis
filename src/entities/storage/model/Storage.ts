import { TOnChangeListenerProps, browser } from '@shared/browser'
import { TResult } from '@shared/libs/operationResult'

export const getStorage = <StorageValue>(
  key: string,
  defaultValue: StorageValue,
) => {
  return {
    get() {
      return browser.storage.local.get<StorageValue>(key, defaultValue)
    },

    set(value: StorageValue) {
      return browser.storage.local.set(key, value)
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
        return browser.storage.local.onChanged.addListener<StorageValue>(
          key,
          callback,
          defaultValue,
        )
      },

      removeListener(
        listener: (changes: TOnChangeListenerProps<StorageValue>) => void,
      ) {
        browser.storage.local.onChanged.removeListener<StorageValue>(listener)
      },
    },
  }
}
