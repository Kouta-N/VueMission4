<template>
  <div>
    <img alt="Vue logo" src="../assets/logo.png" />
    <br />
    <br />
    <h2>新規登録画面</h2>
    <br />
    <table align="center">
      <tbody>
        <tr>
          <th>ユーザ名</th>
          <td>
            <input type="text" v-model="userName" placeholder="userName" />
          </td>
        </tr>
        <tr>
          <th>メールアドレス</th>
          <td>
            <input type="text" v-model="mailAddress" placeholder="E-mail" />
          </td>
        </tr>
        <tr>
          <th>パスワード</th>
          <td>
            <input type="text" v-model="password" placeholder="Password" />
          </td>
        </tr>
      </tbody>
    </table>
    <br />
    <button @click="doRegistration">新規登録</button>
    <br />
    <router-link to="/">ログインはこちらから</router-link>
  </div>
</template>

<script>
//import firebase from 'firebase'
//import db from '../firebaseConfig'
import store from '../store'
export default {
  data() {
    return {
      userName: '',
      mailAddress: '',
      password: '',
      firstMoney: 1000,
    }
  },
  methods: {
    doRegistration() {
      store.dispatch('userJoinAction', this.mailAddress, this.password)
      // firebase
      //   .auth()
      //   .createUserWithEmailAndPassword(this.mailAddress, this.password)
      //   .then(() => {
      //     let userStorage = firebase.auth().currentUser
      //     userStorage.updateProfile({
      //       displayName: this.userName,
      //     })
      // db.collection('users')
      //   .add({
      //     Name: this.userName,
      //     Email: this.mailAddress,
      //     Password: this.password,
      //     Money: this.firstMoney,
      //   })
      //   .then(() => {
      //     this.userName = ''
      //     this.mailAddress = ''
      //     this.password = ''
      //     this.money = ''
      //   })
      //})
    },
  },
}
</script>
