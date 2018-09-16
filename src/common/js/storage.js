import storage from 'good-storage'

const SEARCH_KEY = '__search__'
const SEARCH_MAX_LEN = 15
const LOAD_ROLE = '_userRole_'

function insertArray(arr, query, compare, maxLen) {
  // 在原本数组中查找是否已经好友这个关键字
  let index = arr.findIndex(compare)
  // 如果含有关键字切这个关键字在第一位，就直接返回
  if (index === 0) {
    return
  }
  // 含有关键字且不再第一位，就删除重复的元素，且新加进来的要排在第一位
  if (index > 0) {
    arr.splice(index, 1)
  }
  // 插在第一位， 如果没有寻找到，就会直接插在第一个数据
  arr.unshift(query)
  // 如果此数组的长度大于15的话默认删除最后一个元素
  if(maxLen && arr.length > maxLen) {
    arr.pop()
  }
}

function deleteArray(arr, compare) {
  let index = arr.findIndex(compare)
  if (index > -1) {
    arr.splice(index, 1)
  }
}
// state的searchHistory由于刷新会重置其state的状态树，所以我们设置一个取storage的数据
export function loadSearch() {
  return storage.get(SEARCH_KEY, [])
}
export function loadRole() {
  return storage.get(LOAD_ROLE, -1)
}

export function setUserRole(newRole) {
  return storage.set(LOAD_ROLE, newRole)
}

// 存放搜索的关键字
export function saveSearch(query) {
  // query是一个关键字
  // 首先从本地获取这个关键字数组，如果没有就返回null
  let searchs = storage.get(SEARCH_KEY, [])
  // 对从本地获取的数据进行一些处理
  insertArray(searchs, query, (item) => {
    // 这里要去除前后空格
    return item.trim() === query.trim()
  }, SEARCH_MAX_LEN)
  // 将处理完 的数组重新存入本地，并返回出来
  storage.set(SEARCH_KEY, searchs)
  return searchs
}
// 删除一条记录
export function deleteOneSearch(query) {
  let searchs = storage.get(SEARCH_KEY, [])
  deleteArray(searchs, (item) => {
    return item.trim() === query.trim()
  })
  storage.set(SEARCH_KEY, searchs)
  return searchs
}

// 清除全部
export function clearHistory() {
  storage.remove(SEARCH_KEY)
  return []
}