<template>
	<view
	    class="u-avatar"
	    :class="[`u-avatar--${shape}`]"
	    :style="{
		backgroundColor: bgColor,
		width: $u.addUnit(size),
		height: $u.addUnit(size)
	}"
	>
		<slot>
			<open-data
			    v-if="mpAvatar"
			    type="userAvatarUrl"
			/>
			<u-icon
			    v-else-if="icon"
			    :name="icon"
			    :size="fontSize"
			    :color="color"
			></u-icon>
			<u--text
			    v-else-if="text"
			    :text="text"
			    :size="fontSize"
			    :color="color"
			></u--text>
			<image
			    class="u-avatar__image"
			    v-else
			    :class="[`u-avatar__image--${shape}`]"
			    :src="src"
			    :mode="mode"
			    :style="{
					width: $u.addUnit(size),
					height: $u.addUnit(size)
				}"
			></image>
		</slot>
	</view>
</template>

<script>
	import props from './props.js'
	export default {
		name: 'u-avatar',
		mixins: [uni.$u.mixin, props],
		data() {
			return {

			}
		},
		computed: {
			imageStyle() {
				const style = {}

			}
		},
		methods: {
			// 判断传入的name属性，是否图片路径，只要带有"/"均认为是图片形式
			isImg() {
				return this.src.indexOf('/') !== -1
			},
		}
	}
</script>

<style lang="scss">
	@import "../../libs/css/components.scss";

	.u-avatar {
		@include flex;
		align-items: center;
		justify-content: center;

		&--circle {
			border-radius: 100px;
		}

		&--square {
			border-radius: 4px;
		}

		&__image {
			&--circle {
				border-radius: 100px;
			}

			&--square {
				border-radius: 4px;
			}
		}
	}
</style>
