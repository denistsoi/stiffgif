import {ipcRenderer} from 'electron';
const ipc = ipcRenderer;

export default ()=>{
  var self = this;
  ipc.send('fetch:giphy', { scope: 'trending', offset: 0 });
  // ipc.send('fetch:popkey', { scope: self.scope, offset: self.giphy.length });

  // console.log(this);  
  // if (self.scope === 'search') {
  //   ipc.send('fetch:giphy',  { scope: self.scope, query: self.searchInput, offset: self.giphy.length });        
  //   ipc.send('fetch:popkey', { scope: self.scope, query: self.searchInput, offset: self.giphy.length });        
  // } else if (self.scope === 'trending') {
  //   ipc.send('fetch:giphy', { scope: self.scope, offset: self.giphy.length });
  //   ipc.send('fetch:popkey', { scope: self.scope, offset: self.giphy.length });
  // }
}