<template>
  <div>
    <img alt="Vue logo" src="../assets/logo.png" /><br /><br />
    <h2>新規登録画面</h2>
    <br />
    <table align="center">
      <tbody>
       <tr>
          <th>ユーザ名</th>
          <td><input type="text" v-model="userName" placeholder="userName"/></td>
        </tr>
        <tr>
          <th>メールアドレス</th>
          <td><input type="text" v-model="mailAddress" placeholder="E-mail"/></td>
        </tr>
        <tr>
          <th>パスワード</th>
          <td><input type="text" v-model="password" placeholder="Password"/></td>
        </tr>
      </tbody>
    </table>
    <br />
    <button @click="doRegistration">新規登録</button><br />
    <router-link to="/">ログインはこちらから</router-link>
  </div>
</template>

<script>
  import firebase from 'firebase'
  import userData from '../firebaseConfig'
export default {
  data() {
    return {
      userName: '',
      mailAddress: '',
      password: '',
    };
  },
  methods: {
    doRegistration(){
      firebase.auth().createUserWithEmailAndPassword(this.mailAddress, this.password)      
        .then(() => {
          let getUser = firebase.auth().currentUser;          getUser.updateProfile({
            displayName: this.userName,
          }) 
          userData.collection('users').add({ 
            name: this.userName,
            Email: this.mailAddress,
            Password: this.password,
           })
           .then(() => {
            alert('ユーザー情報の登録ができました。');
            this.userName = '';
            this.mailAddress = '';
            this.password = '';
          })
          .catch(error => {
            alert(error + '\nユーザー情報の登録に失敗しました。');
          })          
        })
        .catch(error => {
          alert(error + '\n正しい情報を入力してください');
        })
    },
  }
};
</script>
