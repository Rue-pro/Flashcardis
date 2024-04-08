import { TBaseError } from '@shared/libs/operationResult'

interface Props {
  error: TBaseError
}

export const ErrorCard = ({ error }: Props) => {
  return (
    <div>
      Error {error.type} {error.error}
    </div>
  )
}
