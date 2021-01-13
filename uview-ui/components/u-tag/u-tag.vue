<template>
	<view class="u-tag">
		<slot name="icon">
			<view class="u-tag__icon" v-if="icon">
				<image v-if="$u.test.image(icon)" :src="icon" :style="[imgStyle]"></image>
				<u-icon v-else :name="icon"></u-icon>
			</view>
		</slot>
		<text class="u-tag__text" :style="[textStyle]">{{ text }}</text>
	</view>
</template>

<script>
	import props from './props.js'
	export default {
		name: 'u-tag',
		mixins: [uni.$u.mixin, props],
		data() {
			return {
				
			}
		},
		computed: {
			imgStyle() {
				const width = this.size === 'large' ? '17px' : this.size === 'medium' ? '15px' : '13px'
				return {
					width, 
					height: width
				}
			},
			// 文本的样式
			textStyle() {
				const size = this.size === 'large' ? '15px' : this.size === 'medium' ? '14px' : '13px'
				return {
					fontSize: size
				}
			}
		},
		methods: {
			
		}
	}
</script>

<style lang="scss" scoped>
	@import "../../libs/css/components.scss";
	
	.u-tag {
		@include flex;
		align-items: center;
		// justify-content: center;
		padding: 4px 5px;
		background-color: #ecf5ff;
		border-color: #3C9CFF;
		border-width: 1px;
		
		&__icon {
			margin-right: 3px;
		}
		
		&__text {
			font-size: 14px;
			// color: $u-content-color;
			color: #3C9CFF;
			// line-height: 14px;
		}
	}
</style>
