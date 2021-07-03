<template>
	<uvText v-bind="$attrs" v-on="$listeners"></uvText>
</template>

<script>
	/**
	 * 此组件存在的理由是，在nvue下，u-text被uni-app官方占用了，u-text在nvue中相当于input组件
	 * 所以在nvue下，取名为u--input，内部其实还是u-iamge.nvue，只不过做一层中转
	 */
	import uvText from '../u-text/u-text.vue';
	export default {
		name: 'u--text',
		components: {
			uvText
		},
	}
</script>