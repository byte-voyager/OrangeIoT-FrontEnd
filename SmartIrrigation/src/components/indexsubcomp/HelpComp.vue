<template>
	<div>
		<SubHeaderCommon title="帮助" iContent="help"></SubHeaderCommon>
		<ul class="collapsible">
			<li>
				<div class="collapsible-header"><i class="material-icons">personal_video</i>温湿度监控</div>
				<div class="collapsible-body">
					<span>温湿度监控是基于传感器DHT11模块开发，其精度湿度+-5%RH， 温度+-2℃，量程湿度20-90%RH， 温度0~50℃。</span>
					<p>数据大约4s-6s更新一次。</p>
					<img src="https://ss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=3217067374,3290150388&fm=173&s=F391578A47826AE68CBB60460300C0EA&w=550&h=418&img.JPEG" alt="dht11" height="100px" width="110px">
				</div>
			</li>
			<li>
				<div class="collapsible-header"><i class="material-icons">toggle_off</i>开关控制/监控</div>
				<div class="collapsible-body">
					<span>开关控制是通过ESP8266控制继电器实现。</span>
					<p>点击开关按钮可控制继电器闭合断开。注意:操作过快有些命令可能也会没有响应。</p>
					<p>一般在5s以内图标会发生变化，如果没有发生变化，重新操作，或者检查网络、终端是否在线。</p>
					<p>当状态现实为青绿色时，为开的状态。 <i class="icon iconfont icon-water-switch light-green darken-2" style="font-size: 40px;border-radius: 50%;color: #fff;"></i></p>
					<p>当状态现实为灰色时，为关的状态。 <i class="icon iconfont icon-water-switch grey" style="font-size: 40px;border-radius: 50%;color: #fff;"></i></p>
					<p>另外: 当你设置了自动控制，你又手动控制，操作可能会失败。</p>
				</div>
			</li>
			<li>
				<div class="collapsible-header"><i class="material-icons">local_cafe</i>智能控制</div>
				<div class="collapsible-body">
					<span>智能控制是不需要人手动控制。</span>
					<p>你可以设置每天的时间段进行控制设备;</p>
					<p>你可以设置根据温度的高低进行控制设备;</p>
					<p>你可以设置根据湿度进行控制设备;</p>
				</div>
			</li>
			<li>
				<div class="collapsible-header"><i class="material-icons">add_alert</i>光照/可燃气体监控</div>
				<div class="collapsible-body">
					<span>光照检测:</span>
					<p>光照采用的是光敏电阻传感器。数值越大，亮度越低。</p>
					<img src="https://gd2.alicdn.com/imgextra/i4/T1OUq.XmJXXXawBKkW_022928.jpg_400x400.jpg" alt="" width="110px" height="100px">
					<p>可燃物检测:</p>
					<p>可燃物的检测采用的是MQ2传感器，MQ2传感器对于各种常见可燃气体如丙烷、甲烷、一氧化碳等灵敏度较高，对气体可燃蒸汽的检测也较为灵敏</p>
					<p>也就是说，可以检测煤气泄露，火焰的烟雾。</p>
					<img src="https://raw.githubusercontent.com/SeeedDocument/Grove-Gas_Sensor-MQ2/master/img/Twig-Gas_Sensor.bmp" alt="" width="110px" height="100px">
					<p>也就是说，可以检测煤气泄露，火焰的烟雾。</p>
					<p>当大于200的数值时，为异常数据。您可以在点击齿轮图表(设置)设置警报联系人。</p>
				</div>
			</li>
			<li>
				<div class="collapsible-header"><i class="material-icons">history</i>历史数据</div>
				<div class="collapsible-body"><span>历史数据保存了温度和湿度的数据</span>
					<p>保存温度数据的条件是上一次保存数据和此次实时数据>2摄氏度保存。</p>
					<p>保存湿度数据的条件是上一次保存数据和此次实时数据>10%保存。</p>
				</div>
			</li>
			<li>
				<div class="collapsible-header">版本V1.0</div>
				<div class="collapsible-body"><span>版本V1.0 2018-12-30
				<p >©2018 AloneBo</p>
				</span>
				</div>
			</li>
		</ul>
		<div class="create-time hide-on-med-and-up">
			<!--<p >©2018 AloneBo</p>-->
		</div>
	</div>
</template>

<script>
  import SubHeaderCommon from './SubHeaderCommon.vue'
  export default {
    name: "HelpComp",
	  created() {

        var elems = document.querySelectorAll('.collapsible');
        var instances = M.Collapsible.init(elems, {});

	  },
	  mounted() {
        var elems = document.querySelectorAll('.collapsible');
        var instances = M.Collapsible.init(elems, {});

	  },
	  components: {
      SubHeaderCommon
	  }
  }
</script>

<style scoped>
	.create-time {
		position: absolute;
		bottom: 0;
		width: 100%;
		text-align: center;
	}
</style>