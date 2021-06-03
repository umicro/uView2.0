<template>
	<u-picker
		:show="show"
		:closeOnClickOverly="closeOnClickOverly"
		:columns="columns"
		:defaultIndex="innerDefaultIndex"
		@close="close"
		@cancel="cancel"
		@confirm="confirm"
		@change="change"
	>
	</u-picker>
</template>

<script>
	import props from './props.js'
	import dayjs from '../../libs/util/dayjs.js'
	export default {
		name: 'datetime-picker',
		mixins: [uni.$u.mixin, props],
		data() {
			return {
				columns: [1, 23, 4, 66],
				innerDefaultIndex: []
			}
		},
		watch: {
			show(newValue, oldValue) {
				if (newValue) {
					// 重新弹起之后，重置默认选中值
					this.setDefaultIndex()
				}
			}
		},
		mounted() {
			this.init()
			uni.dayjs = dayjs
		},
		methods: {
			init() {
				this.updateColumnValues()
			},
			// 关闭选择器
			close() {
				if (this.closeOnClickOverly) {
					this.$emit('close')
				}
			},
			// 点击工具栏的取消按钮
			cancel() {
				this.$emit('cancel')
			},
			// 点击工具栏的确定按钮
			confirm() {
				this.$emit('confirm')
			},
			// 列发生变化时触发
			change(e) {
				console.log(e);
			},
			// 更新各列的值
			updateColumnValues() {
				this.setColumns()
				this.setDefaultIndex()
			},
			// 获取datetime模式下的各列数值
			setColumns() {
				// 获得所有列的值
				const yearColumn = this.getYearColumn(),
					monthColumn = this.getMonthColumn(),
					dateColumn = this.getDateColumn(),
					hourColumn = this.getHourColumn(),
					minuteColumn = this.getMinuteColumn()

				// 根据选择的模式，拼接各列所需的值
				if (this.mode === 'datetime') {
					this.columns = [yearColumn, monthColumn, dateColumn, hourColumn, minuteColumn]
				} else if (this.mode === 'year-month') {
					this.columns = [yearColumn, monthColumn]
				} else if (this.mode === 'time') {
					this.columns = [hourColumn, minuteColumn]
				} else {
					this.columns = [yearColumn, monthColumn, dateColumn]
				}
			},
			// 设置默认索引
			setDefaultIndex() {
				const value = this.correctValue(this.value)
				const year = dayjs(value).year(),
					padZero = uni.$u.padZero,
					// 获取当前时间下，各个列的当前值，因为columns中月份的值是补0后的值，所以为了匹配查找索引，这里补0
					month = padZero(dayjs(value).month() + 1),
					date = padZero(dayjs(value).date()),
					hour = padZero(dayjs(value).hour()),
					minute = padZero(dayjs(value).minute())
				let defaultIndex = []
				// 根据当前的选择模式，从默认下标中取出对应默认值
				if (this.mode === 'year-month') {
					defaultIndex = [
						this.columns[0].findIndex(item => item === year),
						this.columns[1].findIndex(item => item === month)
					]
				} else if (this.mode === 'date') {
					defaultIndex = [
						this.columns[0].findIndex(item => item === year),
						this.columns[1].findIndex(item => item === month),
						this.columns[2].findIndex(item => item === date)
					]
				} else if (this.mode === 'time') {
					const timeValue = value.split(':')
					defaultIndex = [
						// time模式下，需要分割value值，类似12:03的模式，取出小时和分钟，再进行补0
						this.columns[0].findIndex(item => item === padZero(timeValue[0])),
						this.columns[1].findIndex(item => item === padZero(timeValue[1]))
					]
				} else {
					defaultIndex = [
						this.columns[0].findIndex(item => item === year),
						this.columns[1].findIndex(item => item === month),
						this.columns[2].findIndex(item => item === date),
						this.columns[3].findIndex(item => item === hour),
						this.columns[4].findIndex(item => item === minute)
					]
				}

				// 如果找不到对应的索引下标，元素可能为-1，需要重置为0，nvue才能让某一列默认选中第一个项，否则它会选中一个空行
				this.innerDefaultIndex = defaultIndex.map(item => item === -1 ? 0 : item)
				console.log(this.innerDefaultIndex);
			},
			// 获取年的列值
			getYearColumn() {
				//最小的年、最大的年
				const minYear = dayjs(this.minDate).year(),
					maxYear = dayjs(this.maxDate).year()
				// 生成一个最大值和最小值之间的年份数组
				return this.generateArray(minYear, maxYear)
			},
			// 获取月的列值
			getMonthColumn() {
				// 最小的月、最大的月
				// const minMonth = dayjs(this.minDate).month(),
				// 	// 如果最大月份为0，为了获取月份数组，味着为12月，否则就是月份加1
				// 	maxMonth = dayjs(this.maxDate).month() === 0 ? 12 : dayjs(this.maxDate).month() + 1
				// 生成一个最大值和最小值之间的月份数组，并且进行补0
				return this.generateArray(1, 12).map(item => uni.$u.padZero(item))
			},
			// 获取日的列值
			getDateColumn(month) {
				// 最小的日、最大的日
				const minDate = dayjs(this.minDate).date(),
					// 需要加1
					maxDate = dayjs(this.maxDate).date()
				// 生成一个最大值和最小值之间的日期数组，并且进行补0
				return this.generateArray(1, 30).map(item => uni.$u.padZero(item))
			},
			// 获取小时的列值
			getHourColumn(month) {
				// 最小的小时、最大的小时
				let minHour = 0,
					maxHour = 0

				if (this.mode === 'time') {
					minHour = this.minHour
					maxHour = this.maxHour
				} else {
					minHour = dayjs(this.minHour).date()
					maxHour = dayjs(this.maxHour).date()
				}
				// 生成一个最大值和最小值之间的小时数组，并且进行补0
				return this.generateArray(minHour, maxHour).map(item => uni.$u.padZero(item))
			},
			// 获取分钟的列值
			getMinuteColumn(month) {
				// 最小的分钟、最大的分钟
				let minMinute = 0,
					maxMinute = 0
				if (this.mode === 'time') {
					minMinute = this.minMinute
					maxMinute = this.maxMinute
				} else {
					minMinute = dayjs(this.minMinute).date()
					maxMinute = dayjs(this.maxMinute).date()
				}
				// 生成一个最大值和最小值之间的分钟数组，并且进行补0
				return this.generateArray(minMinute, maxMinute).map(item => uni.$u.padZero(item))
			},
			// 通过最大值和最小值生成数组
			generateArray(start, end) {
				return Array.from(new Array(end + 1).keys()).slice(start)
			},
			// 得出合法的时间
			correctValue(value) {
				const isDateMode = this.mode !== 'time'
				if (isDateMode && !uni.$u.test.date(value)) {
					// 如果是日期类型，但是又没有设置合法的当前时间的话，使用最小时间为当前时间
					value = this.minDate
				} else if (!isDateMode && !value) {
					// 如果是时间类型，而又没有默认值的话，就用最小时间
					value = `${uni.$u.padZero(this.minHour)}:00`
				}
				// 时间类型
				if (!isDateMode) {
					if (String(value).indexOf(':') === -1) return uni.$u.error('时间错误，请传递如12:24的格式')
					let [hour, minute] = value.split(':')
					// 对时间补零，同时控制在最小值和最大值之间
					hour = uni.$u.padZero(uni.$u.range(this.minHour, this.maxHour, hour))
					minute = uni.$u.padZero(uni.$u.range(this.minMinute, this.maxMinute, minute))
					return `${ hour }:${ minute }`;
				} else {
					// 如果是日期格式，控制在最小日期和最大日期之间
					value = dayjs(value).isBefore(dayjs(this.minDate)) ? this.minDate : value
					value = dayjs(value).isAfter(dayjs(this.maxDate)) ? this.maxDate : value
					return value
				}
			}
		},
	}
</script>

<style lang="scss">
	@import '../../libs/css/components.scss';
</style>
