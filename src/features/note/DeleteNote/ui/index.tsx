import { TLanguageCode } from '@entities/language'
import { noteStore } from '@entities/note'

import { browser } from '@shared/browser'
import { Button } from '@shared/ui/Button'
import { addToast, getErrorToast } from '@shared/ui/Toast'
import { DeleteIcon } from '@shared/ui/icons/DeleteIcon'

interface Props {
  lang: TLanguageCode
  noteId: string
  noteText: string
}

export const DeleteNote = ({ lang, noteId, noteText }: Props) => {
  const onDelete = async (lang: TLanguageCode, noteId: string) => {
    const result = await noteStore.deleteNote(lang, noteId)
    result.error && addToast(getErrorToast(result.error))
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
