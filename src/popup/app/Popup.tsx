import { NoteList } from '@popup/widgets/note/NoteList'
import { Settings } from '@popup/widgets/settings'

export const Popup = () => {
  return (
    <main>
      <Settings />
      <NoteList />
    </main>
  )
}
