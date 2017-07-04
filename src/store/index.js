import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    giphy: [],
    loading: false,
    online: false,
    scope: 'trending',
    selection: null
  },
  getters: {
    scope: state => { return state.scope },
    loading: state => { return state.loading },
  },
  mutations: {
    online (state) { state.online = true },
    offline (state) { state.online = false },
    giphy (state, item) {
      return state.giphy.push(item);
    },
    loading (state, value) { state.loading = value }
  }
});