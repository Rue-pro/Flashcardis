import { INote, INoteSelectors } from '@shared/entities/note'

export const getNotesFields = (config: INoteSelectors): Omit<INote, 'id'> => ({
  text: getTextBySelector(config, 'text'),
  transcription: getTextBySelector(config, 'transcription'),
  context: getTextBySelector(config, 'context'),
  translation: getTextBySelector(config, 'translation'),
})

function getElementTextBySelector(selector: string): string {
  const element = document.querySelector<HTMLElement>(selector)

  if (element?.tagName === 'TEXTAREA' || element?.tagName === 'INPUT') {
    return (element as HTMLTextAreaElement).value
  }

  return element?.innerText ?? ''
}

function getTextBySelector(
  selectors: INoteSelectors,
  field: keyof INoteSelectors,
): string {
  const selector = selectors[field]
  if (!selector) return ''

  return getElementTextBySelector(selector)
}
