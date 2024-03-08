import { IBrowser } from './types'

export const chromeBrowser: IBrowser = {
  storage: {
    local: {
      get: (key, defaultValue) => {
        return new Promise((resolve) => {
          chrome.storage.local.get([key], (storage) => {
            try {
              const json = JSON.parse(storage[key])
              resolve(json)
            } catch (error) {
              resolve(defaultValue)
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
              .then(resolve)
          } catch (error) {
            resolve()
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
              // ...
            }

            try {
              const newValue = JSON.parse(changes[key].newValue)
              callback({
                newValue: newValue,
                oldValue: oldValue,
              })
            } catch (error) {
              // ...
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
}
