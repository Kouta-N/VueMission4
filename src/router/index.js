import Vue from 'vue';
import VueRouter from 'vue-router';
import Login from '../views/Login.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/UserRegistration',
    name: 'UserRegistration',
    component: () => import(/* webpackChunkName: "about" */ '../views/UserRegistration.vue')
  },
  {
    path: '/myDashboard',
    name: 'myDashboard',
    component: () => import(/* webpackChunkName: "about" */ '../views/myDashboard.vue')
  },    
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
