import { vi } from 'vitest'

import { II18n } from '../types'

export const i18nMock: II18n = {
  getMessage: vi.fn((messageKey: string) => `Translated<${messageKey}>`),

  detectLanguage: vi.fn(),
}
