import { MockedFunction, vi } from 'vitest'

import { getErrorToast } from '../getErrorToast'

export const getErrorToastMock: MockedFunction<typeof getErrorToast> = vi.fn()
