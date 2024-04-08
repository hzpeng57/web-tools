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
      title: '图片生成器',
    },
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

const commonTitle = '在线小工具'
router.beforeEach((to, from, next) => {
  if (to.meta.title)
    document.title = `${to.meta.title} - ${commonTitle}` as string
  else document.title = commonTitle
  next()
})

export default router
