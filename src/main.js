// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import 'lib-flexible'
import $ from 'jquery'
import store from './store/index'
import axios from 'axios'
import Mint from 'mint-ui';
import 'mint-ui/lib/style.css'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import  'swiper/dist/css/swiper.css'

Vue.config.productionTip = false;
Vue.prototype.axios = axios;
Vue.use(Mint);
Vue.use(VueAwesomeSwiper)

//引入公共过滤器js
import filters from './api/filters.js'
//过滤器统一处理加载
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
});

//下拉加载数据  注册全局
import infiniteScroll from 'vue-infinite-scroll'
Vue.use(infiniteScroll);

router.beforeEach((to, from, next) => {//beforeEach是router的钩子函数，在进入路由前执行
  if (to.meta.title) {//判断是否有标题
    document.title = to.meta.title
  }
  next()//执行进入路由，如果不写就不会进入目标页
});

//获取openId
/*Vue.prototype.GetRequest = function(){
  let nowUrl = window.location.href; //获取url中"?"符后的字串*!/
  //console.log(nowUrl);
  let str = nowUrl.lastIndexOf("=");
  //console.log(str)
  let openId = nowUrl.substring(str+1);//截取的openid
  let isHave = openId.indexOf("/");
  if(openId.length == 28 && isHave == -1){
    window.sessionStorage.setItem("openId",openId);
    this.axios({
      method:"post",
      url:"http://xds.huift.com.cn/server/openId",
      data:{"openId":openId}
    })
      .then((res)=>{
        let memberId = res.data.data.memberId;
        window.sessionStorage.setItem("memberId",memberId);
      })
  }
};*/
//获取openId
Vue.prototype.GetOpenId = function(){
  let Url = window.location.href; //获取url中"?"符后的字串*!/
  let str = Url.indexOf("#");
  let newUrl = Url.substring(str+2);
  console.log(newUrl);
  this.axios({
    method:"post",
    url:"http://xds.huift.com.cn/server/getOpenId",
  }).then((res)=>{
    //console.log(res.data.status)
    if(res.data.status == 1000){
      window.location.href = "http://xds.huift.com.cn/WechatConfirm/transfer/goConfirm?appid=DS0000&rtype=1&a=" + newUrl
    }else if(res.data.status == 200){
      let openId = res.data.message;
      window.sessionStorage.setItem("openId",openId);
      this.axios({
        method:"post",
        url:"http://xds.huift.com.cn/server/openId",
        data:{"openId":openId}
      })
        .then((res)=>{
          let memberId = res.data.data.memberId;
          window.sessionStorage.setItem("memberId",memberId);
        })
    }
  })
};


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
});
