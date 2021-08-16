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
		data() {
			return {
			}
		},
		watch: {
			children() {
				this.updateChildData()
			},
			parentData() {
				this.updateChildData()
			}
		},
		computed: {
			// 监听参数的变化，通过watch中，手动去更新子组件的数据，否则子组件不会自动变化
			parentData() {
				return [this.current, this.direction, this.activeColor, this.inactiveColor, this.activeIcon, this.inactiveIcon, this.dot]
			}
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
