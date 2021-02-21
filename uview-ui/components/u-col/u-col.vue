<template>
	<view class="u-row">

	</view>
</template>

<script>
	// #ifdef APP-NVUE
	const dom = uni.requireNativePlugin('dom')
	// #endif
	import props from './props.js'
	export default {
		name: 'u-row',
		mixins: [uni.$u.mixin, props],
		data() {
			return {
				
			}
		}
	}
</script>

<style lang="scss">
	@import "../../libs/css/components.scss";

	/* #ifdef MP */
	// 由于小程序都使用shadow DOM形式实现，需要给影子宿主设置flex: 1才能让其撑开
	:host {
		flex: 1
	}

	/* #endif */

	// nvue下百分比无效
	/* #ifndef APP-NVUE */
	.u-col-0 {
		width: 0;
	}

	.u-col-1 {
		width: calc(100%/12);
	}

	.u-col-2 {
		width: calc(100%/12 * 2);
	}

	.u-col-3 {
		width: calc(100%/12 * 3);
	}

	.u-col-4 {
		width: calc(100%/12 * 4);
	}

	.u-col-5 {
		width: calc(100%/12 * 5);
	}

	.u-col-6 {
		width: calc(100%/12 * 6);
	}

	.u-col-7 {
		width: calc(100%/12 * 7);
	}

	.u-col-8 {
		width: calc(100%/12 * 8);
	}

	.u-col-9 {
		width: calc(100%/12 * 9);
	}

	.u-col-10 {
		width: calc(100%/12 * 10);
	}

	.u-col-11 {
		width: calc(100%/12 * 11);
	}

	.u-col-12 {
		width: calc(100%/12 * 12);
	}

	/* #endif */
</style>
