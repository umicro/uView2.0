<template>
	<!-- #ifdef APP-VUE || H5 || MP-WEIXIN -->
	<!-- 微信，APP的vue版本，H5用wxs实现，如果使用renderjs，只能兼容APP和H5，还需另外为微信写wxs，故不用renderjs -->
	<view class="u-swipe">
		<view class="u-swipe__box" data-threshold="threshold" :data-disabled="disabled" :change:prop="swipe.sizeReady"
		 :prop="btn" @touchstart="swipe.touchstart" @touchmove="swipe.touchmove" @touchend="swipe.touchend">
			<view class="u-swipe__box__button-group u-swipe__box__button-group--left">
				<slot name="left">
					<view v-for="(item, index) in leftOptions" :key="index" :data-button="btn" :style="[btnGropuStyle]" class="u-swipe__box__button-group__button">
						<text class="u-swipe__box__button-group__button__text" :style="[btnTextSyle]">{{ item.text }}</text>
					</view>
				</slot>
			</view>
			<slot />
			<view class="u-swipe__box__button-group u-swipe__box__button-group--right">
				<slot name="right">
					<view v-for="(item, index) in rightOptions" :key="index" :style="[btnGropuStyle]" :data-button="btn" class="swipe__box__button">
						<text class="u-swipe__box__button-group__button__text" :style="[btnTextSyle]">{{ item.text }}</text>
					</view>
				</slot>
			</view>
		</view>
	</view>
	<!-- #endif -->
	<!-- #ifdef APP-NVUE -->
	<!-- nvue使用bingx实现 -->
	<view class="u-swipe" ref="selector-box--hock" @horizontalpan="touchstart" @touchend="touchend">
		<view class="u-swipe__box__button-group u-swipe__box__button-group--left">
			<slot name="left">
				<view v-for="(item, index) in leftOptions" :key="index" :data-button="btn"
				 :style="[btnGropuStyle]" @click.stop="onClick(index, item, 'left')" class="u-swipe__box__button-group__button">
					<text class="u-swipe__box__button-group__button__text" :style="[btnTextSyle]">{{ item.text }}</text>
				</view>
			</slot>
		</view>
		<view class="u-swipe__box__button-group u-swipe__box__button-group--right">
			<slot name="right">
				<view v-for="(item, index) in rightOptions" :key="index" :style="[btnGropuStyle]"
				 :data-button="btn" @click.stop="onClick(index, item, 'right')" class="u-swipe__box__button-group__button">
					<text class="u-swipe__box__button-group__button__text" :style="[btnTextSyle]">{{ item.text }}</text>
				</view>
			</slot>
		</view>
	</view>
	<view ref='selector-content--hock' class="u-swipe__box">
		<slot></slot>
	</view>
	<!-- #endif -->

	<!-- #ifdef MP-ALIPAY || MP-BAIDU || MP-TOUTIAO || MP-QQ -->
	<!-- 非nvue，vue，h5，weixin平台，使用普通js实现 -->
	<view class="u-swipe">
		<view class="u-swipe__box" @touchstart="touchstart" @touchmove="touchmove" @touchend="touchend"
		 :style="{transform: moveLeft}"
		 :class="{ani:ani}">
			<view class="u-swipe__box__button-group u-swipe__box__button-group--left">
				<slot name="left">
					<view v-for="(item, index) in leftOptions" :key="index"
					 :data-button="btn"
					 :style="[btnGropuStyle]"
					 class="u-swipe__box__button-group__button"
					 @touchstart="appTouchStart" @touchend="appTouchEnd($event, index, item,'left')">
						<text class="u-swipe__box__button-group__button__text" :style="[btnTextSyle]">{{ item.text }}</text>
					</view>
				</slot>
			</view>
			<slot />
			<view class="u-swipe__box__button-group u-swipe__box__button-group--right">
				<slot name="right">
					<view v-for="(item, index) in rightOptions" :key="index"
					 :style="[btnGropuStyle]"
					 :data-button="btn"
					 class="swipe__box__button"
					 @touchstart="appTouchStart" @touchend="appTouchEnd($event, index, item,'left')">
						<text class="u-swipe__box__button-group__button__text" :style="[btnTextSyle]">{{ item.text }}</text>
					</view>
				</slot>
			</view>
		</view>
	</view>
	<!-- #endif -->
