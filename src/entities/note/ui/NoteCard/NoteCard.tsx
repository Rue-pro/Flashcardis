import { JSXInternal } from 'node_modules/preact/src/jsx'

import { INote } from '../../model'
import { NoteCardField } from './NoteCardField'
import styles from './styles.module.scss'

interface Props {
  note: INote
  actions: JSXInternal.Element
  editForm?: JSXInternal.Element
}

export const NoteCard = ({ note, actions, editForm }: Props) => (
  <li className={styles.card}>
    <div className={styles.card__content}>
      <NoteCardField text={note.text} />
      <NoteCardField text={note.translation} />
      <NoteCardField text={note.context} />
      <NoteCardField text={note.transcription} />
    </div>

    <footer className={styles.card__actions}>{actions}</footer>

    {editForm}
  </li>
)
