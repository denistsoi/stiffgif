<template>
  <div id="content" v-if="online">
    <ul>
      <li v-for="gif in giphy">
        <img src='loading-spinner.gif' v-img="gif.images.fixed_height.url" v-on:click="copyToClipboard" />
      </li>

      <li v-if="!giphy.length">
        No Results Returned from Giphy
      </li>
    </ul>
  </div>
</template>

<script>
import {ipcRenderer, clipboard} from 'electron';

export default {
  props: ['online', 'total', 'giphy'],
  data() {
    return {
      selection: null
    }
  },
  methods: {
    copyToClipboard: function(ev) {
      const source = ev.target.src.toString();
      this.$set(this, 'selection', source);
      clipboard.writeText(source);
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
    cursor: initial;
  }
}

.selected {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #2980b9;
  color: #ecf0f1;
}

.selected-transition {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #2980b9;
  color: #ecf0f1;
  opacity: 0;
}

.selected-enter {
  animation: fade-in 1.8s ease-in-out 1;
}

@keyframes fade-in {
  0% {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
</style>
