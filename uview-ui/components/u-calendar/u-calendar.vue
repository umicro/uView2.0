<template>
	<view class="u-calendar">
		<uHeader
			:title="title"
			:subtitle="subtitle"
			:showSubtitle="showSubtitle"
			:showTitle="showTitle"
		></uHeader>
		<uMonth
			:color="color"
			:rowHeight="rowHeight"
			:showMark="showMark"
		></uMonth>
	</view>
</template>

<script>
	import uHeader from './header.vue';
	import uMonth from './month.vue';
	import props from './props.js';
	export default {
		name: 'u-calendar',
		mixins: [uni.$u.mixin, props],
		components: {
			uHeader,
			uMonth
		},
		data() {
			return {
				// 副标题，用于显示年月
				subtitle: '2020年4月'
			}
		},
		methods: {
			name() {

			}
		},
	}
</script>

<style lang="scss">
	@import "../../libs/css/components.scss";
</style>
