<template>
	<view
		class="u-calendar-month-wrapper"
		ref="u-calendar-month-wrapper"
	>
		<view
			v-for="(item, index) in months"
			:key="index"
			:class="[`u-calendar-month-${index}`]"
			:ref="`u-calendar-month-${index}`"
		>
			<text
				v-if="index !== 0"
				class="u-calendar-month__title"
			>{{ item.year }}年{{ item.month }}月</text>
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
					:style="dayStyle(index, index1, item1)"
					@tap="clickHandler(index, index1, item1)"
					:class="[item1.selected && 'u-calendar-month__days__day__select--selected']"
				>
					<view
						class="u-calendar-month__days__day__select"
						:style="[daySelectStyle(index, index1, item1)]"
					>
						<text
							class="u-calendar-month__days__day__select__info"
							:class="[item1.disabled && 'u-calendar-month__days__day__select__info--disabled']"
							:style="[textStyle(item1)]"
						>{{ item1.day }}</text>
						<text
							v-if="getBottomInfo(index, index1, item1)"
							class="u-calendar-month__days__day__select__buttom-info"
							:class="[item1.disabled && 'u-calendar-month__days__day__select__buttom-info--disabled']"
							:style="[textStyle(item1)]"
						>{{ getBottomInfo(index, index1, item1) }}</text>
						<text
							v-if="item1.dot"
							class="u-calendar-month__days__day__select__dot"
						></text>
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
	import dayjs from './dayjs.js';
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
			months: {
				type: Array,
				default: () => []
			},
			// 日期选择类型
			mode: {
				type: String,
				default: 'single'
			},
			// 日期行高
			rowHeight: {
				type: [String, Number],
				default: 58
			},
			// mode=multiple时，最多可选多少个日期
			maxCount: {
				type: [String, Number],
				default: Infinity
			},
			// mode=range时，第一个日期底部的提示文字
			startText: {
				type: String,
				default: '开始'
			},
			// mode=range时，最后一个日期底部的提示文字
			endText: {
				type: String,
				default: '结束'
			}
		},
		data() {
			return {
				// 每个日期的宽度
				width: 0,
				// 当前选中的日期item
				item: {},
				selected: []
			}
		},
		computed: {
			dayStyle() {
				return (index1, index2, item) => {
					const style = {}
					let week = item.week
					// 保留2位小数
					const dayWidth = (this.width / 7).toFixed(2)
					// 得出每个日期的宽度
					style.width = uni.$u.addUnit(dayWidth)
					style.height = uni.$u.addUnit(this.rowHeight)
					if (index2 === 0) {
						// 获取当前为星期几，如果为0，则为星期天，减一为每月第一天时，需要向左偏移的item个数
						week = (week === 0 ? 7 : week) - 1
						style.marginLeft = uni.$u.addUnit(week * dayWidth)
					}
					return style
				}
			},
			daySelectStyle() {
				return (index1, index2, item) => {
					let date = dayjs(item.date).format("YYYY-MM-DD"),
						style = {}
					if (this.selected.includes(date)) {
						style.backgroundColor = this.color
					}
					if(this.mode === 'single') {
						if (date === this.selected[0]) {
							style.borderRadius = '3px'
						}
					} else if (this.mode === 'range') {
						if (this.selected.length >= 2) {
							const len = this.selected.length - 1
							// 第一个日期设置左上角和左下角的圆角
							if (date === this.selected[0]) {
								style.borderTopLeftRadius = '3px'
								style.borderBottomLeftRadius = '3px'
							}
							// 最后一个日期设置右上角和右下角的圆角
							if (date === this.selected[len]) {
								style.borderTopRightRadius = '3px'
								style.borderBottomRightRadius = '3px'
							}
							// 出于第一和最后一个之间的日期，背景色设置为浅色，通过将对应颜色进行等分，再取其尾部的颜色值
							if (dayjs(date).isAfter(dayjs(this.selected[0])) && dayjs(date).isBefore(dayjs(this
									.selected[len]))) {
								style.backgroundColor = uni.$u.colorGradient(this.color, '#ffffff', 100)[90]
							}
						} else if (this.selected.length === 1) {
							// 进行还原操作，否则在nvue的iOS，uni-app有bug，会导致诡异的表现
							style.borderTopLeftRadius = '3px'
							style.borderBottomLeftRadius = '3px'
						}
					}
					return style
				}
			},
			// 某个日期是否被选中
			textStyle() {
				return (item) => {
					const date = dayjs(item.date).format("YYYY-MM-DD"),
						style = {}
					// 选中的日期，提示文字设置白色
					if (this.selected.includes(date)) {
						style.color = '#ffffff'
					}
					if (this.mode === 'range') {
						const len = this.selected.length - 1
						// 如果是范围选择模式，第一个和最后一个之间的日期，文字颜色设置为高亮的主题色
						if (dayjs(date).isAfter(dayjs(this.selected[0])) && dayjs(date).isBefore(dayjs(this
								.selected[len]))) {
							style.color = this.color
						}
					}
					return style
				}
			},
			// 获取底部的提示文字
			getBottomInfo() {
				return (index1, index2, item) => {
					const date = dayjs(item.date).format("YYYY-MM-DD")
					const bottomInfo = item.bottomInfo
					// 当为日期范围模式时，且选择的日期个数大于0时
					if (this.mode === 'range' && this.selected.length > 0) {
						if (this.selected.length === 1) {
							// 选择了一个日期时，如果当前日期为数组中的第一个日期，则显示底部文字为“开始”
							if (dayjs(date).isSame(dayjs(this.selected[0]))) return this.startText
							else return bottomInfo
						} else {
							const len = this.selected.length - 1
							// 如果数组中的日期大于2个时，第一个和最后一个显示为开始和结束日期
							if (dayjs(date).isSame(dayjs(this.selected[0]))) return this.startText
							else if (dayjs(date).isSame(dayjs(this.selected[len]))) return this.endText
							else return bottomInfo
						}
					} else {
						return bottomInfo
					}
				}
			}
		},
		mounted() {
			this.init()
		},
		methods: {
			init() {
				uni.$u.sleep().then(() => {
					this.getWrapperWidth()
					// 这里需要另一个延时，因为获取宽度后，会进行月份数据渲染，只有渲染完成之后，才有真正的高度
					uni.$u.sleep().then(() => {
						this.getMonthRect()
					})
				})
			},
			// 获取月份数据区域的宽度，因为nvue不支持百分比，所以无法通过css设置每个日期item的宽度
			getWrapperWidth() {
				// #ifdef APP-NVUE
				dom.getComponentRect(this.$refs['u-calendar-month-wrapper'], res => {
					this.width = res.size.width
				})
				// #endif
				// #ifndef APP-NVUE
				this.$uGetRect('.u-calendar-month-wrapper').then(size => {
					this.width = size.width
				})
				// #endif
			},
			getMonthRect() {
				// 获取每个月份数据的尺寸，用于父组件在scroll-view滚动事件中，监听当前滚动到了第几个月份
				const promiseAllArr = this.months.map((item, index) => this.getMonthRectByPromise(
					`u-calendar-month-${index}`))
				// 一次性返回
				Promise.all(promiseAllArr).then(
					sizes => {
						let height = 1
						for (let i = 0; i < this.months.length; i++) {
							// 添加到months数组中，供scroll-view滚动事件中，判断当前滚动到哪个月份
							this.months[i].top = height
							height += sizes[i].height
						}
					})
			},
			// 获取每个月份区域的尺寸
			getMonthRectByPromise(el) {
				// #ifndef APP-NVUE
				// $uGetRect为uView自带的节点查询简化方法，详见文档介绍：https://www.uviewui.com/js/getRect.html
				// 组件内部一般用this.$uGetRect，对外的为this.$u.getRect，二者功能一致，名称不同
				return new Promise(resolve => {
					this.$uGetRect(`.${el}`).then(size => {
						resolve(size)
					})
				})
				// #endif

				// #ifdef APP-NVUE 
				// nvue下，使用dom模块查询元素高度
				// 返回一个promise，让调用此方法的主体能使用then回调
				return new Promise(resolve => {
					dom.getComponentRect(this.$refs[el][0], res => {
						resolve(res.size)
					})
				})
				// #endif
			},
			// 点击某一个日期
			clickHandler(index1, index2, item) {
				if (item.disabled) return
				this.item = item
				const date = dayjs(item.date).format("YYYY-MM-DD")
				if (this.mode === 'single') {
					// 单选情况下，让数组中的元素为当前点击的日期
					this.selected = [date]
				} else if (this.mode === 'multiple') {
					if (this.selected.includes(date)) {
						// 如果点击的日期已在数组中，则进行移除操作，也就是达到反选的效果
						const itemIndex = this.selected.findIndex(item => item === date)
						this.selected.splice(itemIndex, 1)
					} else {
						// 如果点击的日期不在数组中，且已有的长度小于总可选长度时，则添加到数组中去
						if (this.selected.length < this.maxCount) this.selected.push(date)
					}
				} else {
					// 选择区间形式
					if (this.selected.length === 0 || this.selected.length >= 2) {
						// 如果原来就为0或者大于2的长度，则当前点击的日期，就是开始日期
						this.selected = [date]
					} else if (this.selected.length === 1) {
						// 如果已经选择了开始日期
						const existsDate = this.selected[0]
						// 如果当前选择的日期小于上一次选择的日期，则当前的日期定为开始日期
						if (dayjs(date).isBefore(existsDate)) this.selected = [date]
						else if (dayjs(date).isAfter(existsDate)) {
							// 如果当前日期大于已有日期，将当前的添加到数组尾部
							this.selected.push(date)
							const startDate = this.selected[0]
							const endDate = this.selected[1]
							const arr = []
							let i = 0
							do {
								// 将开始和结束日期之间的日期添加到数组中
								arr.push(dayjs(startDate).add(i, 'day').format("YYYY-MM-DD"))
								i++
							// 累加的日期小于结束日期时，继续下一次的循环
							} while (dayjs(startDate).add(i, 'day').isBefore(dayjs(endDate)))
							// 为了一次性修改数组，避免computed中多次触发，这里才用arr变量一次性赋值的方式，同时将最后一个日期添加近来
							arr.push(endDate)
							this.selected = arr
						}
					}
				}
				this.$emit('monthSelected', this.selected)
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

				&__select {
					flex: 1;
					@include flex;
					align-items: center;
					justify-content: center;
					position: relative;

					&__dot {
						width: 7px;
						height: 7px;
						border-radius: 100px;
						background-color: $u-error;
						position: absolute;
						top: 12px;
						right: 7px;
					}

					&__buttom-info {
						color: $u-content-color;
						text-align: center;
						position: absolute;
						bottom: 5px;
						font-size: 10px;
						text-align: center;
						left: 0;
						right: 0;

						&--selected {
							color: #ffffff;
						}

						&--disabled {
							color: #cacbcd;
						}
					}

					&__info {
						text-align: center;
						font-size: 16px;

						&--selected {
							color: #ffffff;
						}

						&--disabled {
							color: #cacbcd;
						}
					}

					&--selected {
						background-color: $u-primary;
						@include flex;
						justify-content: center;
						align-items: center;
						flex: 1;
						border-radius: 3px;
					}

					&--range-selected {
						opacity: 0.3;
						border-radius: 0;
					}

					&--range-start-selected {
						border-top-right-radius: 0;
						border-bottom-right-radius: 0;
					}

					&--range-end-selected {
						border-top-left-radius: 0;
						border-bottom-left-radius: 0;
					}
				}
			}
		}
	}
</style>
