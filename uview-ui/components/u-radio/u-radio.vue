<template>
	<view class="u-radio">
		<view
		    class="u-radio__icon-wrap"
		    @tap.stop="iconClickHandler"
		    :class="iconClasses"
			:style="[iconWrapStyle]"
		>
			<slot name="icon">
				<u-icon
				    class="u-radio__icon-wrap__icon"
				    name="checkbox-mark"
				    :size="iconSize"
				    :color="iconColor"
				/>
			</slot>
		</view>
		<text @tap.stop="labelClickHandler">{{label}}</text>
	</view>
</template>

<script>
	export default {
		name: "u-radio",
		props: {
			// radio的名称
			name: {
				type: [String, Number],
				default: ''
			},
			// 形状，square为方形，circle为圆型
			shape: {
				type: String,
				default: 'circle'
			},
			// 是否禁用
			disabled: {
				type: [String, Boolean],
				default: ''
			},
			// 是否禁止点击提示语选中复选框
			labelDisabled: {
				type: [String, Boolean],
				default: ''
			},
			// 选中状态下的颜色，如设置此值，将会覆盖parent的activeColor值
			activeColor: {
				type: String,
				default: '#2979ff'
			},
			// 未选中的颜色
			inactiveColor: {
				type: String,
				default: '#cccccc'
			},
			// 图标的大小，单位rpx
			iconSize: {
				type: [String, Number],
				default: 12
			},
			// label的字体大小，rpx单位
			labelSize: {
				type: [String, Number],
				default: ''
			},
			// label提示文字，因为nvue下，直接slot进来的文字，由于特殊的结构，无法修改样式
			label: {
				type: [String, Number],
				default: ''
			},
			// 整体的大小
			size: {
				type: [String, Number],
				default: 21
			}
		},
		inject: ['uRadioGroup'],
		mixins: [uni.$u.mixin],
		data() {
			return {
				parentName: '', // 父组件u-radio-group的name属性值，用于解决头条小程序无法动态监听uRadioGroup属性变化的问题
			}
		},
		computed: {
			// 是否禁用，如果父组件u-raios-group禁用的话，将会忽略子组件的配置
			elDisabled() {
				return this.disabled !== '' ? this.disabled : this.uRadioGroup ? this.uRadioGroup.disabled : false
			},
			iconColor() {
				// 图标的颜色
				return this.name === this.parentName ? '#ffffff' : 'transparent'
			},
			iconClasses() {
				let classes = []
				// 组件的形状
				classes.push('u-radio__icon-wrap--' + this.shape)
				// 因为头条的原因，必须将需要的变量放在本方法中，否则无法自动更新
				const elDisabled = this.disabled !== '' ? this.disabled : this.uRadioGroup ? this.uRadioGroup.disabled : false
				if (this.elDisabled) {
					classes.push('u-radio__icon-wrap--disabled')
				}
				if (this.name === this.parentName && this.elDisabled) {
					classes.push('u-radio__icon-wrap--disabled--checked')
				}
				// 支付宝小程序无法动态绑定一个数组类名，否则解析出来的结果会带有","，而导致失效
				// #ifdef MP-ALIPAY || MP-TOUTIAO
				classes = classes.join(' ')
				// #endif
				return classes
			},
			iconWrapStyle() {
				// radio的整体样式
				const style = {}
				style.backgroundColor = this.name === this.parentName ? this.activeColor : '#ffffff'
				style.borderColor = this.name === this.parentName ? this.activeColor : this.inactiveColor
				style.width = uni.$u.addUnit(this.size) 
				style.height = uni.$u.addUnit(this.size)
				return style
			}
		},
		mounted() {
			this.init()
		},
		methods: {
			init() {
				// 组件挂载后，将本实例添加到父组件的children中去
				this.uRadioGroup.children && this.uRadioGroup.children.push(this)
				this.setNameFromParent(this.uRadioGroup.value)
			},
			// 点击图标
			iconClickHandler() {
				// 如果整体被禁用，不允许被点击
				if (!this.elDisabled) {
					this.setRadioCheckedStatus()
				}
			},
			// 点击label
			labelClickHandler() {
				// 如果按钮整体被禁用或者label被禁用，则不允许点击文字修改状态
				if (!this.elLabelDisabled && !this.elDisabled) {
					this.setRadioCheckedStatus()
				}
			},
			emitEvent() {
				// u-radio的name不等于父组件的v-model的值时(意味着未选中)，才发出事件，避免多次点击触发事件
				if (this.name !== this.parentName) {
					this.$emit('change', this.name)
				}
			},
			// 改变组件选中状态
			// 这里的改变的依据是，更改本组件的parentName值为父组件的value值，同时通过父组件遍历所有u-radio实例
			// 将本组件外的其他u-radio的parentName都设置为空(由computed计算后，都被取消选中状态)，因而只剩下一个为选中状态
			setRadioCheckedStatus() {
				this.emitEvent()
				this.setNameFromParent(this.uRadioGroup.value)
				this.uRadioGroup && this.uRadioGroup.setValue(this.name)
			},
			// 设置parentName为父组件u-radio-group的name值，因为头条小程序无法动态监听uRadioGroup属性的变化
			setNameFromParent(name) {
				this.parentName = name
			}
		}
	}
</script>

<style lang="scss">
	@import "../../libs/css/components.scss";

	.u-radio {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		align-items: center;
		overflow: hidden;

		&__icon-wrap {
			/* #ifndef APP-NVUE */
			box-sizing: border-box;
			/* #endif */
			color: $u-content-color;
			@include flex;
			align-items: center;
			justify-content: center;
			width: 42rpx;
			height: 42rpx;
			color: transparent;
			text-align: center;
			// transition-property: color, background-color;
			font-size: 20px;
			border-width: 1px;
			border-color: #c8c9cc;
			// transition-duration: 0.2s;

			/* #ifdef MP-TOUTIAO */
			// 头条小程序兼容性问题，需要设置行高为0，否则图标偏下
			&__icon {
				line-height: 0;
			}

			/* #endif */

			&--circle {
				border-radius: 100%;
			}

			&--square {
				border-radius: 3px;
			}

			&--checked {
				color: #fff;
				background-color: red;
				border-color: #2979ff;
			}

			&--disabled {
				background-color: #ebedf0;
				border-color: #c8c9cc;
			}

			&--disabled--checked {
				color: #c8c9cc !important;
			}
		}

		&__label {
			/* #ifndef APP-NVUE */
			word-wrap: break-word;
			/* #endif */
			margin-left: 10rpx;
			margin-right: 24rpx;
			color: $u-content-color;
			font-size: 30rpx;

			&--disabled {
				color: #c8c9cc;
			}
		}
	}
</style>
