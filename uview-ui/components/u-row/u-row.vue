<template>
	<view
	    class="u-row"
	    :style="{
			alignItems: uAlignItem,
			justifyContent: uJustify
		}"
	    @tap="clickHandler"
	>
		<slot />
	</view>
</template>

<script>
	import props from './props.js'
	export default {
		name: "u-row",
		mixins: [uni.$u.mixin, props],
		data() {
			return {
				
			}
		},
		computed: {
			uJustify() {
				if (this.justify == 'end' || this.justify == 'start') return 'flex-' + this.justify
				else if (this.justify == 'around' || this.justify == 'between') return 'space-' + this.justify
				else return this.justify
			},
			uAlignItem() {
				if (this.align == 'top') return 'flex-start'
				if (this.align == 'bottom') return 'flex-end'
				else return this.align
			}
		},
		methods: {
			clickHandler(e) {
				this.$emit('click')
			}
		}
	}
</script>

<style lang="scss">
	@import "../../libs/css/components.scss";
</style>
