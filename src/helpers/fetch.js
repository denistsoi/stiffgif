import {ipcRenderer} from 'electron';
const ipc = ipcRenderer;

export default (app) =>{
  var offset = app.giphy.length;
  
  app.loading = true;
  
  switch (app.scope) {
    case 'trending':
      ipc.send('fetch:giphy', { scope: 'trending', offset: offset });
      break;
    case 'search':
      // ipc.send('fetch:giphy', { scope: 'trending', offset: offset });
      break;

  }
}