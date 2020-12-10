import Vuex from 'vuex'
import Vue from 'vue'
import firebase from 'firebase'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loginUserName: '',
    userStorage: '',
  },
  actions: {
    async userJoinMutation({ commit }, { email, password, name }) {
      const Information = {
        mailInformation: email,
        passwordInformation: password,
        nameInformation: name,
      }
      commit('userJoinMutation', Information)
      console.log(Information) //デバッグ用
    },
    loginUserNameMutation({ commit }, setName) {
      commit('loginUserNameMutation', setName)
    },
  },
  mutations: {
    async userJoinMutation({ state }, { Information }) {
      console.log(Information.mailInformation) //デバッグ用
      console.log(Information.passwordInformation) //デバッグ用
      console.log(Information.nameInformation) //デバッグ用
      await firebase
        .auth()
        .createUserWithEmailAndPassword(
          Information.mailInformation,
          Information.passwordInformation,
        )
        .then(() => {
          state.userStorage = firebase.auth().currentUser
          state.userStorage.updateProfile({
            displayName: Information.nameInformation,
          })
        })
    },
    loginUserNameMutation(state, setName) {
      state.loginUserName = setName
    },
    nameResetMutation(state) {
      state.loginUserName = ''
    },
  },
})
