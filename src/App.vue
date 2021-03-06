<template>
  <div>
    <header v-bind:class="{fixed: fixed}"> 
      <search-bar></search-bar>
    </header>

    <content-list :online="online" :selection="selection" :giphy="giphy"></content-list>

    <notification :online="online" :selection="selection"></notification>
  </div>
</template>

<script>
  import SearchBar from './components/SearchBar'
  import ContentList from './components/ContentList'
  import Notification from './components/Notification'
  
  import {ipcRenderer} from 'electron';
  import fetch from './helpers/fetch';

  export default {
    components: {
      SearchBar,
      ContentList,
      Notification
    },
    computed: {
      online() {
        return this.$store.state.online;
      },
      selection() {
        return this.$store.state.selection;
      },
      giphy() {
        return this.$store.state.giphy;
      },
      fixed() {
        return this.$store.getters.fixed;
      }
    },
    created() {
      const ipc = ipcRenderer;
      const app = this;
      const store = app.$store;

      const updateOnlineStatus = () => {
        let set = navigator.onLine ? app.$store.commit('online') : app.$store.commit('offline')
      };

      window.addEventListener('online', updateOnlineStatus);
      window.addEventListener('offline', updateOnlineStatus);

      updateOnlineStatus();

      if (!store.getters.loading) {
        fetch(app);
      }
      
      const renderGifs = (ev, res)=> {
        var gifs = JSON.parse(res).data;
        
        if (!gifs.length) { return; }

        if (store.getters.loading) {
          store.commit('loading', false);

          gifs.forEach(function(item) {
            item.scope = store.getters.scope;
            item.query = store.getters.query;
            
            store.commit('giphy', item);
          });
        }
      }

      ipcRenderer.on('fetched:giphy', renderGifs);
      ipcRenderer.on('searched:giphy', renderGifs);
     
      window.addEventListener('scroll', function(ev) {
        let top = 40;
        let scrollYTrigger = 500;
        let scrollY = document.body.scrollTop + window.innerHeight + scrollYTrigger;
        
        if (document.body.scrollHeight < scrollY) {
          if (!store.getters.loading) {
            setTimeout(fetch(app), 2000);
          }
        }

        let scrollTop = document.body.scrollTop > top ? 
          store.commit('fixed', true) : store.commit('fixed', false);
      });
    },
  }
</script>

<style lang="scss">
* {
  box-sizing: border-box;
}
html, body {
  padding: 0;
  margin: 0;
}
$header-height: 62px;

body {
  font-family: 'Slabo 27px', serif;
}
header {
  position: relative;
  top: 0;
  padding: 10px;
  background-color: #efefef;
  height: auto;
  width: 100%;
}
header.fixed {
  position: fixed;
}
footer {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
}

footer h1 {
  text-align: center;
}
</style>