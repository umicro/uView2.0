<template>
	<view class="u-form">
		<slot />
	</view>
</template>

<script>
	import props from './props.js';
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
				validator: {},
				// 原始的model快照，用于resetFields方法重置表单时使用
				originalModel: null
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
			// 监听model的初始值作为重置表单的快照
			model: {
				immediate: true,
				handler(n) {
					if (!this.originalModel) {
						this.originalModel = uni.$u.deepClone(n)
					}
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
				this.resetModel()
			},
			// 重置model为初始值的快照
			resetModel(obj) {
				// 历遍所有u-form-item，根据其prop属性，还原model的原始快照
				this.children.map(child => {
					const prop = child?.prop
					const value = uni.$u.getProperty(this.originalModel, prop)
					uni.$u.setProperty(this.model, prop, value)
				})
			},
			// 清空校验结果
			clearValidate(props) {
				props = [].concat(props)
				this.children.map(child => {
					// 如果u-form-item的prop在props数组中，则清除对应的校验结果信息
					if(props.includes(child.props)) {
						child.message = null
					}
				})
			},
			// 对部分表单字段进行校验
			validateField(value, callback, event = null) {
				// $nextTick是必须的，否则model的变更，可能会延后于此方法的执行
				this.$nextTick(() => {
					// 校验错误信息，返回给回调方法
					const errorsRes = []
					// 如果为字符串，转为数组
					value = [].concat(value)
					
					// 历遍children所有子form-item
					this.children.map(child => {
						if (value.includes(child.prop)) {
							// 获取对应的属性，通过类似'a.b.c'的形式
							const propertyVal = uni.$u.getProperty(this.model, child.prop)
							// 属性链数组
							const propertyChain = child.prop.split('.')
							const propertyName = propertyChain[propertyChain.length - 1]
							
							const rule = this.formRules[child.prop]
							// 如果不存在对应的规则，直接返回，否则校验器会报错
							if(!rule) return 
							
							// 将u-form-item的触发器转为数组形式
							const trigger = [].concat(rule?.trigger)
							// 如果是有传入触发事件，但是此form-item却没有配置此触发器的话，不执行校验操作
							if (event && !trigger.includes(event)) return
							// 实例化校验对象，传入构造规则
							const validator = new Schema({
								[propertyName]: rule
							})
							validator.validate({
								[propertyName]: propertyVal
							}, (errors, fields) => {
								if (uni.$u.test.array(errors)) {
									errorsRes.push(...errors)
									// 取出第0个错误
									child.message = errors[0].message
								} else {
									child.message = null
								}
							})
						}
					})
					// 执行回调函数
					typeof callback === 'function' && callback(errorsRes)
				})
			},
			// 校验全部数据
			validate(callback) {
				return new Promise((resolve, reject) => {
					// $nextTick是必须的，否则model的变更，可能会延后于validate方法
					this.$nextTick(() => {
						// 获取所有form-item的prop，交给validateField方法进行校验
						const formItemProps = this.children.map(item => item.prop)
						this.validateField(formItemProps, errors => {
							errors.length ? reject(errors) : resolve(true)
						})
					})
				})
			}
		}
	}
</script>

<style lang="scss">

</style>
