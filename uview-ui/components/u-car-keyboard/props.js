export default {
	props: {
		// 是否打乱键盘按键的顺序
		random: {
			type: Boolean,
			default: uni.$u.props.carKeyboard.random
		}
	},
}