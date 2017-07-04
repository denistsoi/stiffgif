import {ipcRenderer} from 'electron';
const ipc = ipcRenderer;

export default (app) =>{
  const store = app.$store;

  let offset = store.state.giphy.length;
  let scope  = store.getters.scope;
  let query  = store.getters.query;
  store.commit('loading', true);

  console.log(scope, query)
  switch (scope) {
    case 'trending':
      ipc.send('fetch:giphy', { scope: scope, offset: offset });
      break;
    case 'search':
      ipc.send('search:giphy', { scope: scope, query: query, offset: offset });
      break;

  }
}