import { ILanguage } from '.'

export const LANGUAGE_CODES = ['en', 'ja', 'pt', 'ko', 'other'] as const

export const LANGUAGES: ILanguage[] = [
  { label: 'English', value: 'en' },
  { label: 'Japanese', value: 'ja' },
  { label: 'Portuguese', value: 'pt' },
  { label: 'Korean', value: 'ko' },
  { label: 'Other', value: 'other' },
]
