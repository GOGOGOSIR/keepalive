<template>
  <transition name='select'>
    <div class="sliderDown" v-show='selectTypeFlag' @click.self='closeSliderDown'>
      <div class="sliderDown-wrapper">
        <p class="sliderDown-t">- 请选择已发布的职位 -</p>
        <slot>
	        <ul class="type-list-s">
            <li class="type-list-item-s" @click.stop="select('all')">
              <p class="c-name">
                <span> 全部职位</span>
              </p>
            </li>
	          <li class="type-list-item-s" v-for='item in list' @click.stop='select(item)'>
	            <p class="c-name">
                  <span v-if='item.title'> {{item.title}} </span>
                  -
                  <span v-if='item.city'> {{item.city.name}} </span>
              </p>
	            <p class="c-money">
                {{item.min_salary/1000}}k-{{item.max_salary/1000}}k
              </p>
	          </li>
	        </ul>
	    </slot>
      </div>
    </div>
 </transition>
</template>
<!-- type="text/ecmascript-6" -->
<script>
  export default {
  	props: {
  		showActiveClass: {
  			type: Boolean,
  			default: false
  		},
      list:[Array]
  	},
  	data() {
  		return {
  			selectTypeFlag: false
  		}
  	},
  	watch: {
  		selectTypeFlag(newFlag) {
  			this.$emit('changeflag', newFlag)
  		}
  	},
  	methods: {
      select(item) {
        this.$emit('sliderSelect',item)
        this.closeSliderDown()
      },
  		openSliderDown() {
  			this.selectTypeFlag = true
  		},
  		closeSliderDown() {
	      this.selectTypeFlag = false
	    }
  	}
  }
</script>
<style scoped lang="less">
@import '~common/less/variable.less';
@import "~common/less/mixin.less";
.sliderDown{
  position: absolute;
  top: 0;
  bottom:0;
  width: 100%;
  background: rgba(0,0,0,.6);
  z-index: 300;
  &.select-enter-active,&.select-leave-active{
    transition: all .3s;
    .sliderDown-wrapper{
       transition: all .3s;
    }
  }
  &.select-enter,&.select-leave-to{
    opacity: 0;
    .sliderDown-wrapper{
      transform: translate3d(0,-100%,0);
    }
  }
  .sliderDown-wrapper{
    width: 100%;
    background: #fff;
    padding-bottom: 10px;
    .sliderDown-t{
      padding: 12px 0;
      text-align: center;
      font-size: 13px;
      color: #c8c8c8;
    }
    .type-list-s{
      width: 100%;
      max-height: 360px;
      overflow: auto;
      box-sizing: border-box;
      padding: 0 15px;
      .type-list-item-s{
        width: 100%;
        padding: 16px 0 ;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .bs-1px-b(#dcdcdc);
        .c-name{
          font-size: 14px;
          color: #262626;
        }
        .c-money{
          font-size: 13px;
          color: #f66728;
        }
      }
      .type-list-item-s:nth-last-of-type(1){
        .bs-1px-b(transparent);
      }
    }
  }
}
</style>