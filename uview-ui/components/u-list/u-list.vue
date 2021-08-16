<template>
	<!-- #ifdef APP-NVUE -->
	<list
		class="u-list"
		:enableBackToTop="enableBackToTop"
		:loadmoreoffset="lowerThreshold"
		:showScrollbar="showScrollbar"
		:style="[listStyle]"
		:offset-accuracy="Number(offsetAccuracy)"
		@scroll="onScroll"
		@loadmore="scrolltolower"
	>
		<slot />
	</list>
	<!-- #endif -->
	<!-- #ifndef APP-NVUE -->
	<scroll-view
		class="u-list"
		:scroll-into-view="scrollIntoView"
		:style="[listStyle]"
		scroll-y
		:scroll-top="Number(scrollTop)"
		:lower-threshold="Number(lowerThreshold)"
		:upper-threshold="Number(upperThreshold)"
		:show-scrollbar="Number(showScrollbar)"
		:enable-back-to-top="enableBackToTop"
		:scroll-with-animation="scrollWithAnimation"
		@scroll="onScroll"
		@scrolltolower="scrolltolower"
		@scrolltoupper="scrolltoupper"
	>
		<view :style="{
			paddingTop: `${offset}px`
		}">
			<slot />
		</view>
	</scroll-view>
	<!-- #endif -->
</template>

<script>
	import props from './props.js'
	// #ifdef APP-NVUE
	const dom = uni.requireNativePlugin('dom')
	// #endif
	export default {
		name: 'u-list',
		mixins: [uni.$u.mixin,props],
		watch: {
			scrollIntoView(n) {
				this.scrollIntoViewById(n)
			}
		},
		data() {
			return {
				// 记录内部滚动的距离
				innerScrollTop: 0,
				// vue下，scroll-view在上拉加载时的偏移值
				offset: 0,
				sys: uni.$u.sys()
			}
		},
		computed: {
			listStyle() {
				const style = {},
					addUnit = uni.$u.addUnit
				if (this.width != 0) style.width = addUnit(this.width)
				if (this.height != 0) style.height = addUnit(this.height)
				// 如果没有定义列表高度，则默认使用屏幕高度
				if (!style.height) style.height = addUnit(this.sys.windowHeight)
				return uni.$u.deepMerge(style, uni.$u.addStyle(this.customStyle))
			}
		},
		provide() {
			return {
				uList: this
			}
		},
		created() {
			this.refs = []
			this.children = []
			this.anchors = []
		},
		mounted() {},
		methods: {
			updateOffsetFromChild(top) {
				this.offset = top
			},
			onScroll(e) {
				let scrollTop = 0
				// #ifdef APP-NVUE
				scrollTop = e.contentOffset.y
				// #endif
				// #ifndef APP-NVUE
				scrollTop = e.detail.scrollTop
				// #endif
				this.innerScrollTop = scrollTop
				this.$emit('scroll', Math.abs(scrollTop))
			},
			scrollIntoViewById(id) {
				// #ifdef APP-NVUE
				// 根据id参数，找到所有u-list-item中匹配的节点，再通过dom模块滚动到对应的位置
				const item = this.refs.find(item => item.$refs[id] ? true : false)
				dom.scrollToElement(item.$refs[id], {
					// 是否需要滚动动画
					animated: this.scrollWithAnimation
				})
				// #endif
			},
			// 滚动到底部触发事件
			scrolltolower(e) {
				uni.$u.sleep(30).then(() => {
					this.$emit('scrolltolower')
				})
			},
			// #ifndef APP-NVUE
			// 滚动到底部时触发，非nvue有效
			scrolltoupper(e) {
				uni.$u.sleep(30).then(() => {
					this.$emit('scrolltolower')
					// 这一句很重要，能绝对保证在性功能障碍的webview，滚动条到顶时，取消偏移值，让页面置顶
					this.offset = 0
				})
			}
			// #endif
		},
	}
</script>

<style lang="scss">
	@import "../../libs/css/components.scss";

	.u-list {
		@include flex(column);

	}
</style>
