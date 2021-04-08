<template>
	<view class="u-calendar-header">
		<text class="u-calendar-header__title">{{ title }}</text>
		<text class="u-calendar-header__subtitle">{{ subtitle }}</text>
		<view class="u-calendar-header__weekdays">
			<text class="u-calendar-header__weekday">一</text>
			<text class="u-calendar-header__weekday">二</text>
			<text class="u-calendar-header__weekday">三</text>
			<text class="u-calendar-header__weekday">四</text>
			<text class="u-calendar-header__weekday">五</text>
			<text class="u-calendar-header__weekday">六</text>
			<text class="u-calendar-header__weekday">日</text>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'u-calendar-header',
		mixins: [uni.$u.mixin],
		props: {
			// 标题
			title: {
				type: String,
				default: ''
			},
			// 副标题
			subtitle: {
				type: String,
				default: ''
			},
			// 是否显示先标题
			showTitle: {
				type: Boolean,
				default: true
			},
			// 是否显示先标题
			showTitle: {
				type: Boolean,
				default: true
			},
		},
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
	@import "../../libs/css/components.scss";
	
	.u-calendar-header {
		
		&__title {
			font-size: 16px;
			color: $u-main-color;
		}
		
		&__subtitle {
			font-size: 14px;
			color: $u-content-color;
		}
		
		&__weekdays {
			@include flex;
			
			&__weekday {
				font-size: 14px;
				color: $u-main-color;
				justify-content: space-between;
			}
		}
	}
</style>
