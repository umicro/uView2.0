<template>
	<!-- #ifndef APP-NVUE -->
	<button
	 :hover-start-time="Number(hoverStartTime)"
	 :hover-stay-time="Number(hoverStayTime)"
	 :form-type="formType"
	 :open-type="openType"
	 :app-parameter="appParameter"
	 :hover-stop-propagation="hoverStopPropagation"
	 :send-message-title="sendMessageTitle"
	 send-message-path="sendMessagePath"
	 :lang="lang"
	 :data-name="dataName"
	 :session-from="sessionFrom"
	 :send-message-img="sendMessageImg"
	 :show-message-card="showMessageCard"
	 @getphonenumber="getphonenumber"
	 @getuserinfo="getuserinfo"
	 @error="error"
	 @opensetting="opensetting"
	 @launchapp="launchapp"
	 hover-class="u-button--active"
	 class="u-button u-reset-button"
	 :style="[baseColor, customStyle]"
	 @tap="clickHandler"
	 :class="bemClass">
		<template v-if="loading">
			<u-loading-icon :mode="loadingMode" :size="loadingSize" :color="loadingColor"></u-loading-icon>
			<text class="u-button__loading-text">{{ loadingText }}</text>
		</template>
		<template v-else>
			<u-icon v-if="icon" :name="icon" :color="iconColor"></u-icon>
			<slot>
				<text class="u-button__text">{{text}}</text>
			</slot>
		</template>
	</button>
	<!-- #endif -->

	<!-- #ifdef APP-NVUE -->
	<view
	 :hover-start-time="Number(hoverStartTime)"
	 :hover-stay-time="Number(hoverStayTime)"
	 class="u-button"
	 hover-class="u-button--active"
	 :style="[baseColor, customStyle]"
	 @tap="clickHandler"
	 :class="bemClass">
		<template v-if="loading">
			<u-loading-icon :mode="loadingMode" :size="loadingSize" :color="loadingColor"></u-loading-icon>
			<text class="u-button__loading-text" :style="[nvueTextStyle]" :class="[plain && `u-button__text--plain--${type}`]">{{ loadingText }}</text>
		</template>
		<template v-else>
			<u-icon v-if="icon" :name="icon" :color="iconColor" size="18"></u-icon>
			<text class="u-button__text" :style="[{
				marginLeft: icon ? '2px' : 0
			}, nvueTextStyle]" :class="[plain && `u-button__text--plain--${type}`]">{{text}}</text>
		</template>
	</view>
	<!-- #endif -->
</template>

