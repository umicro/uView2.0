<template>
	<view
	    class="u-radio"
	    :style="[customStyle]"
	    :class="[`u-radio-label--${iconPlacement}`]"
	>
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
				    :size="elIconSize"
				    :color="elIconColor"
				/>
			</slot>
		</view>
		<text
		    @tap.stop="labelClickHandler"
		    :style="{
			color: elDisabled ? elInactiveColor : elLabelColor,
			fontSize: elLabelSize
		}"
		>{{label}}</text>
	</view>
</template>

<script>
	export default {
		name: "u-radio",
		props: {
			// radio的名称
			name: {
				type: [String, Number, Boolean],
				default: uni.$u.props.radio.name
			},
			// 形状，square为方形，circle为圆型
			shape: {
				type: String,
				default: uni.$u.props.radio.shape
			},
			// 是否禁用
			disabled: {
				type: [String, Boolean],
				default: uni.$u.props.radio.disabled
			},
			// 是否禁止点击提示语选中复选框
			labelDisabled: {
				type: [String, Boolean],
				default: uni.$u.props.radio.labelDisabled
			},
			// 选中状态下的颜色，如设置此值，将会覆盖parent的activeColor值
			activeColor: {
				type: String,
				default: uni.$u.props.radio.activeColor
			},
			// 未选中的颜色
			inactiveColor: {
				type: String,
				default: uni.$u.props.radio.inactiveColor
			},
			// 图标的大小，单位px
			iconSize: {
				type: [String, Number],
				default: uni.$u.props.radio.iconSize
			},
			// label的字体大小，px单位
			labelSize: {
				type: [String, Number],
				default: uni.$u.props.radio.labelSize
			},
			// label提示文字，因为nvue下，直接slot进来的文字，由于特殊的结构，无法修改样式
			label: {
				type: [String, Number],
				default: uni.$u.props.radio.label
			},
			// 整体的大小
			size: {
				type: [String, Number],
				default: uni.$u.props.radio.size
			},
			// 图标颜色
			iconColor: {
				type: String,
				default: uni.$u.props.radio.iconColor
			},
			// label的颜色
			labelColor: {
				type: String,
				default: uni.$u.props.radio.labelColor
			},
			// 图标与文字的对齐方式
			iconPlacement: {
				type: String,
				default: uni.$u.props.radio.radioPlacement
			}
		},
		mixins: [uni.$u.mixin],
		data() {
			return {
				checked: false,
				// 父组件的默认值，因为头条小程序不支持在computed中使用this.parent.shape的形式
				// 故只能使用如此方法
				parentData: {
					iconSize: null,
					labelDisabled: null,
					disabled: null,
					shape: null,
					activeColor: null,
					inactiveColor: null,
					size: null,
					value: null,
					iconColor: null
				}
			}
		},
		computed: {
			// 是否禁用，如果父组件u-raios-group禁用的话，将会忽略子组件的配置
			elDisabled() {
				return this.disabled !== '' ? this.disabled : this.parentData.disabled !== null ? this.parentData.disabled : false;
			},
			// 是否禁用label点击
			elLabelDisabled() {
				return this.labelDisabled !== '' ? this.labelDisabled : this.parentData.labelDisabled !== null ? this.parentData.labelDisabled :
					false;
			},
			// 组件尺寸，对应size的值，默认值为21px
			elSize() {
				return this.size ? this.size : (this.parentData.size ? this.parentData.size : 21);
			},
			// 组件的勾选图标的尺寸，默认12px
			elIconSize() {
				return this.iconSize ? this.iconSize : (this.parentData.iconSize ? this.parentData.iconSize : 12);
			},
			// 组件选中激活时的颜色
			elActiveColor() {
				return this.activeColor ? this.activeColor : (this.parentData.activeColor ? this.parentData.activeColor : '#2979ff');
			},
			// 组件选未中激活时的颜色
			elInactiveColor() {
				return this.inactiveColor ? this.inactiveColor : (this.parentData.inactiveColor ? this.parentData.inactiveColor :
					'#c8c9cc');
			},
			// label的颜色
			elLabelColor() {
				return this.labelColor ? this.labelColor : (this.parentData.labelColor ? this.parentData.labelColor : '#606266')
			},
			// 组件的形状
			elShape() {
				return this.shape ? this.shape : (this.parentData.shape ? this.parentData.shape : 'circle');
			},
			// label大小
			elLabelSize() {
				return uni.$u.addUnit(this.labelSize ? this.labelSize : (this.parentData.labelSize ? this.parentData.labelSize :
					'15'))
			},
			elIconColor() {
				const iconColor = this.iconColor ? this.iconColor : (this.parentData.iconColor ? this.parentData.iconColor :
					'#ffffff');
				// 图标的颜色
				if (this.elDisabled) {
					// disabled状态下，已勾选的radio图标改为elInactiveColor
					return this.checked ? this.elInactiveColor : 'transparent'
				} else {
					return this.checked ? iconColor : 'transparent'
				}
			},
			iconClasses() {
				let classes = []
				// 组件的形状
				classes.push('u-radio__icon-wrap--' + this.elShape)
				if (this.elDisabled) {
					classes.push('u-radio__icon-wrap--disabled')
				}
				if (this.checked && this.elDisabled) {
					classes.push('u-radio__icon-wrap--disabled--checked')
				}
				// 支付宝，头条小程序无法动态绑定一个数组类名，否则解析出来的结果会带有","，而导致失效
				// #ifdef MP-ALIPAY || MP-TOUTIAO
				classes = classes.join(' ')
				// #endif
				return classes
			},
			iconWrapStyle() {
				// radio的整体样式
				const style = {}
				style.backgroundColor = this.checked && !this.elDisabled ? this.elActiveColor : '#ffffff'
				style.borderColor = this.checked && !this.elDisabled ? this.elActiveColor : this.elInactiveColor
				style.width = uni.$u.addUnit(this.elSize)
				style.height = uni.$u.addUnit(this.elSize)
				// 如果是图标在右边的话，移除它的右边距
				if(this.iconPlacement === 'right') {
					style.marginRight = 0
				}
				return style
			}
		},
		mounted() {
			this.init()
		},
		methods: {
			init() {
				this.parent = {};
				// 支付宝小程序不支持provide/inject，所以使用这个方法获取整个父组件，在created定义，避免循环引用
				this.updateParentData();
				if (!this.parent) {
					uni.$u.error('u-radio必须搭配u-radio-group组件使用')
				}
				this.parent.children && this.parent.children.push(this)
				// 设置初始化时，是否默认选中的状态
				this.checked = this.name === this.parentData.value
			},
			updateParentData() {
				this.getParentData('u-radio-group')
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
				// u-radio的checked不为true时(意味着未选中)，才发出事件，避免多次点击触发事件
				if (!this.checked) {
					this.$emit('change', this.name)
				}
			},
			// 改变组件选中状态
			// 这里的改变的依据是，更改本组件的checked值为true，同时通过父组件遍历所有u-radio实例
			// 将本组件外的其他u-radio的checked都设置为false(都被取消选中状态)，因而只剩下一个为选中状态
			setRadioCheckedStatus() {
				this.emitEvent()
				// 将本组件标记为选中状态
				this.checked = true
				typeof this.parent.unCheckedOther === 'function' && this.parent.unCheckedOther(this)
			}
		}
	}
