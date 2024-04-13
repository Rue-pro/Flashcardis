import { atom, onMount, task } from 'nanostores'

import { getStorage } from '@shared/entities/storage'

import { TBaseError } from '@shared/shared/libs/operationResult'

export const ErrorStorage = getStorage<TBaseError[]>('errors', [], false)

export const $errors = atom<TBaseError[]>([])

onMount($errors, () => {
  task(async () => {
    const getResult = await ErrorStorage.get()
    getResult.data
      ? $errors.set(getResult.data)
      : $errors.set([getResult.error])
  })

  const listener = ErrorStorage.onChanged.addListener((changes) => {
    changes.data
      ? $errors.set(changes.data.newValue)
      : $errors.set([changes.error, ...$errors.get()])
  })

  return () => {
    ErrorStorage.onChanged.removeListener(listener)
  }
})

export const addError = async (error: TBaseError) => {
  const errors = $errors.get()
  const newErrors = [...errors, error]

  const setResult = await ErrorStorage.set(newErrors)
  setResult.data
    ? $errors.set(newErrors)
    : $errors.set([setResult.error, ...newErrors])
}

export const reset = async () => {
  const setResult = await ErrorStorage.set([])
  setResult.data ? $errors.set([]) : $errors.set([setResult.error])
}
