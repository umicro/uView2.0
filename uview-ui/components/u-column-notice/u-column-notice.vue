<template>
	<view
		class="u-notice"
		@tap="clickHandler"
	>
		<slot name="icon">
			<view
				class="u-notice__left-icon"
				v-if="icon"
			>
				<u-icon
					:name="icon"
					:color="color"
					size="19"
				></u-icon>
			</view>
		</slot>
		<swiper
			:disable-touch="disableTouch"
			:vertical="step ? false : true"
			circular
			:interval="duration"
			:autoplay="true"
			class="u-notice__swiper"
		>
			<swiper-item
				v-for="(item, index) in text"
				:key="index"
				class="u-notice__swiper__item"
			>
				<text
					class="u-notice__swiper__item__text u-line-1"
					:style="[textStyle]"
				>{{ item }}</text>
			</swiper-item>
		</swiper>
		<view
			class="u-notice__right-icon"
			v-if="mode"
		>
			<u-icon
				v-if="mode === 'link'"
				name="arrow-right"
				:size="17"
				:color="color"
			></u-icon>
			<u-icon
				v-if="mode === 'closable'"
				name="close"
				:size="16"
				:color="color"
				@click="close"
			></u-icon>
		</view>
	</view>
</template>

<script>
	import props from './props.js';
	export default {
		mixins: [uni.$u.mixin,props],
		watch: {
			text: {
				immediate: true,
				handler(newValue, oldValue) {
					if(!uni.$u.test.array(newValue)) {
						uni.$u.error('column模式要求text参数为数组')
					}
				}
			}
		},
		computed: {
			// 文字内容的样式
			textStyle() {
				let style = {}
				style.color = this.color
				style.fontSize = uni.$u.addUnit(this.fontSize)
				return style
			},
			// 垂直或者水平滚动
			vertical() {
				if (this.mode == 'horizontal') return false
				else return true
			},
		},
		data() {
			return {

			}
		},
		methods: {
			// 点击通告栏
			clickHandler(index) {
				this.$emit('click', index)
			},
			// 点击关闭按钮
			close() {
				this.$emit('close')
			}
		}
	};
</script>

<style lang="scss">
	@import "../../libs/css/components.scss";

	.u-notice {
		@include flex;
		align-items: center;
		justify-content: space-between;

		&__left-icon {
			align-items: center;
			margin-right: 5px;
		}

		&__right-icon {
			margin-left: 5px;
			align-items: center;
		}

		&__swiper {
			height: 16px;
			@include flex;
			align-items: center;
			flex: 1;

			&__item {
				@include flex;
				align-items: center;
				overflow: hidden;

				&__text {
					font-size: 14px;
					color: $u-warning;
					/* #ifndef APP-NVUE */
					word-break: keep-all;
					white-space: nowrap;
					animation: u-loop-animation 10s linear infinite both;
					/* #endif */
				}
			}
		}
	}
</style>
