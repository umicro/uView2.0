export default {
    props: {
        // 轮播的长度
        length: {
            type: [String, Number],
            default: uni.$u.props.swipterIndicator.length
        },
        // 当前处于活动状态的轮播的索引
        current: {
            type: [String, Number],
            default: uni.$u.props.swipterIndicator.current
        },
        // 指示器非激活颜色
        indicatorActiveColor: {
            type: String,
            default: uni.$u.props.swipterIndicator.indicatorActiveColor
        },
        // 指示器的激活颜色
        indicatorInactiveColor: {
            type: String,
            default: uni.$u.props.swipterIndicator.indicatorInactiveColor
        },
        // 指示器的形式，line-线型，dot-点型
        indicatorStyle: {
            type: String,
            default: uni.$u.props.swipterIndicator.indicatorStyle
        }
    }
}
