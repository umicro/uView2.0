export default {
	props: {
		// flex排列方式
		direction: {
			type: String,
			// #ifdef APP-NVUE
			default: 'column'
			// #endif
			// #ifndef APP-NVUE
			default: 'row'
			// #endif
		},
		// direction的简写
		d: {
			type: String,
			// #ifdef APP-NVUE
			default: 'column'
			// #endif
			// #ifndef APP-NVUE
			default: 'row'
			// #endif
		},
		// 展示类型
		display: {
			type: String,
			default: ''
		},
		// 主轴排列方式
		justifyContent: {
			type: String,
			default: 'flex-start'
		},
		// justifyContent的简写
		jc: {
			type: String,
			default: 'flex-start'
		},
		// 纵轴排列方式
		align-items: {
			type: String,
			default: 'stretch'
		},
		// align-items的简写
		ai: {
			type: String,
			default: 'stretch'
		}
	} 
}
