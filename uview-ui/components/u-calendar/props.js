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
			type: Number,
			default: 0
		},
		// 最大可选日期
		maxDate: {
			type: Number,
			default: 0
		},
		// 默认选中的日期，mode为multiple或range是必须为数组格式
		defaultDate: {
			type: [Number, Array],
			default: 0
		},
		// 日期行高
		rowHeight: {
			type: [String, Number],
			default: 60
		},
		// 日期格式化函数
		formatter: {
			type: Function,
			default: () => {}
		},
		// 是否显示月份背景色
		showMark: {
			type: Boolean,
			default: true
		},
		// 是否显示确认按钮
		showConfirm: {
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
		// 是否展示确定按钮，如不展示，则进行快捷选择
		showConfirm: {
			type: Boolean,
			default: true
		},
		// 是否显示日历弹窗
		show: {
			type: Boolean,
			default: false
		}
	}
}