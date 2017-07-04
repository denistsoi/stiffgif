<template>
  <div id="content" v-if="online">
    <ul>
      <li v-for="gif in filter(giphy)">
        <img src='loading-spinner.gif' v-img="gif.images.fixed_height.url" v-on:click="copyToClipboard" />
      </li>

      <li v-if="!filter(giphy).length">
        No Results Returned from Giphy
      </li>
    </ul>
  </div>
</template>

<script>
import {ipcRenderer, clipboard} from 'electron';

export default {
  props: ['online', 'total', 'giphy', 'selection'],
  methods: {
    copyToClipboard: function(ev) {
      const source = ev.target.src.toString();
      const store = this.$store;
      store.commit('selection', source);

      const selection = store.getters.selection;
      clipboard.writeText(selection);
    },
    filter: function() {
      const store = this.$store;
      return store.state.giphy.filter(gif => {
        return gif.query === store.getters.query;
      })
    }
  }
}


</script>

<style lang="scss">
ul {
  padding: 0;
  flex-flow: row wrap;
  flex-direction: row;
  display: flex;
  margin: 0;
  padding: 0;
}

li { 
  display: block;
  width: 50%;
  border: 2px solid #efefef;
  background-color: #efefef;
  max-height: 200px;
  overflow: hidden;
}

img {
  display: block;
  width: 100%;
  height: 100%;
  min-height: 200px;
  background-color: #efefef;
  margin: 0 auto;
  &.active:hover {
    cursor: pointer;
  }
  &:hover {
    cursor: pointer;
  }
}
</style>
