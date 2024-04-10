import { Result } from '@shared/shared/libs/operationResult'

import { ITabs } from './types'

export const chromeTabs: ITabs = {
  getActiveTab: () => {
    return new Promise((resolve) => {
      chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
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
      })
    })
  },
}
