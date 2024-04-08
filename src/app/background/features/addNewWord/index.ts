import { TLanguageCode, getLanguageCodeByPageUrl } from '@entities/language'
import { noteStore } from '@entities/note'

import { browser } from '@shared/browser'

export const addNewWord = (parentId: string) => {
  chrome.contextMenus.create({
    title: 'CONTEXT_MENU_ADD_NEW_WORD',
    id: 'new_word',
    parentId: parentId,
    contexts: ['selection'],
  })

  const handleClick = async (info: chrome.contextMenus.OnClickData) => {
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

  chrome.contextMenus.onClicked.addListener(handleClick)
}
