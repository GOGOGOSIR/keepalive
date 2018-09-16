<template>
  <div class="normalUserHome">
  	<!-- 搜索 -->
		<!-- <div class="search-Box" ref='searchBox' :style='{opacity: searchOpacity}'>
			<div class="search-wraper" @click='goSearch'>
				<i class="bsIcon icon-sousuo"></i>
				<span>搜索职位/公司/地区</span>
			</div>
			<img :src="imgCdn+'/static/img/er/1.png'" class="erImg" @click='openEr'>
		</div> -->
		<!-- 
			:scroll-events="['scroll']"
			@scroll='scrolling' 
		 -->
	   <cube-scroll :data="list" 
	   				ref='normalUserScroll'
	   				:options='options'
	   				@pulling-up="onPullingUp"
	   				@pulling-down="onPullingDown"
  					>
	  		<template slot="pulldown" slot-scope="slotProps">
			  <div
			     v-if="slotProps.pullDownRefresh"
			    class="cube-pulldown-wrapper"
			    >
			    <div
			      v-if="slotProps.beforePullDown"
			      class="before-trigger1"
			      :style="{paddingTop: slotProps.bubbleY + 'px',paddingBottom: slotProps.bubbleY + 'px'}">
			      <span :style="{color: '#fff'}">下拉刷新...</span>
			    </div>
			    <div class="after-trigger1" v-else>
			      <div v-if="slotProps.isPullingDown" class="loading" :style="{color: '#fff'}">
			        <cube-loading></cube-loading>
			      </div>
			      <div v-else><span :style="{color: '#fff'}">刷新成功</span></div>
			    </div>
			  </div>
			</template>
	   		<!-- bannner -->
	   		<div class="scroll-wrapper">	
	   		<div class="banner-wraper">
	   			<cube-slide :data="bannerList">
	   				<template slot="dots" slot-scope="props">
					    <span class="my-dot" :class="{active: props.current === index}" v-for="(item, index) in props.dots">{{index + 1}}</span>
					</template>
	   			</cube-slide>
	   		</div>
			<!-- <div class="title-nH">
				<span>职位列表</span>
				<ul>
					<li @click='selectSort(0)' :class='{selectActive: sortIndex === 0}'>推荐</li>
					<li @click='selectSort(1)' :class='{selectActive: sortIndex === 1}'>最新</li>
				</ul>
			</div> -->
			<!-- 列表渲染 -->
			<ul class="list-wraper">
				<li v-for='item in list'>
					<div :style='setBg(item)' class="lw-bg-box">
						<recruitList @select='selectItem' :dataObj='item'></recruitList>
					</div>
				</li>
			</ul>
			</div>
	   </cube-scroll>
	   <transition name='backTop'>
		   <div class="backTop" v-show='showBacktop' @click='backTop'>
		   		<img :src="imgCdn+ '/static/img/home/top.png'">
		   </div>
		</transition>
  </div>
</template>
<!-- type="text/ecmascript-6" -->
<script>
import recruitList from 'components/recruitListItem/recruitListItem'
import {homeBanner} from 'api/banner'
import {jobList} from 'api/home'
import {dealDateYM} from 'common/js/util'
import {limit} from 'api/config'

