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
  actions: {
    userJoinAction({ commit }, { email, password, name }) {
      const userJoinInformation = {
        mailInformation: email,
        passwordInformation: password,
        nameInformation: name,
      }
      commit('userJoinAction', userJoinInformation)
    },
    userLoginAction({ commit }, { email, password }) {
      const loginInformation = {
        loginMailInformation: email,
        loginPasswordInformation: password,
      }
      commit('userLoginAction', loginInformation)
    },
    userLogoutAction(state) {
      state.loginUserName = ''
      state.userStorage = ''
      state.loginUserMoney = ''
      firebase.auth().signOut()
    },
    transferMoneyAction({ commit }, { name, money }) {
      const transferInformation = {
        transferNameInformation: name,
        trasferMoneyInformation: money,
      }
      commit('transferMoneyAction', transferInformation)
    },
  },
  mutations: {
    async userJoinAction(state, userJoinInformation) {
      await firebase
        .auth()
        .createUserWithEmailAndPassword(
          userJoinInformation.mailInformation,
          userJoinInformation.passwordInformation,
        )
        .then(() => {
          state.userStorage = firebase.auth().currentUser
          state.userStorage.updateProfile({
            displayName: userJoinInformation.nameInformation,
          })
          db.collection('users').add({
            Name: userJoinInformation.nameInformation,
            Email: userJoinInformation.mailInformation,
            Password: userJoinInformation.passwordInformation,
            Money: state.firstMoney,
          })
        })
    },
    userLoginAction(state, loginInformation) {
      firebase
        .auth()
        .signInWithEmailAndPassword(
          loginInformation.loginMailInformation,
          loginInformation.loginPasswordInformation,
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
    },
    async transferMoneyAction(state, transferInformation) {
      //送金する相手のデータを取得
      await db.collection('users')
        .get()
        .then((querySnapshot) => {
          querySnapshot.docs.forEach((doc, index) => {
            if (
              querySnapshot.docs[index].data().Name ===
              transferInformation.transferNameInformation
            ) {
              state.targetUserID = querySnapshot.docs[index].id
              state.targetUserMoney = querySnapshot.docs[index].data().Money
            }
            if (querySnapshot.docs[index].data().Name === state.loginUserName) {
              state.loginUserID = querySnapshot.docs[index].id
            }
          })
          //送金処理
          state.loginUserMoney -= transferInformation.trasferMoneyInformation
          state.targetUserMoney += transferInformation.trasferMoneyInformation
          //firestoreの残金データを更新
          const loginUserRef = db.collection('users').doc(state.loginUserID)
          const targetUserRef = db.collection('users').doc(state.targetUserID)
          loginUserRef.update({
            Money: state.loginUserMoney,
          })
          targetUserRef.update({ Money: state.targetUserMoney })
        })
    },
  },
})
