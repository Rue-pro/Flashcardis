import { browser } from '@shared/browser'
import { TBaseError } from '@shared/libs/operationResult'

import { useToast } from '.'
import { ErrorDetails } from '../ErrorDetails'

export const useAddErrorToast = () => {
  const { addToast } = useToast()

  const addErrorToast = (error: TBaseError) => {
    addToast({
      type: 'error',
      title: browser.i18n.getMessage(error.type),
      details: (
        <ErrorDetails
          type={browser.i18n.getMessage(error.type)}
          content={error.error?.toString() ?? ''}
        />
      ),
    })
  }

  return { addErrorToast }
}
