<template>
	<view class="u-switch">
		<view
		    class="u-switch__content"
		    :class="[value && 'u-switch--on', disabled && 'u-switch--disabled']"
		    @tap="onClick"
		    :style="[switchStyle, customStyle]"
		>
		</view>
		<view
		    class="u-switch__node node-class"
		    :class="[value && 'u-switch__node--on']"
		    :style="{
				width: $u.addUnit(this.size),
				height: $u.addUnit(this.size)
			}"
		>
			<u-loading-icon
			    :show="loading"
			    mode="circle"
			    :size="size * 0.8"
			/>
		</view>
	</view>
</template>

<script>
	/**
	 * switch 开关选择器
	 * @description 选择开关一般用于只有两个选择，且只能选其一的场景。
	 * @tutorial https://www.uviewui.com/components/switch.html
	 * @property {Boolean} loading 是否处于加载中（默认false） 
	 * @property {Boolean} disabled 是否禁用（默认false）
	 * @property {String Number} size 开关尺寸，单位rpx（默认50）
	 * @property {String} active-color 打开时的背景色（默认#2979ff）
	 * @property {Boolean} inactive-color 关闭时的背景色（默认#ffffff）
	 * @property {Boolean | Number | String} active-value 打开选择器时通过change事件发出的值（默认true）
	 * @property {Boolean | Number | String} inactive-value 关闭选择器时通过change事件发出的值（默认false）
	 * @event {Function} change 在switch打开或关闭时触发
	 * @example <u-switch v-model="checked" active-color="red" inactive-color="#eee"></u-switch>
	 */
	export default {
		name: "u-switch",
		mixins: [uni.$u.mixin],
		props: {
			// 是否为加载中状态
			loading: {
				type: Boolean,
				default: false
			},
			// 是否为禁用装填
			disabled: {
				type: Boolean,
				default: false
			},
			// 开关尺寸，单位rpx
			size: {
				type: [Number, String],
				default: 28
			},
			// 打开时的背景颜色
			activeColor: {
				type: String,
				default: '#2979ff'
			},
			// 关闭时的背景颜色
			inactiveColor: {
				type: String,
				default: '#ffffff'
			},
			// 通过v-model双向绑定的值
			value: {
				type: Boolean,
				default: false
			},
			// 是否使手机发生短促震动，目前只在iOS的微信小程序有效(2020-05-06)
			vibrateShort: {
				type: Boolean,
				default: false
			},
			// 打开选择器时的值
			activeValue: {
				type: [Number, String, Boolean],
				default: true
			},
			// 关闭选择器时的值
			inactiveValue: {
				type: [Number, String, Boolean],
				default: false
			},
		},
		data() {
			return {

			}
		},
		computed: {
			switchStyle() {
				let style = {};
				style.fontSize = uni.$u.addUnit(this.size)
				style.width = uni.$u.addUnit(this.size * 2)
				style.height = uni.$u.addUnit(this.size + 2)
				style.backgroundColor = this.value ? this.activeColor : this.inactiveColor
				return style;
			},
		},
		methods: {
			onClick() {
				if (!this.disabled && !this.loading) {
					// 使手机产生短促震动，微信小程序有效，APP(HX 2.6.8)和H5无效
					if (this.vibrateShort) uni.vibrateShort()
					this.$emit('input', !this.value)
					// 放到下一个生命周期，因为双向绑定的value修改父组件状态需要时间，且是异步的
					this.$nextTick(() => {
						this.$emit('change', this.value ? this.activeValue : this.inactiveValue)
					})
				}
			}
		}
	};
</script>

<style lang="scss">
	@import "../../libs/css/components.scss";

	.u-switch {
		
		&__content {
			position: relative;
			/* #ifndef APP-NVUE */
			display: inline-block;
			box-sizing: border-box;
			/* #endif */
			background-color: #fff;
			border-width: 1px;
			border-color: rgba(0, 0, 0, 0.08);
			border-top-left-radius: 100px;
			border-top-right-radius: 100px;
			border-bottom-left-radius: 100px;
			border-bottom-right-radius: 100px;
			transition: background-color 0.3s;
		}
	}

	.u-switch__node {
		@include flex;
		align-items: center;
		justify-content: center;
		position: absolute;
		top: 1px;
		left: 1px;
		border-radius: 100%;
		z-index: 1;
		background-color: #fff;
		background-color: #fff;
		box-shadow: rgba(0, 0, 0, 0.2) 2px 2px 3px;;
		transition-property: transform;
		transition-duration: 0.3s;
		transition-timing-function: cubic-bezier(0.3, 1.05, 0.4, 1.05);

		&--on {
			transform: translateX(100%);
		}
	}

	.u-switch__loading {
		@include flex;
		align-items: center;
		justify-content: center;
	}

	.u-switch--on {
		background-color: #1989fa;
	}

	.u-switch--disabled {
		opacity: 0.4;
	}
</style>
