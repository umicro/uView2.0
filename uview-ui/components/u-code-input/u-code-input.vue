<template>
	<view class="u-code-input">
		<view
			class="u-code-input__item"
			:style="[itemStyle(index)]"
			v-for="(item, index) in codeLength"
			:key="index"
		>
			<view
				class="u-code-input__item__dot"
				v-if="dot && codeArray.length > index"
			></view>
			<text
				v-else
				:style="{
					fontSize: $u.addUnit(fontSize),
					fontWeight: bold ? 'bold' : 'normal',
					color: color
				}"
			>{{codeArray[index]}}</text>
			<view
				class="u-code-input__item__line"
				v-if="mode === 'line'"
				:style="[lineStyle]"
			></view>
		</view>
		<input
			:disabled="disabledKeyboard"
			type="number"
			:focus="focus"
			:value="inputValue"
			:maxlength="maxlength"
			class="u-code-input__input"
			@input="inputHandler"
			:style="{
				height: $u.addUnit(size) 
			}"
		/>
	</view>
</template>

<script>
	import props from './props.js'
	export default {
		name: 'u-code-input',
		mixins: [uni.$u.mixin, props],
		data() {
			return {
				inputValue: ''
			}
		},
		watch: {
			value: {
				immediate: true,
				handler(val) {
					// 转为字符串，超出部分截掉
					this.inputValue = String(val).substring(0, this.maxlength)
				}
			},
		},
		computed: {
			// 根据长度，循环输入框的个数，因为头条小程序数值不能用于v-for
			codeLength() {
				return new Array(this.maxlength)
			},
			// 循环item的样式
			itemStyle() {
				return index => {
					const addUnit = uni.$u.addUnit
					const style = {
						width: addUnit(this.size),
						height: addUnit(this.size)
					}
					// 盒子模式下，需要额外进行处理
					if (this.mode === 'box') {
						// 设置盒子的边框，如果是细边框，则设置为0.5px宽度
						style.border = `${this.hairline ? 0.5 : 1}px solid ${this.borderColor}`
						// 如果盒子间距为0的话
						if (uni.$u.getPx(this.space) === 0) {
							// 给第一和最后一个盒子设置圆角
							if (index === 0) {
								style.borderTopLeftRadius = '3px'
								style.borderBottomLeftRadius = '3px'
							}
							if (index === this.codeLength.length - 1) {
								style.borderTopRightRadius = '3px'
								style.borderBottomRightRadius = '3px'
							}
							// 最后一个盒子的右边框需要保留
							if (index !== this.codeLength.length - 1) {
								style.borderRight = 'none'
							}
						}
					}
					if (index !== this.codeLength.length - 1) {
						// 设置验证码字符之间的距离，通过margin-right设置，最后一个字符，无需右边框
						style.marginRight = addUnit(this.space)
					} else {
						// 最后一个盒子的有边框需要保留
						style.marginRight = 0
					}

					return style
				}
			},
			// 将输入的值，转为数组，给item历遍时，根据当前的索引显示数组的元素
			codeArray() {
				return String(this.inputValue).split('')
			},
			// 下划线模式下，横线的样式
			lineStyle() {
				const style = {}
				style.height = this.hairline ? '2px' : '4px'
				style.width = uni.$u.addUnit(this.size)
				// 线条模式下，背景色即为边框颜色
				style.backgroundColor = this.borderColor
				return style
			}
		},
		methods: {
			// 监听输入框的值发生变化
			inputHandler(e) {
				const value = e.detail.value
				this.inputValue = value
				// 未达到maxlength之前，发送change事件，达到后发送finish事件
				this.$emit('change', value)
				// 修改通过v-model双向绑定的值
				this.$emit('input', value)
				// 达到用户指定输入长度时，发出完成事件
				if (String(value).length >= Number(this.maxlength)) {
					this.$emit('finish', value)
				}
			}
		}
	}
</script>

<style lang="scss">
	@import "../../libs/css/components.scss";

	.u-code-input {
		@include flex;
		position: relative;

		&__item {
			@include flex;
			justify-content: center;
			align-items: center;

			&__text {
				font-size: 15px;
				color: $u-content-color;
			}

			&__dot {
				width: 7px;
				height: 7px;
				border-radius: 100px;
				background-color: $u-content-color;
			}

			&__line {
				position: absolute;
				bottom: 0;
				height: 4px;
				border-radius: 100px;
				width: 40px;
				background-color: $u-content-color;
			}
		}

		&__input {
			// 之所以需要input输入框，是因为有它才能唤起键盘
			// 这里将它设置为两倍的屏幕宽度，再将左边的一半移出屏幕，为了不让用户看到输入的内容
			position: absolute;
			left: -750rpx;
			width: 1500rpx;
			top: 0;
			background-color: transparent;
			text-align: left;
		}
	}
</style>
