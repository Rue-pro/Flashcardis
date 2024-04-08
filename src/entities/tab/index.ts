import { atom, onMount, task } from 'nanostores'

import { ITab, browser } from '@shared/browser'
import { addToast, getErrorToast } from '@shared/ui/Toast'

export const $activeTab = atom<ITab | null>(null)

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
