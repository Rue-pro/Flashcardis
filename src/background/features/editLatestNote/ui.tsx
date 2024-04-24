import { browser } from '@background/shared/browser'
import {
  TOnClickContextMenuInfoProps,
  TOnClickContextMenuTabProps,
} from '@background/shared/browser/contextMenus'
import { currentPageLanguageStore } from '@background/shared/entities/language'

import { INoteSelectors } from '@shared/entities/note'
import { editNote } from '@shared/entities/note/model/store'

export const editLatestNote = (parentId: string) => {
  currentPageLanguageStore.$currentPageLanguage.listen(() => {})

  const fields: Array<keyof Omit<INoteSelectors, 'text'>> = [
    'translation',
    'context',
    'transcription',
  ]
  fields.forEach((field) => {
    const handleClick = async (
      info: TOnClickContextMenuInfoProps,
      tab?: TOnClickContextMenuTabProps,
    ) => {
      if (info.menuItemId === `edit_latest_note_${field}`) {
        if (!tab?.id) return

        editNote(currentPageLanguageStore.$currentPageLanguage.get(), {
          ...currentPageLanguageStore.$latestNote.get(),
          translation: info.selectionText,
        })
      }
    }

    currentPageLanguageStore.$latestNote.listen((latestNote) => {
      if (latestNote) {
        browser.contextMenus.update(`edit_latest_note_${field}`, {
          title: `${browser.i18n.getMessage(`CONTEXT_MENU_EDIT_LATEST_NOTE_${field.toUpperCase()}`)} ${latestNote.text}`,
        })
      } else {
        browser.contextMenus.remove(`edit_latest_note_${field}`)
      }
    })

    browser.contextMenus.create({
      title: browser.i18n.getMessage(
        `CONTEXT_MENU_EDIT_LATEST_NOTE_${field.toUpperCase()}`,
      ),
      id: `edit_latest_note_${field}`,
      parentId: parentId,
      contexts: ['selection'],
    })

    browser.contextMenus.onClicked.addListener(handleClick)
  })
}
