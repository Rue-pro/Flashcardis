import { Storage } from '@entities/storage'

import { TLanguageCode } from '.'

export const SelectedLanguagesStorage = new Storage<TLanguageCode[]>(
  'selected_languages',
  [],
)
