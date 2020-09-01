"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.trim = trim;
exports.ltrim = ltrim;
exports.rtrim = rtrim;
exports.isTelphoneNumber = isTelphoneNumber;
exports.formatMoney = formatMoney;
exports.formatNumber = formatNumber;
exports.formatDate = formatDate;
exports.throttle = throttle;
exports.debounce = debounce;
exports.getStorage = exports.selection = void 0;

var _crypto = _interopRequireDefault(require("crypto"));

var _this2 = void 0;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _readOnlyError(name) { throw new Error("\"" + name + "\" is read-only"); }

// 从数据中获取需要的参数，默认获取_id
var selection = function selection(data, params) {
  var result = [];

  if (params && params.length > 0) {
    data.forEach(function (item) {
      params.forEach(function (param) {
        result.push({
          id: item.id,
          param: item[param]
        });
      }, _this2);
    }, _this2);
  } else {
    data.forEach(function (item) {
      result.push(item.id);
    }, _this2);
  }

  return result;
};
/**
 * 读取localStorage
 * @param {String} key 为需要读取的Storage的key
 * @param {Object} type 读取出错时需要返回的数据类型
 */


exports.selection = selection;

var getStorage = function getStorage(key, type) {
  try {
    var result = JSON.parse(localStorage.getItem(key));

    if (result === null || result === '') {
      return type;
    }

    return result;
  } catch (error) {
    console.error(new Error('读取缓存数据错误:', error));
    return type;
  }
}; // 去除左右空格


exports.getStorage = getStorage;

function trim(str) {
  return str.replace(/(^\s*)|(\s*$)/g, '');
} // 删除左边的空格


function ltrim(str) {
  return str.replace(/(^\s*)/g, '');
} // 删除右边的空格


function rtrim(str) {
  return str.replace(/(\s*$)/g, '');
}
/**
 * 校验是否是手机号码
 * @param {String} value 需要校验的字符串
 * @return {Boolean} 校验是否通过
 */


function isTelphoneNumber(value) {
  return /^(13[0-9]|14[5-9]|15[0-3,5-9]|16[2,5,6,7]|17[0-8]|18[0-9]|19[0-3,5-9])\d{8}$/.test(value);
}
/**
 * 格式化数字、金额
 * @param {Number} data 需要格式化的数字
 * @param {Number} decimals 保留几位小数
 * @param {String} decPoint 小数点符号
 * @param {String} thousandsSep 千分位符号
 * @return {String} 格式化后的金额
 */


function formatMoney(data, decimals, decPoint, thousandsSep) {
  var numer = data.toString().replace(/[^0-9+-Ee.]/g, '');
  var n = !Number.isFinite(+numer) ? 0 : +numer;
  var prec = !Number.isFinite(+decimals) ? 0 : Math.abs(decimals);
  var sep = typeof thousandsSep === 'undefined' ? ',' : thousandsSep;
  var dec = typeof decPoint === 'undefined' ? '.' : decPoint;
  var s = '';

  function toFixedFix(numCal, precCal) {
    var k = Math.pow(10, precCal);
    return (Math.ceil(numCal * k) / k).toString();
  }

  s = (prec ? toFixedFix(n, prec) : Math.round(n).toString()).split('.');
  var re = /(-?\d+)(\d{3})/;

  while (re.test(s[0])) {
    s[0] = s[0].replace(re, "$1".concat(sep, "$2"));
  }

  if ((s[1] || '').length < prec) {
    s[1] = s[1] || '';
    s[1] += new Array(prec - s[1].length + 1).join('0');
  }

  return s.join(dec);
}
/**
 * 格式化数字，小于10补0
 * @param {Number || String} n 需要格式化的数字
 * @returns {String} 格式化后的数字
 */


function formatNumber(n) {
  var number = n.toString();
  return number[1] ? number : "0".concat(number);
}
/**
 * 格式化日期
 * @param {String | Date} 需要格式化的时间，若为空取当前时间
 * @param {String} format 格式化的结构
 */


function formatDate(date, format) {
  var dateType = Object.prototype.toString.call(date);

  if (dateType !== '[object String]' && dateType !== '[object Date]' && dateType !== '[object Number]') {
    date = new Date();
  } else {
    date = new Date(date); // date无效

    if (Number.isNaN(date.getTime())) {
      date = new Date();
    }
  }

  var args = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds(),
    'q+': Math.floor((date.getMonth() + 3) / 3),
    'S+': date.getMilliseconds()
  };

  if (/(y+)/i.test(format)) {
    format = format.replace(RegExp.$1, date.getFullYear().toString().substr(4 - RegExp.$1.length));
  }

  if (/(w+)/i.test(format)) {
    var week = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
    format = format.replace(RegExp.$1, week[date.getDay()]);
  }

  Object.getOwnPropertyNames(args).forEach(function (key) {
    if (new RegExp("(".concat(key, ")"), 'i').test(format)) {
      format = format.replace(RegExp.$1, RegExp.$1.length === 1 ? item : "00".concat(args[key]).substr(args[key].toString().length));
    }
  });
  return format;
}
/**
 * 函数节流
 * @description 高频事件时，规定时间(delay)内只执行一次要执行的事件(fn)
 * @param {Function} fn 需要执行的函数
 * @param {Number} delay 冷却的时间，毫秒
 */


function throttle(fn, delay) {
  var timer = null;
  return function () {
    var _this = this;

    var _args = arguments;

    if (!timer) {
      timer = (_readOnlyError("timer"), setTimeout(function () {
        fn.apply(_this, _args);
        timer = (_readOnlyError("timer"), null);
      }, delay));
    }
  };
}
/**
 * 函数防抖
 * @description 高频事件时，在规定时间(delay)后出发一次要执行的事件(fn)
 * @param {Function} fn 需要执行的函数
 * @param {Number} delay 延迟时间，毫秒
 */


function debounce(fn, delay) {
  var timer = null; // 返回函数对debounce作用域形成闭包

  return function () {
    // setTimeout()中用到函数环境总是window,故需要当前环境的副本；
    var context = this;
    var args = arguments; // 如果事件被触发，清除timer并重新开始计时

    clearTimeout(timer);
    timer = setTimeout(function () {
      fn.apply(context, args);
    }, delay);
  };
}