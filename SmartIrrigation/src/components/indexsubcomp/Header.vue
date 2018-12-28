<template>

	<div class="side-right-header">
		<nav>
			<div class="nav-wrapper">

				<a href="#" data-target="slide-out" class="sidenav-trigger"><i class="material-icons hide-on-med-and-up">menu</i></a>

				<a href="#" class="brand-logo"><img src="../../images/logo.svg" alt="logo" width="36px">IoT灌溉系统</a>

				<ul class="right">
					<!--<li class="hide-on-med-and-down">-->
						<!--<a href="#">-->
							<!--<span class="nav-badge">3</span>-->
							<!--<i class="material-icons">chat_bubble</i>-->
						<!--</a>-->
					<!--</li>-->
					<li class="hide-on-med-and-down">
						<router-link to="/help" tag="a" class="setting-button">
							<i class="material-icons">help</i>
						</router-link>
					</li>
					<li>
						<router-link to="/settings" tag="a" class="setting-button">
							<i class="material-icons">settings</i>
						</router-link>
					</li>
					<li class="hide-on-small-only">
						<a href="#modal-exit" class="tooltipped modal-trigger" data-position="left" data-delay="50" data-tooltip="Logout"
						   data-tooltip-id="e428e987-8352-d8c3-24f7-94f231043fc9">
							<i class="material-icons">exit_to_app</i>
						</a>
					</li>
				</ul>
			</div>
		</nav>
		<ul id="slide-out" class="sidenav">
			<li>
				<div class="user-view">
					<div class="background">
						<img src="">
					</div>
					<a href="#user"><img class="circle" src="../../images/avatar.png"></a>
					<a href="#name"><span class="white-text name">{{userName}}</span></a>
					<a><span class="white-text email">生活就像海洋，只有意志坚强的人才能到达彼岸</span></a>
				</div>
			</li>
			<router-link  to="/humtmplisten" tag="li" class="sidenav-close">
				<a>
					<i class="material-icons" >personal_video</i>温湿度监控
				</a>
			</router-link>
			<router-link to="/switchcontrol" tag="li" class="sidenav-close"><a><i class="material-icons">toggle_off</i>开关控制/监控</a></router-link>
			<router-link to="/smartcontrol" tag="li" class="sidenav-close"><a><i class="material-icons">local_cafe</i>智能控制</a></router-link>
			<router-link to="/lightmqlisten" tag="li" class="sidenav-close"><a><i class="material-icons">add_alert</i>可燃气体/光照监测</a></router-link>
			<router-link to="/historydata" tag="li" class="sidenav-close"><a><i class="material-icons">history</i>历史数据</a></router-link>
			<router-link to="/help" tag="li" class="sidenav-close"><a><i class="material-icons">help</i>帮助</a></router-link>
			<li>
				<div class="divider"></div>
			</li>
			<!--<li><a class="subheader"></a></li>-->
			<li><router-link to="/login" tag="a" class="sidenav-close"><i class="material-icons">exit_to_app</i>退出登陆</router-link></li>
		</ul>


		<div class="progress no-padding red lighten-2 load-state-prog hide" style="margin: 0">
			<div class="indeterminate"></div>
		</div>

		<!-- Modal Structure -->
		<div id="modal-exit" class="modal">
			<div class="modal-content">
				<h5>帐号退出</h5>
				<p>{{userName}}, 你要退出当前帐号吗?</p>
			</div>
			<div class="modal-footer">
				<a class="modal-close waves-effect waves-green btn-flat">不</a>
				<a class="modal-close waves-effect waves-green btn-flat" v-on:click="exitLogin()">是的，我确定</a>
			</div>
		</div>

	</div>
</template>

<script>
	import '../../libs/materialize/js/materialize.min.js'
	import utils from '../../utils/utils'
  export default {
	  data(){
	    return {
	      sideNavInstance: null
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
      }
	  },
	  props: ['userName'],
    name: "Header",
	  mounted() {
      document.addEventListener('DOMContentLoaded', function() {
        var elems = document.querySelectorAll('.sidenav');
	      M.Sidenav.init(elems, {});
        this.sideNavInstance = M.Sidenav.getInstance(elems);
      });
	  }
  }
</script>

<style scoped>

	 .side-right-header .nav-wrapper {
		padding-left: 10px; }
	 .side-right-header .nav-wrapper .nav-badge {
		margin-left: -8px;
		position: absolute;
		line-height: 15px;
		top: 8px;
		font-size: 12px;
		text-align: center;
		border-radius: 3px;
		padding: 1px 5px 1px 4px;
		background: rgba(0, 0, 0, 0.87); }

	.brand-logo {
		padding-left: 35px;
		font-size: 1.55rem; }
	.brand-logo img {
		position: absolute;
		left: 0;
		top: 0.5rem; }
	 .side-right nav {
		 background: #689f38; }

	.background {
		background: #689f38;
	}
	.side-left-active {
		background: #eee;
	}
	.setting-button.side-left-active{
		background: #7cb342 !important;
	}

</style>