import { MockedObject, vi } from 'vitest'

type IChrome = typeof chrome
type StoreValue = Record<string, unknown>

let store: StoreValue = {}

function resolveKey(key: unknown) {
  if (typeof key === 'string') {
    const result: StoreValue = {}
    result[key] = store[key]
    return result
  } else if (Array.isArray(key)) {
    return key.reduce((acc, curr) => {
      acc[curr] = store[curr]
      return acc
    }, {})
  }
  throw new Error('Wrong key given')
}

export const chromeBrowserMock = {
  storage: {
    local: {
      get: vi.fn((id, cb) => {
        const result = id === null ? store : resolveKey(id)
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
} as unknown as MockedObject<IChrome>
