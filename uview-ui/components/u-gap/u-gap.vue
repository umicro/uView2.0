<template>
	<view class="u-gap" :style="[gapStyle]"></view>
</template>

<script>
/**
 * gap 间隔槽
 * @description 该组件一般用于内容块之间的用一个灰色块隔开的场景，方便用户风格统一，减少工作量
 * @tutorial https://www.uviewui.com/components/gap.html
 * @property {String} bg-color 背景颜色（默认transparent）
 * @property {String Number} height 分割槽高度，单位px（默认30）
 * @property {String Number} margin-top 与前一个组件的距离，单位px（默认0）
 * @property {String Number} margin-bottom 与后一个组件的距离，单位px（0）
 * @example <u-gap height="80" bg-color="#bbb"></u-gap>
 */
export default {
	name: "u-gap",
	props: {
		bgColor: {
			type: String,
			default: uni.$u.props.gap.bgColor
		},
		// 高度
		height: {
			type: [String, Number],
			default: uni.$u.props.gap.height
		},
		// 与上一个组件的距离
		marginTop: {
			type: [String, Number],
			default: uni.$u.props.gap.marginTop
		},
		// 与下一个组件的距离
		marginBottom: {
			type: [String, Number],
			default: uni.$u.props.gap.marginBottom
		},
	},
	mixins: [uni.$u.mixin],
	computed: {
		gapStyle() {
			const style = {
				backgroundColor: this.bgColor,
				height: uni.$u.addUnit(this.height),
				marginTop: uni.$u.addUnit(this.marginTop),
				marginBottom: uni.$u.addUnit(this.marginBottom),
			}
			return uni.$u.deepMerge(style, customStyle)
		}
	}
};
</script>

<style lang="scss">
	@import "../../libs/css/components.scss";
</style>
