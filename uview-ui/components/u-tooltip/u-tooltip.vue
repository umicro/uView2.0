<template>
	<view class="u-tooltip">
		<!-- <u-overlay
		    :show="showIndicator"
		    customStyle="backgroundColor: rgba(0, 0, 0, 0.2)"
		></u-overlay> -->
		<view class="u-tooltip__wrapper">
			<text
			    class="u-tooltip__wrapper__text"
			    :id="textId"
			    :ref="textId"
			    @longpress.stop="longpressHandler"
				:style="{
					backgroundColor: bgColor && showTooltip && tooltipTop !== -10000 ? bgColor : 'transparent'
				}"
			>{{ text }}</text>
			<u-transition
			    mode="fade"
			    :show="showTooltip"
			    duration="300"
			    :style="[{
					position: 'absolute', 
					top: $u.addUnit(tooltipTop),
					zIndex: 10071,
				}, tooltipStyle]"
			>
				<view
				    class="u-tooltip__wrapper__popup"
				    :id="tooltipId"
				    :ref="tooltipId"
				>
					<view
					    class="u-tooltip__wrapper__popup__indicator"
					    :style="[indicatorStyle, {
							width: $u.addUnit(indicatorWidth),
							height: $u.addUnit(indicatorWidth),
						}]"
					>
						<!-- 由于nvue不支持三角形绘制，这里就做一个四方形，再旋转45deg，得到露出的一个圆角 -->
					</view>
					<view class="u-tooltip__wrapper__popup__list">
						<text
						    class="u-tooltip__wrapper__popup__list__btn"
						    @tap="btnClickHandler"
						>复制</text>
						<u-line
						    direction="column"
							color="#8d8e90"
						    v-if="buttons.length > 0"
						></u-line>
						<template v-for="(item , index) in buttons">
							<text
							    class="u-tooltip__wrapper__popup__list__btn"
							    @tap="btnClickHandler"
							>{{ item }}</text>
							<u-line
							    direction="column"
								color="#8d8e90"
							    v-if="index < buttons.length - 1"
							></u-line>
						</template>
					</view>
				</view>
			</u-transition>
		</view>
	</view>
</template>

