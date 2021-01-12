<template>
	<view class="u-badge" :style="[customStyle]">
		<slot />
		<template v-if="show">
			<view
			    class="u-badge__dot"
				:class="[type && `u-badge--${type}`]"
			    v-if="isDot"
			></view>
			<text
			    v-else
				:class="[type && `u-badge--${type}`, shape === 'horn' && 'u-badge--horn']"
			    class="u-badge__text"
			>{{ showValue }}</text>
		</template>
	</view>
</template>

<script>
	import props from './props.js'
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

	.u-badge {
		position: relative;

		&__text,
		&__dot {
			z-index: 9;
			position: absolute;
			top: 0;
			transform: translate(100%, -50%);
			background-color: $u-error;
			border-top-right-radius: 100px;
			border-top-left-radius: 100px;
			border-bottom-left-radius: 100px;
			border-bottom-right-radius: 100px;
		}

		&__text {
			right: 10px;
			line-height: 11px;
			text-align: center;
			font-size: 11px;
			padding: 2px 5px;
			color: #FFFFFF;
			// nvue上写border，会导致边框带一丝的红色
			/* #ifndef APP-NVUE */
			border-width: 1px;
			border-color: #FFFFFF;
			/* #endif */
		}

		&__dot {
			height: 8px; 
			width: 8px;
			right: 4px;
		}
		
		&--horn {
			border-bottom-left-radius: 0;
		}

		&--primary {
			background-color: $u-primary;
		}

		&--error {
			background-color: $u-error;
		}

		&--success {
			background-color: $u-success;
		}

		&--info {
			background-color: $u-info;
		}

		&--warning {
			background-color: $u-warning;
		}
	}
</style>
