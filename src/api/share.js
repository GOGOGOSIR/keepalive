import _axios from 'api/fetch'
import {ERR_OK, address} from 'api/config'
// 获取三方token
export function getWxToken (url) {
	let data = {
		url: encodeURIComponent(url),
		fields: "app_id,nonce_str,timestamp,signature"
	}
	return new Promise((resolve, reject) => {
		_axios({
			method: 'post',
			url: '/wechat/js_api_sign_package.json',
			data: data
		})
		.then((res) => {
			resolve(res.data)
		})
		.catch((e) => {
	      console.log(e)
	    })
	})
}