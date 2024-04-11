import { IContextMenus } from './types'

export const chromeContextMenus: IContextMenus = {
  create: chrome.contextMenus.create,

  onClicked: chrome.contextMenus.onClicked,

  removeAll: chrome.contextMenus.removeAll,
}
