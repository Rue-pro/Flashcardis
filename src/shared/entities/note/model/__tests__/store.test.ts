import { waitFor } from '@tests/testUtils'
import { allTasks, cleanStores, keepMount } from 'nanostores'
import { afterEach, describe, expect, test, vi } from 'vitest'

import { Result } from '@shared/shared/libs/operationResult'

import {
  $notes,
  NoteStorage,
  StorageValue,
  defaultNotes,
  deleteNote,
  editNote,
} from '../store'

describe('note store', () => {
  const languageCode = 'en'
  const notes: StorageValue = {
    ...defaultNotes,
    en: [
      {
        id: '1',
        text: 'text',
        translation: 'translation',
        context: 'context',
        transcription: 'text',
      },
    ],
    ja: [
      {
        id: '1',
        text: 'text',
        translation: 'translation',
        context: 'context',
        transcription: 'text',
      },
    ],
  }

  vi.spyOn(NoteStorage, 'get').mockResolvedValue(Result.Success(notes))

  const error = {
    type: `ERROR`,
    error: null,
  }

  afterEach(async () => {
    await chrome.storage.local.clear()
    cleanStores($notes)
    $notes.set(notes)
    vi.clearAllMocks()
  })

  describe('deleteNote', () => {
    const noteId = '1'

    test('should set new notes note to NoteStorage and show operation success information', async () => {
      keepMount($notes)
      await allTasks()

      await waitFor(async () => {
        const result = await deleteNote(languageCode, noteId)
        expect(result.data).toBeDefined()
        expect($notes.get()[languageCode]).toEqual([])
      })
    })

    test('should set new notes to NoteStorage and show opration success information for another language', async () => {
      keepMount($notes)
      await allTasks()

      await waitFor(async () => {
        const result = await deleteNote('ja', noteId)
        expect(result.data).toBeDefined()
        expect($notes.get()['ja']).toEqual([])
      })
    })

    test('should return error if can not set to NoteStorage and keep note', async () => {
      vi.spyOn(NoteStorage, 'set').mockResolvedValueOnce(Result.Error(error))

      keepMount($notes)
      await allTasks()

      await waitFor(async () => {
        const result = await deleteNote(languageCode, noteId)
        expect(result.error).toBeDefined()
        expect($notes.get()[languageCode]).toEqual(notes[languageCode])
      })
    })

    test('should return error if note not found', async () => {
      keepMount($notes)
      await allTasks()

      await waitFor(async () => {
        const result = await deleteNote(languageCode, 'NOT_EXISTING_ID')
        expect(result.error).toBeDefined()
        expect($notes.get()[languageCode]).toEqual(notes[languageCode])
      })
    })
  })

  describe('editNote', () => {
    const newNote = {
      id: '1',
      text: 'text new',
      translation: 'translation new',
      context: 'context new',
      transcription: 'transcription new',
    }

    test('should set to NoteStorage with edited note and show opration success information', async () => {
      keepMount($notes)
      await allTasks()

      await waitFor(async () => {
        const result = await editNote(languageCode, newNote)
        expect(result.data).toBeDefined()
        expect($notes.get()[languageCode]).toEqual([newNote])
      })
    })

    test('should set to NoteStorage with edited note and show opration success information for another language', async () => {
      keepMount($notes)
      await allTasks()

      await waitFor(async () => {
        const result = await editNote('ja', newNote)
        expect(result.data).toBeDefined()
        expect($notes.get()['ja']).toEqual([newNote])
      })
    })

    test('should return error if can not set to NoteStorage and keep previous note', async () => {
      vi.spyOn(NoteStorage, 'set').mockResolvedValueOnce(Result.Error(error))

      keepMount($notes)
      await allTasks()

      await waitFor(async () => {
        const result = await editNote(languageCode, newNote)
        expect(result.error).toBeDefined()
        expect($notes.get()[languageCode]).toEqual(notes[languageCode])
      })
    })

    test('should show error if note not found', async () => {
      keepMount($notes)
      await allTasks()

      await waitFor(async () => {
        const result = await editNote(languageCode, {
          ...newNote,
          id: 'NOT_EXISTING_ID',
        })
        expect(result.error).toBeDefined()
        expect($notes.get()[languageCode]).toEqual(notes[languageCode])
      })
    })
  })
})
