import { TLanguageCode } from '@shared/entities/language'
import { INote, INoteSelectors } from '@shared/entities/note'

import { IPortEmitter, IPortReceiver } from '@shared/shared/browser/port'

interface Request {
  message: 'GET_NOTE_FROM_DICTIONARY_PAGE'
  data: {
    lang: TLanguageCode
    selectors: INoteSelectors
  }
}

interface Response {
  message: 'GET_NOTE_FROM_DICTIONARY_RESULT'
  data: Omit<INote, 'id'>
}

export const getNoteFromDictionaryPage = async (
  port: IPortEmitter,
  lang: TLanguageCode,
  selectors: INoteSelectors,
) => {
  port.postMessage<Request>({
    message: 'GET_NOTE_FROM_DICTIONARY_PAGE',
    data: { lang, selectors },
  })
}

export const getNoteFromDictionaryPageHandler = async (
  port: IPortReceiver,
  callback: (selectors: INoteSelectors) => Omit<INote, 'id'>,
) => {
  port.onMessage<Request>((request) => {
    if (request.message === 'GET_NOTE_FROM_DICTIONARY_PAGE') {
      const newNote = callback(request.data.selectors)

      port.postMessage<Response>({
        message: 'GET_NOTE_FROM_DICTIONARY_RESULT',
        data: newNote,
      })
    }
  })
}

export const getNoteFromDictionaryPageResult = async (
  port: IPortEmitter,
  callback: (response: Response['data']) => void,
) => {
  port.onMessage<Response>((response) => {
    if (response.message === 'GET_NOTE_FROM_DICTIONARY_RESULT') {
      callback(response.data)
    }
  })
}
