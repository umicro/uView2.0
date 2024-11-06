<template>
	<uvInput
		:value="value"
		:type="type"
		:fixed="fixed"
		:disabled="disabled"
		:disabledColor="disabledColor"
		:clearable="clearable"
		:password="password"
		:maxlength="maxlength"
		:placeholder="placeholder"
		:placeholderClass="placeholderClass"
		:placeholderStyle="placeholderStyle"
		:showWordLimit="showWordLimit"
		:confirmType="confirmType"
		:confirmHold="confirmHold"
		:holdKeyboard="holdKeyboard"
		:focus="focus"
		:autoBlur="autoBlur"
		:disableDefaultPadding="disableDefaultPadding"
		:cursor="cursor"
		:cursorSpacing="cursorSpacing"
		:selectionStart="selectionStart"
		:selectionEnd="selectionEnd"
		:adjustPosition="adjustPosition"
		:inputAlign="inputAlign"
		:fontSize="fontSize"
		:color="color"
		:prefixIcon="prefixIcon"
		:suffixIcon="suffixIcon"
		:suffixIconStyle="suffixIconStyle"
		:prefixIconStyle="prefixIconStyle"
		:border="border"
		:readonly="readonly"
		:shape="shape"
		:customStyle="customStyle"
		:formatter="formatter"
		:ignoreCompositionEvent="ignoreCompositionEvent"
		@focus="e => $emit('focus', e)"
		@blur="e => $emit('blur', e)"
		@keyboardheightchange="e => $emit('keyboardheightchange', e)"
		@change="e => $emit('change', e)"
		@input="e => $emit('input', e)"
		@confirm="e => $emit('confirm', e)"
		@clear="$emit('clear')"
		@click="$emit('click')"
	>
		<!-- #ifdef MP -->
		<slot name="prefix"></slot>
		<slot name="suffix"></slot>
		<!-- #endif -->
		<!-- #ifndef MP -->
		<slot name="prefix" slot="prefix"></slot>
		<slot name="suffix" slot="suffix"></slot>
		<!-- #endif -->
	</uvInput>
</template>

<script>
	/**
	 * 此组件存在的理由是，在nvue下，u-input被uni-app官方占用了，u-input在nvue中相当于input组件
	 * 所以在nvue下，取名为u--input，内部其实还是u-input.vue，只不过做一层中转
	 */
	import uvInput from '../u-input/u-input.vue';
	import props from '../u-input/props.js'
	/**
	 * Input 输入框
	 * @description  此组件为一个输入框，默认没有边框和样式，是专门为配合表单组件u-form而设计的，利用它可以快速实现表单验证，输入内容，下拉选择等功能。
	 * @tutorial https://uviewui.com/components/input.html
	 * @property {String | Number}	value					输入的值
	 * @property {String}			type					输入框类型，见上方说明 （ 默认 'text' ）
	 * @property {Boolean}			fixed					如果 textarea 是在一个 position:fixed 的区域，需要显示指定属性 fixed 为 true，兼容性：微信小程序、百度小程序、字节跳动小程序、QQ小程序 （ 默认 false ）
	 * @property {Boolean}			disabled				是否禁用输入框 （ 默认 false ）
	 * @property {String}			disabledColor			禁用状态时的背景色（ 默认 '#f5f7fa' ）
	 * @property {Boolean}			clearable				是否显示清除控件 （ 默认 false ）
	 * @property {Boolean}			password				是否密码类型 （ 默认 false ）
	 * @property {String | Number}	maxlength				最大输入长度，设置为 -1 的时候不限制最大长度 （ 默认 -1 ）
	 * @property {String}			placeholder				输入框为空时的占位符
	 * @property {String}			placeholderClass		指定placeholder的样式类，注意页面或组件的style中写了scoped时，需要在类名前写/deep/ （ 默认 'input-placeholder' ）
	 * @property {String | Object}	placeholderStyle		指定placeholder的样式，字符串/对象形式，如"color: red;"
	 * @property {Boolean}			showWordLimit			是否显示输入字数统计，只在 type ="text"或type ="textarea"时有效 （ 默认 false ）
	 * @property {String}			confirmType				设置右下角按钮的文字，兼容性详见uni-app文档 （ 默认 'done' ）
	 * @property {Boolean}			confirmHold				点击键盘右下角按钮时是否保持键盘不收起，H5无效 （ 默认 false ）
	 * @property {Boolean}			holdKeyboard			focus时，点击页面的时候不收起键盘，微信小程序有效 （ 默认 false ）
	 * @property {Boolean}			focus					自动获取焦点，在 H5 平台能否聚焦以及软键盘是否跟随弹出，取决于当前浏览器本身的实现。nvue 页面不支持，需使用组件的 focus()、blur() 方法控制焦点 （ 默认 false ）
	 * @property {Boolean}			autoBlur				键盘收起时，是否自动失去焦点，目前仅App3.0.0+有效 （ 默认 false ）
	 * @property {Boolean}			disableDefaultPadding	是否去掉 iOS 下的默认内边距，仅微信小程序，且type=textarea时有效 （ 默认 false ）
	 * @property {String ｜ Number}	cursor					指定focus时光标的位置（ 默认 -1 ）
	 * @property {String ｜ Number}	cursorSpacing			输入框聚焦时底部与键盘的距离 （ 默认 30 ）
	 * @property {String ｜ Number}	selectionStart			光标起始位置，自动聚集时有效，需与selection-end搭配使用 （ 默认 -1 ）
	 * @property {String ｜ Number}	selectionEnd			光标结束位置，自动聚集时有效，需与selection-start搭配使用 （ 默认 -1 ）
	 * @property {Boolean}			adjustPosition			键盘弹起时，是否自动上推页面 （ 默认 true ）
	 * @property {String}			inputAlign				输入框内容对齐方式（ 默认 'left' ）
	 * @property {String | Number}	fontSize				输入框字体的大小 （ 默认 '15px' ）
	 * @property {String}			color					输入框字体颜色	（ 默认 '#303133' ）
	 * @property {Function}			formatter			    内容式化函数
	 * @property {String}			prefixIcon				输入框前置图标
	 * @property {String | Object}	prefixIconStyle			前置图标样式，对象或字符串
	 * @property {String}			suffixIcon				输入框后置图标
	 * @property {String | Object}	suffixIconStyle			后置图标样式，对象或字符串
	 * @property {String}			border					边框类型，surround-四周边框，bottom-底部边框，none-无边框 （ 默认 'surround' ）
	 * @property {Boolean}			readonly				是否只读，与disabled不同之处在于disabled会置灰组件，而readonly则不会 （ 默认 false ）
	 * @property {String}			shape					输入框形状，circle-圆形，square-方形 （ 默认 'square' ）
	 * @property {Object}			customStyle				定义需要用到的外部样式
	 * @property {Boolean}			ignoreCompositionEvent	是否忽略组件内对文本合成系统事件的处理。
	 * @example <u--input v-model="value" :password="true" suffix-icon="lock-fill" />
	 */
	export default {
		name: 'u--input',
		mixins: [uni.$u.mpMixin, props, uni.$u.mixin],
		components: {
			uvInput
		},
	}
</script>
