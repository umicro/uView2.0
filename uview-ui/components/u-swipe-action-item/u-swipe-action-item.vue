<template>
	<!-- 在微信小程序 app vue端 h5 使用wxs 实现-->
	<!-- #ifdef APP-VUE || MP-WEIXIN || H5 -->
	<view class="u-swipe">
		<view
		    class="u-swipe__box"
		    :data-threshold="threshold"
		    :data-disabled="disabled"
		    :change:prop="swipe.sizeReady"
		    :prop="btns"
		    @touchstart="swipe.touchstart"
		    @touchmove="swipe.touchmove"
		    @touchend="swipe.touchend"
		>
			<!-- 在微信小程序 app vue端 h5 使用wxs 实现-->
			<view class="u-swipe__button-group u-swipe__button-group--left">
				<slot name="left">
					<view
					    v-for="(item,index) in leftOptions"
					    :data-button="btnLeft"
					    :key="index"
					    :style="[btnGropuStyle(item, index, 'left')]"
					    class="u-swipe__button-group__button button-hock--left"
					    @touchstart="appTouchStart"
					    @touchend="appTouchEnd($event,index,item,'left')"
					>
						<text
						    class="u-swipe__button-group__button__text"
						    :style="[btnTextSyle(item)]"
						>{{ item.text }}</text>
					</view>
				</slot>
			</view>
			<slot></slot>
			<view class="u-swipe__button-group u-swipe__button-group--right">
				<slot name="right">
					<view
					    v-for="(item,index) in rightOptions"
					    :data-button="btnRight"
					    :key="index"
					    :style="[btnGropuStyle(item, index, 'right')]"
					    class="u-swipe__button-group__button button-hock--right"
					    @touchstart="appTouchStart"
					    @touchend="appTouchEnd($event,index,item,'right')"
					>
						<text
						    class="u-swipe__button-group__button__text"
						    :style="[btnTextSyle(item)]"
						>{{ item.text }}</text>
					</view>
				</slot>
			</view>
		</view>
	</view>
	<!-- #endif -->
	<!-- app nvue端 使用 bindingx -->
	<!-- #ifdef APP-NVUE -->
	<view
	    ref="selector-box--hock"
	    class="u-swipe"
	    @horizontalpan="touchstart"
	    @touchend="touchend"
	>
		<view
		    ref='selector-left-button--hock'
		    class="u-swipe__button-group u-swipe__button-group--left"
		>
			<slot name="left">
				<view
				    v-for="(item,index) in leftOptions"
				    :data-button="btn"
				    :key="index"
				    :style="[btnGropuStyle(item, index, 'left')]"
				    class="u-swipe__button-group__button button-hock"
				    @click.stop="onClick(index, item, 'left')"
				><text
					    class="u-swipe__button-group__button__text"
					    :style="[btnTextSyle(item)]"
					>{{ item.text }}</text></view>
			</slot>
		</view>
		<view
		    ref='selector-right-button--hock'
		    class="u-swipe__button-group u-swipe__button-group--right"
		>
			<slot name="right">
				<view
				    v-for="(item,index) in rightOptions"
				    :data-button="btn"
				    :key="index"
				    :style="[btnGropuStyle(item, index, 'right')]"
				    class="u-swipe__button-group__button button-hock"
				    @click.stop="onClick(index, item, 'right')"
				><text
					    class="u-swipe__button-group__button__text"
					    :style="[btnTextSyle(item)]"
					>{{ item.text }}</text></view>
			</slot>
		</view>
		<view
		    ref='selector-content--hock'
		    class="uni-swipe_box"
		>
			<slot></slot>
		</view>
	</view>
	<!-- #endif -->
	<!-- 其他平台使用 js ，长列表性能可能会有影响-->
	<!-- #ifdef MP-ALIPAY || MP-BAIDU || MP-TOUTIAO || MP-QQ -->
	<view class="uni-swipe">
		<view
		    class="uni-swipe_box"
		    @touchstart="touchstart"
		    @touchmove="touchmove"
		    @touchend="touchend"
		    :style="{transform:moveLeft}"
		    :class="{ani:ani}"
		>
			<view class="uni-swipe_button-group button-group--left">
				<slot name="left">
					<view
					    v-for="(item,index) in leftOptions"
					    :data-button="btn"
					    :key="index"
					    :style="{
					  backgroundColor: item.style && item.style.backgroundColor ? item.style.backgroundColor : '#C7C6CD',
					  fontSize: item.style && item.style.fontSize ? item.style.fontSize : '16px'
					}"
					    class="uni-swipe_button button-hock"
					    @touchstart="appTouchStart"
					    @touchend="appTouchEnd($event,index,item,'left')"
					><text
						    class="uni-swipe_button-text"
						    :style="{color: item.style && item.style.color ? item.style.color : '#FFFFFF',}"
						>{{ item.text }}</text></view>
				</slot>
			</view>
			<slot></slot>
			<view class="uni-swipe_button-group button-group--right">
				<slot name="right">
					<view
					    v-for="(item,index) in rightOptions"
					    :data-button="btn"
					    :key="index"
					    :style="{
					  backgroundColor: item.style && item.style.backgroundColor ? item.style.backgroundColor : '#C7C6CD',
					  fontSize: item.style && item.style.fontSize ? item.style.fontSize : '16px'
					}"
					    @touchstart="appTouchStart"
					    @touchend="appTouchEnd($event,index,item,'right')"
					    class="uni-swipe_button button-hock"
					><text
						    class="uni-swipe_button-text"
						    :style="{color: item.style && item.style.color ? item.style.color : '#FFFFFF',}"
						>{{ item.text }}</text></view>
				</slot>
			</view>
		</view>
	</view>
	<!-- #endif -->

