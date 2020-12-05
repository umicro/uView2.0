<template>
	<view class="u-radio-group u-radio-group--{{placement}}">
	    <slot></slot>
	</view>
</template>

<script>
	export default {
		props: {
			value: {
				type: [String, Number],
				default: ''
			},
			disabled: {
				type: Boolean,
				default: false
			},
			name: {
				type: String,
				default: ''
			}
		},
		data() {
			return {
				
			}
		},
		methods: {
			
		}
	}
</script>

<style lang="scss">
	@import "../../libs/css/components.scss";
	
	.u-radio-group {
	    width: 100%
	}
	
	.u-radio-group--row {
	    @include flex;
	}
	
	.u-radio-group--column {
	    @include flex(column)
	}
</style>
