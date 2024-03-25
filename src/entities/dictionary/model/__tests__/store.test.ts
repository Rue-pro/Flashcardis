import { allTasks, cleanStores, keepMount } from 'nanostores'
import { afterEach, describe, expect, test, vi } from 'vitest'

import { Result } from '@shared/libs/operationResult'
import { getErrorToastMock } from '@shared/ui/Toast/helpers/__mock__/getErrorToast'
import { addToastMock } from '@shared/ui/Toast/model/__mock__/store'

import { waitFor } from '@tests/testUtils'

import { DICTIONARIES } from '../dictionaries'
import { $dictionaries, DictionaryStorage, selectVariant } from '../store'
import { TDictionaries } from '../types'

describe('dictionary store', () => {
  const error = {
    type: `ERROR`,
    error: null,
  }

  afterEach(async () => {
    await chrome.storage.local.clear()
    cleanStores($dictionaries)
    $dictionaries.set(DICTIONARIES)
    vi.clearAllMocks()
  })

  describe('commmon', () => {
    test('should set value from DictionaryStorage', async () => {
      const newDictionaries: TDictionaries = {
        ...DICTIONARIES,
        en: { ...DICTIONARIES['en'], label: 'Enlgish New Name' },
      }
      await DictionaryStorage.set(newDictionaries)

      keepMount($dictionaries)
      await allTasks()

      expect($dictionaries.get()).toEqual(newDictionaries)
      expect(getErrorToastMock).toBeCalledTimes(0)
    })

    test('should set empty array and show toast with error when DictionaryStorage returns error', async () => {
      vi.spyOn(DictionaryStorage, 'get').mockResolvedValueOnce(
        Result.Error(error),
      )

      keepMount($dictionaries)
      await allTasks()

      expect($dictionaries.get()).toEqual(DICTIONARIES)
      expect(getErrorToastMock).toBeCalledWith(error)
    })
  })

  describe('selectVariant', () => {
    const dictionaryId = 'en_CambridgeDictionary'

    test('should set to DictionaryStore selected variants and show opration success information', async () => {
      keepMount($dictionaries)
      await allTasks()

      await waitFor(async () => {
        await selectVariant('en', dictionaryId, 'us')

        const call = addToastMock.mock.calls[0]
        expect(call[0].type).toBe('success')
        expect(call[0].title).toBeDefined()
        expect(getErrorToastMock).toBeCalledTimes(0)

        const dictionary = $dictionaries
          .get()
          .en.dictionaries.find((dictionary) => {
            dictionary.id === dictionaryId
          })

        if (dictionary && 'variants' in dictionary) {
          expect(dictionary.activeVariant).toBe('us')
        }
      })
    })

    test('should show error if can not set to DictionaryStore and keep previous variant', async () => {
      vi.spyOn(DictionaryStorage, 'set').mockResolvedValue(Result.Error(error))

      keepMount($dictionaries)
      await allTasks()

      await waitFor(async () => {
        await selectVariant('en', dictionaryId, 'us')

        expect(getErrorToastMock).toBeCalledWith(error)

        const dictionary = $dictionaries
          .get()
          .en.dictionaries.find((dictionary) => dictionary.id === dictionaryId)

        if (dictionary && 'variants' in dictionary) {
          expect(dictionary.activeVariant).toEqual('uk')
        } else {
          throw Error(
            `Dictionary with id ${dictionaryId} and variants option not found`,
          )
        }
      })
    })

    test('should show error if dictionary not found', async () => {
      keepMount($dictionaries)
      await allTasks()

      await waitFor(async () => {
        await selectVariant('en', 'NOT_EXISTING_ID', 'us')

        const call = getErrorToastMock.mock.calls[0]
        expect(call[0].type).toBe(
          'ERROR_CAN_NOT_FIND_DICTIONARY_TO_SELECT_VARIANT',
        )
        expect(call[0].error).toBeDefined()
      })
    })
  })
})
