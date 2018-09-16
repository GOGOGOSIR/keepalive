import _axios from 'api/fetch'
import {ERR_OK, address} from 'api/config'
import  Vue from 'vue'
import wx from 'weixin-js-sdk'
import router from '@/router'
const vm = new Vue({router})


// 获取支付信息
export function getPayData(obj) {
	if (typeof WeixinJSBridge == "undefined"){
	   if( document.addEventListener ){
	     document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false)
	   }else if (document.attachEvent){
	     document.attachEvent('WeixinJSBridgeReady', onBridgeReady) 
	     document.attachEvent('onWeixinJSBridgeReady', onBridgeReady)
	   }
	}else{
	  onBridgeReady(obj);
	}
}

function onBridgeReady(obj) {
	WeixinJSBridge.invoke(
    'getBrandWCPayRequest', {
      "appId": obj.appid, //公众号名称，由商户传入     
      "timeStamp": obj.time_stamp.toString(), // 时间戳，自1970年以来的秒数     
      "nonceStr": obj.nonce_str, //随机串     
      "package": `prepay_id=${ obj.prepay_id}`,
      "signType": "MD5", //微信签名方式：     
      "paySign": obj.sign // 微信签名 
    },
    function(res) {
      if (res.err_msg == "get_brand_wcpay_request:ok") {
        vm.$createToast({
    			txt: '支付成功',
    			time: 800
    		})
		    vm.$router.go(-1)
      } else {
        console.log('支付失败')
      }
    }
  )
}