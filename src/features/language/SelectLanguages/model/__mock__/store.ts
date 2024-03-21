import { MockedFunction, vi } from 'vitest'

import { checkIsSelected, commit, reset, toggle } from '../store'

export const commitMock: MockedFunction<typeof commit> = vi.fn()

export const resetMock: MockedFunction<typeof reset> = vi.fn()

export const toggleMock: MockedFunction<typeof toggle> = vi.fn()

export const checkIsSelectedMock: MockedFunction<typeof checkIsSelected> =
  vi.fn()
