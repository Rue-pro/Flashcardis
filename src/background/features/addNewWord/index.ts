import { browser } from '@background/shared/browser'
import { TOnClickContextMenuInfoProps } from '@background/shared/browser/contextMenus'

import {
  TLanguageCode,
  getLanguageCodeByPageUrl,
} from '@shared/entities/language'
import { $languages } from '@shared/entities/language/model/store'
import { noteStore } from '@shared/entities/note'

export const addNewWord = (parentId: string) => {
  browser.contextMenus.create({
    title: browser.i18n.getMessage('CONTEXT_MENU_ADD_NEW_WORD'),
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
          : await browser.i18n.detectLanguage(
              text,
              $languages.get().map((language) => language.value),
            )

      noteStore.addNote(finalLanguageCode, { text })
      // !TODO show toast that note is added
    }
  }

  browser.contextMenus.onClicked.addListener(handleClick)
}
