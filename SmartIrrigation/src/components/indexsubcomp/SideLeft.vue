<template>
	<div class="col m3 l3 xl2 side-left hide-on-small-only">
		<ul class="side-nav custom-side-nav fixed" style="transform:
          translateX(0%);">
			<li class="light-green darken-3">
				<div class="user">
					<div class="chip grey darken-3 white-text">
						<img src="../../images/avatar.png" alt="Contact Person">
						{{userName}}
					</div>
				</div>
			</li>
			<li>
				<router-link tag="a" class="waves-effect waves-grey" to="/humtmplisten" style="border-top: 1px solid #e6e6e6">
					<i class="material-icons">personal_video</i>
					<span>温湿度监控</span>
				</router-link>
				<!--<a class="waves-effect waves-grey white-text light-green darken-1" href="#main" onclick="initMainPage()">-->
					<!--<i class="material-icons">airplay</i>-->
					<!--<span>温湿度监控</span>-->
				<!--</a>-->
			</li>
			<li>
				<router-link tag="a" class="waves-effect waves-grey" to="/switchcontrol">
					<i class="material-icons">toggle_off</i>开关控制/监控

				</router-link>
				<!--<a class="waves-effect waves-grey" href="#switchs" onclick="initSwitchPage()">-->
					<!--<i class="material-icons">perm_identity</i>开关控制-->
					<!--&lt;!&ndash; <span class="badge deep-orange darken-1 white-text"></span> Users &ndash;&gt;-->
				<!--</a>-->
			</li>

			<li>
				<router-link class="waves-effect waves-grey" to="/smartcontrol" tag="a">
					<i class="material-icons">local_cafe</i>
					智能控制
				</router-link>
			</li>
			<li>
				<router-link class="waves-effect waves-grey" to="/lightmqlisten">
					<i class="material-icons">add_alert</i>
					光照/可燃气体监控
				</router-link>
			</li>
			<li>
				<router-link class="waves-effect waves-grey" to="/historydata">
					<i class="material-icons">history</i>
					历史数据
				</router-link>
			</li>

		</ul>
		<div class="create-time">
			<p >©2018 AloneBo</p>
		</div>

	</div>
</template>

<script>
	export  default  {
	  props: ['userName']
	}
</script>

<style scoped>

	.side-left-active {
		background-color: #7cb342 !important;
		color: #fff !important;
	}

	.side-left {
		position: fixed;
		height: 100%;
		background: #558b2f;
		padding: 0; }
	.side-left.col.hide-on-small-only {
		padding: 0; }
	.side-left .side-nav.custom-side-nav li {
		padding-left: 5px; }
	.side-left .side-nav.custom-side-nav li a {
		font-size: 16px;
		color: rgba(255, 255, 255, 0.5);
		width: 100%;
		padding: 0 4% 0 4%;
		line-height: 55px;
		height: 55px; }
	.side-left ul a i {
		float: left;
		margin-top: 14px;
		margin-right: 10px; }
	.side-left .user {
		text-align: center;
		margin-bottom: 12px; }

	.create-time {
		position: absolute;
		bottom: 0;

		width: 100%;
		text-align: center;
	}
	.create-time p{
		color: rgba(255, 255, 255, 0.5)
	}
</style>