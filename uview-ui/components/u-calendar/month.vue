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
					:style="dayStyle(index1, item1.week)"
					@tap="clickHandler(index, index1, item1)"
					:class="[item1.selected && 'u-calendar-month__days__day__select--selected']"
				>
					<view
						class="u-calendar-month__days__day__select"
						:class="dayClass(index, index1, item1)"
					>
						<text
							class="u-calendar-month__days__day__select__info"
							:class="[isSelected(item1) && 'u-calendar-month__days__day__select__buttom-info--selected',item1.disabled && 'u-calendar-month__days__day__select__info--disabled']"
						>{{ item1.day }}</text>
						<text
							v-if="item1.bottomInfo"
							class="u-calendar-month__days__day__select__buttom-info"
							:class="[isSelected(item1) && 'u-calendar-month__days__day__select__buttom-info--selected', item1.disabled && 'u-calendar-month__days__day__select__buttom-info--disabled']"
						>{{ item1.bottomInfo }}</text>
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
				return (index, week) => {
					const style = {}
					// 保留2位小数
					const dayWidth = (this.width / 7).toFixed(2)
					// 得出每个日期的宽度
					style.width = uni.$u.addUnit(dayWidth)
					style.height = uni.$u.addUnit(this.rowHeight)
					if (index === 0) {
						// 获取当前为星期几，如果为0，则为星期天，减一为每月第一天时，需要向左偏移的item个数
						week = (week === 0 ? 7 : week) - 1
						style.marginLeft = uni.$u.addUnit(week * dayWidth)
					}
					return style
				}
			},
			dayClass() {
				return (index1, index2, item) => {
					let classes = []
					const date = dayjs(item.date).format("YYYY-MM-DD")
					if (this.mode === 'single') {
						if (this.selected.includes(date)) classes.push('u-calendar-month__days__day__select--selected')
					} else if (this.mode === 'multiple') {
						if (this.selected.includes(date)) classes.push('u-calendar-month__days__day__select--selected')
					} else {
						if (this.selected.includes(date)) classes.push('u-calendar-month__days__day__select--selected')
						if(this.selected.length === 2) {
							if(dayjs(date).isAfter(dayjs(this.selected[0])) && dayjs(date).isBefore(dayjs(this.selected[1]))) classes.push('u-calendar-month__days__day__select--selected')
						}
					}
					//#ifdef MP-ALIPAY || MP-TOUTIAO || MP-BAIDU
					classes = classes.join(' ')
					//#endif
					return classes
				}
			},
			// 某个日期是否被选中
			isSelected() {
				return (item) => {
					const date = dayjs(item.date).format("YYYY-MM-DD")
					if (this.mode === 'single') {
						if (this.selected.includes(date)) return true
					} else if (this.mode === 'multiple') {
						if (this.selected.includes(date)) return true
					} else {
						if (this.selected.includes(date)) return true
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
				const promiseAllArr = this.months.map((item, index) => this.getMonthRectByPromise(
					`u-calendar-month-${index}`))
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
					if(this.selected.length === 0) {
						this.selected.push(date)
					} else if(this.selected.length === 1) {
						const existsDate = this.selected[0]
						if(dayjs(date).isBefore(existsDate)) this.selected = [date]
						else if(dayjs(date).isAfter(existsDate)) this.selected.push(date)
					} else {
						this.selected = [date]
					}
				}
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
				}
			}
		}
	}
</style>
