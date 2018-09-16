import _axios from 'api/fetch'
import {ERR_OK, address} from 'api/config'

// 用户登入
export function userLogin (type, telephone, password, verification_code) {
	let data = {
		type: type,
		telephone: telephone,
		password: password,
		verification_code: verification_code,
		fields: `is_resume_complete,id,is_company_complete,role,company.status,company.refuse_reason`
	}
	return new Promise((resolve, reject) => {
		_axios({
			method: 'post',
			url: '/user/login.json',
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

// 获取验证码
export function getPhoneCode (phone, usage) {
	let data = {
		phone: phone,
		usage: usage
	}
	return new Promise((resolve, reject) => {
		_axios({
			method: 'post',
			url: '/sms/verification_code.json',
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
// 用户注册
export function userReg(telephone, real_name, password, verification_code,role) {
	let data = {
		telephone: telephone,
		real_name: real_name,
		password: password,
		verification_code: verification_code,
		role: role,
		fields: 'id,company.status,company.refuse_reason'
	}
	return new Promise((resolve, reject) => {
		_axios({
			method: 'post',
			url: '/user/register.json',
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
// 用户退出当前账号
export  function userLogout () {
	return new Promise((resolve, reject) => {
		_axios({
			method: 'post',
			url: '/user/logout.json'
		})
		.then((res) => {
			resolve(res.data)
		})
		.catch((e) => {
	      console.log(e)
	    })
	})
}

// 改变密码
export function changePassWord(data) {
	return new Promise((resolve, reject) => {
		_axios({
			method: 'put',
			url: '/user/password.json',
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
// 忘记密码
export function forgetPassWord(data) {
	return new Promise((resolve, reject) => {
		_axios({
			method: 'put',
			url: '/user/forget_password.json',
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