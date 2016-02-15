var request = require('request');

var POPKEY_TRENDING_URL = {
  url: 'https://api.popkey.co/v2/media/search?q=bunnies',
  headers: {
    Authorization: process.env.POPKEY_API_KEY
  }
};

request(POPKEY_TRENDING_URL, function(err, resp, body) {
  console.log(body);
});