export default {
	props: {
		text: {
			type: [String, Number],
			default: uni.$u.props.indexAnchor.text
		},
		color: {
			type: String,
			default: uni.$u.props.indexAnchor.color
		},
		size: {
			type: [String, Number],
			default: uni.$u.props.indexAnchor.size
		},
		bgColor: {
			type: String,
			default: uni.$u.props.indexAnchor.bgColor
		},
		height: {
			type: [String, Number],
			default: uni.$u.props.indexAnchor.height
		}
	},
}