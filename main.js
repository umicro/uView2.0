import Vue from 'vue'
import App from './App'

// vuex
import store from './store'
Vue.prototype.$store = store

Vue.config.productionTip = false

App.mpType = 'app'

// 引入全局uView
import uView from '@/uni_modules/uview-v2'
Vue.use(uView)

// #ifdef MP
// 引入uView对小程序分享的mixin封装
let mpShare = require('@/uni_modules/uview-v2/libs/mixin/mpShare.js');
Vue.mixin(mpShare);
// #endif

import mixin from './common/mixin'
Vue.mixin(mixin)

const app = new Vue({
	store,
	...App
})

// 引入请求封装
require('./util/request/index')(app)

app.$mount()
