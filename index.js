// Module Dependencies
var request = require('request');
var menubar = require('menubar');

// Electron Dependencies
var ipc  = require('electron').ipcMain;
var Menu = require('electron').Menu;
var BrowserWindow = require('electron').BrowserWindow;

var mb = menubar({ dir: __dirname + '/app', preload: true });

mb.app.on('will-quit', function () {
  // globalShortcut.unregisterAll()
})

mb.on('ready', function ready () {
  // mb.showWindow()
});

ipc.on('online-status-changed', function(event, status) {
  if (status === 'offline') {
    return mb.window.webContents.send('online', false);
  }
  
  mb.window.webContents.send('online', true);
});

mb.on('after-create-window', function() {
  // mb.window.openDevTools();
});

/**
 * API End Points
 */
var GIPHY_API_URL = 'http://api.giphy.com/v1/gifs/';
var GIPHY_PUBLIC_API_KEY = 'dc6zaTOxFJmzC';
var GIPHY_API_KEY = GIPHY_PUBLIC_API_KEY;
var GIPHY_TRENDING_URL = 'http://api.giphy.com/v1/gifs/trending?api_key=dc6zaTOxFJmzC';

/**
 * Search 
 */

ipc.on('search', function(ev, queryString) {
  if (!queryString) throw new Error('queryString must be defined', queryString);
  
  var query = 'search?q=' + encodeURIComponent(queryString);
  
  var giphy_url = GIPHY_API_URL + query + '&limit=6' + '&api_key=' + GIPHY_API_KEY;
  var popkey_url = {
    url: 'https://api.popkey.co/v2/media/' + query + '&page_size=6&page=1',
    headers: {
      Authorization: process.env.POPKEY_API_KEY
    }
  }

  request(giphy_url, function(err, response, body) {
    mb.window.webContents.send('search:giphy', body);
  });

  request(popkey_url, function(err, response, body) {
    mb.window.webContents.send('search:popkey', body);
  });
});


/**
 * Fetch
 */

ipc.on('fetch:giphy', function(ev, arg) {
  var query = arg.query ? 'search?q=' + encodeURIComponent(arg.query) : '';
  
  if (arg.scope === 'search') {
    var giphy_url = GIPHY_API_URL + query  + '&offset=' + arg.offset + '&limit=6' + '&api_key=' + GIPHY_API_KEY;
  } else if (arg.scope === 'trending') {
    var giphy_url = GIPHY_TRENDING_URL + '&offset=' + arg.offset + '&limit=6';
  }

  request(giphy_url, function(err, response, body) {
    mb.window.webContents.send('fetched:giphy', body);
  });
});

ipc.on('fetch:popkey', function(ev, arg) {
  var query = arg.query ? 'search?q=' + encodeURIComponent(arg.query) : '';
  
  if (arg.scope === 'search') {
    var popkey_url = {
      url: 'https://api.popkey.co/v2/media/' + query + '&page_size=6&page=' + (1+(arg.offset / 6)),
      headers: {
        Authorization: process.env.POPKEY_API_KEY || 'Basic ZGVza3RvcDplMjFkZDA3ZDlkNTlkYjEwYmJhOGI2ZjI3YmJjNzU5YmQzY2UwNTFiZjhkYmIwNmU1M2Y2MDg1Y2YxN2U5MDhk'
      }
    }
  } else if (arg.scope === 'trending') {
    var popkey_url = {
      url: 'https://api.popkey.co/v2/media/curated?page_size=6&page=' + (1+(arg.offset / 6)),
      headers: {
        Authorization: process.env.POPKEY_API_KEY || 'Basic ZGVza3RvcDplMjFkZDA3ZDlkNTlkYjEwYmJhOGI2ZjI3YmJjNzU5YmQzY2UwNTFiZjhkYmIwNmU1M2Y2MDg1Y2YxN2U5MDhk'
      }
    };
  }

  request(popkey_url, function(err, response, body) {
    mb.window.webContents.send('fetched:popkey', body);
  });
});