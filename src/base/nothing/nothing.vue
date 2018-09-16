<template>
  <div class="nothing">
    <img :src="imgCdn + '/static/img/loading/2.png'" width="140" height="140" alt="">
    <p class="nothing-title">{{title}}</p>
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
	data() {
		return {
			imgCdn: this.imgCdn
		}
	}
}
</script>
<style lang='less' scoped>
@import "~common/less/variable.less";
@import "~common/less/mixin.less";
.nothing{
	width: 100%;
	text-align: center;
	pointer-events:none;
	.nothing-title{
		font-size: 13px;
		color: #989393;
		margin-top: 12px;
	}
}
</style>