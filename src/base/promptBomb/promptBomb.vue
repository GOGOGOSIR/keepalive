<template>
	<transition name='bomb'>
	  <div class="promptBomb" v-show='promptBombFlag'>
	  		<div class="promptBomb-wrapper">
	  			<div class="closeIcon" @click='hide'>
	  				<i class="bsIcon icon-chahao"></i>
	  			</div>
	  			<div class="promptBomb-tit">{{title}}</div>
	  			<div class="promptBomb-msg"><p>{{msg}}</p></div>
	  			<div class="promptBomb-btn-wrapper">
	  				<div class="promptBomb-btn" @click='know'><div>{{btnName}}</div></div>
	  				<div class="promptBomb-btn" v-if='btnType == 2' @click='know2'><div>{{btnName2}}</div></div>
	  			</div>
	  		</div>
	  </div>
	</transition>
</template>
<script type="text/ecmascript-6">
  export default {
  	// name必须加，否则用createApi的时候会报错
  	name: 'promptBomb',
  	props: {
  		btnType: {
  			type: Number,
  			default: 1
  		},
  		title: {
  			type: String,
  			default: '提示'
  		},
  		msg: {
  			type: String,
  			default: ''
  		},
  		btnName: {
  			type: String,
  			default: '我知道了'
  		},
  		btnName2: {
  			type: String,
  			default: '我知道了2'
  		}
  	},
  	data() {
  		return {
  			promptBombFlag: false
  		}
  	},
  	methods: {
  		know() {
  			this.hide()
  			this.$emit('prompClose')
  		},
  		know2() {
  			this.hide()
  			this.$emit('prompClose2')
  		},
  		show() {
  			this.promptBombFlag = true
  		},
  		hide() {
  			this.promptBombFlag = false
  		}
  	}
  }
</script>
<style scoped lang="less">
@import '~common/less/variable.less';
@import "~common/less/mixin.less";
.promptBomb{
	position: fixed;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
	background: rgba(0,0,0,.7);
	z-index: 100;
	display: flex;
	justify-content: center;
	align-items: center; 
	&.bomb-enter-active,&.bomb-leave-active{
		transition: all .3s;
		.promptBomb-wrapper{
			transition: all .3s;
		}
	}
	&.bomb-enter,&.bomb-leave-to{
		opacity: 0;
		.promptBomb-wrapper{
			transform: scale(0);
		}
	}
	.promptBomb-wrapper{
		padding: 15px 0;
		border-radius: 5px;
		background: #fff;
		width: 300px;
		position: relative;
		.closeIcon{
			.extend-click();
			width: 20px;
			height: 20px;
			font-size: 20px;
			position: absolute;
			right: 12px;
			top: 12px;
			color: @bg-green;
		}
		.promptBomb-tit{
			padding: 10px 0;
			text-align: center;
			font-size: 14px;
			color: #414141;
		}
		.promptBomb-msg{
			width: 100%;
			box-sizing: border-box;
			padding: 0 12px;
			font-size: 14px;
			color:#414141; 
			line-height: 20px;
			text-align: center;
			margin-top: 10px;
		}
		.promptBomb-btn-wrapper{
			width: 100%;
			height: 34px;
			margin-top: 15px;
			box-sizing: border-box;
			padding: 0 30px;
			display: flex;
			justify-content: center;
			.promptBomb-btn{
				flex: 1;
				margin-right: 15px;
				&:last-of-type{
					margin-right: 0;
				}
				>div{
					.setflex(center,center);
					font-size: 14px;
					color: #fff;
					background:@bg-green;
					border-radius: 5px;
					width: 100%;
					height: 34px; 
				}
			}
		}
	}                               
}
</style>