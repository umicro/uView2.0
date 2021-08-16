<template>
	<swiper-item>
		<slot />
	</swiper-item>
</template>

<script>
	import props from './props.js';
	export default {
		name: 'u-tabs-item',
		mixins: [uni.$u.mixin,props],
		data() {
			return {
				
			}
		}
	}
</script>

<style>
</style>
