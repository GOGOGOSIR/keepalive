<template>
  <div class="bs-radio">
    <label class="bs-radio-wrap" :class="_wrapClass(option)">
      <input class="bs-radio-input" type="radio" :disabled="option.disabled" v-model="radioValue"   :value="option.value || option">
      <span class="bs-radio-ui cubeic-round-border">
        <i></i>
      </span>
      <slot>
        <span class="bs-radio-label">{{option.label || option}}</span>
      </slot>
    </label>
  </div>
</template>
<!-- type="text/ecmascript-6" -->
<script>
const COMPONENT_NAME = 'bs-radio'
const EVENT_INPUT = 'input'

export default {
  name: COMPONENT_NAME,
  props: {
    value: String,
    option: {
      type: [String, Object],
      required: true
    }
  },
  data() {
    return {
      radioValue: this.value
    }
  },
  watch: {
    value(newV) {
      this.radioValue = newV
    },
    radioValue(newV) {
      this.$emit(EVENT_INPUT, newV)
    }
  },
  methods: {
    _wrapClass(option) {
      return {
        'bs-radio_selected': this.radioValue === (option.value || option),
        'bs-radio_disabled': option.disabled
      }
    }
  }
}
</script>
<style lang="less" scoped>
  @import "~common/less/variable.less";
  @import "~common/less/mixin.less";
  
  .bs-radio{
    position: relative;
    text-align: left;
    font-size: 100%;
    color: @radio-color;
    background-color: @radio-bgc;
    &[data-pos="right"]{
      .bs-radio-ui{
        margin-right: 0;
        position: absolute;
        right: 0;
      }
      .bs-radio-label{
        margin-right: @ui-width;
      }
    }
    &:last-child{
      .bs-radio-wrap{
        .border-none();
      }
    }
  }
  .bs-radio-wrap{
    position: relative;
    display: flex;
    align-items: center;
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    padding: 11px 0;
    /*line-height: 1.5;*/
    word-break: break-word;
    word-wrap: break-word;
  }
  .bs-radio-input{
    z-index: 1;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
  }
  .bs-radio-ui{
    position: relative;
    width: 1em;
    height: 1em;
    margin-right: @ui-width - 1em;
    line-height: 1;
    color: transparent;
    border-radius: 50%;
    &::before, i{
      transition: all .2s;
    }
    &::before{
      color: @radio-icon-color;
      display: inline-block;
      transform: scale(1.2);
    }
    i{
      position: absolute;
      top: 0;
      left: 0;
      overflow: hidden;
      width: 100%;
      height: 100%;
      border-radius: 50%;
      background-color: currentColor;
      transform: scale(.4);
      &::before{
        content: "";
        position: absolute;
        top: 50%;
        left: 50%;
        width: 50%;
        height: 50%;
        transform: translate(-50%, -50%) scale(.8);
        background-color: currentColor;
        border-radius: 50%;
      }
    }
  }
  .bs-radio_selected{
    .bs-radio-ui{
      color: @radio-selected-icon-color;
      &::before{
        color: transparent;
      }
      i{
        transform: scale(1);
        &::before{
          background-color: @radio-selected-icon-bgc;
        }
      }
    }
  }
  .bs-radio_disabled{
    .bs-radio-ui{
      color: @radio-disabled-icon-color;
      background-color: @radio-disabled-icon-bgc;
      &::before, i{
        transition: none;
      }
      &::before{
        color: transparent;
      }
    }
  }
</style>

