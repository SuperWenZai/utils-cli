/**
 * @description 创建随机uuid
 * @returns {String} uuid xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx
 */
function generateUUID() {
  let d = new Date().getTime();
  let uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    let r = (d + Math.random() * 16) % 16 | 0;
    d = Math.floor(d / 16);
    return (c == 'x' ? r : (r & 0x3) | 0x8).toString(16);
  });
  return uuid;
}

/**
 * @description 解析 URL Params 为对象
 * @param {String} url
 * @returns {Object}
 */
function parseParam(url) {
  const paramsStr = /.+\?(.+)$/.exec(url)[1]; // 将 ? 后面的字符串取出来
  const paramsArr = paramsStr.split('&'); // 将字符串以 & 分割后存到数组中
  let paramsObj = {}; // 将 params 存到对象中
  paramsArr.forEach((param) => {
    if (/=/.test(param)) {
      // 处理有 value 的参数
      let [key, val] = param.split('='); // 分割 key 和 value
      val = decodeURIComponent(val); // 解码
      val = /^\d+$/.test(val) ? parseFloat(val) : val; // 判断是否转为数字
      if (paramsObj.hasOwnProperty(key)) {
        // 如果对象有 key，则添加一个值
        paramsObj[key] = [].concat(paramsObj[key], val);
      } else {
        // 如果对象没有这个 key，创建 key 并设置值
        paramsObj[key] = val;
      }
    } else {
      // 处理没有 value 的参数
      paramsObj[param] = true;
    }
  });

  return paramsObj;
}

/**
 * @description 深拷贝（deepclone）
 * @param {Object} obj 需要拷贝的对象
 * @param {Object} [hash=new WeakMap()]
 * @returns {Object}
 */
function deepClone(obj, hash = new WeakMap()) {
  if (obj instanceof RegExp) return new RegExp(obj);
  if (obj instanceof Date) return new Date(obj);
  if (obj === null || typeof obj !== 'object') return obj; //循环引用的情况
  if (hash.has(obj)) {
    return hash.get(obj);
  } //new 一个相应的对象 //obj为Array，相当于new Array() //obj为Object，相当于new Object()
  let constr = new obj.constructor();
  hash.set(obj, constr);
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      constr[key] = deepClone(obj[key], hash);
    }
  } //考虑symbol的情况
  let symbolObj = Object.getOwnPropertySymbols(obj);
  for (let i = 0; i < symbolObj.length; i++) {
    if (obj.hasOwnProperty(symbolObj[i])) {
      constr[symbolObj[i]] = deepClone(obj[symbolObj[i]], hash);
    }
  }
  return constr;
}

/**
 * @description 节流
 * @param {Function} callback
 * @param {Number} wait
 * @returns {Function}
 */
function throttle(callback, wait) {
  let start = 0;

  return function (e) {
    let now = new Date.now();

    if (now - start >= wait) {
      callback.call(this, e);

      start = now;
    }
  };
}

/**
 * @description 防抖
 * @param {function} callback
 * @param {Number} time
 * @returns {Function}
 */
function debounce(callback, time) {
  let timeId = null;

  return function (e) {
    if (timeId !== null) {
      clearTimeout(timeId);
    }

    timeId = setTimeout(() => {
      callback.call(this, e);
      timeId = null;
    }, time);
  };
}

export { generateUUID, parseParam, deepClone, throttle, debounce };
