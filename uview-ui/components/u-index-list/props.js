export default {
	props: {
		// 右边锚点非激活的颜色
		inactiveColor: {
			type: String,
			default: '#606266'
		},
		// 右边锚点激活的颜色
		activeColor: {
			type: String,
			default: '#5677fc'
		},
		// 索引字符列表，数组形式
		indexList: {
			type: Array,
			default() {
				return []
			}
		},
		// 是否开启锚点自动吸顶
		sticky: {
			type: Boolean,
			default: true
		},
		// 自定义导航栏的高度
		customNavHeight: {
			type: [String, Number],
			default: 0
		}
	}
}