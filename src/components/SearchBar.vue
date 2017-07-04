<template>
  <input v-model="searchInput" debounce="300" v-on:keyup.13="search">
</template>

<script>
import {ipcRenderer} from 'electron'
import fetch from '../helpers/fetch';
const ipc = ipcRenderer;

export default {
  props: ['scope'],
  data() {
    return {
      searchInput: ''
    }
  },
  mounted() {
    let el = this.$el;
    el.focus();
  },
  methods: {
    search: function (ev, value) {
      var query = ev.target.value.toString().trim() || this.$data.searchInput;
      var length = self.giphy ? self.giphy.length : 0;
      if (!query) return;
      
      const app = this;
      const store = app.$store;
      store.commit('query', query);
      store.commit('updateTab', 'search');
      store.commit('clearGiphy');
      fetch(this, store.getters.query)
    }
  }
}
</script>
<style lang="scss">
  input {
    padding: 5px;
    width: 100%;
    position: relative;
    font-size: 24px;
    &:focus {
      outline: 0;
    }
  }
</style>