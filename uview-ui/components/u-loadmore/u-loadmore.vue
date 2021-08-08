<template>
	<view
	    class="u-loadmore"
	    :style="{
		backgroundColor: bgColor,
		marginBottom: $u.addUnit(marginBottom),
		marginTop: $u.addUnit(marginTop),
		height: $u.addUnit(height)
	}"
	>
		<u-line
		    length="140rpx"
		    color="#E6E8EB"
		    :hairline="false"
			v-if="line"
		></u-line>
		<!-- 加载中和没有更多的状态才显示两边的横线 -->
		<view
		    :class="status == 'loadmore' || status == 'nomore' ? 'u-more' : ''"
		    class="u-loadmore__content"
		>
			<view
			    class="u-loadmore__content__icon-wrap"
			    v-if="status === 'loading' && icon"
			>
				<u-loading-icon
				    :color="iconColor"
				    size="17"
				    :mode="loadingIcon"
				></u-loading-icon>
			</view>
			<!-- 如果没有更多的状态下，显示内容为dot（粗点），加载特定样式 -->
			<text
			    class="u-line-1"
			    :style="[loadTextStyle]"
			    :class="[(status == 'nomore' && isDot == true) ? 'u-loadmore__content__dot-text' : 'u-loadmore__content__text']"
			    @tap="loadMore"
			>{{ showText }}</text>
		</view>
		<u-line
		    length="140rpx"
		    color="#E6E8EB"
			:hairline="false"
			v-if="line"
		></u-line>
	</view>
</template>

<script>
	/**
	 * loadmore 加载更多
	 * @description 此组件一般用于标识页面底部加载数据时的状态。
	 * @tutorial https://www.uviewui.com/components/loadMore.html
	 * @property {String} status 组件状态（默认loadmore）
	 * @property {String} bg-color 组件背景颜色，在页面是非白色时会用到（默认#ffffff）
	 * @property {Boolean} icon 加载中时是否显示图标（默认true）
	 * @property {String} icon-type 加载中时的图标类型（默认circle）
	 * @property {String} icon-color icon-type为circle时有效，加载中的动画图标的颜色（默认#b7b7b7）
	 * @property {Boolean} is-dot status为nomore时，内容显示为一个"●"（默认false）
	 * @property {String} color 字体颜色（默认#606266）
	 * @property {String Number} margin-top 到上一个相邻元素的距离
	 * @property {String Number} margin-bottom 到下一个相邻元素的距离
	 * @property {Object} load-text 自定义显示的文字，见上方说明示例
	 * @event {Function} loadmore status为loadmore时，点击组件会发出此事件
	 * @example <u-loadmore :status="status" icon-type="iconType" load-text="loadText" />
	 */
	export default {
		name: "u-loadmore",
		mixins: [uni.$u.mixin],
		props: {
			// 组件背景色
			bgColor: {
				type: String,
				default: 'transparent'
			},
			// 是否显示加载中的图标
			icon: {
				type: Boolean,
				default: true
			},
			// 字体大小
			fontSize: {
				type: [String, Number],
				default: 14
			},
			// 字体颜色
			color: {
				type: String,
				default: '#606266'
			},
			// 组件状态，loadmore-加载前的状态，loading-加载中的状态，nomore-没有更多的状态
			status: {
				type: String,
				default: 'loadmore'
			},
			// 加载中状态的图标，spinner-花朵状图标，circle-圆圈状，semicircle-半圆
			loadingIcon: {
				type: String,
				default: 'circle'
			},
			// 加载前的提示语
			loadmoreText: {
				type: String,
				default: '加载更多'
			},
			// 加载中提示语
			loadingText: {
				type: String,
				default: '正在加载...'
			},
			// 没有更多的提示语
			nomoreText: {
				type: String,
				default: '没有更多了'
			},
			// 在“没有更多”状态下，是否显示粗点
			isDot: {
				type: Boolean,
				default: false
			},
			// 加载中图标的颜色
			iconColor: {
				type: String,
				default: '#b7b7b7'
			},
			// 上边距
			marginTop: {
				type: [String, Number],
				default: 10
			},
			// 下边距
			marginBottom: {
				type: [String, Number],
				default: 10
			},
			// 高度，单位px
			height: {
				type: [String, Number],
				default: 'auto'
			},
			// 是否显示左边分割线
			line: {
				type: Boolean,
				default: false
			}
		},
		data() {
			return {
				// 粗点
				dotText: "●"
			}
		},
		computed: {
			// 加载的文字显示的样式
			loadTextStyle() {
				return {
					color: this.color,
					fontSize: uni.$u.addUnit(this.fontSize),
					lineHeight: uni.$u.addUnit(this.fontSize),
					backgroundColor: this.bgColor,
				}
			},
			// 显示的提示文字
			showText() {
				let text = '';
				if (this.status == 'loadmore') text = this.loadmoreText
				else if (this.status == 'loading') text = this.loadingText
				else if (this.status == 'nomore' && this.isDot) text = this.dotText;
				else text = this.nomoreText;
				return text;
			}
		},
		methods: {
			loadMore() {
				// 只有在“加载更多”的状态下才发送点击事件，内容不满一屏时无法触发底部上拉事件，所以需要点击来触发
				if (this.status == 'loadmore') this.$emit('loadmore');
			}
		}
	}
</script>

<style lang="scss">
	@import "../../libs/css/components.scss";

	.u-loadmore {
		@include flex(row);
		align-items: center;
		justify-content: center;
		flex: 1;

		&__content {
			margin: 0 15px;
			@include flex(row);
			align-items: center;
			justify-content: center;

			&__icon-wrap {
				margin-right: 8px;
			}

			&__text {
				font-size: 14px;
				color: $u-content-color;
			}

			&__dot-text {
				font-size: 15px;
				color: $u-tips-color;
			}
		}
	}
</style>
