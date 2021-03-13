<template>
	<!-- #ifdef APP-NVUE -->
	<list
		class="u-list"
		:enableBackToTop="enableBackToTop"
		loadmoreoffset="15"
		:showScrollbar="showScrollbar"
		@scroll="onScroll"
		:style="[$u.addStyle(customStyle)]"
	>
		<slot />
	</list>
	<!-- #endif -->
	<!-- #ifndef APP-NVUE -->
	<scroll-view
		:scroll-into-view="scrollIntoView"
		:style="{
			height: `${sys.windowHeight}px`
		}"
		scroll-y
		@scroll="onScroll"
		@scrolltolower="scrolltolower"
		:lower-threshold="300"
		:showScrollbar="showScrollbar"
	>
		<view class="u-list" :style="{
			transform: `translateY(${offset}px)`
		}">
			<slot />
		</view>
	</scroll-view>
	<!-- #endif -->
</template>

<script>
	// #ifdef APP-NVUE
	const dom = uni.requireNativePlugin('dom')
	// #endif
	export default {
		name: 'u-list',
		mixins: [uni.$u.mixin],
		props: {
			// 是否有回弹效果
			bounce: {
				type: Boolean,
				default: true
			},
			// 控制是否出现滚动条
			showScrollbar: {
				type: Boolean,
				default: false
			},
			// 触发 loadmore 事件所需要的垂直偏移距离
			loadmoreoffset: {
				type: [Number, String],
				default: 0
			},
			// 控制 onscroll 事件触发的频率
			offsetAccuracy: {
				type: [Number, String],
				default: 10
			},
			// 是否按分页模式显示List，默认值false
			pagingEnabled: {
				type: Boolean,
				default: false
			},
			// 是否允许List滚动
			scrollable: {
				type: Boolean,
				default: true
			},
			// 值应为某子元素id（id不能以数字开头）
			scrollIntoView: {
				type: String,
				default: ''
			},
			// 在设置滚动条位置时使用动画过渡
			scrollWithAnimation: {
				type: Boolean,
				default: false
			},
			enableBackToTop: {
				type: Boolean,
				default: false
			}
		},
		watch: {
			scrollIntoView(n) {

			},
			startIndex: {
				immediate: true,
				handler(n) {
					// setTimeout(() => {
					// 	uni.$emit('change', {
					// 		start: this.startIndex, 
					// 		end: this.endIndex
					// 	})
					// }, 1000);
				}
			}
		},
		data() {
			return {
				startIndex: 0,
				endIndex: 50,
				scrollTop: 0,
				offset: 0,
				sys: uni.$u.sys()
			}
		},
		provide() {
			return {
				uList: this
			}
		},
		created() {
			this.children = []
			setTimeout(() => {
				this.startIndex = 4
				this.endIndex = 30
			}, 3000)
		},
		mounted() {
			// let arr = [
			// 	{show: false},
			// 	{show: false},
			// 	{show: false},
			// 	{show: false},
			// 	{show: false},
			// 	{show: true},
			// 	{show: true}
			// ]
			// console.log(this.binarySearch(arr));
		},
		methods: {
			setTop(top) {
				this.offset = top
			},
			onScroll(e) {
				const scrollTop = e.target.scrollTop
				this.scrollTop = scrollTop
				// // console.log(scrollTop, this.binarySearch(this.children, scrollTop));
				// let len = this.children.length - 1
				// let index = this.binarySearch(this.children, 0, Math.floor(len / 2))
				// if(index === false) {
				// 	index = this.binarySearch(this.children, Math.floor(len / 2), len)
				// }
				// console.log(index);
				// this.offset = this.children[index].rect.top || 0
				// this.startIndex = index
				// this.endIndex = this.startIndex + 30
				
			},
			scrollIntoViewId(id) {
				// #ifdef APP-NVUE
				// 根据id参数，找到所有u-list-item中匹配的节点，再通过dom模块滚动到对应的位置
				const item = this.refs.find(item => item.id == id)
				dom.scrollToElement(item.$refs[`u-list-item-${id}`], {
					// 是否需要滚动动画
					animated: this.scrollWithAnimation
				})
				// #endif
			},
			// 计算
			binarySearch(list, start, end) {
				while (start <= end) {
					let middleIndex = Math.floor((end + start) / 2)
					let middle = list[middleIndex]
					let middleNext = list[middleIndex + 1]
					if(!middleNext) return false
					// console.log(middle, middleNext);
					if (middle.show === false && middleNext.show === true) {
						return middleIndex
					} 
					if (middle.show === true) {
						end = middleIndex - 1
					} else {
						start = middleIndex + 1
					}
				}
				return 0
			},
			// 滚动到底部触发事件
			scrolltolower() {
				uni.$u.sleep(30).then(() => {
					this.$emit('scrolltolower')
				})
			}
		},
	}
</script>

<style lang="scss">
	@import "../../libs/css/components.scss";

	.u-list {
		@include flex(column);

	}
</style>
