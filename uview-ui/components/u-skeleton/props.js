export default {
	props: {
		// 是否展示骨架组件
		loading: {
			type: Boolean,
			default: uni.$u.props.skeleton.loading,
		},
		// 是否开启动画效果
		animate: {
			type: Boolean,
			default: uni.$u.props.skeleton.animate,
		},
		// 段落占位图行数
		rows: {
			type: [Number, String],
			default: uni.$u.props.skeleton.rows,
		},
		// 段落占位图的宽度
		rowsWidth: {
			type: [Number, String, Array],
			default: uni.$u.props.skeleton.rowsWidth,
		},
		// 段落标题的宽度
		titleWidth: {
			type: [Number, String],
			default: uni.$u.props.skeleton.titleWidth,
		},
		// 段落标题的高度
		titleHeight: {
			type: [Number, String],
			default: uni.$u.props.skeleton.titleHeight,
		},
		// 段落占位图的高度
		rowsHeight: {
			type: [Number, String, Array],
			default: uni.$u.props.skeleton.rowsHeight,
		},
		// 是否展示标题占位图
		title: {
			type: Boolean,
			default: uni.$u.props.skeleton.title,
		},
		// 是否展示头像占位图
		avatar: {
			type: Boolean,
			default: uni.$u.props.skeleton.avatar,
		},
		// 头像占位图大小
		avatarSize: {
			type: [Number, String],
			default: uni.$u.props.skeleton.avatarSize,
		},
		// 头像占位图的形状，circle-圆形，square-方形
		avatarShape: {
			type: String,
			default: uni.$u.props.skeleton.avatarShape,
		}
	}
}