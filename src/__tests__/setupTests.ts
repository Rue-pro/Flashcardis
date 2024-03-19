import { vi } from 'vitest'

import { chromeMock } from '@shared/browser/__mocks__/chrome'
import * as toastModule from '@shared/ui/Toast'
import { useAddErrorToastMock } from '@shared/ui/Toast/__mocks__/useAddErrorToast'
import { useToastMock } from '@shared/ui/Toast/__mocks__/useToast'

global.chrome = chromeMock
vi.spyOn(toastModule, 'useToast').mockImplementation(useToastMock)
vi.spyOn(toastModule, 'useAddErrorToast').mockImplementation(
  useAddErrorToastMock,
)
