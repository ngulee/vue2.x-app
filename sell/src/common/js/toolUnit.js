/**
 * 解析url查询字符串参数
 * @example ?id=12345&a=b
 * @return Object = {id: 12345, a: b}
 */

export function urlParse () {
  // 获得查询字符串
  let searchString = window.location.search;
  // 去掉查询字符串开头的问好
  let queryString = (searchString.length > 0 ? searchString.substring(1) : '');
  // 保存数据的对象
  let args = {};
  // 取得每一项
  let items = queryString.length > 0 ? queryString.split('&') : [];
  let item = null;
  let key = null;
  let value = null;
  let len = items.length;
  // 逐个将每一项添加到args 对象中
  for (let i = 0; i < len; i++) {
    item = items[i].split('=');
    key = decodeURIComponent(item[0]);
    value = decodeURIComponent(item[1]);
    if (key.length) {
      args[key] = value;
    }
  }
  return args;
};
