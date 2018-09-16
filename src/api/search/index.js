import _axios from 'api/fetch'
import {ERR_OK, address,normalStr} from 'api/config'

// 求职者的搜索
export function searchListCompany(data,offset, limit) {
	let str = `list[].id,list[].company.company_short_name,list[].company.logo.small(),list[].update_time,
			   list[].company.company_size.name,list[].company.company_nature.name,list[].company.company_industry.name,
			   list[].title, list[].job_type.name,list[].min_salary,list[].max_salary,list[].work_experience.name,
			   list[].education.name,list[].city.name,list[].district.name,list[].address,list[].status,
			   list[].applied,list[].company.default_logo`
	let currentData = {
		type: 'search',
		offset: offset,
		limit: limit,
		fields: normalStr(str)
	}
	let newData = Object.assign({}, currentData, data)
	return new Promise((resolve, reject) => {
		_axios({
			method: 'get',
			url: `/jobs.json`,
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