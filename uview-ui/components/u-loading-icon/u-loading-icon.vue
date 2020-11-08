<template>
	<view 
		class="u-loading-icon" 
		:class="[vertical && 'u-loading-icon--vertical']"
	>
		<view 
			v-if="!webviewHide"
			class="u-loading-icon__spinner"
			:class="[`u-loading-icon__spinner--${mode}`]"
			ref="ani"
			:style="{
				color: color,
				width: $u.addUnit(size),
				height: $u.addUnit(size),
				borderTopColor: color,
				borderBottomColor: otherBorderColor,
				borderLeftColor: otherBorderColor,
				borderRightColor: otherBorderColor,
			}"
		>
			<block v-if="mode === 'spinner'">
				<!-- #ifndef APP-NVUE -->
				<view
				    v-for="(item, index) in array12"
				    :key="index"
				    class="u-loading-icon__dot"
				>
				</view>
				<!-- #endif -->
				<!-- #ifdef APP-NVUE -->
				<!-- 此组件内部图标部分无法设置宽高，即使通过width和height配置了也无效 -->
				<loading-indicator v-if="!webviewHide" class="u-loading-indicator" :animating="true" :style="{
					color: color,
					width: $u.addUnit(size),
					height: $u.addUnit(size)
				}" />
				<!-- #endif -->
			</block>
		</view>
		<text
			v-if="text"
			class="u-loading-icon__text"
			:style="{
				fontSize: $u.addUnit(textSize),
			}"
		>{{text}}</text>
	</view>
</template>

<script>
	// #ifdef APP-NVUE
	const animation = weex.requireModule('animation');
	// #endif
	
	export default {
		props: {
			// 颜色
			color: {
				type: String,
				default: uni.$u.props.loadingIcon.color
			},
			// 文字和图标是否垂直排列
			vertical: {
				type: Boolean,
				default: uni.$u.props.loadingIcon.vertical
			},
			// 模式选择，circle-圆形，spinner-花朵形，semicircle-半圆形
			mode: {
				type: String,
				default: uni.$u.props.loadingIcon.mode
			},
			// 图标大小，单位默认px
			size: {
				type: [String, Number],
				default: uni.$u.props.loadingIcon.size
			},
			// 文字大小
			textSize: {
				type: [String, Number],
				default: uni.$u.props.loadingIcon.textSize
			},
			// 文字内容
			text: {
				type: [String, Number],
				default: uni.$u.props.loadingIcon.text
			}
		},
		mixins: [uni.$u.mixin],
		data() {
			return {
				// Array.form可以通过一个伪数组对象创建指定长度的数组
				// https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/from
				array12: Array.from({ length: 12 }),
				aniAngel: 0, // 动画旋转角度
				webviewHide: false, // 监听webview的状态，如果隐藏了页面，则停止动画，以免性能消耗
			}
		},
		computed: {
			// 当为circle类型时，给其另外三边设置一个rgba透明度值
			otherBorderColor() {
				return this.mode === 'circle' ? this.$u.colorToRgba(this.color, '0.25') : 'transparent'
			}
		},
		created() {
			this.init()
		},
		methods: {
			init() {
				// #ifdef APP-NVUE
				this.nvueAnimate()
				// #endif
				// #ifdef APP-PLUS
				this.addEventListenerToWebview()
				// #endif
			},
			nvueAnimate() {
				// nvue下，非spinner类型时才需要旋转，因为nvue的spinner类型，使用了weex的
				// loading-indicator组件，自带旋转功能
				this.mode !== 'spinner' && this.startAnimate()
			},
			// 监听webview的显示与隐藏
			addEventListenerToWebview() {
				// webview的堆栈
				const pages = getCurrentPages()
				// 当前页面
				const page = pages[pages.length - 1]
				// 当前页面的webview实例
				const currentWebview = page.$getAppWebview()
				// 监听webview的显示与隐藏，从而停止或者开始动画(为了性能)
				currentWebview.addEventListener('hide', () => {
					this.webviewHide = true
				})
				currentWebview.addEventListener('show', () => {
					this.webviewHide = false
				})
			},
			// 执行nvue的animate模块动画
			startAnimate() {
				const ani = this.$refs.ani;
				animation.transition(ani, {
					// 进行角度旋转
					styles: {
						transform: `rotate(${this.aniAngel}deg)`,
						transformOrigin: 'center center'
					},
					duration: 1000,
					timingFunction: 'linear',
					delay: 0
				}, () => {
					// 每次增加360deg，为了让其重新旋转一周
					this.aniAngel += 360
					 // 动画结束后，继续循环执行动画
					this.startAnimate()
				})
			}
		}
	}
</script>

<style lang="scss">
	@import "../../libs/css/components.scss";
	
	.u-loading-icon {
	    /* #ifndef APP-NVUE */
	    display: inline-flex;
	    /* #endif */
		flex-direction: row;
	    align-items: center;
	    justify-content: center;
	    color: #c8c9cc;
		
		&__text {
		    margin-left: 4px;
		    color: $u-content-color;
		    font-size: 14px;
		    line-height: 20px;
		}
		
		&__spinner {
			width: 30px;
			height: 30px;
			position: relative;
			/* #ifndef APP-NVUE */
			box-sizing: border-box;
			max-width: 100%;
			max-height: 100%;
			animation: u-rotate 1s linear infinite;
			/* #endif */
		}
		
		&__spinner--semicircle {
			border-width: 1px;
			border-color: transparent;
			border-top-right-radius: 100px;
			border-top-left-radius: 100px;
			border-bottom-left-radius: 100px;
			border-bottom-right-radius: 100px;
			border-style: solid;
		}
		
		&__spinner--circle {
			border-top-right-radius: 100px;
			border-top-left-radius: 100px;
			border-bottom-left-radius: 100px;
			border-bottom-right-radius: 100px;
			border-width: 2px;
			border-top-color: #e5e5e5;
			border-right-color: #e5e5e5;
			border-bottom-color: #e5e5e5;
			border-left-color: #e5e5e5;
			border-style: solid;
		}
		
		&--vertical {
		    flex-direction: column
		}
	}
	
	/* #ifndef APP-NVUE */
	:host {
	    font-size: 0;
	    line-height: 1
	}
	
	.u-loading-icon {
		&__spinner--spinner {
		    animation-timing-function: steps(12)
		}
		
		&__text:empty {
			display: none
		}
		
		&--vertical &__text {
		    margin: 4px 0 0;
		}
		
		&__dot {
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			
			&:before {
				display: block;
				width: 2px;
				height: 25%;
				margin: 0 auto;
				background-color: currentColor;
				border-radius: 40%;
				content: " "
			}
		}
	}
	
	@for $i from 1 through 12 {
	    .u-loading-icon__dot:nth-of-type(#{$i}) {
	        transform: rotate($i * 30deg);
	        opacity: 1 - (0.75 / 12) * ($i - 1);
	    }
	}
	
	@keyframes u-rotate {
	    0% {
	        transform: rotate(0deg)
	    }
	
	    to {
	        transform: rotate(1turn)
	    }
	}
	/* #endif */
</style>