import { useStore } from '@nanostores/preact'
import { JSXInternal } from 'node_modules/preact/src/jsx'
import { useState } from 'preact/hooks'

import { browser } from '@popup/shared/browser'
import { Button } from '@popup/shared/ui/Button'
import { Result } from '@popup/shared/ui/Result'

import { ILanguage } from '@shared/entities/language'

import { TResult } from '@shared/shared/libs/operationResult'

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
  const [result, setResult] = useState<TResult | null>(null)
  useStore(localStore.languageCodes)

  const onSubmit: JSXInternal.SubmitEventHandler<HTMLFormElement> = async (
    e,
  ) => {
    e.preventDefault()
    const result = await syncLocalStoreWithLanguageStore()
    setResult(result)
  }

  return (
    <form
      className="form"
      name="select_languages"
      aria-labelledby="selectLanguageFormTitle"
      onSubmit={onSubmit}
    >
      <h2 id="selectLanguageFormTitle">
        {browser.i18n.getMessage('SELECT_LANGUAGES_FORM_TITLE')}
      </h2>

      <ul>
        {languages.map((language) =>
          language.value === 'other' ? null : (
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
          ),
        )}
      </ul>

      <Result result={result} />

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
