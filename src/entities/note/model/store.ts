import { atom } from 'nanostores'

import { INote } from './types'

export const $notes = atom<INote[]>([
  {
    id: '1',
    text: 'some text',
    translation: 'text',
    context:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis, ipsa dolorum dolore, dicta explicabo doloribus aliquam adipisci quae, similique rerum quam culpa ex libero. Assumenda quasi voluptates inventore officiis? Perspiciatis.',
    transcription: 'text',
  },
  {
    id: '2',
    text: 'some text',
    translation: 'text',
    context:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis, ipsa dolorum dolore, dicta explicabo doloribus aliquam adipisci quae, similique rerum quam culpa ex libero. Assumenda quasi voluptates inventore officiis? Perspiciatis.',
    transcription: 'text',
  },
])

export const deleteNote = (noteId: string) => {
  $notes.set($notes.get().filter((note) => note.id !== noteId))
}

export const editNote = (newNote: INote) => {
  $notes.set(
    $notes.get().map((note) => (note.id === newNote.id ? newNote : note)),
  )
}
