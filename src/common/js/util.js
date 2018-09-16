export function _pad(num, n = 2) {
  let len = num.toString().length
  while (len < n) {
    num = '0' + num
    len++
  }
  return num
}
// base64转file文件
export function base64ToFile(dataUrl) {
  let arr = dataUrl.split(',')
  let type = arr[0].match(/:(.*?);/)[1]
  let fileExt = type.split('/')[1]
  let baseStr = window.atob(arr[1])
  let n = baseStr.length
  let u8arr = new Uint8Array(n)
  while (n--) {
    u8arr[n] = baseStr.charCodeAt(n)
  }
  return new File([u8arr], "fileName." + fileExt, { type: type })
}
export function base64ToBomb(dataurl) {
  let arr = dataurl.split(',')
  let mime = arr[0].match(/:(.*?);/)[1]
  let bstr = atob(arr[1])
  let n = bstr.length
  let u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new Blob([u8arr], { type: mime });
}
// 判断是否是微信浏览器
export function isWeixinBrowser() {
  var agent = navigator.userAgent.toLowerCase();
  if (agent.match(/MicroMessenger/i) == "micromessenger") {
    return true;
  } else {
    return false;
  }
}
// 判断是安卓还是ios
export function isAndroidOrIOS() {
  const u = navigator.userAgent
  if (u.indexOf('Android') > -1 || u.indexOf('Adr') > -1) {
    return 1 // 代表是安卓
  } else if (!!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)) {
    return 2 // 代表是ios
  }
}

export function dealDateYM(timeStr) {
  if (timeStr) {
    let Arr = timeStr.split(" ")[0].split('-')
    Arr.splice(0, 1)
    return _pad(Arr[0]) + '月' + _pad(Arr[1]) + '日'
  }
}

export function compareTime(times) {
  let timeName = '',
    timeNumber = ''
  let time = times.replace(/\-/g, "/")
  let newData = new Date().getTime();
  let beforeDate = new Date(time).getTime();
  let s = newData - beforeDate;
  if (Math.round(s / 1000) < 60) {
    timeName = '刚刚'
  } else if (Math.round(s / 1000 / 60) < 60) {
    timeNumber = Math.round(s / 1000 / 60)
    timeName = "分钟前"
  } else if (Math.round(s / 1000 / 60 / 60) < 24) {
    timeNumber = Math.round(s / 1000 / 60 / 60)
    timeName = "小时前"
  } else {
    timeNumber = Math.round(s / 1000 / 60 / 60 / 24)
    timeName = "天前"
  }
  return timeNumber + timeName
}

// 格式化的时间 "yyyy-MM-dd hh:mm:ss"

export function dateFtt(fmt, dateStr) { //author: meizz  
  let time = dateStr.replace(/\-/g, "/") // 转化为1222-12-12 12:12:12的形式
  let newData = new Date(time)
  var o = {
    "M+": newData.getMonth() + 1, //月份   
    "d+": newData.getDate(), //日   
    "h+": newData.getHours(), //小时   
    "m+": newData.getMinutes(), //分   
    "s+": newData.getSeconds(), //秒   
    "q+": Math.floor((newData.getMonth() + 3) / 3), //季度   
    "S": newData.getMilliseconds() //毫秒   
  };
  if (/(y+)/.test(fmt))
    fmt = fmt.replace(RegExp.$1, (newData.getFullYear() + "").substr(4 - RegExp.$1.length));
  for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt))
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
  return fmt;
}

// 节流函数
export function debounce(func, delay) {
  let time
  return function(...args) {
    if (time) {
      clearTimeout(time)
    }
    time = setTimeout(() => {
      // 这里的this代指vue的实例
      func.apply(this, args)
    }, delay)
  }
}
