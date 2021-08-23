<template>
	<view
		class="u-tabs"
		ref="u-tabs"
	>
		<u-sticky>
			<view class="u-tabs__wrapper">
				<slot name="left" />
				<scroll-view
					:scroll-x="scrollable"
					:scroll-left="scrollLeft"
					scroll-with-animation
					class="u-tabs__wrapper__scroll-view"
					:show-scrollbar="false"
					ref="u-tabs__wrapper__scroll-view"
				>
					<view class="u-tabs__wrapper__nav">
						<view
							class="u-tabs__wrapper__nav__item"
							v-for="(item, index) in list"
							:key="index"
							@tap="clickHandler(index)"
							:ref="`u-tabs__wrapper__nav__item-${index}`"
							:class="[`u-tabs__wrapper__nav__item-${index}`]"
						>
							<u-badge :value="1">
								<text
									:class="['ellipsis' && 'u-line-1']"
									class="u-tabs__wrapper__nav__item__text"
								>{{ item.name }}</text>
							</u-badge>
						</view>
						<!-- #ifdef APP-VUE || MP-WEIXIN || MP-QQ || H5 -->
						<view
							class="u-tabs__wrapper__nav__line"
							:style="[wxsComputed.lineStyle({lineWidth, lineOffsetLeft, tabsRect}), {
								width: $u.addUnit(this.lineWidth),
								'transition-duration': firstTime ? 0 : '300ms',
							}]"
						>
							<!-- #endif -->
							<!-- #ifdef APP-NVUE -->
							<view
								class="u-tabs__wrapper__nav__line"
								ref="u-tabs__wrapper__nav__line"
								:style="[{
									width: $u.addUnit(this.lineWidth),
								}]"
							>
								<!-- #endif -->
							</view>
						</view>
				</scroll-view>
				<slot name="right" />
			</view>
		</u-sticky>
		<swiper
			@change="change"
			:current="current"
			style="height: 723px;"
			@transition="swiperTransition"
			@animationfinish="swiperAnimationfinish"
		>
			<slot />
		</swiper>
	</view>
</template>

<!-- #ifdef APP-VUE|| MP-WEIXIN || H5 || MP-QQ -->
<script
	src="./wxsComputed.wxs"
	module="wxsComputed"
	lang="wxs"
