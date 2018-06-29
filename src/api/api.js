import axios from 'axios'
axios.defaults.baseURL = '../static';//配置端口地址

var qs = require('qs');//处理参数的模块，node中导入模块的方式require

//params是参数对象
export  const newList = (parmas)=>{
  return axios.get('list.json')
    .then(res=>res.data)
}
