import { chromeBrowser } from './chrome'
import type { IBrowser } from './types'

export const browser: IBrowser = chromeBrowser

export type { TTab, TOnChangeListener } from './types'
export * from './port'
