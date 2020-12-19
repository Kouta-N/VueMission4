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
export default {
  data() {
    return {
      userName: '',
      mailAddress: '',
      password: '',
    }
  },
  methods: {
    doRegistration() {
      this.$store.dispatch('setUser', {
        email: this.mailAddress,
        password: this.password,
        name: this.userName,
      })
      this.userName = ''
      this.mailAddress = ''
      this.password = ''
      this.money = ''
    },
  },
}
</script>
