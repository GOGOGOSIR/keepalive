<template>
  <transition name='cool'>
    <div class="coolBomb" v-show='showFlag' @click.self='close'>
      <div class="coolBombWrapper">
      	<div class="imgBox">
      		<img :src="imgCdn+'/static/img/er/1.jpg'">
      	</div>
      	<p class="text">{{text}}</p>
      </div>
    </div>
  </transition>
</template>
<!-- type="text/ecmascript-6" -->
<script>
export default {
	name: 'coolBomb',
	props: ['text'],
	data() {
	  return {
	  	showFlag: false,
	  	imgCdn: this.imgCdn
	  }
	},
	methods: {
		show() {
			this.showFlag = true
		},
		close() {
			this.showFlag = false
		}
	}
}
</script>
<style lang='less' scoped>
@import "~common/less/variable.less";
@import "~common/less/mixin.less";
@keyframes swingSlowResult {
  20% {
    -webkit-transform: rotate3d(0, 0, 1, 12deg);
    transform: rotate3d(0, 0, 1, 12deg);
  }

  40% {
    -webkit-transform: rotate3d(0, 0, 1, -10deg);
    transform: rotate3d(0, 0, 1, -10deg);
  }

  60% {
    -webkit-transform: rotate3d(0, 0, 1, 5deg);
    transform: rotate3d(0, 0, 1, 5deg);
  }

  80% {
    -webkit-transform: rotate3d(0, 0, 1, -5deg);
    transform: rotate3d(0, 0, 1, -5deg);
  }

  to {
    -webkit-transform: rotate3d(0, 0, 1, 0deg);
    transform: rotate3d(0, 0, 1, 0deg);
  }
}
.coolBomb{
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	background: rgba(0,0,0,.6);
	z-index: 500;
	display: flex;
	align-items: center;
	justify-content: center;
	&.cool-enter-active,&.cool-leave-active{
	  transition: all .3s;
	}
	&.cool-enter,&.cool-leave-to{
	  opacity: 0;
	}
	.coolBombWrapper{
		width: 300px;
		min-height: 200px;
		background: #fff;
		border-radius: 8px;
		box-sizing: border-box;
		padding: 66px 12px;
		-webkit-transform-origin:top center;
	    transform-origin:top center;
	    -webkit-animation: swingSlowResult .8s;
	    animation: swingSlowResult .8s;
		.imgBox{
			width:160px;
			height:160px;
			margin: 0 auto;
			overflow: hidden;
			>img{
				display: block;
				width: 100%;
				height: 100%;
			}
		}
		.text{
			margin-top: 12px;
			font-size: 14px;
			color: #535353;
			text-align: center;
		}
	}
}
</style>