<template>
	<view
	    class="u-divider"
	    :style="[customStyle]"
	>
		<u-line
		    :color="lineColor"
		    :customStyle="leftLineStyle"
		    :hairline="hairline"
		></u-line>
		<text
		    v-if="dot"
		    class="u-divider__dot"
		>●</text>
		<text
		    v-else-if="text"
		    class="u-divider__text"
		    :style="[textStyle]"
		>{{text}}</text>
		<u-line
		    :color="lineColor"
		    :customStyle="rightLineStyle"
		    :hairline="hairline"
		></u-line>
	</view>
</template>

<script>
	export default {
		props: {
			// 是否虚线
			dashed: {
				type: Boolean,
				default: uni.$u.props.divider.dashed
			},
			// 是否细线
			hairline: {
				type: Boolean,
				default: uni.$u.props.divider.hairline
			},
			// 是否以点替代文字，优先于text字段起作用
			dot: {
				type: Boolean,
				default: uni.$u.props.divider.dot
			},
			// 内容文本的位置，left-左边，center-中间，right-右边
			textPosition: {
				type: String,
				default: uni.$u.props.divider.textPosition
			},
			// 文本内容
			text: {
				type: [String, Number],
				default: uni.$u.props.divider.text
			},
			// 文本大小
			textSize: {
				type: [Number, String],
				default: uni.$u.props.divider.textSize
			},
			// 文本颜色
			textColor: {
				type: String,
				default: uni.$u.props.divider.textColor
			},
			// 线条颜色
			lineColor: {
				type: String,
				default: uni.$u.props.divider.lineColor
			}
		},
		mixins: [uni.$u.mixin],
		computed: {
			textStyle() {
				const style = {}
				style.fontSize = uni.$u.addUnit(this.textSize)
				style.color = this.textColor
				return style
			},
			// 左边线条的的样式
			leftLineStyle() {
				const style = {}
				// 如果是在左边，设置左边的宽度为固定值
				if (this.textPosition === 'left') {
					style.width = '80rpx'
				} else {
					style.flex = 1
				}
				return style
			},
			// 右边线条的的样式
			rightLineStyle() {
				const style = {}
				// 如果是在右边，设置右边的宽度为固定值
				if (this.textPosition === 'right') {
					style.width = '80rpx'
				} else {
					style.flex = 1
				}
				return style
			}
		}
	}
</script>

<style lang="scss">
	@import '../../libs/css/components.scss';

	.u-divider {
		@include flex;
		flex-direction: row;
		align-items: center;
		margin: 15px 0;

		&__text {
			margin: 0 15px;
		}

		&__dot {
			font-size: 12px;
			margin: 0 12px;
			color: #c0c4cc;
		}
	}
</style>
