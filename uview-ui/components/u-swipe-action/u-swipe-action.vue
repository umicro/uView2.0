<template>
	<view class="u-swipe-action">
		<slot></slot>
	</view>
</template>

<script>
	import props from './props.js';
	export default {
		name: 'u-swipe-action',
		mixins: [uni.$u.mixin, props],
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
			clickHandler(child) {
				const index = this.children.findIndex(item => item === child)
				this.$emit('click', index)
			},
			closeOther(child) {
				if (this.autoClose) {
					this.children.map((item, index) => {
						if (child !== item) {
							item.close()
						}
					})
				}
			}
		}
	}
</script>

<style lang="scss">

</style>
