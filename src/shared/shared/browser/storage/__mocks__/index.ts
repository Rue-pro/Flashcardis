import { vi } from 'vitest'

import { Result } from '@shared/shared/libs/operationResult'

import { IStorage, TOnChangeListenerPlainProps } from '../types'

type TStorageValue = Record<string, unknown>

let store: TStorageValue = {}
let listeners: Array<(changes: TOnChangeListenerPlainProps) => void> = []

function getStorageValueByKey(key: string) {
  const result: TStorageValue = {}
  result[key] = store[key]
  return result
}

export const storageMockClearListeners = vi.fn(() => {
  listeners = []
})

export const storageMock: IStorage = {
  get: vi.fn().mockImplementation((key, defaultValue) => {
    const storage = key === null ? store : getStorageValueByKey(key)

    if (!storage[key]) {
      return Promise.resolve(Result.Success(defaultValue))
    }

    return Promise.resolve(Result.Success(storage[key]))
  }),

  set: vi.fn((key, value) => {
    store[key] = value
    const changes: TOnChangeListenerPlainProps = {
      [key]: {
        oldValue: store[key],
        newValue: value,
      },
    }
    for (const listener of listeners) {
      listener(changes)
    }

    return Promise.resolve(Result.Success(true))
  }),

  onChanged: {
    addListener: vi.fn((key, listener) => {
      const plainListener = (changes: TOnChangeListenerPlainProps) => {
        listener(
          Result.Success({
            oldValue: changes[key].oldValue as never,
            newValue: changes[key].newValue as never,
          }),
        )
      }
      listeners.push(plainListener)

      return plainListener
    }),
    removeListener: vi.fn((listenerToRemove) => {
      listeners = listeners.filter((listener) => listener !== listenerToRemove)
    }),
  },

  clear: vi.fn(() => {
    store = {}
    return Promise.resolve(Result.Success(true))
  }),
}
