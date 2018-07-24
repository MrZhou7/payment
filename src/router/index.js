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
import MyOrderDetail from "../pages/myOrderDetail"

import AllOrders from "../pages/myOrder/allOrders"
import NoGood from "../pages/myOrder/noGood"
import NoPay from "../pages/myOrder/noPay"
import NoSend from "../pages/myOrder/noSend"

export default new Router({
  routes: [
    {path: '/',component:Catelogue,meta:{title:"商品列表"}},
    {path: '/mine',component:Mine,name:'Mine'},
    {path: '/index',component:Catelogue,name:'Catelogue'},
    {path: '/orders',component:Orders,name:'Orders'},
    {path: '/details',component:Detail,name:'Detail'},
    {path: '/address',component:Address,name:'Address'},
    {path: '/newAddress',component:NewAddress,name:'NewAddress'},
    {path: '/myOrder',component:MyOrder,name:'MyOrder',
      children:[
        {path:'',component:AllOrders},
        {path:'allOrders',component:AllOrders},
        {path:'noGood',component:NoGood},
        {path:'noPay',component:NoPay},
        {path:'noSend',component:NoSend}
      ]
    },
    {path: '/myOrderDetail',component:MyOrderDetail,name:'MyOrderDetail'}
  ]
})

