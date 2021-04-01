export default {
	props: {
		// 是否展示picker弹窗
		show: {
			type: Boolean,
			default: false
		},
		// 是否展示顶部的操作栏
		showToolbar: {
			type: Boolean,
			default: true
		},
		// 顶部标题
		title: {
			type: String,
			default: ''
		},
		// 对象数组，设置每一列的数据
		columns: {
			type: Array,
			default: () => []
		},
		// 是否显示加载中状态
		loading: {
			type: Boolean,
			default: false
		},
		// 各列中，单个选项的高度
		itemHeight: {
			type: [String, Number],
			default: 44
		},
		// 取消按钮的文字
		cancelText: {
			type: String,
			default: '取消'
		},
		// 确认按钮的文字
		confirmText: {
			type: String,
			default: '取消'
		},
		// 取消按钮的颜色
		cancelColor: {
			type: String,
			default: '#909193'
		},
		// 确认按钮的颜色
		confirmColor: {
			type: String,
			default: '#3c9cff'
		},
		// 选择器只有一列时，默认选中项的索引，从0开始 
		singleIndex: {
			type: [Number, String],
			default: 0
		},
		// 每列中可见选项的数量
		visibleItemCount: {
			type: [Number, String],
			default: 5
		},
		// 选项对象中，需要展示的属性键名
		keyName: {
			type: String,
			default: 'text'
		},
		// 是否允许点击遮罩关闭选择器
		closeOnClickOverly: {
			type: Boolean,
			default: false
		}
	}
}
