<template>
	<view
	    class="u-safe-bottom"
	    :style="[style]"
	    :class="[!isNvue && 'safe-area-inset-bottom']"
	>

	</view>
</template>

<script>
	import props from './props.js';
	export default {
		name: 'u-safe-bottom',
		mixins: [uni.$u.mixin,props],
		data() {
			return {
				safeAreaBottomHeight: 0,
				isNvue: false
			}
		},
		computed: {
			style() {
				const style = {}
				// #ifdef APP-NVUE
				// nvue下，高度使用js计算填充
				style.height = uni.$u.sys().safeAreaInsets.bottom + 'px'
				// #endif
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
	.u-safe-bottom {
		/* #ifndef APP-NVUE */
		width: 100%;
		/* #endif */
	}
	
	// iPhoneX底部安全区定义
	/* #ifndef APP-NVUE */
	.safe-area-inset-bottom {
		height: 0;
		height: constant(safe-area-inset-bottom);
		height: env(safe-area-inset-bottom);
	}
	/* #endif */
</style>
