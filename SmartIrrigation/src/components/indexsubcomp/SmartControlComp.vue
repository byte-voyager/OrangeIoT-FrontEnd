<template>
	<div>
		<SubHeaderCommon title="滴水智能控制" iContent="local_cafe"></SubHeaderCommon>
		<div class="content">
			<div class="row">
				<div class="col s12 m6">
					<div class="card grey lighten-4">
						<div class="card-content black-text">
							<span class="card-title"> <i class="icon iconfont icon-water-switch" style="color: #689f38;font-size: 24px;font-size: 34px;position: relative;right: 10px;"></i>滴水控制-时间段(每天)</span>
							<p>注：控制滴水2设备</p>
							<div class="row">
								<div class="input-field col s6">
									<input id="control_begin_time" type="text" class="validate" v-model="waterCtlTimeStartTime">
									<label for="control_begin_time" :class="[waterCtlTimeStartTime?'active':'']">开始时间(eg:14:05)</label>
								</div>
								<div class="input-field col s6">
									<input id="control_end_time" type="text" class="validate" v-model="waterCtlTimeEndTime">
									<label for="control_end_time" :class="[waterCtlTimeEndTime?'active':'']">结束时间(eg:16:10)</label>
								</div>
								<div class="input-field col s6">
									<select v-model="waterCtlTimeOperator" class="browser-default">
										<option value="" disabled selected>选择对应操作</option>
										<option value="开">开</option>
										<option value="关">关</option>
									</select>

								</div>
								<p class="checkbox-is-open">
									<label>
										<input type="checkbox" class="filled-in" checked="checked" v-model="waterCtlTimeStatus" />
										<span>开启</span>
									</label>
								</p>
							</div>
						</div>
					</div>
				</div>

				<div class="col s12 m6">
					<div class="card grey lighten-4">
						<div class="card-content black-text">
							<span class="card-title"> <i class="icon iconfont icon-water-switch" style="color: #689f38;font-size: 24px;font-size: 34px;position: relative;right: 10px;"></i>滴水控制-温度值</span>
							<p>注：控制滴水0设备</p>
							<div class="row">
								<div class="input-field col s6">
									<input id="control_begin_time2" type="text" class="validate" v-model="waterCtlTmpThreshold">
									<label for="control_begin_time2" :class="[waterCtlTmpThreshold?'active':'']">临界值°C(eg:>25/<25)</label>
								</div>
							</div>
							<div class="row">
								<div class="input-field col s6">
									<select  v-model="waterCtlTmpOperator" class="browser-default">
										<option value="" disabled selected>选择对应操作</option>
										<option value="开" :selected="waterCtlTmpOperator=='开'?'selected':''">开</option>
										<option value="关" :selected="waterCtlTmpOperator=='关'?'selected':''">关</option>
									</select>

								</div>
								<p class="checkbox-is-open">
									<label>
										<input type="checkbox" class="filled-in" checked="checked" v-model="waterCtlTmpStatus" />
										<span>开启</span>
									</label>
								</p>
							</div>
						</div>
					</div>
				</div>
				<div class="col s12 m6">
					<div class="card grey lighten-4">
						<div class="card-content black-text">
							<span class="card-title"> <i class="icon iconfont icon-water-switch" style="color: #689f38;font-size: 24px;font-size: 34px;position: relative;right: 10px;"></i>滴水控制-湿度值</span>
							<p>注：控制滴水1设备</p>
							<div class="row">
								<div class="input-field col s6">
									<input id="control_begin_time3" type="text" class="validate" v-model="waterCtlHumThreshold" :placeholder="waterCtlHumThreshold">
									<label for="control_begin_time3" :class="[waterCtlHumThreshold?'active':'']">临界值%(eg:>60/<70)</label>
								</div>
							</div>
							<div class="row">
								<div class="input-field col s6">

									<select v-model="waterCtlHumOperator" class="browser-default">
										<!--<option value="" disabled>选择对应操作</option>-->
										<option value="" disabled>选择对应操作</option>
										<option value="开" selected>开</option>
										<option value="关">关</option>
									</select>

								</div>
								<p class="checkbox-is-open">
									<label>
										<input type="checkbox" class="filled-in" checked="checked" v-model="waterCtlHumStatus"/>
										<span>开启</span>
									</label>
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>

		<!-- Modal Structure -->
		<div id="modal-submit-auto-ctl" class="modal">
			<div class="modal-content">
				<h5>提交更改</h5>
				<p>您要上传配置到OrangePi吗？</p>
			</div>
			<div class="modal-footer">
				<a class="modal-close waves-effect waves-green btn-flat">不</a>
				<a class="modal-close waves-effect waves-green btn-flat" v-on:click="submitAutoCtl()">是的</a>
			</div>
		</div>
		<a class="btn-floating btn-large light-green darken-2 pulse tooltipped modal-trigger" href="#modal-submit-auto-ctl" style="right: 20px;bottom: 40px;position: fixed;"><i class="material-icons">cloud_upload</i></a>
	</div>
