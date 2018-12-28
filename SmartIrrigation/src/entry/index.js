// 项目index入口文件

import '../libs/mqtt/mqttws31.js'

import Vue from 'vue' // 在配置文件里面设置了别名
// import Vue from '../../node_modules/vue/dist/vue'

// axios 测试
import Axios from 'axios'  // 导包
Axios.defaults.baseURL = '/api/v1.0/'
Vue.prototype.$axios = Axios // 给对象原型挂载属性

// 引入echarts
// import echarts from 'echarts'
//
//
// Vue.prototype.$echarts = echarts
let echarts = require('echarts/lib/echarts')

// 引入折线图等组件
require('echarts/lib/chart/line')
// require('echarts/lib/chart/bar')
// require('echarts/lib/chart/radar')
require("echarts/lib/chart/gauge");
// 引入提示框和title组件，图例
require('echarts/lib/component/tooltip')
require('echarts/lib/component/title')
require('echarts/lib/component/legend')
// require('echarts/lib/component/legendScroll')//图例翻译滚动

Vue.prototype.$echarts = echarts

import Index from '../components/Index.vue'


let vm = new Vue({
  el: '#app',
  render: createEle=>createEle(Index),
})

window.vm = vm
