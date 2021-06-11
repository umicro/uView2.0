<template>
	<uvInput v-bind="$attrs" v-on="$listeners"></uvInput>
</template>

<script>
	/**
	 * 此组件存在的理由是，在nvue下，u-input被uni-app官方占用了，u-input在nvue中想当然input组件
	 * 所以在nvue下，取名为u--input，内部其实还是u-iamge.nvue，只不过做一层中转
	 */
	import uvInput from '../u-input/u-input.vue';
	export default {
		name: 'u--input',
		components: {
			uvInput
		},
	}
</script>