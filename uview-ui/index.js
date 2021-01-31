// 引入全局mixin
import mixin from './libs/mixin/mixin.js'
// 引入关于是否mixin集成小程序分享的配置
// import wxshare from './libs/mixin/mpShare.js'
// 全局挂载引入http相关请求拦截插件
import http from './libs/request'

// 尝试判断在根目录的/store中是否有$u.mixin.js，此文件uView默认为需要挂在到全局的vuex的state变量
// HX2.6.11版本,放到try中,控制台依然会警告,暂时不用此方式，
// let vuexStore = {};
// try {
// 	vuexStore = require("@/store/$u.mixin.js");
// } catch (e) {
// 	//TODO handle the exception
// }

// 路由封装
import route from './libs/util/route.js'
// 颜色渐变相关,colorGradient-颜色渐变,hexToRgb-十六进制颜色转rgb颜色,rgbToHex-rgb转十六进制
import colorGradient from './libs/function/colorGradient.js'

// 规则检验
import test from './libs/function/test.js'
// 防抖方法
import debounce from './libs/function/debounce.js'
// 节流方法
import throttle from './libs/function/throttle.js'
// 公共文件写入的方法
import index from './libs/function/index.js';


// 配置信息
import config from './libs/config/config.js'
// props配置信息
import props from './libs/config/props.js'
// 各个需要fixed的地方的z-index配置文件
import zIndex from './libs/config/zIndex.js'
// 关于颜色的配置，特殊场景使用
import color from './libs/config/color.js'

const $u = {
	route: route,
	date: index.timeFormat, // 另名date
	colorGradient: colorGradient.colorGradient,
	get: http.get,
	post: http.post,
	put: http.put,
	'delete': http.delete,
	hexToRgb: colorGradient.hexToRgb,
	rgbToHex: colorGradient.rgbToHex,
	colorToRgba: colorGradient.colorToRgba,
	test,
	type: ['primary', 'success', 'error', 'warning', 'info'],
	http,
	config, // uView配置信息相关，比如版本号
	zIndex,
	debounce,
	throttle,
	mixin,
	props,
	...index,
	color,
}

// $u挂载到uni对象上
uni.$u = $u

const install = Vue => {
	// if (Vue.prototype.openShare) {
	// 	Vue.mixin(mpShare);
	// }
	// 时间格式化，同时两个名称，date和timeFormat
	Vue.filter('timeFormat', (timestamp, format) => {
		return timeFormat(timestamp, format)
	})
	Vue.filter('date', (timestamp, format) => {
		return timeFormat(timestamp, format)
	})
	// 将多久以前的方法，注入到全局过滤器
	Vue.filter('timeFrom', (timestamp, format) => {
		return timeFrom(timestamp, format)
	})
	// 同时挂载到uni和Vue.prototype中
	// #ifndef APP-NVUE
	// 只有vue，挂载到Vue.prototype才有意义，因为nvue中全局Vue.prototype和Vue.mixin是无效的
	Vue.prototype.$u = $u
	Vue.mixin(mixin)
	//Vue.mixin(vuexStore);
	// #endif
}

export default {
	install
}