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
			default: '#2979ff'
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