import { INote } from '@entities/note'

import { PortEmitter, PortReceiver } from '@shared/browser'

interface Request {
  message: 'FILL_FORM'
  data: INote
}

interface Response {
  message: 'FILL_FORM_RESULT'
  data: INote
}

export const autoFillForm = (port: PortEmitter, note: INote) => {
  port.postMessage<Request>({ message: 'FILL_FORM', data: note })
}

export const autoFillFormHandler = (
  port: PortReceiver,
  callback: (note: INote) => void,
) => {
  port.onMessage<Request>((request) => {
    if (request.message === 'FILL_FORM') {
      callback(request.data)

      port.postMessage<Response>({
        message: 'FILL_FORM_RESULT',
        data: request.data,
      })
    }
  })
}

export const autoFillFormResult = (
  port: PortEmitter,
  callback: (response: Response['data']) => void,
) => {
  port.onMessage<Response>((response) => {
    if (response.message === 'FILL_FORM_RESULT') {
      callback(response.data)
    }
  })
}
