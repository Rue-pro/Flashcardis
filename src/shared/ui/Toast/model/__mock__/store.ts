import { MockedFunction, vi } from 'vitest'

import { addToast } from '../store'

export const addToastMock: MockedFunction<typeof addToast> = vi.fn()
