<template>
	<view
	    class="u-text"
	    :class="[]"
	    v-if="show"
		:style="{
			margin: margin
		}"
	    @tap="clickHandler"
	>
		<text
		    class="u-text__price"
		    v-if="mode === 'price'"
		    :style="[valueStyle]"
		>￥</text>
		<text
		    class="u-text__prefix-icon"
		    v-if="prefixIcon"
		>
			<u-icon
			    :name="prefixIcon"
			    :customStyle="$u.addStyle(iconStyle)"
			></u-icon>
		</text>
		<u-link
		    v-if="mode === 'link'"
		    :text="value"
		    :href="href"
		    underLine
		></u-link>
		<template v-else-if="openType && isMp">
			<button
			    class="u-reset-button u-text__value"
			    :style="[valueStyle]"
			    :data-index="index"
			    :openType="openType"
			    @getuserinfo="onGetUserInfo"
			    @contact="onContact"
			    @getphonenumber="onGetPhoneNumber"
			    @error="onError"
			    @launchapp="onLaunchApp"
			    @opensetting="onOpenSetting"
			    :lang="lang"
			    :session-from="sessionFrom"
			    :send-message-title="sendMessageTitle"
			    :send-message-path="sendMessagePath"
			    :send-message-img="sendMessageImg"
			    :show-message-card="showMessageCard"
			    :app-parameter="appParameter"
			>{{ value }}</button>
		</template>
		<text
		    v-else
		    class="u-text__value"
		    :style="[valueStyle]"
		    :class="[type && `u-text__value--${type}`, lines && `u-line-${lines}`]"
		>{{ value }}</text>
		<text
		    class="u-text__suffix-icon"
		    v-if="suffixIcon"
		>
			<u-icon
			    :name="suffixIcon"
			    :customStyle="$u.addStyle(iconStyle)"
			></u-icon>
		</text>
	</view>
</template>

<script>
	import value from './value.js';
	export default {
		name: 'u--text',
		// #ifdef MP
		mixins: [uni.$u.mixin, value, button, openType],
		// #endif
		// #ifndef MP
		mixins: [uni.$u.mixin, value],
		// #endif
		props: {
			// 主题颜色
			type: {
				type: String,
				default: ''
			},
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
			// text-普通文本，price-价格，phone-手机号，name-姓名，date-日期，link-超链接
			mode: {
				type: String,
				default: ''
			},
			// mode=link下，配置的链接
			href: {
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
			// 小程序的打开方式
			openType: {
				type: String,
				default: uni.$u.props.actionSheet.openType
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
				default: 15
			},
			// 图标的样式
			iconStyle: {
				type: [Object, String],
				default () {
					return {
						fontSize: '15px'
					}
				}
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
		computed: {
			valueStyle() {
				const style = {
					textDecoration: this.decoration,
					fontWeight: this.bold ? 'bold' : 'normal',
					textAlign: this.align,
					wordWrap: this.wordWrap,
					fontSize: uni.$u.addUnit(this.size)
				}
				this.isNvue && this.lines && (style.lines = this.lines)
				this.lineHeight && (style.lineHeight = uni.$u.addUnit(this.lineHeight))
				!this.isNvue && this.block && (style.display = 'block')
				return uni.$u.deepMerge(style, uni.$u.addStyle(this.customStyle))
			},
			isNvue() {
				let nvue = false
				// #ifdef APP-NVUE
				nvue = true
				// #endif
				return nvue
			},
			isMp() {
				let mp = false
				// #ifdef MP
				mp = true
				// #endif
				return mp
			}
		},
		data() {
			return {

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
		@include flex(row);
		align-items: center;
		flex-wrap: wrap;
		// flex: 1;

		&__price {
			font-size: 14px;
			color: $u-content-color;
		}

		&__value {
			font-size: 14px;
			@include flex;
			color: $u-content-color;
			flex-wrap: wrap;
			flex: 1;
			text-overflow: ellipsis;
			align-items: center;

			&--primary {
				color: $u-primary;
			}

			&--warning {
				color: $u-warning;
			}

			&--success {
				color: $u-success;
			}

			&--info {
				color: $u-info;
			}

			&--error {
				color: $u-error;
			}

			&--main {
				color: $u-main-color;
			}

			&--content {
				color: $u-content-color;
			}

			&--tips {
				color: $u-tips-color;
			}

			&--light {
				color: $u-light-color;
			}
		}
	}
</style>
