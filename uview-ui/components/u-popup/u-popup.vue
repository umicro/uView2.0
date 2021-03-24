<template>
	<view class="u-popup">
		<u-overlay
		    :show="show"
		    @click="overlayClick"
		    v-if="overlay"
		></u-overlay>
		<u-transition
		    :show="show"
		    :custom-style="transitionStyle"
		    :mode="position"
		    @click="transitionClick"
		>
			<view
			    class="u-popup__content"
			    :style="[contentStyle]"
			    @tap.stop="noop"
				:class="[round && `u-popup__content--round-${mode}`]"
			>
				<u-status-bar v-if="safeAreaInsetTop"></u-status-bar>
				<slot></slot>
				<view
				    v-if="closeable"
				    @tap.stop="close"
				    class="u-popup__content__close"
				    :class="['u-popup__content__close--' + closeIconPos]"
				>
					<u-icon
					    name="close"
					    color="#909399"
					    size="18"
						bold
					></u-icon>
				</view>
				<u-safe-bottom v-if="safeAreaInsetBottom"></u-safe-bottom>
			</view>
		</u-transition>
	</view>
</template>

<script>
	/**
	 * popup 弹窗
	 * @description 弹出层容器，用于展示弹窗、信息提示等内容，支持上、下、左、右和中部弹出。组件只提供容器，内部内容由用户自定义
	 * @tutorial https://www.uviewui.com/components/popup.html
	 * @property {Boolean} show  是否展示弹窗 (默认 false)
	 * @property {Boolean} overlay  是否显示遮罩 （默认 true）
	 * @property {String} mode 弹出方向（默认left）
	 * @property {String Number} duration  动画时长，单位ms （默认 3000）
	 * @property {String Numberr} borderRadis 弹窗圆角值（默认0）
	 * @property {Boolean} closeable 是否显示关闭图标（默认false）
	 * @property {Object} overlayStyle 自定义遮罩的样式
	 * @property {Boolean} closeOnClickOverly  点击遮罩是否关闭弹窗 （默认  true）
	 * @property {String Number} zIndex  层级 （默认 10075）
	 * @property {Boolean} safeAreaInsetBottom  是否为iPhoneX留出底部安全距离 （默认 true）
	 * @property {Boolean} safeAreaInsetTop  是否留出顶部安全距离（状态栏高度） （默认 false）
	 * @property {Object} customStyle  组件的样式，对象形式
	 * @event {Function} open 弹出层打开
	 * @event {Function} close 弹出层收起
	 * @example <u-popup v-model="show"><view>出淤泥而不染，濯清涟而不妖</view></u-popup>
	 */
	export default {
		name: 'u-popup',
		props: {
			// 是否展示弹窗
			show: {
				type: Boolean,
				default: uni.$u.props.popup.show
			},
			// 是否显示遮罩
			overlay: {
				type: Boolean,
				default: uni.$u.props.popup.overlay
			},
			// 弹出的方向，可选值为 top bottom right left center
			mode: {
				type: String,
				default: uni.$u.props.popup.mode
			},
			// 动画时长，单位ms
			duration: {
				type: [String, Number],
				default: uni.$u.props.popup.duration
			},
			// 圆角值
			borderRadis: {
				type: [String, Number],
				default: uni.$u.props.popup.borderRadis
			},
			// 是否显示关闭图标
			closeable: {
				type: Boolean,
				default: uni.$u.props.popup.closeable
			},
			// 自定义遮罩的样式
			overlayStyle: {
				type: Object,
				default: uni.$u.props.popup.overlayStyle
			},
			// 点击遮罩是否关闭弹窗
			closeOnClickOverly: {
				type: Boolean,
				default: uni.$u.props.popup.closeOnClickOverly
			},
			// 层级
			zIndex: {
				type: [String, Number],
				default: uni.$u.props.popup.zIndex
			},
			// 是否为iPhoneX留出底部安全距离
			safeAreaInsetBottom: {
				type: Boolean,
				default: uni.$u.props.popup.safeAreaInsetBottom
			},
			// 是否留出顶部安全距离（状态栏高度）
			safeAreaInsetTop: {
				type: Boolean,
				default: uni.$u.props.popup.safeAreaInsetTop
			},
			// 自定义关闭图标位置，top-left为左上角，top-right为右上角，bottom-left为左下角，bottom-right为右下角
			closeIconPos: {
				type: String,
				default: uni.$u.props.popup.closeIconPos
			},
			// 是否显示圆角
			round: {
				type: Boolean,
				default: uni.$u.props.popup.round
			},
			// mode=center，也即中部弹出时，是否使用缩放模式
			zoom: {
				type: Boolean,
				default: true
			}
		},
		mixins: [uni.$u.mixin],
		data() {
			return {}
		},
		computed: {
			transitionStyle() {
				const style = {
					zIndex: this.zIndex,
					position: 'fixed',
					display: 'flex',
				}
				style[this.mode] = 0
				if (this.mode === 'left') {
					return this.$u.deepMerge(style, {
						bottom: 0,
						top: 0,
					})
				} else if (this.mode === 'right') {
					return this.$u.deepMerge(style, {
						bottom: 0,
						top: 0,
					})
				} else if (this.mode === 'top') {
					return this.$u.deepMerge(style, {
						left: 0,
						right: 0,
					})
				} else if (this.mode === 'bottom') {
					return this.$u.deepMerge(style, {
						left: 0,
						right: 0,
					})
				} else if (this.mode === 'center') {
					return this.$u.deepMerge(style, {
						alignItems: 'center',
						'justify-content': 'center',
						top: 0,
						left: 0,
						right: 0,
						bottom: 0
					})
				}
			},
			contentStyle() {
				const style = {}
				// 通过设备信息的safeAreaInsets值来判断是否需要预留顶部状态栏和底部安全局的位置
				// 不使用css方案，是因为nvue不支持css的iPhoneX安全区查询属性
				const {
					safeAreaInsets
				} = uni.$u.sys()
				if (this.mode !== 'center') {
					style.flex = 1
				}
				// // 如果用户设置了borderRadius值，添加弹窗的圆角
				// if (this.round && this.mode === 'bottom' || this.mode === 'center') {
				// 	switch (this.mode) {
				// 		case 'left':
				// 			style.borderRadius = `0 15px 15px 0`;
				// 			break;
				// 		case 'top':
				// 			style.borderRadius = `0 0 15px 15px`;
				// 			break;
				// 		case 'right':
				// 			style.borderRadius = `15px 0 0 15px`;
				// 			break;
				// 		case 'bottom':
				// 			style.borderRadius = `15px 15px 0 0`;
				// 			break;
				// 		default:
				// 	}
				// 	// 不加可能圆角无效
				// 	style.overflow = 'hidden';
				// }
				return uni.$u.deepMerge(style, this.customStyle)
			},
			position() {
				if (this.mode === 'center') {
					return this.zoom ? 'zoom-in' : 'fade'
				}
				if (this.mode === 'left') {
					return 'slide-left'
				}
				if (this.mode === 'right') {
					return 'slide-right'
				}
				if (this.mode === 'bottom') {
					return 'slide-up'
				}
				if (this.mode === 'top') {
					return 'slide-down'
				}
			},
		},
		methods: {
			// 点击遮罩
			overlayClick() {
				if (this.closeOnClickOverly) {
					this.$emit('close')
				}
			},
			close(e) {
				this.$emit('close')
			},
			transitionClick() {
				this.$emit('close')
			}
		}
	}
