<template>
	<view
		class="u-calendar-month"
		ref="u-calendar-month"
	>
		<text class="u-calendar-month__title">3月4日</text>
		<view class="u-calendar-month__days">
			<view
				v-if="showMark"
				class="u-calendar-month__days__month-mark-wrapper"
			>
				<text class="u-calendar-month__days__month-mark-wrapper__text">5</text>
			</view>
			<view
				class="u-calendar-month__days__day"
				v-for="(item, index) in 30"
				:style="dayStyle"
			>
				<view class="u-calendar-month__days__day__select-day">
					<text class="u-calendar-month__days__day__select-day__top-info">清明节</text>
					<text class="u-calendar-month__days__day__select-day__info">{{ index }}</text>
					<text class="u-calendar-month__days__day__select-day__buttom-info">清明节</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	// #ifdef APP-NVUE
	// 由于nvue不支持百分比单位，需要查询宽度来计算每个日期的宽度
	const dom = uni.requireNativePlugin('dom')
	// #endif
	export default {
		name: 'u-calendar-month',
		mixins: [uni.$u.mixin],
		props: {
			// 是否显示月份背景色
			showMark: {
				type: Boolean,
				default: true
			},
			// 主题色，对底部按钮和选中日期有效
			color: {
				type: String,
				default: '#3c9cff'
			},
		},
		data() {
			return {
				width: 0
			}
		},
		computed: {
			dayStyle() {
				const style = {}
				// #ifdef APP-NVUE
				style.width = uni.$u.addUnit((this.width / 7).toFixed(2))
				// #endif
				return style
			}
		},
		mounted() {
			this.init()
		},
		methods: {
			init() {
				// #ifdef APP-NVUE
				uni.$u.sleep().then(() => {
					this.queryRect()
				})
				// #endif
			},
			queryRect() {
				dom.getComponentRect(this.$refs['u-calendar-month'], res => {
					this.width = res.size.width
				})
			}
		},
	}
</script>

<style lang="scss">
	@import "../../libs/css/components.scss";

	.u-calendar-month {

		&__title {
			font-size: 14px;
			line-height: 42px;
			height: 42px;
			color: $u-main-color;
			text-align: center;
		}

		&__days {
			position: relative;
			@include flex;
			flex-wrap: wrap;

			&__month-mark-wrapper {
				position: absolute;
				top: 0;
				bottom: 0;
				left: 0;
				right: 0;
				@include flex;
				justify-content: center;
				align-items: center;

				&__text {
					font-size: 155px;
					color: rgba(231, 232, 234, 0.83);
				}
			}

			&__day {
				height: 62px;
				@include flex;
				align-items: center;
				/* #ifndef APP-NVUE */
				width: calc(100% / 7);
				/* #endif */
				justify-content: center;

				&__select-day {

					&__top-info,
					&__buttom-info {
						font-size: 12px;
						color: $u-content-color;
						text-align: center;
					}

					&__info {
						text-align: center;
						font-size: 16px;
					}
				}
			}
		}
	}
</style>
