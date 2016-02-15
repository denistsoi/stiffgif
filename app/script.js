var Vue = require('vue');
var ipc = require('electron').ipcRenderer;
var clipboard = require('electron').clipboard;
var ScrollWatch = require('./ScrollWatch-1.1.0.min');

// Init App
var app = new Vue({
  el: '#app',
  data: { 
    searchInput: "",
    selection: "",
    giphy: [],
    scope: null,
    loading: false
  },
  methods: {
    copyToClipboard: function(ev) {
      var source = ev.target.src.toString();
      
      this.$set('selection', source);

      clipboard.writeText(source);
    },
    search: function(ev) {
      var query = ev.target.value.toString().trim() || this.$data.searchInput;
      if (!query) return;
      ipc.send('search', query);
      this.$set('scope', 'search');
    },
    fetch: function(ev) {
      var self = this;

      if (self.scope === 'search') {
        ipc.send('fetch', { scope: self.scope, query: this.$data.searchInput, offset: self.giphy.length })
      } else if (self.scope === 'trending') {
        ipc.send('fetch', { scope: self.scope, offset: self.giphy.length })
      }
    }
  },
  ready: function() {
    var self = this;
    this.$set('scope', 'trending');

    document.querySelector('input').focus();

    var addElements = function() {
      if (!self.loading) { 
        self.$set('loading', true);  
        if (self.scope === 'search') {
          return ipc.send('fetch', { scope: self.scope, query: self.$data.searchInput, offset: self.giphy.length })
        } 
        ipc.send('fetch', { scope: self.scope, offset: self.giphy.length });
      };
    }

    var swInstance = new ScrollWatch({ 
      watch: "footer",
      infiniteScroll: true,
      infiniteOffset: 50,
      scrollDebounce: 3000,
      scrollThrottle: 3000,
      debounce: false,
      onInfiniteYInView: addElements
    });
  }
});


ipc.on('giphy:trending', function(event, response) {
  var gifs = JSON.parse(response).data;
  app.$set('giphy', gifs);
  app.$set('loading', false);
});

ipc.on('giphy:search', function(event, response) {
  var gifs = JSON.parse(response).data;
  app.$set('giphy', gifs);
  app.$set('loading', false);
});

ipc.on('fetched', function(event, response) {
  var gifs = JSON.parse(response).data;

  gifs.forEach(function(item) {
    app.$data.giphy.push(item);
  });
  app.$set('loading', false);
});