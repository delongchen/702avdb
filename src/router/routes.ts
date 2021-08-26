import { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    name: 'root',
    path: '/',
    redirect: '/ga'
  },
  {
    name: 'GoodAv',
    path: '/ga',
    component: () => import('@/views/GoodAv/index.vue')
  },
  {
    name: 'DirtyAv',
    path: '/da',
    component: () => import('@/views/DirtyAv/index.vue')
  }
]

export default routes
