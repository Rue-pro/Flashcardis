import { afterEach } from 'node:test'
import { describe, expect, test, vi } from 'vitest'

import { chromeBrowserMock } from '@shared/browser/__mocks__/chrome'

import { chromeBrowser } from '../chrome'

global.chrome = chromeBrowserMock

describe('browser', () => {
  describe('storage', () => {
    type StorageValue = object

    const KEY = 'testKey'
    const storedValue: StorageValue = { someData: 'value' }
    const defaultValue: StorageValue = { defaultData: 'defaultValue' }
    const circularValue = { prop: 'value', circularRef: {} }
    circularValue.circularRef = circularValue
    const invalidJSONString = `{"name": "Joe", "age": null]`

    describe('local', () => {
      describe('get', () => {
        test('should get default value if storage is empty', async () => {
          const data = await chromeBrowser.storage.local.get(KEY, defaultValue)

          expect(data).toEqual(defaultValue)
        })

        test('should get data', async () => {
          await chromeBrowser.storage.local.set<StorageValue>(KEY, storedValue)

          const data = await chromeBrowser.storage.local.get(KEY, defaultValue)

          expect(data).toEqual(storedValue)
        })
      })

      describe('set', () => {
        test('should set data to the storage', async () => {
          await chromeBrowser.storage.local.set<StorageValue>(KEY, storedValue)

          const data = await chromeBrowser.storage.local.get(KEY, defaultValue)

          expect(data).toEqual(storedValue)
        })

        test('should not set data to the storage if data is not valid', async () => {
          await chromeBrowser.storage.local.set<StorageValue>(KEY, storedValue)
          await chromeBrowser.storage.local.set<StorageValue>(
            KEY,
            circularValue,
          )

          const data = await chromeBrowser.storage.local.get(KEY, defaultValue)

          expect(data).toEqual(storedValue)
        })
      })

      describe('onChanged', () => {
        const oldValue = { oldValue: 'previousValue' }
        const newValue = { newValue: 'updatedValue' }

        test('should invoke callback with parsed new and old values when storage changed', () => {
          const callback = vi.fn()

          vi.spyOn(
            chrome.storage.local.onChanged,
            'addListener',
          ).mockImplementation((listener) => {
            listener({
              [KEY]: {
                oldValue: JSON.stringify(oldValue),
                newValue: JSON.stringify(newValue),
              },
            })
          })

          chromeBrowser.storage.local.onChanged(KEY, callback, defaultValue)

          expect(callback).toHaveBeenCalledWith({ newValue, oldValue })
        })

        test('should invoke callback when storage changed with invalid old value', () => {
          const callback = vi.fn()

          vi.spyOn(
            chrome.storage.local.onChanged,
            'addListener',
          ).mockImplementation((listener) => {
            listener({
              [KEY]: {
                oldValue: invalidJSONString,
                newValue: JSON.stringify(newValue),
              },
            })
          })

          chromeBrowser.storage.local.onChanged(KEY, callback, defaultValue)

          expect(callback).toHaveBeenCalledWith({
            newValue,
            oldValue: defaultValue,
          })
        })

        test('should not invoke callback when storage changed with invalid new value', () => {
          const callback = vi.fn()

          vi.spyOn(
            chrome.storage.local.onChanged,
            'addListener',
          ).mockImplementation((listener) => {
            listener({
              [KEY]: {
                oldValue: JSON.stringify(oldValue),
                newValue: invalidJSONString,
              },
            })
          })

          chromeBrowser.storage.local.onChanged(KEY, callback, defaultValue)

          expect(callback).toHaveBeenCalledTimes(0)
        })
      })
    })

    afterEach(async () => {
      await chrome.storage.local.clear()
    })
  })
})
