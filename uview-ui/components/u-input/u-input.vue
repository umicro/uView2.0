<template>
	<view
	    class="u-input"
	    :class="inputClass"
		:style="[$u.addStyle(customStyle), inputStyle]"
	>
		<view class="u-input__content">
			<view
			    class="u-input__content__prefix-icon"
			    v-if="prefixIcon || $slots.prefix"
			>
				<slot name="prefix">
					<u-icon
					    :name="prefixIcon"
					    size="18"
					    :customStyle="prefixIconStyle"
					></u-icon>
				</slot>
			</view>
			<input
			    class="u-input__content__field"
			    :type="type"
			    :focus="focus"
			    :cursor="cursor"
			    :value="innerValue"
			    :auto-blur="autoBlur"
			    :disabled="disabled"
			    :maxlength="maxlength"
			    :placeholder="placeholder"
			    :placeholder-style="placeholderStyle"
			    :placeholder-class="placeholderClass"
			    :confirm-type="confirmType"
			    :confirm-hold="confirmHold"
			    :hold-keyboard="holdKeyboard"
			    :cursor-spacing="cursorSpacing"
			    :adjust-position="adjustPosition"
			    :selection-end="selectionEnd"
			    :selection-start="selectionStart"
			    :password="password || type === 'password'"
			    @input="onInput"
			    @blur="onBlur"
			    @focus="onFocus"
			    @confirm="onConfirm"
			    @keyboardheightchange="onKeyboardHeightChange"
			/>
			<view
			    class="u-input__content__clear"
				v-if="isShowClear"
			    @tap="onClear"
			>
				<u-icon
				    name="close"
				    size="11"
				    color="#ffffff"
				    customStyle="line-height: 12px"
				></u-icon>
			</view>
			<view
			    class="u-input__content__subfix-icon"
			    v-if="suffixIcon || $slots.suffix"
			>
				<slot name="suffix">
					<u-icon
					    :name="suffixIcon"
					    size="18"
					    :customStyle="suffixIconStyle"
					></u-icon>
				</slot>
			</view>
		</view>
	</view>
</template>

<script>
	import props from './props.js'
	export default {
		name: 'u-input',
		mixins: [uni.$u.mixin, props],
		data() {
			return {
				// 输入框的值
				innerValue: '',
				// 是否处于获得焦点状态
				focused: false
			}
		},
		watch: {
			value: {
				immediate: true,
				handler(newVal, oldVal) {
					this.innerValue = newVal
					// this.valueChange()
				}
			}
		},
		computed: {
			// 是否显示清除控件
			isShowClear() {
				const { clearable, readonly, focused, innerValue} = this
				return !!clearable && !readonly && !!focused && innerValue !== ''
			},
			// 组件的类名
			inputClass() {
				let classes = [],
					{ border, disabled, shape } = this
				border === 'surround' && (classes = classes.concat(['u-border', 'u-input--radius']))
				classes.push(`u-input--${shape}`)
				border === 'bottom' && (classes = classes.concat(['u-border-bottom', 'u-input--no-radius']))
				return classes.join(' ')
			},
			// 仅用时的样式
			inputStyle() {
				const style = {}
				// 禁用状态下，被背景色加上对应的样式
				if(this.disabled) {
					style.backgroundColor = this.disabledColor
				}
				// 无边框时，去除内边距
				if(this.border === 'none') {
					style.padding = '0'
				} else {
					// 由于uni-app的iOS开发者能力有限，导致需要分开写才有效
					style.paddingTop = '6px'
					style.paddingBottom = '6px'
					style.paddingLeft = '9px'
					style.paddingRight = '9px'
				}
				return style
			}
		},
		methods: {
			// 当键盘输入时，触发input事件
			onInput(event) {
				const {
					value = ''
				} = event.detail || {}
				this.innerValue = value
				this.valueChange()
			},
			// 输入框失去焦点时触发
			onBlur(event) {
				this.$emit('blur')
				// H5端的blur会先于点击清除控件的点击click事件触发，导致focused
				// 瞬间为false，从而隐藏了清除控件而无法被点击到
				uni.$u.sleep(50).then(() => {
					this.focused = false
				})
				// 尝试调用u-form的验证方法
				uni.$u.formValidate(this, 'blur')
			},
			// 输入框聚焦时触发
			onFocus(event) {
				this.focused = true
				this.$emit('focus')
			},
			// 点击完成按钮时触发
			onConfirm(event) {
				this.$emit('confirm')
			},
			// 键盘高度发生变化的时候触发此事件
			// 兼容性：微信小程序2.7.0+、App 3.1.0+
			oneyboardheightchange() {
				this.$emit('keyboardheightchange')
			},
			// 内容发生变化，进行处理
			valueChange() {
				const value = this.innerValue
				this.$nextTick(() => {
					this.$emit('input', value)
					this.$emit('change', value)
					// 尝试调用u-form的验证方法
					uni.$u.formValidate(this, 'change')
				})
			},
			// 点击清除控件
			onClear() {
				this.innerValue = ''
				this.$nextTick(() => {
					this.valueChange()
					this.$emit('clear')
				})
			}
		}
	}
</script>

<style lang="scss">
	@import "../../libs/css/components.scss";

	.u-input {
		@include flex(row);
		align-items: center;
		justify-content: space-between;
		flex: 1;
		
		&--radius, &--square {
			border-radius: 4px;
		}
		
		&--no-radius {
			border-radius: 0;
		}
		
		&--circle {
			border-radius: 100px;
		}

		&__content {
			flex: 1;
			@include flex(row);
			align-items: center;
			justify-content: space-between;

			&__field {
				position: relative;
				@include flex;
				margin: 0;
				line-height: 26px;
				text-align: left;
				color: $u-content-color;
				height: 24px;
				font-size: 15px;
				flex: 1;
			}

			&__clear {
				width: 20px;
				height: 20px;
				border-radius: 100px;
				background-color: #C6C7CB;
				@include flex(row);
				align-items: center;
				justify-content: center;
				transform: scale(0.82);
				margin-left: 4px;
			}

			&__subfix-icon {
				margin-left: 4px;
			}

			&__prefix-icon {
				margin-right: 4px;
			}
		}
	}
</style>
