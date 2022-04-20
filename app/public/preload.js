const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
    getCate: () => ipcRenderer.invoke('getCate'),
    getBook: (arg) => ipcRenderer.invoke('getBook',arg).then((res) => {return res}),
    printme: (txt) => ipcRenderer.invoke('printme',txt).then((res) => {
         return res;
    }),
})