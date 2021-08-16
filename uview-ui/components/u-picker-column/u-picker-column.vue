<template>
	<picker-view-column>
		<view class="u-picker-column">

		</view>
	</picker-view-column>
</template>

<script>
	import props from './props.js'
	export default {
		name: 'u-picker-column',
		mixins: [uni.$u.mixin,props],
	}
</script>

<style lang="scss">
	@import "../../libs/css/components.scss";
</style>
