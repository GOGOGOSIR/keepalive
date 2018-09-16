<template>
  <transition name='cool'>
    <div class="watchBomb" v-show='showFlag' @click.self='close'>
      <div class="watchBombWrapper">
        <div class='title'>
            <span>消息通知</span>
            <div class="closeIcon" @click='close'>
                <i class="bsIcon icon-chahao"></i>
            </div>
        </div>
      	<cube-scroll class="scroll-watch" :data='[]'>
            {{value}}
         </cube-scroll>
      </div>
    </div>
  </transition>
</template>
<!-- type="text/ecmascript-6" -->
<script>
export default {
  name: "watchBomb",
  props: ["value"],
  data() {
    return {
      showFlag: false,
      imgCdn: this.imgCdn
    };
  },
  methods: {
    show() {
      this.showFlag = true;
    },
    close() {
      this.showFlag = false;
    }
  }
};
</script>
<style lang='less' scoped>
@import "~common/less/variable.less";
@import "~common/less/mixin.less";

.watchBomb {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
  z-index: 500;
  display: flex;
  align-items: center;
  justify-content: center;
  &.cool-enter-active,
  &.cool-leave-active {
    transition: all 0.3s;
    .watchBombWrapper {
      transition: all 0.3s;
    }
  }
  &.cool-enter,
  &.cool-leave-to {
    opacity: 0;
    .watchBombWrapper {
      transform: scale(0);
    }
  }
  .watchBombWrapper {
    width: 300px;
    max-height: 200px;
    background: #fff;
    border-radius: 8px;
    box-sizing: border-box;
    padding: 0 12px 30px;
    .title {
      font-weight: bold;
      text-align: center;
      height: 40px;
      position: relative;
      > span {
        letter-spacing: 3px;
        font-size: 16px;
        color: #000;
        line-height: 40px;
      }
      .closeIcon {
        .extend-click();
        width: 20px;
        height: 20px;
        font-size: 20px;
        position: absolute;
        right: 4px;
        top: 10px;
        color: #999;
      }
    }
    .scroll-watch {
      max-height: 200px;
      font-size: 14px;
      color: #535353;
      line-height: 22px;
    }
  }
}
</style>