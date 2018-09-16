/*
	vue中的mixin，作用是将一下代码插入到调用mixin.js的组件中，
	当组件中含有相同的函数是，组件的函数会覆盖mixin中的函数
*/
import {getCityList} from 'common/js/city'
import {uploadPic} from 'api/upload'
import {maxSize} from 'api/config'
import {getPhoneCode} from 'api/loginAndreg'
import {getYearArr, getMonthArr} from 'common/js/time'
import {sexArr} from 'common/js/pickerArr'

import {isAndroidOrIOS,base64ToBomb} from 'common/js/util'

// 阻止软键盘遮挡input的mixin
export const inputHidenOfKeyboard = {
	methods: {
		inputFocus(e) {
			let isAndroid = isAndroidOrIOS()
			if (isAndroid == 1) {
				this.inputHiden(e.target)
				// 由于苹果在微信下，关闭键盘会默认将其input框失去焦点
				// 由于ios9 即使吊起键盘的前后高度一样都会触发resize事件，
				// 而ios10 以上是不会触发resize事件，所以我只是判断只在安卓下有这个功能
				window.onresize = () => {
					let nowHeight = document.body.clientHeight // 获取当前的视口
					if (nowHeight < this.beforeHeight) {
						return
					} else {
						e.target.blur()
					}
				}
			}
		}
	},
	created() {
		this.beforeHeight = document.body.clientHeight // 默认获取浏览器的视口
	}
}

// 侧滑组件的mixin
export const deliveryMixin = {
	methods: {
		dragedSlide(type) {
			this.$router.replace({name: type , query: {
				userId: this.userId,
				type: type
			}})
		}
	},
	created() {
		let userId = this.$route.query.userId
		if (userId) {
			this.userId = userId
		} else {
			this.userId = ''
		}
	}
}

// 上传组件的mixnin
export const uploadMixin = {
	data() {
		return {
			imgID: '',
			imgCdn: this.imgCdn,
			uploadImgSrc: this.imgCdn + '/static/img/my/8.png',
			is_success_load: false,
			is_upload: false
		}
	},
	methods: {
		imgLoad() {
			if (this._toast) {
				this._toast.hide()
			}
		},
		upImg(e) {
			this.is_upload = true
			this.file = e.target.files[0]
			if (this.file.size > maxSize) {
				this.$createToast({
					txt: '上传图片不能超过10M',
					type: 'warn',
					time: 1000
				})
				this.$refs.uploadInput.value = ''
				return
			}  
			// 获取上传文件的路径
			let uploadAfterImgUrl = window.URL.createObjectURL(this.file)
			// 调起裁剪
			this.bsCropper = this.$createBsCropper({
				imgSrc: uploadAfterImgUrl
			}).show()
			this.bsCropper.$on('cropperClose', () => {
				this.$refs.uploadInput.value = ''
			})
			// 监听裁剪后返回的base64的图片格式
			this.bsCropper.$on('cropperEnd', (data) => {
				this.base64ImgSrc = data
				if (this.base64ImgSrc) {
					const param = new FormData()
					param.append('file', base64ToBomb(this.base64ImgSrc))
					this._toast = this.$createToast({
						txt: '图片上传中',
						mask: true,
						time: 12000
					})
					this._toast.show()
					uploadPic(param).then((res) => {
						if (res.error_code === 0) {
							let data = res.data
							this.imgID = data.id
							this.uploadImgSrc = data.url
							this.is_success_load = true
						} else {
							this.$createToast({
								txt: '图片上传失败',
								type: 'error',
								time: 1000
							})
						}
					})
				}
			})
		}
	}

}

