<template>
	<button 
		hover-class="u-button--active"  
		class="u-button u-reset-button" 
		:lang="lang"
		@tap="clickHandler"
		:class="bemClass"
	>
		<block v-if="loading">
			<u-loading-icon :mode="loadMode" :size="loadSize"></u-loading-icon>
			<text class="u-button__loading-text">{{ loadingText }}</text>
		</block>
		<block v-else>
			<u-icon v-if="icon"></u-icon>
			<slot>
				<text class="u-button__text">{{text}}</text>
			</slot>
		</block>
	</button>
</template>

<script>
export default {
	props: {
		// 是否细边框
		hairline: {
			type: Boolean,
			default: true
		},
		// 按钮的预置样式，default，primary，error，warning，success
		type: {
			type: String,
			default: 'default'
		},
		// 按钮尺寸，normal，default，medium，mini
		size: {
			type: String,
			default: 'normal'
		},
		// 按钮形状，circle（两边为半圆），square（带圆角）
		shape: {
			type: String,
			default: 'square'
		},
		// 按钮是否镂空
		plain: {
			type: Boolean,
			default: false
		},
		// 是否禁止状态
		disabled: {
			type: Boolean,
			default: false
		},
		// 是否加载中
		loading: {
			type: Boolean,
			default: false
		},
		// 开放能力，具体请看uniapp稳定关于button组件部分说明
		// https://uniapp.dcloud.io/component/button
		openType: {
			type: String,
			default: ''
		},
		// 用于 <form> 组件，点击分别会触发 <form> 组件的 submit/reset 事件
		// 取值为submit（提交表单），reset（重置表单）
		formType: {
			type: String,
			default: ''
		},
		// 打开 APP 时，向 APP 传递的参数，open-type=launchApp时有效
		// 只微信小程序、QQ小程序有效
		appParameter: {
			type: String,
			default: ''
		},
		// 指定是否阻止本节点的祖先节点出现点击态，微信小程序有效
		hoverStopPropagation: {
			type: Boolean,
			default: false
		},
		// 指定返回用户信息的语言，zh_CN 简体中文，zh_TW 繁体中文，en 英文。只微信小程序有效
		lang: {
			type: String,
			default: 'en'
		},
		// 会话来源，open-type="contact"时有效。只微信小程序有效
		sessionFrom: {
			type: String,
			default: ''
		},
		// 会话内消息卡片标题，open-type="contact"时有效
		// 默认当前标题，只微信小程序有效
		sendMessageTitle: {
			type: String,
			default: ''
		},
		// 会话内消息卡片点击跳转小程序路径，open-type="contact"时有效
		// 默认当前分享路径，只微信小程序有效
		sendMessagePath: {
			type: String,
			default: ''
		},
		// 会话内消息卡片图片，open-type="contact"时有效
		// 默认当前页面截图，只微信小程序有效
		sendMessageImg: {
			type: String,
			default: ''
		},
		// 是否显示会话内消息卡片，设置此参数为 true，用户进入客服会话会在右下角显示"可能要发送的小程序"提示，
		// 用户点击后可以快速发送小程序消息，open-type="contact"时有效
		showMessageCard: {
			type: Boolean,
			default: false
		},
		// 额外传参参数，用于小程序的data-xxx属性，通过target.dataset.name获取
		dataName: {
			type: String,
			default: ''
		},
		// 节流，一定时间内只能触发一次
		throttleTime: {
			type: [String, Number],
			default: 1000
		},
		// 按住后多久出现点击态，单位毫秒
		hoverStartTime: {
			type: [String, Number],
			default: 20
		},
		// 手指松开后点击态保留时间，单位毫秒
		hoverStayTime: {
			type: [String, Number],
			default: 150
		},
		// 按钮文字，之所以通过props传入，是因为slot传入的话
		// nvue中无法控制文字的样式
		text: {
			type: [String, Number],
			default: ''
		},
		icon: {
			type: String,
			default: ''
		}
	},
	mixins: [uni.$u.mixin],
	data() {
		return {};
	},
	computed: {
		bemClass() {
			return this.bem('button', ['type'], ['disabled'])
		},
		
	},
	created() {
		// this.$u.bem('button', ['primary'], ['disabled'])
		// this.bem('button', ['primary'], ['disabled'])
	},
	methods: {
		clickHandler() {
			// 非禁止并且非加载中，才能点击
			if(!this.disabled && !this.loading) {
				this.$emit('click');
			}
		},
	}
};
</script>

<style lang="scss">
	@import "../../libs/css/components.scss";
	
	.u-button {
		height: 44px;
		position: relative;
		align-items: center;
		justify-content: center;
		@include flex;
		/* #ifndef APP-NVUE */
		box-sizing: border-box;
		/* #endif */
		
		/* #ifndef APP-NVUE */
		// nvue下hover-class无效
		&:before {
		    position: absolute;
		    top: 50%;
		    left: 50%;
		    width: 100%;
		    height: 100%;
		    border: inherit;
		    border-radius: inherit;
		    transform: translate(-50%, -50%);
		    opacity: 0;
		    content: " ";
		    background-color: #000;
		    border-color: #000;
		}
		
		&--active {
			&:before {
			    opacity: .15
			}
		}
		/* #endif */
		
		&__text {
			font-size: 15px;
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
		
		&--default {
		    color: #323233;
		    background-color: #fff;
			border-color: #ebedf0;
			border-width: 1px;
			border-style: solid;
		}
		
		&--primary {
		    color: #fff;
		    background-color: #07c160;
			border-color: #07c160;
			border-width: 1px;
			border-style: solid;
		}
		
		&--info {
		    color: #fff;
		    background-color: #1989fa;
			border-color: #1989fa;
			border-width: 1px;
			border-style: solid;
		}
		
		&--danger {
		    color: #fff;
		    background-color: #ee0a24;
			border-color: #ee0a24;
			border-width: 1px;
			border-style: solid;
		}
		
		&--warning {
		    color: #fff;
		    background-color: #ff976a;
			border-color: #ff976a;
			border-width: 1px;
			border-style: solid;
		}
		
	}
</style>
