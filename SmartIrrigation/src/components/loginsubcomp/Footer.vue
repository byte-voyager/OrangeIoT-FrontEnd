<template>
	<div>
		<div class="page-footer" v-show="!isOpenKeyboard">
			<div class="footer-copyright">
				<div class="container">
					© 2018 AloneBo
					<a class="grey-text text-lighten-4 right" href="http://flask.pocoo.org/">Powered by Flask</a>
				</div>
			</div>
		</div>
	</div>

</template>

<script>
	export default {
	  props: ['isOpenKeyboard']
	}
</script>

<style scoped lang="scss">
	.page-footer {
		position: fixed;
		bottom: 0;
		width: 100%;
		padding-top: 0;
		color: #ffffff;
		background-color: #689f38; }
</style>