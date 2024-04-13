import { atom, onMount, task } from 'nanostores'

import { browser } from '@popup/shared/browser'

import { TTab } from '@shared/shared/browser/tabs'

export const $activeTab = atom<TTab | null>(null)

onMount($activeTab, () => {
  task(async () => {
    const getResult = await browser.tabs.getActiveTab()

    getResult.data && $activeTab.set(getResult.data)
  })
})
