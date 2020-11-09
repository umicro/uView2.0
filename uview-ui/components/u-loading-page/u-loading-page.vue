<template>
	<u-transition
	 :show="loading"
	 :custom-style="{ 
		position: 'fixed',
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
	}">
		<view class="u-loading-page">
			<view class="u-loading-page__warpper">
				<u-loading-icon :mode="loadingMode" size="25" color="rgb(210, 210, 210)"></u-loading-icon>
				<text class="u-loading-page__warpper__text">{{loadingText}}</text>
			</view>
		</view>
	</u-transition>
</template> 

<script>
	export default {
		props: {
			// 提示内容
			loadingText: {
				type: [Number, String],
				default: '正在加载'
			},
			// 文字上方用于替换loading动画的图片
			image: {
				type: String,
				default: ''
			},
			// 加载动画的模式，circle-圆形，spinner-花朵形，semicircle-半圆形
			loadingMode: {
				type: String,
				default: 'circle'
			},
			// 是否加载中
			loading: {
				type: Boolean,
				default: false
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

	.u-loading-page {
		@include flex(column);
		flex: 1;
		align-items: center;
		justify-content: center;

		&__warpper {
			margin-top: -150px;

			&__text {
				font-size: 16px;
				color: rgb(220, 220, 220);
				margin-top: 8px;
			}
		}
	}
</style>
