<template>
	<view
	    :style="[style]"
	    class="u-status-bar"
		:class="[!isNvue && 'u-status-bar']"
	>
		<slot />
	</view>
</template>

<script>
	import props from './props.js';
	/**
	 * StatbusBar 状态栏占位
	 * @description 本组件主要用于状态填充，比如在自定导航栏的时候，它会自动适配一个恰当的状态栏高度。
	 * @tutorial https://uviewui.com/components/statusBar.html
	 * @property {String}			bgColor			背景色 (默认 'transparent' )
	 * @property {String | Object}	customStyle		自定义样式 
	 * @example <u-status-bar></u-status-bar>
	 */
	export default {
		name: 'u-status-bar',
		mixins: [uni.$u.mixin, props],
		data() {
			return {
				isNvue: false
			}
		},
		computed: {
			style() {
				const style = {}
				// #ifdef APP-NVUE
				// nvue下，高度使用js计算填充
				style.height = uni.$u.sys().statusBarHeight + 'px'
				// #endif
				style.backgroundColor = this.bgColor
				return uni.$u.deepMerge(style, uni.$u.addStyle(this.customStyle))
			}
		},
		created() {
			// #ifdef APP-NVUE
			// 标识为是否nvue
			this.isNvue = true
			// #endif
		}
	}
</script>

<style lang="scss">
	/* #ifndef APP-NVUE */
	.u-status-bar {
		padding-top: 0;
		padding-top: constant(safe-area-inset-top);
		padding-top: env(safe-area-inset-top);
		width: 100%;
	}
	/* #endif */
</style>
