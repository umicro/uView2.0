<template>
	<uvForm
		v-bind="$attrs"
		v-on="$listeners"
		ref="uForm"
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
	export default {
		name: 'u-form',
		components: {
			uvForm
		},
		mounted() {
			
		},
		methods: {
			validate() {
				return this.$refs.uForm.validate()
			},
			validateField(value, callback) {
				return this.$refs.uForm.validateField(value, callback)
			},
			resetFields() {
				return this.$refs.uForm.resetFields()
			},
			clearValidate(props) {
				return this.$refs.uForm.clearValidate(props)
			}
		},
	}
</script>
