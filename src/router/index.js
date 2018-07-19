import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);

import Mine from '../pages/mine.vue'
import Catelogue from '../pages/catelogue.vue'
import Orders from '../pages/orders.vue'
import Detail from '../pages/details'
import Address from '../pages/address'
import NewAddress from '../pages/newAddress'
import MyOrder from "../pages/myOrder"
import OrderDetail from "../pages/orderDetail"
import MyOrderDetail from "../pages/myOrderDetail"

export default new Router({
  routes: [
    {path: '/',component:Catelogue,meta:{title:"商品列表"}},
    {path: '/mine',component:Mine,name:'Mine'},
    {path: '/index',component:Catelogue,name:'Catelogue'},
    {path: '/orders/:dataId',component:Orders,name:'Orders'},
    {path: '/details/:dataId',component:Detail,name:'Detail'},
    {path: '/address',component:Address,name:'Address'},
    {path: '/newAddress',component:NewAddress,name:'NewAddress'},
    {path: '/myOrder',component:MyOrder,name:'MyOrder'},
    {path: '/orderDetail',component:OrderDetail,name:'OrderDetail'},
    {path: '/myOrderDetail',component:MyOrderDetail,name:'MyOrderDetail'}
  ]
})

