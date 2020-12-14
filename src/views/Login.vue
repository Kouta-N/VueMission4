<template>
  <div>
    <img alt="Vue logo" src="../assets/logo.png" />
    <br />
    <br />
    <h2>ログイン</h2>
    <br />
    <table align="center">
      <tbody>
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
    <button @click="doLogin">ログイン</button>
    <br />
    <router-link to="UserRegistration">新規登録はこちらから</router-link>
  </div>
</template>

<script>
export default {
  data() {
    return {
      mailAddress: '',
      password: '',
    }
  },
  methods: {
    doLogin() {
      this.$store.dispatch('userLoginAction', {
        email: this.mailAddress,
        password: this.password,
      })
      this.$router.push('/myDashboard')
    },
  },
}
</script>
