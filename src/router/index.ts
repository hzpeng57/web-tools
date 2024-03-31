import type { RouteRecordRaw } from 'vue-router'
import { createRouter, createWebHistory } from 'vue-router'
import Home from '../pages/Home.vue'
import GenImage from '../pages/GenImage/GenImage.vue'
import { RouteNames } from './RouteName'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: RouteNames.Home,
    component: Home,
  },
  {
    path: '/gen-image',
    name: RouteNames.GenImage,
    component: GenImage,
    meta: {
      title: '1',
    },
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
