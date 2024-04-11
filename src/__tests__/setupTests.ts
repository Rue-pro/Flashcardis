import { vi } from 'vitest'

import * as toastModule from '@popup/shared/ui/Toast'
import { getErrorToastMock } from '@popup/shared/ui/Toast/helpers/__mock__/getErrorToast'
import { addToastMock } from '@popup/shared/ui/Toast/model/__mock__/store'

import { chromeMock } from '@shared/shared/browser/__mocks__/chrome'

global.chrome = chromeMock

vi.spyOn(toastModule, 'getErrorToast').mockImplementation(getErrorToastMock)
vi.spyOn(toastModule, 'addToast').mockImplementation(addToastMock)
