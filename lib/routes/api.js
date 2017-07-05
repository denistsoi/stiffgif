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