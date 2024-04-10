import { TLanguageCode } from '@shared/entities/language'

export interface II18n {
  getMessage: (key: string, substitutions?: string | string[]) => string

  detectLanguage: (
    text: string,
    selectedLanguages: TLanguageCode[],
  ) => Promise<TLanguageCode>
}
