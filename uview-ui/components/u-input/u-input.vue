<template>
	<view
	    class="u-input"
	    :class="inputClass"
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
				inputValue: '',
				innerValue: '',
				// 是否处于获得焦点状态
				focused: false
			}
		},
		watch: {
			value: {
				immediate: true,
				handler(newVal, oldVal) {
					this.inputValue = newVal
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
				[border === 'bottom' ? 'u-border-bottom' : 'u-border', border === 'surround' && 'u-input--radius', disabled && 'u-input--disabled']
				let classes = [],
					{ border, disabled, shape } = this
				border === 'surround' && (classes = classes.concat(['u-border', 'u-input--radius']))
				classes.push(`u-input--${shape}`)
				border === 'bottom' && (classes = classes.concat(['u-border-bottom', 'u-input--no-radius']))
				disabled && classes.push('u-input--disabled')
				return classes.join(' ')
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
				})
			},
			// 点击清除控件
			onClear() {
				this.innerValue = ''
				this.inputValue = ''
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
		padding: 6px 9px;
		
		&--disabled {
			background-color: #f5f7fa;
		}

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
				padding: 0;
				line-height: 26px;
				text-align: left;
				border: 0;
				color: $u-content-color;
				height: 24px;
				font-size: 14px;
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
