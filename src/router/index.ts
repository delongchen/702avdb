import { createRouter, createWebHistory } from 'vue-router'
import routes from "@/router/routes";

const router = createRouter({
  history: createWebHistory('/av'),
  routes
})

export default router
