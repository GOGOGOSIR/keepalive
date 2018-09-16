<template>
  <div class="search-box">
    <div class="search-box-left">
      <div class="search-city" @click='selectcity'>
        <span>{{city || '全国'}}</span>
        <i class="bsIcon icon-xiajiantou"></i>
      </div>
      <div class="search-wrapper">
        <form action='javascript:return true' class="form-search">
          <input ref="query" type="search" v-model="query" @keyup.13='search' class="box" :placeholder="placeholder"/>
        </form>
        <i @click="clear" v-show="query" class="bsIcon searchIcon icon-shanchuguanbicha2"></i>
      </div>
    </div>
    <div class="search-box-right" @click='goback'>
      取消
    </div>
  </div>
</template>
<!-- type="text/ecmascript-6" -->
<script>
import {debounce} from 'common/js/util'

export default {
	props: {
		placeholder: {
			type: String,
			default: '请输入职位或公司'
		},
    city: [String]
	},
	data() {
		return {
			query: '',
      cityName: ''
		}
	},
	methods: {
    search () {
      this.$emit('search', this.query)
    },
    goback() {
      this.$router.push({name: 'Home'})
    },
    selectcity() {
      this.$emit('openAddress')
    },
		clear() {
			this.query = ''
		},
		setQuery(query) {
			this.query = query
		},
		blur() {
			this.$refs.query.blur()
		}
	},
	created() {
		// 函数的节流
		this.$watch('query', debounce((query) => {
			this.$emit('changeQuery', query)
		}, 200))
	},
	deactivated() {
    // unWatch() // 注销watch
		this.clear()
	}
}
</script>
<style lang='less' scoped>
@import "~common/less/variable.less";
@import "~common/less/mixin.less";
.search-box{
	display: flex;
	align-items: center;
	-webkit-box-sizing: border-box;
	-moz-box-sizing: border-box;
	box-sizing: border-box;
	width: 100%;
	padding: 6px 8px;
	height: 40px;
  background: @bg-green;
  .search-box-left{
    flex: 1;
    box-sizing: border-box;
    padding-right: 10px;
    height: 28px;
    background: #fff;
    border-radius: 14px;
    display: flex;
    align-items: center;
    .search-city{
      /*flex:0 0 86px;*/
      max-width: 86px;
      box-sizing: border-box;
      padding-left: 10px;
      font-size: 12px;
      text-align: center;
      color:#22d6aa;
    }
    .search-wrapper{
      flex: 1;
      display: flex;
      font-size: 0;
      .bs-1px-l(#dfdfdf);
      box-sizing: border-box;
      padding-left: 8px;
      .form-search{
        flex: 1;
      }
      input{
        flex: 1;
        width: 100%;
        font-size: 12px;
        color: #5f5f5f;
        background: transparent;
        &::-webkit-input-placeholder{
          color: #c2c2c2 !important;
          font-size: 12px;
          vertical-align: middle !important;
        }
      }
      .searchIcon{
        font-size: 14px;
        color: #9a9a9a;
        line-height: 20px;
      }
    }
  }
  .search-box-right{
    flex: 0 0 36px;
    width: 36px;
    font-size: 13px;
    text-align: right;
    color: #fff;
  }
	/*.icon-search{
		font-size:24px;
		color:@color-background; 
	}
	.box{
		flex:1;
		margin: 0 5px;
		line-height: 18px;
		background: @color-highlight-background;
		color: @color-text;
      	font-size: @font-size-medium;
      	&::placeholder{
			color: @color-text-d;
      	}
	}
	.icon-dismiss{
		font-size: 16px;
		color: @color-background;
	}*/
}
</style>