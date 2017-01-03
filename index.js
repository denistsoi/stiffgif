const { app, BrowserWindow, ipcMain, Tray, nativeImage } = require('electron')
const path = require('path')

// create window
let win;
let tray;

const windowSize = {
  width: 300,
  height: 400
}

app.on('ready', ()=> {
  // attach icon to tray
  let icon = nativeImage.createFromPath(`${__dirname}/icon@5x.png`)
  tray = new Tray(icon)


  win = new BrowserWindow(windowSize)
  win.loadURL(`file://${__dirname}/src/index.html`)

})

// const toggleWindow = () => {
//   if (win.isVisible()) {
//     win.hide()
//   } else {
//     showWindow()
//   }
// }

// const showWindow = () => {
// }
