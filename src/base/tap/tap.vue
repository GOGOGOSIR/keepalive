<template>
  <div class="tap">
  	<div class="tap-wraper">
  		<div class="tap-list-item" :class="{active: currentIndex === index}" v-for='(item,index) in list' @click='tapSelect(index,item)'>
  			{{item}}
  			<div class="border-line"></div>
  		</div>
  	</div>
  </div>
</template>
<script type="text/ecmascript-6">
const All = 'all'
export default {
	props: {
		list: {
			type: Array,
			default() {
				return []
			}
		}
	},
	data() {
		return {
			currentIndex: 0,
			type: ''
		}
	},
	watch: {
		$route() {
			this.refreshTap()
		}
	},
	created() {
		this.refreshTap()
	},
	methods: {
		tapSelect(idx,item) {
			this.currentIndex = idx
			this.$emit('tapSelect', item, idx)
		},
		refreshTap() {
			let type = this.$route.query.type
			if (type) {
				this.type = type
				if (type === All) {
					this.currentIndex = 0
				} else {
					this.currentIndex = 1
				}
			}
		}
	}
}
</script>
<style lang='less' scoped>
@import "~common/less/variable.less";
@import "~common/less/mixin.less";
.tap{
	width: 100%;
	.tap-wraper{
		display: flex;
		align-items: center;
		.tap-list-item{
			flex:1;
			font-size:14px;
			color: #a4a4a4;
			text-align: center;
			padding: 12px 0;
			transition: all .4s;
			position: relative;
			.border-line{
				height: 2px;
				width: 15px;
				background:#1ad78e;
				position: absolute;
				bottom: 0px;
				left: 50%;
				transform: translateX(-50%);
				opacity: 0;
				transition: all .4s;
			}
			&.active{
				color:#1ad78e;
				.border-line{
					opacity: 1;
				}
			}
		}
	}
}
</style>