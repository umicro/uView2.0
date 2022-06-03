export default {
    props: {
        // 文字颜色
        color: {
            type: String,
            default: uni.$u.props.link.color
        },
        // 字体大小，单位px
        fontSize: {
            type: [String, Number],
            default: uni.$u.props.link.fontSize
        },
        // 是否显示下划线
        underLine: {
            type: Boolean,
            default: uni.$u.props.link.underLine
        },
        // 要跳转的链接
        href: {
            type: String,
            default: uni.$u.props.link.href
        },
        // 小程序中复制到粘贴板的提示语
        mpTips: {
            type: String,
            default: uni.$u.props.link.mpTips
        },
        // 下划线颜色
        lineColor: {
            type: String,
            default: uni.$u.props.link.lineColor
        },
        // 超链接的问题，不使用slot形式传入，是因为nvue下无法修改颜色
        text: {
            type: String,
            default: uni.$u.props.link.text
        },
        // 该属性指定在何处显示链接的资源（仅在 H5 端可用，默认值：_blank）
        target: {
            type: String,
            default: uni.$u.props.link.target,
			validator: function(value) {
				return ['_blank', '_self', '_parent', '_top'].indexOf(value) !== -1
			}
        }
    }
}
