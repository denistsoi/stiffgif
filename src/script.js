import Vue from 'vue';
import App from './App.vue';

import store from './store';

Vue.directive('img', function(el, data) {
  el.src = data.value;
});

new Vue({
  store,
  ...App
}).$mount('#app');