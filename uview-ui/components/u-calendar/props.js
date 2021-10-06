export default {
	props: {
		// 日历顶部标题
		title: {
			type: String,
			default: uni.$u.props.calendar.title
		},
		// 是否显示标题
		showTitle: {
			type: Boolean,
			default: uni.$u.props.calendar.showTitle
		},
		// 是否显示副标题
		showSubtitle: {
			type: Boolean,
			default: uni.$u.props.calendar.showSubtitle
		},
		// 日期类型选择，single-选择单个日期，multiple-可以选择多个日期，range-选择日期范围
		mode: {
			type: String,
			default: uni.$u.props.calendar.mode
		},
		// mode=range时，第一个日期底部的提示文字
		startText: {
			type: String,
			default: uni.$u.props.calendar.startText
		},
		// mode=range时，最后一个日期底部的提示文字
		endText: {
			type: String,
			default: uni.$u.props.calendar.endText
		},
		// 自定义列表
		customList: {
			type: Array,
			default: uni.$u.props.calendar.customList,
		},
		// 主题色，对底部按钮和选中日期有效
		color: {
			type: String,
			default: uni.$u.props.calendar.color
		},
		// 最小的可选日期
		minDate: {
			type: [String, Number],
			default: uni.$u.props.calendar.minDate
		},
		// 最大可选日期
		maxDate: {
			type: [String, Number],
			default: uni.$u.props.calendar.maxDate
		},
		// 默认选中的日期，mode为multiple或range是必须为数组格式
		defaultDate: {
			type: [Array, String, Date],
			default: uni.$u.props.calendar.defaultDate
		},
		// mode=multiple时，最多可选多少个日期
		maxCount: {
			type: [String, Number],
			default: uni.$u.props.calendar.maxCount
		},
		// 日期行高
		rowHeight: {
			type: [String, Number],
			default: uni.$u.props.calendar.rowHeight
		},
		// 日期格式化函数
		formatter: {
			type: Function,
			default: uni.$u.props.calendar.formatter
		},
		// 是否显示农历
		showLunar: {
			type: Boolean,
			default: uni.$u.props.calendar.showLunar
		},
		// 是否显示月份背景色
		showMark: {
			type: Boolean,
			default: uni.$u.props.calendar.showMark
		},
		// 确定按钮的文字
		confirmText: {
			type: String,
			default: uni.$u.props.calendar.confirmText
		},
		// 确认按钮处于禁用状态时的文字
		confirmDisabledText: {
			type: String,
			default: uni.$u.props.calendar.confirmDisabledText
		},
		// 是否显示日历弹窗
		show: {
			type: Boolean,
			default: uni.$u.props.calendar.show
		},
		// 是否允许点击遮罩关闭日历
		closeOnClickOverly: {
			type: Boolean,
			default: uni.$u.props.calendar.closeOnClickOverly
		}
	}
}