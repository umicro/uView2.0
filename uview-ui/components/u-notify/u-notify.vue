<template>
	<u-transition
	    mode="slide-down"
	    :customStyle="{
		top: $u.addUnit(top)
	}"
	    :show="show"
	>
		<view class="u-notify" :style="{
			backgroundColor: bgColor
		}">
			<text
			    class="u-notify__text"
			    :style="{
					fontSize: $u.addUnit(fontSize),
					color: color
				}"
			>{{ message }}</text>
		</view>
	</u-transition>
</template>

<script>
	import props from './props.js'
	export default {
		name: 'u-notify',
		mixins: [uni.$u.mixin, props],
		data() {
			return {

			}
		},
		methods: {
			
		}
	}
</script>

<style lang="scss">
	.u-notify {}
</style>
