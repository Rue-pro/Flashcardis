import { browser } from '@shared/browser'
import { TResult } from '@shared/libs/operationResult'

export class AbstractStorage<StorageValue> {
  key: string
  defaultValue: StorageValue

  constructor(key: string, defaultValue: StorageValue) {
    this.key = key
    this.defaultValue = defaultValue
  }

  get() {
    return browser.storage.local.get<StorageValue>(this.key, this.defaultValue)
  }

  set(value: StorageValue) {
    return browser.storage.local.set<StorageValue>(this.key, value)
  }

  onChanged(
    callback: (
      changes: TResult<{
        newValue: StorageValue
        oldValue: StorageValue
      }>,
    ) => void,
  ) {
    browser.storage.local.onChanged<StorageValue>(
      this.key,
      callback,
      this.defaultValue,
    )
  }
}
