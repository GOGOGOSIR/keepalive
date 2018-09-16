import {provinceList, cityList, areaList} from './area.js'

const cityData = provinceList
function dealData (obj) {
	let newKeyArr = []
	let newValueArr = []
	let newObj = {}
	for(let key in obj) {
		let Arr = obj[key]
		Arr.forEach(item => {
			let codeValue = item.value
			if (codeValue.length !== 8) {
				item.value = codeValue.toString() + '00'
			}
		})
		newValueArr.push(Arr)
		key = key.toString() + '00'
		newKeyArr.push(key)
	}
	newKeyArr.forEach((item, index) => {
		newObj[item] = newValueArr[index]
	})
	return newObj
}
export function getCityList () {
	let newCityList = dealData(cityList)
	cityData.forEach(province => {
		let codeValue = province.value
		if (codeValue.length !== 8) {
			let newCode = codeValue.toString() + '00'
			province.value = newCode
		}
	  	province.children = newCityList[province.value] || []
	})
	return cityData
}

export function getAllCityList () {
	let newCityList = dealData(cityList)
	let newAreaList = dealData(areaList)
	cityData.forEach(province => {
		let codeValue = province.value
		if (codeValue.length !== 8) {
			let newCode = codeValue.toString() + '00'
			province.value = newCode
		}
	  	province.children = newCityList[province.value]
	  	province.children.forEach(city => {
		    city.children = newAreaList[city.value] || []
		})
	})
	return cityData
}

