import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

export default new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'index',
      component: () => import('./pages/index')
    },
    {
      path: '/simple',
      name: 'simple',
      component: () => import('./pages/simple')
    },
    {
      path: '/animated',
      name: 'animated',
      component: () => import('./pages/animated')
    },
    {
      path: '/swipe',
      name: 'swipe',
      component: () => import('./pages/swipe')
    },
    {
      path: '/carousel',
      name: 'carousel',
      component: () => import('./pages/carousel')
    },
    {
      path: '/usage',
      name: 'usage',
      component: () => import('./pages/usage')
    },
    {
      path: '/mobile',
      name: 'mobile',
      component: () => import('./pages/mobile')
    }
  ]
})
