import { afterEach, describe, expect, test, vi } from 'vitest'

import { Result } from '@shared/libs/operationResult'

import { chromeBrowser } from '../chrome'

describe('browser', () => {
  describe('storage', () => {
    type TStorageValue = object

    const KEY = 'testKey'
    const storedValue: TStorageValue = { someData: 'value' }
    const defaultValue: TStorageValue = { defaultData: 'defaultValue' }
    const circularValue = { prop: 'value', circularRef: {} }
    circularValue.circularRef = circularValue
    const invalidJSONString = `{"name": "Joe", "age": null]`

    describe('local', () => {
      describe('get/set', () => {
        afterEach(async () => {
          await chrome.storage.local.clear()
          vi.restoreAllMocks()
        })

        test('should resolve with error when data in storage is invalid', async () => {
          vi.spyOn(chrome.storage.local, 'get').mockImplementation(
            (_key, callback) => {
              callback({
                [KEY]: invalidJSONString,
              })
            },
          )

          const getResult = await chromeBrowser.storage.local.get(
            KEY,
            defaultValue,
          )

          expect(getResult.data).toBeNull()
          expect(getResult.error).toMatchObject({
            type: 'ERROR_CAN_NOT_GET_DATA_FROM_STORAGE',
          })
        })

        test('should get default value if storage is empty', async () => {
          const getResult = await chromeBrowser.storage.local.get(
            KEY,
            defaultValue,
          )

          expect(getResult).toEqual(Result.Success(defaultValue))
        })

        test('should get previously setted data', async () => {
          const setResult =
            await chromeBrowser.storage.local.set<TStorageValue>(
              KEY,
              storedValue,
            )

          expect(setResult).toEqual(Result.Success(true))

          const getResult = await chromeBrowser.storage.local.get(
            KEY,
            defaultValue,
          )

          expect(getResult).toEqual(Result.Success(storedValue))
        })

        test('should not set data to the storage if data is not valid', async () => {
          let setResult = await chromeBrowser.storage.local.set<TStorageValue>(
            KEY,
            storedValue,
          )

          expect(setResult).toEqual(Result.Success(true))

          setResult = await chromeBrowser.storage.local.set<TStorageValue>(
            KEY,
            circularValue,
          )

          expect(setResult.data).toBeNull()
          expect(setResult.error).toMatchObject({
            type: 'ERROR_CAN_NOT_UPDATE_DATA_IN_STORAGE',
          })

          const getResult = await chromeBrowser.storage.local.get(
            KEY,
            defaultValue,
          )

          expect(getResult).toEqual(Result.Success(storedValue))
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

          expect(callback).toHaveBeenCalledWith(
            Result.Success({ newValue, oldValue }),
          )
        })

        test('should invoke callback with default old value and parsed new value when storage changed with invalid old value', () => {
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

          expect(callback).toHaveBeenCalledTimes(2)

          const call1 = callback.mock.calls[0]
          expect(call1[0].data).toBeNull()
          expect(call1[0].error).toMatchObject({
            type: 'ERROR_CAN_NOT_GET_OLD_DATA_FROM_STORAGE',
          })

          const call2 = callback.mock.calls[1]
          expect(call2[0]).toEqual(
            Result.Success({
              newValue,
              oldValue: defaultValue,
            }),
          )
        })

        test('should invoke callback with error when storage changed with invalid new value', () => {
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

          const call = callback.mock.calls[0]
          expect(call[0].data).toBeNull()
          expect(call[0].error).toMatchObject({
            type: 'ERROR_CAN_NOT_GET_NEW_DATA_FROM_STORAGE',
          })
        })
      })
    })
  })

  describe('i18n', () => {
    test('should return the message for the given key', () => {
      const KEY = 'testKey'

      const message = chromeBrowser.i18n.getMessage(KEY)

      expect(message).toEqual(`Translated<${KEY}>`)
    })
  })
})
