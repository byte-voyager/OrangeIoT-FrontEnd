<template>
	<div>
		<SubHeaderCommon title="滴水控制" iClass="icon-water-switch" style="margin-bottom: 0"></SubHeaderCommon>

		<!--<div v-else="$store.state.mqttLightRelayState[0]==null">-->
			<!--加载设备信息中，如果长时间没有显示，请刷新。-->
		<!--</div>-->
		<div v-if="Object.keys($store.state.mqttLightRelayState).length==0" class="loading">
			<div class="preloader-wrapper big active center">
				<div class="spinner-layer spinner-blue-only">
					<div class="circle-clipper left">
						<div class="circle"></div>
					</div><div class="gap-patch">
					<div class="circle"></div>
				</div><div class="circle-clipper right">
					<div class="circle"></div>
				</div>
				</div>
			</div>
			<!--<div class="progress">-->
				<!--<div class="indeterminate"></div>-->
			<!--</div>-->
			<p>Loading</p>
		</div>

		<div class="content content-light">
			<div class="row">

				<div class="col s12 m12 l6" v-for="item in $store.state.mqttLightRelayState" :key="item.deviceID">
					<div class="card grey lighten-4">
						<div class="card-content black-text">
							<span class="card-title">滴水{{parseInt(item.deviceID, 16)}}控制</span>
							<p class="hide-on-small-only">当前状态: <span :class="item.deviceValue==1?'light-green darken-2':'grey'" style="font-size: 18px;">{{item.deviceValue==1?'开':'关'}}</span></p>
						</div>
						<div class="card-image">
							<a class="btn-floating halfway-fab waves-effect waves-light grey lighten-4" :title="item.deviceValue==1?'开':'关'">
								<i :class="item.deviceValue==0?'icon iconfont icon-water-switch grey':'icon iconfont icon-water-switch light-green darken-2'"></i>
							</a>
						</div>
						<div class="card-action">
							<button class="waves-effect waves-light btn light-green darken-2" @click="openRelay(parseInt(item.deviceID, 16))">开</button>
							<button class="waves-effect waves-light btn light-green darken-2" @click="closeRelay(parseInt(item.deviceID, 16))">关</button>
							<span class="red-text" v-show="sendingControlID==item.deviceID">发送控制中,请稍等</span>
						</div>
					</div>
				</div>
			</div>
		</div>


	</div>
</template>

<script>
  import SubHeaderCommon from './SubHeaderCommon.vue'
  export default {
    name: "SwitchControlComp",
	  data: ()=>{
		  return {
		    sendingControlID: -1
		  }
	  },
    methods: {
      openRelay(relayID) {
        this.$store.state.mqttClient.send("open:"+relayID)
	      this.sendingControlID = relayID
	      setTimeout(function () {
          this.sendingControlID = -1
        }.bind(this), 2500)
      },
	    closeRelay(relayID) {
        this.$store.state.mqttClient.send("close:"+relayID)
        this.sendingControlID = relayID
        setTimeout(function () {
          this.sendingControlID = -1
        }.bind(this), 2500)
	    }
    },
	  components: {
      SubHeaderCommon
	  },
	  computed: {
      mqttLightRelayStateComput() {
        console.log('computed.')
	      return this.$store.state.mqttLightRelayState
      }
	  },
	  watch: {
      'mqttLightRelayStateComput':function (newValue) {
        console.log('watch sss')
	      console.log(newValue)
      }
	  }
  }
</script>

<style scoped>
	.content {
		padding: 6px 5px;
	}
	.content .card-action button:first-child {
		margin-right: 20px;
	}
	.row {
		margin-bottom: 0;
	}
	.card-action span {
		position: relative;
		bottom: -10px;
		left: 5px;
	}
	.loading{
		display: inline-block;
		transform: translateX(-50%);
		position: relative;
		left: 50%;
	}
</style>