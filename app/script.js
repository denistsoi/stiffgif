var Vue = require('vue');
var ipc = require('electron').ipcRenderer;
var clipboard = require('electron').clipboard;

// Init App
var app = new Vue({
  el: '#app',
  data: { 
    searchInput: '',
    selection: '',
    giphy: [],
    imgur: [],
    popkey: [],
    trending: [],
    loading: true,
    scope: ''
  },
  methods: {
    toggleSelection: function(ev) {
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
    this.$set('scope', 'trending');
    ipc.send('trending');
  }
});

// only accept giphy and popkey
ipc.on('trending', function(event, arg) {
  var gifs = JSON.parse(arg.body);
  if (arg.source.indexOf('giphy') > -1) { 
    app.$set('giphy', gifs.data);
  } else if (arg.source.indexOf('popkey') > -1) {
    app.$set('popkey', gifs.slice(0,25));
  } 
});