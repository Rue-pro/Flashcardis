import { TLanguageCode } from '@shared/entities/language'

import { IPortEmitter, IPortReceiver } from '@shared/shared/browser/port'

interface Request {
  message: 'GET_LANGUAGE_FROM_PAGE'
}

interface Response {
  message: 'GET_LANGUAGE_FROM_PAGE_RESULT'
  data: TLanguageCode
}

export const getLanguageFromPage = async (port: IPortEmitter) => {
  port.postMessage<Request>({
    message: 'GET_LANGUAGE_FROM_PAGE',
  })
}

export const getLanguageFromPageHandler = async (
  port: IPortReceiver,
  callback: () => TLanguageCode,
) => {
  port.onMessage<Request>((request) => {
    if (request.message === 'GET_LANGUAGE_FROM_PAGE') {
      const language = callback()

      port.postMessage<Response>({
        message: 'GET_LANGUAGE_FROM_PAGE_RESULT',
        data: language,
      })
    }
  })
}

export const getLanguageFromPageResult = async (
  port: IPortEmitter,
  callback: (response: Response['data']) => void,
) => {
  port.onMessage<Response>((response) => {
    if (response.message === 'GET_LANGUAGE_FROM_PAGE_RESULT') {
      callback(response.data)
    }
  })
}
