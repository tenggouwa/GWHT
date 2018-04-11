// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
import RouterConfig from './router'
import ElementUI from 'element-ui'
import ApiConfig from './config/api-config'
import axios from 'axios'
import 'element-ui/lib/theme-default/index.css'

// Vue.use(Router)   
Vue.use(ElementUI)
Vue.use(VueRouter)
Vue.prototype.axios = axios;
Vue.prototype.extendApi = ApiConfig;
var querystring = require('querystring');
Vue.prototype.querystring=querystring;

var router = new VueRouter({
    routes:RouterConfig,
    // mode: 'history',
    // base:"/blockchain/",
})
/* eslint-disable no-new */
new Vue({
    router: router,
    el: '#app',
    template: '<App/>',
    components: { App }
})
