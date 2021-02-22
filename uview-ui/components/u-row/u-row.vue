<template>
	<view
	    class="u-row"
		ref="u-row"
	    :style="[{
			alignItems: uAlignItem,
			justifyContent: uJustify
		}, $u.addStyle(customStyle)]"
	    @tap="clickHandler"
	>
		<slot />
	</view>
</template>

<script>
	// #ifdef APP-NVUE
	const dom = uni.requireNativePlugin('dom')
	// #endif
	import props from './props.js'
	export default {
		name: "u-row",
		mixins: [uni.$u.mixin, props],
		data() {
			return {
				
			}
		},
		computed: {
			uJustify() {
				if (this.justify == 'end' || this.justify == 'start') return 'flex-' + this.justify
				else if (this.justify == 'around' || this.justify == 'between') return 'space-' + this.justify
				else return this.justify
			},
			uAlignItem() {
				if (this.align == 'top') return 'flex-start'
				if (this.align == 'bottom') return 'flex-end'
				else return this.align
			}
		},
		methods: {
			clickHandler(e) {
				this.$emit('click')
			},
			async getComponentWidth() {
				// 延时一定时间，以确保节点渲染完成
				await uni.$u.sleep()
				return new Promise(resolve => {
					// uView封装的获取节点的方法，详见文档
					// #ifndef APP-NVUE
					this.$uGetRect('.u-row').then(res => {
						resolve(res.width)
					})
					// #endif
					// #ifdef APP-NVUE
					// nvue的dom模块用于获取节点
					dom.getComponentRect(this.$refs['u-row'], (res) => {
						resolve(res.size.width)
					})
					// #endif
				})
			},
		}
	}
</script>

<style lang="scss">
	@import "../../libs/css/components.scss";
	
	.u-row {
		@include flex;
	}
</style>
