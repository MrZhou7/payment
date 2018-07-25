import axios from 'axios'

axios.defaults.baseURL = "../../static";

var qs = require('qs');//处理参数的模块，node中导入模块的方式require

export const addressData = parmas =>{return axios.get('/city.js').then(res=>res.data).catch(error=>error)} //获取商品信息
