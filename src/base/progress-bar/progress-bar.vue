<template>
   <div class="progress-bar" ref="progressBar">
    <!-- 进度条的总长度 -->
    <div class="bar-inner">
      <!-- 实时的进度条长度 -->
      <div class="progress" ref="progress"></div>
    </div>
    <div class="progress-btn-wrapper progress-btn-wrapper1" ref="progressBtn"
           @touchstart.prevent="progressTouchStart"
           @touchmove.prevent="progressTouchMove"
           @touchend="progressTouchEnd"
      >
		    <div class="money-number" ref='moneyLeft'>{{leftText}}k</div>
		    <div class="progress-btn"></div>
		    <div class="btn-icon"></div>
  	</div>
  	<div class="progress-btn-wrapper2 progress-btn-wrapper" ref="progressBtn2"
           @touchstart.prevent="progressTouchStart2"
           @touchmove.prevent="progressTouchMove2"
           @touchend="progressTouchEnd2"
      >
		    <div class="money-number" ref='moneyRight'>{{rightText}}k</div>
		    <div class="progress-btn"></div>
		    <div class="btn-icon"></div>
  	</div>
  </div>
</template>
<script type="text/ecmascript-6">
import {prefixStyle} from 'common/js/dom'

const transform = prefixStyle('transform')
const btnWidth = 30
const PADDING_LEFT = 12
const BOX_PADDING_LEFT = 27
export default {
	data() {
		return {
			progressLeft: 0,
			progressRight: 0,
			leftText: 1,
			rightText: 100
		}
	},
	methods: {
		reset() {
			this.$refs.progressBtn.style[transform] = `translate3d(0,0,0)`
			this.$refs.progressBtn2.style[transform] = `translate3d(0,0,0)`
			this.$refs.progress.style.left = 0
			this.$refs.progress.style.right = 0
			this.leftText = 1
			this.rightText = 100
		},
		_emitPregressChange() {
			this.$emit('progressBarChange', this.leftText, this.rightText)
		},
		_progressMove(offsetWidth, type) {
			if (type === 'left') {
				this.$refs.progress.style.left = `${offsetWidth}px`
				this.$refs.progressBtn.style[transform] = `translate3d(${offsetWidth}px,0,0)`
			} else if (type === 'right') {
				this.$refs.progress.style.right = `${Math.abs(offsetWidth)}px`
				this.$refs.progressBtn2.style[transform] = `translate3d(${-offsetWidth}px,0,0)`
			}
		},
		progressTouchStart (e) {
			// 用来控制初始化
			this.touch.initiated = true
			this.touch.Max = this.$refs.progressBar.clientWidth - this.progressRight
			this.$refs.progressBtn.style.zIndex = 10
			this.$refs.moneyLeft.style.background = `url(${this.imgCdn}/static/img/search/1.png)`
			this.$refs.moneyLeft.style.backgroundSize = '100% 100%'
			this.$refs.progressBtn2.style.zIndex = 1
			// 按钮距离左边的位置
			let left = this.$refs.progressBtn.getBoundingClientRect().left
			this.touch.touchX = e.touches[0].pageX - left
		},
		progressTouchMove (e) {
			// 如果还没有触碰按钮就滑动就跳出
			if (!this.touch.initiated) {
				return
			}
			let deltaX = e.touches[0].pageX - PADDING_LEFT - this.touch.touchX
			let offsetWidth =Math.max(0, Math.min(this.touch.Max , deltaX))
			let num = Math.floor(Math.ceil(offsetWidth) / this.$refs.progressBar.clientWidth *100)
			if (num === 0) {
				this.leftText = num + 1
			} else {
				this.leftText = num
			}
			this.progressLeft = offsetWidth
			this._progressMove(offsetWidth, 'left')
			this._emitPregressChange()
		},
		progressTouchEnd () {
			// 取消初始化
			this.touch.initiated = false
			this.$refs.moneyLeft.style.background = `url(${this.imgCdn}/static/img/search/2.png)`
			this.$refs.moneyLeft.style.backgroundSize = '100% 100%'
		},
		progressTouchStart2 (e) {
			// 用来控制初始化
			this.touch2.initiated = true
			this.allWidth = this.$refs.progressBar.clientWidth
			let left = this.$refs.progressBtn2.getBoundingClientRect().left
			this.touch2.touchX = e.touches[0].pageX - left
			this.$refs.progressBtn2.style.zIndex = 10
			this.$refs.progressBtn.style.zIndex = 1
			this.touch2.Max = this.$refs.progressBar.clientWidth - this.progressLeft
			this.$refs.moneyRight.style.background = `url(${this.imgCdn}/static/img/search/1.png)`
			this.$refs.moneyRight.style.backgroundSize = '100% 100%'
		},
		progressTouchMove2 (e) {
			// 如果还没有触碰按钮就滑动就跳出
			if (!this.touch2.initiated) {
				return
			}
			let deltaX = this.allWidth - (e.touches[0].pageX - BOX_PADDING_LEFT) - (btnWidth / 2 - this.touch2.touchX)
			let offsetWidth =Math.min(this.touch2.Max, Math.max(0, deltaX))
			this.progressRight = offsetWidth
			let num = 100 - Math.ceil(Math.floor(offsetWidth) / this.$refs.progressBar.clientWidth *100)
			if (num === 0) {
				this.rightText = num + 1
			} else {
				this.rightText = num
			}
			this._emitPregressChange()
			this._progressMove(offsetWidth, 'right')
		},
		progressTouchEnd2 () {
			// 取消初始化
			this.touch2.initiated = false
			this.$refs.moneyRight.style.background = `url(${this.imgCdn}/static/img/search/2.png)`
			this.$refs.moneyRight.style.backgroundSize = '100% 100%'
			
		}
	},
	created () {
		this.touch = {}
		this.touch2 = {}
	}
}
</script>
<style lang='less' scoped>
@import "~common/less/variable.less";
@import "~common/less/mixin.less";
.progress-bar {
	height: 100%;
	width: 100%;
	position: relative;
	.progress-btn-wrapper1{
		left: -15px;
	}
	.progress-btn-wrapper2{
		right: -15px;
	}
	.progress-btn-wrapper{
		position: absolute;
		width: 30px;
		height: 70px;
		box-sizing: border-box;
		padding-top: 2px;
		overflow: hidden;
		.progress-btn{
			position: relative;
			margin: 0 auto;
			width: 2px;
			height: 8px;
			background: @bg-green;
		}
		.money-number{
			margin-bottom: 6px;
			width: 30px;
			height: 20px;
			font-size: 10px;
			color: #fff;
			box-sizing: border-box;
			padding-bottom: 3px;
			.setflex(center,center);
			.setBg('/static/img/search/2.png');
		}
		.btn-icon{
			width: 30px;
			height:30px;
			margin: 0 auto;
			.setBg('/static/img/search/3.png')
		}
	}
	.bar-inner{
		position: relative;
		top: 50%;
		transform: translateY(-50%);
		height: 2px;
		background: rgba(235, 229, 229, 0.8);
		.progress{
			height: 100%;
			position: absolute;
			left: 0;
			right: 0;
			background: @bg-green;
		}
		
	}
}
</style>