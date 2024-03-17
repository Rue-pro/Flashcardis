import { languageCodes } from './languages'

export type TLanguageCode = (typeof languageCodes)[number]
export interface ILanguage {
  label: string
  value: TLanguageCode
}
