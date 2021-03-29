<template>
	<u-popup
		mode="center"
		:show="show"
		:customStyle="{
			borderRadius: '8px', 
			overflow: 'hidden',
			marginTop: `-${$u.addUnit(negativeTop)}`
		}"
		:closeOnClickOverly="closeOnClickOverly"
		@close="close"
	>
		<view
			class="u-modal"
			:style="{
			width: $u.addUnit(width),
		}"
		>
			<text
				class="u-modal__title"
				v-if="title"
			>{{ title }}</text>
			<view
				class="u-modal__content"
				:style="{
				paddingTop: `${title ? 12 : 25}px`
			}"
			>
				<slot>
					<text class="u-modal__content__text">{{ content }}</text>
				</slot>
			</view>
			<u-line v-if="showCancelButton || (!$slots.confirmButton)"></u-line>
			<view
				class="u-modal__button-group"
				:style="{
					flexDirection: buttonReverse ? 'row-reverse' : 'row'
				}"
			>
				<view
					class="u-modal__button-group__wrapper"
					:hover-stay-time="150"
					hover-class="u-modal__button-group__wrapper--hover"
					v-if="showCancelButton"
					@tap="cancelHandler"
				>
					<text
						class="u-modal__button-group__wrapper__text"
						:style="{
							color: cancelColor
						}"
					>{{ cancelText }}</text>
				</view>
				<u-line direction="column"></u-line>
				<view
					class="u-modal__button-group__wrapper"
					:hover-stay-time="150"
					hover-class="u-modal__button-group__wrapper--hover"
					v-if="showConfirmButton"
					@tap="confirmHandler"
				>
					<slot name="confirmButton">
						<u-loading-icon v-if="loading"></u-loading-icon>
						<text
							v-else
							class="u-modal__button-group__wrapper__text"
							:style="{
								color: confirmColor
							}"
						>{{ confirmText }}</text>
					</slot>
				</view>
			</view>
		</view>
	</u-popup>
</template>

<script>
	import props from './props.js'
	export default {
		name: 'u-modal',
		mixins: [uni.$u.mixin, props],
		data() {
			return {
				loading: false
			}
		},
		watch: {
			show(n) {
				if (n && this.asyncClose) this.loading = false
			}
		},
		methods: {
			// 点击确定按钮
			confirmHandler() {
				if (this.asyncClose) {
					this.loading = true;
				}
				this.$emit('confrim')
			},
			// 点击取消按钮
			cancelHandler() {
				this.$emit('cancel')
			},
			// 点击遮罩
			close() {
				if (this.closeOnClickOverly) {
					this.$emit('close')
					this.$emit('cancel')
				}
			}
		}
	}
</script>

<style lang="scss">
	@import "../../libs/css/components.scss";

	.u-modal {
		width: 650rpx;
		border-radius: 16px;

		&__title {
			font-size: 16px;
			font-weight: bold;
			color: $u-content-color;
			text-align: center;
			padding-top: 25px;
		}

		&__content {
			padding: 12px 25px 25px 25px;
			@include flex;
			justify-content: center;

			&__text {
				font-size: 15px;
				color: $u-content-color;
			}
		}

		&__button-group {
			@include flex;

			&__wrapper {
				flex: 1;
				padding: 15px 0;

				&--hover {
					background-color: $u-bg-color;
				}

				&__text {
					color: $u-content-color;
					font-size: 16px;
					text-align: center;
				}
			}
		}
	}
</style>
