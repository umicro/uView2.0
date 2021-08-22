export default {
	props: {
		// 滑块的移动过渡时间，单位ms
		duration: {
			type: [String, Number],
			default: uni.$u.props.tabs.duration
		},
		// swiper的宽度
		swierWidth: {
			type: [String, Number],
			default: uni.$u.props.tabs.swierWidth
		}
	}
}