import { Result } from '@shared/libs/operationResult'

import { PortReceiver } from './port'
import { IBrowser } from './types'

export const chromeBrowser: IBrowser = {
  storage: {
    local: {
      get: (key, defaultValue) => {
        return new Promise((resolve) => {
          chrome.storage.local.get(key, (storage) => {
            if (!storage[key]) resolve(Result.Success(defaultValue))
            try {
              const json = JSON.parse(storage[key])
              resolve(Result.Success(json))
            } catch (error) {
              resolve(
                Result.Error({
                  type: 'ERROR_CAN_NOT_GET_DATA_FROM_STORAGE',
                  error: error instanceof Error ? error : null,
                }),
              )
            }
          })
        })
      },

      set: (key, value) => {
        return new Promise((resolve) => {
          let stringifiedValue = ''
          try {
            stringifiedValue = JSON.stringify(value)
            chrome.storage.local
              .set({
                [key]: stringifiedValue,
              })
              .then(() => resolve(Result.Success(true)))
          } catch (error) {
            resolve(
              Result.Error({
                type: `ERROR_CAN_NOT_UPDATE_DATA_IN_STORAGE`,
                error: error instanceof Error ? error : null,
              }),
            )
          }
        })
      },

      onChanged: (key, callback, defaultValue) => {
        chrome.storage.local.onChanged.addListener((changes) => {
          if (changes[key]) {
            let oldValue = defaultValue
            try {
              oldValue = JSON.parse(changes[key].oldValue)
            } catch (error) {
              callback(
                Result.Error({
                  type: `ERROR_CAN_NOT_GET_OLD_DATA_FROM_STORAGE`,
                  error: error instanceof Error ? error : null,
                }),
              )
            }

            try {
              const newValue = JSON.parse(changes[key].newValue)
              callback(
                Result.Success({
                  newValue: newValue,
                  oldValue: oldValue,
                }),
              )
            } catch (error) {
              callback(
                Result.Error({
                  type: `ERROR_CAN_NOT_GET_NEW_DATA_FROM_STORAGE`,
                  error: error instanceof Error ? error : null,
                }),
              )
            }
          }
        })
      },
    },
  },

  i18n: {
    getMessage: (key, substitutions) => {
      return chrome.i18n.getMessage(key, substitutions)
    },
  },

  runtime: {
    onConnect: {
      addListener: (callback) => {
        chrome.runtime.onConnect.addListener((port) => {
          callback(new PortReceiver(port))
        })
      },
    },
  },

  tabs: {
    getActiveTab: () => {
      return new Promise((resolve) => {
        chrome.tabs.query(
          { active: true, currentWindow: true },
          function (tabs) {
            const tab = tabs[0]
            if (tab?.id && tab?.url) {
              resolve(Result.Success({ id: tab.id, url: tab.url }))
            } else {
              resolve(
                Result.Error({
                  type: 'ERROR_CAN_NOT_GET_ACTIVE_TAB',
                  error: null,
                }),
              )
            }
          },
        )
      })
    },
  },
}
