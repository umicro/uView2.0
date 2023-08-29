import Vue from 'vue'
import App from './App'
import './uni.promisify.adaptor'
// 引入全局uView
import uView from 'uview-ui';
import request from './util/request/index';

import store from '@/store';


import mixin from './common/mixin'

Vue.prototype.$store = store

Vue.config.productionTip = false

App.mpType = 'app'

Vue.use(uView);

// #ifdef MP
// 引入uView对小程序分享的mixin封装
const mpShare = require('../node_modules/uview-ui/libs/mixin/mpShare.js')
Vue.mixin(mpShare)
// #endif

Vue.mixin(mixin)

const app = new Vue({
    store,
    ...App
})

// 引入请求封装
request(app);

app.$mount()
