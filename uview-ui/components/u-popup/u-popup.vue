<template>
	<view
	    class="u-popup"
	    :style="[customStyle]"
	>
		<u-overlay
		    :show="show"
		    @click="overlayClick"
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
			>
				<slot></slot>
			</view>
		</u-transition>
	</view>
</template>

<script>
	export default {
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
				if (this.safeAreaInsetTop & this.mode !== 'bottom') {
					// 通过加入pandding-top避开安全局
					style.paddingTop = uni.$u.addUnit(safeAreaInsets.top)
				}
				// 顶部弹出时，是不需要底部安全区的，因为它没有触及屏幕底部
				// 底部弹出时，也是不需要顶部安全局内边距的
				if (this.safeAreaInsetBottom & this.mode !== 'top') {
					style.paddingBottom = uni.$u.addUnit(safeAreaInsets.bottom)
				}
				if (this.mode !== 'center') {
					style.flex = 1
				}
				return style
			},
			position() {
				if (this.mode === 'center') {
					return 'fade'
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
			transitionClick() {
				if (this.mode === 'center') {
					this.overlayClick()
				}
			}

		}
	}
</script>

<style lang="scss">
	@import "../../libs/css/components.scss";

	.u-popup {
		flex: 1;

		&__content {
			background-color: #FFFFFF;
		}
	}
</style>
