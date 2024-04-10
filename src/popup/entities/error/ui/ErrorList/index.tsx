import { useStore } from '@nanostores/preact'

import { $errors } from '@shared/entities/error'

import { ErrorCard } from '../ErrorCard'

export const ErrorList = () => {
  const errors = useStore($errors)

  return (
    <ul>
      <li>
        {errors.map((error) => (
          <ErrorCard error={error} />
        ))}
      </li>
    </ul>
  )
}
