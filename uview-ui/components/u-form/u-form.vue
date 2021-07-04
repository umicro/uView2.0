<template>
	<view class="u-form">
		<slot />
	</view>
</template>

<script>
	import props from './props.js'
	import Schema from '../../libs/util/async-validator';
	// 去除警告信息
	Schema.warning = function() {}
	export default {
		name: 'u-form',
		mixins: [uni.$u.mixin, props],
		provide() {
			return {
				uForm: this
			}
		},
		data() {
			return {
				formRules: {},
				// 规则校验器
				validator: {}
			}
		},
		watch: {
			// 监听规则的变化
			rules: {
				immediate: true,
				handler(n) {
					this.setRules(n)
				}
			},
			// 监听属性的变化，通知子组件u-form-item重新获取信息
			propsChange(n) {
				if (this.children?.length) {
					this.children.map(child => {
						// 判断子组件(u-form-item)如果有updateParentData方法的话，就就执行(执行的结果是子组件重新从父组件拉取了最新的值)
						typeof(child.updateParentData) == 'function' && child.updateParentData();
					})
				}
			},
			// 深度监听model绑定的变化
			model: {
				immediate: true,
				deep: true,
				handler(n) {
					// console.log('watch', n);
					// this.validate()
				}
			}
		},
		computed: {
			propsChange() {
				return [this.errorType, this.borderBottom, this.labelPosition, this.labelWidth, this.labelAlign, this
					.labelStyle
				]
			}
		},
		created() {
			// 存储当前form下的所有u-form-item的实例
			// 不能定义在data中，否则微信小程序会造成循环引用而报错
			this.children = []
		},
		methods: {
			// 手动设置校验的规则，如果规则中有函数的话，微信小程序中会过滤掉，所以只能手动调用设置规则
			setRules(rules) {
				// 判断是否有规则
				if (Object.keys(rules).length === 0) return
				this.formRules = rules
				// 重新将规则赋予Validator
				this.validator = new Schema(rules)
			},
			// 清空所有u-form-item组件的内容，本质上是调用了u-form-item组件中的resetField()方法
			resetFields() {
				this.children.map(child => {
					child.resetField()
				})
			},
			// 对部分表单字段进行校验
			validateField(value, callback) {
				if(uni.$u.test.string(value)) {
					// 如果为字符串，转为数组
					value = [value]
				}
				if(uni.$u.test.array(value)) {
					// 对一个或者多个u-form-item进行校验
					
					// 执行回调函数
					typeof callback === 'function' && callback()
				}
			},
			// 校验全部数据
			validate(callback) {
				return new Promise((resolve, reject) => {
					// $nextTick是必须的，否则model的变更，可能会延后于validate方法
					this.$nextTick(() => {
						this.validator.validate(this.model, (errors, fields) => {
							console.log('errors fields', errors, fields);
							if (errors) {
								console.log('errors', errors);
							}
						})
					})
				})
			}
		}
	}
</script>

<style lang="scss">

</style>
