export default {
	props: {
		// 默认的显示占位高度
		showHeight: {
			type: [Number, String],
			default: 400
		},
		// 展开后是否显示"收起"按钮
		toggle: {
			type: Boolean,
			default: false
		},
		// 关闭时的提示文字
		closeText: {
			type: String,
			default: '展开阅读全文'
		},
		// 展开时的提示文字
		openText: {
			type: String,
			default: '收起'
		},
		// 提示的文字颜色
		color: {
			type: String,
			default: '#2979ff'
		},
		// 提示文字的大小
		fontSize: {
			type: [String, Number],
			default: 14
		},
		// 是否显示阴影
		shadowStyle: {
			type: Object,
			default () {
				return {
					// #ifndef APP-NVUE
					backgroundImage: "linear-gradient(-180deg, rgba(255, 255, 255, 0) 0%, #fff 80%)",
					// #endif
					// #ifdef APP-NVUE
					// nvue上不支持设置复杂的backgroundImage属性
					backgroundImage: "linear-gradient(to top, #fff, rgba(255, 255, 255, 0.5))",
					// #endif
					paddingTop: "100px",
					marginTop: "-100px",
				}
			}
		},
		// 段落首行缩进的字符个数
		textIndent: {
			type: String,
			default: '2em'
		},
		// open和close事件时，将此参数返回在回调参数中
		name: {
			type: [Number, String],
			default: ''
		}
	}
}
