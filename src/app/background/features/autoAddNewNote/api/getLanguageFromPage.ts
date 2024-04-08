import { TLanguageCode } from '@entities/language'

import { PortEmitter, PortReceiver } from '@shared/browser'

interface Request {
  message: 'GET_LANGUAGE_FROM_PAGE'
}

interface Response {
  message: 'GET_LANGUAGE_FROM_PAGE_RESULT'
  data: TLanguageCode
}

export const getLanguageFromPage = async (port: PortEmitter) => {
  port.postMessage<Request>({
    message: 'GET_LANGUAGE_FROM_PAGE',
  })
}

export const getLanguageFromPageHandler = async (
  port: PortReceiver,
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
  port: PortEmitter,
  callback: (response: Response['data']) => void,
) => {
  port.onMessage<Response>((response) => {
    if (response.message === 'GET_LANGUAGE_FROM_PAGE_RESULT') {
      callback(response.data)
    }
  })
}
