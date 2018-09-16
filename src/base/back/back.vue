<template>
  <div class="back" :style="'background:' + bgColor">
  	<div class="backIconBox" @click.stop='back'>
    	<i class="bsIcon icon-zuojiantou backIcon" :style="'color:' + textColor" ></i>
    </div>
    <span class="back-title" :style="'color:' + textColor">{{title}}</span>
    <div class="back-other-box" @click.stop='otherSelect'>
    	<span class="other-title" 
    		v-show='otherTitleFlag' 
    		:style="'color:' + setColor"
    		>{{otherTitle}}</span>
   	</div>
  </div>
</template>
<script type="text/ecmascript-6">
//'#666262'
export default {
	props: {
		title: {
			type: String,
			default: ''
		},
		otherTitleFlag: {
			type:Boolean,
			default: true
		},
		otherTitle: {
			type: String,
			default: ''
		},
		bgColor: {
			type: String,
			default: '#12cc8c'
		},
		textColor: {
			type: String,
			default: ''
		},
		setColor: {
			type: String,
			default: '#fff'
		},
		isJustback: {
			type:Boolean,
			default: true
		}
	},
	methods: {
		back() {
			if (this.isJustback) {
				this.$router.go(-1)
			} else {
				this.$emit('iconBack')
			}
		},
		otherSelect() {
			this.$emit('backSelect')
		},
		setStyle() {
			if (this.otherTitleFlag) {
				return 'background:' + bgColor
			} else {
				return 'justifyContent'
			}
		}
	}
}
</script>
<style lang='less' scoped>
@import "~common/less/variable.less";
@import "~common/less/mixin.less";
.back{
	width: 100%;
	box-sizing: border-box;
	padding:12px 15px;
	font-size: 0;
	display: flex;
	justify-content: space-between;
	align-items: center;
	position: relative;
	.backIconBox{
		.extend-click();
		.backIcon{
			font-size: 15px;
			/*color: #4a4949;*/
			color: #fff;
		}
	}
	.back-title{
		position: absolute;
		left:50%;
		transform: translateX(-50%);
		font-size: 15px;
		/*color: #1e1d1d;*/
		width: 60%;
		text-align: center;
		color:#fff;
	}
	.back-other-box{
		.extend-click();
		.other-title{
			font-size: 13px;
		}
	}
	
}
</style>