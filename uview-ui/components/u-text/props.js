export default {
	props: {
		// 主题颜色
		type: {
			type: String,
			default: ''
		},
		// 是否显示
		show: {
			type: Boolean,
			default: true
		},
		// 显示的值
		text: {
			type: [Number, String],
			default: ''
		},
		// 前置图标
		prefixIcon: {
			type: String,
			default: ''
		},
		// 后置图标
		suffixIcon: {
			type: String,
			default: ''
		},
		// 文本处理的匹配模式
		// text-普通文本，price-价格，phone-手机号，name-姓名，date-日期，link-超链接
		mode: {
			type: String,
			default: ''
		},
		// mode=link下，配置的链接
		href: {
			type: String,
			default: ''
		},
		// 格式化规则
		format: {
			type: [String, Function],
			default: ''
		},
		// mode=phone时，点击文本是否拨打电话
		call: {
			type: Boolean,
			default: false
		},
		// 是否对mode=phone|name类型文本进行脱敏，用*号替换部分文本
		encrypt: {
			type: Boolean,
			default: false
		},
		// 小程序的打开方式
		openType: {
			type: String,
			default: uni.$u.props.actionSheet.openType
		},
		// 是否粗体，默认normal
		bold: {
			type: Boolean,
			default: false
		},
		// 是否块状
		block: {
			type: Boolean,
			default: false
		},
		// 文本显示的行数，如果设置，超出此行数，将会显示省略号
		lines: {
			type: [Number, String],
			default: ''
		},
		// 文本颜色
		color: {
			type: String,
			default: '#303133'
		},
		// 字体大小
		size: {
			type: [Number, String],
			default: 15
		},
		// 图标的样式
		iconStyle: {
			type: [Object, String],
			default () {
				return {
					fontSize: '15px'
				}
			}
		},
		// 是否显示金额的千分位，mode=price时有效
		precision: {
			type: Boolean,
			default: true,
		},
		// 文字装饰，下划线，中划线等，可选值 none|underline|line-through
		decoration: {
			tepe: String,
			default: 'none'
		},
		// 外边距，对象、字符串，数值形式均可
		margin: {
			type: [Object, Number, String],
			default: 0
		},
		// 文本行高
		lineHeight: {
			type: [Number, String],
			default: ''
		},
		// 文本对齐方式，可选值left|center|right
		align: {
			type: String,
			default: 'left'
		},
		// 文字换行，可选值break-word|normal|anywhere
		wordWrap: {
			type: String,
			default: 'normal'
		}
	}
}
