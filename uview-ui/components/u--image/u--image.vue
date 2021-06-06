<template>
	<uvImage v-bind="$attrs" v-on="$listeners"></uvImage>
</template>

<script>
	import uvImage from '../u-image/u-image.vue';
	export default {
		name: 'u--image',
		components: {
			uvImage
		},
	}
</script>

<style>
</style>
