/**
 * 此文件的作用为统一配置所有组件的props参数
 * 借此用户可以全局覆盖组件的props默认值
 * 无需在每个引入组件的页面中都配置一次
 */
import config from './config'
const {color} = config
export default {
	// icon组件
	icon: {
		name: '',
		size: '16px',
		color: color['u-content-color'],
		bold: false,
		index: '',
		hoverClass: '',
		customPrefix: 'uicon',
		label: '',
		labelPos: 'right',
		labelSize: '15px',
		labelColor: color['u-content-color'],
		space: '3px',
		imgMode: 'widthFix',
		customStyle: {},
		width: '',
		height: '',
		top: 0,
		stop: false
	},
	
	// transition动画组件的props
	transition: {
		show: true,
		mode: 'fade',
		duration: '300',
		customStyle: {},
		timingFunction: 'linear'
	},
	
	// cell组件的props
	cell: {
		customClass: '',
		customStyle: {},
		title: '',
		label: '',
		value: '',
		icon: '',
		titleWidth: '',
		border: true,
		center: false,
		url: '',
		linkType: 'navigateTo',
		clickable: false,
		isLink: false,
		required: false,
		arrowDirection: '',
		rightIconStyle: {},
		rightIcon: 'arrow-right',
		titleStyle: {},
		size: '',
		stop: true
	},
	
	// cell-group组件的props
	cellGroup: {
		title: '',
		border: true
	},
	
	// img组件的props
	img: {
		src: '',
		mode: 'aspectFill',
		width: 300,
		height: 225,
		shape: 'square',
		borderRadius: 0,
		lazyLoad: true,
		showMenuByLongpress: true,
		loadingIcon: 'photo',
		errorIcon: 'error-circle',
		showLoading: true,
		showError: true,
		fade: true,
		webp: true,
		duration: 300,
		bgColor: '#f3f4f6'
	},
	
	// link超链接组件props参数
	link: {
		color: color['u-primary'],
		fontSize: 28,
		underLine: false,
		href: '',
		mpTips: '链接已复制，请在浏览器打开',
		lineColor: '',
		text: ''
	},
	
	// loading-icon加载中图标组件
	loadingIcon: {
		color: color['u-tips-color'],
		vertical: false,
		mode: 'spinner',
		size: 24,
		textSize: 15,
		text: '',
		type: '',
		timingFunction: 'ease-in-out'
	},
	
	// button组件
	button: {
		hairline: false,
		type: 'info',
		size: 'normal',
		shape: 'square',
		plain: false,
		disabled: false,
		loading: false,
		loadingText: '',
		loadingMode: 'spinner',
		loadingSize: 16,
		openType: '',
		formType: '',
		appParameter: '',
		hoverStopPropagation: true,
		lang: 'en',
		sessionFrom: '',
		sendMessageTitle: '',
		sendMessagePath: '',
		sendMessageImg: '',
		showMessageCard: false,
		dataName: '',
		throttleTime: 0,
		hoverStartTime: '',
		hoverStayTime: '',
		text: '',
		icon: '',
		color: ''
	}
}