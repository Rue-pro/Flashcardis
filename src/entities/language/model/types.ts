import { LANGUAGE_CODES } from './languages'

export type TLanguageCode = (typeof LANGUAGE_CODES)[number]
export interface ILanguage {
  label: string
  value: TLanguageCode
}
