<template>
	<view
	    class="u-tag-wrapper"
	    v-if="show"
	>
		<view
		    class="u-tag"
		    :class="[!plain && `u-tag--${type}`, plain && `u-tag--${type}--plain`, `u-tag--${size}`, plain && plainFill && `u-tag--${type}--plain--fill`]"
			@tap.stop="clickHandler"
		>
			<slot name="icon">
				<view
				    class="u-tag__icon"
				    v-if="icon"
				>
					<image
					    v-if="$u.test.image(icon)"
					    :src="icon"
					    :style="[imgStyle]"
					></image>
					<u-icon
					    v-else
					    :color="elIconColor"
					    :name="icon"
					    :size="iconSize"
					></u-icon>
				</view>
			</slot>
			<text
			    class="u-tag__text"
			    :class="[`u-tag__text--${type}`, plain && `u-tag__text--${type}--plain`, `u-tag__text--${size}`]"
			>{{ text }}</text>
		</view>
		<view
		    class="u-tag__close"
		    :class="[`u-tag__close--${size}`]"
		    v-if="closable"
		    @tap.stop="closeHandler"
		>
			<u-icon
			    name="close"
			    :size="closeSize"
			    color="#ffffff"
			></u-icon>
		</view>
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
			closeSize() {
				const size = this.size === 'large' ? 15 : this.size === 'medium' ? 13 : 12
				return size
			},
			// 图标大小
			iconSize() {
				const size = this.size === 'large' ? 21 : this.size === 'medium' ? 19 : 16
				return size
			},
			// 图标颜色
			elIconColor() {
				return this.iconColor ? this.iconColor : this.plain ? this.type : '#ffffff'
			}
		},
		methods: {
			// 点击关闭按钮
			closeHandler() {
				this.$emit('close', this.name)
			},
			// 点击标签
			clickHandler() {
				this.$emit('click', this.name)
			}
		}
	}
</script>

<style lang="scss">
	@import "../../libs/css/components.scss";

	.u-tag-wrapper {
		position: relative;
	}

	.u-tag {
		@include flex;
		align-items: center;
		border-top-left-radius: 3px;
		border-top-right-radius: 3px;
		border-bottom-left-radius: 3px;
		border-bottom-right-radius: 3px;

		&__icon {
			margin-right: 4px;
		}

		&__text {
			&--mini {
				font-size: 12px;
				line-height: 12px;
			}

			&--medium {
				font-size: 13px;
				line-height: 13px;
			}

			&--large {
				font-size: 15px;
				line-height: 15px;
			}
		}

		&--mini {
			height: 22px;
			line-height: 22px;
			padding: 0 5px;
		}

		&--medium {
			height: 26px;
			line-height: 22px;
			padding: 0 10px;
		}

		&--large {
			height: 32px;
			line-height: 32px;
			padding: 0 15px;
		}

		&--primary {
			background-color: $u-primary;
			border-width: 1px;
			border-color: $u-primary;
		}

		&--primary--plain {
			border-width: 1px;
			border-color: $u-primary;
		}

		&--primary--plain--fill {
			background-color: #ecf5ff;
		}

		&__text--primary {
			color: #FFFFFF;
		}

		&__text--primary--plain {
			color: $u-primary;
		}

		&--error {
			background-color: $u-error;
			border-width: 1px;
			border-color: $u-error;
		}

		&--error--plain {
			border-width: 1px;
			border-color: $u-error;
		}

		&--error--plain--fill {
			background-color: #fef0f0;
		}

		&__text--error {
			color: #FFFFFF;
		}

		&__text--error--plain {
			color: $u-error;
		}

		&--warning {
			background-color: $u-warning;
			border-width: 1px;
			border-color: $u-warning;
		}

		&--warning--plain {
			border-width: 1px;
			border-color: $u-warning;
		}

		&--warning--plain--fill {
			background-color: #fdf6ec;
		}

		&__text--warning {
			color: #FFFFFF;
		}

		&__text--warning--plain {
			color: $u-warning;
		}

		&--success {
			background-color: $u-success;
			border-width: 1px;
			border-color: $u-success;
		}

		&--success--plain {
			border-width: 1px;
			border-color: $u-success;
		}

		&--success--plain--fill {
			background-color: #f5fff0;
		}

		&__text--success {
			color: #FFFFFF;
		}

		&__text--success--plain {
			color: $u-success;
		}

		&__close {
			position: absolute;
			z-index: 999;
			top: 0;
			right: 0;
			border-top-left-radius: 100px;
			border-top-right-radius: 100px;
			border-bottom-left-radius: 100px;
			border-bottom-right-radius: 100px;
			background-color: #C6C7CB;
			@include flex(row);
			align-items: center;
			justify-content: center;
			/* #ifndef APP-NVUE */
			transform: scale(0.6) translate(80%, -80%);
			/* #endif */
			/* #ifdef APP-NVUE */
			transform: scale(0.6) translate(50%, -50%);
			/* #endif */

			&--mini {
				width: 18px;
				height: 18px;
			}

			&--medium {
				width: 22px;
				height: 22px;
			}

			&--large {
				width: 25px;
				height: 25px;
			}
		}

	}
</style>
