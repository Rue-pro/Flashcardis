import { DictionaryCard, IDictionaryWithVariants } from '@entities/dictionary'

import { Button } from '@shared/ui/Button'

import styles from './styles.module.scss'

interface GroupProps {
  dictionary: IDictionaryWithVariants
}

export const SelectDictionaryVariant = ({ dictionary }: GroupProps) => {
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
                onClick={() => console.log('select variant')}
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
