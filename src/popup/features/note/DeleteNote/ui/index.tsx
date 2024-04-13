import { browser } from '@popup/shared/browser'
import { Button } from '@popup/shared/ui/Button'
import { DeleteIcon } from '@popup/shared/ui/icons/DeleteIcon'

import { TLanguageCode } from '@shared/entities/language'
import { noteStore } from '@shared/entities/note'

interface Props {
  lang: TLanguageCode
  noteId: string
  noteText: string
}

export const DeleteNote = ({ lang, noteId, noteText }: Props) => {
  const onDelete = (lang: TLanguageCode, noteId: string) => {
    noteStore.deleteNote(lang, noteId)
  }

  return (
    <Button
      variant="secondary"
      startIcon={<DeleteIcon />}
      onClick={() => onDelete(lang, noteId)}
      aria-label={browser.i18n.getMessage('DELETE_NOTE', noteText)}
    />
  )
}
