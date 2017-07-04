require('dotenv').load()

const GIPHY_PUBLIC_API_KEY = 'dc6zaTOxFJmzC';
const GIPHY_API_KEY = process.env.GIPHY_KEY || GIPHY_PUBLIC_API_KEY;
const GIPHY_API_URL = 'http://api.giphy.com/v1/gifs/';
const GIPHY_TRENDING_URL = 'http://api.giphy.com/v1/gifs/trending?api_key=dc6zaTOxFJmzC';

const request = require('request');
const ipcMain = require('electron').ipcMain;

/**
 * @class Routes
 * @param window BrowserWindow object from electron main 
 */
class Routes {
  constructor(window) {
    // fetch giphy
    ipcMain.on('fetch:giphy', function(ev, arg) {
      const giphy_url = `${GIPHY_TRENDING_URL}&offset=${arg.offset}&limit=6`;

      request(giphy_url, function(err, response, body) {
        window.webContents.send('fetched:giphy', body);
      });
    });

    // search giphy
    ipcMain.on('search:giphy', function(ev, args) {
      let queryString = args.query;
      if (!queryString) throw new Error('queryString must be defined', queryString);

      let offset = args.offset;
      let query = 'search?q=' + encodeURIComponent(queryString);
      
      let giphy_url = `${GIPHY_API_URL}${query}&offset=${offset}&limit=6&api_key=${GIPHY_API_KEY}`;

      request(giphy_url, function(err, response, body) {
        window.webContents.send('searched:giphy', body);
      });
    });    
  }
}

exports = module.exports = Routes;

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