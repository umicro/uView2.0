<template>
	<view
		class="u-scroll-list"
		ref="u-scroll-list"
	>
		<!-- #ifdef APP-NVUE -->
		<!-- nvue使用bindingX实现，以得到更好的性能 -->
		<scroll-view
			class="u-scroll-list__scroll-view"
			scroll-x
			@scroll="nvueScrollHandler"
			ref="u-scroll-list__scroll-view"
			:show-scrollbar="false"
		>
			<!-- #endif -->
			<!-- #ifdef MP-WEIXIN || APP-VUE || H5 || MP-QQ -->
			<!-- 以上平台，支持wxs -->
			<scroll-view
				class="u-scroll-list__scroll-view"
				scroll-x
				@scroll="wxs.scroll"
				@scrolltoupper="wxs.scrolltoupper"
				@scrolltolower="wxs.scrolltolower"
				:data-scrollWidth="scrollWidth"
				:data-barWidth="indicatorBarWidth"
				:data-indicatorWidth="indicatorWidth"
				:show-scrollbar="false"
			>
				<!-- #endif -->
				<!-- #ifndef APP-NVUE || MP-WEIXIN || H5 || APP-VUE || MP-QQ -->
				<!-- 非以上平台，只能使用普通js实现 -->
				<scroll-view
					class="u-scroll-list__scroll-view"
					scroll-x
					@scroll="scrollHandler"
					@scrolltoupper="scrolltoupperHandler"
					@scrolltolower="scrolltolowerHandler"
					:show-scrollbar="false"
				>
					<!-- #endif -->
					<view class="u-scroll-list__scroll-view__content">
						<slot />
					</view>
				</scroll-view>
				<view
					class="u-scroll-list__indicator"
					v-if="indicator"
					:style="[$u.addStyle(indicatorStyle)]"
				>
					<view
						class="u-scroll-list__indicator__line"
						:style="[lineStyle]"
					>
						<view
							class="u-scroll-list__indicator__line__bar"
							:style="[barStyle]"
							ref="u-scroll-list__indicator__line__bar"
						></view>
					</view>
				</view>
	</view>
</template>

<script
	src="./scrollWxs.wxs"
	module="wxs"
	lang="wxs"
></script>

<script>
	// #ifdef APP-NVUE
	const dom = uni.requireNativePlugin('dom')
	import nvueMixin from "./nvue.js"
	// #endif
	import props from './props.js'
	export default {
		name: 'u-scroll-list',
		mixins: [uni.$u.mixin, props],
		// #ifdef APP-NVUE
		mixins: [uni.$u.mixin, nvueMixin, props],
		// #endif
		data() {
			return {
				scrollInfo: {
					scrollLeft: 0,
					scrollWidth: 0
				},
				scrollWidth: 0
			}
		},
		computed: {
			// 指示器为线型的样式
			barStyle() {
				const style = {}
				// #ifndef APP-NVUE || MP-WEIXIN || H5 || APP-VUE || MP-QQ
				const scrollLeft = this.scrollInfo.scrollLeft,
					scrollWidth = this.scrollInfo.scrollWidth,
					barAllMoveWidth = this.indicatorWidth - this.indicatorBarWidth
				const x = Math.ceil(scrollLeft / (scrollWidth - this.scrollWidth) * barAllMoveWidth)
				style.transform = `translateX(${ x }px)`
				// #endif
				style.backgroundColor = this.indicatorActiveColor
				return style
			},
			lineStyle() {
				const style = {}
				style.width = uni.$u.addUnit(this.indicatorWidth)
				style.backgroundColor = this.indicatorColor
				return style
			}
		},
		mounted() {
			this.init()
		},
		methods: {
			init() {
				this.getComponentWidth()
			},
			// #ifndef APP-NVUE || MP-WEIXIN || H5 || APP-VUE || MP-QQ
			// scroll-view触发滚动事件
			scrollHandler(e) {
				this.scrollInfo = e.detail
			},
			scrolltoupperHandler() {
				this.scrollInfo.scrollLeft = 0
			},
			scrolltolowerHandler() {
				this.scrollInfo.scrollLeft = uni.$u.getPx(this.indicatorWidth) - uni.$u.getPx(this.indicatorBarWidth)
			},
			// #endif
			// 获取组件的宽度
			async getComponentWidth() {
				// 延时一定时间，以获取dom尺寸
				await uni.$u.sleep(30)
				// #ifndef APP-NVUE
				this.$uGetRect('.u-scroll-list').then(size => {
					this.scrollWidth = size.width
				})
				// #endif

				// #ifdef APP-NVUE
				const ref = this.$refs['u-scroll-list']
				ref && dom.getComponentRect(ref, (res) => {
					this.scrollWidth = res.size.width
				})
				// #endif
			},
		}
	}
</script>

<style lang="scss">
	@import "../../libs/css/components.scss";

	.u-scroll-list {
		// justify-content: center;
		padding-bottom: 10px;
		// align-items: center;

		&__scroll-view {
			@include flex;

			&__content {
				// @include flex(column);
				// // position: relative;
				// justify-content: center;


			}
		}

		&__indicator {
			@include flex;
			justify-content: center;
			margin-top: 15px;

			&__line {
				width: 60px;
				height: 4px;
				border-radius: 100px;
				overflow: hidden;

				&__bar {
					width: 20px;
					height: 4px;
					border-radius: 100px;
				}
			}
		}
	}
</style>
