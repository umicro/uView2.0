<template>
	<view
	    class="u-steps"
	    :class="[`u-steps--${direction}`]"
	>
		<slot></slot>
	</view>
</template>

<script>
	import props from './props.js';
	export default {
		name: 'u-steps',
		mixins: [uni.$u.mixin, props],
		props: {

		},
		data() {
			return {
			}
		},
		watch: {
			children() {
				this.updateChildData()
			}
		},
		computed: {

		},
		methods: {
			// 更新子组件的数据
			updateChildData() {
				this.children.map(child => {
					// 先判断子组件是否存在对应的方法
					uni.$u.test.func((child || {}).updateFromParent()) && child.updateFromParent()
				})
			},
			// 接受子组件的通知，去修改其他子组件的数据
			updateFromChild() {
				this.updateChildData()
			}
		},
		created() {
			this.children = []
		}
	}
</script>

<style lang="scss">
	@import "../../libs/css/components.scss";

	.u-steps {
		@include flex;

		&--column {
			flex-direction: column
		}

		&--row {
			flex-direction: row;
			flex: 1;
		}
	}
</style>
