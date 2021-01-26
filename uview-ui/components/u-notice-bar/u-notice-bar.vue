<template>
	<view
	    class="u-notice-bar"
	    v-if="show"
	    :style="[{
			borderRadius: $u.addUnit(borderRadius),
			padding: padding,
			backgroundColor: bgColor
		}, $u.addStyle(customStyle)]"
	>
		<template v-if="direction === 'column' || (direction === 'row' && step)">
			<u-column-notice
			    :color="color"
			    :bgColor="bgColor"
			    :text="text"
			    :mode="mode"
				:step="step"
				:icon="icon"
			    :disable-touch="disableTouch"
			    :fontSize="fontSize"
			    :duration="duration"
			    :playState="playState"
			    :padding="padding"
			    @getMore="getMore"
			    @close="close"
			    @click="click"
			    @end="end"
			></u-column-notice>
		</template>
		<template v-else>
			<u-row-notice
			    :color="color"
			    :bgColor="bgColor"
			    :text="text"
			    :mode="mode"
			    :fontSize="fontSize"
			    :speed="speed"
			    :playState="playState"
			    :padding="padding"
				:url="url"
				:linkType="linkType"
				:icon="icon"
			    @getMore="getMore"
			    @close="close"
			    @click="click"
			></u-row-notice>
		</template>
	</view>
</template>
<script>
	/**
	 * noticeBar 滚动通知
	 * @description 该组件用于滚动通告场景，有多种模式可供选择
	 * @tutorial https://www.uviewui.com/components/noticeBar.html
	 * @property {Array} list 滚动内容，数组形式，见上方说明
	 * @property {String} type 显示的主题（默认warning）
	 * @property {Boolean} volume-icon 是否显示小喇叭图标（默认true）
	 * @property {Boolean} more-icon 是否显示右边的向右箭头（默认false）
	 * @property {Boolean} close-icon 是否显示关闭图标（默认false）
	 * @property {String} color 文字颜色
	 * @property {String Number} bg-color 背景颜色
	 * @property {String} mode 滚动模式（默认horizontal）
	 * @property {Boolean} show 是否显示（默认true）
	 * @property {String Number} font-size 字体大小，单位rpx（默认28）
	 * @property {String Number} volume-size 左边喇叭的大小（默认34）
	 * @property {String Number} duration 滚动周期时长，只对步进模式有效，横向衔接模式无效，单位ms（默认2000）
	 * @property {String Number} speed 水平滚动时的滚动速度，即每秒移动多少距离，只对水平衔接方式有效，单位rpx（默认160）
	 * @property {String Number} font-size 字体大小，单位rpx（默认28）
	 * @property {Boolean} is-circular mode为horizontal时，指明是否水平衔接滚动（默认true）
	 * @property {String} play-state 播放状态，play - 播放，paused - 暂停（默认play）
	 * @property {String Nubmer} border-radius 通知栏圆角（默认为0）
	 * @property {String Nubmer} padding 内边距，字符串，与普通的内边距css写法一直（默认"18rpx 24rpx"）
	 * @property {Boolean} no-list-hidden 列表为空时，是否显示组件（默认false）
	 * @property {Boolean} disable-touch 是否禁止通过手动滑动切换通知，只有mode = vertical，或者mode = horizontal且is-circular = false时有效（默认true）
	 * @event {Function} click 点击通告文字触发，只有mode = vertical，或者mode = horizontal且is-circular = false时有效
	 * @event {Function} close 点击右侧关闭图标触发
	 * @event {Function} getMore 点击右侧向右图标触发
	 * @event {Function} end 列表的消息每次被播放一个周期时触发，只有mode = vertical，或者mode = horizontal且is-circular = false时有效
	 * @example <u-notice-bar :more-icon="true" :list="list"></u-notice-bar>
	 */
	export default {
		name: "u-notice-bar",
		mixins: [uni.$u.mixin],
		props: {
			// 显示的内容，数组
			text: {
				type: [Array],
				default () {
					return [];
				}
			},
			// 通告滚动模式，row-横向滚动，column-竖向滚动
			direction: {
				type: String,
				default: 'row'
			},
			// direction = row时，是否使用步进形式滚动
			step: {
				type: Boolean,
				default: false
			},
			// 是否显示左侧的音量图标
			icon: {
				type: String,
				default: 'volume'
			},
			// 通告模式，link-显示右箭头，closable-显示右侧关闭图标
			mode: {
				type: String,
				default: ''
			},
			// 文字颜色，各图标也会使用文字颜色
			color: {
				type: String,
				default: '#f9ae3d'
			},
			// 背景颜色
			bgColor: {
				type: String,
				default: '#fdf6ec'
			},
			// 字体大小，单位rpx
			fontSize: {
				type: [Number, String],
				default: 14
			},
			// 水平滚动时的滚动速度，即每秒滚动多少px(rpx)，这有利于控制文字无论多少时，都能有一个恒定的速度
			speed: {
				type: [Number, String],
				default: 80
			},
			// 播放状态，play-播放，paused-暂停
			playState: {
				type: String,
				default: 'play'
			},
			// 字体大小，单位rpx
			fontSize: {
				type: [Number, String],
				default: 14
			},
			// 滚动一个周期的时间长，单位ms
			duration: {
				type: [Number, String],
				default: 2000
			},
			// 是否禁止用手滑动切换
			// 目前HX2.6.11，只支持App 2.5.5+、H5 2.5.5+、支付宝小程序、字节跳动小程序
			disableTouch: {
				type: Boolean,
				default: true
			},
			// 滚动通知设置圆角
			borderRadius: {
				type: [Number, String],
				default: 0
			},
			// 通知的边距
			padding: {
				type: [Number, String],
				default: '18rpx 24rpx'
			},
			// list列表为空时，是否显示组件
			hideTextEmpty: {
				type: Boolean,
				default: true
			}
		},
		data() {
			return {
				show: true
			}
		},
		computed: {
			// 如果设置show为false，或者设置了hideTextEmpty为true，且text长度又为零的话，隐藏组件
			// show() {
			// 	if (this.show == false || (this.hideTextEmpty == true && this.text.length == 0)) return false;
			// 	else return true;
			// }
		},
		methods: {
			// 点击通告栏
			click(index) {
				this.$emit('click', index);
			},
			// 点击关闭按钮
			close() {
				this.show = false
				this.$emit('close');
			},
			// 点击更多箭头按钮
			getMore() {
				this.$emit('getMore');
			},
			// 滚动一个周期结束，只对垂直，或者水平步进形式有效
			end() {
				this.$emit('end');
			}
		}
	};
</script>

<style lang="scss">
	@import "../../libs/css/components.scss";

	.u-notice-bar {
		overflow: hidden;
		padding: 9px 12px;
		flex: 1;
	}
</style>
