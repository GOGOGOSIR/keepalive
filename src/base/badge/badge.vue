<template>
    <span class="bs-badge" :style='_setStyle()' ref='bsBadge'>{{val}}</span>
</template>
<script type="text/ecmascript-6">
  export default {
    props: {
      val: {
        type: Number,
        default: 0
      },
      color: {
        type: String,
        default: '#fff'
      },
      bgColor: {
        type: String,
        default: '#ff4343'
      },
      scale: {
        type: Number,
        default: 0.775
      }
    },
    methods: {
      _setStyle(){
          return `color: ${this.color}; background: ${this.bgColor}; transform: scale(${this.scale})`
      }
    }
  }
</script>
<style scoped lang="less">
@import '~common/less/variable.less';
@import "~common/less/mixin.less";
.bs-badge{
  display: inline-block;
  padding: 4px 6px 2px;
  font-size: 12px;
  border-radius: 100px;
  border: 2px solid #fff;
  line-height: 1;

}
</style>
