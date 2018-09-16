<template>
  <div class="jobInfo">
    <div class="back-box">
      <bs-back :title='backTitle'></bs-back>
    </div>
    <div class="jobInfo-wraper">
      <cube-scroll :data="[]" ref='jobInfoScroll'>
        <div class="list-desc-wraper" v-if='is_romance'>
          <div class="desc-box-msg">
            <div class="desc-top">
              <div class="tops_1">
                <div>
                  <!-- <p class="belong">所属部门: 开发部</p> -->
                  <p class="Job-name">{{infoData.title}}</p>
                </div>
                <img v-lazy="infoData.logoImg" alt="">
              </div>
              <div class="tops_2">
                <p class="needs">
                  {{infoData.work_experience? infoData.work_experience.name: '不限'}}/ {{infoData.education? infoData.education.name: '不限'}}/ {{infoData.sex}}
                </p>
                <p class="range-money">{{infoData.min_money}}k-{{infoData.max_money}}k</p>
              </div>
            </div>
            <div class="desc-bottom" @click='goMap(infoData.company)'>
              <div>
                <p class="address-name">
                  <i class="bsIcon icon-ditu"></i>
                  <span>{{infoData.province.name}}-{{infoData.city.name}}{{infoData.district? '-' + infoData.district.name: ''}}</span>
                </p>
                <p class="address-info">
                  {{infoData.address}}
                </p>
              </div>
              <i class="bsIcon icon-youjiantou right-jian"></i>
            </div>
          </div>
          <infoCommonTitle title='职位发布者'></infoCommonTitle>
          <div class="publicer-wraper" @click='gopublisher(infoData.company.user.id,infoData.company.id)'>
            <div class="publisher-info">
              <img :src="infoData.company.user.profile.avatar? infoData.company.user.profile.avatar.small.url: infoData.company.user.profile.default_avatar" alt="">
              <div>
                <p class="name">{{infoData.company.user.profile.real_name}}</p>
                <p class="desc">
                  {{infoData.company.company_short_name || infoData.company.company_name}}
                  <span v-show='infoData.company.user.job'>--{{infoData.company.user.job}}</span>
                </p>
              </div>
            </div>
            <i class="bsIcon icon-youjiantou right-jian"></i>
          </div>
          <infoCommonTitle title='职位描述'></infoCommonTitle>
          <div class="need-desc-ji">
            <p v-for='item in infoData.contentArr'>{{item}}</p>
          </div>
          <infoCommonTitle title='公司信息'></infoCommonTitle>
          <div class="companyInfo-wraper" @click='goCompanyInfo(infoData.company.id)'>
            <div class="ci-left">
              <img v-lazy="infoData.logoImg" alt="">
              <div>
                <p class="name">{{infoData.company.company_short_name || infoData.company.company_name}}</p>
                <p class="desc">
                  {{infoData.company.company_nature?infoData.company.company_nature.name: ''}} {{infoData.company.company_size? '/' + infoData.company.company_size.name: ''}}{{infoData.company.company_industry? '/' + infoData.company.company_industry.name: ''}}
                </p>
              </div>
            </div>
            <i class="bsIcon icon-youjiantou right-jian"></i>
          </div>
        </div>
      </cube-scroll>
    </div>
    <div class="bottom-box">
      <div class="icon-div" @click='clickCollect'>
        <img :src="collectIcon" alt="">
        <p>收藏</p>
      </div>
      <div class="icon-div" @click='openShare'>
        <img :src="imgCdn+ '/static/img/company/10.png'" alt="">
        <p>分享</p>
      </div>
      <div class="sendData-btn" :class="{'selectCan': !infoData.applied}" v-show='infoData.status == 1' @click='sendApplies'>{{btntext}}</div>
    </div>
    <transition name='info'>
      <router-view/>
    </transition>
  </div>
</template>
<!-- type="text/ecmascript-6" -->
<script>
import BsBack from 'base/back/back'
import infoCommonTitle from 'components/infoCommonTitle/infoCommonTitle'
import { jobInfo, collectJob, uncollectJob, userApplies } from 'api/home'
import storage from 'good-storage'

