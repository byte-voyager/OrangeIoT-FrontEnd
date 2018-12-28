<template>
	<div>
		<SubHeaderCommon iContent="email" title="危险警报邮箱设置"></SubHeaderCommon>
		<div class="row" style="padding: 5px 10px">
			<div class="input-field col s12 m6">
				<input id="email1" type="email" class="validate" v-model="email1">
				<label for="email1" :class="[email1?'active':'']">邮箱1</label>
			</div>
			<div class="input-field col s12 m6">
				<input id="email2" type="email" class="validate" v-model="email2">
				<label for="email2" :class="[email2?'active':'']">邮箱2</label>
			</div>
		</div>

		<div class="switch email-setting">
			<label style="color: #000;font-size: 1.3rem;display: block;">
				是否开启警报通知:
				<input type="checkbox" v-model="status">
				<span class="lever"></span>
			</label>
			<button class="waves-effect waves-light btn" style="margin-top: 10px" @click="uploadEmail()">保存</button>
		</div>

	</div>
</template>

<script>
  import SubHeaderCommon from './SubHeaderCommon.vue'
  export default {
    name: "Settings",
	  data: ()=>{
      return {
        email1: '',
	      email2: '',
	      status: false,
      }
	  },
	  components: {
      SubHeaderCommon,
	  },
	  created(){
      let d =  JSON.parse(this.$store.state.email)
      console.log('emial gaibianle', d)
		  if (Object.keys(d).length == 0) return
      this.email1 = d['data'][0]
      this.email2 = d['data'][1]
      this.status = d['is_open']
	  },
	  methods: {
      uploadEmail(){
        let e1 = this.email1.trim()
        let e2 = this.email2.trim()
	      if (e1 == '' && e2 == '') {
	        alert('邮箱没写')
		      return
	      }
	      let s = `email:{"is_open":${this.status},"data":["${e1}", "${e2}"]}`
        this.$store.state.mqttClient.send(s)
      },
	  },
	  watch: {
      '$store.state.email': function (newValue) {
        let d =  JSON.parse(newValue)
	      console.log('emial gaibianle', d)
        this.email1 = d['data'][0]
        this.email2 = d['data'][1]
	      this.status = d['is_open']
      }
	  },
	  computed: {
      emailComp: ()=>{
        return JSON.parse(this.$store.state.email)
      }
	  },
  }
</script>

<style scoped>

	.email-setting {
		/*border: 1px solid #eee;*/
		margin-left: 12px;
		position: relative;
		display: inline-block;
	}

	.email-setting button{
		margin-top: 20px;
		position: absolute;
	}

	@media screen and (max-width: 600px) {
		.email-setting{
			float: right;
			margin-right: 12px;
		}
		.email-setting button {
			right: 0;
		}
	}
</style>