export default {
	props: {
		// 滑块的移动过渡时间，单位ms
		duration: {
			type: [Number, String],
			default: 200
		},
		// swiper的宽度
		swierWidth: {
			type: [Number, String],
			default: '750rpx'
		}
	}
}