<template>
	<view
		class="u-calendar-month-wrapper"
		ref="u-calendar-month"
	>
		<view
			v-for="(item, index) in month"
			:key="index"
			class="u-calendar-month"
		>
			<text class="u-calendar-month__title">{{ item.year }}年{{ item.month }}月</text>
			<view class="u-calendar-month__days">
				<view
					v-if="showMark"
					class="u-calendar-month__days__month-mark-wrapper"
				>
					<text class="u-calendar-month__days__month-mark-wrapper__text">{{ item.month }}</text>
				</view>
				<view
					class="u-calendar-month__days__day"
					v-for="(item1, index1) in item.date"
					:key="index1"
					:style="dayStyle(index1, item1.week)"
				>
					<view class="u-calendar-month__days__day__select-day">
						<!-- <text class="u-calendar-month__days__day__select-day__top-info">清明节</text> -->
						<text
							class="u-calendar-month__days__day__select-day__info"
							:class="[item1.disabled && 'u-calendar-month__days__day__select-day__info--disabled']"
						>{{ item1.day }}</text>
						<!-- <text class="u-calendar-month__days__day__select-day__buttom-info">清明节</text> -->
					</view>
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
			// 月份数据
			month: {
				type: Array,
				default: () => []
			}
		},
		data() {
			return {
				width: 0
			}
		},
		computed: {
			dayStyle() {
				return (index, week) => {
					const style = {}
					// 保留2位小数
					const dayWidth = (this.width / 7).toFixed(2)
					// 得出每个日期的宽度
					style.width = uni.$u.addUnit(dayWidth)
					if (index === 0) {
						// 获取当前为星期几，如果为0，则为星期天，减一为每月第一天时，需要向左偏移的item个数
						week = (week === 0 ? 7 : week) - 1
						style.marginLeft = uni.$u.addUnit(week * dayWidth)
					}
					return style
				}
			}
		},
		mounted() {
			this.init()
		},
		methods: {
			init() {
				uni.$u.sleep().then(() => {
					this.queryRect()
				})
			},
			queryRect() {
				// #ifdef APP-NVUE
				dom.getComponentRect(this.$refs['u-calendar-month'], res => {
					this.width = res.size.width
				})
				// #endif
				// #ifndef APP-NVUE
				this.$uGetRect('.u-calendar-month-wrapper').then(size => {
					this.width = size.width
				})
				// #endif
			}
		}
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
			font-weight: bold;
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

						&--disabled {
							color: #cacbcd;
						}
					}
				}
			}
		}
	}
</style>
