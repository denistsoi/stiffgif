var request = require('request');

var POPKEY_TRENDING_URL = {
  url: 'https://api.popkey.co/v2/media/search?q=sports',
  header: {
    'Authorization': "Basic ZGVtbzplYTdiNjZmYjVlNjZjNjJkNmNmYTQ5ZmJlMGYyN2UwMDJjMjUxNGVlZDljNzVlYTlmNjVlOWQ3NTk4Y2I5YTkw"
  }
};

request(POPKEY_TRENDING_URL, function(err, resp, body) {
  console.log(body);
});