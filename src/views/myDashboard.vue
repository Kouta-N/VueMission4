<template>
  <div>
    <img alt="Vue logo" src="../assets/logo.png" />
    <br />
    <br />
    <br />
    <span>{{ this.$store.state.loginUserName }}さん、ようこそ！！</span>
    <span class="output-money">
      残高：{{ loginUserMoney }}
      <button v-on:click="doLogout">ログアウト</button>
    </span>
    <h2>ユーザ一覧</h2>
    <table>
      <strong>ユーザー名</strong>
      <tbody>
        <th class="user-output"></th>
        <tr v-for="user in allUsers" v-bind:key="user.name">
          <td>{{ user.Name }}</td>
          <td>
            <button v-on:click="showWallet(user.Name)">
              walletを見る
            </button>
          </td>
          <td>
            <button v-on:click="transferMoney(user.Name)">送る</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import firebase from 'firebase'
import db from '../main.js'
import store from '../store'
export default {
  data() {
    return {
      allUsers: [],
      allUserMoney: [],
      loginUserID: '',
      loginUserMoney: '',
      targetUserID: '',
      targetUserMoney: '',
      pay: '',
    }
  },
  created: function () {
    db.collection('users')
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          const data = doc.data()
          if (data.Name !== this.$store.state.loginUserName) {
            this.allUsers.push(data)
          }
        })
        querySnapshot.docs.forEach((value, index) => {
          if (
            querySnapshot.docs[index].data().Name === store.state.loginUserName
          ) {
            this.loginUserID = querySnapshot.docs[index].getIdToken
            this.loginUserMoney = querySnapshot.docs[index].data().Money
          }
        })
      })
  },
  methods: {
    doLogout() {
      this.$store.commit('nameResetMutation')
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$router.push('/')
        })
    },
    showWallet(name) {
      let showOtherUserMoney = ''
      db.collection('users')
        .get()
        .then((querySnapshot) => {
          querySnapshot.docs.forEach((value, index) => {
            if (querySnapshot.docs[index].data().Name === name) {
              showOtherUserMoney = querySnapshot.docs[index].data().Money
            }
          })
          confirm(`${name}さんの残高は${showOtherUserMoney}です`)
        })
    },
    transferMoney(name) {
      this.pay = Number(
        prompt(`あなたの残高：${this.loginUserMoney}\n送る金額`),
      )
      //送金する相手のデータを取得
      db.collection('users')
        .get()
        .then((querySnapshot) => {
          querySnapshot.docs.forEach((value, index) => {
            if (querySnapshot.docs[index].data().Name === name) {
              this.targetUserID = querySnapshot.docs[index].id
              console.log(querySnapshot.docs[index].id)
              this.targetUserMoney = querySnapshot.docs[index].data().Money
            }
          })
        })
      //送金処理
      this.loginUserMoney = this.loginUserMoney - this.pay
      this.targetUserMoney = this.targetUserMoney + this.pay
      //firestoreの残金データを更新
      const loginUserRef = db.collection('users').doc(this.loginUserID)
      const targetUserRef = db.collection('users').doc(this.targetUserID)
      loginUserRef.update({ Money: this.loginUserMoney })
      targetUserRef.update({ Money: this.targetUserMoney })
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
