export default {
	props: {
		// 轮播的长度
		length: {
			type: [Number, String],
			default: 0
		},
		// 当前处于活动状态的轮播的索引
		current: {
			type: [Number, String],
			default: 0
		},
		// 指示器非激活颜色
		indicatorActiveColor: {
			type: String,
			default: ''
		},
		// 指示器的激活颜色
		indicatorInactiveColor: {
			type: String,
			default: ''
		},
		// 指示器的形式，line-线型，dot-点型
		indicatorStyle: {
			type: String,
			default: 'line'
		}
	}
}