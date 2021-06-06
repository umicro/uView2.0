<template>
	<uvImage v-bind="$attrs" v-on="$listeners"></uvImage>
</template>

<script>
	/**
	 * 此组件存在的理由是，在nvue下，u-image被uni-app官方占用了，u-image在nvue中想当然image组件
	 * 所以在nvue下，取名为u--image，内部其实还是u-iamge.nvue，只不过做一层中转
	 */
	import uvImage from '../u-image/u-image.vue';
	export default {
		name: 'u--image',
		components: {
			uvImage
		},
	}
</script>