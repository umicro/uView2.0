<template>
	<view
	    class="u-line-progress"
	    :style="[$u.addStyle(customStyle)]"
	>
		<view
		    class="u-line-progress__background"
		    ref="u-line-progress__background"
		    :style="[{
				backgroundColor: inactiveColor,
				height: $u.addUnit(height),
			}]"
		>
		</view>
		<view
		    class="u-line-progress__line"
		    :style="[progressStyle]"
		> 
			<slot>
				<text v-if="showText && percentage >= 10" class="u-line-progress__text">{{innserPercentage + '%'}}</text>
			</slot> 
		</view>
	</view>
</template>

<script>
	// #ifdef APP-NVUE
	const dom = uni.requireNativePlugin('dom')
	// #endif
	/**
	 * lineProgress 线型进度条
	 * @description 展示操作或任务的当前进度，比如上传文件，是一个线形的进度条。
	 * @tutorial https://www.uviewui.com/components/lineProgress.html
	 * @property {String Number} percent 进度条百分比值，为数值类型，0-100
	 * @property {Boolean} round 进度条两端是否为半圆（默认true）
	 * @property {String} type 如设置，active-color值将会失效
	 * @property {String} active-color 进度条激活部分的颜色（默认#19be6b）
	 * @property {String} inactive-color 进度条的底色（默认#ececec）
	 * @property {Boolean} show-percent 是否在进度条内部显示当前的百分比值数值（默认true）
	 * @property {String Number} height 进度条的高度，单位px（默认28）
	 * @property {Boolean} striped 是否显示进度条激活部分的条纹（默认false）
	 * @property {Boolean} striped-active 条纹是否具有动态效果（默认false）
	 * @example <u-line-progress :percent="70" :show-percent="true"></u-line-progress>
	 */
	export default {
		name: "u-line-progress",
		mixins: [uni.$u.mixin],
		props: {
			// 激活部分的颜色
			activeColor: {
				type: String,
				default: '#19be6b'
			},
			inactiveColor: {
				type: String,
				default: '#ececec'
			},
			// 进度百分比，数值
			percentage: {
				type: [Number, String],
				default: 0
			},
			// 是否在进度条内部显示百分比的值
			showText: {
				type: Boolean,
				default: true
			},
			// 进度条的高度，单位px
			height: {
				type: [Number, String],
				default: 12
			},
		},
		data() {
			return {
				lineWidth: 0,
			}
		},
		watch: {
			percentage(n) {
				this.resizeProgressWidth()
			}
		},
		computed: {
			progressStyle() { 
				let style = {}
				style.width = this.lineWidth
				style.backgroundColor = this.activeColor
				style.height = uni.$u.addUnit(this.height)
				return style
			},
			innserPercentage() {
				// 控制范围在0-100之间
				return uni.$u.range(0, 100, this.percentage)
			}
		},
		mounted() {
			this.init()
		},
		methods: {
			init() {
				uni.$u.sleep(20).then(() => {
					this.resizeProgressWidth()
				})
			},
			getProgressWidth() {
				// #ifndef APP-NVUE
				return this.$uGetRect('.u-line-progress__background')
				// #endif

				// #ifdef APP-NVUE
				// 返回一个promise
				return new Promise(resolve => {
					dom.getComponentRect(this.$refs['u-line-progress__background'], (res) => {
						resolve(res.size)
					})
				})
				// #endif
			},
			resizeProgressWidth() {
				this.getProgressWidth().then(size => {
					const {
						width
					} = size
					// 通过设置的percentage值，计算其所占总长度的百分比
					this.lineWidth = width * this.innserPercentage / 100 + 'px'
				})
			}
		}
	}
</script>

<style lang="scss">
	@import "../../libs/css/components.scss";

	.u-line-progress {
		align-items: stretch;
		position: relative;
		@include flex(row);
		flex: 1;

		&__background {
			background-color: #ececec;
			border-radius: 100px;
			flex: 1;
		}

		&__line {
			position: absolute;
			top: 0;
			left: 0;
			bottom: 0;
			align-items: center;
			@include flex(row);
			color: #ffffff;
			border-radius: 100px;
			transition: width 0.5s ease;
			justify-content: flex-end;
		}

		&__text {
			font-size: 10px;
			align-items: center;
			text-align: right;
			color: #FFFFFF;
			margin-right: 5px;
			transform: scale(0.9);
		}
	}
</style>
