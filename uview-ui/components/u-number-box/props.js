export default {
	props: {
		// 步进器标识符，在change回调返回
		name: {
			type: [Number, String],
			default: ''
		},
		// 用于双向绑定的值，初始化时设置设为默认min值(最小值)
		value: {
			type: [Number, String],
			default: 0
		},
		// 最小值
		min: {
			type: [Number, String],
			default: 1
		},
		// 最大值
		max: {
			type: [Number, String],
			default: Number.MAX_SAFE_INTEGER
		},
		// 加减的步长，可为小数
		step: {
			type: [Number, String],
			default: 1
		},
		// 是否只允许输入整数
		integer: {
			type: Boolean,
			default: true
		},
		// 是否禁用，包括输入框，加减按钮
		disabled: {
			type: Boolean,
			default: false
		},
		// 是否禁用输入框
		disabledInput: {
			type: Boolean,
			default: false
		},
		// 是否开启异步变更，开启后需要手动控制输入值
		asyncChange: {
			type: Boolean,
			default: false
		},
		// 输入框宽度，单位为px
		inputWidth: {
			type: [Number, String],
			default: 35
		},
		// 是否显示减少按钮
		showMinus: {
			type: Boolean,
			default: true
		},
		// 是否显示增加按钮
		showPlus: {
			type: Boolean,
			default: true
		},
		// 显示的小数位数
		decimalLength: {
			type: [Number, String],
			default: null
		},
		// 是否禁用减少按钮
		disabledMinus: {
			type: Boolean,
			default: false
		},
		// 是否禁用增加按钮
		disabledPlus: {
			type: Boolean,
			default: false
		},
		// 是否开启长按加减手势
		longPress: {
			type: Boolean,
			default: true
		},
		// 输入框文字和加减按钮图标的颜色
		color: {
			type: String,
			default: '#323233'
		},
		// 按钮大小，宽高等于此值，单位px，输入框高度和此值保持一致
		buttonSize: {
			type: [String, Number],
			default: 30
		},
		// 输入框和按钮的背景颜色
		bgColor: {
			type: String,
			default: '#EBECEE'
		},
		// 指定光标于键盘的距离，避免键盘遮挡输入框，单位px
		cursorSpacing: {
			type: [String, Number],
			default: 100
		},
		// 是否只能输入整数，含0在内
		integer: {
			type: Boolean,
			default: false
		},
		// 是否禁用增加按钮
		disablePlus: {
			type: Boolean,
			default: false
		},
		// 是否禁用减少按钮
		disableMinus: {
			type: Boolean,
			default: false
		}
	}
}