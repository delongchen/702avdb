import { RouteRecordRaw } from 'vue-router'
import UserLayout from '@/layout/UserLayout.vue'

const avPage: RouteRecordRaw = {
  name: 'av',
  path: '/av',
  redirect: '/av/ga',
  component: () => import('@/layout/MainLayout.vue'),
  children: [
    {
      name: 'GoodAv',
      path: 'ga',
      component: () => import('@/views/GoodAv/index.vue')
    },
    {
      name: 'DirtyAv',
      path: 'da',
      component: () => import('@/views/DirtyAv/index.vue')
    }
  ]
}

const routes: RouteRecordRaw[] = [
  {
    name: 'user',
    path: '/user',
    component: UserLayout,
    redirect: '/user/login',
    children: [
      {
        name: 'login',
        path: 'login',
        component: () => import('@/views/Login.vue')
      },
    ]
  },
  avPage
]

export default routes
