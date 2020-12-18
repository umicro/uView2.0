<template>
	<view
	    class="u-checkbox-group"
	    :class="bemClass"
	>
		<slot></slot>
	</view>
</template>

<script>
	/**
	 * checkboxGroup 开关选择器父组件Group
	 * @description 复选框组件一般用于需要多个选择的场景，该组件功能完整，使用方便
	 * @tutorial https://www.uviewui.com/components/checkbox.html
	 * @property {Array} value 绑定的值
	 * @property {Boolean} labelDisabled 是否禁止点击文本操作 (默认 false)
	 * @property {Boolean} disabled 是否禁用全部checkbox （默认 false）
	 * @property {String} shape 形状，circle-圆形，square-方形 （默认 circle）
	 * @property {String} activeColor 选中状态下的颜色，如设置此值，将会覆盖parent的activeColor值 （默认 #2979ff）
	 * @property {String} inactiveColor 未选中的颜色 （默认 #c8c9cc）
	 * @property {String} name 标识符
	 * @property {String Number} size 整个组件的尺寸 单位px （默认 20）
	 * @property {String} placement 布局方式，row-横向，column-纵向 （默认 row）
	 * @property {String Number} labelSize label的字体大小，px单位  （默认 15）
	 * @property {String} labelColor label的字体颜色 （默认 #303133）
	 * @property {String} iconColor 图标颜色 （默认 #ffffff）
	 * @property {String Number} iconSize  图标的大小，单位px （默认 12）
	 * @property {String} customStyle  定义需要用到的外部样式
	 * @property {Boolean} borderBottom  placement为row时，是否显示下边框
	 * @event {Function} change 任一个checkbox状态发生变化时触发，回调为一个对象
	 * @event {Function} input 修改通过v-model绑定的值时触发，回调为一个对象
	 * @example <u-checkbox-group></u-checkbox-group>
	 */
	export default {
		name: 'u-checkbox-group',
		props: {
			// 绑定的值
			value: {
				type: Array,
				default: uni.$u.props.checkboxGroup.value
			},
			//是否禁止点击文本操作
			labelDisabled: {
				type: Boolean,
				default: uni.$u.props.checkboxGroup.labelDisabled
			},
			// 是否禁用全部checkbox
			disabled: {
				type: Boolean,
				default: uni.$u.props.checkboxGroup.disabled
			},
			// 形状，circle-圆形，square-方形
			shape: {
				type: String,
				default: uni.$u.props.checkboxGroup.shape
			},
			// 选中状态下的颜色，如设置此值，将会覆盖parent的activeColor值
			activeColor: {
				type: String,
				default: uni.$u.props.checkboxGroup.activeColor
			},
			// 未选中的颜色
			inactiveColor: {
				type: String,
				default: uni.$u.props.checkboxGroup.inactiveColor
			},
			// 标识符
			name: {
				type: String,
				default: uni.$u.props.checkboxGroup.name
			},
			// 整个组件的尺寸，默认px
			size: {
				type: [String, Number],
				default: uni.$u.props.checkboxGroup.size
			},
			// 布局方式，row-横向，column-纵向
			placement: {
				type: String,
				default: uni.$u.props.checkboxGroup.placement
			},
			// label的字体大小，px单位
			labelSize: {
				type: [String, Number],
				default: uni.$u.props.checkboxGroup.labelSize
			},
			// label的字体颜色 
			labelColor: {
				type: [String],
				default: uni.$u.props.checkboxGroup.labelColor
			},
			// 图标颜色
			iconColor: {
				type: String,
				default: uni.$u.props.checkboxGroup.iconColor
			},
			// 图标的大小，单位px
			iconSize: {
				type: [String, Number],
				default: uni.$u.props.checkboxGroup.iconSize
			},
			// 竖向配列时，是否显示下划线
			borderBottom: {
				type: Boolean,
				default: uni.$u.props.checkboxGroup.borderBottom
			}
		},
		mixins: [uni.$u.mixin],
		computed: {
			// 这里computed的变量，都是子组件u-checkbox需要用到的，由于头条小程序的兼容性差异，子组件无法实时监听父组件参数的变化
			// 所以需要手动通知子组件，这里返回一个parentData变量，供watch监听，在其中去通知每一个子组件重新从父组件(u-checkbox-group)
			// 拉取父组件新的变化后的参数
			parentData() {
				return [this.value, this.disabled, this.inactiveColor, this.activeColor, this.size, this.labelDisabled, this.shape,
					this.iconSize, this.borderBottom, this.placement
				]
			},
			bemClass() {
				// this.bem为一个computed变量，在mixin中
				return this.bem('checkbox-group', ['placement'])
			},
		},
		watch: {
			// 当父组件需要子组件需要共享的参数发生了变化，手动通知子组件
			parentData() {
				if (this.children.length) {
					this.children.map(child => {
						// 判断子组件(u-checkbox)如果有updateParentData方法的话，就就执行(执行的结果是子组件重新从父组件拉取了最新的值)
						typeof(child.updateParentData) === 'function' && child.updateParentData()
					})
				}
			},
		},
		data() {
			return {

			}
		},
		created() {
			this.children = []
		},
		methods: {
			// 将其他的checkbox设置为未选中的状态
			unCheckedOther(childInstance) {
				const values = []
				this.children.map(child => {
					// 将被选中的checkbox，放到数组中返回
					if (child.isChecked) {
						values.push(child.name)
					}
				})
				// 发出事件
				this.$emit('change', values)
				// 修改通过v-model绑定的值
				this.$emit('input', values)
			},
		}
	}
</script>

<style lang="scss">
	@import "../../libs/css/components.scss";

	.u-checkbox-group {

		&--row {
			@include flex;
		}

		&--column {
			@include flex(column);
		}
	}
</style>
