<template>
  <div>
    <header>
      <search-bar></search-bar>
    </header>
    {{ online }}
    <content-list :online="online"></content-list>

    <footer>
      <notification :online="online"></notification>
    </footer>
  </div>
</template>

<script>
  import SearchBar from './components/SearchBar'
  import ContentList from './components/ContentList'
  import Notification from './components/Notification'
  
  import {ipcRenderer} from 'electron';

  export default {
    components: {
      SearchBar,
      ContentList,
      Notification
    },
    data() {
      return {
        online: false
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
    }
  }
</script>