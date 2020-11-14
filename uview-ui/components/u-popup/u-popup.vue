<template>
	<view class="u-popup">
		<u-overlay :show="show" @click="overlayClick"></u-overlay>
		<u-transition :show="show" :custom-style="transitionStyle" :mode="mode" @click="transitionClick">
			<view class="u-popup__content" :style="[contentStyle]" @tap.stop="noop">
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
				default: false
			},
			// 是否显示遮罩
			overlay: {
				type: Boolean,
				default: true
			},
			// 弹出的方向，可选值为 top bottom right left center
			position: {
				type: String,
				default: 'center'
			},
			// 动画时长，单位ms
			duration: {
				type: [String, Number],
				default: 300
			},
			// 圆角值
			borderRadis: {
				type: [String, Number],
				default: 0
			},
			// 是否显示关闭图标
			closeable: {
				type: Boolean,
				default: false
			},
			// 是否为iPhoneX预留底部的安全距离
			safeAreaInsetBottom: {
				type: Boolean,
				default: true
			},
			// 是否留出顶部安全距离(状态栏高度)
			safeAreaInsetTop: {
				type: Boolean,
				default: false
			},
			// 自定义遮罩的样式
			overlayStyle: {
				type: Object,
				default () {
					return {}
				}
			},
			// 点击遮罩是否关闭弹窗
			closeOnClickOverly: {
				type: Boolean,
				default: true
			},
			// 层级
			zIndex: {
				type: [String, Number],
				default: 1075
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
				style[this.position] = 0
				if (this.position === 'left') {
					return this.$u.deepMerge(style, {
						bottom: 0,
						top: 0,
					})
				} else if(this.position === 'right') {
					return this.$u.deepMerge(style, {
						bottom: 0,
						top: 0,
					})
				} else if(this.position === 'top') {
					return this.$u.deepMerge(style, {
						left: 0,
						right: 0,
					})
				} else if(this.position === 'bottom') {
					return this.$u.deepMerge(style, {
						left: 0,
						right: 0,
					})
				} else if(this.position === 'center') {
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
				if(this.position !== 'center') {
					style.flex = 1
				}
				return style
			},
			mode() {
				if (this.position === 'center') {
					return 'fade'
				}
				if (this.position === 'left') {
					return 'slide-left'
				}
				if (this.position === 'right') {
					return 'slide-right'
				}
				if (this.position === 'bottom') {
					return 'slide-up'
				}
				if (this.position === 'top') {
					return 'slide-down'
				}
			}
		},
		methods: {
			// 点击遮罩
			overlayClick() {
				if (this.closeOnClickOverly) {
					this.$emit('close')
				}
			},
			transitionClick() {
				if (this.position === 'center') {
					this.overlayClick()
				}
			}

		}
	}
</script>

<style lang="scss">
	.u-popup {
		flex: 1;
		height: 500px;

		&__content {
			background-color: red;
		}
	}
</style>
