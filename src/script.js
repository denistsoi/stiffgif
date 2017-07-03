import Vue from 'vue';
import App from './App.vue';

Vue.directive('img', function(el, data) {
  el.src = data.value;
});

new Vue({
  ...App
}).$mount('#app');