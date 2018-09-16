// export const address = 'http://test.www.mcmqzpw.com/v1'
export const address = 'http://www.mcmqzpw.com/v1'

// export const payCallBackUrl = 'http://test.m.mcmqzpw.com'
export const payCallBackUrl = 'http://m.mcmqzpw.com'

// export const shareurl = 'http://localhost:3002' // switchHost测试地址
// export const shareurl = 'http://test.m.mcmqzpw.com' // 测试地址
export const shareurl = 'http://m.mcmqzpw.com' // 正式地址 

export const ERR_OK = 0

export const imgCdn = ''

export const maxSize = 10 * 1024 * 1024

export const limit = 15

export const PAY_MONEY = 0.01 //单独购买简历的价格

// 规范字符串模板
export function normalStr(str) {
	return str.replace(/\n|\s/g,'')
}
