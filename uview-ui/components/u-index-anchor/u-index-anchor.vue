<template>
	<!-- #ifdef APP-NVUE -->
	<header>
	<!-- #endif -->
	<view
	    class="u-index-anchor u-border-bottom"
	    :id="`u-list-item-${text}`"
		:ref="`u-list-item-${text}`"
	    :style="{
			height: $u.addUnit(height),
			backgroundColor: bgColor
		}"
	>
		<text
		    class="u-index-anchor__text"
		    :style="{
				fontSize: $u.addUnit(size),
				color: color
			}"
		>{{ text }}</text>
	</view>
	<!-- #ifdef APP-NVUE -->
	</header>
	<!-- #endif -->
</template>

<script>
	// #ifdef APP-NVUE
	const dom = uni.requireNativePlugin('dom')
	// #endif
	export default {
		name: 'u-index-anchor',
		mixins: [uni.$u.mixin],
		props: {
			text: {
				type: [String, Number],
				default: ''
			},
			// color: {
			// 	type: String,
			// 	default: '#606266'
			// },
			size: {
				type: [String, Number],
				default: 14
			},
			// bgColor: {
			// 	type: String,
			// 	default: '#dedede'
			// },
			height: {
				type: [String, Number],
				default: 32
			}
		},
		data() {
			return {
				bgColor: '#dedede',
				color: '#606266'
			}
		},
		created() {
			this.init()
			
		},
		methods: {
			init() {
				// 此处会活动父组件实例，并赋值给实例的parent属性
				this.parent = uni.$u.$parent.call(this, 'u-list')
				if (!this.parent) { 
					return uni.$u.error('u-index-anchor必须要搭配u-index-list组件使用')
				}
				this.parent.anchors.push(this)
				this.parent.id = this.text
				this.parent.refs.push(this)
			}
		},
	}
</script>

<style lang="scss">
	@import "../../libs/css/components.scss";

	.u-index-anchor {
		position: sticky;
		top: 0;
		@include flex;
		align-items: center;
		padding-left: 15px;
		z-index: 1;

		&__text {
			@include flex;
			align-items: center;
		}
	}
</style>
