<template>
	<view class="u-swipe-action">
		<slot></slot>
	</view>
</template>

<script>
	export default {
		name: 'u-swipe-action',
		props: {
			// 是否自动关闭其他swipe按钮组
			autoClose: {
				type: Boolean,
				default: uni.$u.props.swipeAction.autoClose
			},
		},
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
