import { NoteList } from '@popup/widgets/note/NoteList'
import { Settings } from '@popup/widgets/settings'

import { ErrorAlert } from '@popup/entities/error'

export const Popup = () => {
  return (
    <main>
      <ErrorAlert />
      <Settings />
      <NoteList />
    </main>
  )
}
