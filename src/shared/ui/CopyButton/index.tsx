import { useRef, useState } from 'preact/hooks'

import { browser } from '@shared/browser'

import { Button, Props as ButtonProps } from '../Button'
import { CopyIcon } from '../icons/CopyIcon'
import { DoneIcon } from '../icons/DoneIcon'

interface Props extends ButtonProps {
  text: string
}

export const CopyButton = ({ text, ...rest }: Props) => {
  const displayCopySuccessTimeout = useRef<NodeJS.Timeout>()
  const [isCopied, setIsCopied] = useState(false)

  const resetIsCopiedAfterDelay = () => {
    clearTimeout(displayCopySuccessTimeout.current)
    displayCopySuccessTimeout.current = setTimeout(() => {
      setIsCopied(false)
    }, 1000)
  }

  const onCopy = (text: string) => {
    navigator.clipboard.writeText(text)
    setIsCopied(true)
    resetIsCopiedAfterDelay()
  }

  return (
    <Button
      {...rest}
      startIcon={isCopied ? <DoneIcon /> : <CopyIcon />}
      aria-label={
        isCopied
          ? browser.i18n.getMessage('COPY_TEXT_COPIED')
          : browser.i18n.getMessage('COPY_TEXT', text)
      }
      onClick={() => onCopy(text)}
    />
  )
}
