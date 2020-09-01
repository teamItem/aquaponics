"use strict";

var _vue = _interopRequireDefault(require("vue"));

var _App = _interopRequireDefault(require("./App.vue"));

var _router = _interopRequireDefault(require("./router"));

var _mars3d = _interopRequireDefault(require("./mars-map/mars3d"));

var _axios = _interopRequireDefault(require("./router/axios"));

var _elementUi = _interopRequireDefault(require("element-ui"));

require("element-ui/lib/theme-chalk/index.css");

require("normalize.css");

require("./assets/style/common.less");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

//引入element
_vue["default"].use(_elementUi["default"]);

_vue["default"].prototype.mars3d = _mars3d["default"].mars3d;
_vue["default"].prototype.$axios = _axios["default"];
_vue["default"].config.productionTip = false;
new _vue["default"]({
  router: _router["default"],
  render: function render(h) {
    return h(_App["default"]);
  }
}).$mount('#app');