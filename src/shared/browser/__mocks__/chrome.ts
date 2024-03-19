import { MockedObject, vi } from 'vitest'

type TChrome = typeof chrome
type TStorageValue = Record<string, unknown>

let store: TStorageValue = {}

function getStorageValueByKey(key: string) {
  const result: TStorageValue = {}
  result[key] = store[key]
  return result
}

export const chromeMock = {
  storage: {
    local: {
      get: vi.fn((id, cb) => {
        const result = id === null ? store : getStorageValueByKey(id)
        return cb ? cb(result) : Promise.resolve(result)
      }),

      set: vi.fn((payload, cb) => {
        Object.keys(payload).forEach((key) => (store[key] = payload[key]))
        return cb ? cb() : Promise.resolve()
      }),

      onChanged: {
        addListener: vi.fn(),
        removeListener: vi.fn(),
        hasListener: vi.fn(),
      },

      clear: vi.fn((cb) => {
        store = {}
        return cb ? cb() : Promise.resolve()
      }),
    },
  },

  i18n: {
    getMessage: vi.fn((key) => `Translated<${key}>`),
  },
} as unknown as MockedObject<TChrome>
