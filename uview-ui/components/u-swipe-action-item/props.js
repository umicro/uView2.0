export default {
	props: {
		// 控制打开或者关闭
		show: {
			type: String,
			default: uni.$u.props.swipeAction.show
		},
		// 是否禁用
		disabled: {
			type: Boolean,
			default: uni.$u.props.swipeAction.disabled
		},
		// 是否自动关闭其他swipe按钮组
		autoClose: {
			type: Boolean,
			default: uni.$u.props.swipeAction.autoClose
		},
		// 滑动距离阈值，只有大于此值，才被认为是要打开菜单
		threshold: {
			type: Number,
			default: uni.$u.props.swipeAction.threshold
		},
		// 左侧按钮内容
		leftOptions: {
			type: Array,
			default () {
				return uni.$u.props.swipeAction.leftOptions
			}
		},
		// 右侧按钮内容
		rightOptions: {
			type: Array,
			default () {
				return uni.$u.props.swipeAction.rightOptions
			}
		},
		duration: {
			type: [Number, String],
			default: uni.$u.props.swipeAction.duration
		},
	}
}