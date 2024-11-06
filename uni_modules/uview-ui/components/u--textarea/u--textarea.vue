<template>
	<uvTextarea
		:value="value"
		:placeholder="placeholder"
		:height="height"
		:confirmType="confirmType"
		:disabled="disabled"
		:count="count"
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
		:border="border"
		:customStyle="customStyle"
		:formatter="formatter"
		:ignoreCompositionEvent="ignoreCompositionEvent"
		@focus="e => $emit('focus', e)"
		@blur="e => $emit('blur', e)"
		@linechange="e => $emit('linechange', e)"
		@confirm="e => $emit('confirm', e)"
		@input="e => $emit('input', e)"
		@keyboardheightchange="e => $emit('keyboardheightchange', e)"
	></uvTextarea>
</template>

<script>
	/**
	 * 此组件存在的理由是，在nvue下，u--textarea被uni-app官方占用了，u-textarea在nvue中相当于textarea组件
	 * 所以在nvue下，取名为u--textarea，内部其实还是u-textarea.vue，只不过做一层中转
	 */
	import uvTextarea from '../u-textarea/u-textarea.vue';
	import props from '../u-textarea/props.js'
	/**
	 * Textarea 文本域
	 * @description 文本域此组件满足了可能出现的表单信息补充，编辑等实际逻辑的功能，内置了字数校验等
	 * @tutorial https://www.uviewui.com/components/textarea.html
	 *
	 * @property {String | Number} 		value					输入框的内容
	 * @property {String | Number}		placeholder				输入框为空时占位符
	 * @property {String}			    placeholderClass		指定placeholder的样式类，注意页面或组件的style中写了scoped时，需要在类名前写/deep/ （ 默认 'input-placeholder' ）
	 * @property {String | Object}	    placeholderStyle		指定placeholder的样式，字符串/对象形式，如"color: red;"
	 * @property {String | Number}		height					输入框高度（默认 70 ）
	 * @property {String}				confirmType				设置键盘右下角按钮的文字，仅微信小程序，App-vue和H5有效（默认 'done' ）
	 * @property {Boolean}				disabled				是否禁用（默认 false ）
	 * @property {Boolean}				count					是否显示统计字数（默认 false ）
	 * @property {Boolean}				focus					是否自动获取焦点，nvue不支持，H5取决于浏览器的实现（默认 false ）
	 * @property {Boolean | Function}	autoHeight				是否自动增加高度（默认 false ）
	 * @property {Boolean}				fixed					如果textarea是在一个position:fixed的区域，需要显示指定属性fixed为true（默认 false ）
	 * @property {Number}				cursorSpacing			指定光标与键盘的距离（默认 0 ）
	 * @property {String | Number}		cursor					指定focus时的光标位置
	 * @property {Function}			    formatter			    内容式化函数
	 * @property {Boolean}				showConfirmBar			是否显示键盘上方带有”完成“按钮那一栏，（默认 true ）
	 * @property {Number}				selectionStart			光标起始位置，自动聚焦时有效，需与selection-end搭配使用，（默认 -1 ）
	 * @property {Number | Number}		selectionEnd			光标结束位置，自动聚焦时有效，需与selection-start搭配使用（默认 -1 ）
	 * @property {Boolean}				adjustPosition			键盘弹起时，是否自动上推页面（默认 true ）
	 * @property {Boolean | Number}		disableDefaultPadding	是否去掉 iOS 下的默认内边距，只微信小程序有效（默认 false ）
	 * @property {Boolean}				holdKeyboard			focus时，点击页面的时候不收起键盘，只微信小程序有效（默认 false ）
	 * @property {String | Number}		maxlength				最大输入长度，设置为 -1 的时候不限制最大长度（默认 140 ）
	 * @property {String}				border					边框类型，surround-四周边框，none-无边框，bottom-底部边框（默认 'surround' ）
	 * @property {Boolean}				ignoreCompositionEvent	是否忽略组件内对文本合成系统事件的处理
	 *
	 * @event {Function(e)} focus					输入框聚焦时触发，event.detail = { value, height }，height 为键盘高度
	 * @event {Function(e)} blur					输入框失去焦点时触发，event.detail = {value, cursor}
	 * @event {Function(e)} linechange				输入框行数变化时调用，event.detail = {height: 0, heightRpx: 0, lineCount: 0}
	 * @event {Function(e)} input					当键盘输入时，触发 input 事件
	 * @event {Function(e)} confirm					点击完成时， 触发 confirm 事件
	 * @event {Function(e)} keyboardheightchange	键盘高度发生变化的时候触发此事件
	 * @example <u--textarea v-model="value1" placeholder="请输入内容" ></u--textarea>
	 */
	export default {
		name: 'u--textarea',
		mixins: [uni.$u.mpMixin, props, uni.$u.mixin],
		components: {
			uvTextarea
		},
	}
</script>
