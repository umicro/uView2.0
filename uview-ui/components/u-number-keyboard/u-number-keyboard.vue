<template>
	<view
	    class="u-keyboard"
	    @touchmove.stop.prevent="noop"
	>
		<view
		    class="u-keyboard__button"
		    :style="[itemStyle(index)]"
		    v-for="(item, index) in numList"
		    :key="index"
		    hover-class="u-hover-class"
		    :hover-stay-time="200"
		    @tap="keyboardClick(item)"
		>
			<text class="u-keyboard__button__text">{{ item }}</text>
		</view>
		<view
		    class="u-keyboard__button u-keyboard__button__gray"
		    hover-class="u-hover-class"
		    :hover-stay-time="200"
		    @touchstart.stop="backspaceClick"
		    @touchend="clearTimer"
		>
			<u-icon
			    name="backspace"
			    size="20"
			    :bold="true"
			></u-icon>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			// 键盘的类型，number-数字键盘，card-身份证键盘
			mode: {
				type: String,
				default: 'number'
			},
			// 是否显示键盘的"."符号
			dotEnabled: {
				type: Boolean,
				default: true
			},
			// 是否打乱键盘按键的顺序
			random: {
				type: Boolean,
				default: false
			}
		},
		data() {
			return {
				backspace: 'backspace', // 退格键内容
				dot: '.', // 点
				timer: null, // 长按多次删除的事件监听
				cardX: 'X' // 身份证的X符号
			};
		},
		computed: {
			// 键盘需要显示的内容
			numList() {
				let tmp = [];
				if (!this.dotEnabled && this.mode == 'number') {
					if (!this.random) {
						return [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
					} else {
						return this.$u.randomArray([1, 2, 3, 4, 5, 6, 7, 8, 9, 0]);
					}
				} else if (this.dotEnabled && this.mode == 'number') {
					if (!this.random) {
						return [1, 2, 3, 4, 5, 6, 7, 8, 9, this.dot, 0];
					} else {
						return this.$u.randomArray([1, 2, 3, 4, 5, 6, 7, 8, 9, this.dot, 0]);
					}
				} else if (this.mode == 'card') {
					if (!this.random) {
						return [1, 2, 3, 4, 5, 6, 7, 8, 9, this.cardX, 0];
					} else {
						return this.$u.randomArray([1, 2, 3, 4, 5, 6, 7, 8, 9, this.cardX, 0]);
					}
				}
			},
			// 按键的样式，在非乱序&&数字键盘&&不显示点按钮时，index为9时，按键占位两个空间
			itemStyle() {
				return index => {
					let style = {};
					if (this.mode == 'number' && !this.dotEnabled && index == 9) style.width = '464rpx';
					return style;
				};
			},
			// 是否让按键显示灰色，只在非乱序&&数字键盘&&且允许点按键的时候
			btnBgGray() {
				return index => {
					if (!this.random && index == 9 && (this.mode != 'number' || (this.mode == 'number' && this.dotEnabled))) return true;
					else return false;
				};
			},
		},
		created() {

		},
		methods: {
			// 点击退格键
			backspaceClick() {
				this.$emit('backspace');
				clearInterval(this.timer); //再次清空定时器，防止重复注册定时器
				this.timer = null;
				this.timer = setInterval(() => {
					this.$emit('backspace');
				}, 250);
			},
			clearTimer() {
				clearInterval(this.timer);
				this.timer = null;
			},
			// 获取键盘显示的内容
			keyboardClick(val) {
				// 允许键盘显示点模式和触发非点按键时，将内容转为数字类型
				if (this.dotEnabled && val != this.dot && val != this.cardX) val = Number(val);
				this.$emit('change', val);
			}
		}
	};
</script>

<style lang="scss">
	@import "../../libs/css/components.scss";

	.u-keyboard {
		@include flex;
		flex-direction: row;
		justify-content: space-around;
		background-color: rgb(214, 218, 220);
		flex-wrap: wrap;
		padding: 8px 10rpx 10rpx 10rpx;

		&__button {
			width: 222rpx;
			margin: 4px 6rpx;
			border-top-left-radius: 4px;
			border-top-right-radius: 4px;
			border-bottom-left-radius: 4px;
			border-bottom-right-radius: 4px;
			padding: 10px 0;
			background-color: #FFFFFF;
			@include flex;
			justify-content: center;
			align-items: center;
			box-shadow: 0 1px 0px #999992;

			&__text {
				font-size: 20px;
				font-weight: 500;
				color: $u-main-color;
			}
			
			&__gray {
				background-color: rgb(190, 192, 200);
			}
		}
	}
	
	.u-hover-class {
		background-color: rgb(168, 171, 178);
	}
</style>
