import { CopyButton } from '../CopyButton'
import styles from './styles.module.scss'

interface Props {
  type: string
  content: string
}

export const ErrorDetails = ({ type, content }: Props) => (
  <div className={styles.error}>
    <h1>{type}</h1>
    {content}
    <CopyButton
      variant="secondary"
      text={`${type}\n${content}`}
      className={styles['error__copy-btn']}
    />
  </div>
)
