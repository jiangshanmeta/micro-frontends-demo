import { RouteRecordRaw } from 'vue-router'
import Home from '../views/Home.vue'
// import './types'
const prefix = window.__POWERED_BY_QIANKUN__?'/vue3app':'';
const routes: Array<RouteRecordRaw> = [
  {
    path: `${prefix}/`,
    name: 'Home',
    component: Home
  },
  {
    path: `${prefix}/about`,
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

export default routes

// const router = createRouter({
//   history: createWebHashHistory(),
//   routes
// })

// export default router
