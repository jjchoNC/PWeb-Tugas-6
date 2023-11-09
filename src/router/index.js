import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    redirect: '/sign-in'
  },
  {
    path: '/home',
    name: 'home',
    component: HomeView
  },
  {
    path: '/sign-in',
    name: 'signin',
    component: () => import('../views/SigninView.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
