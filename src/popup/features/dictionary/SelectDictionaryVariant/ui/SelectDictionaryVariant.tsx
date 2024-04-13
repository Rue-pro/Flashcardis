import { DictionaryCard } from '@popup/entities/dictionary'

import { browser } from '@popup/shared/browser'
import { Button } from '@popup/shared/ui/Button'

import {
  IDictionaryWithVariants,
  dictionaryStore,
} from '@shared/entities/dictionary'
import { TLanguageCode } from '@shared/entities/language'

import styles from './styles.module.scss'

interface GroupProps {
  dictionary: IDictionaryWithVariants
  lang: TLanguageCode
}

export const SelectDictionaryVariant = ({ dictionary, lang }: GroupProps) => {
  const onSelectVariant = (variant: string) => {
    dictionaryStore.selectVariant(lang, dictionary.id, variant)
  }

  return (
    <ul className={`${styles.variants}`}>
      {dictionary.variants.map((variant) => {
        const isActive = dictionary.activeVariant === variant.value
        return (
          <DictionaryCard
            key={`${dictionary.id}_${variant.value}`}
            url={dictionary.url}
            name={`${dictionary.name} ${variant.label}`}
            actions={
              <Button
                disabled={isActive}
                onClick={() => onSelectVariant(variant.value)}
              >
                {browser.i18n.getMessage(
                  isActive
                    ? 'SELECT_DICTIONARY_VERSION_IS_USED'
                    : 'SELECT_DICTIONARY_USE_VERSION',
                  variant.label,
                )}
              </Button>
            }
          />
        )
      })}
    </ul>
  )
}
