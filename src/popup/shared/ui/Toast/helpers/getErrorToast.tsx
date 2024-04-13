import { TBaseError } from '@shared/shared/libs/operationResult'

import { ErrorDetails } from '../../ErrorDetails'
import { IToast } from '../model/types'

export const getErrorToast = (error: TBaseError): Omit<IToast, 'id'> => ({
  type: 'error',
  title: error.type,
  details: (
    <ErrorDetails type={error.type} content={error.error?.toString() ?? ''} />
  ),
})
