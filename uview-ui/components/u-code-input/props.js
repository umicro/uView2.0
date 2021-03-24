export default {
	props: {
		// 最大输入长度
		maxlength: {
			type: [Number, String],
			default: 6
		},
		// 是否用圆点填充
		dot: {
			type: Boolean,
			default: false
		},
		// 显示模式，box-盒子模式，line-底部横线模式
		mode: {
			type: String,
			default: "box"
		},
		// 是否细边框
		hairline: {
			type: Boolean,
			default: false
		},
		// 字符间的距离
		space: {
			type: [Number, String],
			default: 10
		},
		// 预置值
		value: {
			type: [String, Number],
			default: ''
		},
		// 是否自动获取焦点
		focus: {
			type: Boolean,
			default: false
		},
		// 字体是否加粗
		bold: {
			type: Boolean,
			default: false
		},
		// 字体颜色
		color: {
			type: String,
			default: '#606266'
		},
		// 字体大小
		fontSize: {
			type: [String, Number],
			default: 18
		},
		// 输入框的大小，宽等于高
		size: {
			type: [Number, String],
			default: 35
		},
		// 是否隐藏原生键盘，如果想用自定义键盘的话，需设置此参数为true
		disabledKeyboard: {
			type: Boolean,
			default: false
		},
		// 边框和线条颜色
		borderColor: {
			type: String,
			default: '#c9cacc'
		}
	}
}
