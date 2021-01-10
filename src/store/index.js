import Vuex from 'vuex'
import Vue from 'vue'
import firebase from 'firebase'
import db from '../main.js'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loginUserName: '',
    loginUserMoney: '',
    loginUserID: '',
    userStorage: '',
    targetUserID: '',
    targetUserMoney: '',
    firstMoney: 1000, //新規ユーザーの最初の所持金額
  },
  getters: {
    loginUserName: (state) => state.loginUserName,
    loginUserMoney: (state) => state.loginUserMoney,
  },
  actions: {
    async setUser({ commit }, { email, password, name }) {
      const userInformation = { email, password, name }
      await commit('setUser', userInformation)
    },
    login({ commit }, { email, password }) {
      const loginInformation = { email, password }
      commit('login', loginInformation)
    },
    logout(state) {
      state.loginUserName = ''
      state.userStorage = ''
      state.loginUserMoney = ''
      firebase.auth().signOut()
    },
    async transferMoney({ commit }, { name, money }) {
      const transferInformation = { name, money }
      await commit('transferMoney', transferInformation)
    },
  },
  mutations: {
    setUser(state, userInformation) {
      firebase
        .auth()
        .createUserWithEmailAndPassword(
          userInformation.email,
          userInformation.password,
        )
        .then(() => {
          state.userStorage = firebase.auth().currentUser
          state.userStorage.updateProfile({
            displayName: userInformation.name,
          })
          db.collection('users').add({
            Name: userInformation.name,
            Email: userInformation.email,
            Password: userInformation.password,
            Money: state.firstMoney,
          })
        })
        .catch((error) => {
          alert(error)
        })
    },
    login(state, loginInformation) {
      firebase
        .auth()
        .signInWithEmailAndPassword(
          loginInformation.email,
          loginInformation.password,
        )
        .then(() => {
          state.loginUserName = firebase.auth().currentUser.displayName
          db.collection('users')
            .get()
            .then((querySnapshot) => {
              querySnapshot.docs.forEach((doc, index) => {
                if (
                  querySnapshot.docs[index].data().Name === state.loginUserName
                ) {
                  state.loginUserMoney = querySnapshot.docs[index].data().Money
                }
              })
            })
        })
        .catch((error) => {
          alert(error)
        })
    },
    transferMoney(state, transferInformation) {
      // 送金する相手のデータを取得
      db.collection('users')
        .get()
        .then((querySnapshot) => {
          querySnapshot.docs.forEach((doc, index) => {
            if (
              querySnapshot.docs[index].data().Name === transferInformation.name
            ) {
              state.targetUserID = querySnapshot.docs[index].id
              state.targetUserMoney = querySnapshot.docs[index].data().Money
            }
            if (querySnapshot.docs[index].data().Name === state.loginUserName) {
              state.loginUserID = querySnapshot.docs[index].id
            }
          })
          state.loginUserMoney -= transferInformation.money
          state.targetUserMoney += transferInformation.money
          const loginUserRef = db.collection('users').doc(state.loginUserID)
          const targetUserRef = db.collection('users').doc(state.targetUserID)
          //送金処理
          db.runTransaction(async function (tr) {
            await tr.get(loginUserRef)
            await tr.get(targetUserRef)
            await tr.update(loginUserRef, { Money: state.loginUserMoney })
            await makeError()
            await tr.update(targetUserRef, {
              Money: state.targetUserMoney,
            })
          }).catch(function (error) {
            console.log('Transaction failed: ', error)
          })
        })
    },
  },
})
