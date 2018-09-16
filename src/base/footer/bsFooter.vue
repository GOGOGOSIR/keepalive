<template>
  <div class="bs-footer" :style="'zIndex:'+ changeIndex">
    <div class="footertab">
      <router-link :to="{name: 'Home'}">
      	<div class="bgIcon bgIcon-home"></div>
        <p>首页</p>
      </router-link>
    </div>
    <div class="footertab">
      <router-link :to="{name: 'New'}">
       	<div class="bgIcon bgIcon-new" >
       		<bs-badge :val='msgNum' class="badgeWraper" v-show='msgNum'></bs-badge>
       	</div>
        <p>消息</p>
      </router-link>
    </div>
    <div class="footertab">
      <router-link :to="{name: 'My'}">
        <div class="bgIcon bgIcon-my"></div>
        <p>我的</p>
      </router-link>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
import BsBadge from 'base/badge/badge'
import bus from 'common/js/eventBus'
import storage from 'good-storage'
import {mapGetters} from 'vuex'

export default {
	data() {
		return{
			changeIndex: 1,
			msgNum: 0
		}
	},
	created() {
		bus.$on('changeZIndex', (data) => {
			if(data) {
				this.changeIndex = -1
			} else {
				this.changeIndex = 1
			}
		})
		this.getUserInfo()
	},
	computed: {
		...mapGetters(['roleType'])
	},
	methods: {
		getUserInfo() {
			let obj = storage.session.get('wqzp-userInfo')
			if (obj) {
				if (this.roleType == 1) {
					// 求职者
					this.msgNum = obj.unread_user_message_count
				} else if(this.roleType == 2) {
					this.msgNum = obj.unread_company_message_count
				}
			} else {
				// this.$createToast({
				// 	time: 1000,
				// 	txt: '未找到用户信息',
				// 	type: 'error'
				// }).show()
			}
		}
	},
	components: {
		BsBadge
	}
}
</script>
<style lang='less' scoped>
@import "~common/less/variable.less";
@import "~common/less/mixin.less";
.bs-footer{
	width: 100%;
	height: 48px;
	position: fixed;
	background: #fff;
	left: 0;
	bottom: 0;
	box-sizing: border-box;
	padding: 0 36px;
	padding-top: 5px;
	display: flex;
	justify-content: space-between;
	text-align: center;
	&:before{
	    content: '';
	    position: absolute;
	    left:0;
	    right:0;
	    height:1px;
	    top:-2px;
	    color:#dfdfdf;
	    border-bottom: 1px solid #dfdfdf;
	    transform-origin: 0 100%;
	    -webkit-transform-origin: 0 100%;
	    transform: scaleY(.5);
	    -webkit-transform: scaleY(.5);
	}
	.footertab{
		a{
			display: block;
			width: 40px;
			position: relative;
			
			&.router-link-exact-active.router-link-active .bgIcon-home{
				.setBg('/static/img/footer/11.png')
			}
			&.router-link-exact-active.router-link-active .bgIcon-new{
				.setBg('/static/img/footer/22.png')
			}
			&.router-link-exact-active.router-link-active .bgIcon-my{
				.setBg('/static/img/footer/33.png')
			}
			&.router-link-exact-active.router-link-active >p{
				color: #00c664;
			}
			.bgIcon{
				width: 26px;
				height: 26px;
				transition: all .3s;
				margin: 0 auto;
				margin-bottom: 1px;
				position: relative;
				.badgeWraper{
					position: absolute;
					top:0%;
					right: 0%;
					transform: scale(0.575) translate(70%,-60%) !important;
				}
			}
			.bgIcon-home{
				.setBg('/static/img/footer/44.png')
			}
			.bgIcon-new{
				.setBg('/static/img/footer/55.png')
			}
			.bgIcon-my{
				.setBg('/static/img/footer/66.png')
			}
			>p{
				font-size: 12px;
				color: #b8b8b8;
				transition: all .3s;
				text-align: center;
			}
		}
	}
}
</style>