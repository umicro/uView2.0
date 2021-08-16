<template>
	<view class="u-avatar-group">
		<view
		    class="u-avatar-group__item"
		    v-for="(item, index) in showUrl"
		    :key="index"
		    :style="{
				marginLeft: index === 0 ? 0 : $u.addUnit(-size * gap)
			}"
		>
			<u-avatar
			    :size="size"
			    :shape="shape"
			    :mode="mode"
			    :src="$u.test.object(item) ? keyName && item[keyName] || item.url : item"
			></u-avatar>
			<view
			    class="u-avatar-group__item__show-more"
			    v-if="showMore && index === showUrl.length - 1 && urls.length > maxCount"
				@tap="clickHandler"
			>
				<u--text
				    color="#ffffff"
				    :size="size * 0.4"
				    :text="`+${urls.length - showUrl.length}`"
					align="center"
					customStyle="justify-content: center"
				></u--text>
			</view>
		</view>
	</view>
</template>

<script>
	import props from './props.js';
	export default {
		name: 'u-avatar-group',
		mixins: [uni.$u.mixin, props],
		data() {
			return {

			}
		},
		computed: {
			showUrl() {
				return this.urls.slice(0, this.maxCount)
			}
		},
		methods: {
			clickHandler() {
				this.$emit('showMore')
			}
		},
	}
</script>

<style lang="scss">
	@import "../../libs/css/components.scss";

	.u-avatar-group {
		@include flex;

		&__item {
			margin-left: -10px;
			position: relative;

			&--no-indent {
				// 如果你想质疑作者不会使用:first-child，说明你太年轻，因为nvue不支持
				margin-left: 0;
			}

			&__show-more {
				position: absolute;
				top: 0;
				bottom: 0;
				left: 0;
				right: 0;
				background-color: rgba(0, 0, 0, 0.3);
				@include flex;
				align-items: center;
				justify-content: center;
				border-radius: 100px;
			}
		}
	}
</style>
