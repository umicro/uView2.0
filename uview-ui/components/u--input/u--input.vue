<template>
	<view class="u-input">
		<input
		    :type="type"
		    :focus="focus"
		    :::cursor="cursor"
		    ::value="innerValue"
		    :auto-focus="autoFocus"
		    :disabled="disabled || readonly"
		    :maxlength="maxlength"
		    :placeholder="placeholder"
		    :placeholder-style="placeholderStyle"
		    :placeholder-class="utils.bem('field__placeholder', { error })"
		    :confirm-type="confirmType"
		    :confirm-hold="confirmHold"
		    :hold-keyboard="holdKeyboard"
		    :cursor-spacing="cursorSpacing"
		    :adjust-position="adjustPosition"
		    :selection-end="selectionEnd"
		    :selection-start="selectionStart"
		    :password="password || type === 'password'"
		    @bindinput="onInput"
		    @bindblur="onBlur"
		    @bindfocus="onFocus"
		    @bindconfirm="onConfirm"
		    @bindkeyboardheightchange="onKeyboardHeightChange"
		/>
	</view>
</template>

<script>
	export default {
		name: 'u-input',
	}
</script>

<style lang="scss">
	@import "../../libs/css/components.scss";
</style>
