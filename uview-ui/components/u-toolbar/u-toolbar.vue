<template>
	<view
		class="u-toolbar"
		v-if="show"
	>
		<text
			class="u-toolbar__cancel"
			:style="{
				color: cancelColor
			}"
		>{{ cancelText }}</text>
		<text
			class="u-toolbar__title u-line-1"
			v-if="title"
		>{{ title }}</text>
		<text
			class="u-toolbar__confirm"
			:style="{
				color: confirmColor
			}"
		>{{ cancelText }}</text>
	</view>
</template>

<script>
	export default {
		name: 'u-toolbar',
		mixins: [uni.$u.mixin],
		props: {
			// 是否展示工具条
			show: {
				type: Boolean,
				default: true
			},
			// 取消按钮的文字
			cancelText: {
				type: String,
				default: '取消'
			},
			// 确认按钮的文字
			confirmText: {
				type: String,
				default: '取消'
			},
			// 取消按钮的颜色
			cancelColor: {
				type: String,
				default: '#909193'
			},
			// 确认按钮的颜色
			confirmColor: {
				type: String,
				default: '#3c9cff'
			},
			// 标题文字
			title: {
				type: String,
				default: ''
			}
		},
	}
</script>

<style lang="scss">
	@import "../../libs/css/components.scss";

	.u-toolbar {
		height: 42px;
		@include flex;
		justify-content: space-between;
		align-items: center;

		&__cancel {
			color: $u-tips-color;
			font-size: 14px;
			padding: 0 15px;
		}

		&__title {
			color: $u-main-color;
			padding: 0 50px;
			font-size: 16px;
		}

		&__confirm {
			color: $u-primary;
			font-size: 14px;
			padding: 0 15px;
		}
	}
</style>
