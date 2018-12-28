<template>
	<div>
		<SubHeaderCommon title="实时温度" iClass="icon-nowing-data"></SubHeaderCommon>
		<div id="myChart" :style="{ height: '400px'}"></div>

		<div class="hum-desc" >
			<button class="waves-effect waves-light btn" style="background: #689f38" @click="isShowHumTextDesc=!isShowHumTextDesc" v-text="isShowHumTextDesc?'关闭温度文字详情':'显示温度文字详情'"></button>
			<ul v-show="isShowHumTextDesc">
				<li v-for="item in $store.state.mqttHumNowData">
					传感器id(hex): {{ item.sensorID }}, 时间: {{ item.sensorTime }}, 温度值: {{ item.sensorValue }}°C
				</li>
			</ul>
		</div>
		<SubHeaderCommon title="实时湿度" iClass="icon-nowing-data"></SubHeaderCommon>
		<div id="myChart2" :style="{ height: '400px'}"></div>

		<div class="tmp-desc" >
			<button class="waves-effect waves-light btn" style="background: #689f38" @click="isShowTmpTextDesc=!isShowTmpTextDesc" v-text="isShowTmpTextDesc?'关闭湿度文字详情':'显示湿度文字详情'"></button>
			<ul v-show="isShowTmpTextDesc">
				<li v-for="item in $store.state.mqttTmpNowData">
					传感器id(hex): {{ item.sensorID }}, 时间: {{ item.sensorTime }}, 湿度值: {{ item.sensorValue }}%
				</li>
			</ul>
		</div>

	</div>
</template>

<script>
	import SubHeaderCommon from './SubHeaderCommon.vue'

  // let echarts = require('echarts/lib/echarts')
  // 引入柱状图组件
  // let echarts = require('echarts/lib/echarts')
  // // 引入提示框和title组件
  // require('echarts/lib/component/tooltip')
  // require("echarts/lib/chart/lines");
  // require('echarts/lib/component/title')
  export default {
    name: 'hello',
    data () {
      return {
        isShowTmpTextDesc: false,
        isShowHumTextDesc: false,
        myChart: null, // 温度
        myChart2: null, // 湿度
	      option: null,
	      option2: null,
	      humValueData: this.$store.getters.mqttHumNowDataHum,
	      humTimeData: this.$store.getters.mqttHumNowDataTime,

	      tmpValueData: this.$store.getters.mqttTmpNowDataHum,
	      tmpTimeData: this.$store.getters.mqttTmpNowDataTime
      }
    },
	  computed: {
      humValueDataComput() {
        return this.$store.getters.mqttHumNowDataHum
      },
      tmpValueDataComput() {
        return this.$store.getters.mqttTmpNowDataHum
      }
	  },
	  watch: {
      'humValueDataComput': function (newValue) {
				this.option.xAxis.data = this.$store.getters.mqttHumNowDataTime
				this.option.series[0].data = this.$store.getters.mqttHumNowDataHum
	      this.myChart.setOption(this.option, true)
      },
      'tmpValueDataComput': function (newValue) {
        this.option2.xAxis.data = this.$store.getters.mqttTmpNowDataTime
        this.option2.series[0].data = this.$store.getters.mqttTmpNowDataHum
        this.myChart2.setOption(this.option2, true)
      }
	  },
    mounted(){
      this.drawLine();
      this.drawLine2();
      // 监听窗口大小改变事件 重绘图
      window.onresize = ()=> {
        this.myChart.resize()
        this.myChart2.resize()
      }
    },
    methods: {
      drawLine(){
        // 基于准备好的dom，初始化echarts实例
        this.myChart = this.$echarts.init(document.getElementById('myChart'))
        // 绘制图表
        let optionHum = {
          title: {
            text: ''
          },
          tooltip: {

            trigger: 'axis',
            formatter: 'Time:{b0}<br/>{a0}:{c0}°C'
          },
          legend: {
            data: ['温度']
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          toolbox: {
            feature: {
              saveAsImage: {}
            }
          },
          xAxis: {
            type: 'category',
            boundaryGap: false,
            data: this.humTimeData,
            axisLine: {
              onZero: false,
              lineStyle: {
                color: '#000'
              }
            },
          },
          yAxis: {
            type: 'value',
	          axisLabel: {
              formatter: '{value}°C'
	          }
          },
          series: [
            {
              name: '温度',
              type: 'line',
              stack: '总量',
              data: this.humValueData,
              smooth: true,
              itemStyle: {
                normal: {
                  color: '#ef5350',
                  lineStyle: {
                    color: '#ef5350'
                  }
                }
              }
            },

          ]
        };

        this.myChart.setOption(optionHum, true);
        this.option = optionHum
      },
      drawLine2(){
        // 基于准备好的dom，初始化echarts实例
        this.myChart2 = this.$echarts.init(document.getElementById('myChart2'))
        // 绘制图表
        let optionTemp = {
          title: {
            text: ''
          },
          tooltip: {
            trigger: 'axis',
            formatter: 'Time:{b0}<br/>{a0}:{c0} %'
          },
          legend: {
            data: ['湿度']
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          toolbox: {
            feature: {
              saveAsImage: {}
            }
          },
          xAxis: {
            type: 'category',
            boundaryGap: false,
            data: this.tmpTimeData,
            axisLine: {
              onZero: false,
              lineStyle: {
                color: '#000'
              }
            },
          },
          yAxis: {
            type: 'value',
            axisLabel: {
              formatter: '{value}%'
            }
          },
          series: [
            {
              name: '湿度',
              type: 'line',
              stack: '总量',
              data: this.tmpValueData,
              smooth: true,
              itemStyle: {
                normal: {
                  color: '#009688',
                  lineStyle: {
                    color: '#009688'
                  }
                }
              }
            },
          ]
        };

        this.myChart2.setOption(optionTemp, true);
        this.option2 = optionTemp
      }
    },
	  components: {
      SubHeaderCommon
	  }
  }
</script>

<style scoped lang="scss">
	.hum-desc, .tmp-desc {
		padding-left: 10px;
		margin-top: 12px;
	}
	.hum-desc {
		color: #ef5350;
	}
	.tmp-desc {
		color: #009688;
	}
</style>