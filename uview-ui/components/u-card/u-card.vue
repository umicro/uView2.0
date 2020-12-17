<template>
	<view
	    class="u-card"
	    @tap.stop="click"
	    :class="{ 'u-border': border, 'u-card-full': full, 'u-card--border': borderRadius > 0 }"
	    :style="[cardStyle]"
	>
		<view
		    v-if="showHead"
		    class="u-card__head"
		    :style="[{padding: $u.addUnit(padding)}, headStyle]"
		    :class="{
				'u-border-bottom': headBorderBottom
			}"
		    @tap="headClick"
		>
			<slot name="head">
				<view
				    class="u-card__head--left u-line-1"
				    v-if="title"
				>
					<image
					    :src="thumb"
					    class="u-card__head--left__thumb"
					    mode="aspectfull"
					    v-if="thumb"
					    :style="{ 
							height: $u.addUnit(thumbWidth), 
							width: $u.addUnit(thumbWidth), 
							borderRadius: $u.addUnit(thumbCircle) ? '100rpx' : '6rpx' 
						}"
					></image>
					<text
					    class="u-card__head--left__title u-line-1"
					    :style="{
							fontSize: titleSize + 'rpx',
							color: titleColor
						}"
					>{{ title }}</text>
				</view>
				<view
				    class="u-card__head--right u-line-1"
				    v-if="subTitle"
				>
					<text
					    class="u-card__head__title__text"
					    :style="{
							fontSize: subTitleSize + 'rpx',
							color: subTitleColor
						}"
					>{{ subTitle }}</text>
				</view>
			</slot>
		</view>
		<view
		    @tap="bodyClick"
		    class="u-card__body"
		    :style="[bodyStyle]"
		>
			<slot name="body" />
		</view>
		<view
		    v-if="showFoot"
		    class="u-card__foot"
		    @tap="footClick"
		    :style="[{padding: $slots.foot ?  $u.addUnit(padding) : 0}, footStyle]"
		    :class="{
				'u-border-top': footBorderTop
			}"
		>
			<slot name="foot" />
		</view>
	</view>
</template>

