import { chromeRuntime } from './chromeRuntime'
import { IRuntime } from './types'

export type { IRuntime } from './types'
export const runtime: IRuntime = chromeRuntime
