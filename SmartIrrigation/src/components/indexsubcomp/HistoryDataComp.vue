<template>
	<div class="content">

		<SubHeaderCommon title="历史数据查询" iContent="history"></SubHeaderCommon>

		<div class="desc center" style="padding-left: 20px;padding-right: 20px" v-show="!isFirst">

			查询到:{{count}}条数据
			<p class="hide-on-small-only" style="display: inline; margin-left: 5px">只有在温度偏差大于2、湿度偏差大于10才会保存数据</p>

		</div>
		<div class="row" style="padding-left: 20px;padding-right: 20px">
			<div class="col s12 m3 input-field">
				<input type="text" id="input-time" placeholder="选择查询日期" v-model="inputTime">
				<label for="input-time" class="active">查询日期</label>
			</div>
			<div class="col s12 m3">
				<button class="waves-effect waves-light btn" @click="getHistoryData(1,20,inputTime)" style="margin-top: 10px;">查询</button>
			</div>
		</div>
		<!--<button @click="getHistoryData(1, 20, '2018-12-15')">查询昨天</button>-->
		<table class="striped centered" >
			<thead>
			<tr v-show="!isFirst">
				<th>传感器名称</th>
				<th>值</th>
				<th>时间</th>
			</tr>
			</thead>

			<tbody>
			<tr v-for="item in historyDataComp">
				<td>{{item[0] | sensorName}}</td>
				<td>{{item[1] | sensorValue(item[0])}}</td>
				<td>{{item[2]}}</td>
			</tr>
			</tbody>
		</table>

		<ul class="pagination center">

			<li :class="[currentPage==1?'disable':'waves-effect']" v-show="count!=0&&currentPage!=1">
				<a @click.prevent.stop="getHistoryData(currentPage-1, size, inputTime)">
					<i class="material-icons" :style="{color:currentPage==1?'#ccc':''}">chevron_left</i>
				</a>
			</li>
			<li v-for="n in pageCountComp" :class="['waves-effect', n==currentPage?'active':'']"><a  @click.prevent.stop="getHistoryData(n, size, inputTime)">{{n}}</a></li>

			<li :class="[currentPage==pageCountComp?'disable':'waves-effect']" v-show="count!=0&&currentPage!=pageCountComp">
				<a @click.prevent.stop="getHistoryData(currentPage+1, size, inputTime)"><i class="material-icons" :style="{color:currentPage==pageCountComp?'#ccc':''}">chevron_right</i></a>
			</li>

		</ul>
	</div>
</template>

<script>
	import SubHeaderCommon from './SubHeaderCommon.vue'
	import Vue from 'vue'

  var moment = require('moment')

  export default {
    name: "HistoryDataComp",
	  data:()=>{return{
      historyData: null,
		  isFirst: true,
		  count: 0,
		  inputTime: moment().format('YYYY-MM-DD'),
		  today: moment().format('YYYY-MM-DD'),
		  currentPage: 1,
		  size: 20, // 每一页数据的长度
      datepickerInstances: null
	  }},
	  components: {
      SubHeaderCommon,
	  },
	  created() {
      console.log('HistoryDataComp created')

      console.log(this.$store.state.historyData)
		  console.log(moment().format('YYYY-MM-DD'))
	  },
		mounted(){
      console.log('HistoryDataComp mounted')
      console.log(this.$store.state.historyData)
      let tmp = JSON.parse(this.$store.state.historyData)
      this.historyData = JSON.stringify(tmp['history_data'])
      // Vue.set(this, 'historyData', tmp['history_data']);
      this.count =  parseInt(tmp['count'])
      document.addEventListener('DOMContentLoaded', function() {
        var elems = document.querySelectorAll('.datepicker');
        M.Datepicker.init(elems, {format: 'yyyy-mm-dd'});

      });
		},
	  methods: {
      getHistoryData(page, size, date=this.today) {
        // if (page == this.currentPage) return
        this.$store.state.mqttClient.send('query_history_data:{"page": '+page+', "size": '+size+', "date":"' +date+ '"}')
	      this.currentPage = page
	      this.isFirst = false
      }
	  },
	  watch: {
      '$store.state.historyData': function(newValue){
        console.log('$store.state.historyData 改变了')
	      let tmp = JSON.parse(newValue)
				this.historyData = JSON.stringify(tmp['history_data'])
        // Vue.set(this, 'historyData', tmp['history_data']);
        this.count = parseInt(tmp['count'])
      },
	  },
	  computed: {
      historyDataComp(){
        let tmp = JSON.parse(this.historyData)
        if (tmp && tmp.length>0) {
          return tmp.reverse()
        }
       return tmp
		  },

      pageCountComp(){
        let res = Math.ceil(parseInt(this.count) / this.size)
        return res
      },
	  },
    filters: {
      sensorName:(value)=>{
        let sensorid = parseInt(value, 16)

        if (parseInt('10', 16) <= sensorid && parseInt('1F', 16) > sensorid) { // 温度
          return "[温]度传感器[" + sensorid +']'
        } else if (parseInt('20', 16) <= sensorid && parseInt('2F', 16) > sensorid) {
          return "湿度传感器[" + sensorid +']'
        }
        return value
      },
      sensorValue:(sensorValue, valueID)=>{
        let sensorid = parseInt(valueID, 16)

        if (parseInt('10', 16) <= sensorid && parseInt('1F', 16) > sensorid) { // 温度
          return sensorValue+'°C'
        } else if (parseInt('20', 16) <= sensorid && parseInt('2F', 16) > sensorid) {
          return sensorValue+"%"
        }
        return '?'
	    }
    }
  }
</script>

<style scoped>
	.nav-content {
		border-top: 1px solid #689f30;
		background: #689f38;
	}
	.input-filter-kw {

	}
	.input-filter-kw input {

	}

	.input-filter-kw input:focus {

	}
	.pagination.center .active {
		background: #689f38;
	}

</style>