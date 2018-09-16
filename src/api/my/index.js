import _axios from 'api/fetch'
import {ERR_OK, address,normalStr} from 'api/config'

// 获取帮助列表
export function getHelpList(type) {
    let str = ` list[].id,list[].type,list[].title,list[].questions.title,
			   list[].questions.content`
	let data = {
		type: type,
		fields: normalStr(str)
	}
	return new Promise((resolve, reject) => {
		_axios({
			method: 'get',
			url: `/help.json`,
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

// 获取期望工作列表
export function getExpectsList() {
    let str = ` list[].id,list[].province.name,list[].city.name,list[].job,
			   list[].job_type.name,list[].expect_salary.name`
	let data = {
		fields: normalStr(str)
	}
	return new Promise((resolve, reject) => {
		_axios({
			method: 'get',
			url: `/user/expects.json`,
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
// bug反馈
export function pushBug(data) {
	return new Promise((resolve, reject) => {
		_axios({
			method: 'post',
			url: `/feedback.json`,
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
// 获取教育列表
export function getEduList() {
    let str = ` list[].id,list[].school,list[].major,list[].start_year,
			   list[].start_month,list[].end_year,list[].end_month,list[].education.name`
	let data = {
		fields: normalStr(str)
	}
	return new Promise((resolve, reject) => {
		_axios({
			method: 'get',
			url: `/user/educations.json`,
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

// 获取工作经验列表
export function getExpList() {
    let str = `list[].company_name,list[].id,list[].job,list[].start_year,list[].start_month,list[].end_year,
			   list[].end_month,list[].content`
	let data = {
		fields: normalStr(str)
	}
	return new Promise((resolve, reject) => {
		_axios({
			method: 'get',
			url: `/user/work_experiences.json`,
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

// 获取项目经验列表
export function getProjectList() {
    let str = `list[].id,list[].project,list[].duty,list[].start_year,list[].start_month,list[].end_year,list[].end_month,list[].content`
	let data = {
		fields: normalStr(str)
	}
	return new Promise((resolve, reject) => {
		_axios({
			method: 'get',
			url: `/user/projects.json`,
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

//投递列表

export function getAppliesList(type,offset,limit) {
    let str = `list[].id,list[].user.profile.real_name,list[].job.title,list[].status,
    			list[].job.city.name,list[].job.work_experiences.name,
    			list[].job.education.name,list[].job.id,list[].job.company.logo.small(),
    			list[].job.company.default_logo,list[].job.min_salary,list[].job.max_salary,
    			list[].job.create_time,list[].create_time,list[].stauts`
	let data = {
		type: type,
		offset: offset,
		limit: limit,
		fields: normalStr(str)
	}
	return new Promise((resolve, reject) => {
		_axios({
			method: 'get',
			url: `/user/applies.json`,
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

//关注的公司列表
export function getfollowCompanyList(offset,limit) {
    let str = `list[].id,list[].logo.small(),list[].default_logo,list[].company_name,
    			list[].followed`
	let data = {
		offset: offset,
		limit: limit,
		fields: normalStr(str)
	}
	return new Promise((resolve, reject) => {
		_axios({
			method: 'get',
			url: `/user/follow/companies.json`,
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

// 收藏职位列表
export function getCollectJobList(offset,limit) {
    let str = `list[].id,list[].company.company_short_name,list[].company.logo.small(),list[].update_time,
			   list[].company.company_size.name,list[].company.company_nature.name,list[].company.company_industry.name,
			   list[].title,list[].job_type.name,list[].min_salary,list[].max_salary,list[].work_experience.name,
			   list[].education.name,list[].city.name,list[].district.name,list[].address,list[].status,list[].applied,list[].company.default_logo`
	let data = {
		offset: offset,
		limit: limit,
		fields: normalStr(str)
	}
	return new Promise((resolve, reject) => {
		_axios({
			method: 'get',
			url: `/user/collect/jobs.json`,
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
//投递简历
export function deliver(id) {
	let data = {
		fields: 'id',
	}
	return new Promise((resolve, reject) => {
		_axios({
			method: 'post',
			url: `/jobs/${id}/applies.json`,
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

// 修改用户信息
export function changeUserInfo(dataObj) {
	let data = {
		fields: 'id,company.status,company.refuse_reason'
	}
	let newData = Object.assign({},dataObj,data)
	return new Promise((resolve, reject) => {
		_axios({
			method: 'put',
			url: `/user.json`,
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

// 添加工作经历
export function addJobExp(company_name,job,start_year,start_month,end_year,end_month,content) {
	let data = {
		company_name: company_name,
		job: job,
		start_year: start_year,
		start_month: start_month,
		end_year: end_year,
		end_month:end_month,
		content: content,
		fields: 'id'
	}
	return new Promise((resolve, reject) => {
		_axios({
			method: 'post',
			url: `/user/work_experiences.json`,
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

// 编辑工作经历
export function editJobExp(dataObj,id) {
	let data = {
		fields: 'id,company_name'
	}
	let newData = Object.assign({},dataObj,data)
	return new Promise((resolve, reject) => {
		_axios({
			method: 'put',
			url: `/user/work_experiences/${id}.json`,
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

// 获取某个工作经验详情
export function getSomeOneJobExp(id) {
	let str = `company_name,id,job,start_year,start_month,end_year,
			   end_month,content`
	let data = {
		fields: normalStr(str)
	}
	return new Promise((resolve, reject) => {
		_axios({
			method: 'get',
			url: `/user/work_experiences/${id}.json`,
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

//删除工作经历
export function deleteJobExp(id) {
	let data = {
		fields: 'id,company_name'
	}
	return new Promise((resolve, reject) => {
		_axios({
			method: 'delete',
			url: `/user/work_experiences/${id}.json`,
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

// 添加期望工作
export function addHopeJob(area_code, job, job_type_id, expect_salary_id) {
	let data = {
		area_code: area_code,
		job: job,
		job_type_id: job_type_id,
		expect_salary_id: expect_salary_id,
		fields: 'id'
	}
	return new Promise((resolve, reject) => {
		_axios({
			method: 'post',
			url: `/user/expects.json`,
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

// 获取期望工作详情
export function getSomeOneHopeJob(id) {
	let str = ` id,province.name,province.id,city.name,city.area_code,job,
			   job_type.name,job_type.id,expect_salary.name,expect_salary.id`
	let data = {
		fields: normalStr(str)
	}
	return new Promise((resolve, reject) => {
		_axios({
			method: 'get',
			url: `/user/expects/${id}.json`,
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

//编辑期望工作
export function editHopeJob(id,area_code, job, job_type_id, expect_salary_id) {
	let data = {
		area_code: area_code,
		job: job,
		job_type_id: job_type_id,
		expect_salary_id: expect_salary_id,
		fields: 'id'
	}
	return new Promise((resolve, reject) => {
		_axios({
			method: 'put',
			url: `/user/expects/${id}.json`,
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
// 删除期望工作
export function deleteHopeJob(id) {
	let data = {
		fields: 'id'
	}
	return new Promise((resolve, reject) => {
		_axios({
			method: 'delete',
			url: `/user/expects/${id}.json`,
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

// 添加教育经历
export function addEdu(data) {
	let currentdata = {
		fields: 'id'
	}
	let newData = Object.assign({},currentdata, data)
	return new Promise((resolve, reject) => {
		_axios({
			method: 'post',
			url: `/user/educations.json`,
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

// 获取教育经历详情
export function getSomeOneEdu(id) {
	let str = ` id,school,major,start_year,
			   start_month,end_year,end_month,education.name,education.id`
	let data = {
		fields: normalStr(str)
	}
	return new Promise((resolve, reject) => {
		_axios({
			method: 'get',
			url: `/user/educations/${id}.json`,
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

// 编辑教育经历
export function editEdu(id,data) {
	let currentdata = {
		fields: 'id'
	}
	let newData = Object.assign({},currentdata, data)
	return new Promise((resolve, reject) => {
		_axios({
			method: 'put',
			url: `/user/educations/${id}.json`,
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

// 删除教育经历
export function deleteEdu(id) {
	return new Promise((resolve, reject) => {
		_axios({
			method: 'delete',
			url: `/user/educations/${id}.json`
		})
		.then((res) => {
			resolve(res.data)
		})
		.catch((e) => {
	      console.log(e)
	    })
	})
}

// 添加项目经验
export function addProject(data) {
	let currentdata = {
		fields: 'id'
	}
	let newData = Object.assign({},currentdata, data)
	return new Promise((resolve, reject) => {
		_axios({
			method: 'post',
			url: `/user/projects.json`,
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
// 获取项目经验详情
export function getSomeOneProject(id) {
	let str = ` id,project,duty,start_year,
				start_month,end_year,end_month,content`
	let data = {
		fields: normalStr(str)
	}
	return new Promise((resolve, reject) => {
		_axios({
			method: 'get',
			url: `/user/projects/${id}.json`,
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

// 编辑项目经历
export function editProject(id,data) {
	let currentdata = {
		fields: 'id'
	}
	let newData = Object.assign({},currentdata, data)
	return new Promise((resolve, reject) => {
		_axios({
			method: 'put',
			url: `/user/projects/${id}.json`,
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

// 删除项目经历
export function deleteProject(id) {
	return new Promise((resolve, reject) => {
		_axios({
			method: 'delete',
			url: `/user/projects/${id}.json`
		})
		.then((res) => {
			resolve(res.data)
		})
		.catch((e) => {
	      console.log(e)
	    })
	})
}


