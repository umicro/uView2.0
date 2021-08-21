<template>
	<view
		class="u-subsection"
		ref="u-subsection"
		:class="[`u-subsection--${mode}`]"
		:style="[$u.addStyle(customStyle), warpperStyle]"
	>
		<view
			class="u-subsection__bar u-subsection--button__bar"
			:style="[barStyle]"
		></view>
		<view
			class="u-subsection__item"
			:class="[`u-subsection__item--${index}`, index < list.length - 1 && 'u-subsection__item--no-border-right', index === 0 && 'u-subsection__item--first', index === list.length - 1 && 'u-subsection__item--last']"
			:ref="`u-subsection__item--${index}`"
			:style="[itemStyle(index)]"
			@tap="clickHandler(index)"
			v-for="(item, index) in list"
			:key="index"
		>
			<text
				class="u-subsection__item__text"
				:style="[textStyle(index)]"
			>{{ item }}</text>
		</view>

	</view>
</template>

<script>
	// #ifdef APP-NVUE
	const dom = uni.requireNativePlugin('dom')
	// #endif
	import props from './props.js';
	/**
	 * Subsection 分段器 
	 * @description 该分段器一般用于用户从几个选项中选择某一个的场景
	 * @tutorial https://www.uviewui.com/components/subsection.html
	 * @property {Array}			list			选项的数组，形式见上方"基本使用"
	 * @property {String ｜ Number}	current			初始化时默认选中的选项索引值
	 * @property {String}			active-color	激活时的颜色
	 * @property {String}			active-color	未激活时的颜色
	 * @property {String}			mode			模式选择，见上方"模式选择"说明
	 * @property {String ｜ Number}	font-size		字体大小，单位px
	 * @property {String | Number}	height			组件高度，单位px
	 * @property {Boolean}			animation		是否开启动画效果，见上方说明
	 * @property {Boolean}			bold			激活选项的字体是否加粗
	 * @property {String}			bg-color		组件背景颜色，mode为button时有效
	 * @property {String}			button-color	按钮背景颜色，mode为button时有效
	 * @property {Object}			customStyle			定义需要用到的外部样式
	 * 
	 * @event {Function} change		分段器选项发生改变时触发  回调 index：选项的index索引值，从0开始
	 * @example <u-subsection :list="list" :current="curNow" @change="sectionChange"></u-subsection>
	 */
	export default {
		name: 'u-subsection',
		mixins: [uni.$u.mixin, props],
		data() {
			return {
				// 组件尺寸
				itemRect: {
					width: 0,
					height: 0
				}
			}
		},
		watch: {
			list(newValue, oldValue) {
				this.init()
			}
		},
		computed: {
			warpperStyle() {
				const style = {}
				// button模式时，设置背景色
				if(this.mode === 'button') {
					this.backgroundColor = this.bgColor
				}
				return style
			},
			// 滑块的样式
			barStyle() {
				const style = {}
				style.width = `${this.itemRect.width}px`
				style.height = `${this.itemRect.height}px`
				// 通过translateX移动滑块，其移动的距离为索引*item的宽度
				style.transform = `translateX(${this.current * this.itemRect.width}px)`
				if (this.mode === 'section') {
					// 在section模式下，需要动态设置滑块的圆角，因为移动滑块使用的是translateX，无法通过父元素设置overflow: hidden隐藏滑块的直角
					style.backgroundColor = this.activeColor
					style.borderTopLeftRadius = `${this.current === 0 ? 3 : 0}px`
					style.borderTopRightRadius = `${this.current === this.list.length - 1 ? 3 : 0}px`
					style.borderBottomLeftRadius = `${this.current === 0 ? 3 : 0}px`
					style.borderBottomRightRadius = `${this.current === this.list.length - 1 ? 3 : 0}px`
				}
				return style
			},
			// 分段器item的样式
			itemStyle(index) {
				return index => {
					const style = {}
					if (this.mode === 'section') {
						// 设置border的样式
						style.borderColor = this.activeColor;
						style.borderWidth = '1px';
						style.borderStyle = 'solid';
					}
					return style
				}
			},
			// 分段器文字颜色
			textStyle(index) {
				return index => {
					const style = {}
					style.fontWeight = this.bold && this.current === index ? 'bold' : 'normal'
					style.fontSize = uni.$u.addUnit(this.fontSize)
					// section模式下，激活时默认为白色的文字
					if (this.mode === 'section') {
						style.color = this.current === index ? '#fff' : this.activeColor
					} else {
						// button模式下，激活时文字颜色默认为activeColor
						style.color = this.current === index ? this.activeColor : this.inactiveColor
					}
					return style
				}
			}
		},
		mounted() {
			this.init()
		},
		methods: {
			init() {
				uni.$u.sleep().then(() => this.getRect())
			},
			// 获取组件的尺寸
			getRect() {
				// #ifndef APP-NVUE
				this.$uGetRect('.u-subsection__item--0').then(size => {
					this.itemRect = size
				})
				// #endif

				// #ifdef APP-NVUE
				const ref = this.$refs['u-subsection__item--0'][0]
				ref && dom.getComponentRect(ref, res => {
					this.itemRect = res.size
				})
				// #endif
			},
			clickHandler(index) {
				this.$emit('change', index)
			}
		},
	}
</script>

<style lang="scss">
	@import "../../libs/css/components.scss";

	.u-subsection {
		@include flex;
		position: relative;

		&--button {
			height: 32px;
			background-color: rgb(238, 238, 239);
			padding: 3px;
			border-radius: 3px;
			align-items: stretch;

			&__bar {
				background-color: #FFFFFF;
				border-radius: 3px;
			}
		}

		&--section {
			height: 30px;
		}

		&__bar {
			position: absolute;
			transition-property: transform, color;
			transition-duration: 0.3s;
			transition-timing-function: ease-in-out;
		}

		&__item {
			@include flex;
			flex: 1;
			justify-content: center;
			align-items: center;

			&--no-border-right {
				border-right-width: 0!important;
			}
			
			&--first {
				border-top-left-radius: 3px;
				border-bottom-left-radius: 3px;
			}
			
			&--last {
				border-top-right-radius: 3px;
				border-bottom-right-radius: 3px;
			}

			&__text {
				font-size: 12px;
				line-height: 12px;
				@include flex;
				align-items: center;
				transition-property: color;
				transition-duration: 0.3s;
			}
		}
	}
</style>
