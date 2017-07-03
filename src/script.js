import Vue from 'vue';
import App from './App.vue';

Vue.directive('img', function(url) {
  var img = new Image();
  img.src = url;

  img.onload = function() {
    this.el.src = url;
    this.el.className = "active"
  }.bind(this);
});

new Vue({
  ...App
}).$mount('#app');