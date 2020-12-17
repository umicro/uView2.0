<template>
	<view class="u-section">
		<view
		    class="u-section__title"
		    :style="{
			paddingLeft: showLine ? (fontSize * 0.7) + 'px' : 0
		}"
		    :class="{
			'u-section--line': showLine
		}"
		>
			<view
			    class="u-section__title__icon-wrap u-flex"
			    :style="[lineStyle]"
			    v-if="showLine"
			>
				<u-icon
				    top="0"
				    name="column-line"
				    :size="fontSize * 1.3"
				    bold
				    :color="lineColor ? lineColor : color"
				></u-icon>
			</view>
			<text
			    class="u-flex u-section__title__text"
			    :style="{
				fontWeight: bold ? 'bold' : 'normal',
				color: color,
				fontSize: fontSize + 'px',
			}"
			>{{title}}</text>
		</view>
		<view
		    class="u-section__right-info"
		    v-if="right || $slots.right"
		    @tap="rightClick"
		>
			<slot
			    name="right"
			    v-if="$slots.right"
			/>
			<template v-else>
				<text
				    class="u-section__right-info__subtitle"
				    :style="{
						color: subColor
					}"
				>{{subTitle}}</text>
				<view
				    class="u-section__right-info__icon-arrow"
				    v-if="arrow"
				>
					<u-icon
					    name="arrow-right"
					    size="12"
					    :color="subColor"
					></u-icon>
				</view>
			</template>
		</view>
	</view>
</template>

<script>
	/**
	 * section 查看更多
	 * @description 该组件一般用于分类信息有很多，但是限于篇幅只能列出一部分，让用户通过"查看更多"获得更多信息的场景，实际效果见演示。
	 * @tutorial https://www.uviewui.com/components/section.html
	 * @property {String} title 左边主标题
	 * @property {String} sub-title 右边副标题（默认更多）
	 * @property {Boolean} right 是否显示右边的内容（默认true）
	 * @property {Boolean} showLine 是否显示左边的竖条（默认true）
	 * @property {Boolean} arrow 是否显示右边箭头（默认true）
	 * @property {String Number} font-size 主标题的字体大小（默认28）
	 * @property {Boolean} bold 主标题是否加粗（默认true）
	 * @property {String} color 主标题颜色（默认#303133）
	 * @event {Function} click 组件右侧的内容被点击时触发，用于跳转"更多"
	 * @example <u-section title="今日热门" :right="false"></u-section>
	 */
	export default {
		name: "u-section",
		props: {
			// 标题信息
			title: {
				type: String,
				default: ''
			},
			// 右边副标题内容
			subTitle: {
				type: String,
				default: '更多'
			},
			// 是否显示右边的内容
			right: {
				type: Boolean,
				default: true
			},
			fontSize: {
				type: [Number, String],
				default: 15
			},
			// 主标题是否加粗
			bold: {
				type: Boolean,
				default: true
			},
			// 主标题的颜色
			color: {
				type: String,
				default: '#303133'
			},
			// 右边副标题的颜色
			subColor: {
				type: String,
				default: '#909399'
			},
			// 是否显示左边的竖条
			showLine: {
				type: Boolean,
				default: true
			},
			// 左边竖线的颜色
			lineColor: {
				type: String,
				default: ''
			},
			// 是否显示右边箭头
			arrow: {
				type: Boolean,
				default: true
			},
		},
		mixins: [uni.$u.mixin],
		computed: {
			// 左边竖条的样式
			lineStyle() {
				// 由于安卓和iOS的，需要稍微调整绝对定位的top值，才能让左边的竖线和右边的文字垂直居中
				return {
					// 由于竖线为字体图标，具有比实际线宽更宽的宽度，所以也需要根据字体打下动态调整
					left: -(Number(this.fontSize) * 0.9) + 'px',
				}
			}
		},
		methods: {
			rightClick() {
				this.$emit('click');
			}
		}
	}
</script>

<style lang="scss">
	@import "../../libs/css/components.scss";

	.u-section {
		@include flex;
		justify-content: space-between;
		align-items: center;
		flex-direction: row;

		&__title {
			position: relative;
			font-size: 14px;
			padding-left: 10px;
			@include flex;
			align-items: center;
			flex-direction: row;

			&__icon-wrap {
				position: absolute;
			}

			&__text {
				margin-top: 1px;
			}
		}

		&__right-info {
			align-items: center;
			@include flex;
			flex-direction: row;

			&__subtitle {
				color: $u-tips-color;
				font-size: 13px;
				@include flex;
			}

			&__icon-arrow {
				margin-top: 1px;
				margin-left: 3px;
			}
		}
	}
</style>
