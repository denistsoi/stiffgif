import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  strict: true,
  state: {
    giphy: [],
    loading: false,
    online: false,
    queries: [],
    qs: '',
    scope: 'trending',
    selection: null,
    fixed: false
  },
  getters: {
    fixed: state => { return state.fixed },
    scope: state => { return state.scope },
    loading: state => { return state.loading },
    query: state => { return state.qs; },
    queries: state => { return state.queries; },
    selection: state => { return state.selection }
  },
  mutations: {
    fixed (state, val) { return state.fixed = val },
    giphy (state, item) { return state.giphy.push(item) },
    loading (state, value) { state.loading = value },
    online (state) { state.online = true },
    offline (state) { state.online = false },
    qs (state, query) { return state.qs = query; },
    query (state, query) { 
      let exists = state.queries.indexOf(query);
      if (exists < 0) {
        return state.queries.push(query) 
      }
    },
    selection (state, link) { state.selection = link; return link  },
    updateTab(state, value) { state.scope = value }
  }
});