export default {
  data() {
    return {
      backTitle: '职位详情',
      imgCdn: this.imgCdn || '',
      infoData: {},
      is_romance: false,
      jobCollected: false,
      is_collect: true,
      btntext: ''
    }
  },
  computed: {
    collectIcon() {
      return this.jobCollected ? `${this.imgCdn}/static/img/info/2.png` : `${this.imgCdn}/static/img/info/1.png`
    }
  },
  created() {
    console.log('简历的created')
    if (this.$route.query.jobId) {
      this.jobId = this.$route.query.jobId
      storage.session.set('zp-jobId', this.jobId)
    } else {
      this.jobId = storage.session.get('zp-jobId')
    }
    this._getJobInfo()
  },
  activated () {
    console.log('简历的active')
    
  },
  methods: {
    openShare() {
      this.$createBsShare().show()
    },
    sendApplies() {
      // 判断是否已投递
      if (this.infoData.applied) {
        return
        this.$createToast({
          txt: '你已经投递过了',
          type: 'correct',
          time: 1000
        }).show()
      } else {
        userApplies(this.jobId).then((res) => {
          if (res.error_code == 0) {
            // 改变其状态
            this.infoData.applied = true
            this.btntext = '已投递'
            this.$createToast({
              txt: '投递成功',
              type: 'correct',
              time: 1000
            }).show()
          } else {
            this.$createToast({
              txt: res.error_description,
              type: 'error',
              time: 1000
            }).show()
            if (res.error_code == '20301') {
              // 未完善简历，让他去完善
              setTimeout(() => {
                this.$router.push({name: 'completeResume', query: {userId: this.infoData.id}})
              },1000)
            }
          }
        })
      }
    },
    clickCollect() {
      if (this.is_collect) {
        this.is_collect = false
        if (this.jobCollected) {
          uncollectJob(this.jobId).then((res) => {
            if (res.error_code == 0) {
              this.$createToast({
                txt: '已取消收藏',
                type: 'correct',
                time: 1000
              }).show()
              this.jobCollected = false
            } else {
              this.$createToast({
                txt: res.error_description,
                type: 'error',
                time: 1000
              }).show()
            }
            this.is_collect = true
          })
        } else {
          collectJob(this.jobId).then((res) => {
            if (res.error_code == 0) {
              this.$createToast({
                txt: '收藏成功',
                type: 'correct',
                time: 1000
              }).show()
              this.jobCollected = true
            } else {
              this.$createToast({
                txt: res.error_description,
                type: 'error',
                time: 1000
              }).show()
            }
            this.is_collect = true
          })
        }
      }
    },
    _getJobInfo() {
      if (this.jobId) {
        jobInfo(this.jobId).then((res) => {
          if (res.error_code == 0) {
            let obj = res.data
            if (obj.applied) {
              this.btntext = '已投递'
            } else {
              this.btntext = '发送简历'
            }
            let sexArr = ['不限', '男', '女']
            obj.sex = sexArr[obj.gender]
            obj.min_money = parseInt(obj.min_salary / 1000)
            obj.max_money = parseInt(obj.max_salary / 1000)
            if (obj.content) {
              obj.contentArr = obj.content.split('\n')
            }
            this.jobCollected = obj.collected
            let localtion = obj.address
            // if (obj.district) {
            //   localtion = obj.province.name + obj.city.name + obj.district.name + obj.address
            // } else {
            //   localtion = obj.province.name + obj.city.name + obj.address
            // }
            
            // 将地址存到本地
            storage.set('wq-localtion', localtion)
            // 将要分享的公司名存入本地
            let imgUrl = 'http://test.zhaopin.babyhouse.wang/public/static/images/logo.jpg'
            let title = '门窗幕墙直聘网'
            let desc = `${obj.company.company_name || '未知'}公司正在招人,点击查看`
            // let shareUrl = window.location.href
            // this.wxShare(shareUrl, imgUrl, title, desc, shareUrl)

            if (obj.company.logo) {
              obj.logoImg = obj.company.logo.small.url
            } else {
              obj.logoImg = obj.company.default_logo
            }
            this.infoData = obj
            this.is_romance = true
          }
        })
      }
    },
    goCompanyInfo(id) {
      this.$router.push({ name: 'componyInfo', query: { companyId: id } })
    },
    gopublisher(id, id2) {
      this.$router.push({ name: 'publisherInfo', query: { personId: id, companyId: id2 } })
    },
    goMap(nameobj) {
      let mapName = this.$route.query.map
      let name = nameobj.company_short_name || nameobj.company_name
      if (mapName) {
      	 this.$router.push({ name: mapName, query: { name: name } })
      } 
    }
  },
  components: {
    BsBack,
    infoCommonTitle
  }
}

