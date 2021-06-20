export default {
	props: {
		// 是否展示骨架组件
		loading: {
			type: Boolean,
			default: true
		},
		// 是否开启动画效果
		animate: {
			type: Boolean,
			default: true
		},
		// 段落占位图行数
		rows: {
			type: [Number, String],
			default: 0
		},
		// 段落占位图的宽度
		rowsWidth: {
			type: [Number, String, Array],
			default: '100%'
		},
		// 段落标题的宽度
		titleWidth: {
			type: [Number, String],
			default: '50%'
		},
		// 段落标题的高度
		titleHeight: {
			type: [Number, String],
			default: '18px'
		},
		// 段落占位图的高度
		rowsHeight: {
			type: [Number, String, Array],
			default: 18
		},
		// 是否展示标题占位图
		title: {
			type: Boolean,
			default: true
		},
		// 是否展示头像占位图
		avatar: {
			type: Boolean,
			default: false
		},
		// 头像占位图大小
		avatarSize: {
			type: [Number, String],
			default: 32
		},
		// 头像占位图的形状，circle-圆形，square-方形
		avatarShape: {
			type: String,
			default: 'circle'
		}
	}
}