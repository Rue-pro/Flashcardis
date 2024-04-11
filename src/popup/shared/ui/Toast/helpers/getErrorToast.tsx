import { browser } from '@shared/shared/browser'
import { TBaseError } from '@shared/shared/libs/operationResult'

import { ErrorDetails } from '../../ErrorDetails'
import { IToast } from '../model/types'

export const getErrorToast = (error: TBaseError): Omit<IToast, 'id'> => ({
  type: 'error',
  title: browser.i18n.getMessage(error.type),
  details: (
    <ErrorDetails
      type={browser.i18n.getMessage(error.type)}
      content={error.error?.toString() ?? ''}
    />
  ),
})
