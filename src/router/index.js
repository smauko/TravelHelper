import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '@/store';

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/HomeView.vue'),
    meta:{
      neSmijeUcSaLogin:false,
    },
    
  },
  {
    path: '/home',
    name: 'home',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/HomeView.vue'),
    meta:{
      neSmijeUcSaLogin:false,
    },
    
  },
  {
    path: '/login',
    name: 'login',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/LogIn.vue'),
    meta:{
      neSmijeUcSaLogin:true,
    },
  },
  {
    path: '/signup',
    name: 'signup',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/SignUp.vue'),
    meta:{
      neSmijeUcSaLogin:true,
    },

  },
  {
    path: '/proba',
    name: 'proba',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/proba.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  console.log(" stara ruta je ",from.name, " nova ruta je ",to.name, " korisnik je ", store.currentUser );
  const userLogged= store.currentUser != null; // ako je ulogiran biti ce true, ako nije false

   if(userLogged && to.meta.neSmijeUcSaLogin){
    console.log(userLogged, to.meta.neSmijeUcSaLogin, store.currentUser, 'nijeprosao');
    next('home');
  }
  else{
    console.log(userLogged, to.meta.neSmijeUcSaLogin, store.currentUser, 'prosao je');
    next();
  }
  
});


export default router
