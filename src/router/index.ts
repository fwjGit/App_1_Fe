import { createRouter, createWebHistory } from 'vue-router'
import Detail from '../views/detail.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/detail',
    },
    {
      path: '/detail',
      name: 'detail',
      component: Detail,
    },
    {
      path: '/404',
      name: '404',
      component: () => import('../views/404.vue'),
    },
  ],
})

export default router
