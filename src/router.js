import { createRouter, createWebHistory } from 'vue-router'

import IndexPage from '/~/pages/index/index.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'index',
      component: IndexPage
    }
  ],
})

export default router