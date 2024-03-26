import { ILanguage } from '.'

export const LANGUAGE_CODES = ['en', 'jp', 'pt', 'ko'] as const

export const LANGUAGES: ILanguage[] = [
  { label: 'English', value: 'en' },
  { label: 'Japanese', value: 'jp' },
  { label: 'Portuguese', value: 'pt' },
  { label: 'Korean', value: 'ko' },
]
