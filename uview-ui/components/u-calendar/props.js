export default {
	props: {
		// 日历顶部标题
		title: {
			type: String,
			default: '日期选择'
		},
		// 是否显示标题
		showTitle: {
			type: Boolean,
			default: true
		},
		// 是否显示副标题
		showSubtitle: {
			type: Boolean,
			default: true
		},
		// 日期类型选择，single-选择单个日期，multiple-可以选择多个日期，range-选择日期范围
		mode: {
			type: String,
			default: 'single'
		},
		// mode=range时，第一个日期底部的提示文字
		startText: {
			type: String,
			default: '开始'
		},
		// mode=range时，最后一个日期底部的提示文字
		endText: {
			type: String,
			default: '结束'
		},
		// 自定义列表
		customList: {
			type: Array,
			default: () => [],
		},
		// 主题色，对底部按钮和选中日期有效
		color: {
			type: String,
			default: '#3c9cff'
		},
		// 最小的可选日期
		minDate: {
			type: [Number, String],
			default: 0
		},
		// 最大可选日期
		maxDate: {
			type: [Number, String],
			default: 0
		},
		// 默认选中的日期，mode为multiple或range是必须为数组格式
		defaultDate: {
			type: [Array, String, Date],
			default: null
		},
		// mode=multiple时，最多可选多少个日期
		maxCount: {
			type: [String, Number],
			default: Infinity
		},
		// 日期行高
		rowHeight: {
			type: [String, Number],
			default: 56
		},
		// 日期格式化函数
		formatter: {
			type: Function,
			default: null
		},
		// 是否显示农历
		showLunar: {
			type: Boolean,
			default: false
		},
		// 是否显示月份背景色
		showMark: {
			type: Boolean,
			default: true
		},
		// 确定按钮的文字
		confirmText: {
			type: String,
			default: '确定'
		},
		// 确认按钮处于禁用状态时的文字
		confirmDisabledText: {
			type: String,
			default: '确定'
		},
		// 是否显示日历弹窗
		show: {
			type: Boolean,
			default: false
		},
		// 是否允许点击遮罩关闭日历
		closeOnClickOverly: {
			type: Boolean,
			default: false
		}
	}
}