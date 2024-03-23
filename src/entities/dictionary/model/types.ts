interface IDictionaryCommonFields {
  id: string
  name: string
  url: string
}

export interface IDictionaryWithVariants extends IDictionaryCommonFields {
  variants: {
    label: string
    value: string
  }[]
  activeVariant: string
}

export type IDictionary = IDictionaryCommonFields | IDictionaryWithVariants
