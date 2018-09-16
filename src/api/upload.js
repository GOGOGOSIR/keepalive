import _axios from 'api/fetch'
import {ERR_OK, address} from 'api/config'
import axios from 'axios'

function getUploadToken() {
	return new Promise((resolve, reject) => {
		_axios({
			method: 'POST',
			url: '/images/token.json',
			data: {}
		})
		.then((res) => {
			if (res.data.error_code === ERR_OK) {
				resolve(res.data.data)
			} else {
				resolve(res.data)
			}
		})
		.catch((e) => {
	      console.log(e)
	    })
	})
}
export function uploadPic(obj) {
	return new Promise((resolve, reject) => {
		getUploadToken().then((res) => {
			obj.append('token', res.token)
	        obj.append('key', res.key)
	        let config = {
				headers: {
					'Content-Type': 'multipart/form-data'
				}
			}
			axios({
				method: 'post',
				url: 'http://upload-z2.qiniup.com/',
				data: obj,
				responseType: 'json',
				headers: {'Content-Type': 'multipart/form-data'},
				transformRequest: [function (data) {
			      return data;
			    }],
			    transformResponse: [function (data) {
			      return data;
			    }]
			}).then((res) => {
				if (res.data.error_code === ERR_OK) {
					resolve(res.data)
				}else {
					resolve(res.data)
				}

			})
			.catch((e) => {
		      console.log(e)
		    })
		})
	})
}