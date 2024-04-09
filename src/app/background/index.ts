import { $notes } from '@entities/note/model/store'

import { browser } from '@shared/browser'

import { addNewWord } from './features/addNewWord'
import { autoAddNewNote } from './features/autoAddNewNote'

const PARENT_ID = 'CONTEXT_MENU_ROOT'

browser.contextMenus.removeAll(() => {
  browser.contextMenus.create({
    title: 'CONTEXT_MENU_ROOT',
    id: PARENT_ID,
    contexts: ['page', 'selection'],
    type: 'normal',
  })

  addNewWord(PARENT_ID)

  autoAddNewNote(PARENT_ID)
})

$notes.listen(() => {})