</template>

<script
    src="./index.wxs"
    module="swipe"
    lang="wxs"
></script>
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

	/**
	 * SwipeActionItem 滑动操作子组件
	 * @description 通过滑动触发选项的容器
	 * @tutorial https://ext.dcloud.net.cn/plugin?id=181
	 * @property {Boolean} show = [left|right｜none] 	开启关闭组件，auto-close = false 时生效
	 * @property {Boolean} disabled = [true|false] 		是否禁止滑动
	 * @property {Boolean} autoClose = [true|false] 	滑动打开当前组件，是否关闭其他组件
	 * @property {Number}  threshold 					滑动缺省值
	 * @property {Array} leftOptions 					左侧选项内容及样式
	 * @property {Array} rgihtOptions 					右侧选项内容及样式
	 * @event {Function} click 							点击选项按钮时触发事件，e = {content,index} ，content（点击内容）、index（下标)
	 * @event {Function} change 						组件打开或关闭时触发，left\right\none
	 * @example<u-swiper :list="list"></u-swiper>
	 */

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
        name:'u-swipe-action-item',
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
		inject: ['swipeaction'],
		computed: {
			// 左右插槽按钮组的样式
			btnGropuStyle() {
				// computed传参的写法
				return (item, index, direction) => {
					const style = {}
					if (direction === 'left') {
						style.zIndex = -index
					}
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
					const style = {}
					style.color = item.style && item.style.color ? item.style.color : '#FFFFFF'
					style.fontSize = item.style && item.style.fontSize ? item.style.fontSize : '16px'
					return style
				}
			}
		}
	}
</script>
<style lang="scss">
	$u-swipe-action-button-group-top:0 !default;
	$u-swipe-action-button-group-bottom:0 !default;
	$u-swipe-action-button-group-bottom-left-left:0 !default;
	$u-swipe-action-button-group-bottom-left-right:0 !default;
	$u-swipe-action-button-group-button-flex:1 !default;
	$u-swipe-action-button-group-button-padding: 0 20px !default;
	$u-swipe-action-button-group-text-font-size:14px !default;
	$u-swipe-action-movable-area-height:45px !default;
	$u-swipe-action-movable-view-flex:1 !default;
	$u-swipe-action-movable-view-height:45px !default;
	$u-swipe-action-movable-view-button-height:100% !default;
	$u-swipe-action-movable-view-button-background: #C0C0C0 !default;
	$u-swipe-action-movable-view-box-height:100% !default;
	$u-swipe-action-movable-view-box-background-color:#fff !default;
 
	.u-swipe {
		position: relative;
		/* #ifndef APP-NVUE */
		touch-action: none;
		overflow: hidden;
		/* #endif */

		&__box {
			/* #ifndef APP-NVUE */
			display: flex;
			flex-shrink: 0;
			/* #endif */
			position: relative;
		}

		&__button-group {
			/* #ifndef APP-NVUE */
			box-sizing: border-box;
			display: flex;
			/* #endif */
			flex-direction: row;
			position: absolute;
			top:$u-swipe-action-button-group-top;
			bottom:$u-swipe-action-button-group-bottom;

			&--left {
				left:$u-swipe-action-button-group-bottom-left-left;
				transform: translateX(-100%)
			}

			&--right {
				right:$u-swipe-action-button-group-bottom-left-right;
				transform: translateX(100%)
			}

			&__button {
				/* #ifdef APP-NVUE */
				flex:$u-swipe-action-button-group-button-flex;
				/* #endif */
				/* #ifndef APP-NVUE */
				display: flex;
				/* #endif */
				flex-direction: row;
				justify-content: center;
				align-items: center;
				padding:$u-swipe-action-button-group-button-padding;

				&__text {
					/* #ifndef APP-NVUE */
					flex-shrink: 0;
					/* #endif */
					font-size:$u-swipe-action-button-group-text-font-size;
				}
			}
		}
	}

	.ani {
		transition-property: transform;
		transition-duration: 0.3s;
		transition-timing-function: cubic-bezier(0.165, 0.84, 0.44, 1);
	}

	/* #ifdef MP-ALIPAY */
	.movable-area {
		/* width: 100%; */
		height:$u-swipe-action-movable-area-height;
	}

	.movable-view {
		display: flex;
		/* justify-content: center; */
		position: relative;
		flex:$u-swipe-action-movable-view-flex;
		height:$u-swipe-action-movable-view-height;
		z-index: 2;
	}

	.movable-view-button {
		display: flex;
		flex-shrink: 0;
		flex-direction: row;
		height:$u-swipe-action-movable-view-button-height;
		background:	$u-swipe-action-movable-view-button-background;
	}

	/* .transition {
		transition: all 0.3s;
	} */

	.movable-view-box {
		flex-shrink: 0;
		height:$u-swipe-action-movable-view-box-height;
		background-color:$u-swipe-action-movable-view-box-background-color;
	}

	/* #endif */
</style>
