<template>
	<view
		class="u-swipe-action-item"
		ref="u-swipe-action-item"
	>
		<!-- #ifdef APP-VUE || MP-WEIXIN || H5 || MP-QQ -->
		<view
			class="u-swipe-action-item__content"
			@touchstart="wxs.touchstart"
			@touchmove="wxs.touchmove"
			@touchend="wxs.touchend"
			:show="show"
			:change:show="wxs.showChange"
			:size="size"
			:change:size="wxs.sizeChange"
		>
			<!-- #endif -->
			<!-- #ifdef APP-NVUE -->
			<view
				class="u-swipe-action-item__content"
				ref="u-swipe-action-item__content"
				@touchstart="touchstart"
				@touchmove="touchmove"
				@touchend="touchend"
			>
				<!-- #endif -->
				<slot />
			</view>
			<view class="u-swipe-action-item__right">
				<slot name="button">
					<view
						v-for="(item,index) in rightOptions"
						:key="index"
						class="u-swipe-action-item__right__button"
						:ref="`u-swipe-action-item__right__button-${index}`"
						:style="[{
							alignItems: item.style && item.style.borderRadius ? 'center' : 'stretch'
						}]"
					>
						<view
							class="u-swipe-action-item__right__button__wrapper"
							:style="[{
								backgroundColor: item.style && item.style.backgroundColor ? item.style.backgroundColor : '#C7C6CD',
								borderRadius: item.style && item.style.borderRadius ? item.style.borderRadius : '0',
								padding: item.style && item.style.borderRadius ? '0' : '0 15px',
							}, item.style]"
						>
							<u-icon
								v-if="item.icon"
								:name="item.icon"
								:color="item.style && item.style.color ? item.style.color : '#ffffff'"
								:size="item.iconSize ? $u.addUnit(item.iconSize) : item.style && item.style.fontSize ? $u.getPx(item.style.fontSize) * 1.2 : 17"
								:customStyle="{
									marginRight: item.text ? '2px' : 0
								}"
							></u-icon>
							<text
								v-if="item.text"
								class="u-swipe-action-item__right__button__wrapper__text u-line-1"
								:style="[{
									color: item.style && item.style.color ? item.style.color : '#ffffff',
									fontSize: item.style && item.style.fontSize ? item.style.fontSize : '16px',
									lineHeight: item.style && item.style.fontSize ? item.style.fontSize : '16px',
								}]"
							>{{ item.text }}</text>
						</view>
					</view>
				</slot>
			</view>
		</view>
</template>
<!-- #ifdef APP-VUE || MP-WEIXIN || H5 || MP-QQ -->
<script
	src="./index.wxs"
	module="wxs"
	lang="wxs"
></script>
<!-- #endif -->
<script>
	import props from './props.js';
	// #ifdef APP-NVUE
	import nvue from './nvue.js';
	// #endif
	export default {
		name: 'u-swipe-action-item',
		inject: ['swipeAction'],
		mixins: [uni.$u.mixin, props],
		// #ifdef APP-NVUE
		mixins: [uni.$u.mixin, props, nvue],
		// #endif
		data() {
			return {
				// 按钮的尺寸信息
				size: null,
			}
		},
		watch: {
			// 由于wxs无法直接读取外部的值，需要在外部值变化时，重新执行赋值逻辑
			wxsInit(newValue, oldValue) {
				this.queryRect()
			}
		},
		computed: {
			wxsInit() {
				return [this.disabled, this.autoClose, this.threshold, this.rightOptions, this.duration]
			}
		},
		mounted() {
			this.init()
		},
		methods: {
			init() {
				// #ifndef APP-NVUE
				this.queryRect()
				// #endif
				this.getParentData('u-swipe-action')
			},
			// #ifndef APP-NVUE
			// 查询节点
			queryRect() {
				this.$uGetRect('.u-swipe-action-item__right__button', true).then(buttons => {
					this.size = {
						buttons,
						show: this.show,
						disabled: this.disabled,
						threshold: this.threshold,
						duration: this.duration
					}
				})
			},
			// #endif
			// 打开时执行
			openHandler() {
				if (this.parent) {
					this.parent.closeOther(this)
				}
			},
			// 关闭时执行
			closeHandler() {
				this.$emit('close', {
					index: this.index
				})
			},
			statusHandler({
				status
			}) {
				console.log(111, status);
			}
		},
	}
</script>

<style lang="scss">
	@import "../../libs/css/components.scss";

	.u-swipe-action-item {
		position: relative;
		overflow: hidden;
		/* #ifndef APP-NVUE */
		touch-action: none;
		/* #endif */

		&__right {
			position: absolute;
			top: 0;
			bottom: 0;
			right: 0;
			transform: translateX(100%);

			&__button {
				@include flex;
				position: absolute;
				top: 0;
				bottom: 0;
				justify-content: center;
				overflow: hidden;
				align-items: center;

				&__wrapper {
					@include flex;
					align-items: center;
					justify-content: center;
					padding: 0 15px;

					&__text {
						@include flex;
						align-items: center;
						color: #FFFFFF;
						font-size: 15px;
						text-align: center;
						justify-content: center;
					}
				}
			}
		}
	}
</style>