</script>
<style lang='less' scoped>
@import "~common/less/variable.less";
@import "~common/less/mixin.less";
.jobInfo {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 40;
  background: #fff;
  .info-enter-active,
  .info-leave-active {
    transition: all .3s;
  }
  .info-enter,
  .info-leave-to {
    transform: translate3d(100%, 0, 0)
  }
  .jobInfo-wraper {
    position: fixed;
    top: 38px;
    bottom: 58px;
    width: 100%;
    box-sizing: box-sizing;
    .list-desc-wraper {
      box-sizing: border-box;
      padding: 0 15px;
      padding-top: 10px;
      padding-bottom: 33px;
      .desc-box-msg {
        box-sizing: border-box;
        padding: 10px;
        margin:0 0 20px 0;
        box-shadow: 0 0 10px rgba(215, 215, 215, .6);
        border-radius: 5px;
        .desc-top {
          width: 100%;
          padding-bottom: 10px;
          .bs-1px-b(#e9e9e9);
          .tops_1 {
            display: flex;
            align-items: center;
            margin-bottom: 14px;
            >img {
              flex: 0 0 45px;
              display: block;
              width: 45px;
              height: 45px;
              border-radius: 5px;
            }
            >div {
              flex: 1;
              .belong {
                font-size: 11px;
                color: #bfbfbf;
                margin-bottom: 10px;
              }
              .Job-name {
                height: 22px;
                line-height: 24px;
                width: 260px;
                .textHidden();
                font-size: 20px;
                font-weight: bold;
              }
            }
          }
          .tops_2 {
            .needs {
              font-size: 12px;
              color: #1b1b1b;
              margin-bottom: 8px;
            }
            .range-money {
              font-size: 14px;
              color: #ef2a10;
            }
          }
        }
        .desc-bottom {
          padding-top: 12px;
          margin-bottom: 6px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          .address-name {
            font-size: 0;
            line-height: 1;
            margin-bottom: 6px;
            i {
              font-size: 18px;
              color: #bcbaba;
              font-weight: bold;
              margin-right: 4px;
              vertical-align: middle;
            }
            span {
              font-size: 14px;
              color: #292929;
              vertical-align: middle;
            }
          }
          .address-info {
            font-size: 12px;
            height: 18px;
            line-height: 18px;
            color: #bababa;
            width: 300px;
            .textHidden();
            white-space: nowrap;
          }
          .right-jian {
            font-size: 14px;
            color: #a5a5a5;
          }
        }
      }
      .publicer-wraper {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 10px 0;
        margin: 10px 0 30px 0;
        .publisher-info {
          display: flex;
          align-items: center;
          >img {
            border-radius: 50%;
            display: block;
            width: 40px;
            height: 40px;
            margin-right: 10px;
          }
          >div {
            color: #161616;
            .name {
              font-size: 14px;
              margin-bottom: 8px;
            }
            .desc {
              font-size: 12px;
            }
          }
        }
        .right-jian {
          font-size: 14px;
          color: #a5a5a5;
        }
      }
      .need-desc-ji {
        padding: 10px 0;
        margin: 0px 0 30px 0;
        p {
          font-size: 12px;
          color: #737373;
          line-height: 20px;
        }
      }
      .companyInfo-wraper {
        margin: 15px 0 0 0;
        box-sizing: border-box;
        padding: 8px;
        background: rgba(237, 235, 234, .4);
        .radius-border-1px(5px, #dadada);
        display: flex;
        justify-content: space-between;
        align-items: center;
        .ci-left {
          width: 100%;
          display: flex;
          align-items: center;
          >img {
            display: block;
            width: 45px;
            height: 45px;
            margin-right: 10px;
          }
          >div {
            flex: 1;
            width: 100%;
            color: #161616;
            .name {
              font-size: 14px;
            }
            .desc {
              width: 95%;
              font-size: 12px;
              line-height: 16px;
              margin-top: 8px;
              .textHidden();
            }
          }
        }
        .right-jian {
          font-size: 16px;
          color: #a5a5a5;
        }
      }
    }
  }
  .bottom-box {
    .bs-1px-t(#efeaea);
    position: absolute;
    bottom: 0;
    left: 0;
    box-sizing: border-box;
    padding: 8px 15px;
    width: 100%;
    display: flex;
    align-items: center;
    .icon-div {
      text-align: center;
      flex: 1;

      box-sizing: border-box;
      i {
        font-size: 24px;
        color: #5a5858;
      }
      img {
        display: block;
        width: 24px;
        height: 24px;
        margin: 0 auto;
      }
      p {
        font-size: 10px;
        color: #737373;
        margin-top: 6px;
      }
    }
    .icon-div:nth-of-type(2) {
      padding-left: 20px;
      margin-right: 12px;
    }
    .icon-div:nth-of-type(1) {
      padding-right: 20px;
      /*#efeaea*/
      .bs-1px-r(#efeaea);
    }
    .sendData-btn {
      flex: 0 0 220px;
      width: 220px;
      height: 42px;
      .setflex(center, center);
      font-size: 14px;
      color: #fff;
      background: #86ddc4;
      border-radius: 5px;
      &.selectCan {
        background: @bg-green !important;
      }
    }
  }
}

</style>
