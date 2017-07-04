import Vue from 'vue';
import App from './App.vue';

import store from './store';

Vue.directive('img', function(el, data) {
  var img = new Image();
  img.src = data.value;

  img.onload = function() {
    el.src = data.value;
    el.className = "active"
  };
});

new Vue({
  store,
  ...App
}).$mount('#app');