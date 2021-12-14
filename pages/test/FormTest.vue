<template>
<div>
	<u-form ref="uForm" :model="form" :rules="rules">
		<u-form-item label="姓名" prop="name">
				<u-input v-model="form.name" placeholder="请输入姓名"></u-input>
		</u-form-item>
		<u-form-item label="验证码" prop="code">
			<u-input v-model="form.code" placeholder="请输入验证码"></u-input>
		</u-form-item>
	</u-form>
	<u-button @click="onSubmit">开始测试</u-button>
</div>
</template>

<script>
import rules from './rules';
export default {
	data() {
		return {
			form: {
				name: '',
				code: ''
			},
			rules,
		}
	},
	methods: {
		async onSubmit() {
			let $form = this.$refs.uForm;
			if($form) {
				try {
					await $form.validate();
					console.log('验证通过');
				} catch(e) {
					console.warn("验证不通过");
					console.error(e)
					return;
				}
			} else {
				console.error('获取ref失败，请检查!');
			}
		}
	},
	onReady() {
		let $form = this.$refs.uForm;
		if($form) {
			$form.setRules(rules);
		} else {
			console.error('获取ref失败，请检查!');
		}
	}
}
</script>