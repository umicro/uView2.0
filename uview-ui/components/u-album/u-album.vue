<template>
	<view class="u-album">
		<view
		    class="u-album__wrapper"
		    v-for="(item, index) in urls"
		    :key="index"
		>
			<image
			    :src="$u.test.object(item) ? (key && item[key] || item.url) : item"
			    :mode="urls.length === 1 ? singleMode : multipleMode"
			    @tap.stop="onPreviewTap"
			></image>
		</view>
	</view>
</template>

<script>
	import props from './props.js'
	export default {
		name: 'u-album',
		mixins: [uni.$u.mixin, props],
		data() {
			return {

			}
		},
		// 预览图片
		onPreviewTap() {

		}
	}
</script>

<style lang="scss">
	@import "../../libs/css/components.scss";

	.u-album {}
</style>
