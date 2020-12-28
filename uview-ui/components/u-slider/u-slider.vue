<template>
	<!-- #ifdef H5 || APP-VUE || MP-QQ || MP-WEIXIN -->
	<view
	    class="u-slider"
	    @tap="wxsModule.onClick"
		:change:prop="wxsModule.sizeReady"
		:prop="info"
		ref="slider"
	    :class="[disabled ? 'u-slider--disabled' : '']"
	    :style="{
			backgroundColor: inactiveColor,
			height: $u.addUnit(height),
		}"
	>
	<!-- #endif -->
	<!-- #ifdef APP-NVUE -->
	<view
	    class="u-slider"
	    @touchstart="onClick"
		ref="slider"
	    :class="[disabled ? 'u-slider--disabled' : '']"
	    :style="{
			backgroundColor: inactiveColor,
			height: $u.addUnit(height),
		}"
	>
	<!-- #endif -->
		<!-- #ifdef APP-NVUE -->
		<view
		    class="u-slider__gap"
			ref="nvue-gap"
			:class="[!touching && 'u-slider__gap--ani']"
		    :style="[
				barStyle,
				{
					backgroundColor: activeColor,
					height: $u.addUnit(height),
				}
			]"
		>
		<!-- #endif -->
		<!-- #ifndef APP-NVUE -->
		<view
		    class="u-slider__gap u-slider__gap--ani"
			ref="nvue-gap"
		    :style="[
				barStyle,
				{
					backgroundColor: activeColor,
					height: $u.addUnit(height),
				}
			]"
		>
		<!-- #endif -->
			<!-- #ifdef APP-NVUE -->
			<view
			    class="u-slider__gap__button-wrap"
				@touchstart="onTouchStart"
			    @panmove="onTouchMove"
				:style="[buttomWrapStyle]"
				ref="nvue-button"
			>
			<!-- #endif -->
			<!-- #ifdef H5 || APP-VUE || MP-QQ || MP-WEIXIN -->
			<view
			    class="u-slider__gap__button-wrap"
			    @touchstart="wxsModule.onTouchStart"
				@touchmove="wxsModule.onTouchMove"
			    @touchend="wxsModule.onTouchEnd"
				:style="[buttomWrapStyle]"
				:change:prop="wxsModule.sizeReady"
				:prop="info"
			>
			<!-- #endif -->
				<slot>
					<view
					    class="u-slider__gap__button-wrap__button"
					    :style="[buttonStyle]"
					></view>
				</slot>
			</view>
		</view>
	</view>
</template>

<!-- #ifdef APP-VUE || MP-WEIXIN || H5 || MP-QQ -->
<script
    src="./mpwxs.wxs"
    module="wxsModule"
    lang="wxs"
></script>
<!-- #endif -->

<script>
	// #ifndef APP-PLUS || MP-WEIXIN || MP-QQ || H5
	import mixins from './mpother'
	// #endif
	// #ifdef APP-VUE || MP-WEIXIN || H5 || MP-QQ
	import mixins from './mpwxs.js'
	// #endif
	// #ifdef APP-NVUE
	import mixins from './nvue'
	// #endif
	/**
	 * slider 滑块选择器
	 * @tutorial https://uviewui.com/components/slider.html
	 * @property {Number | String} value 滑块默认值（默认0）
	 * @property {Number | String} min 最小值（默认0）
	 * @property {Number | String} max 最大值（默认100）
	 * @property {Number | String} step 步长（默认1）
	 * @property {Number | String} blockWidth 滑块宽度，高等于宽（30）
	 * @property {Number | String} height 滑块条高度，单位rpx（默认6）
	 * @property {String} inactiveColor 底部条背景颜色（默认#c0c4cc）
	 * @property {String} activeColor 底部选择部分的背景颜色（默认#2979ff）
	 * @property {String} blockColor 滑块颜色（默认#ffffff）
	 * @property {Object} blockStyle 给滑块自定义样式，对象形式
	 * @property {Boolean} disabled 是否禁用滑块(默认为false)
	 * @event {Function} start 滑动触发
	 * @event {Function} moving 正在滑动中
	 * @event {Function} end 滑动结束
	 * @example <u-slider v-model="value" />
	 */
	export default {
		name: 'u-slider',
		props: {
			// 当前进度百分比值，范围0-100
			value: {
				type: [Number, String],
				default: 0
			},
			// 是否禁用滑块
			disabled: {
				type: Boolean,
				default: false
			},
			// 滑块宽度，高等于宽，单位rpx
			blockHeight: {
				type: [Number, String],
				default: 15
			},
			// 最小值
			min: {
				type: [Number, String],
				default: 0
			},
			// 最大值
			max: {
				type: [Number, String],
				default: 100
			},
			// 步进值
			step: {
				type: [Number, String],
				default: 1
			},
			// 滑块条高度，单位rpx
			height: {
				type: [Number, String],
				default: 10
			},
			// 进度条的激活部分颜色
			activeColor: {
				type: String,
				default: '#2979ff'
			},
			// 进度条的背景颜色
			inactiveColor: {
				type: String,
				default: '#c0c4cc'
			},
			// 滑块的背景颜色
			blockColor: {
				type: String,
				default: '#ffffff'
			},
			// 用户对滑块的自定义颜色
			blockStyle: {
				type: Object,
				default () {
					return {};
				}
			},
		},
		mixins: [uni.$u.mixin, mixins],
		data() {
			return {
				// 滑动的状态有3个，start-开始 -> moving-移动中 -> end-结束
				status: 'end',
				barStyle: {},
				sliderRect: {}
			};
		},
		computed: {
			buttonStyle() {
				// 滑块点的样式
				const style = {
					height: uni.$u.addUnit(this.blockHeight),
					width: uni.$u.addUnit(this.blockHeight),
					backgroundColor: this.blockColor,
				}
				return uni.$u.deepMerge(this.blockStyle, style)
			},
			buttomWrapStyle() {
				// 让元素垂直居中，top需要设置为父元素的50%，但是nvue不支持%写法
				let value = parseInt(this.height)
				if(typeof this.height === 'string' && this.height.indexOf('rpx') >= 0){
					value = uni.rpx2px(value)
				}
				return {
					top: value / 2 + 'px'
				}
			}
		},
		mounted() {
			
		},
		methods: {
			
		}
	};
</script>

<style lang="scss">
	@import "../../libs/css/components.scss";

	.u-slider {
		position: relative;
		border-radius: 999px;
		background-color: #ebedf0;
		/* #ifndef APP-NVUE */
		touch-action: none;
		/* #endif */

		&__gap {
			position: relative;
			border-radius: 999px;
			background-color: $u-primary;
			width: 0;
			
			&--ani {
				transition: width 0.2s ease;
			}

			&__button-wrap {
				position: absolute;
				top: 50%;
				right: 0;
				transform: translate(50%, -50%);
				

				&__button {
					width: 24px;
					height: 24px;
					border-radius: 100px;
					box-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
					background-color: #fff;
					/* #ifndef APP-NVUE */
					cursor: pointer;
					/* #endif */
				}
			}
		}

		&--disabled {
			opacity: 0.5;
		}
	}
</style>
