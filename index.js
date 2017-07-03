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

// This method is called once Electron is ready to run our code
// It is effectively the main method of our Electron app
app.on('ready', () => {
  require('vue-devtools').install();

  // Setup the menubar with an icon
  let icon = nativeImage.createFromPath('./icon@5x.png')
  tray = new Tray(icon)

  win = new BrowserWindow(windowSize)
  win.loadURL(`file://${__dirname}/src/index.html`)

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
    height: 350,
    show: false,
    frame: false,
    resizable: false,
  })

  // Tell the popup window to load our index.html file
  window.loadURL(`file://${__dirname}/public/index.html`)

  // Only close the window on blur if dev tools isn't opened
  window.on('blur', () => {
    if(!window.webContents.isDevToolsOpened()) {
      window.hide()
    }
  })
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

// var GIPHY_API_URL = 'http://api.giphy.com/v1/gifs/';
// var GIPHY_PUBLIC_API_KEY = 'dc6zaTOxFJmzC';
// var GIPHY_API_KEY = GIPHY_PUBLIC_API_KEY;
// var GIPHY_TRENDING_URL = 'http://api.giphy.com/v1/gifs/trending?api_key=dc6zaTOxFJmzC';

// /**
//  * Search 
//  */

// // ipcMain.on('search', function(ev, queryString) {
// //   if (!queryString) throw new Error('queryString must be defined', queryString);
  
// //   var query = 'search?q=' + encodeURIComponent(queryString);
  
// //   var giphy_url = GIPHY_API_URL + query + '&limit=6' + '&api_key=' + GIPHY_API_KEY;
// //   var popkey_url = {
// //     url: 'https://api.popkey.co/v2/media/' + query + '&page_size=6&page=1',
// //     headers: {
// //       Authorization: process.env.POPKEY_API_KEY
// //     }
// //   }

// //   request(giphy_url, function(err, response, body) {
// //     mb.window.webContents.send('search:giphy', body);
// //   });

// //   request(popkey_url, function(err, response, body) {
// //     mb.window.webContents.send('search:popkey', body);
// //   });
// // });


// /**
//  * Fetch
//  */

// ipcMain.on('fetch:giphy', function(ev, arg) {
//   var query = arg.query ? 'search?q=' + encodeURIComponent(arg.query) : '';
//   if (arg.scope === 'search') {
//     var giphy_url = GIPHY_API_URL + query  + '&offset=' + arg.offset + '&limit=6' + '&api_key=' + GIPHY_API_KEY;
//   } else if (arg.scope === 'trending') {
//     var giphy_url = GIPHY_TRENDING_URL + '&offset=' + arg.offset + '&limit=6';
//   }

//   request(giphy_url, function(err, response, body) {

//     window.webContents.send('fetched:giphy', body);
//   });
// });

// // ipcMain.on('fetch:popkey', function(ev, arg) {
// //   var query = arg.query ? 'search?q=' + encodeURIComponent(arg.query) : '';
  
// //   if (arg.scope === 'search') {
// //     var popkey_url = {
// //       url: 'https://api.popkey.co/v2/media/' + query + '&page_size=6&page=' + (1+(arg.offset / 6)),
// //       headers: {
// //         Authorization: process.env.POPKEY_API_KEY || 'Basic ZGVza3RvcDplMjFkZDA3ZDlkNTlkYjEwYmJhOGI2ZjI3YmJjNzU5YmQzY2UwNTFiZjhkYmIwNmU1M2Y2MDg1Y2YxN2U5MDhk'
// //       }
// //     }
// //   } else if (arg.scope === 'trending') {
// //     var popkey_url = {
// //       url: 'https://api.popkey.co/v2/media/curated?page_size=6&page=' + (1+(arg.offset / 6)),
// //       headers: {
// //         Authorization: process.env.POPKEY_API_KEY || 'Basic ZGVza3RvcDplMjFkZDA3ZDlkNTlkYjEwYmJhOGI2ZjI3YmJjNzU5YmQzY2UwNTFiZjhkYmIwNmU1M2Y2MDg1Y2YxN2U5MDhk'
// //       }
// //     };
// //   }

// //   request(popkey_url, function(err, response, body) {
// //     mb.window.webContents.send('fetched:popkey', body);
// //   });
// // });