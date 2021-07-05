<template>
	<view class="u-from-item">
		<view
			class="u-form-item__body"
			:style="{
				flexDirection: parentData.labelPosition === 'left' ? 'row' : 'column'
			}"
		>
			<!-- 微信小程序中，将一个参数设置空字符串，结果会变成字符串"true" -->
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
				<text
					v-if="!!message"
					class="u-form-item__body__right__message"
				>{{ message }}</text>
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
			broadcastInputError() {
				// 子组件发出事件，第三个参数为true或者false，true代表有错误
				this.broadcast('u-input', 'on-form-item-error', this.validateState === 'error' && this.showError(
				'border'));
			},
			// 判断是否需要required校验
			setRules() {
				// blur事件
				this.$on('on-form-blur', this.onFieldBlur);
				// change事件
				this.$on('on-form-change', this.onFieldChange);
			},
			// 从u-form的rules属性中，取出当前u-form-item的校验规则
			getRules() {
				// 父组件的所有规则
				let rules = this.parent.rules;
				rules = rules ? rules[this.prop] : [];
				// 保证返回的是一个数组形式
				return [].concat(rules || []);
			},
			// blur事件时进行表单校验
			onFieldBlur() {
				this.validation('blur');
			},
			// change事件进行表单校验
			onFieldChange() {
				this.validation('change');
			},
			// 过滤出符合要求的rule规则
			getFilteredRule(triggerType = '') {
				let rules = this.getRules();
				// 整体验证表单时，triggerType为空字符串，此时返回所有规则进行验证
				if (!triggerType) return rules;
				// 历遍判断规则是否有对应的事件，比如blur，change触发等的事件
				// 使用indexOf判断，是因为某些时候设置的验证规则的trigger属性可能为多个，比如['blur','change']
				// 某些场景可能的判断规则，可能不存在trigger属性，故先判断是否存在此属性
				return rules.filter(res => res.trigger && res.trigger.indexOf(triggerType) !== -1);
			},
			// 校验数据
			validation(trigger, callback = () => {}) {
				// 检验之间，先获取需要校验的值
				this.fieldValue = this.parent.model[this.prop];
				// blur和change是否有当前方式的校验规则
				let rules = this.getFilteredRule(trigger);
				// 判断是否有验证规则，如果没有规则，也调用回调方法，否则父组件u-form会因为
				// 对count变量的统计错误而无法进入上一层的回调
				if (!rules || rules.length === 0) {
					return callback('');
				}
				// 设置当前的装填，标识为校验中
				this.validateState = 'validating';
				// 调用async-validator的方法
				let validator = new schema({
					[this.prop]: rules
				});
				validator.validate({
					[this.prop]: this.fieldValue
				}, {
					firstFields: true
				}, (errors, fields) => {
					// 记录状态和报错信息
					this.validateState = !errors ? 'success' : 'error';
					this.validateMessage = errors ? errors[0].message : '';
					// 调用回调方法
					callback(this.validateMessage);
				});
			},
			// 清空当前的u-form-item
			resetField() {
				this.parent.model[this.prop] = this.initialValue;
				// 设置为`success`状态，只是为了清空错误标记
				this.validateState = 'success';
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
					margin-top: 6px;
				}
			}
		}
	}
</style>
