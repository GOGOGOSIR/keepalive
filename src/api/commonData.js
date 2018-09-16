import _axios from 'api/fetch'
import {ERR_OK, address,normalStr} from 'api/config'

//获取公共数据的
export function getCommonData() {
	let str = `job_types[].id,job_types[].name,work_experiences[].id,work_experiences[].name,
			  educations[].id,educations[].name,job_hunt_statuses[].id,job_hunt_statuses[].name,
			  expect_salaries[].id,expect_salaries[].name,company_sizes[].id,company_sizes[].name,
			  company_natures[].id,company_natures[].name,company_industries[].id,company_industries[].name,
			  job_types[].sub_job_types[].id,job_types[].sub_job_types[].name`
	let data = {
		fields: normalStr(str)
	}
	return new Promise((resolve, reject) => {
		_axios({
			methods: 'get',
			url: '/global_info.json',
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