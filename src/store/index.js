import Vue from 'vue'
import Vuex from 'vuex'
import firebase from 'firebase'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loginUserName: '',
    loginUserMoney: '',
  },
  actions: {
    async userJoinAction(email, password) {
      await firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then(() => {
          let userStorage = firebase.auth().currentUser
          userStorage.updateProfile({
            displayName: this.userName,
          })
        })
    },
    loginUserNameMutation({ commit }, setName) {
      commit('loginUserNameMutation', setName)
    },
    loginUserMoneyMutation({ commit }, setMoney) {
      commit('loginUserNameMutation', setMoney)
    },
  },
  mutations: {
    loginUserNameMutation(state, setName) {
      state.loginUserName = setName
    },
    loginUserMoneyMutation(state, setMoney) {
      state.loginUserMoney = setMoney
    },
  },
})
