import { INote } from '@shared/entities/note'

import { IPortEmitter, IPortReceiver } from '@shared/shared/browser/port'

interface Request {
  message: 'FILL_FORM'
  data: INote
}

interface Response {
  message: 'FILL_FORM_RESULT'
  data: INote
}

export const autoFillForm = (port: IPortEmitter, note: INote) => {
  port.postMessage<Request>({ message: 'FILL_FORM', data: note })
}

export const autoFillFormHandler = (
  port: IPortReceiver,
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
  port: IPortEmitter,
  callback: (response: Response['data']) => void,
) => {
  port.onMessage<Response>((response) => {
    if (response.message === 'FILL_FORM_RESULT') {
      callback(response.data)
    }
  })
}
