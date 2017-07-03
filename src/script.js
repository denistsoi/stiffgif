<<<<<<< HEAD
const Vue = require('vue/dist/vue');

// Init App
var app = new Vue({
  el: '#app',
  data: { 
    searchInput: "",
    selection: "",
    giphy: [],
    popkey: [],
    scope: 'trending',
    loading: false,
    popkeyIsDone: false,
    giphyIsDone: false,
    online: false
  },
  methods: {
    copyToClipboard: function(ev) {
      var source = ev.target.src.toString();      
      this.$set('selection', source);
      clipboard.writeText(source);
    },
    search: function(ev) {
      var query = ev.target.value.toString().trim() || this.$data.searchInput;
      var length = self.giphy ? self.giphy.length : 0;
      if (!query) return;
      this.$set('scope', 'search');
      this.$set('giphyIsDone', true);
      this.$set('popkeyIsDone', true);

      ipc.send('search', query)
    },
    fetch: function(ev) {
      var self = this;

      if (self.loading) return;
      
      self.loading = true;
      
      if (self.scope === 'search') {
        ipc.send('fetch:giphy',  { scope: self.scope, query: self.searchInput, offset: self.giphy.length });        
        ipc.send('fetch:popkey', { scope: self.scope, query: self.searchInput, offset: self.giphy.length });        
      } else if (self.scope === 'trending') {
        ipc.send('fetch:giphy', { scope: self.scope, offset: self.giphy.length });
        ipc.send('fetch:popkey', { scope: self.scope, offset: self.giphy.length });
      }

    }
  },
  ready: function() {
    var self = this;

    document.querySelector('input').focus();
    self.fetch();

    window.addEventListener('scroll', function(ev) {
      var scrollYTrigger = 500;
      var scrollY = document.body.scrollTop + window.innerHeight + scrollYTrigger;
      if (document.body.scrollHeight < scrollY) {
        setTimeout(self.fetch(), 2000);
      }
    });
  },
});


var updateOnlineStatus = function() {
  ipc.send('online-status-changed', navigator.onLine ? 'online' : 'offline');
};

window.addEventListener('online', updateOnlineStatus);
window.addEventListener('offline', updateOnlineStatus);

updateOnlineStatus();

ipc.on('online', function(event, bool) {
  if (bool) {
    app.$set('online', true);
  } else {
    app.$set('online', false);
  }
});

ipc.on('search:giphy', function(event, response) {
  var gifs = JSON.parse(response).data;
  app.$set('giphy', gifs);
});

ipc.on('search:popkey', function(event, response) {
  var gifs = JSON.parse(response);
  app.$set('popkey', gifs);
});

ipc.on('fetched:giphy', function(event, response) {
  var gifs = JSON.parse(response).data;
  
  if (!gifs.length) {
    app.$set('giphyIsDone', true);
    return;
  }

  gifs.forEach(function(item) {
    app.$data.giphy.push(item);
  });
  app.$set('loading', false);
});

ipc.on('fetched:popkey', function(event, response) {
  var gifs = JSON.parse(response);
  
  if (!gifs.length) {
    app.$set('popkeyIsDone', true);
    return;
  }

  gifs.forEach(function(item) {
    app.$data.popkey.push(item);
  });
  app.$set('loading', false);
});
=======
var Vue = require('vue');
import App from './App.vue';

new Vue({
  ...App
}).$mount('#app');
>>>>>>> ADD: commit work;
