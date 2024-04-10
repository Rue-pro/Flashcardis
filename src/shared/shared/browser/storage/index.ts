import { chromeStorage } from './chromeStorage'
import { IStorage } from './types'

export type { IStorage, TOnChangeListenerProps } from './types'
export const storage: IStorage = chromeStorage
