export default {
	props: {
		text: {
			type: [String, Number],
			default: ''
		},
		color: {
			type: String,
			default: '#606266'
		},
		size: {
			type: [String, Number],
			default: 14
		},
		bgColor: {
			type: String,
			default: '#dedede'
		},
		height: {
			type: [String, Number],
			default: 32
		}
	},
}