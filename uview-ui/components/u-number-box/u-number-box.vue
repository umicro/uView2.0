<template>
	<view class="u-number-box">
		<view
		    class="u-number-box__minus"
		    @touchstart.stop.prevent="btnTouchStart('minus')"
		    @touchend.stop.prevent="clearTimer"
		    :class="{ 'u-number-box__minus--disabled': disabled || inputVal <= min }"
		    :style="{
				background: bgColor,
				height: inputHeight + 'rpx',
				color: color
			}"
		>
			<u-icon
			    name="minus"
			    :size="size"
			></u-icon>
		</view>
		<input
		    :disabled="disabledInput || disabled"
		    :cursor-spacing="getCursorSpacing"
		    :class="{ 'u-number-box__input--disabled': disabled }"
		    v-model="inputVal"
		    class="u-number-box__input"
		    @blur="onBlur"
		    @focus="onFocus"
		    type="number"
		    :style="{
				color: color,
				fontSize: size + 'rpx',
				background: bgColor,
				height: inputHeight + 'rpx',
				width: inputWidth + 'rpx'
			}"
		/>
		<view
		    class="u-number-box__plus"
		    @touchstart.stop.prevent="btnTouchStart('plus')"
		    @touchend.stop.prevent="clearTimer"
		    :class="{ 'u-number-box__plus--disabled': disabled || inputVal >= max }"
		    :style="{
				background: bgColor,
				height: inputHeight + 'rpx',
				color: color
			}"
		>
			<u-icon
			    name="plus"
			    :size="size"
			></u-icon>
		</view>
	</view>
</template>

<script>
	import props from 'props.js'
	export default {
		name: 'u-number-box',
		mixins: [uni.$u.mixin, props],
		data() {
			return {

			}
		},
		methods: {

		}
	}
</script>

<style lang="scss">
	@import '../../libs/css/components.scss';

	.u-number-box {

		&__plus,
		&__minus {
			width: 35px;
			@include flex;
			justify-content: center;
			align-items: center;
			/* #ifndef APP-NVUE */
			touch-action: none;
			/* #endif */
			
			&--disabled {
				color: #c8c9cc;
				background: #f7f8fa;
			}
		}

		&__plus {
			border-top-right-radius: 4px;
			border-bottom-right-radius: 4px;
		}

		&__minus {
			border-top-left-radius: 4px;
			border-bottom-left-radius: 4px;
		}

		&__input {
			position: relative;
			text-align: center;
			padding: 0;
			margin: 0 12px;
			@include flex;
			align-items: center;
			justify-content: center;

			&--disabled {
				color: #c8c9cc;
				background-color: #f2f3f5;
			}
		}
	}
</style>
