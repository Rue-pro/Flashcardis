import { nanoid } from 'nanoid'
import { atom, onMount, task } from 'nanostores'

import { browser } from '@popup/shared/browser'

import { TLanguageCode } from '@shared/entities/language'
import { getStorage } from '@shared/entities/storage'

import { Result, TResult } from '@shared/shared/libs/operationResult'

import { INote } from './types'

export type StorageValue = Record<TLanguageCode, INote[]>

export const defaultNotes: StorageValue = {
  en: [],
  ja: [],
  'pt-BR': [],
  ko: [],
  other: [],
}

export const NoteStorage = getStorage<StorageValue>(`notes`, defaultNotes)

export const $notes = atom<StorageValue>(defaultNotes)

onMount($notes, () => {
  task(async () => {
    const getResult = await NoteStorage.get()
    getResult.data && $notes.set(getResult.data)
  })

  const listener = NoteStorage.onChanged.addListener((changes) => {
    changes.data && $notes.set(changes.data.newValue)
  })

  return () => {
    NoteStorage.onChanged.removeListener(listener)
  }
})

export const deleteNote = async (
  languageCode: TLanguageCode,
  noteId: string,
): Promise<TResult> => {
  const notes = $notes.get()
  const note = notes[languageCode].find((note) => note.id === noteId)

  if (!note) {
    return Result.Error({
      type: browser.i18n.getMessage('ERROR_CAN_NOT_FIND_NOTE_TO_DELETE'),
      error: new Error(
        `Note with id ${noteId} not found, available notes: /n ${JSON.stringify(notes)}`,
      ),
    })
  }
  const newNotes = notes[languageCode].filter((note) => note.id !== noteId)

  const setResult = await NoteStorage.set({
    ...notes,
    [languageCode]: newNotes,
  })

  return setResult.data
    ? Result.Success(browser.i18n.getMessage('DELETE_NOTE_SUCCESS'))
    : setResult
}

export const editNote = async (
  languageCode: TLanguageCode,
  newNote: INote,
): Promise<TResult> => {
  const notes = $notes.get()
  const note = notes[languageCode].find((note) => note.id === newNote.id)

  if (!note) {
    return Result.Error({
      type: browser.i18n.getMessage('ERROR_CAN_NOT_FIND_NOTE_TO_EDIT'),
      error: new Error(
        `Note with id ${newNote.id} not found, available notes: /n ${JSON.stringify(notes)}`,
      ),
    })
  }

  const newNotes = $notes
    .get()
    [languageCode].map((note) => (note.id === newNote.id ? newNote : note))

  const setResult = await NoteStorage.set({
    ...notes,
    [languageCode]: newNotes,
  })

  return setResult.data
    ? Result.Success(browser.i18n.getMessage('EDIT_NOTE_SUCCESS'))
    : setResult
}

export const addNote = async (
  languageCode: TLanguageCode,
  note: Omit<INote, 'id'>,
): Promise<TResult> => {
  const notes = $notes.get()
  const newNote = { id: nanoid(), ...note }
  const newNotes = {
    ...notes,
    [languageCode]: [newNote, ...notes[languageCode]],
  }

  const setResult = await NoteStorage.set(newNotes)

  return setResult.data
    ? Result.Success(browser.i18n.getMessage('ADD_NOTE_SUCCESS'))
    : setResult
}
