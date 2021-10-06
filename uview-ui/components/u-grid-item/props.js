export default {
	props: {
		// 宫格的name
		name: {
			type: [String, Number],
			default: null
		},
		// 背景颜色
		bgColor: {
			type: String,
			default: uni.$u.props.gridItem.bgColor
		},
	},
}