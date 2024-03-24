import { TLanguageCode } from '@entities/language'
import { noteStore } from '@entities/note'

import { browser } from '@shared/browser'
import { Button } from '@shared/ui/Button'
import { DeleteIcon } from '@shared/ui/icons/DeleteIcon'

interface Props {
  lang: TLanguageCode
  noteId: string
  noteText: string
}

export const DeleteNote = ({ noteId, noteText }: Props) => (
  <Button
    variant="secondary"
    startIcon={<DeleteIcon />}
    onClick={() => noteStore.deleteNote(noteId)}
    aria-label={browser.i18n.getMessage('noteDeleteButtonCaption', noteText)}
  />
)
