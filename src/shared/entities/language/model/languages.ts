import { ILanguage } from '.'

export const LANGUAGE_CODES = ['en', 'ja', 'pt-BR', 'ko', 'other'] as const

export const LANGUAGES: ILanguage[] = [
  { label: 'English', value: 'en' },
  { label: 'Japanese', value: 'ja' },
  { label: 'Portuguese', value: 'pt-BR' },
  { label: 'Korean', value: 'ko' },
  { label: 'Other', value: 'other' },
]
