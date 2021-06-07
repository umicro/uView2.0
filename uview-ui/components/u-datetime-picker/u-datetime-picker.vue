<template>
	<u-picker
		ref="picker"
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
	function times(n, iteratee) {
	    let index = -1
	    const result = Array(n < 0 ? 0 : n)
	    while (++index < n) {
	        result[index] = iteratee(index)
	    }
	    return result
	}
	import props from './props.js'
	import dayjs from '../../libs/util/dayjs.js'
	export default {
		name: 'datetime-picker',
		mixins: [uni.$u.mixin, props],
		data() {
			return {
				columns: [],
				innerDefaultIndex: []
			}
		},
		watch: {
			show(newValue, oldValue) {
				if (newValue) {
					this.updateColumnValue(this.value)
				}
			},
			propsChange() {
				this.init()
			}
		},
		computed: {
			// 如果以下这些变量发生了变化，意味着需要重新初始化各列的值
			propsChange() {
				return [this.mode, this.maxDate, this.minDate, this.minHour, this.maxHour, this.minMinute, this.maxMinute, this.filter, ]
			}
		},
		mounted() {
			this.init()
		},
		methods: {
			init() {
				this.innerValue = this.correctValue(this.value)
				this.updateColumnValue(this.innerValue)
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
				this.$emit('confirm', {
					value: this.innerValue,
					mode: this.mode
				})
			},
			// 列发生变化时触发
			change(e) {
				const { indexs, values } = e
				let selectValue = ''
				if(this.mode === 'time') {
					// 根据value各列索引，从各列数组中，取出当前时间的选中值
					selectValue = `${values[0][value[0]]}:${values[1][indexs[1]]}`
				} else {
					// 将选择的值转为数值，比如'03'转为数值的3，'2019'转为数值的2019
					const year = parseInt(values[0][indexs[0]])
					const month = parseInt(values[1][indexs[1]])
					let date = parseInt(values[2] ? values[2][indexs[2]] : 1)
					let hour = 0, minute = 0
					// 此月份的最大天数
					const maxDate = dayjs(`${year}-${month}-${date}`).daysInMonth()
					// year-month模式下，date不会出现在列中，设置为1，为了符合后边需要减1的需求
					if (this.mode === 'year-month') {
					    date = 1
					}
					// 不允许超过maxDate值
					date = Math.min(maxDate, date)
					if (this.mode === 'datetime') {
					    hour = parseInt(values[3][indexs[3]])
					    minute = parseInt(values[4][indexs[4]])
					}
					// 转为时间模式
					selectValue = Number(new Date(year, month - 1, date, hour, minute))
				}
				// 取出准确的合法值，防止超越边界的情况
				selectValue = this.correctValue(selectValue)
				this.innerValue = selectValue
				this.updateColumnValue(selectValue)
				// 发出change时间，value为当前选中的时间戳
				this.$emit('change', {
					value: selectValue,
					picker: this.$refs.picker,
					mode: this.mode
				})
			},
			// 更新各列的值，进行补0、格式化等操作
			updateColumnValue(value) {
				this.innerValue = value
				this.updateColumns()
				this.updateIndexs(value)
			},
			// 更新索引
			updateIndexs(value) {
				let values = []
				const formatter = this.formatter
				const padZero = uni.$u.padZero
				if (this.mode === 'time') {
					// 将time模式的时间用:分隔成数组
				    const timeArr = value.split(':')
					// 使用formatter格式化方法进行管道处理
				    values = [formatter('hour', timeArr[0]), formatter('minute', timeArr[1])]
				} else {
				    const date = new Date(value)
				    values = [
				        formatter('year', `${dayjs(value).year()}`),
						// 月份补0
				        formatter('month', padZero(dayjs(value).month() + 1))
				    ]
				    if (this.mode === 'date') {
						// date模式，需要添加天列
				        values.push(formatter('day', padZero(dayjs(value).date())))
				    }
				    if (this.mode === 'datetime') {
						// 数组的push方法，可以写入多个参数
				        values.push(formatter('day', padZero(dayjs(value).date())), formatter('hour', padZero(dayjs(value).hour())), formatter('minute', padZero(dayjs(value).minute())))
				    }
				}
				
				// 根据当前各列的所有值，从各列默认值中找到默认值在各列中的索引
				const indexs = this.columns.map((column, index) => {
					// 通过取大值，可以保证不会出现找不到索引的-1情况
					return Math.max(0, column.findIndex(item => item === values[index]))
				})
				this.innerDefaultIndex = indexs
			},
			// 更新各列的值
			updateColumns() {
				// 解构默认使用defaultFormatter(内部不做处理原样返回)
			    const { formatter = defaultFormatter } = this
				// 获取各列的值，并且map后，对各列的具体值进行补0操作
			    const results = this.getOriginColumns().map((column) => column.values.map((value) => formatter(column.type, value)))
				this.columns = results
			},
			getOriginColumns() {
			    // 生成各列的值
			    const results = this.getRanges().map(({ type, range }) => {
			        let values = times(range[1] - range[0] + 1, (index) => {
			            let value = range[0] + index
			            value = type === 'year' ? `${value}` : uni.$u.padZero(value)
			            return value
			        })
					// 进行过滤
			        if (this.filter) {
			            values = this.filter(type, values)
			        }
			        return { type, values }
			    })
			    return results
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
					value = `${uni.$u.padZero(this.minHour)}:uni.$u.padZero(this.minMinute)}`
				}
				// 时间类型
				if (!isDateMode) {
					if (String(value).indexOf(':') === -1) return uni.$u.error('时间错误，请传递如12:24的格式')
					let [hour, minute] = value.split(':')
					// 对时间补零，同时控制在最小值和最大值之间
					hour = uni.$u.padZero(uni.$u.range(this.minHour, this.maxHour, Number(hour)))
					minute = uni.$u.padZero(uni.$u.range(this.minMinute, this.maxMinute, Number(minute)))
					return `${ hour }:${ minute }`
				} else {
					// 如果是日期格式，控制在最小日期和最大日期之间
					value = dayjs(value).isBefore(dayjs(this.minDate)) ? this.minDate : value
					value = dayjs(value).isAfter(dayjs(this.maxDate)) ? this.maxDate : value
					return value
				}
			},
			// 获取每列的最大和最小值
			getRanges() {
			    if (this.mode === 'time') {
			        return [
			            {
			                type: 'hour',
			                range: [this.minHour, this.maxHour],
			            },
			            {
			                type: 'minute',
			                range: [this.minMinute, this.maxMinute],
			            },
			        ];
			    }
			    const { maxYear, maxDate, maxMonth, maxHour, maxMinute, } = this.getBoundary('max', this.innerValue);
			    const { minYear, minDate, minMonth, minHour, minMinute, } = this.getBoundary('min', this.innerValue);
			    const result = [
			        {
			            type: 'year',
			            range: [minYear, maxYear],
			        },
			        {
			            type: 'month',
			            range: [minMonth, maxMonth],
			        },
			        {
			            type: 'day',
			            range: [minDate, maxDate],
			        },
			        {
			            type: 'hour',
			            range: [minHour, maxHour],
			        },
			        {
			            type: 'minute',
			            range: [minMinute, maxMinute],
			        },
			    ];
			    if (this.mode === 'date')
			        result.splice(3, 2);
			    if (this.mode === 'year-month')
			        result.splice(2, 3);
			    return result;
			},
			// 根据minDate、maxDate、minHour、maxHour等边界值，判断各列的开始和结束边界值
			getBoundary(type, innerValue) {
			    const value = new Date(innerValue)
			    const boundary = new Date(this[`${type}Date`])
			    const year = dayjs(boundary).year()
			    let month = 1
			    let date = 1
			    let hour = 0
			    let minute = 0
			    if (type === 'max') {
			        month = 12
					// 月份的天数
			        date = dayjs(value).daysInMonth()
			        hour = 23
			        minute = 59
			    }
				// 获取边界值，逻辑是：当年达到了边界值(最大或最小年)，就检查月允许的最大和最小值，以此类推
			    if (dayjs(value).year() === year) {
			        month = dayjs(boundary).month() + 1
			        if (dayjs(value).month() + 1 === month) {
			            date = dayjs(boundary).date()
			            if (dayjs(value).date() === date) {
			                hour = dayjs(boundary).hour()
			                if (dayjs(value).hour() === hour) {
			                    minute = dayjs(boundary).minute()
			                }
			            }
			        }
			    }
			    return {
			        [`${type}Year`]: year,
			        [`${type}Month`]: month,
			        [`${type}Date`]: date,
			        [`${type}Hour`]: hour,
			        [`${type}Minute`]: minute
			    }
			},
		},
	}
</script>

<style lang="scss">
	@import '../../libs/css/components.scss';
</style>
