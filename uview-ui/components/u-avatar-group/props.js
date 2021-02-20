export default {
	props: {
		// 头像图片组
		urls: {
			type: Array,
			default() {
				return []
			}
		},
		// 最多展示的头像数量
		maxCount: {
			type: [Number, String],
			default: 5
		},
		// 头像形状
		shape: {
			type: String,
			default: "circle"
		},
		// 图片裁剪模式
		mode: {
			type: String,
			default: "scaleToFill"
		},
		// 超出maxCount时是否显示查看更多的提示
		showMore: {
			type: Boolean,
			default: true
		},
		// 头像大小
		size: {
			type: [Number, String],
			default: 40
		},
		// 指定从数组的对象元素中读取哪个属性作为图片地址
		keyName: {
			type: String,
			default: ''
		}
	}
}