<script>
	/**
	 * card 卡片
	 * @description 卡片组件一般用于多个列表条目，且风格统一的场景
	 * @tutorial https://www.uviewui.com/components/card.html
	 * @property {Boolean} full 卡片与屏幕两侧是否留空隙（默认false）
	 * @property {String} title 头部左边的标题
	 * @property {String} titleColor 标题颜色（默认#303133）
	 * @property {String | Number} titleSize 标题字体大小，单位rpx（默认30）
	 * @property {String} subTitle 头部右边的副标题
	 * @property {String} subTitleColor 副标题颜色（默认#909399）
	 * @property {String | Number} subTitleSize 副标题字体大小（默认26）
	 * @property {Boolean} border 是否显示边框（默认true）
	 * @property {String | Number} index 用于标识点击了第几个卡片
	 * @property {String} margin 卡片与屏幕两边和上下元素的间距，需带单位，如"30rpx 20rpx"（默认30rpx）
	 * @property {String | Number} borderRadius 卡片整体的圆角值，单位rpx（默认16）
	 * @property {Object} headStyle 头部自定义样式，对象形式
	 * @property {Object} bodyStyle 中部自定义样式，对象形式
	 * @property {Object} footStyle 底部自定义样式，对象形式
	 * @property {Boolean} headBorderBottom 是否显示头部的下边框（默认true）
	 * @property {Boolean} footBorderTop 是否显示底部的上边框（默认true）
	 * @property {String} thumb 缩略图路径，如设置将显示在标题的左边，不建议使用相对路径
	 * @property {String | Number} thumbWidth 缩略图的宽度，高等于宽，单位rpx（默认60）
	 * @property {Boolean} thumbCircle 缩略图是否为圆形（默认false）
	 * @property {String Number} padding 给head，foot的内边距（默认24）
	 * @property {Boolean} showHead 是否显示头部（默认true）
	 * @property {Boolean} showFoot 是否显示尾部（默认true）
	 * @property {String} boxShadow 卡片外围阴影，字符串形式（默认rgba(0, 0, 0, 0)）
     * @property {String} customStyle  定义需要用到的外部样式
	 * @event {Function} click 整个卡片任意位置被点击时触发
	 * @event {Function} head-click 卡片头部被点击时触发
	 * @event {Function} body-click 卡片主体部分被点击时触发
	 * @event {Function} foot-click 卡片底部部分被点击时触发
	 * @example <u-card padding="30" title="card"></u-card>
	 */
	export default {
		name: 'u-card',
		props: {
			// 与屏幕两侧是否留空隙
			full: {
				type: Boolean,
				default: false
			},
			// 标题
			title: {
				type: String,
				default: ''
			},
			// 标题颜色
			titleColor: {
				type: String,
				default: '#303133'
			},
			// 标题字体大小，单位rpx
			titleSize: {
				type: [Number, String],
				default: '30'
			},
			// 副标题
			subTitle: {
				type: String,
				default: ''
			},
			// 副标题颜色
			subTitleColor: {
				type: String,
				default: '#909399'
			},
			// 副标题字体大小，单位rpx
			subTitleSize: {
				type: [Number, String],
				default: '26'
			},
			// 是否显示外部边框，只对full=false时有效(卡片与边框有空隙时)
			border: {
				type: Boolean,
				default: false
			},
			// 用于标识点击了第几个
			index: {
				type: [Number, String, Object],
				default: ''
			},
			// 用于隔开上下左右的边距，带单位的写法，如："30rpx 30rpx"，"20rpx 20rpx 30rpx 30rpx"
			margin: {
				type: String,
				default: '30rpx'
			},
			// card卡片的圆角
			borderRadius: {
				type: [Number, String],
				default: '16'
			},
			// 头部自定义样式，对象形式
			headStyle: {
				type: Object,
				default () {
					return {};
				}
			},
			// 主体自定义样式，对象形式
			bodyStyle: {
				type: Object,
				default () {
					return {};
				}
			},
			// 底部自定义样式，对象形式
			footStyle: {
				type: Object,
				default () {
					return {};
				}
			},
			// 头部是否下边框
			headBorderBottom: {
				type: Boolean,
				default: true
			},
			// 底部是否有上边框
			footBorderTop: {
				type: Boolean,
				default: true
			},
			// 标题左边的缩略图
			thumb: {
				type: String,
				default: ''
			},
			// 缩略图宽高，单位rpx
			thumbWidth: {
				type: [String, Number],
				default: '60'
			},
			// 缩略图是否为圆形
			thumbCircle: {
				type: Boolean,
				default: false
			},
			// 给head，foot的内边距
			padding: {
				type: [String, Number],
				default: '24'
			},
			// 是否显示头部
			showHead: {
				type: Boolean,
				default: true
			},
			// 是否显示尾部
			showFoot: {
				type: Boolean,
				default: true
			},
			// 卡片外围阴影，字符串形式
			// 此处设置为rgba透明，是因为nvue的iOS下，不允许设置为none值，否则会出现锐利的高亮白色
			boxShadow: {
				type: String,
				default: '0 0 0 0 rgba(0, 0, 0, 0)'
			}
		},
		mixins: [uni.$u.mixin],
		data() {
			return {};
		},
		computed: {
			// 卡片的样式
			cardStyle() {
				let style = {}
				style.margin = this.margin
				style.boxShadow = this.boxShadow
				// 由于Android的nvue不支持border-radius: 10px;这种简写法，所以需要分开写
				style.borderTopLeftRadius = this.$u.addUnit(this.borderRadius)
				style.borderTopRightRadius = this.$u.addUnit(this.borderRadius)
				style.borderBottomLeftRadius = this.$u.addUnit(this.borderRadius)
				style.borderBottomRightRadius = this.$u.addUnit(this.borderRadius)
				return style
			}
		},
		methods: {
			click() {
				this.$emit('click', this.index);
			},
			headClick() {
				this.$emit('head-click', this.index);
			},
			bodyClick() {
				this.$emit('body-click', this.index);
			},
			footClick() {
				this.$emit('foot-click', this.index);
			}
		}
	};
</script>

<style lang="scss">
	@import "../../libs/css/components.scss";
	$u-card-font-size:28rpx !default;
	$u-card-background-color:#fff !default;
	$u-card-full-border-radius:16rpx !default;
	$u-card-head-left-color:$u-main-color!default;
	$u-card-head-left-thumb-margin-right:16rpx !default;
	$u-card-head-left-title-max-width:400rpx !default;
	$u-card-head-right-color: $u-tips-color !default;
	$u-card-head-right-margin-left:6rpx !default;
	$u-card-body-color:$u-content-color !default;
	$u-card-foot-color:$u-tips-color !default;
	

	.u-card {
		position: relative;
		overflow: hidden;
		font-size: $u-card-font-size;
		background-color: $u-card-background-color;
		// border-radius: 10;
		// border-top-right-radius: 20rpx;
		// border-bottom-left-radius: 63rpx;
		// border-bottom-right-radius: 63rpx;
		// border-top-left-radius: 63rpx;
		/* #ifndef APP-NVUE */
		box-sizing: border-box;
		/* #endif */

		&-full {
			// 如果是与屏幕之间不留空隙，应该设置左右边距为0
			margin-left: 0 !important;
			margin-right: 0 !important;
		}

		&--border:after {
			border-radius:$u-card-full-border-radius;
		}

		&__head {
			@include flex;
			align-items: center;
			justify-content: space-between;

			&--left {
				@include flex;
				align-items: center;
				color:$u-card-head-left-color;

				&__thumb {
					margin-right:$u-card-head-left-thumb-margin-right;
				}

				&__title {
					/* #ifndef APP-NVUE */
					max-width:$u-card-head-left-title-max-width;
					/* #endif */
				}
			}

			&--right {
				color:$u-card-head-right-color;
				margin-left:$u-card-head-right-margin-left;
			}
		}

		&__body {
			color:$u-card-body-color;
		}

		&__foot {
			color:$u-card-foot-color;
		}
	}
</style>
