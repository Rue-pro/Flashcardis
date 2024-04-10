import { computed } from 'nanostores'

import { $activeTab } from '@popup/entities/tab'

import { PortEmitter } from '@shared/shared/browser'

export const $ankiPort = computed(
  $activeTab,
  (activeTab): PortEmitter | null => {
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
