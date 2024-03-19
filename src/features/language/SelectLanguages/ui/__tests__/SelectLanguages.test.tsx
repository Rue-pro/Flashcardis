import { afterEach, describe, expect, test, vi } from 'vitest'

import { LANGUAGES } from '@entities/language'

import { cleanup, fireEvent, render, screen } from '@tests/testUtils'

import {
  useSelectLanguagesMock,
  useSelectLanguagesMockReturnValues,
} from '../../hooks/__mock__/useSelectLanguages'
import * as selectLanguagesModule from '../../hooks/useSelectLanguages'
import { SelectLanguages } from '../SelectLanguages'

describe('SelectLanguages component', () => {
  vi.spyOn(selectLanguagesModule, 'useSelectLanguages').mockImplementation(
    useSelectLanguagesMock,
  )

  afterEach(() => {
    cleanup()
    vi.clearAllMocks()
  })

  test('renders SelectLanguages component', () => {
    render(<SelectLanguages languages={LANGUAGES} />)

    expect(screen.getByText(/SELECT_LANGUAGES_FORM_TITLE/i)).toBeDefined()
  })

  test('calls updateSelectedLanguages when form is submitted', () => {
    render(<SelectLanguages languages={LANGUAGES} />)

    const form = screen.getByRole('form', {
      name: /SELECT_LANGUAGES_FORM_TITLE/i,
    })

    fireEvent.submit(form)

    expect(
      useSelectLanguagesMockReturnValues.updateSelectedLanguages,
    ).toHaveBeenCalled()
  })

  test('calls updateSelectedLanguages when form submit button is clicked', () => {
    render(<SelectLanguages languages={LANGUAGES} />)

    const saveButton = screen.getByRole('button', {
      name: /SAVE/i,
    })

    fireEvent.submit(saveButton)

    expect(
      useSelectLanguagesMockReturnValues.updateSelectedLanguages,
    ).toHaveBeenCalled()
  })

  test('calls reset when form cancel button is clicked', () => {
    render(<SelectLanguages languages={LANGUAGES} />)

    const cancelButton = screen.getByRole('button', {
      name: /CANCEL/i,
    })

    fireEvent.click(cancelButton)

    expect(useSelectLanguagesMockReturnValues.reset).toHaveBeenCalled()
  })

  test('calls toggleSelectedLanguage with "en" value when language English is clicked', () => {
    render(<SelectLanguages languages={LANGUAGES} />)

    const englishLanguageCheckbox = screen.getByRole('checkbox', {
      name: /english/i,
    })

    fireEvent.click(englishLanguageCheckbox)

    expect(
      useSelectLanguagesMockReturnValues.toggleSelectedLanguage,
    ).toHaveBeenCalledWith('en')
  })

  test('checkbox is checked, when checkIsSelectedLanguage returns true', () => {
    useSelectLanguagesMockReturnValues.checkIsSelectedLanguage.mockReturnValue(
      true,
    )
    render(<SelectLanguages languages={LANGUAGES} />)
    const englishLanguageCheckbox = screen.getByRole<HTMLInputElement>(
      'checkbox',
      {
        name: /english/i,
      },
    )

    expect(englishLanguageCheckbox.checked).toBeTruthy()
  })

  test('checkbox is not checked, when checkIsSelectedLanguage returns false', () => {
    useSelectLanguagesMockReturnValues.checkIsSelectedLanguage.mockReturnValue(
      false,
    )

    render(<SelectLanguages languages={LANGUAGES} />)
    const englishLanguageCheckbox = screen.getByRole<HTMLInputElement>(
      'checkbox',
      {
        name: /english/i,
      },
    )

    expect(englishLanguageCheckbox.checked).toBeFalsy()
  })
})
