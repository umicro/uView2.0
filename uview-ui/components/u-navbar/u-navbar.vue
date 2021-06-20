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
				    @tap="leftClick"
				>
					<slot name="left">
						<u-icon
						    v-if="leftIcon"
						    :name="leftIcon"
						    size="20"
						></u-icon>
						<u--text
						    v-if="leftText"
						    :text="leftText"
						    size="15"
						    margin="0 0 0 3px"
						    :customStyle="{
								width: $u.addUnit(titleWidth)
							}"
						></u--text>
					</slot>
				</view>
				<u--text
				    class="u-navbar__content__title"
				    :text="title"
				    lines="1"
				    align="center"
				    size="16"
				    type="main"
				    block
				></u--text>
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
						<u--text
						    v-if="rightText"
						    :text="rightText"
						    size="15"
						    margin="0 0 0 3px"
						></u--text>
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
			}

			&__title {}

			&__right {
				right: 0;
			}
		}
	}
</style>
