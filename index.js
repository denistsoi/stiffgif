const { 
  app, 
  BrowserWindow, 
  ipcMain, 
  nativeImage,
  Tray } = require('electron')

const path = require('path')
const showWindow = require('./lib/showWindow');

const assetsDir = path.join(__dirname, 'assets')

let tray = undefined
let window = undefined

// hide icon from dock
app.dock.hide();

// This method is called once Electron is ready to run our code
// It is effectively the main method of our Electron app
app.on('ready', () => {
  if (process.env.ENVIRONMENT === 'dev') {
    require('vue-devtools').install();
  }
  
  // Setup the menubar with an icon
  tray = new Tray(`${__dirname}/assets/icon@5x.png`);

  // Add a click handler so that when the user clicks on the menubar icon, it shows
  // our popup window
  tray.on('click', function(event) {
    toggleWindow()
    
    // Show devtools when command clicked
    if (window.isVisible() && process.defaultApp && event.metaKey) {
      window.openDevTools({mode: 'detach'})
    }
  })

  // Make the popup window for the menubar
  window = new BrowserWindow({
    width: 300,
    height: 400,
    show: false,
    frame: false,
    resizable: false,
  })

  // Tell the popup window to load our index.html file
  window.loadURL(`file://${__dirname}/public/index.html`)
  
  toggleWindow();

  // Only close the window on blur if dev tools isn't opened
  window.on('blur', () => {
    if(!window.webContents.isDevToolsOpened()) {
      window.hide()
    }
  })
  
  /**
   * require api
   */
  const Routes = require('./lib/routes/api');
  new Routes(window);
})

const toggleWindow = () => {
  if (window.isVisible()) {
    window.hide()
  } else {
    showWindow(window, tray)
  }
}

ipcMain.on('show-window', () => {
  showWindow(window, tray)
})

app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
});