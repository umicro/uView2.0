export default {
	props: {
		// 显示文字
		title: {
			type: String,
			default: ''
		},
		// 主题，success/warning/info/error
		type: {
			type: String,
			default: 'warning'
		},
		// 辅助性文字
		description: {
			type: String,
			default: ''
		},
		// 是否可关闭
		closable: {
			type: Boolean,
			default: false
		},
		// 关闭按钮自定义文本
		closeText: {
			type: String,
			default: ''
		},
		// 是否显示图标
		showIcon: {
			type: Boolean,
			default: false
		},
		// 文字颜色，如果定义了color值，icon会失效
		color: {
			type: String,
			default: ''
		},
		// 背景颜色
		bgColor: {
			type: String,
			default: ''
		},
		// 边框颜色
		borderColor: {
			type: String,
			default: ''
		},
		// 左边显示的icon
		icon: {
			type: String,
			default: ''
		},
		// icon的样式
		iconStyle: {
			type: Object,
			default () {
				return {}
			}
		},
		// 标题的样式
		titleStyle: {
			type: Object,
			default () {
				return {}
			}
		},
		// 描述文字的样式
		descStyle: {
			type: Object,
			default () {
				return {}
			}
		},
		// 浅或深色调，light-浅色，dark-深色
		effect: {
			type: String,
			default: 'light'
		}
	},
}