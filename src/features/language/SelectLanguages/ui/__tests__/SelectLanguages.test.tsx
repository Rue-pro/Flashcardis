import { afterEach, describe, expect, test, vi } from 'vitest'

import { LANGUAGES } from '@entities/language'

import { cleanup, fireEvent, render, screen } from '@tests/testUtils'

import {
  checkIsSelectedMock,
  commitMock,
  resetMock,
  toggleMock,
} from '../../model/__mock__/store'
import * as store from '../../model/store'
import { SelectLanguages } from '../SelectLanguages'

describe('SelectLanguages component', () => {
  vi.spyOn(store, 'checkIsSelected').mockImplementation(checkIsSelectedMock)
  vi.spyOn(store, 'commit').mockImplementation(commitMock)
  vi.spyOn(store, 'reset').mockImplementation(resetMock)
  vi.spyOn(store, 'toggle').mockImplementation(toggleMock)

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

    expect(commitMock).toHaveBeenCalled()
  })

  test('calls updateSelectedLanguages when form submit button is clicked', () => {
    render(<SelectLanguages languages={LANGUAGES} />)

    const saveButton = screen.getByRole('button', {
      name: /SAVE/i,
    })

    fireEvent.submit(saveButton)

    expect(commitMock).toHaveBeenCalled()
  })

  test('calls reset when form cancel button is clicked', () => {
    render(<SelectLanguages languages={LANGUAGES} />)

    const cancelButton = screen.getByRole('button', {
      name: /CANCEL/i,
    })

    fireEvent.click(cancelButton)

    expect(resetMock).toHaveBeenCalled()
  })

  test('calls toggleSelectedLanguage with "en" value when language English is clicked', () => {
    render(<SelectLanguages languages={LANGUAGES} />)

    const englishLanguageCheckbox = screen.getByRole('checkbox', {
      name: /english/i,
    })

    fireEvent.click(englishLanguageCheckbox)

    expect(toggleMock).toHaveBeenCalledWith('en')
  })

  test('checkbox is checked, when checkIsSelectedLanguage returns true', () => {
    checkIsSelectedMock.mockReturnValue(true)
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
    checkIsSelectedMock.mockReturnValue(false)

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
