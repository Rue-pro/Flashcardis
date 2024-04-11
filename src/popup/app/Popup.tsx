import { NoteList } from '@popup/widgets/note/NoteList'

import { SelectDictionaryList } from '@popup/features/dictionary/SelectDictionaryVariant'
import { SelectLanguages } from '@popup/features/language/SelectLanguages'

import { ErrorList } from '@popup/entities/error'

import { Toasts } from '@popup/shared/ui/Toast'

import { LANGUAGES } from '@shared/entities/language'

export const Popup = () => {
  return (
    <main>
      <ErrorList />
      <NoteList />
      <SelectDictionaryList />
      <SelectLanguages languages={LANGUAGES} />
      <Toasts />
    </main>
  )
}
