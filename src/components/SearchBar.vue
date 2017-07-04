<template>
  <div>
    <input v-model="searchInput" debounce="300" v-on:keyup.13="search">
    <div class="history">
      <button class="btn" v-for="q in queries" v-on:click="changeQ">{{ q }}</button>
    </div>
  </div>
</template>

<script>
import {ipcRenderer} from 'electron'
import fetch from '../helpers/fetch';
const ipc = ipcRenderer;

export default {
  props: ['scope'],
  data() {
    return {
      searchInput: '',
      queries: this.$store.getters.queries
    }
  },
  mounted() {
    console.log(this);
    let el = this.$el;
    el.focus();
  },
  methods: {
    changeQ: function(ev) {
      let query = ev.target.innerText.toString().trim();
      const store = this.$store;
      store.commit('qs', query);
    },
    search: function (ev) {
      const app = this;
      const store = app.$store;

      let query = ev.target.value.toString().trim() || this.$data.searchInput;

      if (!query) return;
      
      store.commit('query', query);
      store.commit('qs', query);
      store.commit('updateTab', 'search');
      fetch(this, store.getters.query)
    }
  }
}
</script>
<style lang="scss">
:root {
  input {
    padding: 5px;
    width: 100%;
    position: relative;
    font-size: 24px;
    &:focus {
      outline: 0;
    }
  }
  .history {
    display: flex;
    width: 100%;
    overflow: scroll;
    flex-direction: row;
    .btn {
      background: lightgrey;
    }
  }
}
  
  
</style>