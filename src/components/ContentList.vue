<template>
  <div id="content" v-if="online">
    
    <li v-for="gif in giphy" >
        {{ gif.images }}
    </li>
    <li v-if="!giphy.length">
      No Results Returned from Giphy
    </li>
  </div>
</template>

<script>
import {ipcRenderer} from 'electron';

export default {
  props: ['online'],
  data() {
    return {
      giphy: []
    }
  },
  mounted() {
    let app = this;
    
    ipcRenderer.on('fetched:giphy', (ev, res)=> {
      var gifs = JSON.parse(res).data;
  
      if (!gifs.length) {
        app.$set('giphyIsDone', true);
        return;
      }

      gifs.forEach(function(item) {
        app.$data.giphy.push(item);
      });
    });
  }
}


</script>

<style lang="scss">
#content {
  
  display: flex;
}

ul {
  padding: 0;
  flex-flow: row wrap;
  justify-content: space-around;
  width: 50%;
  margin: 0;
  padding: 0;
}

li { 
  display: block;
  width: 100%;
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
