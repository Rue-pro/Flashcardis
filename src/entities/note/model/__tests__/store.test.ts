import { allTasks, cleanStores, keepMount } from 'nanostores'
import { afterEach, describe, expect, test, vi } from 'vitest'

import { Result } from '@shared/libs/operationResult'
import { getErrorToastMock } from '@shared/ui/Toast/helpers/__mock__/getErrorToast'
import { addToastMock } from '@shared/ui/Toast/model/__mock__/store'

import { waitFor } from '@tests/testUtils'

import { $notes, NoteStorage, deleteNote, editNote } from '../store'

describe('note store', () => {
  const languageCode = 'en'
  const notes = {
    en: [
      {
        id: '1',
        text: 'text',
        translation: 'translation',
        context: 'context',
        transcription: 'text',
      },
    ],
    jp: [
      {
        id: '1',
        text: 'text',
        translation: 'translation',
        context: 'context',
        transcription: 'text',
      },
    ],
    pt: [],
    ko: [],
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

    test('should set new notes to NoteStorage and show opration success information', async () => {
      keepMount($notes)
      await allTasks()

      await waitFor(async () => {
        await deleteNote(languageCode, noteId)

        expect($notes.get()[languageCode]).toEqual([])

        const call = addToastMock.mock.calls[0]
        expect(call[0].type).toBe('success')
        expect(call[0].title).toBeDefined()

        expect(getErrorToastMock).toBeCalledTimes(0)
      })
    })

    test('should set new notes to NoteStorage and show opration success information for another language', async () => {
      keepMount($notes)
      await allTasks()

      await waitFor(async () => {
        await deleteNote('jp', noteId)

        expect($notes.get()['jp']).toEqual([])

        const call = addToastMock.mock.calls[0]
        expect(call[0].type).toBe('success')
        expect(call[0].title).toBeDefined()

        expect(getErrorToastMock).toBeCalledTimes(0)
      })
    })

    test('should show error if can not set to NoteStorage and keep note', async () => {
      vi.spyOn(NoteStorage, 'set').mockResolvedValueOnce(Result.Error(error))

      keepMount($notes)
      await allTasks()

      await waitFor(async () => {
        await deleteNote(languageCode, noteId)

        expect($notes.get()[languageCode]).toEqual(notes[languageCode])

        expect(getErrorToastMock).toBeCalledWith(error)
      })
    })

    test('should show error if note not found', async () => {
      keepMount($notes)
      await allTasks()

      await waitFor(async () => {
        await deleteNote(languageCode, 'NOT_EXISTING_ID')

        expect($notes.get()[languageCode]).toEqual(notes[languageCode])

        const call = getErrorToastMock.mock.calls[0]
        expect(call[0].type).toBe('ERROR_CAN_NOT_FIND_NOTE_TO_DELETE')
        expect(call[0].error).toBeDefined()
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
        await editNote(languageCode, newNote)

        expect($notes.get()[languageCode]).toEqual([newNote])

        const call = addToastMock.mock.calls[0]
        expect(call[0].type).toBe('success')
        expect(call[0].title).toBeDefined()

        expect(getErrorToastMock).toBeCalledTimes(0)
      })
    })

    test('should set to NoteStorage with edited note and show opration success information for another language', async () => {
      keepMount($notes)
      await allTasks()

      await waitFor(async () => {
        await editNote('jp', newNote)

        expect($notes.get()['jp']).toEqual([newNote])

        const call = addToastMock.mock.calls[0]
        expect(call[0].type).toBe('success')
        expect(call[0].title).toBeDefined()

        expect(getErrorToastMock).toBeCalledTimes(0)
      })
    })

    test('should show error if can not set to NoteStorage and keep previous note', async () => {
      vi.spyOn(NoteStorage, 'set').mockResolvedValueOnce(Result.Error(error))

      keepMount($notes)
      await allTasks()

      await waitFor(async () => {
        await editNote(languageCode, newNote)

        expect($notes.get()[languageCode]).toEqual(notes[languageCode])

        expect(getErrorToastMock).toBeCalledWith(error)
      })
    })

    test('should show error if note not found', async () => {
      keepMount($notes)
      await allTasks()

      await waitFor(async () => {
        await editNote(languageCode, { ...newNote, id: 'NOT_EXISTING_ID' })

        expect($notes.get()[languageCode]).toEqual(notes[languageCode])

        const call = getErrorToastMock.mock.calls[0]
        expect(call[0].type).toBe('ERROR_CAN_NOT_FIND_NOTE_TO_EDIT')
        expect(call[0].error).toBeDefined()
      })
    })
  })
})
