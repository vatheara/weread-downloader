const path = require('path');
const axios = require('axios');

const { app, BrowserWindow ,ipcMain } = require('electron');
const isDev = require('electron-is-dev');

function createWindow() {
  // Create the browser window.
  const win = new BrowserWindow({
    width: 1000,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true,
    },
  });
  
  
  
  // and load the index.html of the app.
  // win.loadFile("index.html");The
  win.loadURL(
    isDev
    ? 'http://localhost:3000'
    : `file://${path.join(__dirname, '../build/index.html')}`
    );
    // Open the DevTools.
    if (isDev) {
      win.webContents.openDevTools({ mode: 'detach' });
    }
  }
  
const  handleTest = async () =>{
      let data = await axios.get('https://api.weread.asia/webapi/Initialize').then(res=> {
          return res.data;
      })
      return data;
    }

const fetchbook = async (subjectID , a, b) => {
  let page = a || 1;
  let pageSize = b || 5;
    let data = await axios.get(`https://api.weread.asia/webapi/Initialize/assort?id=${subjectID}&page=${page}&pageSize=${pageSize}`).then(res => {
        return res.data
    })
}

const printme = (txt) => {
  console.log(txt);
}
    
// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  ipcMain.handle('getCate',handleTest);
  ipcMain.handle('getBook',fetchbook);
  ipcMain.handle('printme',printme);
  createWindow();
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});