</template>

<script>
  import SubHeaderCommon from './SubHeaderCommon.vue'
  export default {
    name: "SmartControlComp",
	  methods: {
      openRelay(relayID) {
        this.$store.state.mqttClient.send("open:"+relayID)
      },
      submitAutoCtl() {
				// alert('提交成功'+this.waterCtlTimeOperator+','+this.waterCtlTimeStatus)
	      let jsonData = {
				  "water_ctl_time": {"start_time": this.waterCtlTimeStartTime, "end_time": this.waterCtlTimeEndTime, "operator": this.waterCtlTimeOperator, "status": this.waterCtlTimeStatus},
				  "water_ctl_tmp":  {"threshold": this.waterCtlTmpThreshold, "operator": this.waterCtlTmpOperator, "status": this.waterCtlTmpStatus},
		      "water_ctl_hum": {"threshold": this.waterCtlHumThreshold, "operator": this.waterCtlHumOperator, "status": this.waterCtlHumStatus}
	      }
        // strdata = JSON.stringify(jsonData)
        this.$store.state.mqttClient.send("autoctl:"+JSON.stringify(jsonData))
        this.$store.state.autoCtlCfg = JSON.stringify(jsonData)
      }
	  },

		computed: {
      autoCtlCfgComput() {
        return this.$store.state.autoCtlCfg
      },
			autoCtlCfgJsonObjComput() {
        return JSON.parse(this.autoCtlCfgComput)
			}
		},

	  watch: {
      autoCtlCfgComput: function (newValue, oldValue) {
	      console.log('this.$store.state.autoCtlCfg 更新了！！！, oldValue=', oldValue)
	      let json_obj = JSON.parse(newValue)
        this.waterCtlTimeStartTime = json_obj.water_ctl_time.start_time
        this.waterCtlTimeEndTime = json_obj.water_ctl_time.end_time
        this.waterCtlTimeOperator = json_obj.water_ctl_time.operator
        this.waterCtlTimeStatus = json_obj.water_ctl_time.status

	      this.waterCtlTmpThreshold = json_obj.water_ctl_tmp.threshold
	      this.waterCtlTmpOperator = json_obj.water_ctl_tmp.operator
	      this.waterCtlTmpStatus = json_obj.water_ctl_tmp.status

        this.waterCtlHumThreshold = json_obj.water_ctl_hum.threshold
        this.waterCtlHumOperator = json_obj.water_ctl_hum.operator
        this.waterCtlHumStatus = json_obj.water_ctl_hum.status

        console.log(this.waterCtlHumOperator)
      }
	  },


	  data: ()=>{
      return {
        waterCtlTimeStartTime: null,
        waterCtlTimeEndTime: null,
        waterCtlTimeOperator: null,
        waterCtlTimeStatus: true,

        waterCtlTmpThreshold: null,
        waterCtlTmpOperator: null,
        waterCtlTmpStatus: true,

        waterCtlHumThreshold: null,
        waterCtlHumOperator: null,
        waterCtlHumStatus: true,
      }
    },
	  components: {
      SubHeaderCommon
	  },
	  mounted() {

      let elems = document.querySelectorAll('select');
      var instances = M.FormSelect.init(elems, {});
      var elems2 = document.querySelectorAll('.fixed-action-btn');
      var instances2 = M.FloatingActionButton.init(elems2, {direction: 'bottom'});
      let elems3 = document.querySelectorAll('.modal');
      let instances3 = M.Modal.init(elems3, {});
      console.log('SmartControlComp mounted')
	  },
	  created() {
      console.log('SmartControlComp created')
		  console.log(this.$store.state.autoCtlCfg)
      let json_obj = JSON.parse(this.$store.state.autoCtlCfg)
      this.waterCtlTimeStartTime = json_obj.water_ctl_time.start_time
      this.waterCtlTimeEndTime = json_obj.water_ctl_time.end_time
      this.waterCtlTimeOperator = json_obj.water_ctl_time.operator
      this.waterCtlTimeStatus = json_obj.water_ctl_time.status

      this.waterCtlTmpThreshold = json_obj.water_ctl_tmp.threshold
      this.waterCtlTmpOperator = json_obj.water_ctl_tmp.operator
      this.waterCtlTmpStatus = json_obj.water_ctl_tmp.status

      this.waterCtlHumThreshold = json_obj.water_ctl_hum.threshold
      this.waterCtlHumOperator = json_obj.water_ctl_hum.operator
      this.waterCtlHumStatus = json_obj.water_ctl_hum.status

    }
  }
</script>

<style scoped>

	.content {
		padding: 6px 5px;
	}
	.content .checkbox-is-open {
		position: relative;
		top: 50px;
		right: -70px;
	}
	.content .row {
		margin-bottom: 0 !important;
	}

</style>