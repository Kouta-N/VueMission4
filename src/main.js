import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import firebase from 'firebase'
import { config } from './firebaseConfig'
Vue.config.productionTip = false

firebase.initializeApp(config)
const db = firebase.firestore()
export default db
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app')
