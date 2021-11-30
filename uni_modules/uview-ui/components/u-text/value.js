export default {
    computed: {
        // 经处理后需要显示的值
        value() {
            const {
                text,
                mode,
                format,
                href
            } = this
            // 价格类型
            if (mode === 'price') {
                // 如果text不为金额进行提示
                !uni.$u.test.amount(text) && uni.$u.error('金额模式下，text参数需要为金额格式')
                // 进行格式化，判断用户传入的format参数为正则，或者函数，如果没有传入format，则使用默认的金额格式化处理
                if (uni.$u.test.func(format)) {
                    // 如果用户传入的是函数，使用函数格式化
                    return format(text)
                }
                // 如果format非正则，非函数，则使用默认的金额格式化方法进行操作
                return uni.$u.priceFormat(text, 2)
            } if (mode === 'date') {
                // 判断是否合法的日期或者时间戳
                !uni.$u.test.date(text) && uni.$u.error('日期模式下，text参数需要为日期或时间戳格式')
                // 进行格式化，判断用户传入的format参数为正则，或者函数，如果没有传入format，则使用默认的格式化处理
                if (uni.$u.test.func(format)) {
                    // 如果用户传入的是函数，使用函数格式化
                    return format(text)
                } if (this.formart) {
                    // 如果format非正则，非函数，则使用默认的时间格式化方法进行操作
                    return uni.$u.timeFormat(text, format)
                }
                // 如果没有设置format，则设置为默认的时间格式化形式
                return uni.$u.timeFormat(text, 'yyyy-mm-dd')
            } if (mode === 'phone') {
                // 判断是否合法的手机号
                !uni.$u.test.mobile(text) && uni.$u.error('手机号模式下，text参数需要为手机号码格式')
                if (uni.$u.test.func(format)) {
                    // 如果用户传入的是函数，使用函数格式化
                    return format(text)
                } if (format === 'encrypt') {
                    // 如果format为encrypt，则将手机号进行星号加密处理
                    return `${text.substr(0, 3)}****${text.substr(7)}`
                }
                return text
            } if (mode === 'name') {
                // 判断是否合法的字符粗
                !(typeof (text) === 'string') && uni.$u.error('姓名模式下，text参数需要为字符串格式')
                if (uni.$u.test.func(format)) {
                    // 如果用户传入的是函数，使用函数格式化
                    return format(text)
                } if (format === 'encrypt') {
                    // 如果format为encrypt，则将姓名进行星号加密处理
                    return text.replace(/(?<=.)./g, '*').substring(0, 3)
                }
                return text
            } if (mode === 'link') {
                // 判断是否合法的字符粗
                !uni.$u.test.url(href) && uni.$u.error('超链接模式下，href参数需要为URL格式')
                return text
            }
            return text
        }
    }
}
