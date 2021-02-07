<template>
	<view
	    class="u-text"
	    v-if="show"
	    @tap="clickHandler"
	>
		<text
		    class="u-text__price"
		    v-if="mode === 'price'"
		>￥</text>
		<text
		    class="u-text__prefix-icon"
		    v-if="prefixIcon"
		>
			<u-icon
			    :name="prefixIcon"
			    :size="$u.getPx(size)"
			></u-icon>
		</text>
		<text class="u-text__value">{{ value }}</text>
		<text
		    class="u-text__suffix-icon"
		    v-if="suffixIcon"
		>
			<u-icon
			    :name="suffixIcon"
			    :size="$u.getPx(size)"
			></u-icon>
		</text>
	</view>
</template>

<script>
	import value from './value.js';
	export default {
		name: 'u--text',
		mixins: [uni.$u.mixin, value],
		props: {
			// 是否显示
			show: {
				type: Boolean,
				default: true
			},
			// 显示的值
			text: {
				type: [Number, String],
				default: ''
			},
			// 前置图标
			prefixIcon: {
				type: String,
				default: ''
			},
			// 后置图标
			suffixIcon: {
				type: String,
				default: ''
			},
			// 文本处理的匹配模式
			// text-普通文本，price-价格，phone-手机号，name-姓名，date-日期
			mode: {
				type: String,
				default: ''
			},
			// 格式化规则
			format: {
				type: [String, Function],
				default: ''
			},
			// mode=phone时，点击文本是否拨打电话
			call: {
				type: Boolean,
				default: false
			},
			// 是否对mode=phone|name类型文本进行脱敏，用*号替换部分文本
			encrypt: {
				type: Boolean,
				default: false
			},
			// 是否粗体，默认normal
			bold: {
				type: Boolean,
				default: false
			},
			// 是否块状
			block: {
				type: Boolean,
				default: false
			},
			// 文本显示的行数，如果设置，超出此行数，将会显示省略号
			lines: {
				type: [Number, String],
				default: ''
			},
			// 文本颜色
			color: {
				type: String,
				default: '#303133'
			},
			// 字体大小
			size: {
				type: [Number, String],
				default: '15'
			},
			// 是否显示金额的千分位，mode=price时有效
			precision: {
				type: Boolean,
				default: true,
			},
			// 文字装饰，下划线，中划线等，可选值 none|underline|line-through
			decoration: {
				tepe: String,
				default: 'none'
			},
			// 外边距，对象、字符串，数值形式均可
			margin: {
				type: [Object, Number, String],
				default: 0
			},
			// 文本行高
			lineHeight: {
				type: [Number, String],
				default: ''
			},
			// 文本对齐方式，可选值left|center|right
			align: {
				type: String,
				default: 'left'
			},
			// 文字换行，可选值break-word|normal|anywhere
			wordWrap: {
				type: String,
				default: 'normal'
			}
		},
		methods: {
			clickHandler() {
				// 如果为手机号模式，拨打电话
				if (this.mode === 'phone' && uni.$u.test.mobile(this.text)) {
					uni.makePhoneCall({
						phoneNumber: this.text
					});
				}
			}
		}
	}
</script>

<style lang="scss">
	@import "../../libs/css/components.scss";
	
	.u-text {
		font-size: 15px;
		color: $u-main-color;
		@include flex(row);
		align-items: center;
	}
</style>
