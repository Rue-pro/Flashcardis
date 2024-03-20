import { SelectLanguages } from '@features/language/SelectLanguages'

import { LANGUAGES } from '@entities/language'

import { Toasts } from '@shared/ui/Toast'

export const Popup = () => {
  return (
    <main>
      <SelectLanguages languages={LANGUAGES} />
      <Toasts />
    </main>
  )
}
