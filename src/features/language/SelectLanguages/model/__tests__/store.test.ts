import { allTasks, cleanStores, keepMount } from 'nanostores'
import { afterEach, describe, expect, test, vi } from 'vitest'

import { Result } from '@shared/libs/operationResult'
import { getErrorToastMock } from '@shared/ui/Toast/helpers/__mock__/getErrorToast'
import { addToastMock } from '@shared/ui/Toast/model/__mock__/store'

import { waitFor } from '@tests/testUtils'

import {
  $selectedLanguages,
  SelectedLanguagesStorage,
  checkIsSelected,
  commit,
  reset,
  toggle,
} from '../store'

describe('selectedLanguages store', () => {
  const error = {
    type: `ERROR`,
    error: null,
  }

  afterEach(async () => {
    await chrome.storage.local.clear()
    cleanStores($selectedLanguages)
    $selectedLanguages.set([])
  })

  test('should initialize with empty array', () => {
    keepMount($selectedLanguages)

    expect($selectedLanguages.get()).toEqual([])
    expect(getErrorToastMock).toBeCalledTimes(0)
  })

  describe('commmon', () => {
    test('should set value from SelectedLanguagesStorage', async () => {
      await SelectedLanguagesStorage.set(['en'])

      keepMount($selectedLanguages)
      await allTasks()

      expect($selectedLanguages.get()).toEqual(['en'])
      expect(getErrorToastMock).toBeCalledTimes(0)
    })

    test('should set empty array and show toast with error when SelectedLanguagesStorage returns error', async () => {
      vi.spyOn(SelectedLanguagesStorage, 'get').mockResolvedValueOnce(
        Result.Error(error),
      )

      keepMount($selectedLanguages)
      await allTasks()

      expect($selectedLanguages.get()).toEqual([])
      expect(getErrorToastMock).toBeCalledWith(error)
    })
  })

  describe('toggle', () => {
    test('should select language if not selected and reset', async () => {
      await SelectedLanguagesStorage.set([])

      keepMount($selectedLanguages)
      await allTasks()

      toggle('en')
      expect(checkIsSelected('en')).toBeTruthy()

      reset()
      expect(checkIsSelected('en')).toBeFalsy()
    })

    test('should unselect language if selected and reset', async () => {
      await SelectedLanguagesStorage.set(['en'])

      keepMount($selectedLanguages)
      await allTasks()

      toggle('en')
      expect(checkIsSelected('en')).toBeFalsy()

      reset()
      expect(checkIsSelected('en')).toBeTruthy()
    })
  })

  describe('commit', () => {
    test('should set to selected languages store selected values and show opration success information', async () => {
      $selectedLanguages.set(['en'])

      keepMount($selectedLanguages)
      await allTasks()

      waitFor(async () => {
        await commit()

        const call = addToastMock.mock.calls[0]
        expect(call[0].type).toBe('success')
        expect(call[0].title).toBeDefined()
      })
    })

    test('should show error when can not update languages', async () => {
      vi.spyOn(SelectedLanguagesStorage, 'set').mockResolvedValue(
        Result.Error(error),
      )

      keepMount($selectedLanguages)
      await allTasks()

      waitFor(async () => {
        await commit()

        expect(getErrorToastMock).toBeCalledWith(error)
      })
    })
  })
})
