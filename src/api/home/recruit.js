import _axios from 'api/fetch'
import {ERR_OK, address,normalStr} from 'api/config'

// 限制刷新职位，上报
export function pushRefresh(id) {
	return new Promise((resolve, reject) => {
		_axios({
			method: 'put',
			url: '/jobs/${id}/refresh.json',
			data: {}
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
// 获取简历list
export function getResumesList(data,offset,limit) {
	let str = `list[].id,list[].resume_collected,list[].profile.user_id,list[].profile.real_name,list[].profile.gender,list[].profile.avatar.small(),
				list[].profile.job,list[].profile.desc,list[].profile.education.name,list[].profile.default_avatar,
				list[].profile.expects[].city.name,list[].profile.expects[].city.area_code,list[].profile.expects[].expect_salary.name,
				list[].profile.work_experiences[].start_year,list[].profile.work_experiences[].company_name,
				list[].profile.work_experiences[].start_month,list[].profile.work_experiences[].end_year,list[].profile.work_experiences[].job,
				list[].profile.work_experiences[].end_month,list[].resume_collected,list[].company.id,list[].company.company_name,
				`
	let currentData = {
		offset: offset,
		limit: limit,
		fields: normalStr(str)
	}
	let newData = Object.assign({},data,currentData)
	return new Promise((resolve, reject) => {
		_axios({
			method: 'get',
			url: '/resumes.json',
			params: newData
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

// 收藏简历
export function collectResume(companyId,user_ids) {
	let data = {
		user_ids: user_ids
	}
	return new Promise((resolve, reject) => {
		_axios({
			method: 'post',
			url: `/companies/${companyId}/collect/resumes.json`,
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

// 取消收藏简历
export function uncollectResume(companyId,user_ids) {
	let data = {
		user_ids: user_ids
	}
	return new Promise((resolve, reject) => {
		_axios({
			method: 'delete',
			url: `/companies/${companyId}/collect/resumes.json`,
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

// 获取其他用户信息，用于简历详情
export function getInfo(id) {
	let str = `id,role,is_resume_complete,is_company_complete,resume_collected,
			   unread_user_message_count,unread_company_message_count,
			   profile.user_id,profile.real_name,profile.avatar.small(),
			   profile.job,profile.desc,telephone,email,profile.gender,
			   profile.birth_year,profile.birth_month,profile.job_hunt_status.name,
			   profile.education.name,profile.work_experience.name,profile.expects[].id,profile.expects[].province.name,
			   profile.expects[].city.name,profile.expects[].job,
			   profile.expects[].job_type.name,profile.expects[].expect_salary.name,company.id,
			   company.company_name,profile.work_experiences[].company_name,profile.work_experiences[].id,profile.work_experiences[].job,profile.work_experiences[].start_year,profile.work_experiences[].start_month,profile.work_experiences[].end_year,
			   profile.work_experiences[].end_month,profile.work_experiences[].content,profile.educations[].id,profile.educations[].school,profile.educations[].major,profile.educations[].start_year,
			   profile.educations[].start_month,profile.educations[].end_year,profile.educations[].end_month,profile.educations[].education.name
			   `
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
			resolve(res.data)
		})
		.catch((e) => {
	      console.log(e)
	    })
	})
}

// 点开用户简历上报接口
export function postResume(companyId,user_id) {
	let data = {
		user_id: user_id
	}
	return new Promise((resolve, reject) => {
		_axios({
			method: 'post',
			url: `/companies/${companyId}/view_resumes.json`,
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

// 购买时查看简历的上报
export function postBuyResume(companyId,user_id) {
	let data = {
		user_id: user_id,
		fields: 'id'
	}
	return new Promise((resolve, reject) => {
		_axios({
			method: 'post',
			url: `/companies/${companyId}/resumes.json`,
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

