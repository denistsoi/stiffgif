var menubar = require('menubar');
var mb = menubar({ dir: __dirname + '/app' });

var ipc = require('electron').ipcMain;
var Menu = require('menu');

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

var GIPHY_TRENDING_URL = {
  url: 'http://api.giphy.com/v1/gifs/trending?api_key=dc6zaTOxFJmzC'
}

var POPKEY_TRENDING_URL = {
  url: 'https://api.popkey.co/v2/media/curated',
  header: {
    'Authorization': "Basic ZGVtbzplYTdiNjZmYjVlNjZjNjJkNmNmYTQ5ZmJlMGYyN2UwMDJjMjUxNGVlZDljNzVlYTlmNjVlOWQ3NTk4Y2I5YTkw"
  }
};

var URLS = [POPKEY_TRENDING_URL, GIPHY_TRENDING_URL];

// Trending
ipc.on('trending', function(ev) {
  URLS.forEach(function(source) {
    request(source, function(err, response, body) {
      mb.window.webContents.send('trending', { source: source.url, body: body });
    });
  });
});