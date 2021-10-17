export default {
	props: {
		// 默认的显示占位高度
		showHeight: {
			type: [String, Number],
			default: uni.$u.props.readMore.showHeight,
		},
		// 展开后是否显示"收起"按钮
		toggle: {
			type: Boolean,
			default: uni.$u.props.readMore.toggle,
		},
		// 关闭时的提示文字
		closeText: {
			type: String,
			default: uni.$u.props.readMore.closeText,
		},
		// 展开时的提示文字
		openText: {
			type: String,
			default: uni.$u.props.readMore.openText,
		},
		// 提示的文字颜色
		color: {
			type: String,
			default: uni.$u.props.readMore.color,
		},
		// 提示文字的大小
		fontSize: {
			type: [String, Number],
			default: uni.$u.props.readMore.fontSize,
		},
		// 是否显示阴影
		shadowStyle: {
			type: Object,
			default : uni.$u.props.readMore.shadowStyle,
		},
		// 段落首行缩进的字符个数
		textIndent: {
			type: String,
			default:  uni.$u.props.readMore.textIndent,
		},
		// open和close事件时，将此参数返回在回调参数中
		name: {
			type: [String, Number],
			default:  uni.$u.props.readMore.name,
		}
	}
}
