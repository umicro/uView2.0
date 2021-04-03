<template>
	<view class="u-swipe-action-item">
		<view
			class="u-swipe-action-item__content"
			@touchstart="wxs.touchstart"
			@touchmove="wxs.touchmove"
			@touchend="wxs.touchend"
			:size="size"
			:change:size="wxs.sizeChange"
		>
			<slot />
		</view>
		<view class="u-swipe-action-item__right">
			<!-- <view class="u-swipe-action-item__right__wrapper">
				<view
					v-for="(item,index) in rightOptions"
					:key="index"
					class="u-swipe-action-item__right__wrapper__button"
					:style="{
						backgroundColor: item.style && item.style.backgroundColor ? item.style.backgroundColor : '#C7C6CD',
						fontSize: item.style && item.style.fontSize ? item.style.fontSize : '16px'
					}"
				>
					<text class="u-swipe-action-item__buttons__button__text">{{ item.text }}</text>
				</view>
			</view> -->
			<view
				v-for="(item,index) in rightOptions"
				:key="index"
				class="u-swipe-action-item__right__button"
				:style="{
					backgroundColor: item.style && item.style.backgroundColor ? item.style.backgroundColor : '#C7C6CD',
					fontSize: item.style && item.style.fontSize ? item.style.fontSize : '16px'
				}"
			>
				<text class="u-swipe-action-item__right__button__text u-line-1">{{ item.text }}</text>
			</view>
		</view>
	</view>
</template>

<script
	src="./index.wxs"
	module="wxs"
	lang="wxs"
></script>
<script>
	import props from './props.js';
	export default {
		name: 'u-swipe-action-item',
		inject: ['swipeAction'],
		mixins: [uni.$u.mixin, props],
		data() {
			return {
				// 按钮的尺寸信息
				size: null,
			}
		},
		mounted() {
			this.init()
			uni.$u.sleep(3000).then(() => {
				this.abc = 34
			})
		},
		methods: {
			init() {
				this.queryRect()
			},
			queryRect() {
				this.$uGetRect('.u-swipe-action-item__right__button', true).then(buttons => {
					this.size = {
						buttons,
						show: this.show,
						disabled: this.disabled,
						threshold: this.threshold,
						duration: this.duration
					}
				})
			}
		},
	}
</script>

<style lang="scss">
	@import "../../libs/css/components.scss";

	.u-swipe-action-item {
		position: relative;
		overflow: hidden;
		// @include flex;

		&__right {
			position: absolute;
			top: 0;
			bottom: 0;
			right: 0;
			transform: translateX(100%);
				
			&__button {
				@include flex;
				position: absolute;
				top: 0;
				bottom: 0;
				padding: 0 16px;
				
				&__text {
					flex: 1;
					@include flex;
					align-items: center;
					color: #FFFFFF;
					font-size: 15px;
				}
			}
		}
	}
</style>
