<template>
	<view class="u-index-list">
		<scroll-view
		    scroll-y
		    :scroll-top="scrollTop"
		    :style="{
				height: $u.addUnit(scrollViewHeight)
			}"
		    @scroll="scrollHandler"
			enable-back-to-top
		>
			<slot name="header" />
			<slot />
			<slot name="footer" />
			<view
			    class="u-index-list__letter"
			    ref="u-index-list__letter"
			    v-if="showSidebar"
			    :style="{ top: $u.addUnit(letterInfo.top) }"
			    @touchstart.stop.prevent="touchStart"
			    @touchmove.stop.prevent="touchMove"
			    @touchend.stop.prevent="touchEnd"
			    @touchcancel.stop.prevent="touchEnd"
			>
				<view
				    class="u-index-list__letter__item"
				    v-for="(item, index) in uIndexList"
				    :key="index"
				    :style="{
						backgroundColor: activeIndex === index ? activeColor : 'transparent'
					}"
				>
					<text
					    class="u-index-list__letter__item__index"
					    :style="{color: activeIndex === index ? '#fff' : inactiveColor}"
					>{{ item }}</text>
				</view>
			</view>
			<u-transition
			    mode="fade"
			    :show="touching"
				:customStyle="{
					position: 'fixed',
					right: '50px',
					top: $u.addUnit(indicatorTop),
					zIndex: 2
				}"
			>
				<view
				    class="u-index-list__indicator"
				    :class="['u-index-list__indicator--show']"
				    :style="{
						height: $u.addUnit(indicatorHeight),
						width: $u.addUnit(indicatorHeight)
					}"
				>
					<text class="u-index-list__indicator__text">{{ uIndexList[activeIndex] }}</text>
				</view>
			</u-transition>
		</scroll-view>
	</view>
</template>

