<template>
  <div class="infoCommonTitle">
    <span>{{title}}</span>
    <div class="right-line"></div>
  </div>
</template>
<script type="text/ecmascript-6">
export default {
	props: {
		title: {
			type: String,
			default: ''
		}
	}
}
</script>
<style lang='less' scoped>
@import "~common/less/variable.less";
@import "~common/less/mixin.less";
.infoCommonTitle{
	width: 100%;
	display: flex;
	align-items: center;
	.right-line{
		flex: 0 0 240px;
		width: 240px;
		height:1px;
	    color:#dfdfdf;
	    border-bottom: 1px solid #dfdfdf;
	    transform-origin: 0 100%;
	    -webkit-transform-origin: 0 100%;
	    transform: scaleY(.5);
	    -webkit-transform: scaleY(.5);
	}
	span{
		flex: 1;
		font-size: 16px;
		color: #1c1c1c;
		margin-right: 6px;
		letter-spacing: 2px;
	}
}
</style>