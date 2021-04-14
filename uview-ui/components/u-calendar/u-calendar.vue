<template>
	<u-popup
		:show="show"
		mode="bottom"
		closeable
		@close="close"
		round
	>
		<view class="u-calendar">
			<uHeader
				:title="title"
				:subtitle="subtitle"
				:showSubtitle="showSubtitle"
				:showTitle="showTitle"
			></uHeader>
			<scroll-view
				:style="{
					height: '400px'
				}"
				scroll-y
			>
				<uMonth
					:color="color"
					:rowHeight="rowHeight"
					:showMark="showMark"
					:month="month"
				></uMonth>
			</scroll-view>
			<view
				class="u-calendar__confirm"
				v-if="showConfirm"
			>
				<u-button
					shape="circle"
					text="确定"
					type="primary"
					@click="confirm"
				></u-button>
			</view>
		</view>
	</u-popup>
</template>

<script>
	import uHeader from './header.vue';
	import uMonth from './month.vue';
	import props from './props.js';
	import util from './util.js';
	import dayjs from './dayjs.js';
	import Calendar from './calendar.js';
	uni.dayjs = dayjs
	export default {
		name: 'u-calendar',
		mixins: [uni.$u.mixin, props],
		components: {
			uHeader,
			uMonth
		},
		data() {
			return {
				// 副标题，用于显示年月
				subtitle: '2020年4月',
				month: []
			}
		},
		mounted() {
			this.init()
		},
		methods: {
			init() {
				this.setMonth()
			},
			close() {
				this.show = false
			},
			// 点击确定按钮
			confirm() {
				this.$emit('confirm')
			},
			// 设置月份数据
			setMonth() {
				// 最小日期的毫秒数
				const minDate = Number(this.minDate) || dayjs().valueOf()
				// 如果没有指定最大日期，则往后推6个月
				const maxDate = Number(this.maxDate) || dayjs(minDate).add(5, 'month').valueOf()
				// 最大与最小时间之间总的月份数
				const months = Math.ceil((maxDate - minDate) / (86400000 * 30))
				for(let i = 0; i < months; i ++) {
					this.month.push({
						date: new Array(dayjs(minDate).add(i, 'month').daysInMonth()).fill(1).map((item, index) => {
							// 日期，取值1-31
							let day = index + 1
							// 星期，0-6，0为周日
							let week = dayjs(minDate).add(i, "month").date(day).day()
							let date = dayjs(minDate).add(i, "month").date(day).format("YYYY-MM-DD")
							return {
								day,
								week,
								// 小于最小允许的日期，或者大于最大的日期，则设置为disabled状态
								disabled: dayjs(date).isBefore(dayjs(minDate).format("YYYY-MM-DD")) || dayjs(date).isSame(dayjs(maxDate).format("YYYY-MM-DD")) ,
								date
							};
						}),
						// 当前所属的月份
						month: dayjs(minDate).add(i, "month").month() + 1,
						// 当前年份
						year: dayjs(minDate).add(i, "month").year()
					});
				}
				console.log(this.month);
			},
		},
	}
</script>

<style lang="scss">
	@import "../../libs/css/components.scss";

	.u-calendar {

		&__confirm {
			padding: 7px 18px;
		}
	}
</style>
