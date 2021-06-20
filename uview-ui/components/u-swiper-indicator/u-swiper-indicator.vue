<template>
	<view class="u-swiper-indicator">
		<view
			class="u-swiper-indicator__wrapper"
			v-if="indicatorStyle === 'line'"
			:class="[`u-swiper-indicator__wrapper--${indicatorStyle}`]"
			:style="{
				width: $u.addUnit(lineWidth * length),
				backgroundColor: indicatorInactiveColor
			}"
		>
			<view
				class="u-swiper-indicator__wrapper--line__bar"
				:style="[lineStyle]"
			></view>
		</view>
		<view
			class="u-swiper-indicator__wrapper"
			v-if="indicatorStyle === 'dot'"
		>
			<view
				class="u-swiper-indicator__wrapper__dot"
				v-for="(item, index) in length"
				:key="index"
				:class="[index === current && 'u-swiper-indicator__wrapper__dot--active']"
				:style="[dotStyle(index)]"
			>

			</view>
		</view>
	</view>
</template>

<script>
	import props from './props.js';
	export default {
		name: 'u-swiper-indicator',
		mixins: [uni.$u.mixin, props],
		data() {
			return {
				lineWidth: 22
			}
		},
		computed: {
			// 指示器为线型的样式
			lineStyle() {
				let style = {}
				style.width = uni.$u.addUnit(this.lineWidth)
				style.transform = `translateX(${ this.current * this.lineWidth }px)`
				style.backgroundColor = this.indicatorActiveColor
				return style
			},
			// 指示器为点型的样式
			dotStyle() {
				return index => {
					let style = {}
					style.backgroundColor = index === this.current ? this.indicatorActiveColor : this.indicatorInactiveColor
					return style
				}
			}
		},
	}
</script>

<style lang="scss">
	@import "../../libs/css/components.scss";

	.u-swiper-indicator {

		&__wrapper {
			@include flex;

			&--line {
				border-radius: 100px;
				height: 4px;

				&__bar {
					width: 22px;
					height: 4px;
					border-radius: 100px;
					background-color: #FFFFFF;
					transition: transform 0.3s;
				}
			}

			&__dot {
				width: 5px;
				height: 5px;
				border-radius: 100px;
				margin: 0 4px;

				&--active {
					width: 12px;
				}
			}

		}
	}
</style>
