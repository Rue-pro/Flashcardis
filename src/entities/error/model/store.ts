import { atom, onMount, task } from 'nanostores'

import { getStorage } from '@entities/storage'

import { TBaseError } from '@shared/libs/operationResult'

export const ErrorStorage = getStorage<TBaseError[]>('errors', [])

export const $errors = atom<TBaseError[]>([])

onMount($errors, () => {
  task(async () => {
    const getResult = await ErrorStorage.get()
    getResult.data ? $errors.set([]) : $errors.set([getResult.error])
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
