import { waitFor } from '@tests/testUtils'
import { allTasks, cleanStores, keepMount } from 'nanostores'
import { beforeEach, describe, expect, test } from 'vitest'

import { languageStore } from '@shared/entities/language'

import { storage } from '@shared/shared/browser/storage'

import {
  checkIsSelected,
  localStore,
  reset,
  syncLocalStoreWithLanguageStore,
  toggle,
} from '../store'

describe('selectedLanguageCodes store', () => {
  beforeEach(async () => {
    await storage.clear()
    cleanStores(languageStore.$languageCodes)
    cleanStores(localStore.languageCodes)
    cleanStores(localStore.islanguageCodesDirty)
    cleanStores(localStore.defaultValue)
    languageStore.$languages.set([])
    localStore.languageCodes.set([])
    localStore.islanguageCodesDirty.set(false)
    localStore.defaultValue.set([])
  })

  describe('commmon', () => {
    test('should initialize with empty array', () => {
      keepMount(localStore.languageCodes)

      expect(localStore.languageCodes.get()).toEqual([])
    })

    test('should set value from languages', async () => {
      languageStore.$languages.set([{ label: 'English', value: 'en' }])

      keepMount(localStore.languageCodes)
      await allTasks()

      expect(localStore.languageCodes.get()).toEqual(['en'])
    })
  })

  describe('toggle', () => {
    test('should select language if not selected and reset', async () => {
      languageStore.$languages.set([])

      keepMount(localStore.languageCodes)

      toggle('en')
      expect(checkIsSelected('en')).toBeTruthy()

      reset()
      expect(checkIsSelected('en')).toBeFalsy()
    })

    test('should unselect language if selected and reset', async () => {
      languageStore.$languages.set([{ label: 'English', value: 'en' }])

      keepMount(localStore.languageCodes)

      toggle('en')
      expect(checkIsSelected('en')).toBeFalsy()

      reset()
      expect(checkIsSelected('en')).toBeTruthy()
    })
  })

  describe('commit', () => {
    test('should set to selected languages store selected values and show opration success information', async () => {
      localStore.languageCodes.set(['en'])

      keepMount(localStore.languageCodes)
      await allTasks()

      waitFor(async () => {
        const result = await syncLocalStoreWithLanguageStore()
        expect(result.data).toBeDefined()
      })
    })
  })
})
