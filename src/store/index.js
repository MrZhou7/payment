import Vue from 'vue'
import Vuex from 'vuex'
import  actions from './actions'
import  getters from './getters'
import  mutations from './mutations'

Vue.use(Vuex);

var state = {
  addressList:[],//所有的地址信息
  indexNum:0, //地址裂变显示索引
  num:1,  //购买商品的数量
  showNum:"1",//判断详情页的返回键显示隐藏
  disabled:true,   //禁用按钮
  global: {
    aloneShop: "https://xds.huift.com.cn/server/good/Id",//获取单个商品信息
    newList: 'https://xds.huift.com.cn/server/goodlist',//获取商品信息
    orderList: 'https://xds.huift.com.cn/server/order',//获取订单信息
    pay: 'https://xds.huift.com.cn/server/wechat/pay-config',//调取支付
    address: 'https://xds.huift.com.cn/server/address/Id',//获取地点信息
    defaultAddress: 'https://xds.huift.com.cn/server/address/IsDefault',//设置默认地址
    deleteAddress: 'https://xds.huift.com.cn/server/address/delete',//删除地址
    saveAddress: 'https://xds.huift.com.cn/server/address',//储存地址信息
    orderDetailList:'https://xds.huift.com.cn/server/order/orderId',//获取订单详情
    allOrderList:'https://xds.huift.com.cn/server/order/filter',//获取所有订单信息
    deleteOrder:'https://xds.huift.com.cn/server/delOrder',//删除某项订单
    finishOrder:'https://localhost:10001/server/finishOrder'//确认收货
  }
};

const store = new Vuex.Store({
  state,
  actions,
  getters,
  mutations
});

export default store;
