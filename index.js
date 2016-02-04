var menubar = require('menubar');
var mb = menubar({ dir: __dirname + '/app' });

var ipc = require('electron').ipcMain;
var Menu = require('menu');

mb.app.on('will-quit', function () {
  // globalShortcut.unregisterAll()
})

// when receive the abort message, close the app
ipc.on('abort', function () {
  mb.hideWindow()
});

mb.on('ready', function ready () {
  // mb.showWindow()
  // mb.window.openDevTools();
});

/**
 * Part One
 */

// ipc.on('search', function(ev, arg) {
//   console.log(arg);
// });


/**
 * Part Two
 */

// var request = require('request');
// var GIPHY_API_URL = 'http://api.giphy.com/v1/gifs/';
// var GIPHY_PUBLIC_API_KEY = 'dc6zaTOxFJmzC';
// var GIPHY_API_KEY = GIPHY_PUBLIC_API_KEY;

// ipc.on('search', function(ev, arg) {
//   var query = encodeURIComponent(arg);
//   console.log(query);
  
//   var url = GIPHY_API_URL + 'search?q=' + query + '&api_key=' + GIPHY_API_KEY;
  
//   request(url, function(err, response, body) {
//     console.log(err, response, body)
//   });
// });


/**
 * Part Three: Render callback to the window.webContents
 */

var request = require('request');
var GIPHY_API_URL = 'http://api.giphy.com/v1/gifs/';
var GIPHY_PUBLIC_API_KEY = 'dc6zaTOxFJmzC';
var GIPHY_API_KEY = GIPHY_PUBLIC_API_KEY;

ipc.on('search', function(ev, arg) {
  var query = encodeURIComponent(arg);

  var url = GIPHY_API_URL + 'search?q=' + query + '&api_key=' + GIPHY_API_KEY;
  
  console.log(url);
  request(url, function(err, response, body) {
    mb.window.webContents.send('giphy', body);
  });
});