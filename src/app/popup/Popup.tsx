import { SelectLanguages } from '@features/language/SelectLanguages'

import { LANGUAGES } from '@entities/language'

import { ToastProvider } from '@shared/ui/Toast'

export const Popup = () => {
  return (
    <main>
      <ToastProvider>
        <SelectLanguages languages={LANGUAGES} />
      </ToastProvider>
    </main>
  )
}
