<template>
	<view class="u-swipe-action">
		<slot />
	</view>
</template>

<script>
	export default {
		provide() {
			return {
				swipeaction: this
			};
		},
		created() {
			this.children = [];
		},
		methods: {
			// 关闭其他所有的展开项
			closeOther(vm) {
				if (this.openItem && this.openItem !== vm) {
					// #ifdef APP-VUE || H5 || MP-WEIXIN
					// wxs平台设置show为none
					this.openItem.button.show = 'none'
					// #endif

					// #ifndef APP-VUE || H5 || MP-WEIXIN
					// 非wxs平台，用的是close方法
					this.openItem.close()
					// #endif
				}
				this.openItem = vm
			}
		},
	}
</script>

<style lang="scss">

</style>
