import { JSXInternal } from 'node_modules/preact/src/jsx'

import styles from './styles.module.scss'

interface Props {
  url: string
  name: string
  actions?: JSXInternal.Element
}

export const DictionaryCard = ({ url, name, actions }: Props) => (
  <li className={styles.dictionary}>
    <a className={styles.dictionary__url} href={url} target="_blank" />

    <header>
      <span className={`h2 ${styles.dictionary__title}`}>{name}</span>
    </header>

    <footer className={styles.dictionary__actions}>{actions}</footer>
  </li>
)
