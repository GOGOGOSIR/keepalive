import _axios from 'api/fetch'
import {ERR_OK, address,normalStr} from 'api/config'

export function getUserInfo() {
	let str = `id,role,is_resume_complete,is_company_complete,
			   unread_user_message_count,unread_company_message_count,
			   profile.user_id,profile.real_name,profile.avatar.small(),
			   profile.job,profile.desc,telephone,email,profile.gender,
			   profile.birth_year,profile.birth_month,profile.job_hunt_status.name,
			   profile.education.name,profile.education.id,profile.work_experience.name,profile.work_experience.id,profile.expects[].id,profile.expects[].province.name,
			   profile.expects[].city.name,profile.expects[].job,
			   profile.expects[].job_type.name,profile.expects[].expect_salary.name,company.id,
			   company.company_name,company.last_discount_package.id,
			   company.free_discount_package.name,company.last_discount_package.id,company.last_discount_package.extend.name,
			   company.last_discount_package.extend.effect_type,company.last_discount_package.extend.effect_amount,
			   company.last_discount_package.extend.price,company.status,company.refuse_reason,
			   company.company_size.id,company.company_nature.id,company.company_industry.id,
			   company.logo.small(),company.address,company.content
			   `
	let data = {
		fields: normalStr(str)
	}
	return new Promise((resolve, reject) => {
		_axios({
			method: 'get',
			url: '/user.json',
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
export function getSomeOneInfo(id) {
	let str = `id,role,is_resume_complete,is_company_complete,
			   unread_user_message_count,unread_company_message_count,
			   profile.user_id,profile.real_name,profile.avatar.small(),
			   profile.job,profile.desc,telephone,email,profile.gender,
			   profile.birth_year,profile.birth_month,profile.job_hunt_status.name,
			   profile.education.name,profile.education.id,profile.work_experience.name,profile.work_experience.id,profile.expects[].id,profile.expects[].province.name,
			   profile.expects[].city.name,profile.expects[].job,
			   profile.expects[].job_type.name,profile.expects[].expect_salary.name,company.id,
			   company.company_name,company.last_discount_package.id,
			   company.free_discount_package.name,company.last_discount_package.id,company.last_discount_package.extend.name,
			   company.last_discount_package.extend.effect_type,company.last_discount_package.extend.effect_amount,
			   company.last_discount_package.extend.price,company.status,company.refuse_reason,
			   company.company_size.id,company.company_nature.id,company.company_industry.id,
			   company.logo.small(),company.address,company.content
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