import { Result } from '@shared/shared/libs/operationResult'

import { i18n } from '../i18n'
import { ITabs } from './types'

export const chromeTabs: ITabs = {
  _getActiveTabWithRetry: (onSuccess, onError) => {
    let tryCount = 8
    let delay = 300

    const interval = setInterval(() => {
      chrome.tabs.query(
        { active: true, currentWindow: true, status: 'complete' },
        function (tabs) {
          const tab = tabs[0]
          if (tab?.id && tab?.url) {
            clearInterval(interval)
            onSuccess({ id: tab.id, url: tab.url })
          } else if (tryCount === 0) {
            clearInterval(interval)
            onError()
          } else {
            tryCount--
            delay += 200
          }
        },
      )
    }, delay)
  },

  getActiveTab: () => {
    return new Promise((resolve) => {
      chromeTabs._getActiveTabWithRetry(
        (tab) => resolve(Result.Success(tab)),
        () =>
          resolve(
            Result.Error({
              type: i18n.getMessage('ERROR_CAN_NOT_GET_ACTIVE_TAB'),
              error: null,
            }),
          ),
      )
    })
  },

  onActivated: {
    addListener: (callback) => {
      chrome.tabs.onActivated.addListener(async () => {
        chromeTabs._getActiveTabWithRetry(
          (tab) => callback(Result.Success(tab)),
          () =>
            callback(
              Result.Error({
                type: i18n.getMessage(
                  'ERROR_CAN_NOT_GET_ACTIVE_TAB_ON_ACTIVATED',
                ),
                error: null,
              }),
            ),
        )
      })
    },
  },
}
