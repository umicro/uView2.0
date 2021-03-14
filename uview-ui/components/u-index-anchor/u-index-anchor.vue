<template>
	<view
	    class="u-index-anchor u-border-bottom"
	    :id="`_${text}`"
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
</template>

<script>
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
				this.getParentData('u-index-item')
				if (!this.parent) {
					return uni.$u.error('u-index-anchor必须要搭配u-index-item组件使用')
				}
				this.parent.anchor = this
				this.parent.id = this.text
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
