import { MockedFunction, vi } from 'vitest'

import { useAddErrorToast } from '../useAddErrorToast'

export const useAddErrorToastMockReturnValues = {
  addErrorToast: vi.fn(),
}

export const useAddErrorToastMock: MockedFunction<typeof useAddErrorToast> = vi
  .fn()
  .mockReturnValue(useAddErrorToastMockReturnValues)
