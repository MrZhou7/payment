import axios from 'axios'

axios.defaults.baseURL = 'http://xds.huift.com.cn/server';//配置端口地址
//axios.defaults.timeout = 5000;
//axios.defaults.headers.post['Content-Type']='application/json;charset=UTF-8';   //响应时间
//axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';//配置请求头
// axios.defaults.withCredentials=true;  //解决跨域问题，后台也对应的有一个类，两者都加上才解决跨域的问题

//var querystring = require('querystring'); //和下面qs一样，两者都可以用
var qs = require('qs');//处理参数的模块，node中导入模块的方式require

//params是参数对象
export const newList = (parmas) =>{
  return axios.get('/goodlist')
    .then(res=>res.data)
} //获取商品信息

export const orderList = (parmas) =>{
  return axios.post('/order')
    .then(res=>res.data)
} //获取订单信息

export const pay = (parmas) =>{
  return axios.post('/wechat/pay-config')
    .then(res=>res.data)
} //调取支付

export const address = (parmas) =>{
  return axios.post('/address/Id')
    .then(res=>res.data)
} //获取地点信息

export const defaultAddress = (parmas) =>{
  return axios.post('/address/IsDefault')
    .then(res=>res.data)
} //设置默认地址

export const deleteAddress = (parmas) =>{
  return axios.post('/address/delete')
    .then(res=>res.data)
} //删除地址

export const saveAddress = (parmas) =>{
  return axios.post('/address')
    .then(res=>res.data)
} //储存地址信息

export const orderDetailList = (parmas) =>{
  return axios.post('/order/orderId')
    .then(res=>res.data)
} //获取订单详情

export const allOrderList = (parmas) =>{
  return axios.post('/order/filter')
    .then(res=>res.data)
} //获取所有订单信息

export const deleteOrder = (parmas) =>{
  return axios.post('/delOrder')
    .then(res=>res)
} //删除某项订单
