<template>
	<view class="u-navbar">
		<view
			class="u-navbar__placeholder"
			v-if="fixed && placeholder"
			:style="{
				height: $u.addUnit($u.getPx(height) + $u.sys().statusBarHeight),
			}"
		></view>
		<view :class="[fixed && 'u-navbar--fixed']">
			<u-status-bar
				v-if="safeAreaInsetTop"
				:bgColor="bgColor"
			></u-status-bar>
			<view
				class="u-navbar__content"
				:class="[border && 'u-border-bottom']"
				:style="{
					height: $u.addUnit(height),
					backgroundColor: bgColor,
				}"
			>
				<view
					class="u-navbar__content__left"
					hover-class="u-navbar__content__left--hover"
					hover-start-time="150"
					@tap="leftClick"
				>
					<slot name="left">
						<u-icon
							v-if="leftIcon"
							:name="leftIcon"
							size="20"
						></u-icon>
						<text
							v-if="leftText"
							class="u-navbar__content__left__text"
						>{{ leftText }}</text>
					</slot>
				</view>
				<text
					class="u-line-1 u-navbar__content__title"
					:style="{
					width: $u.addUnit(titleWidth)
				}"
				>{{ title }}</text>
				<view
					class="u-navbar__content__right"
					v-if="$slots.right || rightIcon || rightText"
					@tap="rightClick"
				>
					<slot name="right">
						<u-icon
							v-if="rightIcon"
							:name="rightIcon"
							size="20"
						></u-icon>
						<text
							v-if="rightText"
							class="u-navbar__content__right__text"
						>{{ rightText }}</text>
					</slot>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import props from './props.js'
	export default {
		name: 'u-navbar',
		mixins: [uni.$u.mixin, props],
		data() {
			return {

			}
		},
		methods: {
			// 点击左侧区域
			leftClick() {
				this.$emit('leftClick')
			},
			// 点击右侧区域
			rightClick() {
				this.$emit('rightClick')
			},
		}
	}
</script>

<style lang="scss">
	@import "../../libs/css/components.scss";

	.u-navbar {

		&--fixed {
			position: fixed;
			left: 0;
			right: 0;
			top: 0;
			z-index: 11;
		}

		&__content {
			@include flex(row);
			align-items: center;
			height: 44px;
			background-color: #9acafc;
			position: relative;
			justify-content: center;

			&__left,
			&__right {
				padding: 0 13px;
				position: absolute;
				top: 0;
				bottom: 0;
				@include flex(row);
				align-items: center;
			}

			&__left {
				left: 0;
				
				&--hover {
					opacity: 0.7;
				}

				&__txet {
					font-size: 15px;
					margin-left: 3px;
				}
			}

			&__title {
				text-align: center;
				font-size: 16px;
				color: $u-main-color;
			}

			&__right {
				right: 0;

				&__txet {
					font-size: 15px;
					margin-left: 3px;
				}
			}
		}
	}
</style>
