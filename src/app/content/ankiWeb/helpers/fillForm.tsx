import { INote } from '@entities/note'

export function fillForm(note: INote) {
  const ankiFaceElement = document.querySelector<HTMLDivElement>(
    'body > div > main > form > div:nth-child(1) > div > div',
  )
  const ankiBackElement = document.querySelector<HTMLDivElement>(
    'body > div > main > form > div:nth-child(2) > div > div',
  )

  if (ankiFaceElement) {
    ankiFaceElement.innerText = getFrontText(ankiFaceElement.innerText, note)
    ankiFaceElement.dispatchEvent(new Event('input', { bubbles: true }))
  }

  if (ankiBackElement) {
    ankiBackElement.innerText = getBackText(ankiBackElement.innerText, note)
    ankiBackElement.dispatchEvent(new Event('input', { bubbles: true }))
  }
}

function getFrontText(initialText: string, note: INote) {
  return (
    initialText +
    ' ' +
    note.text +
    (note.transcription ? '\n' + note.transcription : '') +
    (note.context ? '\n' + note.context : '')
  )
}

function getBackText(initialText: string, note: INote) {
  const blankedHintText = getBlankedHintText(note.text)
  return (
    initialText +
    ' ' +
    (note.translation ? note.translation : '') +
    (blankedHintText ? '\n' + blankedHintText : '')
  )
}

function getBlankedHintText(text: string) {
  return text
    .split(' ')
    .map(
      (word) =>
        word[0] +
        Array(word.length - 1)
          .fill(' _')
          .join(''),
    )
    .join(' ')
}
