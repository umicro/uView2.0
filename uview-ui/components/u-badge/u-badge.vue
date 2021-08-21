<template>
	<view class="u-badge">
		<slot />
		<template v-if="show && (Number(value) === 0 ? showZero : true)">
			<view
			    class="u-badge__dot"
			    :class="[type && `u-badge--${type}`]"
			    v-if="isDot"
			    :style="[$u.addStyle(customStyle)]"
			></view>
			<text
			    v-else
			    :style="[$u.addStyle(customStyle)]"
			    :class="[type && `u-badge--${type}`, shape === 'horn' && 'u-badge--horn']"
			    class="u-badge__text"
			>{{ showValue }}</text>
		</template>
	</view>
</template>

<script>
	import props from './props.js';
	/**
	 * badge 徽标数
	 * @description 该组件一般用于图标右上角显示未读的消息数量，提示用户点击，有圆点和圆包含文字两种形式。
	 * @tutorial https://uviewui.com/components/badge.html
	 * 
	 * @property {Boolean} 			isDot 		是否显示圆点 （默认 false ）
	 * @property {String | Number} 	value 		显示的内容
	 * @property {Boolean} 			show 		是否显示 （默认 true ）
	 * @property {String | Number} 	max 		最大值，超过最大值会显示 '{max}+'  （默认999）
	 * @property {String} 			type 		主题类型，error|warning|success|primary （默认 'error' ）
	 * @property {Boolean} 			showZero	当数值为 0 时，是否展示 Badge （默认 false ）
	 * @property {String} 			bgColor 	背景颜色，优先级比type高，如设置，type参数会失效
	 * @property {String} 			color 		字体颜色 （默认 '#ffffff' ）
	 * @property {String} 			shape 		徽标形状，circle-四角均为圆角，horn-左下角为直角 （默认 'circle' ）
	 * @property {String} 			numberType	设置数字的显示方式，overflow|ellipsis|limit  （默认 'overflow' ）
	 * @property {Object}			customStyle	定义需要用到的外部样式
	 * @example <u-badge :type="type" :count="count"></u-badge>
	 */
	export default {
		name: 'u-badge',
		mixins: [props, uni.$u.mixin],
		computed: {
			// 是否将badge中心与父组件右上角重合
			boxStyle() {
				let style = {};
				return style;
			},
			showValue() {
				switch (this.numberType) {
					case "overflow":
						return Number(this.value) > Number(this.max) ? this.max + "+" : this.value
						break;
					case "ellipsis":
						return Number(this.value) > Number(this.max) ? "..." : this.value
						break;
					case "limit":
						return Number(this.value) > 999 ? Number(this.value) >= 9999 ?
							Math.floor(this.value / 1e4 * 100) / 100 + "w" : Math.floor(this.value /
								1e3 * 100) / 100 + "k" : this.value
						break;
					default:
						return Number(this.value)
				}
			},
		}
	}
</script>

<style lang="scss">
	@import "../../libs/css/components.scss";

	$u-badge-primary: $u-primary !default;
	$u-badge-error: $u-error !default;
	$u-badge-success: $u-success !default;
	$u-badge-info: $u-info !default;
	$u-badge-warning: $u-warning !default;
	$u-badge-dot-radius: 100px !default;
	$u-badge-dot-size: 8px !default;
	$u-badge-dot-right: 4px !default;
	$u-badge-dot-top: 0 !default;
	$u-badge-text-font-size: 11px !default;
	$u-badge-text-right: 10px !default;
	$u-badge-text-padding: 2px 5px !default;
	$u-badge-text-align: center !default;
	$u-badge-text-color: #FFFFFF !default;

	.u-badge {
		position: relative;

		&__text,
		&__dot {
			z-index: 9;
			position: absolute;
			top: $u-badge-dot-top;
			transform: translate(100%, -50%);
			background-color: $u-error;
			border-top-right-radius: $u-badge-dot-radius;
			border-top-left-radius: $u-badge-dot-radius;
			border-bottom-left-radius: $u-badge-dot-radius;
			border-bottom-right-radius: $u-badge-dot-radius;
		}

		&__text {
			right: $u-badge-text-right;
			line-height: $u-badge-text-font-size;
			text-align: $u-badge-text-align;
			font-size: $u-badge-text-font-size;
			padding: $u-badge-text-padding;
			color: $u-badge-text-color;
		}

		&__dot {
			height: $u-badge-dot-size;
			width: $u-badge-dot-size;
			right: $u-badge-dot-right;
		}

		&--horn {
			border-bottom-left-radius: 0;
		}

		&--primary {
			background-color: $u-badge-primary;
		}

		&--error {
			background-color: $u-badge-error;
		}

		&--success {
			background-color: $u-badge-success;
		}

		&--info {
			background-color: $u-badge-info;
		}

		&--warning {
			background-color: $u-badge-warning;
		}
	}
</style>
