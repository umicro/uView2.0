<template>
	<view
		class="u-textarea"
		:class="textareaClass"
	>
		<textarea
			class="u-textarea__field"
			:value="value"
			:style="{ height: $u.addUnit(height) }"
			:placeholder="placeholder"
			:disabled="disabled"
			:focus="focus"
			:autoHeight="autoHeight"
			:fixed="fixed"
			:cursorSpacing="cursorSpacing"
			:cursor="cursor"
			:showConfirmBar="showConfirmBar"
			:selectionStart="selectionStart"
			:selectionEnd="selectionEnd"
			:adjustPosition="adjustPosition"
			:disableDefaultPadding="disableDefaultPadding"
			:holdKeyboard="holdKeyboard"
			:maxlength="maxlength"
			confirmType="confirmType"
			@focus="onFocus"
			@blur="onBlur"
			@linechange="onLinechange"
			@input="onInput"
			@confirm="onConfirm"
			@keyboardheightchange="onKeyboardheightchange"
		></textarea>
		<text
			class="u-textarea__count"
			:style="{
				'background-color': disabled ? 'transparent' : '#fff'
			}"
			v-if="count"
		>{{ value.length }}/{{ maxlength }}</text>
	</view>
</template>

<script>
	import props from './props.js';
	export default {
		name: 'u-textarea',
		mixins: [uni.$u.mixin, props],
		computed: {
			// 组件的类名
			textareaClass() {
				let classes = [],
					{
						border,
						disabled,
						shape
					} = this
				border === 'surround' && (classes = classes.concat(['u-border', 'u-textarea--radius']))
				border === 'bottom' && (classes = classes.concat(['u-border-bottom', 'u-textarea--no-radius']))
				disabled && classes.push('u-textarea--disabled')
				return classes.join(' ')
			}
		},
		methods: {
			onFocus(e) {
				this.$emit('focus', e);
			},
			onBlur(e) {
				this.$emit('blur', e);
				// 尝试调用u-form的验证方法
				uni.$u.formValidate(this, 'blur')
			},
			onLinechange(e) {
				this.$emit('linechange', e);
			},
			onInput(e) {
				this.$emit('input', e.detail.value);
				// 尝试调用u-form的验证方法
				uni.$u.formValidate(this, 'change')
			},
			onConfirm(e) {
				this.$emit('confirm', e);
			},
			onKeyboardheightchange(e) {
				this.$emit('keyboardheightchange', e);
			}
		},
	}
</script>

<style lang="scss">
	@import "../../libs/css/components.scss";

	.u-textarea {
		border-radius: 4px;
		background-color: #fff;
		position: relative;
		// padding: 5px;
		@include flex;
		flex: 1;

		&--radius {
			border-radius: 4px;
		}

		&--no-radius {
			border-radius: 0;
		}

		&--disabled {
			background-color: #f5f7fa;
		}

		&__field {
			flex: 1;
			font-size: 15px;
			color: $u-content-color;
			margin: 0;
			/* #ifdef APP-NVUE */
			padding: 6px 6px;
			/* #endif */
			/* #ifndef APP-NVUE */
			width: auto;
			padding: 6px 9px;
			/* #endif */
		}

		&__count {
			position: absolute;
			right: 5px;
			bottom: 2px;
			font-size: 12px;
			color: $u-tips-color;
			background-color: #FFFFFF;
			padding: 1px 4px;
		}
	}
</style>
