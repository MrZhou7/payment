import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);

import Index from '../pages/catelogue.vue'

export default new Router({
  routes: [
    {
      path: '/',
      component:Index
    },
    {
      path: '/Index',
      component:Index
    }
  ]
})
