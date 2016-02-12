// Module Dependencies
var request = require('request');
var menubar = require('menubar');

// Electron Dependencies
var ipc  = require('electron').ipcMain;
var Menu = require('electron').Menu;

var mb = menubar({ dir: __dirname + '/app' });

mb.app.on('will-quit', function () {
  // globalShortcut.unregisterAll()
})

mb.on('ready', function ready () {
  // mb.showWindow()
});

mb.on('after-create-window', function() {
  // mb.window.openDevTools();
});


/**
 * Trending URLS
 */

var GIPHY_TRENDING_URL = 'http://api.giphy.com/v1/gifs/trending?api_key=dc6zaTOxFJmzC'

ipc.on('trending', function(ev) {
  var url = GIPHY_TRENDING_URL + '&limit=20';
  request(url, function(err, response, body) {
    mb.window.webContents.send('giphy:trending', body);
  });
});

/**
 * Search 
 */

var GIPHY_API_URL = 'http://api.giphy.com/v1/gifs/';
var GIPHY_PUBLIC_API_KEY = 'dc6zaTOxFJmzC';
var GIPHY_API_KEY = GIPHY_PUBLIC_API_KEY;

/**
 * GIPHY
 * q - search query term or phrase
 * limit - (optional) number of results to return, maximum 100. Default 25. 
 * offset - (optional) results offset, defaults to 0. 
 * rating - limit results to those rated (y,g, pg, pg-13 or r). 
 * fmt - (optional) return results in html or json format (useful for viewing responses as GIFs to debug/test)
 */

ipc.on('search', function(ev, queryString) {
  var query = 'search?q=' + encodeURIComponent(queryString) || '';
  var url = GIPHY_API_URL + query  + '&limit=20' + '&api_key=' + GIPHY_API_KEY;

  request(url, function(err, response, body) {
    mb.window.webContents.send('giphy:search', body);
  });
});