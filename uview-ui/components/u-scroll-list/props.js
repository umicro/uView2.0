export default {
	props: {
		// 指示器的整体宽度
		indicatorWidth: {
			type: [Number, String],
			default: 50
		},
		// 滑块的宽度
		indicatorBarWidth: {
			type: [Number, String],
			default: 20
		},
		// 是否显示面板指示器
		indicator: {
			type: Boolean,
			default: true
		},
		// 指示器非激活颜色
		indicatorColor: {
			type: String,
			default: '#f2f2f2'
		},
		// 指示器的激活颜色
		indicatorActiveColor: {
			type: String,
			default: '#3c9cff'
		},
		// 指示器样式，可通过bottom，left，right进行定位
		indicatorStyle: {
			type: [String, Object],
			default: ''
		}
	}
}
