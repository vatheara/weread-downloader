const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
    getCate: () => ipcRenderer.invoke('getCate')
})