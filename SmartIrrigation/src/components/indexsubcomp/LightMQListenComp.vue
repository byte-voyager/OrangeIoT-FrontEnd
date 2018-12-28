<template>
	<div>
		<SubHeaderCommon title="实时可燃气体监测" iContent="smoking_rooms"></SubHeaderCommon>
		<div id="mqChart" :style="{ height: '350px'}"></div>
		<div class="row">
			<p class="center">可燃气体: {{$store.state.mqttMQNowData}} <span>(1-200在安全范围，>200危险)</span></p>
		</div>

		<SubHeaderCommon title="实时光照监测" iContent="highlight"></SubHeaderCommon>
		<div id="lightChart" :style="{ height: '350px'}"></div>
		<div class="row">
			<p class="center">光照: {{$store.state.mqttLightNowData}} <span>(数值越小越亮)</span></p>
		</div>
	</div>
</template>

<script>
  import SubHeaderCommon from './SubHeaderCommon.vue'
  export default {
    name: "LightMQListenComp",
	  data: ()=>{
      return {
        mqChart: null,
        lightChart: null,
        mqChartOption: null,
        lightChartOption: null,
      }
    },
	  watch: {
      '$store.state.mqttMQNowData': function(newValue){
        // console.log('$store.state.mqttMQNowData 改变了')
	      if (this.mqChartOption) {
          this.mqChartOption.series[0].data[0].value = parseInt(newValue)
          this.mqChart.setOption(this.mqChartOption)
	      }
      },
      '$store.state.mqttLightNowData': function(newValue){
        // console.log('$store.state.mqttMQNowData 改变了')
        if (this.lightChartOption) {
          this.lightChartOption.series[0].data[0].value = parseInt(newValue)
          this.lightChart.setOption(this.lightChartOption)
        }
      }
	  },
	  mounted(){
      this.drawMQChart()
      this.drawLightChart()
      // 监听窗口大小改变事件 重绘图
      window.onresize = ()=> {
        this.mqChart.resize()
        this.lightChart.resize()
      }
	  },
	  methods: {
      drawMQChart() {
        this.mqChart = this.$echarts.init(document.getElementById('mqChart'))
        this.mqChartOption = {
          tooltip : {
            formatter: "{a} <br/>{b} : {c}"
          },
          toolbox: {
            show : true,
            feature : {
              mark : {show: true},
              restore : {show: true},
              saveAsImage : {show: true}
            }
          },
          series : [
            {
              name:'可燃气体',
              type:'gauge',
	            max: 1000,
              detail : {formatter:'{value}'},
              data:[{value: parseInt(this.$store.state.mqttMQNowData), name: '可燃气体'}],
              axisLine: {            // 坐标轴线
                lineStyle: {       // 属性lineStyle控制线条样式
                  color: [[0.2, '#00CD00'], [0.6, '#EE4000'],[1, '#EE0000']],
                  width: 8
                }
              },
            }
          ]
        };

        // clearInterval(timeTicket);
        // var timeTicket = setInterval(function (){
        //   // this.mqChartOption.series[0].data[0].value = (Math.random()*100).toFixed(2) - 0;
        //
        // }.bind(this),2000);
        this.mqChart.setOption(this.mqChartOption, true);
      },
      drawLightChart(){
        this.lightChart = this.$echarts.init(document.getElementById('lightChart'))
        this.lightChartOption = {
          tooltip : {
            formatter: "{a} <br/>{b} : {c}"
          },
          toolbox: {
            show : true,
            feature : {
              mark : {show: true},
              restore : {show: true},
              saveAsImage : {show: true}
            }
          },
          series : [
            {
              name:'光照强度',
              type:'gauge',
	            max:1000,
              splitNumber: 10,       // 分割段数，默认为5
              axisLine: {            // 坐标轴线
                lineStyle: {       // 属性lineStyle控制线条样式
                  color: [[0.1, '#EBEBEB'], [0.6, '#FF7F50'], [0.8, '#595959'],[1, '#000000']],
                  width: 8
                }
              },
              axisTick: {            // 坐标轴小标记
                splitNumber: 10,   // 每份split细分多少段
                length :12,        // 属性length控制线长
                lineStyle: {       // 属性lineStyle控制线条样式
                  color: 'auto'
                }
              },
              axisLabel: {           // 坐标轴文本标签，详见axis.axisLabel
                textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                  color: 'auto'
                }
              },
              splitLine: {           // 分隔线
                show: true,        // 默认显示，属性show控制显示与否
                length :30,         // 属性length控制线长
                lineStyle: {       // 属性lineStyle（详见lineStyle）控制线条样式
                  color: 'auto'
                }
              },
              pointer : {
                width : 5
              },
              title : {
                show : true,
                offsetCenter: [0, '-40%'],       // x, y，单位px
                textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                  fontWeight: 'bolder'
                }
              },
              detail : {
                formatter:'{value}',
                textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                  color: 'auto',
                  fontWeight: 'bolder'
                }
              },
              data:[{value: parseInt(this.$store.state.mqttLightNowData), name: '光照强度'}]
            }
          ]
        };

        // clearInterval(timeTicket);
        // var timeTicket = setInterval(function (){
        //   option.series[0].data[0].value = (Math.random()*100).toFixed(2) - 0;
        //
        // }.bind(this),2000);
        this.lightChart.setOption(this.lightChartOption, true);

      },
	  },
    components: {
      SubHeaderCommon
    }
  }

</script>

<style scoped>

</style>