<template>
	<transition name='fade'>
	  <div class="bsCropper" v-show='cropperFlag'>
	    <div class="cropper-wrapper">
	    	<VueCropper ref="bscropper" 
	    				:img="imgSrc" 
	    				:autoCrop='true' 
	    				:autoCropWidth="120" 
	    				:autoCropHeight="120" 
	    				@imgLoad='imgLoad' 
	    				:fixedBox='fixedBox'
	    				:fixed='true'
	    				:full='true'
	    				></VueCropper>
	    </div>
	    <div class="btn-cropper">
	    	<div @click.stop='close'>{{btnLeftText}}</div>
	    	<div @click.stop='cropperEnd'>{{btnRightText}}</div>
	    </div>
	  </div>
	</transition>
</template>
<!-- type="text/ecmascript-6" -->
<script>
import VueCropper from 'vue-cropper'
export default {
	name: 'bsCropper',
	props: {
		imgSrc: {
			type: String,
			default: ''
		},
		btnLeftText: {
			type: String,
			default: '取消'
		},
		btnRightText: {
			type: String,
			default: '裁剪'
		}
	},
	data() {
		return {
			fixedBox: false,
			cropperFlag: false
		}
	},
	watch: {
		cropperFlag(flag) {
			if (flag) {
				this.cropperStart()
			}
		}
	},
	created() {
		this.cropperLoading = this.$createToast({
			txt: '图片生成中',
			mask: true,
			time: 300000
		})
		this.cropperLoading.show()
	},
	methods: {
		imgLoad(status) {
			this.cropperLoading.hide()
		},
		show() {
			this.cropperFlag = true
		},
		close() {
			this.cropperFlag = false
			this.$emit('cropperClose')
		},
		cropperStart() {
			this.$refs.bscropper.startCrop()
		},
		cropperEnd() {
			this.$refs.bscropper.stopCrop()
			this.$refs.bscropper.getCropData((data) => {
			  this.$emit('cropperEnd', data)  
			})
			this.close()
		}
	},
	components: {
		VueCropper
	}
}
</script>
<style lang='less' scoped>
@import "~common/less/variable.less";
@import "~common/less/mixin.less";
.bsCropper{
	position: fixed;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
	z-index: 600;
	&.fade-enter-active,&.fade-leave-active{
		transition: all .3s;
	}
	&.fade-enter,&.fade-leave-to{
		opacity: 0;
	}
	.cropper-wrapper{
		position: fixed;
		top: 0;
		bottom: 38px;
		width: 100%;
	}
	.btn-cropper{
		position: absolute;
		left: 0;
		bottom: 0;
		width: 100%;
		box-sizing: border-box;
		padding: 0 30px;
		display: flex;
		justify-content: space-between;
		align-items: center;
		height: 38px;
		font-size: 14px;
		color: #fff;
		background: @bg-green;
	}
}
</style>