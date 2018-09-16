<template>
	<transition name='confirmFade'>
	  <div class="confirm" v-show='showFlag' @click.stop>
	    <div class="confirm-wrapper">
	    	<div class="confirm-content">
	    		<p class="text">{{text}}</p>
	    		<div class="operate">
	    			<div class="operate-btn left" @click='cancel'>{{confirmLeftValue}}</div>
	    			<div class="operate-btn" @click='confirm'>{{confirmRightValue}}</div>
	    		</div>
	    	</div>
	    </div>
	  </div>
	</transition>
</template>
<script type="text/ecmascript-6">
export default {
	props: {
		text: {
			type: String,
			default: ''
		},
		confirmLeftValue: {
			type: String,
			default: '取消'
		},
		confirmRightValue: {
			type: String,
			default: '确定'
		}
	},
	data() {
		return {
			showFlag: false
		}
	},
	methods: {
		show() {
			this.showFlag = true
		},
		hide() {
			this.showFlag = false
		},
		cancel() {
			this.hide()
			this.$emit('cancel')
		},
		confirm() {
			this.hide()
			this.$emit('confirm')		
		}
	}
}
</script>
<style lang='less' scoped>
@import "~common/less/variable.less";
@import "~common/less/mixin.less";

@keyframes confirm-fadein{
	0%{
      opacity: 0;
  	}
    100%{
      opacity: 1;
    }
}
@keyframes confirm-zoom{
    0%{
      transform: scale(0);
    }
    50%{
      transform: scale(1.1);
    }
    100%{
      transform: scale(1);
    }
}
.confirm{
	position: fixed;
	left: 0;
	right: 0;
	top: 0;
	bottom: 0;
	z-index: 998;
	background-color: @color-background-d;
	&.confirmFade-enter-active{
		animation: confirm-fadeout .3s;
		.confirm-content{
			animation: confirm-zoom .3s;
		}
	}
	.confirm-wrapper{
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%,-50%);
		z-index: 999;
		.confirm-content{
			min-width: 280px;
			box-sizing: border-box;
			padding: 0 15px;
			border-radius: 10px;
			background: @color-highlight-background;
			.text{
				padding:20px 0;
				text-align: center;
				font-size: 16px;
				white-space:nowrap;
				line-height: 22px;
				color: #2b2a2a;
			}
			.operate{
				width: 100%;
				display: flex;
				text-align: center;
				font-size: 14px;
				padding: 12px 0;
				.bs-1px-t(@gray-border);
				.operate-btn{
					width: 50%;
					color: #23cc77;
					&.left{
						.bs-1px-r(@gray-border);
					}
				}
			}
		}
	}
}
</style>