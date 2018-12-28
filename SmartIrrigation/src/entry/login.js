console.log('route page init')

import Vue from 'vue'
import Login from '../components/Login.vue'

import Axios from 'axios'
Axios.defaults.baseURL = '/api/v1.0/'
Vue.prototype.$axios = Axios


// 也可以抽离上面路由相关的
// import {router} from '../routedetach.js'

new Vue({
  el: '#app',
  render: createEle=>createEle(Login)
})