// 选择城市的mixin
export const selectCityMixin = {
	data() {
		return {
			city: '',
			cityId: ''
		}
	},
	methods: {
		selectCity() {
			this.cityPicker.show()
		}
	},
	mounted() {
		this.cityPicker = this.$createCascadePicker({
			title: '',
			data: getCityList(),
			onSelect: (selectedVal, selectedIndex, selectedText) => {
				let declCity = ''
				if (selectedText[0] === selectedText[1]) {
					declCity = selectedText[0]
				} else {
					declCity = selectedText[0] + selectedText[1]
				}
				this.cityId = selectedVal[1]
				this.city = declCity
			},
			onCancel: () => {
			}
		})
	}
}

// 获取手机验证的mixin
export const getPhoneCodeMixin = {
	data() {
		return {
			times: -1,
			timeFlag: true
		}
	},
	computed: {
		codeText() {
			if (this.times === -1) {
				return '获取验证码'
			} else {
				return this.times + 's'
			}
		},
		codeActiveFlag() {
			if (this.phoneNum.length == 11) {
	          let reg2 = /^1[0-9]\d{3,9}$/
	          if (!reg2.test(this.phoneNum)) {
	            return false
	          } else {
	            return true
	          }
	        } else {
	          return false
	        }
		}
	},
	watch: {
		times(newTime) {
			if (newTime === -1) {
              this.timeFlag = true
              clearInterval(this.setTimer)
            }
		}
	},
	methods: {
		getCode() {
	      if (this.codeActiveFlag && this.timeFlag) {
	        // 请求数据
	        getPhoneCode(this.phoneNum, this.usage).then((res) => {
	        	if (res.error_code == 0) {
	        		this.timeFlag = false
			        this.times = 60
			        this.setTimer = setInterval(() => {
			            this.times --
			        }, 1000)
	        		this.$createToast({
				        txt: '发送成功',
				        type: 'correct',
				        time: 1000
				    }).show()
	        	} else {
	        		this.$createToast({
				        txt: res.error_description,
				        type: 'error',
				        time: 1000
				    }).show()
	        	}
	        })
	      }
	    }
	}
}


// 选择出生年月的mixin
export const selectBirMixin = {
	data() {
		return {
			bir: ''
		}
	},
	mounted() {
		this.timePicker = this.$createPicker({
	      title: '',
	      data: [getYearArr(), getMonthArr()],
	      onSelect: (selectedVal, selectedIndex, selectedText) => {
	      	this.bir = selectedVal[0]+'.'+selectedVal[1]+'出生'
	      }
	  	})
	}
}

// 选择性别的mixin
 export const selectSexMixin = {
 	data() {
		return {
			sex: ''
		}
	},
 	mounted() {
 		let newSexArr = []
 		if (this.$route.path.indexOf('/publishJob') != -1 || this.$route.path.indexOf('/jobManage') != -1) {
 			let sexArr2 = sexArr.concat()
 			sexArr2.unshift({
		      text: '不限',
		      value: '不限'
 			})
 			newSexArr = sexArr2
 		} else {
            newSexArr = sexArr.concat()
 		}
		this.sexPicker = this.$createPicker({
	      title: '',
	      data: [newSexArr],
	      onSelect: (selectedVal, selectedIndex, selectedText) => {
	      	this.sex = selectedVal[0]
	      }
	  	})
	}
 }

 // 选择时间的mixin
 export const selectTimeDateMixin = {
 	mounted() {
 		let today = new Date()
 		let nowYear = today.getFullYear()
 		let nowMonth = today.getMonth() + 1
 		let yearIndex = getYearArr().findIndex((item) => {
 			return nowYear == item.text
 		})
 		let monthIndex = getMonthArr().findIndex((item) => {
 			return nowMonth == item.text
 		})
 		this.timeDataPicker = this.$createPicker({
	      title: '',
	      selectedIndex: [yearIndex, monthIndex],
	      data: [getYearArr(), getMonthArr()],
	      onSelect: (selectedVal, selectedIndex, selectedText) => {
	      	this.$emit('selectTimeOver',selectedVal, selectedText)
	      }
	  	})
 	}
 }
