<template>
  <div class="bsInput">
    <input 
    	ref='bsInput'
    	:type="type"
    	v-model="inputValue"
    	:placeholder="holderVal"
    	@focus="handleFocus"
      	@blur="handleBlur"
      	>
    <span class="clearValue" @click.stop='clearVal' v-show='_showClear'>
    	<i class="bsIcon icon-shanchuguanbicha2"></i>
    </span>
  </div>
</template>
<script type="text/ecmascript-6">
const EVENT_INPUT = 'input'
const EVENT_BLUR = 'blur'
const EVENT_FOCUS = 'focus'
export default {
	// 这里要注意，在我们使用此组建的时候是通过v-model来传递值的
	// 而v-model的原理则是
	// <input
	//   v-bind:value="something"
	//   v-on:input="something = $event.target.value">
	props: {
		value: [String, Number],
		type: {
			type: String,
			default: 'text'
		},
		holderVal: {
			type: String,
			default: ''
		}
	},
	data() {
		return {
			inputValue: this.value
		}
	},
	watch: {
		value(newVal) {
			this.inputValue = newVal
		},
		inputValue(newInputValue) {
			this.$emit(EVENT_INPUT, newInputValue)
		}
	},
	computed: {
		_showClear() {
			return this.inputValue
		}
	},
	methods: {
		handleFocus(e) {
	        this.$emit(EVENT_FOCUS, e)
	    },
	    handleBlur(e) {
	        this.$emit(EVENT_BLUR, e)
	    },
		clearVal() {
			this.inputValue = ''
			this.$refs.bsInput.focus()
		}
	}
}
</script>
<style lang='less' scoped>
@import "~common/less/variable.less";
@import "~common/less/mixin.less";
.bsInput{
	width: 100%;
	position: relative;
	display: flex;
	align-items: center;
	>input{
		flex: 1;
		display: block;
		width: 100%;
		height: 20px;
		line-height: 20px;
		color: #212020;
		line-height: 0;
		box-sizing: border-box;
		padding-right: 10px;
		font-size: 14px;
		text-overflow: clip;
		padding: 0;
		&::-webkit-input-placeholder{
		      color: #c2c2c2 !important;
		      font-size: 14px; 
		      line-height: 20px;
		}
	}
	.clearValue{
		display: block;
		font-size: 15px;
		width: 1.2em;
    	height: 1.2em;
    	line-height: 1.2em;
    	display: flex;
    	align-items: center;
		color: #c1c1c1;
	}
}
</style>