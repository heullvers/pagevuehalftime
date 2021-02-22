import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../components/Home'
import Predicao from '../components/Predicao'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },

  {
    path: '/predicao',
    name: 'Predicao',
    component: Predicao
  },
  
]

const router = new VueRouter({
  routes
})

export default router
