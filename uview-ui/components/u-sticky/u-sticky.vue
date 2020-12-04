<template>
	<view
	    class="u-sticky"
		:id="elId"
	    :style="[style]"
	>
		<slot />
	</view>
</template>

<script>
	export default {
		props: {
			// 吸顶容器到顶部某个距离的时候，进行吸顶，在H5平台，NavigationBar为44px
			offsetTop: {
				type: [Number, String],
				default: 0
			},
			// 自定义导航栏的高度
			customNavHeight: {
				type: [Number, String],
				// #ifdef H5
				// H5端的导航栏属于“自定义”导航栏的范畴，因为它是非原生的，与普通元素一致
				default: 44
				// #endif
				// #ifndef H5
				default: 0
				// #endif
			},
			// 是否开启吸顶功能
			disabled: {
				type: Boolean,
				default: false
			},
			// 吸顶区域的背景颜色
			bgColor: {
				type: String,
				default: '#ffffff'
			},
			// z-index值
			zIndex: {
				type: [Number, String],
				default: ''
			},
			//列表中的索引值
			index: {
				type: [Number, String],
				default: ''
			},
		},
		data() {
			return {
				cssSticky: false, // 是否使用css的sticky实现
				stickyTop: 0, // 吸顶的top值，因为可能受自定义导航栏影响，最终的吸顶值非offsetTop值
				elId: this.$u.guid(),
				left: 0,
				width: 'auto',
				height: 'auto'
			}
		},
		mixins: [uni.$u.mixin],
		computed: {
			style() {
				const style = {}
				if (this.cssSticky) {
					style.position = 'sticky'
					style.top = this.$u.addUnit(this.top)
				} else {
					style.height = fixed ? height + 'px' : 'auto'
				}
				style.backgroundColor = this.bgColor
				return this.$u.deepMerge(this.customStyle, style)
			},
			// 吸顶内容的样式
			stickyContent() {
				const style = {}
				if(!this.cssSticky) {
					this.position = this.fixed ? 'fixed' : 'static'
					style.top = this.stickyTop + 'px'
					style.left = this.left + 'px'
					style.width = this.width == 'auto' ? 'auto' : width + 'px'
					style.zIndex = this.zIndex ? this.zIndex : this.$u.zIndex.sticky
				}
				return style
			}
		},
		mounted() {
			this.init()
		},
		methods: {
			init() {
				this.getStickyTop()
				this.checkSupportCssSticky()
				// 如果不支持css sticky，则使用js方案，此方案性能比不上css方案
				if(!this.cssSticky) {
					
				}
			},
			initObserveContent() {
				this.disconnectObserver('contentObserver');
				this.$u.getRect('.' + this.elId).then((res) => {
					this.height = res.height;
					this.left = res.left;
					this.width = res.width;
					this.$nextTick(() => {
						this.observeContent();
					})
				})
			},
			observeContent() {
				this.disconnectObserver('contentObserver');
				const contentObserver = this.createIntersectionObserver({
					thresholds: [0.95, 0.98, 1]
				});
				contentObserver.relativeToViewport({
					top: -this.stickyTop
				});
				contentObserver.observe('.' + this.elClass, res => {
					if (!this.disabled) return;
					this.setFixed(res.boundingClientRect.top);
				});
				this.contentObserver = contentObserver;
			},
			setFixed(top) {
				const fixed = top < this.stickyTop;
				if (fixed) this.$emit('fixed', this.index);
				else if(this.fixed) this.$emit('unfixed', this.index);
				this.fixed = fixed;
			},
			disconnectObserver(observerName) {
				const observer = this[observerName];
				observer && observer.disconnect();
			},
			getStickyTop() {
				if (/rpx$/.test(this.customNavHeight)) {
					// rpx单位需要转为px单位，才能直接相加
					this.stickyTop = this.offsetTop + uni.rpx2px(this.customNavHeight) + 'px'
				} else {
					// 无论customNavHeight为数值(默认px单位)，还是12px(parseInt后为12)之类转换后都为数值，可以直接相加
					this.stickyTop = this.offsetTop + parseInt(this.customNavHeight) + 'px'
				}
			},
			async checkSupportCssSticky() {
				// #ifdef H5
				// H5，也即手机浏览器，都是现代浏览器，是支持css sticky的
				// 为了预防某些低版本安卓上，H5依然可能不支持css sticky，所以放在最上面，优先级最低
				this.cssSticky = true
				// #endif

				// 如果安卓版本高于8.0，依然认为是支持css sticky的(因为安卓7在某些机型，可能不支持sticky)
				if(this.$u.os() === 'android' && Number(this.$u.sys().system()) > 8) {
					this.cssSticky = true
				}
				
				// #ifdef APP-VUE || MP-WEIXIN
				this.cssSticky = await this.checkComputedStyle()
				// #endif

				// ios上，从ios6开始，都是支持css sticky的
				if (this.$u.os() === 'ios') {
					this.cssSticky = true
				}

				// nvue，是支持css sticky的
				// #ifdef APP-NVUE
				this.cssSticky = true
				// #endif
			},
			// 在APP和微信小程序上，通过uni.createSelectorQuery可以判断是否支持css sticky
			checkComputedStyle() {
				return new Promise(resolve => {
					uni.createSelectorQuery().in(this).select('.u-sticky').fields({
						computedStyle: ["position"]
					}).exec(e => {
						resolve('sticky' === e[0].position)
					})
				})
			}
		},
		beforeDestroy() {
			this.disconnectObserver('contentObserver');
		}
	}
</script>

<style lang="scss">
	.u-sticky {
		/* #ifdef APP-VUE || MP-WEIXIN */
		// 此处默认写sticky属性，是为了给微信和APP通过uni.createSelectorQuery查询是否支持css sticky使用
		position: sticky;
		/* #endif */
	}
</style>
