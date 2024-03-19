import { MockedFunction, vi } from 'vitest'

import { useSelectLanguages } from '../useSelectLanguages'

export const useSelectLanguagesMockReturnValues = {
  toggleSelectedLanguage: vi.fn(),
  checkIsSelectedLanguage: vi.fn(),
  updateSelectedLanguages: vi.fn(),
  selectedLanguages: [],
  reset: vi.fn(),
}

export const useSelectLanguagesMock: MockedFunction<typeof useSelectLanguages> =
  vi.fn().mockReturnValue(useSelectLanguagesMockReturnValues)
