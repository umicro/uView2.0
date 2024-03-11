export default {
    props: {
        // 倒计时时长，单位ms
        time: {
            type: [String, Number],
            default: uni.$u.props.countDown.time
        },
        // 顺计时开始时间，单位ms （默认 new Date().getTime() 
        startTime: {
            type: [String, Number],
            default: uni.$u.props.countDown.startTime
        },
        // 时间格式，DD-日，HH-时，mm-分，ss-秒，SSS-毫秒
        format: {
            type: String,
            default: uni.$u.props.countDown.format
        },
        // 是否自动开始倒计时
        autoStart: {
            type: Boolean,
            default: uni.$u.props.countDown.autoStart
        },
        // 是否展示毫秒倒计时
        millisecond: {
            type: Boolean,
            default: uni.$u.props.countDown.millisecond
        },
		isCountDown:{
			type: Boolean,
			default: uni.$u.props.countDown.isCountDown
		}
    }
}
