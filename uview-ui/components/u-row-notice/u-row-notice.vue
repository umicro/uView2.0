<template>
	<view
	    v-if="show"
	    class="u-notice"
	    :style="{
			background: computeBgColor
		}"
	    :class="[
			type ? `u-type-${type}-light-bg` : ''
		]"
	>
		<view class="u-notice__left-icon">
			<u-icon
			    v-if="volumeIcon"
			    name="volume-fill"
			    :size="volumeSize"
			    :color="computeColor"
			></u-icon>
		</view>
		<view
		    class="u-notice__content"
		    ref="u-notice__content"
		>
			<text
			    ref="u-notice__content__text"
			    class="u-notice__content__text"
			    @tap="click"
			    :style="[textStyle]"
			    :class="['u-type-' + type]"
			>{{text}}</text>
		</view>
		<view class="u-notice__right-icon">
			<u-icon
			    @click="getMore"
			    v-if="moreIcon"
			    name="arrow-right"
			    :size="26"
			    :color="computeColor"
			></u-icon>
			<u-icon
			    @click="close"
			    v-if="closeIcon"
			    name="close"
			    :size="24"
			    :color="computeColor"
			></u-icon>
		</view>
	</view>
</template>
<script>
	// #ifdef APP-NVUE
	const animation = uni.requireNativePlugin('animation')
	const dom = uni.requireNativePlugin('dom')
	// #endif
	export default {
		mixins: [uni.$u.mixin],
		props: {
			// 显示的内容，字符串
			text: {
				type: [String, Number],
				default: ''
			},
			// 显示的主题，success|error|primary|info|warning|none
			// none主题默认为透明背景，黑色(contentColor)字体
			type: {
				type: String,
				default: 'warning'
			},
			// 是否显示左侧的音量图标
			volumeIcon: {
				type: Boolean,
				default: true
			},
			// 是否显示右侧的右箭头图标
			moreIcon: {
				type: Boolean,
				default: false
			},
			// 是否显示右侧的关闭图标
			closeIcon: {
				type: Boolean,
				default: false
			},
			// 是否自动播放
			autoplay: {
				type: Boolean,
				default: true
			},
			// 文字颜色，各图标也会使用文字颜色
			color: {
				type: String,
				default: ''
			},
			// 背景颜色
			bgColor: {
				type: String,
				default: ''
			},
			// 是否显示
			show: {
				type: Boolean,
				default: true
			},
			// 字体大小，单位rpx
			fontSize: {
				type: [Number, String],
				default: 14
			},
			// 音量喇叭的大小
			volumeSize: {
				type: [Number, String],
				default: 20
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
		},
		data() {
			return {
				animationDuration: '0', // 动画执行时间
				animationPlayState: 'paused', // 动画的开始和结束执行
				nvueInit: true
			};
		},
		watch: {
			text() {
				// #ifdef APP-NVUE
				this.nvueInit = true
				// #endif
				// #ifndef APP-NVUE
				this.vue()
				// #endif
			},
			fontSize() {
				t// #ifdef APP-NVUE
				this.nvueInit = true
				// #endif
				// #ifndef APP-NVUE
				this.vue()
				// #endif
			},
			speed() {
				// #ifdef APP-NVUE
				this.nvueInit = true
				// #endif
				// #ifndef APP-NVUE
				this.vue()
				// #endif
			},
			playState(val) {
				if (val == 'play') this.animationPlayState = 'running';
				else this.animationPlayState = 'paused';
			}
		},
		computed: {
			// 计算字体颜色，如果没有自定义的，就用uview主题颜色
			computeColor() {
				if (this.color) return this.color;
				// 如果是无主题，就默认使用content-color
				else if (this.type == 'none') return '#606266';
				else return this.type;
			},
			// 文字内容的样式
			textStyle() {
				let style = {};
				if (this.color) style.color = this.color;
				else if (this.type == 'none') style.color = '#606266';
				style.animationDuration = this.animationDuration,
					style.animationPlayState = this.animationPlayState,
					style.fontSize = uni.$u.addUnit(this.fontSize);
				return style;
			},
			// 计算背景颜色
			computeBgColor() {
				if (this.bgColor) return this.bgColor;
				else if (this.type == 'none') return 'transparent';
			},
		},
		mounted() {
			// #ifdef APP-PLUS
			// 在APP上(含nvue)，监听当前webview是否处于隐藏状态(进入下一页时即为hide状态)
			// 如果webivew隐藏了，为了节省性能的损耗，应停止动画的执行，同时也是为了保持进入下一页返回后，滚动位置保持不变
			var pages = getCurrentPages();
			var page = pages[pages.length - 1];
			var currentWebview = page.$getAppWebview();
			currentWebview.addEventListener('hide',()=>{
				this.webviewHide = true
			})
			currentWebview.addEventListener('show',()=>{
				this.webviewHide = false
			})
			// #endif
			
			this.init()
		},
		methods: {
			init() {
				// #ifdef APP-NVUE
				this.nvue()
				// #endif

				// #ifndef APP-NVUE
				this.vue()
				// #endif
			},
			// vue版处理
			async vue() {
				let boxWidth = 0,
					textWidth = 0
				// 进行一定的延时
				await uni.$u.sleep()
				// 查询盒子和文字的宽度
				textWidth = (await this.$uGetRect('.u-notice__content__text')).width
				boxWidth = (await this.$uGetRect('.u-notice__content')).width
				// 根据t=s/v(时间=路程/速度)，这里为何不需要加上#u-notice-box的宽度，因为中设置了.u-notice-content样式中设置了padding-left: 100%
				// 恰巧计算出来的结果中已经包含了#u-notice-box的宽度
				this.animationDuration = `${textWidth / uni.$u.getPx(this.speed)}s`
				// 这里必须这样开始动画，否则在APP上动画速度不会改变
				this.animationPlayState = 'paused'
				setTimeout(() => {
					if (this.playState == 'play' && this.autoplay) this.animationPlayState = 'running';
				}, 10);
			},
			// nvue版处理
			async nvue() {
				this.nvueInit = false
				let boxWidth = 0,
					textWidth = 0
				// 进行一定的延时
				await uni.$u.sleep()
				// 查询盒子和文字的宽度
				textWidth = (await this.getNvueRect('u-notice__content__text')).width
				boxWidth = (await this.getNvueRect('u-notice__content')).width
				// 将文字移动到盒子的右边沿，之所以需要这么做，是因为nvue不支持100%单位，否则可以通过css设置
				animation.transition(this.$refs['u-notice__content__text'], {
					styles: {
						transform: `translateX(${boxWidth}px)`
					},
				}, () => {
					// 如果非禁止动画，则开始滚动
					!this.stopAnimation && this.loopAnimation(textWidth, boxWidth)
				});
			},
			loopAnimation(textWidth, boxWidth) {
				animation.transition(this.$refs['u-notice__content__text'], {
					styles: {
						// 目标移动终点为-textWidth，也即当文字的最右边贴到盒子的左边框的位置
						transform: `translateX(-${textWidth}px)`
					},
					// 滚动时间的计算为，时间 = 路程(boxWidth + textWidth) / 速度，最后转为毫秒
					duration: (boxWidth + textWidth) / uni.$u.getPx(this.speed) * 1000,
					delay: 10
				}, () => {
					animation.transition(this.$refs['u-notice__content__text'], {
						styles: {
							// 重新将文字移动到盒子的右边沿
							transform: `translateX(${this.stopAnimation ? 0 : boxWidth}px)`
						},
					}, () => { 
						// 如果非禁止动画，则继续下一轮滚动
						if(!this.stopAnimation) {
							// 判断是否需要初始化计算尺寸
							if(this.nvueInit) {
								this.nvue()
							} else {
								this.loopAnimation(textWidth, boxWidth)
							}
						}
					});
				})
			},
			getNvueRect(el) {
				// #ifdef APP-NVUE
				// 返回一个promise
				return new Promise(resolve => {
					dom.getComponentRect(this.$refs[el], (res) => {
						resolve(res.size)
					})
				})
				// #endif
			},
			// 点击通告栏
			click(index) {
				this.$emit('click');
			},
			// 点击关闭按钮
			close() {
				this.$emit('close');
			},
			// 点击更多箭头按钮
			getMore() {
				this.$emit('getMore');
			}
		},
		// #ifdef APP-NVUE
		beforeDestroy() {
			this.stopAnimation = true
		},
		// #endif
	};
</script>

<style lang="scss">
	@import "../../libs/css/components.scss";

	.u-notice {
		padding: 9px 12px;
		@include flex;
		align-items: center;
		justify-content: space-between;

		&__left-icon {
			align-items: center;
		}

		&__right-icon {
			margin-left: 6px;
			align-items: center;
		}

		&__content {
			text-align: right;
			flex: 1;
			@include flex;
			flex-wrap: nowrap;
			overflow: hidden;

			&__text {
				font-size: 14px;
				color: $u-warning;
				/* #ifndef APP-NVUE */
				// 这一句很重要，为了能让滚动左右连接起来
				padding-left: 100%;
				word-break: keep-all;
				white-space: nowrap;
				animation: u-loop-animation 10s linear infinite both;
				/* #endif */
			}
		}

	}

	@keyframes u-loop-animation {
		0% {
			transform: translate3d(0, 0, 0);
		}

		100% {
			transform: translate3d(-100%, 0, 0);
		}
	}
</style>
