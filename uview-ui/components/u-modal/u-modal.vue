<template>
	<u-popup
		mode="center"
		:zoom="zoom"
		:show="show"
		:customStyle="{
			borderRadius: '6px', 
			overflow: 'hidden',
			marginTop: `-${$u.addUnit(negativeTop)}`
		}"
		:closeOnClickOverly="closeOnClickOverly"
		:safeAreaInsetBottom="false"
		:duration="400"
		@click="clickHandler"
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
			<view
				class="u-modal__button-group--confirm-button"
				v-if="$slots.confirmButton"
			>
				<slot name="confirmButton"></slot>
			</view>
			<template v-else>
				<u-line></u-line>
				<view
					class="u-modal__button-group"
					:style="{
						flexDirection: buttonReverse ? 'row-reverse' : 'row'
					}"
				>
					<view
						class="u-modal__button-group__wrapper u-modal__button-group__wrapper--cancel"
						:hover-stay-time="150"
						hover-class="u-modal__button-group__wrapper--hover"
						:class="[showCancelButton && !showConfirmButton && 'u-modal__button-group__wrapper--only-cancel']"
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
					<u-line
						direction="column"
						v-if="showConfirmButton && showCancelButton"
					></u-line>
					<view
						class="u-modal__button-group__wrapper u-modal__button-group__wrapper--confirm"
						:hover-stay-time="150"
						hover-class="u-modal__button-group__wrapper--hover"
						:class="[!showCancelButton && showConfirmButton && 'u-modal__button-group__wrapper--only-confirm']"
						v-if="showConfirmButton"
						@tap="confirmHandler"
					>
						<u-loading-icon v-if="loading"></u-loading-icon>
						<text
							v-else
							class="u-modal__button-group__wrapper__text"
							:style="{
								color: confirmColor
							}"
						>{{ confirmText }}</text>
					</view>
				</view>
			</template>
		</view>
	</u-popup>
</template>

<script>
	import props from './props.js';
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
				// 为了避免第一次打开modal，又使用了异步关闭的loading
				// 第二次打开modal时，loading依然存在的情况
				if (n && this.loading) this.loading = false
			}
		},
		methods: {
			// 点击确定按钮
			confirmHandler() {
				// 如果配置了异步关闭，将按钮值为loading状态
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
			// 从原理上来说，modal的遮罩点击，并不是真的点击到了遮罩
			// 因为modal依赖于popup的中部弹窗类型，中部弹窗比较特殊，虽有然遮罩，但是为了让弹窗内容能flex居中
			// 多了一个透明的遮罩，此透明的遮罩会覆盖在灰色的遮罩上，所以实际上是点击不到灰色遮罩的，popup内部在
			// 透明遮罩的子元素做了.stop处理，所以点击内容区，也不会导致误触发
			clickHandler() {
				if (this.closeOnClickOverly) {
					this.$emit('close')
				}
			}
		}
	}
</script>

<style lang="scss">
	@import "../../libs/css/components.scss";
	$u-modal-border-radius: 6px;

	.u-modal {
		width: 650rpx;
		border-radius: $u-modal-border-radius;
		overflow: hidden;

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
				flex: 1;
			}
		}

		&__button-group {
			@include flex;

			&--confirm-button {
				flex-direction: column;
				padding: 0px 25px 15px 25px;
			}

			&__wrapper {
				flex: 1;
				@include flex;
				justify-content: center;
				align-items: center;
				height: 48px;
				
				&--confirm,
				&--only-cancel {
					border-bottom-right-radius: $u-modal-border-radius;
				}
				
				&--cancel,
				&--only-confirm {
					border-bottom-left-radius: $u-modal-border-radius;
				}

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
