<template>
	<u-transition
	    mode="fade"
	    :customStyle="backTopStyle"
	    :show="show"
	>
		<view
		    class="u-back-top"
			:style="contentStyle"
		    v-if="!$slots.default && !$slots.$default"
			@click="backToTop"
		>
			<u-icon
			    :name="icon"
			    :custom-style="iconStyle"
			></u-icon>
			<text
			    v-if="text"
			    class="u-back-top__text"
			>{{text}}</text>
		</view>
		<slot v-else />
	</u-transition>
</template>

<script>
	// #ifdef APP-NVUE
	const dom = weex.requireModule('dom')
	// #endif
	/**
	 * backTop 返回顶部
	 * @description 本组件一个用于长页面，滑动一定距离后，出现返回顶部按钮，方便快速返回顶部的场景。
	 * @tutorial https://uviewui.com/components/backTop.html
	 * @property {String} mode  返回顶部的形状，circle-圆形，square-方形 （默认circle）
	 * @property {String} icon  自定义图标 （默认 arrow-upward） 见官方文档示例
	 * @property {String} text  提示文字 
	 * @property {Number | String}  duration  返回顶部滚动时间 （默认 100）
	 * @property {Number | String}  scrollTop  滚动距离 （默认 0）
	 * @property {Number | String}  top  距离顶部多少距离显示，单位rpx （默认 400）
	 * @property {Number | String}  bottom  返回顶部按钮到底部的距离，单位rpx （默认 100）
	 * @property {Number | String}  right  返回顶部按钮到右边的距离，单位rpx （默认 20）
	 * @property {Number | String}  zIndex 层级   （默认 9）
	 * @property {Object<Object>}  iconStyle 图标的样式，对象形式   （默认 {color: '#909399',fontSize: '19px'}）
	 * @property {Object} customStyle  定义需要用到的外部样式
	 * @example <u-back-top :scrollTop="scrollTop"></u-back-top>
	 */
	export default {
		name: 'u-back-top',
		props: {
			// 返回顶部的形状，circle-圆形，square-方形
			mode: {
				type: String,
				default: uni.$u.props.backtop.mode
			},
			// 自定义图标
			icon: {
				type: String,
				default: uni.$u.props.backtop.icon
			},
			// 提示文字
			text: {
				type: String,
				default: uni.$u.props.backtop.text
			},
			// 返回顶部滚动时间
			duration: {
				type: [Number, String],
				default: uni.$u.props.backtop.duration
			},
			// 滚动距离
			scrollTop: {
				type: [Number, String],
				default: uni.$u.props.backtop.scrollTop
			},
			// 距离顶部多少距离显示，单位rpx
			top: {
				type: [Number, String],
				default: uni.$u.props.backtop.top
			},
			// 返回顶部按钮到底部的距离，单位rpx
			bottom: {
				type: [Number, String],
				default: uni.$u.props.backtop.bottom
			},
			// 返回顶部按钮到右边的距离，单位rpx
			right: {
				type: [Number, String],
				default: uni.$u.props.backtop.right
			},
			// 层级
			zIndex: {
				type: [Number, String],
				default: uni.$u.props.backtop.zIndex
			},
			// 图标的样式，对象形式
			iconStyle: {
				type: Object,
				default: uni.$u.props.backtop.iconStyle
			},
		},
		mixins: [uni.$u.mixin],
		computed: {
			backTopStyle() {
				// 动画组件样式
				const style = {
					bottom: uni.$u.addUnit(this.bottom),
					right: uni.$u.addUnit(this.right),
					width: '40px',
					height: '40px',
					position: 'fixed',
					zIndex: 10,
				}
				return style
			},
			show() {
				let top
				// 如果是rpx，转为px
				if (/rpx$/.test(this.top)) {
					top = uni.rpx2px(parseInt(this.top))
				} else {
					// 如果px，通过parseInt获取其数值部分
					top = parseInt(this.top)
				}
				return this.scrollTop > top
			},
			contentStyle() {
				const style = {}
				let radius = 0
				// 是否圆形
				if(this.mode === 'circle') {
					radius = '100px'
				} else {
					radius = '4px'
				}
				// 为了兼容安卓nvue，只能这么分开写
				style.borderTopLeftRadius = radius
				style.borderTopRightRadius = radius
				style.borderBottomLeftRadius = radius
				style.borderBottomRightRadius = radius
				return uni.$u.deepMerge(style, uni.$u.addStyle(this.customStyle))
			}
		},
		methods: {
			backToTop() {
				// #ifdef APP-NVUE
				if (!this.$parent.$refs['u-back-top']) {
					uni.$u.error(`nvue页面需要给页面最外层元素设置"ref='u-back-top'`)
				}
				dom.scrollToElement(this.$parent.$refs['u-back-top'], {
					offset: 0
				})
				// #endif
				
				// #ifndef APP-NVUE
				uni.pageScrollTo({
					scrollTop: 0,
					duration: this.duration
				});
				// #endif
			}
		}
	}
</script>

<style lang="scss">
	@import '../../libs/css/components.scss';
     $u-back-top-flex:1 !default;
     $u-back-top-height:100% !default;
     $u-back-top-background-color:#E1E1E1 !default;
     $u-back-top-tips-font-size:12px !default;
	.u-back-top {
		@include flex;
		flex-direction: column;
		align-items: center;
		flex:$u-back-top-flex;
		height: $u-back-top-height;
		justify-content: center;
		background-color: $u-back-top-background-color;

		&__tips {
			font-size:$u-back-top-tips-font-size;
			transform: scale(0.8);
		}
	}
</style>
