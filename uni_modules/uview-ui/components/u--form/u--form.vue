<template>
	<uvForm
		ref="uForm"
		:model="model"
		:rules="rules"
		:errorType="errorType"
		:borderBottom="borderBottom"
		:labelPosition="labelPosition"
		:labelWidth="labelWidth"
		:labelAlign="labelAlign"
		:labelStyle="labelStyle"
		:customStyle="customStyle"
	>
		<slot />
	</uvForm>
</template>

<script>
	/**
	 * 此组件存在的理由是，在nvue下，u-form被uni-app官方占用了，u-form在nvue中相当于form组件
	 * 所以在nvue下，取名为u--form，内部其实还是u-form.vue，只不过做一层中转
	 */
	import uvForm from '../u-form/u-form.vue';
	import props from '../u-form/props.js'
	/**
	 * Form 表单
	 * @description 此组件一般用于表单场景，可以配置Input输入框，Select弹出框，进行表单验证等。
	 * @tutorial https://www.uviewui.com/components/form.html
	 * @property {Object}						model			当前form的需要验证字段的集合
	 * @property {Object | Function | Array}	rules			验证规则
	 * @property {String}						errorType		错误的提示方式，见上方说明 ( 默认 message )
	 * @property {Boolean}						borderBottom	是否显示表单域的下划线边框   ( 默认 true ）
	 * @property {String}						labelPosition	表单域提示文字的位置，left-左侧，top-上方 ( 默认 'left' ）
	 * @property {String | Number}				labelWidth		提示文字的宽度，单位px  ( 默认 45 ）
	 * @property {String}						labelAlign		lable字体的对齐方式   ( 默认 ‘left' ）
	 * @property {Object}						labelStyle		lable的样式，对象形式
	 * @example <u--formlabelPosition="left" :model="model1" :rules="rules" ref="form1"></u--form>
	 */
	export default {
		// #ifdef MP-WEIXIN
		name: 'u-form',
		// #endif
		// #ifndef MP-WEIXIN
		name: 'u--form',
		// #endif
		mixins: [uni.$u.mpMixin, props, uni.$u.mixin],
		components: {
			uvForm
		},
		created() {
			this.children = []
		},
		methods: {
			// 手动设置校验的规则，如果规则中有函数的话，微信小程序中会过滤掉，所以只能手动调用设置规则
			setRules(rules) {
				this.$refs.uForm.setRules(rules)
			},
			validate() {
				/**
				 * 在微信小程序中，通过this.$parent拿到的父组件是u--form，而不是其内嵌的u-form
				 * 导致在u-form组件中，拿不到对应的children数组，从而校验无效，所以这里每次调用u-form组件中的
				 * 对应方法的时候，在小程序中都先将u--form的children赋值给u-form中的children
				 */
				// #ifdef MP-WEIXIN
				this.setMpData()
				// #endif
				return this.$refs.uForm.validate()
			},
			validateField(value, callback, event) {
				// #ifdef MP-WEIXIN
				this.setMpData()
				// #endif
				return this.$refs.uForm.validateField(value, callback, event)
			},
			resetFields() {
				// #ifdef MP-WEIXIN
				this.setMpData()
				// #endif
				return this.$refs.uForm.resetFields()
			},
			clearValidate(props) {
				// #ifdef MP-WEIXIN
				this.setMpData()
				// #endif
				return this.$refs.uForm.clearValidate(props)
			},
			setMpData() {
				this.$refs.uForm.children = this.children
			}
		},
	}
</script>
