export default {
	props: {
		// 当前进度百分比值，范围0-100
		value: {
			type: [Number, String],
			default:uni.$u.props.slider.value,
		},
		// 是否禁用滑块
		disabled: {
			type: Boolean,
			default:uni.$u.props.slider.disabled,
		},
		// 滑块宽度，高等于宽
		blockHeight: {
			type: [Number, String],
			default:uni.$u.props.slider.blockHeight,
		},
		// 最小值
		min: {
			type: [Number, String],
			default:uni.$u.props.slider.min,
		},
		// 最大值
		max: {
			type: [Number, String],
			default:uni.$u.props.slider.max,
		},
		// 步进值
		step: {
			type: [Number, String],
			default:uni.$u.props.slider.step,
		},
		// 滑块条高度，单位px
		height: {
			type: [Number, String],
			default:uni.$u.props.slider.height,
		},
		// 进度条的激活部分颜色
		activeColor: {
			type: String,
			default:uni.$u.props.slider.activeColor,
		},
		// 进度条的背景颜色
		inactiveColor: {
			type: String,
			default:uni.$u.props.slider.inactiveColor,
		},
		// 滑块的背景颜色
		blockColor: {
			type: String,
			default:uni.$u.props.slider.blockColor
		},
		// 用户对滑块的自定义颜色
		blockStyle: {
			type: Object,
			default:uni.$u.props.slider.blockStyle
		},
	}
}