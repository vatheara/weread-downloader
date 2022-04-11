const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
    getCate: () => ipcRenderer.invoke('getCate'),
    getBook: () => ipcRenderer.invoke('getBook'),
    printme: (txt) => ipcRenderer.invoke('printme')
})