<script>
	export default {
		props: {
			// 是否细边框
			hairline: {
				type: Boolean,
				default: uni.$u.props.button.hairline
			},
			// 按钮的预置样式，info，primary，error，warning，success
			type: {
				type: String,
				default: uni.$u.props.button.type
			},
			// 按钮尺寸，normal，default，medium，mini
			size: {
				type: String,
				default: uni.$u.props.button.size
			},
			// 按钮形状，circle（两边为半圆），square（带圆角）
			shape: {
				type: String,
				default: uni.$u.props.button.shape
			},
			// 按钮是否镂空
			plain: {
				type: Boolean,
				default: uni.$u.props.button.plain
			},
			// 是否禁止状态
			disabled: {
				type: Boolean,
				default: uni.$u.props.button.disabled
			},
			// 是否加载中
			loading: {
				type: Boolean,
				default: uni.$u.props.button.loading
			},
			// 加载中提示文字
			loadingText: {
				type: [String, Number],
				default: uni.$u.props.button.loadingText
			},
			// 加载状态图标类型
			loadingMode: {
				type: String,
				default: uni.$u.props.button.loadingMode
			},
			// 加载图标大小
			loadingSize: {
				type: [String, Number],
				default: uni.$u.props.button.loadingSize
			},
			// 开放能力，具体请看uniapp稳定关于button组件部分说明
			// https://uniapp.dcloud.io/component/button
			openType: {
				type: String,
				default: uni.$u.props.button.openType
			},
			// 用于 <form> 组件，点击分别会触发 <form> 组件的 submit/reset 事件
			// 取值为submit（提交表单），reset（重置表单）
			formType: {
				type: String,
				default: uni.$u.props.button.formType
			},
			// 打开 APP 时，向 APP 传递的参数，open-type=launchApp时有效
			// 只微信小程序、QQ小程序有效
			appParameter: {
				type: String,
				default: uni.$u.props.button.appParameter
			},
			// 指定是否阻止本节点的祖先节点出现点击态，微信小程序有效
			hoverStopPropagation: {
				type: Boolean,
				default: uni.$u.props.button.hoverStopPropagation
			},
			// 指定返回用户信息的语言，zh_CN 简体中文，zh_TW 繁体中文，en 英文。只微信小程序有效
			lang: {
				type: String,
				default: uni.$u.props.button.lang
			},
			// 会话来源，open-type="contact"时有效。只微信小程序有效
			sessionFrom: {
				type: String,
				default: uni.$u.props.button.sessionFrom
			},
			// 会话内消息卡片标题，open-type="contact"时有效
			// 默认当前标题，只微信小程序有效
			sendMessageTitle: {
				type: String,
				default: uni.$u.props.button.sendMessageTitle
			},
			// 会话内消息卡片点击跳转小程序路径，open-type="contact"时有效
			// 默认当前分享路径，只微信小程序有效
			sendMessagePath: {
				type: String,
				default: uni.$u.props.button.sendMessagePath
			},
			// 会话内消息卡片图片，open-type="contact"时有效
			// 默认当前页面截图，只微信小程序有效
			sendMessageImg: {
				type: String,
				default: uni.$u.props.button.sendMessageImg
			},
			// 是否显示会话内消息卡片，设置此参数为 true，用户进入客服会话会在右下角显示"可能要发送的小程序"提示，
			// 用户点击后可以快速发送小程序消息，open-type="contact"时有效
			showMessageCard: {
				type: Boolean,
				default: uni.$u.props.button.showMessageCard
			},
			// 额外传参参数，用于小程序的data-xxx属性，通过target.dataset.name获取
			dataName: {
				type: String,
				default: uni.$u.props.button.dataName
			},
			// 节流，一定时间内只能触发一次
			throttleTime: {
				type: [String, Number],
				default: uni.$u.props.button.throttleTime
			},
			// 按住后多久出现点击态，单位毫秒
			hoverStartTime: {
				type: [String, Number],
				default: uni.$u.props.button.hoverStartTime
			},
			// 手指松开后点击态保留时间，单位毫秒
			hoverStayTime: {
				type: [String, Number],
				default: uni.$u.props.button.hoverStayTime
			},
			// 按钮文字，之所以通过props传入，是因为slot传入的话
			// nvue中无法控制文字的样式
			text: {
				type: [String, Number],
				default: uni.$u.props.button.text
			},
			// 按钮图标
			icon: {
				type: String,
				default: uni.$u.props.button.icon
			},
			// 按钮颜色，支持传入linear-gradient渐变色
			color: {
				type: String,
				default: uni.$u.props.button.color
			}
		},
		mixins: [uni.$u.mixin],
		data() {
			return {};
		},
		computed: {
			// 生成bem风格的类名
			bemClass() {
				// this.bem为一个computed变量，在mixin中
				return this.bem('button', ['type', 'shape', 'size'], ['disabled', 'plain', 'hairline'])
			},
			loadingColor() {
				if (this.plain) {
					// 如果有设置color值，则用color值，否则使用type主题颜色
					return this.color ? this.color : this.$u.config.color[`u-${this.type}`];
				}
				if (this.type === 'info') {
					return '#c9c9c9';
				}
				return 'rgb(255, 255, 255)';
			},
			iconColor() {
				// 如果是镂空状态，设置了color就用color值，否则使用主题颜色，
				// u-icon的color能接受一个主题颜色的值
				if (this.plain) {
					return this.color ? this.color : this.type;
				} else {
					return '#ffffff';
				}
			},
			baseColor() {
				let style = {};
				if (this.color) {
					// 针对自定义了color颜色的情况，镂空状态下，就是用自定义的颜色
					style.color = this.plain ? this.color : 'white'
					if (!this.plain) {
						// 非落空，背景色使用自定义的颜色
						style.backgroundColor = this.color
					}
					if (this.color.indexOf('gradient') !== -1) {
						// 如果自定义的颜色为渐变色，不显示边框，以及通过backgroundImage设置渐变色
						style.borderWidth = 0
						if (!this.plain) {
							style.backgroundImage = this.color
						}
					} else {
						// 非渐变色，则设置边框相关的属性
						style.borderColor = this.color
						style.borderWidth = '1px'
						style.borderStyle = 'solid'
					}
				}
				return style
			},
			// nvue版本按钮的字体不会继承父组件的颜色，需要对每一个text组件进行单独的设置
			nvueTextStyle() {
				let style = {}
				// 针对自定义了color颜色的情况，镂空状态下，就是用自定义的颜色
				if (this.type === 'info') {
					style.color = '#323233';
				}
				if(this.color) {
					style.color = this.plain ? this.color : 'white'
				}
				return style
			}
		},
		created() {

		},
		methods: {
			clickHandler() {
				// 非禁止并且非加载中，才能点击
				if (!this.disabled && !this.loading) {
					this.$emit('click');
				}
			},
			// 下面为对接uniapp官方按钮开放能力事件回调的对接
			getphonenumber(res) {
				this.$emit('getphonenumber', res);
			},
			getuserinfo(res) {
				this.$emit('getuserinfo', res);
			},
			error(res) {
				this.$emit('error', res);
			},
			opensetting(res) {
				this.$emit('opensetting', res);
			},
			launchapp(res) {
				this.$emit('launchapp', res);
			}
		}
	};
