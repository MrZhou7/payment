import axios from 'axios'

axios.defaults.baseURL = 'http://xds.huift.com.cn:8080';//配置端口地址
//axios.defaults.timeout = 5000;
//axios.defaults.headers.post['Content-Type']='application/json;charset=UTF-8';   //响应时间
//axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';//配置请求头
// axios.defaults.withCredentials=true;  //解决跨域问题，后台也对应的有一个类，两者都加上才解决跨域的问题

//var querystring = require('querystring'); //和下面qs一样，两者都可以用
var qs = require('qs');//处理参数的模块，node中导入模块的方式require

//params是参数对象
export const newList = parmas =>{return axios.get('/goodlist').then(res=>res.data).catch(error=>error)} //获取商品信息

export const addressData = (parmas)=>{
  return axios.post('/address/Id',qs.stringify(params))
    .then(res=>res)
    .catch(error=>error)
}
