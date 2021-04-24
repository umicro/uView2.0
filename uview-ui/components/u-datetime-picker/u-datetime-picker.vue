<template>
	<u-picker
		:show="show"
		:closeOnClickOverly="closeOnClickOverly"
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

			}
		},
		mounted() {
			this.init()
		},
		methods: {
			init() {
				this.updateColumnValues(this.value)
			},
			// 更新各列的值
			updateColumnValues(value) {
				const innerValue = this.correctValue(value)
				
			},
			// 得出合法的时间
			correctValue(value) {
				const isDateMode = this.mode !== 'time'
				if (isDateMode && !uni.$u.test.date(value)) {
					value = this.minDate
				} else if (!isDateMode && !value) {
					// 如果是时间类型，而又没有默认值的话，就用最小时间
					value = `${uni.$u.padZero(this.minHour)}:00`
				}
				// 时间类型
				if (!isDateMode) {
					if(String(value).indexOf(':') === -1) return uni.$u.error('时间错误，请传递如12:24的格式')
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