</script>

<style lang="scss">
	@import "../../libs/css/components.scss";
	
	/* #ifndef APP-NVUE */
	@import "./vue.scss";
	/* #endif */
	
	/* #ifdef APP-NVUE */
	@import "./nvue.scss";
	/* #endif */

	.u-button {
		height: 44px;
		position: relative;
		align-items: center;
		justify-content: center;
		@include flex;
		/* #ifndef APP-NVUE */
		box-sizing: border-box;
		/* #endif */
		flex-direction: row;

		&__text {
			font-size: 15px;
		}
		
		&__loading-text {
			font-size: 15px;
			margin-left: 4px;
		}

		&--large {
			width: 100%;
			height: 50px;
		}

		&--normal {
			padding: 0 15px;
			font-size: 14px;
		}

		&--small {
			/* #ifndef APP-NVUE */
			min-width: 60px;
			/* #endif */
			height: 30px;
			padding: 0 8px;
			font-size: 12px;
		}

		&--mini {
			height: 22px;
			font-size: 10px;
			/* #ifndef APP-NVUE */
			min-width: 50px;
			display: inline-block;
			/* #endif */
		}

		&--disabled {
			opacity: .5;
		}

		&--info {
			color: #323233;
			background-color: #fff;
			border-color: #ebedf0;
			border-width: 1px;
			border-style: solid;
		}

		&--success {
			color: #fff;
			background-color: $u-success;
			border-color: $u-success;
			border-width: 1px;
			border-style: solid;
		}

		&--primary {
			color: #fff;
			background-color: $u-primary;
			border-color: $u-primary;
			border-width: 1px;
			border-style: solid;
		}

		&--error {
			color: #fff;
			background-color: $u-error;
			border-color: $u-error;
			border-width: 1px;
			border-style: solid;
		}

		&--warning {
			color: #fff;
			background-color: $u-warning;
			border-color: $u-warning;
			border-width: 1px;
			border-style: solid;
		}

		&--block {
			@include flex;
			width: 100%
		}

		&--circle {
			border-top-right-radius: 100px;
			border-top-left-radius: 100px;
			border-bottom-left-radius: 100px;
			border-bottom-right-radius: 100px;
		}

		&--square {
			border-bottom-left-radius: 3px;
			border-bottom-right-radius: 3px;
			border-top-left-radius: 3px;
			border-top-right-radius: 3px;
		}

		&__icon {
			/* #ifndef APP-NVUE */
			min-width: 1em;
			line-height: inherit !important;
			vertical-align: top
			/* #endif */
		}

		&--plain {
			background-color: #fff;
		}

		&--hairline {
			border-width: 0.5px !important;
		}

	}
</style>
