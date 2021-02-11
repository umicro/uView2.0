<template>
	<view class="u-step-item">
		<view class="u-step-item__wrapper">
			<slot name="icon">
				<view
				    class="u-step-item__wrapper__dot"
				    v-if="dot"
				>

				</view>
				<view
				    class="u-step-item__wrapper__icon"
				    v-else-if="icon"
				>

				</view>
				<text
				    v-else
				    class="u-step-item__wrapper__text"
				>1</text>
			</slot>
		</view>
	</view>
</template>

<script>
	import props from './props.js';
	export default {
		name: 'u-steps-item',
		mixins: [uni.$u.mixin, props],
		props: {

		},
	}
</script>

<style lang="scss">
	@import "../../libs/css/components.scss";
</style>
