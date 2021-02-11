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
			type: String,
			default: 20
		},
	}
}