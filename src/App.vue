<template>
  <div>
    <header>
      <search-bar></search-bar>
    </header>

    <content-list :online="online" :selection="selection"></content-list>

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
    data() {
      return {
        online: false,
        selection: null
      }
    },
    created() {
      const ipc = ipcRenderer;
      const app = this;

      var updateOnlineStatus = () => {
        var set = navigator.onLine ? true : false;
        app.$set(app, 'online', set)
      };

      window.addEventListener('online', updateOnlineStatus);
      window.addEventListener('offline', updateOnlineStatus);

      updateOnlineStatus();

      fetch();
    }
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
  margin-top: $header-height;
}
header {
  position: fixed;
  top: 0;
  padding: 10px;
  background-color: #efefef;
  height: $header-height;
  width: 100%;
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