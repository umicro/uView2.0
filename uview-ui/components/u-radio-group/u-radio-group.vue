<template>
	<view class="u-radio-group" :class="bemClass">
	    <slot></slot>
	</view>
</template>

<script>
	export default {
		name: 'u-radio-group',
		props: {
			// 绑定的值
			value: {
				type: [String, Number],
				default: ''
			},
			// labelDisabled: {
			// 	type: Boolean,
			// 	default: false
			// },
			// 是否禁用全部radio
			disabled: {
				type: Boolean,
				default: false
			},
			// // 形状，circle-圆形，square-方形
			// shape: {
			// 	type: String,
			// 	default: 'circle'
			// },
			// // 选中状态下的颜色，如设置此值，将会覆盖parent的activeColor值
			// activeColor: {
			// 	type: String,
			// 	default: '#2979ff'
			// },
			// // 未选中的颜色
			// inactiveColor: {
			// 	type: String,
			// 	default: '#cccccc'
			// },
			// 标识符
			name: {
				type: String,
				default: ''
			},
			// // 整个组件的尺寸，默认px
			// size: {
			// 	type: [String, Number],
			// 	default: 17
			// },
			// 布局方式，row-横向，column-纵向
			placement: {
				type: String,
				default: 'row'
			}
		},
		mixins: [uni.$u.mixin],
		// 将本组件的实例this注入到u-radio子组件中
		provide() {
			return {
				uRadioGroup: this
			}
		},
		data() {
			return {
				
			}
		},
		watch: {
			value(n) {
				this.children.map(child => {
					child.setNameFromParent(n)
				})
			}
		},
		computed: {
			// 生成bem风格的类名
			bemClass() {
				// this.bem为一个computed变量，在mixin中
				return this.bem('button', ['placement'])
			},
		},
		created() {
			this.children = []
		},
		methods: {
			// 该方法有子组件radio调用，当一个radio被选中的时候，给父组件设置value值(props传递的value)
			setValue(val) {
				// 通过子组件传递过来的val值(此被选中的子组件内部已将parentValue设置等于val的值)，将其他
				// u-radio设置未选中的状态
				this.children.map(child => {
					if(child.parentName !== val) child.setNameFromParent(null)
				})
				// 通过emit事件，设置父组件通过v-model双向绑定的值
				this.$emit('input', val)
				this.$emit('change', val)
				// // 等待下一个周期再执行，因为this.$emit('input')作用于父组件，再反馈到子组件内部，需要时间
				// // 由于头条小程序执行迟钝，故需要用几十毫秒的延时
				// setTimeout(() => {
				// 	// 将当前的值发送到 u-form-item 进行校验
				// 	this.dispatch('u-form-item', 'on-form-change', val)
				// }, 60)
			}
		}
	}
</script>

<style lang="scss">
	@import "../../libs/css/components.scss";
	
	.u-radio-group {
	    width: 100%;
		
		&--row {
			@include flex;
		}
		
		&--column {
			@include flex(column);
		}
	}
</style>
