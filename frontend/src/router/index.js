import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/Login.vue'
import HomeVue from '../views/Home.vue'

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
