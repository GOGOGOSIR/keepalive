import _axios from 'api/fetch'
import {ERR_OK, address} from 'api/config'

export function homeBanner() {
	let data = {
		type: 'home',
		fields: `list[].image.small(),list[].url`
	}
	return new Promise((resolve, reject) => {
		_axios({
			method: 'get',
			url: '/banners.json',
			params: data
		})
		.then((res) => {
			resolve(res.data)
		})
		.catch((e) => {
	      console.log(e)
	    })
	})
}