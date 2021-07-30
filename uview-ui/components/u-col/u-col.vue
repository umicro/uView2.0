<template>
	<view
	    class="u-col"
		ref="u-col"
	    :class="[
			'u-col-' + span
		]"
	    :style="[colStyle]"
	    @tap="clickHandler"
	>
		<slot></slot>
	</view>
</template>

<script>
	import props from './props.js'
	export default {
		name: 'u-col',
		// #ifdef MP-WEIXIN
		// 将自定义节点设置成虚拟的，更加接近Vue组件的表现，能更好的使用flex属性
		options: {
			virtualHost: true
		},
		// #endif
		mixins: [uni.$u.mixin, props],
		data() {
			return {
				width: 0,
				parentData: {
					gutter: 0
				},
				gridNum: 12
			}
		},
		computed: {
			uJustify() {
				if (this.justify == 'end' || this.justify == 'start') return 'flex-' + this.justify
				else if (this.justify == 'around' || this.justify == 'between') return 'space-' + this.justify
				else return this.justify
			},
			uAlignItem() {
				if (this.align == 'top') return 'flex-start'
				if (this.align == 'bottom') return 'flex-end'
				else return this.align
			},
			colStyle() {
				const style = {
					// 这里为什么需要分开写，而不是写成"padding: 0 10px"的形式呢
					// 因为weex是阿里为了KPI而做的垃ji，这也说明阿里绝对无法和谷歌，微软相比相提并论(虽然谷歌的Android和微软的Windows也是垃圾)
					paddingLeft: uni.$u.addUnit(Number(this.parentData.gutter)/2),
					paddingRight: uni.$u.addUnit(Number(this.parentData.gutter)/2),
					alignItems: this.uAlignItem,
					justifyContent: this.uJustify,
					textAlign: this.textAlign,
					// #ifndef APP-NVUE
					// 在非nvue上，使用百分比形式
					flex: `0 0 ${100 / this.gridNum * this.span}%`,
					marginLeft: 100 / 12 * this.offset + '%',
					// #endif
					// #ifdef APP-NVUE
					// 在nvue上，由于无法使用百分比单位，这里需要获取父组件的宽度，再计算得出该有对应的百分比尺寸
					width: uni.$u.addUnit(Math.floor(this.width / this.gridNum * Number(this.span))),
					marginLeft: uni.$u.addUnit(Math.floor(this.width / this.gridNum * Number(this.offset))),
					// #endif
				}
				return uni.$u.deepMerge(style, uni.$u.addStyle(this.customStyle))
			}
		},
		mounted() {
			this.init()
		},
		methods: {
			async init() {
				// 支付宝小程序不支持provide/inject，所以使用这个方法获取整个父组件，在created定义，避免循环引用
				this.updateParentData()
				this.width = await this.parent.getComponentWidth()
			},
			updateParentData() {
				this.getParentData('u-row')
			},
			clickHandler(e) {
				this.$emit('click');
			}
		},
	}
</script>

<style lang="scss">
	@import "../../libs/css/components.scss";

	.u-col {
		padding: 0;
		/* #ifdef MP */
		display: block;
		/* #endif */
	}

	// nvue下百分比无效
	/* #ifndef APP-NVUE */
	.u-col-0 {
		width: 0;
	}

	.u-col-1 {
		width: calc(100%/12);
	}

	.u-col-2 {
		width: calc(100%/12 * 2);
	}

	.u-col-3 {
		width: calc(100%/12 * 3);
	}

	.u-col-4 {
		width: calc(100%/12 * 4);
	}

	.u-col-5 {
		width: calc(100%/12 * 5);
	}

	.u-col-6 {
		width: calc(100%/12 * 6);
	}

	.u-col-7 {
		width: calc(100%/12 * 7);
	}

	.u-col-8 {
		width: calc(100%/12 * 8);
	}

	.u-col-9 {
		width: calc(100%/12 * 9);
	}

	.u-col-10 {
		width: calc(100%/12 * 10);
	}

	.u-col-11 {
		width: calc(100%/12 * 11);
	}

	.u-col-12 {
		width: calc(100%/12 * 12);
	}

	/* #endif */
</style>
