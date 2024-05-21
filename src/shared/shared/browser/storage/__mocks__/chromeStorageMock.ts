import { MockedObject, vi } from 'vitest'

import { TOnChangeListenerPlainProps } from '../types'

type TChrome = typeof chrome
type TStorageValue = Record<string, unknown>

let store: TStorageValue = {}
let listeners: Array<(changes: TOnChangeListenerPlainProps) => void> = []

function getStorageValueByKey(key: string) {
  const result: TStorageValue = {}
  result[key] = store[key]
  return result
}

export const chromeMockClearListeners = vi.fn(() => {
  listeners = []
})

export const chromeStorageMock = {
  get: vi.fn((id, cb) => {
    const result = id === null ? store : getStorageValueByKey(id)
    return cb ? cb(result) : Promise.resolve(result)
  }),

  set: vi.fn((payload, cb) => {
    const changes: TOnChangeListenerPlainProps = {}
    Object.keys(payload).forEach((key) => {
      if (payload[key]) {
        store[key] = payload[key]
        changes[key] = { oldValue: store[key], newValue: payload[key] }
      }
    })

    for (const listener of listeners) {
      listener(changes)
    }

    return cb ? cb() : Promise.resolve()
  }),

  onChanged: {
    addListener: vi.fn(
      (listener: (changes: TOnChangeListenerPlainProps) => void) => {
        listeners.push(listener)
      },
    ),
    removeListener: vi.fn(),
  },

  clear: vi.fn((cb) => {
    store = {}
    return cb ? cb() : Promise.resolve()
  }),
} as unknown as MockedObject<TChrome['storage']['local']>
