<template>
	<uvTextarea v-bind="$attrs" v-on="$listeners"></uvTextarea>
</template>

<script>
	/**
	 * 此组件存在的理由是，在nvue下，u--textarea被uni-app官方占用了，u-textarea在nvue中相当于textarea组件
	 * 所以在nvue下，取名为u--textarea，内部其实还是u-textarea.vue，只不过做一层中转
	 */
	import uvTextarea from '../u-textarea/u-textarea.vue';
	export default {
		name: 'u--textarea',
		components: {
			uvTextarea
		},
	}
</script>