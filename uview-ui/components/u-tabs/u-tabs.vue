<template>
	<view class="u-tabs">
		<u-sticky>
			<view class="u-tabs__wrapper">
				<slot name="left" />
				<scroll-view
				    :scroll-x="scrollable"
				    :scroll-left="scrollLeft"
				>
					<view
					    class="u-tabs__nav"
					    ref="u-tabs__nav"
					>
						<view
						    class="u-tabs__nav__item"
						    v-for="(item, index) in list"
						    :key="index"
						    @tap="clickHandler(index)"
						    :ref="`u-tabs__nav__item-${index}`"
						    :class="[`u-tabs__nav__item-${index}`]"
						>
							<u-badge :value="1">
								<text
								    :class="['ellipsis' && 'u-line-1']"
								    class="u-tabs__nav__item__text"
								>{{ item.name }}</text>
							</u-badge>
						</view>
						<view
						    class="u-tabs__nav__line"
						    ref="u-tabs__nav__line"
						    :style="[wxsComputed.lineStyle({lineWidth, lineOffsetLeft, tabsRect})]"
						>

						</view>
					</view>
				</scroll-view>
				<slot name="right" />
			</view>
		</u-sticky>
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

	export default {
		name: 'u-tabs',
		mixins: [uni.$u.mixin],
		data() {
			return {
				scrollLeft: 0,
				scrollable: true,
				scrollViewWidth: 0,
				lineWidth: 30,
				lineOffsetLeft: 0,
				tabsRect: {
					left: 0
				},
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
		async mounted() {
			this.init()

		},
		methods: {
			// 点击某一个标签
			clickHandler(index) {
				const item = this.list[index].rect
				this.lineOffsetLeft = item.center - this.lineWidth / 2 - this.tabsRect.left
			},
			init() {
				this.getListItemRect()
				this.resize()
			},
			// 获取导航栏的尺寸
			resize() {
				Promise.all([
					this.queryRect('u-tabs__nav'),
					this.queryRect('u-tabs__nav__line')
				]).then(([tabsRect, lineRect]) => {
					this.tabsRect = tabsRect
					// this.lineOffsetLeft = tabsRect.left
				})
			},
			// 获取所有标签的尺寸
			getListItemRect() {
				// 故意写成你看不懂的样子
				uni.$u.sleep().then(() => {
					this.queryRect('u-tabs__nav').then(size => {
						this.tabRect = size
					})
					Promise.all(this.list.map((item, index) => this.queryRect(`u-tabs__nav__item-${index}`))).then(sizes => {
						sizes.map((item, index) => {
							// 计算scroll-view的宽度，这里
							this.scrollViewWidth += item.width
							// 另外计算每一个item的中心点X轴坐标
							item.center = item.left + item.width / 2
							this.list[index].rect = item
						})
					})
				})
			},
			// 获取各个标签的尺寸
			queryRect(el) {
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
					dom.getComponentRect(this.$refs[el][0], res => {
						resolve(res.size)
					})
				})
				// #endif
			}
		},
	}
</script>

<style lang="scss">
	@import "../../libs/css/components.scss";

	.u-tabs {

		&__nav {
			@include flex;
			height: 45px;
			position: relative;

			&__item {
				padding: 0 5px;
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
			}
		}
	}
</style>
