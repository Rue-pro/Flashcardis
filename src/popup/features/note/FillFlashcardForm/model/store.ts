import { computed } from 'nanostores'

import { $activeTab } from '@popup/entities/tab'

import { IPortEmitter, PortEmitter } from '@shared/shared/browser/port'

export const $ankiPort = computed(
  $activeTab,
  (activeTab): IPortEmitter | null => {
    if (!activeTab?.id) return null
    const isAnkiTab = activeTab
      ? activeTab.url === 'https://ankiuser.net/add'
      : false

    if (isAnkiTab) {
      const port = new PortEmitter({
        tabId: activeTab.id,
        connectInfo: { name: 'anki' },
      })

      return port
    }
    return null
  },
)
