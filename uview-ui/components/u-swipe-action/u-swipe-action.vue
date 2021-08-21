<template>
	<view class="u-swipe-action">
		<slot></slot>
	</view>
</template>

<script>
	import props from './props.js';
	/**
	 * SwipeAction 滑动单元格 
	 * @description 该组件一般用于左滑唤出操作菜单的场景，用的最多的是左滑删除操作
	 * @tutorial https://www.uviewui.com/components/swipeAction.html
	 * @property {Boolean}	autoClose	是否自动关闭其他swipe按钮组
	 * @event {Function(index)}	click	点击组件时触发
	 * @example	<u-swipe-action><u-swipe-action-item :rightOptions="options1" ></u-swipe-action-item></u-swipe-action>
	 */
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
