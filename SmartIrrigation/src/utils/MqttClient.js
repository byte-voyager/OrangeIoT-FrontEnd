// require('../libs/mqtt/mqttws31.js')
export class MqttClient {
  constructor(hostname, clientId, userName, password, publishTopic, subscribeTopic, port = 8083,) {
    this.hostname = hostname
    this.clientId = clientId
    this.userName = userName
    this.password = password
    this.publishTopic = publishTopic
    this.subscribeTopic = subscribeTopic
    this.client = new Paho.Client(hostname, port, clientId)
  }
  connect(onConnect, onMessageArrived, onConnectionLost, onFailure= e=>{console.log(e)}) {
    let options = {
      invocationContext: {
        host : this.hostname,
        port: this.port,
        path: this.client.path,
        clientId: this.clientId
      },
      timeout: 10,
      keepAliveInterval: 50,
      cleanSession: false,
      useSSL: false,
      userName: this.userName,
      password: this.password,
      onSuccess: ()=>{
        console.log('connected mqtt server')
        this.client.subscribe(this.subscribeTopic);
        onConnect()
      },
      onFailure: onFailure
    };
    this.client.connect(options)
    this.client.onMessageArrived = onMessageArrived
    this.client.onConnectionLost = onConnectionLost
  }

  send(msg) {
    let message = new Paho.Message(msg);
    console.log('this ===> ');
    console.dir(this)
    message.destinationName = "arduino_server/01";
    this.client.send(message);
    console.log('send success: ', msg)
  }
}


//
// var hostname = 'iot.alonebo.top',
//   port = 8083,
//   clientId = 'client-js',
//   timeout = 5,
//   keepAlive = 50,
//   cleanSession = false,
//   ssl = false,
//   userName = 'alonebo',
//   password = '976447044',
//   publish_topic = 'arduino_server/01'
// topic = 'arduino/01';
// client = new Paho.MQTT.Client(hostname, port, clientId);
// //建立客户端实例
// var options = {
//   invocationContext: {
//     host : hostname,
//     port: port,
//     path: client.path,
//     clientId: clientId
//   },
//   timeout: timeout,
//   keepAliveInterval: keepAlive,
//   cleanSession: cleanSession,
//   useSSL: ssl,
//   userName: userName,
//   password: password,
//   onSuccess: onConnect,
//   onFailure: function(e){
//     console.log(e);
//   }
// };
// client.connect(options);
// //连接服务器并注册连接成功处理事件
// function onConnect() {
//   console.log("onConnected");
//   client.subscribe(topic);
// }
//
// client.onConnectionLost = onConnectionLost;
//
// //注册连接断开处理事件
// client.onMessageArrived = onMessageArrived;
//
// //注册消息接收处理事件
// function onConnectionLost(responseObject) {
//   console.log(responseObject);
//   if (responseObject.errorCode !== 0) {
//     console.log("onConnectionLost:"+responseObject.errorMessage);
//     console.log("连接已断开");
//   }
// }
//
// function onMessageArrived(message) {
//   console.log("收到消息:"+message.payloadString);
// }
//
// function send(){
//   var s = document.getElementById("msg").value;
//   if(s){
//     // s = "{time:"+new Date().Format("yyyy-MM-dd hh:mm:ss")+", content:"+(s)+", from: web console}";
//     message = new Paho.MQTT.Message(s);
//     message.destinationName = publish_topic;
//     client.send(message);
//     document.getElementById("msg").value = "";
//   }
// }
//
// var count = 0;
//
// function start(){
//   window.tester = window.setInterval(function(){
//     if(client.isConnected){
//       var s = "{time:"+new Date().Format("yyyy-MM-dd hh:mm:ss")+", content:"+(count++)+", from: web console}";
//       message = new Paho.MQTT.Message(s);
//       message.destinationName = publish_topic;
//       client.send(message);
//     }
//   }, 1000);
// }
//
// function stop(){
//   window.clearInterval(window.tester);
// }
//
// Date.prototype.Format = function (fmt) { //author: meizz
//   var o = {
//     "M+": this.getMonth() + 1, //月份
//     "d+": this.getDate(), //日
//     "h+": this.getHours(), //小时
//     "m+": this.getMinutes(), //分
//     "s+": this.getSeconds(), //秒
//     "q+": Math.floor((this.getMonth() + 3) / 3), //季度
//     "S": this.getMilliseconds() //毫秒
//   };
//   if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
//   for (var k in o)
//     if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
//   return fmt;
// }