const MaxHeight = 180
const searchHeight = 37
export default {
	data() {
		return {
			searchOpacity: 1,
			imgCdn: this.imgCdn || '',
			showBacktop: false,
			options: {
				probeType: 1,
				bounce: {
					top: true,
					bottom: true,
					right: false,
					left: false
				},
				pullDownRefresh: {
		          threshold: 50,
		          stop: 50
		        },
				pullUpLoad: {
		          threshold: 0,
		          txt: {
		            more: '加载中',
		            noMore: '到底了'
		          }
		        }
			},
			bannerList: [],
			list:[],
			sortIndex: 0,
			type: 'recommend',
			start: 0,
			limits: limit,
			is_end: false

		}
	},
	created() {
		console.log('home的created')
		this.path = this.$route.name
		// this._getBanner()
		this._getJobList('recommend', 0, this.limits)
	},
	activated () {
		console.log('home的active')
		console.log('初始化的startY:', this.beforeTop)
		this.$refs.normalUserScroll.scrollTo(0,this.beforeTop,0)
	},
	watch: {
		type(newType) {
			// jobList(newType,0,this.limits).then((res) => {
			// 	if (res.error_code == 0) {
			// 		if (res.data.list) {
			// 			for (let item of res.data.list) {
			// 				item.min_money = parseInt(item.min_salary/1000)
			// 				item.max_money = parseInt(item.max_salary/1000)
			// 				item.time = dealDateYM(item.update_time)
			// 				if (item.company.logo) {
	    	// 					item.logoImg = item.company.logo.small.url
	    	// 				} else {
	    	// 					item.logoImg = item.company.default_logo
	    	// 				}
			// 			}
			// 			this.list = res.data.list
			// 			this.start += this.limits
			// 		}
			// 	}
			// })
		},
		$route(to,from){
			// console.log(this.$route, 'home')
			if (to.name == 'Home') {
				// console.log('home的watch')
				// this.is_end = false
        //   		let count = this.start
				// this.start = 0
        //  		this._getJobList(this.type, 0, count)
			}
		},
	},
	methods: {
		onPullingDown() {
			this.start = 0
			this.is_end = false
			this._getJobList(this.type, this.start, this.limits)		
		},
		openEr() {
			this.$createCoolBomb({
				text: '长按识别二维码,关注门窗幕墙直聘网'
			}).show()
		},
		_getJobList(type,start, limits) {
			jobList(type,start,limits).then((res) => {
				if (res.error_code == 0) {
					if (res.data.list) {
						for (let item of res.data.list) {
							item.min_money = parseInt(item.min_salary/1000)
							item.max_money = parseInt(item.max_salary/1000)
							item.time = dealDateYM(item.update_time)
							if (item.company.logo) {
	    						item.logoImg = item.company.logo.small.url
	    					} else {
	    						item.logoImg = item.company.default_logo
	    					}
						}
						this.list = res.data.list
						this.start += limits
					}
				}
			})
		},
		_getBanner() {
			homeBanner().then((res) => {
				if (res.error_code == 0) {
					let list = res.data.list
					list.forEach( (item) => {
						if (item.image) {
							item.image = item.image.small.url
						}
					})
					this.bannerList = list
				}
			})
		},
		scrolling(pos) {
			let top = pos.y
			if (top > 0) {
				if (Math.abs(top) >= searchHeight) {
					this.searchOpacity = 0
				} else {
					this.searchOpacity = 1 - top/searchHeight
				}
				return
			}
			this.searchOpacity = 1
			if (Math.abs(top) < MaxHeight) {
				this.showBacktop = false
				let p = Math.abs(top/MaxHeight)
				this.$refs.searchBox.style.background = `rgba(18,204,140,${p})`
			} else {
				this.showBacktop = true
				this.$refs.searchBox.style.background = `rgba(18,204,140,1)`
			}
		},
		onPullingUp() {
			if (this.is_end) {
				this.$refs.normalUserScroll.forceUpdate()
				return
			}
			jobList(this.type,this.start,this.limits).then((res) => {
				if (res.error_code == 0) {
					if (res.data.list) {
						for (let item of res.data.list) {
							item.min_money = parseInt(item.min_salary/1000)
							item.max_money = parseInt(item.max_salary/1000)
							item.time = dealDateYM(item.update_time)
							if (item.company.logo) {
	    						item.logoImg = item.company.logo.small.url
	    					} else {
	    						item.logoImg = item.company.default_logo
	    					}
						}
						this.list = this.list.concat(res.data.list)
						this.start += this.limits
					}
				} else {
					this.is_end = true
					this.$refs.normalUserScroll.forceUpdate()
				}
			})
		},
		backTop() {
			this.$refs.normalUserScroll.scrollTo(0,0,300)
		},
		goSearch() {
			this.$router.push({name: 'search'})
		},
		setBg(item){
			// 急招是1.png，已投递是2.png
			if (item.applied) {
				return `background:url(${this.imgCdn}/static/img/home/2.png) no-repeat 0 0;background-size: 0.853333rem 0.853333rem;`
			}
		},
		selectSort(index) {
			this.sortIndex = index
			this.start = 0
			this.is_end = false
			if (index == 0) {
				this.type = 'recommend'
			} else {
				this.type = 'new'
			}
		},
		selectItem(data) {
			this.beforeTop = this.$refs.normalUserScroll.scroll.startY
			console.log('离开前的startY:', this.beforeTop)
			// console.log(this.beforeTop , '+++====++++')
			this.$router.push({name: 'page', query: {jobId: data.id, map: 'map'}})
		} 
	},
	components: {
		recruitList
	}
}
</script>
<style lang='less'>
@import "~common/less/variable.less";
@import "~common/less/mixin.less";
.normalUserHome{
	position: fixed;
	top: 0;
	bottom: 0px;
	background: @gray-bg;
	width: 100%;
	.scroll-wrapper{
		background: #f1f1f1;
	}
	.cube-pulldown-wrapper{
		top: 0;
		font-size: 14px;
		min-height: 150px;
		text-align: center;
		align-items: flex-start;
		background: -webkit-linear-gradient(top, #94e2c9 , @bg-green);
		background: linear-gradient(top, #94e2c9 , @bg-green);
		.after-trigger1,.before-trigger1{
			height: 50px;
			display: flex;
			align-items: center;
			justify-content: center;
		}
	}
	.backTop {
		position: absolute;
		bottom: 20px;
		right: 15px;
		width: 40px;
		height: 40px;
		border-radius: 50%;
		.setflex(center,center);
		z-index: 40;
		background: #fff;
		box-shadow: 0 0 5px #b6b6b6;
		&.backTop-enter-active,&.backTop-leave-active{
	      	transition: all .3s;
	    }
      	&.backTop-enter,&.backTop-leave-to{
      		opacity: 0;
      	}
		>img{
			display: block;
			width: 20px;
			height: 20px;
		}
	}
	.banner-wraper{
		width: 100%;
		height: 180px;
		margin-bottom: 8px;
		position: relative;
		.cube-slide-item img{
			width: 100% !important;
		}
		.my-dot{
	    	width: 4px;
	    	height: 4px;
	    	border-radius: 50%;
	    	margin-right: 4px;
	    	text-align: right;
	    }
	}
	.search-Box{
		position: absolute;
		top: 0;
		left:0;
		width: 100%;
		box-sizing: border-box;
		padding: 8px 15px;
		z-index: 30;
		display: flex;
		align-items: center;
		.erImg{
			flex:0 0 21px;
			width: 21px;
			height: 21px;
			display: block;
			margin-left: 10px;
		}
		.search-wraper{
			flex:1;
			width: 100%;
			box-sizing: border-box;
			padding: 4px 0;
			font-size: 0;
			text-align: center;
			color: #d8d5d5;
			background: #fff;
			.setBorderRadius(15px);
			>span{
				font-size: 12px;
			}
			i{
				font-size: 14px;
				margin-right: 5px;
			}
		}
	}
	.title-nH{
		display: flex;
		justify-content: space-between;
		align-items: center;
		width: 100%;
		-webkit-box-sizing: border-box;
		-moz-box-sizing: border-box;
		box-sizing: border-box;
		background: #fff;
		padding: 15px;
		.bs-1px-b(#f0eded);
		>span{
			color: #868383;
			font-size: 14px;
		}
		>ul{
			display: flex;
			li{
				font-size: 12px;
				color:#868383;
				font-weight: normal;
				transition: all .3s;
				margin-left: 8px;
				&.selectActive{
					font-weight: bold;
					color:#00c564;
				} 
			}
		}
	}
	.list-wraper{
		width: 100%;
		>li{
			background: #fff;
			margin-bottom:12px;
			.lw-bg-box{
				width:100%;
				box-sizing: border-box;
				padding:0 15px;
			}
		}
		>li:nth-last-of-type(1){
			margin-bottom:0 !important;
		}
	}
}
</style>