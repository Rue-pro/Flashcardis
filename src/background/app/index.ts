import { addNewWord } from '@background/features/addNewWord'
import { autoAddNewNote } from '@background/features/autoAddNewNote'
import { editLatestNote } from '@background/features/editLatestNote'

import { browser } from '@background/shared/browser'

import { $notes } from '@shared/entities/note/model/store'

const PARENT_ID = 'CONTEXT_MENU_ROOT'

browser.contextMenus.removeAll(() => {
  browser.contextMenus.create({
    title: browser.i18n.getMessage('CONTEXT_MENU_ROOT'),
    id: PARENT_ID,
    contexts: ['page', 'selection'],
    type: 'normal',
  })

  addNewWord(PARENT_ID)

  autoAddNewNote(PARENT_ID)

  editLatestNote(PARENT_ID)
})

$notes.listen(() => {})
