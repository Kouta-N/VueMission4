<template>
  <div>
    <img alt="Vue logo" src="../assets/logo.png" />
    <br />
    <br />
    <br />
    <span>{{ loginUserName }}さん、ようこそ！！</span>
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
            <transition name="fade" appear>
              <div
                class="modal-overlay"
                v-if="showWalletModal"
                @click="showWalletModal = false"
              ></div>
            </transition>
            <div class="wallet-modal" v-if="showWalletModal">
              {{ showWalletName }}さんの残高
              <br />
              {{ showWalletMoney }}
              <br />
              <button class="button" @click="showWalletModal = false">
                close
              </button>
            </div>
          </td>
          <td>
            <button v-on:click="saveReciver(user.Name)">
              送る
            </button>
            <transition name="fade" appear v-if="showTransferModal">
              <div
                class="modal-overlay"
                v-if="showTransferModal"
                @click="showTransferModal = false"
              ></div>
            </transition>
            <div class="wallet-modal" v-if="showTransferModal">
              あなたの残高{{ loginUserMoney }}
              <br />
              送る金額
              <br />
              <input type="number" v-model="pay" />
              <br />
              <button class="button" @click="transferMoney(payReciver, pay)">
                送信
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import db from '../main.js'
export default {
  data() {
    return {
      allUsers: [],
      showWalletName: '',
      showWalletMoney: '',
      payReciver: '',
      pay: '',
      showWalletModal: false,
      showTransferModal: false,
      filterName: '',
    }
  },
  created: async function () {
    await db
      .collection('users')
      .get()
      .then((querySnapshot) => {
        querySnapshot.docs.forEach((doc, index) => {
          if (querySnapshot.docs[index].data().Name !== this.filterName) {
            console.log(this.filterName)
            this.allUsers.push(doc.data(index))
          }
        })
      })
      .catch((error) => {
        alert(error)
      })
  },
  computed: {
    loginUserName: {
      get() {
        return this.$store.getters.loginUserName
      },
    },
    loginUserMoney: {
      get() {
        return this.$store.getters.loginUserMoney
      },
    },
  },
  methods: {
    doLogout() {
      this.allUsers = ''
      this.$store.dispatch('logout')
      this.$router.push('/')
    },
    showWallet(name) {
      this.showWalletName = name
      this.showWalletModal = true
      db.collection('users')
        .get()
        .then((querySnapshot) => {
          querySnapshot.docs.forEach((doc, index) => {
            if (querySnapshot.docs[index].data().Name === name) {
              this.showWalletMoney = querySnapshot.docs[index].data().Money
            }
          })
        })
        .catch((error) => {
          alert(error)
        })
    },
    saveReciver(setName) {
      this.payReciver = setName
      this.showTransferModal = true
    },
    transferMoney(payReciver, pay) {
      this.showTransferModal = false
      this.$store.dispatch('transferMoney', {
        name: payReciver,
        money: Number(pay), //キャストしない場合はstring型となる
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
.button {
  color: white;
  background-color: red;
  margin-left: 100px;
}
.modal-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 98;
  background-color: rgba(0, 0, 0, 0.05);
}
.wallet-modal {
  position: fixed;
  top: 80%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 99;
  width: 100%;
  max-width: 170px;
  height: 120px;
  background-color: white;
  border-radius: 4px;
  border-style: solid;
  border-color: black;
  padding: 25px;
}
</style>
