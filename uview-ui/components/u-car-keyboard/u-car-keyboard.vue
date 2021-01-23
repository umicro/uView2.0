<template>
	<view
	    class="u-keyboard"
	    @touchmove.stop.prevent="noop"
	>
		<view
		    v-for="(group, i) in abc ? engKeyBoardList : areaList"
		    class="u-keyboard__button"
		    :class="[i + 1 === 4 && 'u-keyboard__button--center']"
		>
			<view
			    class="u-keyboard__button__inner"
			    :hover-stay-time="200"
			    @tap="carInputClick(i, j)"
			    hover-class="u-hover-class"
			    v-for="(item, j) in group"
			    :key="j"
			>
				<text class="u-keyboard__button__inner__text">{{ item }}</text>
			</view>
		</view>
		<view
		    @touchstart="backspaceClick"
		    @touchend="clearTimer"
		    :hover-stay-time="200"
		    class="u-keyboard__button u-keyboard__button--absolute u-keyboard__button--absolute-right"
		    hover-class="u-hover-class"
		>
			<u-icon
			    size="28"
			    name="backspace"
			    :bold="true"
			    color="#303133"
			></u-icon>
		</view>
		<view
		    :hover-stay-time="200"
		    class="u-keyboard__button u-keyboard__button--absolute u-keyboard__button--absolute-left"
		    hover-class="u-hover-class"
		    @tap="changeCarInputMode"
		>
			<text
			    class="u-keyboard__button--absolute-left__lang"
			    :class="[!abc && 'u-keyboard__button--absolute-left__lang--active']"
			>中</text>
			<text class="u-keyboard__button__line">/</text>
			<text
			    class="u-keyboard__button--absolute-left__lang"
			    :class="[abc && 'u-keyboard__button--absolute-left__lang--active']"
			>英</text>
		</view>
	</view>
</template>

<script>
	/**
	 * keyboard 键盘组件
	 * @description 此为uView自定义的键盘面板，内含了数字键盘，车牌号键，身份证号键盘3种模式，都有可以打乱按键顺序的选项。
	 * @tutorial https://uviewui.com/components/keyboard.html
	 * @property {Boolean} random 是否打乱键盘的顺序 
	 * @event {Function} change 点击键盘触发
	 * @event {Function} backspace 点击退格键触发
	 * @example <u-keyboard ref="uKeyboard" mode="car" v-model="show"></u-keyboard>
	 */
	export default {
		name: "u-keyboard",
		props: {
			// 是否打乱键盘按键的顺序
			random: {
				type: Boolean,
				default: uni.$u.props.carKeyboard.random
			}
		},
		mixins: [uni.$u.mixin],
		data() {
			return {
				// 车牌输入时，abc=true为输入车牌号码，bac=false为输入省份中文简称
				abc: false
			};
		},
		computed: {
			areaList() {
				let data = [
					'京',
					'沪',
					'粤',
					'津',
					'冀',
					'豫',
					'云',
					'辽',
					'黑',
					'湘',
					'皖',
					'鲁',
					'苏',
					'浙',
					'赣',
					'鄂',
					'桂',
					'甘',
					'晋',
					'陕',
					'蒙',
					'吉',
					'闽',
					'贵',
					'渝',
					'川',
					'青',
					'琼',
					'宁',
					'挂',
					'藏',
					'港',
					'澳',
					'新',
					'使',
					'学'
				];
				let tmp = [];
				// 打乱顺序
				if (this.random) data = this.$u.randomArray(data);
				// 切割成二维数组
				tmp[0] = data.slice(0, 10);
				tmp[1] = data.slice(10, 20);
				tmp[2] = data.slice(20, 30);
				tmp[3] = data.slice(30, 36);
				return tmp;
			},
			engKeyBoardList() {
				let data = [
					1,
					2,
					3,
					4,
					5,
					6,
					7,
					8,
					9,
					0,
					'Q',
					'W',
					'E',
					'R',
					'T',
					'Y',
					'U',
					'I',
					'O',
					'P',
					'A',
					'S',
					'D',
					'F',
					'G',
					'H',
					'J',
					'K',
					'L',
					'Z',
					'X',
					'C',
					'V',
					'B',
					'N',
					'M'
				];
				let tmp = [];
				if (this.random) data = this.$u.randomArray(data);
				tmp[0] = data.slice(0, 10);
				tmp[1] = data.slice(10, 20);
				tmp[2] = data.slice(20, 30);
				tmp[3] = data.slice(30, 36);
				return tmp;
			}
		},
		methods: {
			// 点击键盘按钮
			carInputClick(i, j) {
				let value = '';
				// 不同模式，获取不同数组的值
				if (this.abc) value = this.engKeyBoardList[i][j];
				else value = this.areaList[i][j];
				this.$emit('change', value);
			},
			// 修改汽车牌键盘的输入模式，中文|英文
			changeCarInputMode() {
				this.abc = !this.abc;
			},
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
		}
	};
</script>

