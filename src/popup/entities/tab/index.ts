import { atom, onMount, task } from 'nanostores'

import { addToast, getErrorToast } from '@popup/shared/ui/Toast'

import { browser } from '@shared/shared/browser'
import { TTab } from '@shared/shared/browser/tabs'

export const $activeTab = atom<TTab | null>(null)

onMount($activeTab, () => {
  task(async () => {
    const getResult = await browser.tabs.getActiveTab()

    if (getResult.data) {
      $activeTab.set(getResult.data)
    } else {
      addToast(getErrorToast(getResult.error))
    }
  })
})