<script>
	import props from './props'
	// #ifdef APP-NVUE 
	const dom = uni.requireNativePlugin('dom')
	// #endif
	export default {
		name: 'u-tooltip',
		mixins: [uni.$u.mixin, props],
		data() {
			return {
				// 是否展示气泡
				showTooltip: true,
				// 生成唯一id，防止一个页面多个组件，造成干扰
				textId: uni.$u.guid(),
				tooltipId: uni.$u.guid(),
				// 初始时甚至为很大的值，让其移到屏幕外面，为了计算元素的尺寸
				tooltipTop: -10000,
				// 气泡的位置信息
				tooltipInfo: {
					width: 0,
					left: 0
				},
				// 文本的位置信息
				textInfo: {
					width: 0,
					left: 0
				},
				// 三角形指示器的样式
				indicatorStyle: {},
				// 气泡在可能超出屏幕边沿范围时，重新定位后，距离屏幕边沿的距离
				screenGap: 12,
				// 三角形指示器的宽高，由于对元素进行了角度旋转，精确计算指示器位置时，需要用到其尺寸信息
				indicatorWidth: 14,
			}
		},
		watch: {
			propsChange() {
				this.getElRect()
			}
		},
		computed: {
			// 当一些依赖参数变化时，需要重新计算气泡和指示器的位置信息
			propsChange() {
				return [this.text, this.buttons]
			},
			// 计算气泡和指示器的位置信息
			tooltipStyle() {
				const style = {
						transform: `translateY(${this.direction === 'top' ? '-100%' : '100%'})`,
					},
					sys = uni.$u.sys(),
					getPx = uni.$u.getPx,
					addUnit = uni.$u.addUnit
				if (this.tooltipInfo.width / 2 > this.textInfo.left + this.textInfo.width / 2 - this.screenGap) {
					this.indicatorStyle = {}
					style.left = `-${addUnit(this.textInfo.left - this.screenGap)}`
					this.indicatorStyle.left = addUnit(this.textInfo.width / 2 - getPx(style.left) - this.indicatorWidth / 2)
				} else if (this.tooltipInfo.width / 2 > sys.windowWidth - this.textInfo.right + this.textInfo.width / 2 - this.screenGap) {
					this.indicatorStyle = {}
					style.right = `-${addUnit(sys.windowWidth - this.textInfo.right - this.screenGap)}`
					this.indicatorStyle.right = addUnit(this.textInfo.width / 2 - getPx(style.right) - this.indicatorWidth / 2)
				} else {
					const left = Math.abs(this.textInfo.width / 2 - this.tooltipInfo.width / 2)
					style.left = this.textInfo.width > this.tooltipInfo.width ? addUnit(left) : -addUnit(left)
					this.indicatorStyle = {}
				}
				if (this.direction === 'top') {
					style.marginTop = '-10px'
					this.indicatorStyle.bottom = '-4px'
				} else {
					style.marginBottom = '-10px'
					this.indicatorStyle.top = '-4px'
				}
				return style
			}
		},
		mounted() {
			this.init()
		},
		methods: {
			init() {
				this.getElRect()
			},
			// 长按触发事件
			async longpressHandler() {
				this.tooltipTop = 0
				this.showTooltip = true
			},
			// 点击弹出按钮
			btnClickHandler() {
				this.showTooltip = false
			},
			// 查询内容高度
			queryRect(ref) {
				// #ifndef APP-NVUE
				// $uGetRect为uView自带的节点查询简化方法，详见文档介绍：https://www.uviewui.com/js/getRect.html
				// 组件内部一般用this.$uGetRect，对外的为this.$u.getRect，二者功能一致，名称不同
				return new Promise(resolve => {
					this.$uGetRect(`#${ref}`).then(size => {
						resolve(size)
					})
				})
				// #endif

				// #ifdef APP-NVUE
				// nvue下，使用dom模块查询元素高度
				// 返回一个promise，让调用此方法的主体能使用then回调
				return new Promise(resolve => {
					dom.getComponentRect(this.$refs[ref], res => {
						resolve(res.size)
					})
				})
				// #endif
			},
			// 元素尺寸
			getElRect() {
				// 调用之前，先将指示器调整到屏幕外，方便获取尺寸
				this.showTooltip = true
				this.tooltipTop = -10000
				uni.$u.sleep(500).then(() => {
					this.queryRect(this.tooltipId).then(size => {
						this.tooltipInfo = size
						// 获取气泡尺寸之后，将其隐藏，为了让下次切换气泡显示与隐藏时，有淡入淡出的效果
						this.showTooltip = false
					})
					this.queryRect(this.textId).then(size => {
						this.textInfo = size
					})
				})
			}
		},
	}
</script>

<style lang="scss">
	@import "../../libs/css/components.scss";

	.u-tooltip {
		position: relative;
		@include flex;

		&__wrapper {
			@include flex;
			justify-content: center;
			/* #ifndef APP-NVUE */
			white-space: nowrap;
			/* #endif */

			&__text {
				color: $u-content-color;
				font-size: 14px;
			}

			&__popup {
				@include flex;
				justify-content: center;

				&__list {
					background-color: #060607;
					position: relative;
					flex: 1;
					border-radius: 5px;
					padding: 7px 0;
					@include flex;

					&__btn {
						color: #FFFFFF;
						font-size: 13px;
						line-height: 12px;
						padding: 4px 13px;
					}
				}

				&__indicator {
					position: absolute;
					background-color: #060607;
					width: 14px;
					height: 14px;
					bottom: -4px;
					transform: rotate(45deg);
					border-radius: 2px;
					z-index: -1;
				}
			}
		}
	}
</style>
