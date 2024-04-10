import { IConnectionProps, IPortEmitter, IPortReceiver } from './types'

export class ChromePortEmitter implements IPortEmitter {
  name: string

  private browserPort: chrome.runtime.Port | null

  constructor(readonly connectionProps: IConnectionProps) {
    this.browserPort = this.connect()
    this.name = this.browserPort?.name ?? ''
  }

  private connect() {
    const browserPort = chrome.tabs.connect(
      this.connectionProps.tabId,
      this.connectionProps.connectInfo,
    )

    browserPort.onDisconnect.addListener(() => {
      this.browserPort = null
    })

    return browserPort
  }

  postMessage<T>(msg: T) {
    if (!this.browserPort) {
      this.browserPort = this.connect()
    }

    this.browserPort.postMessage(msg)
  }

  onMessage<T>(callback: (msg: T) => void) {
    if (!this.browserPort) {
      this.browserPort = this.connect()
    }

    this.browserPort.onMessage.addListener((msg) => {
      callback(msg)
    })
  }

  onDisconnect(callback: () => void) {
    this.browserPort?.onDisconnect.addListener(() => {
      callback()
    })
  }
}

export class ChromePortReceiver implements IPortReceiver {
  name: string
  private browserPort: chrome.runtime.Port | null

  constructor(receiver: chrome.runtime.Port) {
    this.name = receiver.name
    this.browserPort = receiver

    this.browserPort.onDisconnect.addListener(() => {
      this.browserPort = null
    })
  }

  postMessage<T>(msg: T) {
    this.browserPort?.postMessage(msg)
  }

  onMessage<T>(callback: (msg: T) => void) {
    this.browserPort?.onMessage.addListener((msg) => {
      callback(msg)
    })
  }

  onDisconnect(callback: () => void) {
    this.browserPort?.onDisconnect.addListener(() => {
      callback()
    })
  }
}
