export interface IBrowser {
  storage: {
    local: {
      get: <Data>(key: string, defaultValue: Data) => Promise<Data>

      set: <Data>(key: string, value: Data) => Promise<void>

      onChanged: <Data>(
        key: string,
        callback: (changes: { newValue: Data; oldValue: Data }) => void,
        defaultValue: Data,
      ) => void
    }
  }

  i18n: {
    getMessage: (key: string, substitutions?: string | string[]) => string
  }
}
