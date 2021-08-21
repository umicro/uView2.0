<template>
	<u-popup
		:show="show"
		mode="bottom"
		closeable
		@close="close"
		round
		:closeOnClickOverly="closeOnClickOverly"
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
					height: $u.addUnit(listHeight)
				}"
				scroll-y
				@scroll="onScroll"
				:scrollIntoView="scrollIntoView"
			>
				<uMonth
					:color="color"
					:rowHeight="rowHeight"
					:showMark="showMark"
					:months="months"
					:mode="mode"
					:maxCount="maxCount"
					:startText="startText"
					:endText="endText"
					@monthSelected="monthSelected"
					:defaultDate="defaultDate"
					:minDate="minDate"
					:maxDate="maxDate"
					:maxMonth="maxMonth"
					ref="month"
				></uMonth>
			</scroll-view>
			<slot name="footer">
				<view class="u-calendar__confirm">
					<u-button
						shape="circle"
						:text="buttonDisabled ? confirmDisabledText : confirmText"
						:color="color"
						@click="confirm"
						:disabled="buttonDisabled"
					></u-button>
				</view>
			</slot>
		</view>
	</u-popup>
</template>

<script>
	import uHeader from './header.vue';
	import uMonth from './month.vue';
	import props from './props.js';
	import util from './util.js';
	import dayjs from '../../libs/util/dayjs.js';
	import Calendar from '../../libs/util/calendar.js';
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
				// 需要显示的月份的数组
				months: [],
				// 在月份滚动区域中，当前视图中月份的index索引
				monthIndex: 0,
				// 月份滚动区域的高度
				listHeight: 0,
				// month组件中选择的日期数组
				selected: [],
				// 如果没有设置最大可选日期，默认为往后推3个月
				maxMonth: 3,
				scrollIntoView: ''
			}
		},
		watch: {
			selectedChange: {
				immediate: true,
				handler(n) {
					this.setMonth()
				}
			},
			// 打开弹窗时，设置月份数据
			show: {
				immediate: true,
				handler(n) {
					this.setMonth()
				}
			},
		},
		computed: {
			// 多个条件的变化，会引起选中日期的变化，这里统一管理监听
			selectedChange() {
				return [this.minDate, this.maxDate, this.defaultDate]
			},
			subtitle() {
				// 初始化时，this.months为空数组，所以需要特别判断处理
				if (this.months.length) {
					return `${this.months[this.monthIndex].year}年${this.months[this.monthIndex].month}月`
				} else {
					return ''
				}
			},
			buttonDisabled() {
				// 如果为range类型，且选择的日期个数不足1个时，让底部的按钮出于disabled状态
				if (this.mode === 'range') {
					if (this.selected.length <= 1) {
						return true
					} else {
						return false
					}
				} else {
					return false
				}
			}
		},
		mounted() {
			this.start = Date.now()
			this.init()
		},
		methods: {
			// month组件内部选择日期后，通过事件通知给父组件
			monthSelected(e) {
				this.selected = e
			},
			init() {
				// 滚动区域的高度
				this.listHeight = this.rowHeight * 5 + 30
				this.setMonth()
			},
			close() {
				this.$emit('close')
			},
			// 点击确定按钮
			confirm() {
				if (!this.buttonDisabled) {
					this.$emit('confirm', this.selected)
				}
			},
			// 设置月份数据
			setMonth() {
				// 最小日期的毫秒数
				const minDate = this.minDate || dayjs().valueOf()
				// 如果没有指定最大日期，则往后推3个月
				const maxDate = this.maxDate || dayjs(minDate).add(this.maxMonth - 1, 'month').valueOf()
				// 最小与最大月份
				let minMonth = dayjs(minDate).month() + 1
				let maxMonth = dayjs(maxDate).month() + 1
				// 如果maxMonth小于minMonth，则意味着maxMonth为下一年的月份，需要加上12，为的是计算出两个月份之间间隔着多少月份
				maxMonth = minMonth > maxMonth ? maxMonth + 12 : maxMonth
				// 最大最小月份之间的共有多少个月份
				const months = Math.abs(minMonth - maxMonth)
				// 先清空数组
				this.months = []
				for (let i = 0; i <= months; i++) {
					this.months.push({
						date: new Array(dayjs(minDate).add(i, 'month').daysInMonth()).fill(1).map((item,
							index) => {
							// 日期，取值1-31
							let day = index + 1
							// 星期，0-6，0为周日
							const week = dayjs(minDate).add(i, "month").date(day).day()
							const date = dayjs(minDate).add(i, "month").date(day).format("YYYY-MM-DD")
							let bottomInfo = ''
							if (this.showLunar) {
								// 将日期转为农历格式
								const lunar = Calendar.solar2lunar(dayjs(date).year(), dayjs(date)
									.month() + 1, dayjs(date).date())
								bottomInfo = lunar.IDayCn
							}
							let config = {
								day,
								week,
								// 小于最小允许的日期，或者大于最大的日期，则设置为disabled状态
								disabled: dayjs(date).isBefore(dayjs(minDate).format("YYYY-MM-DD")) ||
									dayjs(date).isAfter(dayjs(maxDate).format("YYYY-MM-DD")),
								// 返回一个日期对象，供外部的formatter获取当前日期的年月日等信息，进行加工处理
								date: new Date(date),
								bottomInfo,
								dot: false,
								month: dayjs(minDate).add(i, "month").month() + 1
							}
							if (this.formatter) {
								config = this.formatter(config)
							}
							return config
						}),
						// 当前所属的月份
						month: dayjs(minDate).add(i, "month").month() + 1,
						// 当前年份
						year: dayjs(minDate).add(i, "month").year()
					});
				}
			},
			// scroll-view滚动监听
			onScroll(event) {
				// 不允许小于0的滚动值，如果scroll-view到顶了，继续下拉，会出现负数值
				const scrollTop = Math.max(0, event.detail.scrollTop)
				// 将当前滚动条数值，除以滚动区域的高度，可以得出当前滚动到了哪一个月份的索引
				for (let i = 0; i < this.months.length; i++) {
					if (scrollTop >= (this.months[i].top || this.listHeight)) {
						this.monthIndex = i
					}
				}
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
