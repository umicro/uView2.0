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
				// 月初是周几
				let day = dayjs(this.date).date(1).day();
				let start = day == 0 ? 6 : day - 1;

				// 本月天数
				let days = dayjs(this.date).endOf("month").format("D");

				// 上个月天数
				let prevDays = dayjs(this.date).endOf("month").subtract(1, "month").format("D");

				// 日期数据
				let arr = [];
				// 清空表格
				this.month = [];

				// 添加上月数据
				arr.push({
					date: new Array(days - 0).fill(1).map((e, i) => {
						let day = i + 1;

						return {
							value: day,
							disabled: true,
							date: dayjs(this.date).subtract(1, "month").date(day).format("YYYY-MM-DD"),
						};
					}),
					month: dayjs().subtract(1, "month").month() + 1,
					year: dayjs().year()
				});

				// 添加本月数据
				arr.push({
					date: new Array(days - 0).fill(1).map((e, i) => {
						let day = i + 1;

						return {
							value: day,
							date: dayjs(this.date).date(day).format("YYYY-MM-DD"),
						};
					}),
					month: dayjs().month() + 1,
					year: dayjs().year()
				});

				// 添加下个月
				arr.push({
					date: new Array(days - 0).fill(1).map((e, i) => {
						let day = i + 1;

						return {
							value: day,
							disabled: true,
							date: dayjs(this.date).add(1, "month").date(day).format("YYYY-MM-DD"),
						};
					}),
					month: dayjs().add(1, "month").month() + 1,
					year: dayjs().year()
				});

				// 分割数组
				// for (let n = 0; n < arr.length; n += 7) {
				// 	this.month.push(
				// 		arr.slice(n, n + 7).map((e, i) => {
				// 			e.index = i + n;

				// 			// 自定义信息
				// 			let custom = this.customList.find((c) => c.date == e.date);

				// 			// 农历
				// 			if (this.lunar) {
				// 				let {
				// 					IDayCn,
				// 					IMonthCn
				// 				} = this.getLunar(e.date);
				// 				e.lunar = IDayCn == "初一" ? IMonthCn : IDayCn;
				// 			}

				// 			return {
				// 				...e,
				// 				...custom,
				// 			};
				// 		})
				// 	);
				// }
				this.month = arr
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
