import { vi } from 'vitest'

import { i18nMock } from '@shared/shared/browser/i18n/__mocks__'
import { storageMock } from '@shared/shared/browser/storage/__mocks__/index.ts'

vi.mock('@shared/shared/browser/storage', () => {
  return {
    storage: storageMock,
  }
})

vi.mock('@shared/shared/browser/i18n', () => ({
  i18n: i18nMock,
}))
