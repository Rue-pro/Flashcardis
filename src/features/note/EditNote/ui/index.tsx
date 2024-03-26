import { JSXInternal } from 'node_modules/preact/src/jsx'
import { useState } from 'preact/hooks'

import { TLanguageCode } from '@entities/language'
import { INote, noteStore } from '@entities/note'

import { browser } from '@shared/browser'
import { Button } from '@shared/ui/Button'
import { Textarea } from '@shared/ui/Textarea'

import styles from './styles.module.scss'

interface Props {
  lang: TLanguageCode
  note: INote
  onCancel: () => void
  onSubmit: () => void
}

export const EditNote = ({
  lang,
  note,
  onCancel,
  onSubmit: outerOnSubmit,
}: Props) => {
  const [fields, setFields] = useState<INote>(note)

  const onChange =
    (field: string): JSXInternal.GenericEventHandler<HTMLTextAreaElement> =>
    (e) => {
      setFields((prevState) => ({
        ...prevState,
        [field]: (e.target as HTMLInputElement).value,
      }))
    }

  const onSubmit: JSXInternal.SubmitEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()
    noteStore.editNote(lang, fields)
    outerOnSubmit()
  }

  return (
    <form
      name="edit_note"
      aria-labelledby="editNoteFormTitle"
      className="container"
      onSubmit={onSubmit}
    >
      <h1 id="editNoteFormTitle" className="form__title">
        {browser.i18n.getMessage('EDIT_NOTE_FORM_TITLE', fields.text)}
      </h1>

      <div className={styles.fields}>
        <Textarea
          value={fields.text}
          onChange={onChange('text')}
          required
          placeholder={browser.i18n.getMessage(
            'EDIT_NOTE_FORM_FIELD_PLACEHOLDER_FOR_WORD',
          )}
        />
        <Textarea
          value={fields.translation}
          onChange={onChange('translation')}
          placeholder={browser.i18n.getMessage(
            'EDIT_NOTE_FORM_FIELD_PLACEHOLDER_FOR_TRANSLATION',
          )}
        />
        <Textarea
          value={fields.context}
          onChange={onChange('context')}
          placeholder={browser.i18n.getMessage(
            'EDIT_NOTE_FORM_FIELD_PLACEHOLDER_FOR_EXAMPLE',
          )}
        />
        <Textarea
          value={fields.transcription}
          onChange={onChange('transcription')}
          placeholder={browser.i18n.getMessage(
            'EDIT_NOTE_FORM_FIELD_PLACEHOLDER_FOR_TRANSCRIPTION',
          )}
        />
      </div>

      <footer className="form__footer">
        <Button variant="secondary" onClick={onCancel}>
          {browser.i18n.getMessage('CANCEL')}
        </Button>

        <Button type="submit">{browser.i18n.getMessage('SAVE')}</Button>
      </footer>
    </form>
  )
}
