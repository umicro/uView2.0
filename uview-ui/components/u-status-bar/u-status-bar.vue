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
	export default {
		name: 'u-status-bar',
		props: {
			bgColor: {
				type: String,
				default: 'transparent'
			}
		},
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
