<template>
  <div class="recruitListItem" @click='select'>
	<div class="item-title">
		<p class="jobName">{{dataObj.title}}<span v-show='dataObj.status == -1'>(已下架)</span></p>
		<span>{{dataObj.min_money}}k-{{dataObj.max_money}}k</span>
	</div>
	<div class="item-needs">
		<div class="line-list-item">
			<span v-if='dataObj.city'>
				{{dataObj.city.name}}
				<i class="bsIcon icon-vertical_line"></i>
			</span>
			<span v-if='dataObj.district'>
				{{dataObj.district.name}}
				<i class="bsIcon icon-vertical_line"></i>
			</span>
			<span>
				{{dataObj.work_experience? dataObj.work_experience.name: '不限'}}
			</span>
		</div>
		<span>{{dataObj.time}}</span>
	</div>
	<ul class="need-sign" v-show='false'>
		<li>web</li>
		<li>天使轮</li>
	</ul>
	<div class="companyInfo">
		<img v-lazy="dataObj.logoImg" alt="" class="companyPic">
		<div>
			<p class="companyName">{{dataObj.company.company_short_name || dataObj.company.company_name}}</p>
			<div class="line-list-item">
				<span v-if='dataObj.company.company_nature'>
					{{dataObj.company.company_nature.name}}
					<i class="bsIcon icon-vertical_line" v-if='dataObj.company.company_size'></i>
				</span>
				<span v-if='dataObj.company.company_size'>
					{{dataObj.company.company_size.name}}
					<i class="bsIcon icon-vertical_line" v-if='dataObj.company.company_industry'></i>
				</span>
				<span v-if='dataObj.company.company_industry'>
					{{dataObj.company.company_industry.name}}
				</span>
			</div>
		</div>
	</div>
  </div>
</template>
<script type="text/ecmascript-6">
export default {
	props: {
		dataObj: {
			type: Object,
			default() {
				return {}
			}
		}
	},
	methods: {
		select() {
			this.$emit('select', this.dataObj)
		}
	}
}
</script>
<style lang='less' scoped>
@import "~common/less/variable.less";
@import "~common/less/mixin.less";
.recruitListItem{
	width: 100%;
	padding: 15px 0 12px 0;
	.item-title{
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-bottom: 10px;
		.jobName{
			font-size: 15px;
			font-weight: bold;
			color: #1d1c1c;
			display:flex;
			align-items:center;
			>span{
				font-size:12px;
				color:#f5651f;
				margin-left:8px;
			}
		}
		>span{
			font-size: 14px;
			color: #df2323;
		}
	}
	.item-needs{
		display: flex;
		justify-content: space-between;
		align-content: center;
		margin-bottom: 10px;
		.line-list-item{
			font-size: 11px;
			color: #959292;
			i{
				color: #cccaca;
			}
		}
		>span{
			font-size: 11px;
			color: #c4c4c4;
		}
	}
	.need-sign{
		width: 100%;
		display: flex;
		margin-bottom: 13px;
		>li{
			font-size: 11px;
			color: #908d8d;
			padding: 6px;
			background: rgba(242,242,242,.8);
			border-radius: 3px;
			margin-right: 4px;
			transform: scale(1);
		}
		>li:nth-last-of-type(1){
			margin-right: 0;
		}
	}
	.companyInfo{
		width: 100%;
		display: flex;
		margin-top:20px;
		.companyPic{
			display: block;
			width: 34px;
			height: 34px;
			border-radius:4px;
			margin-right: 10px;
		}
		>div{
			.companyName{
				font-size: 13px;
				color: #5e5d5d;
				margin-bottom:10px;
			}
			.line-list-item{
				font-size: 11px;
				color: #959292;
				i{
					color: #cccaca;
				}
			}
		}
	}
}
</style>