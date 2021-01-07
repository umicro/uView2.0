<template>
	<view class="u-number-box">
		<view
		    class="u-number-box__minus"
			@tap.stop="clickHandler('minus')"
		    @touchstart.stop.prevent="onTouchStart('minus')"
		    @touchend.stop.prevent="clearTimeout"
		    :class="{ 'u-number-box__minus--disabled': isDisabled('minus') }"
		    :style="[buttonStyle('minus')]"
		>
			<u-icon
			    name="minus"
			    :color="isDisabled('minus') ? '#c8c9cc' : '#323233'"
			    size="15"
			    bold
			></u-icon>
		</view>
		<input
		    :disabled="disabledInput || disabled"
		    :cursor-spacing="getCursorSpacing"
		    :class="{ 'u-number-box__input--disabled': disabled || disabledInput }"
		    v-model="currentValue"
		    class="u-number-box__input"
		    @blur="onBlur"
		    @focus="onFocus"
		    @input="onInput"
		    type="number"
		    :style="[inputStyle]"
		/>
		<view
		    class="u-number-box__plus"
			@tap.stop="clickHandler('plus')"
		    @touchstart.stop.prevent="onTouchStart('plus')"
		    @touchend.stop.prevent="clearTimeout"
		    :class="{ 'u-number-box__minus--disabled': isDisabled('plus') }"
		    :style="[buttonStyle('plus')]"
		>
			<u-icon
			    name="plus"
			    :color="isDisabled('plus') ? '#c8c9cc' : '#323233'"
			    size="15"
			    bold
			></u-icon>
		</view>
	</view>
</template>

