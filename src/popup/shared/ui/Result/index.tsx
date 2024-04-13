import { TResult } from '@shared/shared/libs/operationResult'

import { Alert } from '../Alert'

export const Result = ({ result }: { result: TResult | null }) => {
  if (!result) return null
  return (
    <>
      {result.data && (
        <Alert
          alert={{
            title: result.data,
            type: 'success',
          }}
        />
      )}
      {result.error && (
        <Alert
          alert={{
            title: result.error.type,
            details: result.error.error,
            type: 'error',
          }}
        />
      )}
    </>
  )
}
