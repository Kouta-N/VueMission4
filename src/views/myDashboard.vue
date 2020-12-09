<template>
  <div>
    <img alt="Vue logo" src="../assets/logo.png" />
    <br />
    <br />
    <br />
    <span>{{ outputLoginUserName }}さん、ようこそ！！</span>
    <span class="output-money">
      残高：{{ outputLoginUserMoney }}
      <button v-on:click="doLogout">ログアウト</button>
    </span>
    <h2>ユーザ一覧</h2>
    <table>
      <strong>ユーザー名</strong>
      <tbody>
        <th class="user-output"></th>
        <tr v-for="user in allUsers" v-bind:key="user.name">
          <td>{{ user.name }}</td>
          <td>
            <button v-on:click="showWallet(user.name)">
              walletを見る
            </button>
          </td>
          <td>
            <button v-on:click="moneyTransfer(user.name)">送る</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import firebase from 'firebase'
import db from '../firebaseConfig'
import store from '../store'
export default {
  data() {
    return {
      allUsers: [],
      allUserMoney: [],
      loginUserID: '',
    }
  },
  created: function () {
    db.collection('users')
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          const data = doc.data()
          if (data.Name !== this.loginUserName) {
            this.allUsers.push(data)
          }
        })
        querySnapshot.docs.forEach((value, index) => {
          if (
            querySnapshot.docs[index].data().Name === store.state.loginUserName
          ) {
            this.loginUserID = querySnapshot.docs[index].id
            this.loginUserMoney = querySnapshot.docs[index].data().Money
          }
        })
      })
  },
  computed: {
    outputLoginUserName() {
      return this.$store.state.loginUserName
    },
    outputLoginUserMoney() {
      return this.$store.state.loginUserMoney
    },
  },
  methods: {
    doLogout() {
      this.$store.commit('nameInit')
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$router.push('/')
        })
    },
    showWallet(name) {
      let showMoney = ''
      db.collection('users')
        .get()
        .then((querySnapshot) => {
          querySnapshot.docs.forEach((value, index) => {
            if (querySnapshot.docs[index].data().name === name) {
              showMoney = querySnapshot.docs[index].data().money
            }
          })
          confirm(`${name}さんの残高は${showMoney}です`)
        })
    },
  },
}
</script>

<style>
.output-money {
  padding: 0 50px 0 400px;
}
.user-output {
  padding: 0 900px 0 0;
}
</style>
