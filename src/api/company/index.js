import _axios from 'api/fetch'
import {ERR_OK, address} from 'api/config'

export function completeCompany(id,data) {
	let currentData = {
		fields: 'id'
	}
	let newData = Object.assign({}, data, currentData)
	return new Promise((resolve, reject) => {
		_axios({
			method: 'put',
			url: `/companies/${id}.json`,
			data: newData
		})
		.then((res) => {
			resolve(res.data)
		})
		.catch((e) => {
	      console.log(e)
	    })
	})
}