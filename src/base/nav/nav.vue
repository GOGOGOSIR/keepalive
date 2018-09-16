<template>
  <scroll class="nav" :data='list' :scrollX='scrollX' ref='tapScroll'>
    <ul ref='tapUl' class="top-ul">
    	<li v-for='(item, index) in list' class="tapItem" ref='tapItem' @click='selectItem(item, index)'>
    		<div class="navInItem" :class='{navActive: activeIndex === index }'>
    			<span>{{item.name}}</span>
    		</div>
    	</li>
    </ul>
  </scroll>
</template>
<script type="text/ecmascript-6">
import scroll from 'base/scroll/scroll'
import {navLinkArr} from 'api/config'

export default {
	data() {
		return {
			scrollX: true,
			activeIndex: 0
		}
	},
	props: {
		list: {
			type: Array,
			default() {
				return []
			}
		}
	},
	components: {
		scroll
	},
	watch: {
		list() {
			this._setClientWidth()
		}
	},
	methods: {
		selectItem(item, index) {
			this.activeIndex = index
			if (index >2) {
				let itemEl = this.$refs.tapItem[index - 2]
				this.$refs.tapScroll.scrollToElement(itemEl, 300)
			} else {
				this.$refs.tapScroll.scrollTo(0,0,300)
			}
			this.$emit('select', item, index)
		},
		_setClientWidth() {
			let tapItemDom = this.$refs.tapItem
			if (!tapItemDom) {
				return
			}
			let width = 0
			tapItemDom.forEach((item) => {
				width += item.clientWidth
			})
			// 2是精度的缺失
			this.$refs.tapUl.style.width = width + 2 + 'px'
		},
		refresh() {
			let type = this.$route.query.type
			let code
			// 判断type是否存在， 如果不存在只可能是recommend
			if (type) {
				// 判断type是否为recommend
				if (type === 'recommend') {
					code = 'recommend'
				} else if (type === 'material') {
					code = 'material'
				} else {
					code = type
				}
			} else {
				code = 'recommend'
			}
			let idx = this.list.findIndex((item) => {
				return code === item.code
			})
			this.activeIndex = idx	
		}
	},
	mounted() {
		setTimeout(() => {
			this._setClientWidth()
			this.refresh()
			let tapItem = this.$refs.tapItem
			if (!tapItem) {
				return
			}
			this.$refs.tapScroll.scrollToElement(tapItem[this.activeIndex-2], 0)
		}, 20)
	},
	activated() {
		setTimeout(() => {
			this.refresh()
			let tapItem = this.$refs.tapItem
			if (!tapItem) {
				return
			}
			this.$refs.tapScroll.scrollTo(0, 0, 0)
		}, 20)
	}
}
</script>
<style lang='less' scoped>
@import "~common/less/variable.less";
@import "~common/less/mixin.less";
.nav{
	width: 100%;
	height: 45px;
	overflow:hidden;
	.top-ul{
		width:800%;
		.tapItem{
			display: inline-block;
			height: 1.21rem;
			padding-right: 0.533333rem;
			.navInItem{
				height: 100%;
				-webkit-box-sizing: border-box;
				-moz-box-sizing: border-box;
				box-sizing: border-box;
				border-bottom: 2px solid transparent;
				text-align: center;
				font-size: 0;
				line-height: 1.213333rem;
				color:#3a3a3a;
				/*font-weight: normal;*/
				transition: all .4s;
				&.navActive{
					font-weight: bold;
					color:#f29223 !important;
					border-bottom-color:#f29223 !important;
				}
				>span{
					font-size: 16px;
					font-weight: bold;
					vertical-align: middle;
				}
			}
		}
		.tapItem:nth-last-of-type(1){
			padding-right:0 !important;
		}
	}
}
</style>