import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);

import Index from '../pages/catelogue.vue'
import Orders from '../pages/orders.vue'

export default new Router({
  routes: [
    {path: '/',component:Index,meta:{title:"商品列表"}},
    {path: '/Index',component:Index},
    {path: '/Orders',component:Orders}

  ]
})

