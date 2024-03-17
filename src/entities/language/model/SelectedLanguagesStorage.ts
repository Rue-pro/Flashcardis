import { AbstractStorage } from '@entities/storage'

import { TLanguageCode } from '.'

export const SelectedLanguagesStorage = new AbstractStorage<TLanguageCode[]>(
  'selected_languages',
  [],
)
