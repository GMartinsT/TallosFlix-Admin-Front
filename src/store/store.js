import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    userId: null,
    access_token: null,
  },
  mutations: {
    setUserId(state, userId) {
      state.userId = userId;
    },
    setToken(state, access_token) {
      state.access_token = access_token;
    },
    clearUserId(state) {
      state.userId = null;
    },
    clearToken(state) {
      state.access_token = null;
    },
  },
  actions: {
    loginUser({ commit }, { userId, access_token }) {
      commit('setUser', userId);
      commit('setToken', access_token);
    },
    logoutUser({ commit }) {
      commit('clearUserId');
      commit('clearToken');
    },
  },
  getters: {
    getUserId(state) {
      return state.userId;
    },
    getToken(state) {
      return state.access_token;
    },
    isAuthenticated(state) {
      return !!state.access_token;
    },
  },
});

export default store;
