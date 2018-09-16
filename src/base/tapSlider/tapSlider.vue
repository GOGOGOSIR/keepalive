<template>
  <div class="tapslider"
  		@touchstart.prevent='wraperTouchstart'
	  	@touchmove.prevent='wraperTouchmove'
	  	@touchend='wraperTouchend'>
    <slot></slot>
  </div>
</template>
<script type="text/ecmascript-6">
const ALL = 'all'

import {prefixStyle} from 'common/js/dom'
const transform = prefixStyle('transform')
// https://segmentfault.com/a/1190000013604306
export default {
	data() {
		return {
			touch: {}
		}
	},
	methods: {
		wraperTouchstart(e) {
			this.touch.initiated = true
			let touch = e.touches[0]
			// 默认他是横向滚动
			this.touch.horizontalMove = true
			this.touch.startX = touch.pageX
			this.touch.startY = touch.pageY
		},
		wraperTouchmove(e) {
			// 如果initiated不为true就跳出 || !this.touch.horizontalMove
			if (!this.touch.initiated) {
				return
			}
			let touch = e.touches[0]
			let deltaX = touch.pageX - this.touch.startX
			let deltaY = touch.pageY - this.touch.startY
			
			// 在y轴上移动的距离大于x轴移动的距离，就带便用户不是左右切换的状态，所以就return
			if (Math.abs(deltaY) >= Math.abs(deltaX) || !this.touch.horizontalMove){
				this.touch.horizontalMove = false
				return
			}
			// if (!this.touch.horizontalMove) {
			// 	this.touch.horizontalMove = true
			// }
			// 设置初始的偏移量
			let left = 0
			this.totalDiff = left + deltaX
			if (this.paramsType === ALL) {
				if (this.totalDiff > 0) {
					this.totalDiff = 0
				} else if (this.totalDiff <= -window.innerWidth) {
					this.totalDiff = -window.innerWidth
				}
			} else {
				if (this.totalDiff < 0) {
					this.totalDiff = 0
				} else if (this.totalDiff >= window.innerWidth) {
					this.totalDiff = window.innerWidth
				}
			}
			this.touch.percent = Math.abs(this.totalDiff) / window.innerWidth
			let el = e.currentTarget
			this.transitionChange(el,this.totalDiff,0)
		},
		wraperTouchend(e) {
			if (!this.touch.horizontalMove) {
				// this.touch.horizontalMove = true
				// 纵向滑动
				return
			}
			let el = e.currentTarget
			let offsetWidth
			if (this.paramsType === ALL) {
				if (this.touch.percent > 0.1) {
				    this.$emit('dragedSlide', 'look')
				} else {
					offsetWidth = 0
					this.transitionChange(el,offsetWidth,0.4)
				}
			} else {
				if (this.touch.percent < 0.1) {
					offsetWidth = 0
					this.transitionChange(el,offsetWidth,0.4)
				    
				} else {
					this.$emit('dragedSlide', 'all')
				}
			}
			this.touch.initiated = false
		},
		transitionChange(el, offsetWidth, time) {
			el.style[transform] = `translate3d(${offsetWidth}px,0,0)`
			el.style.transition = `all ${time}s`
		}
	},
	created() {
		this.paramsType = this.$route.query.type
	}
}
</script>
<style lang='less' scoped>
@import "~common/less/variable.less";
@import "~common/less/mixin.less";
.tapslider{
	width:100%;
	height:100%;
	position: relative;

}
</style>