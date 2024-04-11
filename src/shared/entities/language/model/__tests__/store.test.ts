import { waitFor } from '@tests/testUtils'
import { allTasks, cleanStores, keepMount } from 'nanostores'
import { afterEach, describe, expect, test, vi } from 'vitest'

import { Result } from '@shared/shared/libs/operationResult'

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
    })

    test('should set empty array and show toast with error when LanguagesStorage returns error', async () => {
      vi.spyOn(LanguageStorage, 'get').mockResolvedValueOnce(
        Result.Error(error),
      )

      keepMount($languages)
      await allTasks()

      expect($languages.get()).toEqual([])
    })
  })

  describe('commit', () => {
    test('should set to selected languages store selected values and show opration success information', async () => {
      $languages.set([language])

      keepMount($languages)
      await allTasks()

      waitFor(async () => {
        const result = await select([])
        expect(result.error).toBeDefined()
      })
    })

    test('should show error when can not update languages', async () => {
      vi.spyOn(LanguageStorage, 'set').mockResolvedValue(Result.Error(error))

      keepMount($languages)
      await allTasks()

      waitFor(async () => {
        const result = await select([])
        expect(result.error).toBeDefined()
      })
    })
  })
})
