import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import firebase from 'firebase'
Vue.config.productionTip = false
const config = {
  apiKey: 'AIzaSyC-_eTVKKLaKhkCQKKGmGCBCliP3dg0sPA',
  authDomain: 'sumple-76eda.firebaseapp.com',
  databaseURL: 'https://sumple-76eda.firebaseio.com',
  projectId: 'sumple-76eda',
  storageBucket: 'sumple-76eda.appspot.com',
  messagingSenderId: '535128582963',
  appId: '1:535128582963:web:cb1227dcebcf724e2c2c46',
  measurementId: 'G-JQRKDY6CXQ',
}
firebase.initializeApp(config)
const db = firebase.firestore()
export default db
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app')
