<template>
	<u-transition
	    :show="loading"
	    :custom-style="{ 
		position: 'fixed',
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		backgroundColor: bgColor
	}"
	>
		<view class="u-loading-page">
			<view class="u-loading-page__warpper">
				<view class="u-loading-page__warpper__loading-icon">
					<image
					    v-if="image"
					    :src="image"
					    class="u-loading-page__warpper__loading-icon__img"
					    mode="widthFit"
					></image>
					<u-loading-icon
					    v-else
					    :mode="loadingMode"
					    size="28"
					    :color="loadingColor"
					></u-loading-icon>
				</view>
				<slot>
					<text
					    class="u-loading-page__warpper__text"
					    :style="{
							fontSize: $u.addUnit(fontSize),
							color: color
						}"
					>{{loadingText}}</text>
				</slot>
			</view>
		</view>
	</u-transition>
</template>

<script>
	/**
	 * loadingPage 加载动画
	 * @description 警此组件为一个小动画，目前用在uView的loadmore加载更多和switch开关等组件的正在加载状态场景。
	 * @tutorial https://www.uviewui.com/components/loading.html
	 * @property {Number String} loadingText 提示内容  (默认“正在加载”)
	 * @property {String}  image  文字上方用于替换loading动画的图片
	 * @property {String}  loadingMode  加载动画的模式，circle-圆形，spinner-花朵形，semicircle-半圆形 （默认 circle）
	 * @property {Boolean}  loading  是否加载中 （默认 false）
	 * @property {String}  bgColor   背景色 （默认 #fff）
	 * @property {Object}  customStyle 自定义样式
	 * @example <u-loading mode="circle"></u-loading>
	 */
	export default {
		name: 'u-loading-page',
		mixins: [uni.$u.mixin],
		props: {
			// 提示内容
			loadingText: {
				type: [Number, String],
				default: uni.$u.props.loadingPage.loadingText
			},
			// 文字上方用于替换loading动画的图片
			image: {
				type: String,
				default: uni.$u.props.loadingPage.image
			},
			// 加载动画的模式，circle-圆形，spinner-花朵形，semicircle-半圆形
			loadingMode: {
				type: String,
				default: uni.$u.props.loadingPage.loadingMode
			},
			// 是否加载中
			loading: {
				type: Boolean,
				default: uni.$u.props.loadingPage.loading
			},
			// 背景色
			bgColor: {
				type: String,
				default: uni.$u.props.loadingPage.bgColor
			},
			// 文字大小
			fontSize: {
				type: [String, Number],
				default: uni.$u.props.loadingPage.fontSize
			},
			// 文字颜色
			color: {
				type: String,
				default: uni.$u.props.loadingPage.color
			},
			// 加载中图标的颜色，只能rgb或者十六进制颜色值
			loadingColor: {
				type: String,
				default: uni.$u.props.loadingPage.loadingColor
			}
		},
		data() {
			return {

			}
		},
		methods: {

		}
	}
</script>

<style lang="scss">
	@import "../../libs/css/components.scss";

	$text-color: rgb(200, 200, 200) !default;
	$text-size: 19px !default;
	$u-loading-icon-margin-bottom: 10px !default;

	.u-loading-page {
		@include flex(column);
		flex: 1;
		align-items: center;
		justify-content: center;

		&__warpper {
			margin-top: -150px;
			justify-content: center;
			align-items: center;
			/* #ifndef APP-NVUE */
			color: $text-color;
			font-size: $text-size;
			/* #endif */

			&__loading-icon {
				margin-bottom: $u-loading-icon-margin-bottom;

				&__img {
					width: 40px;
					height: 40px;
				}
			}

			&__text {
				font-size: $text-size;
				color: $text-color;
			}
		}
	}
</style>