<script>
	import props from './props'
	export default {
		name: 'u-number-box',
		mixins: [uni.$u.mixin, props],
		data() {
			return {
				currentValue: '',
				// 定时器
				longPressTimer: null
			}
		},
		watch: {
			// 多个值之间，只要一个值发生变化，都要重新检查check()函数
			watchChange(n) {
				this.check()
			}
		},
		computed: {
			getCursorSpacing() {
				// 判断传入的单位，如果为rpx单位，需要转成px
				const number = parseInt(this.cursorSpacing)
				return /rpx$/.test(String(this.cursorSpacing)) ? uni.upx2px(number) : number
			},
			// 按钮的样式
			buttonStyle() {
				return (type) => {
					const style = {
						backgroundColor: this.bgColor,
						height: this.$u.addUnit(this.buttonSize),
						color: this.color
					}
					if (this.isDisabled(type)) {
						style.backgroundColor = '#f7f8fa'
					}
					return style
				}
			},
			// 输入框的样式
			inputStyle() {
				const disabled = this.disabled || this.disabledInput
				const style = {
					color: disabled ? '#c8c9cc' : this.color,
					backgroundColor: disabled ? '#f7f8fa' : this.bgColor,
					height: this.$u.addUnit(this.buttonSize),
					width: this.$u.addUnit(this.inputWidth)
				}
				return style
			},
			// 用于监听多个值发生变化
			watchChange() {
				return [this.integer, this.decimalLength, this.min, this.max]
			},
			isDisabled() {
				return (type) => {
					if (type === 'plus') {
						// 在点击增加按钮情况下，判断整体的disabled，是否单独禁用增加按钮，以及当前值是否大于最大的允许值
						return (
							this.disabled ||
							this.disablePlus ||
							this.currentValue >= this.max
						)
					}
					// 点击减少按钮同理
					return (
						this.disabled ||
						this.disableMinus ||
						this.currentValue <= this.min
					)
				}
			},
		},
		mounted() {
			this.init()
		},
		methods: {
			init() {
				this.currentValue = this.format(this.value)
			},
			// 格式化整理数据，限制范围
			format(value) {
				value = this.filter(value)
				// 如果为空字符串，那么设置为0，同时将值转为Number类型
				value = value === '' ? 0 : +value
				// 对比最大最小值，取在min和max之间的值
				value = Math.max(Math.min(this.max, value), this.min)
				// 如果设定了最大的小数位数，使用toFixed去进行格式化
				if (this.decimalLength !== null) {
					value = value.toFixed(this.decimalLength)
				}
				return value
			},
			// 过滤非法的字符
			filter(value) {
				// 只允许0-9之间的数字，"."为小数点，"-"为负数时候使用
				value = String(value).replace(/[^0-9.-]/g, '')
				// 如果只允许输入整数，则过滤掉小数点后的部分
				if (this.integer && value.indexOf('.') !== -1) {
					value = value.split('.')[0]
				}
				return value;
			},
			check() {
				// 格式化了之后，如果前后的值不相等，那么设置为格式化后的值
				const val = this.format(this.currentValue);
				if (val !== this.currentValue) {
					this.currentValue = val
				}
			},
			// 判断是否出于禁止操作状态
			// isDisabled(type) {
			// 	if (type === 'plus') {
			// 		// 在点击增加按钮情况下，判断整体的disabled，是否单独禁用增加按钮，以及当前值是否大于最大的允许值
			// 		return (
			// 			this.disabled ||
			// 			this.disablePlus ||
			// 			this.currentValue >= this.max
			// 		)
			// 	}
			// 	// 点击减少按钮同理
			// 	return (
			// 		this.disabled ||
			// 		this.disableMinus ||
			// 		this.currentValue <= this.min
			// 	)
			// },
			// 输入框活动焦点
			onFocus(event) {
				this.$emit('focus', event.detail)
			},
			// 输入框失去焦点
			onBlur(event) {
				// 对输入值进行格式化
				const value = this.format(event.detail.value)
				this.emitChange(value)
				// 发出blur事件
				this.$emit(
					'blur',
					Object.assign(Object.assign({}, event.detail), {
						value
					})
				)
			},
			// 输入框值发生变化
			onInput(event) {
				const {
					value = ''
				} = event.detail || {}
				// 为空返回
				if (value === '') return
				let formatted = this.filter(value)
				// 最大允许的小数长度
				if (this.decimalLength !== null && formatted.indexOf('.') !== -1) {
					const pair = formatted.split('.');
					formatted = `${pair[0]}.${pair[1].slice(0, this.decimalLength)}`
				}
				formatted = this.format(formatted)
				this.emitChange(formatted);
			},
			// 发出change事件
			emitChange(value) {
				// 如果开启了异步变更值，则不修改内部的值，需要用户手动在外部通过v-model变更
				if (!this.asyncChange) {
					this.$nextTick(() => {
						this.currentValue = value
						this.$forceUpdate()
					})
				}
				this.$emit('change', value);
			},
			onChange() {
				const {
					type
				} = this
				if (this.isDisabled(type)) {
					return this.$emit('overlimit', type)
				}
				const diff = type === 'minus' ? -this.step : +this.step
				const value = this.format(this.add(+this.currentValue, diff))
				this.emitChange(value)
				this.$emit(type)
			},
			// 对值扩大后进行四舍五入，再除以扩大因子，避免出现浮点数操作的精度问题
			add(num1, num2) {
				const cardinal = Math.pow(10, 10);
				return Math.round((num1 + num2) * cardinal) / cardinal
			},
			// 点击加减按钮
			clickHandler(type) {
				this.type = type
				this.onChange()
			},
			longPressStep() {
			    this.longPressTimer = setTimeout(() => {
			        this.onChange()
			        this.longPressStep()
			    }, 250);
			},
			onTouchStart(type) {
			    if (!this.longPress) return
			    this.clearTimeout()
			    this.type = type
			    this.isLongPress = false
			    this.longPressTimer = setTimeout(() => {
			        this.isLongPress = true
			        this.onChange()
			        this.longPressStep()
			    }, 600)
			},
			// 触摸结束
			onTouchEnd() {
				if (!this.longPress) return
				this.clearTimeout()
			},
			// 清除定时器
			clearTimeout() {
				clearTimeout(this.longPressTimer)
				this.longPressTimer = null
			}
		}
	}
</script>

<style lang="scss">
	@import '../../libs/css/components.scss';

	.u-number-box {
		@include flex(row);
		align-items: center;

		&__plus,
		&__minus {
			width: 35px;
			@include flex;
			justify-content: center;
			align-items: center;
			/* #ifndef APP-NVUE */
			touch-action: none;
			/* #endif */

			&--disabled {
				color: #c8c9cc;
				background-color: #f7f8fa;
			}
		}

		&__plus {
			border-top-right-radius: 4px;
			border-bottom-right-radius: 4px;
		}

		&__minus {
			border-top-left-radius: 4px;
			border-bottom-left-radius: 4px;
		}

		&__input {
			position: relative;
			text-align: center;
			font-size: 15px;
			padding: 0;
			margin: 0 2px;
			@include flex;
			align-items: center;
			justify-content: center;

			&--disabled {
				color: #c8c9cc;
				background-color: #f2f3f5;
			}
		}
	}
</style>
