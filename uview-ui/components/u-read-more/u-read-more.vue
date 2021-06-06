<template>
	<view class="u-read-more">
		<view
		    class="u-read-more__content"
		    :style="{
				height: isLongContent && status === 'close' ? $u.addUnit(showHeight) : $u.addUnit(contentHeight),
				textIndent: textIndent
			}"
		>
			<view
			    class="u-read-more__content__inner"
			    ref="u-read-more__content__inner"
			    :class="[elId]"
			>
				<slot></slot>
			</view>
		</view>
		<view
		    class="u-read-more__toggle"
		    :style="[innerShadowStyle]"
		    v-if="isLongContent"
		>
			<slot name="toggle">
				<view
				    class="u-read-more__toggle__text"
				    @tap="toggleReadMore"
				>
					<u--text
					    :text="status === 'close' ? closeText : openText"
					    :color="color"
					    :size="fontSize"
					    :lineHeight="fontSize"
					    margin="0 5px 0 0"
					></u--text>
					<view class="u-read-more__toggle__icon">
						<u-icon
						    :color="color"
						    :size="fontSize + 2"
						    :name="status === 'close' ? 'arrow-down' : 'arrow-up'"
						></u-icon>
					</view>
				</view>
			</slot>
		</view>
	</view>
</template>

<script>
	// #ifdef APP-NVUE
	const dom = uni.requireNativePlugin('dom')
	// #endif
	import props from './props.js'
	export default {
		name: 'u-read-more',
		mixins: [uni.$u.mixin, props],
		data() {
			return {
				isLongContent: false, // 是否需要隐藏一部分内容
				status: 'close', // 当前隐藏与显示的状态，close-收起状态，open-展开状态
				elId: uni.$u.guid(), // 生成唯一class
				contentHeight: 100, // 内容高度
			}
		},
		computed: {
			// 展开后无需阴影，收起时才需要阴影样式
			innerShadowStyle() {
				if (this.status === 'open') return {};
				else return this.shadowStyle
			}
		},
		mounted() {
			this.init()
		},
		methods: {
			async init() {
				this.getContentHeight().then(height => {
					this.contentHeight = height
					// 判断高度，如果真实内容高度大于占位高度，则显示收起与展开的控制按钮
					if (height > uni.$u.getPx(this.showHeight)) {
						this.isLongContent = true
						this.status = 'close'
					}
				})
			},
			// 获取内容的高度
			async getContentHeight() {
				// 延时一定时间再获取节点
				await uni.$u.sleep(30)
				return new Promise(resolve => {
					// #ifndef APP-NVUE
					this.$uGetRect('.' + this.elId).then(res => {
						resolve(res.height)
					})
					// #endif

					// #ifdef APP-NVUE
					const ref = this.$refs['u-read-more__content__inner']
					dom.getComponentRect(ref, (res) => {
						resolve(res.size.height)
					})
					// #endif
				})
			},
			// 展开或者收起
			toggleReadMore() {
				this.status = this.status === 'close' ? 'open' : 'close';
				// 如果toggle为false，隐藏"收起"部分的内容
				if (this.toggle == false) this.isLongContent = false;
				// 发出打开或者收齐的事件
				this.$emit(this.showMore ? 'open' : 'close', this.index);
			}
		},
	}
</script>

<style lang="scss">
	@import "../../libs/css/components.scss";

	.u-read-more {

		&__content {
			overflow: hidden;
			color: $u-content-color;
			font-size: 15px;
			text-align: left;
		}

		&__toggle {
			@include flex;
			justify-content: center;

			&__text {
				@include flex;
				align-items: center;
				justify-content: center;
				margin-top: 5px;
			}
		}
	}
</style>
