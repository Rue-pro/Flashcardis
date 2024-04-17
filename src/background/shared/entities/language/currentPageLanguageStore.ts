import { atom, computed, onMount } from 'nanostores'

import { browser } from '@background/shared/browser'

import {
  getLanguageFromPage,
  getLanguageFromPageResult,
} from '@shared/features/note/AutoAddNewNote'

import { TLanguageCode } from '@shared/entities/language'
import { $notes } from '@shared/entities/note/model/store'
import { $activeTab } from '@shared/entities/tab'

import { PortEmitter } from '@shared/shared/browser/port'
import { TTab } from '@shared/shared/browser/tabs'

export const $currentPageLanguage = atom<TLanguageCode>('other')

onMount($currentPageLanguage, () => {
  function getLanguage(activeTab: TTab) {
    if (activeTab.url.includes('chrome://')) return

    const port = new PortEmitter({
      tabId: activeTab.id,
      connectInfo: { name: 'CurrentPage' },
    })

    getLanguageFromPage(port)

    getLanguageFromPageResult(port, (languageCode) => {
      $currentPageLanguage.set(languageCode)
    })
  }

  const activeTab = $activeTab.get()
  if (activeTab) getLanguage(activeTab)

  browser.tabs.onActivated.addListener((activeTab) => {
    if (activeTab.data) getLanguage(activeTab.data)
  })
})

export const $latestNote = computed(
  [$currentPageLanguage, $notes],
  (currentPageLanguage, notes) => {
    return notes[currentPageLanguage][0]
  },
)
