import { browser as baseBrowser } from '@shared/shared/browser'

import { contextMenus } from './contextMenus'

export const browser = {
  contextMenus,

  ...baseBrowser,
}
