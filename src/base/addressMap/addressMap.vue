<template>
	<transition name='topslider'>
	  <div class="addressMap" v-show='addressFlag'>
	  	<div class="back">
		    <i class="bsIcon icon-zuojiantou backIcon" @click.stop='back'></i>
		    <span class="back-title">选择城市</span>
		</div>
	  	<div class="addressMap-wrapper">
	  		<cube-scroll :data="cityList" :options='options' ref='mapscroll'>
	  			<ul class="city-list">
	  				<li class="big-item-li" v-if='currentCity.cityname'>
	  					<p class="text-tit">定位城市</p>
	  					<ul class="list-city-ul">
	  						<li class="item-cl" @click='selectCityItem(currentCity)'>{{currentCity.cityname || ''}}</li>
	  					</ul>
	  				</li>
	  				<li class="big-item-li" v-for='(item, index) in cityList' ref='cityItem'>
	  					<p class="text-tit" v-if='index === 0'>{{item.initial}}</p>
	  					<div class="radius-tit" v-else>
	  						<div>{{item.initial}}</div>
	  					</div>
	  					<ul class="list-city-ul">
	  						<li class="item-cl" v-for='(templateItem,idx) in item.list' :style='setStyle(idx)' @click='selectCityItem(templateItem)'>
	  							{{templateItem.name}}
	  						</li>
	  					</ul>
	  				</li>
	  			</ul>
	  		</cube-scroll>
	  		<!-- 字母排序列表 -->
	  		<ul class="index-list-wrapper"
	  			@touchstart.stop.prevent='shortcutTouchstart'
	  			@touchmove.stop.prevent='shortcutTouchmove'
	  			@touchend.stop='shortcutTouchend'>
	  			<li class="index-list-item" ref='shortItem' v-for='(items,index) in indexList' :data-index="index" :data-item="items">
	  				{{items}}
	  			</li>
	  		</ul>
	  		<div class="radious-short" v-show='shortFlag'>{{shortValue}}</div>
	  	</div>
	  </div>
	</transition>
</template>
<!-- type="text/ecmascript-6" -->
<script>
  import {cityList} from 'common/js/cityList'
  import {getData} from 'common/js/dom'
  export default {
  	props: ['currentCity'],
  	data() {
  		return {
  			cityList: cityList,
  			addressFlag: false,
  			options: {
  				bounce: false
  			},
  			shortValue: '',
  			shortFlag: false
  		}
  	},
  	created() {
  		this.touch = {}
  		this.createdA_Z()
  	},
  	watch: {
  		addressFlag(flag) {
  			if (flag) {
  				setTimeout(() => {
	  				this.$refs.mapscroll.refresh()
	  			},20)
  			} 
  		}
  	},
  	methods: {
  		open() {
  			this.addressFlag = true
  		},
  		close() {
  			this.addressFlag = false
  		},
  		selectCityItem(obj) {
  			this.$emit('selectCityItem',obj)
  			this.close()
  		},
  		_scrollMove(index) {
  			let elDom = this.$refs.cityItem
  			this.$refs.mapscroll.scrollToElement(elDom[index], 0)
  		},
  		shortcutTouchstart(e) {
  			let finger = e.touches[0]
  			this.touch.initiated = true
  			this.touch.startY = finger.pageY
  			// 由于有些是没有数据的，要去匹配是否有数据
  			let itemValue = getData(e.target, 'item')
  			let index = cityList.findIndex((items) => {
  				if (items.initial === itemValue) {
  					this.shortValue = itemValue
  					this.shortFlag = true
  				}
  				return items.initial === itemValue
  			})
  			if (index !== -1) {
  				this._scrollMove(index)
  			}
  			// 字母表选择字母的index
  			this.touch.startIndex = +getData(e.target, 'index')
  			// 获取字母的高度
  			this.shortHright = this.$refs.shortItem[0].clientHeight
  		},
  		shortcutTouchmove(e) {
  			if (!this.touch.initiated) {
  				return
  			}
  			let finger = e.touches[0]
  			this.touch.datalY = finger.pageY - this.touch.startY
  			let index = Math.floor(this.touch.datalY / this.shortHright) + this.touch.startIndex
  			if (index > 0) {
  				if (index > 25) {
	  				index = 25
	  			}
	  			//去检索是否有这个字母的索引
	  			let value = getData(this.$refs.shortItem[index], 'item')
	  			let realyIndex = cityList.findIndex((items) => {
	  				if (items.initial === value) {
	  					this.shortValue = value
	  				}
	  				return items.initial === value
	  			})
	  			if (realyIndex !== -1) {
	  				this._scrollMove(realyIndex)
	  			}
  			}
  		},
  		shortcutTouchend() {
  			this.touch.initiated = false
  			this.shortFlag = false
  		},
  		createdA_Z() {
  			this.indexList = []
  			for(let i=65; i<91; i++)
			{
			  this.indexList.push(String.fromCharCode(i))
			}
  		},
  		mapRefresh() {
  			setTimeout(() => {
  				this.$refs.mapscroll.refresh()
  			},20)
  		},
  		back() {
  			this.close()
  		},
  		setStyle(index) {
			if ((index+1) % 3 === 0 && index > 0) {
				return 'marginRight: 0'
			}
		}
  	}
  }
