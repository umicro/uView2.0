<template>
	<view class="u-modal">
		<u-popup mode="center" :show="show">
			<view>
				123
			</view>
		</u-popup>
	</view>
</template>

<script>
	export default {
		name: 'u-modal',
		mixins: [uni.$u.mixin],
		data() {
			return {
				show: true
			}
		}
	}
</script>

<style lang="scss">
	@import "../../libs/css/components.scss";
	
	
</style>
