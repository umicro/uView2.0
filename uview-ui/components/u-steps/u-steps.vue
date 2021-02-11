<template>
	<view
	    class="u-steps"
	    :class="`u-steps--${direction}`"
	>
		<slot></slot>
	</view>
</template>

<script>
	import props from './props.js';
	export default {
		name: 'u-step',
		mixins: [uni.$u.mixin, props],
		props: {

		},
		data() {
			return {
				
			}
		},
		watch: {
			
		},
		computed: {
			
		},
		methods: {
			                                                       
		}
	}
</script>

<style lang="scss">
	@import "../../libs/css/components.scss";

	.u-steps {
		@include flex(row);

		&--column {
			flex-direction: column
		}

		&--row {
			flex-direction: row;
		}
	}
</style>
