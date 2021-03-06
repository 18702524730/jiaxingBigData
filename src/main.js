import babelpolyfill from 'babel-polyfill'
import Vue from 'vue';
import './assets/css/reset.css';
import './assets/css/common.css';
// element-ui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-default/index.css';
import axios from 'axios'
Vue.use(ElementUI);

Vue.config.productionTip = true;
Vue.config.devtools      = true;
import AMapLoader from "@amap/amap-jsapi-loader";
Vue.use(AMapLoader);
sessionStorage.removeItem('selectList');  //默认清除已选择缓存

import router from 'router/';
import 'register/';
import store from 'store/';

import App from './App';

new Vue({
    el: '#app',
    router,
    store,
    template: '<App/>',
    components: {App}
})
