<template>
	<u-popup
		:show="show"
		@close="closeHandler"
	>
		<view class="u-picker">
			<u-toolbar></u-toolbar>
			<picker-view
				class="u-picker__view"
				:style="{
					height: `${visibleItemCount * itemHeight}px`
				}"
			>
				<picker-view-column
					class="u-picker__view__column"
					v-for="(item, index) in columns"
					:key="index"
				>
					<text
						class="u-picker__view__column__item"
						v-for="(item1, index1) in item"
						:key="index1"
					>{{ item }}</text>
				</picker-view-column>
			</picker-view>
			<view
				class="u-picker--loading"
				v-if="loading"
			>
				<u-loading-icon></u-loading-icon>
			</view>
		</view>
	</u-popup>
</template>

<script>
	import props from './props.js'
	export default {
		name: 'u-picker',
		mixins: [uni.$u.mixin, props],
		data() {
			return {

			}
		},
		methods: {
			// 关闭选择器
			closeHandler() {
				if (this.closeOnClickOverly) {
					this.$emit('close')
				}
			}
		},
	}
</script>

<style lang="scss">
	@import "../../libs/css/components.scss";

	.u-picker {
		position: relative;

		&__view {

			&__column {
				flex: 1;
				justify-content: center;

				&__item {
					@include flex;
					justify-content: center;
					align-items: center;
					font-size: 16px;
					line-height: 16px;
				}
			}
		}

		&--loading {
			position: absolute;
			top: 0;
			right: 0;
			left: 0;
			bottom: 0;
			@include flex;
			justify-content: center;
			align-items: center;
		}
	}
</style>
