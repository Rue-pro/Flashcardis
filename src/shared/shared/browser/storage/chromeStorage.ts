import { Result } from '@shared/shared/libs/operationResult'

import { IStorage, TOnChangeListenerProps } from './types'

export const chromeStorage: IStorage = {
  get: (key, defaultValue, enableLogging = true) => {
    return new Promise((resolve) => {
      chrome.storage.local.get(key, (storage) => {
        if (!storage[key]) resolve(Result.Success(defaultValue))
        try {
          resolve(Result.Success(JSON.parse(storage[key])))
        } catch (error) {
          resolve(
            Result.Error(
              {
                type: 'ERROR_CAN_NOT_GET_DATA_FROM_STORAGE',
                error: error instanceof Error ? error : null,
              },
              enableLogging,
            ),
          )
        }
      })
    })
  },

  set: (key, value, enableLogging = true) => {
    return new Promise((resolve) => {
      try {
        const stringifiedValue = JSON.stringify(value)
        chrome.storage.local
          .set({
            [key]: stringifiedValue,
          })
          .then(() => resolve(Result.Success(true)))
      } catch (error) {
        resolve(
          Result.Error(
            {
              type: `ERROR_CAN_NOT_UPDATE_DATA_IN_STORAGE`,
              error: error instanceof Error ? error : null,
            },
            enableLogging,
          ),
        )
      }
    })
  },

  onChanged: {
    addListener: (key, callback, defaultValue, enableLogging = true) => {
      const listener = (changes: TOnChangeListenerProps) => {
        if (changes[key]) {
          let oldValue = defaultValue
          try {
            oldValue = JSON.parse(changes[key].oldValue as string)
          } catch (error) {
            callback(
              Result.Error(
                {
                  type: `ERROR_CAN_NOT_GET_OLD_DATA_FROM_STORAGE`,
                  error: error instanceof Error ? error : null,
                },
                enableLogging,
              ),
            )
          }

          try {
            const newValue = JSON.parse(changes[key].newValue as string)
            callback(
              Result.Success({
                newValue: newValue,
                oldValue: oldValue,
              }),
            )
          } catch (error) {
            callback(
              Result.Error(
                {
                  type: `ERROR_CAN_NOT_GET_NEW_DATA_FROM_STORAGE`,
                  error: error instanceof Error ? error : null,
                },
                enableLogging,
              ),
            )
          }
        }
      }
      chrome.storage.local.onChanged.addListener(listener)
      return listener
    },

    removeListener: (listener) => {
      chrome.storage.local.onChanged.removeListener(listener)
    },
  },
}
