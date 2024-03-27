import { chromeBrowser } from './chrome'
import { IBrowser } from './types'

export const browser: IBrowser = chromeBrowser
export type { ITab } from './types'
export * from './port'
