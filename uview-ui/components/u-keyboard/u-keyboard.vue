<template>
	<u-popup
	    :overlay="overlay"
	    :closeOnClickOverly="closeOnClickOverly"
	    mode="bottom"
	    :popup="false"
	    :show="show"
	    :safeAreaInsetBottom="safeAreaInsetBottom"
	    @close="popupClose"
	    :zIndex="zIndex"
	    :customStyle="{
			backgroundColor: 'rgb(214, 218, 220)'
		}"
	>
		<view class="u-keyboard">
			<slot />
			<view
			    class="u-keyboard__tooltip"
			    v-if="tooltip"
			>
				<view
				    hover-class="u-hover-class"
				    :hover-stay-time="100"
				>
					<text
					    class="u-keyboard__tooltip__item u-keyboard__tooltip__cancel"
					    v-if="showCancel"
					    @tap="onCancel"
					>{{showCancel && cancelText}}</text>
				</view>
				<view>
					<text
					    v-if="showTips"
					    class="u-keyboard__tooltip__item u-keyboard__tooltip__tips"
					>{{tips ? tips : mode == 'number' ? '数字键盘' : mode == 'card' ? '身份证键盘' : '车牌号键盘'}}</text>
				</view>
				<view
				    hover-class="u-hover-class"
				    :hover-stay-time="100"
				>
					<text
					    v-if="showConfirm"
					    @tap="onConfirm"
					    class="u-keyboard__tooltip__item u-keyboard__tooltip__submit"
					    hover-class="u-hover-class"
					>{{showConfirm && confirmText}}</text>
				</view>
			</view>
			<template v-if="mode == 'number' || mode == 'card'">
				<u-number-keyboard
				    :random="random"
				    @backspace="backspace"
				    @change="change"
				    :mode="mode"
				    :dotEnabled="dotEnabled"
				></u-number-keyboard>
			</template>
			<template v-else>
				<u-car-keyboard
				    :random="random"
				    @backspace="backspace"
				    @change="change"
				></u-car-keyboard>
			</template>
		</view>
	</u-popup>
</template>

<script>
	/**
	 * keyboard 键盘
	 * @description 此为uViw自定义的键盘面板，内含了数字键盘，车牌号键，身份证号键盘3中模式，都有可以打乱按键顺序的选项。
	 * @tutorial https://www.uviewui.com/components/keyboard.html
	 * @property {String} mode 键盘类型，见官网基本使用的说明（默认number）
	 * @property {Boolean} dot-enabled 是否显示"."按键，只在mode=number时有效（默认true）
	 * @property {Boolean} tooltip 是否显示键盘顶部工具条（默认true）
	 * @property {String} tips 工具条中间的提示文字，见上方基本使用的说明，如不需要，请传""空字符
	 * @property {Boolean} cancel-btn 是否显示工具条左边的"取消"按钮（默认true）
	 * @property {Boolean} confirm-btn 是否显示工具条右边的"完成"按钮（默认true）
	 * @property {Boolean} overlay 是否显示遮罩（默认true）
	 * @property {String} confirm-text 确认按钮的文字
	 * @property {String} cancel-text 取消按钮的文字
	 * @property {Number String} z-index 弹出键盘的z-index值（默认1075）
	 * @property {Boolean} random 是否打乱键盘按键的顺序（默认false）
	 * @property {Boolean} safe-area-inset-bottom 是否开启底部安全区适配（默认false）
	 * @property {Boolean} mask-close-able 是否允许点击遮罩收起键盘（默认true）
	 * @event {Function} change 按键被点击(不包含退格键被点击)
	 * @event {Function} cancel 键盘顶部工具条左边的"取消"按钮被点击
	 * @event {Function} confirm 键盘顶部工具条右边的"完成"按钮被点击
	 * @event {Function} backspace 键盘退格键被点击
	 * @example <u-keyboard mode="number" v-model="show"></u-keyboard> 
	 */
	export default {
		name: "u-keyboard",
		props: {
			// 键盘的类型，number-数字键盘，card-身份证键盘，car-车牌号键盘
			mode: {
				type: String,
				default: uni.$u.props.keyboard.mode
			},
			// 是否显示键盘的"."符号
			dotEnabled: {
				type: Boolean,
				default: uni.$u.props.keyboard.dotEnabled
			},
			// 是否显示顶部工具条
			tooltip: {
				type: Boolean,
				default: uni.$u.props.keyboard.tooltip
			},
			// 是否显示工具条中间的提示
			showTips: {
				type: Boolean,
				default: uni.$u.props.keyboard.showTips
			},
			// 工具条中间的提示文字
			tips: {
				type: String,
				default: uni.$u.props.keyboard.tips
			},
			// 是否显示工具条左边的"取消"按钮
			showCancel: {
				type: Boolean,
				default: uni.$u.props.keyboard.showCancel
			},
			// 是否显示工具条右边的"完成"按钮
			showConfirm: {
				type: Boolean,
				default: uni.$u.props.keyboard.showConfirm
			},
			// 是否打乱键盘按键的顺序
			random: {
				type: Boolean,
				default: uni.$u.props.keyboard.random
			},
			// 是否开启底部安全区适配，开启的话，会在iPhoneX机型底部添加一定的内边距
			safeAreaInsetBottom: {
				type: Boolean,
				default: uni.$u.props.keyboard.safeAreaInsetBottom
			},
			// 是否允许通过点击遮罩关闭键盘
			closeOnClickOverly: {
				type: Boolean,
				default: uni.$u.props.keyboard.closeOnClickOverly
			},
			// 控制键盘的弹出与收起
			show: {
				type: Boolean,
				default: uni.$u.props.keyboard.show
			},
			// 是否显示遮罩，某些时候数字键盘时，用户希望看到自己的数值，所以可能不想要遮罩
			overlay: {
				type: Boolean,
				default: uni.$u.props.keyboard.overlay
			},
			// z-index值
			zIndex: {
				type: [Number, String],
				default: uni.$u.props.keyboard.zIndex
			},
			// 取消按钮的文字
			cancelText: {
				type: String,
				default: uni.$u.props.keyboard.cancelText
			},
			// 确认按钮的文字
			confirmText: {
				type: String,
				default: uni.$u.props.keyboard.confirmText
			}
		},
		data() {
			return {

			}
		},
		mixins: [uni.$u.mixin],
		methods: {
			change(e) {
				this.$emit('change', e);
			},
			// 键盘关闭
			popupClose() {
				this.$emit('close');
			},
			// 输入完成
			onConfirm() {
				this.popupClose();
				this.$emit('confirm');
			},
			// 取消输入
			onCancel() {
				this.popupClose();
				this.$emit('cancel');
			},
			// 退格键
			backspace() {
				this.$emit('backspace');
			},
			// 关闭键盘
			close() {
				this.show = false;
			},
			// 打开键盘
			open() {
				this.show = true;
			}
		}
	}
</script>

<style lang="scss">
	@import "../../libs/css/components.scss";

	.u-keyboard {

		&__tooltip {
			@include flex;
			justify-content: space-between;
			background-color: #FFFFFF;
			padding: 14px 12px;

			&__item {
				color: #333333;
				flex: 1;
				text-align: center;
				font-size: 15px;
			}

			&__submit {
				text-align: right;
				color: $u-primary;
			}

			&__cancel {
				text-align: left;
				color: #888888;
			}

			&__tips {
				color: $u-tips-color;
			}
		}
	}
</style>
