import { NoteList } from '@popup/widgets/note/NoteList'
import { Settings } from '@popup/widgets/settings'

import { Toasts } from '@popup/shared/ui/Toast'

export const Popup = () => {
  return (
    <main>
      <Settings />
      <NoteList />
      <Toasts />
    </main>
  )
}
