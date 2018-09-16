<template>
  <div class="loading">
    <img width="24" height="24" :src="imgCdn+ '/static/img/loading/loading.gif'">
    <p class="desc">{{title}}</p>
  </div>
</template>
<script type="text/ecmascript-6">
  export default {
    props: {
      title: {
        type: String,
        default: '加载中'
      }
    },
    data() {
      return {
        imgCdn: this.imgCdn
      }
    }
  }
</script>
<style scoped lang="less">
@import '~common/less/variable.less';
@import "~common/less/mixin.less";
  .loading{
    width: 100%;
    text-align: center;
    font-size: 0;
    .desc{
      margin-top: 4px;
      line-height: 0.533333rem;
      font-size: @font-size-small;
      color:#b1b1b1;
    }
  }
</style>
