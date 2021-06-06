export default {
	props: {
		// 标签类型info、primary、success、warning、error
		type: {
			type: String,
			default: 'primary'
		},
		disabled: {
			type: [Boolean, String],
			default: false
		},
		// 标签的大小，large，medium，mini
		size: {
			type: String,
			default: 'medium'
		},
		// tag的形状，circle（两边半圆形）, square（方形，带圆角）
		shape: {
			type: String,
			default: 'square'
		},
		// 标签文字
		text: {
			type: [String, Number],
			default: ''
		},
		// 背景颜色，默认为空字符串，即不处理
		bgColor: {
			type: String,
			default: ''
		},
		// 标签字体颜色，默认为空字符串，即不处理
		color: {
			type: String,
			default: ''
		},
		// 镂空形式标签的边框颜色
		borderColor: {
			type: String,
			default: ''
		},
		// 关闭按钮图标的颜色
		closeColor: {
			type: String,
			default: ''
		},
		// 点击时返回的索引值，用于区分例遍的数组哪个元素被点击了
		name: {
			type: [Number, String],
			default: ''
		},
		// // 模式选择，dark|light|plain
		// mode: {
		// 	type: String,
		// 	default: 'light'
		// },
		// 镂空时是否填充背景色
		plainFill: {
			type: Boolean,
			default: false
		},
		// 是否镂空
		plain: {
			type: Boolean,
			default: false
		},
		// 是否可关闭
		closable: {
			type: Boolean,
			default: false
		},
		// 是否显示
		show: {
			type: Boolean,
			default: true
		},
		// 内置图标，或绝对路径的图片
		icon: {
			type: String,
			default: ''
		}
	},
}