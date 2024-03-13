<template>
	<view class="u-calendar-header u-border-bottom">
		<text
			class="u-calendar-header__title"
			v-if="showTitle"
		>{{ title }}</text>
		<view class="u-calendar-header__action u-flex u-row-center">
			<view class="u-calendar-header__action__icon">
				<u-icon name="arrow-left-double" color="#909399" @click="changeYearHandler(0)"></u-icon>
			</view>
			<view class="u-calenda-header__action__icon">
				<u-icon name="arrow-left" color="#606266" @click="changeMonthHandler(0)"></u-icon>
			</view>
			<view class="u-calendar-header__action__text">{{ subtitle }}</view>
			<view class="u-calendar-header__action__icon">
				<u-icon name="arrow-right" color="#606266" @click="changeMonthHandler(1)"></u-icon>
			</view>
			<view class="u-calendar-header__action__icon">
				<u-icon name="arrow-right-double" color="#909399" @click="changeYearHandler(1)"></u-icon>
			</view>
		</view>
		<view class="u-calendar-header__weekdays">
			<text class="u-calendar-header__weekdays__weekday">一</text>
			<text class="u-calendar-header__weekdays__weekday">二</text>
			<text class="u-calendar-header__weekdays__weekday">三</text>
			<text class="u-calendar-header__weekdays__weekday">四</text>
			<text class="u-calendar-header__weekdays__weekday">五</text>
			<text class="u-calendar-header__weekdays__weekday">六</text>
			<text class="u-calendar-header__weekdays__weekday">日</text>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'u-calendar-header',
		mixins: [uni.$u.mpMixin, uni.$u.mixin],
		props: {
			// 标题
			title: {
				type: String,
				default: ''
			},
			// 副标题
			year: {
				type: [Number, String],
				default: 0
			},
			month: {
				type: [Number, String],
				default: 0
			},
			// 可切换的最大年份
			maxYear: {
				type: [Number, String],
				default: 2050
			},
			// 可切换的最小年份
			minYear: {
				type: [Number, String],
				default: 1950
			},
			// 是否显示标题
			showTitle: {
				type: Boolean,
				default: true
			},
			// 是否显示副标题
			showSubtitle: {
				type: Boolean,
				default: true
			},
		},
		data() {
			return {

			}
		},
		methods: {
			/** 
			 * 校验范围
			 */
			checkRange(year) {
				let overstep = false;
				if (year < this.minYear || year > this.maxYear) {
					uni.showToast({
						title: "日期超出范围啦~",
						icon: 'none'
					})
					overstep = true;
				}
				return overstep;
			},
			/**
			 * 处理月份变化
			 */
			changeMonthHandler(isAdd) {
				if (isAdd) {
					let month = this.month + 1;
					let year = month > 12 ? this.year + 1 : this.year;
					if (!this.checkRange(year)) {
						month = month > 12 ? 1 : month;
						this.dispatchChange(month ,year);
					}

				} else {
					let month = this.month - 1;
					let year = month < 1 ? this.year - 1 : this.year;
					if (!this.checkRange(year)) {
						month = month < 1 ? 12 : month;
						this.dispatchChange(month ,year);
					}
				}
			},
			/**
			 * 处理年份变化
			 */
			changeYearHandler(isAdd) {
				let year = isAdd ? this.year + 1 : this.year - 1;
				if (!this.checkRange(year)) {
					this.dispatchChange(this.month, year);
				}
			},
			/** 
			 * 处理年份、月度变化
			 * 抛出年、月
			 */
			dispatchChange(month, year) {
				this.$emit('change', {month,year});
			}
		},
		computed: {
			/** 
			 * 标题
			 */
			subtitle() {
				return `${this.year}年${this.month}月`
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import "../../libs/css/components.scss";

	.u-calendar-header {
		padding-bottom: 4px;
		.u-flex {
			display: -webkit-box;
			display: -webkit-flex;
			display: flex;
			-webkit-box-orient: horizontal;
			-webkit-box-direction: normal;
			-webkit-flex-direction: row;
			flex-direction: row;
			-webkit-box-align: center;
			-webkit-align-items: center;
			align-items: center;
		}
		.u-row-center {
			-webkit-box-pack: center;
			-webkit-justify-content: center;
			justify-content: center;
		}

		&__title {
			font-size: 16px;
			color: $u-main-color;
			text-align: center;
			height: 42px;
			line-height: 42px;
			font-weight: bold;
		}

		&__action {
			padding: 40rpx 0 40rpx 0;
			
			&__icon {
				margin: 0 16rpx;
			}
			
			&__text {
				padding: 0 16rpx;
				color: $u-main-color;
				font-size: 32rpx;
				line-height: 32rpx;
				font-weight: bold;
			}
		}

		&__weekdays {
			@include flex;
			justify-content: space-between;

			&__weekday {
				font-size: 13px;
				color: $u-main-color;
				line-height: 30px;
				flex: 1;
				text-align: center;
			}
		}
	}
</style>
