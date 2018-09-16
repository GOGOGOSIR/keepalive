import { getWxToken } from 'api/share.js'
import wx from 'weixin-js-sdk'

export function wxShare(url, imgUrl, title, desc, shareUrl) {
  // 获取分享的token等参数
  getWxToken(url).then((res) => {
    if (res.error_code == 0) {
      let datas = res.data
      if (datas) {
        wx.config({
          debug: false,
          appId: datas.app_id,
          timestamp: parseInt(datas.timestamp),
          nonceStr: datas.nonce_str,
          signature: datas.signature,
          jsApiList: [
            'onMenuShareAppMessage',
            'onMenuShareTimeline',
            'onMenuShareQQ'
          ]
        })
        wx.ready(function() {
          //分享到qq
          wx.onMenuShareQQ({
            title: title, // 分享标题
            desc: desc, // 分享描述
            link: shareUrl, // 分享链接
            imgUrl: imgUrl, // 分享图标
            success: function() {}
          })
          //分享到朋友圈
          wx.onMenuShareTimeline({
            title: title,
            link: shareUrl,
            desc: desc,
            imgUrl: imgUrl,
            success: function() {}
          })
          //分享给好友
          wx.onMenuShareAppMessage({
            title: title,
            link: shareUrl,
            imgUrl: imgUrl,
            desc: desc,
            type: 'link',
            success: function() {}
          })
        })
      }
    }
  })
}