</script>

<style lang="scss">
	@import "../../libs/css/components.scss";
	$u-popup-flex:1 !default;
	$u-popup-content-background-color:#fff !default;

	.u-popup {
		flex: $u-popup-flex;

		&__content {
			background-color: $u-popup-content-background-color;
			position: relative;
			
			&--round-top {
				border-top-left-radius: 0;
				border-top-right-radius: 0;
				border-bottom-left-radius: 10px;;
				border-bottom-right-radius: 10px;;
			}
			
			&--round-left {
				border-top-left-radius: 0;
				border-top-right-radius: 10px;;
				border-bottom-left-radius: 0;
				border-bottom-right-radius: 10px;;
			}
			
			&--round-right {
				border-top-left-radius: 10px;;
				border-top-right-radius: 0;
				border-bottom-left-radius: 10px;;
				border-bottom-right-radius: 0;
			}
			
			&--round-bottom {
				border-top-left-radius: 10px;;
				border-top-right-radius: 10px;;
				border-bottom-left-radius: 0;
				border-bottom-right-radius: 0;
			}
			
			&--round-center {
				border-top-left-radius: 10px;;
				border-top-right-radius: 10px;;
				border-bottom-left-radius: 10px;;
				border-bottom-right-radius: 10px;;
			}
			
			&__close {
				position: absolute;
			}
			
			&__close--top-left {
				top: 15px;
				left: 15px;
			}
			
			&__close--top-right {
				top: 15px;
				right: 15px;
			}
			
			&__close--bottom-left {
				bottom: 15px;
				left: 15px;
			}
			
			&__close--bottom-right {
				right: 15px;
				bottom: 15px;
			}
		}
	}
</style>
