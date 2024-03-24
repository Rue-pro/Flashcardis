import { allTasks, cleanStores, keepMount } from 'nanostores'
import { afterEach, describe, expect, test } from 'vitest'

import { languageStore } from '@entities/language'

import { getErrorToastMock } from '@shared/ui/Toast/helpers/__mock__/getErrorToast'
import { addToastMock } from '@shared/ui/Toast/model/__mock__/store'

import { waitFor } from '@tests/testUtils'

import {
  $languageCodes,
  checkIsSelected,
  commit,
  reset,
  toggle,
} from '../store'

describe('selectedLanguageCodes store', () => {
  afterEach(async () => {
    await chrome.storage.local.clear()
    cleanStores($languageCodes)
    $languageCodes.set([])
  })

  describe('commmon', () => {
    test('should initialize with empty array', () => {
      keepMount($languageCodes)

      expect($languageCodes.get()).toEqual([])
      expect(getErrorToastMock).toBeCalledTimes(0)
    })

    test('should set value from languages', async () => {
      languageStore.$languages.set([{ label: 'English', value: 'en' }])

      keepMount($languageCodes)
      await allTasks()

      expect($languageCodes.get()).toEqual(['en'])
      expect(getErrorToastMock).toBeCalledTimes(0)
    })
  })

  describe('toggle', () => {
    test('should select language if not selected and reset', async () => {
      languageStore.$languages.set([])

      keepMount($languageCodes)

      toggle('en')
      expect(checkIsSelected('en')).toBeTruthy()

      reset()
      expect(checkIsSelected('en')).toBeFalsy()
    })

    test('should unselect language if selected and reset', async () => {
      languageStore.$languages.set([{ label: 'English', value: 'en' }])

      keepMount($languageCodes)

      toggle('en')
      expect(checkIsSelected('en')).toBeFalsy()

      reset()
      expect(checkIsSelected('en')).toBeTruthy()
    })
  })

  describe('commit', () => {
    test('should set to selected languages store selected values and show opration success information', async () => {
      $languageCodes.set(['en'])

      keepMount($languageCodes)
      await allTasks()

      waitFor(async () => {
        commit()

        const call = addToastMock.mock.calls[0]
        expect(call[0].type).toBe('success')
        expect(call[0].title).toBeDefined()
      })
    })
  })
})
