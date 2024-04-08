import { ILanguage, TLanguageCode } from '@entities/language'
import { INoteSelectors } from '@entities/note'

interface IDictionaryCommonFields {
  id: string
  name: string
  url: string
}

export interface IDictionaryWithoutVariants extends IDictionaryCommonFields {
  selectors: INoteSelectors
}

export interface IDictionaryWithVariants extends IDictionaryCommonFields {
  variants: {
    label: string
    value: string
    selectors: INoteSelectors
  }[]
  activeVariant: string
}

export type IDictionary = IDictionaryWithoutVariants | IDictionaryWithVariants

export type TDictionaries = Record<
  TLanguageCode,
  ILanguage & {
    dictionaries: Array<IDictionary>
  }
>
