<template>
	<u-transition
	    mode="fade"
	    :show="show"
	>
		<view
		    class="u-alert"
		    :class="[`u-alert--${type}--${effect}`]"
		    @tap.stop="clickHandler"
		    :style="[customStyle]"
		>
			<view
			    class="u-alert__icon"
			    v-if="showIcon"
			>
				<u-icon
				    :name="iconName"
				    size="18"
				    :color="iconColor"
				></u-icon>
			</view>
			<view
			    class="u-alert__content"
			    :style="{
				paddingRight: closable ? '20px' : 0
			}"
			>
				<text
				    class="u-alert__content__title"
				    v-if="title"
					:style="{
						fontSize: $u.addUnit(fontSize),
						textAlign: center ? 'center' : 'left'
					}"
				    :class="[effect === 'dark' ? 'u-alert__text--dark' : `u-alert__text--${type}--light`]"
				>{{ title }}</text>
				<text
				    class="u-alert__content__desc"
					v-if="description"
					:style="{
						fontSize: $u.addUnit(fontSize),
						textAlign: center ? 'center' : 'left'
					}"
				    :class="[effect === 'dark' ? 'u-alert__text--dark' : `u-alert__text--${type}--light`]"
				>{{ description }}</text>
			</view>
			<view
			    class="u-alert__close"
			    v-if="closable"
			    @tap.stop="closeHandler"
			>
				<u-icon
				    name="close"
				    :color="iconColor"
				    size="15"
				></u-icon>
			</view>
		</view>
	</u-transition>
</template>

<script>
	import props from './props'
	export default {
		name: 'u-alert',
		mixins: [uni.$u.mixin, props],
		data() {
			return {
				show: true
			}
		},
		computed: {
			iconColor() {
				return this.effect === 'light' ? this.type : '#fff'
			},
			// 不同主题对应不同的图标
			iconName() {
				switch (this.type) {
					case 'success':
						return 'checkmark-circle-fill';
						break;
					case 'error':
						return 'close-circle-fill';
						break;
					case 'warning':
						return 'error-circle-fill';
						break;
					case 'info':
						return 'info-circle-fill';
						break;
					case 'primary':
						return 'more-circle-fill';
						break;
					default: 
						return 'error-circle-fill';
				}
			}
		},
		methods: {
			// 点击内容
			clickHandler() {
				this.$emit('click')
			},
			// 点击关闭按钮
			closeHandler() {
				this.show = false
			}
		}
	}
</script>

<style lang="scss">
	@import "../../libs/css/components.scss";

	.u-alert {
		position: relative;
		background-color: $u-primary;
		padding: 8px 10px;
		@include flex(row);
		align-items: center;
		border-top-left-radius: 4px;
		border-top-right-radius: 4px;
		border-bottom-left-radius: 4px;
		border-bottom-right-radius: 4px;

		&--primary--dark {
			background-color: $u-primary;
		}

		&--primary--light {
			background-color: #ecf5ff;
		}

		&--error--dark {
			background-color: $u-error;
		}

		&--error--light {
			background-color: #FEF0F0;
		}

		&--success--dark {
			background-color: $u-success;
		}

		&--success--light {
			background-color: #f5fff0;
		}

		&--warning--dark {
			background-color: $u-warning;
		}

		&--warning--light {
			background-color: #FDF6EC;
		}

		&--info--dark {
			background-color: $u-info;
		}

		&--info--light {
			background-color: #f4f4f5;
		}

		&__icon {
			margin-right: 5px;
		}

		&__content {
			@include flex(column);
			flex: 1;

			&__title {
				color: $u-main-color;
				font-size: 14px;
				font-weight: bold;
				color: #fff;
				margin-bottom: 2px;
			}

			&__desc {
				color: $u-main-color;
				font-size: 14px;
				flex-wrap: wrap;
				color: #fff;
			}
		}

		&__title--dark,
		&__desc--dark {
			color: #FFFFFF;
		}

		&__text--primary--light,
		&__text--primary--light {
			color: $u-primary;
		}

		&__text--success--light,
		&__text--success--light {
			color: $u-success;
		}

		&__text--warning--light,
		&__text--warning--light {
			color: $u-warning;
		}

		&__text--error--light,
		&__text--error--light {
			color: $u-error;
		}

		&__text--info--light,
		&__text--info--light {
			color: $u-info;
		}

		&__close {
			position: absolute;
			top: 11px;
			right: 10px;
		}
	}
</style>