<script>
	const indexList = () => {
		const indexList = [];
		const charCodeOfA = 'A'.charCodeAt(0);
		for (let i = 0; i < 26; i++) {
			indexList.push(String.fromCharCode(charCodeOfA + i));
		}
		return indexList;
	}
	import props from './props'
	// #ifdef APP-NVUE
	// 由于weex为阿里的KPI业绩考核的垃ji，所以不支持百分比单位，这里需要通过dom查询组件的宽度
	const dom = uni.requireNativePlugin('dom')
	// #endif
	export default {
		name: 'u-index-list',
		mixins: [uni.$u.mixin, props],
		data() {
			return {
				// 是否显示右侧的索引列表字母，当子组件数量为0时，无需展示
				showSidebar: true,
				// 当前正在被选中的字母索引
				activeIndex: -1,
				touchmoveIndex: 1,
				// 索引字母的信息
				letterInfo: {
					height: 0,
					itemHeight: 0,
					top: 0
				},
				// 设置字母指示器的高度，后面为了让指示器跟随字母，并将尖角部分指向字母的中部，需要依赖此值
				indicatorHeight: 50,
				// 字母放大指示器的top值，为了让其指向当前激活的字母
				// indicatorTop: 0
				// 当前是否正在被触摸状态
				touching: false,
				// 滚动条顶部top值
				scrollTop: 0,
				// scroll-view的高度
				scrollViewHeight: 0,
				// 系统信息
				sys: uni.$u.sys(),
				scrolling: false
			}
		},
		computed: {
			// 如果有传入外部的indexList锚点数组则使用，否则使用内部生成A-Z字母
			uIndexList() {
				return this.indexList.length ? this.indexList : indexList()
			},
			// 字母放大指示器的top值，为了让其指向当前激活的字母
			indicatorTop() {
				const {
					top,
					itemHeight
				} = this.letterInfo
				return Math.floor(top + itemHeight * this.activeIndex + itemHeight / 2 - this.indicatorHeight / 2)
			}
		},
		watch: {
			uIndexList: {
				immediate: true,
				handler() {
					uni.$u.sleep().then(() => {
						this.setIndexListLetterInfo()
					})
				}
			}
		},
		created() {
			this.children = []
			this.init()
		},
		methods: {
			init() {
				this.scrollViewHeight = this.sys.windowHeight
			},
			// 索引列表被触摸
			touchStart(e) {
				// 获取触摸点信息
				const touchStart = e.changedTouches[0]
				if (!touchStart) return
				this.touching = true
				const {
					pageY
				} = touchStart
				const currentIndex = this.getIndexListLetter(pageY)
				this.setValueForTouch(currentIndex)
			},
			// 索引字母列表被触摸滑动中
			touchMove(e) {
				// 获取触摸点信息
				let touchMove = e.changedTouches[0]
				if (!touchMove) return;

				// 滑动结束后迅速开始第二次滑动时候 touching 为 false 造成不显示 indicator 问题
				if (!this.touching) {
					this.touching = true
				}
				const {
					pageY
				} = touchMove
				const currentIndex = this.getIndexListLetter(pageY)
				this.setValueForTouch(currentIndex)
			},
			// 触摸结束
			touchEnd(e) {
				// 延时一定时间后再隐藏指示器，为了让用户看的更直观，同时也是为了消除快速切换u-transition的show带来的影响
				uni.$u.sleep(300).then(() => {
					this.touching = false
				})
			},
			// 获取索引列表的尺寸以及单个字符的尺寸信息
			getIndexListLetterRect() {
				return new Promise(resolve => {
					// 延时一定时间，以获取dom尺寸
					// #ifndef APP-NVUE
					this.$uGetRect('.u-index-list__letter').then(size => {
						resolve(size)
					})
					// #endif

					// #ifdef APP-NVUE
					const ref = this.$refs['u-index-list__letter']
					dom.getComponentRect(ref, res => {
						resolve(res.size)
					})
					// #endif
				})
			},
			// 设置indexList索引的尺寸信息
			setIndexListLetterInfo() {
				this.getIndexListLetterRect().then(size => {
					const {
						height
					} = size
					const sys = uni.$u.sys()
					const windowHeight = sys.windowHeight
					let customNavHeight = 0
					// 消除各端导航栏非原生和原生导致的差异，让索引列表字母对屏幕垂直居中
					if (this.customNavHeight == 0) {
						// #ifdef H5
						customNavHeight = sys.windowTop
						// #endif
						// #ifndef H5
						customNavHeight = -(sys.statusBarHeight + 44)
						// #endif
					} else {
						customNavHeight = uni.$u.getPx(this.customNavHeight)
					}
					this.letterInfo = {
						height,
						top: (windowHeight - height) / 2 + customNavHeight / 2,
						itemHeight: Math.floor(height / this.uIndexList.length)
					}
				})
			},
			// 获取当前被触摸的索引字母
			getIndexListLetter(pageY) {
				const {
					top,
					height,
					itemHeight
				} = this.letterInfo
				// 对H5的pageY进行修正，这是由于uni-app自作多情在H5中将触摸点的坐标跟H5的导航栏结合导致的问题
				pageY += uni.$u.sys().windowTop
				// 对第一和最后一个字母做边界处理，因为用户可能在字母列表上触摸到两端的尽头后依然继续滑动
				if (pageY < top) {
					return 0
				} else if (pageY >= top + height) {
					// 如果超出了，取最后一个字母
					return this.uIndexList.length - 1
				} else {
					// 将触摸点的Y轴偏移值，减去索引字母的top值，除以每个字母的高度，即可得到当前触摸点落在哪个字母上
					return Math.floor((pageY - top) / itemHeight);
				}
			},
			// 设置各项由触摸而导致变化的值
			setValueForTouch(currentIndex) {
				// 如果偏移量太小，前后得出的会是同一个索引字母，为了防抖，进行返回
				if (currentIndex === this.activeIndex) return
				this.activeIndex = currentIndex
				this.scrollTop = this.children[this.activeIndex].top
				this.children.map((item, index) => {
					item.anchor.bgColor = currentIndex === index ? this.anchorStickyBgColor : this.anchorBgColor
					item.anchor.color = currentIndex === index ? this.activeColor : this.inactiveColor
				})
			},
			// scroll-view的滚动事件
			scrollHandler(e) {
				if (this.touching || this.scrolling) return 
				// 每过一定时间取样一次，减少资源损耗以及可能带来的卡顿
				// this.scrolling = true
				// uni.$u.sleep(100).then(() => {
				// 	this.scrolling = false
				// })
				const scrollTop = Math.ceil(e.detail.scrollTop)
				const len = this.children.length
				for (let i = 0; i < len; i++) {
					const item = this.children[i],
						nextItem = this.children[i + 1],
						anchorHeight = this.anchorHeight
					// 如果滚动条高度小于第一个item的top值，此时无需设置任意字母为高亮
					if (scrollTop <= this.children[0].top || scrollTop >= this.children[len - 1].top + this.children[len - 1].height) {
						if (scrollTop < item.top && scrollTop > item.top - anchorHeight) {
							this.setFirstColorGradient(item, scrollTop)
						}
						this.activeIndex = -1
						break
					} else if (!nextItem) {
						// 当不存在下一个item时，意味着历遍到了最后一个
						this.activeIndex = len - 1
						break
					} else if (scrollTop > item.top && scrollTop < nextItem.top) {
						if (scrollTop > nextItem.top - anchorHeight) {
							this.setColorGradient(item, nextItem, scrollTop)
						}
						// 处理边界情况，防止快速滑动时，可能因为某些滚动位置没触发，导致某些item的anchor的背景色和color没完全修改过来
						if(scrollTop < nextItem.top - anchorHeight) {
							nextItem.anchor.bgColor !== this.anchorBgColor && (nextItem.anchor.bgColor = this.anchorBgColor)
							nextItem.anchor.color !== this.inactiveColor && (nextItem.anchor.color = this.inactiveColor)
						}
						this.activeIndex = i
						break
					}
				}
			},
			// 设置非第一个背景和文字渐变色
			setColorGradient(item, nextItem, scrollTop) {
				const anchorHeight = this.anchorHeight
				const bgColorArr = uni.$u.colorGradient(this.anchorBgColor, this.anchorStickyBgColor, anchorHeight)
				const colorArr = uni.$u.colorGradient(this.inactiveColor, this.activeColor, anchorHeight)
				const colorIndex = nextItem.top-scrollTop
				item.anchor.bgColor = bgColorArr[colorIndex]
				item.anchor.color = colorArr[colorIndex]
				nextItem.anchor.bgColor = bgColorArr[anchorHeight - colorIndex]
				nextItem.anchor.color = colorArr[anchorHeight - colorIndex]
			},
			// 设置第一个背景和文字渐变色
			setFirstColorGradient(item, scrollTop) {
				const anchorHeight = this.anchorHeight
				const bgColorArr = uni.$u.colorGradient(this.anchorBgColor, this.anchorStickyBgColor, anchorHeight)
				const colorArr = uni.$u.colorGradient(this.inactiveColor, this.activeColor, anchorHeight)
				const colorIndex = item.top - scrollTop
				item.anchor.bgColor = bgColorArr[anchorHeight - colorIndex]
				item.anchor.color = colorArr[anchorHeight - colorIndex]
			},
		},
	}
</script>

<style lang="scss">
	@import "../../libs/css/components.scss";

	.u-index-list {

		&__letter {
			position: fixed;
			right: 0;
			text-align: center;
			z-index: 3;
			padding: 0 6px;

			&__item {
				width: 16px;
				height: 16px;
				border-radius: 100px;
				margin: 1px 0;
				@include flex;
				align-items: center;
				justify-content: center;

				&--active {
					background-color: $u-primary;
				}

				&__index {
					font-size: 12px;
					text-align: center;
					line-height: 12px;
				}
			}
		}

		&__indicator {
			width: 50px;
			height: 50px;
			border-radius: 100px 100px 0 100px;
			text-align: center;
			color: #ffffff;
			background-color: #c9c9c9;
			transform: rotate(-45deg);
			@include flex;
			justify-content: center;
			align-items: center;

			&__text {
				font-size: 28px;
				line-height: 28px;
				font-weight: bold;
				color: #fff;
				transform: rotate(45deg);
				text-align: center;
			}
		}
	}
</style>
