import Vue from 'vue'
import Vuex from 'vuex'
import  actions from './actions'
import  getters from './getters'
import  mutations from './mutations'

Vue.use(Vuex);

var state = {
  addressList:[]//所有的地址信息

};

const store = new Vuex.Store({
  state,
  actions,
  getters,
  mutations
});

export default store;
