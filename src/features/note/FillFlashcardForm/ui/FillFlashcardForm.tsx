import { useStore } from '@nanostores/preact'
import { useEffect, useState } from 'preact/hooks'

import { INote } from '@entities/note'

import { browser } from '@shared/browser'
import { useResetAfterDelay } from '@shared/libs/useResetAfterDelay'
import { Button } from '@shared/ui/Button'
import { AddCardIcon } from '@shared/ui/icons/AddCardIcon'
import { DoneIcon } from '@shared/ui/icons/DoneIcon'

import { autoFillForm, autoFillFormResult } from '../api'
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