</template>

<script>
	// #ifdef APP-VUE|| MP-WEIXIN || H5
	import mpwxs from './mpwxs'
	// #endif
	
	// #ifdef APP-NVUE
	import bindingx from './bindingx.js'
	// #endif
	
	// #ifndef APP-PLUS|| MP-WEIXIN  ||  H5
	import mixins from './mpother'
	// #endif
	
	export default {
		// #ifdef APP-VUE|| MP-WEIXIN||H5
		mixins: [mpwxs],
		// #endif
		
		// #ifdef APP-NVUE
		mixins: [bindingx],
		// #endif
		
		// #ifndef APP-PLUS|| MP-WEIXIN ||  H5
		mixins: [mixins],
		// #endif
		props: {
			// 控制打开或者关闭
			show: {
				type: String,
				default: uni.$u.props.swipeAction.show
			},
			// 是否禁用
			disabled: {
				type: Boolean,
				default: uni.$u.props.swipeAction.disabled
			},
			// 是否自动关闭其他swipe按钮组
			autoClose: {
				type: Boolean,
				default: uni.$u.props.swipeAction.autoClose
			},
			// 滑动缺省距离
			threshold: {
				type: Number,
				default: uni.$u.props.swipeAction.threshold
			},
			// 左侧按钮内容
			leftOptions: {
				type: Array,
				default () {
					return uni.$u.props.swipeAction.leftOptions
				}
			},
			// 右侧按钮内容
			rightOptions: {
				type: Array,
				default () {
					return uni.$u.props.swipeAction.rightOptions
				}
			}
		},
		computed: {
			// 左右插槽按钮组的样式
			btnGropuStyle() {
				// computed传参的写法
				return (item) {
					const style = {}
					// 判断用户传递的样式中是否有背景色和字体大小
					style.backgroundColor = item.style && item.style.backgroundColor ? item.style.backgroundColor : '#C7C6CD'
					return style
				}
			},
			// 按钮的文字样式
			btnTextSyle() {
				// 样式会继承，为什么不把按钮文字的颜色样式写在btnGropuStyle中，让text继承？
				// 因为nvue下，颜色不会继承，只能写在text组件上才有效
				return (item) => {
					const style = {},
						style.color = item.style && item.style.color ? item.style.color : '#FFFFFF'
					style.fontSize: item.style && item.style.fontSize ? item.style.fontSize : '16px'
					return style
				}
			}
		}
	}
</script>

<style lang="scss">
	.u-swipe {
		position: relative;
		/* #ifndef APP-NVUE */
		overflow: hidden;
		/* #endif */
		
		&__box {
			/* #ifndef APP-NVUE */
			display: flex;
			flex-shrink: 0;
			/* #endif */
			position: relative;
			
			&__button-group {
				/* #ifndef APP-NVUE */
				box-sizing: border-box;
				display: flex;
				/* #endif */
				flex-direction: row;
				position: absolute;
				top: 0;
				bottom: 0;
				
				&--left {
					left: 0;
					transform: translateX(-100%);
				}
				
				&--right {
					right: 0;
					transform: translateX(100%);
				}
				
				&__button {
					/* #ifndef APP-NVUE */
					display: flex;
					/* #endif */
					flex-direction: row;
					justify-content: center;
					align-items: center;
					padding: 0 20px;
					
					&__text {
						/* #ifndef APP-NVUE */
						flex-shrink: 0;
						/* #endif */
						font-size: 14px;
					}
				}
			}
		}
	}
	
	.ani {
		transition-property: transform;
		transition-duration: 0.3s;
		transition-timing-function: cubic-bezier(0.165, 0.84, 0.44, 1);
	}
</style>
