export default {
	props: {
		// 到顶部的距离
		top: {
			type: [Number, String],
			// #ifdef H5
			// H5端，导航栏为普通元素，需要将组件移动到导航栏的下边沿
			// H5的导航栏高度为44px
			default: 44
			// #endif
			// #ifndef H5
			default: 0
			// #endif
		},
		// 是否展示组件
		show: {
			type: Boolean, 
			dfault: false
		},
		// type主题，primary，success，warning，error
		type: {
			type: String,
			default: 'primary'
		},
		// 字体颜色
		color: {
			type: String,
			default: '#ffffff'
		},
		// 背景颜色
		bgColor: {
			type: String,
			default: ''
		},
		// 展示的文字内容
		message: {
			type: String,
			default: ''
		},
		// 展示时长，为0时不消失，单位ms
		duration: {
			type: [String, Number],
			default: 3000
		},
		// 字体大小
		fontSize: {
			type: [String, Number],
			default: 14
		}
	}
}