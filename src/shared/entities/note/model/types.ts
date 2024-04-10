export interface INote {
  id: string
  text: string
  translation?: string
  context?: string
  transcription?: string
}

export interface INoteSelectors {
  text: string
  translation: string
  context: string
  transcription: string
}
