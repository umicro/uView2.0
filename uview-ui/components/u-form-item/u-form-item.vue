<template>
	<view class="u-from-item">
		<view
			class="u-form-item__body"
			:style="{
				flexDirection: parentData.labelPosition === 'left' ? 'row' : 'column'
			}"
		>
			<!-- 微信小程序中，将一个参数设置空字符串，结果会变成字符串"true" -->
			<slot name="label">
				<view
					class="u-form-item__body__left"
					:style="{
						width: $u.addUnit(labelWidth || parentData.labelWidth),
						marginBottom: parentData.labelPosition === 'left' ? 0 : '5px',
					}"
				>
					<!-- 为了块对齐 -->
					<view
						class="u-form-item__body__left__content"
						v-if="required || leftIcon || label"
					>
						<!-- nvue不支持伪元素before -->
						<text
							v-if="required"
							class="u-form-item__body__left__content__required"
						>*</text>
						<view
							class="u-form-item__body__left__content__icon"
							v-if="leftIcon"
						>
							<u-icon
								:name="leftIcon"
								:custom-style="leftIconStyle"
							></u-icon>
						</view>
						<text
							class="u-form-item__body__left__content__label"
							:style="[parentData.labelStyle, {
								justifyContent: parentData.labelAlign === 'left' ? 'flex-start' : elLabelAlign === 'center' ? 'center' : 'flex-end'
							}]"
						>{{ label }}</text>
					</view>
				</view>
			</slot>
			<view class="u-form-item__body__right">
				<view class="u-form-item__body__right__content">
					<view class="u-form-item__body__right__content__slot">
						<slot />
					</view>
					<view
						class="item__body__right__content__icon"
						v-if="$slots.right"
					>
						<slot name="right" />
					</view>
				</view>
				<slot name="error">
					<text
						v-if="!!message"
						class="u-form-item__body__right__message"
					>{{ message }}</text>
				</slot>
			</view>
		</view>
	</view>
</template>

<script>
	import props from './props.js'
	export default {
		name: 'u-form-item',
		mixins: [uni.$u.mixin, props],
		data() {
			return {
				// 错误提示语
				message: '',
				parentData: {
					// 提示文本的位置
					labelPosition: 'left',
					// 提示文本对齐方式
					labelAlign: 'left',
					// 提示文本的样式
					labelStyle: {},
					// 提示文本的宽度
					labelWidth: 90
				}
			}
		},
		// 组件创建完成时，将当前实例保存到u-form中
		mounted() {
			this.init()
		},
		methods: {
			init() {
				// 父组件的实例
				this.updateParentData()
				if (!this.parent) {
					uni.$u.error('u-form-item需要结合u-form组件使用')
				}
			},
			// 获取父组件的参数
			updateParentData() {
				// 此方法写在mixin中
				this.getParentData('u-form');
			},
			// 移除u-form-item的校验结果
			clearValidate() {
				this.message = null
			},
			// 清空当前的组件的校验结果，并重置为初始值
			resetField() {
				// 找到原始值
				const value = uni.$u.getProperty(this.parent.originalModel, this.prop)
				// 将u-form的model的prop属性链还原原始值
				uni.$u.setProperty(this.parent.model, this.prop, value)
				// 移除校验结果
				this.message = null
			}
		},
	}
</script>

<style lang="scss">
	@import "../../libs/css/components.scss";

	.u-form-item {
		@include flex;
		padding: 10px 0;
		font-size: 14px;
		color: $u-main-color;

		&__body {
			@include flex;

			&__left {
				@include flex;
				align-items: center;

				&__content {
					position: relative;
					@include flex;
					align-items: center;
					padding-right: 10rpx;
					flex: 1;

					&__icon {
						margin-right: 8rpx;
					}

					&__required {
						position: absolute;
						left: -9px;
						color: $u-error;
						line-height: 20px;
						font-size: 20px;
						top: 3px;
					}

					&__label {
						@include flex;
						align-items: center;
						flex: 1;
						color: $u-main-color;
						font-size: 15px;
					}
				}
			}

			&__right {
				flex: 1;

				&__content {
					@include flex;
					align-items: center;
					flex: 1;

					&__slot {
						flex: 1;
						/* #ifndef MP */
						@include flex;
						align-items: center;
						/* #endif */
					}

					&__icon {
						margin-left: 10rpx;
						color: $u-light-color;
						font-size: 30rpx;
					}
				}

				&__message {
					font-size: 12px;
					line-height: 12px;
					color: $u-error;
					margin-top: 4px;
				}
			}
		}
	}
</style>
