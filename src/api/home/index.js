import _axios from 'api/fetch'
import {ERR_OK, address,normalStr} from 'api/config'

// 招聘者版 ===================================
// 职位列表
export function jobList(type, offset, limit) {
	let str = `list[].id,list[].company.company_name,list[].company.company_short_name,list[].company.logo.small(),list[].update_time,
			   list[].company.company_size.name,list[].company.company_nature.name,list[].company.company_industry.name,
			   list[].title, list[].job_type.name,list[].min_salary,list[].max_salary,list[].work_experience.name,
			   list[].education.name,list[].city.name,list[].district.name,list[].address,list[].status,list[].applied,list[].company.default_logo`
	let data = {
		type: type,
		offset: offset,
		limit: limit,
		fields: normalStr(str)
	}
	return new Promise((resolve, reject) => {
		_axios({
			method: 'get',
			url: '/jobs.json',
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

// 职位详情
export function jobInfo(id) {
	let str = `title,job_type.name,min_salary,max_salary,work_experience.name,education.name,
			 province.name,city.name,district.name,address,content,collected,status,applied,company.company_short_name,
			 company.logo.small(),company.company_size.name,company.company_nature.name,company.company_industry.name,
			 company.address,gender,company.user.profile.real_name,company.user.profile.avatar.small(),
			 company.user.profile.default_avatar,company.user.profile.job,company.user.id,company.id,company.default_logo,
			 company.company_name`
	let data = {
		fields: normalStr(str)
	}
	return new Promise((resolve, reject) => {
		_axios({
			method: 'get',
			url: `/jobs/${id}.json`,
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
// 收藏职位
export function collectJob(id) {
	let data = {
		job_ids: id,
	}
	return new Promise((resolve, reject) => {
		_axios({
			method: 'post',
			url: `/user/collect/jobs.json`,
			data: data
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
// 取消收藏职位
export function uncollectJob(id) {
	let data = {
		job_ids: id,
	}
	return new Promise((resolve, reject) => {
		_axios({
			method: 'delete',
			url: '/user/collect/jobs.json',
			data: data
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
//投递简历
export function userApplies(id) {
	let data = {
		fields: 'id,status'
	}
	return new Promise((resolve, reject) => {
		_axios({
			method: 'post',
			url: `/jobs/${id}/applies.json`,
			data: data
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

// 获取发布者的详情
export function getPublisherData(id) {
	let str = `profile.real_name,role,profile.avatar.small(),profile.job,profile.default_avatar,
				company.company_name,company.company_short_name,company.logo.small(),company.company_size.name,
				company.company_nature.name,company.company_industry.name,company.id,company.default_logo`
	let data = {
		fields: normalStr(str)
	}
	return new Promise((resolve, reject) => {
		_axios({
			method: 'get',
			url: `/users/${id}.json`,
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
// 获取某个公司发布的职位列表
export function getCompanyJobList(id,filter, offset, limit) {
	let str = `list[].id,list[].title,list[].create_time,list[].min_salary,list[].max_salary,
				list[].work_experience.name,list[].education.name,list[].city.name`
	let data = {
		offset: offset,
		limit: limit,
		filter: filter,
		fields: normalStr(str)
	}
	return new Promise((resolve, reject) => {
		_axios({
			method: 'get',
			url: `/companies/${id}/jobs.json`,
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

//  获取公司信息
export function getCompanyMsg(id) {
	let str = `id,logo.small(),company_short_name,company_size.name,company_nature.name,
				company_industry.name,city.name,content,company_name,followed,user.profile.real_name,
				default_logo, is_master`
	let data = {
		fields: normalStr(str)
	}
	return new Promise((resolve, reject) => {
		_axios({
			method: 'get',
			url: `/companies/${id}.json`,
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

// 关注公司
export function followCompany(id) {
	let data = {
		company_ids: id,
	}
	return new Promise((resolve, reject) => {
		_axios({
			method: 'post',
			url: `/user/follow/companies.json`,
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

// 取关公司
export function unfollowCompany(id) {
	let data = {
		company_ids: id,
	}
	return new Promise((resolve, reject) => {
		_axios({
			method: 'delete',
			url: `/user/follow/companies.json`,
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