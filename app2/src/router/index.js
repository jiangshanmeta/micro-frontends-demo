// import Vue from 'vue'
// import VueRouter from 'vue-router'
// import Home from '../views/Home.vue'
const prefix = window.__POWERED_BY_QIANKUN__?'/app2':'';
// Vue.use(VueRouter)

const routes = [
  {
    path: `${prefix}/`,
    name: 'Home',
    component: ()=>import('../views/Home.vue')
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

export default routes;

// const router = new VueRouter({
//   routes
// })

// export default router
