import { allTasks, cleanStores, keepMount } from 'nanostores'
import { afterEach, describe, expect, test, vi } from 'vitest'

import { Result } from '@shared/libs/operationResult'
import { getErrorToastMock } from '@shared/ui/Toast/helpers/__mock__/getErrorToast'
import { addToastMock } from '@shared/ui/Toast/model/__mock__/store'

import { waitFor } from '@tests/testUtils'

import { ILanguage } from '..'
import { $languages, LanguageStorage, select } from '../store'

describe('languages store', () => {
  const language: ILanguage = { label: 'English', value: 'en' }
  const error = {
    type: `ERROR`,
    error: null,
  }

  afterEach(async () => {
    await chrome.storage.local.clear()
    cleanStores($languages)
    $languages.set([])
  })

  describe('commmon', () => {
    test('should set value from LanguagesStorage', async () => {
      await LanguageStorage.set([language])

      keepMount($languages)
      await allTasks()

      expect($languages.get()).toEqual([language])
      expect(getErrorToastMock).toBeCalledTimes(0)
    })

    test('should set empty array and show toast with error when LanguagesStorage returns error', async () => {
      vi.spyOn(LanguageStorage, 'get').mockResolvedValueOnce(
        Result.Error(error),
      )

      keepMount($languages)
      await allTasks()

      expect($languages.get()).toEqual([])
      expect(getErrorToastMock).toBeCalledWith(error)
    })
  })

  describe('commit', () => {
    test('should set to selected languages store selected values and show opration success information', async () => {
      $languages.set([language])

      keepMount($languages)
      await allTasks()

      waitFor(async () => {
        select([])

        const call = addToastMock.mock.calls[0]
        expect(call[0].type).toBe('success')
        expect(call[0].title).toBeDefined()
      })
    })

    test('should show error when can not update languages', async () => {
      vi.spyOn(LanguageStorage, 'set').mockResolvedValue(Result.Error(error))

      keepMount($languages)
      await allTasks()

      waitFor(async () => {
        select([])

        expect(getErrorToastMock).toBeCalledWith(error)
      })
    })
  })
})
