import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/Login.vue'
import HomeVue from '../views/Home.vue'
import AddbetView from '../views/AddBet.vue'
import ProfilView from '../views/Profil.vue'
import MatchView from '../views/MatchList.vue'
import ClassementView from '../views/Classement.vue'
import SignupView from '../views/SignUp.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: {
      name: 'LoginView'
    },
    component: HomeView
  },

  {
    path: '/myprofil',
    name: 'ProfilView',
    component: ProfilView,
    beforeEnter: (to, from, next) => {
      if(window.localStorage.getItem('token') !== null){
        next()
      }else{
        router.push('/login')
      }
    }
  },

  {
    path: '/homevue',
    name: 'HomeVue',
    component: HomeVue,
    beforeEnter: (to, from, next) => {
      if(window.localStorage.getItem('token') !== null){
        next()
      }else{
        router.push('/login')
      }
    }
  },

  {
    path: '/match',
    name: 'MatchView',
    component: MatchView,
    beforeEnter: (to, from, next) => {
      if(window.localStorage.getItem('token') !== null){
        next()
      }else{
        router.push('/login')
      }
    }
  },

  {
    path: '/classement',
    name: 'ClassementView',
    component: ClassementView,
    beforeEnter: (to, from, next) => {
      if(window.localStorage.getItem('token') !== null){
        next()
      }else{
        router.push('/login')
      }
    }
  },

  {
    path: '/addBet',
    name: 'AddbetView',
    component: AddbetView,
    beforeEnter: (to, from, next) => {
      if(window.localStorage.getItem('token') !== null){
        next()
      }else{
        router.push('/login')
      }
    }
  },
  
  {
    path: '/home',
    name: 'home',
    component: HomeView,
    beforeEnter: (to, from, next) => {
      if(window.localStorage.getItem('token') !== null){
        next()
      }else{
        router.push('/login')
      }
    }
  },

  {
    path: '/login',
    name: 'LoginView',
    component: LoginView
  },

  {
    path: '/signup',
    name: 'SignupView',
    component: SignupView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
