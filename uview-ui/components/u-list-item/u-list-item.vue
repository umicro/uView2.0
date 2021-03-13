<template>
	<!-- #ifdef APP-NVUE -->
	<cell>
		<!-- #endif -->
		<view
			class="u-list-item"
			:ref="`u-list-item-${id}`"
			:id="`u-list-item-${id}`"
			:class="[`u-list-item-${id}`]"
			v-if="show"
		>
			<slot />
		</view>
		<!-- #ifdef APP-NVUE -->
	</cell>
	<!-- #endif -->
</template>

<script>
	// #ifdef APP-NVUE
	const dom = uni.requireNativePlugin('dom')
	// #endif
	export default {
		name: 'u-list-item',
		mixins: [uni.$u.mixin],
		props: {
			// 用于滚动到指定item
			id: {
				type: [String, Number],
				default: ''
			},
		},
		data() {
			return {
				// 节点信息
				rect: {},
				index: 0,
				show: true,
				sys: uni.$u.sys()
			}
		},
		computed: {

		},
		inject: ['uList'],
		watch: {
			'uList.scrollTop'(n) {
				if (this.rect.top < n - 14 * 50 || this.rect.top > n + 26 * 50) {
					this.show = false
					if (this.rect.top < n - 5 * 50) {
						this.parent.setTop(this.rect.top)
					}
				}
				else {
					this.show = true
				}
			}
		},
		created() {
			this.parent = {}
		},
		mounted() {
			this.init()
		},
		methods: {
			init() {
				// 初始化数据
				this.updateParentData()
				this.resize()
				this.index = this.parent.children.indexOf(this)
				// uni.$on('change', ({
				// 	start,
				// 	end
				// }) => {
				// 	this.show = this.index >= start && this.index <= end
				// })
			},
			updateParentData() {
				// 此方法在mixin中
				this.getParentData('u-list')
			},
			resize() {
				this.queryRect(`u-list-item-${this.id}`).then(size => {
					// console.log(size);
					const lastChild = this.parent.children[this.index - 1]
					this.rect = size
					if(lastChild) {
						this.rect.top = lastChild.rect.top + lastChild.rect.height
					}
					if (size.top >= 2 * this.sys.windowHeight) this.show = false
				})
			},
			// 查询元素尺寸
			queryRect(el) {
				return new Promise(resolve => {
					// #ifndef APP-NVUE
					this.$uGetRect(`.${el}`).then(size => {
						resolve(size)
					})
					// #endif

					// #ifdef APP-NVUE
					const ref = this.$refs[el]
					dom.getComponentRect(ref, res => {
						resolve(res.size)
					})
					// #endif
				})
			}
		}
	}
</script>

<style lang="scss">
	@import "../../libs/css/components.scss";

	.u-list-item {}
</style>
