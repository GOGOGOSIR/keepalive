<template>
  <div class="normalBack">
  	<div @click.stop='back'>
	    <i class="bsIcon icon-zuojiantou"></i>
	    <span>{{title}}</span>
	</div>
  </div>
</template>
<script type="text/ecmascript-6">
export default {
	props: {
		title: {
			type: String,
			default: ''
		}
	},
	methods: {
		back() {
			this.$router.go(-1)
		}
	}
}
</script>
<style lang='less' scoped>
@import "~common/less/variable.less";
@import "~common/less/mixin.less";
.normalBack{
	width: 100%;
	box-sizing: border-box;
	padding:12px 15px;
	font-size: 0;
	color: #09b763;
	font-weight: bold;
	i{
		font-size: 14px;
		margin-right: 8px;
	}
	span{
		font-size: 14px;
	}
	
}
</style>