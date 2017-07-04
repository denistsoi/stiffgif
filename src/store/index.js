import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    giphy: [],
    loading: false,
    online: false,
    query: '',
    scope: 'trending',
    selection: null

  },
  getters: {
    scope: state => { return state.scope },
    loading: state => { return state.loading },
    query: state => { return state.query }
  },
  mutations: {
    online (state) { state.online = true },
    offline (state) { state.online = false },
    giphy (state, item) {
      return state.giphy.push(item);
    },
    clearGiphy (state) {
      return state.giphy = [];
    },
    query (state, query) {
      return state.query = query;
    },
    loading (state, value) { state.loading = value },
    updateTab(state, value) { state.scope = value }
  }
});