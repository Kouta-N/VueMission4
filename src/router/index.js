import Vue from 'vue';
import VueRouter from 'vue-router';
import UserRegistration from '../views/UserRegistration.vue';

Vue.use(VueRouter);

<<<<<<< HEAD
const routes = [
  {
    path: '/',
    name: 'UserRegistration',
    component: UserRegistration,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
=======
const routes = [{
    path: '/',
    name: 'UserRegistration',
    component: UserRegistration,
}, ];

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes,
});

export default router;
>>>>>>> origin/develop
