import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    getNewUser: '',
  },
  mutations: {
    getUserMutation(state, getUser) {
      state.getNewUser = getUser;
    },
  },
  actions: {
    getUserAction({commit}, getUser) {
      commit('getUserMutation', getUser);
    }
  },
  modules: {
  }
})
