import { CIRCULAR_VALUE, INVALID_JSON_STRING } from '@tests/testUtils'
import { MockedObject, beforeAll, describe, expect, test, vi } from 'vitest'

import { Result } from '@shared/shared/libs/operationResult'

import { chromeStorageMock } from '../__mocks__/chromeStorageMock'
import { chromeStorage } from '../chromeStorage'

describe('chromeStorage', () => {
  const KEY = 'testKey'
  const storedValue: TStorageValue = { someData: 'value' }
  const defaultValue: TStorageValue = { defaultData: 'defaultValue' }
  const oldValue = { oldValue: 'previousValue' }
  const newValue = { newValue: 'updatedValue' }

  beforeAll(async () => {
    global.chrome = {
      storage: {
        local: chromeStorageMock,
      },
    } as unknown as MockedObject<typeof chrome>
    await chromeStorageMock.clear()
    vi.restoreAllMocks()
  })

  type TStorageValue = object

  describe('get/set', () => {
    test('should resolve with error when data in storage is invalid', async () => {
      vi.spyOn(chrome.storage.local, 'get').mockImplementationOnce(
        (_key, callback) => {
          callback({
            [KEY]: INVALID_JSON_STRING,
          })
        },
      )

      const getResult = await chromeStorage.get(KEY, defaultValue)

      expect(getResult.data).toBeNull()
      expect(getResult.error).toMatchObject({
        type: 'Translated<ERROR_CAN_NOT_GET_DATA_FROM_STORAGE>',
      })
    })

    test('should get default value if storage is empty', async () => {
      const getResult = await chromeStorage.get(KEY, defaultValue)

      expect(getResult).toEqual(Result.Success(defaultValue))
    })

    test('should get previously setted data', async () => {
      const setResult = await chromeStorage.set<TStorageValue>(KEY, storedValue)

      expect(setResult).toEqual(Result.Success(true))

      const getResult = await chromeStorage.get(KEY, defaultValue)

      expect(getResult).toEqual(Result.Success(storedValue))
    })

    test('should not set data to the storage if data is not valid', async () => {
      let setResult = await chromeStorage.set<TStorageValue>(KEY, storedValue)

      expect(setResult).toEqual(Result.Success(true))

      setResult = await chromeStorage.set<TStorageValue>(KEY, CIRCULAR_VALUE)

      expect(setResult.data).toBeNull()
      expect(setResult.error).toMatchObject({
        type: 'Translated<ERROR_CAN_NOT_UPDATE_DATA_IN_STORAGE>',
      })

      const getResult = await chromeStorage.get(KEY, defaultValue)

      expect(getResult).toEqual(Result.Success(storedValue))
    })
  })

  describe('onChanged', () => {
    test('should invoke callback with parsed new and old values when storage changed', () => {
      vi.spyOn(
        chrome.storage.local.onChanged,
        'addListener',
      ).mockImplementationOnce((listener) => {
        listener({
          [KEY]: {
            oldValue: JSON.stringify(oldValue),
            newValue: JSON.stringify(newValue),
          },
        })
      })

      const callback = vi.fn()

      chromeStorage.onChanged.addListener(KEY, callback, defaultValue)

      chromeStorage.set(KEY, '')
      expect(callback).toHaveBeenCalledWith(
        Result.Success({ newValue, oldValue }),
      )
    })

    test('should invoke callback with default old value and parsed new value when storage changed with invalid old value', () => {
      const callback = vi.fn()

      vi.spyOn(
        chrome.storage.local.onChanged,
        'addListener',
      ).mockImplementationOnce((listener) => {
        listener({
          [KEY]: {
            oldValue: INVALID_JSON_STRING,
            newValue: JSON.stringify(newValue),
          },
        })
      })

      chromeStorage.onChanged.addListener(KEY, callback, defaultValue)

      expect(callback).toHaveBeenCalledTimes(2)

      const call1 = callback.mock.calls[0]
      expect(call1[0].data).toBeNull()
      expect(call1[0].error).toMatchObject({
        type: 'Translated<ERROR_CAN_NOT_GET_OLD_DATA_FROM_STORAGE>',
      })

      const call2 = callback.mock.calls[1]
      expect(call2[0]).toEqual(
        Result.Success({
          newValue: newValue,
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
            newValue: INVALID_JSON_STRING,
          },
        })
      })

      chromeStorage.onChanged.addListener(KEY, callback, defaultValue)

      const call = callback.mock.calls[0]
      expect(call[0].data).toBeNull()
      expect(call[0].error).toMatchObject({
        type: 'Translated<ERROR_CAN_NOT_GET_NEW_DATA_FROM_STORAGE>',
      })
    })
  })
})
