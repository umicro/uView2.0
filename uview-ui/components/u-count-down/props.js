export default {
	props: {
		// 倒计时时长，单位ms
		time: {
			type: [Number, String],
			default: 0
		},
		// 时间格式，DD-日，HH-时，mm-分，ss-秒，SSS-毫秒
		format: {
			type: String,
			default: 'HH:mm:ss'
		},
		// 是否自动开始倒计时
		autoStart: {
			type: Boolean,
			default: true
		},
		// 是否展示毫秒倒计时
		millisecond: {
			type: Boolean,
			default: false
		}
	}
}