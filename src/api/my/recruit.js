import _axios from 'api/fetch'
import {ERR_OK, address,normalStr} from 'api/config'

//获取优惠套餐列表
export function getviplist() {
	let str = `list[].id,list[].name,list[].price,list[].image.small()`
	let data = {
		fields: normalStr(str)
	}
	return new Promise((resolve, reject) => {
		_axios({
			method: 'get',
			url: `/discount_packages.json`,
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

//获取已发布的职位列表
export function getPublishJobList(companyId,filter,offset,limit) {
	let str = `list[].id,list[].title,list[].min_salary,list[].max_salary,
				list[].work_experience.name,list[].city.name,list[].city.area_code,
				list[].education.name`
	let data = {
		filter: filter,
		offset: offset,
		limit: limit,
		fields: normalStr(str)
	}
	return new Promise((resolve, reject) => {
		_axios({
			method: 'get',
			url: `/companies/${companyId}/jobs.json`,
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
// 获取职位详情
export function getJobInfo(jobId) {
	let str = `id,title,min_salary,max_salary,work_experience.id,work_experience.name,
	          education.id,education.name,city.name,district.area_code,
	          address,content,status,gender,job_type.id,job_type.name`
	let data = {
		fields: normalStr(str)
	}
	return new Promise((resolve, reject) => {
		_axios({
			method: 'get',
			url: `/jobs/${jobId}.json`,
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
// 编辑职位
export function editJob(jobId,data) {
	let str = `id,title,min_salary,max_salary,work_experience.name,education.name,city.name,
	          address,content,status`
	let currentdData = {
		fields: normalStr(str)
	}
	let newData = Object.assign({},data,currentdData)
	return new Promise((resolve, reject) => {
		_axios({
			method: 'put',
			url: `/jobs/${jobId}.json`,
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

// 发布职位
export function publishJob (companyId, data) {
	let currentData = {
		fields: 'id'
	}
	let newData = Object.assign({},currentData,data)
	return new Promise((resolve, reject) => {
		_axios({
			method: 'post',
			url: `/companies/${companyId}/jobs.json`,
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

// 获取收藏简历类表
export function collectResumesList (companyId, offset, limit) {
	let str = `list[].id,list[].resume_collected,list[].profile.user_id,list[].profile.real_name,list[].profile.gender,list[].profile.avatar.small(),
				list[].profile.job,list[].profile.desc,list[].profile.education.name,list[].profile.default_avatar,
				list[].profile.expects[].city.name,list[].profile.expects[].city.area_code,list[].profile.expects[].expect_salary.name,
				list[].profile.work_experiences[].start_year,list[].profile.work_experiences[].company_name,
				list[].profile.work_experiences[].start_month,list[].profile.work_experiences[].end_year,list[].profile.work_experiences[].job,
				list[].profile.work_experiences[].end_month,list[].resume_collected,list[].company.id,list[].company.company_name`
	let data = {
		offset: offset,
		limit: limit,
		fields: normalStr(str)
	}
	return new Promise((resolve, reject) => {
		_axios({
			method: 'get',
			url: `/companies/${companyId}/collect/resumes.json`,
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

//获取公司已查看联系方式的简历列表
export function lookResumesList (companyId, offset, limit) {
	let str = `list[].id,list[].profile.real_name,list[].profile.avatar.small(),
	           list[].profile.work_experience.name,
	           list[].profile.education.name,
	           list[].profile.expects[].expect_salary.name,list[].profile.expects[].city.name,
	           list[].profile.expects[].city.area_code`
	let data = {
		offset: offset,
		limit: limit,
		fields: normalStr(str)
	}
	return new Promise((resolve, reject) => {
		_axios({
			method: 'get',
			url: `/companies/${companyId}/resumes.json`,
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

// 获取公司信息
export function getCompanyInfo(companyId) {
	let str = `id,company_name,company_short_name,logo.small(),default_logo,
	company_size.name,company_size.id,company_nature.id,company_nature.name,
	company_industry.id,company_industry.name,content,website,address,district.area_code,
	city.area_code,province.area_code`
	let data = {
		fields: normalStr(str)
	}
	return new Promise((resolve, reject) => {
		_axios({
			method: 'get',
			url: `/companies/${companyId}.json`,
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
// 修改公司信息
export function editCompanyInfo(companyId,data) {
	let currentData = {
		fields: 'id'
	}
	let newData = Object.assign({},currentData,data)
	return new Promise((resolve, reject) => {
		_axios({
			method: 'put',
			url: `/companies/${companyId}.json`,
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

//公司收到简历投递列表
export function getAppliesList(data,companyId,offset,limit) {
	let str = `list[].id,list[].user.resume_collected,list[].user.profile.user_id,list[].user.profile.real_name,list[].user.profile.gender,list[].user.profile.avatar.small(),
				list[].user.profile.job,list[].user.profile.desc,list[].user.profile.education.name,list[].user.profile.default_avatar,
				list[].user.profile.expects[].city.name,list[].user.profile.expects[].city.area_code,list[].user.profile.expects[].expect_salary.name,
				list[].user.profile.work_experiences[].start_year,list[].user.profile.work_experiences[].company_name,
				list[].user.profile.work_experiences[].start_month,list[].user.profile.work_experiences[].end_year,list[].user.profile.work_experiences[].job,
				list[].user.profile.work_experiences[].end_month,list[].user.resume_collected,list[].user.company.id,list[].user.company.company_name,
				list[].job.id,list[].job.title,list[].job.job_type.id,list[].job.job_type.name,list[].job.district.area_code,
				list[].job.district.name,list[].job.min_salary,list[].job.max_salary,list[].create_time,list[].job.city.area_code,list[].job.city.name,
				list[].user.id,list[].user.profile.expects[0].city.area_code`
	let currentdata = {
		offset: offset,
		limit: limit,
		fields: normalStr(str)
	}
	let newData = Object.assign({},currentdata,data)
	return new Promise((resolve, reject) => {
		_axios({
			method: 'get',
			url: `/companies/${companyId}/applies.json`,
			params: newData
		})
		.then((res) => {
			resolve(res.data)
		})
		.catch((e) => {
	      console.log(e)
	    })
	})
}

// 购买套餐
export function buyVip(companyId, discount_package_id, paramsStr) {
	let currentdata = {
		discount_package_id: discount_package_id,
		fields: 'id,order_sn,money,create_time,status,extend.price,' + paramsStr
	}
	return new Promise((resolve, reject) => {
		_axios({
			method: 'post',
			url: `/companies/${companyId}/discount_package_orders.json`,
			data: currentdata
		})
		.then((res) => {
			resolve(res.data)
		})
		.catch((e) => {
	      console.log(e)
	    })
	})
}

// 单独购买简历
export function buyResume(companyId,user_id,paramsStr) {
	let currentdata = {
		user_id: user_id,
		fields: 'id,order_sn,money,create_time,status,extend.price,' + paramsStr
	}
	return new Promise((resolve, reject) => {
		_axios({
			method: 'post',
			url: `/companies/${companyId}/single_resume.json`,
			data: currentdata
		})
		.then((res) => {
			resolve(res.data)
		})
		.catch((e) => {
	      console.log(e)
	    })
	})
}