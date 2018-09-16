<template>
	<transition name='fade-loading'>
	  <div class="fullLoading" v-show='fullLoadingFlag'>
	  	<loading :title='fullTitle'></loading>
	  </div>
	</transition>
</template>
<script type="text/ecmascript-6">
import Loading from 'base/loading/loading'
  export default {
  	name: 'fullLoading',
  	props: {
  		fullTitle: {
  			type: String,
  			default: '加载中'
  		}
  	},
  	data() {
  		return {
  			fullLoadingFlag: false
  		}
  	},
  	methods: {
  		show() {
  			this.fullLoadingFlag = true
  		},
  		hide() {
  			this.fullLoadingFlag = false
  		}
  	},
  	components: {
  		Loading
  	}
  }
</script>
<style scoped lang="less">
@import '~common/less/variable.less';
@import "~common/less/mixin.less";
.fullLoading{
	position: fixed;
	top: 0;
	right: 0;
	bottom: 0;
	left: 0;
	z-index: 300;
	background: rgba(0,0,0,.8);
	.setflex(center,center);
	&.fade-loading-enter-active,&.fade-loading-leave-active{
		transition: all .3s;
	}
	&.fade-loading-enter,&.fade-loading-leave-to{
		opacity: 0;
	}
}
</style>