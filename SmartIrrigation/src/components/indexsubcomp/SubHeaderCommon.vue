<template>
	<div class="subtitle">
		<slot>
			<h2>
				<!-- 如果指定了iContent 则表示的是 material的图标 指定了iClass则是iconfont的-->
				<i :class="[iContent?'':'icon', iContent?'':'iconfont',  'material-icons', iClass]">{{iContent}}</i>
				{{title}}
			</h2>
		</slot>

	</div>
</template>

<script>
	import '../../fonts/iconfont.css'
  export default {
    name: "SubHeaderCommon",
	  props: ['title', 'iClass', 'iContent']
  }
</script>

<style scoped lang="scss">
	.subtitle {
		background-color: #eee;
		h2 {
			font-size: 24px;
			padding-left: 10px;
			margin: 5px 0;
			padding-top: 4px;
			padding-bottom: 4px;
			i {
				font-size: 24px;
				color: #689f38;
			}
		}
	}
</style>