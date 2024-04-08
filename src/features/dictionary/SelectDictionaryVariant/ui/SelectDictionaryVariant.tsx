import {
  DictionaryCard,
  IDictionaryWithVariants,
  dictionaryStore,
} from '@entities/dictionary'

import { Button } from '@shared/ui/Button'
import { addToast } from '@shared/ui/Toast'

import styles from './styles.module.scss'

interface GroupProps {
  dictionary: IDictionaryWithVariants
}

export const SelectDictionaryVariant = ({ dictionary }: GroupProps) => {
  const onSelectVariant = async (variant: string) => {
    const result = await dictionaryStore.selectVariant(
      'en',
      dictionary.id,
      variant,
    )

    result.error && addToast({ title: result.error.type, type: 'error' })
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
                {isActive
                  ? `${variant.label} version is used`
                  : `Use ${variant.label} version`}
              </Button>
            }
          />
        )
      })}
    </ul>
  )
}
