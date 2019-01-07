<template>
	<div class="section-login white">
		<div class="container">
			<div class="row">
				<div class="col s12 offset-m2 m8 card-panel">
					<div class="center">
						<h4>登录</h4>
						<p class="hide-on-small-only">以管理员登录，或者普通用户登录。</p>
						<p>默认用户:admin， 默认密码:alonebo</p>
					</div>
					<form class="col s12" id="login-form">
						<div class="row">
							<div class="input-field col s12">
								<i class="material-icons prefix">person</i>
								<input id="user-name" name="emailcontact" type="text" class="validate" v-model="userName" placeholder="用户名"/>
							</div>
							<div class="input-field col s12">
								<i class="material-icons prefix">lock</i>
								<input id="password" name="emailcontact" type="password" class="validate" placeholder="密码" v-model="userPassword"/>

							</div>
							<div class="col s6 image-code">
								<img :src="verifyCodeImageUrl" alt="" style="float: right" v-on:click="generateImageCode()">
							</div>
							<div class="input-field col s6">

								<input id="verify-code" type="text" class="validate" placeholder="验证码" v-model="verifyCode"/>


							</div>
							<span class="login-error" v-show="isShowErrmsgTop">{{errmsgTip}}</span>
							<div class="col offset-s7 s5">
								<button class="btn waves-effect waves-light white light-green-text text-darken-2 right" type="submit" v-on:click.prevent="login()">
									登录 <i class="mdi mdi-send right text-darken-2"></i>
								</button>
							</div>
						</div>
					</form>
				</div>
			</div>
		</div>
		<div style="text-align: center"><a v-on:click.prevent="exitLogin()" style="color: red; border-bottom: solid 1px;">退出当前帐号</a></div>
	</div>
</template>

<script>
	import utils from '../../utils/utils'
	import {RET} from '../../utils/respcode'
  export default {
    name: "Login",
    data(){
      return {
        userName: '', // 填写的用户名
        userPassword: '', // 填写的密码
        verifyCode: '',// 填写的验证码值
        errmsgTip: 'error', // 错误提示
        isShowErrmsgTop: false, // 是否展示错误信息
        verifyCodeImageUrl: '', // 验证码值
        imageCodeId: '', // 验证码id
      }
    },
	  methods: {
      exitLogin() {
        this.$axios.delete('users/sessions', {headers: {'X-CSRFTOKEN': utils.getCookie('csrf_token')}, data: {name: 'alonebo'}}).then(resp=>{
          console.log(resp)
          location.href = '/login.html'
        }).catch(resp=>{
          console.log(resp)
          // location.href = '/login.html?d=exiterr'
        })
      },
      login() {
        console.log(this.userName, this.userPassword)
        this.$axios.post('users/sessions',
          {
            user_name: this.userName,
            password: this.userPassword,
            verify_code: this.verifyCode,
            verify_code_id: this.imageCodeId
          },
          {headers: {'X-CSRFTOKEN': utils.getCookie('csrf_token')}})
          .then(resp => {
            console.log(resp)
            if (resp.data.errno == RET.OK) {
              location.href = '/index.html'
	            console.log('登录成功')
            } else {
              this.errmsgTip = resp.data.errmsg
              this.isShowErrmsgTop = true
              this.generateImageCode()
            }
          }).catch(err => {
          this.errmsgTip = '登录失败，请检查网络。'
          this.isShowErrmsgTop = true
          alert(err)
        })
      },
      generateImageCode() {
        this.imageCodeId = utils.generateUUID()
        this.verifyCodeImageUrl = '/api/v1.0/image_codes/' + this.imageCodeId
      },
    },
	  created(){
      this.generateImageCode()
	  },
    watch: {
      userName(newVal, oldVal){
        if (newVal.length < 4 ) {
          this.isShowErrmsgTop = true
          this.errmsgTip = '用户名太短'
        } else if(newVal.length > 10){
          this.isShowErrmsgTop = true
          this.errmsgTip = '用户名太长'
        } else {
          this.isShowErrmsgTop = false
          this.errmsgTip = ''
        }
      },
      userPassword(newVal) {
        if (newVal.length < 4 ) {
          this.isShowErrmsgTop = true
          this.errmsgTip = '密码太短'
        } else if(newVal.length > 16){
          this.isShowErrmsgTop = true
          this.errmsgTip = '密码太长'
        } else {
          this.isShowErrmsgTop = false
          this.errmsgTip = ''
        }
      },
      verifyCode(newVal) {
        if (newVal.length != 4) {
          this.isShowErrmsgTop = true
          this.errmsgTip = '验证码长度不正确'
        } else {
          this.isShowErrmsgTop = false
          this.errmsgTip = ''
        }
      }
    },
  }
</script>

<style scoped>

</style>