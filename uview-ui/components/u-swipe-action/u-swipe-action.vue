<template>
	<view class="u-swipe-action">
		<slot></slot>
	</view>
</template>

<script>
	export default {
		name: 'u-swipe-action',
		data() {
			return {}
		},
		provide() {
			return {
				swipeAction: this
			}
		},
		created() {
			this.children = []
		},
		methods: {
			
		}
	}
</script>

<style lang="scss">
	
</style>
