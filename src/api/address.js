import _axios from 'api/fetch'
import {ERR_OK, address,normalStr} from 'api/config'
// 获取地址列表
export function getAddressList() {
	let str = `list[].id,list[].province.name,list[].province.area_code,
				list[].city.name,list[].city.area_code,list[].district.name,list[].district.area_code,
				list[].area_code,list[].address,list[].is_default`
	let data = {
		fields: normalStr(str)
	}
	return new Promise((resolve, reject) => {
		_axios({
			method: 'get',
			url: '/user/addresses.json',
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

// 添加地址
export function addAddress(area_code, address) {
	let data = {
		area_code: area_code,
		address: address,
		fields: 'id'
	}
	return new Promise((resolve, reject) => {
		_axios({
			method: 'post',
			url: '/user/addresses.json',
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

//获取地址详情
export function getAddressInfo(addressId) {
	let str = `id,province.name,province.area_code,
				city.name,city.area_code,district.name,district.area_code,
				area_code,address,is_default`
	let data = {
		fields: normalStr(str)
	}
	return new Promise((resolve, reject) => {
		_axios({
			method: 'get',
			url: `/user/addresses/${addressId}.json`,
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

// 编辑地址
export function editAddress(addressId, area_code, address) {
	let data = {
		area_code: area_code,
		address: address,
		fields: 'id'
	}
	return new Promise((resolve, reject) => {
		_axios({
			method: 'put',
			url: `/user/addresses/${addressId}.json`,
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

// 删除地址
export function deleteAddress(addressId) {
	return new Promise((resolve, reject) => {
		_axios({
			method: 'delete',
			url: `/user/addresses/${addressId}.json`,
		})
		.then((res) => {
			resolve(res.data)
		})
		.catch((e) => {
	      console.log(e)
	    })
	})
}