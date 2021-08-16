export default {
	props: {
		// 激活部分的颜色
		activeColor: {
			type: String,
			default: '#19be6b'
		},
		inactiveColor: {
			type: String,
			default: '#ececec'
		},
		// 进度百分比，数值
		percentage: {
			type: [Number, String],
			default: 0
		},
		// 是否在进度条内部显示百分比的值
		showText: {
			type: Boolean,
			default: true
		},
		// 进度条的高度，单位px
		height: {
			type: [Number, String],
			default: 12
		},
	},
}