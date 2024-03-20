import { vi } from 'vitest'

import { chromeMock } from '@shared/browser/__mocks__/chrome'
import * as toastModule from '@shared/ui/Toast'
import { getErrorToastMock } from '@shared/ui/Toast/helpers/__mock__/getErrorToast'
import { addToastMock } from '@shared/ui/Toast/model/__mock__/store'

global.chrome = chromeMock

vi.spyOn(toastModule, 'getErrorToast').mockImplementation(getErrorToastMock)
vi.spyOn(toastModule, 'addToast').mockImplementation(addToastMock)
