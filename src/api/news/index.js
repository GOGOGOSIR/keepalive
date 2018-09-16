import _axios from 'api/fetch'
import {ERR_OK, address,normalStr} from 'api/config'

export function getUserMags(offset, limit) {
	let str = `list[].id,list[].type,list[].title,list[].content,list[].is_read,list[].create_time,list[].url`
	let data = {
		offset: offset,
		limit: limit,
		fields: normalStr(str)
	}
	return new Promise((resolve, reject) => {
		_axios({
			method: 'get',
			url: `/user/messages.json`,
			params: data
		})
		.then((res) => {
			if (res.data.error_code === ERR_OK) {
				resolve(res.data)
			} else {
				resolve(res.data)
			}
		})
		.catch((e) => {
	      console.log(e)
	    })
	})
}

export function getCompanyMags(id,offset, limit) {
	let str = `list[].id,list[].type,list[].title,list[].content,list[].is_read,list[].create_time,list[].url`
	let data = {
		offset: offset,
		limit: limit,
		fields: normalStr(str)
	}
	return new Promise((resolve, reject) => {
		_axios({
			method: 'get',
			url: `/companies/${id}/messages.json`,
			params: data
		})
		.then((res) => {
			if (res.data.error_code === ERR_OK) {
				resolve(res.data)
			} else {
				resolve(res.data)
			}
		})
		.catch((e) => {
	      console.log(e)
	    })
	})
}