import { useRef } from 'preact/hooks'

interface Props {
  reset: () => void
}

export const useResetAfterDelay = ({ reset }: Props) => {
  const timeout = useRef<NodeJS.Timeout>()

  const resetAfterDelay = () => {
    clearTimeout(timeout.current)
    timeout.current = setTimeout(() => {
      reset()
    }, 1000)
  }

  return resetAfterDelay
}
