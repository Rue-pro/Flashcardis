import { CopyButton } from '@popup/shared/ui/CopyButton'

import styles from './styles.module.scss'

interface Props {
  text?: string
}

export const NoteCardField = ({ text }: Props) => {
  if (!text) return null

  return (
    <div className={styles.card__row}>
      <span className={styles.card__word}>{text}</span>

      <CopyButton text={text} variant="secondary" />
    </div>
  )
}
