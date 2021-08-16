export default {
	props: {
		// 背景颜色
		bgColor: {
			type: String,
			default: uni.$u.props.gridItem.bgColor
		},
		// 宫格的name
		name: {
			type: [Number, String],
			default: null
		}
	},
}