import Vue from 'vue';
import App from './App.vue';
import router from './router';
import mars3d from './mars-map/mars3d';
import axios from './router/axios';

//引入element
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import 'normalize.css';
import './assets/style/common.less';

Vue.use(ElementUI);
Vue.prototype.mars3d = mars3d.mars3d
Vue.prototype.$axios = axios
Vue.config.productionTip = false;

new Vue({
    router,
    render: (h) => h(App)
}).$mount('#app');