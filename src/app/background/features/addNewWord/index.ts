import { TLanguageCode, getLanguageCodeByPageUrl } from '@entities/language'
import { noteStore } from '@entities/note'

import { TOnClickContextMenuInfoProps, browser } from '@shared/browser'

export const addNewWord = (parentId: string) => {
  browser.contextMenus.create({
    title: 'CONTEXT_MENU_ADD_NEW_WORD',
    id: 'new_word',
    parentId: parentId,
    contexts: ['selection'],
  })

  const handleClick = async (info: TOnClickContextMenuInfoProps) => {
    if (info.menuItemId === 'new_word') {
      let finalLanguageCode: TLanguageCode = 'other'
      const languageCode = getLanguageCodeByPageUrl(info.pageUrl)
      const text = info.selectionText ?? ''

      finalLanguageCode =
        languageCode !== 'other'
          ? languageCode
          : await browser.i18n.detectLanguage(text)

      noteStore.addNote(finalLanguageCode, { text })
      // !TODO show toast that note is added
    }
  }

  browser.contextMenus.onClicked.addListener(handleClick)
}
