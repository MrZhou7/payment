import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);

import Catelogue from '../pages/catelogue.vue'
import Orders from '../pages/orders.vue'
import Detail from '../pages/details'
import Address from '../pages/address'
import NewAddress from '../pages/newAddress'

export default new Router({
  routes: [
    {path: '/',component:Catelogue,meta:{title:"商品列表"}},
    {path: '/index',component:Catelogue,name:'Catelogue'},
    {path: '/orders',component:Orders,name:'Orders'},
    {path: '/details',component:Detail,name:'Detail'},
    {path: '/address',component:Address,name:'Address'},
    {path: '/newAddress',component:NewAddress,name:'NewAddress'}
  ]
})

