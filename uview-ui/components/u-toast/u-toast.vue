<template>
	<view class="u-toast">
		<u-overlay
		    :show="overlay && show"
		    :custom-style="overlayStyle"
		></u-overlay>
		<u-transition
		    mode="fade"
		    :show="show"
		    :custom-style="toastStyle"
		>
			<view
			    class="u-toast__content "
			    :class="['u-type-' + type]"
			>
				<u-loading-icon
				    v-if="loading"
				    :mode="loadingMode"
					:customStyle="iconStyle"
					:color="loadingIconColor"
					size="17"
				></u-loading-icon>
				<u-icon
				    v-else
				    :name="iconName"
					size="17"
				    :color="type"
				    :customStyle="iconStyle"
				></u-icon>
				<text
				    class="u-toast__content__text"
				    :class="['u-toast__content__text--' + type]"
					style="max-width: 400rpx;"
				>{{text}}</text>
			</view>
		</u-transition>
	</view>
</template>

<script>
	/**
	 * toast 消息提示
	 * @description 此组件表现形式类似uni的uni.showToastAPI，但也有不同的地方。
	 * @tutorial https://www.uviewui.com/components/toast.html
	 * @property {String Number} zIndex toast展示时的zIndex值 (默认 10075)
	 * @property {Boolean} loading 是否加载中 （默认 false）
	 * @property {String Number} text 显示的文字内容
	 * @property {String} icon 图标，或者绝对路径的图片
	 * @property {String} type 主题类型 （默认 default）
	 * @property {String} loadingMode 加载中的动画类型 （默认 circle）
	 * @property {Boolean} show  是否显示该组件 （默认 false）
	 * @property {Boolean} overlay  是否显示透明遮罩，防止点击穿透 （默认 false）
	 * @property {String} position  位置 （默认 center）
	 * @property {Object} customStyle  组件的样式，对象形式
	 * @event {Function} show 显示toast，如需一进入页面就显示toast，请在onReady生命周期调用
	 * @example <u-toast ref="uToast" />
	 */
	export default {
		name: "u-toast",
		props: {
			// z-index值
			zIndex: {
				type: [Number, String],
				default: 10075
			},
			// 是否加载中
			loading: {
				type: Boolean,
				default: false
			},
			// 显示的文字内容
			text: {
				type: [Number, String],
				default: ''
			},
			// 图标，或者绝对路径的图片
			icon: {
				type: String,
				default: ''
			},
			// 主题类型
			type: {
				type: String,
				default: 'default'
			},
			// 加载中的动画类型
			loadingMode: {
				type: String,
				default: 'circle'
			},
			// show
			show: {
				type: Boolean,
				default: false
			},
			// 是否显示透明遮罩，防止点击穿透
			overlay: {
				type: Boolean,
				default: false
			},
			// 位置
			position: {
				type: String,
				default: 'center'
			}
		},
		mixins: [uni.$u.mixin],
		data() {
			return {
				isShow: false,
				timer: null, // 定时器
				config: {
					params: {}, // URL跳转的参数，对象
					title: '', // 显示文本
					type: '', // 主题类型，primary，success，error，warning，black
					duration: 2000, // 显示的时间，毫秒
					isTab: false, // 是否跳转tab页面
					url: '', // toast消失后是否跳转页面，有则跳转，优先级高于back参数
					icon: true, // 显示的图标
					position: 'center', // toast出现的位置
					callback: null, // 执行完后的回调函数
					back: false, // 结束toast是否自动返回上一页
				},
				tmpConfig: {}, // 将用户配置和内置配置合并后的临时配置变量
			};
		},
		computed: {
			iconName() {
				// 只有不为none，并且type为error|warning|succes|info时候，才显示图标
				if (['error', 'warning', 'success', 'primary'].includes(this.type) && !this.icon) {
					let icon = this.$u.type2icon(this.type);
					return icon;
				} else {
					// 非主题类型，剩下的无论用户传入图标还是图片路径，统一是用u-icon组件解析
					return this.icon
				}
			},
			// 整体样式
			toastStyle() {
				const style = {}
				const sys = uni.$u.sys()
				let left = sys.windowWidth / 2,
					top = sys.windowHeight / 2
				// 非H5端有原生导航栏，其高度不会算到windowHeight中，toast会在视觉上偏下，这里做一个向上的偏移
				// #ifndef H5
				// 原生导航栏的高度为44px
				top = top - 22
				// #endif
				style.position = 'fixed'
				style.left = left + 'px'
				// toast的弹出位置
				if (this.position === 'center') {
					style.top = top + 'px'
				} else if (this.position === 'top') {
					style.top = top - sys.windowHeight / 4 + 'px'
				} else {
					style.top = top + sys.windowHeight / 4 + 'px'
				}
				style.zIndex = this.zIndex
				// 进行位移偏转，再通过left，top修正，以达到居中的效果
				style.transform = 'translate(-50%, -50%)'
				return uni.$u.deepMerge(style, this.customStyle)
			},
			overlayStyle() {
				const style = {}
				// 将遮罩设置为100%透明度，避免出现灰色背景
				style.backgroundColor = 'rgba(0, 0, 0, 0)'
				return style
			},
			iconStyle() {
				const style = {}
				// 图标需要一个右边距，以跟右边的文字有隔开的距离
				style.marginRight = '4px'
				return style
			},
			loadingIconColor() {
				let color = 'rgb(255, 255, 255)';
				if(this.type !== 'default') {
					// loading-icon组件内部会对color参数进行一个透明度处理，该方法要求传入的颜色值
					// 必须为rgb格式的，所以这里做一个处理
					color = uni.$u.hexToRgb(uni.$u.config.color[`u-${this.type}`])
				}
				return color
			}
		},
		methods: {
			// 显示toast组件，由父组件通过this.$refs.xxx.show(options)形式调用
			// show(options) {
			// 	// 不降结果合并到this.config变量，避免多次调用u-toast，前后的配置造成混论
			// 	this.tmpConfig = this.$u.deepMerge(this.config, options);
			// 	if (this.timer) {
			// 		// 清除定时器
			// 		clearTimeout(this.timer);
			// 		this.timer = null;
			// 	}
			// 	this.isShow = true;
			// 	this.timer = setTimeout(() => {
			// 		// 倒计时结束，清除定时器，隐藏toast组件
			// 		this.isShow = false;
			// 		clearTimeout(this.timer);
			// 		this.timer = null;
			// 		// 判断是否存在callback方法，如果存在就执行
			// 		typeof(this.tmpConfig.callback) === 'function' && this.tmpConfig.callback();
			// 		this.timeEnd();
			// 	}, this.tmpConfig.duration);
			// },
			// 隐藏toast组件，由父组件通过this.$refs.xxx.hide()形式调用
			hide() {
				this.isShow = false;
				if (this.timer) {
					// 清除定时器
					clearTimeout(this.timer);
					this.timer = null;
				}
			},
			// 倒计时结束之后，进行的一些操作
			timeEnd() {
				// 如果带有url值，根据isTab为true或者false进行跳转
				if (this.tmpConfig.url) {
					// 如果url没有"/"开头，添加上，因为uni的路由跳转需要"/"开头
					if (this.tmpConfig.url[0] != '/') this.tmpConfig.url = '/' + this.tmpConfig.url;
					// 判断是否有传递显式的参数
					if (Object.keys(this.tmpConfig.params).length) {
						// 判断用户传递的url中，是否带有参数
						// 使用正则匹配，主要依据是判断是否有"/","?","="等，如“/page/index/index?name=mary"
						// 如果有params参数，转换后无需带上"?"
						let query = '';
						if (/.*\/.*\?.*=.*/.test(this.tmpConfig.url)) {
							// object对象转为get类型的参数
							query = this.$u.queryParams(this.tmpConfig.params, false);
							this.tmpConfig.url = this.tmpConfig.url + "&" + query;
						} else {
							query = this.$u.queryParams(this.tmpConfig.params);
							this.tmpConfig.url += query;
						}
					}
					// 如果是跳转tab页面，就使用uni.switchTab
					if (this.tmpConfig.isTab) {
						uni.switchTab({
							url: this.tmpConfig.url
						});
					} else {
						uni.navigateTo({
							url: this.tmpConfig.url
						});
					}
				} else if (this.tmpConfig.back) {
					// 回退到上一页
					this.$u.route({
						type: 'back'
					})
				}
			}
		}
	};
