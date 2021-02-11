export default {
	props: {
		// 排列方向
		direction: {
			type: String,
			default: 'row'
		},
		// 设置第几个步骤
		activeIndex: {
			type: [String, Number],
			default: 0
		},
		// 激活状态颜色
		activeColor: {
			type: String,
			default: '#07c160'
		},
		// 未激活状态颜色
		inactiveColor: {
			type: String,
			default: '#969799'
		},
		// 激活状态的图标
		activeIcon: {
			type: String,
			default: ''
		},
		// 未激活状态图标
		inactiveIcon: {
			type: String,
			default: ''
		},
		// 是否显示点类型
		dot: {
			type: Boolean,
			default: false
		}
	}
}