</script>
<style scoped lang="less">
@import '~common/less/variable.less';
@import "~common/less/mixin.less";
.addressMap{
	position: fixed;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
	z-index: 30;
	background:#FFF;
	&.topslider-enter-active,&.topslider-leave-active{
		transition: all .3s;
	}
	&.topslider-enter,&.topslider-leave-to{
		transform: translate3d(0,100%,0);
	}
	
	.back{
		width: 100%;
		box-sizing: border-box;
		padding:12px 15px;
		font-size: 0;
		display: flex;
		justify-content: space-between;
		align-items: center;
		position: relative;
		background: @bg-green;
		.backIcon{
			font-size: 15px;
			color: #fff;
		}
		.back-title{
			position: absolute;
			left:50%;
			transform: translateX(-50%);
			font-size: 15px;
			color:#fff;
		}
	}
	.addressMap-wrapper{
		position: fixed;
		top: 38px;
		bottom: 0;
		width:100%;
		.radious-short{
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%,-50%);
			width: 40px;
			height: 40px;
			border-radius: 50%;
			background: @bg-green;
			font-size: 16px;
			z-index: 60;
			color: #fff;
			text-align:center;
			line-height:40px;
		}
		.index-list-wrapper {
			width: 15px;
			height: 100%;
			box-sizing: border-box;
			padding-top: 8px;
			font-size: 10px;
			color: @bg-green;
			position: absolute;
			top: 0;
			right: 0;
			z-index: 10;
			>li{
				height: 3.8%;
				display: flex;
				justify-content: center;
				align-items: center;
			}
		}
		.city-list{
			width: 100%;
			box-sizing: border-box;
			padding: 0 15px;
			.big-item-li{
				width: 100%;
				.text-tit{
					padding: 12px 0;
					font-size: 10px;
					color: #414141;
				}
				.radius-tit{
					padding: 12px 0;
					font-size: 10px;
					color: #fff;
					>div{
						width: 20px;
						height: 20px;
						border-radius: 50%;
						.setflex(center,center);
						background: @bg-green;
					}
				}
				.list-city-ul{
					width: 100%;
					overflow: hidden;
					padding-top:2px;
					.item-cl{
						float: left;
						width: 108px;
						height: 28px;
						margin-right:10px;
						margin-bottom: 8px;
						.radius-border-1px(5px, #d2d2d2);
						font-size: 10px;
						.setflex(center,center);
						color: #8a8a8a;
					}
				}
			}
		}
	}
}

</style>
