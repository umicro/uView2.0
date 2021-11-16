export default {
    props: {
        // z-index值
        zIndex: {
            type: [String, Number],
            default: uni.$u.props.toast.zIndex
        },
        // 是否加载中
        loading: {
            type: Boolean,
            default: uni.$u.props.toast.loading
        },
        // 显示的文字内容
        text: {
            type: [String, Number],
            default: uni.$u.props.toast.text
        },
        // 图标，或者绝对路径的图片
        icon: {
            type: String,
            default: uni.$u.props.toast.icon
        },
        // 主题类型
        type: {
            type: String,
            default: uni.$u.props.toast.type
        },
        // 是否显示透明遮罩，防止点击穿透
        overlay: {
            type: Boolean,
            default: uni.$u.props.toast.overlay
        },
        // 位置
        position: {
            type: String,
            default: uni.$u.props.toast.position
        },
        // 跳转的参数
        params: {
            type: Object,
            default: uni.$u.props.toast.params
        },
        // 展示时间，单位ms
        duration: {
            type: [String, Number],
            default: uni.$u.props.toast.duration
        },
        // 是否返回的为tab页面
        isTab: {
            type: Boolean,
            default: uni.$u.props.toast.isTab
        },
        // toast消失后是否跳转页面，有则跳转，优先级高于back参数
        url: {
            type: String,
            default: uni.$u.props.toast.url
        },
        // 执行完后的回调函数
        callback: {
            type: [Function, null],
            default: uni.$u.props.toast.callback
        },
        // 结束toast是否自动返回上一页
        back: {
            type: Boolean,
            default: uni.$u.props.toast.back
        }
    }
}
