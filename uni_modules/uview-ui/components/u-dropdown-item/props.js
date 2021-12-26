export default {
    props: {
		//2.0
		top: {
			type:String,
			default:'126px'
		},
        // 当前选中项的value值 1.0 2.0
        value: {
            type: [Number, String, Array],
            default: ''
        },
        // 菜单项标题 1.0 2.0
        title: {
            type: [String, Number],
            default: ''
        },
        // 选项数据，如果传入了默认slot，此参数无效 1.0 2.0
        options: {
            type: Array,
            default() {
                return []
            }
        },
        // 是否禁用此菜单项 1.0 2.0
        disabled: {
            type: Boolean,
            default: false
        },
        // 下拉弹窗的高度 1.0 2.0
        height: {
            type: [Number, String],
            default: 'auto'
        },
        // 点击遮罩是否可以收起弹窗 2.0
        closeOnClickOverlay: {
            type: Boolean,
            default: true
        }
    }
}
