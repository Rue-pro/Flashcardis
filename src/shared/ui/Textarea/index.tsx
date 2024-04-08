import { HTMLAttributes } from 'preact/compat'

import styles from './styles.module.scss'

interface Props extends HTMLAttributes<HTMLTextAreaElement> {}

export const Textarea = ({ className, ...rest }: Props) => {
  return <textarea className={`${styles.textarea} ${className}`} {...rest} />
}
