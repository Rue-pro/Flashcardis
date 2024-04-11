import { useState } from 'preact/hooks'

import { browser } from '@popup/shared/browser'
import { useResetAfterDelay } from '@popup/shared/libs/useResetAfterDelay'

import { Button, Props as ButtonProps } from '../Button'
import { CopyIcon } from '../icons/CopyIcon'
import { DoneIcon } from '../icons/DoneIcon'

interface Props extends ButtonProps {
  text: string
}

export const CopyButton = ({ text, ...rest }: Props) => {
  const [isCopied, setIsCopied] = useState(false)
  const resetAfterDelay = useResetAfterDelay({
    reset: () => setIsCopied(false),
  })

  const onCopy = (text: string) => {
    navigator.clipboard.writeText(text)
    setIsCopied(true)
    resetAfterDelay()
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