</script>

<style lang="scss">
	@import "../../libs/css/components.scss";

	.u-radio {
		/* #ifndef APP-NVUE */
		@include flex(row);
		/* #endif */
		overflow: hidden;
		flex-direction: row;
		align-items: center;
		
		&-label--left {
			flex-direction: row
		}
		
		&-label--right {
			flex-direction: row-reverse;
			justify-content: space-between
		}

		&__icon-wrap {
			/* #ifndef APP-NVUE */
			box-sizing: border-box;
			// nvue下，border-color过渡有问题
			transition-property: border-color, background-color, color;
			transition-duration: 0.2s;
			/* #endif */
			color: $u-content-color;
			@include flex;
			align-items: center;
			justify-content: center;
			color: transparent;
			text-align: center;
			margin-right: 6px;

			font-size: 20px;
			border-width: 1px;
			border-color: #c8c9cc;

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
				background-color: #ebedf0 !important;
			}

			&--disabled--checked {
				color: #c8c9cc !important;
			}
		}

		&__label {
			/* #ifndef APP-NVUE */
			word-wrap: break-word;
			/* #endif */
			margin-left: 5px;
			margin-right: 12px;
			color: $u-content-color;
			font-size: 15px;

			&--disabled {
				color: #c8c9cc;
			}
		}
	}
</style>
