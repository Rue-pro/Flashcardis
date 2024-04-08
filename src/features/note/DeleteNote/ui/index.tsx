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

export const DeleteNote = ({ lang, noteId, noteText }: Props) => (
  <Button
    variant="secondary"
    startIcon={<DeleteIcon />}
    onClick={() => noteStore.deleteNote(lang, noteId)}
    aria-label={browser.i18n.getMessage('DELETE_NOTE', noteText)}
  />
)
