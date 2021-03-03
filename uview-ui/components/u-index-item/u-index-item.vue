<template>
	<view
	    class="u-index-item"
	    ref="u-index-item"
	>
		<slot/>
	</view>
</template>

<script>
	// #ifdef APP-NVUE
	// 由于weex为阿里的KPI业绩考核的垃ji，所以不支持百分比单位，这里需要通过dom查询组件的宽度
	const dom = uni.requireNativePlugin('dom')
	// #endif
	export default {
		name: 'u-index-item',
		mixins: [uni.$u.mixin],
		data() {
			return {
				// 本组件到滚动条顶部的距离
				top: 0,
				height: 0,
			}
		},
		created() {
			// 子组件u-index-anchor的实例
			this.anchor = {}
		},
		mounted() {
			this.init()
		},
		methods: {
			init() {
				// 此处会活动父组件实例，并赋值给实例的parent属性
				this.getParentData('u-index-list')
				if (!this.parent) {
					return uni.$u.error('u-index-item必须要搭配u-index-list组件使用')
				}
				uni.$u.sleep().then(() =>{
					this.getIndexItemRect().then(size => {
						// 由于对象的引用特性，此处会同时生效到父组件的children数组的本实例的top属性中，供父组件判断读取
						this.top = Math.floor(size.top)
						this.height = Math.floor(size.height)
					})
				})
			},
			getIndexItemRect() {
				return new Promise(resolve => {
					// #ifndef APP-NVUE
					this.$uGetRect('.u-index-item').then(size => {
						resolve(size)
					})
					// #endif

					// #ifdef APP-NVUE
					const ref = this.$refs['u-index-item']
					dom.getComponentRect(ref, res => {
						resolve(res.size)
					})
					// #endif
				})
			}
		},
	}
</script>

<style lang="scss">
	@import "../../libs/css/components.scss";
	
</style>
