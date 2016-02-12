var Vue = require('vue');
var ipc = require('electron').ipcRenderer;
var clipboard = require('electron').clipboard;

// Init App
var app = new Vue({
  el: '#app',
  data: { 
    searchInput: "",
    selection: "",
    giphy: [],
    pageSize: 0,
    toShow: 0
  },
  methods: {
    copyToClipboard: function(ev) {
      var source = ev.target.src.toString();
      app.$set('selection', source);
      clipboard.writeText(source);
    },
    search: function(ev) {
      var arg = ev.target.value.toString() || this.$data.searchInput;
      ipc.send('search', arg);
    }
  },
  ready: function() {
    ipc.send('trending');
  }
});


ipc.on('giphy:trending', function(event, response) {
  var gifs = JSON.parse(response).data;
  app.$set('giphy', gifs);
});

ipc.on('giphy:search', function(event, response) {
  var gifs = JSON.parse(response).data;
  app.$set('giphy', gifs);
});