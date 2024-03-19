import { afterEach, describe, expect, test, vi } from 'vitest'

import { SelectedLanguagesStorage } from '@entities/language'

import { Result } from '@shared/libs/operationResult'
import { useAddErrorToastMockReturnValues } from '@shared/ui/Toast/__mocks__/useAddErrorToast'
import { useToastMockReturnValues } from '@shared/ui/Toast/__mocks__/useToast'

import { renderHook, waitFor } from '@tests/testUtils'

import { useSelectLanguages } from '../useSelectLanguages'

describe('useSelectLangugages', () => {
  const error = {
    type: `ERROR`,
    error: null,
  }

  afterEach(async () => {
    await chrome.storage.local.clear()
    vi.clearAllMocks()
  })

  describe('initialization', () => {
    test('should set empty array when SelectedLanguagesStorage returns no selected variants', async () => {
      SelectedLanguagesStorage.set([])

      const { result, unmount, rerender } = renderHook(() =>
        useSelectLanguages(),
      )

      rerender()

      await waitFor(() => {
        expect(result.current.selectedLanguages.length).toBe(0)
        expect(useAddErrorToastMockReturnValues.addErrorToast).toBeCalledTimes(
          0,
        )
      })

      unmount()
    })

    test('should set empty array and show toast with error when DictionariesService returns error', async () => {
      vi.spyOn(SelectedLanguagesStorage, 'get').mockResolvedValue(
        Result.Error(error),
      )
      SelectedLanguagesStorage.set([])

      const { result, unmount, rerender } = renderHook(() =>
        useSelectLanguages(),
      )

      rerender()

      await waitFor(() => {
        expect(result.current.selectedLanguages.length).toBe(0)
        expect(useAddErrorToastMockReturnValues.addErrorToast).toBeCalledWith(
          error,
        )
      })

      unmount()
    })

    test('should change selected languages when selected language store changed', async () => {
      vi.spyOn(SelectedLanguagesStorage, 'onChanged').mockImplementation(
        (callback) => {
          callback(
            Result.Success({
              newValue: ['jp'],
              oldValue: [],
            }),
          )
        },
      )

      const { result, unmount, rerender } = renderHook(() =>
        useSelectLanguages(),
      )

      rerender()

      await waitFor(() => {
        const isSelected = result.current.checkIsSelectedLanguage('jp')
        expect(isSelected).toBeTruthy()
        expect(useAddErrorToastMockReturnValues.addErrorToast).toBeCalledTimes(
          0,
        )
      })

      unmount()
    })

    test('should not change selected and show toast with error languages when selected language store changed with error', async () => {
      vi.spyOn(SelectedLanguagesStorage, 'onChanged').mockImplementation(
        (callback) => {
          callback(Result.Error(error))
        },
      )

      const { result, unmount, rerender } = renderHook(() =>
        useSelectLanguages(),
      )

      rerender()

      await waitFor(() => {
        expect(result.current.selectedLanguages.length).toBe(0)
        expect(useAddErrorToastMockReturnValues.addErrorToast).toBeCalledWith(
          error,
        )
      })

      unmount()
    })
  })

  describe('toggleSelectedLanguage', () => {
    test('should select language if not selected', async () => {
      SelectedLanguagesStorage.set([])

      const { result, unmount, rerender } = renderHook(() =>
        useSelectLanguages(),
      )

      rerender()

      await waitFor(() => {
        result.current.toggleSelectedLanguage('en')()
        const isSelected = result.current.checkIsSelectedLanguage('en')
        expect(isSelected).toBeTruthy()
      })

      unmount()
    })

    test('should unselect language if selected', async () => {
      SelectedLanguagesStorage.set(['en'])

      const { result, unmount, rerender } = renderHook(() =>
        useSelectLanguages(),
      )

      rerender()

      await waitFor(() => {
        result.current.toggleSelectedLanguage('en')()
        const isSelected = result.current.checkIsSelectedLanguage('en')
        expect(isSelected).toBeFalsy()
      })

      unmount()
    })
  })

  describe('updateSelectedLanguages', () => {
    test('should set to selected languages store s  lected values and show opration success information', async () => {
      SelectedLanguagesStorage.set(['en'])

      const { result, unmount, rerender } = renderHook(() =>
        useSelectLanguages(),
      )

      rerender()

      await waitFor(() => {
        result.current.updateSelectedLanguages()
        const call = useToastMockReturnValues.addToast.mock.calls[0]
        expect(call[0].type).toBe('success')
        expect(call[0].title).toBeDefined()
      })

      unmount()
    })
    test('should show error when can not update languages', async () => {
      vi.spyOn(SelectedLanguagesStorage, 'set').mockResolvedValue(
        Result.Error(error),
      )

      const { result, unmount, rerender } = renderHook(() =>
        useSelectLanguages(),
      )

      rerender()

      await waitFor(() => {
        result.current.updateSelectedLanguages()
        expect(useAddErrorToastMockReturnValues.addErrorToast).toBeCalledWith(
          error,
        )
      })

      unmount()
    })
  })
})
