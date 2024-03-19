import { MockedFunction, vi } from 'vitest'

import { useToast } from '../ToastContext'

export const useToastMockReturnValues = {
  addToast: vi.fn(),
}

export const useToastMock: MockedFunction<typeof useToast> = vi
  .fn()
  .mockReturnValue(useToastMockReturnValues)
