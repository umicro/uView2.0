export default {
	props: {
		percentage: {
			type: [Number, String],
			default: uni.$u.props.circleProgress.percentage
		}
	},
}