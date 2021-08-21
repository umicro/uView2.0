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
	import value from './value.js'
	import button from '../../libs/mixin/button.js'
	import openType from '../../libs/mixin/openType.js'
	import props from './props.js';
	/**
	 * Text 文本
	 * @description 此组件集成了文本类在项目中的常用功能，包括状态，拨打电话，格式化日期，*替换，超链接...等功能。 您大可不必在使用特殊文本时自己定义，text组件几乎涵盖您能使用的大部分场景。
	 * @tutorial https://www.uviewui.com/components/loading.html
	 * @property {String} type
	 * @property {Boolean} show
	 * @property {String | Number} text	
	 * @property {String} prefixIcon
	 * @property {String} suffixIcon
	 * @property {String} mode
	 * @property {String} href
	 * @property {String | Function} format
	 * @property {Boolean} call
	 * @property {Boolean} encrypt
	 * @property {String} openType
	 * @property {Boolean} bold
	 * @property {Boolean} block
	 * @property {String | Number} lines
	 * @property {String} color
	 * @property {String | Number} size
	 * @property {Object | String} iconStyle
	 * @property {Boolean} precision
	 * @property {String} decoration
	 * @property {Object | String | Number} margin
	 * @property {String | Number} lineHeight
	 * @property {String} align
	 * @property {String} wordWrap
 	 * @event {Function} click  点击触发事件
	 * @example <u--text text="我用十年青春,赴你最后之约"></u--text>
	 */
	export default {
		name: 'u--text',
		// #ifdef MP
		mixins: [uni.$u.mixin, value, button, openType, props],
		// #endif
		// #ifndef MP
		mixins: [uni.$u.mixin, value, props],
		// #endif
		computed: {
			valueStyle() {
				const style = {
					textDecoration: this.decoration,
					fontWeight: this.bold ? 'bold' : 'normal',
					textAlign: this.align,
					wordWrap: this.wordWrap,
					fontSize: uni.$u.addUnit(this.size)
				}
				!this.type && (style.color = this.color)
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
				this.$emit('click')
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
		flex: 1;

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
