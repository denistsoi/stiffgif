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
    selection: null

  },
  getters: {
    scope: state => { return state.scope },
    loading: state => { return state.loading },
    query: state => { return state.qs; },
    queries: state => { return state.queries; },
    selection: state => { return state.selection }
  },
  mutations: {
    giphy (state, item) { return state.giphy.push(item) },
    loading (state, value) { state.loading = value },
    online (state) { state.online = true },
    offline (state) { state.online = false },
    qs (state, query) { return state.qs = query; },
    query (state, query) { return state.queries.push(query) },
    selection (state, link) { state.selection = link; return link  },
    updateTab(state, value) { state.scope = value }
  }
});