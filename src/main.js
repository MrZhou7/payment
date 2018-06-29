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


Vue.config.productionTip = false;
Vue.prototype.axios = axios;
Vue.use(Mint);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
