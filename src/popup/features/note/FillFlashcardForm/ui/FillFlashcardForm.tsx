import { useStore } from '@nanostores/preact'
import { useEffect, useState } from 'preact/hooks'

import { useResetAfterDelay } from '@popup/shared/libs/useResetAfterDelay'
import { Button } from '@popup/shared/ui/Button'
import { AddCardIcon } from '@popup/shared/ui/icons/AddCardIcon'
import { DoneIcon } from '@popup/shared/ui/icons/DoneIcon'

import {
  autoFillForm,
  autoFillFormResult,
} from '@shared/features/note/FillFlashcardForm'

import { INote } from '@shared/entities/note'

import { browser } from '@shared/shared/browser'

import { $ankiPort } from '../model/store'

interface Props {
  note: INote
}

export const FillFlashcardForm = ({ note }: Props) => {
  const ankiPort = useStore($ankiPort)
  const [isFormFilled, setIsFormFilled] = useState(false)
  const resetAfterDelay = useResetAfterDelay({
    reset: () => setIsFormFilled(false),
  })

  useEffect(() => {
    ankiPort &&
      autoFillFormResult(ankiPort, (data) => {
        if (data.id === note.id) {
          setIsFormFilled(true)
          resetAfterDelay()
        }
      })
  }, [ankiPort])

  const fillAnkiForm = () => {
    ankiPort && autoFillForm(ankiPort, note)
  }

  return (
    <Button
      variant="secondary"
      startIcon={isFormFilled ? <DoneIcon /> : <AddCardIcon />}
      aria-label={
        isFormFilled
          ? 'Form filled'
          : browser.i18n.getMessage('FILL_ANKI_BUTTON', note.text)
      }
      onClick={fillAnkiForm}
      disabled={!ankiPort}
    />
  )
}
