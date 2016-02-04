var Vue = require('vue');
var ipc = require('electron').ipcRenderer;

var searchInput = "";

/**
 * Start
 */

// var app = new Vue({
//   el: '#app',
//   data: { 
//     searchInput: searchInput
//   }
// });


/**
 * Part One
 */

// var app = new Vue({
//   el: '#app',
//   data: { 
//     searchInput: searchInput
//   },
//   methods: {
//     search: function(ev) {
//       ipc.send('search', ev.target.value.toString());
//     }
//   }
// });



/**
 * Part Three
 */

// var app = new Vue({
//   el: '#app',
//   data: { 
//     searchInput: searchInput
//   },
//   methods: {
//     search: function(ev) {
//       ipc.send('search', ev.target.value.toString());
//     }
//   }
// });
// ipc.on('giphy', function(event, arg) {
//   console.log(arg);
// });





/**
 * Part Four
 */

// var app = new Vue({
//   el: '#app',
//   data: { 
//     searchInput: searchInput,
//     giphy: []
//   },
//   methods: {
//     search: function(ev) {
//       ipc.send('search', ev.target.value.toString());
//     }
//   }
// });

// ipc.on('giphy', function(event, arg) {
//   console.log(arg);
//   app.$set('giphy', arg);
// });




/**
 * Part Five
 */

var clipboard = require('electron').clipboard;

var app = new Vue({
  el: '#app',
  data: { 
    searchInput: searchInput,
    giphy: [],
    selection: ''
  },
  methods: {
    search: function(ev) {
      ipc.send('search', ev.target.value.toString());
    },
    toggleSelection: function(ev) {
      var source = ev.target.src.toString();
      app.$set('selection', source);
      clipboard.writeText(source);
    }
  }
});

ipc.on('giphy', function(event, arg) {
  var gifs = JSON.parse(arg).data;
  app.$set('giphy', gifs);
});