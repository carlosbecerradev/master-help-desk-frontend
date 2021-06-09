import Vue from 'vue'
import Vuex from 'vuex'
import auth from './auth'
import request_type from './request_type'
import cutomer_request from './customer_request'
import ticket from './ticket'
import employee from './employee'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    api_base_url: "http://9f6285a1bdcb.ngrok.io/api",
  },
  mutations: {
  },
  actions: {
  },
  getters: {
    apiBaseURL: state => state.api_base_url,
  },
  modules: {
    auth,
    request_type,
    cutomer_request,
    ticket,
    employee,
  }
})
