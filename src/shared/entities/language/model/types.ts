export const LANGUAGE_CODES = ['en', 'ja', 'pt-BR', 'ko', 'other'] as const

export type TLanguageCode = (typeof LANGUAGE_CODES)[number]

export interface ILanguage {
  label: string
  value: TLanguageCode
}
