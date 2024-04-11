import { TLanguageCode } from '@shared/entities/language'

import { II18n } from './types'

export const chromeI18n: II18n = {
  getMessage: (key, substitutions) => {
    return chrome.i18n.getMessage(key, substitutions)
  },

  detectLanguage: async (text, selectedLanguages) => {
    if (!text) return 'other'

    const detectLanguageResult = await chrome.i18n.detectLanguage(text)
    const detectedLanguage = detectLanguageResult.languages[0]
      .language as TLanguageCode

    if (detectedLanguage && selectedLanguages.includes(detectedLanguage)) {
      return detectedLanguage
    } else {
      return 'other'
    }
  },
}
