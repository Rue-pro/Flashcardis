import { map } from 'nanostores'

import {
  GOOGLE_TRANSLATE,
  getDictionariesUrls,
  getDictionaryByPageUrl,
  getSelectorsFromDictionary,
} from '@entities/dictionary'
import { errorStore } from '@entities/error'
import { noteStore } from '@entities/note'

import {
  PortEmitter,
  TOnClickContextMenuInfoProps,
  TOnClickContextMenuTabProps,
  browser,
} from '@shared/browser'

import {
  getLanguageFromPage,
  getLanguageFromPageResult,
} from './api/getLanguageFromPage'
import {
  getNoteFromDictionaryPage,
  getNoteFromDictionaryPageResult,
} from './api/getNoteFromDictionary'

const $dictionaryPorts = map<Record<string, PortEmitter>>()

export const autoAddNewNote = (parentId: string) => {
  browser.contextMenus.create({
    title: 'CONTEXT_MENU_ADD_NOTE_AUTOMATICALLY',
    id: 'auto_new_note',
    parentId: parentId,
    contexts: ['page'],
    documentUrlPatterns: getDictionariesUrls(),
  })

  const handleClick = async (
    info: TOnClickContextMenuInfoProps,
    tab?: TOnClickContextMenuTabProps,
  ) => {
    if (info.menuItemId === 'auto_new_note') {
      if (!tab?.id) return

      const dictionary = getDictionaryByPageUrl(info.pageUrl)

      if (!dictionary) {
        if (info.pageUrl.includes(GOOGLE_TRANSLATE.url)) {
          const dictionaryPort = createDictionaryPort(
            tab.id,
            GOOGLE_TRANSLATE.id,
          )

          getLanguageFromPage(dictionaryPort)

          getLanguageFromPageResult(dictionaryPort, (languageCode) => {
            getNoteFromDictionaryPage(
              dictionaryPort,
              languageCode,
              GOOGLE_TRANSLATE.selectors,
            )

            getNoteFromDictionaryPageResult(dictionaryPort, (note) => {
              noteStore.addNote(languageCode, note)
            })
          })
        } else {
          errorStore.addError({
            type: 'ERROR_CAN_NOT_IDENTIFY_DICTIONARY_ADD_NOTE_AUTOMATICALLY',
            error: null,
          })

          return
        }
      } else {
        const dictionaryPort = createDictionaryPort(
          tab.id,
          dictionary.dictionary.id,
        )

        getNoteFromDictionaryPage(
          dictionaryPort,
          dictionary.languageCode,
          getSelectorsFromDictionary(dictionary.dictionary),
        )

        getNoteFromDictionaryPageResult(dictionaryPort, (note) => {
          noteStore.addNote(dictionary.languageCode, note)
        })
      }
    }
  }

  browser.contextMenus.onClicked.addListener(handleClick)
}

function createDictionaryPort(
  tabId: number,
  dictionaryId: string,
): PortEmitter {
  let dictionaryPort = $dictionaryPorts.get()[dictionaryId]

  if (!dictionaryPort) {
    dictionaryPort = new PortEmitter({
      tabId,
      connectInfo: { name: 'Dictionary' },
    })
    $dictionaryPorts.setKey(dictionaryId, dictionaryPort)
  }

  return dictionaryPort
}
