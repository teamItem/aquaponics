"use strict";

var _axios = _interopRequireDefault(require("axios"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// http request 拦截器。发送请求拦截
_axios["default"].interceptors.request.use(function (config) {
  var token = localStorage.getItem('token');

  if (token) {
    config.headers.common['Authorization'] = token;
  }

  return config;
}, function (error) {
  return error;
}); // http response 拦截器，请求返回拦截


_axios["default"].interceptors.response.use(function (response) {
  var data = response.data;

  if (data.code === 200) {
    return data.data;
  }

  if (data.code === 401) {
    window.location.href = '/login';
  }

  return data;
}, function (error) {
  return error;
});