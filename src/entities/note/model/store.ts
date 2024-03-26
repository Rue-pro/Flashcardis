import { atom, onMount, task } from 'nanostores'

import { TLanguageCode } from '@entities/language'
import { Storage } from '@entities/storage'

import { browser } from '@shared/browser'
import { Result } from '@shared/libs/operationResult'
import { addToast, getErrorToast } from '@shared/ui/Toast'

import { INote } from './types'

const defaultNotes: Record<TLanguageCode, INote[]> = {
  en: [],
  jp: [],
  pt: [],
  ko: [],
}

export const NoteStorage = new Storage<Record<TLanguageCode, INote[]>>(
  `notes`,
  defaultNotes,
)

export const $notes = atom<Record<TLanguageCode, INote[]>>(defaultNotes)

onMount($notes, () => {
  task(async () => {
    const getResult = await NoteStorage.get()
    if (getResult.data) {
      $notes.set(getResult.data)
    } else {
      addToast(getErrorToast(getResult.error))
    }
  })
})

export const deleteNote = async (
  languageCode: TLanguageCode,
  noteId: string,
) => {
  const notes = $notes.get()
  const note = notes[languageCode].find((note) => note.id === noteId)

  if (note) {
    const newNotes = notes[languageCode].filter((note) => note.id !== noteId)

    const setResult = await NoteStorage.set({
      ...notes,
      [languageCode]: newNotes,
    })
    if (setResult.data) {
      $notes.set({
        ...notes,
        [languageCode]: newNotes,
      })
      addToast({
        type: 'success',
        title: browser.i18n.getMessage('SUCCESS_DELETE'),
      })
    } else {
      addToast(getErrorToast(setResult.error))
    }
  } else {
    const resultError = Result.Error({
      type: 'ERROR_CAN_NOT_FIND_NOTE_TO_DELETE',
      error: new Error(
        `Note with id ${noteId} not found, available notes: /n ${JSON.stringify(notes)}`,
      ),
    })
    if (resultError.error) {
      addToast(getErrorToast(resultError.error))
    }
  }
}

export const editNote = async (languageCode: TLanguageCode, newNote: INote) => {
  const notes = $notes.get()
  const note = notes[languageCode].find((note) => note.id === newNote.id)

  if (note) {
    const newNotes = $notes
      .get()
      [languageCode].map((note) => (note.id === newNote.id ? newNote : note))

    const setResult = await NoteStorage.set({
      ...notes,
      [languageCode]: newNotes,
    })
    if (setResult.data) {
      $notes.set({
        ...notes,
        [languageCode]: newNotes,
      })
      addToast({
        type: 'success',
        title: browser.i18n.getMessage('SUCCESS_EDIT'),
      })
    } else {
      addToast(getErrorToast(setResult.error))
    }
  } else {
    const resultError = Result.Error({
      type: 'ERROR_CAN_NOT_FIND_NOTE_TO_EDIT',
      error: new Error(
        `Note with id ${newNote.id} not found, available notes: /n ${JSON.stringify(notes)}`,
      ),
    })
    if (resultError.error) {
      addToast(getErrorToast(resultError.error))
    }
  }
}
