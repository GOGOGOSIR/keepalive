export function hasClass(el, className) {
  let reg = new RegExp('(^|\\s)' + className + '(\\s|$)')
  return reg.test(el.className)
}

export function addClass(el, className) {
  if (hasClass(el, className)) {
    return
  }
  let newClass = el.className.split(' ')
  newClass.push(className)
  el.className = newClass.join(' ')
}
export function removeClass (el, cls) {
  var classnames = ' ' + el.className + ' ' // 获取 class 内容, 并在首尾各加一个空格.
  classnames = classnames.replace(/(\s+)/gi, ' ') // 将多余的空字符替换成一个空格.
  var removed = classnames.replace(' ' + cls + ' ', ' ') // 在原来的 class 替换掉首尾加了空格的
  removed = removed.replace(/(^\s+)|(\s+$)/g, '') // 去掉首尾空格.
  el.className = removed // 替换原来的 class.
}
//  获取和设置元素属性
export function getData(el, name, val) {
  const prefix = 'data-'
  if (val) {
    return el.setAttribute(prefix + name, val)
  }
  return el.getAttribute(prefix + name)
}
// js自动补全css的兼容问题
let elementStyle = document.createElement('div').style
  // 检测浏览器是否支持一下几个前缀
let vendor = (() => {
  let transformNames = {
    webkit: 'webkitTransform',
    Moz: 'MozTransform',
    O: 'OTransform',
    ms: 'msTransform',
    standard: 'transform'
  }

  for (let key in transformNames) {
    if (elementStyle[transformNames[key]] !== undefined) {
      return key
    }
  }

  return false
})()

export function prefixStyle(style) {
  if (vendor === false) {
    return false
  }

  if (vendor === 'standard') {
    return style
  }

  return vendor + style.charAt(0).toUpperCase() + style.substr(1)
}
