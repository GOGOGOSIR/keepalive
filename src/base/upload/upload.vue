<template>
  <div class="upload" ref='uploadsWrapper'>
  	<transition-group name="list" tag="ul" class="uploadWrap">
    	<li v-for='(items, index) in uploadImgList' :key="index" class="uploadItem" 
    		:class="{'end': (index+1) % count === 0 && index > 0}">
    		<div class="saveImg-box">
    			<img :src="items.url" alt="" @load='imgLoad' class="saveImgs" preview="1">
    			<div class="deleteImg-box" @click.stop='openConfirm(index)'>
    				<img :src="imgCdn+ '/static/img/helper/3.png'" class="deleteImg">
    			</div>
    		</div>
    		
    	</li>
    	<li class="uploadItem" key="upload" style="margin-right: 0">
    		<label for="uploadImg" class="upload-label">
    			<img :src="imgCdn+ '/static/img/helper/4.png'">
    		</label>
    		<input type='file' id='uploadImg' style="display: none;" @change='upImg' ref='uploadInput' name="file" accept="image/*" >
    	</li>
    </transition-group>
  </div>
</template>
<script type="text/ecmascript-6">
import {uploadPic} from 'api/upload'
import {maxSize} from 'api/config'

export default {
	props:{
		count: {
			type: Number,
			default: 3
		}
	},
	data() {
		return {
			imgCdn: this.imgCdn,
			uploadImgList: [],
			imgIndex: ''
		}
	},
	methods: {
		openConfirm(index) {
			this.imgIndex = index
			this.$emit('openConfirm')
		},
		delectImg() {
			this.$refs.uploadInput.value = ''
			this.uploadImgList.splice(this.imgIndex, 1)
			this.$emit('getImgInfo', this.uploadImgList)
		},
		imgLoad() {
			if (this._toast) {
				this._toast.hide()
			}
			this.$emit('uploadImgEnd')
		},
		upImg(e) {
			this.file = e.target.files[0]
			if (this.file.size > maxSize) {
				this.$createToast({
					txt: '上传图片不能超过10M',
					type: 'warn',
					time: 1000
				})
				this.$refs.uploadInput.value = ''
				return
			}  
			const param = new FormData()
			param.append('file', this.file)
			this._toast = this.$createToast({
				txt: '图片上传中',
				mask: true,
				time: 12000
			})
			this._toast.show()
			uploadPic(param).then((res) => {
				if (res.error_code === 0) {
					let data = res.data
					this.uploadImgList.push(data)
					this.$previewRefresh()
					this.$emit('getImgInfo', this.uploadImgList)
				} else {
					this.$createToast({
						txt: '图片上传失败',
						type: 'error',
						time: 1000
					})
				}
			})
		}
	}
}
</script>
<style lang='less' scoped>
@import "~common/less/variable.less";
@import "~common/less/mixin.less";
.upload{
	width:100%;
	.uploadWrap{
		width: 100%;
		font-size: 0;
		line-height: 60px;
		.uploadItem{
			width:108px;
			height:108px;
			display: inline-block;
			box-sizing: border-box;
			background: #e7fbef;
			border-radius: 5px;
			border: 1px dashed #29eb92;
			text-align: center;
			position: relative;
			margin: 0 12px 12px 0;
			vertical-align: middle;
			&.list-enter-active,&.list-leave-active{
				transition: all .1s;
			}
			&.list-enter,&.list-leave-to{
				width: 0;
			}
			&.end{
				margin-right: 0 !important;
			}
			.saveImg-box{
				width: 100%;
				height: 100%;
				position: relative;
				background: #fff;
				overflow: hidden;
				.saveImgs{
					position: absolute;
					top: 50%;
					left:50%;
					transform: translate(-50%,-50%);
					max-width: 100%;
					max-height: 100%;
				}
				.deleteImg-box{
					width: 20px;
					height: 20px;
					position: absolute;
					top: 5px;
					right:5px;
					.deleteImg{
						width: 20px;
						height: 20px;
						display: block;
					}
				}
			}
			.upload-label{
				display: inline-block;
				width: 100%;
				height: 100%;
				text-align: center;
				position: relative;
				>img{
					display: block;
					width: 20px;
					height: 20px;
					position: absolute;
					top: 50%;
					left: 50%;
					transform: translate(-50%,-50%);
				}
			}
		}
	}
}
</style>