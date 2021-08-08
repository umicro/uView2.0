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
	export default {
		mixins: [uni.$u.mixin],
		props: {
			// 显示的内容，字符串
			text: {
				type: [Array],
				default: ''
			},
			// 是否显示左侧的音量图标
			icon: {
				type: String,
				default: 'volume'
			},
			// 通告模式，link-显示右箭头，closable-显示右侧关闭图标
			mode: {
				type: String,
				default: ''
			},
			// 文字颜色，各图标也会使用文字颜色
			color: {
				type: String,
				default: '#f9ae3d'
			},
			// 背景颜色
			bgColor: {
				type: String,
				default: '#fdf6ec'
			},
			// 字体大小，单位px
			fontSize: {
				type: [Number, String],
				default: 14
			},
			// 水平滚动时的滚动速度，即每秒滚动多少px(px)，这有利于控制文字无论多少时，都能有一个恒定的速度
			speed: {
				type: [Number, String],
				default: 80
			},
			// direction = row时，是否使用步进形式滚动
			step: {
				type: Boolean,
				default: false
			},
			// 滚动一个周期的时间长，单位ms
			duration: {
				type: [Number, String],
				default: 1500
			},
			// 是否禁止用手滑动切换
			// 目前HX2.6.11，只支持App 2.5.5+、H5 2.5.5+、支付宝小程序、字节跳动小程序
			disableTouch: {
				type: Boolean,
				default: true
			},
		},
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
