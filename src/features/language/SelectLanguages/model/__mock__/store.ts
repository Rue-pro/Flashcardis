import { MockedFunction, vi } from 'vitest'

import {
  checkIsSelected,
  reset,
  syncLocalStoreWithLanguageStore,
  toggle,
} from '../store'

export const syncLocalStoreWithLanguageStoreMock: MockedFunction<
  typeof syncLocalStoreWithLanguageStore
> = vi.fn()

export const resetMock: MockedFunction<typeof reset> = vi.fn()

export const toggleMock: MockedFunction<typeof toggle> = vi.fn()

export const checkIsSelectedMock: MockedFunction<typeof checkIsSelected> =
  vi.fn()
