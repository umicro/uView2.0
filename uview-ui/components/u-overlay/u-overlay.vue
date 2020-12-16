<template>
	<u-transition
	    :show="show"
	    custom-class="u-overlay"
	    :duration="duration"
	    :custom-style="overlyStyle"
	    @click="clickHandler"
	    @touchmove="noop"
	>
		<slot />
	</u-transition>
</template>

<script>
	/**
	 * mask 遮罩
	 * @description 创建一个遮罩层，用于强调特定的页面元素，并阻止用户对遮罩下层的内容进行操作，一般用于弹窗场景
	 * @tutorial https://www.uviewui.com/components/mask.html
	 * @property {Boolean} show 是否显示遮罩（默认false）
	 * @property {String Number} z-index z-index 层级（默认1070）
	 * @property {Object} custom-style 自定义样式对象，见上方说明
	 * @property {String Number} duration 动画时长，单位毫秒（默认300）
	 * @event {Function} click 点击遮罩发送事件
	 * @example <u-mask :show="show" @click="show = false"></u-mask>
	 */
	export default {
		name: "u-mask",
		props: {
			// 是否显示遮罩
			show: {
				type: Boolean,
				default: uni.$u.props.overlay.show
			},
			// 层级z-index
			zIndex: {
				type: [Number, String],
				default: uni.$u.props.overlay.zIndex
			},
			// 遮罩的过渡时间，单位为ms
			duration: {
				type: [Number, String],
				default: uni.$u.props.overlay.duration
			},
			// 不透明度值，当做rgba的第四个参数
			opacity: {
				type: [Number, String],
				default: uni.$u.props.overlay.opacity
			}
		},
		mixins: [uni.$u.mixin],
		computed: {
			overlyStyle() {
				const style = {
					position: 'fixed',
					top: 0,
					left: 0,
					right: 0,
					zIndex: this.zIndex,
					bottom: 0,
					'background-color': `rgba(0, 0, 0, ${this.opacity})`
				}
				return uni.$u.deepMerge(style, this.customStyle)
			}
		},
		methods: {
			clickHandler() {
				this.$emit('click')
			}
		}
	}
</script>

<style lang="scss">
	@import "../../libs/css/components.scss";

	.u-overlay {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, .7);
	}
</style>