</script>

<style lang="scss">
	@import "../../libs/css/components.scss";
	$u-toast-color:#fff !default;
	$u-toast-border-radius:8rpx !default;
	$u-toast-border-background-color:#585858 !default;
	$u-toast-border-font-size:28rpx !default;
	$u-toast-border-padding:18rpx 40rpx !default;
	$u-toast-content-text-color:#fff !default;
	$u-toast-content-text-font-size:15px !default;
	$u-toast-u-icon:10rpx !default;
	$u-toast-u-position-center-top:50% !default;
	$u-toast-u-position-center-left:50% !default;
	$u-toast-u-position-center-max-width:80% !default;
	$u-toast-u-position-top-left:50% !default;
	$u-toast-u-position-top-top:20% !default;
	$u-toast-u-position-bottom-left:50% !default;
	$u-toast-u-position-bottom-bottom:20% !default;
	$u-toast-u-type-primary-color:$u-primary !default;
	$u-toast-u-type-primary-background-color:#ecf5ff !default;
	$u-toast-u-type-primary-border-color:rgb(215, 234, 254) !default;
	$u-toast-u-type-primary-border-width:1px !default;
	$u-toast-u-type-success-color: $u-success !default;
	$u-toast-u-type-success-background-color: #dbf1e1 !default;
	$u-toast-u-type-success-border-color: #BEF5C8 !default;
	$u-toast-u-type-success-border-width: 1px !default;
	$u-toast-u-type-error-color:$u-error !default;
	$u-toast-u-type-error-background-color:#fef0f0 !default;
	$u-toast-u-type-error-border-color:#fde2e2 !default;
	$u-toast-u-type-error-border-width: 1px !default;
	$u-toast-u-type-warning-color:$u-warning !default;
	$u-toast-u-type-warning-background-color:#fdf6ec !default;
	$u-toast-u-type-warning-border-color:#faecd8 !default;
	$u-toast-u-type-warning-border-width: 1px !default;
	$u-toast-u-type-default-color:#fff !default;
	$u-toast-u-type-default-background-color:#585858 !default;

	.u-toast {
		&__content {
			@include flex;
			padding: $u-toast-border-padding;
			border-radius: $u-toast-border-radius;
			background-color: $u-toast-border-background-color;
			color: $u-toast-color;
			align-items: center;
			/* #ifndef APP-NVUE */
			max-width: 600rpx;
			/* #endif */

			&__text {
				color: $u-toast-content-text-color;
				font-size: $u-toast-content-text-font-size;

				&--default {
					color: $u-toast-content-text-color;
				}

				&--error {
					color: $u-error;
				}

				&--primary {
					color: $u-primary;
				}

				&--success {
					color: $u-success;
				}

				&--warning {
					color: $u-warning;
				}
			}
		}
	}

	.u-position-center {
		top: $u-toast-u-position-center-top;
		left: $u-toast-u-position-center-left;
		transform: translate(-50%, -50%);
	}

	.u-position-top {
		left: $u-toast-u-position-top-left;
		top: $u-toast-u-position-top-top;
		transform: translate(-50%, -50%);
	}

	.u-position-bottom {
		left: $u-toast-u-position-bottom-left;
		bottom: $u-toast-u-position-bottom-bottom;
		transform: translate(-50%, -50%);
	}

	.u-type-primary {
		color: $u-toast-u-type-primary-color;
		background-color: $u-toast-u-type-primary-background-color;
		border-color: $u-toast-u-type-primary-border-color;
		border-width: $u-toast-u-type-primary-border-width;
	}

	.u-type-success {
		color: $u-toast-u-type-success-color;
		background-color: $u-toast-u-type-success-background-color;
		border-color: $u-toast-u-type-success-border-color;
		border-width: 1px;
	}

	.u-type-error {
		color: $u-toast-u-type-error-color;
		background-color: $u-toast-u-type-error-background-color;
		border-color: $u-toast-u-type-error-border-color;
		border-width: $u-toast-u-type-error-border-width;
	}

	.u-type-warning {
		color: $u-toast-u-type-warning-color;
		background-color: $u-toast-u-type-warning-background-color;
		border-color: $u-toast-u-type-warning-border-color;
		border-width: 1px;
	}

	.u-type-default {
		color: $u-toast-u-type-default-color;
		background-color: $u-toast-u-type-default-background-color;
	}
</style>