></script>
<!-- #endif -->
<script>
	// #ifdef APP-NVUE
	const animation = uni.requireNativePlugin('animation')
	const dom = uni.requireNativePlugin('dom')
	// #endif
	import props from './props.js';
	// #ifdef APP-NVUE
	import nvue from './nvue.js'
	// #endif
	/**
	 * Tabs 标签
	 * @description tabs标签组件，在标签多的时候，可以配置为左右滑动，标签少的时候，可以禁止滑动。 该组件的一个特点是配置为滚动模式时，激活的tab会自动移动到组件的中间位置。
	 * @tutorial https://www.uviewui.com/components/tabs.html
	 * @property {String | Number}	duration			滑块移动一次所需的时间，单位秒（默认 200 ）
	 * @property {String | Number}	swierWidth			swiper的宽度（默认 '750rpx' ）
	 * @event {Function(index)} change 点击标签时触发 index: 点击了第几个tab，索引从0开始
	 * @example <u-tabs :list="list" :is-scroll="false" :current="current" @change="change"></u-tabs>
	 */
	export default {
		name: 'u-tabs',
		mixins: [uni.$u.mixin, props],
		// #ifdef APP-NVUE
		mixins: [uni.$u.mixin, props, nvue],
		// #endif
		data() {
			return {
				firstTime: true,
				scrollLeft: 0,
				scrollable: true,
				scrollViewWidth: 0,
				lineWidth: 20,
				lineOffsetLeft: 0,
				fromTap: false,
				tabsRect: {
					left: 0
				},
				current: 0,
				moving: false,
				list: [{
					name: '标签1',
					rect: {}
				}, {
					name: '标签2',
					rect: {}
				}, {
					name: '标签3',
					rect: {}
				}, {
					name: '标签4',
					rect: {}
				}, {
					name: '标签5',
					rect: {}
				}, {
					name: '标签6',
					rect: {}
				}, {
					name: '标签7',
					rect: {}
				}, {
					name: '标签8',
					rect: {}
				}, {
					name: '标签9',
					rect: {}
				}],
			}
		},
		watch: {
			current(newValue, oldValue) {
				// this.setLineLeft(newValue)
			}
		},
		async mounted() {
			this.init()
		},
		methods: {
			setLineLeft() {
				const item = this.list[this.current].rect
				// 获取滑块该移动的位置
				this.lineOffsetLeft = item.center - this.lineWidth / 2 - this.tabsRect.left

				// #ifdef APP-NVUE
				// 第一次移动滑块，无需过渡时间
				this.animation(this.lineOffsetLeft, this.firstTime ? 0 : parseInt(this.duration))
				// #endif

				// 如果是第一次执行此方法，让滑块在初始化时，瞬间滑动到第一个tab item的中间
				// 这里需要一个定时器，因为在非nvue下，是直接通过style绑定过渡时间，需要等其过渡完成后，再设置为false(非第一次移动滑块)
				if (this.firstTime) {
					setTimeout(() => {
						this.firstTime = false
					}, 10);
				}
			},
			// nvue下设置滑块的位置
			animation(x, duration = 0) {
				// #ifdef APP-NVUE
				const ref = this.$refs['u-tabs__wrapper__nav__line']
				animation.transition(ref, {
					styles: {
						transform: `translateX(${x}px)`
					},
					duration
				})
				// #endif
			},
			change(e) {
				// 在ios平台触发顺序为 transition... change，Android/微信小程序/支付宝为 transition... change transition
				// 为了避免在非ios上中间会触发change，所以在滑动过程中(moving = true)，禁止触发change，避免造成混轮导致滑块错位
				if(this.moving && uni.$u.os() !== 'ios') return
				console.log('change');
				this.current = e.detail.current
				this.setScrollLeft()
				this.setLineLeft()
			},
			// 点击某一个标签
			clickHandler(index) {
				this.current = index
				this.fromTap = true
				this.setScrollLeft()
			},
			init() {
				this.getListItemRect()
				this.resize()
			},
			setScrollLeft() {
				// 当前活动tab的布局信息，有tab菜单的width和left(为元素左边界到父元素左边界的距离)等信息
				let tabInfo = this.list[this.current]
				if (!tabInfo) return
				// 活动tab的宽度
				let tabWidth = tabInfo.rect.width
				// 活动item的左边到tabs组件左边的距离，用item的left减去tabs的left
				let offsetLeft = tabInfo.rect.left - this.tabsRect.left
				// 将活动的tabs-item移动到屏幕正中间，实际上是对scroll-view的移动
				let scrollLeft = offsetLeft - (this.tabsRect.width - tabWidth) / 2
				// 在APP-NVUE上，scroll-view将某个tab item居中时，可以将最后一个item拉至中间，导致错位
				// 这里做一个限制，限制scrollLeft的最大值为整个scroll-view宽度减去tabs组件的宽度
				scrollLeft = Math.min(scrollLeft, this.scrollViewWidth - this.tabsRect.width)
				this.scrollLeft = scrollLeft < 0 ? 0 : scrollLeft
			},
			// 获取导航栏的尺寸
			resize() {
				// Promise.all([
				// 	this.queryRect('u-tabs__wrapper__nav')
				// ]).then(([tabsRect, lineRect]) => {
				// 	this.tabsRect = tabsRect
				// 	// this.lineOffsetLeft = tabsRect.left
				// })
			},
			// 获取所有标签的尺寸
			getListItemRect() {
				uni.$u.sleep().then(() => {
					this.queryRect('u-tabs').then(size => {
						this.tabsRect = size
					})
					const promiseAllArr = this.list.map((item, index) => this.queryRect(
						`u-tabs__wrapper__nav__item-${index}`, true))
					Promise.all(promiseAllArr).then(
						sizes => {
							sizes.map((item, index) => {
								// 计算scroll-view的宽度，这里
								this.scrollViewWidth += item.width
								// 另外计算每一个item的中心点X轴坐标
								item.center = item.left + item.width / 2
								this.list[index].rect = item
							})
							// 获取了tabs的尺寸之后，设置滑块的位置
							this.setLineLeft()
							this.setScrollLeft()
						})
				})
			},
			// 获取各个标签的尺寸
			queryRect(el, item) {
				// #ifndef APP-NVUE
				// $uGetRect为uView自带的节点查询简化方法，详见文档介绍：https://www.uviewui.com/js/getRect.html
				// 组件内部一般用this.$uGetRect，对外的为this.$u.getRect，二者功能一致，名称不同
				return new Promise(resolve => {
					this.$uGetRect(`.${el}`).then(size => {
						resolve(size)
					})
				})
				// #endif

				// #ifdef APP-NVUE 
				// nvue下，使用dom模块查询元素高度
				// 返回一个promise，让调用此方法的主体能使用then回调
				return new Promise(resolve => {
					dom.getComponentRect(item ? this.$refs[el][0] : this.$refs[el], res => {
						resolve(res.size)
					})
				})
				// #endif
			},
			// swiper位置发生变化时触发
			swiperTransition(e) {
				this.moving = true
				// swiper-item滑动的偏移值
				const dx = e.detail.dx
				// 当在第一个和最后一个时，还试图左滑或者右滑，直接返回，否则会造成滑块错位
				if ((this.current <= 0 && dx <= 0) || (this.current >= this.list.length - 1 && dx >= 0) || this.fromTap) return
				// swiper的宽度
				const swierWidth = uni.$u.getPx(this.swierWidth)
				// swiper-item滑动距离与swiper宽度的比例
				const ratio = Math.abs(dx / swierWidth)
				// 滑块所需移动的距离
				let lineSpace = 0,
					lineMoveX = 0
				// 根据dx的正负数值来判断是左滑还是右滑
				const currentItem = this.list[this.current].rect
				// 获取滑块该移动的位置
				const lineX = currentItem.center - this.lineWidth / 2 - this.tabsRect.left
				if (dx > 0) {
					// 右滑
					lineSpace = this.list[this.current + 1].rect.center - currentItem.center
					lineMoveX = lineX + ratio * lineSpace
				} else {
					// 左滑
					lineSpace = currentItem.center - this.list[this.current - 1].rect.center
					lineMoveX = lineX - ratio * lineSpace
				}
				// #ifndef APP-NVUE
				console.log(this.current, lineX, lineMoveX);
				this.lineOffsetLeft = lineMoveX
				// #endif
				// #ifdef APP-NVUE
				this.animation(lineMoveX)
				// #endif
			},
			// swiper-item滑动的动画结束后会触发此事件
			swiperAnimationfinish(e) {
				// console.log('end');
				this.current = e.detail.current
				this.moving = false
				this.fromTap = false
				this.setScrollLeft()
			}
		},
	}
</script>

<style lang="scss">
	@import "../../libs/css/components.scss";

	.u-tabs {

		&__wrapper {
			@include flex;

			&__scroll-view {
				@include flex;
			}

			&__nav {
				@include flex;
				height: 45px;
				// position: relative;

				&__item {
					padding: 0 15px;
					@include flex;
					align-items: center;

					&__text {
						font-size: 14px;
						color: $u-content-color;
					}
				}

				&__line {
					height: 3px;
					background-color: $u-primary;
					width: 30px;
					position: absolute;
					bottom: 0;
					border-radius: 100px;
					transition-property: transform;
				}
			}
		}
	}
</style>
