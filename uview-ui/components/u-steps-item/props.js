export default {
	props: {
		// 标题
		title: {
			type: [String, Number],
			default: ''
		},
		// 描述文本
		desc: {
			type: [String, Number],
			default: ''
		},
		// 自定义图标
		icon: {
			type: String,
			default: ''
		},
		// 图标颜色
		iconColor: {
			type: String,
			default: ''
		},
		// 图标大小
		iconSize: {
			type: [String, Number],
			default: 17
		},
		// 是否显示点图标类型
		dot: {
			type: Boolean,
			default: false
		},
		// 当前步骤是否处于失败状态
		error: {
			type: Boolean,
			default: false
		}
	}
}