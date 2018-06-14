import axios from 'axios'
axios.defaults.baseURL = 'http://rap.sueua.cn/mockjsdata/1/v1/goods';//配置端口地址

var qs = require('qs');//处理参数的模块，node中导入模块的方式require

//params是参数对象
export  const newList = (parmas)=>{
  return axios.post('http://rap.sueua.cn/mockjsdata/1/v1/goods')
    .then(res=>res.data)
}
