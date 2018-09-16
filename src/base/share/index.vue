<template>
  <transition name='fade'>
  	<div class="bsShare" v-show='showFlag' @touchmove.prevent @click.self='close'>
  		<img :src="imgCdn + '/static/img/loading/share1.png'" class='tImg' v-if='type == 1'>
  		<img :src="imgCdn + '/static/img/loading/share2.png'" class='bImg' v-if='type == 2'>
  	</div>
  </transition>
</template>、
<!-- type="text/ecmascript-6" -->
<script >
import {isWeixinBrowser} from 'common/js/util'
export default {
	name: 'bsShare',
	data() {
		return {
			imgCdn: this.imgCdn,
			showFlag: false,
			type: -1
		}
	},
	created() {
		let is_wx = isWeixinBrowser()
		if (is_wx) {
			this.type = 1
		} else {
			this.type = 2
		}
	},
	methods: {
		close() {
			this.showFlag = false
		},
		show() {
			this.showFlag = true
		}
	}

}
</script>
<style lang='less' scoped>
@import "~common/less/variable.less";
@import "~common/less/mixin.less";
@keyframes swingSlowResult { 20% { -webkit-transform: rotate3d(0, 0, 1, 12deg); transform: rotate3d(0, 0, 1, 12deg); } 40% { -webkit-transform: rotate3d(0, 0, 1, -10deg); transform: rotate3d(0, 0, 1, -10deg); } 60% { -webkit-transform: rotate3d(0, 0, 1, 5deg); transform: rotate3d(0, 0, 1, 5deg); } 80% { -webkit-transform: rotate3d(0, 0, 1, -5deg); transform: rotate3d(0, 0, 1, -5deg); } to { -webkit-transform: rotate3d(0, 0, 1, 0deg); transform: rotate3d(0, 0, 1, 0deg); } }

.bsShare{
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	z-index: 300;
	background: rgba(0,0,0,.6);
	&.fade-enter-active,&.fade-leave-active{
		transition: all .3s;
	}
	&.fade-enter,&.fade-leave-to{
		opacity: 0;
	}
	>img{
		display: block;
		width: 230px;
		height: 239px;
		position: absolute;
	}
	.tImg{
		right: 0;
		top: 0;
		-webkit-transform-origin: top right;
      transform-origin: top right;
      -webkit-animation: swingSlowResult .8s;
      animation: swingSlowResult .8s;
	}
	.bImg{
		right: 0;
		bottom: 0;
		-webkit-transform-origin: bottom right;
      transform-origin: bottom right;
      -webkit-animation: swingSlowResult .8s;
      animation: swingSlowResult .8s;
	}
}
</style>