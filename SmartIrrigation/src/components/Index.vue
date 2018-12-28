<template>
  <div class="main row">
    <SideLeft :userName="userData.name"></SideLeft>
    <div class="col s12 m9 l9 xl10 offset-m3 offset-l3 offset-xl2 side-right">
      <Header :userName="userData.name"></Header>
      <transition mode="out-in">
        <router-view></router-view>
      </transition>
    </div>
  </div>
</template>

<script>
  import '../libs/materialize/css/materialize.min.css'
  import '../fonts/font.css'
  import '../libs/echart/js/echarts.min.js'

  import {RET} from '../utils/respcode.js'
  import utils from '../utils/utils.js'

  import {MqttClient} from "../utils/MqttClient";

  var moment = require('moment')

  import SideLeft from './indexsubcomp/SideLeft.vue'
  import Header from './indexsubcomp/Header.vue'
  import HumTmpListonComp from './indexsubcomp/HumTmpListenComp.vue'
  import SwitchControlComp from './indexsubcomp/SwitchControlComp.vue'
  import SmartControlComp from './indexsubcomp/SmartControlComp.vue'
  import HistoryDataComp from './indexsubcomp/HistoryDataComp.vue'
  import LightMQListenComp from './indexsubcomp/LightMQListenComp.vue'
  import SettingsComp from './indexsubcomp/SettingsComp.vue'
  import LoginComp from './indexsubcomp/LoginComp.vue'
  import HelpComp from './indexsubcomp/HelpComp.vue'
  // const HumTmpListonComp = r => require(['./indexsubcomp/HumTmpListenComp.vue',r])
  // const SwitchControlComp = r => require(['./indexsubcomp/SwitchControlComp.vue',r])
  // const SmartControlComp = r => require(['./indexsubcomp/SmartControlComp.vue',r])
  // const HistoryDataComp = r => require(['./indexsubcomp/HistoryDataComp.vue',r])
  // const LightMQListenComp = r => require(['./indexsubcomp/LightMQListenComp.vue',r])
  // const SettingsComp = r => require(['./indexsubcomp/SettingsComp.vue',r])
  // const LoginComp = r => require(['./indexsubcomp/LoginComp.vue',r])
  // const HelpComp = r => require(['./indexsubcomp/HelpComp.vue',r])


  import  VueRouter from 'vue-router'
  import Vuex from 'vuex'

  import Vue from 'vue'
  Vue.use(VueRouter)
  Vue.use(Vuex)

  var router = new VueRouter({
    linkActiveClass: 'side-left-active',
    routes: [
      {path: '/', redirect: '/humtmplisten'},
      {path: '/humtmplisten', component: HumTmpListonComp},
      {path: '/switchcontrol', component: SwitchControlComp},
      {path: '/smartcontrol', component: SmartControlComp},
      {path: '/historydata', component: HistoryDataComp},
      {path: '/lightmqlisten', component: LightMQListenComp},
      {path: '/settings', component: SettingsComp},
      {path: '/login', component: LoginComp},
      {path: '/help', component: HelpComp},
    ]
  })

  var store = new Vuex.Store({
    state: {
      count: 99,
      email: '{}',
      mqttUser: null,
      mqttPassword: null,
      mqttClient: null,
      mqttClientID: null,
      mqttLightNowData: -1,
      mqttMQNowData: -1,
      mqttHumNowData: [{sensorValue: 0, sensorID: 0, sensorTime: '00:00:00'}, {sensorValue: 0, sensorID: 0, sensorTime: '00:00:00'}], // {sensorValue: '', sensorID: '', sensorTime: ''}
      mqttTmpNowData: [{sensorValue: 0, sensorID: 0, sensorTime: '00:00:00'}, {sensorValue: 0, sensorID: 0, sensorTime: '00:00:00'}],
      mqttLightRelayState: {},
      mqttWaterRelayState: [{deviceValue: 0, deviceID: 0, deviceTime: '00:00:00'}, {deviceValue: 0, deviceID: 0, deviceTime: '00:00:00'}],
      autoCtlCfg: `{"water_ctl_time":{"start_time":null,"end_time":null,"operator":null,"status":false},"water_ctl_tmp":{"threshold":null,"operator":null,"status":false},"water_ctl_hum":{"threshold":">50","operator":"开","status":false}}`,
      historyData: `{"count":0,"history_data": []}`,
    },
    mutations: {

    },
    getters: {
      mqttHumNowDataHum(state) {
        let arr2 = []
        for(let i=0; i < state.mqttHumNowData.length; i++) {
          arr2.push(state.mqttHumNowData[i].sensorValue)
        }
        return arr2
      },
      mqttHumNowDataTime(state) {
        let arr1 = []
        for(let i=0; i < state.mqttHumNowData.length; i++) {
          arr1.push(state.mqttHumNowData[i].sensorTime)
        }
        return arr1
      },
      mqttTmpNowDataHum(state) {
        let arr2 = []
        for(let i=0; i < state.mqttTmpNowData.length; i++) {
          arr2.push(state.mqttTmpNowData[i].sensorValue)
        }
        return arr2
      },
      mqttTmpNowDataTime(state) {
        let arr1 = []
        for(let i=0; i < state.mqttTmpNowData.length; i++) {
          arr1.push(state.mqttTmpNowData[i].sensorTime)
        }
        return arr1
      }
    }
  })

  export default { // 向外暴露对象
    data() {
      return{
        userData: {name: null},
        newMessage: null,
      }
    },
    router,
    store,
    components: {
      SideLeft,
      Header
    },
    mounted() {
      console.log('index.vue mounted')
      document.addEventListener('DOMContentLoaded', function() {
        let elems = document.querySelectorAll('.modal');
        let instances = M.Modal.init(elems, {});
      });
    },
    watch: {

    },
    methods: {
      checkLogin(cb=()=>{}) {
        this.$axios.get('users/sessions').then(resp=>{
          console.log(resp)
          if(resp.data.errno == RET.NODATA) { // 没有数据
            return console.log('没有登陆')
          }
          if(resp.data.errno == RET.OK) { // 确实登陆了
            console.log(resp.data.data.name)
            this.userData.name = resp.data.data.name
          }
        }).catch(err=>{
          alert(err)
          console.log('未知失败')
        }).finally(()=>{
          cb()
        })
      },

      getMqttProfile(scb=()=>{}){
        this.$axios.get('users/mqttprofile').then(resp=>{
          if (resp.data.errno == RET.OK) { // 保存mqtt user 和 密码
            this.$store.state.mqttUser = resp.data.data.mqtt_user
            this.$store.state.mqttPassword = resp.data.data.mqtt_password
            console.log('mqtt-user:'+ this.$store.state.mqttUser)
            scb()
          } else {
            console.log('getMqttProfile: ', resp)
          }
        }).catch(err=>{
          console.log('getMqttProfile: ', err)
        })
      },

      onMqttMessage(message) {
        
        if (message.payloadString.startsWith('autoctl:')) {
          console.log(message.payloadString)
          indexThis.$store.state.autoCtlCfg = message.payloadString.slice('autoctl:'.length)
          return
        }

        if (message.payloadString.startsWith('query_history_data:')) {
          console.log(message.payloadString)
          indexThis.$store.state.historyData = message.payloadString.slice('query_history_data:'.length)
          return
        }

        if (message.payloadString.startsWith('email:')) {
          console.log(message.payloadString)
          indexThis.$store.state.email = message.payloadString.slice('email:'.length)
          return
        }
        
        let tmpList = message.payloadString.split('_')
        console.log(message.payloadString)

        let sensorid = parseInt(tmpList[0], 16) // 传感器 或者 继电器等外设的id

        if (parseInt('10', 16) <= sensorid && parseInt('1F', 16) > sensorid) { // 温度
          let tmpObj = {}
          tmpObj['sensorID'] = tmpList[0]
          tmpObj['sensorValue'] = tmpList[1]
          tmpObj['sensorTime'] = moment().format('HH:mm:ss')
          // 把第一个 pop 在最后一个追加 总共8
          let mqttHumNowData = indexThis.$store.state.mqttHumNowData
          if (mqttHumNowData.length > 7) {
            indexThis.$store.state.mqttHumNowData.shift()
          }
          Vue.set(indexThis.$store.state.mqttHumNowData, mqttHumNowData.length, tmpObj);
        } else if(parseInt('20', 16) <= sensorid && parseInt('2F', 16) > sensorid) { // 湿度
          let tmpObj = {}
          tmpObj['sensorID'] = tmpList[0]
          tmpObj['sensorValue'] = tmpList[1]
          tmpObj['sensorTime'] = moment().format('HH:mm:ss')
          let mqttTmpNowData = indexThis.$store.state.mqttTmpNowData
          if (mqttTmpNowData.length > 7) {
            indexThis.$store.state.mqttTmpNowData.shift()
          }
          Vue.set(indexThis.$store.state.mqttTmpNowData, mqttTmpNowData.length, tmpObj);
        } else if(parseInt('0', 16) <= sensorid && parseInt('0F', 16) > sensorid) { // 继电器
          let deviceID = tmpList[0]
          Vue.set(indexThis.$store.state.mqttLightRelayState, deviceID, {deviceID, deviceValue: tmpList[1], deviceTime: moment().format('HH:mm:ss')});
          // indexThis.$store.state.mqttLightRelayState.set(deviceID, {deviceValue: tmpList[1], deviceTime: moment().format('HH:mm:ss')})
          console.log(indexThis.$store.state.mqttLightRelayState)
          indexThis.$store.state.count = 88
        } else if (parseInt('30', 10) <= sensorid && parseInt('3F', 16) > sensorid) {
          let deviceID = tmpList[0]
          indexThis.$store.state.mqttMQNowData = tmpList[1]
        } else if (parseInt('40', 10) <= sensorid && parseInt('4F', 16) > sensorid) {
          let deviceID = tmpList[0]
          indexThis.$store.state.mqttLightNowData = tmpList[1]
        }

      },

      onMqttClose(err) {
        console.error('MQTT close!!!!')
        console.log(err);
        M.toast({html: '服务连接失败，请刷新页面！', displayLength: 900000})
      },

      initDeviceState() {
        console.log('init device state')
      },
      onMqttConnected :function() {
        let toastElement = document.querySelector('.toast');
        let toastInstance = M.Toast.getInstance(toastElement);
        toastInstance.dismiss();
        M.toast({html: '连接服务成功！'})
        indexThis.$options.methods.initDeviceState()
        indexThis.$store.state.mqttClient.send("query_relay_state")
        setTimeout(function () {
          indexThis.$store.state.mqttClient.send("query_auto_ctl_cfg")
        }.bind(this), 1000)
        setTimeout(function () {
          indexThis.$store.state.mqttClient.send('query_email')
        }.bind(this), 2000)
      },

      connectMqtt() {
        let uuid = utils.generateUUID()
        this.$store.state.mqttClientID = 'browser_'+uuid
        this.$store.state.mqttClient = new MqttClient(
          'iot.alonebo.top', // mqtt server ip
          this.$store.state.mqttClientID , // client id (唯一)
          this.$store.state.mqttUser,// user name
          this.$store.state.mqttPassword, // user password
          'arduino_server/01', // publishTopic 发布到哪个主题
          'arduino/01') // subscribeTopic 订阅哪个主题
        this.$store.state.mqttClient.connect(
          this.$options.methods.onMqttConnected,
          this.$options.methods.onMqttMessage, // 参数2 新的消息回调
          this.$options.methods.onMqttClose) // 参数3 连接关闭
      }
    },
    created() {
      // 1 获取用户信息 用户名 验证是否登陆 没有登陆直接跳转到login页面
      // 2 获取订阅需要的用户名和密码 订阅消息
      // 3 创建MQTT连接 把接收到的数据存储到vuex
      // 4 HumTmpListenComp.vue 需要获取vuex的数据
      window.indexThis = this
        this.checkLogin(()=>{
        if (this.userData.name==null) {
          return location.href = '/login.html?d=nologin' // 结束
        }
        M.toast({html: '正在连接服务，长时间未连接请刷新...', displayLength: 900000})
        // 登陆成功 获取用户信息 mqtt——user password
        this.getMqttProfile(()=>{
          this.connectMqtt()
        })
      })
      console.log('Index.vue created.')
    }
  }
</script>



<style scoped>
  .side-right {
    padding: 0 !important;;
  }

  .v-enter,
  .v-leave-to {
    opacity: 0;
    transform: translateY(-20px);
  }

  .v-enter-active,
  .v-leave-active {
    transition: all 0.5s ease;
  }

</style>

