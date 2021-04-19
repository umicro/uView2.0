<template>
	<u-picker
		:show="show"
		:closeOnClickOverly="closeOnClickOverly"
	>
	</u-picker>
</template>

<script>
	import props from './props.js'
	export default {
		name: 'datetime-picker',
		mixins: [uni.$u.mixin, props],
		data() {
			return {

			}
		},
		methods: {
			name() {

			}
		},
	}
</script>

<style lang="scss">
	@import '../../libs/css/components.scss';
	
	
</style>
