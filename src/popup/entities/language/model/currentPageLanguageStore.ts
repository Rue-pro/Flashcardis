import { computed, task } from 'nanostores'

import {
  getLanguageFromPage,
  getLanguageFromPageResult,
} from '@shared/features/note/AutoAddNewNote'

import { TLanguageCode } from '@shared/entities/language'
import { $activeTab } from '@shared/entities/tab'

import { PortEmitter } from '@shared/shared/browser/port'

export const $currentPageLanguage = computed($activeTab, (activeTab) => {
  return task(async (): Promise<TLanguageCode> => {
    if (!activeTab?.id || activeTab.url.includes('chrome://')) return 'other'

    const port = new PortEmitter({
      tabId: activeTab.id,
      connectInfo: { name: 'CurrentPage' },
    })

    getLanguageFromPage(port)

    return new Promise((resolve) => {
      getLanguageFromPageResult(port, (languageCode) => {
        resolve(languageCode)
      })
    })
  })
})
