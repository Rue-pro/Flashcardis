import { useEffect, useRef, useState } from 'preact/hooks'

import { TLanguageCode } from '@entities/language'
import { SelectedLanguagesStorage } from '@entities/language'

import { browser } from '@shared/browser'
import { useAddErrorToast, useToast } from '@shared/ui/Toast'

export const useSelectLanguages = () => {
  const { addToast } = useToast()
  const { addErrorToast } = useAddErrorToast()
  const initialSelectedLanguages = useRef<TLanguageCode[]>([])

  const [selectedLanguages, setSelectedLanguages] = useState<TLanguageCode[]>(
    [],
  )

  const restoreSelectedLanguages = async () => {
    const selectedDictionaries = await SelectedLanguagesStorage.get()
    if (selectedDictionaries.data) {
      setSelectedLanguages(selectedDictionaries.data)
      initialSelectedLanguages.current = selectedDictionaries.data
    } else {
      addErrorToast(selectedDictionaries.error)
    }
  }

  useEffect(() => {
    restoreSelectedLanguages()
    SelectedLanguagesStorage.onChanged((changes) => {
      changes.data
        ? setSelectedLanguages(changes.data.newValue)
        : addErrorToast(changes.error)
    })
  }, [])

  const toggleSelectedLanguage = (language: TLanguageCode) => () => {
    setSelectedLanguages((prevState) => {
      const isSelected = prevState.includes(language)
      return isSelected
        ? prevState.filter((lang) => lang !== language)
        : [...prevState, language]
    })
  }

  const checkIsSelectedLanguage = (languageCode: TLanguageCode) => {
    return selectedLanguages.includes(languageCode)
  }

  const updateSelectedLanguages = async () => {
    const setResult = await SelectedLanguagesStorage.set(
      selectedLanguages as TLanguageCode[],
    )
    setResult.data
      ? addToast({
          type: 'success',
          title: browser.i18n.getMessage('SELECTED_LANGUAGES_SAVED'),
        })
      : addErrorToast(setResult.error)
  }

  const reset = () => {
    setSelectedLanguages(initialSelectedLanguages.current)
  }

  return {
    toggleSelectedLanguage,
    selectedLanguages,
    checkIsSelectedLanguage,
    updateSelectedLanguages,
    reset,
  }
}
