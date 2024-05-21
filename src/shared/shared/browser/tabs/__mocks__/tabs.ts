import { vi } from 'vitest'

import { ITabs } from '../types'

export const tabsMock: ITabs = {
  _getActiveTabWithRetry: vi.fn(),

  getActiveTab: vi.fn().mockResolvedValue(2),

  onActivated: {
    addListener: vi.fn(),
  },
}
