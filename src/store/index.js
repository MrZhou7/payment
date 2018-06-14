import Vue from 'vue'
import Vuex from 'vuex'
import  actions from './actions'
import  getters from './getters'
import  mutations from './mutations'

Vue.use(Vuex);

var state = {

};

const store = new Vuex.Store({
  state,
  actions,
  getters,
  mutations
});

export default store;
