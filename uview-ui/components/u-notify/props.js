export default {
	props: {
		// 到顶部的距离
		top: {
			type: [Number, String],
			default: 0
		},
		// 是否展示组件
		show: {
			type: Boolean, 
			default: false
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
			default: 15
		},
		// 是否留出顶部安全距离（状态栏高度）
		safeAreaInsetTop: {
			type: Boolean,
			default: false
		}
	}
}