<style lang="scss">
	@import "../../libs/css/components.scss";
	$u-car-keyboard-background-color: rgb(214, 218, 220) !default;
	$u-car-keyboard-padding:6px 0 5px !default;
    $u-car-keyboard-button-width:100% !default;
	$u-car-keyboard-button-inner-width:64rpx !default;
	$u-car-keyboard-button-inner-background-color:#FFFFFF !default;
	$u-car-keyboard-button-inner-height:80rpx !default;
	$u-car-keyboard-button-inner-box-shadow:0 1px 0px #999992 !default;
	$u-car-keyboard-button-inner-border-top-left-radius:4px !default;
	$u-car-keyboard-button-inner-border-top-right-radius:4px !default;
	$u-car-keyboard-button-inner-border-bottom-left-radius:4px !default;
	$u-car-keyboard-button-inner-border-bottom-right-radius:4px !default;
	$u-car-keyboard-button-inner-margin:8rpx 5rpx !default;
	$u-car-keyboard-button-text-font-size:16px !default;
	$u-car-keyboard-button-text-color:$u-main-color !default;
	$u-car-keyboard-center-inner-margin: 0 4rpx !default;
	$u-car-keyboard-absolute-border-top-left-radius:4px !default;
	$u-car-keyboard-absolute-border-top-right-radius:4px !default;
	$u-car-keyboard-absolute-border-bottom-left-radius:4px !default;
	$u-car-keyboard-absolute-border-bottom-right-radius:4px !default;
	$u-car-keyboard-absolute-width:135rpx !default;
	$u-car-keyboard-absolute-height:80rpx !default;
	$u-car-keyboard-absolute-bottom:9px !default;
	$u-car-keyboard-absolute-background-color:rgb(190, 192, 200) !default;
	$u-car-keyboard-absolute-box-shadow:0 1px 0px #999992 !default;
	$u-car-keyboard-absolute-left:20rpx !default;
	$u-car-keyboard-lang-font-size:16px !default;
	$u-car-keyboard-lang-color:$u-main-color !default;
	$u-car-keyboard-active-color:$u-primary !default;
	$u-car-keyboard-absolute-right:20rpx !default;
	$u-car-keyboard-line-font-size:15px !default;
	$u-car-keyboard-line-color:$u-main-color !default;
	$u-car-keyboard-line-margin:0 1px !default;
	$u-car-keyboard-u-hover-class-background-color:rgb(168, 171, 178) !default;
	.u-keyboard {
		@include flex(column);
		justify-content: space-around;
		background-color:$u-car-keyboard-background-color;
		flex-wrap: wrap;
		align-items: stretch;
		padding: $u-car-keyboard-padding;

		&__button {
			@include flex;
			justify-content: center;
			flex: 1;
			/* #ifndef APP-NVUE */
			width:$u-car-keyboard-button-width;
			/* #endif */

			&__inner {
				@include flex;
				justify-content: center;
				align-items: center;
				width:$u-car-keyboard-button-inner-width;
				background-color:$u-car-keyboard-button-inner-background-color ;
				height:$u-car-keyboard-button-inner-height ;
				box-shadow:$u-car-keyboard-button-inner-box-shadow ;
				border-top-left-radius:$u-car-keyboard-button-inner-border-top-left-radius ;
				border-top-right-radius:$u-car-keyboard-button-inner-border-top-right-radius;
				border-bottom-left-radius:$u-car-keyboard-button-inner-border-bottom-left-radius ;
				border-bottom-right-radius:$u-car-keyboard-button-inner-border-bottom-right-radius;
				margin:$u-car-keyboard-button-inner-margin;

				&__text {
					font-size:$u-car-keyboard-button-text-font-size;
					color:$u-car-keyboard-button-text-color;
				}
			}

			&--center {
				justify-content: center;

				&__inner {
					margin:$u-car-keyboard-center-inner-margin;
				}
			}

			&--absolute {
				position: absolute;
				border-top-left-radius:$u-car-keyboard-absolute-border-top-left-radius ;
				border-top-right-radius:$u-car-keyboard-absolute-border-top-right-radius;
				border-bottom-left-radius:$u-car-keyboard-absolute-border-bottom-left-radius;
				border-bottom-right-radius:$u-car-keyboard-absolute-border-bottom-right-radius;
				width:$u-car-keyboard-absolute-width;
				height:$u-car-keyboard-absolute-height;
				bottom:$u-car-keyboard-absolute-bottom;
				background-color:$u-car-keyboard-absolute-background-color;
				@include flex;
				justify-content: center;
				align-items: center;
				box-shadow:$u-car-keyboard-absolute-box-shadow;
			}

			&--absolute-left {
				left:$u-car-keyboard-absolute-left;

				@include flex;

				&__lang {
					font-size:$u-car-keyboard-lang-font-size;
					color:$u-car-keyboard-lang-color;

					&--active {
						color:$u-car-keyboard-active-color;
					}
				}
			}

			&--absolute-right {
				right:$u-car-keyboard-absolute-right;
			}

			&__line {
				font-size:$u-car-keyboard-line-font-size;
				color:$u-car-keyboard-line-color;
				margin:$u-car-keyboard-line-margin ;
			}
		}
	}

	.u-hover-class {
		background-color:$u-car-keyboard-u-hover-class-background-color;
	}
</style>
