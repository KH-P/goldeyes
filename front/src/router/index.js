import { createRouter, createWebHistory } from 'vue-router'
import News from '../views/NewsView.vue'

const routes = [
  {
    path: '/',
    name: 'NewsView',
    component: News
  },
  {
    path: '/dg',
    name: 'NewsViewDg',
    component: () => import('../views/NewsViewDg.vue')
  },
  {
    path: '/cc',
    name: 'NewsViewCc',
    component: () => import('../views/NewsViewCc.vue')
  },
  {
    path: '/gb',
    name: 'NewsViewGb',
    component: () => import('../views/NewsViewGb.vue')
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
