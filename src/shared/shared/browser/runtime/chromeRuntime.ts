import { PortReceiver } from '../port'
import { IRuntime } from './types'

export const chromeRuntime: IRuntime = {
  onConnect: {
    addListener: (callback) => {
      chrome.runtime.onConnect.addListener((port) => {
        callback(new PortReceiver(port))
      })
    },
  },
}
