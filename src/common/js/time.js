import {_pad} from 'common/js/util'

const newYear = new Date().getFullYear()
export function getYearArr() {
	let arr = []
	for (let i = 1950; i <= newYear; i++) {
		arr.push({
			text: i,
			value: i
		})
	}
	return arr
}

export function getMonthArr() {
	let arr = []
	for (let i = 0; i <12; i++) {
		arr.push({
			text: _pad(i+1),
			value: _pad(i+1)
		})
	}
	return arr
}