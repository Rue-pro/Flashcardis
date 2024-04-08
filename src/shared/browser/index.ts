import { chromeBrowser } from './chrome'
import type { IBrowser } from './types'

export const browser: IBrowser = chromeBrowser

export type { TTab, TOnChangeListenerProps } from './types'
export * from './port'
