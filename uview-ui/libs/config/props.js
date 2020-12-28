/**
 * 此文件的作用为统一配置所有组件的props参数
 * 借此用户可以全局覆盖组件的props默认值
 * 无需在每个引入组件的页面中都配置一次
 */
import config from './config'
const {
	color
} = config
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
		timingFunction: 'ease-out'
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
		duration: 1200,
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
	},

	// loading-page组件
	loadingPage: {
		loadingText: '正在加载',
		image: '',
		loadingMode: 'circle',
		loading: false,
		bgColor: '#ffffff'
	},

	// swipe-action组件
	swipeAction: {
		show: 'none',
		disabled: false,
		autoClose: false,
		threshold: 20,
		leftOptions: [],
		rightOptions: []
	},

	// sticky组件
	sticky: {
		offsetTop: 0,
		customNavHeight: 0,
		disabled: false,
		bgColor: '#ffffff',
		zIndex: '',
		index: '',
		mode: 'auto'
	},

	// image组件
	image: {
		src: '',
		mode: 'aspectFill',
		width: '300',
		height: '225',
		shape: 'square',
		borderRadius: 0,
		lazyLoad: true,
		showMenuByLongpress: true,
		loadingIcon: 'photo',
		errorIcon: 'error-circle',
		showLoading: true,
		showError: true,
		fade: true,
		webp: false,
		duration: 500,
		bgColor: '#f3f4f6'
	},

	// radio组件
	radio: {
		name: '',
		shape: '',
		disabled: '',
		labelDisabled: '',
		activeColor: '',
		inactiveColor: '',
		iconSize: '',
		labelSize: '',
		label: '',
		labelColor: '',
		size: '',
		iconColor: '',
		placement: '',
		iconPlacement: 'left'
	},

	// radio-group组件
	radioGroup: {
		name: '',
		value: '',
		shape: 'circle',
		disabled: false,
		labelDisabled: false,
		activeColor: '#2979ff',
		inactiveColor: '#c8c9cc',
		iconSize: 11,
		placement: 'row',
		labelSize: 14,
		labelColor: '#303133',
		label: '',
		size: 18,
		iconColor: '#ffffff',
		borderBottom: false
	},

	// checkbox组件
	checkbox: {
		name: '',
		shape: '',
		disabled: '',
		labelDisabled: '',
		activeColor: '',
		inactiveColor: '',
		iconSize: '',
		labelSize: '',
		label: '',
		labelColor: '',
		size: '',
		iconColor: '',
		placement: ''
	},

	// checkbox-group组件
	checkboxGroup: {
		name: '',
		value: () => [],
		shape: 'circle',
		disabled: false,
		labelDisabled: false,
		activeColor: '#2979ff',
		inactiveColor: '#c8c9cc',
		iconSize: 11,
		placement: 'row',
		labelSize: 14,
		labelColor: '#303133',
		label: '',
		size: 18,
		iconColor: '#ffffff',
		iconPlacement: 'left',
		checked: false,
		borderBottom: false
	},

	// empty组件
	empty: {
		icon: '',
		text: '',
		textColor: '#c0c4cc',
		textSize: 14,
		iconColor: '#c0c4cc',
		iconSize: 90,
		mode: 'data',
		width: 160,
		height: 160,
		show: true,
		marginTop: 0
	},

	// backtop组件
	backtop: {
		mode: 'circle',
		icon: 'arrow-upward',
		text: '',
		duration: 100,
		scrollTop: 0,
		top: 400,
		bottom: 100,
		right: 20,
		zIndex: 9,
		iconStyle: () => {
			return {
				color: '#909399',
				fontSize: '19px'
			}
		},
	},

	// divider组件
	divider: {
		dashed: false,
		hairline: true,
		dot: false,
		textPosition: 'center',
		text: '',
		textSize: 14,
		textColor: '#909399',
		lineColor: '#dcdfe6'
	},

	// line组件
	line: {
		color: '#e4e7ed',
		length: '100%',
		direction: 'row',
		hairline: true,
		margin: 0,
		dashed: false
	},

	// rate组件
	rate: {
		value: 1,
		count: 5,
		disabled: false,
		size: 16,
		inactiveColor: '#b2b2b2',
		activeColor: '#FA3534',
		gutter: 5,
		minCount: 1,
		allowHalf: false,
		activeIcon: 'star-fill',
		inactiveIcon: 'star',
		touchable:true
	},

	// gap组件
	gap: {
		bgColor: 'transparent',
		height: 20,
		marginTop: 0,
		marginBottom: 0
	},

	// grid组件
	grid: {
		col: 3,
		border: false,
		align: 'left'
	},

	// grid-item组件
	gridItem: {
		bgColor: 'transparent'
	},

	// popup组件
	popup: {
		show: false,
		overlay: true,
		mode: 'bottom',
		duration: 300,
		borderRadis: 0,
		closeable: false,
		safeAreaInsetTop: false,
		overlayStyle: () => {},
		closeOnClickOverly: true,
		zIndex: 10075,
		safeAreaInsetBottom: true,
	},

	// overlay组件
	overlay: {
		show: false,
		zIndex: 10070,
		duration: 300,
		opacity: 0.7
	},

	// action-sheet组件
	actionSheet: {
		show: false,
		title: '',
		description: '',
		actions: () => [],
		index: '',
		cancelText: '',
		closeOnClickAction: true,
		safeAreaInsetBottom: true,
		openType: '',
		closeOnClickOverly: true
	},

	// toast组件
	toast: {
		zIndex: 10090,
		loading: false,
		text: '',
		icon: '',
		type: '',
		loadingMode: '',
		show: '',
		overlay: false,
		position: 'center',
		params: () => {},
		duration: 2000,
		isTab: false,
		url: '',
		callback: null,
		back: false
	},

	// subsection组件
	subsection: {

	},
	//u-section组件
	section: {
		title: '',
		subTitle: '更多',
		right: true,
		fontSize: 15,
		bold: true,
		color: '#303133',
		subColor: '#909399',
		showLine: true,
		lineColor: '',
		arrow: true
	},

	// 键盘组件
	keyboard: {
		mode: 'number',
		dotDisabled: false,
		tooltip: true,
		showTips: true,
		tips: '',
		showCancel: true,
		showConfirm: true,
		random: false,
		safeAreaInsetBottom: true,
		closeOnClickOverly: true,
		show: false,
		overlay: true,
		zIndex: 10075,
		cancelText: '取消',
		confirmText: '确定'
	},
	
	// 数字键盘
	numberKeyboard: {
		mode: 'number',
		dotDisabled: false,
		random: false
	},
	
	// 车牌号键盘
	carKeyboard: {
		random: false
	},
	
	//slider组件
	 slider:{
		 value:0,
		 disabled:false,
		 blockHeight:15,
		 min:0,
		 max:100,
		 step:1,
		 height:10,
		 activeColor:'#2979ff',
		 inactiveColor:'#c0c4cc',
		 blockColor:'#ffffff', 
		 blockStyle:() => {},
		 }
}