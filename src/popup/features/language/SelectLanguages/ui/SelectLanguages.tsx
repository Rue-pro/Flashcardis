import { useStore } from '@nanostores/preact'
import { JSXInternal } from 'node_modules/preact/src/jsx'

import { browser } from '@popup/shared/browser'
import { Button } from '@popup/shared/ui/Button'
import { addToast, getErrorToast } from '@popup/shared/ui/Toast'

import { ILanguage } from '@shared/entities/language'

import {
  checkIsSelected,
  localStore,
  reset,
  syncLocalStoreWithLanguageStore,
  toggle,
} from '../model/store'

interface Props {
  languages: ILanguage[]
}

export const SelectLanguages = ({ languages }: Props) => {
  useStore(localStore.languageCodes)

  const onSubmit: JSXInternal.SubmitEventHandler<HTMLFormElement> = async (
    e,
  ) => {
    e.preventDefault()
    const result = await syncLocalStoreWithLanguageStore()
    result.data &&
      addToast({
        type: 'success',
        title: result.data,
      })
    result.error && addToast(getErrorToast(result.error))
  }

  return (
    <form
      name="select_languages"
      aria-labelledby="selectLanguageFormTitle"
      onSubmit={onSubmit}
    >
      <h2 id="selectLanguageFormTitle" className="form__title">
        {browser.i18n.getMessage('SELECT_LANGUAGES_FORM_TITLE')}
      </h2>

      <ul>
        {languages.map((language) => (
          <li key={language.value}>
            <label>
              <input
                name="languages"
                type="checkbox"
                multiple
                value={language.value}
                checked={checkIsSelected(language.value)}
                onChange={() => toggle(language.value)}
              />
              {language.label}
            </label>
          </li>
        ))}
      </ul>

      <footer className="form__footer">
        <Button variant="secondary" onClick={reset}>
          {browser.i18n.getMessage('CANCEL')}
        </Button>
        <Button type="submit" variant="primary">
          {browser.i18n.getMessage('SAVE')}
        </Button>
      </footer>
    </form>
  )
}
