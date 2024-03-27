import { NoteList } from '@widgets/note/NoteList'

import { SelectDictionaryList } from '@features/dictionary/SelectDictionaryVariant'
import { SelectLanguages } from '@features/language/SelectLanguages'

import { LANGUAGES } from '@entities/language'

import { Toasts } from '@shared/ui/Toast'

export const Popup = () => {
  return (
    <main>
      <NoteList />
      <SelectDictionaryList />
      <SelectLanguages languages={LANGUAGES} />
      <Toasts />
    </main>
  )
}
